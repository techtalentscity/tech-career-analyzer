// src/components/SkillLearningResources.jsx
import React, { useState } from 'react';
import { getResourcesForSkill } from '../data/learningResourcesData';

const SkillLearningResources = ({ skillName, userData, skillDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const resources = getResourcesForSkill(skillName, userData, skillDetails);
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  
  // Group resources by type for better organization
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {});
  
  const resourceTypeLabels = {
    'book': 'Books',
    'course': 'Courses',
    'tutorial': 'Tutorials & Documentation',
    'practice': 'Practice Platforms',
    'platform': 'Learning Platforms'
  };

  const resourceTypeIcons = {
    'book': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'course': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    'tutorial': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    'practice': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    'platform': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  };
  
  const difficultyColors = {
    'beginner': 'bg-green-100 text-green-800',
    'intermediate': 'bg-yellow-100 text-yellow-800',
    'advanced': 'bg-red-100 text-red-800',
    'varied': 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-1 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        {isExpanded ? 'Hide Personalized Learning Resources' : 'Show Personalized Learning Resources'}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-4 animate-fadeIn">
          {/* Add personalization message at the top */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md">
            <p className="text-sm text-blue-700">
              <span className="font-medium">Tailored for you:</span> These resources are specifically selected to help you progress from {levels[Math.max(0, skillDetails.currentLevel - 1)]} to {levels[Math.max(0, skillDetails.requiredLevel - 1)]} level in {skillName}.
            </p>
          </div>
          
          {Object.keys(groupedResources).length > 0 ? (
            Object.keys(groupedResources).map(type => (
              <div key={type} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  {resourceTypeIcons[type]}
                  <span className="ml-1">{resourceTypeLabels[type] || type}</span>
                </h4>
                <div className="space-y-2">
                  {groupedResources[type].map((resource, idx) => (
                    
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-3 rounded-lg border transition-colors ${
                        resource.personalMatch 
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                          : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900">{resource.title}</div>
                            {resource.personalMatch && (
                              <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                Best match
                              </span>
                            )}
                          </div>
                          {resource.description && (
                            <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                          )}
                          {resource.bestFor && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {resource.bestFor.map((tag, tagIdx) => (
                                <span key={tagIdx} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {resource.difficulty && (
                          <span className={`mt-2 sm:mt-0 px-2 py-1 text-xs rounded whitespace-nowrap ${difficultyColors[resource.difficulty] || 'bg-gray-100 text-gray-800'}`}>
                            {resource.difficulty}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">
              No specific resources available for this skill yet. Try searching online or check out platforms like Coursera, Udemy, or edX.
            </p>
          )}
          
          <button 
            className="w-full mt-2 text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onClick={() => window.open(`https://www.google.com/search?q=learn+${encodeURIComponent(skillName)}+courses+tutorials`, '_blank')}
          >
            Find More Resources
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillLearningResources;
