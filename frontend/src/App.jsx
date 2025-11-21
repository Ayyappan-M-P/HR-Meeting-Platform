// // App.jsx
// import React, { useState, useEffect } from 'react';
// import LoginPage from './components/LoginPage';
// import HRDashboard from './components/HRDashboard';
// import Scorecard from './components/Scorecard';
// import WaitingRoom from './components/WaitingRoom';
// import CandidateJoin from './components/CandidateJoin';
// import MeetingRoom from './components/MeetingRoom';

// function App() {
//   const [currentView, setCurrentView] = useState('login'); // login, dashboard, scorecard, waiting, candidateJoin, meeting
//   const [user, setUser] = useState(null);
//   const [selectedInterviewId, setSelectedInterviewId] = useState(null);
//   const [meetingLink, setMeetingLink] = useState(null);
//   const [userRole, setUserRole] = useState(null); // 'hr' or 'candidate'

//   // Check for existing session on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       const parsedUser = JSON.parse(userData);
//       setUser(parsedUser);
//       setUserRole(parsedUser.role.toLowerCase());
//       setCurrentView('dashboard');
//     } else {
//       // Check if URL contains meeting link (for candidates)
//       const urlParams = new URLSearchParams(window.location.search);
//       const link = urlParams.get('meeting');
      
//       if (link) {
//         setMeetingLink(link);
//         setUserRole('candidate');
//         setCurrentView('candidateJoin');
//       }
//     }
//   }, []);

//   // Handle login
//   const handleLogin = (userData) => {
//     setUser(userData);
//     setUserRole(userData.role.toLowerCase());
//     setCurrentView('dashboard');
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setUserRole(null);
//     setCurrentView('login');
//   };

//   // Navigate to different views
//   const handleNavigate = (view, data) => {
//     setCurrentView(view);
    
//     if (view === 'scorecard' && data) {
//       setSelectedInterviewId(data);
//     }
//   };

//   // Handle candidate join
//   const handleCandidateJoin = (candidateData) => {
//     console.log('Candidate joining:', candidateData);
//     setCurrentView('waiting');
//   };

//   // Handle admit from waiting room
//   const handleAdmit = (candidate) => {
//     console.log('Admitting candidate:', candidate);
//     setCurrentView('meeting');
//   };

//   // Render current view
//   const renderView = () => {
//     switch (currentView) {
//       case 'login':
//         return <LoginPage onLogin={handleLogin} />;
      
//       case 'dashboard':
//         return (
//           <HRDashboard 
//             user={user} 
//             onLogout={handleLogout}
//             onNavigate={handleNavigate}
//           />
//         );
      
//       case 'scorecard':
//         return (
//           <Scorecard 
//             interviewId={selectedInterviewId}
//             onBack={() => setCurrentView('dashboard')}
//           />
//         );
      
//       case 'waiting':
//         return (
//           <WaitingRoom 
//             userRole={userRole}
//             onAdmit={handleAdmit}
//           />
//         );
      
//       case 'candidateJoin':
//         return (
//           <CandidateJoin 
//             meetingLink={meetingLink}
//             onJoin={handleCandidateJoin}
//           />
//         );
      
//       case 'meeting':
//         return <MeetingRoom userRole={userRole} />;
      
//       default:
//         return <LoginPage onLogin={handleLogin} />;
//     }
//   };

//   return (
//     <div className="app">
//       {renderView()}
//     </div>
//   );
// }

// export default App;

// // App.jsx - Fixed with proper routing
// import React, { useState, useEffect } from 'react';
// import LoginPage from './components/LoginPage';
// import HRDashboard from './components/HRDashboard';
// import Scorecard from './components/Scorecard';
// import WaitingRoom from './components/WaitingRoom';
// import CandidateJoin from './components/CandidateJoin';
// import MeetingRoom from './components/MeetingRoom';

// function App() {
//   const [currentView, setCurrentView] = useState('login');
//   const [user, setUser] = useState(null);
//   const [selectedInterviewId, setSelectedInterviewId] = useState(null);
//   const [meetingId, setMeetingId] = useState(null);
//   const [userRole, setUserRole] = useState(null);
//   const [candidateData, setCandidateData] = useState(null);

//   // Check for existing session and routing on mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     // Check URL for candidate meeting link (multiple formats)
//     const path = window.location.pathname;
//     const urlParams = new URLSearchParams(window.location.search);
    
//     // Format 1: /candidateJoin/MSP-LB4-HH9
//     if (path.includes('/candidateJoin/')) {
//       const id = path.split('/candidateJoin/')[1];
//       if (id) {
//         setMeetingId(id);
//         setUserRole('candidate');
//         setCurrentView('candidateJoin');
//         return;
//       }
//     }
    
//     // Format 2: /join/MSP-LB4-HH9
//     if (path.includes('/join/')) {
//       const id = path.split('/join/')[1];
//       if (id) {
//         setMeetingId(id);
//         setUserRole('candidate');
//         setCurrentView('candidateJoin');
//         return;
//       }
//     }
    
//     // Format 3: ?meeting=MSP-LB4-HH9
//     const meetingParam = urlParams.get('meeting');
//     if (meetingParam) {
//       setMeetingId(meetingParam);
//       setUserRole('candidate');
//       setCurrentView('candidateJoin');
//       return;
//     }

//     // Check for existing logged-in session
//     if (token && userData) {
//       const parsedUser = JSON.parse(userData);
//       setUser(parsedUser);
//       setUserRole(parsedUser.role.toLowerCase());
      
//       // If HR, go to dashboard
//       if (parsedUser.role.toLowerCase() === 'hr') {
//         setCurrentView('dashboard');
//       } 
//       // If Candidate, check if interview info exists
//       else if (parsedUser.role.toLowerCase() === 'candidate') {
//         const interview = localStorage.getItem('interview');
//         if (interview) {
//           setCurrentView('waiting');
//         } else {
//           setCurrentView('candidateJoin');
//         }
//       }
//     }
//   }, []);

//   // Handle HR login
//   const handleLogin = (userData) => {
//     setUser(userData);
//     setUserRole(userData.role.toLowerCase());
//     localStorage.setItem('token', userData.token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setCurrentView('dashboard');
//   };

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('interview');
//     setUser(null);
//     setUserRole(null);
//     setCandidateData(null);
//     setCurrentView('login');
//     // Redirect to home
//     window.history.pushState({}, '', '/');
//   };

//   // Navigate to different views
//   const handleNavigate = (view, data) => {
//     setCurrentView(view);
    
//     if (view === 'scorecard' && data) {
//       setSelectedInterviewId(data);
//     }
//   };

//   // Handle candidate join
//   const handleCandidateJoin = (data) => {
//     console.log('Candidate joining:', data);
//     setCandidateData(data);
//     setUser(data.candidate);
//     setUserRole('candidate');
    
//     // Store candidate and interview data
//     localStorage.setItem('user', JSON.stringify(data.candidate));
//     if (data.interview) {
//       localStorage.setItem('interview', JSON.stringify(data.interview));
//     }
    
//     // Go to waiting room
//     setCurrentView('waiting');
//   };

//   // Handle admit from waiting room
//   const handleAdmit = (candidate) => {
//     console.log('Admitting candidate:', candidate);
//     setCurrentView('meeting');
//   };

//   // Render current view
//   const renderView = () => {
//     switch (currentView) {
//       case 'login':
//         return <LoginPage onLogin={handleLogin} />;
      
//       case 'dashboard':
//         return (
//           <HRDashboard 
//             user={user} 
//             onLogout={handleLogout}
//             onNavigate={handleNavigate}
//           />
//         );
      
//       case 'scorecard':
//         return (
//           <Scorecard 
//             interviewId={selectedInterviewId}
//             onBack={() => setCurrentView('dashboard')}
//           />
//         );
      
//       case 'waiting':
//         return (
//           <WaitingRoom 
//             userRole={userRole}
//             onAdmit={handleAdmit}
//           />
//         );
      
//       case 'candidateJoin':
//         return (
//           <CandidateJoin 
//             meetingId={meetingId}
//             onJoin={handleCandidateJoin}
//           />
//         );
      
//       case 'meeting':
//         return (
//           <MeetingRoom 
//             userRole={userRole}
//             candidateData={candidateData}
//           />
//         );
      
//       default:
//         return <LoginPage onLogin={handleLogin} />;
//     }
//   };

//   return (
//     <div className="app">
//       {renderView()}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import HRDashboard from './components/HRDashboard';
import Scorecard from './components/Scorecard';
import WaitingRoom from './components/WaitingRoom';
import CandidateJoin from './components/CandidateJoin';
import MeetingRoom from './components/MeetingRoom';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);
  const [meetingId, setMeetingId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [candidateData, setCandidateData] = useState(null);

  // Check for existing session and routing on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    // Check URL for candidate meeting link (multiple formats)
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Format 1: /candidateJoin/MSP-LB4-HH9
    if (path.includes('/candidateJoin/')) {
      const id = path.split('/candidateJoin/')[1];
      if (id) {
        setMeetingId(id);
        setUserRole('candidate');
        setCurrentView('candidateJoin');
        return;
      }
    }
    
    // Format 2: /join/MSP-LB4-HH9
    if (path.includes('/join/')) {
      const id = path.split('/join/')[1];
      if (id) {
        setMeetingId(id);
        setUserRole('candidate');
        setCurrentView('candidateJoin');
        return;
      }
    }
    
    // Format 3: ?meeting=MSP-LB4-HH9
    const meetingParam = urlParams.get('meeting');
    if (meetingParam) {
      setMeetingId(meetingParam);
      setUserRole('candidate');
      setCurrentView('candidateJoin');
      return;
    }

    // ✅ Check for existing logged-in session (with null checks)
    if (token && userData && userData !== 'undefined') {
      try {
        const parsedUser = JSON.parse(userData);
        
        // Validate user object has required properties
        if (parsedUser && parsedUser.role) {
          setUser(parsedUser);
          setUserRole(parsedUser.role.toLowerCase());
          
          // If HR, go to dashboard
          if (parsedUser.role.toLowerCase() === 'hr') {
            setCurrentView('dashboard');
          } 
          // If Candidate, check if interview info exists
          else if (parsedUser.role.toLowerCase() === 'candidate') {
            const interviewData = localStorage.getItem('interview');
            
            if (interviewData && interviewData !== 'undefined') {
              try {
                const interview = JSON.parse(interviewData);
                if (interview) {
                  setCurrentView('waiting');
                  return;
                }
              } catch (err) {
                console.error('Failed to parse interview data:', err);
                localStorage.removeItem('interview');
              }
            }
            setCurrentView('candidateJoin');
          }
        } else {
          // Invalid user data, clear and show login
          console.warn('Invalid user data in localStorage');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Failed to parse user data:', err);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentView('login');
      }
    }
  }, []);

  // Handle HR login
  const handleLogin = (userData) => {
    console.log('Login successful:', userData);
    setUser(userData);
    
    // ✅ Handle both possible role formats (camelCase)
    const role = userData.role || userData.Role;
    setUserRole(role?.toLowerCase());
    
    // Don't store token again if it's already in localStorage
    // The apiService already handles this
    setCurrentView('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('interview');
    setUser(null);
    setUserRole(null);
    setCandidateData(null);
    setCurrentView('login');
    // Redirect to home
    window.history.pushState({}, '', '/');
  };

  // Navigate to different views
  const handleNavigate = (view, data) => {
    setCurrentView(view);
    
    if (view === 'scorecard' && data) {
      setSelectedInterviewId(data);
    }
  };

  // Handle candidate join
  const handleCandidateJoin = (data) => {
    console.log('Candidate joining:', data);
    setCandidateData(data);
    setUser(data.candidate);
    setUserRole('candidate');
    
    // Store candidate and interview data
    localStorage.setItem('user', JSON.stringify(data.candidate));
    if (data.interview) {
      localStorage.setItem('interview', JSON.stringify(data.interview));
    }
    
    // Go to waiting room
    setCurrentView('waiting');
  };

  // Handle admit from waiting room
  const handleAdmit = (candidate) => {
    console.log('Admitting candidate:', candidate);
    setCurrentView('meeting');
  };

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      
      case 'dashboard':
        return (
          <HRDashboard 
            user={user} 
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      
      case 'scorecard':
        return (
          <Scorecard 
            interviewId={selectedInterviewId}
            onBack={() => setCurrentView('dashboard')}
          />
        );
      
      case 'waiting':
        return (
          <WaitingRoom 
            userRole={userRole}
            onAdmit={handleAdmit}
          />
        );
      
      case 'candidateJoin':
        return (
          <CandidateJoin 
            meetingId={meetingId}
            onJoin={handleCandidateJoin}
          />
        );
      
      case 'meeting':
        return (
          <MeetingRoom 
            userRole={userRole}
            candidateData={candidateData}
          />
        );
      
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app">
      {renderView()}
    </div>
  );
}

export default App;