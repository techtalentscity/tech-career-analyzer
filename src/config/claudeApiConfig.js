// src/config/claudeApiConfig.js - Enhanced with Video Insights

import { videoAnalysisData } from '../data/videoInsights.js';

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

// Enhanced prompts with video insights
const CLAUDE_PROMPTS = {
  formSuggestions: 
    "I'm filling out a tech career assessment form for someone transitioning into tech. " +
    "Based on analysis of 16 comprehensive tech career guidance videos and typical career changer profiles, " +
    "suggest realistic answers for a form with these fields: " +
    "Education Level, Field of Study, Years of Experience, Current/Previous Role, " +
    "Job Responsibilities, Notable Projects or Achievements, Software or Technologies Used, Internships or Relevant Experience, " +
    "Publications or Research, " +
    "What they like doing best, Biggest motivation for tech career, " +
    "What they're passionate about, Primary reason for transition, Transferable skills from previous career, " +
    "Previous tech exposure, Anticipated challenges in transition, Tech areas they're curious about, " +
    "Comfort with learning new tools, Preferred work method, Current tech experience level, " +
    "Tools and platforms used, Certifications and courses, Tech career paths interest, " +
    "Industry preference, Whether to leverage domain expertise, Target salary range, " +
    "Weekly time commitment, Transition timeline, Whether continuing current role, " +
    "Guidance needed, and 12-month goal. " +
    
    // Include trending skills from video analysis
    "IMPORTANT: Based on our analysis of 16 tech career videos, these skills are currently trending: " +
    "AI/ML (mentioned 12 times), Python (8 times), Data Science (9 times), Cloud Computing (8 times), " +
    "DevOps (7 times), JavaScript (6 times), Cybersecurity (5 times). " +
    "Growth industries include FinTech, Healthcare Technology, and Renewable Energy. " +
    "Common career advice patterns include: continuous learning (mentioned in all 16 videos), " +
    "networking and mentorship (14 videos), skills over education (12 videos), and personal branding (8 videos). " +
    "Incorporate these insights into realistic suggestions.",
  
  careerAnalysis: (formData) => `
    I'm a career transition expert helping someone move into technology from a different field.
    Please analyze this comprehensive career assessment for someone looking to transition into tech.
    Focus especially on their job experience, educational background, transferable skills, interests, tech preferences, and background.
    
    IMPORTANT: Use insights from our analysis of 16 comprehensive tech career guidance videos to enhance your recommendations.
    
    VIDEO ANALYSIS INSIGHTS TO INCORPORATE:
    - Top trending skills: AI/ML, Python, Data Science, Cloud Computing, DevOps, JavaScript, Cybersecurity
    - High-growth industries: FinTech, Healthcare Technology, Renewable Energy, E-commerce
    - Key career advice patterns: Continuous learning (16/16 videos), Networking (14/16), Skills over education (12/16), Personal branding (8/16)
    - Successful transition timeline: 6-18 months with consistent effort (mentioned in 12/16 videos)
    - Project-based learning is more effective than theory-only study (14/16 videos)
    - Networking and referrals more important than cold applications (13/16 videos)
    
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
    - Biggest motivation for tech career: ${formData.techMotivation || 'Not specified'}
    - What they're passionate about: ${formData.techPassion || 'Not specified'}
    
    TECH PREFERENCES & INTERESTS (IMPORTANT):
    - Tech areas they're interested in: ${formData.techInterests || 'Not specified'}
    - Comfort with learning new tools: ${formData.learningComfort || 'Not specified'}
    - Work preference: ${formData.workPreference || 'Not specified'}
    - Current tech experience level: ${formData.experienceLevel || 'Not specified'}
    - Tools & platforms used: ${formData.toolsUsed ? formData.toolsUsed.join(', ') : 'None'}
    - Certifications/courses: ${formData.certifications || 'Not specified'}
    - Certification details: ${formData.certificationsDetail || 'Not specified'}
    
    TRANSITION INFORMATION:
    - Primary reason for transition: ${formData.transitionReason || 'Not specified'}
    - Transferable skills: ${formData.transferableSkills || 'Not specified'}
    - Anticipated challenges: ${formData.anticipatedChallenges || 'Not specified'}
    
    CAREER ASPIRATIONS:
    - Tech career paths interest: ${formData.careerPathsInterest ? formData.careerPathsInterest.join(', ') : 'Not specified'}
    - Industry preferences: ${formData.industryPreference ? formData.industryPreference.join(', ') : 'Not specified'}
    - Leverage domain expertise: ${formData.leverageDomainExpertise || 'Not specified'}
    - Target salary range: ${formData.targetSalary || 'Not specified'}
    
    COMMITMENT & GOALS:
    - Weekly time commitment: ${formData.timeCommitment || 'Not specified'}
    - Transition timeline: ${formData.transitionTimeline || 'Not specified'}
    - Continue current role: ${formData.continueCurrent || 'Not specified'}
    - Guidance needed: ${formData.guidanceNeeded || 'Not specified'}
    - 12-month goal: ${formData.futureGoal || 'Not specified'}
    
    Based on this comprehensive assessment and the video analysis insights, provide a detailed analysis with the following sections.
    
    IMPORTANT: Format your response EXACTLY as shown below, maintaining the exact structure and numbering:
    
    1. CAREER PATH RECOMMENDATIONS:
       a) [Role Name] ([X]% match)
       - Why: [Detailed explanation incorporating video insights about trending skills and market demand]
       - Timeline: [Specific timeline based on video analysis showing 6-18 months for most successful transitions]
       
       b) [Role Name] ([X]% match)
       - Why: [Detailed explanation incorporating video insights]
       - Timeline: [Specific timeline]
    
    2. STRENGTHS ANALYSIS:
       - [Strength Category]: [Detailed explanation incorporating how this aligns with video insights about what employers value]
       - [Strength Category]: [Detailed explanation]
       (Use bullet points with "-" for this section)
    
    3. SKILLS GAP ANALYSIS:
       FORMAT EACH SKILL AS A NUMBERED ITEM WITH TITLE AND DESCRIPTION ON SEPARATE LINES:
       PRIORITIZE SKILLS FROM VIDEO ANALYSIS: AI/ML, Python, Data Science, Cloud Computing, DevOps, JavaScript, Cybersecurity
       
       1. [Trending Skill Name from Video Analysis]: [Brief description of the gap and what needs to be learned]
       
       2. [Skill Name]: [Brief description of the gap and what needs to be learned]
       
       3. [Skill Name]: [Brief description of the gap and what needs to be learned]
       
       (Continue numbering for all skills. Focus on skills identified as trending in video analysis)
    
    4. LEARNING ROADMAP:
       INCORPORATE VIDEO INSIGHTS: Project-based learning is more effective than theory-only study
       
       Month 1-2:
       - [Specific tasks and resources, emphasizing project-based learning from video insights]
       - [More tasks focused on trending skills]
       
       Month 3-4:
       - [Specific tasks and resources incorporating continuous learning principles from videos]
       - [More tasks]
       
       Month 5-6:
       - [Specific tasks and resources focusing on networking and portfolio building from video insights]
       - [More tasks]
    
    5. TRANSITION STRATEGY:
       INCORPORATE VIDEO INSIGHTS: Networking more important than cold applications, skills over education
       - [Strategy point incorporating networking emphasis from video analysis]
       - [Strategy point about practical skills vs formal education]
       - [Strategy point about continuous learning culture]
    
    6. MARKET TRENDS ANALYSIS:
       INCORPORATE SPECIFIC VIDEO ANALYSIS DATA:
       Include current (as of 2025) job market data for the recommended career paths with insights from our 16-video analysis:
       
       1. JOB MARKET OUTLOOK: 
          Reference video insights about high-growth industries (FinTech, Healthcare Tech, Renewable Energy).
          Provide detailed job growth projections for these sectors and how they align with the user's interests.
       
       2. SALARY TRENDS: 
          Use video insights about salary expectations for different career paths.
          Detail current salary ranges incorporating data about AI/ML, Python, and Cloud Computing roles.
       
       3. REGIONAL OPPORTUNITIES: 
          Incorporate video insights about remote work opportunities and emerging tech hubs.
       
       4. EMERGING TECHNOLOGIES: 
          Highlight the top trending skills from video analysis: AI/ML, Cloud Computing, Data Science.
       
       5. INDUSTRY SECTOR ANALYSIS: 
          Focus on the high-growth sectors identified in video analysis: FinTech, Healthcare Technology, Renewable Energy.
          
    7. NETWORKING STRATEGY:
       INCORPORATE VIDEO INSIGHTS: Networking mentioned in 14/16 videos as crucial for success
       - [Specific networking tips based on video analysis findings]
       - [Reference tech communities mentioned in videos: DSN, I4G, Omdena]
       - [Online platforms for tech networking based on video recommendations]
       - [How to leverage existing network from previous career - video insight]
       - [Informational interview strategies from video analysis]
    
    8. PERSONAL BRANDING:
       INCORPORATE VIDEO INSIGHTS: Personal branding mentioned in 8/16 videos
       - [Resume transformation recommendations based on video insights about skills over education]
       - [LinkedIn profile optimization incorporating video advice]
       - [Portfolio development strategy emphasizing project-based approach from videos]
       - [How to highlight transferable skills based on video analysis]
       - [GitHub and Stack Overflow presence as mentioned in videos]
    
    9. INTERVIEW PREPARATION:
       INCORPORATE VIDEO INSIGHTS: Technical skills demonstration more important than credentials
       - [Technical interview strategies based on video analysis of what employers value]
       - [Behavioral question preparation incorporating video insights about passion and motivation]
       - [How to discuss career transition effectively using video guidance]
       - [Practice project recommendations based on project-focused approach from videos]
       - [How to address skills gaps during interviews using video insights]
    
    10. PORTFOLIO BUILDING GUIDANCE:
        NEW SECTION BASED ON VIDEO ANALYSIS:
        - [Project Selection]: Choose projects that demonstrate trending skills (AI/ML, Python, Data Science)
        - [Portfolio Content]: Include 2-3 substantial projects showing different aspects of chosen career path
        - [Portfolio Presentation]: Use GitHub and create a professional website as mentioned in video analysis
        - [Feedback and Iteration]: Get feedback from tech communities (DSN, I4G, Omdena) mentioned in videos
    
    11. JOB SEARCH STRATEGIES:
        NEW SECTION BASED ON VIDEO ANALYSIS:
        - [Job Search Platforms]: Focus on platforms mentioned in video analysis
        - [Networking for Jobs]: Leverage the networking strategies from 14/16 videos
        - [Targeted Applications]: Apply video insights about referrals being more effective than cold applications
        - [Company Research]: Research companies in high-growth sectors (FinTech, Healthcare Tech, Renewable Energy)
    
    12. CAREER GROWTH RESOURCES:
        NEW SECTION BASED ON VIDEO ANALYSIS:
        - [Industry Publications and Influencers]: Follow thought leaders mentioned across the 16 videos
        - [Advanced Learning Platforms]: Use platforms recommended in video analysis for continuous learning
        - [Community and Contributions]: Engage with communities like DSN, I4G, and Omdena mentioned in videos
        - [Setting Expert-Level Goals]: Plan progression based on video insights about career advancement
    
    Make your analysis practical, personalized, and actionable. Focus on leveraging their specific educational background,
    field of study, strengths, and interests to create a realistic path into tech. Incorporate the video analysis insights
    throughout to provide evidence-based recommendations. The market trends analysis should be particularly relevant to 
    their indicated interests (${formData.careerPathsInterest ? formData.careerPathsInterest.join(', ') : 'various tech roles'})
    and include current, accurate market data for 2025 enhanced with our video analysis findings.
  `
};

// New function to get contextual career advice based on user profile and video insights
const getContextualAdvice = (userProfile) => {
  const advice = [];
  
  // Get relevant advice based on user's career interests
  if (userProfile.careerPathsInterest) {
    userProfile.careerPathsInterest.forEach(interest => {
      const relevantInsights = videoAnalysisData.career_path_insights.find(
        path => path.path === interest
      );
      
      if (relevantInsights) {
        advice.push({
          category: interest,
          timeline: relevantInsights.timeline,
          skills: relevantInsights.skills,
          salary_range: relevantInsights.salary_range,
          demand: relevantInsights.demand
        });
      }
    });
  }
  
  // Add level-appropriate actionable steps
  const experienceLevel = userProfile.experienceLevel || 'Entry-Level';
  const levelMapping = {
    'Complete beginner': 'Entry-Level',
    'Some exposure': 'Entry-Level',
    'Beginner': 'Entry-Level',
    'Intermediate': 'Mid-Career',
    'Advanced': 'Senior-Level'
  };
  
  const mappedLevel = levelMapping[experienceLevel] || 'Entry-Level';
  const actionableSteps = videoAnalysisData.actionable_steps_by_level[mappedLevel] || [];
  
  advice.push({
    category: 'Actionable Steps',
    level: mappedLevel,
    steps: actionableSteps.slice(0, 10) // Top 10 steps for the level
  });
  
  return advice;
};

// Enhanced video insights integration
const VIDEO_INSIGHTS = {
  trending_skills: videoAnalysisData.trending_skills,
  career_advice_patterns: videoAnalysisData.career_advice_patterns,
  industry_opportunities: videoAnalysisData.industry_opportunities,
  actionable_steps_by_level: videoAnalysisData.actionable_steps_by_level,
  career_path_insights: videoAnalysisData.career_path_insights,
  transition_insights: videoAnalysisData.transition_insights,
  market_trends: videoAnalysisData.market_trends
};

export { CLAUDE_API_CONFIG, CLAUDE_PROMPTS, VIDEO_INSIGHTS, getContextualAdvice };
