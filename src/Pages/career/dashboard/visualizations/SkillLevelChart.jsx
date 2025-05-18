import React from 'react';

const SkillLevelChart = ({ skill }) => {
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
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
    </div>
  );
};

export default SkillLevelChart;
