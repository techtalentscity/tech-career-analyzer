// src/components/SkillLearningResources.jsx - UPDATED TO MATCH TECHNICAL SPECIFICATION v1.1
import React, { useState } from 'react';
import { getResourcesForSkill } from '../data/learningResourcesData';

const SkillLearningResources = ({ skillName, userData, skillDetails, topRecommendation = null }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  
  // Enhanced resource selection based on Technical Specification v1.1
  const getEnhancedResourcesForSkill = (skillName, userData, skillDetails, topRecommendation) => {
    const baseResources = getResourcesForSkill(skillName, userData, skillDetails);
    
    // Apply Technical Specification v1.1 enhancements
    const enhancedResources = baseResources.map(resource => ({
      ...resource,
      algorithmOptimized: false,
      technicalSpecRecommendation: false,
      constantVariableAlignment: 0,
      specificCriteriaAlignment: 0
    }));
    
    // Algorithm-specific resource optimization
    if (topRecommendation) {
      const algorithmResources = getAlgorithmSpecificResources(skillName, topRecommendation, userData);
      enhancedResources.push(...algorithmResources);
      
      // Mark resources as algorithm-optimized
      enhancedResources.forEach(resource => {
        resource.algorithmOptimized = isResourceOptimizedForAlgorithm(resource, topRecommendation);
        resource.technicalSpecRecommendation = true;
        resource.constantVariableAlignment = calculateConstantVariableAlignment(resource, userData);
        resource.specificCriteriaAlignment = calculateSpecificCriteriaAlignment(resource, topRecommendation, userData);
      });
    }
    
    // Sort by Technical Specification relevance
    return enhancedResources.sort((a, b) => {
      const aScore = (a.algorithmOptimized ? 10 : 0) + 
                    (a.personalMatch ? 5 : 0) + 
                    a.constantVariableAlignment + 
                    a.specificCriteriaAlignment;
      const bScore = (b.algorithmOptimized ? 10 : 0) + 
                    (b.personalMatch ? 5 : 0) + 
                    b.constantVariableAlignment + 
                    b.specificCriteriaAlignment;
      return bScore - aScore;
    });
  };

  // Get algorithm-specific learning resources based on Technical Specification
  const getAlgorithmSpecificResources = (skillName, topRecommendation, userData) => {
    const algorithmResources = [];
    
    switch(topRecommendation.type) {
      case 'tech-interest-based':
        // Tech-Interest Based specific resources
        if (userData.techInterests) {
          algorithmResources.push({
            title: `${skillName} for Your Tech Interests`,
            description: `Specialized ${skillName} learning path aligned with your interests: ${userData.techInterests}`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' ' + userData.techInterests + ' tutorial')}`,
            type: 'course',
            difficulty: 'intermediate',
            algorithmOptimized: true,
            bestFor: ['Tech Interest Alignment', 'Current Role Transition'],
            personalMatch: true,
            algorithmType: 'tech-interest-based'
          });
        }
        
        if (userData.currentRole) {
          algorithmResources.push({
            title: `${skillName} for ${userData.currentRole} Transition`,
            description: `Learn ${skillName} specifically for transitioning from ${userData.currentRole}`,
            url: `https://www.google.com/search?q=${encodeURIComponent(userData.currentRole + ' to ' + skillName + ' career transition')}`,
            type: 'tutorial',
            difficulty: 'intermediate',
            algorithmOptimized: true,
            bestFor: ['Role Transition', 'Career Development'],
            personalMatch: userData.currentRole !== 'Not specified',
            algorithmType: 'tech-interest-based'
          });
        }
        
        if (userData.jobTechnologies) {
          algorithmResources.push({
            title: `${skillName} with Your Current Tech Stack`,
            description: `Integrate ${skillName} with technologies you already know: ${userData.jobTechnologies}`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' with ' + userData.jobTechnologies)}`,
            type: 'practice',
            difficulty: 'advanced',
            algorithmOptimized: true,
            bestFor: ['Technology Integration', 'Practical Application'],
            personalMatch: true,
            algorithmType: 'tech-interest-based'
          });
        }
        break;
        
      case 'research-development':
        // Research/Development Based specific resources
        if (userData.publications) {
          algorithmResources.push({
            title: `Academic ${skillName} Research Methods`,
            description: `Advanced ${skillName} for researchers with publication experience`,
            url: `https://scholar.google.com/scholar?q=${encodeURIComponent(skillName + ' research methods academic')}`,
            type: 'book',
            difficulty: 'advanced',
            algorithmOptimized: true,
            bestFor: ['Academic Research', 'Publication Quality'],
            personalMatch: !userData.publications.toLowerCase().includes('none'),
            algorithmType: 'research-development'
          });
        }
        
        if (userData.toolsUsed && userData.toolsUsed.length > 0) {
          algorithmResources.push({
            title: `${skillName} with Research Tools`,
            description: `Learn ${skillName} using research tools you're familiar with: ${userData.toolsUsed.join(', ')}`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' ' + userData.toolsUsed.join(' ') + ' research')}`,
            type: 'tutorial',
            difficulty: 'intermediate',
            algorithmOptimized: true,
            bestFor: ['Research Tools', 'Methodology'],
            personalMatch: true,
            algorithmType: 'research-development'
          });
        }
        
        if (userData.timeCommitment) {
          const timeBasedTitle = userData.timeCommitment === 'full-time' ? 
            `Intensive ${skillName} Research Program` : 
            `Flexible ${skillName} for Researchers`;
          
          algorithmResources.push({
            title: timeBasedTitle,
            description: `${skillName} learning designed for ${userData.timeCommitment} commitment`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' ' + userData.timeCommitment + ' research program')}`,
            type: 'course',
            difficulty: 'varied',
            algorithmOptimized: true,
            bestFor: ['Time Management', 'Research Focus'],
            personalMatch: true,
            algorithmType: 'research-development'
          });
        }
        break;
        
      case 'lifestyle-market':
        // Lifestyle/Market Based specific resources
        if (userData.workPreference) {
          algorithmResources.push({
            title: `${skillName} for ${userData.workPreference} Work`,
            description: `Master ${skillName} in ${userData.workPreference} work environments`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' ' + userData.workPreference + ' work best practices')}`,
            type: 'course',
            difficulty: 'intermediate',
            algorithmOptimized: true,
            bestFor: ['Work-Life Balance', 'Lifestyle Fit'],
            personalMatch: true,
            algorithmType: 'lifestyle-market'
          });
        }
        
        if (userData.educationLevel) {
          algorithmResources.push({
            title: `${skillName} for ${userData.educationLevel} Professionals`,
            description: `${skillName} resources tailored for ${userData.educationLevel} level professionals`,
            url: `https://www.google.com/search?q=${encodeURIComponent(skillName + ' for ' + userData.educationLevel + ' professionals')}`,
            type: 'platform',
            difficulty: 'varied',
            algorithmOptimized: true,
            bestFor: ['Education Level Match', 'Professional Development'],
            personalMatch: true,
            algorithmType: 'lifestyle-market'
          });
        }
        
        if (userData.targetSalary) {
          algorithmResources.push({
            title: `High-Value ${skillName} Skills`,
            description: `Premium ${skillName} skills that command salaries like your target: ${userData.targetSalary}`,
            url: `https://www.google.com/search?q=${encodeURIComponent('high paying ' + skillName + ' skills certification')}`,
            type: 'course',
            difficulty: 'advanced',
            algorithmOptimized: true,
            bestFor: ['Salary Optimization', 'Market Value'],
            personalMatch: true,
            algorithmType: 'lifestyle-market'
          });
        }
        break;
    }
    
    return algorithmResources;
  };

  // Calculate alignment with constant variables from Technical Specification
  const calculateConstantVariableAlignment = (resource, userData) => {
    let alignment = 0;
    
    // Years Experience alignment
    if (userData.yearsExperience) {
      const expScore = getExperienceScore(userData.yearsExperience);
      if (resource.difficulty === 'beginner' && expScore < 0.4) alignment += 2;
      else if (resource.difficulty === 'intermediate' && expScore >= 0.4 && expScore < 0.7) alignment += 2;
      else if (resource.difficulty === 'advanced' && expScore >= 0.7) alignment += 2;
    }
    
    // Study Field alignment
    if (userData.studyField && resource.title.toLowerCase().includes(userData.studyField.toLowerCase())) {
      alignment += 1;
    }
    
    // Interest alignment
    if (userData.interests && Array.isArray(userData.interests)) {
      const hasInterestMatch = userData.interests.some(interest => 
        resource.title.toLowerCase().includes(interest.toLowerCase()) ||
        (resource.bestFor && resource.bestFor.some(tag => tag.toLowerCase().includes(interest.toLowerCase())))
      );
      if (hasInterestMatch) alignment += 1;
    }
    
    // Transferable Skills alignment
    if (userData.transferableSkills && resource.bestFor) {
      const skillsLower = userData.transferableSkills.toLowerCase();
      const hasSkillMatch = resource.bestFor.some(tag => 
        skillsLower.includes(tag.toLowerCase()) || tag.toLowerCase().includes('communication') || tag.toLowerCase().includes('analysis')
      );
      if (hasSkillMatch) alignment += 1;
    }
    
    return alignment;
  };

  // Calculate alignment with specific criteria from Technical Specification
  const calculateSpecificCriteriaAlignment = (resource, topRecommendation, userData) => {
    if (!topRecommendation) return 0;
    
    let alignment = 0;
    
    switch(topRecommendation.type) {
      case 'tech-interest-based':
        if (userData.techInterests && resource.title.toLowerCase().includes(userData.techInterests.toLowerCase())) {
          alignment += 2;
        }
        if (userData.currentRole && resource.description && resource.description.toLowerCase().includes('transition')) {
          alignment += 1;
        }
        if (userData.jobTechnologies && resource.bestFor && resource.bestFor.includes('Technology Integration')) {
          alignment += 1;
        }
        break;
        
      case 'research-development':
        if (userData.publications && resource.bestFor && resource.bestFor.includes('Academic Research')) {
          alignment += 2;
        }
        if (userData.toolsUsed && resource.bestFor && resource.bestFor.includes('Research Tools')) {
          alignment += 1;
        }
        if (userData.timeCommitment && resource.bestFor && resource.bestFor.includes('Time Management')) {
          alignment += 1;
        }
        break;
        
      case 'lifestyle-market':
        if (userData.workPreference && resource.bestFor && resource.bestFor.includes('Work-Life Balance')) {
          alignment += 2;
        }
        if (userData.educationLevel && resource.bestFor && resource.bestFor.includes('Education Level Match')) {
          alignment += 1;
        }
        if (userData.targetSalary && resource.bestFor && resource.bestFor.includes('Salary Optimization')) {
          alignment += 1;
        }
        break;
    }
    
    return alignment;
  };

  // Check if resource is optimized for specific algorithm
  const isResourceOptimizedForAlgorithm = (resource, topRecommendation) => {
    return resource.algorithmType === topRecommendation.type || resource.algorithmOptimized === true;
  };

  // Experience scoring function from Technical Specification
  const getExperienceScore = (experience) => {
    const expMap = {
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      '0': 0.2, '1': 0.3, '2': 0.4, '3': 0.5, '4': 0.6, '5': 0.7,
      'Complete beginner': 0.2, 'Some exposure': 0.4, 'Beginner': 0.5,
      'Intermediate': 0.7, 'Advanced': 0.9
    };
    return expMap[experience] || 0.5;
  };

  // Get enhanced resources using Technical Specification
  const resources = getEnhancedResourcesForSkill(skillName, userData, skillDetails, topRecommendation);
  
  // Group resources by type for better organization
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {});
  
  const resourceTypeLabels = {
    'book': 'Books & Research',
    'course': 'Courses & Programs',
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  };
  
  const difficultyColors = {
    'beginner': 'bg-green-100 text-green-800',
    'intermediate': 'bg-yellow-100 text-yellow-800',
    'advanced': 'bg-red-100 text-red-800',
    'varied': 'bg-purple-100 text-purple-800'
  };

  // Get algorithm display name
  const getAlgorithmDisplayName = (algorithmType) => {
    switch(algorithmType) {
      case 'tech-interest-based': return '🎯 Tech-Interest';
      case 'research-development': return '📚 Research/Dev';
      case 'lifestyle-market': return '⚖️ Lifestyle/Market';
      default: return '📊 General';
    }
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
        {isExpanded ? 'Hide Technical Spec v1.1 Learning Resources' : 'Show Technical Spec v1.1 Learning Resources'}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-4 animate-fadeIn">
          {/* Technical Specification v1.1 Personalization Message */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md">
            <p className="text-sm text-blue-700">
              <span className="font-medium">🔬 Technical Specification v1.1:</span> These resources are optimized using our Multi-Tier Recommendation Engine to help you progress from {levels[Math.max(0, skillDetails.currentLevel - 1)]} to {levels[Math.max(0, skillDetails.requiredLevel - 1)]} level in {skillName}.
              {topRecommendation && (
                <span className="block mt-1">
                  Algorithm: {getAlgorithmDisplayName(topRecommendation.type)} with {topRecommendation.confidenceScore}% confidence
                </span>
              )}
            </p>
          </div>

          {/* Technical Specification Metadata */}
          {topRecommendation && topRecommendation.metadata && (
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-md">
              <h5 className="text-sm font-medium text-gray-800 mb-2">
                🔬 Algorithm Performance Metrics:
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="font-medium text-gray-700">Criteria Used:</span>
                  <div className="text-gray-600">{topRecommendation.metadata.criteriaUsed?.length || 0}</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Constants Score:</span>
                  <div className="text-gray-600">{Math.round(topRecommendation.metadata.constantsScore || 0)}%</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Specifics Score:</span>
                  <div className="text-gray-600">{Math.round(topRecommendation.metadata.specificsScore || 0)}%</div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Fallback Applied:</span>
                  <div className="text-gray-600">{topRecommendation.metadata.fallbackApplied ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          )}
          
          {Object.keys(groupedResources).length > 0 ? (
            Object.keys(groupedResources).map(type => (
              <div key={type} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  {resourceTypeIcons[type]}
                  <span className="ml-1">{resourceTypeLabels[type] || type}</span>
                  {/* Algorithm-optimized resources count */}
                  {groupedResources[type].filter(r => r.algorithmOptimized).length > 0 && (
                    <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {groupedResources[type].filter(r => r.algorithmOptimized).length} algorithm-optimized
                    </span>
                  )}
                </h4>
                <div className="space-y-2">
                  {groupedResources[type].map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-3 rounded-lg border transition-colors ${
                        resource.algorithmOptimized 
                          ? 'bg-purple-50 border-purple-200 hover:bg-purple-100' 
                          : resource.personalMatch 
                          ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                          : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="font-medium text-gray-900">{resource.title}</div>
                            
                            {/* Technical Specification badges */}
                            {resource.algorithmOptimized && (
                              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                Algorithm Optimized
                              </span>
                            )}
                            {resource.personalMatch && !resource.algorithmOptimized && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                Personal Match
                              </span>
                            )}
                            {resource.technicalSpecRecommendation && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Tech Spec v1.1
                              </span>
                            )}
                            {resource.algorithmType && (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                {getAlgorithmDisplayName(resource.algorithmType)}
                              </span>
                            )}
                          </div>
                          
                          {resource.description && (
                            <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                          )}
                          
                          {/* Technical Specification alignment scores */}
                          {(resource.constantVariableAlignment > 0 || resource.specificCriteriaAlignment > 0) && (
                            <div className="mt-2 text-xs text-gray-500">
                              Constants Alignment: {resource.constantVariableAlignment}/5 | 
                              Criteria Alignment: {resource.specificCriteriaAlignment}/4
                            </div>
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
            <div className="text-center py-4">
              <p className="text-sm text-gray-500 italic mb-3">
                No specific resources available for this skill yet. Our Technical Specification v1.1 system is continuously learning.
              </p>
              <p className="text-xs text-gray-400">
                Try searching online platforms like Coursera, Udemy, or edX for "{skillName}" courses.
              </p>
            </div>
          )}

          {/* Enhanced Search Integration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <button 
              className="text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              onClick={() => {
                const searchQuery = topRecommendation 
                  ? `${skillName} ${topRecommendation.type.replace('-', ' ')} courses tutorials`
                  : `learn ${skillName} courses tutorials`;
                window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
              }}
            >
              Find More Resources
            </button>
            
            {topRecommendation && (
              <button 
                className="text-center py-2 px-4 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={() => {
                  const algorithmQuery = `${skillName} ${topRecommendation.type} ${userData.yearsExperience || 'beginner'} level`;
                  window.open(`https://www.google.com/search?q=${encodeURIComponent(algorithmQuery)}`, '_blank');
                }}
              >
                Algorithm-Specific Search
              </button>
            )}
          </div>

          {/* Technical Specification Summary */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h5 className="text-sm font-bold text-blue-800 mb-1">
              🔬 Technical Specification v1.1 Summary:
            </h5>
            <p className="text-xs text-blue-700">
              Resources optimized using Multi-Tier Recommendation Engine with dynamic weighting and fallback logic. 
              {topRecommendation ? `Your ${topRecommendation.type} algorithm achieved ${topRecommendation.confidenceScore}% confidence. ` : ''}
              Learning paths are personalized based on your constant variables (experience, study field, interests, transferable skills) 
              and specific criteria for maximum skill development efficiency.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillLearningResources;
