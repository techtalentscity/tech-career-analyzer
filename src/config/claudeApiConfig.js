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
    "I'm filling out a tech career assessment form. Based on a typical technology enthusiast profile, " +
    "suggest realistic answers for a form with these fields: what I like doing best in tech, preferred work method, " +
    "comfort with learning new tools, what excites me about tech, tech areas I'm curious about, tech activities I've enjoyed, " +
    "personal strength for tech success, motivation for tech career, experience level, interest in emerging areas like AI, " +
    "certifications I might have, tools I might have used, time commitment, desired impact, guidance needed, and 12-month goal.",
  
  careerAnalysis: (formData) => `
    I've completed a tech career assessment. Based on my answers, suggest 3-5 potential career paths that would be a good fit, 
    with explanations for each. For each career path, provide specific skills I should develop and resources to help me get started.
    
    Format your response in clear sections:
    1. Career Path Recommendations (with match percentage and timeline estimates)
    2. Skills Development Plan (prioritized list)
    3. Learning Resources
    4. Strengths and Areas for Improvement
    
    Here are my answers:
    
    What I like doing best: ${formData.bestActivity}
    Work preference: ${formData.workPreference}
    Comfort with learning: ${formData.learningComfort}
    What excites me about tech: ${formData.techExcitement}
    Tech interests: ${formData.techInterests}
    Tech activities enjoyed: ${formData.techActivities}
    Personal strength: ${formData.personalStrength}
    Motivation: ${formData.techMotivation}
    Experience level: ${formData.experienceLevel}
    Interest in AI/Blockchain/Cybersecurity: ${formData.emergingTechInterest}
    Tools used: ${formData.toolsUsed.join(', ')}
    Time commitment: ${formData.timeCommitment}
    Desired impact: ${formData.impactType}
    Guidance needed: ${formData.guidanceNeeded}
    12-month goal: ${formData.futureGoal}
  `
};

export { CLAUDE_API_CONFIG, CLAUDE_PROMPTS };
