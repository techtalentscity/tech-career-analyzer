// src/Pages/career/CareerDashboard.jsx - UPDATED TO MATCH TECHNICAL SPECIFICATION
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
  const [careerPaths, setCareerPaths] = useState([]);
  const [skillsGap, setSkillsGap] = useState([]);
  const [learningRoadmap, setLearningRoadmap] = useState([]);
  const [marketTrends, setMarketTrends] = useState([]);
  const [jobMarketOutlook, setJobMarketOutlook] = useState([]);
  const [networkingStrategy, setNetworkingStrategy] = useState([]);
  const [personalBranding, setPersonalBranding] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState([]);
  const [portfolioGuidance, setPortfolioGuidance] = useState([]);
  const [jobSearchStrategies, setJobSearchStrategies] = useState([]);
  const [careerGrowthResources, setCareerGrowthResources] = useState([]);
  const [careerPathVisualizations, setCareerPathVisualizations] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  
  // Enhanced user data model matching technical spec EXACTLY
  const [userData, setUserData] = useState({
    // 4 Constant Variables (used in ALL recommendations)
    yearsExperience: '',
    studyField: '',
    interests: [],
    transferableSkills: '',
    
    // Recommendation 1 Specific (🎯 Tech-Interest Based)
    techInterests: '',
    currentRole: '',
    jobTechnologies: '',
    
    // Recommendation 2 Specific (📚 Research/Development Based)
    publications: '',
    toolsUsed: [],
    timeCommitment: '',
    
    // Recommendation 3 Specific (⚖️ Lifestyle/Market Based)
    workPreference: '',
    educationLevel: '',
    targetSalary: '',
    
    // Additional Context
    name: '',
    email: '',
    experienceLevel: '',
    jobResponsibilities: '',
    jobProjects: '',
    careerPathsInterest: [],
    transitionTimeline: ''
  });
  
  // Recommendation metadata matching technical spec
  const [recommendationMetadata, setRecommendationMetadata] = useState({
    overallConfidence: 0,
    dataCompleteness: 0,
    constantVariablesComplete: 0,
    processedAt: null
  });
  
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  // ============================================================================
  // CAREER RECOMMENDATION SYSTEM - EXACT MATCH TO TECHNICAL SPECIFICATION
  // ============================================================================

  /**
   * Enhanced Validation Function - Matches Technical Spec
   */
  const isValid = (value) => {
    if (!value) return false;
    
    if (typeof value === 'string') {
      const invalid = ['', 'none', 'not sure', 'unclear', 'n/a', 'unknown', 'unsure'];
      const trimmed = value.toLowerCase().trim();
      return !invalid.includes(trimmed) && trimmed.length > 0;
    }
    
    if (Array.isArray(value)) {
      return value.length > 0 && 
             !value.some(v => ['not sure', 'unclear', 'unknown'].includes(v?.toLowerCase?.()));
    }
    
    return true;
  };

  /**
   * Data Validation Layer - Input sanitization and completeness scoring
   */
  const validateProfile = (profile) => {
    console.log('🔍 Validating user profile according to technical spec...');
    
    const constantsPresent = countValidConstants(profile);
    const criteriaCompleteness = assessCompleteness(profile);
    const requiresFallback = constantsPresent < 2;
    const dataQuality = calculateDataQuality(profile, constantsPresent, criteriaCompleteness);
    
    return {
      ...profile,
      _validation: {
        constantsPresent,
        criteriaCompleteness,
        requiresFallback,
        dataQuality
      }
    };
  };

  const countValidConstants = (profile) => {
    const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    return constants.filter(key => isValid(profile[key])).length;
  };

  const assessCompleteness = (profile) => {
    const allCriteria = [
      // Constants
      'yearsExperience', 'studyField', 'interests', 'transferableSkills',
      // Rec 1 specific
      'techInterests', 'currentRole', 'jobTechnologies',
      // Rec 2 specific  
      'publications', 'toolsUsed', 'timeCommitment',
      // Rec 3 specific
      'workPreference', 'educationLevel', 'targetSalary'
    ];
    const validCriteria = allCriteria.filter(key => isValid(profile[key])).length;
    return (validCriteria / allCriteria.length) * 100;
  };

  const calculateDataQuality = (profile, constantsPresent, criteriaCompleteness) => {
    const constantsQuality = (constantsPresent / 4) * 100;
    return (criteriaCompleteness * 0.7) + (constantsQuality * 0.3);
  };

  /**
   * Enhanced Dynamic Weight Calculation - Matches Technical Spec
   */
  const calculateDynamicWeights = (profile, criteria) => {
    const constantsResult = assessConstantVariables(profile);
    const specificsResult = assessSpecificCriteria(profile, criteria.specific);
    
    // Base weights: 60% constants, 40% specifics (as per spec)
    let constantWeight = 0.6;
    let specificWeight = 0.4;
    
    // Fallback Logic Based on Missing Constants
    const missingConstants = 4 - constantsResult.validCount;
    
    if (missingConstants === 1) {
      // 1 missing: slight adjustment
      constantWeight = 0.5;
      specificWeight = 0.5;
    } else if (missingConstants === 2) {
      // 2 missing: moderate adjustment
      constantWeight = 0.4;
      specificWeight = 0.6;
    } else if (missingConstants >= 3) {
      // 3+ missing: heavy reliance on specifics
      constantWeight = 0.2;
      specificWeight = 0.8;
    }
    
    // Further adjust based on specific criteria availability
    if (specificsResult.validCount === 0) {
      // No specific criteria available - rely entirely on constants
      constantWeight = 1.0;
      specificWeight = 0.0;
    }
    
    return distributeWeights(constantWeight, specificWeight, criteria);
  };

  const assessConstantVariables = (profile) => {
    const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    const validCount = constants.filter(key => isValid(profile[key])).length;
    
    return {
      validCount,
      totalCount: 4,
      completeness: validCount / 4,
      critical: validCount < 2  // Less than 2 constants is critical
    };
  };

  const assessSpecificCriteria = (profile, specificFields) => {
    const validCount = specificFields.filter(field => isValid(profile[field])).length;
    
    return {
      validCount,
      totalCount: specificFields.length,
      completeness: validCount / specificFields.length
    };
  };

  const distributeWeights = (constantWeight, specificWeight, criteria) => {
    const constantFieldCount = 4;
    const specificFieldCount = criteria.specific.length;
    
    const weights = {
      // Constant weights - distributed equally
      yearsExperience: constantWeight / constantFieldCount,
      studyField: constantWeight / constantFieldCount,
      interests: constantWeight / constantFieldCount,
      transferableSkills: constantWeight / constantFieldCount
    };
    
    // Specific weights - distributed equally among specific criteria
    criteria.specific.forEach(field => {
      weights[field] = specificWeight / specificFieldCount;
    });
    
    return weights;
  };

  const checkFallbackRequired = (constantsCount, totalCriteriaCount) => {
    return constantsCount < 2 || totalCriteriaCount < 4;
  };

  /**
   * Recommendation Engine 1: Tech-Interest Based (🎯) - EXACT SPEC MATCH
   */
  const generateTechInterestRecommendation = (validatedProfile) => {
    console.log('🎯 Generating Tech-Interest Based recommendation...');
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['techInterests', 'currentRole', 'jobTechnologies']
    };
    
    const weights = calculateDynamicWeights(validatedProfile, criteria);
    const score = calculateTechInterestScore(validatedProfile, weights);
    const confidence = determineConfidence(score.criteriaCount, score.totalScore);
    
    return {
      id: 'rec_1_tech_interest',
      type: 'tech-interest-based',
      title: generateTechRoleTitle(score.techAlignment, validatedProfile.yearsExperience),
      description: generateTechInterestDescription(score.techAlignment, validatedProfile),
      reasoning: generateTechInterestReasoning(validatedProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      requiredSkills: extractTechInterestSkills(score.techAlignment, validatedProfile),
      suggestedActions: generateTechInterestActions(validatedProfile, score.techAlignment),
      salaryRange: getTechInterestSalaryRange(score.techAlignment, validatedProfile.yearsExperience),
      marketDemand: getTechInterestMarketDemand(score.techAlignment),
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        fallbackApplied: score.fallbackUsed,
        constantsScore: score.constantsScore,
        specificsScore: score.specificsScore
      }
    };
  };

  const calculateTechInterestScore = (profile, weights) => {
    let constantsScore = 0;
    let specificsScore = 0;
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // 4 Constant Variables Scoring
    const constantResults = scoreConstantVariables(profile, weights);
    constantsScore = constantResults.score;
    criteriaCount += constantResults.count;
    usedCriteria.push(...constantResults.used);
    missingCriteria.push(...constantResults.missing);
    
    // Recommendation 1 Specific Criteria
    if (isValid(profile.techInterests)) {
      specificsScore += weights.techInterests * getTechInterestMarketAlignment(profile.techInterests);
      criteriaCount++;
      usedCriteria.push('techInterests');
    } else {
      missingCriteria.push('techInterests');
    }
    
    if (isValid(profile.currentRole)) {
      specificsScore += weights.currentRole * getCurrentRoleTechTransition(profile.currentRole);
      criteriaCount++;
      usedCriteria.push('currentRole');
    } else {
      missingCriteria.push('currentRole');
    }
    
    if (isValid(profile.jobTechnologies)) {
      specificsScore += weights.jobTechnologies * getTechnologyMarketDemand(profile.jobTechnologies);
      criteriaCount++;
      usedCriteria.push('jobTechnologies');
    } else {
      missingCriteria.push('jobTechnologies');
    }
    
    const totalScore = constantsScore + specificsScore;
    const fallbackUsed = checkFallbackRequired(constantResults.count, criteriaCount);
    
    return { 
      totalScore, 
      criteriaCount, 
      constantsScore, 
      specificsScore,
      usedCriteria,
      missingCriteria,
      fallbackUsed,
      techAlignment: extractTechAlignment(profile) 
    };
  };

  /**
   * Recommendation Engine 2: Research/Development Based (📚) - EXACT SPEC MATCH
   */
  const generateResearchDevelopmentRecommendation = (validatedProfile) => {
    console.log('📚 Generating Research/Development Based recommendation...');
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['publications', 'toolsUsed', 'timeCommitment']
    };
    
    const weights = calculateDynamicWeights(validatedProfile, criteria);
    const score = calculateResearchDevelopmentScore(validatedProfile, weights);
    const confidence = determineConfidence(score.criteriaCount, score.totalScore);
    
    return {
      id: 'rec_2_research_dev',
      type: 'research-development',
      title: generateResearchRoleTitle(score.researchAlignment, validatedProfile.yearsExperience),
      description: generateResearchDescription(score.researchAlignment, validatedProfile),
      reasoning: generateResearchReasoning(validatedProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      requiredSkills: extractResearchSkills(score.researchAlignment, validatedProfile),
      suggestedActions: generateResearchActions(validatedProfile, score.researchAlignment),
      salaryRange: getResearchSalaryRange(score.researchAlignment, validatedProfile.yearsExperience),
      marketDemand: getResearchMarketDemand(score.researchAlignment),
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        fallbackApplied: score.fallbackUsed,
        constantsScore: score.constantsScore,
        specificsScore: score.specificsScore
      }
    };
  };

  const calculateResearchDevelopmentScore = (profile, weights) => {
    let constantsScore = 0;
    let specificsScore = 0;
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // 4 Constant Variables Scoring
    const constantResults = scoreConstantVariables(profile, weights);
    constantsScore = constantResults.score;
    criteriaCount += constantResults.count;
    usedCriteria.push(...constantResults.used);
    missingCriteria.push(...constantResults.missing);
    
    // Recommendation 2 Specific Criteria
    if (isValid(profile.publications)) {
      specificsScore += weights.publications * getPublicationScore(profile.publications);
      criteriaCount++;
      usedCriteria.push('publications');
    } else {
      missingCriteria.push('publications');
    }
    
    if (isValid(profile.toolsUsed)) {
      specificsScore += weights.toolsUsed * getResearchToolProficiency(profile.toolsUsed);
      criteriaCount++;
      usedCriteria.push('toolsUsed');
    } else {
      missingCriteria.push('toolsUsed');
    }
    
    if (isValid(profile.timeCommitment)) {
      specificsScore += weights.timeCommitment * getTimeCommitmentFlexibility(profile.timeCommitment);
      criteriaCount++;
      usedCriteria.push('timeCommitment');
    } else {
      missingCriteria.push('timeCommitment');
    }
    
    const totalScore = constantsScore + specificsScore;
    const fallbackUsed = checkFallbackRequired(constantResults.count, criteriaCount);
    
    return { 
      totalScore, 
      criteriaCount, 
      constantsScore, 
      specificsScore,
      usedCriteria,
      missingCriteria,
      fallbackUsed,
      researchAlignment: extractResearchAlignment(profile) 
    };
  };

  /**
   * Recommendation Engine 3: Lifestyle/Market Based (⚖️) - EXACT SPEC MATCH
   */
  const generateLifestyleMarketRecommendation = (validatedProfile) => {
    console.log('⚖️ Generating Lifestyle/Market Based recommendation...');
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['workPreference', 'educationLevel', 'targetSalary']
    };
    
    const weights = calculateDynamicWeights(validatedProfile, criteria);
    const score = calculateLifestyleMarketScore(validatedProfile, weights);
    const confidence = determineConfidence(score.criteriaCount, score.totalScore);
    
    return {
      id: 'rec_3_lifestyle_market',
      type: 'lifestyle-market',
      title: generateLifestyleRoleTitle(score.marketFit, validatedProfile.yearsExperience),
      description: generateLifestyleDescription(score.marketFit, validatedProfile),
      reasoning: generateLifestyleReasoning(validatedProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      requiredSkills: extractLifestyleSkills(score.marketFit, validatedProfile),
      suggestedActions: generateLifestyleActions(validatedProfile, score.marketFit),
      salaryRange: getLifestyleSalaryRange(score.marketFit, validatedProfile.targetSalary),
      marketDemand: getLifestyleMarketDemand(score.marketFit),
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        fallbackApplied: score.fallbackUsed,
        constantsScore: score.constantsScore,
        specificsScore: score.specificsScore
      }
    };
  };

  const calculateLifestyleMarketScore = (profile, weights) => {
    let constantsScore = 0;
    let specificsScore = 0;
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // 4 Constant Variables Scoring
    const constantResults = scoreConstantVariables(profile, weights);
    constantsScore = constantResults.score;
    criteriaCount += constantResults.count;
    usedCriteria.push(...constantResults.used);
    missingCriteria.push(...constantResults.missing);
    
    // Recommendation 3 Specific Criteria
    if (isValid(profile.workPreference)) {
      specificsScore += weights.workPreference * getWorkPreferenceMarketFit(profile.workPreference);
      criteriaCount++;
      usedCriteria.push('workPreference');
    } else {
      missingCriteria.push('workPreference');
    }
    
    if (isValid(profile.educationLevel)) {
      specificsScore += weights.educationLevel * getEducationLevelAlignment(profile.educationLevel);
      criteriaCount++;
      usedCriteria.push('educationLevel');
    } else {
      missingCriteria.push('educationLevel');
    }
    
    if (isValid(profile.targetSalary)) {
      specificsScore += weights.targetSalary * getSalaryMarketRealism(profile.targetSalary, profile.yearsExperience);
      criteriaCount++;
      usedCriteria.push('targetSalary');
    } else {
      missingCriteria.push('targetSalary');
    }
    
    const totalScore = constantsScore + specificsScore;
    const fallbackUsed = checkFallbackRequired(constantResults.count, criteriaCount);
    
    return { 
      totalScore, 
      criteriaCount, 
      constantsScore, 
      specificsScore,
      usedCriteria,
      missingCriteria,
      fallbackUsed,
      marketFit: extractMarketFit(profile) 
    };
  };

  /**
   * Constant Variables Scoring Function - EXACT SPEC MATCH
   */
  const scoreConstantVariables = (profile, weights) => {
    let score = 0;
    let count = 0;
    let used = [];
    let missing = [];
    
    // Years Experience (Universal baseline)
    if (isValid(profile.yearsExperience)) {
      score += weights.yearsExperience * getExperienceScore(profile.yearsExperience) * 100;
      count++;
      used.push('yearsExperience');
    } else {
      missing.push('yearsExperience');
    }
    
    // Study Field (Academic foundation)
    if (isValid(profile.studyField)) {
      score += weights.studyField * getStudyFieldRelevance(profile.studyField) * 100;
      count++;
      used.push('studyField');
    } else {
      missing.push('studyField');
    }
    
    // Interests (Passion alignment)
    if (isValid(profile.interests)) {
      score += weights.interests * getInterestAlignment(profile.interests) * 100;
      count++;
      used.push('interests');
    } else {
      missing.push('interests');
    }
    
    // Transferable Skills (Cross-domain value)
    if (isValid(profile.transferableSkills)) {
      score += weights.transferableSkills * getTransferableSkillValue(profile.transferableSkills) * 100;
      count++;
      used.push('transferableSkills');
    } else {
      missing.push('transferableSkills');
    }
    
    return { score, count, used, missing };
  };

  /**
   * Confidence Scoring System - EXACT SPEC MATCH
   */
  const determineConfidence = (criteriaCount, totalScore) => {
    const maxCriteria = 7; // 4 constants + 3 specifics
    const completeness = criteriaCount / maxCriteria;
    const scoreQuality = Math.min(totalScore / 100, 1);
    
    const confidenceScore = (completeness * 0.6) + (scoreQuality * 0.4);
    const normalizedScore = Math.round(confidenceScore * 100);
    
    let level;
    if (confidenceScore >= 0.8) level = 'high';
    else if (confidenceScore >= 0.5) level = 'medium';
    else level = 'low';
    
    return { level, score: normalizedScore };
  };

  const calculateOverallConfidence = (recommendations) => {
    const scores = recommendations.map(r => r.confidenceScore);
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  /**
   * Main Career Recommendation Engine - EXACT SPEC IMPLEMENTATION
   */
  const generateAdvancedCareerRecommendations = async (rawProfile) => {
    console.log('🎯 Starting Career Recommendation Engine v1.1 (Technical Spec)...');
    
    try {
      // Step 1: Data Validation Layer
      const validatedProfile = validateProfile(rawProfile);
      
      // Check if minimum viable data exists
      if (validatedProfile._validation.constantsPresent < 1) {
        throw new Error('Insufficient data for recommendations - need at least 1 constant variable');
      }
      
      // Step 2: Generate all three types of recommendations in parallel
      const recommendations = [
        generateTechInterestRecommendation(validatedProfile),
        generateResearchDevelopmentRecommendation(validatedProfile),
        generateLifestyleMarketRecommendation(validatedProfile)
      ];
      
      // Step 3: Sort by confidence score (highest first)
      const sortedRecommendations = recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
      
      // Step 4: Calculate response metadata
      const response = {
        recommendations: sortedRecommendations,
        overallConfidence: calculateOverallConfidence(sortedRecommendations),
        dataCompleteness: Math.round(validatedProfile._validation.criteriaCompleteness),
        constantVariablesComplete: validatedProfile._validation.constantsPresent,
        processedAt: new Date().toISOString()
      };
      
      console.log('✅ Career recommendations generated (Technical Spec v1.1):', {
        count: sortedRecommendations.length,
        avgConfidence: response.overallConfidence,
        completeness: response.dataCompleteness,
        constantsPresent: response.constantVariablesComplete
      });
      
      setRecommendationMetadata({
        overallConfidence: response.overallConfidence,
        dataCompleteness: response.dataCompleteness,
        constantVariablesComplete: response.constantVariablesComplete,
        processedAt: response.processedAt
      });
      
      return sortedRecommendations;
      
    } catch (error) {
      console.error('❌ Error in Career Recommendation Engine:', error);
      return generateFallbackRecommendations(rawProfile);
    }
  };

  /**
   * Fallback System for Low Data Quality
   */
  const generateFallbackRecommendations = (profile) => {
    console.log('🔄 Generating fallback recommendations...');
    
    return [
      {
        id: 'fallback_1',
        type: 'exploratory',
        title: 'Technology Explorer Path',
        description: 'Explore various technology roles to discover your passion and strengths',
        reasoning: 'Limited profile data detected - recommend exploration across multiple areas',
        confidence: 'low',
        confidenceScore: 35,
        match: 35,
        requiredSkills: ['Basic Programming', 'Problem Solving', 'Communication', 'Learning Mindset'],
        suggestedActions: [
          'Complete comprehensive skills assessment',
          'Try introductory courses in different tech areas',
          'Attend technology meetups and networking events'
        ],
        salaryRange: '$45k - $85k',
        marketDemand: 'medium',
        metadata: {
          criteriaUsed: [],
          missingCriteria: ['Most profile fields missing'],
          fallbackApplied: true,
          constantsScore: 0,
          specificsScore: 0
        }
      }
    ];
  };

  // ============================================================================
  // SCORING HELPER FUNCTIONS - MATCHING TECHNICAL SPEC
  // ============================================================================

  // Experience scoring
  const getExperienceScore = (experience) => {
    const expMap = {
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      '0': 0.2, '1': 0.3, '2': 0.4, '3': 0.5, '4': 0.6, '5': 0.7,
      'Complete beginner': 0.2, 'Some exposure': 0.4, 'Beginner': 0.5,
      'Intermediate': 0.7, 'Advanced': 0.9
    };
    return expMap[experience] || 0.5;
  };

  // Study field relevance
  const getStudyFieldRelevance = (field) => {
    if (!field) return 0.3;
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
    if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.8;
    if (fieldLower.includes('science') || fieldLower.includes('data')) return 0.7;
    if (fieldLower.includes('business') || fieldLower.includes('management')) return 0.6;
    return 0.4;
  };

  // Interest alignment
  const getInterestAlignment = (interests) => {
    if (!interests || interests.length === 0) return 0.3;
    const techKeywords = ['programming', 'coding', 'software', 'ai', 'data', 'web', 'mobile', 'technology'];
    const hasMatch = interests.some(interest => 
      techKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    return hasMatch ? 0.8 : 0.5;
  };

  // Transferable skill value
  const getTransferableSkillValue = (skills) => {
    if (!skills) return 0.3;
    const skillsLower = skills.toLowerCase();
    const valuableSkills = ['analytical', 'problem', 'logical', 'technical', 'creative', 'communication', 'leadership'];
    const matches = valuableSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.4 + (matches * 0.1), 0.9);
  };

  // Tech interest market alignment
  const getTechInterestMarketAlignment = (techInterests) => {
    if (!techInterests) return 0.3;
    const interestsLower = techInterests.toLowerCase();
    const hotTech = ['machine learning', 'ai', 'cloud', 'cybersecurity', 'blockchain', 'data science'];
    const matches = hotTech.filter(tech => interestsLower.includes(tech)).length;
    return Math.min(0.5 + (matches * 0.15), 0.95);
  };

  // Current role tech transition score
  const getCurrentRoleTechTransition = (currentRole) => {
    if (!currentRole) return 0.4;
    const roleLower = currentRole.toLowerCase();
    if (roleLower.includes('engineer') || roleLower.includes('developer')) return 0.9;
    if (roleLower.includes('analyst') || roleLower.includes('manager')) return 0.7;
    if (roleLower.includes('coordinator') || roleLower.includes('assistant')) return 0.5;
    return 0.6;
  };

  // Technology market demand
  const getTechnologyMarketDemand = (technologies) => {
    if (!technologies) return 0.3;
    const techLower = technologies.toLowerCase();
    const highDemandTech = ['python', 'javascript', 'react', 'aws', 'sql', 'java', 'nodejs'];
    const matches = highDemandTech.filter(tech => techLower.includes(tech)).length;
    return Math.min(0.5 + (matches * 0.1), 0.95);
  };

  // Publication score
  const getPublicationScore = (publications) => {
    if (!publications) return 0.2;
    const pubLower = publications.toLowerCase();
    if (pubLower.includes('none') || pubLower.includes('0')) return 0.2;
    if (pubLower.includes('1') || pubLower.includes('few')) return 0.6;
    if (pubLower.includes('several') || pubLower.includes('many')) return 0.8;
    return 0.7;
  };

  // Research tool proficiency
  const getResearchToolProficiency = (toolsUsed) => {
    if (!toolsUsed || toolsUsed.length === 0) return 0.3;
    const researchTools = ['jupyter', 'r', 'matlab', 'git', 'docker', 'python', 'spss'];
    const matches = toolsUsed.filter(tool => 
      researchTools.some(rTool => tool.toLowerCase().includes(rTool))
    ).length;
    return Math.min(0.4 + (matches * 0.1), 0.9);
  };

  // Time commitment flexibility
  const getTimeCommitmentFlexibility = (timeCommitment) => {
    const commitMap = { 
      'full-time': 0.9, 
      'part-time': 0.7, 
      'flexible': 0.8,
      'evenings': 0.6,
      'weekends': 0.5
    };
    return commitMap[timeCommitment?.toLowerCase()] || 0.6;
  };

  // Work preference market fit
  const getWorkPreferenceMarketFit = (workPreference) => {
    const prefMap = { 
      'remote': 0.9, 
      'hybrid': 0.8, 
      'onsite': 0.6,
      'flexible': 0.7
    };
    return prefMap[workPreference?.toLowerCase()] || 0.7;
  };

  // Education level alignment
  const getEducationLevelAlignment = (educationLevel) => {
    const levelMap = {
      'high school': 0.4, 
      'bachelor': 0.7, 
      'master': 0.9, 
      'phd': 0.95,
      'associate': 0.5,
      'bootcamp': 0.6
    };
    return levelMap[educationLevel?.toLowerCase()] || 0.6;
  };

  // Salary market realism
  const getSalaryMarketRealism = (targetSalary, yearsExperience) => {
    if (!targetSalary) return 0.5;
    const salaryNum = parseInt(targetSalary.replace(/[^\d]/g, ''));
    const expScore = getExperienceScore(yearsExperience);
    
    // Realistic salary ranges based on experience
    const expectedRange = {
      low: 40000 + (expScore * 60000),
      high: 80000 + (expScore * 100000)
    };
    
    if (salaryNum >= expectedRange.low && salaryNum <= expectedRange.high) {
      return 0.9; // Realistic
    } else if (salaryNum < expectedRange.low) {
      return 0.7; // Conservative
    } else {
      return 0.4; // Potentially unrealistic
    }
  };

  // Helper functions for extracting alignments
  const extractTechAlignment = (profile) => {
    const techKeys = [];
    if (profile.techInterests) techKeys.push(...profile.techInterests.split(',').map(t => t.trim()));
    if (profile.jobTechnologies) techKeys.push(...profile.jobTechnologies.split(',').map(t => t.trim()));
    return techKeys.length > 0 ? techKeys[0] : 'General Technology';
  };

  const extractResearchAlignment = (profile) => {
    if (profile.studyField && profile.studyField.toLowerCase().includes('research')) {
      return profile.studyField + ' Research';
    }
    return 'Technology Research';
  };

  const extractMarketFit = (profile) => {
    const workPref = profile.workPreference || 'flexible';
    const eduLevel = profile.educationLevel || 'bachelor';
    return `${workPref.charAt(0).toUpperCase() + workPref.slice(1)} ${eduLevel.charAt(0).toUpperCase() + eduLevel.slice(1)} Professional`;
  };

  // Title generation functions
  const generateTechRoleTitle = (techAlignment, experience) => {
    const expLevel = getExperienceScore(experience);
    const prefix = expLevel > 0.7 ? 'Senior ' : expLevel > 0.4 ? '' : 'Junior ';
    
    if (techAlignment.toLowerCase().includes('data') || techAlignment.toLowerCase().includes('ml')) {
      return `${prefix}Data Scientist`;
    }
    if (techAlignment.toLowerCase().includes('web') || techAlignment.toLowerCase().includes('frontend')) {
      return `${prefix}Frontend Developer`;
    }
    if (techAlignment.toLowerCase().includes('mobile')) {
      return `${prefix}Mobile Developer`;
    }
    return `${prefix}Software Developer`;
  };

  const generateResearchRoleTitle = (researchAlignment, experience) => {
    const expLevel = getExperienceScore(experience);
    const prefix = expLevel > 0.7 ? 'Senior Research ' : 'Research ';
    return `${prefix}Scientist - ${researchAlignment}`;
  };

  const generateLifestyleRoleTitle = (marketFit, experience) => {
    const expLevel = getExperienceScore(experience);
    const prefix = expLevel > 0.7 ? 'Senior ' : '';
    return `${prefix}${marketFit}`;
  };

  // Description generators
  const generateTechInterestDescription = (techAlignment, profile) => {
    return `Leverage your interest in ${techAlignment.toLowerCase()} to build innovative solutions and drive technical excellence in the industry.`;
  };

  const generateResearchDescription = (researchAlignment, profile) => {
    return `Conduct cutting-edge research in ${researchAlignment.toLowerCase()} with focus on practical applications and theoretical advancement.`;
  };

  const generateLifestyleDescription = (marketFit, profile) => {
    return `Apply technology skills in a ${marketFit.toLowerCase()} role that balances technical expertise with your lifestyle preferences.`;
  };

  // Reasoning generators
  const generateTechInterestReasoning = (profile, score) => {
    return `Based on your tech interests and ${score.criteriaCount} qualifying criteria with ${Math.round(score.totalScore)}% alignment score.`;
  };

  const generateResearchReasoning = (profile, score) => {
    return `Your research background and academic interests align ${Math.round(score.totalScore)}% with development opportunities.`;
  };

  const generateLifestyleReasoning = (profile, score) => {
    return `Considering your lifestyle preferences and career goals, this path offers ${Math.round(score.totalScore)}% compatibility.`;
  };

  // Skills extraction
  const extractTechInterestSkills = (techAlignment, profile) => {
    const baseSkills = ['Programming Fundamentals', 'Problem Solving', 'Version Control'];
    if (techAlignment.toLowerCase().includes('data')) {
      baseSkills.push('Data Analysis', 'Statistics', 'Python');
    } else if (techAlignment.toLowerCase().includes('web')) {
      baseSkills.push('HTML/CSS', 'JavaScript', 'Frameworks');
    }
    return baseSkills;
  };

  const extractResearchSkills = (researchAlignment, profile) => {
    return ['Research Methodology', 'Data Analysis', 'Technical Writing', 'Critical Thinking', 'Statistical Analysis'];
  };

  const extractLifestyleSkills = (marketFit, profile) => {
    return ['Project Management', 'Communication', 'Business Analysis', 'Team Collaboration', 'Adaptability'];
  };

  // Action generators
  const generateTechInterestActions = (profile, techAlignment) => {
    return [
      `Build portfolio projects showcasing ${techAlignment.toLowerCase()} skills`,
      'Contribute to open source projects in your area of interest',
      'Complete relevant technical certifications',
      'Network with professionals in your target field'
    ];
  };

  const generateResearchActions = (profile, researchAlignment) => {
    return [
      `Publish research papers in ${researchAlignment.toLowerCase()}`,
      'Attend academic conferences and workshops',
      'Collaborate on research projects with institutions',
      'Develop grant writing and funding skills'
    ];
  };

  const generateLifestyleActions = (profile, marketFit) => {
    return [
      'Develop business-focused technical projects',
      'Network with industry professionals in your preferred work style',
      'Gain certifications that align with your career goals',
      'Build a portfolio that showcases your unique value proposition'
    ];
  };

  // Market data functions
  const getTechInterestSalaryRange = (techAlignment, experience) => {
    const expScore = getExperienceScore(experience);
    const baseRange = { low: 50000, high: 90000 };
    
    if (techAlignment.toLowerCase().includes('data') || techAlignment.toLowerCase().includes('ai')) {
      baseRange.low += 10000;
      baseRange.high += 20000;
    }
    
    const adjustedLow = baseRange.low + (expScore * 30000);
    const adjustedHigh = baseRange.high + (expScore * 50000);
    
    return `$${Math.round(adjustedLow/1000)}k - $${Math.round(adjustedHigh/1000)}k`;
  };

  const getResearchSalaryRange = (researchAlignment, experience) => {
    const expScore = getExperienceScore(experience);
    const baseLow = 55000 + (expScore * 25000);
    const baseHigh = 95000 + (expScore * 40000);
    return `$${Math.round(baseLow/1000)}k - $${Math.round(baseHigh/1000)}k`;
  };

  const getLifestyleSalaryRange = (marketFit, targetSalary) => {
    if (targetSalary && isValid(targetSalary)) {
      const salaryNum = parseInt(targetSalary.replace(/[^\d]/g, ''));
      const range = salaryNum * 0.2;
      return `$${Math.round((salaryNum - range)/1000)}k - $${Math.round((salaryNum + range)/1000)}k`;
    }
    return '$60k - $110k';
  };

  // Market demand functions
  const getTechInterestMarketDemand = (techAlignment) => {
    const highDemandAreas = ['data', 'ai', 'cloud', 'cybersecurity', 'mobile'];
    const hasHighDemand = highDemandAreas.some(area => 
      techAlignment.toLowerCase().includes(area)
    );
    return hasHighDemand ? 'high' : 'medium';
  };

  const getResearchMarketDemand = (researchAlignment) => {
    return researchAlignment.toLowerCase().includes('data') ? 'high' : 'medium';
  };

  const getLifestyleMarketDemand = (marketFit) => {
    return marketFit.toLowerCase().includes('remote') ? 'high' : 'medium';
  };

  // ============================================================================
  // EXISTING FUNCTIONS (KEEPING FOR BACKWARD COMPATIBILITY)
  // ============================================================================

  // [Previous extraction functions remain the same...]
  const extractSkillsGapImproved = (text) => {
    // Implementation remains the same as in original code
    if (!text) return [];
    
    console.log('🔍 Extracting skills from analysis text...');
    const skills = [];
    const lines = text.split('\n');
    
    // Extract skills from SKILLS GAP sections
    let inSkillsSection = false;
    const skillsSectionKeywords = [
      'SKILLS GAP', 'SKILL GAP', 'SKILLS NEEDED', 'REQUIRED SKILLS', 
      'LEARNING REQUIREMENTS', 'COMPETENCY GAP', 'SKILL DEVELOPMENT',
      'TECHNICAL SKILLS', 'SKILL RECOMMENDATIONS'
    ];
    
    lines.forEach((line, index) => {
      if (skillsSectionKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inSkillsSection = true;
        return;
      }
      
      if (inSkillsSection && (
        line.toUpperCase().includes('NETWORKING') || 
        line.toUpperCase().includes('INTERVIEW') || 
        line.toUpperCase().includes('MARKET TRENDS') ||
        line.toUpperCase().includes('JOB SEARCH') ||
        line.toUpperCase().includes('PERSONAL BRANDING')
      )) {
        inSkillsSection = false;
        return;
      }
      
      if (inSkillsSection && line.trim() !== '') {
        const skill = parseSkillFromLine(line, text);
        if (skill) {
          skills.push(skill);
        }
      }
    });
    
    // Generate skills based on career recommendations if none found
    if (skills.length < 4 && careerPaths.length > 0) {
      const topCareerSkills = generateCareerSkills(careerPaths[0].title, userData);
      skills.push(...topCareerSkills);
    }
    
    return skills.slice(0, 8);
  };

  const parseSkillFromLine = (line, fullText) => {
    const cleanLine = line.replace(/^[-•*\d+\.\)\s]+/, '').trim();
    if (cleanLine.length < 5) return null;
    
    const skillFormats = [
      /^([^:]+):\s*(.+)$/,
      /^([^(]+)\s*\([^)]*\):\s*(.+)$/,
      /^([^-]+)\s*-\s*(.+)$/,
      /^([A-Z][A-Za-z\s\/\(\)\+]+)$/
    ];
    
    for (const format of skillFormats) {
      const match = cleanLine.match(format);
      if (match) {
        const skillName = match[1].trim();
        const description = match[2] ? match[2].trim() : `Important skill for your career transition`;
        
        if (isValidSkill(skillName)) {
          return createSkillObject(skillName, description, fullText);
        }
      }
    }
    
    if (isValidSkill(cleanLine)) {
      return createSkillObject(cleanLine, `Key skill identified from your analysis`, fullText);
    }
    
    return null;
  };

  const isValidSkill = (skillName) => {
    if (!skillName || skillName.length < 3 || skillName.length > 50) return false;
    
    const invalidTerms = [
      'section', 'analysis', 'summary', 'overview', 'recommendation', 'conclusion',
      'career', 'path', 'job', 'role', 'position', 'experience', 'background',
      'industry', 'field', 'area', 'domain', 'market', 'trend', 'opportunity',
      'and', 'or', 'the', 'for', 'with', 'that', 'this', 'you', 'your'
    ];
    
    const lowerName = skillName.toLowerCase();
    if (invalidTerms.some(term => lowerName === term || lowerName.startsWith(term + ' '))) {
      return false;
    }
    
    return /^[A-Za-z][A-Za-z\s\/\(\)\-\.\+\#]*$/.test(skillName) && 
           skillName.split(' ').length <= 4;
  };

  const createSkillObject = (skillName, description, analysisText) => {
    const currentLevel = assessCurrentSkillLevel(skillName, userData);
    const requiredLevel = assessRequiredSkillLevel(skillName, analysisText);
    
    return {
      name: skillName,
      description: description,
      currentLevel: currentLevel,
      requiredLevel: requiredLevel,
      gap: requiredLevel - currentLevel,
      category: categorizeSkill(skillName),
      learningPath: generateLearningPath(skillName, currentLevel, requiredLevel),  
      priority: requiredLevel - currentLevel >= 2 ? 'high' : 'medium'
    };
  };

  const assessCurrentSkillLevel = (skillName, userData) => {
    let level = 0;
    const skillLower = skillName.toLowerCase();
    
    const expLevelMap = {
      'Complete beginner': 0,
      'Some exposure': 1,
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3
    };
    level = expLevelMap[userData.experienceLevel] || 1;
    
    if (userData.toolsUsed && userData.toolsUsed.length > 0) {
      const hasRelatedTool = userData.toolsUsed.some(tool => 
        skillLower.includes(tool.toLowerCase()) || 
        tool.toLowerCase().includes(skillLower)
      );
      if (hasRelatedTool) level = Math.min(level + 1, 4);
    }
    
    return Math.max(0, Math.min(level, 4));
  };

  const assessRequiredSkillLevel = (skillName, analysisText) => {
    const skillLower = skillName.toLowerCase();
    let requiredLevel = 3;
    
    const skillContext = extractSkillContext(skillName, analysisText);
    if (skillContext) {
      if (skillContext.includes('essential') || skillContext.includes('critical')) {
        requiredLevel = 4;
      } else if (skillContext.includes('advanced') || skillContext.includes('expert')) {
        requiredLevel = 5;
      } else if (skillContext.includes('basic') || skillContext.includes('fundamental')) {
        requiredLevel = 2;
      }
    }
    
    return Math.max(2, Math.min(requiredLevel, 5));
  };

  const extractSkillContext = (skillName, text) => {
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes(skillName.toLowerCase())) {
        return line.toLowerCase();
      }
    }
    return null;
  };

  const categorizeSkill = (skillName) => {
    const skillLower = skillName.toLowerCase();
    
    if (skillLower.includes('communication') || skillLower.includes('teamwork') || 
        skillLower.includes('leadership') || skillLower.includes('management')) {
      return 'Soft Skills';
    } else if (skillLower.includes('design') || skillLower.includes('ui') || 
               skillLower.includes('ux') || skillLower.includes('visual')) {
      return 'Design';
    } else if (skillLower.includes('data') || skillLower.includes('analytics') || 
               skillLower.includes('statistics') || skillLower.includes('ml')) {
      return 'Data & Analytics';
    } else if (skillLower.includes('cloud') || skillLower.includes('devops') || 
               skillLower.includes('infrastructure')) {
      return 'Infrastructure';
    } else {
      return 'Technical Skills';
    }
  };

  const generateLearningPath = (skillName, currentLevel, requiredLevel) => {
    const gap = requiredLevel - currentLevel;
    const skillLower = skillName.toLowerCase();
    
    if (gap <= 0) {
      return "Maintain skills through advanced projects and stay updated with latest trends";
    } else if (gap === 1) {
      if (skillLower.includes('programming') || skillLower.includes('coding')) {
        return "Build intermediate projects and contribute to open source";
      } else {
        return "Practice with real-world scenarios and seek mentorship opportunities";
      }
    } else {
      if (skillLower.includes('programming') || skillLower.includes('coding')) {
        return "Start with fundamentals course, daily coding practice, and basic projects";
      } else {
        return "Begin with foundational courses and establish consistent learning routine";
      }
    }
  };

  const generateCareerSkills = (careerTitle, userData) => {
    const careerSpecificRequirements = {
      'Software Developer': [
        'Programming Languages',
        'Version Control (Git)',
        'Database Management',
        'API Development',
        'Testing Frameworks'
      ],
      'Data Scientist': [
        'Python Programming',
        'Statistical Analysis',
        'Machine Learning',
        'Data Visualization',
        'SQL Databases'
      ],
      'UX Designer': [
        'Design Thinking',
        'Prototyping Tools',
        'User Research',
        'Visual Design',
        'Frontend Fundamentals'
      ]
    };
    
    const skillNames = careerSpecificRequirements[careerTitle] || careerSpecificRequirements['Software Developer'];
    
    return skillNames.map(skillName => {
      const description = `Essential ${skillName.toLowerCase()} skills for ${careerTitle} roles`;
      return createSkillObject(skillName, description, `Required for ${careerTitle} career path`);
    }).slice(0, 5);
  };

  // Learning Roadmap extraction
  const extractLearningRoadmapImproved = (text) => {
    if (!text) return [];
    
    const roadmap = [];
    const lines = text.split('\n');
    
    let inRoadmapSection = false;
    const roadmapKeywords = ['LEARNING ROADMAP', 'ROADMAP', 'LEARNING PATH', 'STUDY PLAN'];
    
    lines.forEach((line, index) => {
      if (roadmapKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inRoadmapSection = true;
        return;
      }
      
      if (inRoadmapSection && (line.toUpperCase().includes('NETWORKING') || 
          line.toUpperCase().includes('INTERVIEW') || line.toUpperCase().includes('MARKET TRENDS'))) {
        inRoadmapSection = false;
        return;
      }
      
      if (inRoadmapSection && line.trim() !== '') {
        const phaseMatch = line.match(/^(Month\s+\d+|Phase\s+\d+|Week\s+\d+)[-:]?\s*(.+)/i);
        if (phaseMatch) {
          roadmap.push({
            phase: phaseMatch[1],
            title: phaseMatch[2].trim(),
            duration: phaseMatch[1],
            description: phaseMatch[2].trim(),
            skills: [],
            resources: []
          });
        } else if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const itemText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (itemText.length > 10 && roadmap.length > 0) {
            if (itemText.toLowerCase().includes('learn') || itemText.toLowerCase().includes('study')) {
              roadmap[roadmap.length - 1].skills.push(itemText);
            } else {
              roadmap[roadmap.length - 1].resources.push(itemText);
            }
          }
        }
      }
    });
    
    // Add default roadmap if none found
    if (roadmap.length === 0) {
      const defaultRoadmap = [
        {
          phase: 'Phase 1',
          title: 'Foundation Building',
          duration: 'Months 1-2',
          description: 'Build fundamental skills and understanding',
          skills: ['Basic Programming', 'Problem Solving', 'Technical Communication'],
          resources: ['Online courses', 'Practice exercises', 'Community forums']
        },
        {
          phase: 'Phase 2',
          title: 'Skill Development',
          duration: 'Months 3-4',
          description: 'Develop core technical skills for your target role',
          skills: ['Advanced Programming', 'Framework/Library Usage', 'Best Practices'],
          resources: ['Advanced courses', 'Documentation', 'Code reviews']
        },
        {
          phase: 'Phase 3',
          title: 'Project Building',
          duration: 'Months 5-6',
          description: 'Apply skills through hands-on projects',
          skills: ['Project Management', 'Full-Stack Development', 'Testing'],
          resources: ['Project tutorials', 'GitHub', 'Portfolio development']
        }
      ];
      
      roadmap.push(...defaultRoadmap);
    }
    
    return roadmap;
  };

  // Market trends generation functions (simplified for space)
  const generatePersonalizedMarketTrendsWithPaths = (careerPaths, userData) => {
    if (!careerPaths || careerPaths.length === 0) {
      return generateGenericMarketTrends();
    }

    const trends = [];
    const topCareer = careerPaths[0];

    trends.push({
      title: `${topCareer.title} SALARY OUTLOOK`,
      description: `Compensation trends specifically for ${topCareer.title} roles`,
      category: 'Salary Analysis',
      relevance: 'High',
      personalizedData: generatePersonalizedSalaryData(topCareer.title),
      userCareer: topCareer.title
    });

    trends.push({
      title: `${topCareer.title} MARKET DEMAND`,
      description: `Job market demand and growth prospects for ${topCareer.title}`,
      category: 'Industry Demand',
      relevance: 'High',
      personalizedData: generatePersonalizedDemandData(topCareer.title),
      userCareer: topCareer.title
    });

    return trends;
  };

  const generatePersonalizedSalaryData = (careerTitle) => {
    const salaryData = {
      ranges: ['$70,000 - $120,000 (Average)', '$50,000 - $80,000 (Entry Level)', '$100,000 - $160,000 (Senior Level)'],
      insights: ['High demand for technical skills', 'Remote work increases opportunities', 'Continuous learning essential'],
      growth: '8% year-over-year salary growth',
      comparison: '20% higher than national average'
    };
    return salaryData;
  };

  const generatePersonalizedDemandData = (careerTitle) => {
    const demandData = {
      growth: '22% faster than average growth rate', 
      opportunities: ['High demand in tech sector', 'Growing startup ecosystem', 'Remote work opportunities'],
      hotSkills: ['Programming', 'Cloud Technologies', 'Data Analysis', 'Problem Solving'],
      industries: ['Technology', 'Healthcare', 'Finance', 'E-commerce'],
      outlook: 'Excellent long-term prospects'
    };
    return demandData;
  };

  const generatePersonalizedJobMarketOutlook = (careerPaths, userData) => {
    if (!careerPaths || careerPaths.length === 0) {
      return generateGenericJobMarketOutlook();
    }

    const outlook = [];
    const topCareer = careerPaths[0];

    outlook.push({
      title: `${topCareer.title} Salary Trends`,
      description: `Current and projected salary trends for ${topCareer.title} professionals`,
      category: 'Salary Trends',
      growth: 'Strong',
      icon: '💰',
      personalizedData: {
        trends: ['Salaries increased 8% year-over-year', 'Remote work premium of 15%', 'Specialization commands higher rates'],
        projections: ['Continued growth expected', 'AI skills becoming valuable', 'Cross-functional skills in demand']
      },
      userCareer: topCareer.title
    });

    return outlook;
  };

  const generateGenericMarketTrends = () => {
    return [
      {
        title: 'TECHNOLOGY SALARY TRENDS',
        description: 'General compensation trends in technology sector',
        category: 'Salary Analysis',
        relevance: 'Medium'
      }
    ];
  };

  const generateGenericJobMarketOutlook = () => {
    return [
      {
        title: 'Technology Sector Growth',
        description: 'Overall growth trends in the technology industry',
        category: 'Industry Growth',
        growth: 'Strong',
        icon: '📈'
      }
    ];
  };

  // Other extraction functions (simplified)
  const extractNetworkingStrategyImproved = (text) => {
    return [
      { text: 'Join professional associations and industry groups', type: 'strategy' },
      { text: 'Attend virtual and in-person meetups and conferences', type: 'strategy' },
      { text: 'Connect with professionals on LinkedIn', type: 'strategy' }
    ];
  };

  const extractPersonalBrandingImproved = (text) => {
    return [
      { text: 'Create a professional LinkedIn profile', type: 'tip' },
      { text: 'Start a blog or social media presence', type: 'tip' },
      { text: 'Develop a consistent personal brand', type: 'tip' }
    ];
  };

  const extractInterviewPrepImproved = (text) => {
    return [
      { text: 'Practice coding challenges and technical questions', type: 'tip' },
      { text: 'Prepare STAR method examples', type: 'tip' },
      { text: 'Research common interview questions', type: 'tip' }
    ];
  };

  const extractPortfolioGuidanceImproved = (text) => {
    return [
      { text: 'Build a portfolio showcasing your projects', type: 'tip' },
      { text: 'Include projects that demonstrate your skills', type: 'tip' },
      { text: 'Create a compelling career narrative', type: 'tip' }
    ];
  };

  const extractJobSearchStrategiesImproved = (text) => {
    return [
      { text: 'Optimize your LinkedIn profile with relevant keywords', type: 'tip' },
      { text: 'Tailor your resume for each application', type: 'tip' },
      { text: 'Use tech-focused job boards', type: 'tip' }
    ];
  };

  const extractCareerGrowthResourcesImproved = (text) => {
    return [
      { text: 'Your motivation to transition demonstrates adaptability', type: 'tip' },
      { text: 'Willingness to learn shows commitment', type: 'tip' },
      { text: 'Taking assessment indicates proactive approach', type: 'tip' }
    ];
  };

  const extractCareerPathVisualizationsImproved = (text) => {
    return [];
  };

  // ============================================================================
  // COMPONENT LOGIC AND EFFECTS
  // ============================================================================

  // Animation effect for counters
  useEffect(() => {
    if (careerPaths.length > 0) {
      const timer = setTimeout(() => {
        careerPaths.forEach((path, index) => {
          const targetValue = path.confidenceScore || path.match || 0;
          let currentValue = 0;
          const increment = targetValue / 30;
          
          const countUp = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(countUp);
            }
            setAnimatedValues(prev => ({
              ...prev,
              [`path-${index}`]: Math.round(currentValue)
            }));
          }, 50);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [careerPaths]);

  // Main data loading effect with new recommendation system
  useEffect(() => {
    const loadData = async () => {
      try {
        let processedUserData = null;
        let generatedPaths = [];
        
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            
            // Map form data to the EXACT technical spec profile structure
            processedUserData = {
              // 4 Constant Variables (used in ALL recommendations)
              yearsExperience: formData.yearsExperience || formData.experienceLevel || '',
              studyField: formData.studyField || 'Not specified',
              interests: Array.isArray(formData.interests) 
                ? formData.interests 
                : (typeof formData.interests === 'string' ? formData.interests.split(',').map(i => i.trim()) : []),
              transferableSkills: formData.transferableSkills || '',
              
              // Recommendation 1 Specific (🎯 Tech-Interest Based)
              techInterests: formData.techInterests || '',
              currentRole: formData.currentRole || '',
              jobTechnologies: formData.jobTechnologies || '',
              
              // Recommendation 2 Specific (📚 Research/Development Based)
              publications: formData.publications || '',
              toolsUsed: formData.toolsUsed || [],
              timeCommitment: formData.timeCommitment || '',
              
              // Recommendation 3 Specific (⚖️ Lifestyle/Market Based)
              workPreference: formData.workPreference || '',
              educationLevel: formData.educationLevel || '',
              targetSalary: formData.targetSalary || '',
              
              // Additional Context
              name: formData.fullName || '',
              email: formData.email || '',
              experienceLevel: formData.experienceLevel || '',
              jobResponsibilities: formData.jobResponsibilities || '',
              jobProjects: formData.jobProjects || '',
              careerPathsInterest: formData.careerPathsInterest || [],
              transitionTimeline: formData.transitionTimeline || ''
            };
            
            setUserData(processedUserData);
            
            // Generate recommendations using the EXACT technical spec system
            generatedPaths = await generateAdvancedCareerRecommendations(processedUserData);
            setCareerPaths(generatedPaths);
            
            console.log('✅ Technical Spec recommendations generated:', generatedPaths.length);
          }
          
          // Extract other data from analysis
          const skills = extractSkillsGapImproved(analysisText);
          const roadmap = extractLearningRoadmapImproved(analysisText);
          const networking = extractNetworkingStrategyImproved(analysisText);
          const branding = extractPersonalBrandingImproved(analysisText);
          const interview = extractInterviewPrepImproved(analysisText);
          const portfolio = extractPortfolioGuidanceImproved(analysisText);
          const jobSearch = extractJobSearchStrategiesImproved(analysisText);
          const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
          const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
          
          setSkillsGap(skills);
          setLearningRoadmap(roadmap);
          setNetworkingStrategy(networking);
          setPersonalBranding(branding);
          setInterviewPrep(interview);
          setPortfolioGuidance(portfolio);
          setJobSearchStrategies(jobSearch);
          setCareerGrowthResources(careerGrowth);
          setCareerPathVisualizations(pathVisualizations);
          
        } else {
          // Handle stored data case
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const analysisText = storedAnalysis.analysis;
            setAnalysis(analysisText);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              // Map stored data to EXACT technical spec structure
              processedUserData = {
                // 4 Constant Variables
                yearsExperience: submission.yearsExperience || submission.experienceLevel || '',
                studyField: submission.studyField || 'Not specified',
                interests: Array.isArray(submission.interests) 
                  ? submission.interests 
                  : (typeof submission.interests === 'string' ? submission.interests.split(',').map(i => i.trim()) : []),
                transferableSkills: submission.transferableSkills || '',
                
                // Tech-Interest Based specific
                techInterests: submission.techInterests || '',
                currentRole: submission.currentRole || '',
                jobTechnologies: submission.jobTechnologies || '',
                
                // Research/Development Based specific
                publications: submission.publications || '',
                toolsUsed: submission.toolsUsed || [],
                timeCommitment: submission.timeCommitment || '',
                
                // Lifestyle/Market Based specific
                workPreference: submission.workPreference || '',
                educationLevel: submission.educationLevel || '',
                targetSalary: submission.targetSalary || '',
                
                // Additional Context
                name: submission.fullName || '',
                email: submission.email || '',
                experienceLevel: submission.experienceLevel || '',
                jobResponsibilities: submission.jobResponsibilities || '',
                jobProjects: submission.jobProjects || '',
                careerPathsInterest: submission.careerPathsInterest || [],
                transitionTimeline: submission.transitionTimeline || ''
              };
              
              setUserData(processedUserData);
              
              // Generate recommendations using technical spec
              generatedPaths = await generateAdvancedCareerRecommendations(processedUserData);
              setCareerPaths(generatedPaths);
              
              console.log('✅ Stored Technical Spec recommendations generated:', generatedPaths.length);
            }
            
            // Extract other data
            const skills = extractSkillsGapImproved(analysisText);
            const roadmap = extractLearningRoadmapImproved(analysisText);
            const networking = extractNetworkingStrategyImproved(analysisText);
            const branding = extractPersonalBrandingImproved(analysisText);
            const interview = extractInterviewPrepImproved(analysisText);
            const portfolio = extractPortfolioGuidanceImproved(analysisText);
            const jobSearch = extractJobSearchStrategiesImproved(analysisText);
            const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
            const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
            
            setSkillsGap(skills);
            setLearningRoadmap(roadmap);
            setNetworkingStrategy(networking);
            setPersonalBranding(branding);
            setInterviewPrep(interview);
            setPortfolioGuidance(portfolio);
            setJobSearchStrategies(jobSearch);
            setCareerGrowthResources(careerGrowth);
            setCareerPathVisualizations(pathVisualizations);
          } else {
            navigate('/career/test', { 
              state: { message: 'Please complete the assessment to view your dashboard' } 
            });
            return;
          }
        }
        
        // Generate personalized market trends and job outlook
        if (processedUserData && generatedPaths && generatedPaths.length > 0) {
          console.log('🎯 Generating market trends for technical spec recommendations...');
          
          const personalizedTrends = generatePersonalizedMarketTrendsWithPaths(generatedPaths, processedUserData);
          setMarketTrends(personalizedTrends);
          
          const personalizedOutlook = generatePersonalizedJobMarketOutlook(generatedPaths, processedUserData);
          setJobMarketOutlook(personalizedOutlook);
          
          console.log('✅ Market insights generated for technical spec recommendations');
        } else {
          console.log('⚠️ Using generic market insights');
          setMarketTrends(generateGenericMarketTrends());
          setJobMarketOutlook(generateGenericJobMarketOutlook());
        }
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        navigate('/career/test', { 
          state: { message: 'Error loading your results. Please try again.' } 
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [location, navigate]);

  // Generate next steps based on recommendations
  const generateNextSteps = () => {
    const steps = [];
    
    if (careerPaths.length > 0) {
      const topCareer = careerPaths[0];
      
      steps.push({
        title: `Focus on ${topCareer.title} Skills`,
        text: `Build expertise in the top requirements for ${topCareer.title} roles`,
        priority: 'high',
        icon: '🎯',
        timeline: '2-4 weeks',
        personalized: true,
        resources: topCareer.requiredSkills || []
      });
      
      if (topCareer.suggestedActions && topCareer.suggestedActions.length > 0) {
        topCareer.suggestedActions.forEach((action, index) => {
          if (index < 2) {
            steps.push({
              title: `Action ${index + 2}`,
              text: action,
              priority: index === 0 ? 'high' : 'medium',
              icon: ['💼', '📚', '🤝'][index] || '✅',
              timeline: '1-2 weeks',
              personalized: true,
              resources: []
            });
          }
        });
      }
    }
    
    if (skillsGap.length > 0) {
      const prioritySkills = skillsGap.filter(skill => skill.priority === 'high').slice(0, 2);
      prioritySkills.forEach(skill => {
        steps.push({
          title: `Learn ${skill.name}`,
          text: skill.learningPath || `Develop proficiency in ${skill.name} through structured learning`,
          priority: 'medium',
          icon: '📈',
          timeline: '3-4 weeks',
          personalized: true,
          resources: [skill.learningPath]
        });
      });
    }
    
    return steps.slice(0, 6);
  };

  // Create timeline visualization data
  const createTimelineData = () => {
    const timelineMap = {
      'Less than 6 months': 6,
      '6-12 months': 12,
      '1-2 years': 18,
      '2+ years': 24,
      'Already transitioning': 3
    };
    
    const months = timelineMap[userData.transitionTimeline] || 12;
    const milestones = [];
    
    if (months <= 6) {
      milestones.push(
        { month: 1, label: 'Start Learning', progress: 20, status: 'current' },
        { month: 3, label: 'Complete Basics', progress: 50, status: 'upcoming' },
        { month: 6, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    } else if (months <= 12) {
      milestones.push(
        { month: 2, label: 'Foundation', progress: 20, status: 'current' },
        { month: 4, label: 'Core Skills', progress: 40, status: 'upcoming' },
        { month: 6, label: 'Projects', progress: 60, status: 'upcoming' },
        { month: 9, label: 'Portfolio', progress: 80, status: 'upcoming' },
        { month: 12, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    } else {
      milestones.push(
        { month: 3, label: 'Foundation', progress: 15, status: 'current' },
        { month: 6, label: 'Core Skills', progress: 30, status: 'upcoming' },
        { month: 9, label: 'Specialization', progress: 45, status: 'upcoming' },
        { month: 12, label: 'Projects', progress: 60, status: 'upcoming' },
        { month: 15, label: 'Portfolio', progress: 80, status: 'upcoming' },
        { month: 18, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    }
    
    return milestones;
  };

  // Handle feedback form changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit feedback to Google Form
  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    
    try {
      const formData = new FormData();
      formData.append('entry.162050771', feedbackData.rating);
      formData.append('entry.2083196363', feedbackData.improvements);
      
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      toast.success('Thank you for your feedback!');
      setShowFeedbackForm(false);
      setFeedbackData({
        rating: '',
        improvements: ''
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // ============================================================================
  // UI COMPONENTS
  // ============================================================================

  // Enhanced Progress Bar Component
  const EnhancedProgressBar = ({ value, maxValue = 100, className = "from-blue-400 to-blue-600", showLabel = true }) => (
    <div className="relative">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r transition-all duration-1000 ease-out ${className}`}
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
    </div>
  );

  // Enhanced Career Path Card with technical spec data
  const CareerPathCard = ({ path, index }) => {
    const animatedValue = animatedValues[`path-${index}`] || 0;
    const colorClasses = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500', 
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    const colorClass = colorClasses[index % colorClasses.length];
    
    // Get algorithm-specific styling based on technical spec
    const getTypeIcon = (type) => {
      switch(type) {
        case 'tech-interest-based': return '🎯';
        case 'research-development': return '📚';
        case 'lifestyle-market': return '⚖️';
        default: return '📊';
      }
    };
    
    const getTypeLabel = (type) => {
      switch(type) {
        case 'tech-interest-based': return 'Tech-Interest Based';
        case 'research-development': return 'Research/Development';
        case 'lifestyle-market': return 'Lifestyle/Market';
        default: return 'General';
      }
    };
    
    return (
      <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getTypeIcon(path.type)}</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {getTypeLabel(path.type)}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-2">
                {path.title}
              </h3>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                {path.description}
              </p>
              
              <p className="text-sm text-green-700 italic">
                {path.reasoning}
              </p>
              
              {/* Show technical spec metadata */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  path.confidence === 'high' ? 'bg-green-100 text-green-700' :
                  path.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {path.confidence} confidence
                </span>
                <span className="text-xs text-gray-500">
                  Spec: v1.1
                </span>
              </div>
            </div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent ml-4`}>
              {animatedValue}%
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Confidence Score</span>
              <span className="text-sm text-gray-500">{animatedValue}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
                style={{ width: `${animatedValue}%` }}
              />
            </div>
          </div>
          
          {/* Show criteria used (from technical spec metadata) */}
          {path.metadata && path.metadata.criteriaUsed && path.metadata.criteriaUsed.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Criteria Used:</h5>
              <div className="flex flex-wrap gap-1">
                {path.metadata.criteriaUsed.slice(0, 4).map((criteria, idx) => (
                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {criteria}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Show required skills */}
          {path.requiredSkills && path.requiredSkills.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h5>
              <div className="flex flex-wrap gap-1">
                {path.requiredSkills.slice(0, 4).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Show suggested actions */}
          {path.suggestedActions && path.suggestedActions.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Next Steps:</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {path.suggestedActions.slice(0, 2).map((action, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-0.5">✓</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Salary:</span>
              <span className="text-xs font-medium text-gray-800">{path.salaryRange}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                path.marketDemand === 'high' ? 'bg-green-100 text-green-700' :
                path.marketDemand === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {path.marketDemand} demand
              </span>
              {path.metadata?.fallbackApplied && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                  Fallback Applied
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // [Rest of the UI components remain the same - SkillCard, LearningRoadmapCard, etc.]
  // Skill Card Component
  const SkillCard = ({ skill, index }) => {
    const gap = skill.gap || (skill.requiredLevel - skill.currentLevel);
    const progress = (skill.currentLevel / skill.requiredLevel) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{skill.name}</h4>
            <span className="text-sm text-gray-500">{skill.category || 'Technical Skill'}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            gap <= 1 ? 'bg-green-100 text-green-700' :
            gap === 2 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {gap <= 1 ? 'Almost there!' : gap === 2 ? 'Getting close' : 'Priority skill'}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Current Level</span>
              <span>{skill.currentLevel}/5</span>
            </div>
            <EnhancedProgressBar 
              value={progress} 
              className="from-blue-400 to-blue-600"
              showLabel={false}
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Target Level</span>
              <span>{skill.requiredLevel}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                style={{ width: `${(skill.requiredLevel / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {skill.description && (
          <p className="text-sm text-gray-600 mt-3">{skill.description}</p>
        )}
        
        {skill.learningPath && (
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium">Learning suggestion: {skill.learningPath}</p>
          </div>
        )}
      </div>
    );
  };

  // Learning Roadmap Card Component
  const LearningRoadmapCard = ({ roadmapItem, index }) => {
    const phaseColors = [
      'from-green-400 to-green-600',
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600'
    ];
    const colorClass = phaseColors[index % phaseColors.length];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center text-white font-bold mr-4`}>
            {index + 1}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{roadmapItem.phase || roadmapItem.title}</h4>
            <span className="text-sm text-gray-500">{roadmapItem.duration || roadmapItem.timeline || 'Ongoing'}</span>
          </div>
        </div>
        
        {roadmapItem.description && (
          <p className="text-gray-700 mb-4">{roadmapItem.description}</p>
        )}
        
        {roadmapItem.skills && roadmapItem.skills.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Key Skills:</h5>
            <div className="flex flex-wrap gap-2">
              {roadmapItem.skills.slice(0, 4).map((skill, skillIndex) => (
                <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {roadmapItem.resources && roadmapItem.resources.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Resources:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {roadmapItem.resources.slice(0, 3).map((resource, resourceIndex) => (
                <li key={resourceIndex} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colorClass} text-white`}>
              Phase {index + 1}
            </span>
            <span className="text-blue-600 font-medium text-sm">
              {roadmapItem.estimatedTime || `${2 + index} weeks`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Market Trends Card Component
  const MarketTrendsCard = ({ trend, index }) => {
    const trendIcons = {
      'SALARY OUTLOOK': '💰',
      'MARKET DEMAND': '📈',
      'SALARY TRENDS': '💰',
      'INDUSTRY DEMAND': '📊'
    };
    
    const icon = trendIcons[trend.title.split(' ').slice(-2).join(' ')] || '📊';
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{trend.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">Market Analysis</span>
              {trend.userCareer && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {trend.userCareer}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3">{trend.description}</p>
        
        {trend.personalizedData && (
          <div className="space-y-3">
            {trend.personalizedData.ranges && (
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">💰 Salary Ranges:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  {trend.personalizedData.ranges.slice(0, 3).map((range, idx) => (
                    <li key={idx}>• {range}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {trend.personalizedData.hotSkills && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">🔥 Hot Skills:</h5>
                <div className="flex flex-wrap gap-1">
                  {trend.personalizedData.hotSkills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4 border-t mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Relevance:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              trend.relevance === 'High' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {trend.relevance || 'High'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Job Market Outlook Card Component
  const JobMarketOutlookCard = ({ outlook, index }) => {
    const outlookIcons = ['💼', '📊', '🎯', '🌐', '💰', '📈'];
    const icon = outlook.icon || outlookIcons[index % outlookIcons.length];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{outlook.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">{outlook.category || 'Job Market'}</span>
              {outlook.userCareer && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {outlook.userCareer}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{outlook.description}</p>
        
        {outlook.personalizedData && (
          <div className="space-y-3">
            {outlook.personalizedData.trends && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">📈 Trends:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  {outlook.personalizedData.trends.slice(0, 3).map((trend, idx) => (
                    <li key={idx}>• {trend}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {outlook.growth && (
          <div className="pt-4 border-t mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Growth Outlook:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                outlook.growth === 'High' || outlook.growth === 'Strong' ? 'bg-green-100 text-green-700' :
                outlook.growth === 'Medium' || outlook.growth === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {outlook.growth || 'Positive'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Action Card Component
  const ActionCard = ({ step, index }) => {
    const priorityColors = {
      high: 'from-red-500 to-pink-500',
      medium: 'from-yellow-500 to-orange-500',
      low: 'from-gray-500 to-gray-600'
    };

    const icons = ['🎓', '💼', '🎨', '🤝', '📚', '🚀'];
    const icon = step.icon || icons[index % icons.length];

    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        step.personalized ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-300'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{step.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{step.timeline}</p>
                {step.personalized && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Personalized
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${priorityColors[step.priority || 'medium']} text-white`}>
            {(step.priority || 'MEDIUM').toUpperCase()}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">{step.text}</p>
        
        {step.resources && step.resources.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">Recommended Resources:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {step.resources.slice(0, 2).map((resource, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Debug Analysis Viewer Component
  const DebugAnalysisViewer = ({ analysis }) => {
    const [showDebug, setShowDebug] = useState(false);
    
    if (!showDebug) {
      return (
        <button 
          onClick={() => setShowDebug(true)}
          className="fixed bottom-24 right-8 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm z-40"
        >
          Debug Analysis
        </button>
      );
    }
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Raw Analysis Data</h3>
            <button 
              onClick={() => setShowDebug(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[80vh]">
            <pre className="text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded">
              {analysis}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // MAIN RENDER LOGIC
  // ============================================================================

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis (Technical Spec v1.1)..." />;
  }

  // Calculate quick stats using new recommendation data
  const topMatchPercentage = careerPaths.length > 0 ? Math.max(...careerPaths.map(p => p.confidenceScore || p.match || 0)) : 0;
  const skillsToLearn = skillsGap.filter(skill => skill.gap > 0).length;
  const highConfidenceCount = careerPaths.filter(p => p.confidence === 'high').length;
  const nextSteps = generateNextSteps();
  const timelineMilestones = createTimelineData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header with new metadata */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Career Recommendation System v1.1 with {recommendationMetadata.overallConfidence}% overall confidence
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole && userData.currentRole !== 'Not specified' && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  📍 Currently: {userData.currentRole}
                </div>
              )}
              {careerPaths.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  🎯 Top Match: {careerPaths[0].title} ({careerPaths[0].confidenceScore}%)
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  ⏰ Timeline: {userData.transitionTimeline}
                </div>
              )}
              {recommendationMetadata.dataCompleteness > 0 && (
                <div className="bg-green-500 bg-opacity-20 px-4 py-2 rounded-full border border-green-300">
                  ✅ {recommendationMetadata.dataCompleteness}% Profile Complete
                </div>
              )}
              {recommendationMetadata.constantVariablesComplete > 0 && (
                <div className="bg-purple-500 bg-opacity-20 px-4 py-2 rounded-full border border-purple-300">
                  🔬 {recommendationMetadata.constantVariablesComplete}/4 Constants Present
                </div>
              )}
              {highConfidenceCount > 0 && (
                <div className="bg-yellow-500 bg-opacity-20 px-4 py-2 rounded-full border border-yellow-300">
                  🏆 {highConfidenceCount} High-Confidence Recommendations
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'home', icon: '🏠', action: () => navigate('/') },
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'paths', label: 'Career Paths', icon: '🛤️' },
              { id: 'skills', label: 'Skills Gap', icon: '📈' },
              { id: 'roadmap', label: 'Learning Roadmap', icon: '🗺️' },
              { id: 'market', label: 'Market Insights', icon: '📈' },
              { id: 'action', label: 'Action Plan', icon: '🎯' },
              { id: 'resources', label: 'Resources', icon: '📚' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => tab.action ? tab.action() : setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  tab.id === 'home' 
                    ? 'border-transparent text-gray-600 hover:text-green-600 hover:bg-green-50'
                    : activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Top Match', value: `${topMatchPercentage}%`, color: 'from-green-500 to-emerald-500', icon: '🎯' },
                { label: 'Skills to Learn', value: skillsToLearn.toString(), color: 'from-blue-500 to-cyan-500', icon: '📚' },
                { label: 'Learning Phases', value: learningRoadmap.length.toString(), color: 'from-purple-500 to-pink-500', icon: '🗺️' },
                { label: 'Action Items', value: nextSteps.length.toString(), color: 'from-orange-500 to-red-500', icon: '✅' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800">{stat.label}</h3>
                </div>
              ))}
            </div>

            {/* Technical Spec Algorithm Quality Indicator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🔬</span>
                Technical Specification v1.1 - Recommendation Quality
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Confidence Score</span>
                  <span>{recommendationMetadata.overallConfidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                    style={{ width: `${recommendationMetadata.overallConfidence}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${recommendationMetadata.dataCompleteness > 70 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  Data Quality: {recommendationMetadata.dataCompleteness}%
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${careerPaths.length >= 3 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  Recommendations: {careerPaths.length}
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${recommendationMetadata.constantVariablesComplete >= 3 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  Constants: {recommendationMetadata.constantVariablesComplete}/4
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${highConfidenceCount > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  High Confidence: {highConfidenceCount}
                </div>
              </div>
              {recommendationMetadata.processedAt && (
                <div className="mt-4 text-xs text-gray-500">
                  Processed: {new Date(recommendationMetadata.processedAt).toLocaleString()} | 
                  Engine: Multi-Tier Recommendation with Fallback Logic | 
                  Algorithms: Tech-Interest, Research-Development, Lifestyle-Market
                </div>
              )}
            </div>

            {/* Enhanced Progress Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🚀</span>
                Your Journey Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {timelineMilestones.slice(0, 3).map((milestone, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                      milestone.status === 'current' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className={`font-semibold ${
                      milestone.status === 'current' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {milestone.label}
                    </h3>
                    <p className="text-sm text-gray-600">Month {milestone.month}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Next Steps Preview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <span className="mr-3">⚡</span>
                  Priority Actions
                </h2>
                <div className="flex items-center text-sm text-blue-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Technical Spec v1.1 Powered
                </div>
              </div>
              {careerPaths.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>Personalized for {userData.name}:</strong> Based on your {careerPaths[0].type} recommendation 
                    with {careerPaths[0].confidenceScore}% confidence score. Generated using {careerPaths[0].metadata?.criteriaUsed?.length || 0} criteria 
                    from the advanced multi-tier recommendation engine.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.slice(0, 4).map((step, index) => (
                  <div key={index} className={`${step.personalized ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-50 to-gray-100'} rounded-xl p-6 hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{step.icon}</span>
                        <h3 className="font-semibold text-gray-800">{step.title}</h3>
                      </div>
                      {step.personalized && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          Spec v1.1
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{step.text?.substring(0, 120) + (step.text?.length > 120 ? '...' : '')}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">{step.timeline}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        step.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {step.priority?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Technical Specification v1.1 - Career Recommendations</h2>
              <p className="text-gray-600 text-lg">
                Multi-tier recommendation engine with {recommendationMetadata.overallConfidence}% overall confidence
              </p>
              {careerPaths.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-4xl mx-auto">
                  <p className="text-sm text-blue-800">
                    <strong>🔬 Technical Specification Analysis:</strong> Our system implemented the exact technical specification 
                    using three specialized algorithms: Tech-Interest Based (🎯), Research/Development Based (📚), and 
                    Lifestyle/Market Based (⚖️). Each recommendation uses 4 constant variables plus 3 specific criteria, 
                    with dynamic weighting and fallback logic for optimal results.
                  </p>
                </div>
              )}
            </div>
            
            {careerPaths.length > 0 ? (
              <div className="space-y-6">
                {/* Technical Spec Algorithm Performance Summary */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold mb-4">Algorithm Performance Summary (Technical Spec v1.1)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {careerPaths.map((path, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{path.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            path.confidence === 'high' ? 'bg-green-100 text-green-700' :
                            path.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {path.confidenceScore}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{path.title}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          Criteria: {path.metadata?.criteriaUsed?.length || 0} used, {path.metadata?.missingCriteria?.length || 0} missing
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Constants: {Math.round(path.metadata?.constantsScore || 0)}% | 
                          Specifics: {Math.round(path.metadata?.specificsScore || 0)}%
                        </div>
                        {path.metadata?.fallbackApplied && (
                          <div className="mt-1">
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                              Fallback Applied
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Path Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {careerPaths.map((path, index) => (
                    <CareerPathCard key={index} path={path} index={index} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Generating Technical Spec v1.1 Recommendations</h3>
                <p className="text-gray-500">Our multi-tier recommendation engine is analyzing your profile using the advanced technical specification.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Skills Development Plan</h2>
              <p className="text-gray-600 text-lg">Focus areas to reach your career goals</p>
            </div>
            {skillsGap.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsGap.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Skills Analysis in Progress</h3>
                <p className="text-gray-500">Your personalized skill recommendations will appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Learning Roadmap</h2>
              <p className="text-gray-600 text-lg">Step-by-step learning path tailored to your goals</p>
            </div>
            {learningRoadmap.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {learningRoadmap.map((roadmapItem, index) => (
                  <LearningRoadmapCard key={index} roadmapItem={roadmapItem} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Your Roadmap</h3>
                <p className="text-gray-500">Your personalized learning path will be generated based on your assessment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Market Insights</h2>
              <p className="text-gray-600 text-lg">
                {careerPaths.length > 0 
                  ? `Personalized market analysis for your top career match: ${careerPaths[0].title}`
                  : 'Market trends and job outlook for your career path'
                }
              </p>
            </div>
            
            {/* Market Trends Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">📈</span>
                Market Analysis
              </h3>
              
              {marketTrends.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketTrends.map((trend, index) => (
                    <MarketTrendsCard key={index} trend={trend} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Generating Market Analysis</h4>
                  <p className="text-gray-500">Creating personalized market insights...</p>
                </div>
              )}
            </div>

            {/* Job Market Outlook Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">💼</span>
                Job Market Outlook
              </h3>
              
              {jobMarketOutlook.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobMarketOutlook.map((outlook, index) => (
                    <JobMarketOutlookCard key={index} outlook={outlook} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔮</div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Generating Job Market Analysis</h4>
                  <p className="text-gray-500">Creating job market insights...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'action' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Action Plan</h2>
              <p className="text-gray-600 text-lg">Technical Spec v1.1 generated step-by-step roadmap to success</p>
            </div>
            {nextSteps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.map((step, index) => (
                  <ActionCard key={index} step={step} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Your Action Plan</h3>
                <p className="text-gray-500">Your personalized action plan will be generated based on your assessment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Learning Resources & Tools</h2>
              <p className="text-gray-600 text-lg">Curated resources to accelerate your journey</p>
            </div>
            
            {/* Quick Actions Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-sm font-medium">Export</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/test')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-medium">Retake</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/learning')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium">Learning</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/interviews')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="text-sm font-medium">Interviews</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/guide')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Guide</span>
                </button>
                
                <a 
                  href="https://techtalentscity.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">Projects</span>
                </a>
              </div>
            </div>

            {/* Resource Sections */}
            {portfolioGuidance.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  Transition Strategy
                </h3>
                <div className="space-y-4">
                  {portfolioGuidance.filter(item => item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {jobSearchStrategies.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🔍</span>
                  Job Search Strategies
                </h3>
                <div className="space-y-4">
                  {jobSearchStrategies.filter(item => item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {careerGrowthResources.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">💪</span>
                  Strengths Analysis
                </h3>
                <div className="space-y-4">
                  {careerGrowthResources.filter(item => item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Debug Analysis Viewer */}
      {analysis && <DebugAnalysisViewer analysis={analysis} />}

      {/* Enhanced Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group z-50"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Enhanced Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Your Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={submitFeedback} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience on our platform on a scale of 1 to 5, with 5 being excellent and 1 being poor?
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleFeedbackChange({ target: { name: 'rating', value: value.toString() } })}
                        className={`w-14 h-14 rounded-full border-2 transition-all transform hover:scale-110 ${
                          feedbackData.rating === value.toString()
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-500 shadow-lg'
                            : 'border-gray-300 hover:border-red-500 hover:shadow-md'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Share any improvement suggestions you have
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackData.improvements}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none font-medium"
                  >
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
