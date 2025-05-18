// Utility functions for generating resource recommendations

// Generate specific resources based on task descriptions
export const generateResourcesForTasks = (tasks) => {
  const resources = [];
  
  // Join all tasks into a single string for easier checking
  const tasksText = tasks.join(' ').toLowerCase();
  
  // Check for specific keywords and add relevant resources
  if (tasksText.includes('ai') || tasksText.includes('machine learning')) {
    resources.push({
      title: 'Machine Learning for Healthcare',
      url: 'https://www.coursera.org/specializations/ai-for-medicine',
      platform: 'Coursera'
    });
    resources.push({
      title: 'AI for Financial Services',
      url: 'https://www.edx.org/course/artificial-intelligence-for-trading',
      platform: 'edX'
    });
  }
  
  if (tasksText.includes('cloud') || tasksText.includes('azure') || tasksText.includes('google cloud')) {
    resources.push({
      title: 'Google Cloud Certification Training',
      url: 'https://cloud.google.com/certification',
      platform: 'Google Cloud'
    });
    resources.push({
      title: 'Microsoft Azure Fundamentals',
      url: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/',
      platform: 'Microsoft Learn'
    });
  }
  
  // Add more resource mappings based on keywords
  
  // Limit to 3 resources to avoid overwhelming the user
  return resources.slice(0, 3);
};

// Generate learning resources for a skill
export const generateSkillResources = (skillName) => {
  const skillLower = skillName.toLowerCase();
  
  // Default resources structure
  const resources = {
    courses: [],
    tutorials: [],
    videos: [],
    projects: []
  };
  
  // Add generic resources
  resources.courses.push({
    title: "Comprehensive Learning Path",
    url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`,
    platform: "Coursera"
  });
  
  resources.tutorials.push({
    title: "Practical Tutorials",
    url: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skillName)}`,
    platform: "Udemy"
  });
  
  // Add skill-specific resources
  if (skillLower.includes('javascript')) {
    resources.courses.push({
      title: "JavaScript.info",
      url: "https://javascript.info/",
      platform: "JavaScript.info"
    });
    
    resources.tutorials.push({
      title: "JavaScript Exercises",
      url: "https://exercism.org/tracks/javascript",
      platform: "Exercism"
    });
  }
  // Add more skill-specific resource mappings
  
  return resources;
};
