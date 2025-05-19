import React from 'react';
import { careerPathHasSkill } from '../utils/resourceRecommender';

const SkillLevelChart = ({ skill, careerPaths }) => {
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  
  // Check if this skill is critical for the top career path
  const isKeySkill = careerPaths && careerPaths.length > 0 && 
    careerPathHasSkill(careerPaths[0].title, skill.name);
  
  // Determine if this is a technical or business/domain skill
  const isTechnicalSkill = isSkillTechnical(skill.name);
  
  return (
    <div className={`mb-6 p-4 rounded-lg ${isKeySkill 
      ? (isTechnicalSkill ? 'bg-blue-50 border border-blue-100' : 'bg-purple-50 border border-purple-100') 
      : 'bg-gray-50'}`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg flex items-center">
          {skill.name}
          {!isTechnicalSkill && (
            <span className="ml-2 text-xs font-normal text-purple-600 px-2 py-0.5 bg-purple-50 rounded-full">
              Domain Skill
            </span>
          )}
        </h4>
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
      
      {/* Career relevance indicator */}
      {isKeySkill && careerPaths && careerPaths.length > 0 && (
        <div className="mt-3 text-xs text-blue-700 flex items-center">
          <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Critical {isTechnicalSkill ? 'technical' : 'domain'} skill for {careerPaths[0].title}
        </div>
      )}
    </div>
  );
};

// Helper function to determine if a skill is technical or domain/business skill
const isSkillTechnical = (skillName) => {
  const technicalKeywords = [
    'python', 'javascript', 'java', 'c#', 'c++', 'ruby', 'php', 'swift', 'kotlin',
    'react', 'angular', 'vue', 'node', 'django', 'flask', 'rails', 'express',
    'sql', 'database', 'mongodb', 'postgresql', 'mysql', 'nosql',
    'aws', 'azure', 'gcp', 'cloud', 'docker', 'kubernetes', 'devops',
    'machine learning', 'ml', 'ai', 'artificial intelligence', 'data science',
    'frontend', 'backend', 'fullstack', 'web development',
    'mobile', 'ios', 'android', 'flutter', 'react native',
    'git', 'github', 'version control',
    'api', 'rest', 'graphql',
    'cybersecurity', 'security', 'encryption', 'blockchain',
    'html', 'css', 'sass', 'less',
    'testing', 'automation', 'ci/cd',
    'linux', 'unix', 'shell', 'bash',
    'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn'
  ];
  
  const skillLower = skillName.toLowerCase();
  
  return technicalKeywords.some(keyword => 
    skillLower.includes(keyword) || keyword.includes(skillLower)
  );
};

export default SkillLevelChart;
