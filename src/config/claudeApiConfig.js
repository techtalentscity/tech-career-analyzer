// src/config/claudeApiConfig.js - UPDATED FOR CAREER PATH RECOMMENDATION SYSTEM v2.0

// Claude API configuration for Career Path Recommendation System v2.0
const CLAUDE_API_CONFIG = {
  models: {
    default: 'claude-3-5-sonnet-20240620',
    faster: 'claude-3-haiku-20240307',
    premium: 'claude-3-opus-20240229'
  },
  maxTokens: {
    formSuggestions: 1024,
    careerPathRecommendation: 4096,
    skillGapAnalysis: 3072,
    learningRoadmap: 4096,
    completeAnalysis: 8192
  },
  systemVersion: '2.0',
  engineType: 'Sequential Dependency Recommendation Engine',
  aiContentGeneration: {
    enabled: true,
    dynamicPersonalization: true,
    realTimeGeneration: true
  }
};

// v2.0 Sequential Dependency Engine Prompts for Claude API requests
const CLAUDE_PROMPTS = {
  formSuggestions: 
    "I'm filling out a career assessment form for the Career Path Recommendation System v2.0. " +
    "This system uses a Sequential Dependency Engine (Career Path → Skill Gap → Learning Roadmap) " +
    "with a 4-Tier Scoring System analyzing 16 career path criteria plus additional criteria. " +
    "Based on a typical career changer profile, suggest realistic answers for a comprehensive form that captures: " +
    "TIER 1 - CORE DRIVERS (45%): Future Goal, Tech Interests, Leverage Domain Expertise, Career Paths Interest. " +
    "TIER 2 - STRONG MOTIVATORS (25%): Industry Preference, Tech Motivation, Tech Passion. " +
    "TIER 3 - SUPPORTING EVIDENCE (20%): Transferable Skills, Job Technologies, Job Responsibilities, Job Projects. " +
    "TIER 4 - BACKGROUND CONTEXT (10%): Continue Current Role, Study Field, Certifications, Internships, Publications. " +
    "SKILL GAP CRITERIA: Certifications Detail, Experience Level, Years Experience, Current Role, Tools Used. " +
    "LEARNING ROADMAP CRITERIA: Time Commitment, Target Salary, Transition Timeline, Learning Comfort, Transition Reason, Guidance Needed.",
  
  careerPathRecommendation: (formData) => `
    I'm a career transition expert using the Career Path Recommendation System v2.0 with Sequential Dependency Engine 
    and 4-Tier Scoring System to generate AI-powered career path recommendations.

    CAREER PATH RECOMMENDATION SYSTEM v2.0 ANALYSIS FRAMEWORK:
    
    You must generate a SINGLE, AI-OPTIMIZED CAREER PATH RECOMMENDATION using the 4-Tier Scoring System 
    with 16 weighted criteria, followed by Sequential Dependency components.

    ====================================================================
    🎯 CAREER PATH RECOMMENDATION (Primary Component)
    ====================================================================
    Analyze using 16 criteria organized into 4 tiers with weighted scoring:

    TIER 1: CORE DRIVERS (45% weight):
    - Future Goal (15%): ${formData.futureGoal || 'Not specified'}
    - Tech Interests (12%): ${formData.techInterests || 'Not specified'}  
    - Leverage Domain Expertise (10%): ${formData.leverageDomainExpertise || 'Not specified'}
    - Career Paths Interest (8%): ${Array.isArray(formData.careerPathsInterest) ? formData.careerPathsInterest.join(', ') : formData.careerPathsInterest || 'Not specified'}

    TIER 2: STRONG MOTIVATORS (25% weight):
    - Industry Preference (10%): ${Array.isArray(formData.industryPreference) ? formData.industryPreference.join(', ') : formData.industryPreference || 'Not specified'}
    - Tech Motivation (8%): ${formData.techMotivation || 'Not specified'}
    - Tech Passion (7%): ${formData.techPassion || 'Not specified'}

    TIER 3: SUPPORTING EVIDENCE (20% weight):
    - Transferable Skills (8%): ${formData.transferableSkills || 'Not specified'}
    - Job Technologies (4%): ${formData.jobTechnologies || 'Not specified'}
    - Job Responsibilities (4%): ${formData.jobResponsibilities || 'Not specified'}
    - Job Projects (4%): ${formData.jobProjects || 'Not specified'}

    TIER 4: BACKGROUND CONTEXT (10% weight):
    - Continue Current Role (3%): ${formData.continueCurrent || formData.currentRole || 'Not specified'}
    - Study Field (3%): ${formData.studyField || 'Not specified'}
    - Certifications (2%): ${formData.certifications || 'Not specified'}
    - Internships (1%): ${formData.internships || 'Not specified'}
    - Publications (1%): ${formData.publications || 'Not specified'}

    ====================================================================
    📚 SKILL GAP ANALYSIS CRITERIA (Secondary Component):
    ====================================================================
    Additional criteria for skill gap analysis:
    - Certifications Detail: ${formData.certificationsDetail || 'Not specified'}
    - Experience Level: ${formData.experienceLevel || 'Not specified'}
    - Years Experience: ${formData.yearsExperience || 'Not specified'}
    - Current Role: ${formData.currentRole || 'Not specified'}
    - Tools Used: ${Array.isArray(formData.toolsUsed) ? formData.toolsUsed.join(', ') : formData.toolsUsed || 'Not specified'}

    ====================================================================
    ⚖️ LEARNING ROADMAP CRITERIA (Tertiary Component):
    ====================================================================
    Additional criteria for learning roadmap:
    - Time Commitment: ${formData.timeCommitment || 'Not specified'}
    - Target Salary: ${formData.targetSalary || 'Not specified'}
    - Transition Timeline: ${formData.transitionTimeline || 'Not specified'}
    - Learning Comfort: ${formData.learningComfort || 'Not specified'}
    - Transition Reason: ${formData.transitionReason || 'Not specified'}
    - Guidance Needed: ${Array.isArray(formData.guidanceNeeded) ? formData.guidanceNeeded.join(', ') : formData.guidanceNeeded || 'Not specified'}

    ====================================================================
    v2.0 SEQUENTIAL DEPENDENCY ENGINE ANALYSIS REQUIREMENTS:
    ====================================================================

    CRITICAL: You MUST analyze this using the Sequential Dependency approach and provide your response 
    in the EXACT JSON format below. Generate AI-personalized content based on the user's specific criteria.

    IMPORTANT: All content (titles, descriptions, skills, etc.) must be AI-GENERATED and personalized 
    to this specific user profile. No static templates or generic responses.

    FORMAT YOUR RESPONSE AS VALID JSON:

    {
      "careerPath": {
        "id": "cp_[generate_unique_id]",
        "type": "career-path",
        "title": "[AI-GENERATED career path title based on futureGoal + techInterests + leverageDomainExpertise + continueCurrent]",
        "description": "[AI-GENERATED detailed description leveraging user's specific interests, goals, and domain expertise]",
        "reasoning": "[AI-GENERATED explanation of why this path aligns with their 4-tier criteria analysis]",
        "confidence": "[high|medium|low based on data completeness]",
        "confidenceScore": [number 0-100],
        "recommendedPaths": ["[AI-GENERATED path 1]", "[AI-GENERATED path 2]", "[AI-GENERATED path 3]"],
        "industryFocus": ["[AI-SELECTED from industryPreference]", "[AI-SELECTED secondary industry]"],
        "marketDemand": "[high|medium|low based on AI analysis]",
        "metadata": {
          "criteriaUsed": ["[list of 16 criteria that had valid data]"],
          "missingCriteria": ["[list of 16 criteria that were missing]"],
          "tierScores": {
            "coreDriving": [decimal 0-1 representing Tier 1 score],
            "strongMotivators": [decimal 0-1 representing Tier 2 score],
            "supportingEvidence": [decimal 0-1 representing Tier 3 score],
            "backgroundContext": [decimal 0-1 representing Tier 4 score]
          },
          "totalWeightedScore": [decimal 0-1 representing combined score],
          "fallbackApplied": [boolean - true if less than 8 of 16 criteria present]
        }
      },
      "skillGap": {
        "id": "sg_[generate_unique_id]",
        "type": "skill-gap",
        "careerPathId": "[reference to career path id]",
        "currentSkillLevel": "[AI-ASSESSED from experienceLevel + toolsUsed + yearsExperience]",
        "requiredSkills": ["[AI-GENERATED skill 1]", "[AI-GENERATED skill 2]", "[AI-GENERATED skill 3]", "[AI-GENERATED skill 4]", "[AI-GENERATED skill 5]"],
        "skillGaps": [
          {
            "skill": "[AI-GENERATED specific skill name]",
            "currentLevel": "[AI-ASSESSED: none|basic|intermediate|advanced]",
            "requiredLevel": "[AI-DETERMINED: basic|intermediate|advanced|expert]",
            "priority": "[high|medium|low based on career path importance]",
            "estimatedLearningTime": "[AI-CALCULATED based on gap size + timeCommitment]"
          }
        ],
        "strengthsToLeverage": ["[AI-IDENTIFIED from transferableSkills + jobTechnologies + toolsUsed]"],
        "recommendedCertifications": ["[AI-RECOMMENDED cert 1]", "[AI-RECOMMENDED cert 2]"],
        "confidence": "[high|medium|low]",
        "confidenceScore": [number 0-100],
        "metadata": {
          "basedOnCareerPath": true,
          "criteriaUsed": ["[skill gap criteria that had valid data]"],
          "missingCriteria": ["[skill gap criteria that were missing]"]
        }
      },
      "learningRoadmap": {
        "id": "lr_[generate_unique_id]",
        "type": "learning-roadmap",
        "careerPathId": "[reference to career path id]",
        "skillGapId": "[reference to skill gap id]",
        "phases": [
          {
            "phase": 1,
            "title": "[AI-GENERATED phase name based on skill progression]",
            "duration": "[AI-CALCULATED based on timeCommitment + skill complexity]",
            "skills": ["[AI-CURATED skills for this phase]"],
            "resources": ["[AI-RECOMMENDED learning resources based on learningComfort + guidanceNeeded]"],
            "milestones": ["[AI-GENERATED achievement markers]"]
          }
        ],
        "totalTimelineEstimate": "[AI-CALCULATED based on phases + transitionTimeline + timeCommitment]",
        "budgetEstimate": "[AI-ESTIMATED based on recommended resources + certifications]",
        "flexibilityOptions": ["[AI-GENERATED alternatives based on timeCommitment + learningComfort]"],
        "supportRecommendations": ["[AI-CURATED based on guidanceNeeded + transitionReason]"],
        "confidence": "[high|medium|low]",
        "confidenceScore": [number 0-100],
        "metadata": {
          "basedOnCareerPath": true,
          "basedOnSkillGap": true,
          "criteriaUsed": ["[learning roadmap criteria that had valid data]"],
          "missingCriteria": ["[learning roadmap criteria that were missing]"]
        }
      },
      "overallConfidence": [number 0-100 - weighted average of all three components],
      "dataCompleteness": [number 0-100 - percentage of all 22 criteria completed],
      "careerPathCriteriaComplete": [number 0-16 - count of valid career path criteria],
      "processedAt": "[current ISO timestamp]"
    }

    ====================================================================
    AI CONTENT GENERATION INSTRUCTIONS:
    ====================================================================

    1. **CAREER PATH TITLE GENERATION**: 
       - Analyze futureGoal + techInterests + leverageDomainExpertise + continueCurrent
       - Generate specific, personalized role title (e.g., "Healthcare AI Engineer with Clinical Background")
       - Consider experience level for seniority prefix

    2. **DESCRIPTION GENERATION**:
       - Personalize based on user's specific interests, goals, and domain
       - Reference their industry preferences and motivation
       - Explain how they can leverage their current expertise

    3. **SKILL GAP ANALYSIS**:
       - Assess current skills from toolsUsed + jobTechnologies + experienceLevel
       - Generate specific skill gaps based on career path requirements
       - Calculate realistic learning times based on timeCommitment

    4. **LEARNING ROADMAP GENERATION**:
       - Create 2-4 phases based on skill complexity and timeline
       - Adapt to timeCommitment (full-time vs part-time vs flexible)
       - Personalize resources based on learningComfort and guidanceNeeded

    5. **SCORING AND VALIDATION**:
       - Apply 4-tier weighted scoring (45%, 25%, 20%, 10%)
       - Count valid criteria out of 16 for career path
       - Apply fallback logic if < 8 criteria present
       - Calculate confidence based on data completeness and tier performance

    CRITICAL INSTRUCTIONS:
    - Generate completely personalized content - no generic templates
    - All skills, certifications, and resources must be relevant to their specific profile
    - Ensure sequential dependency: skill gaps build on career path, roadmap builds on both
    - Apply proper 4-tier weighting in confidence calculations
    - Reference specific user data points throughout the analysis
    - Generate realistic timelines and budget estimates
    - Provide valid JSON response that can be parsed programmatically

    The user should receive a sophisticated, AI-generated analysis that feels completely 
    personalized to their unique career transition profile using the v2.0 Sequential Dependency Engine.
  `,

  skillGapAnalysis: (userProfile, careerPath) => `
    Generate a detailed skill gap analysis building on the career path recommendation.
    
    Career Path: ${careerPath.title}
    User Profile: ${JSON.stringify(userProfile, null, 2)}
    
    Analyze current skills vs required skills and generate personalized skill development plan.
  `,

  learningRoadmap: (userProfile, careerPath, skillGap) => `
    Generate a comprehensive learning roadmap building on career path and skill gap analysis.
    
    Career Path: ${careerPath.title}
    Skill Gaps: ${skillGap.skillGaps.map(gap => gap.skill).join(', ')}
    Time Commitment: ${userProfile.timeCommitment}
    Learning Comfort: ${userProfile.learningComfort}
    
    Create personalized learning phases with resources, timelines, and milestones.
  `
};

// Career Path Recommendation System v2.0 validation functions
const CAREER_PATH_VALIDATION = {
  // Validate data completeness for v2.0 system (16 career path criteria)
  validateV2Data: (userProfile) => {
    // 16 Career Path Recommendation criteria organized by tier
    const tier1CoreDrivers = ['futureGoal', 'techInterests', 'leverageDomainExpertise', 'careerPathsInterest'];
    const tier2StrongMotivators = ['industryPreference', 'techMotivation', 'techPassion'];
    const tier3SupportingEvidence = ['transferableSkills', 'jobTechnologies', 'jobResponsibilities', 'jobProjects'];
    const tier4BackgroundContext = ['continueCurrent', 'studyField', 'certifications', 'internships', 'publications'];
    
    const careerPathCriteria = [...tier1CoreDrivers, ...tier2StrongMotivators, ...tier3SupportingEvidence, ...tier4BackgroundContext];
    
    // Additional criteria for Skill Gap and Learning Roadmap
    const additionalCriteria = [
      'certificationsDetail', 'experienceLevel', 'yearsExperience', 'currentRole', 'toolsUsed',
      'timeCommitment', 'targetSalary', 'transitionTimeline', 'learningComfort', 'transitionReason', 'guidanceNeeded'
    ];
    
    // All criteria combined
    const allCriteria = [...careerPathCriteria, ...additionalCriteria];
    
    // Validate career path criteria
    const validCareerPathCriteria = careerPathCriteria.filter(field => CAREER_PATH_VALIDATION.isV2Valid(userProfile[field]));
    const careerPathCriteriaComplete = validCareerPathCriteria.length;
    
    // Validate all criteria
    const validAllCriteria = allCriteria.filter(field => CAREER_PATH_VALIDATION.isV2Valid(userProfile[field]));
    const totalValid = validAllCriteria.length;
    
    // v2.0 validation rules
    const requiresFallback = careerPathCriteriaComplete < 8; // Less than 50% of 16 criteria
    const isValid = careerPathCriteriaComplete >= 4; // Minimum 25% of criteria needed
    
    // Tier analysis
    const tierAnalysis = {
      tier1CoreDrivers: CAREER_PATH_VALIDATION.validateTier(userProfile, tier1CoreDrivers),
      tier2StrongMotivators: CAREER_PATH_VALIDATION.validateTier(userProfile, tier2StrongMotivators),
      tier3SupportingEvidence: CAREER_PATH_VALIDATION.validateTier(userProfile, tier3SupportingEvidence),
      tier4BackgroundContext: CAREER_PATH_VALIDATION.validateTier(userProfile, tier4BackgroundContext)
    };
    
    return {
      isValid,
      requiresFallback,
      careerPathCriteriaComplete,
      totalCriteriaComplete: totalValid,
      dataCompleteness: Math.round((totalValid / allCriteria.length) * 100),
      careerPathCompleteness: Math.round((careerPathCriteriaComplete / careerPathCriteria.length) * 100),
      validCareerPathCriteria,
      validAllCriteria,
      tierAnalysis,
      systemVersion: '2.0'
    };
  },

  // Validate specific tier
  validateTier: (userProfile, tierFields) => {
    const validFields = tierFields.filter(field => CAREER_PATH_VALIDATION.isV2Valid(userProfile[field]));
    return {
      validCount: validFields.length,
      totalCount: tierFields.length,
      completeness: Math.round((validFields.length / tierFields.length) * 100),
      validFields,
      missingFields: tierFields.filter(field => !CAREER_PATH_VALIDATION.isV2Valid(userProfile[field]))
    };
  },

  // Enhanced validation function for v2.0 system
  isV2Valid: (value) => {
    if (!value) return false;
    
    if (typeof value === 'string') {
      const invalid = ['', 'none', 'not sure', 'unclear', 'n/a', 'unknown', 'unsure', 'not specified'];
      const trimmed = value.toLowerCase().trim();
      return !invalid.includes(trimmed) && trimmed.length > 2;
    }
    
    if (Array.isArray(value)) {
      return value.length > 0 && 
             !value.some(v => ['not sure', 'unclear', 'unknown', 'not specified'].includes(v?.toLowerCase?.()));
    }
    
    return true;
  },

  // Calculate 4-tier weighted scoring
  calculate4TierScore: (userProfile) => {
    const weights = {
      // Tier 1: Core Drivers (45%)
      futureGoal: 0.15,
      techInterests: 0.12,
      leverageDomainExpertise: 0.10,
      careerPathsInterest: 0.08,
      
      // Tier 2: Strong Motivators (25%)
      industryPreference: 0.10,
      techMotivation: 0.08,
      techPassion: 0.07,
      
      // Tier 3: Supporting Evidence (20%)
      transferableSkills: 0.08,
      jobTechnologies: 0.04,
      jobResponsibilities: 0.04,
      jobProjects: 0.04,
      
      // Tier 4: Background Context (10%)
      continueCurrent: 0.03,
      studyField: 0.03,
      certifications: 0.02,
      internships: 0.01,
      publications: 0.01
    };
    
    let tierScores = {
      coreDriving: 0,
      strongMotivators: 0,
      supportingEvidence: 0,
      backgroundContext: 0
    };
    
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // Calculate tier scores
    Object.entries(weights).forEach(([field, weight]) => {
      if (CAREER_PATH_VALIDATION.isV2Valid(userProfile[field])) {
        const fieldScore = weight * CAREER_PATH_VALIDATION.getFieldScore(field, userProfile[field]);
        
        // Assign to appropriate tier
        if (['futureGoal', 'techInterests', 'leverageDomainExpertise', 'careerPathsInterest'].includes(field)) {
          tierScores.coreDriving += fieldScore;
        } else if (['industryPreference', 'techMotivation', 'techPassion'].includes(field)) {
          tierScores.strongMotivators += fieldScore;
        } else if (['transferableSkills', 'jobTechnologies', 'jobResponsibilities', 'jobProjects'].includes(field)) {
          tierScores.supportingEvidence += fieldScore;
        } else if (['continueCurrent', 'studyField', 'certifications', 'internships', 'publications'].includes(field)) {
          tierScores.backgroundContext += fieldScore;
        }
        
        criteriaCount++;
        usedCriteria.push(field);
      } else {
        missingCriteria.push(field);
      }
    });
    
    const totalWeightedScore = tierScores.coreDriving + tierScores.strongMotivators + 
                              tierScores.supportingEvidence + tierScores.backgroundContext;
    
    const fallbackApplied = criteriaCount < 8; // Less than 50% of 16 criteria
    
    return {
      tierScores,
      totalWeightedScore,
      criteriaCount,
      usedCriteria,
      missingCriteria,
      fallbackApplied
    };
  },

  // Get scoring value for specific field
  getFieldScore: (field, value) => {
    // Simplified scoring - in practice this would be more sophisticated
    switch (field) {
      case 'futureGoal':
        return value.toLowerCase().includes('ai') || value.toLowerCase().includes('data') || 
               value.toLowerCase().includes('software') ? 0.9 : 0.7;
      
      case 'techInterests':
        const hotTech = ['machine learning', 'ai', 'cloud', 'data science', 'cybersecurity'];
        const hasHotTech = hotTech.some(tech => value.toLowerCase().includes(tech));
        return hasHotTech ? 0.9 : 0.7;
      
      case 'leverageDomainExpertise':
        return value.toLowerCase() === 'yes' ? 0.9 : value.toLowerCase() === 'maybe' ? 0.6 : 0.4;
      
      case 'industryPreference':
        const highGrowthIndustries = ['technology', 'healthcare', 'finance'];
        if (Array.isArray(value)) {
          const hasHighGrowth = value.some(industry => 
            highGrowthIndustries.some(hg => industry.toLowerCase().includes(hg))
          );
          return hasHighGrowth ? 0.9 : 0.6;
        }
        return 0.6;
      
      case 'transferableSkills':
        const valuableSkills = ['analytical', 'problem', 'technical', 'communication', 'leadership'];
        const skillMatches = valuableSkills.filter(skill => 
          value.toLowerCase().includes(skill)
        ).length;
        return Math.min(0.5 + (skillMatches * 0.1), 0.9);
      
      default:
        return 0.7; // Default score for valid fields
    }
  },

  // Determine confidence level based on scoring
  determineConfidence: (criteriaCount, totalWeightedScore) => {
    const maxCriteria = 16;
    const completeness = criteriaCount / maxCriteria;
    const scoreQuality = Math.min(totalWeightedScore, 1);
    
    const confidenceScore = (completeness * 0.6) + (scoreQuality * 0.4);
    const normalizedScore = Math.round(confidenceScore * 100);
    
    let level;
    if (confidenceScore >= 0.75) level = 'high';
    else if (confidenceScore >= 0.5) level = 'medium';
    else level = 'low';
    
    return { level, score: normalizedScore };
  }
};

// v2.0 API response structure for Sequential Dependency Engine
const V2_RESPONSE_STRUCTURE = {
  careerPath: {
    id: 'string',
    type: 'career-path',
    title: 'string (AI-generated)',
    description: 'string (AI-generated)',
    reasoning: 'string (AI-generated)',
    confidence: 'high|medium|low',
    confidenceScore: 'number (0-100)',
    recommendedPaths: ['string (AI-generated)'],
    industryFocus: ['string (AI-selected)'],
    marketDemand: 'high|medium|low',
    metadata: {
      criteriaUsed: ['string'],
      missingCriteria: ['string'],
      tierScores: {
        coreDriving: 'number (0-1)',
        strongMotivators: 'number (0-1)',
        supportingEvidence: 'number (0-1)',
        backgroundContext: 'number (0-1)'
      },
      totalWeightedScore: 'number (0-1)',
      fallbackApplied: 'boolean'
    }
  },
  skillGap: {
    id: 'string',
    type: 'skill-gap',
    careerPathId: 'string (reference)',
    currentSkillLevel: 'string (AI-assessed)',
    requiredSkills: ['string (AI-generated)'],
    skillGaps: [{
      skill: 'string (AI-generated)',
      currentLevel: 'none|basic|intermediate|advanced',
      requiredLevel: 'basic|intermediate|advanced|expert',
      priority: 'high|medium|low',
      estimatedLearningTime: 'string (AI-calculated)'
    }],
    strengthsToLeverage: ['string (AI-identified)'],
    recommendedCertifications: ['string (AI-recommended)'],
    confidence: 'high|medium|low',
    confidenceScore: 'number (0-100)',
    metadata: {
      basedOnCareerPath: 'boolean',
      criteriaUsed: ['string'],
      missingCriteria: ['string']
    }
  },
  learningRoadmap: {
    id: 'string',
    type: 'learning-roadmap',
    careerPathId: 'string (reference)',
    skillGapId: 'string (reference)',
    phases: [{
      phase: 'number',
      title: 'string (AI-generated)',
      duration: 'string (AI-calculated)',
      skills: ['string (AI-curated)'],
      resources: ['string (AI-recommended)'],
      milestones: ['string (AI-generated)']
    }],
    totalTimelineEstimate: 'string (AI-calculated)',
    budgetEstimate: 'string (AI-estimated)',
    flexibilityOptions: ['string (AI-generated)'],
    supportRecommendations: ['string (AI-curated)'],
    confidence: 'high|medium|low',
    confidenceScore: 'number (0-100)',
    metadata: {
      basedOnCareerPath: 'boolean',
      basedOnSkillGap: 'boolean',
      criteriaUsed: ['string'],
      missingCriteria: ['string']
    }
  },
  overallConfidence: 'number (0-100)',
  dataCompleteness: 'number (0-100)',
  careerPathCriteriaComplete: 'number (0-16)',
  processedAt: 'ISO string'
};

// Legacy support for backward compatibility
const LEGACY_TECHNICAL_SPEC_VALIDATION = {
  validateMinimumData: (formData) => {
    console.log("⚠️ Using legacy validation - consider upgrading to v2.0");
    
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
      isValid: validConstants >= 1,
      constantsPresent: validConstants,
      requiresFallback: validConstants < 2,
      dataQuality: validConstants / 4,
      legacy: true
    };
  }
};

// Export configuration for v2.0 system
export { 
  CLAUDE_API_CONFIG, 
  CLAUDE_PROMPTS, 
  CAREER_PATH_VALIDATION,
  V2_RESPONSE_STRUCTURE,
  
  // Legacy exports for backward compatibility
  TECHNICAL_SPEC_VALIDATION as LEGACY_TECHNICAL_SPEC_VALIDATION
};
