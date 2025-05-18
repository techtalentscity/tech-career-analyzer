// Utility functions for extracting data from analysis text

// Extract career paths and their match percentages
export const extractCareerPaths = (text) => {
  if (!text) return [];
  
  const lines = text.split('\n');
  const careerPaths = [];
  
  const careerPathRegex = /^[a-z]\)\s+(.*?)\s+\((\d+)%\s+match/i;
  
  lines.forEach(line => {
    const match = line.match(careerPathRegex);
    if (match) {
      careerPaths.push({
        title: match[1].trim(),
        match: parseInt(match[2], 10)
      });
    }
  });
  
  return careerPaths;
};

// Generate a related career path based on existing paths
export const generateRelatedCareerPath = (existingPaths, userData, skillsGap) => {
  // Comprehensive list of tech career paths we can suggest as alternatives
  const commonPaths = [
    // Data Science & Analytics
    { title: "Data Scientist", baseMatch: 85 },
    { title: "Machine Learning Engineer", baseMatch: 83 },
    { title: "Data Engineer", baseMatch: 82 },
    { title: "Business Intelligence Analyst", baseMatch: 75 },
    // More paths would be listed here...
  ];
  
  // Filter out paths that are already in existingPaths
  const availablePaths = commonPaths.filter(path => 
    !existingPaths.some(existing => existing.title.toLowerCase() === path.title.toLowerCase())
  );
  
  if (availablePaths.length === 0) {
    // Fallback if all common paths are already used
    return { 
      title: "Technical Project Manager", 
      match: 70 
    };
  }
  
  // Consider user's interests and skills to find a complementary path
  let bestMatch = null;
  let highestScore = 0;
  
  availablePaths.forEach(path => {
    let score = path.baseMatch;
    const pathTitle = path.title.toLowerCase();
    
    // Adjust score based on user's interests, education, skills
    // Score calculation logic would go here
    
    // Set lower match percentage than existing paths
    const lowestExistingMatch = existingPaths.length > 0 ? 
      Math.min(...existingPaths.map(p => p.match)) : 90;
    
    // Ensure new path has slightly lower match than existing ones
    const finalMatch = Math.min(score, lowestExistingMatch - 3);
    
    if (finalMatch > highestScore) {
      highestScore = finalMatch;
      bestMatch = {
        title: path.title,
        match: Math.round(finalMatch)
      };
    }
  });
  
  return bestMatch || {
    title: "Technical Project Manager",
    match: 70
  };
};

// Ensure we have exactly three career paths for display
export const getThreeCareerPaths = (paths, userData, skillsGap) => {
  // Make a defensive copy to avoid modifying the original
  let displayPaths = [...paths];
  
  // If we have fewer than 3 paths, generate additional ones
  while (displayPaths.length < 3) {
    // Generate a complementary career path
    const generatedPath = generateRelatedCareerPath(displayPaths, userData, skillsGap);
    displayPaths.push(generatedPath);
  }
  
  // Limit to exactly 3 paths
  return displayPaths.slice(0, 3);
};

// Extract market trends data from analysis text
export const extractMarketTrends = (text) => {
  if (!text) return [];
  
  const marketTrends = [];
  const lines = text.split('\n');
  let inMarketTrendsSection = false;
  let currentSubsection = "";
  
  lines.forEach((line, index) => {
    if (line.includes("MARKET TRENDS") || line.includes("JOB MARKET ANALYSIS")) {
      inMarketTrendsSection = true;
      return;
    }
    
    // Check for end of Market Trends section
    if (inMarketTrendsSection && (
        line.includes("NETWORKING STRATEGY") || 
        line.includes("PERSONAL BRANDING") || 
        line.includes("INTERVIEW PREPARATION") ||
        line.includes("LEARNING ROADMAP") || 
        line.includes("SKILLS GAP ANALYSIS") || 
        line.includes("TRANSITION STRATEGY")
      )) {
      inMarketTrendsSection = false;
      return;
    }
    
    // Check for subsections within market trends
    if (inMarketTrendsSection && line.match(/^\d+\.\s+[A-Z]/)) {
      currentSubsection = line.replace(/^\d+\.\s+/, '').trim();
      marketTrends.push({
        title: currentSubsection,
        type: 'section_header'
      });
      return;
    }
    
    if (inMarketTrendsSection && line.trim() !== '') {
      // Look for career path mentions with salary ranges
      const salaryMatch = line.match(/(.+?)\s*:\s*\$(\d+[,\d]*)\s*-\s*\$(\d+[,\d]*)/i);
      if (salaryMatch) {
        marketTrends.push({
          careerPath: salaryMatch[1].trim(),
          minSalary: parseInt(salaryMatch[2].replace(/,/g, ''), 10),
          maxSalary: parseInt(salaryMatch[3].replace(/,/g, ''), 10),
          type: 'salary',
          subsection: currentSubsection
        });
        return;
      }
      
      // Look for growth statistics
      const growthMatch = line.match(/(.+?)\s*:?\s*(\d+)%\s*growth/i);
      if (growthMatch) {
        marketTrends.push({
          careerPath: growthMatch[1].trim(),
          growth: parseInt(growthMatch[2], 10),
          type: 'growth',
          subsection: currentSubsection
        });
        return;
      }
      
      // Look for general trends
      if (line.match(/^\d+\.\s+/) || line.match(/^•\s+/) || line.match(/^-\s+/)) {
        const trendText = line.replace(/^(\d+\.|•|-)\s+/, '').trim();
        if (trendText) {
          marketTrends.push({
            trend: trendText,
            type: 'general',
            subsection: currentSubsection
          });
        }
      }
    }
  });
  
  return marketTrends;
};

// Extract networking strategy from analysis text
export const extractNetworkingStrategy = (text) => {
  if (!text) return [];
  
  const strategies = [];
  const lines = text.split('\n');
  let inNetworkingSection = false;
  
  lines.forEach((line, index) => {
    if (line.includes("NETWORKING STRATEGY")) {
      inNetworkingSection = true;
      strategies.push({
        title: line.trim(),
        type: 'section_title'
      });
      return;
    }
    
    if (inNetworkingSection && (
      line.includes("PERSONAL BRANDING") || 
      line.includes("INTERVIEW PREPARATION") ||
      line.includes("LEARNING ROADMAP") || 
      line.includes("SKILLS GAP ANALYSIS") || 
      line.includes("TRANSITION STRATEGY")
    )) {
      inNetworkingSection = false;
      return;
    }
    
    if (inNetworkingSection && line.trim() !== '') {
      if (line.trim().startsWith('-')) {
        const strategyText = line.replace(/^-\s+/, '').trim();
        strategies.push({
          text: strategyText,
          type: 'strategy'
        });
      }
    }
  });
  
  return strategies;
};

// Extract personal branding tips from analysis text
export const extractPersonalBranding = (text) => {
  if (!text) return [];
  
  const brandingTips = [];
  const lines = text.split('\n');
  let inBrandingSection = false;
  
  lines.forEach((line, index) => {
    if (line.includes("PERSONAL BRANDING")) {
      inBrandingSection = true;
      brandingTips.push({
        title: line.trim(),
        type: 'section_title'
      });
      return;
    }
    
    if (inBrandingSection && (
      line.includes("NETWORKING STRATEGY") || 
      line.includes("INTERVIEW PREPARATION") ||
      line.includes("LEARNING ROADMAP") || 
      line.includes("SKILLS GAP ANALYSIS") || 
      line.includes("TRANSITION STRATEGY")
    )) {
      inBrandingSection = false;
      return;
    }
    
    if (inBrandingSection && line.trim() !== '') {
      if (line.trim().startsWith('-')) {
        const tipText = line.replace(/^-\s+/, '').trim();
        brandingTips.push({
          text: tipText,
          type: 'tip'
        });
      }
    }
  });
  
  return brandingTips;
};

// Extract interview preparation advice from analysis text
export const extractInterviewPrep = (text) => {
  if (!text) return [];
  
  const interviewTips = [];
  const lines = text.split('\n');
  let inInterviewSection = false;
  
  lines.forEach((line, index) => {
    if (line.includes("INTERVIEW PREPARATION")) {
      inInterviewSection = true;
      interviewTips.push({
        title: line.trim(),
        type: 'section_title'
      });
      return;
    }
    
    if (inInterviewSection && (
      line.includes("NETWORKING STRATEGY") || 
      line.includes("PERSONAL BRANDING") ||
      line.includes("LEARNING ROADMAP") || 
      line.includes("SKILLS GAP ANALYSIS") || 
      line.includes("TRANSITION STRATEGY")
    )) {
      inInterviewSection = false;
      return;
    }
    
    if (inInterviewSection && line.trim() !== '') {
      if (line.trim().startsWith('-')) {
        const tipText = line.replace(/^-\s+/, '').trim();
        interviewTips.push({
          text: tipText,
          type: 'tip'
        });
      }
    }
  });
  
  return interviewTips;
};

// Extract skills gap data from analysis text
export const extractSkillsGap = (text, userData) => {
  if (!text) return [];
  
  const skills = [];
  const userToolsUsed = userData.toolsUsed || [];
  
  // Create a mapping of tools to skill names and categories based on actual user choices
  const toolSkillMapping = {
    'VS Code': { name: 'IDE Proficiency', category: 'Development Tools' },
    'GitHub': { name: 'Version Control', category: 'Collaboration Tools' },
    'JavaScript': { name: 'JavaScript Programming', category: 'Programming Languages' },
    'Python': { name: 'Python Programming', category: 'Programming Languages' },
    'React': { name: 'React Framework', category: 'Frontend Frameworks' },
    'Node.js': { name: 'Node.js Runtime', category: 'Backend Technologies' },
    'SQL': { name: 'Database Management', category: 'Database' },
    'AWS': { name: 'Cloud Computing', category: 'Cloud Services' },
    'Docker': { name: 'Containerization', category: 'DevOps' }
  };

  // Map user experience level to numeric values for skill comparison
  const experienceLevelMap = {
    'Complete beginner': 1,
    'Some exposure': 2,
    'Beginner': 2,
    'Intermediate': 3,
    'Advanced': 4
  };

  const currentLevel = experienceLevelMap[userData.experienceLevel] || 1;

  const lines = text.split('\n');
  let inSkillsGapSection = false;
  
  lines.forEach((line) => {
    // Check for section headers with both formats - plain and numbered
    if (line.includes("SKILLS GAP ANALYSIS") || line.match(/\d+\.\s+SKILLS\s+GAP\s+ANALYSIS/i)) {
      inSkillsGapSection = true;
      return;
    }
    
    // Check for end of section with both formats - plain and numbered
    if (inSkillsGapSection && (
      line.includes("LEARNING ROADMAP") || 
      line.includes("TRANSITION STRATEGY") ||
      line.match(/\d+\.\s+LEARNING\s+ROADMAP/i) ||
      line.match(/\d+\.\s+TRANSITION\s+STRATEGY/i)
    )) {
      inSkillsGapSection = false;
      return;
    }
    
    // Pattern 1: numbered skills with descriptions (like in screenshot)
    if (inSkillsGapSection && line.match(/^\d+\.\s+[^:]+:/)) {
      // Format: "1. Programming Proficiency: Need to advance Python skills..."
      const skillMatch = line.match(/^\d+\.\s+([^:]+):\s*(.+)/);
      
      if (skillMatch) {
        const skillName = skillMatch[1].trim();
        const description = skillMatch[2].trim();
        
        let userCurrentLevel = currentLevel;
        let requiredLevel = 4;
        
        // Adjust required level based on description wording
        const descLower = description.toLowerCase();
        if (descLower.includes('basic') || descLower.includes('fundamental')) {
          requiredLevel = 2;
        } else if (descLower.includes('intermediate') || descLower.includes('solid')) {
          requiredLevel = 3;
        } else if (descLower.includes('advanced') || descLower.includes('deep')) {
          requiredLevel = 4;
        } else if (descLower.includes('expert') || descLower.includes('mastery')) {
          requiredLevel = 5;
        }
        
        // Determine learning resources based on skill name
        let resources = determineSkillResources(skillName);
        
        skills.push({
          name: skillName,
          description: description,
          currentLevel: userCurrentLevel,
          requiredLevel: requiredLevel,
          gap: requiredLevel - userCurrentLevel,
          resources: resources
        });
      }
    }
    
    // Alternative pattern: bullet points with colons
    if (inSkillsGapSection && line.match(/^\s*-\s+[^:]+:/)) {
      // Format: "- Programming Proficiency: Need to advance Python skills..."
      const skillMatch = line.match(/^\s*-\s+([^:]+):\s*(.+)/);
      
      if (skillMatch) {
        const skillName = skillMatch[1].trim();
        const description = skillMatch[2].trim();
        
        let userCurrentLevel = currentLevel;
        let requiredLevel = 4;
        
        // Determine levels based on description
        const descLower = description.toLowerCase();
        if (descLower.includes('basic') || descLower.includes('fundamental')) {
          requiredLevel = 2;
        } else if (descLower.includes('intermediate') || descLower.includes('solid')) {
          requiredLevel = 3;
        } else if (descLower.includes('advanced') || descLower.includes('deep')) {
          requiredLevel = 4;
        } else if (descLower.includes('expert') || descLower.includes('mastery')) {
          requiredLevel = 5;
        }
        
        // Determine learning resources based on skill name
        let resources = determineSkillResources(skillName);
        
        skills.push({
          name: skillName,
          description: description,
          currentLevel: userCurrentLevel,
          requiredLevel: requiredLevel,
          gap: requiredLevel - userCurrentLevel,
          resources: resources
        });
      }
    }
  });
  
  // Additional logic to generate default skills if none found
  
  return skills;
};

// Format analysis text for display
export const formatAnalysisText = (text) => {
  if (!text) return [];
  
  const lines = text.split('\n');
  let formattedContent = [];
  let inSkillsGapSection = false;
  let inLearningRoadmapSection = false;
  
  // Skip section tracking
  let skipCurrentSection = false;
  let currentSkipSection = "";
  
  // Sections to skip - both plain names and numbered versions
  const skipSectionKeywords = [
    "NETWORKING STRATEGY", 
    "PERSONAL BRANDING", 
    "INTERVIEW PREPARATION",
    "MARKET TRENDS",
    "JOB MARKET ANALYSIS"
  ];
  
  // Process content helper
  const processContent = (content) => {
    content = content.replace(/\btheir\b/gi, 'your');
    content = content.replace(/\bthey\b/gi, 'you');
    content = content.replace(/\bthem\b/gi, 'you');
    content = content.replace(/\bthemselves\b/gi, 'yourself');
    
    // Additional processing logic would go here
    
    return { __html: content };
  };
  
  // Logic to format each line of the analysis text
  lines.forEach((line, index) => {
    // Processing logic here
    
    // Build formatted content array with React elements
  });
  
  return formattedContent;
};

// Create timeline visualization data
export const createTimelineData = (userData, careerPaths, skillsGap) => {
  const timelineMap = {
    'Less than 6 months': 6,
    '6-12 months': 12,
    '1-2 years': 18,
    '2+ years': 24,
    'Already transitioning': 3
  };
  
  // Get user's top career path if available
  const topCareerPath = careerPaths.length > 0 ? careerPaths[0].title : "";
  
  // Get user's top skills gaps
  const topSkillsGaps = skillsGap
    .filter(skill => skill.gap > 0)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 3)
    .map(skill => skill.name);
  
  const months = timelineMap[userData.transitionTimeline] || 12;
  const milestones = [];
  
  // Logic to create timeline milestones based on month options
  
  return milestones;
};

// Generate next steps based on user data and analysis
export const generateNextSteps = (networkingStrategy, personalBranding, skillsGap, interviewPrep, userData) => {
  const steps = [];
  
  // Use networking strategies if available
  if (networkingStrategy && networkingStrategy.length > 0) {
    const networkingStrategies = networkingStrategy.filter(item => item.type === 'strategy');
    if (networkingStrategies.length > 0) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        color: 'text-blue-600',
        title: 'Build Your Network',
        description: networkingStrategies[0].text
      });
    }
  }
  
  // Generate other next steps based on available data
  
  return steps;
};

// Helper function to determine relevant learning resources for a skill
export const determineSkillResources = (skillName) => {
  const skillLower = skillName.toLowerCase();
  
  // Default resources
  let resources = {
    courses: [{
      title: "Comprehensive Learning Path",
      url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`,
      platform: "Coursera"
    }],
    tutorials: [{
      title: "Practical Tutorials",
      url: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skillName)}`,
      platform: "Udemy"
    }],
    videos: [{
      title: "Video Tutorials",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName)}+tutorial+beginner`,
      platform: "YouTube"
    }],
    projects: [{
      title: "Example Projects",
      url: `https://github.com/topics/${encodeURIComponent(skillName.toLowerCase().replace(/ /g, '-'))}`,
      platform: "GitHub"
    }]
  };
  
  // Add specific resources based on skill name
  // Frontend Development
  if (skillLower.includes('javascript') || skillLower.includes('js')) {
    resources.courses.push({
      title: "JavaScript Fundamentals",
      url: "https://javascript.info/",
      platform: "JavaScript.info"
    });
    resources.courses.push({
      title: "Modern JavaScript",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      platform: "freeCodeCamp"
    });
    resources.tutorials.push({
      title: "JavaScript Exercises",
      url: "https://exercism.org/tracks/javascript",
      platform: "Exercism"
    });
  }
  // Add more skill resource mappings
  
  return resources;
};

// Helper function to determine default skills based on career path
export const determineDefaultSkillsForCareer = (careerPath) => {
  const careerLower = careerPath.toLowerCase();
  
  // Frontend Development Paths
  if (careerLower.includes('frontend') || careerLower.includes('front-end') || careerLower.includes('front end')) {
    return [
      {
        name: "JavaScript Programming",
        description: "Develop strong JavaScript skills required for modern frontend development",
        category: "Programming Languages"
      },
      {
        name: "Frontend Frameworks",
        description: "Learn React, Vue, or Angular to build interactive web applications",
        category: "Frontend"
      },
      {
        name: "Responsive Design",
        description: "Master CSS and responsive design principles for modern web applications",
        category: "Web Development"
      }
    ];
  }
  // Add more career path to skill mappings
  
  // Default skills for general tech careers
  return [
    {
      name: "Programming Fundamentals",
      description: "Build a strong foundation in programming principles and logic",
      category: "Programming"
    },
    {
      name: "Web Development",
      description: "Develop skills in creating modern web applications and services",
      category: "Web Development"
    },
    {
      name: "Project Management",
      description: "Learn to manage technical projects and collaborate effectively",
      category: "Soft Skills"
    }
  ];
};
