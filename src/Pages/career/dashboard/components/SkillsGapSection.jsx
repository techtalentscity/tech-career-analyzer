import React from 'react';
import SkillLevelChart from '../visualizations/SkillLevelChart';

const SkillsGapSection = ({ skillsGap, showAllSkills, setShowAllSkills, careerPaths, userData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
      <p className="text-gray-600 mb-4">
        Visual representation of your current skill levels versus required levels for your target career paths.
      </p>
      
      {/* Career-specific learning banner */}
      {careerPaths.length > 0 && (
        <div className="bg-indigo-50 px-6 py-5 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-indigo-800">
            Personalized Learning for {careerPaths[0].title}
          </h3>
          <p className="mt-2 text-sm text-indigo-700">
            Your learning resources are specifically tailored to help you become a successful {careerPaths[0].title}.
          </p>
        </div>
      )}
      
      {/* Simple version of the skills gap visualization */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {skillsGap.slice(0, 6).map((skill, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">{skill.name}</h3>
            <p className="text-sm text-gray-600">
              Current: {skill.currentLevel} → Required: {skill.requiredLevel}
            </p>
            <p className="text-sm text-gray-700 mt-2">{skill.description || 'No description available.'}</p>
            
            <div className="mt-4">
              <SkillLevelChart skill={skill} careerPaths={careerPaths} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Show more/less skills button */}
      {skillsGap.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {showAllSkills ? 'Show Less' : 'View All Skills'}
          </button>
        </div>
      )}
      
      {/* Additional skills when "show all" is clicked */}
      {showAllSkills && skillsGap.length > 6 && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {skillsGap.slice(6).map((skill, index) => (
            <div key={index + 6} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-600">
                Current: {skill.currentLevel} → Required: {skill.requiredLevel}
              </p>
              <div className="mt-4">
                <SkillLevelChart skill={skill} careerPaths={careerPaths} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsGapSection;
