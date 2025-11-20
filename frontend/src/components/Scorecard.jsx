// components/Scorecard.jsx
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, CheckCircle, XCircle, Clock } from 'lucide-react';

const Scorecard = ({ interviewId, onBack }) => {
  const [scorecard, setScorecard] = useState({
    communication: 5,
    technical: 5,
    coding: 5,
    attitude: 5,
    finalDecision: 'Pending',
    comments: ''
  });
  const [saved, setSaved] = useState(false);
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    fetchScorecard();
    fetchInterview();
  }, [interviewId]);

  const fetchScorecard = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5196/api/hr/scorecard/${interviewId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setScorecard(data);
      }
    } catch (err) {
      console.error('Failed to fetch scorecard:', err);
    }
  };

  const fetchInterview = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5196/api/hr/interviews/${interviewId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setInterview(data);
      }
    } catch (err) {
      console.error('Failed to fetch interview:', err);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/hr/scorecard/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          interviewId,
          ...scorecard
        })
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error('Failed to save scorecard:', err);
    }
  };

  const RatingSlider = ({ label, value, onChange }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-lg font-bold text-blue-600">{value}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Poor</span>
        <span>Average</span>
        <span>Excellent</span>
      </div>
    </div>
  );

  const getDecisionStyle = (decision) => {
    switch (decision) {
      case 'Selected':
        return 'bg-green-600 hover:bg-green-700';
      case 'Rejected':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Interview Scorecard</h1>
              <p className="text-sm text-gray-600">
                Candidate: {interview?.interview?.candidateEmail}
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${
              saved ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Scorecard
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Performance Ratings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Performance Evaluation</h2>
          
          <div className="space-y-6">
            <RatingSlider
              label="Communication Skills"
              value={scorecard.communication}
              onChange={(val) => setScorecard({...scorecard, communication: val})}
            />
            
            <RatingSlider
              label="Technical Knowledge"
              value={scorecard.technical}
              onChange={(val) => setScorecard({...scorecard, technical: val})}
            />
            
            <RatingSlider
              label="Coding Ability"
              value={scorecard.coding}
              onChange={(val) => setScorecard({...scorecard, coding: val})}
            />
            
            <RatingSlider
              label="Attitude & Culture Fit"
              value={scorecard.attitude}
              onChange={(val) => setScorecard({...scorecard, attitude: val})}
            />
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 mb-6 text-white">
          <div className="text-center">
            <p className="text-sm font-medium opacity-90 mb-2">Overall Score</p>
            <p className="text-5xl font-bold">
              {((scorecard.communication + scorecard.technical + scorecard.coding + scorecard.attitude) / 4).toFixed(1)}
            </p>
            <p className="text-sm opacity-90 mt-2">out of 10</p>
          </div>
        </div>

        {/* Final Decision */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Final Decision</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setScorecard({...scorecard, finalDecision: 'Selected'})}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                scorecard.finalDecision === 'Selected'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <CheckCircle className={`w-8 h-8 ${
                scorecard.finalDecision === 'Selected' ? 'text-green-600' : 'text-gray-400'
              }`} />
              <span className={`font-medium ${
                scorecard.finalDecision === 'Selected' ? 'text-green-900' : 'text-gray-700'
              }`}>
                Selected
              </span>
            </button>

            <button
              onClick={() => setScorecard({...scorecard, finalDecision: 'Rejected'})}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                scorecard.finalDecision === 'Rejected'
                  ? 'border-red-600 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <XCircle className={`w-8 h-8 ${
                scorecard.finalDecision === 'Rejected' ? 'text-red-600' : 'text-gray-400'
              }`} />
              <span className={`font-medium ${
                scorecard.finalDecision === 'Rejected' ? 'text-red-900' : 'text-gray-700'
              }`}>
                Rejected
              </span>
            </button>

            <button
              onClick={() => setScorecard({...scorecard, finalDecision: 'Pending'})}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                scorecard.finalDecision === 'Pending'
                  ? 'border-yellow-600 bg-yellow-50'
                  : 'border-gray-200 hover:border-yellow-300'
              }`}
            >
              <Clock className={`w-8 h-8 ${
                scorecard.finalDecision === 'Pending' ? 'text-yellow-600' : 'text-gray-400'
              }`} />
              <span className={`font-medium ${
                scorecard.finalDecision === 'Pending' ? 'text-yellow-900' : 'text-gray-700'
              }`}>
                Pending
              </span>
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Comments</h2>
          <textarea
            value={scorecard.comments}
            onChange={(e) => setScorecard({...scorecard, comments: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="6"
            placeholder="Add any additional notes about the candidate's performance, strengths, areas for improvement, or specific observations during the interview..."
          />
        </div>

        {/* Interview Alerts Summary (if available) */}
        {interview?.logs && interview.logs.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mt-6">
            <h2 className="text-lg font-semibold text-yellow-900 mb-4">Proctoring Alerts</h2>
            <div className="space-y-2">
              {interview.logs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-yellow-800">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full" />
                  <span>{log.message} - {new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scorecard;