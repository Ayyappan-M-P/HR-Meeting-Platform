// // // components/LoginPage.jsx
// // import React, { useState } from 'react';
// // import { LogIn, AlertCircle } from 'lucide-react';

// // const LoginPage = ({ onLogin }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     try {
// //       const response = await fetch('http://localhost:5196/api/auth/login', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ email, password })
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || 'Login failed');
// //       }

// //       localStorage.setItem('token', data.token);
// //       localStorage.setItem('user', JSON.stringify(data.user));
// //       onLogin(data.user);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
// //       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
// //         <div className="text-center mb-8">
// //           <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <LogIn className="w-8 h-8 text-white" />
// //           </div>
// //           <h1 className="text-3xl font-bold text-gray-800">HR Login</h1>
// //           <p className="text-gray-600 mt-2">Interview Management Platform</p>
// //         </div>

// //         {error && (
// //           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
// //             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
// //             <p className="text-sm text-red-800">{error}</p>
// //           </div>
// //         )}

// //         <div className="space-y-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Email Address
// //             </label>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               placeholder="hr@company.com"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-2">
// //               Password
// //             </label>
// //             <input
// //               type="password"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               placeholder="••••••••"
// //               required
// //             />
// //           </div>

// //           <button
// //             onClick={handleSubmit}
// //             disabled={loading}
// //             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
// //           >
// //             {loading ? (
// //               <>
// //                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
// //                 Signing in...
// //               </>
// //             ) : (
// //               <>
// //                 <LogIn className="w-5 h-5" />
// //                 Sign In
// //               </>
// //             )}
// //           </button>
// //         </div>

// //         <div className="mt-6 text-center text-sm text-gray-600">
// //           <p>Demo Credentials:</p>
// //           <p className="font-mono text-xs mt-1">hr@company.com / password123</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;

// // components/LoginPage.jsx - Updated for HR Only
// import React, { useState } from 'react';
// import { LogIn, AlertCircle, Users } from 'lucide-react';

// const LoginPage = ({ onLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Predefined HR accounts for display
//   const hrAccounts = [
//     { name: 'HR Manager', email: 'hr@company.com', password: 'hr123' },
//     { name: 'Sarah Johnson', email: 'sarah@company.com', password: 'sarah123' },
//     { name: 'Michael Brown', email: 'michael@company.com', password: 'mike123' }
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:5196/api/auth/hr/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Login failed');
//       }

//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       onLogin(data.user);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const quickLogin = (account) => {
//     setEmail(account.email);
//     setPassword(account.password);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
//         <div className="text-center mb-8">
//           <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Users className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">HR Login</h1>
//           <p className="text-gray-600 mt-2">Interview Management Platform</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <p className="text-sm text-red-800">{error}</p>
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="hr@company.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
//           >
//             {loading ? (
//               <>
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               <>
//                 <LogIn className="w-5 h-5" />
//                 Sign In
//               </>
//             )}
//           </button>
//         </div>

//         {/* Quick Login Buttons */}
//         <div className="mt-6 pt-6 border-t border-gray-200">
//           <p className="text-sm text-gray-600 text-center mb-3 font-semibold">Quick Login (Demo)</p>
//           <div className="space-y-2">
//             {hrAccounts.map((account, index) => (
//               <button
//                 key={index}
//                 onClick={() => quickLogin(account)}
//                 className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium text-gray-900 text-sm">{account.name}</p>
//                     <p className="text-xs text-gray-600">{account.email}</p>
//                   </div>
//                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                     {account.password}
//                   </span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mt-6 text-center">
//           <p className="text-xs text-gray-500">
//             Candidates: Join using the meeting link sent to your email
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// components/LoginPage.jsx - Updated for HR Only
import React, { useState } from 'react';
import apiService from "../services/api";   // ✅ Correct import
import { LogIn, AlertCircle, Users } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Predefined HR accounts for display
  const hrAccounts = [
    { name: 'HR Manager', email: 'hr@company.com', password: 'hr123' },
    { name: 'Sarah Johnson', email: 'sarah@company.com', password: 'sarah123' },
    { name: 'Michael Brown', email: 'michael@company.com', password: 'mike123' }
  ];

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     // ✅ Use apiService instead of fetch
  //     const data = await apiService.hrLogin(email, password);

  //     localStorage.setItem('token', data.Token);
  //     localStorage.setItem('user', JSON.stringify(data.User));

  //     onLogin(data.User);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const data = await apiService.hrLogin(email, password);

    // ✅ Now using camelCase (lowercase)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    onLogin(data.user);  // ✅ lowercase
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
  const quickLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">HR Login</h1>
          <p className="text-gray-600 mt-2">Interview Management Platform</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="hr@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </div>

        {/* Quick Login Buttons */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-3 font-semibold">Quick Login (Demo)</p>
          <div className="space-y-2">
            {hrAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => quickLogin(account)}
                className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{account.name}</p>
                    <p className="text-xs text-gray-600">{account.email}</p>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {account.password}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Candidates: Join using the meeting link sent to your email
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
