// components/WaitingRoom.jsx
import React, { useState, useEffect } from 'react';
import { Users, Clock, CheckCircle, AlertTriangle, UserCheck, FileText } from 'lucide-react';

const WaitingRoom = ({ userRole, onAdmit }) => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      joinedAt: new Date(Date.now() - 300000),
      resumeUrl: null,
      alerts: {
        multipleFaces: 0,
        tabSwitches: 2,
        mobileUsage: false
      }
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      joinedAt: new Date(Date.now() - 120000),
      resumeUrl: 'resume.pdf',
      alerts: {
        multipleFaces: 1,
        tabSwitches: 0,
        mobileUsage: false
      }
    }
  ]);

  const [currentCandidate, setCurrentCandidate] = useState(null);

  const handleAdmit = (candidate) => {
    setCurrentCandidate(candidate);
    setCandidates(candidates.filter(c => c.id !== candidate.id));
    onAdmit(candidate);
  };

  const getWaitTime = (joinedAt) => {
    const diff = Date.now() - joinedAt.getTime();
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
            The HR manager will admit you shortly. Please stay on this page.
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-blue-900">
              <Users className="w-5 h-5" />
              <span className="font-medium">You are in the waiting room</span>
            </div>
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
              {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} waiting
            </p>
          </div>
          {currentCandidate && (
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">
              <UserCheck className="w-5 h-5" />
              <span>In interview with {currentCandidate.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {candidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Candidates Waiting</h3>
            <p className="text-gray-600">Candidates will appear here when they join using the meeting link.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Avatar */}
                    <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-7 h-7 text-blue-600" />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {getWaitTime(candidate.joinedAt)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{candidate.email}</p>

                      {/* Alerts */}
                      <div className="flex flex-wrap items-center gap-3">
                        {candidate.alerts.tabSwitches > 0 && (
                          <div className="flex items-center gap-1.5 text-xs text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>{candidate.alerts.tabSwitches} tab switch{candidate.alerts.tabSwitches > 1 ? 'es' : ''}</span>
                          </div>
                        )}
                        
                        {candidate.alerts.multipleFaces > 0 && (
                          <div className="flex items-center gap-1.5 text-xs text-red-700 bg-red-50 px-3 py-1 rounded-full">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Multiple faces detected</span>
                          </div>
                        )}
                        
                        {candidate.alerts.mobileUsage && (
                          <div className="flex items-center gap-1.5 text-xs text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Mobile usage</span>
                          </div>
                        )}

                        {candidate.alerts.tabSwitches === 0 && 
                         candidate.alerts.multipleFaces === 0 && 
                         !candidate.alerts.mobileUsage && (
                          <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-3 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>No alerts</span>
                          </div>
                        )}

                        {candidate.resumeUrl && (
                          <button className="flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Resume</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAdmit(candidate)}
                    disabled={currentCandidate !== null}
                    className="ml-4 flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
                  >
                    <UserCheck className="w-5 h-5" />
                    Admit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Instructions</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
              <span>Only one candidate can be admitted at a time</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
              <span>Review alerts before admitting a candidate</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5" />
              <span>Check resumes if uploaded before starting the interview</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;