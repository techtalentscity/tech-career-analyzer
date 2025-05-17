// src/components/SkillLevelChart.jsx
import React from 'react';
import SkillLearningResources from './SkillLearningResources';

const SkillLevelChart = ({ skill, userData }) => {
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  
  // Determine specific gap areas based on skill and analysis
  const analyzeSkillGap = (skill, userData) => {
    const gapAreas = [];
    
    // Analyze what specific aspects the user needs to improve
    if (skill.name.includes('Programming') && 
        (!userData.toolsUsed || !userData.toolsUsed.some(tool => 
          tool.includes('Code') || tool.includes('GitHub') || tool.includes('Git')))) {
      gapAreas.push('practical');
      gapAreas.push('tools');
    }
    
    if ((skill.name.includes('Data') || skill.name.includes('Database')) && 
        userData.careerPathsInterest && 
        userData.careerPathsInterest.includes('Data Analysis/Science')) {
      gapAreas.push('data-specific');
    }
    
    // Check if user has no practical experience in this area
    if (skill.gap >= 2 && userData.experienceLevel === 'Beginner') {
      gapAreas.push('foundations');
    }
    
    // Check if the user needs to improve this skill for career advancement
    if (skill.requiredLevel >= 4 && skill.currentLevel <= 2) {
      gapAreas.push('advanced-concepts');
    }
    
    // Check if the user needs project-based learning
    if (userData.educationLevel && userData.educationLevel.includes('Degree') && 
        !userData.jobProjects) {
      gapAreas.push('practical');
      gapAreas.push('projects');
    }
    
    return gapAreas;
  };

  // Enhance the skill details with analyzed gap areas
  const enhancedSkillDetails = {
    ...skill,
    gapAreas: analyzeSkillGap(skill, userData)
  };
  
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg">{skill.name}</h4>
        {skill.gap > 0 && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            skill.gap > 2 ? 'bg-red-100 text-red-700' : 
            skill.gap === 2 ? 'bg-yellow-100 text-yellow-700' : 
            'bg-green-100 text-green-700'
          }`}>
            Gap: {skill.gap} {skill.gap === 1 ? 'level' : 'levels'}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-5 gap-1 mb-3">
        {levels.map((level, index) => (
          <div key={index} className="relative">
            <div className={`h-8 rounded ${
              index < skill.currentLevel ? levelColors[index] : 'bg-gray-300'
            } ${index < skill.requiredLevel ? 'opacity-100' : 'opacity-30'}`}>
              {index < skill.requiredLevel && index >= skill.currentLevel && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Need</span>
                </div>
              )}
            </div>
            <p className="text-xs text-center mt-1">{level}</p>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Current: {levels[Math.max(0, skill.currentLevel - 1)]}</span>
        <span className="text-blue-600 font-medium">Target: {levels[Math.max(0, skill.requiredLevel - 1)]}</span>
      </div>
      
      {skill.description && (
        <p className="text-sm text-gray-700 mt-3">{skill.description}</p>
      )}
      
      {/* Add personalized learning recommendations based on gap areas */}
      {enhancedSkillDetails.gapAreas && enhancedSkillDetails.gapAreas.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {enhancedSkillDetails.gapAreas.map((area, idx) => (
            <span key={idx} className="inline-block px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
              {area === 'practical' ? 'Need practical experience' :
               area === 'foundations' ? 'Need fundamentals' :
               area === 'advanced-concepts' ? 'Need advanced concepts' :
               area === 'projects' ? 'Need project work' :
               area === 'tools' ? 'Need tool familiarity' :
               area}
            </span>
          ))}
        </div>
      )}
      
      {/* Use enhanced skill details and pass user data */}
      <SkillLearningResources 
        skillName={skill.name} 
        userData={userData} 
        skillDetails={enhancedSkillDetails} 
      />
    </div>
  );
};

export default SkillLevelChart;
