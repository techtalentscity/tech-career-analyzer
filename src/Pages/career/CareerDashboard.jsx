// src/Pages/career/CareerDashboard.jsx - COMPLETE ENHANCED VERSION WITH ADVANCED RECOMMENDATION ENGINE
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
  
  // Enhanced user data model matching technical spec
  const [userData, setUserData] = useState({
    // Constant Variables (used in all recommendations)
    yearsExperience: '',
    studyField: '',
    interests: [],
    transferableSkills: '',
    
    // Recommendation 1 Specific (Tech-Market)
    jobTechnologies: '',
    toolsUsed: [],
    
    // Recommendation 2 Specific (Academic-Research)
    educationLevel: '',
    publications: '',
    techInterests: '',
    
    // Recommendation 3 Specific (Practical-Lifestyle)
    workPreference: '',
    timeCommitment: '',
    currentRole: '',
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
  
  // Recommendation metadata
  const [recommendationMetadata, setRecommendationMetadata] = useState({
    overallConfidence: 0,
    dataCompleteness: 0,
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
  // ADVANCED CAREER RECOMMENDATION SYSTEM (BASED ON TECHNICAL SPEC)
  // ============================================================================

  /**
   * Data Validation Layer - Input sanitization and completeness scoring
   */
  const validateProfile = (profile) => {
    console.log('🔍 Validating user profile...');
    
    const validation = {
      constantsPresent: countValidConstants(profile),
      criteriaCompleteness: assessCompleteness(profile),
      requiresFallback: needsFallback(profile),
      dataQuality: calculateDataQuality(profile)
    };
    
    return {
      ...profile,
      _validation: validation
    };
  };

  const isValid = (value) => {
    if (!value) return false;
    if (typeof value === 'string') {
      const invalid = ['', 'none', 'not sure', 'unclear', 'n/a', 'not specified'];
      return !invalid.includes(value.toLowerCase().trim());
    }
    if (Array.isArray(value)) {
      return value.length > 0 && !value.some(v => ['not sure', 'unclear', 'none'].includes(v?.toLowerCase()));
    }
    return true;
  };

  const countValidConstants = (profile) => {
    const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    return constants.filter(key => isValid(profile[key])).length;
  };

  const assessCompleteness = (profile) => {
    const allFields = [
      'yearsExperience', 'studyField', 'interests', 'transferableSkills',
      'jobTechnologies', 'toolsUsed', 'educationLevel', 'publications', 
      'techInterests', 'workPreference', 'timeCommitment', 'currentRole', 'targetSalary'
    ];
    const validFields = allFields.filter(key => isValid(profile[key])).length;
    return (validFields / allFields.length) * 100;
  };

  const needsFallback = (profile) => {
    return countValidConstants(profile) < 2;
  };

  const calculateDataQuality = (profile) => {
    const completeness = assessCompleteness(profile);
    const constantsQuality = (countValidConstants(profile) / 4) * 100;
    return (completeness * 0.7) + (constantsQuality * 0.3);
  };

  /**
   * Dynamic Weight Calculation System
   */
  const calculateDynamicWeights = (profile, criteria) => {
    const missingConstants = 4 - countValidConstants(profile);
    const missingSpecific = countMissingSpecific(profile, criteria.specific);
    
    let constantWeight = 0.4;  // Default: 40%
    let specificWeight = 0.6;  // Default: 60%
    
    // Fallback logic
    if (missingConstants >= 1) {
      constantWeight = Math.max(0.1, 0.4 - (missingConstants * 0.1));
      specificWeight = 1 - constantWeight;
    }
    
    if (missingConstants >= 3) {
      constantWeight = 0.1;
      specificWeight = 0.9;
    }
    
    return distributeWeights(constantWeight, specificWeight, criteria);
  };

  const countMissingSpecific = (profile, specificFields) => {
    return specificFields.filter(field => !isValid(profile[field])).length;
  };

  const distributeWeights = (constantWeight, specificWeight, criteria) => {
    const constantFieldCount = 4;
    const specificFieldCount = criteria.specific.length;
    
    return {
      // Constant weights
      yearsExperience: constantWeight / constantFieldCount,
      studyField: constantWeight / constantFieldCount,
      interests: constantWeight / constantFieldCount,
      transferableSkills: constantWeight / constantFieldCount,
      
      // Specific weights (distributed based on criteria type)
      ...criteria.specific.reduce((acc, field) => {
        acc[field] = specificWeight / specificFieldCount;
        return acc;
      }, {})
    };
  };

  /**
   * Recommendation Engine 1: Tech-Market Alignment
   */
  const generateTechMarketRecommendation = (validatedProfile) => {
    console.log('🚀 Generating Tech-Market recommendation...');
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['jobTechnologies', 'toolsUsed']
    };
    
    const weights = calculateDynamicWeights(validatedProfile, criteria);
    const score = calculateTechMarketScore(validatedProfile, weights);
    const confidence = determineConfidence(score.criteriaCount, score.totalScore);
    
    return {
      id: 'rec_1_tech_market',
      type: 'tech-market',
      title: generateTechRoleTitle(score.techStack, validatedProfile.yearsExperience),
      description: generateTechDescription(score.techStack, validatedProfile),
      reasoning: generateTechReasoning(validatedProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      requiredSkills: extractTechSkills(score.techStack, validatedProfile),
      suggestedActions: generateTechActions(validatedProfile, score.techStack),
      salaryRange: getTechSalaryRange(score.techStack, validatedProfile.yearsExperience),
      marketDemand: getTechMarketDemand(score.techStack),
      metadata: {
        criteriaUsed: getCriteriaUsed(validatedProfile, criteria),
        missingCriteria: getMissingCriteria(validatedProfile, criteria),
        fallbackApplied: score.criteriaCount < 4,
        techStack: score.techStack,
        algorithm: 'tech-market-v1.0'
      }
    };
  };

  const calculateTechMarketScore = (profile, weights) => {
    let score = 0;
    let criteriaCount = 0;
    let techStack = [];
    
    // Constant variables scoring
    if (isValid(profile.yearsExperience)) {
      score += weights.yearsExperience * getExperienceScore(profile.yearsExperience) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.studyField)) {
      score += weights.studyField * getStudyFieldTechAlignment(profile.studyField) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.interests)) {
      const interestScore = getTechInterestAlignment(profile.interests);
      score += weights.interests * interestScore * 100;
      criteriaCount++;
      if (interestScore > 0.7) {
        techStack.push(...extractTechFromInterests(profile.interests));
      }
    }
    
    if (isValid(profile.transferableSkills)) {
      score += weights.transferableSkills * getTechSkillRelevance(profile.transferableSkills) * 100;
      criteriaCount++;
    }
    
    // Specific criteria scoring
    if (isValid(profile.jobTechnologies)) {
      const techScore = getTechnologyMarketDemand(profile.jobTechnologies);
      score += weights.jobTechnologies * techScore * 100;
      criteriaCount++;
      techStack.push(...extractTechnologies(profile.jobTechnologies));
    }
    
    if (isValid(profile.toolsUsed)) {
      score += weights.toolsUsed * getToolProficiencyScore(profile.toolsUsed) * 100;
      criteriaCount++;
      techStack.push(...profile.toolsUsed);
    }
    
    return { 
      totalScore: Math.min(score / criteriaCount, 100), 
      criteriaCount, 
      techStack: [...new Set(techStack)] // Remove duplicates
    };
  };

  /**
   * Recommendation Engine 2: Academic-Research Alignment
   */
  const generateAcademicResearchRecommendation = (validatedProfile) => {
    console.log('🎓 Generating Academic-Research recommendation...');
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['educationLevel', 'publications', 'techInterests']
    };
    
    const weights = calculateDynamicWeights(validatedProfile, criteria);
    const score = calculateAcademicScore(validatedProfile, weights);
    const confidence = determineConfidence(score.criteriaCount, score.totalScore);
    
    return {
      id: 'rec_2_academic_research',
      type: 'academic-research',
      title: generateAcademicRoleTitle(score.researchArea, validatedProfile.educationLevel),
      description: generateAcademicDescription(score.researchArea, validatedProfile),
      reasoning: generateAcademicReasoning(validatedProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      requiredSkills: extractAcademicSkills(score.researchArea, validatedProfile),
      suggestedActions: generateAcademicActions(validatedProfile, score.researchArea),
      salaryRange: getAcademicSalaryRange(score.researchArea, validatedProfile.educationLevel),
      marketDemand: getAcademicMarketDemand(score.researchArea),
      metadata: {
        criteriaUsed: getCriteriaUsed(validatedProfile, criteria),
        missingCriteria: getMissingCriteria(validatedProfile, criteria),
        fallbackApplied: score.criteriaCount < 4,
        researchArea: score.researchArea,
        algorithm: 'academic-research-v1.0'
      }
    };
  };

  const calculateAcademicScore = (profile, weights) => {
    let score = 0;
    let criteriaCount = 0;
    let researchArea = 'General Technology Research';
    
    // Constant variables scoring (same as tech-market)
    if (isValid(profile.yearsExperience)) {
      score += weights.yearsExperience * getExperienceScore(profile.yearsExperience) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.studyField)) {
      const studyScore = getStudyFieldAcademicAlignment(profile.studyField);
      score += weights.studyField * studyScore * 100;
      criteriaCount++;
      if (studyScore > 0.7) {
        researchArea = generateResearchArea(profile.studyField);
      }
    }
    
    if (isValid(profile.interests)) {
      score += weights.interests * getAcademicInterestAlignment(profile.interests) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.transferableSkills)) {
      score += weights.transferableSkills * getAcademicSkillRelevance(profile.transferableSkills) * 100;
      criteriaCount++;
    }
    
    // Academic-specific criteria
    if (isValid(profile.educationLevel)) {
      score += weights.educationLevel * getEducationLevelScore(profile.educationLevel) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.publications)) {
      score += weights.publications * getPublicationScore(profile.publications) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.techInterests)) {
      const interestScore = getResearchInterestAlignment(profile.techInterests);
      score += weights.techInterests * interestScore * 100;
      criteriaCount++;
      if (interestScore > 0.6) {
        researchArea = generateResearchAreaFromInterests(profile.techInterests);
      }
    }
    
    return { 
      totalScore: Math.min(score / criteriaCount, 100), 
      criteriaCount, 
      researchArea 
    };
  };

  /**
   * Recommendation Engine 3: Practical-Lifestyle Alignment
   */
  const generatePracticalLifestyleRecommendation = (validatedProfile) => {
    console.log('🎯 Generating Practical-Lifestyle recommendation...');
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['workPreference', 'timeCommitment', 'currentRole', 'targetSalary']
    };
    
    const weights = calculateDynamicWeights(validatedProfile, criteria);
    const score = calculatePracticalScore(validatedProfile, weights);
    const confidence = determineConfidence(score.criteriaCount, score.totalScore);
    
    return {
      id: 'rec_3_practical_lifestyle',
      type: 'practical-lifestyle',
      title: generatePracticalRoleTitle(score.roleType, validatedProfile.workPreference),
      description: generatePracticalDescription(score.roleType, validatedProfile),
      reasoning: generatePracticalReasoning(validatedProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      requiredSkills: extractPracticalSkills(score.roleType, validatedProfile),
      suggestedActions: generatePracticalActions(validatedProfile, score.roleType),
      salaryRange: getPracticalSalaryRange(score.roleType, validatedProfile.targetSalary),
      marketDemand: getPracticalMarketDemand(score.roleType),
      metadata: {
        criteriaUsed: getCriteriaUsed(validatedProfile, criteria),
        missingCriteria: getMissingCriteria(validatedProfile, criteria),
        fallbackApplied: score.criteriaCount < 4,
        roleType: score.roleType,
        algorithm: 'practical-lifestyle-v1.0'
      }
    };
  };

  const calculatePracticalScore = (profile, weights) => {
    let score = 0;
    let criteriaCount = 0;
    let roleType = 'Technology Professional';
    
    // Constant variables scoring (same as others)
    if (isValid(profile.yearsExperience)) {
      score += weights.yearsExperience * getExperienceScore(profile.yearsExperience) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.studyField)) {
      score += weights.studyField * getStudyFieldPracticalAlignment(profile.studyField) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.interests)) {
      score += weights.interests * getPracticalInterestAlignment(profile.interests) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.transferableSkills)) {
      score += weights.transferableSkills * getPracticalSkillRelevance(profile.transferableSkills) * 100;
      criteriaCount++;
    }
    
    // Practical-specific criteria
    if (isValid(profile.workPreference)) {
      score += weights.workPreference * getWorkPreferenceScore(profile.workPreference) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.timeCommitment)) {
      score += weights.timeCommitment * getTimeCommitmentScore(profile.timeCommitment) * 100;
      criteriaCount++;
    }
    
    if (isValid(profile.currentRole)) {
      const roleScore = getCurrentRoleTransitionScore(profile.currentRole);
      score += weights.currentRole * roleScore * 100;
      criteriaCount++;
      if (roleScore > 0.6) {
        roleType = generateRoleType(profile.currentRole);
      }
    }
    
    if (isValid(profile.targetSalary)) {
      score += weights.targetSalary * getTargetSalaryRealisticScore(profile.targetSalary) * 100;
      criteriaCount++;
    }
    
    return { 
      totalScore: Math.min(score / criteriaCount, 100), 
      criteriaCount, 
      roleType 
    };
  };

  /**
   * Confidence Scoring System
   */
  const determineConfidence = (criteriaCount, totalScore) => {
    const maxCriteria = 7; // Maximum possible criteria per recommendation
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
   * Main Recommendation Generation Function
   */
  const generateAdvancedCareerRecommendations = async (rawProfile) => {
    console.log('🎯 Starting Advanced Career Recommendation Engine...');
    
    try {
      // Step 1: Validate and prepare profile
      const validatedProfile = validateProfile(rawProfile);
      
      // Step 2: Generate all three types of recommendations
      const recommendations = [
        generateTechMarketRecommendation(validatedProfile),
        generateAcademicResearchRecommendation(validatedProfile),
        generatePracticalLifestyleRecommendation(validatedProfile)
      ];
      
      // Step 3: Sort by confidence score
      const sortedRecommendations = recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
      
      // Step 4: Calculate metadata
      const metadata = {
        overallConfidence: calculateOverallConfidence(sortedRecommendations),
        dataCompleteness: Math.round(validatedProfile._validation.criteriaCompleteness),
        processedAt: new Date().toISOString(),
        algorithmVersion: '1.0.0',
        totalRecommendations: sortedRecommendations.length
      };
      
      console.log('✅ Advanced recommendations generated:', {
        count: sortedRecommendations.length,
        avgConfidence: metadata.overallConfidence,
        completeness: metadata.dataCompleteness
      });
      
      setRecommendationMetadata(metadata);
      return sortedRecommendations;
      
    } catch (error) {
      console.error('❌ Error generating advanced recommendations:', error);
      return generateFallbackRecommendations(rawProfile);
    }
  };

  /**
   * Fallback System for Low Data Quality
   */
  const generateFallbackRecommendations = (profile) => {
    console.log('🔄 Generating fallback recommendations...');
    
    const fallbackRecs = [
      {
        id: 'fallback_1',
        type: 'exploratory',
        title: 'Technology Explorer',
        description: 'Explore various technology roles to find your passion',
        reasoning: 'Limited profile data - explore multiple paths',
        confidence: 'low',
        confidenceScore: 35,
        match: 35,
        requiredSkills: ['Basic Programming', 'Problem Solving', 'Communication'],
        suggestedActions: [
          'Complete skills assessment',
          'Try online coding tutorials',
          'Attend tech meetups'
        ],
        salaryRange: '$45k - $85k',
        marketDemand: 'medium',
        metadata: {
          criteriaUsed: [],
          missingCriteria: ['Most profile fields'],
          fallbackApplied: true,
          algorithm: 'fallback-v1.0'
        }
      }
    ];
    
    return fallbackRecs;
  };

  // ============================================================================
  // SCORING HELPER FUNCTIONS
  // ============================================================================

  const getExperienceScore = (experience) => {
    const expMap = {
      '0': 0.2, '1': 0.3, '2': 0.4, '3': 0.5, '4': 0.6, '5': 0.7,
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      'Complete beginner': 0.2, 'Some exposure': 0.4, 'Beginner': 0.5,
      'Intermediate': 0.7, 'Advanced': 0.9
    };
    return expMap[experience] || 0.5;
  };

  const getStudyFieldTechAlignment = (field) => {
    if (!field) return 0.3;
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
    if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.8;
    if (fieldLower.includes('science') || fieldLower.includes('data')) return 0.7;
    return 0.4;
  };

  const getTechInterestAlignment = (interests) => {
    if (!interests || interests.length === 0) return 0.3;
    const techKeywords = ['programming', 'coding', 'software', 'ai', 'data', 'web', 'mobile'];
    const hasMatch = interests.some(interest => 
      techKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    return hasMatch ? 0.8 : 0.4;
  };

  const getTechSkillRelevance = (skills) => {
    if (!skills) return 0.3;
    const skillsLower = skills.toLowerCase();
    const techSkills = ['analytical', 'problem', 'logical', 'technical', 'creative'];
    const matches = techSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.4 + (matches * 0.15), 0.9);
  };

  const getTechnologyMarketDemand = (technologies) => {
    if (!technologies) return 0.3;
    const techLower = technologies.toLowerCase();
    const highDemand = ['python', 'javascript', 'react', 'aws', 'sql', 'java'];
    const matches = highDemand.filter(tech => techLower.includes(tech)).length;
    return Math.min(0.5 + (matches * 0.1), 0.95);
  };

  const getToolProficiencyScore = (tools) => {
    if (!tools || tools.length === 0) return 0.3;
    return Math.min(0.5 + (tools.length * 0.1), 0.9);
  };

  // Academic scoring functions
  const getStudyFieldAcademicAlignment = (field) => {
    if (!field) return 0.3;
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes('phd') || fieldLower.includes('research')) return 0.9;
    if (fieldLower.includes('master') || fieldLower.includes('science')) return 0.8;
    return 0.5;
  };

  const getAcademicInterestAlignment = (interests) => {
    if (!interests || interests.length === 0) return 0.3;
    const academicKeywords = ['research', 'analysis', 'theory', 'study', 'academic'];
    const hasMatch = interests.some(interest => 
      academicKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    return hasMatch ? 0.8 : 0.4;
  };

  const getAcademicSkillRelevance = (skills) => {
    if (!skills) return 0.3;
    const skillsLower = skills.toLowerCase();
    const academicSkills = ['research', 'analytical', 'writing', 'critical thinking'];
    const matches = academicSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.4 + (matches * 0.15), 0.9);
  };

  const getEducationLevelScore = (level) => {
    const levelMap = {
      'high school': 0.3, 'bachelor': 0.6, 'master': 0.8, 'phd': 0.95
    };
    return levelMap[level?.toLowerCase()] || 0.5;
  };

  const getPublicationScore = (publications) => {
    if (!publications) return 0.2;
    const pubLower = publications.toLowerCase();
    if (pubLower.includes('none') || pubLower.includes('0')) return 0.2;
    if (pubLower.includes('1') || pubLower.includes('few')) return 0.6;
    return 0.8;
  };

  const getResearchInterestAlignment = (interests) => {
    if (!interests) return 0.3;
    const researchKeywords = ['machine learning', 'ai', 'data science', 'algorithms'];
    const hasMatch = researchKeywords.some(keyword => interests.toLowerCase().includes(keyword));
    return hasMatch ? 0.8 : 0.4;
  };

  // Practical scoring functions
  const getStudyFieldPracticalAlignment = (field) => {
    if (!field) return 0.4;
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes('business') || fieldLower.includes('management')) return 0.8;
    if (fieldLower.includes('engineering') || fieldLower.includes('computer')) return 0.7;
    return 0.5;
  };

  const getPracticalInterestAlignment = (interests) => {
    if (!interests || interests.length === 0) return 0.4;
    const practicalKeywords = ['building', 'creating', 'solving', 'helping', 'business'];
    const hasMatch = interests.some(interest => 
      practicalKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    return hasMatch ? 0.8 : 0.5;
  };

  const getPracticalSkillRelevance = (skills) => {
    if (!skills) return 0.4;
    const skillsLower = skills.toLowerCase();
    const practicalSkills = ['communication', 'teamwork', 'leadership', 'project management'];
    const matches = practicalSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.5 + (matches * 0.1), 0.9);
  };

  const getWorkPreferenceScore = (preference) => {
    const prefMap = { 'remote': 0.8, 'hybrid': 0.9, 'onsite': 0.7 };
    return prefMap[preference?.toLowerCase()] || 0.6;
  };

  const getTimeCommitmentScore = (commitment) => {
    const commitMap = { 'full-time': 0.9, 'part-time': 0.7, 'flexible': 0.6 };
    return commitMap[commitment?.toLowerCase()] || 0.6;
  };

  const getCurrentRoleTransitionScore = (role) => {
    if (!role) return 0.4;
    const roleLower = role.toLowerCase();
    if (roleLower.includes('manager') || roleLower.includes('analyst')) return 0.8;
    if (roleLower.includes('developer') || roleLower.includes('engineer')) return 0.9;
    return 0.6;
  };

  const getTargetSalaryRealisticScore = (salary) => {
    if (!salary) return 0.5;
    // This would normally check against market data
    return 0.7;
  };

  // Title generation functions
  const generateTechRoleTitle = (techStack, experience) => {
    const expLevel = getExperienceScore(experience);
    const prefix = expLevel > 0.7 ? 'Senior ' : expLevel > 0.4 ? '' : 'Junior ';
    
    if (techStack.includes('python') || techStack.includes('data')) {
      return `${prefix}Data Scientist`;
    }
    if (techStack.includes('react') || techStack.includes('javascript')) {
      return `${prefix}Frontend Developer`;
    }
    return `${prefix}Software Developer`;
  };

  const generateAcademicRoleTitle = (researchArea, educationLevel) => {
    const level = getEducationLevelScore(educationLevel);
    const prefix = level > 0.8 ? 'Research ' : 'Junior Research ';
    return `${prefix}Scientist - ${researchArea}`;
  };

  const generatePracticalRoleTitle = (roleType, workPreference) => {
    const remote = workPreference?.toLowerCase() === 'remote' ? 'Remote ' : '';
    return `${remote}${roleType}`;
  };

  // Helper functions for metadata
  const getCriteriaUsed = (profile, criteria) => {
    const allCriteria = [...criteria.constants, ...criteria.specific];
    return allCriteria.filter(key => isValid(profile[key]));
  };

  const getMissingCriteria = (profile, criteria) => {
    const allCriteria = [...criteria.constants, ...criteria.specific];
    return allCriteria.filter(key => !isValid(profile[key]));
  };

  // Additional helper functions
  const extractTechFromInterests = (interests) => {
    const techMap = {
      'web': ['HTML', 'CSS', 'JavaScript'],
      'data': ['Python', 'SQL', 'Analytics'],
      'mobile': ['React Native', 'Flutter']
    };
    
    const techs = [];
    interests.forEach(interest => {
      Object.keys(techMap).forEach(key => {
        if (interest.toLowerCase().includes(key)) {
          techs.push(...techMap[key]);
        }
      });
    });
    
    return techs;
  };

  const extractTechnologies = (techString) => {
    return techString.split(',').map(tech => tech.trim()).filter(Boolean);
  };

  const generateResearchArea = (studyField) => {
    const fieldLower = studyField.toLowerCase();
    if (fieldLower.includes('computer')) return 'Computer Science Research';
    if (fieldLower.includes('data')) return 'Data Science Research';
    return 'Technology Research';
  };

  const generateResearchAreaFromInterests = (interests) => {
    const interestsLower = interests.toLowerCase();
    if (interestsLower.includes('machine learning')) return 'Machine Learning Research';
    if (interestsLower.includes('ai')) return 'Artificial Intelligence Research';
    if (interestsLower.includes('data')) return 'Data Science Research';
    return 'Technology Research';
  };

  const generateRoleType = (currentRole) => {
    const roleLower = currentRole.toLowerCase();
    if (roleLower.includes('manager')) return 'Technology Manager';
    if (roleLower.includes('analyst')) return 'Technical Analyst';
    return 'Technology Professional';
  };

  // Description and reasoning generators
  const generateTechDescription = (techStack, profile) => {
    const stackText = techStack.length > 0 ? techStack.slice(0, 3).join(', ') : 'modern technologies';
    return `Leverage ${stackText} to build innovative solutions and drive technical excellence in the industry.`;
  };

  const generateTechReasoning = (profile, score) => {
    return `Based on your ${score.criteriaCount} qualifying criteria and ${Math.round(score.totalScore)}% alignment with current tech market demands.`;
  };

  const generateAcademicDescription = (researchArea, profile) => {
    return `Conduct cutting-edge research in ${researchArea} with focus on practical applications and theoretical advancement.`;
  };

  const generateAcademicReasoning = (profile, score) => {
    return `Your academic background and research interests align ${Math.round(score.totalScore)}% with ${score.researchArea} opportunities.`;
  };

  const generatePracticalDescription = (roleType, profile) => {
    return `Apply technology skills in a ${roleType.toLowerCase()} role that balances technical expertise with business impact.`;
  };

  const generatePracticalReasoning = (profile, score) => {
    return `Considering your lifestyle preferences and career goals, this path offers ${Math.round(score.totalScore)}% compatibility.`;
  };

  // Skills extraction
  const extractTechSkills = (techStack, profile) => {
    const baseSkills = ['Programming Fundamentals', 'Problem Solving', 'Version Control'];
    const stackSkills = techStack.slice(0, 3);
    return [...baseSkills, ...stackSkills];
  };

  const extractAcademicSkills = (researchArea, profile) => {
    return ['Research Methodology', 'Data Analysis', 'Technical Writing', 'Critical Thinking'];
  };

  const extractPracticalSkills = (roleType, profile) => {
    return ['Project Management', 'Communication', 'Business Analysis', 'Team Collaboration'];
  };

  // Action generation
  const generateTechActions = (profile, techStack) => {
    const technologies = techStack.slice(0, 2);
    return [
      `Build portfolio projects using ${technologies.length > 0 ? technologies.join(' and ') : 'modern technologies'}`,
      'Contribute to open source projects',
      'Complete technical certifications'
    ];
  };

  const generateAcademicActions = (profile, researchArea) => {
    return [
      `Publish research in ${researchArea}`,
      'Attend academic conferences',
      'Collaborate on research projects'
    ];
  };

  const generatePracticalActions = (profile, roleType) => {
    return [
      'Develop business-focused technical projects',
      'Network with industry professionals',
      'Gain relevant certifications'
    ];
  };

  // Market data functions
  const getTechSalaryRange = (techStack, experience) => {
    const baseMap = { '0-2': '$60k-$90k', '3-5': '$80k-$120k', '6+': '$100k-$160k' };
    return baseMap[experience] || '$70k-$110k';
  };

  const getTechMarketDemand = (techStack) => {
    return techStack.some(tech => ['python', 'javascript', 'react'].includes(tech.toLowerCase())) ? 'high' : 'medium';
  };

  const getAcademicSalaryRange = (researchArea, education) => {
    const levelMap = { 'phd': '$80k-$130k', 'master': '$65k-$95k', 'bachelor': '$50k-$75k' };
    return levelMap[education?.toLowerCase()] || '$60k-$90k';
  };

  const getAcademicMarketDemand = (researchArea) => {
    return researchArea.toLowerCase().includes('data') ? 'high' : 'medium';
  };

  const getPracticalSalaryRange = (roleType, targetSalary) => {
    return targetSalary || '$65k-$105k';
  };

  const getPracticalMarketDemand = (roleType) => {
    return roleType.toLowerCase().includes('manager') ? 'high' : 'medium';
  };

  // ============================================================================
  // EXISTING EXTRACTION FUNCTIONS (KEEPING FOR BACKWARD COMPATIBILITY)
  // ============================================================================

  // AI-driven skills gap extraction focused on analysis content
  const extractSkillsGapImproved = (text) => {
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
            
            // Map form data to the new enhanced profile structure
            processedUserData = {
              // Constant Variables
              yearsExperience: formData.yearsExperience || formData.experienceLevel || '',
              studyField: formData.studyField || 'Not specified',
              interests: Array.isArray(formData.techInterests) 
                ? formData.techInterests 
                : (typeof formData.techInterests === 'string' ? formData.techInterests.split(',').map(i => i.trim()) : []),
              transferableSkills: formData.transferableSkills || '',
              
              // Tech-Market Specific
              jobTechnologies: formData.jobTechnologies || '',
              toolsUsed: formData.toolsUsed || [],
              
              // Academic-Research Specific
              educationLevel: formData.educationLevel || '',
              publications: formData.publications || '',
              techInterests: formData.techInterests || '',
              
              // Practical-Lifestyle Specific
              workPreference: formData.workPreference || '',
              timeCommitment: formData.timeCommitment || '',
              currentRole: formData.currentRole || '',
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
            
            // Generate advanced recommendations using the new system
            generatedPaths = await generateAdvancedCareerRecommendations(processedUserData);
            setCareerPaths(generatedPaths);
            
            console.log('✅ Advanced career recommendations generated:', generatedPaths.length);
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
              // Map stored data to new structure
              processedUserData = {
                yearsExperience: submission.yearsExperience || submission.experienceLevel || '',
                studyField: submission.studyField || 'Not specified',
                interests: Array.isArray(submission.techInterests) 
                  ? submission.techInterests 
                  : (typeof submission.techInterests === 'string' ? submission.techInterests.split(',').map(i => i.trim()) : []),
                transferableSkills: submission.transferableSkills || '',
                jobTechnologies: submission.jobTechnologies || '',
                toolsUsed: submission.toolsUsed || [],
                educationLevel: submission.educationLevel || '',
                publications: submission.publications || '',
                techInterests: submission.techInterests || '',
                workPreference: submission.workPreference || '',
                timeCommitment: submission.timeCommitment || '',
                currentRole: submission.currentRole || '',
                targetSalary: submission.targetSalary || '',
                name: submission.fullName || '',
                email: submission.email || '',
                experienceLevel: submission.experienceLevel || '',
                jobResponsibilities: submission.jobResponsibilities || '',
                jobProjects: submission.jobProjects || '',
                careerPathsInterest: submission.careerPathsInterest || [],
                transitionTimeline: submission.transitionTimeline || ''
              };
              
              setUserData(processedUserData);
              
              // Generate advanced recommendations
              generatedPaths = await generateAdvancedCareerRecommendations(processedUserData);
              setCareerPaths(generatedPaths);
              
              console.log('✅ Stored advanced recommendations generated:', generatedPaths.length);
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
          console.log('🎯 Generating market trends for advanced recommendations...');
          
          const personalizedTrends = generatePersonalizedMarketTrendsWithPaths(generatedPaths, processedUserData);
          setMarketTrends(personalizedTrends);
          
          const personalizedOutlook = generatePersonalizedJobMarketOutlook(generatedPaths, processedUserData);
          setJobMarketOutlook(personalizedOutlook);
          
          console.log('✅ Market insights generated for advanced recommendations');
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

  // Enhanced Career Path Card with new recommendation data
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
    
    // Get algorithm-specific styling
    const getTypeIcon = (type) => {
      switch(type) {
        case 'tech-market': return '💻';
        case 'academic-research': return '🎓';
        case 'practical-lifestyle': return '🎯';
        default: return '📊';
      }
    };
    
    const getTypeLabel = (type) => {
      switch(type) {
        case 'tech-market': return 'Tech Market Fit';
        case 'academic-research': return 'Academic Research';
        case 'practical-lifestyle': return 'Lifestyle Match';
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
              
              {/* Show algorithm confidence */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  path.confidence === 'high' ? 'bg-green-100 text-green-700' :
                  path.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {path.confidence} confidence
                </span>
                <span className="text-xs text-gray-500">
                  Algorithm: {path.metadata?.algorithm || 'v1.0'}
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
                  Limited Data
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
    return <LoadingSpinner message="Loading your advanced career analysis..." />;
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
              Advanced AI-powered career recommendations with {recommendationMetadata.overallConfidence}% overall confidence
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
              {highConfidenceCount > 0 && (
                <div className="bg-purple-500 bg-opacity-20 px-4 py-2 rounded-full border border-purple-300">
                  🔬 {highConfidenceCount} High-Confidence Recommendations
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

            {/* Algorithm Quality Indicator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🔬</span>
                AI Recommendation Quality
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
                  <span className={`w-3 h-3 rounded-full mr-2 ${highConfidenceCount > 0 ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  High Confidence: {highConfidenceCount}
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-blue-500"></span>
                  Algorithm: v{recommendationMetadata.algorithmVersion || '1.0'}
                </div>
              </div>
              {recommendationMetadata.processedAt && (
                <div className="mt-4 text-xs text-gray-500">
                  Processed: {new Date(recommendationMetadata.processedAt).toLocaleString()}
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
                  AI-Powered Recommendations
                </div>
              </div>
              {careerPaths.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>Personalized for {userData.name}:</strong> Based on your {careerPaths[0].type} recommendation 
                    with {careerPaths[0].confidenceScore}% confidence score from our advanced algorithm.
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
                          AI
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
              <h2 className="text-3xl font-bold mb-4">AI-Powered Career Recommendations</h2>
              <p className="text-gray-600 text-lg">
                Advanced multi-algorithm analysis with {recommendationMetadata.overallConfidence}% overall confidence
              </p>
              {careerPaths.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-3xl mx-auto">
                  <p className="text-sm text-blue-800">
                    <strong>🔬 Advanced Analysis:</strong> Our system analyzed your profile using three specialized algorithms:
                    Tech-Market Alignment, Academic-Research Fit, and Practical-Lifestyle Match. 
                    Results sorted by confidence score with personalized reasoning for each recommendation.
                  </p>
                </div>
              )}
            </div>
            
            {careerPaths.length > 0 ? (
              <div className="space-y-6">
                {/* Algorithm Performance Summary */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold mb-4">Algorithm Performance Summary</h3>
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
                          Used: {path.metadata?.criteriaUsed?.length || 0} criteria
                        </div>
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
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Generating AI Recommendations</h3>
                <p className="text-gray-500">Our advanced algorithms are analyzing your profile to provide personalized career recommendations.</p>
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
              <p className="text-gray-600 text-lg">AI-generated step-by-step roadmap to success</p>
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
