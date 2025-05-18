import React from 'react';
import TimelineChart from '../visualizations/TimelineChart';

const TimelineSection = ({ timelineMilestones, userData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Your Career Transition Roadmap</h2>
      <div className="mb-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Timeline: {userData.transitionTimeline}
          </span>
          {userData.timeCommitment && (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Weekly Commitment: {userData.timeCommitment}
            </span>
          )}
          {userData.workPreference && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Preferred Work: {userData.workPreference}
            </span>
          )}
        </div>
        <p className="text-gray-600">
          This personalized roadmap is based on your specific circumstances, target career paths, and identified skill gaps.
          Each milestone includes recommended activities aligned with your goals and timeline.
        </p>
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-4">
          <div className="flex">
            <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-700">
              <strong className="text-yellow-700">Pro Tip:</strong> Click "Show Details" on each milestone to see specific 
              activities and objectives. Adjust your pace as needed based on your progress and changing circumstances.
            </p>
          </div>
        </div>
      </div>
      <TimelineChart milestones={timelineMilestones} />
    </div>
  );
};

export default TimelineSection;
