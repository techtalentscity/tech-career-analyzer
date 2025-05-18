// Helper functions for chart generation and data processing

// Generate chart data from career paths
export const generateCareerPathChartData = (careerPaths) => {
  return careerPaths.map(path => ({
    label: path.title,
    value: path.match
  }));
};

// Generate skill chart data
export const generateSkillChartData = (skillsGap) => {
  return skillsGap.map(skill => ({
    name: skill.name,
    currentLevel: skill.currentLevel,
    requiredLevel: skill.requiredLevel,
    gap: skill.gap,
    description: skill.description
  }));
};

// Map experience level text to numeric values
export const mapExperienceLevelToNumeric = (level) => {
  const experienceLevelMap = {
    'Complete beginner': 1,
    'Some exposure': 2,
    'Beginner': 2,
    'Intermediate': 3,
    'Advanced': 4,
    'Expert': 5
  };
  
  return experienceLevelMap[level] || 1;
};

// Map numeric level to text description
export const mapNumericLevelToText = (level) => {
  const levelMap = {
    1: 'Beginner',
    2: 'Basic',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  };
  
  return levelMap[level] || 'Beginner';
};
