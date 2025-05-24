// src/components/SkillLearningResources.jsx - UPDATED FOR CAREER PATH RECOMMENDATION SYSTEM v2.0
import React, { useState } from 'react';
import { getResourcesForSkill } from '../data/learningResourcesData';

const SkillLearningResources = ({ skillName, userData, skillDetails, careerPathRecommendation = null }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  
  // v2.0 Sequential Dependency Recommendation Engine
  const getV2EnhancedResourcesForSkill = (skillName, userData, skillDetails, careerPathRecommendation) => {
    const baseResources = getResourcesForSkill(skillName, userData, skillDetails);
    
    // Apply v2.0 AI-Generated Content Enhancement
    const enhancedResources = baseResources.map(resource => ({
      ...resource,
      aiGenerated: false,
      careerPathAligned: false,
      skillGapTargeted: false,
      learningRoadmapIntegrated: false,
      tierAlignment: {
        coreDriving: 0,
        strongMotivators: 0,
        supportingEvidence: 0,
        backgroundContext: 0
      },
      v2Confidence: 0,
      v2RecommendationType: 'base'
    }));
    
    // Sequential Dependency Enhancement: Career Path → Skill Gap → Learning Roadmap
    if (careerPathRecommendation) {
      const aiGeneratedResources = generateAIOptimizedResources(skillName, careerPathRecommendation, userData);
      enhancedResources.push(...aiGeneratedResources);
      
      // Apply v2.0 4-Tier Scoring Enhancement
      enhancedResources.forEach(resource => {
        resource.careerPathAligned = isResourceAlignedWithCareerPath(resource, careerPathRecommendation);
        resource.skillGapTargeted = isResourceTargetingSkillGap(resource, skillName, userData);
        resource.learningRoadmapIntegrated = isResourceIntegratedWithLearningRoadmap(resource, userData);
        resource.tierAlignment = calculateV2TierAlignment(resource, userData, careerPathRecommendation);
        resource.v2Confidence = calculateV2ResourceConfidence(resource, userData, careerPathRecommendation);
        resource.aiGenerated = resource.v2RecommendationType !== 'base';
      });
    }
    
    // Sort by v2.0 Sequential Dependency Score
    return enhancedResources.sort((a, b) => {
      const aScore = calculateV2OverallScore(a);
      const bScore = calculateV2OverallScore(b);
      return bScore - aScore;
    });
  };

  // AI-Generated Content based on v2.0 Career Path Recommendation
  const generateAIOptimizedResources = (skillName, careerPathRecommendation, userData) => {
    const aiResources = [];
    
    // AI-Generated resources based on Career Path recommendation type
    if (careerPathRecommendation.type === 'career-path') {
      // Generate resources based on recommendedPaths
      if (careerPathRecommendation.recommendedPaths) {
        careerPathRecommendation.recommendedPaths.forEach(path => {
          aiResources.push({
            title: `${skillName} for ${path} Career Track`,
            description: `AI-curated ${skillName} learning path specifically designed for transitioning to ${path} role`,
            url: generateAIOptimizedURL(skillName, path, userData),
            type: 'ai-course',
            difficulty: determineAIDifficulty(userData, careerPathRecommendation),
            aiGenerated: true,
            careerPathAligned: true,
            bestFor: ['Career Path Alignment', 'Role-Specific Skills', 'Market Demand'],
            v2RecommendationType: 'career-path-ai',
            aiConfidence: careerPathRecommendation.confidenceScore || 75,
            marketDemand: careerPathRecommendation.marketDemand || 'medium'
          });
        });
      }
      
      // Generate industry-focused resources
      if (careerPathRecommendation.industryFocus) {
        careerPathRecommendation.industryFocus.forEach(industry => {
          aiResources.push({
            title: `${skillName} in ${industry} Industry`,
            description: `Industry-specific ${skillName} applications and best practices for ${industry} sector`,
            url: generateIndustrySpecificURL(skillName, industry, userData),
            type: 'ai-tutorial',
            difficulty: 'intermediate',
            aiGenerated: true,
            careerPathAligned: true,
            bestFor: ['Industry Expertise', 'Market Relevance', 'Professional Context'],
            v2RecommendationType: 'industry-ai',
            aiConfidence: careerPathRecommendation.confidenceScore || 75,
            industryRelevance: industry
          });
        });
      }
      
      // Generate resources based on v2.0 4-Tier Criteria
      const tierBasedResources = generateTierBasedResources(skillName, userData, careerPathRecommendation);
      aiResources.push(...tierBasedResources);
    }
    
    return aiResources;
  };

  // Generate resources based on v2.0 4-Tier Scoring System
  const generateTierBasedResources = (skillName, userData, careerPathRecommendation) => {
    const tierResources = [];
    
    // Tier 1: Core Drivers (45%) - futureGoal, techInterests, leverageDomainExpertise, careerPathsInterest
    if (userData.futureGoal && userData.techInterests) {
      tierResources.push({
        title: `${skillName} Aligned with Your Future Goals`,
        description: `Personalized ${skillName} learning path designed to achieve: ${userData.futureGoal}`,
        url: generateGoalAlignedURL(skillName, userData.futureGoal, userData.techInterests),
        type: 'ai-specialization',
        difficulty: 'advanced',
        aiGenerated: true,
        careerPathAligned: true,
        bestFor: ['Goal Achievement', 'Tech Interest Alignment', 'Strategic Development'],
        v2RecommendationType: 'tier1-core-drivers',
        tierFocus: 'Core Drivers (45%)',
        aiConfidence: 90
      });
    }
    
    // Tier 2: Strong Motivators (25%) - industryPreference, techMotivation, techPassion
    if (userData.industryPreference && userData.techMotivation) {
      tierResources.push({
        title: `${skillName} for Your Industry Passion`,
        description: `${skillName} courses focused on ${userData.industryPreference.join(' & ')} with emphasis on ${userData.techMotivation}`,
        url: generateMotivationBasedURL(skillName, userData.industryPreference, userData.techMotivation),
        type: 'ai-bootcamp',
        difficulty: 'intermediate',
        aiGenerated: true,
        careerPathAligned: true,
        bestFor: ['Passion Alignment', 'Industry Focus', 'Motivation Sustainability'],
        v2RecommendationType: 'tier2-strong-motivators',
        tierFocus: 'Strong Motivators (25%)',
        aiConfidence: 85
      });
    }
    
    // Tier 3: Supporting Evidence (20%) - transferableSkills, jobTechnologies, jobResponsibilities, jobProjects
    if (userData.transferableSkills && userData.jobTechnologies) {
      tierResources.push({
        title: `${skillName} Building on Your Tech Foundation`,
        description: `Advanced ${skillName} leveraging your existing skills: ${userData.transferableSkills} and tech stack: ${userData.jobTechnologies}`,
        url: generateSkillBuildingURL(skillName, userData.transferableSkills, userData.jobTechnologies),
        type: 'ai-practice',
        difficulty: 'intermediate',
        aiGenerated: true,
        skillGapTargeted: true,
        bestFor: ['Skill Transfer', 'Technology Integration', 'Practical Application'],
        v2RecommendationType: 'tier3-supporting-evidence',
        tierFocus: 'Supporting Evidence (20%)',
        aiConfidence: 80
      });
    }
    
    // Tier 4: Background Context (10%) - continueCurrent, studyField, certifications, internships, publications
    if (userData.studyField && userData.currentRole) {
      tierResources.push({
        title: `${skillName} for ${userData.studyField} Professionals`,
        description: `${skillName} curriculum designed for ${userData.studyField} background transitioning from ${userData.currentRole}`,
        url: generateBackgroundContextURL(skillName, userData.studyField, userData.currentRole),
        type: 'ai-academic',
        difficulty: 'varied',
        aiGenerated: true,
        learningRoadmapIntegrated: true,
        bestFor: ['Academic Foundation', 'Professional Transition', 'Background Optimization'],
        v2RecommendationType: 'tier4-background-context',
        tierFocus: 'Background Context (10%)',
        aiConfidence: 75
      });
    }
    
    return tierResources;
  };

  // v2.0 4-Tier Alignment Calculation
  const calculateV2TierAlignment = (resource, userData, careerPathRecommendation) => {
    let tierAlignment = {
      coreDriving: 0,
      strongMotivators: 0,
      supportingEvidence: 0,
      backgroundContext: 0
    };
    
    // Tier 1: Core Drivers (45%)
    if (userData.futureGoal && resource.title.toLowerCase().includes('goal')) tierAlignment.coreDriving += 0.15;
    if (userData.techInterests && resource.description && 
        userData.techInterests.split(',').some(interest => 
          resource.description.toLowerCase().includes(interest.trim().toLowerCase()))) {
      tierAlignment.coreDriving += 0.12;
    }
    if (userData.leverageDomainExpertise === 'yes' && 
        resource.bestFor && resource.bestFor.includes('Domain Leverage')) {
      tierAlignment.coreDriving += 0.10;
    }
    if (userData.careerPathsInterest && Array.isArray(userData.careerPathsInterest) &&
        userData.careerPathsInterest.some(path => 
          resource.title.toLowerCase().includes(path.toLowerCase()))) {
      tierAlignment.coreDriving += 0.08;
    }
    
    // Tier 2: Strong Motivators (25%)
    if (userData.industryPreference && Array.isArray(userData.industryPreference) &&
        userData.industryPreference.some(industry => 
          resource.description && resource.description.toLowerCase().includes(industry.toLowerCase()))) {
      tierAlignment.strongMotivators += 0.10;
    }
    if (userData.techMotivation && resource.description && 
        resource.description.toLowerCase().includes(userData.techMotivation.toLowerCase())) {
      tierAlignment.strongMotivators += 0.08;
    }
    if (userData.techPassion && resource.bestFor && 
        resource.bestFor.some(tag => tag.toLowerCase().includes('passion'))) {
      tierAlignment.strongMotivators += 0.07;
    }
    
    // Tier 3: Supporting Evidence (20%)
    if (userData.transferableSkills && resource.bestFor && 
        resource.bestFor.includes('Skill Transfer')) {
      tierAlignment.supportingEvidence += 0.08;
    }
    if (userData.jobTechnologies && resource.description &&
        userData.jobTechnologies.split(',').some(tech => 
          resource.description.toLowerCase().includes(tech.trim().toLowerCase()))) {
      tierAlignment.supportingEvidence += 0.04;
    }
    if (userData.jobResponsibilities && resource.bestFor && 
        resource.bestFor.includes('Professional Transition')) {
      tierAlignment.supportingEvidence += 0.04;
    }
    if (userData.jobProjects && resource.bestFor && 
        resource.bestFor.includes('Practical Application')) {
      tierAlignment.supportingEvidence += 0.04;
    }
    
    // Tier 4: Background Context (10%)
    if (userData.currentRole && resource.description &&
        resource.description.toLowerCase().includes(userData.currentRole.toLowerCase())) {
      tierAlignment.backgroundContext += 0.03;
    }
    if (userData.studyField && resource.title.toLowerCase().includes(userData.studyField.toLowerCase())) {
      tierAlignment.backgroundContext += 0.03;
    }
    if (userData.certifications && resource.bestFor && 
        resource.bestFor.includes('Certification')) {
      tierAlignment.backgroundContext += 0.02;
    }
    
    return tierAlignment;
  };

  // v2.0 Resource Confidence Calculation
  const calculateV2ResourceConfidence = (resource, userData, careerPathRecommendation) => {
    let confidence = 0;
    
    // Base confidence from AI generation
    if (resource.aiGenerated) confidence += 20;
    if (resource.careerPathAligned) confidence += 25;
    if (resource.skillGapTargeted) confidence += 20;
    if (resource.learningRoadmapIntegrated) confidence += 15;
    
    // Tier alignment bonus
    const tierTotal = Object.values(resource.tierAlignment || {}).reduce((sum, val) => sum + val, 0);
    confidence += tierTotal * 50; // Scale tier scores to confidence points
    
    // Career path confidence inheritance
    if (careerPathRecommendation && careerPathRecommendation.confidenceScore) {
      confidence += careerPathRecommendation.confidenceScore * 0.2; // 20% of career path confidence
    }
    
    return Math.min(100, Math.max(0, confidence));
  };

  // v2.0 Overall Score Calculation
  const calculateV2OverallScore = (resource) => {
    let score = 0;
    
    // v2.0 Sequential Dependency Bonuses
    if (resource.careerPathAligned) score += 30;
    if (resource.skillGapTargeted) score += 25;
    if (resource.learningRoadmapIntegrated) score += 20;
    if (resource.aiGenerated) score += 15;
    
    // v2.0 4-Tier Alignment Score
    const tierScore = Object.values(resource.tierAlignment || {}).reduce((sum, val) => sum + val, 0) * 100;
    score += tierScore;
    
    // v2.0 Confidence Score
    score += (resource.v2Confidence || 0) * 0.5;
    
    // Market demand bonus
    if (resource.marketDemand === 'high') score += 10;
    else if (resource.marketDemand === 'medium') score += 5;
    
    return score;
  };

  // URL Generation Functions for AI-Optimized Resources
  const generateAIOptimizedURL = (skillName, careerPath, userData) => {
    const searchTerms = [skillName, careerPath, userData.experienceLevel || 'intermediate'].join(' ');
    return `https://www.google.com/search?q=${encodeURIComponent(searchTerms + ' course certification')}`;
  };

  const generateIndustrySpecificURL = (skillName, industry, userData) => {
    const searchTerms = [skillName, industry, 'professional development'].join(' ');
    return `https://www.google.com/search?q=${encodeURIComponent(searchTerms)}`;
  };

  const generateGoalAlignedURL = (skillName, futureGoal, techInterests) => {
    const searchTerms = [skillName, futureGoal, techInterests].join(' ');
    return `https://www.google.com/search?q=${encodeURIComponent(searchTerms + ' learning path')}`;
  };

  const generateMotivationBasedURL = (skillName, industries, motivation) => {
    const searchTerms = [skillName, industries.join(' '), motivation].join(' ');
    return `https://www.google.com/search?q=${encodeURIComponent(searchTerms + ' training')}`;
  };

  const generateSkillBuildingURL = (skillName, transferableSkills, jobTech) => {
    const searchTerms = [skillName, transferableSkills, jobTech].join(' ');
    return `https://www.google.com/search?q=${encodeURIComponent(searchTerms + ' advanced tutorial')}`;
  };

  const generateBackgroundContextURL = (skillName, studyField, currentRole) => {
    const searchTerms = [skillName, studyField, currentRole, 'transition'].join(' ');
    return `https://www.google.com/search?q=${encodeURIComponent(searchTerms)}`;
  };

  // Helper Functions
  const isResourceAlignedWithCareerPath = (resource, careerPath) => {
    if (!careerPath || !careerPath.recommendedPaths) return false;
    return careerPath.recommendedPaths.some(path => 
      resource.title.toLowerCase().includes(path.toLowerCase()) ||
      (resource.description && resource.description.toLowerCase().includes(path.toLowerCase()))
    );
  };

  const isResourceTargetingSkillGap = (resource, skillName, userData) => {
    return resource.title.toLowerCase().includes(skillName.toLowerCase()) &&
           resource.bestFor && resource.bestFor.includes('Skill Development');
  };

  const isResourceIntegratedWithLearningRoadmap = (resource, userData) => {
    return userData.timeCommitment && 
           (resource.type.includes('roadmap') || 
            resource.bestFor && resource.bestFor.includes('Learning Path'));
  };

  const determineAIDifficulty = (userData, careerPathRecommendation) => {
    if (userData.yearsExperience) {
      const expNum = parseInt(userData.yearsExperience) || 0;
      if (expNum <= 2) return 'beginner';
      if (expNum <= 5) return 'intermediate';
      return 'advanced';
    }
    return careerPathRecommendation.confidenceScore > 80 ? 'intermediate' : 'beginner';
  };

  // Get enhanced resources using v2.0 system
  const resources = getV2EnhancedResourcesForSkill(skillName, userData, skillDetails, careerPathRecommendation);
  
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
    'course': 'Traditional Courses',
    'tutorial': 'Tutorials & Documentation',
    'practice': 'Practice Platforms',
    'platform': 'Learning Platforms',
    'ai-course': '🤖 AI-Generated Courses',
    'ai-tutorial': '🤖 AI-Curated Tutorials',
    'ai-specialization': '🤖 AI-Specialized Tracks',
    'ai-bootcamp': '🤖 AI-Designed Bootcamps',
    'ai-practice': '🤖 AI-Enhanced Practice',
    'ai-academic': '🤖 AI-Academic Paths'
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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s1.343-9-3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    'ai-course': '🤖',
    'ai-tutorial': '🤖',
    'ai-specialization': '🤖',
    'ai-bootcamp': '🤖',
    'ai-practice': '🤖',
    'ai-academic': '🤖'
  };
  
  const difficultyColors = {
    'beginner': 'bg-green-100 text-green-800',
    'intermediate': 'bg-yellow-100 text-yellow-800',
    'advanced': 'bg-red-100 text-red-800',
    'varied': 'bg-purple-100 text-purple-800'
  };

  // Get v2.0 system display information
  const getV2SystemInfo = () => {
    if (!careerPathRecommendation) return null;
    
    const confidence = careerPathRecommendation.confidenceScore || 0;
    const tierScores = careerPathRecommendation.metadata?.tierScores || {};
    const criteriaUsed = careerPathRecommendation.metadata?.criteriaUsed?.length || 0;
    
    return {
      confidence,
      tierScores,
      criteriaUsed,
      totalCriteria: 16,
      systemVersion: 'v2.0'
    };
  };

  const systemInfo = getV2SystemInfo();

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-1 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        {isExpanded ? 'Hide v2.0 AI-Enhanced Learning Resources' : 'Show v2.0 AI-Enhanced Learning Resources'}
      </button>
      
      {isExpanded && (
        <div className="mt-3 space-y-4 animate-fadeIn">
          {/* v2.0 System Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-3 rounded-md">
            <p className="text-sm text-blue-700">
              <span className="font-medium">🤖 Career Path Recommendation System v2.0:</span> AI-driven Sequential Dependency Engine optimizing your learning path from {levels[Math.max(0, skillDetails.currentLevel - 1)]} to {levels[Math.max(0, skillDetails.requiredLevel - 1)]} level in {skillName}.
              {systemInfo && (
                <span className="block mt-1">
                  Career Path → Skill Gap → Learning Roadmap | Confidence: {systemInfo.confidence}% | Criteria: {systemInfo.criteriaUsed}/16
                </span>
              )}
            </p>
          </div>

          {/* v2.0 4-Tier Scoring Breakdown */}
          {systemInfo && systemInfo.tierScores && (
            <div className="bg-gray-50 border border-gray-200 p-3 rounded-md">
              <h5 className="text-sm font-medium text-gray-800 mb-2">
                🎯 4-Tier Scoring System Performance:
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="font-medium text-blue-700">Core Drivers (45%):</span>
                  <div className="text-blue-600">{Math.round((systemInfo.tierScores.coreDriving || 0) * 100)}%</div>
                </div>
                <div>
                  <span className="font-medium text-green-700">Strong Motivators (25%):</span>
                  <div className="text-green-600">{Math.round((systemInfo.tierScores.strongMotivators || 0) * 100)}%</div>
                </div>
                <div>
                  <span className="font-medium text-yellow-700">Supporting Evidence (20%):</span>
                  <div className="text-yellow-600">{Math.round((systemInfo.tierScores.supportingEvidence || 0) * 100)}%</div>
                </div>
                <div>
                  <span className="font-medium text-purple-700">Background Context (10%):</span>
                  <div className="text-purple-600">{Math.round((systemInfo.tierScores.backgroundContext || 0) * 100)}%</div>
                </div>
              </div>
            </div>
          )}
          
          {Object.keys(groupedResources).length > 0 ? (
            Object.keys(groupedResources).map(type => (
              <div key={type} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700 flex items-center">
                  {typeof resourceTypeIcons[type] === 'string' ? (
                    <span className="mr-1">{resourceTypeIcons[type]}</span>
                  ) : (
                    resourceTypeIcons[type]
                  )}
                  <span className="ml-1">{resourceTypeLabels[type] || type}</span>
                  {/* AI-generated resources count */}
                  {groupedResources[type].filter(r => r.aiGenerated).length > 0 && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {groupedResources[type].filter(r => r.aiGenerated).length} AI-Generated
                    </span>
                  )}
                  {/* Career path aligned count */}
                  {groupedResources[type].filter(r => r.careerPathAligned).length > 0 && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      {groupedResources[type].filter(r => r.careerPathAligned).length} Career-Aligned
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
                        resource.aiGenerated 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:from-blue-100 hover:to-purple-100' 
                          : resource.careerPathAligned 
                          ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                          : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center flex-wrap gap-2">
                            <div className="font-medium text-gray-900">{resource.title}</div>
                            
                            {/* v2.0 System badges */}
                            {resource.aiGenerated && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                🤖 AI-Generated
                              </span>
                            )}
                            {resource.careerPathAligned && (
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                🎯 Career-Aligned
                              </span>
                            )}
                            {resource.skillGapTargeted && (
                              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                📚 Skill-Targeted
                              </span>
                            )}
                            {resource.learningRoadmapIntegrated && (
                              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                ⚖️ Roadmap-Integrated
                              </span>
                            )}
                            {resource.v2RecommendationType && resource.v2RecommendationType !== 'base' && (
                              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                {resource.v2RecommendationType}
                              </span>
                            )}
                          </div>
                          
                          {resource.description && (
                            <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                          )}
                          
                          {/* v2.0 Tier focus and confidence */}
                          {resource.tierFocus && (
                            <div className="mt-2 text-xs text-blue-600 font-medium">
                              {resource.tierFocus} | AI Confidence: {Math.round(resource.v2Confidence || 0)}%
                            </div>
                          )}
                          
                          {/* v2.0 Market demand indicator */}
                          {resource.marketDemand && (
                            <div className="mt-1 text-xs text-gray-500">
                              Market Demand: <span className={resource.marketDemand === 'high' ? 'text-green-600' : resource.marketDemand === 'medium' ? 'text-yellow-600' : 'text-gray-600'}>
                                {resource.marketDemand}
                              </span>
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
                No resources generated yet. The v2.0 AI system requires career path data for optimal personalization.
              </p>
              <p className="text-xs text-gray-400">
                Complete your career assessment for AI-generated, personalized learning recommendations.
              </p>
            </div>
          )}

          {/* Enhanced v2.0 Search Integration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <button 
              className="text-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              onClick={() => {
                const searchQuery = careerPathRecommendation 
                  ? `${skillName} ${careerPathRecommendation.recommendedPaths?.join(' ')} career development`
                  : `learn ${skillName} professional development`;
                window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
              }}
            >
              🎯 Career-Aligned Search
            </button>
            
            {careerPathRecommendation && careerPathRecommendation.industryFocus && (
              <button 
                className="text-center py-2 px-4 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                onClick={() => {
                  const industryQuery = `${skillName} ${careerPathRecommendation.industryFocus.join(' ')} industry training`;
                  window.open(`https://www.google.com/search?q=${encodeURIComponent(industryQuery)}`, '_blank');
                }}
              >
                🏭 Industry-Specific
              </button>
            )}
            
            <button 
              className="text-center py-2 px-4 border border-purple-600 text-sm font-medium rounded-md text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
              onClick={() => {
                const aiQuery = `${skillName} AI curated learning path ${userData.experienceLevel || 'intermediate'} level`;
                window.open(`https://www.google.com/search?q=${encodeURIComponent(aiQuery)}`, '_blank');
              }}
            >
              🤖 AI-Enhanced Search
            </button>
          </div>

          {/* v2.0 System Summary */}
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-lg border border-blue-200">
            <h5 className="text-sm font-bold text-blue-800 mb-1">
              🤖 Career Path Recommendation System v2.0 Summary:
            </h5>
            <p className="text-xs text-blue-700">
              Sequential Dependency Engine: Career Path → Skill Gap → Learning Roadmap. 
              {systemInfo ? `AI analyzed ${systemInfo.criteriaUsed} of 16 criteria with ${systemInfo.confidence}% confidence. ` : ''}
              Resources are dynamically generated using 4-tier weighted scoring (Core Drivers 45%, Strong Motivators 25%, Supporting Evidence 20%, Background Context 10%) 
              for maximum career transition efficiency and market relevance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillLearningResources;
