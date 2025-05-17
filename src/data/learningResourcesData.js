// src/data/learningResourcesData.js

export const learningResources = {
  // Programming Languages
  "JavaScript Programming": [
    { 
      title: "JavaScript: The Definitive Guide", 
      url: "https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/", 
      type: "book",
      difficulty: "intermediate",
      description: "Comprehensive reference for JavaScript developers",
      careerPaths: ["Software Development", "Frontend Development", "Web Development"],
      focusAreas: ["comprehensive", "reference", "in-depth"],
      bestFor: ["experienced programmers", "reference needs"]
    },
    { 
      title: "JavaScript30", 
      url: "https://javascript30.com/", 
      type: "course",
      difficulty: "beginner",
      description: "Build 30 things in 30 days with vanilla JS",
      careerPaths: ["Frontend Development", "Web Development"],
      focusAreas: ["practical", "projects", "hands-on"],
      bestFor: ["visual learners", "project-based learners"]
    },
    { 
      title: "MDN JavaScript Guide", 
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", 
      type: "tutorial",
      difficulty: "beginner",
      description: "Mozilla's comprehensive JavaScript documentation",
      careerPaths: ["Software Development", "Frontend Development", "Web Development"],
      focusAreas: ["foundations", "basics", "reference"],
      bestFor: ["beginners", "self-guided learners"]
    },
    {
      title: "Eloquent JavaScript",
      url: "https://eloquentjavascript.net/",
      type: "book",
      difficulty: "intermediate",
      description: "Modern introduction to programming with JavaScript",
      careerPaths: ["Software Development", "Frontend Development"],
      focusAreas: ["fundamentals", "programming concepts", "modern JS"],
      bestFor: ["beginners with some programming experience", "analytical thinkers"]
    },
    {
      title: "JavaScript Algorithms and Data Structures Masterclass",
      url: "https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/",
      type: "course",
      difficulty: "advanced",
      description: "Deep dive into algorithms and data structures in JavaScript",
      careerPaths: ["Software Development", "Frontend Development"],
      focusAreas: ["algorithms", "data structures", "interview prep"],
      bestFor: ["job seekers", "interview preparation", "advanced concepts"]
    }
  ],
  "Python Programming": [
    { 
      title: "Python Crash Course", 
      url: "https://nostarch.com/pythoncrashcourse2e", 
      type: "book",
      difficulty: "beginner",
      description: "Fast-paced introduction to Python programming",
      careerPaths: ["Data Analysis/Science", "Software Development", "AI/Machine Learning"],
      focusAreas: ["foundations", "syntax", "basics"],
      bestFor: ["complete beginners", "switching from another language"]
    },
    { 
      title: "Automate the Boring Stuff with Python", 
      url: "https://automatetheboringstuff.com/", 
      type: "book",
      difficulty: "beginner", 
      description: "Practical programming for total beginners",
      careerPaths: ["Software Development", "DevOps"],
      focusAreas: ["practical", "automation", "real-world"],
      bestFor: ["beginners who want practical skills", "quick results"]
    },
    { 
      title: "Python for Data Science and Machine Learning Bootcamp", 
      url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/", 
      type: "course",
      difficulty: "intermediate",
      description: "Learn Python for data analysis and visualization",
      careerPaths: ["Data Analysis/Science", "AI/Machine Learning"],
      focusAreas: ["data analysis", "libraries", "visualization"],
      bestFor: ["transitioning to data science", "data-focused developers"]
    },
    {
      title: "Real Python",
      url: "https://realpython.com/",
      type: "tutorial",
      difficulty: "beginner",
      description: "Practical Python programming tutorials and articles",
      careerPaths: ["Software Development", "DevOps", "Data Analysis/Science"],
      focusAreas: ["practical", "tips", "best practices"],
      bestFor: ["self-guided learners", "practical application"]
    },
    {
      title: "Python Programming: An Introduction to Computer Science",
      url: "https://mcsp.wartburg.edu/zelle/python/",
      type: "book",
      difficulty: "beginner",
      description: "Computer science fundamentals using Python",
      careerPaths: ["Software Development", "CS Fundamentals"],
      focusAreas: ["computer science", "fundamentals", "theory"],
      bestFor: ["learners interested in CS theory", "students"]
    }
  ],
  
  // Data Skills
  "Data Analysis": [
    { 
      title: "Data Analysis with Python Course", 
      url: "https://www.freecodecamp.org/learn/data-analysis-with-python/", 
      type: "course",
      difficulty: "intermediate",
      description: "FreeCodeCamp's data analysis certification course",
      careerPaths: ["Data Analysis/Science", "Business Analysis"],
      focusAreas: ["pandas", "data cleaning", "visualization"],
      bestFor: ["self-guided learners", "certification seekers"]
    },
    { 
      title: "Python for Data Analysis", 
      url: "https://wesmckinney.com/book/", 
      type: "book",
      difficulty: "intermediate",
      description: "Data wrangling with Pandas, NumPy, and IPython",
      careerPaths: ["Data Analysis/Science", "Research"],
      focusAreas: ["data manipulation", "pandas", "numpy"],
      bestFor: ["data professionals", "researchers"]
    },
    { 
      title: "DataCamp Data Analyst with Python", 
      url: "https://www.datacamp.com/tracks/data-analyst-with-python", 
      type: "course",
      difficulty: "beginner",
      description: "Complete track for aspiring data analysts",
      careerPaths: ["Data Analysis/Science", "Business Analysis"],
      focusAreas: ["foundations", "practical skills", "industry tools"],
      bestFor: ["career transitioners", "interactive learners"]
    },
    {
      title: "The Art of Data Science",
      url: "https://bookdown.org/rdpeng/artofdatascience/",
      type: "book",
      difficulty: "intermediate",
      description: "Process and principles of data analysis",
      careerPaths: ["Data Analysis/Science", "Research"],
      focusAreas: ["methodology", "process", "principles"],
      bestFor: ["analytical thinkers", "research-oriented"]
    },
    {
      title: "SQL for Data Science",
      url: "https://www.coursera.org/learn/sql-for-data-science",
      type: "course",
      difficulty: "beginner",
      description: "Essential SQL skills for data scientists",
      careerPaths: ["Data Analysis/Science", "Database Administration"],
      focusAreas: ["database", "querying", "data extraction"],
      bestFor: ["data analysts needing SQL", "beginners to databases"]
    }
  ],
  "Data Visualization": [
    { 
      title: "Data Visualization with Python", 
      url: "https://www.coursera.org/learn/python-for-data-visualization", 
      type: "course",
      difficulty: "intermediate",
      description: "Create impactful visualizations with Matplotlib and Seaborn",
      careerPaths: ["Data Analysis/Science", "Business Analysis"],
      focusAreas: ["matplotlib", "seaborn", "visualization types"],
      bestFor: ["data professionals", "report creators"]
    },
    { 
      title: "Storytelling with Data", 
      url: "https://www.storytellingwithdata.com/books", 
      type: "book",
      difficulty: "beginner",
      description: "Focus on effective visualization techniques",
      careerPaths: ["Data Analysis/Science", "Business Analysis", "UX/UI Design"],
      focusAreas: ["principles", "storytelling", "design"],
      bestFor: ["presenters", "business professionals"]
    },
    { 
      title: "D3.js Documentation", 
      url: "https://d3js.org/", 
      type: "tutorial",
      difficulty: "advanced", 
      description: "Comprehensive documentation for D3.js visualization library",
      careerPaths: ["Frontend Development", "Data Visualization"],
      focusAreas: ["interactive", "web visualization", "advanced charts"],
      bestFor: ["web developers", "advanced visualization needs"]
    },
    {
      title: "Information Dashboard Design",
      url: "https://www.perceptualedge.com/library.php",
      type: "book",
      difficulty: "intermediate",
      description: "Principles for effective dashboard design",
      careerPaths: ["UX/UI Design", "Data Analysis/Science", "Business Intelligence"],
      focusAreas: ["dashboard design", "business intelligence", "visual perception"],
      bestFor: ["dashboard creators", "business intelligence professionals"]
    },
    {
      title: "Data Visualization Specialization",
      url: "https://www.coursera.org/specializations/data-visualization",
      type: "course",
      difficulty: "intermediate",
      description: "Comprehensive specialization on visualization techniques",
      careerPaths: ["Data Analysis/Science", "UX/UI Design"],
      focusAreas: ["comprehensive", "principles", "multiple tools"],
      bestFor: ["career advancement", "multi-tool approach"]
    }
  ],
  
  // Web Development
  "React Framework": [
    { 
      title: "React Documentation", 
      url: "https://reactjs.org/docs/getting-started.html", 
      type: "tutorial",
      difficulty: "beginner",
      description: "Official React documentation and tutorials",
      careerPaths: ["Frontend Development", "Web Development", "UX/UI Design"],
      focusAreas: ["fundamentals", "official documentation", "best practices"],
      bestFor: ["beginners to React", "reference needs"]
    },
    { 
      title: "Epic React by Kent C. Dodds", 
      url: "https://epicreact.dev/", 
      type: "course",
      difficulty: "intermediate",
      description: "Deep dive into React fundamentals and advanced patterns",
      careerPaths: ["Frontend Development", "Web Development"],
      focusAreas: ["advanced patterns", "testing", "performance"],
      bestFor: ["intermediate-advanced developers", "professional usage"]
    },
    { 
      title: "React - The Complete Guide", 
      url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", 
      type: "course",
      difficulty: "beginner",
      description: "Comprehensive course covering React, Hooks, Redux and more",
      careerPaths: ["Frontend Development", "Web Development"],
      focusAreas: ["comprehensive", "practical", "project-based"],
      bestFor: ["beginners", "project-based learners"]
    },
    {
      title: "Full Stack Open",
      url: "https://fullstackopen.com/en/",
      type: "course",
      difficulty: "intermediate",
      description: "Modern web development with JavaScript and React",
      careerPaths: ["Frontend Development", "Web Development", "Full Stack Development"],
      focusAreas: ["full stack", "modern development", "real-world"],
      bestFor: ["comprehensive learners", "career transitioners"]
    },
    {
      title: "React Patterns",
      url: "https://reactpatterns.com/",
      type: "tutorial",
      difficulty: "advanced",
      description: "Collection of design patterns and best practices for React",
      careerPaths: ["Frontend Development", "Web Development"],
      focusAreas: ["patterns", "best practices", "advanced concepts"],
      bestFor: ["experienced React developers", "architecture knowledge"]
    }
  ],
  
  // Database
  "Database Management": [
    { 
      title: "SQL for Data Scientists", 
      url: "https://www.coursera.org/learn/sql-for-data-science", 
      type: "course",
      difficulty: "beginner",
      description: "Learn SQL for data extraction and analysis",
      careerPaths: ["Data Analysis/Science", "Database Administration"],
      focusAreas: ["SQL fundamentals", "querying", "data extraction"],
      bestFor: ["data professionals", "analysis needs"]
    },
    { 
      title: "The Manga Guide to Databases", 
      url: "https://nostarch.com/mg_databases.htm", 
      type: "book",
      difficulty: "beginner",
      description: "Visual, fun introduction to database concepts",
      careerPaths: ["Database Administration", "Software Development"],
      focusAreas: ["fundamentals", "concepts", "beginner-friendly"],
      bestFor: ["visual learners", "absolute beginners"]
    },
    { 
      title: "Stanford's Database Course", 
      url: "https://www.edx.org/course/databases-5-sql", 
      type: "course",
      difficulty: "intermediate",
      description: "University-level course on database fundamentals",
      careerPaths: ["Database Administration", "Software Development"],
      focusAreas: ["relational theory", "academic approach", "fundamentals"],
      bestFor: ["academic learners", "deep understanding"]
    },
    {
      title: "PostgreSQL Tutorial",
      url: "https://www.postgresqltutorial.com/",
      type: "tutorial",
      difficulty: "intermediate",
      description: "Comprehensive PostgreSQL database tutorial",
      careerPaths: ["Database Administration", "Backend Development"],
      focusAreas: ["PostgreSQL specific", "practical", "comprehensive"],
      bestFor: ["PostgreSQL users", "practical needs"]
    },
    {
      title: "MongoDB University",
      url: "https://university.mongodb.com/",
      type: "course",
      difficulty: "beginner",
      description: "Free official MongoDB courses and certification",
      careerPaths: ["Database Administration", "Backend Development", "DevOps"],
      focusAreas: ["NoSQL", "MongoDB", "certification"],
      bestFor: ["NoSQL focus", "certification seekers"]
    }
  ],
  
  // Machine Learning
  "Machine Learning": [
    { 
      title: "Machine Learning Course by Andrew Ng", 
      url: "https://www.coursera.org/learn/machine-learning", 
      type: "course",
      difficulty: "intermediate",
      description: "Foundational ML course covering core algorithms",
      careerPaths: ["AI/Machine Learning", "Data Analysis/Science"],
      focusAreas: ["fundamentals", "algorithms", "theory"],
      bestFor: ["beginners to ML", "theoretical foundation"]
    },
    { 
      title: "Hands-On Machine Learning", 
      url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", 
      type: "book",
      difficulty: "intermediate",
      description: "Practical guide with scikit-learn and TensorFlow",
      careerPaths: ["AI/Machine Learning", "Data Analysis/Science"],
      focusAreas: ["practical", "implementation", "scikit-learn"],
      bestFor: ["practitioners", "project-based learners"]
    },
    { 
      title: "Fast.ai", 
      url: "https://www.fast.ai/", 
      type: "course",
      difficulty: "intermediate",
      description: "Practical deep learning for coders",
      careerPaths: ["AI/Machine Learning", "Data Analysis/Science"],
      focusAreas: ["deep learning", "practical", "top-down approach"],
      bestFor: ["coders learning ML", "practical implementation"]
    },
    {
      title: "Elements of Statistical Learning",
      url: "https://web.stanford.edu/~hastie/ElemStatLearn/",
      type: "book",
      difficulty: "advanced",
      description: "Comprehensive mathematical treatment of machine learning",
      careerPaths: ["AI/Machine Learning", "Research"],
      focusAreas: ["mathematics", "statistics", "theoretical"],
      bestFor: ["researchers", "mathematical background"]
    },
    {
      title: "Kaggle Learn",
      url: "https://www.kaggle.com/learn",
      type: "tutorial",
      difficulty: "beginner",
      description: "Hands-on ML courses with practical exercises",
      careerPaths: ["AI/Machine Learning", "Data Analysis/Science"],
      focusAreas: ["practical", "competitions", "real datasets"],
      bestFor: ["practical learners", "competition participants"]
    }
  ],
  
  // Soft Skills
  "Problem Solving": [
    { 
      title: "LeetCode", 
      url: "https://leetcode.com/", 
      type: "practice",
      difficulty: "varied",
      description: "Platform for practicing coding interview problems",
      careerPaths: ["Software Development", "AI/Machine Learning"],
      focusAreas: ["algorithms", "interview prep", "coding challenges"],
      bestFor: ["interview preparation", "algorithm practice"]
    },
    { 
      title: "Cracking the Coding Interview", 
      url: "https://www.crackingthecodinginterview.com/", 
      type: "book",
      difficulty: "intermediate",
      description: "Classic guide to coding interviews and problem-solving",
      careerPaths: ["Software Development", "Frontend Development", "Backend Development"],
      focusAreas: ["interview prep", "algorithms", "problem-solving"],
      bestFor: ["job seekers", "interview preparation"]
    },
    { 
      title: "HackerRank Problem Solving", 
      url: "https://www.hackerrank.com/domains/algorithms", 
      type: "practice",
      difficulty: "varied",
      description: "Algorithmic challenges with varying difficulty levels",
      careerPaths: ["Software Development", "AI/Machine Learning"],
      focusAreas: ["algorithms", "competitive coding", "challenges"],
      bestFor: ["competitive programmers", "skill development"]
    },
    {
      title: "Think Like a Programmer",
      url: "https://www.nostarch.com/thinklikeaprogrammer",
      type: "book",
      difficulty: "beginner",
      description: "Introduction to creative problem solving for programmers",
      careerPaths: ["Software Development", "Cybersecurity"],
      focusAreas: ["problem-solving process", "thinking methods", "approach"],
      bestFor: ["new programmers", "analytical thinking development"]
    },
    {
      title: "Project Euler",
      url: "https://projecteuler.net/",
      type: "practice",
      difficulty: "advanced",
      description: "Mathematical and computational problems for programming practice",
      careerPaths: ["Software Development", "AI/Machine Learning"],
      focusAreas: ["mathematics", "algorithms", "computational thinking"],
      bestFor: ["mathematically-inclined programmers", "analytical thinking"]
    }
  ],
  
  // Default for any unmatched skill
  "default": [
    { 
      title: "Coursera", 
      url: "https://www.coursera.org/", 
      type: "platform",
      description: "Find courses on virtually any technical topic",
      bestFor: ["structured learning", "certification"]
    },
    { 
      title: "Udemy", 
      url: "https://www.udemy.com/", 
      type: "platform",
      description: "Marketplace for online learning on various topics",
      bestFor: ["project-based learning", "practical skills"]
    },
    { 
      title: "edX", 
      url: "https://www.edx.org/", 
      type: "platform",
      description: "Access courses from top educational institutions",
      bestFor: ["academic approach", "university-style courses"]
    }
  ]
};

// Helper function to get resources for a skill with personalization
export const getResourcesForSkill = (skillName, userData, skillDetails) => {
  // Get baseline resources
  let resources = [];
  
  // Find resources that match the skill
  if (learningResources[skillName]) {
    resources = JSON.parse(JSON.stringify(learningResources[skillName]));
  } else {
    // Try partial match
    for (const skill in learningResources) {
      if (skill !== 'default' && 
          (skillName.toLowerCase().includes(skill.toLowerCase()) || 
           skill.toLowerCase().includes(skillName.toLowerCase()))) {
        resources = JSON.parse(JSON.stringify(learningResources[skill]));
        break;
      }
    }
  }
  
  // If no resources found, use default
  if (resources.length === 0) {
    resources = JSON.parse(JSON.stringify(learningResources.default));
  }
  
  // Now personalize the resources based on user data
  return personalizeResources(resources, userData, skillDetails);
};

// Function to personalize resources based on user data
const personalizeResources = (resources, userData, skillDetails) => {
  // Variables to help with personalization
  const experienceLevel = userData.experienceLevel || 'Beginner';
  const currentSkillLevel = skillDetails.currentLevel || 1;
  const targetSkillLevel = skillDetails.requiredLevel || 3;
  const skillGap = skillDetails.gap || 2;
  const careerPathsInterest = userData.careerPathsInterest || [];
  
  // Filter resources by difficulty based on current skill level
  const filteredResources = resources.filter(resource => {
    // For beginners, focus on beginner content
    if (currentSkillLevel <= 1 && resource.difficulty === 'advanced') {
      return false;
    }
    
    // For advanced users, skip very basic content unless they specifically need it
    if (currentSkillLevel >= 4 && resource.difficulty === 'beginner' && skillGap <= 1) {
      return false;
    }
    
    return true;
  });
  
  // Sort resources based on personalization factors
  filteredResources.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;
    
    // Prefer resources that match the user's current level or slightly above
    if (a.difficulty === 'beginner' && currentSkillLevel <= 2) scoreA += 3;
    if (b.difficulty === 'beginner' && currentSkillLevel <= 2) scoreB += 3;
    
    if (a.difficulty === 'intermediate' && currentSkillLevel >= 2 && currentSkillLevel <= 3) scoreA += 4;
    if (b.difficulty === 'intermediate' && currentSkillLevel >= 2 && currentSkillLevel <= 3) scoreB += 4;
    
    if (a.difficulty === 'advanced' && currentSkillLevel >= 3) scoreA += 5;
    if (b.difficulty === 'advanced' && currentSkillLevel >= 3) scoreB += 5;
    
    // Boost resources specifically related to user's chosen career paths
    careerPathsInterest.forEach(careerPath => {
      if (a.careerPaths && a.careerPaths.includes(careerPath)) scoreA += 2;
      if (b.careerPaths && b.careerPaths.includes(careerPath)) scoreB += 2;
    });
    
    // Prioritize resources that help close specific gaps
    if (skillDetails.gapAreas) {
      if (skillDetails.gapAreas.includes('practical') && a.focusAreas && a.focusAreas.includes('practical')) scoreA += 3;
      if (skillDetails.gapAreas.includes('practical') && b.focusAreas && b.focusAreas.includes('practical')) scoreB += 3;
      
      if (skillDetails.gapAreas.includes('foundations') && a.focusAreas && a.focusAreas.includes('foundations')) scoreA += 3;
      if (skillDetails.gapAreas.includes('foundations') && b.focusAreas && b.focusAreas.includes('foundations')) scoreB += 3;
    }
    
    return scoreB - scoreA; // Higher score first
  });
  
  // Add personalization message to each resource
  filteredResources.forEach(resource => {
    if (resource.bestFor && resource.bestFor.some(tag => 
        tag.includes('beginner') && currentSkillLevel <= 2 ||
        tag.includes('intermediate') && currentSkillLevel >= 2 && currentSkillLevel <= 3 ||
        tag.includes('advanced') && currentSkillLevel >= 3
    )) {
      resource.personalMatch = true;
    }
  });
  
  // Limit to top 5 most relevant resources
  return filteredResources.slice(0, 5);
};
