// src/Pages/career/CareerDashboard.jsx - UPDATED TO MATCH TECHNICAL SPECIFICATION v2.0
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
  
  // ============================================================================
  // NEW v2.0 SEQUENTIAL DEPENDENCY STATE STRUCTURE
  // ============================================================================
  const [careerPathRecommendation, setCareerPathRecommendation] = useState(null);
  const [skillGapAnalysis, setSkillGapAnalysis] = useState(null);
  const [learningRoadmap, setLearningRoadmap] = useState(null);
  const [systemResponse, setSystemResponse] = useState(null);
  
  const [marketTrends, setMarketTrends] = useState([]);
  const [jobMarketOutlook, setJobMarketOutlook] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  
  // NEW v2.0 User Data Model - EXACT MATCH TO TECHNICAL SPEC
  const [userData, setUserData] = useState({
    // Career Path Recommendation Criteria (16 total)
    // Tier 1: Core Drivers (45%)
    futureGoal: '',                    // 15% - Primary destination
    techInterests: '',                 // 12% - Specific path selection  
    leverageDomainExpertise: '',       // 10% - Strategic approach
    careerPathsInterest: [],           // 8% - Direct preferences

    // Tier 2: Strong Motivators (25%)  
    industryPreference: [],            // 10% - Market opportunities
    techMotivation: '',                // 8% - Why change
    techPassion: '',                   // 7% - Sustainability

    // Tier 3: Supporting Evidence (20%)
    transferableSkills: '',            // 8% - Feasibility
    jobTechnologies: '',               // 4% - Tech foundation
    jobResponsibilities: '',           // 4% - Current trajectory
    jobProjects: '',                   // 4% - Practical experience

    // Tier 4: Background Context (10%)
    continueCurrent: '',               // 3% - Current role context
    studyField: '',                    // 3% - Educational foundation
    certifications: '',                // 2% - Formal qualifications
    internships: '',                   // 1% - Early experience
    publications: '',                  // 1% - Thought leadership

    // Skill Gap Additional Criteria
    certificationsDetail: '',
    experienceLevel: '',
    yearsExperience: '',
    currentRole: '',
    toolsUsed: [],

    // Learning Roadmap Additional Criteria
    timeCommitment: '',
    targetSalary: '',
    transitionTimeline: '',
    learningComfort: '',
    transitionReason: '',
    guidanceNeeded: [],
    
    // User Info
    name: '',
    email: ''
  });
  
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  // ============================================================================
  // CAREER RECOMMENDATION SYSTEM v2.0 - SEQUENTIAL DEPENDENCY IMPLEMENTATION
  // ============================================================================

  /**
   * Enhanced Validation Function - Matches Technical Spec v2.0
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
   * NEW v2.0: Career Path Recommendation Engine (🎯)
   * Uses all 16 criteria with 4-tier weighted scoring
   */
  const generateCareerPathRecommendation = (profile) => {
    console.log('Generating Career Path Recommendation (v2.0)...');
    
    // Fixed 4-tier weighting system (as per v2.0 spec)
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
    
    const score = calculateCareerPathScore(profile, weights);
    const confidence = determineConfidence(score.criteriaCount, score.totalWeightedScore);
    
    return {
      id: 'cp_1_ai_generated',
      type: 'career-path',
      title: aiGenerateCareerPathTitle(profile, score),
      description: aiGenerateCareerPathDescription(profile, score),
      reasoning: aiGenerateCareerPathReasoning(profile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      recommendedPaths: aiGenerateRecommendedPaths(profile, score),
      industryFocus: aiGenerateIndustryFocus(profile, score),
      marketDemand: aiAssessMarketDemand(profile, score),
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        tierScores: score.tierScores,
        totalWeightedScore: score.totalWeightedScore,
        fallbackApplied: score.fallbackUsed
      }
    };
  };

  const calculateCareerPathScore = (profile, weights) => {
    let tierScores = {
      coreDriving: 0,
      strongMotivators: 0,
      supportingEvidence: 0,
      backgroundContext: 0
    };
    
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // Tier 1: Core Drivers (45%)
    if (isValid(profile.futureGoal)) {
      tierScores.coreDriving += weights.futureGoal * getFutureGoalAlignment(profile.futureGoal);
      criteriaCount++; usedCriteria.push('futureGoal');
    } else { missingCriteria.push('futureGoal'); }
    
    if (isValid(profile.techInterests)) {
      tierScores.coreDriving += weights.techInterests * getTechInterestMarketAlignment(profile.techInterests);
      criteriaCount++; usedCriteria.push('techInterests');
    } else { missingCriteria.push('techInterests'); }
    
    if (isValid(profile.leverageDomainExpertise)) {
      tierScores.coreDriving += weights.leverageDomainExpertise * getDomainLeverageScore(profile.leverageDomainExpertise);
      criteriaCount++; usedCriteria.push('leverageDomainExpertise');
    } else { missingCriteria.push('leverageDomainExpertise'); }
    
    if (isValid(profile.careerPathsInterest)) {
      tierScores.coreDriving += weights.careerPathsInterest * getCareerPathInterestAlignment(profile.careerPathsInterest);
      criteriaCount++; usedCriteria.push('careerPathsInterest');
    } else { missingCriteria.push('careerPathsInterest'); }
    
    // Tier 2: Strong Motivators (25%)
    if (isValid(profile.industryPreference)) {
      tierScores.strongMotivators += weights.industryPreference * getIndustryMarketOpportunity(profile.industryPreference);
      criteriaCount++; usedCriteria.push('industryPreference');
    } else { missingCriteria.push('industryPreference'); }
    
    if (isValid(profile.techMotivation)) {
      tierScores.strongMotivators += weights.techMotivation * getTechMotivationScore(profile.techMotivation);
      criteriaCount++; usedCriteria.push('techMotivation');
    } else { missingCriteria.push('techMotivation'); }
    
    if (isValid(profile.techPassion)) {
      tierScores.strongMotivators += weights.techPassion * getTechPassionSustainability(profile.techPassion);
      criteriaCount++; usedCriteria.push('techPassion');
    } else { missingCriteria.push('techPassion'); }
    
    // Tier 3: Supporting Evidence (20%)
    if (isValid(profile.transferableSkills)) {
      tierScores.supportingEvidence += weights.transferableSkills * getTransferableSkillValue(profile.transferableSkills);
      criteriaCount++; usedCriteria.push('transferableSkills');
    } else { missingCriteria.push('transferableSkills'); }
    
    if (isValid(profile.jobTechnologies)) {
      tierScores.supportingEvidence += weights.jobTechnologies * getTechnologyFoundationScore(profile.jobTechnologies);
      criteriaCount++; usedCriteria.push('jobTechnologies');
    } else { missingCriteria.push('jobTechnologies'); }
    
    if (isValid(profile.jobResponsibilities)) {
      tierScores.supportingEvidence += weights.jobResponsibilities * getCurrentTrajectoryScore(profile.jobResponsibilities);
      criteriaCount++; usedCriteria.push('jobResponsibilities');
    } else { missingCriteria.push('jobResponsibilities'); }
    
    if (isValid(profile.jobProjects)) {
      tierScores.supportingEvidence += weights.jobProjects * getPracticalExperienceScore(profile.jobProjects);
      criteriaCount++; usedCriteria.push('jobProjects');
    } else { missingCriteria.push('jobProjects'); }
    
    // Tier 4: Background Context (10%)
    if (isValid(profile.continueCurrent)) {
      tierScores.backgroundContext += weights.continueCurrent * getCurrentRoleContextScore(profile.continueCurrent);
      criteriaCount++; usedCriteria.push('continueCurrent');
    } else { missingCriteria.push('continueCurrent'); }
    
    if (isValid(profile.studyField)) {
      tierScores.backgroundContext += weights.studyField * getStudyFieldRelevance(profile.studyField);
      criteriaCount++; usedCriteria.push('studyField');
    } else { missingCriteria.push('studyField'); }
    
    if (isValid(profile.certifications)) {
      tierScores.backgroundContext += weights.certifications * getCertificationValue(profile.certifications);
      criteriaCount++; usedCriteria.push('certifications');
    } else { missingCriteria.push('certifications'); }
    
    if (isValid(profile.internships)) {
      tierScores.backgroundContext += weights.internships * getInternshipExperienceScore(profile.internships);
      criteriaCount++; usedCriteria.push('internships');
    } else { missingCriteria.push('internships'); }
    
    if (isValid(profile.publications)) {
      tierScores.backgroundContext += weights.publications * getPublicationLeadershipScore(profile.publications);
      criteriaCount++; usedCriteria.push('publications');
    } else { missingCriteria.push('publications'); }
    
    const totalWeightedScore = 
      tierScores.coreDriving + 
      tierScores.strongMotivators + 
      tierScores.supportingEvidence + 
      tierScores.backgroundContext;
    
    const fallbackUsed = checkCareerPathFallbackRequired(criteriaCount, tierScores);
    
    return {
      totalWeightedScore: totalWeightedScore * 100, // Convert to percentage
      criteriaCount,
      tierScores,
      usedCriteria,
      missingCriteria,
      fallbackUsed
    };
  };

  /**
   * NEW v2.0: Skill Gap Analysis Engine  
   * Builds on Career Path + additional criteria
   */
  const generateSkillGapAnalysis = (profile, careerPath) => {
    console.log('Generating Skill Gap Analysis (v2.0)...');
    
    const additionalCriteria = [
      'certificationsDetail', 'experienceLevel', 'yearsExperience', 'currentRole', 'toolsUsed'
    ];
    
    const currentSkillAssessment = aiAssessCurrentSkills(profile, additionalCriteria);
    const requiredSkillsForPath = aiGenerateRequiredSkills(careerPath, profile);
    const skillGaps = aiAnalyzeSkillGaps(currentSkillAssessment, requiredSkillsForPath, profile);
    
    return {
      id: 'sg_1_analysis',
      type: 'skill-gap',
      careerPathId: careerPath.id,
      currentSkillLevel: currentSkillAssessment.level,
      requiredSkills: requiredSkillsForPath,
      skillGaps: skillGaps,
      strengthsToLeverage: aiIdentifyStrengths(profile, currentSkillAssessment),
      recommendedCertifications: aiRecommendCertifications(skillGaps, profile.industryPreference),
      confidence: determineSkillGapConfidence(skillGaps, profile),
      confidenceScore: calculateSkillGapConfidenceScore(skillGaps, profile),
      metadata: {
        basedOnCareerPath: true,
        criteriaUsed: extractUsedCriteria(profile, additionalCriteria),
        missingCriteria: extractMissingCriteria(profile, additionalCriteria)
      }
    };
  };

  /**
   * NEW v2.0: Learning Roadmap Engine (⚖️)
   * Builds on Career Path + Skill Gap + additional criteria  
   */
  const generateLearningRoadmap = (profile, careerPath, skillGap) => {
    console.log('Generating Learning Roadmap (v2.0)...');
    
    const additionalCriteria = [
      'timeCommitment', 'targetSalary', 'transitionTimeline', 
      'learningComfort', 'transitionReason', 'guidanceNeeded'
    ];
    
    const learningPhases = aiCreateLearningPhases(skillGap, profile, additionalCriteria);
    const timeline = aiCalculateTimeline(learningPhases, profile.timeCommitment, profile.transitionTimeline);
    const budget = aiEstimateBudget(learningPhases, profile.targetSalary);
    const flexibilityOptions = aiGenerateFlexibilityOptions(profile.timeCommitment, profile.learningComfort);
    const supportRecs = aiGenerateSupportRecommendations(profile.guidanceNeeded, profile.transitionReason);
    
    return {
      id: 'lr_1_roadmap',
      type: 'learning-roadmap',
      careerPathId: careerPath.id,
      skillGapId: skillGap.id,
      phases: learningPhases,
      totalTimelineEstimate: timeline,
      budgetEstimate: budget,
      flexibilityOptions: flexibilityOptions,
      supportRecommendations: supportRecs,
      confidence: determineLearningRoadmapConfidence(learningPhases, profile),
      confidenceScore: calculateLearningRoadmapConfidenceScore(learningPhases, profile),
      metadata: {
        basedOnCareerPath: true,
        basedOnSkillGap: true,
        criteriaUsed: extractUsedCriteria(profile, additionalCriteria),
        missingCriteria: extractMissingCriteria(profile, additionalCriteria)
      }
    };
  };

  /**
   * Main Career Recommendation Engine v2.0 - SEQUENTIAL DEPENDENCY IMPLEMENTATION
   */
  const generateAdvancedCareerRecommendations = async (rawProfile) => {
    console.log('Starting Career Recommendation Engine v2.0 (Sequential Dependency)...');
    
    try {
      // Step 1: Generate Primary Career Path Recommendation (16 criteria)
      const careerPath = generateCareerPathRecommendation(rawProfile);
      
      // Step 2: Generate Skill Gap Analysis (builds on Career Path + 5 additional criteria)
      const skillGap = generateSkillGapAnalysis(rawProfile, careerPath);
      
      // Step 3: Generate Learning Roadmap (builds on both + 6 additional criteria)
      const learningRoadmap = generateLearningRoadmap(rawProfile, careerPath, skillGap);
      
      // Step 4: Calculate response metadata
      const response = {
        careerPath: careerPath,
        skillGap: skillGap,
        learningRoadmap: learningRoadmap,
        overallConfidence: calculateOverallConfidence([careerPath, skillGap, learningRoadmap]),
        dataCompleteness: calculateDataCompleteness(rawProfile),
        careerPathCriteriaComplete: countCareerPathCriteria(rawProfile),
        processedAt: new Date().toISOString()
      };
      
      console.log('✅ Career recommendations generated (v2.0 Sequential):', {
        careerPathConfidence: careerPath.confidenceScore,
        skillGapConfidence: skillGap.confidenceScore,
        learningRoadmapConfidence: learningRoadmap.confidenceScore,
        overallConfidence: response.overallConfidence,
        completeness: response.dataCompleteness
      });
      
      return response;
      
    } catch (error) {
      console.error('❌ Error in Career Recommendation Engine v2.0:', error);
      return generateFallbackRecommendations(rawProfile);
    }
  };

  // ============================================================================
  // AI CONTENT GENERATION FUNCTIONS - v2.0 IMPLEMENTATION
  // ============================================================================

  // AI Career Path Generation
  const aiGenerateCareerPathTitle = (profile, score) => {
    const domainLeverage = profile.leverageDomainExpertise;
    const techInterests = profile.techInterests || '';
    const currentRole = profile.continueCurrent || '';
    const futureGoal = profile.futureGoal || '';
    
    // AI logic based on criteria
    if (domainLeverage?.toLowerCase().includes('yes') && currentRole) {
      if (techInterests.toLowerCase().includes('data') || techInterests.toLowerCase().includes('ml')) {
        return `${currentRole} transitioning to Data Scientist`;
      }
      if (techInterests.toLowerCase().includes('ai') || futureGoal.toLowerCase().includes('ai')) {
        return `AI Engineer with ${currentRole} Domain Expertise`;
      }
      return `Senior Technology Professional with ${currentRole} Background`;
    }
    
    if (futureGoal.toLowerCase().includes('senior') || futureGoal.toLowerCase().includes('lead')) {
      return `Senior ${extractPrimaryTech(techInterests)} Engineer`;
    }
    
    return `${extractPrimaryTech(techInterests)} Developer`;
  };

  const aiGenerateCareerPathDescription = (profile, score) => {
    const leverageExpertise = profile.leverageDomainExpertise?.toLowerCase().includes('yes');
    const techMotivation = profile.techMotivation || '';
    const industries = profile.industryPreference || [];
    
    if (leverageExpertise) {
      return `Leverage your existing domain expertise while building technical skills to become a technology leader in ${industries[0] || 'your field'}.`;
    }
    
    if (techMotivation.toLowerCase().includes('passion') || techMotivation.toLowerCase().includes('love')) {
      return `Channel your passion for technology into a rewarding career building innovative solutions and driving technical excellence.`;
    }
    
    return `Build a successful technology career aligned with your interests and goals while making meaningful impact through innovative solutions.`;
  };

  const aiGenerateCareerPathReasoning = (profile, score) => {
    const tier1Score = Math.round(score.tierScores.coreDriving * 100);
    const criteriaCount = score.criteriaCount;
    const totalScore = Math.round(score.totalWeightedScore);
    
    return `Based on ${criteriaCount} qualifying criteria with ${totalScore}% alignment score. Strong core drivers alignment (${tier1Score}% of Tier 1 criteria) indicates excellent fit for this career path.`;
  };

  const aiGenerateRecommendedPaths = (profile, score) => {
    const paths = [];
    const techInterests = profile.techInterests || '';
    const careerInterests = profile.careerPathsInterest || [];
    const futureGoal = profile.futureGoal || '';
    
    // AI generates paths based on interests and goals
    if (techInterests.toLowerCase().includes('data') || careerInterests.includes('Data Analysis/Science')) {
      paths.push('Data Scientist', 'Data Engineer', 'Business Intelligence Analyst');
    } else if (techInterests.toLowerCase().includes('ai') || techInterests.toLowerCase().includes('machine learning')) {
      paths.push('AI Engineer', 'Machine Learning Engineer', 'AI Research Scientist');
    } else if (careerInterests.includes('Software Development')) {
      paths.push('Software Engineer', 'Full Stack Developer', 'Backend Developer');
    } else if (careerInterests.includes('UX/UI Design')) {
      paths.push('UX Designer', 'UI Developer', 'Product Designer');
    } else {
      paths.push('Software Developer', 'Data Analyst', 'Product Manager');
    }
    
    return paths.slice(0, 3);
  };

  const aiGenerateIndustryFocus = (profile, score) => {
    const preferences = profile.industryPreference || [];
    const leverageExpertise = profile.leverageDomainExpertise?.toLowerCase().includes('yes');
    
    if (preferences.length > 0) {
      return preferences.slice(0, 2);
    }
    
    if (leverageExpertise) {
      return ['Technology', 'Same as current industry'];
    }
    
    return ['Technology', 'Startups'];
  };

  const aiAssessMarketDemand = (profile, score) => {
    const techInterests = profile.techInterests || '';
    const hotTechs = ['ai', 'data', 'cloud', 'cybersecurity', 'machine learning'];
    
    const hasHotTech = hotTechs.some(tech => techInterests.toLowerCase().includes(tech));
    return hasHotTech ? 'high' : 'medium';
  };

  // AI Skill Gap Analysis
  const aiAssessCurrentSkills = (profile, additionalCriteria) => {
    const experienceLevel = profile.experienceLevel || 'beginner';
    const toolsUsed = profile.toolsUsed || [];
    const yearsExperience = profile.yearsExperience || '0-2';
    
    const levelMap = {
      'Complete beginner': 'entry-level-beginner',
      'Some exposure': 'entry-level-familiar', 
      'Beginner': 'beginner-level',
      'Intermediate': 'intermediate-level',
      'Advanced': 'advanced-level'
    };
    
    return {
      level: levelMap[experienceLevel] || 'beginner-level',
      toolCount: toolsUsed.length,
      experienceYears: yearsExperience
    };
  };

  const aiGenerateRequiredSkills = (careerPath, profile) => {
    const skills = [];
    const pathTitle = careerPath.title || '';
    const techInterests = profile.techInterests || '';
    
    if (pathTitle.toLowerCase().includes('data') || techInterests.toLowerCase().includes('data')) {
      skills.push('Python Programming', 'SQL Databases', 'Data Visualization', 'Statistics', 'Machine Learning Basics');
    } else if (pathTitle.toLowerCase().includes('ai') || techInterests.toLowerCase().includes('ai')) {
      skills.push('Python Programming', 'Machine Learning', 'Deep Learning', 'TensorFlow/PyTorch', 'Data Preprocessing');
    } else if (pathTitle.toLowerCase().includes('software') || pathTitle.toLowerCase().includes('developer')) {
      skills.push('Programming Languages', 'Version Control (Git)', 'Database Management', 'API Development', 'Testing Frameworks');
    } else {
      skills.push('Programming Fundamentals', 'Problem Solving', 'Technical Communication', 'Project Management', 'Continuous Learning');
    }
    
    return skills;
  };

  const aiAnalyzeSkillGaps = (currentAssessment, requiredSkills, profile) => {
    return requiredSkills.map((skill, index) => {
      const currentLevel = assessCurrentSkillLevel(skill, profile);
      const requiredLevel = 4; // Target professional level
      const gap = Math.max(0, requiredLevel - currentLevel);
      
      return {
        skill: skill,
        currentLevel: getLevelName(currentLevel),
        requiredLevel: getLevelName(requiredLevel),
        priority: gap >= 2 ? 'high' : gap >= 1 ? 'medium' : 'low',
        estimatedLearningTime: calculateLearningTime(gap, profile.timeCommitment)
      };
    });
  };

  const aiIdentifyStrengths = (profile, currentAssessment) => {
    const strengths = [];
    const transferableSkills = profile.transferableSkills || '';
    const jobTechnologies = profile.jobTechnologies || '';
    const toolsUsed = profile.toolsUsed || [];
    
    if (transferableSkills.toLowerCase().includes('analytical')) {
      strengths.push('Analytical thinking and problem-solving');
    }
    if (transferableSkills.toLowerCase().includes('communication')) {
      strengths.push('Strong communication skills');
    }
    if (jobTechnologies.toLowerCase().includes('excel') || jobTechnologies.toLowerCase().includes('data')) {
      strengths.push('Data analysis experience');
    }
    if (toolsUsed.includes('Git') || toolsUsed.includes('GitHub')) {
      strengths.push('Version control experience');
    }
    
    return strengths.length > 0 ? strengths : ['Learning mindset', 'Professional experience', 'Domain knowledge'];
  };

  const aiRecommendCertifications = (skillGaps, industryPreference) => {
    const certs = [];
    const highPrioritySkills = skillGaps.filter(gap => gap.priority === 'high');
    
    highPrioritySkills.forEach(skill => {
      if (skill.skill.toLowerCase().includes('python')) {
        certs.push('Python Institute PCAP Certification');
      }
      if (skill.skill.toLowerCase().includes('aws') || skill.skill.toLowerCase().includes('cloud')) {
        certs.push('AWS Cloud Practitioner');
      }
      if (skill.skill.toLowerCase().includes('data')) {
        certs.push('Google Data Analytics Certificate');
      }
    });
    
    return certs.length > 0 ? certs : ['Google IT Support Certificate', 'CompTIA A+'];
  };

  // AI Learning Roadmap Generation
  const aiCreateLearningPhases = (skillGap, profile, additionalCriteria) => {
    const phases = [];
    const highPrioritySkills = skillGap.skillGaps.filter(gap => gap.priority === 'high');
    const mediumPrioritySkills = skillGap.skillGaps.filter(gap => gap.priority === 'medium');
    const timeCommitment = profile.timeCommitment || '10-15 hours';
    
    // Phase 1: Foundation
    phases.push({
      phase: 1,
      title: 'Foundation Building',
      duration: calculatePhaseDuration(3, timeCommitment),
      skills: highPrioritySkills.slice(0, 3).map(s => s.skill),
      resources: aiGenerateResources(highPrioritySkills.slice(0, 3), profile.learningComfort),
      milestones: aiGenerateMilestones('foundation', highPrioritySkills.slice(0, 3))
    });
    
    // Phase 2: Skill Development  
    phases.push({
      phase: 2,
      title: 'Core Skill Development',
      duration: calculatePhaseDuration(4, timeCommitment),
      skills: [...highPrioritySkills.slice(3), ...mediumPrioritySkills.slice(0, 2)].map(s => s.skill),
      resources: aiGenerateResources([...highPrioritySkills.slice(3), ...mediumPrioritySkills.slice(0, 2)], profile.learningComfort),
      milestones: aiGenerateMilestones('development', [...highPrioritySkills.slice(3), ...mediumPrioritySkills.slice(0, 2)])
    });
    
    // Phase 3: Application
    phases.push({
      phase: 3,
      title: 'Practical Application',
      duration: calculatePhaseDuration(3, timeCommitment),
      skills: ['Portfolio Development', 'Real-world Projects', 'Interview Preparation'],
      resources: ['Project-based learning', 'GitHub portfolio', 'Mock interviews'],
      milestones: ['Complete 2-3 portfolio projects', 'Active GitHub profile', 'Pass technical interviews']
    });
    
    return phases;
  };

  const aiCalculateTimeline = (phases, timeCommitment, transitionTimeline) => {
    const totalPhaseMonths = phases.reduce((sum, phase) => {
      const months = parseInt(phase.duration.split('-')[0]) || 3;
      return sum + months;
    }, 0);
    
    const timeCommitmentMultiplier = getTimeCommitmentMultiplier(timeCommitment);
    const adjustedMonths = Math.ceil(totalPhaseMonths * timeCommitmentMultiplier);
    
    return `${adjustedMonths}-${adjustedMonths + 2} months (${timeCommitment} per week)`;
  };

  const aiEstimateBudget = (phases, targetSalary) => {
    const baseEstimate = phases.length * 800; // $800 per phase
    const salaryAdjustment = targetSalary?.includes('120,000') ? 1.3 : targetSalary?.includes('100,000') ? 1.1 : 1.0;
    const adjustedEstimate = Math.round(baseEstimate * salaryAdjustment);
    
    return `$${adjustedEstimate.toLocaleString()} - $${Math.round(adjustedEstimate * 1.5).toLocaleString()}`;
  };

  const aiGenerateFlexibilityOptions = (timeCommitment, learningComfort) => {
    const options = [];
    
    if (timeCommitment?.includes('5 hours') || timeCommitment?.includes('5-10')) {
      options.push('Micro-learning sessions (15-30 min)', 'Weekend intensive workshops');
    } else if (timeCommitment?.includes('20+')) {
      options.push('Accelerated bootcamp track', 'Full-time immersive programs');
    } else {
      options.push('Self-paced online courses', 'Evening cohort programs');
    }
    
    if (learningComfort?.toLowerCase().includes('very comfortable')) {
      options.push('Advanced self-study tracks', 'Independent project development');
    } else {
      options.push('Structured mentorship programs', 'Guided learning paths');
    }
    
    return options;
  };

  const aiGenerateSupportRecommendations = (guidanceNeeded, transitionReason) => {
    const recommendations = [];
    
    if (Array.isArray(guidanceNeeded)) {
      guidanceNeeded.forEach(need => {
        if (need.toLowerCase().includes('mentor')) {
          recommendations.push('Find a senior developer mentor in your target field');
        }
        if (need.toLowerCase().includes('portfolio')) {
          recommendations.push('Get portfolio reviews from industry professionals');
        }
        if (need.toLowerCase().includes('interview')) {
          recommendations.push('Practice technical interviews with experienced developers');
        }
      });
    }
    
    if (transitionReason?.toLowerCase().includes('career change')) {
      recommendations.push('Join career transition support groups');
    }
    
    return recommendations.length > 0 ? recommendations : [
      'Join developer communities and forums',
      'Attend local tech meetups and networking events',
      'Participate in online coding challenges and hackathons'
    ];
  };

  // ============================================================================
  // SCORING AND ASSESSMENT HELPER FUNCTIONS - v2.0
  // ============================================================================

  // Future goal alignment
  const getFutureGoalAlignment = (futureGoal) => {
    if (!futureGoal) return 0.3;
    const goalLower = futureGoal.toLowerCase();
    if (goalLower.includes('senior') || goalLower.includes('lead')) return 0.9;
    if (goalLower.includes('engineer') || goalLower.includes('developer')) return 0.8;
    if (goalLower.includes('learn') || goalLower.includes('transition')) return 0.7;
    return 0.6;
  };

  // Tech interest market alignment
  const getTechInterestMarketAlignment = (techInterests) => {
    if (!techInterests) return 0.3;
    const interestsLower = techInterests.toLowerCase();
    const hotTech = ['ai', 'machine learning', 'data science', 'cloud', 'cybersecurity'];
    const matches = hotTech.filter(tech => interestsLower.includes(tech)).length;
    return Math.min(0.5 + (matches * 0.15), 0.95);
  };

  // Domain leverage score
  const getDomainLeverageScore = (leverageDomainExpertise) => {
    if (!leverageDomainExpertise) return 0.5;
    const leverage = leverageDomainExpertise.toLowerCase();
    if (leverage.includes('yes, definitely')) return 0.95;
    if (leverage.includes('yes, somewhat')) return 0.8;
    if (leverage.includes('not sure')) return 0.5;
    if (leverage.includes('no')) return 0.3;
    return 0.6;
  };

  // Career path interest alignment
  const getCareerPathInterestAlignment = (careerPathsInterest) => {
    if (!careerPathsInterest || careerPathsInterest.length === 0) return 0.3;
    if (careerPathsInterest.includes('Not Sure Yet')) return 0.4;
    if (careerPathsInterest.length >= 3) return 0.8;
    if (careerPathsInterest.length >= 2) return 0.7;
    return 0.6;
  };

  // Industry market opportunity
  const getIndustryMarketOpportunity = (industryPreference) => {
    if (!industryPreference || industryPreference.length === 0) return 0.5;
    const highOpportunityIndustries = ['Technology', 'Healthcare/Medical', 'Finance/Fintech'];
    const hasHighOpportunity = industryPreference.some(industry => 
      highOpportunityIndustries.includes(industry)
    );
    return hasHighOpportunity ? 0.9 : 0.7;
  };

  // Tech motivation score
  const getTechMotivationScore = (techMotivation) => {
    if (!techMotivation) return 0.3;
    const motivation = techMotivation.toLowerCase();
    if (motivation.includes('passion') || motivation.includes('love')) return 0.9;
    if (motivation.includes('opportunity') || motivation.includes('growth')) return 0.8;
    if (motivation.includes('salary') || motivation.includes('money')) return 0.6;
    return 0.7;
  };

  // Tech passion sustainability
  const getTechPassionSustainability = (techPassion) => {
    if (!techPassion) return 0.3;
    const passion = techPassion.toLowerCase();
    if (passion.includes('technology') || passion.includes('programming')) return 0.9;
    if (passion.includes('problem') || passion.includes('solving')) return 0.8;
    if (passion.includes('learning') || passion.includes('growth')) return 0.8;
    return 0.7;
  };

  // Transferable skill value
  const getTransferableSkillValue = (transferableSkills) => {
    if (!transferableSkills) return 0.3;
    const skillsLower = transferableSkills.toLowerCase();
    const valuableSkills = ['analytical', 'problem', 'logical', 'technical', 'communication', 'leadership'];
    const matches = valuableSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.4 + (matches * 0.1), 0.9);
  };

  // Technology foundation score
  const getTechnologyFoundationScore = (jobTechnologies) => {
    if (!jobTechnologies) return 0.3;
    const techLower = jobTechnologies.toLowerCase();
    const techKeywords = ['programming', 'software', 'database', 'web', 'api', 'cloud'];
    const matches = techKeywords.filter(tech => techLower.includes(tech)).length;
    return Math.min(0.4 + (matches * 0.1), 0.9);
  };

  // Current trajectory score
  const getCurrentTrajectoryScore = (jobResponsibilities) => {
    if (!jobResponsibilities) return 0.3;
    const responsibilities = jobResponsibilities.toLowerCase();
    if (responsibilities.includes('analysis') || responsibilities.includes('technical')) return 0.8;
    if (responsibilities.includes('project') || responsibilities.includes('management')) return 0.7;
    if (responsibilities.includes('research') || responsibilities.includes('data')) return 0.8;
    return 0.6;
  };

  // Practical experience score
  const getPracticalExperienceScore = (jobProjects) => {
    if (!jobProjects) return 0.3;
    const projects = jobProjects.toLowerCase();
    if (projects.includes('technical') || projects.includes('system')) return 0.8;
    if (projects.includes('automation') || projects.includes('process')) return 0.7;
    if (projects.includes('data') || projects.includes('analysis')) return 0.8;
    return 0.6;
  };

  // Current role context score
  const getCurrentRoleContextScore = (continueCurrent) => {
    if (!continueCurrent) return 0.5;
    const role = continueCurrent.toLowerCase();
    if (role.includes('full-time')) return 0.7;
    if (role.includes('part-time')) return 0.8;
    if (role.includes('exclusively')) return 0.9;
    if (role.includes('unemployed')) return 0.6;
    return 0.7;
  };

  // Study field relevance
  const getStudyFieldRelevance = (studyField) => {
    if (!studyField) return 0.3;
    const fieldLower = studyField.toLowerCase();
    if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
    if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.8;
    if (fieldLower.includes('science') || fieldLower.includes('data')) return 0.7;
    return 0.5;
  };

  // Certification value
  const getCertificationValue = (certifications) => {
    if (!certifications) return 0.2;
    const cert = certifications.toLowerCase();
    if (cert.includes('yes') || cert.includes('pursuing')) return 0.8;
    if (cert.includes('no')) return 0.2;
    return 0.5;
  };

  // Internship experience score
  const getInternshipExperienceScore = (internships) => {
    if (!internships) return 0.2;
    const intern = internships.toLowerCase();
    if (intern.includes('tech') || intern.includes('software')) return 0.8;
    if (intern.includes('data') || intern.includes('programming')) return 0.7;
    if (intern.includes('none')) return 0.2;
    return 0.5;
  };

  // Publication leadership score
  const getPublicationLeadershipScore = (publications) => {
    if (!publications) return 0.2;
    const pub = publications.toLowerCase();
    if (pub.includes('none')) return 0.2;
    if (pub.includes('journal') || pub.includes('conference')) return 0.9;
    if (pub.includes('blog') || pub.includes('article')) return 0.7;
    return 0.5;
  };

  // Helper functions
  const checkCareerPathFallbackRequired = (criteriaCount, tierScores) => {
    const tier1Count = (tierScores.coreDriving > 0) ? 1 : 0;
    return criteriaCount < 8 || tier1Count < 2 || tierScores.coreDriving < 0.2;
  };

  const determineConfidence = (criteriaCount, totalScore) => {
    const maxCriteria = 16;
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
    const scores = recommendations.map(r => r.confidenceScore || 0);
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const calculateDataCompleteness = (profile) => {
    const allCriteria = [
      'futureGoal', 'techInterests', 'leverageDomainExpertise', 'careerPathsInterest',
      'industryPreference', 'techMotivation', 'techPassion', 'transferableSkills',
      'jobTechnologies', 'jobResponsibilities', 'jobProjects', 'continueCurrent',
      'studyField', 'certifications', 'internships', 'publications'
    ];
    const validCriteria = allCriteria.filter(key => isValid(profile[key])).length;
    return Math.round((validCriteria / allCriteria.length) * 100);
  };

  const countCareerPathCriteria = (profile) => {
    const careerPathCriteria = [
      'futureGoal', 'techInterests', 'leverageDomainExpertise', 'careerPathsInterest',
      'industryPreference', 'techMotivation', 'techPassion', 'transferableSkills',
      'jobTechnologies', 'jobResponsibilities', 'jobProjects', 'continueCurrent',
      'studyField', 'certifications', 'internships', 'publications'
    ];
    return careerPathCriteria.filter(key => isValid(profile[key])).length;
  };

  // Additional helper functions for skill gap and learning roadmap
  const determineSkillGapConfidence = (skillGaps, profile) => {
    if (skillGaps.length === 0) return 'low';
    const highPriorityCount = skillGaps.filter(gap => gap.priority === 'high').length;
    if (highPriorityCount <= 2) return 'high';
    if (highPriorityCount <= 4) return 'medium';
    return 'low';
  };

  const calculateSkillGapConfidenceScore = (skillGaps, profile) => {
    const totalSkills = skillGaps.length;
    const highPrioritySkills = skillGaps.filter(gap => gap.priority === 'high').length;
    const confidenceScore = Math.max(20, 100 - (highPrioritySkills * 15));
    return Math.min(confidenceScore, 95);
  };

  const determineLearningRoadmapConfidence = (phases, profile) => {
    if (phases.length < 2) return 'low';
    if (phases.length >= 3 && profile.timeCommitment && profile.transitionTimeline) return 'high';
    return 'medium';
  };

  const calculateLearningRoadmapConfidenceScore = (phases, profile) => {
    let score = 60;
    if (profile.timeCommitment) score += 15;
    if (profile.transitionTimeline) score += 15;
    if (profile.learningComfort) score += 10;
    return Math.min(score, 95);
  };

  const extractUsedCriteria = (profile, criteria) => {
    return criteria.filter(criterion => isValid(profile[criterion]));
  };

  const extractMissingCriteria = (profile, criteria) => {
    return criteria.filter(criterion => !isValid(profile[criterion]));
  };

  const extractPrimaryTech = (techInterests) => {
    if (!techInterests) return 'Software';
    const interests = techInterests.toLowerCase();
    if (interests.includes('data')) return 'Data';
    if (interests.includes('ai') || interests.includes('machine learning')) return 'AI';
    if (interests.includes('web')) return 'Web';
    if (interests.includes('mobile')) return 'Mobile';
    return 'Software';
  };

  const assessCurrentSkillLevel = (skillName, profile) => {
    let level = 1;
    const skillLower = skillName.toLowerCase();
    const expLevelMap = {
      'Complete beginner': 1,
      'Some exposure': 2,
      'Beginner': 2,
      'Intermediate': 3,
      'Advanced': 4
    };
    level = expLevelMap[profile.experienceLevel] || 1;
    
    if (profile.toolsUsed && profile.toolsUsed.length > 0) {
      const hasRelatedTool = profile.toolsUsed.some(tool => 
        skillLower.includes(tool.toLowerCase()) || 
        tool.toLowerCase().includes(skillLower)
      );
      if (hasRelatedTool) level = Math.min(level + 1, 5);
    }
    
    return Math.max(1, Math.min(level, 5));
  };

  const getLevelName = (level) => {
    const levels = ['None', 'Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    return levels[level] || 'Beginner';
  };

  const calculateLearningTime = (gap, timeCommitment) => {
    const baseWeeks = gap * 4;
    const timeMultiplier = getTimeCommitmentMultiplier(timeCommitment);
    const adjustedWeeks = Math.ceil(baseWeeks * timeMultiplier);
    return `${adjustedWeeks}-${adjustedWeeks + 2} weeks`;
  };

  const calculatePhaseDuration = (baseMonths, timeCommitment) => {
    const multiplier = getTimeCommitmentMultiplier(timeCommitment);
    const adjustedMonths = Math.ceil(baseMonths * multiplier);
    return `${adjustedMonths}-${adjustedMonths + 1} months`;
  };

  const getTimeCommitmentMultiplier = (timeCommitment) => {
    if (!timeCommitment) return 1.0;
    if (timeCommitment.includes('5 hours') || timeCommitment.includes('5-10')) return 1.8;
    if (timeCommitment.includes('10-15')) return 1.0;
    if (timeCommitment.includes('15-20')) return 0.8;
    if (timeCommitment.includes('20+')) return 0.6;
    return 1.0;
  };

  const aiGenerateResources = (skills, learningComfort) => {
    const resources = [];
    const isComfortable = learningComfort?.toLowerCase().includes('very comfortable');
    
    skills.forEach(skillGap => {
      const skill = skillGap.skill || skillGap;
      if (skill.toLowerCase().includes('python')) {
        resources.push(isComfortable ? 'Python.org official tutorial' : 'Codecademy Python course');
      } else if (skill.toLowerCase().includes('data')) {
        resources.push(isComfortable ? 'Kaggle Learn' : 'Coursera Data Science');
      } else {
        resources.push('Online tutorials and documentation');
      }
    });
    
    return resources.length > 0 ? resources : ['Self-paced online courses', 'Practice projects'];
  };

  const aiGenerateMilestones = (phaseType, skills) => {
    if (phaseType === 'foundation') {
      return [
        'Complete basic tutorials for core skills',
        'Build first simple project',
        'Join developer community'
      ];
    } else if (phaseType === 'development') {
      return [
        'Complete intermediate projects',
        'Contribute to open source',
        'Start building portfolio'
      ];
    }
    return ['Phase completion', 'Skill demonstration', 'Progress review'];
  };

  // Fallback system
  const generateFallbackRecommendations = (profile) => {
    console.log('Generating fallback recommendations (v2.0)...');
    
    const fallbackCareerPath = {
      id: 'fallback_cp',
      type: 'career-path',
      title: 'Technology Explorer Path',
      description: 'Comprehensive exploration of technology roles to discover your ideal career path',
      reasoning: 'Limited profile data - recommending broad exploration approach',
      confidence: 'low',
      confidenceScore: 35,
      recommendedPaths: ['Software Developer', 'Data Analyst', 'Product Manager'],
      industryFocus: ['Technology', 'Various'],
      marketDemand: 'medium',
      metadata: {
        criteriaUsed: [],
        missingCriteria: ['Most criteria missing'],
        tierScores: { coreDriving: 0, strongMotivators: 0, supportingEvidence: 0, backgroundContext: 0 },
        totalWeightedScore: 35,
        fallbackApplied: true
      }
    };
    
    const fallbackSkillGap = {
      id: 'fallback_sg',
      type: 'skill-gap',
      careerPathId: 'fallback_cp',
      currentSkillLevel: 'exploratory',
      requiredSkills: ['Programming Fundamentals', 'Problem Solving', 'Technical Communication'],
      skillGaps: [
        {
          skill: 'Programming Fundamentals',
          currentLevel: 'Beginner',
          requiredLevel: 'Intermediate',
          priority: 'high',
          estimatedLearningTime: '8-12 weeks'
        }
      ],
      strengthsToLeverage: ['Learning mindset', 'Professional experience'],
      recommendedCertifications: ['Google IT Support Certificate'],
      confidence: 'low',
      confidenceScore: 30,
      metadata: {
        basedOnCareerPath: true,
        criteriaUsed: [],
        missingCriteria: ['Most skill assessment criteria missing']
      }
    };
    
    const fallbackLearningRoadmap = {
      id: 'fallback_lr',
      type: 'learning-roadmap',
      careerPathId: 'fallback_cp',
      skillGapId: 'fallback_sg',
      phases: [
        {
          phase: 1,
          title: 'Technology Exploration',
          duration: '2-3 months',
          skills: ['Basic Programming', 'Technology Overview', 'Career Research'],
          resources: ['Free online courses', 'Technology tutorials', 'Career guides'],
          milestones: ['Complete intro programming course', 'Research 3 tech careers', 'Network with professionals']
        }
      ],
      totalTimelineEstimate: '6-9 months (flexible)',
      budgetEstimate: '$500 - $1,500',
      flexibilityOptions: ['Self-paced exploration', 'Career coaching'],
      supportRecommendations: ['Complete comprehensive assessment', 'Career counseling', 'Industry mentorship'],
      confidence: 'low',
      confidenceScore: 25,
      metadata: {
        basedOnCareerPath: true,
        basedOnSkillGap: true,
        criteriaUsed: [],
        missingCriteria: ['Learning preferences and constraints missing']
      }
    };
    
    return {
      careerPath: fallbackCareerPath,
      skillGap: fallbackSkillGap,
      learningRoadmap: fallbackLearningRoadmap,
      overallConfidence: 30,
      dataCompleteness: 15,
      careerPathCriteriaComplete: 0,
      processedAt: new Date().toISOString()
    };
  };

  // ============================================================================
  // COMPONENT EFFECTS AND UI LOGIC
  // ============================================================================

  // Animation effect for progress bars
  useEffect(() => {
    if (careerPathRecommendation) {
      const timer = setTimeout(() => {
        const targetValue = careerPathRecommendation.confidenceScore || 0;
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
            careerPath: Math.round(currentValue)
          }));
        }, 50);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [careerPathRecommendation]);

  // Main data loading effect with v2.0 sequential system
  useEffect(() => {
    const loadData = async () => {
      try {
        let processedUserData = null;
        let systemResponse = null;
        
        if (location.state?.systemResponse) {
          // NEW v2.0: Handle structured system response
          systemResponse = location.state.systemResponse;
          const formData = location.state.formData;
          
          console.log('✅ v2.0 Sequential system response received:', systemResponse);
          
          setCareerPathRecommendation(systemResponse.careerPath);
          setSkillGapAnalysis(systemResponse.skillGap);
          setLearningRoadmap(systemResponse.learningRoadmap);
          setSystemResponse(systemResponse);
          
          // Map form data to v2.0 profile structure
          processedUserData = mapFormDataToV2Profile(formData);
          setUserData(processedUserData);
          
        } else if (location.state?.analysis) {
          // Legacy: Handle text analysis and generate v2.0 recommendations
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            processedUserData = mapFormDataToV2Profile(formData);
            setUserData(processedUserData);
            
            // Generate v2.0 recommendations
            systemResponse = await generateAdvancedCareerRecommendations(processedUserData);
            
            setCareerPathRecommendation(systemResponse.careerPath);
            setSkillGapAnalysis(systemResponse.skillGap);
            setLearningRoadmap(systemResponse.learningRoadmap);
            setSystemResponse(systemResponse);
            
            console.log('✅ v2.0 recommendations generated from legacy analysis');
          }
          
        } else {
          // Handle stored data case
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const analysisText = storedAnalysis.analysis;
            setAnalysis(analysisText);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              processedUserData = mapFormDataToV2Profile(submission);
              setUserData(processedUserData);
              
              // Generate v2.0 recommendations
              systemResponse = await generateAdvancedCareerRecommendations(processedUserData);
              
              setCareerPathRecommendation(systemResponse.careerPath);
              setSkillGapAnalysis(systemResponse.skillGap);
              setLearningRoadmap(systemResponse.learningRoadmap);
              setSystemResponse(systemResponse);
              
              console.log('✅ v2.0 recommendations generated from stored data');
            }
          } else {
            navigate('/career/test', { 
              state: { message: 'Please complete the assessment to view your dashboard' } 
            });
            return;
          }
        }
        
        // Generate market insights
        if (processedUserData && careerPathRecommendation) {
          const personalizedTrends = generatePersonalizedMarketTrends(careerPathRecommendation, processedUserData);
          setMarketTrends(personalizedTrends);
          
          const personalizedOutlook = generatePersonalizedJobMarketOutlook(careerPathRecommendation, processedUserData);
          setJobMarketOutlook(personalizedOutlook);
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

  // Map form data to v2.0 profile structure
  const mapFormDataToV2Profile = (formData) => {
    return {
      // Tier 1: Core Drivers (45%)
      futureGoal: formData.futureGoal || '',
      techInterests: formData.techInterests || '',
      leverageDomainExpertise: formData.leverageDomainExpertise || '',
      careerPathsInterest: formData.careerPathsInterest || [],

      // Tier 2: Strong Motivators (25%)
      industryPreference: formData.industryPreference || [],
      techMotivation: formData.techMotivation || '',
      techPassion: formData.techPassion || '',

      // Tier 3: Supporting Evidence (20%)
      transferableSkills: formData.transferableSkills || '',
      jobTechnologies: formData.jobTechnologies || '',
      jobResponsibilities: formData.jobResponsibilities || '',
      jobProjects: formData.jobProjects || '',

      // Tier 4: Background Context (10%)
      continueCurrent: formData.continueCurrent || '',
      studyField: formData.studyField || '',
      certifications: formData.certifications || '',
      internships: formData.internships || '',
      publications: formData.publications || '',

      // Skill Gap Additional Criteria
      certificationsDetail: formData.certificationsDetail || '',
      experienceLevel: formData.experienceLevel || '',
      yearsExperience: formData.yearsExperience || '',
      currentRole: formData.currentRole || '',
      toolsUsed: formData.toolsUsed || [],

      // Learning Roadmap Additional Criteria
      timeCommitment: formData.timeCommitment || '',
      targetSalary: formData.targetSalary || '',
      transitionTimeline: formData.transitionTimeline || '',
      learningComfort: formData.learningComfort || '',
      transitionReason: formData.transitionReason || '',
      guidanceNeeded: Array.isArray(formData.guidanceNeeded) ? formData.guidanceNeeded : [formData.guidanceNeeded].filter(Boolean),
      
      // User Info
      name: formData.fullName || '',
      email: formData.email || ''
    };
  };

  // Generate market trends
  const generatePersonalizedMarketTrends = (careerPath, userData) => {
    const trends = [];
    
    if (careerPath) {
      trends.push({
        title: `${careerPath.title} Market Analysis`,
        description: `Comprehensive market trends for ${careerPath.title} professionals`,
        category: 'Career-Specific Analysis',
        relevance: 'High',
        personalizedData: {
          ranges: ['Growing demand in tech sector', 'Remote work opportunities increasing', 'Skills-based hiring trends'],
          insights: careerPath.recommendedPaths || ['Technology', 'Innovation', 'Growth'],
          growth: careerPath.marketDemand === 'high' ? '15% year-over-year' : '8% year-over-year'
        },
        userCareer: careerPath.title
      });
    }
    
    return trends;
  };

  const generatePersonalizedJobMarketOutlook = (careerPath, userData) => {
    const outlook = [];
    
    if (careerPath) {
      outlook.push({
        title: `${careerPath.title} Job Outlook`,
        description: `Employment projections and opportunities for ${careerPath.title}`,
        category: 'Job Market Trends',
        growth: careerPath.marketDemand === 'high' ? 'Strong' : 'Moderate',
        personalizedData: {
          trends: [
            'Increasing demand for technical skills',
            'Remote work becoming standard',
            'Focus on continuous learning'
          ]
        },
        userCareer: careerPath.title
      });
    }
    
    return outlook;
  };

  // Generate next steps based on v2.0 recommendations
  const generateNextSteps = () => {
    const steps = [];
    
    if (careerPathRecommendation) {
      steps.push({
        title: `Focus on ${careerPathRecommendation.title} Path`,
        text: `Develop expertise aligned with your top career recommendation`,
        priority: 'high',
        icon:,
        timeline: '2-4 weeks',
        personalized: true,
        resources: careerPathRecommendation.recommendedPaths || []
      });
    }
    
    if (skillGapAnalysis && skillGapAnalysis.skillGaps) {
      const highPrioritySkills = skillGapAnalysis.skillGaps.filter(gap => gap.priority === 'high').slice(0, 2);
      highPrioritySkills.forEach((skillGap, index) => {
        steps.push({
          title: `Learn ${skillGap.skill}`,
          text: `Develop ${skillGap.skill} skills to bridge identified gap`,
          priority: 'medium',
          icon:,
          timeline: skillGap.estimatedLearningTime || '4-6 weeks',
          personalized: true,
          resources: [skillGap.skill]
        });
      });
    }
    
    if (learningRoadmap && learningRoadmap.phases) {
      const firstPhase = learningRoadmap.phases[0];
      if (firstPhase) {
        steps.push({
          title: `Start ${firstPhase.title}`,
          text: `Begin your learning journey with phase 1 activities`,
          priority: 'high',
          icon:,
          timeline: firstPhase.duration || '2-3 months',
          personalized: true,
          resources: firstPhase.resources || []
        });
      }
    }
    
    return steps.slice(0, 6);
  };

  // Feedback handling
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      setFeedbackData({ rating: '', improvements: '' });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // ============================================================================
  // UI COMPONENTS - Updated for v2.0
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

  // Enhanced Career Path Card for v2.0
  const CareerPathCard = ({ careerPath }) => {
    const animatedValue = animatedValues.careerPath || 0;
    
    return (
      <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl"></span>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  Career Path v2.0
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-3">
                {careerPath.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed mb-3">
                {careerPath.description}
              </p>
              
              <p className="text-sm text-green-700 italic">
                {careerPath.reasoning}
              </p>
              
              <div className="mt-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  careerPath.confidence === 'high' ? 'bg-green-100 text-green-700' :
                  careerPath.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {careerPath.confidence} confidence
                </span>
                <span className="text-xs text-gray-500">
                  Sequential Dependency Engine
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent ml-4">
              {animatedValue}%
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Confidence Score</span>
              <span className="text-sm text-gray-500">{animatedValue}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                style={{ width: `${animatedValue}%` }}
              />
            </div>
          </div>
          
          {/* Tier Scores Display */}
          {careerPath.metadata && careerPath.metadata.tierScores && (
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3">4-Tier Scoring Breakdown:</h5>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Core Drivers (45%)</span>
                  <span className="text-xs font-medium">{Math.round(careerPath.metadata.tierScores.coreDriving * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Strong Motivators (25%)</span>
                  <span className="text-xs font-medium">{Math.round(careerPath.metadata.tierScores.strongMotivators * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Supporting Evidence (20%)</span>
                  <span className="text-xs font-medium">{Math.round(careerPath.metadata.tierScores.supportingEvidence * 100)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Background Context (10%)</span>
                  <span className="text-xs font-medium">{Math.round(careerPath.metadata.tierScores.backgroundContext * 100)}%</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Recommended Paths */}
          {careerPath.recommendedPaths && careerPath.recommendedPaths.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Recommended Career Paths:</h5>
              <div className="flex flex-wrap gap-1">
                {careerPath.recommendedPaths.slice(0, 3).map((path, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {path}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Industry Focus */}
          {careerPath.industryFocus && careerPath.industryFocus.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Industry Focus:</h5>
              <div className="flex flex-wrap gap-1">
                {careerPath.industryFocus.map((industry, idx) => (
                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                careerPath.marketDemand === 'high' ? 'bg-green-100 text-green-700' :
                careerPath.marketDemand === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {careerPath.marketDemand} demand
              </span>
              {careerPath.metadata?.fallbackApplied && (
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

  // Skill Gap Card Component for v2.0
  const SkillGapCard = ({ skillGap, index }) => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{skillGap.skill}</h4>
            <span className="text-sm text-gray-500">Gap Analysis</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            skillGap.priority === 'high' ? 'bg-red-100 text-red-700' :
            skillGap.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {skillGap.priority?.toUpperCase()} PRIORITY
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Current Level</span>
              <span>{skillGap.currentLevel}</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Target Level</span>
              <span>{skillGap.requiredLevel}</span>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium">
              Estimated learning time: {skillGap.estimatedLearningTime}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Learning Roadmap Phase Card for v2.0
  const LearningPhaseCard = ({ phase, index }) => {
    const phaseColors = [
      'from-green-400 to-green-600',
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600'
    ];
    const colorClass = phaseColors[index % phaseColors.length];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center text-white font-bold mr-4`}>
            {phase.phase}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{phase.title}</h4>
            <span className="text-sm text-gray-500">{phase.duration}</span>
          </div>
        </div>
        
        {phase.skills && phase.skills.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Skills to Develop:</h5>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((skill, skillIndex) => (
                <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {phase.resources && phase.resources.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Resources:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {phase.resources.map((resource, resourceIndex) => (
                <li key={resourceIndex} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {phase.milestones && phase.milestones.length > 0 && (
          <div className="pt-4 border-t">
            <h5 className="font-medium text-gray-800 mb-2">Milestones:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {phase.milestones.map((milestone, milestoneIndex) => (
                <li key={milestoneIndex} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {milestone}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Market Trends Card (reuse from previous version)
  const MarketTrendsCard = ({ trend, index }) => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">📊</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{trend.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">{trend.category}</span>
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
            {trend.personalizedData.insights && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Key Insights:</h5>
                <div className="flex flex-wrap gap-1">
                  {trend.personalizedData.insights.slice(0, 3).map((insight, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                      {insight}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4 border-t mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Growth:</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {trend.personalizedData?.growth || 'Positive'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Job Market Outlook Card (reuse from previous version)
  const JobMarketOutlookCard = ({ outlook, index }) => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{outlook.icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{outlook.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">{outlook.category}</span>
              {outlook.userCareer && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {outlook.userCareer}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{outlook.description}</p>
        
        {outlook.personalizedData && outlook.personalizedData.trends && (
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h5 className="font-medium text-blue-800 mb-2">📈 Trends:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              {outlook.personalizedData.trends.map((trend, idx) => (
                <li key={idx}>• {trend}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Growth Outlook:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              outlook.growth === 'Strong' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
              {outlook.growth}
            </span>
          </div>
        </div>
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

    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        step.personalized ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-300'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{step.icon}</span>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{step.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{step.timeline}</p>
                {step.personalized && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    v2.0 Generated
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
            <h5 className="font-medium text-gray-800 mb-2">Resources:</h5>
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

  // ============================================================================
  // MAIN RENDER LOGIC
  // ============================================================================

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis (Technical Spec v2.0)..." />;
  }

  // Calculate quick stats using v2.0 data
  const careerPathConfidence = careerPathRecommendation?.confidenceScore || 0;
  const skillGapsCount = skillGapAnalysis?.skillGaps?.length || 0;
  const learningPhasesCount = learningRoadmap?.phases?.length || 0;
  const nextSteps = generateNextSteps();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header with v2.0 metadata */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Career Recommendation System v2.0 - Sequential Dependency Engine
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Currently: {userData.currentRole}
                </div>
              )}
              {careerPathRecommendation && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Path: {careerPathRecommendation.title} ({careerPathConfidence}%)
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Timeline: {userData.transitionTimeline}
                </div>
              )}
              {systemResponse && systemResponse.dataCompleteness > 0 && (
                <div className="bg-green-500 bg-opacity-20 px-4 py-2 rounded-full border border-green-300">
                  ✅ {systemResponse.dataCompleteness}% Profile Complete
                </div>
              )}
              {systemResponse && systemResponse.careerPathCriteriaComplete > 0 && (
                <div className="bg-purple-500 bg-opacity-20 px-4 py-2 rounded-full border border-purple-300">
                  🔬 {systemResponse.careerPathCriteriaComplete}/16 Criteria Present
                </div>
              )}
              {careerPathRecommendation?.confidence === 'high' && (
                <div className="bg-yellow-500 bg-opacity-20 px-4 py-2 rounded-full border border-yellow-300">
                  High-Confidence Path
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
              { id: 'home', label: 'Home', action: () => navigate('/') },
              { id: 'overview', label: 'Overview'},
              { id: 'career-path', label: 'Career Path'},
              { id: 'skill-gap', label: 'Skill Gap'},
              { id: 'roadmap', label: 'Learning Roadmap'},
              { id: 'market', label: 'Market Insights'},
              { id: 'action', label: 'Action Plan'}
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
                { label: 'Path Confidence', value: `${careerPathConfidence}%`, color: 'from-green-500 to-emerald-500'},
                { label: 'Skill Gaps', value: skillGapsCount.toString(), color: 'from-blue-500 to-cyan-500'},
                { label: 'Learning Phases', value: learningPhasesCount.toString(), color: 'from-purple-500 to-pink-500'},
                { label: 'Action Items', value: nextSteps.length.toString(), color: 'from-orange-500 to-red-500'}
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

            {/* v2.0 System Performance Indicator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3"></span>
                Technical Specification v2.0 - Sequential Dependency System
              </h2>
              {systemResponse && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall System Confidence</span>
                    <span>{systemResponse.overallConfidence}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                      style={{ width: `${systemResponse.overallConfidence}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${careerPathRecommendation ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  Career Path: {careerPathRecommendation ? 'Generated' : 'Pending'}
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${skillGapAnalysis ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  Skill Gap: {skillGapAnalysis ? 'Analyzed' : 'Pending'}
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${learningRoadmap ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  Roadmap: {learningRoadmap ? 'Created' : 'Pending'}
                </div>
              </div>
              {systemResponse && systemResponse.processedAt && (
                <div className="mt-4 text-xs text-gray-500">
                  Processed: {new Date(systemResponse.processedAt).toLocaleString()} | 
                  Engine: Sequential Dependency v2.0 | 
                  Architecture: Career Path → Skill Gap → Learning Roadmap
                </div>
              )}
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
                  v2.0 Sequential Engine
                </div>
              </div>
              {careerPathRecommendation && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <p className="text-sm text-blue-800">
                    <strong>Personalized for {userData.name}:</strong> Based on your sequential dependency analysis 
                    with {careerPathConfidence}% confidence score. Generated using {careerPathRecommendation.metadata?.criteriaUsed?.length || 0} criteria 
                    from the 16-tier career path recommendation engine.
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
                          v2.0
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

        {activeTab === 'career-path' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Career Path Recommendation (v2.0)</h2>
              <p className="text-gray-600 text-lg">
                16-criteria analysis with 4-tier weighted scoring system
              </p>
              {careerPathRecommendation && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-4xl mx-auto">
                  <p className="text-sm text-blue-800">
                    <strong>🔬 v2.0 Sequential Analysis:</strong> This recommendation is the foundation of your career journey,
                    generated using 16 comprehensive criteria with 4-tier weighting (Core Drivers 45%, Strong Motivators 25%, 
                    Supporting Evidence 20%, Background Context 10%). Your skill gap analysis and learning roadmap build upon this recommendation.
                  </p>
                </div>
              )}
            </div>
            
            {careerPathRecommendation ? (
              <div className="space-y-6">
                {/* v2.0 Career Path Card */}
                <CareerPathCard careerPath={careerPathRecommendation} />
                
                {/* Criteria Analysis */}
                {careerPathRecommendation.metadata && (
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold mb-4">16-Criteria Analysis Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Criteria Used ({careerPathRecommendation.metadata.criteriaUsed?.length || 0})</h4>
                        <div className="flex flex-wrap gap-1">
                          {careerPathRecommendation.metadata.criteriaUsed?.map((criteria, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Missing Criteria ({careerPathRecommendation.metadata.missingCriteria?.length || 0})</h4>
                        <div className="flex flex-wrap gap-1">
                          {careerPathRecommendation.metadata.missingCriteria?.slice(0, 5).map((criteria, idx) => (
                            <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Generating Career Path (v2.0)</h3>
                <p className="text-gray-500">Our sequential dependency engine is analyzing your 16 criteria profile.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skill-gap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Skill Gap Analysis (v2.0)</h2>
              <p className="text-gray-600 text-lg">Built on your career path recommendation + additional skill criteria</p>
            </div>
            {skillGapAnalysis ? (
              <div className="space-y-6">
                {/* Skill Gap Overview */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Analysis Overview</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      skillGapAnalysis.confidence === 'high' ? 'bg-green-100 text-green-700' :
                      skillGapAnalysis.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {skillGapAnalysis.confidenceScore}% confidence
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{skillGapAnalysis.requiredSkills?.length || 0}</div>
                      <div className="text-sm text-blue-700">Required Skills</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{skillGapAnalysis.skillGaps?.filter(gap => gap.priority === 'high').length || 0}</div>
                      <div className="text-sm text-orange-700">High Priority Gaps</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{skillGapAnalysis.strengthsToLeverage?.length || 0}</div>
                      <div className="text-sm text-green-700">Strengths to Leverage</div>
                    </div>
                  </div>
                </div>

                {/* Skill Gap Cards */}
                {skillGapAnalysis.skillGaps && skillGapAnalysis.skillGaps.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillGapAnalysis.skillGaps.map((skillGap, index) => (
                      <SkillGapCard key={index} skillGap={skillGap} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4"></div>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No Significant Skill Gaps</h4>
                    <p className="text-gray-500">You're well-prepared for your target career path!</p>
                  </div>
                )}

                {/* Strengths and Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skillGapAnalysis.strengthsToLeverage && skillGapAnalysis.strengthsToLeverage.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="font-semibold text-lg text-gray-800 mb-4">Strengths to Leverage</h4>
                      <ul className="space-y-2">
                        {skillGapAnalysis.strengthsToLeverage.map((strength, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-0.5">✓</span>
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {skillGapAnalysis.recommendedCertifications && skillGapAnalysis.recommendedCertifications.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="font-semibold text-lg text-gray-800 mb-4">Recommended Certifications</h4>
                      <ul className="space-y-2">
                        {skillGapAnalysis.recommendedCertifications.map((cert, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-0.5"></span>
                            <span className="text-gray-700">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Analyzing Skill Gaps (v2.0)</h3>
                <p className="text-gray-500">Building skill analysis on your career path recommendation.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Learning Roadmap (v2.0)</h2>
              <p className="text-gray-600 text-lg">Sequential learning plan built on career path + skill gap analysis</p>
            </div>
            {learningRoadmap ? (
              <div className="space-y-6">
                {/* Roadmap Overview */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Roadmap Overview</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      learningRoadmap.confidence === 'high' ? 'bg-green-100 text-green-700' :
                      learningRoadmap.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {learningRoadmap.confidenceScore}% confidence
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{learningRoadmap.totalTimelineEstimate}</div>
                      <div className="text-sm text-purple-700">Total Timeline</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{learningRoadmap.budgetEstimate}</div>
                      <div className="text-sm text-green-700">Estimated Budget</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{learningRoadmap.phases?.length || 0}</div>
                      <div className="text-sm text-blue-700">Learning Phases</div>
                    </div>
                  </div>
                </div>

                {/* Learning Phases */}
                {learningRoadmap.phases && learningRoadmap.phases.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {learningRoadmap.phases.map((phase, index) => (
                      <LearningPhaseCard key={index} phase={phase} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">⚖️</div>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No Learning Phases</h4>
                    <p className="text-gray-500">Your roadmap is still being generated.</p>
                  </div>
                )}

                {/* Flexibility and Support */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learningRoadmap.flexibilityOptions && learningRoadmap.flexibilityOptions.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="font-semibold text-lg text-gray-800 mb-4">Flexibility Options</h4>
                      <ul className="space-y-2">
                        {learningRoadmap.flexibilityOptions.map((option, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-500 mr-2 mt-0.5">•</span>
                            <span className="text-gray-700">{option}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {learningRoadmap.supportRecommendations && learningRoadmap.supportRecommendations.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h4 className="font-semibold text-lg text-gray-800 mb-4">Support Recommendations</h4>
                      <ul className="space-y-2">
                        {learningRoadmap.supportRecommendations.map((support, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-0.5">•</span>
                            <span className="text-gray-700">{support}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚖️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Learning Roadmap (v2.0)</h3>
                <p className="text-gray-500">Building your personalized learning plan based on career path and skill gaps.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Market Insights</h2>
              <p className="text-gray-600 text-lg">
                {careerPathRecommendation 
                  ? `Personalized market analysis for your career path: ${careerPathRecommendation.title}`
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
                  <div className="text-4xl mb-4"></div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Generating Market Analysis</h4>
                  <p className="text-gray-500">Creating personalized market insights...</p>
                </div>
              )}
            </div>

            {/* Job Market Outlook Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3"></span>
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
                  <div className="text-4xl mb-4"></div>
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
              <h2 className="text-3xl font-bold mb-4">Your Action Plan (v2.0)</h2>
              <p className="text-gray-600 text-lg">Sequential dependency-generated step-by-step roadmap</p>
            </div>
            {nextSteps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.map((step, index) => (
                  <ActionCard key={index} step={step} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Your Action Plan</h3>
                <p className="text-gray-500">Your personalized action plan will be generated based on v2.0 analysis.</p>
              </div>
            )}
          </div>
        )}
      </div>

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
