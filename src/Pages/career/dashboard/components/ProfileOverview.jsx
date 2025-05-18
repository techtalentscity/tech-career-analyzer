import React from 'react';

const ProfileOverview = ({ userData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Education Background</h3>
            <p className="text-lg font-semibold">{userData.educationLevel || 'Not specified'}</p>
            <p className="text-md text-gray-700">{userData.studyField || 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Current Role</h3>
            <p className="text-lg font-semibold">{userData.currentRole || 'Not specified'}</p>
            <p className="text-md text-gray-700">{userData.yearsExperience || 'Not specified'}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Tech Experience</h3>
            <p className="text-lg font-semibold">{userData.experienceLevel || 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Career Interests</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {userData.careerPathsInterest && userData.careerPathsInterest.length > 0 ? (
                userData.careerPathsInterest.slice(0, 3).map((interest, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {interest}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No specific interests provided</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Transition Timeline</h3>
            <p className="text-lg font-semibold">{userData.transitionTimeline || 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Time Commitment</h3>
            <p className="text-lg font-semibold">{userData.timeCommitment || 'Not specified'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
