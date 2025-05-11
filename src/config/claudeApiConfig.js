// src/config/claudeApiConfig.js

// Claude API configuration
const CLAUDE_API_CONFIG = {
  models: {
    default: 'claude-3-5-sonnet-20240620',
    faster: 'claude-3-haiku-20240307'
  },
  maxTokens: {
    formSuggestions: 1024,
    careerAnalysis: 4096
  }
};

// Prompts for different Claude API requests
const CLAUDE_PROMPTS = {
  formSuggestions: 
    "I'm filling out a tech career assessment form for someone transitioning into tech. " +
    "Based on a typical career changer profile, suggest realistic answers for a form with these fields: " +
    "Education Level, Field of Study, Years of Experience, Current/Previous Role, " +  // Updated to include Education Level and Field of Study
    "Job Responsibilities, Notable Projects or Achievements, Software or Technologies Used, Internships or Relevant Experience, " +
    "Publications or Research, " +  // Added Publications field
    "What they like doing best, Biggest motivation for tech career, " +
    "What they're passionate about, Primary reason for transition, Transferable skills from previous career, " +
    "Previous tech exposure, Anticipated challenges in transition, Tech areas they're curious about, " +
    "Comfort with learning new tools, Preferred work method, Current tech experience level, " +
    "Tools and platforms used, Certifications and courses, Tech career paths interest, " +
    "Industry preference, Whether to leverage domain expertise, Target salary range, " +
    "Weekly time commitment, Transition timeline, Whether continuing current role, " +
    "Guidance needed, and 12-month goal.",
  
  careerAnalysis: (formData) => `
    I'm a career transition expert helping someone move into technology from a different field.
    Please analyze this comprehensive career assessment for someone looking to transition into tech.
    Focus especially on their job experience, educational background, transferable skills, interests, tech preferences, and background.
    
    ASSESSMENT DATA (IMPORTANT FIELDS MARKED):
    
    BACKGROUND INFORMATION:
    - Education Level (IMPORTANT): ${formData.educationLevel || 'Not specified'}
    - Field of Study (IMPORTANT): ${formData.studyField || 'Not specified'}
    - Current/Previous Role: ${formData.currentRole || 'Not specified'}
    - Years of Experience: ${formData.yearsExperience || 'Not specified'}
    
    JOB EXPERIENCE DETAILS (IMPORTANT):
    - Key Job Responsibilities: ${formData.jobResponsibilities || 'Not specified'}
    - Notable Projects or Achievements: ${formData.jobProjects || 'Not specified'}
    - Software or Technologies Used: ${formData.jobTechnologies || 'Not specified'}
    - Internships or Relevant Experience: ${formData.internships || 'Not specified'}
    - Publications or Research (IMPORTANT): ${formData.publications || 'Not specified'}
    
    PERSONAL STRENGTHS & MOTIVATION (IMPORTANT):
    - What they like doing best: ${formData.bestActivity || 'Not specified'}
    - Biggest motivation for tech career: ${formData.techMotivation || 'Not specified'}
    - What they're passionate about: ${formData.techPassion || 'Not specified'}
    - What excites them about tech: ${formData.techExcitement || 'Not specified'}
    
    TECH PREFERENCES & INTERESTS (IMPORTANT):
    - Tech areas they're interested in: ${formData.techInterests || 'Not specified'}
    - Tech activities enjoyed: ${formData.techActivities || 'Not specified'}
    - Comfort with learning new tools: ${formData.learningComfort || 'Not specified'}
    - Work preference: ${formData.workPreference || 'Not specified'}
    - Current tech experience level: ${formData.experienceLevel || 'Not specified'}
    - Tools & platforms used: ${formData.toolsUsed ? formData.toolsUsed.join(', ') : 'None'}
    - Interest in emerging tech: ${formData.emergingTechInterest || 'Not specified'}
    - Certifications/courses: ${formData.certifications || 'Not specified'}
    - Certification details: ${formData.certificationsDetail || 'Not specified'}
    
    TRANSITION INFORMATION:
    - Primary reason for transition: ${formData.transitionReason || 'Not specified'}
    - Transferable skills: ${formData.transferableSkills || 'Not specified'}
    - Previous tech exposure: ${formData.previousTechExposure || 'Not specified'}
    - Anticipated challenges: ${formData.anticipatedChallenges || 'Not specified'}
    
    CAREER ASPIRATIONS:
    - Tech career paths interest: ${formData.careerPathsInterest ? formData.careerPathsInterest.join(', ') : 'Not specified'}
    - Industry preferences: ${formData.industryPreference ? formData.industryPreference.join(', ') : 'Not specified'}
    - Leverage domain expertise: ${formData.leverageDomainExpertise || 'Not specified'}
    - Target salary range: ${formData.targetSalary || 'Not specified'}
    - Desired impact: ${formData.impactType || 'Not specified'}
    
    COMMITMENT & GOALS:
    - Weekly time commitment: ${formData.timeCommitment || 'Not specified'}
    - Transition timeline: ${formData.transitionTimeline || 'Not specified'}
    - Continue current role: ${formData.continueCurrent || 'Not specified'}
    - Guidance needed: ${formData.guidanceNeeded || 'Not specified'}
    - 12-month goal: ${formData.futureGoal || 'Not specified'}
    
    Based on this comprehensive assessment, provide a detailed analysis with the following sections:
    
    1. CAREER PATH RECOMMENDATIONS:
       Suggest 2-3 specific tech roles that would be ideal fits based on their educational background, prior experience, interests, 
       and strengths. For each role, include a match percentage, explanation of why it's a good fit,
       and realistic timeline for transition. Consider how their field of study can be leveraged in tech roles.
    
    2. STRENGTHS ANALYSIS:
       Identify their key strengths and explain how these will transfer to their tech career.
       Focus on both technical aptitudes and soft skills from their education and previous experience.
       For candidates with publications or research, highlight how these academic skills transfer to tech.
    
    3. SKILLS GAP ANALYSIS:
       Create a prioritized list of skills they need to develop for their recommended paths.
       Be specific about which skills are most critical to focus on first, taking into account their educational background.
    
    4. LEARNING ROADMAP:
       Design a 6-month learning plan with specific resources, milestones and approximate timelines.
       Include specific courses, practice projects, and other learning resources.
       For advanced degree holders, suggest more accelerated learning pathways where appropriate.
    
    5. TRANSITION STRATEGY:
       Provide practical advice on managing their career transition based on their timeline,
       commitments, education level, and whether they're continuing in their current role.
       Include strategies for leveraging their academic credentials and publications if applicable.
    
    Make your analysis practical, personalized, and actionable. Focus on leveraging their specific educational background,
    field of study, strengths, and interests to create a realistic path into tech.
  `
};

export { CLAUDE_API_CONFIG, CLAUDE_PROMPTS };
