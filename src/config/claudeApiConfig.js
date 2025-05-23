// src/config/claudeApiConfig.js - UPDATED TO MATCH TECHNICAL SPECIFICATION v1.1

// Claude API configuration for Technical Specification v1.1
const CLAUDE_API_CONFIG = {
  models: {
    default: 'claude-3-5-sonnet-20240620',
    faster: 'claude-3-haiku-20240307'
  },
  maxTokens: {
    formSuggestions: 1024,
    careerAnalysis: 4096
  },
  technicalSpecVersion: '1.1',
  recommendationEngine: 'Multi-Tier with Fallback Logic'
};

// Technical Specification v1.1 Prompts for Claude API requests
const CLAUDE_PROMPTS = {
  formSuggestions: 
    "I'm filling out a tech career assessment form for someone transitioning into tech using our Technical Specification v1.1 system. " +
    "The system uses a Multi-Tier Recommendation Engine with 4 constant variables and 3 specialized algorithms. " +
    "Based on a typical career changer profile, suggest realistic answers for a form that captures: " +
    "CONSTANT VARIABLES: Education Level, Field of Study, Years of Experience, Interests, Transferable Skills. " +
    "TECH-INTEREST ALGORITHM: Tech Interests, Current Role, Job Technologies. " +
    "RESEARCH-DEVELOPMENT ALGORITHM: Publications, Tools Used, Time Commitment. " +
    "LIFESTYLE-MARKET ALGORITHM: Work Preference, Target Salary. " +
    "ADDITIONAL CONTEXT: Job Responsibilities, Notable Projects, Certifications, Career Paths Interest, Timeline.",
  
  careerAnalysis: (formData) => `
    I'm a career transition expert using the Technical Specification v1.1 Multi-Tier Recommendation Engine 
    with fallback logic and dynamic weighting to analyze career transitions into technology.

    TECHNICAL SPECIFICATION v1.1 ANALYSIS FRAMEWORK:
    
    You must analyze this assessment using THREE PARALLEL ALGORITHMS and provide recommendations 
    based on the Multi-Tier Recommendation Engine approach:

    ====================================================================
    ALGORITHM 1: 🎯 TECH-INTEREST BASED RECOMMENDATION
    ====================================================================
    Uses 4 Constant Variables + 3 Specific Criteria:
    
    CONSTANT VARIABLES (Universal Baseline):
    - Years Experience: ${formData.yearsExperience || 'Not specified'}
    - Study Field: ${formData.studyField || 'Not specified'}  
    - Interests: ${Array.isArray(formData.interests) ? formData.interests.join(', ') : formData.interests || 'Not specified'}
    - Transferable Skills: ${formData.transferableSkills || 'Not specified'}
    
    TECH-INTEREST SPECIFIC CRITERIA:
    - Tech Interests: ${formData.techInterests || 'Not specified'}
    - Current Role: ${formData.currentRole || 'Not specified'}
    - Job Technologies: ${formData.jobTechnologies || 'Not specified'}

    ====================================================================
    ALGORITHM 2: 📚 RESEARCH/DEVELOPMENT BASED RECOMMENDATION  
    ====================================================================
    Uses 4 Constant Variables + 3 Specific Criteria:
    
    CONSTANT VARIABLES (Same as above):
    - Years Experience: ${formData.yearsExperience || 'Not specified'}
    - Study Field: ${formData.studyField || 'Not specified'}
    - Interests: ${Array.isArray(formData.interests) ? formData.interests.join(', ') : formData.interests || 'Not specified'}
    - Transferable Skills: ${formData.transferableSkills || 'Not specified'}
    
    RESEARCH/DEVELOPMENT SPECIFIC CRITERIA:
    - Publications: ${formData.publications || 'Not specified'}
    - Tools Used: ${formData.toolsUsed ? formData.toolsUsed.join(', ') : 'Not specified'}
    - Time Commitment: ${formData.timeCommitment || 'Not specified'}

    ====================================================================
    ALGORITHM 3: ⚖️ LIFESTYLE/MARKET BASED RECOMMENDATION
    ====================================================================
    Uses 4 Constant Variables + 3 Specific Criteria:
    
    CONSTANT VARIABLES (Same as above):
    - Years Experience: ${formData.yearsExperience || 'Not specified'}
    - Study Field: ${formData.studyField || 'Not specified'}
    - Interests: ${Array.isArray(formData.interests) ? formData.interests.join(', ') : formData.interests || 'Not specified'}
    - Transferable Skills: ${formData.transferableSkills || 'Not specified'}
    
    LIFESTYLE/MARKET SPECIFIC CRITERIA:
    - Work Preference: ${formData.workPreference || 'Not specified'}
    - Education Level: ${formData.educationLevel || 'Not specified'}
    - Target Salary: ${formData.targetSalary || 'Not specified'}

    ====================================================================
    ADDITIONAL CONTEXT DATA:
    ====================================================================
    - Job Responsibilities: ${formData.jobResponsibilities || 'Not specified'}
    - Notable Projects: ${formData.jobProjects || 'Not specified'}
    - Internships: ${formData.internships || 'Not specified'}
    - Tech Motivation: ${formData.techMotivation || 'Not specified'}
    - Tech Passion: ${formData.techPassion || 'Not specified'}
    - Learning Comfort: ${formData.learningComfort || 'Not specified'}
    - Experience Level: ${formData.experienceLevel || 'Not specified'}
    - Certifications: ${formData.certifications || 'Not specified'}
    - Transition Reason: ${formData.transitionReason || 'Not specified'}
    - Anticipated Challenges: ${formData.anticipatedChallenges || 'Not specified'}
    - Career Paths Interest: ${formData.careerPathsInterest ? formData.careerPathsInterest.join(', ') : 'Not specified'}
    - Industry Preference: ${formData.industryPreference ? formData.industryPreference.join(', ') : 'Not specified'}
    - Leverage Domain Expertise: ${formData.leverageDomainExpertise || 'Not specified'}
    - Transition Timeline: ${formData.transitionTimeline || 'Not specified'}
    - Continue Current Role: ${formData.continueCurrent || 'Not specified'}
    - Guidance Needed: ${formData.guidanceNeeded || 'Not specified'}
    - 12-Month Goal: ${formData.futureGoal || 'Not specified'}

    ====================================================================
    TECHNICAL SPECIFICATION v1.1 ANALYSIS REQUIREMENTS:
    ====================================================================

    IMPORTANT: You MUST analyze this using the Multi-Tier Recommendation Engine approach and provide 
    your response in the EXACT format below. Apply dynamic weighting (60% constants, 40% specifics) 
    and note when fallback logic is needed due to missing data.

    FORMAT YOUR RESPONSE EXACTLY AS SHOWN:

    1. TECHNICAL SPECIFICATION v1.1 - CAREER PATH RECOMMENDATIONS:
    
       🎯 TECH-INTEREST BASED RECOMMENDATION:
       Role: [Specific role title]
       Match Score: [X]% confidence
       Reasoning: Based on [list specific criteria used] with [dynamic weighting applied/fallback logic applied]
       Why: [Detailed explanation focusing on tech interests, current role, and job technologies]
       Timeline: [Specific timeline]
       Required Skills: [List 3-5 skills]
       Suggested Actions: [List 3-4 specific actions]
       Salary Range: [Specific range]
       Market Demand: [High/Medium/Low]
       
       📚 RESEARCH/DEVELOPMENT BASED RECOMMENDATION:
       Role: [Specific role title]
       Match Score: [X]% confidence  
       Reasoning: Based on [list specific criteria used] with [dynamic weighting applied/fallback logic applied]
       Why: [Detailed explanation focusing on publications, tools used, and time commitment]
       Timeline: [Specific timeline]
       Required Skills: [List 3-5 skills]
       Suggested Actions: [List 3-4 specific actions]
       Salary Range: [Specific range]
       Market Demand: [High/Medium/Low]
       
       ⚖️ LIFESTYLE/MARKET BASED RECOMMENDATION:
       Role: [Specific role title]
       Match Score: [X]% confidence
       Reasoning: Based on [list specific criteria used] with [dynamic weighting applied/fallback logic applied]
       Why: [Detailed explanation focusing on work preference, education level, and target salary]
       Timeline: [Specific timeline]
       Required Skills: [List 3-5 skills]
       Suggested Actions: [List 3-4 specific actions]
       Salary Range: [Specific range]
       Market Demand: [High/Medium/Low]

    2. CONSTANT VARIABLES ANALYSIS:
       - Years Experience Impact: [Analysis of how their experience level affects all three recommendations]
       - Study Field Relevance: [Analysis of how their academic background applies across algorithms]
       - Interest Alignment: [Analysis of how their interests support the recommendations]
       - Transferable Skills Value: [Analysis of cross-domain skill applicability]

    3. ALGORITHM PERFORMANCE METRICS:
       🎯 Tech-Interest Algorithm:
       - Criteria Completeness: [X/7] ([count constant variables + specific criteria present])
       - Data Quality Score: [X]%
       - Fallback Applied: [Yes/No - if less than 2 constant variables or missing key criteria]
       
       📚 Research/Development Algorithm:
       - Criteria Completeness: [X/7] ([count constant variables + specific criteria present])
       - Data Quality Score: [X]%
       - Fallback Applied: [Yes/No - if less than 2 constant variables or missing key criteria]
       
       ⚖️ Lifestyle/Market Algorithm:
       - Criteria Completeness: [X/7] ([count constant variables + specific criteria present])
       - Data Quality Score: [X]%
       - Fallback Applied: [Yes/No - if less than 2 constant variables or missing key criteria]

    4. SKILLS GAP ANALYSIS (ALGORITHM-OPTIMIZED):
       FORMAT EACH SKILL AS NUMBERED ITEM WITH ALGORITHM CONTEXT:
       
       1. [Skill Name] (🎯 Tech-Interest Priority): [Description of gap and learning approach]
       
       2. [Skill Name] (📚 Research/Development Priority): [Description of gap and learning approach]
       
       3. [Skill Name] (⚖️ Lifestyle/Market Priority): [Description of gap and learning approach]
       
       4. [Skill Name] (Universal Priority): [Description of gap relevant to all algorithms]

    5. MULTI-TIER LEARNING ROADMAP:
       Phase 1 (Month 1-2) - Foundation Building:
       - Constant Variables Strengthening: [Tasks to improve core profile elements]
       - Algorithm-Specific Prep: [Tasks for highest-scoring algorithm]
       
       Phase 2 (Month 3-4) - Skill Development:
       - Tech-Interest Track: [If this algorithm scored highest]
       - Research/Development Track: [If this algorithm scored highest]  
       - Lifestyle/Market Track: [If this algorithm scored highest]
       
       Phase 3 (Month 5-6) - Specialization & Application:
       - Advanced Skills: [Based on top recommendation algorithm]
       - Portfolio Development: [Algorithm-specific projects]
       - Market Positioning: [Algorithm-optimized career positioning]

    6. DYNAMIC WEIGHTING ANALYSIS:
       - Constants Weight Applied: [X]% (based on data completeness)
       - Specifics Weight Applied: [X]% (based on data completeness)
       - Fallback Logic Triggered: [Yes/No and explanation]
       - Missing Critical Data: [List missing constant variables or specific criteria]
       - Recommendation Confidence: [Overall confidence level based on data quality]

    7. TECHNICAL SPECIFICATION MARKET TRENDS ANALYSIS:
       Include algorithm-specific market analysis for 2025:
       
       🎯 TECH-INTEREST MARKET TRENDS:
       - Job growth for tech-interest aligned roles
       - Salary trends for roles matching tech interests and current role transitions
       - Technology demand analysis based on job technologies mentioned
       
       📚 RESEARCH/DEVELOPMENT MARKET TRENDS:
       - Academic and industry research role opportunities
       - Publication-based career path market analysis
       - Research tool and methodology market demand
       
       ⚖️ LIFESTYLE/MARKET TRENDS:
       - Remote/hybrid work market trends matching work preferences
       - Salary market analysis for target salary ranges
       - Education level vs market opportunity analysis

    8. ALGORITHM-OPTIMIZED NETWORKING STRATEGY:
       - Tech-Interest Networking: [If top algorithm - focus on tech communities matching interests]
       - Research/Development Networking: [If top algorithm - focus on academic and research networks]
       - Lifestyle/Market Networking: [If top algorithm - focus on lifestyle-compatible opportunities]
       - Constant Variables Leverage: [How to use experience, education, interests, skills in networking]

    9. MULTI-TIER PERSONAL BRANDING:
       - Algorithm-Specific Positioning: [Brand based on highest-scoring recommendation]
       - Constant Variables Highlighting: [How to showcase universal strengths]
       - Technical Specification Approach: [How to present comprehensive skill assessment]

    10. TECHNICAL SPECIFICATION INTERVIEW PREPARATION:
        - Algorithm-Specific Interview Prep: [Prep focused on top recommendation type]
        - Constant Variables Storytelling: [How to discuss experience, education, interests, skills]
        - Fallback Strategy Discussion: [How to address gaps in assessment if fallback was applied]

    CRITICAL INSTRUCTIONS:
    - Apply the Multi-Tier Recommendation Engine with dynamic weighting (default 60% constants, 40% specifics)
    - Adjust weights based on missing constant variables (if 1 missing: 50/50, if 2 missing: 40/60, if 3+ missing: 20/80)
    - Note fallback logic application when less than 2 constant variables are present or key criteria missing
    - Rank recommendations by confidence score based on data completeness and algorithm performance
    - Ensure all three algorithms are analyzed even if data is incomplete
    - Focus the analysis on the highest-confidence algorithm while providing comprehensive coverage
    - Include specific Technical Specification v1.1 terminology and approach throughout

    Make the analysis highly technical and data-driven while remaining practical and actionable.
    The person should understand they've received a sophisticated algorithmic analysis using the 
    Multi-Tier Recommendation Engine with fallback logic and dynamic weighting.
  `
};

// Technical Specification v1.1 validation functions
const TECHNICAL_SPEC_VALIDATION = {
  // Validate if minimum viable data exists for Technical Specification analysis
  validateMinimumData: (formData) => {
    const constantVariables = [
      formData.yearsExperience,
      formData.studyField, 
      formData.interests,
      formData.transferableSkills
    ];
    
    const validConstants = constantVariables.filter(variable => 
      variable && 
      variable !== 'Not specified' && 
      variable !== 'none' && 
      variable !== 'not sure'
    ).length;
    
    return {
      isValid: validConstants >= 1, // Need at least 1 constant variable
      constantsPresent: validConstants,
      requiresFallback: validConstants < 2,
      dataQuality: validConstants / 4
    };
  },

  // Calculate algorithm-specific data completeness
  calculateAlgorithmCompleteness: (formData) => {
    const constantVariables = [
      formData.yearsExperience,
      formData.studyField,
      formData.interests, 
      formData.transferableSkills
    ];

    const techInterestCriteria = [
      formData.techInterests,
      formData.currentRole,
      formData.jobTechnologies
    ];

    const researchDevCriteria = [
      formData.publications,
      formData.toolsUsed,
      formData.timeCommitment
    ];

    const lifestyleMarketCriteria = [
      formData.workPreference,
      formData.educationLevel,
      formData.targetSalary
    ];

    const isValid = (value) => value && value !== 'Not specified' && value !== 'none' && value !== 'not sure';

    return {
      constants: constantVariables.filter(isValid).length,
      techInterest: techInterestCriteria.filter(isValid).length,
      researchDev: researchDevCriteria.filter(isValid).length,
      lifestyleMarket: lifestyleMarketCriteria.filter(isValid).length
    };
  },

  // Determine dynamic weighting based on data completeness
  calculateDynamicWeights: (formData) => {
    const validation = TECHNICAL_SPEC_VALIDATION.validateMinimumData(formData);
    const missingConstants = 4 - validation.constantsPresent;
    
    let constantWeight = 0.6; // Default: 60%
    let specificWeight = 0.4; // Default: 40%
    
    // Fallback Logic Based on Missing Constants
    if (missingConstants === 1) {
      constantWeight = 0.5; // 1 missing: slight adjustment
      specificWeight = 0.5;
    } else if (missingConstants === 2) {
      constantWeight = 0.4; // 2 missing: moderate adjustment
      specificWeight = 0.6;
    } else if (missingConstants >= 3) {
      constantWeight = 0.2; // 3+ missing: heavy reliance on specifics
      specificWeight = 0.8;
    }
    
    return {
      constantWeight,
      specificWeight,
      fallbackApplied: validation.requiresFallback,
      dataQuality: validation.dataQuality
    };
  }
};

// Enhanced API response structure for Technical Specification v1.1
const TECHNICAL_SPEC_RESPONSE_STRUCTURE = {
  recommendations: [
    {
      id: 'rec_1_tech_interest',
      type: 'tech-interest-based',
      title: 'string',
      description: 'string', 
      reasoning: 'string',
      confidence: 'high|medium|low',
      confidenceScore: 'number (0-100)',
      requiredSkills: ['string'],
      suggestedActions: ['string'],
      salaryRange: 'string',
      marketDemand: 'high|medium|low',
      metadata: {
        criteriaUsed: ['string'],
        missingCriteria: ['string'],
        fallbackApplied: 'boolean',
        constantsScore: 'number',
        specificsScore: 'number'
      }
    }
  ],
  overallConfidence: 'number (0-100)',
  dataCompleteness: 'number (0-100)', 
  constantVariablesComplete: 'number (0-4)',
  processedAt: 'ISO string',
  technicalSpecVersion: '1.1',
  algorithmVersion: 'Multi-Tier with Fallback Logic'
};

export { 
  CLAUDE_API_CONFIG, 
  CLAUDE_PROMPTS, 
  TECHNICAL_SPEC_VALIDATION,
  TECHNICAL_SPEC_RESPONSE_STRUCTURE 
};
