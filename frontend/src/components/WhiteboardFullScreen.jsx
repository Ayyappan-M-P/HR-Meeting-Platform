// src/components/WhiteboardFullScreen.jsx
import React, { useRef, useEffect, useState } from "react";

/**
 * Props:
 * - userRole: 'hr' | 'candidate'
 * - localVideoRef, remoteVideoRef: refs to video elements (to show thumbnails)
 * - sendSignalingMessage: function(message) that sends an object via WS (MeetingRoom's function)
 * - onClose: callback when whiteboard closed
 * - isOpen: boolean
 */
const WhiteboardFullScreen = ({
  userRole,
  localVideoRef,
  remoteVideoRef,
  sendSignalingMessage,
  onClose,
  isOpen
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // local strokes and remote strokes
  const [strokes, setStrokes] = useState([]); // { id, color, width, points: [{x,y}, ...], from: 'local'|'remote' }
  const remoteStrokesRef = useRef([]); // mutable ref for incoming remote strokes
  const currentStrokeRef = useRef(null);
  const [color, setColor] = useState("#0b84ff");
  const [width, setWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const sendBufferRef = useRef([]); // small buffer of points to throttle sends

  // helper - get pointer pos relative to canvas
  const getPos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  // initialize canvas resolution
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const resize = () => {
      const rect = c.getBoundingClientRect();
      // increase pixel ratio for crisp strokes
      const ratio = window.devicePixelRatio || 1;
      c.width = Math.max(100, Math.floor(rect.width * ratio));
      c.height = Math.max(100, Math.floor(rect.height * ratio));
      const ctx = c.getContext("2d");
      ctx.scale(ratio, ratio);
      redrawAll();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes]);

  // redraw helper
  const redrawAll = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    // clear (use CSS size to clear)
    ctx.clearRect(0, 0, c.width, c.height);
    // we need to draw using CSS pixel coords -> convert by ratio
    const ratio = (window.devicePixelRatio || 1);
    // iterate strokes (remote first then local)
    [...remoteStrokesRef.current, ...strokes].forEach((s) => {
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      if (!s.points || s.points.length === 0) return;
      const p0 = s.points[0];
      ctx.moveTo(p0.x / ratio, p0.y / ratio);
      for (let i = 1; i < s.points.length; i++) {
        const p = s.points[i];
        ctx.lineTo(p.x / ratio, p.y / ratio);
      }
      ctx.stroke();
    });
  };

  // When strokes change redraw
  useEffect(() => {
    redrawAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strokes]);

  // incoming whiteboard messages handler (called by MeetingRoom)
  useEffect(() => {
    // listen for custom DOM event 'whiteboard-remote' (MeetingRoom will dispatch)
    const handler = (e) => {
      const payload = e.detail;
      if (!payload || !payload.type) return;

      if (payload.type === "whiteboard-draw") {
        // payload: { strokeId, color, width, points: [{x,y}, ...] }
        // append to remote strokes (merge if strokeId exists)
        const existing = remoteStrokesRef.current.find(s => s.id === payload.strokeId);
        if (existing) {
          existing.points.push(...payload.points);
        } else {
          remoteStrokesRef.current.push({
            id: payload.strokeId,
            color: payload.color,
            width: payload.width,
            points: payload.points.slice(),
            from: "remote"
          });
        }
        redrawAll();
      } else if (payload.type === "whiteboard-clear") {
        remoteStrokesRef.current = [];
        setStrokes([]);
        redrawAll();
      } else if (payload.type === "whiteboard-undo") {
        // remove last remote stroke
        remoteStrokesRef.current.pop();
        redrawAll();
      } else if (payload.type === "whiteboard-open") {
        // optionally show indicator - nothing else needed
      } else if (payload.type === "whiteboard-close") {
        // nothing
      }
    };

    window.addEventListener("whiteboard-remote", handler);
    return () => window.removeEventListener("whiteboard-remote", handler);
  }, []);

  // start stroke
  const onPointerDown = (e) => {
    if (userRole !== "hr") return; // only HR draws
    const c = canvasRef.current;
    if (!c) return;
    const p = getPos(c, e);
    const strokeId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    currentStrokeRef.current = {
      id: strokeId,
      color,
      width,
      points: [p]
    };
    setIsDrawing(true);
    // immediate small send
    sendBufferRef.current = [p];
  };

  const onPointerMove = (e) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const p = getPos(c, e);
    currentStrokeRef.current.points.push(p);
    // local visual - push to strokes so we render in local view
    // we will not update state for every move (performance) - instead set small batches
    setStrokes(prev => {
      // update last or append
      const last = prev[prev.length - 1];
      if (last && last.id === currentStrokeRef.current.id) {
        last.points.push(p);
        return [...prev.slice(0, -1), last];
      } else {
        return [...prev, { ...currentStrokeRef.current }];
      }
    });

    // buffer for sending
    sendBufferRef.current.push(p);

    // throttle send: send every ~50ms or when buffer gets large
    if (!sendBufferRef.current._timer) {
      sendBufferRef.current._timer = setTimeout(() => {
        const pts = sendBufferRef.current.splice(0, sendBufferRef.current.length);
        sendBufferRef.current._timer = null;
        // send via signaling WebSocket
        try {
          sendSignalingMessage({
            type: "whiteboard-draw",
            strokeId: currentStrokeRef.current.id,
            color: currentStrokeRef.current.color,
            width: currentStrokeRef.current.width,
            points: pts
          });
        } catch (err) {
          console.warn("Failed to send whiteboard chunk", err);
        }
      }, 45);
    }
  };

  const onPointerUp = (e) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    // finalize stroke: send remaining buffer immediately
    if (sendBufferRef.current._timer) {
      clearTimeout(sendBufferRef.current._timer);
      sendBufferRef.current._timer = null;
    }
    const remaining = sendBufferRef.current.splice(0, sendBufferRef.current.length);
    if (remaining.length > 0) {
      try {
        sendSignalingMessage({
          type: "whiteboard-draw",
          strokeId: currentStrokeRef.current.id,
          color: currentStrokeRef.current.color,
          width: currentStrokeRef.current.width,
          points: remaining
        });
      } catch (err) {
        console.warn("Failed to send final whiteboard chunk", err);
      }
    }

    currentStrokeRef.current = null;
    setIsDrawing(false);
    // send stroke-end message (optional, not needed here)
  };

  // clear board
  const handleClear = () => {
    // clear local
    remoteStrokesRef.current = [];
    setStrokes([]);
    // send clear
    sendSignalingMessage({ type: "whiteboard-clear" });
  };

  // undo (local last stroke)
  const handleUndo = () => {
    setStrokes(prev => {
      const next = [...prev];
      next.pop();
      return next;
    });
    // notify remote to undo last remote stroke (they'll pop their remote list)
    sendSignalingMessage({ type: "whiteboard-undo" });
  };

  // send open/close events (called by MeetingRoom when opening/closing)
  useEffect(() => {
    if (!isOpen) return;
    // broadcast open
    sendSignalingMessage({ type: "whiteboard-open" });
    return () => {
      sendSignalingMessage({ type: "whiteboard-close" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // visual: video thumbnails use clones of video elements (by srcObject)
  // We'll render small <video> elements and set their srcObject on mount
  const localThumbRef = useRef(null);
  const remoteThumbRef = useRef(null);

  useEffect(() => {
    const lt = localThumbRef.current;
    const rt = remoteThumbRef.current;
    if (lt && localVideoRef && localVideoRef.current) {
      try { lt.srcObject = localVideoRef.current.srcObject; } catch (e) {}
    }
    if (rt && remoteVideoRef && remoteVideoRef.current) {
      try { rt.srcObject = remoteVideoRef.current.srcObject; } catch (e) {}
    }
  }, [localVideoRef, remoteVideoRef, isOpen]);

  // keyboard ESC close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-stretch"
      style={{ backdropFilter: "blur(4px)" }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/60">
        <div className="flex items-center gap-3">
          <h3 className="text-white text-lg font-semibold">Whiteboard — Live</h3>
          <span className="text-sm text-gray-300">Collaborative view</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <label className="text-sm text-gray-200 mr-2">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 p-0 border-0"
              title="Pen color"
            />
            <label className="text-sm text-gray-200 ml-3 mr-2">Size</label>
            <input
              type="range"
              min="1"
              max="12"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              className="w-28"
            />
          </div>

          <button
            onClick={handleUndo}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-white"
          >
            Undo
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Clear
          </button>
          <button
            onClick={() => { onClose(); }}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Close
          </button>
        </div>
      </div>

      {/* Canvas area */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ touchAction: userRole === "hr" ? "none" : "auto" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />

        {/* Local & remote thumbnails */}
        <div className="absolute left-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
          <video ref={localThumbRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">You</div>
        </div>

        <div className="absolute right-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
          <video ref={remoteThumbRef} autoPlay muted={false} playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">Candidate</div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardFullScreen;
