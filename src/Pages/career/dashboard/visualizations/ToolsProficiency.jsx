import React from 'react';

const ToolsProficiency = ({ tools, userData }) => {
  if (!tools || tools.length === 0 || (tools.length === 1 && tools[0] === 'None')) {
    return null;
  }
  
  const experienceMultiplier = {
    'Complete beginner': 0.5,
    'Some exposure': 0.7,
    'Beginner': 0.8,
    'Intermediate': 1,
    'Advanced': 1.2
  };

  const toolProficiencyMap = {
    'VS Code': 3,
    'GitHub': 3,
    'JavaScript': 4,
    'Python': 4,
    'React': 4,
    'Node.js': 4,
    'SQL': 3,
    'AWS': 5,
    'Docker': 4
  };

  const multiplier = experienceMultiplier[userData.experienceLevel] || 1;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Current Tools & Technologies</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {tools.filter(tool => tool !== 'None').map((tool, index) => {
          const proficiency = Math.round((toolProficiencyMap[tool] || 3) * multiplier);
          const proficiencyLabels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
          
          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{tool}</span>
                <span className="text-sm text-gray-600">{proficiencyLabels[proficiency - 1]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(proficiency / 5) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsProficiency;
