// // // src/components/WhiteboardFullScreen.jsx
// // import React, { useRef, useEffect, useState } from "react";

// // /**
// //  * Props:
// //  * - userRole: 'hr' | 'candidate'
// //  * - localVideoRef, remoteVideoRef: refs to video elements (to show thumbnails)
// //  * - sendSignalingMessage: function(message) that sends an object via WS (MeetingRoom's function)
// //  * - onClose: callback when whiteboard closed
// //  * - isOpen: boolean
// //  */
// // const WhiteboardFullScreen = ({
// //   userRole,
// //   localVideoRef,
// //   remoteVideoRef,
// //   sendSignalingMessage,
// //   onClose,
// //   isOpen
// // }) => {
// //   const canvasRef = useRef(null);
// //   const containerRef = useRef(null);

// //   // local strokes and remote strokes
// //   const [strokes, setStrokes] = useState([]); // { id, color, width, points: [{x,y}, ...], from: 'local'|'remote' }
// //   const remoteStrokesRef = useRef([]); // mutable ref for incoming remote strokes
// //   const currentStrokeRef = useRef(null);
// //   const [color, setColor] = useState("#0b84ff");
// //   const [width, setWidth] = useState(3);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const sendBufferRef = useRef([]); // small buffer of points to throttle sends

// //   // helper - get pointer pos relative to canvas
// //   const getPos = (canvas, e) => {
// //     const rect = canvas.getBoundingClientRect();
// //     const clientX = e.touches ? e.touches[0].clientX : e.clientX;
// //     const clientY = e.touches ? e.touches[0].clientY : e.clientY;
// //     return {
// //       x: (clientX - rect.left) * (canvas.width / rect.width),
// //       y: (clientY - rect.top) * (canvas.height / rect.height)
// //     };
// //   };

// //   // initialize canvas resolution
// //   useEffect(() => {
// //     const c = canvasRef.current;
// //     if (!c) return;
// //     const resize = () => {
// //       const rect = c.getBoundingClientRect();
// //       // increase pixel ratio for crisp strokes
// //       const ratio = window.devicePixelRatio || 1;
// //       c.width = Math.max(100, Math.floor(rect.width * ratio));
// //       c.height = Math.max(100, Math.floor(rect.height * ratio));
// //       const ctx = c.getContext("2d");
// //       ctx.scale(ratio, ratio);
// //       redrawAll();
// //     };
// //     resize();
// //     window.addEventListener("resize", resize);
// //     return () => window.removeEventListener("resize", resize);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [strokes]);

// //   // redraw helper
// //   const redrawAll = () => {
// //     const c = canvasRef.current;
// //     if (!c) return;
// //     const ctx = c.getContext("2d");
// //     // clear (use CSS size to clear)
// //     ctx.clearRect(0, 0, c.width, c.height);
// //     // we need to draw using CSS pixel coords -> convert by ratio
// //     const ratio = (window.devicePixelRatio || 1);
// //     // iterate strokes (remote first then local)
// //     [...remoteStrokesRef.current, ...strokes].forEach((s) => {
// //       ctx.beginPath();
// //       ctx.lineJoin = "round";
// //       ctx.lineCap = "round";
// //       ctx.strokeStyle = s.color;
// //       ctx.lineWidth = s.width;
// //       if (!s.points || s.points.length === 0) return;
// //       const p0 = s.points[0];
// //       ctx.moveTo(p0.x / ratio, p0.y / ratio);
// //       for (let i = 1; i < s.points.length; i++) {
// //         const p = s.points[i];
// //         ctx.lineTo(p.x / ratio, p.y / ratio);
// //       }
// //       ctx.stroke();
// //     });
// //   };

// //   // When strokes change redraw
// //   useEffect(() => {
// //     redrawAll();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [strokes]);

// //   // incoming whiteboard messages handler (called by MeetingRoom)
// //   useEffect(() => {
// //     // listen for custom DOM event 'whiteboard-remote' (MeetingRoom will dispatch)
// //     const handler = (e) => {
// //       const payload = e.detail;
// //       if (!payload || !payload.type) return;

// //       if (payload.type === "whiteboard-draw") {
// //         // payload: { strokeId, color, width, points: [{x,y}, ...] }
// //         // append to remote strokes (merge if strokeId exists)
// //         const existing = remoteStrokesRef.current.find(s => s.id === payload.strokeId);
// //         if (existing) {
// //           existing.points.push(...payload.points);
// //         } else {
// //           remoteStrokesRef.current.push({
// //             id: payload.strokeId,
// //             color: payload.color,
// //             width: payload.width,
// //             points: payload.points.slice(),
// //             from: "remote"
// //           });
// //         }
// //         redrawAll();
// //       } else if (payload.type === "whiteboard-clear") {
// //         remoteStrokesRef.current = [];
// //         setStrokes([]);
// //         redrawAll();
// //       } else if (payload.type === "whiteboard-undo") {
// //         // remove last remote stroke
// //         remoteStrokesRef.current.pop();
// //         redrawAll();
// //       } else if (payload.type === "whiteboard-open") {
// //         // optionally show indicator - nothing else needed
// //       } else if (payload.type === "whiteboard-close") {
// //         // nothing
// //       }
// //     };

// //     window.addEventListener("whiteboard-remote", handler);
// //     return () => window.removeEventListener("whiteboard-remote", handler);
// //   }, []);

// //   // start stroke
// //   const onPointerDown = (e) => {
// //     if (userRole !== "hr") return; // only HR draws
// //     const c = canvasRef.current;
// //     if (!c) return;
// //     const p = getPos(c, e);
// //     const strokeId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// //     currentStrokeRef.current = {
// //       id: strokeId,
// //       color,
// //       width,
// //       points: [p]
// //     };
// //     setIsDrawing(true);
// //     // immediate small send
// //     sendBufferRef.current = [p];
// //   };

// //   const onPointerMove = (e) => {
// //     if (!isDrawing || !currentStrokeRef.current) return;
// //     const c = canvasRef.current;
// //     if (!c) return;
// //     const p = getPos(c, e);
// //     currentStrokeRef.current.points.push(p);
// //     // local visual - push to strokes so we render in local view
// //     // we will not update state for every move (performance) - instead set small batches
// //     setStrokes(prev => {
// //       // update last or append
// //       const last = prev[prev.length - 1];
// //       if (last && last.id === currentStrokeRef.current.id) {
// //         last.points.push(p);
// //         return [...prev.slice(0, -1), last];
// //       } else {
// //         return [...prev, { ...currentStrokeRef.current }];
// //       }
// //     });

// //     // buffer for sending
// //     sendBufferRef.current.push(p);

// //     // throttle send: send every ~50ms or when buffer gets large
// //     if (!sendBufferRef.current._timer) {
// //       sendBufferRef.current._timer = setTimeout(() => {
// //         const pts = sendBufferRef.current.splice(0, sendBufferRef.current.length);
// //         sendBufferRef.current._timer = null;
// //         // send via signaling WebSocket
// //         try {
// //           sendSignalingMessage({
// //             type: "whiteboard-draw",
// //             strokeId: currentStrokeRef.current.id,
// //             color: currentStrokeRef.current.color,
// //             width: currentStrokeRef.current.width,
// //             points: pts
// //           });
// //         } catch (err) {
// //           console.warn("Failed to send whiteboard chunk", err);
// //         }
// //       }, 45);
// //     }
// //   };

// //   const onPointerUp = (e) => {
// //     if (!isDrawing || !currentStrokeRef.current) return;
// //     // finalize stroke: send remaining buffer immediately
// //     if (sendBufferRef.current._timer) {
// //       clearTimeout(sendBufferRef.current._timer);
// //       sendBufferRef.current._timer = null;
// //     }
// //     const remaining = sendBufferRef.current.splice(0, sendBufferRef.current.length);
// //     if (remaining.length > 0) {
// //       try {
// //         sendSignalingMessage({
// //           type: "whiteboard-draw",
// //           strokeId: currentStrokeRef.current.id,
// //           color: currentStrokeRef.current.color,
// //           width: currentStrokeRef.current.width,
// //           points: remaining
// //         });
// //       } catch (err) {
// //         console.warn("Failed to send final whiteboard chunk", err);
// //       }
// //     }

// //     currentStrokeRef.current = null;
// //     setIsDrawing(false);
// //     // send stroke-end message (optional, not needed here)
// //   };

// //   // clear board
// //   const handleClear = () => {
// //     // clear local
// //     remoteStrokesRef.current = [];
// //     setStrokes([]);
// //     // send clear
// //     sendSignalingMessage({ type: "whiteboard-clear" });
// //   };

// //   // undo (local last stroke)
// //   const handleUndo = () => {
// //     setStrokes(prev => {
// //       const next = [...prev];
// //       next.pop();
// //       return next;
// //     });
// //     // notify remote to undo last remote stroke (they'll pop their remote list)
// //     sendSignalingMessage({ type: "whiteboard-undo" });
// //   };

// //   // send open/close events (called by MeetingRoom when opening/closing)
// //   useEffect(() => {
// //     if (!isOpen) return;
// //     // broadcast open
// //     sendSignalingMessage({ type: "whiteboard-open" });
// //     return () => {
// //       sendSignalingMessage({ type: "whiteboard-close" });
// //     };
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [isOpen]);

// //   // visual: video thumbnails use clones of video elements (by srcObject)
// //   // We'll render small <video> elements and set their srcObject on mount
// //   const localThumbRef = useRef(null);
// //   const remoteThumbRef = useRef(null);

// //   useEffect(() => {
// //     const lt = localThumbRef.current;
// //     const rt = remoteThumbRef.current;
// //     if (lt && localVideoRef && localVideoRef.current) {
// //       try { lt.srcObject = localVideoRef.current.srcObject; } catch (e) {}
// //     }
// //     if (rt && remoteVideoRef && remoteVideoRef.current) {
// //       try { rt.srcObject = remoteVideoRef.current.srcObject; } catch (e) {}
// //     }
// //   }, [localVideoRef, remoteVideoRef, isOpen]);

// //   // keyboard ESC close
// //   useEffect(() => {
// //     const onKey = (e) => {
// //       if (e.key === "Escape" && isOpen) {
// //         onClose();
// //       }
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, [isOpen, onClose]);

// //   if (!isOpen) return null;

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="fixed inset-0 z-50 bg-black/90 flex flex-col items-stretch"
// //       style={{ backdropFilter: "blur(4px)" }}
// //     >
// //       {/* Top bar */}
// //       <div className="flex items-center justify-between px-4 py-3 bg-black/60">
// //         <div className="flex items-center gap-3">
// //           <h3 className="text-white text-lg font-semibold">Whiteboard — Live</h3>
// //           <span className="text-sm text-gray-300">Collaborative view</span>
// //         </div>

// //         <div className="flex items-center gap-2">
// //           <div className="flex items-center gap-2 mr-2">
// //             <label className="text-sm text-gray-200 mr-2">Color</label>
// //             <input
// //               type="color"
// //               value={color}
// //               onChange={(e) => setColor(e.target.value)}
// //               className="w-8 h-8 p-0 border-0"
// //               title="Pen color"
// //             />
// //             <label className="text-sm text-gray-200 ml-3 mr-2">Size</label>
// //             <input
// //               type="range"
// //               min="1"
// //               max="12"
// //               value={width}
// //               onChange={(e) => setWidth(parseInt(e.target.value, 10))}
// //               className="w-28"
// //             />
// //           </div>

// //           <button
// //             onClick={handleUndo}
// //             className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-white"
// //           >
// //             Undo
// //           </button>
// //           <button
// //             onClick={handleClear}
// //             className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
// //           >
// //             Clear
// //           </button>
// //           <button
// //             onClick={() => { onClose(); }}
// //             className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </div>

// //       {/* Canvas area */}
// //       <div className="flex-1 relative">
// //         <canvas
// //           ref={canvasRef}
// //           className="w-full h-full"
// //           style={{ touchAction: userRole === "hr" ? "none" : "auto" }}
// //           onPointerDown={onPointerDown}
// //           onPointerMove={onPointerMove}
// //           onPointerUp={onPointerUp}
// //           onPointerCancel={onPointerUp}
// //         />

// //         {/* Local & remote thumbnails */}
// //         <div className="absolute left-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
// //           <video ref={localThumbRef} autoPlay muted playsInline className="w-full h-full object-cover" />
// //           <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">You</div>
// //         </div>

// //         <div className="absolute right-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
// //           <video ref={remoteThumbRef} autoPlay muted={false} playsInline className="w-full h-full object-cover" />
// //           <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">Candidate</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default WhiteboardFullScreen;


// // src/components/WhiteboardFullScreen.jsx
// import React, { useRef, useEffect, useState } from "react";

// /**
//  Props:
//   - userRole: 'hr' | 'candidate'
//   - localVideoRef, remoteVideoRef: refs to main video elements
//   - sendSignalingMessage: function(message) that sends object via WS
//   - onClose: callback when whiteboard closed
//   - isOpen: boolean
// */
// const WhiteboardFullScreen = ({
//   userRole,
//   localVideoRef,
//   remoteVideoRef,
//   sendSignalingMessage,
//   onClose,
//   isOpen
// }) => {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);

//   // strokes are kept in state (local strokes)
//   const [strokes, setStrokes] = useState([]); // [{id, color, size, points: [{x,y}], user}]
//   const remoteStrokesRef = useRef([]); // persistent remote strokes
//   const currentStrokeRef = useRef(null);
//   const [color, setColor] = useState("#0b84ff");
//   const [size, setSize] = useState(3);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const sendBufferRef = useRef([]); // buffered points to send
//   const sendTimerRef = useRef(null);

//   // Helper: convert event -> CSS pixel coordinates relative to canvas
//   const getPosCss = (canvas, e) => {
//     const rect = canvas.getBoundingClientRect();
//     const clientX = e.touches ? e.touches[0].clientX : (e.clientX ?? 0);
//     const clientY = e.touches ? e.touches[0].clientY : (e.clientY ?? 0);
//     return {
//       x: clientX - rect.left,
//       y: clientY - rect.top
//     };
//   };

//   // Setup canvas size and scaling (runs on mount and resize)
//   useEffect(() => {
//     const c = canvasRef.current;
//     if (!c) return;

//     const resize = () => {
//       const rect = c.getBoundingClientRect();
//       const ratio = window.devicePixelRatio || 1;
//       c.width = Math.max(100, Math.floor(rect.width * ratio));
//       c.height = Math.max(100, Math.floor(rect.height * ratio));
//       const ctx = c.getContext("2d");
//       ctx.setTransform(1, 0, 0, 1, 0, 0);
//       ctx.scale(ratio, ratio);
//       redrawAll();
//     };

//     resize();
//     window.addEventListener("resize", resize);
//     return () => window.removeEventListener("resize", resize);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Redraw helper draws remote strokes first then local strokes
//   const redrawAll = () => {
//     const c = canvasRef.current;
//     if (!c) return;
//     const ctx = c.getContext("2d");
//     const rect = c.getBoundingClientRect();
//     ctx.clearRect(0, 0, rect.width, rect.height);

//     const drawStroke = (s) => {
//       if (!s || !s.points || s.points.length === 0) return;
//       ctx.beginPath();
//       ctx.lineJoin = "round";
//       ctx.lineCap = "round";
//       ctx.strokeStyle = s.color;
//       ctx.lineWidth = s.size;
//       const p0 = s.points[0];
//       ctx.moveTo(p0.x, p0.y);
//       for (let i = 1; i < s.points.length; i++) {
//         const p = s.points[i];
//         ctx.lineTo(p.x, p.y);
//       }
//       ctx.stroke();
//     };

//     remoteStrokesRef.current.forEach(drawStroke);
//     strokes.forEach(drawStroke);
//   };

//   // redraw when strokes update
//   useEffect(() => {
//     redrawAll();
//   }, [strokes]);

//   // Handle incoming whiteboard messages dispatched by MeetingRoom (custom event 'whiteboard-remote')
//   useEffect(() => {
//     const handler = (e) => {
//       const payload = e.detail;
//       if (!payload || !payload.type) return;

//       if (!Array.isArray(remoteStrokesRef.current)) remoteStrokesRef.current = [];

//       if (payload.type === "whiteboard-draw") {
//         const id = payload.strokeId;
//         if (!id) return;
//         const existing = remoteStrokesRef.current.find(s => s.id === id);
//         if (existing) {
//           existing.points = existing.points.concat(payload.points || []);
//         } else {
//           remoteStrokesRef.current = remoteStrokesRef.current.concat([{
//             id,
//             color: payload.color || "#000",
//             size: payload.size || 3,
//             points: (payload.points || []).slice(),
//             user: payload.user || "remote"
//           }]);
//         }
//         redrawAll();
//       } else if (payload.type === "whiteboard-clear") {
//         remoteStrokesRef.current = [];
//         setStrokes([]);
//         redrawAll();
//       } else if (payload.type === "whiteboard-undo") {
//         if (remoteStrokesRef.current.length > 0) {
//           remoteStrokesRef.current = remoteStrokesRef.current.slice(0, -1);
//           redrawAll();
//         }
//       } else if (payload.type === "whiteboard-open") {
//         // no-op (MeetingRoom manages open state)
//       } else if (payload.type === "whiteboard-close") {
//         // no-op
//       }
//     };

//     window.addEventListener("whiteboard-remote", handler);
//     return () => window.removeEventListener("whiteboard-remote", handler);
//   }, []);

//   // Start stroke (pointer events) — allow both roles to draw
//   const onPointerDown = (e) => {
//     // Only respond to primary button (touch or left button)
//     if (e.pointerType === "mouse" && e.button !== 0) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     try { e.target.setPointerCapture?.(e.pointerId); } catch (err) {}
//     const p = getPosCss(c, e);
//     const strokeId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

//     const stroke = {
//       id: strokeId,
//       color,
//       size,
//       points: [p],
//       user: userRole || "local"
//     };
//     currentStrokeRef.current = stroke;
//     setIsDrawing(true);
//     setStrokes(prev => prev.concat([stroke]));
//     sendBufferRef.current = [p];
//     if (!sendTimerRef.current) {
//       sendTimerRef.current = setInterval(() => {
//         if (sendBufferRef.current.length === 0 || !currentStrokeRef.current) return;
//         const pts = sendBufferRef.current.splice(0, sendBufferRef.current.length);
//         try {
//           sendSignalingMessage && sendSignalingMessage({
//             type: "whiteboard-draw",
//             strokeId: currentStrokeRef.current.id,
//             color: currentStrokeRef.current.color,
//             size: currentStrokeRef.current.size,
//             points: pts,
//             user: currentStrokeRef.current.user
//           });
//         } catch (err) {
//           console.warn("whiteboard send failed", err);
//         }
//       }, 60);
//     }
//     e.preventDefault?.();
//   };

//   const onPointerMove = (e) => {
//     if (!isDrawing || !currentStrokeRef.current) return;
//     const c = canvasRef.current;
//     if (!c) return;
//     const p = getPosCss(c, e);
//     setStrokes(prev => {
//       if (!prev || prev.length === 0) return prev;
//       const last = prev[prev.length - 1];
//       if (!last || last.id !== currentStrokeRef.current.id) {
//         return prev.concat([{ ...currentStrokeRef.current, points: [ ...currentStrokeRef.current.points, p ] }]);
//       }
//       const updatedLast = { ...last, points: last.points.concat([p]) };
//       return [...prev.slice(0, -1), updatedLast];
//     });
//     sendBufferRef.current.push(p);
//     e.preventDefault?.();
//   };

//   const onPointerUp = (e) => {
//     if (!isDrawing || !currentStrokeRef.current) return;
//     if (sendBufferRef.current.length > 0 && currentStrokeRef.current) {
//       const pts = sendBufferRef.current.splice(0, sendBufferRef.current.length);
//       try {
//         sendSignalingMessage && sendSignalingMessage({
//           type: "whiteboard-draw",
//           strokeId: currentStrokeRef.current.id,
//           color: currentStrokeRef.current.color,
//           size: currentStrokeRef.current.size,
//           points: pts,
//           user: currentStrokeRef.current.user
//         });
//       } catch (err) {
//         console.warn("whiteboard send final failed", err);
//       }
//     }
//     if (sendTimerRef.current) {
//       clearInterval(sendTimerRef.current);
//       sendTimerRef.current = null;
//     }

//     currentStrokeRef.current = null;
//     setIsDrawing(false);
//     try { e.target.releasePointerCapture?.(e.pointerId); } catch (err) {}
//     e.preventDefault?.();
//   };

//   // Clear board locally and broadcast
//   const handleClear = () => {
//     remoteStrokesRef.current = [];
//     setStrokes([]);
//     try {
//       sendSignalingMessage && sendSignalingMessage({ type: "whiteboard-clear" });
//     } catch (err) {
//       console.warn("Failed to send whiteboard-clear", err);
//     }
//   };

//   // Undo local last stroke and broadcast
//   const handleUndo = () => {
//     setStrokes(prev => {
//       if (!prev || prev.length === 0) return prev;
//       const next = prev.slice(0, -1);
//       return next;
//     });
//     try {
//       sendSignalingMessage && sendSignalingMessage({ type: "whiteboard-undo" });
//     } catch (err) {
//       console.warn("Failed to send whiteboard-undo", err);
//     }
//   };

//   // Broadcast open/close events when isOpen changes
//   useEffect(() => {
//     if (!isOpen) return;
//     try {
//       sendSignalingMessage && sendSignalingMessage({ type: "whiteboard-open" });
//     } catch (err) {}
//     return () => {
//       try {
//         sendSignalingMessage && sendSignalingMessage({ type: "whiteboard-close" });
//       } catch (err) {}
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen]);

//   // Attach video srcObjects to thumbnail elements when opening
//   const localThumbRef = useRef(null);
//   const remoteThumbRef = useRef(null);
//   useEffect(() => {
//     if (!isOpen) return;
//     const lt = localThumbRef.current;
//     const rt = remoteThumbRef.current;
//     try {
//       if (lt && localVideoRef && localVideoRef.current) lt.srcObject = localVideoRef.current.srcObject || localVideoRef.current.srcObject;
//     } catch (e) {}
//     try {
//       if (rt && remoteVideoRef && remoteVideoRef.current) rt.srcObject = remoteVideoRef.current.srcObject || remoteVideoRef.current.srcObject;
//     } catch (e) {}
//   }, [isOpen, localVideoRef, remoteVideoRef]);

//   // ESC closes
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape" && isOpen) {
//         onClose && onClose();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [isOpen, onClose]);

//   // cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (sendTimerRef.current) {
//         clearInterval(sendTimerRef.current);
//         sendTimerRef.current = null;
//       }
//     };
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div ref={containerRef} className="fixed inset-0 z-50 bg-black/90 flex flex-col items-stretch" style={{ backdropFilter: "blur(4px)" }}>
//       {/* top toolbar */}
//       <div className="flex items-center justify-between px-4 py-3 bg-black/60">
//         <div className="flex items-center gap-3">
//           <h3 className="text-white text-lg font-semibold">Whiteboard — Live</h3>
//           <span className="text-sm text-gray-300">Collaborative</span>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="flex items-center gap-2 mr-2">
//             <label className="text-sm text-gray-200 mr-2">Color</label>
//             <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 p-0 border-0" />
//             <label className="text-sm text-gray-200 ml-3 mr-2">Size</label>
//             <input type="range" min="1" max="24" value={size} onChange={(e) => setSize(parseInt(e.target.value,10))} className="w-28" />
//           </div>

//           <button onClick={handleUndo} className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-white">Undo</button>
//           <button onClick={handleClear} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white">Clear</button>
//           <button onClick={() => { onClose && onClose(); }} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white">Close</button>
//         </div>
//       </div>

//       {/* canvas area */}
//       <div className="flex-1 relative">
//         <canvas
//           ref={canvasRef}
//           className="w-full h-full"
//           onPointerDown={onPointerDown}
//           onPointerMove={onPointerMove}
//           onPointerUp={onPointerUp}
//           onPointerCancel={onPointerUp}
//           style={{ touchAction: "none", cursor: (isDrawing ? "crosshair" : "crosshair") }}
//         />

//         {/* local thumbnail */}
//         <div className="absolute left-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
//           <video ref={localThumbRef} autoPlay muted playsInline className="w-full h-full object-cover" />
//           <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">{userRole === 'hr' ? 'HR (You)' : 'You'}</div>
//         </div>

//         {/* remote thumbnail */}
//         <div className="absolute right-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
//           <video ref={remoteThumbRef} autoPlay muted={false} playsInline className="w-full h-full object-cover" />
//           <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">{userRole === 'hr' ? 'Candidate' : 'HR'}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhiteboardFullScreen;


// src/components/WhiteboardFullScreen.jsx
import React, { useRef, useEffect, useState } from "react";

/**
 Props:
  - userRole: 'hr' | 'candidate'
  - localVideoRef, remoteVideoRef: refs to main video elements
  - sendSignalingMessage: function(message) that sends object via WS
  - onClose: callback when whiteboard closed
  - isOpen: boolean
*/
const WhiteboardFullScreen = ({
  userRole,
  localVideoRef,
  remoteVideoRef,
  sendSignalingMessage,
  onClose,
  isOpen,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // strokes state (local)
  const [strokes, setStrokes] = useState([]); // [{id,color,size,points:[{x,y}]}]
  const remoteStrokesRef = useRef([]); // remote strokes (mutable)
  const currentStrokeRef = useRef(null);

  // buffered incoming events until whiteboard ready
  const pendingEventsRef = useRef([]);

  // flags & drawing settings
  const [color, setColor] = useState("#0b84ff");
  const [size, setSize] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);

  // send buffer & timer
  const sendBufferRef = useRef([]);
  const sendTimerRef = useRef(null);

  // thumbnail refs
  const localThumbRef = useRef(null);
  const remoteThumbRef = useRef(null);
  const attachedStreamsRef = useRef({ local: null, remote: null });

  // ---- Helpers ----
  const getCssPos = (canvas, e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : (e.clientX ?? 0);
    const clientY = e.touches ? e.touches[0].clientY : (e.clientY ?? 0);
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Resize & scale canvas to CSS size * DPR, set ctx.scale so drawing in CSS coords works
  useEffect(() => {
    if (!isOpen) return;
    const c = canvasRef.current;
    if (!c) return;

    const resize = () => {
      const rect = c.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;

      // avoid zero widths
      const w = Math.max(100, Math.floor(rect.width * ratio));
      const h = Math.max(100, Math.floor(rect.height * ratio));

      // Only update if changed
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;

        const ctx = c.getContext("2d");
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);
        redrawAll();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Redraw helper (remote first, then local)
  const redrawAll = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const rect = c.getBoundingClientRect();

    // clear using CSS pixel area
    ctx.clearRect(0, 0, rect.width, rect.height);

    const draw = (s) => {
      if (!s || !Array.isArray(s.points) || s.points.length === 0) return;
      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = s.color || "#000";
      ctx.lineWidth = s.size || 3;
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        const p = s.points[i];
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    };

    // draw remote strokes first
    remoteStrokesRef.current.forEach(draw);
    strokes.forEach(draw);
  };

  // redraw when local strokes changes
  useEffect(() => {
    redrawAll();
  }, [strokes]);

  // ---- Apply remote event safely ----
  const applyRemoteEvent = (data) => {
    if (!data || !data.type) return;

    if (data.type === "whiteboard-draw") {
      const id = data.strokeId;
      if (!id) return;

      // ensure remoteStrokesRef is array
      if (!Array.isArray(remoteStrokesRef.current)) remoteStrokesRef.current = [];

      let existing = remoteStrokesRef.current.find((s) => s.id === id);
      if (!existing) {
        existing = {
          id,
          color: data.color || "#000",
          size: data.size || 3,
          points: [],
        };
        remoteStrokesRef.current.push(existing);
      }

      if (Array.isArray(data.points) && data.points.length > 0) {
        // merge points safely
        existing.points.push(...data.points);
      }

      redrawAll();
      return;
    }

    if (data.type === "whiteboard-clear") {
      remoteStrokesRef.current = [];
      setStrokes([]);
      redrawAll();
      return;
    }

    if (data.type === "whiteboard-undo") {
      if (remoteStrokesRef.current.length > 0) {
        remoteStrokesRef.current = remoteStrokesRef.current.slice(0, -1);
        redrawAll();
      }
      return;
    }

    // ignore open/close here; MeetingRoom manages open state
  };

  // ---- Listen for remote custom events, buffer until ready ----
  useEffect(() => {
    const handler = (e) => {
      const data = e.detail;
      if (!data || !data.type) return;

      // If whiteboard not ready, buffer event
      if (!isOpen || !canvasRef.current) {
        pendingEventsRef.current.push(data);
        return;
      }

      // otherwise apply
      applyRemoteEvent(data);
    };

    window.addEventListener("whiteboard-remote", handler);
    return () => window.removeEventListener("whiteboard-remote", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ---- Process pending events once whiteboard is open & canvas mounted ----
  useEffect(() => {
    if (!isOpen) return;
    const c = canvasRef.current;
    if (!c) return;

    if (pendingEventsRef.current.length > 0) {
      // apply buffered events in order
      pendingEventsRef.current.forEach((ev) => applyRemoteEvent(ev));
      pendingEventsRef.current = [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, canvasRef.current]);

  // ---- Pointer handlers (supports mouse & touch) ----
  const startSendTimerIfNeeded = (strokeId, strokeColor, strokeSize, ptsToSend) => {
    if (sendTimerRef.current) return;
    sendTimerRef.current = setInterval(() => {
      if (!currentStrokeRef.current) return;
      if (!sendBufferRef.current.length) return;
      const pts = sendBufferRef.current.splice(0, sendBufferRef.current.length);
      try {
        sendSignalingMessage && sendSignalingMessage({
          type: "whiteboard-draw",
          strokeId: currentStrokeRef.current.id,
          color: currentStrokeRef.current.color,
          size: currentStrokeRef.current.size,
          points: pts,
        });
      } catch (err) {
        console.warn("whiteboard send chunk failed", err);
      }
    }, 60);
  };

  const stopSendTimer = () => {
    if (sendTimerRef.current) {
      clearInterval(sendTimerRef.current);
      sendTimerRef.current = null;
    }
  };

  const onPointerDown = (e) => {
    // allow both HR and candidate; if you want only HR, you can guard here
    const c = canvasRef.current;
    if (!c) return;

    try { e.target.setPointerCapture?.(e.pointerId); } catch (err) {}

    const p = getCssPos(c, e);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const stroke = {
      id,
      color,
      size,
      points: [p],
    };

    currentStrokeRef.current = stroke;
    setStrokes(prev => [...(Array.isArray(prev) ? prev : []), stroke]);
    setIsDrawing(true);

    sendBufferRef.current = [p];
    startSendTimerIfNeeded(id, color, size, [p]);

    e.preventDefault?.();
  };

  const onPointerMove = (e) => {
    if (!isDrawing || !currentStrokeRef.current) return;
    const c = canvasRef.current;
    if (!c) return;
    const p = getCssPos(c, e);

    setStrokes(prev => {
      if (!Array.isArray(prev) || prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      // safety guards
      if (!last || !currentStrokeRef.current) return prev;
      if (last.id !== currentStrokeRef.current.id) return prev;

      const updatedLast = { ...last, points: [...last.points, p] };
      return [...prev.slice(0, -1), updatedLast];
    });

    sendBufferRef.current.push(p);
    e.preventDefault?.();
  };

  const onPointerUp = (e) => {
    if (!currentStrokeRef.current) {
      setIsDrawing(false);
      stopSendTimer();
      sendBufferRef.current = [];
      return;
    }

    if (sendBufferRef.current.length > 0) {
      const pts = sendBufferRef.current.splice(0, sendBufferRef.current.length);
      try {
        sendSignalingMessage && sendSignalingMessage({
          type: "whiteboard-draw",
          strokeId: currentStrokeRef.current.id,
          color: currentStrokeRef.current.color,
          size: currentStrokeRef.current.size,
          points: pts,
        });
      } catch (err) {
        console.warn("whiteboard send final failed", err);
      }
    }

    stopSendTimer();
    sendBufferRef.current = [];
    currentStrokeRef.current = null;
    setIsDrawing(false);

    try { e.target.releasePointerCapture?.(e.pointerId); } catch (err) {}
    e.preventDefault?.();
  };

  // ---- Controls ----
  const handleClear = () => {
    remoteStrokesRef.current = [];
    setStrokes([]);
    try {
      sendSignalingMessage && sendSignalingMessage({ type: "whiteboard-clear" });
    } catch (err) { console.warn(err); }
  };

  const handleUndo = () => {
    setStrokes(prev => {
      if (!Array.isArray(prev) || prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
    try {
      sendSignalingMessage && sendSignalingMessage({ type: "whiteboard-undo" });
    } catch (err) { console.warn(err); }
  };

  // ---- Thumbnails: attach srcObject only once while open to avoid play interruptions ----
  useEffect(() => {
    if (!isOpen) return;
    const lt = localThumbRef.current;
    const rt = remoteThumbRef.current;

    try {
      const localStream = localVideoRef?.current?.srcObject || null;
      const remoteStream = remoteVideoRef?.current?.srcObject || null;

      if (lt && localStream && attachedStreamsRef.current.local !== localStream) {
        lt.srcObject = localStream;
        attachedStreamsRef.current.local = localStream;
      }
      if (rt && remoteStream && attachedStreamsRef.current.remote !== remoteStream) {
        rt.srcObject = remoteStream;
        attachedStreamsRef.current.remote = remoteStream;
      }
    } catch (err) {
      // don't crash on thumb attach errors
      console.warn("thumb attach error", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, localVideoRef?.current, remoteVideoRef?.current]);

  // ESC to close
  useEffect(() => {
    const onKey = (ev) => {
      if (ev.key === "Escape" && isOpen) {
        onClose && onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // cleanup send timers on unmount/close
  useEffect(() => {
    return () => {
      if (sendTimerRef.current) {
        clearInterval(sendTimerRef.current);
        sendTimerRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-stretch"
      style={{ backdropFilter: "blur(4px)" }}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/60">
        <div className="flex items-center gap-3">
          <h3 className="text-white text-lg font-semibold">Whiteboard — Live</h3>
          <span className="text-sm text-gray-300">Collaborative</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
            <label className="text-sm text-gray-200 mr-2">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-8 h-8 p-0 border-0"
            />
            <label className="text-sm text-gray-200 ml-3 mr-2">Size</label>
            <input
              type="range"
              min="1"
              max="24"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value, 10))}
              className="w-28"
            />
          </div>

          <button onClick={handleUndo} className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-white">Undo</button>
          <button onClick={handleClear} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white">Clear</button>
          <button onClick={() => onClose && onClose()} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white">Close</button>
        </div>
      </div>

      {/* canvas area */}
      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block w-full h-full"
          style={{ touchAction: "none", cursor: isDrawing ? "crosshair" : "crosshair" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />

        {/* local thumbnail */}
        <div className="absolute left-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
          <video ref={localThumbRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">{userRole === 'hr' ? 'HR (You)' : 'You'}</div>
        </div>

        {/* remote thumbnail */}
        <div className="absolute right-4 bottom-4 w-40 h-28 bg-black/60 rounded overflow-hidden border border-gray-700">
          <video ref={remoteThumbRef} autoPlay muted={false} playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-1 left-1 bg-black/60 text-xs text-gray-200 px-2 py-0.5 rounded">{userRole === 'hr' ? 'Candidate' : 'HR'}</div>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardFullScreen;
