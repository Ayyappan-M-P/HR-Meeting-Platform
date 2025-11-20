// // // components/CandidateJoin.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Video, AlertCircle, Upload, CheckCircle, LogIn } from 'lucide-react';

// // const CandidateJoin = ({ meetingLink, onJoin }) => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [resume, setResume] = useState(null);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [interview, setInterview] = useState(null);
// //   const [permissionsGranted, setPermissionsGranted] = useState(false);

// //   useEffect(() => {
// //     // Verify meeting link
// //     const verifyLink = async () => {
// //       try {
// //         const linkId = meetingLink.split('/').pop();
// //         const response = await fetch(`http://localhost:5196/api/candidate/join/${linkId}`);
        
// //         if (response.ok) {
// //           const data = await response.json();
// //           setInterview(data);
// //           setEmail(data.candidateEmail);
// //         } else {
// //           setError('Invalid or expired meeting link');
// //         }
// //       } catch (err) {
// //         setError('Failed to verify meeting link');
// //       }
// //     };

// //     verifyLink();
// //   }, [meetingLink]);

// //   const checkPermissions = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ 
// //         video: true, 
// //         audio: true 
// //       });
// //       stream.getTracks().forEach(track => track.stop());
// //       setPermissionsGranted(true);
// //       return true;
// //     } catch (err) {
// //       setError('Camera and microphone access are required. Please enable them in your browser settings.');
// //       return false;
// //     }
// //   };

// //   const handleResumeUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       if (file.size > 5 * 1024 * 1024) {
// //         setError('Resume file size must be less than 5MB');
// //         return;
// //       }
// //       if (!file.name.match(/\.(pdf|doc|docx)$/)) {
// //         setError('Resume must be PDF or DOC format');
// //         return;
// //       }
// //       setResume(file);
// //       setError('');
// //     }
// //   };

// //   const handleJoin = async () => {
// //     if (!name.trim()) {
// //       setError('Please enter your name');
// //       return;
// //     }

// //     setLoading(true);
// //     setError('');

// //     // Check permissions
// //     const hasPermissions = await checkPermissions();
// //     if (!hasPermissions) {
// //       setLoading(false);
// //       return;
// //     }

// //     // Simulate joining
// //     setTimeout(() => {
// //       onJoin({
// //         name,
// //         email,
// //         resume: resume?.name,
// //         interviewId: interview?.id
// //       });
// //     }, 1500);
// //   };

// //   if (!interview && !error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
// //         <div className="text-center">
// //           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
// //           <p className="text-gray-600">Verifying meeting link...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
// //         {/* Header */}
// //         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
// //           <div className="flex items-center gap-3 mb-2">
// //             <Video className="w-8 h-8" />
// //             <h1 className="text-2xl font-bold">Join Interview</h1>
// //           </div>
// //           <p className="text-blue-100 text-sm">
// //             {interview ? `Scheduled: ${new Date(interview.scheduledAt).toLocaleString()}` : 'Interview Session'}
// //           </p>
// //         </div>

// //         <div className="p-8">
// //           {error && (
// //             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
// //               <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
// //               <p className="text-sm text-red-800">{error}</p>
// //             </div>
// //           )}

// //           <div className="space-y-6">
// //             {/* Full Name */}
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                 Full Name <span className="text-red-600">*</span>
// //               </label>
// //               <input
// //                 type="text"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter your full name"
// //                 required
// //               />
// //             </div>

// //             {/* Email (Pre-filled) */}
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                 Email Address
// //               </label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 disabled
// //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
// //               />
// //             </div>

// //             {/* Resume Upload */}
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                 Resume Upload <span className="text-gray-500 font-normal">(Optional)</span>
// //               </label>
// //               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
// //                 <input
// //                   type="file"
// //                   onChange={handleResumeUpload}
// //                   accept=".pdf,.doc,.docx"
// //                   className="hidden"
// //                   id="resume-upload"
// //                 />
// //                 <label htmlFor="resume-upload" className="cursor-pointer">
// //                   {resume ? (
// //                     <div className="flex items-center justify-center gap-2 text-green-700">
// //                       <CheckCircle className="w-5 h-5" />
// //                       <span className="font-medium">{resume.name}</span>
// //                     </div>
// //                   ) : (
// //                     <>
// //                       <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
// //                       <p className="text-sm text-gray-600">
// //                         Click to upload or drag and drop
// //                       </p>
// //                       <p className="text-xs text-gray-500 mt-1">
// //                         PDF, DOC, DOCX (Max 5MB)
// //                       </p>
// //                     </>
// //                   )}
// //                 </label>
// //               </div>
// //             </div>

// //             {/* Pre-Join Checklist */}
// //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// //               <h3 className="font-semibold text-blue-900 mb-3 text-sm">Before Joining:</h3>
// //               <div className="space-y-2 text-sm text-blue-800">
// //                 <div className="flex items-start gap-2">
// //                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
// //                   <span>Find a quiet, well-lit location</span>
// //                 </div>
// //                 <div className="flex items-start gap-2">
// //                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
// //                   <span>Test your camera and microphone</span>
// //                 </div>
// //                 <div className="flex items-start gap-2">
// //                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
// //                   <span>Ensure stable internet connection</span>
// //                 </div>
// //                 <div className="flex items-start gap-2">
// //                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
// //                   <span>Keep this tab active during the interview</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Permissions Notice */}
// //             {!permissionsGranted && (
// //               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
// //                 <div className="flex items-start gap-3">
// //                   <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
// //                   <div className="text-sm text-yellow-800">
// //                     <p className="font-semibold mb-1">Camera & Microphone Access Required</p>
// //                     <p>You'll be prompted to allow access when you click "Join Interview"</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Join Button */}
// //             <button
// //               onClick={handleJoin}
// //               disabled={loading || !name.trim()}
// //               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
// //             >
// //               {loading ? (
// //                 <>
// //                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                   Joining...
// //                 </>
// //               ) : (
// //                 <>
// //                   <LogIn className="w-6 h-6" />
// //                   Join Interview
// //                 </>
// //               )}
// //             </button>
// //           </div>

// //           {/* Footer */}
// //           <div className="mt-6 pt-6 border-t border-gray-200 text-center">
// //             <p className="text-xs text-gray-500">
// //               By joining, you agree to be recorded and monitored during this interview session.
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CandidateJoin;

// // components/CandidateJoin.jsx - Updated with Email + Meeting ID
// import React, { useState } from 'react';
// import { Video, AlertCircle, Upload, CheckCircle, LogIn, Mail, Key } from 'lucide-react';

// const CandidateJoin = ({ onJoin }) => {
//   const [email, setEmail] = useState('');
//   const [meetingId, setMeetingId] = useState('');
//   const [name, setName] = useState('');
//   const [resume, setResume] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [permissionsGranted, setPermissionsGranted] = useState(false);

//   const checkPermissions = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: true, 
//         audio: true 
//       });
//       stream.getTracks().forEach(track => track.stop());
//       setPermissionsGranted(true);
//       return true;
//     } catch (err) {
//       setError('Camera and microphone access are required. Please enable them in your browser settings.');
//       return false;
//     }
//   };

//   const handleResumeUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Resume file size must be less than 5MB');
//         return;
//       }
//       if (!file.name.match(/\.(pdf|doc|docx)$/)) {
//         setError('Resume must be PDF or DOC format');
//         return;
//       }
//       setResume(file);
//       setError('');
//     }
//   };

//   // const handleJoin = async () => {
//   //   // Validation
//   //   if (!email.trim()) {
//   //     setError('Please enter your email address');
//   //     return;
//   //   }
//   //   if (!meetingId.trim()) {
//   //     setError('Please enter your meeting ID');
//   //     return;
//   //   }

//   //   setLoading(true);
//   //   setError('');

//   //   try {
//   //     // Check permissions first
//   //     const hasPermissions = await checkPermissions();
//   //     if (!hasPermissions) {
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     // Call candidate login API
//   //     const response = await fetch('http://localhost:5196/api/auth/candidate/login', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify({
//   //         email: email,
//   //         meetingId: meetingId,
//   //         name: name || email.split('@')[0],
//   //         resumeUrl: resume?.name
//   //       })
//   //     });

//   //     const data = await response.json();

//   //     if (!response.ok) {
//   //       throw new Error(data.message || 'Failed to join meeting');
//   //     }

//   //     // Store token and candidate info
//   //     localStorage.setItem('token', data.token);
//   //     localStorage.setItem('user', JSON.stringify(data.candidate));
//   //     localStorage.setItem('interview', JSON.stringify(data.interview));

//   //     // Call parent onJoin
//   //     onJoin({
//   //       candidate: data.candidate,
//   //       interview: data.interview,
//   //       hrName: data.hrName
//   //     });
//   //   } catch (err) {
//   //     setError(err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   // Fixed handleJoin function with proper trimming
// const handleJoin = async () => {
//   // Validation with trimming
//   const trimmedEmail = email.trim();
//   const trimmedMeetingId = meetingId.trim().toUpperCase();
  
//   if (!trimmedEmail) {
//     setError('Please enter your email address');
//     return;
//   }
//   if (!trimmedMeetingId) {
//     setError('Please enter your meeting ID');
//     return;
//   }

//   // Email format validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(trimmedEmail)) {
//     setError('Please enter a valid email address');
//     return;
//   }

//   // Meeting ID format validation (XXX-XXX-XXX)
//   const meetingIdRegex = /^[A-Z0-9]{3}-[A-Z0-9]{3}-[A-Z0-9]{3}$/;
//   if (!meetingIdRegex.test(trimmedMeetingId)) {
//     setError('Meeting ID must be in format: ABC-123-XYZ');
//     return;
//   }

//   setLoading(true);
//   setError('');

//   try {
//     // Check permissions first
//     const hasPermissions = await checkPermissions();
//     if (!hasPermissions) {
//       setLoading(false);
//       return;
//     }

//     console.log('Attempting login with:', {
//       email: trimmedEmail,
//       meetingId: trimmedMeetingId
//     });

//     // Call candidate login API
//     const response = await fetch('http://localhost:5196/api/auth/candidate/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email: trimmedEmail,
//         meetingId: trimmedMeetingId,
//         name: name.trim() || trimmedEmail.split('@')[0],
//         resumeUrl: resume?.name
//       })
//     });

//     const data = await response.json();
//     console.log('Login response:', data);

//     if (!response.ok) {
//       throw new Error(data.message || 'Failed to join meeting');
//     }

//     // Store token and candidate info
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(data.candidate));
//     localStorage.setItem('interview', JSON.stringify(data.interview));

//     // Call parent onJoin
//     onJoin({
//       candidate: data.candidate,
//       interview: data.interview,
//       hrName: data.hrName
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     setError(err.message || 'Unable to join meeting. Please check your email and meeting ID.');
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
//           <div className="flex items-center gap-3 mb-2">
//             <Video className="w-8 h-8" />
//             <h1 className="text-2xl font-bold">Join Interview</h1>
//           </div>
//           <p className="text-blue-100 text-sm">
//             Enter your email and meeting ID from the invitation
//           </p>
//         </div>

//         <div className="p-8">
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
//               <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//               <p className="text-sm text-red-800">{error}</p>
//             </div>
//           )}

//           <div className="space-y-6">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Email Address <span className="text-red-600">*</span>
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="your.email@example.com"
//                   required
//                 />
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Use the email where you received the invitation
//               </p>
//             </div>

//             {/* Meeting ID */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Meeting ID <span className="text-red-600">*</span>
//               </label>
//               <div className="relative">
//                 <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={meetingId}
//                   onChange={(e) => setMeetingId(e.target.value.toUpperCase())}
//                   className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg tracking-wider"
//                   placeholder="ABC-123-XYZ"
//                   required
//                   maxLength={11}
//                 />
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Example format: ABC-123-XYZ (from your email invitation)
//               </p>
//             </div>

//             {/* Full Name (Optional) */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Full Name <span className="text-gray-500 font-normal">(Optional)</span>
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your full name"
//               />
//             </div>

//             {/* Resume Upload */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Resume Upload <span className="text-gray-500 font-normal">(Optional)</span>
//               </label>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
//                 <input
//                   type="file"
//                   onChange={handleResumeUpload}
//                   accept=".pdf,.doc,.docx"
//                   className="hidden"
//                   id="resume-upload"
//                 />
//                 <label htmlFor="resume-upload" className="cursor-pointer">
//                   {resume ? (
//                     <div className="flex items-center justify-center gap-2 text-green-700">
//                       <CheckCircle className="w-5 h-5" />
//                       <span className="font-medium">{resume.name}</span>
//                     </div>
//                   ) : (
//                     <>
//                       <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm text-gray-600">
//                         Click to upload or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         PDF, DOC, DOCX (Max 5MB)
//                       </p>
//                     </>
//                   )}
//                 </label>
//               </div>
//             </div>

//             {/* Instructions */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h3 className="font-semibold text-blue-900 mb-3 text-sm flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4" />
//                 Before Joining:
//               </h3>
//               <div className="space-y-2 text-sm text-blue-800">
//                 <div className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span>Check your email invitation for Meeting ID</span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span>Find a quiet, well-lit location</span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span>Test your camera and microphone</span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <span>Ensure stable internet connection</span>
//                 </div>
//               </div>
//             </div>

//             {/* Permissions Notice */}
//             {!permissionsGranted && (
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
//                   <div className="text-sm text-yellow-800">
//                     <p className="font-semibold mb-1">Camera & Microphone Access Required</p>
//                     <p>You'll be prompted to allow access when you click "Join Interview"</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Join Button */}
//             <button
//               onClick={handleJoin}
//               disabled={loading || !email.trim() || !meetingId.trim()}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                   Joining...
//                 </>
//               ) : (
//                 <>
//                   <LogIn className="w-6 h-6" />
//                   Join Interview
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Footer */}
//           <div className="mt-6 pt-6 border-t border-gray-200 text-center">
//             <p className="text-xs text-gray-500">
//               By joining, you agree to be recorded and monitored during this interview session.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CandidateJoin;

// components/CandidateJoin.jsx - Updated with Email + Meeting ID
import React, { useState } from 'react';
import { Video, AlertCircle, Upload, CheckCircle, LogIn, Mail, Key } from 'lucide-react';

const CandidateJoin = ({ meetingId: initialMeetingId, onJoin }) => {
  const [email, setEmail] = useState('');
  const [meetingId, setMeetingId] = useState(initialMeetingId || '');
  const [name, setName] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  const checkPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      stream.getTracks().forEach(track => track.stop());
      setPermissionsGranted(true);
      return true;
    } catch (err) {
      setError('Camera and microphone access are required. Please enable them in your browser settings.');
      return false;
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Resume file size must be less than 5MB');
        return;
      }
      if (!file.name.match(/\.(pdf|doc|docx)$/)) {
        setError('Resume must be PDF or DOC format');
        return;
      }
      setResume(file);
      setError('');
    }
  };

  const handleJoin = async () => {
    // Validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!meetingId.trim()) {
      setError('Please enter your meeting ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check permissions first
      const hasPermissions = await checkPermissions();
      if (!hasPermissions) {
        setLoading(false);
        return;
      }

      // Call candidate login API
      const response = await fetch('http://localhost:5000/api/auth/candidate/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          meetingId: meetingId,
          name: name || email.split('@')[0],
          resumeUrl: resume?.name
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join meeting');
      }

      // Store token and candidate info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.candidate));
      localStorage.setItem('interview', JSON.stringify(data.interview));

      // Call parent onJoin
      onJoin({
        candidate: data.candidate,
        interview: data.interview,
        hrName: data.hrName
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Video className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Join Interview</h1>
          </div>
          <p className="text-blue-100 text-sm">
            Enter your email and meeting ID from the invitation
          </p>
        </div>

        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use the email where you received the invitation
              </p>
            </div>

            {/* Meeting ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meeting ID <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value.toUpperCase())}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-lg tracking-wider"
                  placeholder="ABC-123-XYZ"
                  required
                  maxLength={11}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Example format: ABC-123-XYZ (from your email invitation)
              </p>
            </div>

            {/* Full Name (Optional) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resume Upload <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  onChange={handleResumeUpload}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  {resume ? (
                    <div className="flex items-center justify-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">{resume.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, DOCX (Max 5MB)
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Before Joining:
              </h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Check your email invitation for Meeting ID</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Find a quiet, well-lit location</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Test your camera and microphone</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Ensure stable internet connection</span>
                </div>
              </div>
            </div>

            {/* Permissions Notice */}
            {!permissionsGranted && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Camera & Microphone Access Required</p>
                    <p>You'll be prompted to allow access when you click "Join Interview"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Join Button */}
            <button
              onClick={handleJoin}
              disabled={loading || !email.trim() || !meetingId.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <LogIn className="w-6 h-6" />
                  Join Interview
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              By joining, you agree to be recorded and monitored during this interview session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateJoin;