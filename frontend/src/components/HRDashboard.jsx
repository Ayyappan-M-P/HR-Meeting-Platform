// // // components/HRDashboard.jsx
// // import React, { useState, useEffect } from 'react';
// // import { Calendar, Mail, Users, FileText, AlertTriangle, Plus, LogOut, Clock, CheckCircle, XCircle } from 'lucide-react';

// // const HRDashboard = ({ user, onLogout, onNavigate }) => {
// //   const [interviews, setInterviews] = useState([]);
// //   const [stats, setStats] = useState({
// //     scheduled: 0,
// //     completed: 0,
// //     pending: 0
// //   });
// //   const [showCreateModal, setShowCreateModal] = useState(false);
// //   const [newInterview, setNewInterview] = useState({
// //     candidateEmail: '',
// //     candidateName: '',
// //     scheduledAt: ''
// //   });

// //   useEffect(() => {
// //     fetchInterviews();
// //   }, []);

// //   const fetchInterviews = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('http://localhost:5196/api/hr/interviews', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         }
// //       });
// //       const data = await response.json();
// //       setInterviews(data);
      
// //       // Calculate stats
// //       const scheduled = data.filter(i => i.status === 'Scheduled').length;
// //       const completed = data.filter(i => i.status === 'Completed').length;
// //       const pending = data.filter(i => i.status === 'Pending').length;
// //       setStats({ scheduled, completed, pending });
// //     } catch (err) {
// //       console.error('Failed to fetch interviews:', err);
// //     }
// //   };

// //   const handleCreateInterview = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('http://localhost:5196/api/hr/interviews/create', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify(newInterview)
// //       });

// //       if (response.ok) {
// //         setShowCreateModal(false);
// //         setNewInterview({ candidateEmail: '', candidateName: '', scheduledAt: '' });
// //         fetchInterviews();
// //       }
// //     } catch (err) {
// //       console.error('Failed to create interview:', err);
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     switch (status) {
// //       case 'Scheduled': return 'bg-blue-100 text-blue-800';
// //       case 'Completed': return 'bg-green-100 text-green-800';
// //       case 'In Progress': return 'bg-yellow-100 text-yellow-800';
// //       default: return 'bg-gray-100 text-gray-800';
// //     }
// //   };

// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case 'Scheduled': return <Clock className="w-4 h-4" />;
// //       case 'Completed': return <CheckCircle className="w-4 h-4" />;
// //       default: return <AlertTriangle className="w-4 h-4" />;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
// //             <p className="text-sm text-gray-600 mt-1">Welcome back, {user.name}</p>
// //           </div>
// //           <button
// //             onClick={onLogout}
// //             className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
// //           >
// //             <LogOut className="w-5 h-5" />
// //             <span>Logout</span>
// //           </button>
// //         </div>
// //       </header>

// //       <div className="max-w-7xl mx-auto px-6 py-8">
// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm text-gray-600 mb-1">Scheduled</p>
// //                 <p className="text-3xl font-bold text-gray-900">{stats.scheduled}</p>
// //               </div>
// //               <div className="bg-blue-100 p-3 rounded-lg">
// //                 <Calendar className="w-6 h-6 text-blue-600" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm text-gray-600 mb-1">Completed</p>
// //                 <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
// //               </div>
// //               <div className="bg-green-100 p-3 rounded-lg">
// //                 <CheckCircle className="w-6 h-6 text-green-600" />
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
// //                 <p className="text-3xl font-bold text-gray-900">{interviews.length}</p>
// //               </div>
// //               <div className="bg-purple-100 p-3 rounded-lg">
// //                 <Users className="w-6 h-6 text-purple-600" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Actions */}
// //         <div className="flex items-center justify-between mb-6">
// //           <h2 className="text-xl font-semibold text-gray-900">Interview Sessions</h2>
// //           <button
// //             onClick={() => setShowCreateModal(true)}
// //             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
// //           >
// //             <Plus className="w-5 h-5" />
// //             Create Interview
// //           </button>
// //         </div>

// //         {/* Interviews Table */}
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead className="bg-gray-50 border-b border-gray-200">
// //                 <tr>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Scheduled Time</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Meeting Link</th>
// //                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {interviews.map((interview) => (
// //                   <tr key={interview.id} className="hover:bg-gray-50 transition-colors">
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-3">
// //                         <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
// //                           <Users className="w-5 h-5 text-blue-600" />
// //                         </div>
// //                         <div>
// //                           <p className="font-medium text-gray-900">{interview.candidateEmail.split('@')[0]}</p>
// //                           <p className="text-sm text-gray-600">{interview.candidateEmail}</p>
// //                         </div>
// //                       </div>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-700">
// //                       {new Date(interview.scheduledAt).toLocaleString()}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
// //                         {getStatusIcon(interview.status)}
// //                         {interview.status}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
// //                         Copy Link
// //                       </button>
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <button
// //                           onClick={() => onNavigate('scorecard', interview.id)}
// //                           className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
// //                           title="View Scorecard"
// //                         >
// //                           <FileText className="w-5 h-5" />
// //                         </button>
// //                         <button
// //                           className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
// //                           title="View Details"
// //                         >
// //                           <AlertTriangle className="w-5 h-5" />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Create Interview Modal */}
// //       {showCreateModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// //           <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
// //             <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Interview</h3>
            
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Candidate Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={newInterview.candidateName}
// //                   onChange={(e) => setNewInterview({...newInterview, candidateName: e.target.value})}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="John Doe"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Candidate Email
// //                 </label>
// //                 <input
// //                   type="email"
// //                   value={newInterview.candidateEmail}
// //                   onChange={(e) => setNewInterview({...newInterview, candidateEmail: e.target.value})}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   placeholder="candidate@email.com"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Scheduled Date & Time
// //                 </label>
// //                 <input
// //                   type="datetime-local"
// //                   value={newInterview.scheduledAt}
// //                   onChange={(e) => setNewInterview({...newInterview, scheduledAt: e.target.value})}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex gap-3 mt-6">
// //               <button
// //                 onClick={() => setShowCreateModal(false)}
// //                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleCreateInterview}
// //                 className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
// //               >
// //                 Create & Send Link
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default HRDashboard;


// // components/HRDashboard.jsx - Fixed
// import React, { useState, useEffect } from 'react';
// import { Calendar, Mail, Users, FileText, AlertTriangle, Plus, LogOut, Clock, CheckCircle, XCircle, Copy, Check } from 'lucide-react';

// const HRDashboard = ({ user, onLogout, onNavigate }) => {
//   const [interviews, setInterviews] = useState([]);
//   const [stats, setStats] = useState({
//     scheduled: 0,
//     completed: 0,
//     pending: 0
//   });
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [newInterview, setNewInterview] = useState({
//     candidateEmail: '',
//     candidateName: '',
//     scheduledAt: ''
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [copiedLink, setCopiedLink] = useState(null);

//   useEffect(() => {
//     fetchInterviews();
//   }, []);

//   const fetchInterviews = async () => {
//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         console.error('No token found');
//         onLogout();
//         return;
//       }

//       console.log('Fetching interviews with token:', token.substring(0, 20) + '...');

//       const response = await fetch('http://localhost:5196/api/hr/interviews', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.status === 401) {
//         console.error('Token expired or invalid');
//         alert('Your session has expired. Please login again.');
//         onLogout();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('Interviews fetched:', data);
      
//       setInterviews(data);
      
//       // Calculate stats
//       const scheduled = data.filter(i => i.status === 'Scheduled').length;
//       const completed = data.filter(i => i.status === 'Completed').length;
//       const pending = data.filter(i => i.status === 'Pending').length;
//       setStats({ scheduled, completed, pending });
//     } catch (err) {
//       console.error('Failed to fetch interviews:', err);
//       setError('Failed to load interviews. Please try again.');
//     }
//   };

//   const handleCreateInterview = async () => {
//     // Validation
//     if (!newInterview.candidateEmail.trim()) {
//       setError('Candidate email is required');
//       return;
//     }
//     if (!newInterview.candidateName.trim()) {
//       setError('Candidate name is required');
//       return;
//     }
//     if (!newInterview.scheduledAt) {
//       setError('Scheduled date and time is required');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         console.error('No token found');
//         onLogout();
//         return;
//       }

//       console.log('Creating interview with token:', token.substring(0, 20) + '...');
//       console.log('Interview data:', newInterview);

//       const response = await fetch('http://localhost:5196/api/hr/interviews/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(newInterview)
//       });

//       console.log('Response status:', response.status);

//       if (response.status === 401) {
//         console.error('Token expired or invalid');
//         alert('Your session has expired. Please login again.');
//         onLogout();
//         return;
//       }

//       const data = await response.json();
//       console.log('Response data:', data);

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to create interview');
//       }

//       // Success
//       setShowCreateModal(false);
//       setNewInterview({ candidateEmail: '', candidateName: '', scheduledAt: '' });
//       setError('');
//       fetchInterviews();
      
//       alert('Interview created successfully! Meeting link sent to candidate.');
//     } catch (err) {
//       console.error('Failed to create interview:', err);
//       setError(err.message || 'Failed to create interview. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = async (link, id) => {
//     try {
//       await navigator.clipboard.writeText(link);
//       setCopiedLink(id);
//       setTimeout(() => setCopiedLink(null), 2000);
//     } catch (err) {
//       console.error('Failed to copy:', err);
//       alert('Failed to copy link');
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Scheduled': return 'bg-blue-100 text-blue-800';
//       case 'Completed': return 'bg-green-100 text-green-800';
//       case 'In Progress': return 'bg-yellow-100 text-yellow-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Scheduled': return <Clock className="w-4 h-4" />;
//       case 'Completed': return <CheckCircle className="w-4 h-4" />;
//       default: return <AlertTriangle className="w-4 h-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
//             <p className="text-sm text-gray-600 mt-1">Welcome back, {user.name}</p>
//           </div>
//           <button
//             onClick={onLogout}
//             className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <LogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="flex items-center gap-2">
//               <AlertTriangle className="w-5 h-5 text-red-600" />
//               <p className="text-sm text-red-800">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Scheduled</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.scheduled}</p>
//               </div>
//               <div className="bg-blue-100 p-3 rounded-lg">
//                 <Calendar className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Completed</p>
//                 <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
//               </div>
//               <div className="bg-green-100 p-3 rounded-lg">
//                 <CheckCircle className="w-6 h-6 text-green-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
//                 <p className="text-3xl font-bold text-gray-900">{interviews.length}</p>
//               </div>
//               <div className="bg-purple-100 p-3 rounded-lg">
//                 <Users className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-semibold text-gray-900">Interview Sessions</h2>
//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             Create Interview
//           </button>
//         </div>

//         {/* Interviews Table */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Scheduled Time</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Meeting Link</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {interviews.map((interview) => (
//                   <tr key={interview.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
//                           <Users className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900">{interview.candidateEmail.split('@')[0]}</p>
//                           <p className="text-sm text-gray-600">{interview.candidateEmail}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-700">
//                       {new Date(interview.scheduledAt).toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
//                         {getStatusIcon(interview.status)}
//                         {interview.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <button 
//                         onClick={() => copyToClipboard(interview.meetingLink, interview.id)}
//                         className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
//                       >
//                         {copiedLink === interview.id ? (
//                           <>
//                             <Check className="w-4 h-4" />
//                             Copied!
//                           </>
//                         ) : (
//                           <>
//                             <Copy className="w-4 h-4" />
//                             Copy Link
//                           </>
//                         )}
//                       </button>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => onNavigate('scorecard', interview.id)}
//                           className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                           title="View Scorecard"
//                         >
//                           <FileText className="w-5 h-5" />
//                         </button>
//                         <button
//                           className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                           title="View Details"
//                         >
//                           <AlertTriangle className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Create Interview Modal */}
//       {showCreateModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Interview</h3>
            
//             {error && (
//               <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
//                 <p className="text-sm text-red-800">{error}</p>
//               </div>
//             )}

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Candidate Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={newInterview.candidateName}
//                   onChange={(e) => setNewInterview({...newInterview, candidateName: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="John Doe"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Candidate Email *
//                 </label>
//                 <input
//                   type="email"
//                   value={newInterview.candidateEmail}
//                   onChange={(e) => setNewInterview({...newInterview, candidateEmail: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="candidate@email.com"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Scheduled Date & Time *
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={newInterview.scheduledAt}
//                   onChange={(e) => setNewInterview({...newInterview, scheduledAt: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button
//                 onClick={() => {
//                   setShowCreateModal(false);
//                   setError('');
//                 }}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateInterview}
//                 disabled={loading}
//                 className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Creating...
//                   </>
//                 ) : (
//                   'Create & Send Link'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HRDashboard;

// components/HRDashboard.jsx - Fixed with Join Meeting functionality
import React, { useState, useEffect } from 'react';
import { Calendar, Mail, Users, FileText, AlertTriangle, Plus, LogOut, Clock, CheckCircle, XCircle, Copy, Check, Video } from 'lucide-react';

const HRDashboard = ({ user, onLogout, onNavigate }) => {
  const [interviews, setInterviews] = useState([]);
  const [stats, setStats] = useState({
    scheduled: 0,
    completed: 0,
    pending: 0
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newInterview, setNewInterview] = useState({
    candidateEmail: '',
    candidateName: '',
    scheduledAt: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        onLogout();
        return;
      }

      console.log('Fetching interviews with token:', token.substring(0, 20) + '...');

      const response = await fetch('http://localhost:5196/api/hr/interviews', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        console.error('Token expired or invalid');
        alert('Your session has expired. Please login again.');
        onLogout();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Interviews fetched:', data);
      
      setInterviews(data);
      
      // Calculate stats
      const scheduled = data.filter(i => i.status === 'Scheduled').length;
      const completed = data.filter(i => i.status === 'Completed').length;
      const pending = data.filter(i => i.status === 'Pending').length;
      setStats({ scheduled, completed, pending });
    } catch (err) {
      console.error('Failed to fetch interviews:', err);
      setError('Failed to load interviews. Please try again.');
    }
  };

  const handleCreateInterview = async () => {
    // Validation
    if (!newInterview.candidateEmail.trim()) {
      setError('Candidate email is required');
      return;
    }
    if (!newInterview.candidateName.trim()) {
      setError('Candidate name is required');
      return;
    }
    if (!newInterview.scheduledAt) {
      setError('Scheduled date and time is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        onLogout();
        return;
      }

      console.log('Creating interview with token:', token.substring(0, 20) + '...');
      console.log('Interview data:', newInterview);

      const response = await fetch('http://localhost:5196/api/hr/interviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newInterview)
      });

      console.log('Response status:', response.status);

      if (response.status === 401) {
        console.error('Token expired or invalid');
        alert('Your session has expired. Please login again.');
        onLogout();
        return;
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create interview');
      }

      // Success
      setShowCreateModal(false);
      setNewInterview({ candidateEmail: '', candidateName: '', scheduledAt: '' });
      setError('');
      fetchInterviews();
      
      alert('Interview created successfully! Meeting link sent to candidate.');
    } catch (err) {
      console.error('Failed to create interview:', err);
      setError(err.message || 'Failed to create interview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (link, id) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(id);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy link');
    }
  };

  // NEW: Handle HR joining the meeting
  const handleJoinMeeting = (interview) => {
    // Store interview details in localStorage for the meeting room
    localStorage.setItem('currentInterview', JSON.stringify({
      id: interview.id,
      candidateEmail: interview.candidateEmail,
      meetingLink: interview.meetingLink,
      role: 'HR'
    }));
    
    // Navigate to meeting room
    onNavigate('meeting', interview.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Scheduled': return <Clock className="w-4 h-4" />;
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome back, {user.name}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Scheduled</p>
                <p className="text-3xl font-bold text-gray-900">{stats.scheduled}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
                <p className="text-3xl font-bold text-gray-900">{interviews.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Interview Sessions</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Interview
          </button>
        </div>

        {/* Interviews Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Candidate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Scheduled Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Meeting Link</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {interviews.map((interview) => (
                  <tr key={interview.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{interview.candidateEmail.split('@')[0]}</p>
                          <p className="text-sm text-gray-600">{interview.candidateEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(interview.scheduledAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                        {getStatusIcon(interview.status)}
                        {interview.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => copyToClipboard(interview.meetingLink, interview.id)}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {copiedLink === interview.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Link
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* NEW: Join Meeting Button */}
                        <button
                          onClick={() => handleJoinMeeting(interview)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                          title="Join Meeting"
                        >
                          <Video className="w-4 h-4" />
                          Join
                        </button>
                        
                        <button
                          onClick={() => onNavigate('scorecard', interview.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Scorecard"
                        >
                          <FileText className="w-5 h-5" />
                        </button>
                        <button
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <AlertTriangle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Interview Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create New Interview</h3>
            
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Candidate Name *
                </label>
                <input
                  type="text"
                  value={newInterview.candidateName}
                  onChange={(e) => setNewInterview({...newInterview, candidateName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Candidate Email *
                </label>
                <input
                  type="email"
                  value={newInterview.candidateEmail}
                  onChange={(e) => setNewInterview({...newInterview, candidateEmail: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="candidate@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scheduled Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={newInterview.scheduledAt}
                  onChange={(e) => setNewInterview({...newInterview, scheduledAt: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setError('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInterview}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create & Send Link'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;