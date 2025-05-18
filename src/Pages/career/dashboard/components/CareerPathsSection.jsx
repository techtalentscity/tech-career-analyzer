import React from 'react';
import SimpleBarChart from '../visualizations/SimpleBarChart';
import { getThreeCareerPaths } from '../utils/dataExtractors';

const CareerPathsSection = ({ careerPaths, userData, skillsGap }) => {
  // Ensure we have three career paths to display
  const displayPaths = getThreeCareerPaths(careerPaths, userData, skillsGap);

  // Create chart data
  const chartData = displayPaths.map(path => ({
    label: path.title,
    value: path.match
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Career Path Compatibility</h2>
      <p className="text-gray-600 mb-4">
        Based on your experience, skills, and interests, these career paths have the highest compatibility with your profile.
      </p>
      
      <SimpleBarChart data={chartData} title="" />
      
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {displayPaths.map((path, index) => (
          <div key={index} className={`p-5 rounded-lg ${
            index === 0 ? 'bg-blue-50 border border-blue-100' :
            index === 1 ? 'bg-green-50 border border-green-100' :
            'bg-purple-50 border border-purple-100'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{path.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                index === 0 ? 'bg-blue-100 text-blue-800' :
                index === 1 ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {path.match}% Match
              </span>
            </div>
            
            <div className="space-y-3 mt-4">
              {index === 0 && (
                <>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                    <p className="text-gray-700 mt-1">
                      <strong>Perfect Fit:</strong> Your {userData.experienceLevel?.toLowerCase() || 'current'} experience
                      {userData.studyField ? ` in ${userData.studyField}` : ''} aligns with the core requirements.
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Key Advantage:</strong> Your background in {
                        userData.currentRole ? userData.currentRole : 'your current field'
                      } provides transferable skills highly valued in this role.
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Required Skills</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {skillsGap.filter(skill => skill.gap > 0).slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Estimated Timeline</h4>
                    <p className="text-gray-700 mt-1">
                      <strong>{userData.transitionTimeline === 'Less than 6 months' || userData.transitionTimeline === 'Already transitioning' ? 
                        '3-6 months' : 
                        userData.transitionTimeline === '6-12 months' ? 
                        '6-9 months' : 
                        '9-12 months'}</strong> based on your current experience and commitment level
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Career Outlook</h4>
                    <p className="text-gray-700 mt-1">
                      <strong>Strong Growth:</strong> Projected 22% increase in demand over the next 5 years with competitive salary ranges
                    </p>
                  </div>
                </>
              )}
              {index === 1 && (
                <>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                    <p className="text-gray-700 mt-1">
                      <strong>Strong Alternative:</strong> Your technical skills combined with your background
                      {userData.currentRole ? ` in ${userData.currentRole}` : ''} create an excellent foundation.
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Natural Fit:</strong> Your interest in {
                        userData.careerPathsInterest && userData.careerPathsInterest.length > 0 
                          ? userData.careerPathsInterest[0] 
                          : 'technology'
                      } aligns well with the core responsibilities.
                    </p>
                  </div>
                  
                  {/* More content for second path */}
                </>
              )}
              {index === 2 && (
                <>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                    <p className="text-gray-700 mt-1">
                      <strong>Complementary Option:</strong> Leverages your analytical skills and technical knowledge while opening different opportunities.
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Growth Potential:</strong> Your background in {userData.studyField || 'your field'} provides a strong foundation for this emerging role.
                    </p>
                  </div>
                  
                  {/* More content for third path */}
                </>
              )}
              
              <div className="pt-3">
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(path.title)}+career+path+requirements`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm font-medium ${
                    index === 0 ? 'text-blue-600 hover:text-blue-800' :
                    index === 1 ? 'text-green-600 hover:text-green-800' :
                    'text-purple-600 hover:text-purple-800'
                  }`}
                >
                  Learn more about this career →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Career Path Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Career Path</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transition Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Focus</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Demand</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayPaths.map((path, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{path.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                      index === 0 ? 'bg-blue-100 text-blue-800' :
                      index === 1 ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'}`}>
                      {path.match}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {index === 0 ? 
                        (userData.transitionTimeline === 'Less than 6 months' ? '3-6 months' : '6-12 months') :
                      index === 1 ? 
                        (userData.transitionTimeline === 'Less than 6 months' ? '4-8 months' : '8-12 months') :
                        (userData.transitionTimeline === 'Less than 6 months' ? '6-10 months' : '10-16 months')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {index === 0 ? 
                        (skillsGap.length > 0 ? skillsGap[0].name : 'Technical foundations') :
                      index === 1 ? 
                        (skillsGap.length > 1 ? skillsGap[1].name : 'Analytical skills') :
                        (skillsGap.length > 2 ? skillsGap[2].name : 'Specialized knowledge')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${
                      index === 0 ? 'text-green-600' :
                      index === 1 ? 'text-blue-600' :
                      'text-purple-600'}`}>
                      {index === 0 ? 'Very High' : index === 1 ? 'High' : 'Growing'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CareerPathsSection;
