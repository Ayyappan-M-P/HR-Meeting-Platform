// // components/WaitingRoom.jsx
// import React, { useState, useEffect } from 'react';
// import { Users, Clock, CheckCircle, AlertTriangle, UserCheck, FileText } from 'lucide-react';

// const WaitingRoom = ({ userRole, onAdmit }) => {
//   const [candidates, setCandidates] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       email: 'john.doe@email.com',
//       joinedAt: new Date(Date.now() - 300000),
//       resumeUrl: null,
//       alerts: {
//         multipleFaces: 0,
//         tabSwitches: 2,
//         mobileUsage: false
//       }
//     },
//     {
//       id: 2,
//       name: 'Sarah Smith',
//       email: 'sarah.smith@email.com',
//       joinedAt: new Date(Date.now() - 120000),
//       resumeUrl: 'resume.pdf',
//       alerts: {
//         multipleFaces: 1,
//         tabSwitches: 0,
//         mobileUsage: false
//       }
//     }
//   ]);

//   const [currentCandidate, setCurrentCandidate] = useState(null);

//   const handleAdmit = (candidate) => {
//     setCurrentCandidate(candidate);
//     setCandidates(candidates.filter(c => c.id !== candidate.id));
//     onAdmit(candidate);
//   };

//   const getWaitTime = (joinedAt) => {
//     const diff = Date.now() - joinedAt.getTime();
//     const minutes = Math.floor(diff / 60000);
//     return minutes < 1 ? 'Just now' : `${minutes} min ago`;
//   };

//   // Candidate View
//   if (userRole === 'candidate') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
//           <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Clock className="w-10 h-10 text-blue-600 animate-pulse" />
//           </div>
          
//           <h1 className="text-2xl font-bold text-gray-900 mb-3">Please Wait</h1>
//           <p className="text-gray-600 mb-6">
//             The HR manager will admit you shortly. Please stay on this page.
//           </p>

//           <div className="bg-blue-50 rounded-lg p-4 mb-6">
//             <div className="flex items-center justify-center gap-2 text-blue-900">
//               <Users className="w-5 h-5" />
//               <span className="font-medium">You are in the waiting room</span>
//             </div>
//           </div>

//           <div className="space-y-3 text-sm text-gray-600">
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <span>Keep this tab active</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <span>Ensure your camera and mic are working</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <span>Find a quiet, well-lit space</span>
//             </div>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <p className="text-xs text-gray-500">
//               Estimated wait time: 2-5 minutes
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // HR View
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">Waiting Room</h1>
//             <p className="text-sm text-gray-600">
//               {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} waiting
//             </p>
//           </div>
//           {currentCandidate && (
//             <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">
//               <UserCheck className="w-5 h-5" />
//               <span>In interview with {currentCandidate.name}</span>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-8">
//         {candidates.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//             <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">No Candidates Waiting</h3>
//             <p className="text-gray-600">Candidates will appear here when they join using the meeting link.</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {candidates.map((candidate) => (
//               <div
//                 key={candidate.id}
//                 className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4 flex-1">
//                     {/* Avatar */}
//                     <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
//                       <Users className="w-7 h-7 text-blue-600" />
//                     </div>

//                     {/* Info */}
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
//                         <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                           {getWaitTime(candidate.joinedAt)}
//                         </span>
//                       </div>
                      
//                       <p className="text-sm text-gray-600 mb-3">{candidate.email}</p>

//                       {/* Alerts */}
//                       <div className="flex flex-wrap items-center gap-3">
//                         {candidate.alerts.tabSwitches > 0 && (
//                           <div className="flex items-center gap-1.5 text-xs text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full">
//                             <AlertTriangle className="w-3.5 h-3.5" />
//                             <span>{candidate.alerts.tabSwitches} tab switch{candidate.alerts.tabSwitches > 1 ? 'es' : ''}</span>
//                           </div>
//                         )}
                        
//                         {candidate.alerts.multipleFaces > 0 && (
//                           <div className="flex items-center gap-1.5 text-xs text-red-700 bg-red-50 px-3 py-1 rounded-full">
//                             <AlertTriangle className="w-3.5 h-3.5" />
//                             <span>Multiple faces detected</span>
//                           </div>
//                         )}
                        
//                         {candidate.alerts.mobileUsage && (
//                           <div className="flex items-center gap-1.5 text-xs text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
//                             <AlertTriangle className="w-3.5 h-3.5" />
//                             <span>Mobile usage</span>
//                           </div>
//                         )}

//                         {candidate.alerts.tabSwitches === 0 && 
//                          candidate.alerts.multipleFaces === 0 && 
//                          !candidate.alerts.mobileUsage && (
//                           <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full">
//                             <CheckCircle className="w-3.5 h-3.5" />
//                             <span>No alerts</span>
//                           </div>
//                         )}

//                         {candidate.resumeUrl && (
//                           <button className="flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
//                             <FileText className="w-3.5 h-3.5" />
//                             <span>View Resume</span>
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   <button
//                     onClick={() => handleAdmit(candidate)}
//                     disabled={currentCandidate !== null}
//                     className="ml-4 flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
//                   >
//                     <UserCheck className="w-5 h-5" />
//                     Admit
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Instructions */}
//         <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
//           <h3 className="font-semibold text-blue-900 mb-3">Instructions</h3>
//           <ul className="space-y-2 text-sm text-blue-800">
//             <li className="flex items-start gap-2">
//               <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
//               <span>Only one candidate can be admitted at a time</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
//               <span>Review alerts before admitting a candidate</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
//               <span>Check resumes if uploaded before starting the interview</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WaitingRoom;

// // components/WaitingRoom.jsx - Updated with backend integration
// import React, { useState, useEffect } from 'react';
// import { Users, Clock, CheckCircle, AlertTriangle, UserCheck, FileText } from 'lucide-react';

// const WaitingRoom = ({ userRole, interviewId, candidateEmail, candidateName, onAdmitted }) => {
//   const [candidates, setCandidates] = useState([]);
//   const [isAdmitted, setIsAdmitted] = useState(false);
//   const [isHRInMeeting, setIsHRInMeeting] = useState(false);

//   // Candidate: Join waiting room on mount
//   useEffect(() => {
//     if (userRole === 'candidate' && interviewId && candidateEmail) {
//       joinWaitingRoom();
//     }
//   }, [userRole, interviewId, candidateEmail]);

//   // Candidate: Poll for admission status
//   useEffect(() => {
//     if (userRole === 'candidate' && interviewId && candidateEmail) {
//       const pollInterval = setInterval(async () => {
//         await checkAdmissionStatus();
//       }, 2000); // Check every 2 seconds

//       return () => clearInterval(pollInterval);
//     }
//   }, [userRole, interviewId, candidateEmail]);

//   // HR: Fetch waiting candidates periodically
//   useEffect(() => {
//     if (userRole === 'hr' && interviewId) {
//       fetchWaitingCandidates();
      
//       const pollInterval = setInterval(() => {
//         fetchWaitingCandidates();
//       }, 3000); // Refresh every 3 seconds

//       return () => clearInterval(pollInterval);
//     }
//   }, [userRole, interviewId]);

//   // Candidate joins waiting room
//   const joinWaitingRoom = async () => {
//     try {
//       const response = await fetch('http://localhost:5196/api/waiting-room/join', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           interviewId: interviewId,
//           candidateEmail: candidateEmail,
//           candidateName: candidateName || candidateEmail.split('@')[0]
//         })
//       });

//       if (response.ok) {
//         console.log('[DEBUG] Successfully joined waiting room');
//       }
//     } catch (error) {
//       console.error('[ERROR] Failed to join waiting room:', error);
//     }
//   };

//   // Check if candidate has been admitted
//   const checkAdmissionStatus = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5196/api/waiting-room/status/${interviewId}/${encodeURIComponent(candidateEmail)}`
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setIsHRInMeeting(data.isHRInMeeting);
        
//         if (data.isAdmitted && !isAdmitted) {
//           setIsAdmitted(true);
//           console.log('[DEBUG] Candidate admitted! Transitioning to meeting...');
          
//           // Notify parent to transition to meeting room
//           if (onAdmitted) {
//             onAdmitted();
//           }
//         }
//       }
//     } catch (error) {
//       console.error('[ERROR] Failed to check admission status:', error);
//     }
//   };

//   // HR: Fetch waiting candidates
//   const fetchWaitingCandidates = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `http://localhost:5196/api/waiting-room/candidates/${interviewId}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setCandidates(data);
//         console.log(`[DEBUG] Found ${data.length} waiting candidates`);
//       }
//     } catch (error) {
//       console.error('[ERROR] Failed to fetch waiting candidates:', error);
//     }
//   };

//   // HR: Admit candidate
//   const handleAdmit = async (candidate) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5196/api/waiting-room/admit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           interviewId: interviewId,
//           candidateEmail: candidate.candidateEmail
//         })
//       });

//       if (response.ok) {
//         console.log('[DEBUG] Candidate admitted successfully');
//         // Remove from local list
//         setCandidates(candidates.filter(c => c.candidateEmail !== candidate.candidateEmail));
        
//         // Transition HR to meeting room
//         if (onAdmitted) {
//           onAdmitted(candidate);
//         }
//       }
//     } catch (error) {
//       console.error('[ERROR] Failed to admit candidate:', error);
//       alert('Failed to admit candidate. Please try again.');
//     }
//   };

//   const getWaitTime = (joinedAt) => {
//     const diff = Date.now() - new Date(joinedAt).getTime();
//     const minutes = Math.floor(diff / 60000);
//     return minutes < 1 ? 'Just now' : `${minutes} min ago`;
//   };

//   // Candidate View
//   if (userRole === 'candidate') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
//           <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Clock className="w-10 h-10 text-blue-600 animate-pulse" />
//           </div>
          
//           <h1 className="text-2xl font-bold text-gray-900 mb-3">Please Wait</h1>
//           <p className="text-gray-600 mb-6">
//             {isHRInMeeting 
//               ? 'The HR manager is in the meeting room and will admit you shortly.'
//               : 'The HR manager will join and admit you shortly. Please stay on this page.'}
//           </p>

//           <div className="bg-blue-50 rounded-lg p-4 mb-6">
//             <div className="flex items-center justify-center gap-2 text-blue-900">
//               <Users className="w-5 h-5" />
//               <span className="font-medium">You are in the waiting room</span>
//             </div>
//             {isHRInMeeting && (
//               <div className="flex items-center justify-center gap-2 text-green-700 mt-2">
//                 <CheckCircle className="w-4 h-4" />
//                 <span className="text-sm">HR is in the meeting</span>
//               </div>
//             )}
//           </div>

//           <div className="space-y-3 text-sm text-gray-600">
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <span>Keep this tab active</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <span>Ensure your camera and mic are working</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <span>Find a quiet, well-lit space</span>
//             </div>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <p className="text-xs text-gray-500">
//               Estimated wait time: 2-5 minutes
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // HR View
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <div className="max-w-6xl mx-auto flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">Waiting Room</h1>
//             <p className="text-sm text-gray-600">
//               {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} waiting
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-8">
//         {candidates.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
//             <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users className="w-10 h-10 text-gray-400" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">No Candidates Waiting</h3>
//             <p className="text-gray-600">Candidates will appear here when they join using the meeting link.</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {candidates.map((candidate, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start gap-4 flex-1">
//                     {/* Avatar */}
//                     <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
//                       <Users className="w-7 h-7 text-blue-600" />
//                     </div>

//                     {/* Info */}
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h3 className="text-lg font-semibold text-gray-900">{candidate.candidateName}</h3>
//                         <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                           {getWaitTime(candidate.joinedAt)}
//                         </span>
//                       </div>
                      
//                       <p className="text-sm text-gray-600 mb-3">{candidate.candidateEmail}</p>

//                       <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full inline-flex">
//                         <CheckCircle className="w-3.5 h-3.5" />
//                         <span>Ready to join</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Button */}
//                   <button
//                     onClick={() => handleAdmit(candidate)}
//                     className="ml-4 flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
//                   >
//                     <UserCheck className="w-5 h-5" />
//                     Admit to Meeting
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Instructions */}
//         <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
//           <h3 className="font-semibold text-blue-900 mb-3">Instructions</h3>
//           <ul className="space-y-2 text-sm text-blue-800">
//             <li className="flex items-start gap-2">
//               <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
//               <span>Click "Admit to Meeting" to let the candidate join</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
//               <span>The list refreshes automatically every few seconds</span>
//             </li>
//             <li className="flex items-start gap-2">
//               <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
//               <span>You'll be taken to the meeting room after admitting a candidate</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WaitingRoom;

// components/WaitingRoom.jsx - Fixed with better error handling and logging
import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, AlertTriangle, UserCheck, FileText } from 'lucide-react';

const WaitingRoom = ({ userRole, interviewId, candidateEmail, candidateName, onAdmitted }) => {
  const [candidates, setCandidates] = useState([]);
  const [isAdmitted, setIsAdmitted] = useState(false);
  const [isHRInMeeting, setIsHRInMeeting] = useState(false);
  const [error, setError] = useState('');

  // Candidate: Join waiting room on mount
  useEffect(() => {
    if (userRole === 'candidate' && interviewId && candidateEmail) {
      console.log('[DEBUG] Candidate joining waiting room:', { interviewId, candidateEmail, candidateName });
      joinWaitingRoom();
    } else {
      console.warn('[WARN] Missing data for joining waiting room:', { userRole, interviewId, candidateEmail });
    }
  }, [userRole, interviewId, candidateEmail]);

  // Candidate: Poll for admission status
  useEffect(() => {
    if (userRole === 'candidate' && interviewId && candidateEmail) {
      const pollInterval = setInterval(async () => {
        await checkAdmissionStatus();
      }, 2000);

      return () => clearInterval(pollInterval);
    }
  }, [userRole, interviewId, candidateEmail, isAdmitted]);

  // HR: Fetch waiting candidates periodically
  useEffect(() => {
    if (userRole === 'hr' && interviewId) {
      console.log('[DEBUG] HR waiting room - fetching candidates for interview:', interviewId);
      fetchWaitingCandidates();
      
      const pollInterval = setInterval(() => {
        fetchWaitingCandidates();
      }, 3000);

      return () => clearInterval(pollInterval);
    }
  }, [userRole, interviewId]);

  // Candidate joins waiting room
  const joinWaitingRoom = async () => {
    try {
      console.log('[DEBUG] Sending join request to backend:', {
        interviewId,
        candidateEmail,
        candidateName: candidateName || candidateEmail.split('@')[0]
      });

      const response = await fetch('http://localhost:5196/api/waiting-room/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interviewId: interviewId,
          candidateEmail: candidateEmail,
          candidateName: candidateName || candidateEmail.split('@')[0]
        })
      });

      const data = await response.json();
      console.log('[DEBUG] Join response:', data);

      if (response.ok) {
        console.log('[SUCCESS] Successfully joined waiting room');
      } else {
        console.error('[ERROR] Failed to join waiting room:', data.message);
        setError(data.message || 'Failed to join waiting room');
      }
    } catch (error) {
      console.error('[ERROR] Failed to join waiting room:', error);
      setError('Connection error. Please check if the backend is running.');
    }
  };

  // Check if candidate has been admitted
  const checkAdmissionStatus = async () => {
    if (!interviewId || !candidateEmail) return;

    try {
      const response = await fetch(
        `http://localhost:5196/api/waiting-room/status/${interviewId}/${encodeURIComponent(candidateEmail)}`
      );

      if (response.ok) {
        const data = await response.json();
        setIsHRInMeeting(data.isHRInMeeting);
        
        if (data.isAdmitted && !isAdmitted) {
          setIsAdmitted(true);
          console.log('[SUCCESS] Candidate admitted! Transitioning to meeting...');
          
          if (onAdmitted) {
            onAdmitted();
          }
        }
      }
    } catch (error) {
      console.error('[ERROR] Failed to check admission status:', error);
    }
  };

  // HR: Fetch waiting candidates
  const fetchWaitingCandidates = async () => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('[DEBUG] Fetching waiting candidates for interview:', interviewId);
      
      const response = await fetch(
        `http://localhost:5196/api/waiting-room/candidates/${interviewId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('[DEBUG] Received candidates:', data);
        setCandidates(data);
        
        if (data.length > 0) {
          setError('');
        }
      } else {
        console.error('[ERROR] Failed to fetch candidates, status:', response.status);
      }
    } catch (error) {
      console.error('[ERROR] Failed to fetch waiting candidates:', error);
      setError('Failed to load waiting candidates');
    }
  };

  // // HR: Admit candidate
  // const handleAdmit = async (candidate) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     console.log('[DEBUG] Admitting candidate:', candidate);
      
  //     const response = await fetch('http://localhost:5196/api/waiting-room/admit', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         interviewId: interviewId,
  //         candidateEmail: candidate.candidateEmail
  //       })
  //     });

  //     const data = await response.json();
  //     console.log('[DEBUG] Admit response:', data);

  //     if (response.ok) {
  //       console.log('[SUCCESS] Candidate admitted successfully');
  //       setCandidates(candidates.filter(c => c.candidateEmail !== candidate.candidateEmail));
        
  //       if (onAdmitted) {
  //         onAdmitted(candidate);
  //       }
  //     } else {
  //       alert(data.message || 'Failed to admit candidate');
  //     }
  //   } catch (error) {
  //     console.error('[ERROR] Failed to admit candidate:', error);
  //     alert('Failed to admit candidate. Please try again.');
  //   }
  // };

  // In WaitingRoom.jsx - Update handleAdmit function
const handleAdmit = async (candidate) => {
  try {
    const token = localStorage.getItem('token');
    console.log('[WaitingRoom] Admitting candidate:', candidate);
    
    const response = await fetch('http://localhost:5196/api/waiting-room/admit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        interviewId: interviewId,
        candidateEmail: candidate.candidateEmail
      })
    });

    const data = await response.json();
    console.log('[WaitingRoom] Admit response:', data);

    if (response.ok) {
      console.log('[WaitingRoom] Candidate admitted successfully');
      setCandidates(candidates.filter(c => c.candidateEmail !== candidate.candidateEmail));
      
      // ✅ HR also transitions to meeting room
      if (onAdmitted) {
        onAdmitted(candidate);
      }
    } else {
      alert(data.message || 'Failed to admit candidate');
    }
  } catch (error) {
    console.error('[WaitingRoom] Failed to admit candidate:', error);
    alert('Failed to admit candidate. Please try again.');
  }
};

  const getWaitTime = (joinedAt) => {
    const diff = Date.now() - new Date(joinedAt).getTime();
    const minutes = Math.floor(diff / 60000);
    return minutes < 1 ? 'Just now' : `${minutes} min ago`;
  };

  // Candidate View
  if (userRole === 'candidate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-blue-600 animate-pulse" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Please Wait</h1>
          <p className="text-gray-600 mb-6">
            {isHRInMeeting 
              ? 'The HR manager is in the meeting room and will admit you shortly.'
              : 'The HR manager will join and admit you shortly. Please stay on this page.'}
          </p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-blue-900">
              <Users className="w-5 h-5" />
              <span className="font-medium">You are in the waiting room</span>
            </div>
            {isHRInMeeting && (
              <div className="flex items-center justify-center gap-2 text-green-700 mt-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">HR is in the meeting</span>
              </div>
            )}
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Keep this tab active</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Ensure your camera and mic are working</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Find a quiet, well-lit space</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Estimated wait time: 2-5 minutes
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Interview ID: {interviewId} • {candidateEmail}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // HR View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Waiting Room</h1>
            <p className="text-sm text-gray-600">
              Interview ID: {interviewId} • {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} waiting
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          </div>
        )}

        {candidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Candidates Waiting</h3>
            <p className="text-gray-600 mb-4">Candidates will appear here when they join using the meeting link.</p>
            <div className="text-sm text-gray-500">
              <p>Checking for candidates every 3 seconds...</p>
              <p className="mt-1">Interview ID: {interviewId}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {candidates.map((candidate, index) => (
              <div
                key={`${candidate.candidateEmail}-${index}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-7 h-7 text-blue-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.candidateName}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {getWaitTime(candidate.joinedAt)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{candidate.candidateEmail}</p>

                      <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full inline-flex">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Ready to join</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAdmit(candidate)}
                    className="ml-4 flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <UserCheck className="w-5 h-5" />
                    Admit to Meeting
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Instructions</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
              <span>Click "Admit to Meeting" to let the candidate join</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
              <span>The list refreshes automatically every 3 seconds</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
              <span>You'll be taken to the meeting room after admitting a candidate</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;