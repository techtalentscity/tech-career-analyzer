import React, { useState } from 'react';

const TimelineChart = ({ milestones }) => {
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  
  if (!milestones || milestones.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-1 bg-gray-300" />
        {milestones.map((milestone, index) => (
          <div key={index} className="relative mb-10">
            <div className="flex items-center">
              <div className={`absolute left-0 w-5 h-5 rounded-full ${
                index === 0 ? 'bg-blue-600' : 'bg-gray-400'
              } -translate-x-2 z-10`} />
              <div className="ml-8 w-full">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-lg">{milestone.label}</span>
                    <span className="ml-2 text-sm text-gray-600">Month {milestone.month}</span>
                  </div>
                  <button 
                    onClick={() => setExpandedMilestone(expandedMilestone === index ? null : index)}
                    className="text-blue-600 text-sm font-medium flex items-center"
                  >
                    {expandedMilestone === index ? 'Hide Details' : 'Show Details'}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ml-1 transition-transform duration-200 ${expandedMilestone === index ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
                
                {expandedMilestone === index && milestone.details && (
                  <div className="mt-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2">Activities & Objectives</h4>
                    <ul className="space-y-2">
                      {milestone.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineChart;
