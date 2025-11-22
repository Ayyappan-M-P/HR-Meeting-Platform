// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { Video, VideoOff, Mic, MicOff, Share2, MessageSquare, Users, AlertTriangle, Grid3x3, Download, Trash2 } from 'lucide-react';

// // // // const MeetingRoom = () => {
// // // //   const [isVideoOn, setIsVideoOn] = useState(true);
// // // //   const [isAudioOn, setIsAudioOn] = useState(true);
// // // //   const [isSharingScreen, setIsSharingScreen] = useState(false);
// // // //   const [activeTab, setActiveTab] = useState('chat');
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [newMessage, setNewMessage] = useState('');
// // // //   const [isDrawing, setIsDrawing] = useState(false);
// // // //   const [alerts, setAlerts] = useState([]);
// // // //   const [userRole] = useState('hr'); // 'hr' or 'candidate'
// // // //   const [detections, setDetections] = useState({
// // // //     multipleFaces: false,
// // // //     tabSwitch: 0,
// // // //     mobileUsage: false
// // // //   });

// // // //   const localVideoRef = useRef(null);
// // // //   const remoteVideoRef = useRef(null);
// // // //   const canvasRef = useRef(null);
// // // //   const streamRef = useRef(null);

// // // //   // Initialize video stream
// // // //   useEffect(() => {
// // // //     const initVideo = async () => {
// // // //       try {
// // // //         const stream = await navigator.mediaDevices.getUserMedia({ 
// // // //           video: true, 
// // // //           audio: true 
// // // //         });
// // // //         if (localVideoRef.current) {
// // // //           localVideoRef.current.srcObject = stream;
// // // //         }
// // // //         streamRef.current = stream;
// // // //       } catch (err) {
// // // //         console.error('Error accessing media devices:', err);
// // // //       }
// // // //     };
// // // //     initVideo();

// // // //     return () => {
// // // //       if (streamRef.current) {
// // // //         streamRef.current.getTracks().forEach(track => track.stop());
// // // //       }
// // // //     };
// // // //   }, []);

// // // //   // Tab switch detection
// // // //   useEffect(() => {
// // // //     const handleVisibilityChange = () => {
// // // //       if (document.hidden && userRole === 'candidate') {
// // // //         const newAlert = {
// // // //           id: Date.now(),
// // // //           type: 'tab_switch',
// // // //           message: 'Candidate switched tab',
// // // //           timestamp: new Date().toLocaleTimeString()
// // // //         };
// // // //         setAlerts(prev => [...prev, newAlert]);
// // // //         setDetections(prev => ({ ...prev, tabSwitch: prev.tabSwitch + 1 }));
// // // //       }
// // // //     };

// // // //     document.addEventListener('visibilitychange', handleVisibilityChange);
// // // //     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
// // // //   }, [userRole]);

// // // //   // Whiteboard functionality
// // // //   useEffect(() => {
// // // //     const canvas = canvasRef.current;
// // // //     if (!canvas) return;

// // // //     const ctx = canvas.getContext('2d');
// // // //     ctx.lineCap = 'round';
// // // //     ctx.lineWidth = 2;
// // // //     ctx.strokeStyle = '#000';

// // // //     let drawing = false;
// // // //     let lastX = 0;
// // // //     let lastY = 0;

// // // //     const startDrawing = (e) => {
// // // //       drawing = true;
// // // //       [lastX, lastY] = [e.offsetX, e.offsetY];
// // // //     };

// // // //     const draw = (e) => {
// // // //       if (!drawing) return;
// // // //       ctx.beginPath();
// // // //       ctx.moveTo(lastX, lastY);
// // // //       ctx.lineTo(e.offsetX, e.offsetY);
// // // //       ctx.stroke();
// // // //       [lastX, lastY] = [e.offsetX, e.offsetY];
// // // //     };

// // // //     const stopDrawing = () => {
// // // //       drawing = false;
// // // //     };

// // // //     canvas.addEventListener('mousedown', startDrawing);
// // // //     canvas.addEventListener('mousemove', draw);
// // // //     canvas.addEventListener('mouseup', stopDrawing);
// // // //     canvas.addEventListener('mouseout', stopDrawing);

// // // //     return () => {
// // // //       canvas.removeEventListener('mousedown', startDrawing);
// // // //       canvas.removeEventListener('mousemove', draw);
// // // //       canvas.removeEventListener('mouseup', stopDrawing);
// // // //       canvas.removeEventListener('mouseout', stopDrawing);
// // // //     };
// // // //   }, [activeTab]);

// // // //   const toggleVideo = () => {
// // // //     if (streamRef.current) {
// // // //       const videoTrack = streamRef.current.getVideoTracks()[0];
// // // //       videoTrack.enabled = !videoTrack.enabled;
// // // //       setIsVideoOn(videoTrack.enabled);
// // // //     }
// // // //   };

// // // //   const toggleAudio = () => {
// // // //     if (streamRef.current) {
// // // //       const audioTrack = streamRef.current.getAudioTracks()[0];
// // // //       audioTrack.enabled = !audioTrack.enabled;
// // // //       setIsAudioOn(audioTrack.enabled);
// // // //     }
// // // //   };

// // // //   const startScreenShare = async () => {
// // // //     try {
// // // //       const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
// // // //         video: true 
// // // //       });
// // // //       setIsSharingScreen(true);
      
// // // //       screenStream.getVideoTracks()[0].onended = () => {
// // // //         setIsSharingScreen(false);
// // // //       };
// // // //     } catch (err) {
// // // //       console.error('Error sharing screen:', err);
// // // //     }
// // // //   };

// // // //   const sendMessage = (e) => {
// // // //     e?.preventDefault();
// // // //     if (newMessage.trim()) {
// // // //       setMessages([...messages, {
// // // //         id: Date.now(),
// // // //         sender: userRole === 'hr' ? 'HR' : 'Candidate',
// // // //         text: newMessage,
// // // //         time: new Date().toLocaleTimeString()
// // // //       }]);
// // // //       setNewMessage('');
// // // //     }
// // // //   };

// // // //   const clearWhiteboard = () => {
// // // //     const canvas = canvasRef.current;
// // // //     const ctx = canvas.getContext('2d');
// // // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // // //   };

// // // //   const downloadWhiteboard = () => {
// // // //     const canvas = canvasRef.current;
// // // //     const url = canvas.toDataURL('image/png');
// // // //     const link = document.createElement('a');
// // // //     link.download = `whiteboard-${Date.now()}.png`;
// // // //     link.href = url;
// // // //     link.click();
// // // //   };

// // // //   // Simulate face detection alert
// // // //   const simulateFaceDetection = () => {
// // // //     const newAlert = {
// // // //       id: Date.now(),
// // // //       type: 'multiple_faces',
// // // //       message: 'Multiple faces detected',
// // // //       timestamp: new Date().toLocaleTimeString()
// // // //     };
// // // //     setAlerts(prev => [...prev, newAlert]);
// // // //     setDetections(prev => ({ ...prev, multipleFaces: true }));
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-900 text-white">
// // // //       {/* Header */}
// // // //       <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
// // // //         <div className="flex items-center justify-between">
// // // //           <div>
// // // //             <h1 className="text-xl font-bold">Interview Session</h1>
// // // //             <p className="text-sm text-gray-400">Session ID: #12345</p>
// // // //           </div>
// // // //           <div className="flex items-center gap-4">
// // // //             {userRole === 'hr' && (
// // // //               <div className="flex items-center gap-2 text-sm">
// // // //                 <div className="flex items-center gap-1">
// // // //                   <AlertTriangle className="w-4 h-4 text-yellow-500" />
// // // //                   <span>Alerts: {alerts.length}</span>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //             <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium">
// // // //               End Interview
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="flex h-[calc(100vh-73px)]">
// // // //         {/* Main Video Area */}
// // // //         <div className="flex-1 flex flex-col p-4">
// // // //           {/* Videos */}
// // // //           <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
// // // //             {/* Remote Video */}
// // // //             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
// // // //               <video 
// // // //                 ref={remoteVideoRef}
// // // //                 autoPlay 
// // // //                 playsInline
// // // //                 className="w-full h-full object-cover"
// // // //               />
// // // //               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
// // // //                 {userRole === 'hr' ? 'Candidate' : 'HR Manager'}
// // // //               </div>
// // // //               {detections.multipleFaces && userRole === 'hr' && (
// // // //                 <div className="absolute top-4 right-4 bg-red-600 px-3 py-2 rounded-lg flex items-center gap-2">
// // // //                   <AlertTriangle className="w-4 h-4" />
// // // //                   <span className="text-sm">Multiple Faces</span>
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Local Video */}
// // // //             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
// // // //               <video 
// // // //                 ref={localVideoRef}
// // // //                 autoPlay 
// // // //                 playsInline 
// // // //                 muted
// // // //                 className="w-full h-full object-cover"
// // // //               />
// // // //               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
// // // //                 You ({userRole === 'hr' ? 'HR' : 'Candidate'})
// // // //               </div>
// // // //               {!isVideoOn && (
// // // //                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
// // // //                   <VideoOff className="w-12 h-12 text-gray-500" />
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Controls */}
// // // //           <div className="flex items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg">
// // // //             <button 
// // // //               onClick={toggleAudio}
// // // //               className={`p-4 rounded-full ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
// // // //             >
// // // //               {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
// // // //             </button>
            
// // // //             <button 
// // // //               onClick={toggleVideo}
// // // //               className={`p-4 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
// // // //             >
// // // //               {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
// // // //             </button>
            
// // // //             <button 
// // // //               onClick={startScreenShare}
// // // //               className={`p-4 rounded-full ${isSharingScreen ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
// // // //             >
// // // //               <Share2 className="w-6 h-6" />
// // // //             </button>

// // // //             {/* Test button for demo */}
// // // //             {userRole === 'hr' && (
// // // //               <button 
// // // //                 onClick={simulateFaceDetection}
// // // //                 className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
// // // //               >
// // // //                 Simulate Alert
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* Sidebar */}
// // // //         <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
// // // //           {/* Tabs */}
// // // //           <div className="flex border-b border-gray-700">
// // // //             <button
// // // //               onClick={() => setActiveTab('chat')}
// // // //               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// // // //                 activeTab === 'chat' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// // // //               }`}
// // // //             >
// // // //               <MessageSquare className="w-5 h-5" />
// // // //               <span>Chat</span>
// // // //             </button>
// // // //             <button
// // // //               onClick={() => setActiveTab('whiteboard')}
// // // //               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// // // //                 activeTab === 'whiteboard' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// // // //               }`}
// // // //             >
// // // //               <Grid3x3 className="w-5 h-5" />
// // // //               <span>Whiteboard</span>
// // // //             </button>
// // // //             {userRole === 'hr' && (
// // // //               <button
// // // //                 onClick={() => setActiveTab('alerts')}
// // // //                 className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// // // //                   activeTab === 'alerts' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// // // //                 }`}
// // // //               >
// // // //                 <AlertTriangle className="w-5 h-5" />
// // // //                 <span>Alerts</span>
// // // //                 {alerts.length > 0 && (
// // // //                   <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
// // // //                     {alerts.length}
// // // //                   </span>
// // // //                 )}
// // // //               </button>
// // // //             )}
// // // //           </div>

// // // //           {/* Content Area */}
// // // //           <div className="flex-1 overflow-hidden flex flex-col">
// // // //             {activeTab === 'chat' && (
// // // //               <>
// // // //                 <div className="flex-1 overflow-y-auto p-4 space-y-3">
// // // //                   {messages.map(msg => (
// // // //                     <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
// // // //                       <div className="flex items-center justify-between mb-1">
// // // //                         <span className="font-semibold text-sm">{msg.sender}</span>
// // // //                         <span className="text-xs text-gray-400">{msg.time}</span>
// // // //                       </div>
// // // //                       <p className="text-sm">{msg.text}</p>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //                 <div className="p-4 border-t border-gray-700">
// // // //                   <div className="flex gap-2">
// // // //                     <input
// // // //                       type="text"
// // // //                       value={newMessage}
// // // //                       onChange={(e) => setNewMessage(e.target.value)}
// // // //                       onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
// // // //                       placeholder="Type a message..."
// // // //                       className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
// // // //                     />
// // // //                     <button 
// // // //                       onClick={sendMessage}
// // // //                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
// // // //                     >
// // // //                       Send
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               </>
// // // //             )}

// // // //             {activeTab === 'whiteboard' && (
// // // //               <div className="flex-1 p-4 flex flex-col">
// // // //                 <div className="flex gap-2 mb-3">
// // // //                   <button
// // // //                     onClick={clearWhiteboard}
// // // //                     className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
// // // //                   >
// // // //                     <Trash2 className="w-4 h-4" />
// // // //                     Clear
// // // //                   </button>
// // // //                   <button
// // // //                     onClick={downloadWhiteboard}
// // // //                     className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
// // // //                   >
// // // //                     <Download className="w-4 h-4" />
// // // //                     Save
// // // //                   </button>
// // // //                 </div>
// // // //                 <canvas
// // // //                   ref={canvasRef}
// // // //                   width={352}
// // // //                   height={500}
// // // //                   className="bg-white rounded-lg cursor-crosshair"
// // // //                 />
// // // //               </div>
// // // //             )}

// // // //             {activeTab === 'alerts' && userRole === 'hr' && (
// // // //               <div className="flex-1 overflow-y-auto p-4">
// // // //                 <div className="space-y-3">
// // // //                   <div className="bg-gray-700 rounded-lg p-4">
// // // //                     <h3 className="font-semibold mb-3">Detection Summary</h3>
// // // //                     <div className="space-y-2 text-sm">
// // // //                       <div className="flex justify-between">
// // // //                         <span>Tab Switches:</span>
// // // //                         <span className="font-semibold">{detections.tabSwitch}</span>
// // // //                       </div>
// // // //                       <div className="flex justify-between">
// // // //                         <span>Multiple Faces:</span>
// // // //                         <span className={detections.multipleFaces ? 'text-red-400' : ''}>
// // // //                           {detections.multipleFaces ? 'Detected' : 'None'}
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>

// // // //                   {alerts.map(alert => (
// // // //                     <div key={alert.id} className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
// // // //                       <div className="flex items-start gap-2">
// // // //                         <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
// // // //                         <div className="flex-1">
// // // //                           <p className="text-sm font-medium">{alert.message}</p>
// // // //                           <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default MeetingRoom;

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Video, VideoOff, Mic, MicOff, Share2, MessageSquare, Users, AlertTriangle, Grid3x3, Download, Trash2, PhoneOff } from 'lucide-react';
// // // import webrtcService from '../services/webrtc';

// // // const MeetingRoom = ({ userRole, interviewId, candidateData, onEnd }) => {
// // //   const [isVideoOn, setIsVideoOn] = useState(true);
// // //   const [isAudioOn, setIsAudioOn] = useState(true);
// // //   const [isSharingScreen, setIsSharingScreen] = useState(false);
// // //   const [activeTab, setActiveTab] = useState('chat');
// // //   const [messages, setMessages] = useState([]);
// // //   const [newMessage, setNewMessage] = useState('');
// // //   const [alerts, setAlerts] = useState([]);
// // //   const [detections, setDetections] = useState({
// // //     multipleFaces: false,
// // //     tabSwitch: 0,
// // //     mobileUsage: false
// // //   });
// // //   const [connectionStatus, setConnectionStatus] = useState('Connecting...');
// // //   const [remoteUserName, setRemoteUserName] = useState('');

// // //   const localVideoRef = useRef(null);
// // //   const remoteVideoRef = useRef(null);
// // //   const canvasRef = useRef(null);
// // //   const signalingRef = useRef(null);

// // //   // Get user info
// // //   useEffect(() => {
// // //     const user = JSON.parse(localStorage.getItem('user') || '{}');
// // //     if (userRole === 'hr') {
// // //       const admitted = JSON.parse(localStorage.getItem('admittedCandidate') || '{}');
// // //       setRemoteUserName(admitted.candidateName || candidateData?.candidate?.name || 'Candidate');
// // //     } else {
// // //       setRemoteUserName(candidateData?.hrName || 'HR Manager');
// // //     }
// // //   }, [userRole, candidateData]);

// // //   // Initialize WebRTC and Signaling
// // //   useEffect(() => {
// // //     initializeConnection();

// // //     return () => {
// // //       cleanup();
// // //     };
// // //   }, []);

// // //   const initializeConnection = async () => {
// // //     try {
// // //       // Initialize local video
// // //       await webrtcService.initLocalStream(localVideoRef.current);
      
// // //       // Connect to signaling server (WebSocket)
// // //       connectSignaling();
      
// // //       // Setup message handler
// // //       webrtcService.onMessageReceived = handleRemoteMessage;
      
// // //       setConnectionStatus('Connected');
// // //     } catch (error) {
// // //       console.error('Failed to initialize:', error);
// // //       setConnectionStatus('Connection Failed');
// // //     }
// // //   };

// // //   const connectSignaling = () => {
// // //     // Connect to WebSocket signaling server
// // //     const wsUrl = `ws://localhost:5196/ws/signaling?interviewId=${interviewId}&role=${userRole}`;
// // //     signalingRef.current = new WebSocket(wsUrl);

// // //     signalingRef.current.onopen = () => {
// // //       console.log('Signaling connected');
      
// // //       // Create peer connection
// // //       webrtcService.createPeerConnection(
// // //         (candidate) => sendSignal({ type: 'ice-candidate', candidate }),
// // //         (stream) => {
// // //           if (remoteVideoRef.current) {
// // //             remoteVideoRef.current.srcObject = stream;
// // //           }
// // //         }
// // //       );

// // //       // If HR, create and send offer
// // //       if (userRole === 'hr') {
// // //         createOffer();
// // //       }
// // //     };

// // //     signalingRef.current.onmessage = async (event) => {
// // //       const signal = JSON.parse(event.data);
// // //       await handleSignal(signal);
// // //     };

// // //     signalingRef.current.onerror = (error) => {
// // //       console.error('Signaling error:', error);
// // //       setConnectionStatus('Signaling Error');
// // //     };

// // //     signalingRef.current.onclose = () => {
// // //       console.log('Signaling closed');
// // //       setConnectionStatus('Disconnected');
// // //     };
// // //   };

// // //   const createOffer = async () => {
// // //     try {
// // //       const offer = await webrtcService.createOffer();
// // //       sendSignal({ type: 'offer', offer });
// // //     } catch (error) {
// // //       console.error('Failed to create offer:', error);
// // //     }
// // //   };

// // //   const handleSignal = async (signal) => {
// // //     try {
// // //       switch (signal.type) {
// // //         case 'offer':
// // //           await webrtcService.setRemoteDescription(signal.offer);
// // //           const answer = await webrtcService.createAnswer();
// // //           sendSignal({ type: 'answer', answer });
// // //           break;

// // //         case 'answer':
// // //           await webrtcService.setRemoteDescription(signal.answer);
// // //           break;

// // //         case 'ice-candidate':
// // //           if (signal.candidate) {
// // //             await webrtcService.addIceCandidate(signal.candidate);
// // //           }
// // //           break;

// // //         case 'chat-message':
// // //           setMessages(prev => [...prev, {
// // //             id: Date.now(),
// // //             sender: signal.senderRole === 'hr' ? 'HR' : 'Candidate',
// // //             text: signal.message,
// // //             time: new Date().toLocaleTimeString()
// // //           }]);
// // //           break;

// // //         case 'proctoring-alert':
// // //           if (userRole === 'hr') {
// // //             const newAlert = {
// // //               id: Date.now(),
// // //               type: signal.alertType,
// // //               message: signal.message,
// // //               timestamp: new Date().toLocaleTimeString()
// // //             };
// // //             setAlerts(prev => [...prev, newAlert]);
            
// // //             if (signal.alertType === 'multiple_faces') {
// // //               setDetections(prev => ({ ...prev, multipleFaces: true }));
// // //             } else if (signal.alertType === 'tab_switch') {
// // //               setDetections(prev => ({ ...prev, tabSwitch: prev.tabSwitch + 1 }));
// // //             }
// // //           }
// // //           break;

// // //         default:
// // //           console.log('Unknown signal type:', signal.type);
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to handle signal:', error);
// // //     }
// // //   };

// // //   const sendSignal = (signal) => {
// // //     if (signalingRef.current && signalingRef.current.readyState === WebSocket.OPEN) {
// // //       signalingRef.current.send(JSON.stringify({
// // //         ...signal,
// // //         interviewId,
// // //         senderRole: userRole
// // //       }));
// // //     }
// // //   };

// // //   // Tab switch detection (candidate only)
// // //   useEffect(() => {
// // //     if (userRole !== 'candidate') return;

// // //     const handleVisibilityChange = () => {
// // //       if (document.hidden) {
// // //         sendSignal({
// // //           type: 'proctoring-alert',
// // //           alertType: 'tab_switch',
// // //           message: 'Candidate switched tab'
// // //         });
// // //       }
// // //     };

// // //     document.addEventListener('visibilitychange', handleVisibilityChange);
// // //     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
// // //   }, [userRole]);

// // //   // Whiteboard functionality
// // //   useEffect(() => {
// // //     const canvas = canvasRef.current;
// // //     if (!canvas) return;

// // //     const ctx = canvas.getContext('2d');
// // //     ctx.lineCap = 'round';
// // //     ctx.lineWidth = 2;
// // //     ctx.strokeStyle = '#000';

// // //     let drawing = false;
// // //     let lastX = 0;
// // //     let lastY = 0;

// // //     const startDrawing = (e) => {
// // //       drawing = true;
// // //       [lastX, lastY] = [e.offsetX, e.offsetY];
// // //     };

// // //     const draw = (e) => {
// // //       if (!drawing) return;
// // //       ctx.beginPath();
// // //       ctx.moveTo(lastX, lastY);
// // //       ctx.lineTo(e.offsetX, e.offsetY);
// // //       ctx.stroke();
// // //       [lastX, lastY] = [e.offsetX, e.offsetY];
// // //     };

// // //     const stopDrawing = () => {
// // //       drawing = false;
// // //     };

// // //     canvas.addEventListener('mousedown', startDrawing);
// // //     canvas.addEventListener('mousemove', draw);
// // //     canvas.addEventListener('mouseup', stopDrawing);
// // //     canvas.addEventListener('mouseout', stopDrawing);

// // //     return () => {
// // //       canvas.removeEventListener('mousedown', startDrawing);
// // //       canvas.removeEventListener('mousemove', draw);
// // //       canvas.removeEventListener('mouseup', stopDrawing);
// // //       canvas.removeEventListener('mouseout', stopDrawing);
// // //     };
// // //   }, [activeTab]);

// // //   const toggleVideo = () => {
// // //     const enabled = webrtcService.toggleVideo(!isVideoOn);
// // //     setIsVideoOn(enabled);
// // //   };

// // //   const toggleAudio = () => {
// // //     const enabled = webrtcService.toggleAudio(!isAudioOn);
// // //     setIsAudioOn(enabled);
// // //   };

// // //   const startScreenShare = async () => {
// // //     try {
// // //       if (isSharingScreen) {
// // //         webrtcService.stopScreenShare();
// // //         setIsSharingScreen(false);
// // //       } else {
// // //         const screenStream = await webrtcService.startScreenShare();
// // //         setIsSharingScreen(true);
        
// // //         screenStream.getVideoTracks()[0].onended = () => {
// // //           setIsSharingScreen(false);
// // //           webrtcService.stopScreenShare();
// // //         };
// // //       }
// // //     } catch (error) {
// // //       console.error('Error with screen share:', error);
// // //       alert('Failed to share screen. Please ensure you granted permission.');
// // //     }
// // //   };

// // //   const sendMessage = (e) => {
// // //     e?.preventDefault();
// // //     if (newMessage.trim()) {
// // //       const message = {
// // //         id: Date.now(),
// // //         sender: userRole === 'hr' ? 'HR' : 'Candidate',
// // //         text: newMessage,
// // //         time: new Date().toLocaleTimeString()
// // //       };
      
// // //       setMessages(prev => [...prev, message]);
      
// // //       // Send to remote peer via signaling
// // //       sendSignal({
// // //         type: 'chat-message',
// // //         message: newMessage
// // //       });
      
// // //       setNewMessage('');
// // //     }
// // //   };

// // //   const handleRemoteMessage = (message) => {
// // //     // Handle messages from data channel if needed
// // //     console.log('Received remote message:', message);
// // //   };

// // //   const clearWhiteboard = () => {
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext('2d');
// // //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //   };

// // //   const downloadWhiteboard = () => {
// // //     const canvas = canvasRef.current;
// // //     const url = canvas.toDataURL('image/png');
// // //     const link = document.createElement('a');
// // //     link.download = `whiteboard-${Date.now()}.png`;
// // //     link.href = url;
// // //     link.click();
// // //   };

// // //   const simulateFaceDetection = () => {
// // //     const newAlert = {
// // //       id: Date.now(),
// // //       type: 'multiple_faces',
// // //       message: 'Multiple faces detected',
// // //       timestamp: new Date().toLocaleTimeString()
// // //     };
// // //     setAlerts(prev => [...prev, newAlert]);
// // //     setDetections(prev => ({ ...prev, multipleFaces: true }));
// // //   };

// // //   const handleEndInterview = async () => {
// // //     if (confirm('Are you sure you want to end this interview?')) {
// // //       await cleanup();
// // //       if (onEnd) {
// // //         onEnd();
// // //       }
// // //     }
// // //   };

// // //   const cleanup = async () => {
// // //     // Close WebSocket
// // //     if (signalingRef.current) {
// // //       signalingRef.current.close();
// // //     }
    
// // //     // Close WebRTC
// // //     webrtcService.close();
    
// // //     // Update interview status
// // //     if (userRole === 'hr') {
// // //       try {
// // //         const token = localStorage.getItem('token');
// // //         await fetch(`http://localhost:5196/api/hr/interviews/${interviewId}/complete`, {
// // //           method: 'PUT',
// // //           headers: {
// // //             'Authorization': `Bearer ${token}`,
// // //             'Content-Type': 'application/json'
// // //           }
// // //         });
// // //       } catch (error) {
// // //         console.error('Failed to update interview status:', error);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-900 text-white">
// // //       {/* Header */}
// // //       <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
// // //         <div className="flex items-center justify-between">
// // //           <div>
// // //             <h1 className="text-xl font-bold">Interview Session</h1>
// // //             <p className="text-sm text-gray-400">
// // //               Session ID: #{interviewId} • {connectionStatus}
// // //             </p>
// // //           </div>
// // //           <div className="flex items-center gap-4">
// // //             {userRole === 'hr' && (
// // //               <div className="flex items-center gap-2 text-sm">
// // //                 <div className="flex items-center gap-1">
// // //                   <AlertTriangle className="w-4 h-4 text-yellow-500" />
// // //                   <span>Alerts: {alerts.length}</span>
// // //                 </div>
// // //               </div>
// // //             )}
// // //             <button 
// // //               onClick={handleEndInterview}
// // //               className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium flex items-center gap-2"
// // //             >
// // //               <PhoneOff className="w-4 h-4" />
// // //               End Interview
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="flex h-[calc(100vh-73px)]">
// // //         {/* Main Video Area */}
// // //         <div className="flex-1 flex flex-col p-4">
// // //           {/* Videos */}
// // //           <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
// // //             {/* Remote Video */}
// // //             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
// // //               <video 
// // //                 ref={remoteVideoRef}
// // //                 autoPlay 
// // //                 playsInline
// // //                 className="w-full h-full object-cover"
// // //               />
// // //               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
// // //                 {remoteUserName}
// // //               </div>
// // //               {detections.multipleFaces && userRole === 'hr' && (
// // //                 <div className="absolute top-4 right-4 bg-red-600 px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
// // //                   <AlertTriangle className="w-4 h-4" />
// // //                   <span className="text-sm">Multiple Faces</span>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Local Video */}
// // //             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
// // //               <video 
// // //                 ref={localVideoRef}
// // //                 autoPlay 
// // //                 playsInline 
// // //                 muted
// // //                 className="w-full h-full object-cover"
// // //               />
// // //               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
// // //                 You ({userRole === 'hr' ? 'HR' : 'Candidate'})
// // //               </div>
// // //               {!isVideoOn && (
// // //                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
// // //                   <VideoOff className="w-12 h-12 text-gray-500" />
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Controls */}
// // //           <div className="flex items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg">
// // //             <button 
// // //               onClick={toggleAudio}
// // //               className={`p-4 rounded-full ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
// // //               title={isAudioOn ? 'Mute' : 'Unmute'}
// // //             >
// // //               {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
// // //             </button>
            
// // //             <button 
// // //               onClick={toggleVideo}
// // //               className={`p-4 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
// // //               title={isVideoOn ? 'Stop Video' : 'Start Video'}
// // //             >
// // //               {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
// // //             </button>
            
// // //             <button 
// // //               onClick={startScreenShare}
// // //               className={`p-4 rounded-full ${isSharingScreen ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
// // //               title={isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
// // //             >
// // //               <Share2 className="w-6 h-6" />
// // //             </button>

// // //             {/* Demo Alert Button (HR only) */}
// // //             {userRole === 'hr' && (
// // //               <button 
// // //                 onClick={simulateFaceDetection}
// // //                 className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
// // //               >
// // //                 Simulate Alert
// // //               </button>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Sidebar */}
// // //         <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
// // //           {/* Tabs */}
// // //           <div className="flex border-b border-gray-700">
// // //             <button
// // //               onClick={() => setActiveTab('chat')}
// // //               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// // //                 activeTab === 'chat' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// // //               }`}
// // //             >
// // //               <MessageSquare className="w-5 h-5" />
// // //               <span>Chat</span>
// // //             </button>
// // //             <button
// // //               onClick={() => setActiveTab('whiteboard')}
// // //               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// // //                 activeTab === 'whiteboard' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// // //               }`}
// // //             >
// // //               <Grid3x3 className="w-5 h-5" />
// // //               <span>Whiteboard</span>
// // //             </button>
// // //             {userRole === 'hr' && (
// // //               <button
// // //                 onClick={() => setActiveTab('alerts')}
// // //                 className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// // //                   activeTab === 'alerts' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// // //                 }`}
// // //               >
// // //                 <AlertTriangle className="w-5 h-5" />
// // //                 <span>Alerts</span>
// // //                 {alerts.length > 0 && (
// // //                   <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
// // //                     {alerts.length}
// // //                   </span>
// // //                 )}
// // //               </button>
// // //             )}
// // //           </div>

// // //           {/* Content Area */}
// // //           <div className="flex-1 overflow-hidden flex flex-col">
// // //             {activeTab === 'chat' && (
// // //               <>
// // //                 <div className="flex-1 overflow-y-auto p-4 space-y-3">
// // //                   {messages.map(msg => (
// // //                     <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
// // //                       <div className="flex items-center justify-between mb-1">
// // //                         <span className="font-semibold text-sm">{msg.sender}</span>
// // //                         <span className="text-xs text-gray-400">{msg.time}</span>
// // //                       </div>
// // //                       <p className="text-sm">{msg.text}</p>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //                 <div className="p-4 border-t border-gray-700">
// // //                   <div className="flex gap-2">
// // //                     <input
// // //                       type="text"
// // //                       value={newMessage}
// // //                       onChange={(e) => setNewMessage(e.target.value)}
// // //                       onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
// // //                       placeholder="Type a message..."
// // //                       className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
// // //                     />
// // //                     <button 
// // //                       onClick={sendMessage}
// // //                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
// // //                     >
// // //                       Send
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </>
// // //             )}

// // //             {activeTab === 'whiteboard' && (
// // //               <div className="flex-1 p-4 flex flex-col">
// // //                 <div className="flex gap-2 mb-3">
// // //                   <button
// // //                     onClick={clearWhiteboard}
// // //                     className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
// // //                   >
// // //                     <Trash2 className="w-4 h-4" />
// // //                     Clear
// // //                   </button>
// // //                   <button
// // //                     onClick={downloadWhiteboard}
// // //                     className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
// // //                   >
// // //                     <Download className="w-4 h-4" />
// // //                     Save
// // //                   </button>
// // //                 </div>
// // //                 <canvas
// // //                   ref={canvasRef}
// // //                   width={352}
// // //                   height={500}
// // //                   className="bg-white rounded-lg cursor-crosshair"
// // //                 />
// // //               </div>
// // //             )}

// // //             {activeTab === 'alerts' && userRole === 'hr' && (
// // //               <div className="flex-1 overflow-y-auto p-4">
// // //                 <div className="space-y-3">
// // //                   <div className="bg-gray-700 rounded-lg p-4">
// // //                     <h3 className="font-semibold mb-3">Detection Summary</h3>
// // //                     <div className="space-y-2 text-sm">
// // //                       <div className="flex justify-between">
// // //                         <span>Tab Switches:</span>
// // //                         <span className="font-semibold">{detections.tabSwitch}</span>
// // //                       </div>
// // //                       <div className="flex justify-between">
// // //                         <span>Multiple Faces:</span>
// // //                         <span className={detections.multipleFaces ? 'text-red-400' : ''}>
// // //                           {detections.multipleFaces ? 'Detected' : 'None'}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   {alerts.map(alert => (
// // //                     <div key={alert.id} className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
// // //                       <div className="flex items-start gap-2">
// // //                         <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
// // //                         <div className="flex-1">
// // //                           <p className="text-sm font-medium">{alert.message}</p>
// // //                           <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default MeetingRoom;



// // import React, { useState, useEffect, useRef } from 'react';
// // import { Video, VideoOff, Mic, MicOff, Share2, MessageSquare, Users, AlertTriangle, Grid3x3, Download, Trash2, PhoneOff } from 'lucide-react';

// // const MeetingRoom = ({ userRole, interviewId, candidateData, onEnd }) => {
// //   const [isVideoOn, setIsVideoOn] = useState(true);
// //   const [isAudioOn, setIsAudioOn] = useState(true);
// //   const [isSharingScreen, setIsSharingScreen] = useState(false);
// //   const [activeTab, setActiveTab] = useState('chat');
// //   const [messages, setMessages] = useState([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const [alerts, setAlerts] = useState([]);
// //   const [detections, setDetections] = useState({
// //     multipleFaces: false,
// //     tabSwitch: 0,
// //     mobileUsage: false
// //   });
// //   const [connectionStatus, setConnectionStatus] = useState('Connecting...');
// //   const [remoteUserName, setRemoteUserName] = useState('');

// //   const localVideoRef = useRef(null);
// //   const remoteVideoRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const wsRef = useRef(null);
// //   const pcRef = useRef(null);
// //   const localStreamRef = useRef(null);
// //   const iceCandidatesQueue = useRef([]);

// //   // Get user info
// //   useEffect(() => {
// //     if (userRole === 'hr') {
// //       const admitted = JSON.parse(localStorage.getItem('admittedCandidate') || '{}');
// //       setRemoteUserName(admitted.candidateName || candidateData?.candidate?.name || 'Candidate');
// //     } else {
// //       setRemoteUserName(candidateData?.hrName || 'HR Manager');
// //     }
// //   }, [userRole, candidateData]);

// //   // Initialize connection
// //   useEffect(() => {
// //     initializeConnection();

// //     return () => {
// //       cleanup();
// //     };
// //   }, []);

// //   const initializeConnection = async () => {
// //     try {
// //       console.log('[MeetingRoom] Initializing connection...');
      
// //       // Get local media
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { width: 1280, height: 720 },
// //         audio: true
// //       });
      
// //       localStreamRef.current = stream;
// //       if (localVideoRef.current) {
// //         localVideoRef.current.srcObject = stream;
// //       }
      
// //       console.log('[MeetingRoom] Local stream initialized');
      
// //       // Connect to signaling server
// //       connectWebSocket();
      
// //       setConnectionStatus('Connected');
// //     } catch (error) {
// //       console.error('[MeetingRoom] Failed to initialize:', error);
// //       setConnectionStatus('Connection Failed');
// //       alert('Failed to access camera/microphone. Please check permissions.');
// //     }
// //   };

// //   const connectWebSocket = () => {
// //     const wsUrl = `ws://localhost:5196/ws/signaling?interviewId=${interviewId}&role=${userRole}`;
// //     console.log('[WebSocket] Connecting to:', wsUrl);
    
// //     wsRef.current = new WebSocket(wsUrl);

// //     wsRef.current.onopen = () => {
// //       console.log('[WebSocket] Connected');
// //       setConnectionStatus('Connected');
      
// //       // Create peer connection
// //       createPeerConnection();
      
// //       // If HR, create offer immediately
// //       if (userRole === 'hr') {
// //         setTimeout(() => createOffer(), 1000);
// //       }
// //     };

// //     wsRef.current.onmessage = async (event) => {
// //       try {
// //         const signal = JSON.parse(event.data);
// //         console.log('[WebSocket] Received signal:', signal.type);
// //         await handleSignal(signal);
// //       } catch (error) {
// //         console.error('[WebSocket] Error handling message:', error);
// //       }
// //     };

// //     wsRef.current.onerror = (error) => {
// //       console.error('[WebSocket] Error:', error);
// //       setConnectionStatus('Connection Error');
// //     };

// //     wsRef.current.onclose = () => {
// //       console.log('[WebSocket] Disconnected');
// //       setConnectionStatus('Disconnected');
// //     };
// //   };

// //   const createPeerConnection = () => {
// //     console.log('[WebRTC] Creating peer connection');
    
// //     const configuration = {
// //       iceServers: [
// //         { urls: 'stun:stun.l.google.com:19302' },
// //         { urls: 'stun:stun1.l.google.com:19302' }
// //       ]
// //     };

// //     pcRef.current = new RTCPeerConnection(configuration);

// //     // Add local tracks
// //     if (localStreamRef.current) {
// //       localStreamRef.current.getTracks().forEach(track => {
// //         pcRef.current.addTrack(track, localStreamRef.current);
// //         console.log('[WebRTC] Added local track:', track.kind);
// //       });
// //     }

// //     // Handle ICE candidates
// //     pcRef.current.onicecandidate = (event) => {
// //       if (event.candidate) {
// //         console.log('[WebRTC] Sending ICE candidate');
// //         sendSignal({
// //           type: 'ice-candidate',
// //           candidate: event.candidate
// //         });
// //       }
// //     };

// //     // Handle remote tracks
// //     pcRef.current.ontrack = (event) => {
// //       console.log('[WebRTC] Received remote track:', event.track.kind);
      
// //       if (remoteVideoRef.current) {
// //         if (!remoteVideoRef.current.srcObject) {
// //           remoteVideoRef.current.srcObject = new MediaStream();
// //         }
// //         remoteVideoRef.current.srcObject.addTrack(event.track);
// //       }
// //     };

// //     // Connection state changes
// //     pcRef.current.onconnectionstatechange = () => {
// //       console.log('[WebRTC] Connection state:', pcRef.current.connectionState);
// //       setConnectionStatus(pcRef.current.connectionState);
// //     };

// //     pcRef.current.oniceconnectionstatechange = () => {
// //       console.log('[WebRTC] ICE connection state:', pcRef.current.iceConnectionState);
// //     };
// //   };

// //   const createOffer = async () => {
// //     try {
// //       console.log('[WebRTC] Creating offer...');
// //       const offer = await pcRef.current.createOffer();
// //       await pcRef.current.setLocalDescription(offer);
      
// //       sendSignal({
// //         type: 'offer',
// //         offer: offer
// //       });
      
// //       console.log('[WebRTC] Offer sent');
// //     } catch (error) {
// //       console.error('[WebRTC] Failed to create offer:', error);
// //     }
// //   };

// //   const handleSignal = async (signal) => {
// //     try {
// //       if (!pcRef.current) {
// //         console.warn('[WebRTC] Peer connection not ready, queuing signal');
// //         return;
// //       }

// //       switch (signal.type) {
// //         case 'offer':
// //           console.log('[WebRTC] Received offer');
// //           await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.offer));
          
// //           // Process queued ICE candidates
// //           while (iceCandidatesQueue.current.length > 0) {
// //             const candidate = iceCandidatesQueue.current.shift();
// //             await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
// //           }
          
// //           const answer = await pcRef.current.createAnswer();
// //           await pcRef.current.setLocalDescription(answer);
          
// //           sendSignal({
// //             type: 'answer',
// //             answer: answer
// //           });
          
// //           console.log('[WebRTC] Answer sent');
// //           break;

// //         case 'answer':
// //           console.log('[WebRTC] Received answer');
// //           await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal.answer));
          
// //           // Process queued ICE candidates
// //           while (iceCandidatesQueue.current.length > 0) {
// //             const candidate = iceCandidatesQueue.current.shift();
// //             await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
// //           }
// //           break;

// //         case 'ice-candidate':
// //           if (signal.candidate) {
// //             console.log('[WebRTC] Received ICE candidate');
            
// //             if (pcRef.current.remoteDescription) {
// //               await pcRef.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
// //             } else {
// //               iceCandidatesQueue.current.push(signal.candidate);
// //             }
// //           }
// //           break;

// //         case 'chat-message':
// //           console.log('[Chat] Received message from', signal.senderRole);
// //           setMessages(prev => [...prev, {
// //             id: Date.now(),
// //             sender: signal.senderRole === 'hr' ? 'HR' : 'Candidate',
// //             text: signal.message,
// //             time: new Date().toLocaleTimeString()
// //           }]);
// //           break;

// //         case 'proctoring-alert':
// //           if (userRole === 'hr') {
// //             console.log('[Proctoring] Alert:', signal.alertType);
// //             const newAlert = {
// //               id: Date.now(),
// //               type: signal.alertType,
// //               message: signal.message,
// //               timestamp: new Date().toLocaleTimeString()
// //             };
// //             setAlerts(prev => [...prev, newAlert]);
            
// //             if (signal.alertType === 'multiple_faces') {
// //               setDetections(prev => ({ ...prev, multipleFaces: true }));
// //             } else if (signal.alertType === 'tab_switch') {
// //               setDetections(prev => ({ ...prev, tabSwitch: prev.tabSwitch + 1 }));
// //             }
// //           }
// //           break;

// //         default:
// //           console.log('[WebSocket] Unknown signal type:', signal.type);
// //       }
// //     } catch (error) {
// //       console.error('[WebRTC] Error handling signal:', error);
// //     }
// //   };

// //   const sendSignal = (signal) => {
// //     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
// //       const message = JSON.stringify({
// //         ...signal,
// //         interviewId,
// //         senderRole: userRole
// //       });
// //       wsRef.current.send(message);
// //       console.log('[WebSocket] Sent signal:', signal.type);
// //     } else {
// //       console.error('[WebSocket] Not connected, cannot send signal');
// //     }
// //   };

// //   // Tab switch detection (candidate only)
// //   useEffect(() => {
// //     if (userRole !== 'candidate') return;

// //     const handleVisibilityChange = () => {
// //       if (document.hidden) {
// //         console.log('[Proctoring] Tab switch detected');
// //         sendSignal({
// //           type: 'proctoring-alert',
// //           alertType: 'tab_switch',
// //           message: 'Candidate switched tab'
// //         });
// //       }
// //     };

// //     document.addEventListener('visibilitychange', handleVisibilityChange);
// //     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
// //   }, [userRole]);

// //   // Whiteboard functionality
// //   useEffect(() => {
// //     const canvas = canvasRef.current;
// //     if (!canvas) return;

// //     const ctx = canvas.getContext('2d');
// //     ctx.lineCap = 'round';
// //     ctx.lineWidth = 2;
// //     ctx.strokeStyle = '#000';

// //     let drawing = false;
// //     let lastX = 0;
// //     let lastY = 0;

// //     const startDrawing = (e) => {
// //       drawing = true;
// //       [lastX, lastY] = [e.offsetX, e.offsetY];
// //     };

// //     const draw = (e) => {
// //       if (!drawing) return;
// //       ctx.beginPath();
// //       ctx.moveTo(lastX, lastY);
// //       ctx.lineTo(e.offsetX, e.offsetY);
// //       ctx.stroke();
// //       [lastX, lastY] = [e.offsetX, e.offsetY];
// //     };

// //     const stopDrawing = () => {
// //       drawing = false;
// //     };

// //     canvas.addEventListener('mousedown', startDrawing);
// //     canvas.addEventListener('mousemove', draw);
// //     canvas.addEventListener('mouseup', stopDrawing);
// //     canvas.addEventListener('mouseout', stopDrawing);

// //     return () => {
// //       canvas.removeEventListener('mousedown', startDrawing);
// //       canvas.removeEventListener('mousemove', draw);
// //       canvas.removeEventListener('mouseup', stopDrawing);
// //       canvas.removeEventListener('mouseout', stopDrawing);
// //     };
// //   }, [activeTab]);

// //   const toggleVideo = () => {
// //     if (localStreamRef.current) {
// //       const videoTrack = localStreamRef.current.getVideoTracks()[0];
// //       videoTrack.enabled = !videoTrack.enabled;
// //       setIsVideoOn(videoTrack.enabled);
// //     }
// //   };

// //   const toggleAudio = () => {
// //     if (localStreamRef.current) {
// //       const audioTrack = localStreamRef.current.getAudioTracks()[0];
// //       audioTrack.enabled = !audioTrack.enabled;
// //       setIsAudioOn(audioTrack.enabled);
// //     }
// //   };

// //   const startScreenShare = async () => {
// //     try {
// //       if (isSharingScreen) {
// //         // Stop screen sharing
// //         if (localStreamRef.current) {
// //           const videoTrack = localStreamRef.current.getVideoTracks()[0];
// //           const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
// //           if (sender && videoTrack) {
// //             await sender.replaceTrack(videoTrack);
// //             setIsSharingScreen(false);
// //             console.log('[ScreenShare] Stopped');
// //           }
// //         }
// //       } else {
// //         // Start screen sharing
// //         const screenStream = await navigator.mediaDevices.getDisplayMedia({
// //           video: { cursor: 'always' },
// //           audio: false
// //         });

// //         const screenTrack = screenStream.getVideoTracks()[0];
// //         const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
        
// //         if (sender) {
// //           await sender.replaceTrack(screenTrack);
// //           setIsSharingScreen(true);
// //           console.log('[ScreenShare] Started');

// //           screenTrack.onended = () => {
// //             if (localStreamRef.current) {
// //               const videoTrack = localStreamRef.current.getVideoTracks()[0];
// //               sender.replaceTrack(videoTrack);
// //               setIsSharingScreen(false);
// //               console.log('[ScreenShare] Stopped (user ended)');
// //             }
// //           };
// //         }
// //       }
// //     } catch (error) {
// //       console.error('[ScreenShare] Error:', error);
// //       alert('Failed to share screen. Please try again.');
// //     }
// //   };

// //   const sendMessage = (e) => {
// //     e?.preventDefault();
// //     if (newMessage.trim()) {
// //       const message = {
// //         id: Date.now(),
// //         sender: userRole === 'hr' ? 'HR' : 'Candidate',
// //         text: newMessage,
// //         time: new Date().toLocaleTimeString()
// //       };
      
// //       setMessages(prev => [...prev, message]);
      
// //       sendSignal({
// //         type: 'chat-message',
// //         message: newMessage
// //       });
      
// //       setNewMessage('');
// //     }
// //   };

// //   const clearWhiteboard = () => {
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext('2d');
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //   };

// //   const downloadWhiteboard = () => {
// //     const canvas = canvasRef.current;
// //     const url = canvas.toDataURL('image/png');
// //     const link = document.createElement('a');
// //     link.download = `whiteboard-${Date.now()}.png`;
// //     link.href = url;
// //     link.click();
// //   };

// //   const simulateFaceDetection = () => {
// //     const newAlert = {
// //       id: Date.now(),
// //       type: 'multiple_faces',
// //       message: 'Multiple faces detected',
// //       timestamp: new Date().toLocaleTimeString()
// //     };
// //     setAlerts(prev => [...prev, newAlert]);
// //     setDetections(prev => ({ ...prev, multipleFaces: true }));
// //   };

// //   const handleEndInterview = async () => {
// //     if (confirm('Are you sure you want to end this interview?')) {
// //       await cleanup();
// //       if (onEnd) {
// //         onEnd();
// //       }
// //     }
// //   };

// //   const cleanup = async () => {
// //     console.log('[MeetingRoom] Cleaning up...');
    
// //     // Close WebSocket
// //     if (wsRef.current) {
// //       wsRef.current.close();
// //       wsRef.current = null;
// //     }
    
// //     // Close peer connection
// //     if (pcRef.current) {
// //       pcRef.current.close();
// //       pcRef.current = null;
// //     }
    
// //     // Stop local stream
// //     if (localStreamRef.current) {
// //       localStreamRef.current.getTracks().forEach(track => track.stop());
// //       localStreamRef.current = null;
// //     }
    
// //     // Update interview status
// //     if (userRole === 'hr') {
// //       try {
// //         const token = localStorage.getItem('token');
// //         await fetch(`http://localhost:5196/api/hr/interviews/${interviewId}/complete`, {
// //           method: 'PUT',
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json'
// //           }
// //         });
// //       } catch (error) {
// //         console.error('[Cleanup] Failed to update interview status:', error);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white">
// //       {/* Header */}
// //       <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h1 className="text-xl font-bold">Interview Session</h1>
// //             <p className="text-sm text-gray-400">
// //               Session ID: #{interviewId} • {connectionStatus}
// //             </p>
// //           </div>
// //           <div className="flex items-center gap-4">
// //             {userRole === 'hr' && (
// //               <div className="flex items-center gap-2 text-sm">
// //                 <div className="flex items-center gap-1">
// //                   <AlertTriangle className="w-4 h-4 text-yellow-500" />
// //                   <span>Alerts: {alerts.length}</span>
// //                 </div>
// //               </div>
// //             )}
// //             <button 
// //               onClick={handleEndInterview}
// //               className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium flex items-center gap-2"
// //             >
// //               <PhoneOff className="w-4 h-4" />
// //               End Interview
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="flex h-[calc(100vh-73px)]">
// //         {/* Main Video Area */}
// //         <div className="flex-1 flex flex-col p-4">
// //           {/* Videos */}
// //           <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
// //             {/* Remote Video */}
// //             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
// //               <video 
// //                 ref={remoteVideoRef}
// //                 autoPlay 
// //                 playsInline
// //                 className="w-full h-full object-cover"
// //               />
// //               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
// //                 {remoteUserName}
// //               </div>
// //               {detections.multipleFaces && userRole === 'hr' && (
// //                 <div className="absolute top-4 right-4 bg-red-600 px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
// //                   <AlertTriangle className="w-4 h-4" />
// //                   <span className="text-sm">Multiple Faces</span>
// //                 </div>
// //               )}
// //               {!remoteVideoRef.current?.srcObject && (
// //                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
// //                   <div className="text-center">
// //                     <Users className="w-16 h-16 text-gray-600 mx-auto mb-2" />
// //                     <p className="text-gray-500">Waiting for {remoteUserName}...</p>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Local Video */}
// //             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
// //               <video 
// //                 ref={localVideoRef}
// //                 autoPlay 
// //                 playsInline 
// //                 muted
// //                 className="w-full h-full object-cover"
// //               />
// //               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
// //                 You ({userRole === 'hr' ? 'HR' : 'Candidate'})
// //               </div>
// //               {!isVideoOn && (
// //                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
// //                   <VideoOff className="w-12 h-12 text-gray-500" />
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Controls */}
// //           <div className="flex items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg">
// //             <button 
// //               onClick={toggleAudio}
// //               className={`p-4 rounded-full ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
// //               title={isAudioOn ? 'Mute' : 'Unmute'}
// //             >
// //               {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
// //             </button>
            
// //             <button 
// //               onClick={toggleVideo}
// //               className={`p-4 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
// //               title={isVideoOn ? 'Stop Video' : 'Start Video'}
// //             >
// //               {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
// //             </button>
            
// //             <button 
// //               onClick={startScreenShare}
// //               className={`p-4 rounded-full ${isSharingScreen ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
// //               title={isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
// //             >
// //               <Share2 className="w-6 h-6" />
// //             </button>

// //             {userRole === 'hr' && (
// //               <button 
// //                 onClick={simulateFaceDetection}
// //                 className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
// //               >
// //                 Simulate Alert
// //               </button>
// //             )}
// //           </div>
// //         </div>

// //         {/* Sidebar */}
// //         <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
// //           {/* Tabs */}
// //           <div className="flex border-b border-gray-700">
// //             <button
// //               onClick={() => setActiveTab('chat')}
// //               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// //                 activeTab === 'chat' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// //               }`}
// //             >
// //               <MessageSquare className="w-5 h-5" />
// //               <span>Chat</span>
// //             </button>
// //             <button
// //               onClick={() => setActiveTab('whiteboard')}
// //               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// //                 activeTab === 'whiteboard' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// //               }`}
// //             >
// //               <Grid3x3 className="w-5 h-5" />
// //               <span>Whiteboard</span>
// //             </button>
// //             {userRole === 'hr' && (
// //               <button
// //                 onClick={() => setActiveTab('alerts')}
// //                 className={`flex-1 py-3 flex items-center justify-center gap-2 ${
// //                   activeTab === 'alerts' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
// //                 }`}
// //               >
// //                 <AlertTriangle className="w-5 h-5" />
// //                 <span>Alerts</span>
// //                 {alerts.length > 0 && (
// //                   <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
// //                     {alerts.length}
// //                   </span>
// //                 )}
// //               </button>
// //             )}
// //           </div>

// //           {/* Content Area */}
// //           <div className="flex-1 overflow-hidden flex flex-col">
// //             {activeTab === 'chat' && (
// //               <>
// //                 <div className="flex-1 overflow-y-auto p-4 space-y-3">
// //                   {messages.length === 0 ? (
// //                     <div className="text-center text-gray-500 mt-8">
// //                       <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
// //                       <p>No messages yet</p>
// //                       <p className="text-sm mt-1">Start the conversation!</p>
// //                     </div>
// //                   ) : (
// //                     messages.map(msg => (
// //                       <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
// //                         <div className="flex items-center justify-between mb-1">
// //                           <span className="font-semibold text-sm">{msg.sender}</span>
// //                           <span className="text-xs text-gray-400">{msg.time}</span>
// //                         </div>
// //                         <p className="text-sm">{msg.text}</p>
// //                       </div>
// //                     ))
// //                   )}
// //                 </div>
// //                 <div className="p-4 border-t border-gray-700">
// //                   <div className="flex gap-2">
// //                     <input
// //                       type="text"
// //                       value={newMessage}
// //                       onChange={(e) => setNewMessage(e.target.value)}
// //                       onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
// //                       placeholder="Type a message..."
// //                       className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
// //                     />
// //                     <button 
// //                       onClick={sendMessage}
// //                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
// //                     >
// //                       Send
// //                     </button>
// //                   </div>
// //                 </div>
// //               </>
// //             )}

// //             {activeTab === 'whiteboard' && (
// //               <div className="flex-1 p-4 flex flex-col">
// //                 <div className="flex gap-2 mb-3">
// //                   <button
// //                     onClick={clearWhiteboard}
// //                     className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
// //                   >
// //                     <Trash2 className="w-4 h-4" />
// //                     Clear
// //                   </button>
// //                   <button
// //                     onClick={downloadWhiteboard}
// //                     className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
// //                   >
// //                     <Download className="w-4 h-4" />
// //                     Save
// //                   </button>
// //                 </div>
// //                 <canvas
// //                   ref={canvasRef}
// //                   width={352}
// //                   height={500}
// //                   className="bg-white rounded-lg cursor-crosshair"
// //                 />
// //               </div>
// //             )}

// //             {activeTab === 'alerts' && userRole === 'hr' && (
// //               <div className="flex-1 overflow-y-auto p-4">
// //                 <div className="space-y-3">
// //                   <div className="bg-gray-700 rounded-lg p-4">
// //                     <h3 className="font-semibold mb-3">Detection Summary</h3>
// //                     <div className="space-y-2 text-sm">
// //                       <div className="flex justify-between">
// //                         <span>Tab Switches:</span>
// //                         <span className="font-semibold">{detections.tabSwitch}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span>Multiple Faces:</span>
// //                         <span className={detections.multipleFaces ? 'text-red-400' : ''}>
// //                           {detections.multipleFaces ? 'Detected' : 'None'}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {alerts.length === 0 ? (
// //                     <div className="text-center text-gray-500 mt-8">
// //                       <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
// //                       <p>No alerts yet</p>
// //                       <p className="text-sm mt-1">All clear!</p>
// //                     </div>
// //                   ) : (
// //                     alerts.map(alert => (
// //                       <div key={alert.id} className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
// //                         <div className="flex items-start gap-2">
// //                           <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
// //                           <div className="flex-1">
// //                             <p className="text-sm font-medium">{alert.message}</p>
// //                             <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))
// //                   )}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MeetingRoom;


// import React, { useState, useEffect, useRef } from 'react';
// import { Video, VideoOff, Mic, MicOff, Share2, MessageSquare, Users, AlertTriangle, Grid3x3, Download, Trash2, PhoneOff } from 'lucide-react';

// const MeetingRoom = ({ userRole, interviewId, candidateData, onEnd }) => {
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [isAudioOn, setIsAudioOn] = useState(true);
//   const [isSharingScreen, setIsSharingScreen] = useState(false);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [alerts, setAlerts] = useState([]);
//   const [detections, setDetections] = useState({
//     multipleFaces: false,
//     tabSwitch: 0
//   });
//   const [connectionStatus, setConnectionStatus] = useState('Initializing...');
//   const [remoteUserName, setRemoteUserName] = useState('');

//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const wsRef = useRef(null);
//   const pcRef = useRef(null);
//   const localStreamRef = useRef(null);
//   const pendingCandidatesRef = useRef([]);
//   const reconnectTimeoutRef = useRef(null);

//   useEffect(() => {
//     if (userRole === 'hr') {
//       const admitted = JSON.parse(localStorage.getItem('admittedCandidate') || '{}');
//       setRemoteUserName(admitted.candidateName || 'Candidate');
//     } else {
//       setRemoteUserName(candidateData?.hrName || 'HR Manager');
//     }
//   }, [userRole, candidateData]);

//   useEffect(() => {
//     console.log('=== INITIALIZING MEETING ROOM ===');
//     console.log('User Role:', userRole);
//     console.log('Interview ID:', interviewId);
    
//     initializeMeeting();

//     return () => {
//       console.log('=== CLEANING UP MEETING ROOM ===');
//       cleanup();
//     };
//   }, []);

//   const initializeMeeting = async () => {
//     try {
//       setConnectionStatus('Getting media devices...');
      
//       // Step 1: Get local media
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           width: { ideal: 1280, max: 1920 },
//           height: { ideal: 720, max: 1080 }
//         },
//         audio: {
//           echoCancellation: true,
//           noiseSuppression: true,
//           autoGainControl: true
//         }
//       });
      
//       localStreamRef.current = stream;
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }
      
//       console.log('✅ Local media obtained');
//       setConnectionStatus('Connecting to server...');
      
//       // Step 2: Connect WebSocket
//       await connectWebSocket();
      
//     } catch (error) {
//       console.error('❌ Failed to initialize meeting:', error);
//       setConnectionStatus('Failed: ' + error.message);
//       alert('Failed to access camera/microphone. Please check permissions and reload.');
//     }
//   };

//   const connectWebSocket = () => {
//     return new Promise((resolve, reject) => {
//       const wsUrl = `ws://localhost:5196/ws/signaling?interviewId=${interviewId}&role=${userRole}`;
//       console.log('📡 Connecting to:', wsUrl);
      
//       wsRef.current = new WebSocket(wsUrl);

//       wsRef.current.onopen = () => {
//         console.log('✅ WebSocket connected');
//         setConnectionStatus('WebSocket connected');
        
//         // Step 3: Create peer connection
//         setupPeerConnection();
        
//         // Step 4: HR creates offer immediately
//         if (userRole === 'hr') {
//           console.log('👔 HR: Will create offer in 500ms...');
//           setTimeout(() => {
//             createAndSendOffer();
//           }, 500);
//         } else {
//           console.log('👤 Candidate: Waiting for offer...');
//           setConnectionStatus('Waiting for HR...');
//         }
        
//         resolve();
//       };

//       wsRef.current.onmessage = async (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           console.log('📩 Received signal:', data.type);
//           await handleSignalingMessage(data);
//         } catch (error) {
//           console.error('❌ Error handling message:', error);
//         }
//       };

//       wsRef.current.onerror = (error) => {
//         console.error('❌ WebSocket error:', error);
//         setConnectionStatus('WebSocket error');
//         reject(error);
//       };

//       wsRef.current.onclose = (event) => {
//         console.log('🔌 WebSocket closed:', event.code, event.reason);
//         setConnectionStatus('Disconnected');
        
//         // Auto-reconnect if not intentional
//         if (!event.wasClean && reconnectTimeoutRef.current === null) {
//           console.log('🔄 Will attempt reconnect in 3s...');
//           reconnectTimeoutRef.current = setTimeout(() => {
//             reconnectTimeoutRef.current = null;
//             connectWebSocket();
//           }, 3000);
//         }
//       };
//     });
//   };

//   const setupPeerConnection = () => {
//     console.log('🔧 Setting up peer connection...');
    
//     const configuration = {
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' },
//         { urls: 'stun:stun1.l.google.com:19302' },
//         { urls: 'stun:stun2.l.google.com:19302' }
//       ],
//       iceCandidatePoolSize: 10
//     };

//     pcRef.current = new RTCPeerConnection(configuration);

//     // Add local tracks
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach(track => {
//         const sender = pcRef.current.addTrack(track, localStreamRef.current);
//         console.log('➕ Added local track:', track.kind, track.id);
//       });
//     }

//     // Handle ICE candidates
//     pcRef.current.onicecandidate = (event) => {
//       if (event.candidate) {
//         console.log('🧊 New ICE candidate');
//         sendSignalingMessage({
//           type: 'ice-candidate',
//           candidate: event.candidate.toJSON()
//         });
//       } else {
//         console.log('✅ ICE gathering complete');
//       }
//     };

//     // Handle ICE connection state
//     pcRef.current.oniceconnectionstatechange = () => {
//       console.log('🧊 ICE connection state:', pcRef.current.iceConnectionState);
//       setConnectionStatus('ICE: ' + pcRef.current.iceConnectionState);
      
//       if (pcRef.current.iceConnectionState === 'connected') {
//         setConnectionStatus('Connected');
//       } else if (pcRef.current.iceConnectionState === 'failed') {
//         console.error('❌ ICE connection failed');
//         setConnectionStatus('Connection failed');
//       }
//     };

//     // Handle connection state
//     pcRef.current.onconnectionstatechange = () => {
//       console.log('🔗 Connection state:', pcRef.current.connectionState);
      
//       if (pcRef.current.connectionState === 'connected') {
//         console.log('✅ Peer connection established!');
//         setConnectionStatus('Connected');
//       }
//     };

//     // Handle remote tracks - CRITICAL FIX
//     pcRef.current.ontrack = (event) => {
//       console.log('📺 Received remote track:', event.track.kind, event.track.id);
//       console.log('   Streams:', event.streams.length);
      
//       if (event.streams && event.streams[0]) {
//         if (remoteVideoRef.current) {
//           console.log('✅ Setting remote stream to video element');
//           remoteVideoRef.current.srcObject = event.streams[0];
          
//           // Force play
//           remoteVideoRef.current.play().catch(e => {
//             console.error('Error playing remote video:', e);
//           });
//         }
//       }
//     };

//     console.log('✅ Peer connection setup complete');
//   };

//   const createAndSendOffer = async () => {
//     try {
//       console.log('📤 Creating offer...');
      
//       const offer = await pcRef.current.createOffer({
//         offerToReceiveAudio: true,
//         offerToReceiveVideo: true
//       });
      
//       console.log('✅ Offer created');
//       await pcRef.current.setLocalDescription(offer);
//       console.log('✅ Local description set');
      
//       sendSignalingMessage({
//         type: 'offer',
//         offer: offer
//       });
      
//       console.log('✅ Offer sent');
//       setConnectionStatus('Offer sent, waiting for answer...');
      
//     } catch (error) {
//       console.error('❌ Error creating offer:', error);
//       setConnectionStatus('Failed to create offer');
//     }
//   };

//   const handleSignalingMessage = async (data) => {
//     try {
//       switch (data.type) {
//         case 'offer':
//           console.log('📥 Received offer');
//           await handleOffer(data.offer);
//           break;

//         case 'answer':
//           console.log('📥 Received answer');
//           await handleAnswer(data.answer);
//           break;

//         case 'ice-candidate':
//           console.log('📥 Received ICE candidate');
//           await handleIceCandidate(data.candidate);
//           break;

//         case 'chat-message':
//           console.log('💬 Received chat message');
//           handleChatMessage(data);
//           break;

//         case 'proctoring-alert':
//           console.log('⚠️ Received proctoring alert');
//           handleProctoringAlert(data);
//           break;

//         default:
//           console.log('❓ Unknown message type:', data.type);
//       }
//     } catch (error) {
//       console.error('❌ Error handling signaling message:', error);
//     }
//   };

//   const handleOffer = async (offer) => {
//     try {
//       if (!pcRef.current) {
//         console.error('❌ No peer connection');
//         return;
//       }

//       console.log('Setting remote description (offer)...');
//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
//       console.log('✅ Remote description set');

//       // Add any pending ICE candidates
//       console.log(`Adding ${pendingCandidatesRef.current.length} pending candidates...`);
//       for (const candidate of pendingCandidatesRef.current) {
//         await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//       pendingCandidatesRef.current = [];

//       // Create answer
//       console.log('Creating answer...');
//       const answer = await pcRef.current.createAnswer();
//       await pcRef.current.setLocalDescription(answer);
//       console.log('✅ Answer created and set as local description');

//       sendSignalingMessage({
//         type: 'answer',
//         answer: answer
//       });
      
//       console.log('✅ Answer sent');
//       setConnectionStatus('Answer sent, connecting...');
      
//     } catch (error) {
//       console.error('❌ Error handling offer:', error);
//       setConnectionStatus('Failed to handle offer');
//     }
//   };

//   const handleAnswer = async (answer) => {
//     try {
//       if (!pcRef.current) {
//         console.error('❌ No peer connection');
//         return;
//       }

//       console.log('Setting remote description (answer)...');
//       await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
//       console.log('✅ Remote description set');

//       // Add any pending ICE candidates
//       console.log(`Adding ${pendingCandidatesRef.current.length} pending candidates...`);
//       for (const candidate of pendingCandidatesRef.current) {
//         await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//       }
//       pendingCandidatesRef.current = [];
      
//       setConnectionStatus('Connecting...');
      
//     } catch (error) {
//       console.error('❌ Error handling answer:', error);
//       setConnectionStatus('Failed to handle answer');
//     }
//   };

//   const handleIceCandidate = async (candidate) => {
//     try {
//       if (!pcRef.current) {
//         console.error('❌ No peer connection');
//         return;
//       }

//       if (!pcRef.current.remoteDescription) {
//         console.log('⏳ Remote description not set, queuing candidate');
//         pendingCandidatesRef.current.push(candidate);
//         return;
//       }

//       console.log('Adding ICE candidate...');
//       await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//       console.log('✅ ICE candidate added');
      
//     } catch (error) {
//       console.error('❌ Error adding ICE candidate:', error);
//     }
//   };

//   const handleChatMessage = (data) => {
//     setMessages(prev => [...prev, {
//       id: Date.now(),
//       sender: data.senderRole === 'hr' ? 'HR' : 'Candidate',
//       text: data.message,
//       time: new Date().toLocaleTimeString()
//     }]);
//   };

//   const handleProctoringAlert = (data) => {
//     if (userRole === 'hr') {
//       const newAlert = {
//         id: Date.now(),
//         type: data.alertType,
//         message: data.message,
//         timestamp: new Date().toLocaleTimeString()
//       };
//       setAlerts(prev => [...prev, newAlert]);
      
//       if (data.alertType === 'multiple_faces') {
//         setDetections(prev => ({ ...prev, multipleFaces: true }));
//       } else if (data.alertType === 'tab_switch') {
//         setDetections(prev => ({ ...prev, tabSwitch: prev.tabSwitch + 1 }));
//       }
//     }
//   };

//   const sendSignalingMessage = (message) => {
//     if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
//       const payload = {
//         ...message,
//         interviewId: parseInt(interviewId),
//         senderRole: userRole,
//         timestamp: new Date().toISOString()
//       };
//       wsRef.current.send(JSON.stringify(payload));
//       console.log('📤 Sent:', message.type);
//     } else {
//       console.error('❌ WebSocket not open, cannot send message');
//     }
//   };

//   // Tab switch detection
//   useEffect(() => {
//     if (userRole !== 'candidate') return;

//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         sendSignalingMessage({
//           type: 'proctoring-alert',
//           alertType: 'tab_switch',
//           message: 'Candidate switched tab'
//         });
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, [userRole]);

//   // Whiteboard
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     ctx.lineCap = 'round';
//     ctx.lineWidth = 2;
//     ctx.strokeStyle = '#000';

//     let drawing = false;
//     let lastX = 0;
//     let lastY = 0;

//     const startDrawing = (e) => {
//       drawing = true;
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     };

//     const draw = (e) => {
//       if (!drawing) return;
//       ctx.beginPath();
//       ctx.moveTo(lastX, lastY);
//       ctx.lineTo(e.offsetX, e.offsetY);
//       ctx.stroke();
//       [lastX, lastY] = [e.offsetX, e.offsetY];
//     };

//     const stopDrawing = () => {
//       drawing = false;
//     };

//     canvas.addEventListener('mousedown', startDrawing);
//     canvas.addEventListener('mousemove', draw);
//     canvas.addEventListener('mouseup', stopDrawing);
//     canvas.addEventListener('mouseout', stopDrawing);

//     return () => {
//       canvas.removeEventListener('mousedown', startDrawing);
//       canvas.removeEventListener('mousemove', draw);
//       canvas.removeEventListener('mouseup', stopDrawing);
//       canvas.removeEventListener('mouseout', stopDrawing);
//     };
//   }, [activeTab]);

//   const toggleVideo = () => {
//     if (localStreamRef.current) {
//       const videoTrack = localStreamRef.current.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoOn(videoTrack.enabled);
//         console.log('📹 Video:', videoTrack.enabled ? 'ON' : 'OFF');
//       }
//     }
//   };

//   const toggleAudio = () => {
//     if (localStreamRef.current) {
//       const audioTrack = localStreamRef.current.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsAudioOn(audioTrack.enabled);
//         console.log('🎤 Audio:', audioTrack.enabled ? 'ON' : 'OFF');
//       }
//     }
//   };

//   const startScreenShare = async () => {
//     try {
//       if (isSharingScreen) {
//         // Stop screen share
//         const videoTrack = localStreamRef.current.getVideoTracks()[0];
//         const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
        
//         if (sender && videoTrack) {
//           await sender.replaceTrack(videoTrack);
//           setIsSharingScreen(false);
//           console.log('🖥️ Screen share stopped');
//         }
//       } else {
//         // Start screen share
//         const screenStream = await navigator.mediaDevices.getDisplayMedia({
//           video: { cursor: 'always' },
//           audio: false
//         });

//         const screenTrack = screenStream.getVideoTracks()[0];
//         const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
        
//         if (sender) {
//           await sender.replaceTrack(screenTrack);
//           setIsSharingScreen(true);
//           console.log('🖥️ Screen share started');

//           screenTrack.onended = () => {
//             const videoTrack = localStreamRef.current.getVideoTracks()[0];
//             if (sender && videoTrack) {
//               sender.replaceTrack(videoTrack);
//               setIsSharingScreen(false);
//               console.log('🖥️ Screen share ended by user');
//             }
//           };
//         }
//       }
//     } catch (error) {
//       console.error('❌ Screen share error:', error);
//       alert('Failed to share screen: ' + error.message);
//     }
//   };

//   const sendMessage = (e) => {
//     e?.preventDefault();
//     if (!newMessage.trim()) return;
    
//     const message = {
//       id: Date.now(),
//       sender: userRole === 'hr' ? 'HR' : 'Candidate',
//       text: newMessage,
//       time: new Date().toLocaleTimeString()
//     };
    
//     setMessages(prev => [...prev, message]);
    
//     sendSignalingMessage({
//       type: 'chat-message',
//       message: newMessage
//     });
    
//     setNewMessage('');
//   };

//   const clearWhiteboard = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   const downloadWhiteboard = () => {
//     const canvas = canvasRef.current;
//     const url = canvas.toDataURL('image/png');
//     const link = document.createElement('a');
//     link.download = `whiteboard-${Date.now()}.png`;
//     link.href = url;
//     link.click();
//   };

//   const simulateFaceDetection = () => {
//     const newAlert = {
//       id: Date.now(),
//       type: 'multiple_faces',
//       message: 'Multiple faces detected',
//       timestamp: new Date().toLocaleTimeString()
//     };
//     setAlerts(prev => [...prev, newAlert]);
//     setDetections(prev => ({ ...prev, multipleFaces: true }));
//   };

//   const handleEndInterview = async () => {
//     if (confirm('Are you sure you want to end this interview?')) {
//       await cleanup();
//       if (onEnd) {
//         onEnd();
//       }
//     }
//   };

//   const cleanup = async () => {
//     console.log('🧹 Cleaning up...');
    
//     if (reconnectTimeoutRef.current) {
//       clearTimeout(reconnectTimeoutRef.current);
//     }
    
//     if (wsRef.current) {
//       wsRef.current.close();
//       wsRef.current = null;
//     }
    
//     if (pcRef.current) {
//       pcRef.current.close();
//       pcRef.current = null;
//     }
    
//     if (localStreamRef.current) {
//       localStreamRef.current.getTracks().forEach(track => track.stop());
//       localStreamRef.current = null;
//     }
    
//     if (userRole === 'hr') {
//       try {
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5196/api/hr/interviews/${interviewId}/complete`, {
//           method: 'PUT',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
//       } catch (error) {
//         console.error('Failed to update interview status:', error);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-bold">Interview Session</h1>
//             <p className="text-sm text-gray-400">
//               Session #{interviewId} • {connectionStatus}
//             </p>
//           </div>
//           <div className="flex items-center gap-4">
//             {userRole === 'hr' && (
//               <div className="flex items-center gap-2 text-sm">
//                 <AlertTriangle className="w-4 h-4 text-yellow-500" />
//                 <span>Alerts: {alerts.length}</span>
//               </div>
//             )}
//             <button 
//               onClick={handleEndInterview}
//               className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium flex items-center gap-2"
//             >
//               <PhoneOff className="w-4 h-4" />
//               End Interview
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex h-[calc(100vh-73px)]">
//         <div className="flex-1 flex flex-col p-4">
//           <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
//             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
//               <video 
//                 ref={remoteVideoRef}
//                 autoPlay 
//                 playsInline
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
//                 {remoteUserName}
//               </div>
//               {detections.multipleFaces && userRole === 'hr' && (
//                 <div className="absolute top-4 right-4 bg-red-600 px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
//                   <AlertTriangle className="w-4 h-4" />
//                   <span className="text-sm">Multiple Faces</span>
//                 </div>
//               )}
//               {!remoteVideoRef.current?.srcObject && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
//                   <div className="text-center">
//                     <Users className="w-16 h-16 text-gray-600 mx-auto mb-2 animate-pulse" />
//                     <p className="text-gray-500">Waiting for {remoteUserName}...</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="relative bg-gray-800 rounded-lg overflow-hidden">
//               <video 
//                 ref={localVideoRef}
//                 autoPlay 
//                 playsInline 
//                 muted
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
//                 You ({userRole === 'hr' ? 'HR' : 'Candidate'})
//               </div>
//               {!isVideoOn && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
//                   <VideoOff className="w-12 h-12 text-gray-500" />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg">
//             <button 
//               onClick={toggleAudio}
//               className={`p-4 rounded-full transition-colors ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
//               title={isAudioOn ? 'Mute' : 'Unmute'}
//             >
//               {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
//             </button>
            
//             <button 
//               onClick={toggleVideo}
//               className={`p-4 rounded-full transition-colors ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
//               title={isVideoOn ? 'Stop Video' : 'Start Video'}
//             >
//               {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
//             </button>
            
//             <button 
//               onClick={startScreenShare}
//               className={`p-4 rounded-full transition-colors ${isSharingScreen ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
//               title={isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
//             >
//               <Share2 className="w-6 h-6" />
//             </button>

//             {userRole === 'hr' && (
//               <button 
//                 onClick={simulateFaceDetection}
//                 className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
//               >
//                 Simulate Alert
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
//           <div className="flex border-b border-gray-700">
//             <button
//               onClick={() => setActiveTab('chat')}
//               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
//                 activeTab === 'chat' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
//               }`}
//             >
//               <MessageSquare className="w-5 h-5" />
//               <span>Chat</span>
//             </button>
//             <button
//               onClick={() => setActiveTab('whiteboard')}
//               className={`flex-1 py-3 flex items-center justify-center gap-2 ${
//                 activeTab === 'whiteboard' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
//               }`}
//             >
//               <Grid3x3 className="w-5 h-5" />
//               <span>Whiteboard</span>
//             </button>
//             {userRole === 'hr' && (
//               <button
//                 onClick={() => setActiveTab('alerts')}
//                 className={`flex-1 py-3 flex items-center justify-center gap-2 ${
//                   activeTab === 'alerts' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
//                 }`}
//               >
//                 <AlertTriangle className="w-5 h-5" />
//                 <span>Alerts</span>
//                 {alerts.length > 0 && (
//                   <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
//                     {alerts.length}
//                   </span>
//                 )}
//               </button>
//             )}
//           </div>

//           <div className="flex-1 overflow-hidden flex flex-col">
//             {activeTab === 'chat' && (
//               <>
//                 <div className="flex-1 overflow-y-auto p-4 space-y-3">
//                   {messages.length === 0 ? (
//                     <div className="text-center text-gray-500 mt-8">
//                       <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                       <p>No messages yet</p>
//                     </div>
//                   ) : (
//                     messages.map(msg => (
//                       <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
//                         <div className="flex items-center justify-between mb-1">
//                           <span className="font-semibold text-sm">{msg.sender}</span>
//                           <span className="text-xs text-gray-400">{msg.time}</span>
//                         </div>
//                         <p className="text-sm">{msg.text}</p>
//                       </div>
//                     ))
//                   )}
//                 </div>
//                 <div className="p-4 border-t border-gray-700">
//                   <form onSubmit={sendMessage} className="flex gap-2">
//                     <input
//                       type="text"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       placeholder="Type a message..."
//                       className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
//                     />
//                     <button 
//                       type="submit"
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
//                     >
//                       Send
//                     </button>
//                   </form>
//                 </div>
//               </>
//             )}

//             {activeTab === 'whiteboard' && (
//               <div className="flex-1 p-4 flex flex-col">
//                 <div className="flex gap-2 mb-3">
//                   <button
//                     onClick={clearWhiteboard}
//                     className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Clear
//                   </button>
//                   <button
//                     onClick={downloadWhiteboard}
//                     className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
//                   >
//                     <Download className="w-4 h-4" />
//                     Save
//                   </button>
//                 </div>
//                 <canvas
//                   ref={canvasRef}
//                   width={352}
//                   height={500}
//                   className="bg-white rounded-lg cursor-crosshair"
//                 />
//               </div>
//             )}

//             {activeTab === 'alerts' && userRole === 'hr' && (
//               <div className="flex-1 overflow-y-auto p-4">
//                 <div className="space-y-3">
//                   <div className="bg-gray-700 rounded-lg p-4">
//                     <h3 className="font-semibold mb-3">Detection Summary</h3>
//                     <div className="space-y-2 text-sm">
//                       <div className="flex justify-between">
//                         <span>Tab Switches:</span>
//                         <span className="font-semibold">{detections.tabSwitch}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span>Multiple Faces:</span>
//                         <span className={detections.multipleFaces ? 'text-red-400' : ''}>
//                           {detections.multipleFaces ? 'Detected' : 'None'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {alerts.length === 0 ? (
//                     <div className="text-center text-gray-500 mt-8">
//                       <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
//                       <p>No alerts yet</p>
//                     </div>
//                   ) : (
//                     alerts.map(alert => (
//                       <div key={alert.id} className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
//                         <div className="flex items-start gap-2">
//                           <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
//                           <div className="flex-1">
//                             <p className="text-sm font-medium">{alert.message}</p>
//                             <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingRoom;

import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Share2, MessageSquare, Users, AlertTriangle, Grid3x3, Download, Trash2, PhoneOff } from 'lucide-react';

const MeetingRoom = ({ userRole, interviewId, candidateData, onEnd }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [detections, setDetections] = useState({
    multipleFaces: false,
    tabSwitch: 0
  });
  const [connectionStatus, setConnectionStatus] = useState('Initializing...');
  const [remoteUserName, setRemoteUserName] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const pendingCandidatesRef = useRef([]);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (userRole === 'hr') {
      const admitted = JSON.parse(localStorage.getItem('admittedCandidate') || '{}');
      setRemoteUserName(admitted.candidateName || 'Candidate');
    } else {
      setRemoteUserName(candidateData?.hrName || 'HR Manager');
    }
  }, [userRole, candidateData]);

  useEffect(() => {
    console.log('=== INITIALIZING MEETING ROOM ===');
    console.log('User Role:', userRole);
    console.log('Interview ID:', interviewId);
    
    let isMounted = true;

    const init = async () => {
      if (isMounted) {
        await initializeMeeting();
      }
    };

    init();

    return () => {
      console.log('=== CLEANING UP MEETING ROOM ===');
      isMounted = false;
      cleanup();
    };
  }, []);

  const initializeMeeting = async () => {
    try {
      setConnectionStatus('Getting media devices...');
      
      // ✅ Add 500ms delay to prevent race condition
      await new Promise(resolve => setTimeout(resolve, 500));
      // Step 1: Get local media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      console.log('✅ Local media obtained');
      setConnectionStatus('Connecting to server...');
      
      // Step 2: Connect WebSocket
      await connectWebSocket();
      
    } catch (error) {
      console.error('❌ Failed to initialize meeting:', error);
      setConnectionStatus('Failed: ' + error.message);
      alert('Failed to access camera/microphone. Please check permissions and reload.');
    }
  };

  const connectWebSocket = () => {
    return new Promise((resolve, reject) => {
      const wsUrl = `ws://localhost:5196/ws/signaling?interviewId=${interviewId}&role=${userRole}`;
      console.log('📡 Connecting to:', wsUrl);
      
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('✅ WebSocket connected');
        setConnectionStatus('WebSocket connected');
        
        // Step 3: Create peer connection
        setupPeerConnection();
        
        // Step 4: HR creates offer immediately
        if (userRole === 'hr') {
          console.log('👔 HR: Will create offer in 500ms...');
          setTimeout(() => {
            createAndSendOffer();
          }, 500);
        } else {
          console.log('👤 Candidate: Waiting for offer...');
          setConnectionStatus('Waiting for HR...');
        }
        
        resolve();
      };

      wsRef.current.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('📩 Received signal:', data.type);
          await handleSignalingMessage(data);
        } catch (error) {
          console.error('❌ Error handling message:', error);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
        setConnectionStatus('WebSocket error');
        reject(error);
      };

      wsRef.current.onclose = (event) => {
        console.log('🔌 WebSocket closed:', event.code, event.reason);
        setConnectionStatus('Disconnected');
        
        // Auto-reconnect if not intentional
        if (!event.wasClean && reconnectTimeoutRef.current === null) {
          console.log('🔄 Will attempt reconnect in 3s...');
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            connectWebSocket();
          }, 3000);
        }
      };
    });
  };

  const setupPeerConnection = () => {
    console.log('🔧 Setting up peer connection...');
    
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ],
      iceCandidatePoolSize: 10
    };

    pcRef.current = new RTCPeerConnection(configuration);

    // Add local tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        const sender = pcRef.current.addTrack(track, localStreamRef.current);
        console.log('➕ Added local track:', track.kind, track.id);
      });
    }

    // Handle ICE candidates
    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('🧊 New ICE candidate');
        sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate.toJSON()
        });
      } else {
        console.log('✅ ICE gathering complete');
      }
    };

    // Handle ICE connection state
    pcRef.current.oniceconnectionstatechange = () => {
      console.log('🧊 ICE connection state:', pcRef.current.iceConnectionState);
      setConnectionStatus('ICE: ' + pcRef.current.iceConnectionState);
      
      if (pcRef.current.iceConnectionState === 'connected') {
        setConnectionStatus('Connected');
      } else if (pcRef.current.iceConnectionState === 'failed') {
        console.error('❌ ICE connection failed');
        setConnectionStatus('Connection failed');
      }
    };

    // Handle connection state
    pcRef.current.onconnectionstatechange = () => {
      console.log('🔗 Connection state:', pcRef.current.connectionState);
      
      if (pcRef.current.connectionState === 'connected') {
        console.log('✅ Peer connection established!');
        setConnectionStatus('Connected');
      }
    };

    // Handle remote tracks - CRITICAL FIX
    pcRef.current.ontrack = (event) => {
      console.log('📺 Received remote track:', event.track.kind, event.track.id);
      console.log('   Streams:', event.streams.length);
      
      if (event.streams && event.streams[0]) {
        if (remoteVideoRef.current) {
          console.log('✅ Setting remote stream to video element');
          remoteVideoRef.current.srcObject = event.streams[0];
          
          // Force play
          remoteVideoRef.current.play().catch(e => {
            console.error('Error playing remote video:', e);
          });
        }
      }
    };

    console.log('✅ Peer connection setup complete');
  };

  const createAndSendOffer = async () => {
    try {
      console.log('📤 Creating offer...');
      
      const offer = await pcRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      
      console.log('✅ Offer created');
      await pcRef.current.setLocalDescription(offer);
      console.log('✅ Local description set');
      
      sendSignalingMessage({
        type: 'offer',
        offer: offer
      });
      
      console.log('✅ Offer sent');
      setConnectionStatus('Offer sent, waiting for answer...');
      
    } catch (error) {
      console.error('❌ Error creating offer:', error);
      setConnectionStatus('Failed to create offer');
    }
  };

  const handleSignalingMessage = async (data) => {
    try {
      switch (data.type) {
        case 'offer':
          console.log('📥 Received offer');
          await handleOffer(data.offer);
          break;

        case 'answer':
          console.log('📥 Received answer');
          await handleAnswer(data.answer);
          break;

        case 'ice-candidate':
          console.log('📥 Received ICE candidate');
          await handleIceCandidate(data.candidate);
          break;

        case 'chat-message':
          console.log('💬 Received chat message');
          handleChatMessage(data);
          break;

        case 'proctoring-alert':
          console.log('⚠️ Received proctoring alert');
          handleProctoringAlert(data);
          break;

        default:
          console.log('❓ Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('❌ Error handling signaling message:', error);
    }
  };

  const handleOffer = async (offer) => {
    try {
      if (!pcRef.current) {
        console.error('❌ No peer connection');
        return;
      }

      console.log('Setting remote description (offer)...');
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      console.log('✅ Remote description set');

      // Add any pending ICE candidates
      console.log(`Adding ${pendingCandidatesRef.current.length} pending candidates...`);
      for (const candidate of pendingCandidatesRef.current) {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
      pendingCandidatesRef.current = [];

      // Create answer
      console.log('Creating answer...');
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      console.log('✅ Answer created and set as local description');

      sendSignalingMessage({
        type: 'answer',
        answer: answer
      });
      
      console.log('✅ Answer sent');
      setConnectionStatus('Answer sent, connecting...');
      
    } catch (error) {
      console.error('❌ Error handling offer:', error);
      setConnectionStatus('Failed to handle offer');
    }
  };

  const handleAnswer = async (answer) => {
    try {
      if (!pcRef.current) {
        console.error('❌ No peer connection');
        return;
      }

      console.log('Setting remote description (answer)...');
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      console.log('✅ Remote description set');

      // Add any pending ICE candidates
      console.log(`Adding ${pendingCandidatesRef.current.length} pending candidates...`);
      for (const candidate of pendingCandidatesRef.current) {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
      pendingCandidatesRef.current = [];
      
      setConnectionStatus('Connecting...');
      
    } catch (error) {
      console.error('❌ Error handling answer:', error);
      setConnectionStatus('Failed to handle answer');
    }
  };

  const handleIceCandidate = async (candidate) => {
    try {
      if (!pcRef.current) {
        console.error('❌ No peer connection');
        return;
      }

      if (!pcRef.current.remoteDescription) {
        console.log('⏳ Remote description not set, queuing candidate');
        pendingCandidatesRef.current.push(candidate);
        return;
      }

      console.log('Adding ICE candidate...');
      await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      console.log('✅ ICE candidate added');
      
    } catch (error) {
      console.error('❌ Error adding ICE candidate:', error);
    }
  };

  const handleChatMessage = (data) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: data.senderRole === 'hr' ? 'HR' : 'Candidate',
      text: data.message,
      time: new Date().toLocaleTimeString()
    }]);
  };

  const handleProctoringAlert = (data) => {
    if (userRole === 'hr') {
      const newAlert = {
        id: Date.now(),
        type: data.alertType,
        message: data.message,
        timestamp: new Date().toLocaleTimeString()
      };
      setAlerts(prev => [...prev, newAlert]);
      
      if (data.alertType === 'multiple_faces') {
        setDetections(prev => ({ ...prev, multipleFaces: true }));
      } else if (data.alertType === 'tab_switch') {
        setDetections(prev => ({ ...prev, tabSwitch: prev.tabSwitch + 1 }));
      }
    }
  };

  const sendSignalingMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const payload = {
        ...message,
        interviewId: parseInt(interviewId),
        senderRole: userRole,
        timestamp: new Date().toISOString()
      };
      wsRef.current.send(JSON.stringify(payload));
      console.log('📤 Sent:', message.type);
    } else {
      console.error('❌ WebSocket not open, cannot send message');
    }
  };

  // Tab switch detection
  useEffect(() => {
    if (userRole !== 'candidate') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        sendSignalingMessage({
          type: 'proctoring-alert',
          alertType: 'tab_switch',
          message: 'Candidate switched tab'
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [userRole]);

  // Whiteboard
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000';

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e) => {
      drawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const draw = (e) => {
      if (!drawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const stopDrawing = () => {
      drawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [activeTab]);

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
        console.log('📹 Video:', videoTrack.enabled ? 'ON' : 'OFF');
      }
    }
  };

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
        console.log('🎤 Audio:', audioTrack.enabled ? 'ON' : 'OFF');
      }
    }
  };

  const startScreenShare = async () => {
    try {
      if (isSharingScreen) {
        // Stop screen share
        const videoTrack = localStreamRef.current.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
        
        if (sender && videoTrack) {
          await sender.replaceTrack(videoTrack);
          setIsSharingScreen(false);
          console.log('🖥️ Screen share stopped');
        }
      } else {
        // Start screen share
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: 'always' },
          audio: false
        });

        const screenTrack = screenStream.getVideoTracks()[0];
        const sender = pcRef.current.getSenders().find(s => s.track?.kind === 'video');
        
        if (sender) {
          await sender.replaceTrack(screenTrack);
          setIsSharingScreen(true);
          console.log('🖥️ Screen share started');

          screenTrack.onended = () => {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (sender && videoTrack) {
              sender.replaceTrack(videoTrack);
              setIsSharingScreen(false);
              console.log('🖥️ Screen share ended by user');
            }
          };
        }
      }
    } catch (error) {
      console.error('❌ Screen share error:', error);
      alert('Failed to share screen: ' + error.message);
    }
  };

  const sendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      sender: userRole === 'hr' ? 'HR' : 'Candidate',
      text: newMessage,
      time: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, message]);
    
    sendSignalingMessage({
      type: 'chat-message',
      message: newMessage
    });
    
    setNewMessage('');
  };

  const clearWhiteboard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadWhiteboard = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `whiteboard-${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  const simulateFaceDetection = () => {
    const newAlert = {
      id: Date.now(),
      type: 'multiple_faces',
      message: 'Multiple faces detected',
      timestamp: new Date().toLocaleTimeString()
    };
    setAlerts(prev => [...prev, newAlert]);
    setDetections(prev => ({ ...prev, multipleFaces: true }));
  };

  const handleEndInterview = async () => {
    if (confirm('Are you sure you want to end this interview?')) {
      await cleanup();
      if (onEnd) {
        onEnd();
      }
    }
  };

  const cleanup = async () => {
    console.log('🧹 Cleaning up...');
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }
    
    if (userRole === 'hr') {
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5196/api/hr/interviews/${interviewId}/complete`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Failed to update interview status:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Interview Session</h1>
            <p className="text-sm text-gray-400">
              Session #{interviewId} • {connectionStatus}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {userRole === 'hr' && (
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                <span>Alerts: {alerts.length}</span>
              </div>
            )}
            <button 
              onClick={handleEndInterview}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium flex items-center gap-2"
            >
              <PhoneOff className="w-4 h-4" />
              End Interview
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 grid grid-cols-2 gap-4 mb-4">
            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
              <video 
                ref={remoteVideoRef}
                autoPlay 
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
                {remoteUserName}
              </div>
              {detections.multipleFaces && userRole === 'hr' && (
                <div className="absolute top-4 right-4 bg-red-600 px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm">Multiple Faces</span>
                </div>
              )}
              {!remoteVideoRef.current?.srcObject && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-2 animate-pulse" />
                    <p className="text-gray-500">Waiting for {remoteUserName}...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
              <video 
                ref={localVideoRef}
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
                You ({userRole === 'hr' ? 'HR' : 'Candidate'})
              </div>
              {!isVideoOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <VideoOff className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg">
            <button 
              onClick={toggleAudio}
              className={`p-4 rounded-full transition-colors ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
              title={isAudioOn ? 'Mute' : 'Unmute'}
            >
              {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            
            <button 
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-colors ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'}`}
              title={isVideoOn ? 'Stop Video' : 'Start Video'}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
            
            <button 
              onClick={startScreenShare}
              className={`p-4 rounded-full transition-colors ${isSharingScreen ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              title={isSharingScreen ? 'Stop Sharing' : 'Share Screen'}
            >
              <Share2 className="w-6 h-6" />
            </button>

            {userRole === 'hr' && (
              <button 
                onClick={simulateFaceDetection}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm"
              >
                Simulate Alert
              </button>
            )}
          </div>
        </div>

        <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 ${
                activeTab === 'chat' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('whiteboard')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 ${
                activeTab === 'whiteboard' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
              <span>Whiteboard</span>
            </button>
            {userRole === 'hr' && (
              <button
                onClick={() => setActiveTab('alerts')}
                className={`flex-1 py-3 flex items-center justify-center gap-2 ${
                  activeTab === 'alerts' ? 'bg-gray-700 border-b-2 border-blue-500' : ''
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Alerts</span>
                {alerts.length > 0 && (
                  <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
                    {alerts.length}
                  </span>
                )}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {activeTab === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No messages yet</p>
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} className="bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{msg.sender}</span>
                          <span className="text-xs text-gray-400">{msg.time}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-gray-700">
                  <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </>
            )}

            {activeTab === 'whiteboard' && (
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={clearWhiteboard}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </button>
                  <button
                    onClick={downloadWhiteboard}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Save
                  </button>
                </div>
                <canvas
                  ref={canvasRef}
                  width={352}
                  height={500}
                  className="bg-white rounded-lg cursor-crosshair"
                />
              </div>
            )}

            {activeTab === 'alerts' && userRole === 'hr' && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">Detection Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tab Switches:</span>
                        <span className="font-semibold">{detections.tabSwitch}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Multiple Faces:</span>
                        <span className={detections.multipleFaces ? 'text-red-400' : ''}>
                          {detections.multipleFaces ? 'Detected' : 'None'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {alerts.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No alerts yet</p>
                    </div>
                  ) : (
                    alerts.map(alert => (
                      <div key={alert.id} className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{alert.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;