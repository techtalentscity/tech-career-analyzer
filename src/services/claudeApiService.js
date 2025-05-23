// src/services/claudeApiService.js - Complete Structured Recommendation System
import { CLAUDE_API_CONFIG, CLAUDE_PROMPTS } from '../config/claudeApiConfig';
import storageService from './storageService';

class ClaudeApiService {
  /**
   * Generate form field suggestions based on typical tech enthusiast profile
   * @returns {Promise<string>} The suggested form responses
   */
  async getFormSuggestions() {
    try {
      console.log("Calling Claude API for form suggestions");
      
      const requestBody = {
        model: CLAUDE_API_CONFIG.models.default,
        max_tokens: CLAUDE_API_CONFIG.maxTokens.formSuggestions,
        messages: [
          {
            role: "user",
            content: CLAUDE_PROMPTS.formSuggestions
          }
        ]
      };
      
      console.log("Request details:", {
        model: requestBody.model,
        max_tokens: requestBody.max_tokens
      });
      
      const response = await fetch('/api/claude-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Received successful response from Claude API");
      return data.content[0].text;
    } catch (error) {
      console.error('Error getting form suggestions from Claude API:', error);
      throw error;
    }
  }

  /**
   * Generate comprehensive career recommendations with structured data
   * @param {Object} formData The user's form responses
   * @returns {Promise<Object>} The structured SystemResponse with recommendations
   */
  async generateCareerRecommendations(formData) {
    try {
      console.log("🚀 Generating structured career recommendations for:", formData.fullName);
      const startTime = Date.now();
      
      // Step 1: Validate and process user profile
      const userProfile = this.validateAndProcessProfile(formData);
      console.log("✅ User profile processed:", userProfile.name);
      
      // Step 2: Generate the 3 core recommendations
      const [recommendation1, recommendation2, recommendation3] = await Promise.all([
        this.generateTechMarketRecommendation(userProfile),
        this.generateAcademicResearchRecommendation(userProfile),
        this.generatePracticalLifestyleRecommendation(userProfile)
      ]);
      
      console.log("✅ Generated 3 core recommendations");
      
      // Step 3: Calculate overall metrics
      const recommendations = [recommendation1, recommendation2, recommendation3].filter(Boolean);
      const overallConfidence = this.calculateOverallConfidence(recommendations);
      const dataCompleteness = this.assessDataCompleteness(userProfile);
      
      // Step 4: Create system response
      const systemResponse = {
        recommendations,
        overallConfidence,
        dataCompleteness,
        processingTime: Date.now() - startTime,
        generatedAt: new Date().toISOString(),
        version: "2.0"
      };
      
      // Step 5: Save to storage (maintaining existing functionality)
      try {
        const analysisData = {
          userId: formData.email || String(new Date().getTime()),
          analysis: JSON.stringify(systemResponse, null, 2),
          raw: JSON.stringify(systemResponse),
          structured: systemResponse
        };
        
        storageService.saveCareerAnalysis(analysisData);
        
        if (formData.email) {
          storageService.saveFormattedAnalysis(formData.email, JSON.stringify(systemResponse, null, 2));
        }
        
        console.log('✅ Structured analysis saved to storage');
      } catch (storageError) {
        console.error('❌ Error saving analysis to storage:', storageError);
      }
      
      console.log(`🎉 Career recommendations generated successfully in ${systemResponse.processingTime}ms`);
      return systemResponse;
      
    } catch (error) {
      console.error('❌ Error generating career recommendations:', error);
      throw error;
    }
  }

  /**
   * Validate and standardize user profile data
   */
  validateAndProcessProfile(formData) {
    return {
      // Personal Information
      name: formData.fullName || 'User',
      email: formData.email || '',
      
      // Educational Background
      educationLevel: formData.educationLevel || 'Not specified',
      studyField: formData.studyField || 'Not specified',
      
      // Career Background
      yearsExperience: formData.yearsExperience || 'Not specified',
      currentRole: formData.currentRole || 'Not specified',
      
      // Experience Details
      jobResponsibilities: formData.jobResponsibilities || '',
      jobProjects: formData.jobProjects || '',
      jobTechnologies: formData.jobTechnologies || '',
      publications: formData.publications || '',
      
      // Skills and Interests
      transferableSkills: formData.transferableSkills || '',
      techInterests: formData.techInterests || '',
      careerPathsInterest: formData.careerPathsInterest || [],
      toolsUsed: formData.toolsUsed || [],
      
      // Preferences and Goals
      workPreference: formData.workPreference || '',
      timeCommitment: formData.timeCommitment || '',
      targetSalary: formData.targetSalary || '',
      transitionTimeline: formData.transitionTimeline || '',
      
      // Experience Level
      experienceLevel: formData.experienceLevel || 'Beginner'
    };
  }

  /**
   * Generate Tech-Market Recommendation (Type 1) - Most comprehensive
   */
  async generateTechMarketRecommendation(userProfile) {
    console.log("🔧 Generating Tech-Market recommendation...");
    
    // Determine recommended role based on user interests and skills
    const recommendedRole = this.mapUserInterestsToTechRole(userProfile.careerPathsInterest, userProfile);
    
    // Calculate match score
    const matchScore = this.calculateTechMarketMatchScore(recommendedRole, userProfile);
    
    // Generate all enhanced features for Recommendation 1
    const skillGapAnalysis = this.generateSkillGapAnalysis(recommendedRole, userProfile);
    const learningMap = this.generateLearningMap(skillGapAnalysis, userProfile);
    const actionPlan = this.generateActionPlan(recommendedRole, skillGapAnalysis, learningMap, userProfile);
    const resourceHub = this.generateResourceHub(recommendedRole, skillGapAnalysis, userProfile);
    const marketInsights = this.generateMarketInsights(recommendedRole);
    
    return {
      id: `rec_1_tech_market_${Date.now()}`,
      type: 'tech-market',
      title: recommendedRole.title,
      description: recommendedRole.description,
      reasoning: this.generateTechMarketReasoning(recommendedRole, userProfile, matchScore),
      confidence: this.mapScoreToConfidence(matchScore),
      confidenceScore: matchScore,
      
      requiredSkills: recommendedRole.requiredSkills,
      suggestedActions: this.generateTechMarketActions(userProfile, recommendedRole),
      timeToTransition: learningMap.overallTimeline,
      
      // Enhanced features for Recommendation 1
      skillGapAnalysis,
      learningMap,
      actionPlan,
      resourceHub,
      
      marketInsights,
      
      metadata: {
        criteriaUsed: this.getUsedCriteria(userProfile),
        missingCriteria: this.getMissingCriteria(userProfile),
        fallbackApplied: this.requiresFallback(userProfile),
        dataQuality: this.assessProfileQuality(userProfile)
      }
    };
  }

  /**
   * Generate Academic-Research Recommendation (Type 2)
   */
  async generateAcademicResearchRecommendation(userProfile) {
    console.log("📚 Generating Academic-Research recommendation...");
    
    const recommendedRole = this.mapUserInterestsToAcademicRole(userProfile);
    const matchScore = this.calculateAcademicMatchScore(recommendedRole, userProfile);
    const resourceHub = this.generateResourceHub(recommendedRole, null, userProfile);
    
    return {
      id: `rec_2_academic_research_${Date.now()}`,
      type: 'academic-research',
      title: recommendedRole.title,
      description: recommendedRole.description,
      reasoning: this.generateAcademicReasoning(recommendedRole, userProfile, matchScore),
      confidence: this.mapScoreToConfidence(matchScore),
      confidenceScore: matchScore,
      
      requiredSkills: recommendedRole.requiredSkills,
      suggestedActions: this.generateAcademicActions(userProfile, recommendedRole),
      timeToTransition: this.estimateAcademicTimeline(userProfile),
      
      // Basic resource hub for Recommendation 2
      resourceHub,
      
      marketInsights: this.generateMarketInsights(recommendedRole),
      
      metadata: {
        criteriaUsed: this.getUsedCriteria(userProfile),
        missingCriteria: this.getMissingCriteria(userProfile),
        fallbackApplied: this.requiresFallback(userProfile),
        dataQuality: this.assessProfileQuality(userProfile)
      }
    };
  }

  /**
   * Generate Practical-Lifestyle Recommendation (Type 3)
   */
  async generatePracticalLifestyleRecommendation(userProfile) {
    console.log("🎯 Generating Practical-Lifestyle recommendation...");
    
    const recommendedRole = this.mapUserInterestsToLifestyleRole(userProfile);
    const matchScore = this.calculateLifestyleMatchScore(recommendedRole, userProfile);
    const resourceHub = this.generateResourceHub(recommendedRole, null, userProfile);
    
    return {
      id: `rec_3_practical_lifestyle_${Date.now()}`,
      type: 'practical-lifestyle',
      title: recommendedRole.title,
      description: recommendedRole.description,
      reasoning: this.generateLifestyleReasoning(recommendedRole, userProfile, matchScore),
      confidence: this.mapScoreToConfidence(matchScore),
      confidenceScore: matchScore,
      
      requiredSkills: recommendedRole.requiredSkills,
      suggestedActions: this.generateLifestyleActions(userProfile, recommendedRole),
      timeToTransition: this.estimateLifestyleTimeline(userProfile),
      
      // Basic resource hub for Recommendation 3
      resourceHub,
      
      marketInsights: this.generateMarketInsights(recommendedRole),
      
      metadata: {
        criteriaUsed: this.getUsedCriteria(userProfile),
        missingCriteria: this.getMissingCriteria(userProfile),
        fallbackApplied: this.requiresFallback(userProfile),
        dataQuality: this.assessProfileQuality(userProfile)
      }
    };
  }

  /**
   * Generate comprehensive skill gap analysis
   */
  generateSkillGapAnalysis(recommendedRole, userProfile) {
    console.log("📊 Generating skill gap analysis for:", recommendedRole.title);
    
    const currentSkills = this.analyzeCurrentSkills(userProfile);
    const requiredSkills = this.getRequiredSkillsForRole(recommendedRole.title);
    const missingSkills = this.identifyMissingSkills(currentSkills, requiredSkills);
    const skillsToImprove = this.identifySkillsToImprove(currentSkills, requiredSkills);
    
    const overallGapScore = this.calculateOverallGapScore(currentSkills, requiredSkills);
    const readinessLevel = this.determineReadinessLevel(overallGapScore);
    const prioritySkills = this.identifyPrioritySkills(missingSkills, skillsToImprove);
    const estimatedEffort = this.calculateLearningEffort(missingSkills, skillsToImprove, userProfile);
    
    return {
      currentSkills,
      missingSkills,
      skillsToImprove,
      overallGapScore,
      readinessLevel,
      prioritySkills,
      estimatedEffort
    };
  }

  /**
   * Generate comprehensive learning map
   */
  generateLearningMap(skillGapAnalysis, userProfile) {
    console.log("🗺️ Generating learning map...");
    
    const overallTimeline = this.calculateOverallTimeline(skillGapAnalysis, userProfile);
    const timeCommitment = this.calculateTimeCommitment(userProfile);
    const learningPhases = this.generateLearningPhases(skillGapAnalysis, userProfile);
    const milestones = this.generateMilestones(learningPhases);
    const successMetrics = this.generateSuccessMetrics(learningPhases);
    
    return {
      overallTimeline,
      transitionTimeline: {
        preparation: "2 weeks",
        learning: `${Math.floor(learningPhases.length * 6/4)}-${Math.ceil(learningPhases.length * 8/4)} weeks`,
        application: "4-6 weeks",
        jobSearch: "2-3 weeks"
      },
      timeCommitment,
      learningPhases,
      milestones,
      successMetrics
    };
  }

  /**
   * Generate comprehensive action plan
   */
  generateActionPlan(recommendedRole, skillGapAnalysis, learningMap, userProfile) {
    console.log("📋 Generating action plan...");
    
    const transitionStrategy = this.generateTransitionStrategy(recommendedRole, userProfile, learningMap);
    const strengthAnalysis = this.generateStrengthAnalysis(userProfile, recommendedRole);
    const keyPerformanceIndicators = this.generateKPIs(skillGapAnalysis, learningMap, userProfile);
    const weeklyGoals = this.generateWeeklyGoals(learningMap, userProfile);
    const checklistItems = this.generateChecklistItems(skillGapAnalysis, learningMap);
    const riskMitigation = this.generateRiskMitigation(userProfile, learningMap);
    
    return {
      transitionStrategy,
      strengthAnalysis,
      keyPerformanceIndicators,
      weeklyGoals,
      checklistItems,
      riskMitigation
    };
  }

  /**
   * Generate comprehensive resource hub
   */
  generateResourceHub(recommendedRole, skillGapAnalysis, userProfile) {
    console.log("📚 Generating resource hub...");
    
    const jobSearchStrategy = this.generateJobSearchStrategy(recommendedRole, userProfile);
    const courseRecommendations = this.generateCourseRecommendations(skillGapAnalysis, recommendedRole);
    const interviewPreparation = this.generateInterviewPreparation(recommendedRole, skillGapAnalysis);
    const careerGuides = this.generateCareerGuides(recommendedRole);
    const systemActions = this.generateSystemActions();
    const additionalResources = this.generateAdditionalResources(recommendedRole);
    
    return {
      jobSearchStrategy,
      courseRecommendations,
      interviewPreparation,
      careerGuides,
      systemActions,
      additionalResources
    };
  }

  /**
   * Generate market insights for specific role
   */
  generateMarketInsights(recommendedRole) {
    console.log("📈 Generating market insights for:", recommendedRole.title);
    
    const regionalOpportunities = this.generateRegionalOpportunities(recommendedRole.title);
    const emergingTechnologies = this.generateEmergingTechnologies(recommendedRole.title);
    const salaryTrends = this.generateSalaryTrends(recommendedRole.title);
    const industryAnalysis = this.generateIndustryAnalysis(recommendedRole.title);
    
    return {
      regionalOpportunities,
      emergingTechnologies,
      salaryTrends,
      industryAnalysis
    };
  }

  // ============================================================================
  // ROLE MAPPING FUNCTIONS
  // ============================================================================

  mapUserInterestsToTechRole(careerInterests, userProfile) {
    const primaryInterest = careerInterests?.[0] || 'Software Development';
    
    const roleMap = {
      'Software Development': {
        title: 'Software Developer',
        description: 'Build and maintain software applications, websites, and systems using programming languages and frameworks.',
        requiredSkills: ['Programming Languages', 'Version Control (Git)', 'Database Management', 'API Development', 'Testing Frameworks'],
        category: 'development',
        level: 'mid'
      },
      'Data Analysis/Science': {
        title: 'Data Scientist',
        description: 'Analyze complex data to extract insights, build predictive models, and drive data-driven decision making.',
        requiredSkills: ['Python Programming', 'Statistical Analysis', 'Machine Learning', 'Data Visualization', 'SQL Databases'],
        category: 'data',
        level: 'senior'
      },
      'UX/UI Design': {
        title: 'UX Designer',
        description: 'Create user-friendly interfaces and experiences for digital products, focusing on usability and aesthetics.',
        requiredSkills: ['Design Thinking', 'Prototyping Tools', 'User Research', 'Visual Design', 'Frontend Fundamentals'],
        category: 'design',
        level: 'mid'
      },
      'Product Management': {
        title: 'Product Manager',
        description: 'Guide product development from conception to launch, working with cross-functional teams to deliver user value.',
        requiredSkills: ['Product Strategy', 'Data Analytics', 'Agile Methodologies', 'Stakeholder Management', 'Market Research'],
        category: 'management',
        level: 'senior'
      },
      'Cybersecurity': {
        title: 'Cybersecurity Analyst',
        description: 'Protect organizations from digital threats by monitoring security, investigating incidents, and implementing safeguards.',
        requiredSkills: ['Network Security', 'Security Frameworks', 'Incident Response', 'Risk Assessment', 'Security Tools'],
        category: 'security',
        level: 'mid'
      },
      'Cloud Engineering': {
        title: 'Cloud Engineer',
        description: 'Design, implement, and manage cloud computing systems and infrastructure on platforms like AWS, Azure, or GCP.',
        requiredSkills: ['Cloud Platforms', 'Infrastructure as Code', 'Containerization', 'Networking', 'Security'],
        category: 'infrastructure',
        level: 'mid'
      },
      'DevOps': {
        title: 'DevOps Engineer',
        description: 'Bridge development and operations, automating deployment pipelines and managing cloud infrastructure.',
        requiredSkills: ['Cloud Infrastructure', 'Infrastructure as Code', 'CI/CD Pipelines', 'Containerization', 'Monitoring and Logging'],
        category: 'infrastructure',
        level: 'senior'
      },
      'AI/Machine Learning': {
        title: 'Machine Learning Engineer',
        description: 'Design and implement ML systems, deploy models into production, and optimize AI algorithms.',
        requiredSkills: ['Deep Learning', 'MLOps', 'Cloud Platforms', 'Model Deployment', 'Data Pipeline Engineering'],
        category: 'ai',
        level: 'senior'
      }
    };
    
    return roleMap[primaryInterest] || roleMap['Software Development'];
  }

  mapUserInterestsToAcademicRole(userProfile) {
    const hasAdvancedDegree = userProfile.educationLevel === 'Master\'s Degree' || userProfile.educationLevel === 'PhD';
    const hasPublications = userProfile.publications && userProfile.publications.length > 10;
    
    if (hasAdvancedDegree || hasPublications) {
      return {
        title: 'Research Scientist',
        description: 'Conduct advanced research in technology fields, publish findings, and contribute to scientific knowledge.',
        requiredSkills: ['Research Methodology', 'Academic Writing', 'Statistical Analysis', 'Grant Writing', 'Peer Review'],
        category: 'research',
        level: 'expert'
      };
    } else {
      return {
        title: 'Technology Researcher',
        description: 'Support research initiatives, analyze technical trends, and contribute to technology development projects.',
        requiredSkills: ['Research Skills', 'Technical Writing', 'Data Analysis', 'Literature Review', 'Project Support'],
        category: 'research',
        level: 'mid'
      };
    }
  }

  mapUserInterestsToLifestyleRole(userProfile) {
    const prefersRemote = userProfile.workPreference === 'Remote work';
    const prefersFlexible = userProfile.timeCommitment === '20+ hours' || userProfile.timeCommitment === '15-20 hours';
    
    if (prefersRemote && prefersFlexible) {
      return {
        title: 'Freelance Tech Consultant',
        description: 'Provide specialized technology consulting services to multiple clients on a flexible schedule.',
        requiredSkills: ['Specialized Expertise', 'Client Management', 'Business Development', 'Communication', 'Time Management'],
        category: 'consulting',
        level: 'senior'
      };
    } else {
      return {
        title: 'Technical Support Specialist',
        description: 'Help users and organizations solve technical problems and optimize their technology usage.',
        requiredSkills: ['Problem Solving', 'Customer Service', 'Technical Knowledge', 'Communication', 'Documentation'],
        category: 'support',
        level: 'entry'
      };
    }
  }

  // ============================================================================
  // SKILL ANALYSIS FUNCTIONS
  // ============================================================================

  analyzeCurrentSkills(userProfile) {
    const skills = [];
    
    // Analyze tools used
    if (userProfile.toolsUsed && userProfile.toolsUsed.length > 0) {
      userProfile.toolsUsed.forEach(tool => {
        if (tool !== 'None') {
          skills.push({
            name: tool,
            category: this.categorizeSkill(tool),
            currentLevel: this.assessToolLevel(tool, userProfile),
            requiredLevel: 'intermediate',
            gap: 0,
            importance: 'important',
            marketDemand: 8,
            salaryImpact: 5000,
            timeToAcquire: 'Already acquired',
            learningResources: []
          });
        }
      });
    }
    
    // Analyze transferable skills
    if (userProfile.transferableSkills) {
      const transferableSkillsList = userProfile.transferableSkills.split(',').map(s => s.trim());
      transferableSkillsList.forEach(skill => {
        if (skill.length > 3) {
          skills.push({
            name: skill,
            category: 'soft',
            currentLevel: 'intermediate',
            requiredLevel: 'intermediate',
            gap: 0,
            importance: 'important',
            marketDemand: 9,
            salaryImpact: 6000,
            timeToAcquire: 'Already acquired',
            learningResources: []
          });
        }
      });
    }
    
    return skills;
  }

  getRequiredSkillsForRole(roleTitle) {
    const roleRequirements = {
      'Software Developer': [
        { name: 'JavaScript', level: 'advanced', importance: 'critical', timeToLearn: '3-4 months' },
        { name: 'React', level: 'intermediate', importance: 'important', timeToLearn: '2-3 months' },
        { name: 'Node.js', level: 'intermediate', importance: 'important', timeToLearn: '2-3 months' },
        { name: 'Database Management', level: 'intermediate', importance: 'critical', timeToLearn: '2-3 months' },
        { name: 'Version Control (Git)', level: 'intermediate', importance: 'critical', timeToLearn: '1-2 months' }
      ],
      'Data Scientist': [
        { name: 'Python', level: 'advanced', importance: 'critical', timeToLearn: '3-4 months' },
        { name: 'Machine Learning', level: 'advanced', importance: 'critical', timeToLearn: '4-6 months' },
        { name: 'Statistical Analysis', level: 'advanced', importance: 'critical', timeToLearn: '3-4 months' },
        { name: 'Data Visualization', level: 'intermediate', importance: 'important', timeToLearn: '2-3 months' },
        { name: 'SQL', level: 'intermediate', importance: 'critical', timeToLearn: '2-3 months' }
      ],
      'UX Designer': [
        { name: 'Design Thinking', level: 'advanced', importance: 'critical', timeToLearn: '3-4 months' },
        { name: 'Prototyping Tools', level: 'advanced', importance: 'critical', timeToLearn: '2-3 months' },
        { name: 'User Research', level: 'intermediate', importance: 'critical', timeToLearn: '3-4 months' },
        { name: 'Visual Design', level: 'intermediate', importance: 'important', timeToLearn: '3-4 months' },
        { name: 'Frontend Fundamentals', level: 'beginner', importance: 'nice-to-have', timeToLearn: '2-3 months' }
      ],
      'Machine Learning Engineer': [
        { name: 'Deep Learning', level: 'advanced', importance: 'critical', timeToLearn: '4-6 months' },
        { name: 'MLOps', level: 'intermediate', importance: 'critical', timeToLearn: '3-4 months' },
        { name: 'Python', level: 'advanced', importance: 'critical', timeToLearn: '3-4 months' },
        { name: 'Cloud Platforms', level: 'intermediate', importance: 'important', timeToLearn: '2-3 months' },
        { name: 'Model Deployment', level: 'intermediate', importance: 'critical', timeToLearn: '2-3 months' }
      ]
    };
    
    return roleRequirements[roleTitle] || roleRequirements['Software Developer'];
  }

  identifyMissingSkills(currentSkills, requiredSkills) {
    const currentSkillNames = currentSkills.map(s => s.name.toLowerCase());
    
    return requiredSkills
      .filter(required => !currentSkillNames.some(current => current.includes(required.name.toLowerCase())))
      .map(skill => ({
        name: skill.name,
        category: this.categorizeSkill(skill.name),
        currentLevel: 'none',
        requiredLevel: skill.level,
        gap: this.levelToNumber(skill.level),
        importance: skill.importance,
        marketDemand: this.getMarketDemand(skill.name),
        salaryImpact: this.getSalaryImpact(skill.name),
        timeToAcquire: skill.timeToLearn,
        learningResources: this.getLearningResources(skill.name)
      }));
  }

  identifySkillsToImprove(currentSkills, requiredSkills) {
    const improvementNeeded = [];
    
    currentSkills.forEach(current => {
      const required = requiredSkills.find(r => 
        r.name.toLowerCase().includes(current.name.toLowerCase()) ||
        current.name.toLowerCase().includes(r.name.toLowerCase())
      );
      
      if (required && this.levelToNumber(required.level) > this.levelToNumber(current.currentLevel)) {
        improvementNeeded.push({
          ...current,
          requiredLevel: required.level,
          gap: this.levelToNumber(required.level) - this.levelToNumber(current.currentLevel),
          importance: required.importance,
          timeToAcquire: this.getImprovementTime(current.currentLevel, required.level)
        });
      }
    });
    
    return improvementNeeded;
  }

  // ============================================================================
  // LEARNING MAP GENERATION
  // ============================================================================

  generateLearningPhases(skillGapAnalysis, userProfile) {
    const phases = [];
    const prioritySkills = skillGapAnalysis.prioritySkills || [];
    const missingSkills = skillGapAnalysis.missingSkills || [];
    
    // Phase 1: Foundation
    phases.push({
      id: 'phase_1_foundation',
      name: 'Foundation Building',
      description: 'Build core technical skills and understanding',
      duration: '6-8 weeks',
      order: 1,
      skillsFocus: prioritySkills.slice(0, 3),
      learningObjectives: [
        'Establish strong technical foundation',
        'Develop consistent learning habits',
        'Build basic practical skills'
      ],
      deliverables: [
        'Complete foundational courses',
        'Build first practice projects',
        'Set up development environment'
      ],
      resources: this.getPhaseResources('foundation'),
      prerequisites: [],
      estimatedHours: 120,
      difficulty: 'beginner'
    });
    
    // Phase 2: Core Skills
    phases.push({
      id: 'phase_2_core',
      name: 'Core Skill Development',
      description: 'Develop intermediate skills in key areas',
      duration: '6-8 weeks',
      order: 2,
      skillsFocus: prioritySkills.slice(1, 4),
      learningObjectives: [
        'Master core technical skills',
        'Build intermediate projects',
        'Understand best practices'
      ],
      deliverables: [
        'Complete intermediate projects',
        'Demonstrate skill proficiency',
        'Build portfolio pieces'
      ],
      resources: this.getPhaseResources('core'),
      prerequisites: ['phase_1_foundation'],
      estimatedHours: 150,
      difficulty: 'intermediate'
    });
    
    // Phase 3: Advanced Application
    phases.push({
      id: 'phase_3_advanced',
      name: 'Advanced Application',
      description: 'Apply skills in complex, real-world scenarios',
      duration: '6-8 weeks',
      order: 3,
      skillsFocus: prioritySkills.slice(2, 5),
      learningObjectives: [
        'Apply skills to complex problems',
        'Build professional-quality projects',
        'Prepare for job market'
      ],
      deliverables: [
        'Complete capstone projects',
        'Build professional portfolio',
        'Prepare for interviews'
      ],
      resources: this.getPhaseResources('advanced'),
      prerequisites: ['phase_1_foundation', 'phase_2_core'],
      estimatedHours: 180,
      difficulty: 'advanced'
    });
    
    return phases;
  }

  generateMilestones(learningPhases) {
    const milestones = [];
    
    learningPhases.forEach((phase, index) => {
      milestones.push({
        id: `milestone_${phase.id}`,
        name: `${phase.name} Complete`,
        description: `Successfully complete ${phase.name} phase`,
        targetDate: `Week ${(index + 1) * 8}`,
        criteria: phase.deliverables,
        validation: `Portfolio review and skill assessment`,
        importance: 'critical'
      });
    });
    
    return milestones;
  }

  // ============================================================================
  // ACTION PLAN GENERATION
  // ============================================================================

  generateTransitionStrategy(recommendedRole, userProfile, learningMap) {
    return {
      currentState: `${userProfile.currentRole} with ${userProfile.yearsExperience} experience`,
      targetState: recommendedRole.title,
      transitionPath: `Structured learning approach building on ${userProfile.studyField} background`,
      approach: this.determineTransitionApproach(userProfile),
      timeline: learningMap.overallTimeline,
      phases: this.mapLearningPhasesToTransition(learningMap.learningPhases),
      leverageOpportunities: this.identifyLeverageOpportunities(userProfile),
      networkingStrategy: this.generateNetworkingStrategy(recommendedRole.title),
      portfolioStrategy: `Build progressive portfolio showcasing ${recommendedRole.title} capabilities`
    };
  }

  generateKPIs(skillGapAnalysis, learningMap, userProfile) {
    const kpis = [];
    
    // Technical KPIs
    if (skillGapAnalysis.prioritySkills) {
      skillGapAnalysis.prioritySkills.slice(0, 3).forEach((skill, index) => {
        kpis.push({
          id: `kpi_tech_${index + 1}`,
          category: 'technical',
          name: `${skill} Proficiency`,
          description: `Achieve proficiency in ${skill}`,
          targetValue: 'Intermediate level demonstrated',
          currentValue: 'Beginner',
          measurement: 'Project completion and skill assessment',
          deadline: `Week ${8 + (index * 4)}`,
          priority: 'critical',
          weight: 20,
          milestones: this.generateSkillMilestones(skill),
          completed: false,
          validationCriteria: [`Build project demonstrating ${skill}`, 'Pass skill assessment']
        });
      });
    }
    
    // Portfolio KPI
    kpis.push({
      id: 'kpi_portfolio',
      category: 'project',
      name: 'Professional Portfolio',
      description: 'Build comprehensive portfolio',
      targetValue: '3 completed projects',
      currentValue: '0 projects',
      measurement: 'Portfolio quality and completeness',
      deadline: learningMap.overallTimeline,
      priority: 'critical',
      weight: 30,
      milestones: [
        { id: 'portfolio_1', name: 'First Project', target: 'Complete first portfolio project', deadline: 'Week 8', completed: false },
        { id: 'portfolio_2', name: 'Second Project', target: 'Complete second portfolio project', deadline: 'Week 16', completed: false },
        { id: 'portfolio_3', name: 'Final Portfolio', target: 'Complete professional portfolio', deadline: 'Week 24', completed: false }
      ],
      completed: false,
      validationCriteria: ['3 working projects', 'Professional presentation', 'Code quality standards']
    });
    
    return kpis;
  }

  generateWeeklyGoals(learningMap, userProfile) {
    const weeklyGoals = [];
    const hoursPerWeek = parseInt(userProfile.timeCommitment?.split('-')[0]) || 10;
    
    learningMap.learningPhases.forEach((phase, phaseIndex) => {
      const phaseDurationWeeks = 8; // Standard 8 weeks per phase
      const skillsPerWeek = Math.ceil(phase.skillsFocus.length / phaseDurationWeeks);
      
      for (let week = 1; week <= phaseDurationWeeks; week++) {
        const weekNumber = (phaseIndex * phaseDurationWeeks) + week;
        const weekSkills = phase.skillsFocus.slice((week - 1) * skillsPerWeek, week * skillsPerWeek);
        
        weeklyGoals.push({
          week: weekNumber,
          focus: weekSkills.join(', ') || phase.name,
          learningHours: hoursPerWeek,
          tasks: this.generateWeeklyTasks(weekSkills, phase, hoursPerWeek),
          deliverables: [`Practice ${weekSkills[0] || 'core skills'}`, 'Complete weekly exercises'],
          assessment: 'Self-assessment and progress review'
        });
      }
    });
    
    return weeklyGoals.slice(0, 24); // Limit to 24 weeks
  }

  generateWeeklyTasks(skills, phase, hoursPerWeek) {
    const tasks = [];
    
    skills.forEach((skill, index) => {
      tasks.push({
        id: `task_${skill.replace(/\s+/g, '_').toLowerCase()}`,
        task: `Study ${skill}`,
        estimatedHours: Math.floor(hoursPerWeek / skills.length),
        priority: index === 0 ? 'high' : 'medium',
        type: 'learning',
        completed: false
      });
    });
    
    tasks.push({
      id: 'practice_task',
      task: 'Complete practice exercises',
      estimatedHours: Math.floor(hoursPerWeek * 0.3),
      priority: 'high',
      type: 'practice',
      completed: false
    });
    
    return tasks;
  }

  generateChecklistItems(skillGapAnalysis, learningMap) {
    const items = [];
    
    // Daily habits
    items.push({
      id: 'daily_coding',
      category: 'daily',
      item: 'Practice coding for 1+ hour',
      description: 'Build consistent coding habits',
      frequency: 'Daily',
      completed: false,
      completedCount: 0,
      targetCount: 100,
      importance: 'habit'
    });
    
    // Weekly goals
    items.push({
      id: 'weekly_progress',
      category: 'weekly',
      item: 'Complete weekly learning goals',
      description: 'Stay on track with learning plan',
      frequency: 'Weekly',
      completed: false,
      completedCount: 0,
      targetCount: 24,
      importance: 'milestone'
    });
    
    // Monthly milestones
    items.push({
      id: 'monthly_project',
      category: 'monthly',
      item: 'Complete monthly project',
      description: 'Build portfolio with regular projects',
      frequency: 'Monthly',
      completed: false,
      completedCount: 0,
      targetCount: 6,
      importance: 'milestone'
    });
    
    return items;
  }

  // ============================================================================
  // RESOURCE HUB GENERATION
  // ============================================================================

  generateJobSearchStrategy(recommendedRole, userProfile) {
    return {
      targetRole: recommendedRole.title,
      tailoredStrategy: this.generateJobSearchPhases(recommendedRole.title),
      resumeOptimization: this.generateResumeGuidance(recommendedRole.title),
      applicationStrategy: this.generateApplicationStrategy(recommendedRole.title),
      networkingApproach: this.generateNetworkingApproach(recommendedRole.title),
      salaryNegotiation: this.generateSalaryGuidance(recommendedRole.title),
      commonMistakes: this.getCommonJobSearchMistakes(),
      successTips: this.getJobSearchSuccessTips()
    };
  }

  generateCourseRecommendations(skillGapAnalysis, recommendedRole) {
    const recommendations = [];
    
    if (skillGapAnalysis?.missingSkills) {
      skillGapAnalysis.missingSkills.slice(0, 5).forEach(skill => {
        recommendations.push({
          category: 'technical',
          title: `${skill.name} Fundamentals`,
          provider: 'Coursera',
          description: `Master ${skill.name} for ${recommendedRole.title}`,
          relevance: 10,
          duration: skill.timeToAcquire,
          cost: 'medium',
          difficulty: skill.requiredLevel,
          url: '#',
          rating: 4.5,
          completionRate: 85,
          outcomeAlignment: `Essential for ${recommendedRole.title}`,
          prerequisites: []
        });
      });
    }
    
    return recommendations;
  }

  generateInterviewPreparation(recommendedRole, skillGapAnalysis) {
    return {
      targetRole: recommendedRole.title,
      interviewTypes: this.getInterviewTypes(recommendedRole.title),
      technicalPrep: this.getTechnicalPrepGuidance(recommendedRole.title),
      behavioralPrep: this.getBehavioralPrepGuidance(),
      portfolioPresentation: this.getPortfolioGuidance(recommendedRole.title),
      mockInterviews: this.getMockInterviewResources(),
      commonQuestions: this.getCommonQuestions(recommendedRole.title)
    };
  }

  generateSystemActions() {
    return [
      {
        action: 'Retake Career Assessment',
        description: 'Update your career recommendations',
        icon: 'refresh',
        url: '/career/test',
        type: 'internal',
        enabled: true
      },
      {
        action: 'Download Results',
        description: 'Download PDF report',
        icon: 'download',
        url: '/results/download',
        type: 'download',
        enabled: true
      },
      {
        action: 'Share Results',
        description: 'Share with mentors',
        icon: 'share',
        url: '/results/share',
        type: 'internal',
        enabled: true
      }
    ];
  }

  // ============================================================================
  // MARKET INSIGHTS GENERATION
  // ============================================================================

  generateRegionalOpportunities(roleTitle) {
    const opportunityMap = {
      'Software Developer': [
        { location: 'San Francisco, CA', jobCount: 1200, growthRate: 15, avgSalary: 145000, competitionLevel: 'high', remoteAvailable: true, advice: 'High competition but excellent compensation' },
        { location: 'Austin, TX', jobCount: 800, growthRate: 25, avgSalary: 115000, competitionLevel: 'medium', remoteAvailable: true, advice: 'Fastest growing tech hub with good work-life balance' },
        { location: 'Remote', jobCount: 2000, growthRate: 35, avgSalary: 125000, competitionLevel: 'medium', remoteAvailable: true, advice: 'Expanding remote opportunities' }
      ],
      'Data Scientist': [
        { location: 'New York, NY', jobCount: 900, growthRate: 20, avgSalary: 155000, competitionLevel: 'high', remoteAvailable: true, advice: 'Financial sector offers premium salaries' },
        { location: 'Seattle, WA', jobCount: 700, growthRate: 18, avgSalary: 145000, competitionLevel: 'high', remoteAvailable: true, advice: 'Tech giants concentration' },
        { location: 'Remote', jobCount: 1500, growthRate: 40, avgSalary: 135000, competitionLevel: 'medium', remoteAvailable: true, advice: 'Strong remote data science market' }
      ]
    };
    
    return opportunityMap[roleTitle] || opportunityMap['Software Developer'];
  }

  generateEmergingTechnologies(roleTitle) {
    const techMap = {
      'Software Developer': [
        { technology: 'AI/ML Integration', adoptionRate: 65, salaryPremium: 15000, timeToLearn: '3-6 months', priority: 'critical', description: 'AI-powered development tools' },
        { technology: 'WebAssembly', adoptionRate: 25, salaryPremium: 8000, timeToLearn: '2-3 months', priority: 'beneficial', description: 'High-performance web applications' }
      ],
      'Data Scientist': [
        { technology: 'MLOps Platforms', adoptionRate: 75, salaryPremium: 20000, timeToLearn: '2-4 months', priority: 'critical', description: 'Production ML pipeline management' },
        { technology: 'AutoML', adoptionRate: 45, salaryPremium: 12000, timeToLearn: '1-2 months', priority: 'beneficial', description: 'Automated machine learning' }
      ]
    };
    
    return techMap[roleTitle] || techMap['Software Developer'];
  }

  generateSalaryTrends(roleTitle) {
    const salaryMap = {
      'Software Developer': {
        currentRange: { entry: [65000, 95000], mid: [95000, 140000], senior: [140000, 200000] },
        trendDirection: 'rising',
        growthRate: 8.5,
        skillPremiums: [
          { skill: 'React', bonus: 12000 },
          { skill: 'Cloud Platforms', bonus: 15000 },
          { skill: 'Full Stack', bonus: 18000 }
        ],
        negotiationTips: ['Highlight full-stack capabilities', 'Emphasize problem-solving skills', 'Mention remote work flexibility']
      },
      'Data Scientist': {
        currentRange: { entry: [85000, 115000], mid: [115000, 160000], senior: [160000, 220000] },
        trendDirection: 'rising',
        growthRate: 12.3,
        skillPremiums: [
          { skill: 'Deep Learning', bonus: 20000 },
          { skill: 'MLOps', bonus: 25000 },
          { skill: 'Domain Expertise', bonus: 15000 }
        ],
        negotiationTips: ['Highlight business impact', 'Emphasize statistical rigor', 'Mention cross-functional collaboration']
      }
    };
    
    return salaryMap[roleTitle] || salaryMap['Software Developer'];
  }

  generateIndustryAnalysis(roleTitle) {
    return [
      {
        industry: 'Technology',
        demandLevel: 9,
        avgSalary: 135000,
        stabilityScore: 8,
        growthPotential: 'high',
        requiredSkills: ['Technical Excellence', 'Innovation', 'Scalability'],
        advantages: 'Cutting-edge work, excellent compensation, growth opportunities'
      },
      {
        industry: 'Finance',
        demandLevel: 8,
        avgSalary: 145000,
        stabilityScore: 9,
        growthPotential: 'medium',
        requiredSkills: ['Reliability', 'Security', 'Compliance'],
        advantages: 'High compensation, stability, regulatory protection'
      },
      {
        industry: 'Healthcare',
        demandLevel: 7,
        avgSalary: 125000,
        stabilityScore: 9,
        growthPotential: 'high',
        requiredSkills: ['Privacy', 'Accuracy', 'Compliance'],
        advantages: 'Meaningful impact, job security, growing demand'
      }
    ];
  }

  // ============================================================================
  // SCORING AND CALCULATION FUNCTIONS
  // ============================================================================

  calculateTechMarketMatchScore(role, userProfile) {
    let score = 50; // Base score
    
    // Interest alignment (30 points max)
    if (userProfile.careerPathsInterest?.includes('Software Development')) score += 25;
    if (userProfile.careerPathsInterest?.includes('Data Analysis/Science')) score += 20;
    if (userProfile.careerPathsInterest?.includes('UX/UI Design')) score += 15;
    
    // Experience level (20 points max)
    const expLevels = { 'Advanced': 20, 'Intermediate': 15, 'Beginner': 10, 'Complete beginner': 5 };
    score += expLevels[userProfile.experienceLevel] || 5;
    
    // Education alignment (15 points max)
    if (userProfile.studyField?.toLowerCase().includes('computer')) score += 15;
    if (userProfile.studyField?.toLowerCase().includes('engineering')) score += 12;
    if (userProfile.studyField?.toLowerCase().includes('science')) score += 10;
    
    // Tools experience (15 points max)
    if (userProfile.toolsUsed?.length > 3) score += 15;
    else if (userProfile.toolsUsed?.length > 1) score += 10;
    else if (userProfile.toolsUsed?.length > 0 && !userProfile.toolsUsed.includes('None')) score += 5;
    
    return Math.min(Math.round(score), 95);
  }

  calculateAcademicMatchScore(role, userProfile) {
    let score = 40;
    
    // Education level (40 points max)
    if (userProfile.educationLevel === 'PhD') score += 40;
    else if (userProfile.educationLevel === 'Master\'s Degree') score += 30;
    else if (userProfile.educationLevel === 'Bachelor\'s Degree') score += 20;
    
    // Publications (20 points max)
    if (userProfile.publications && userProfile.publications.length > 50) score += 20;
    else if (userProfile.publications && userProfile.publications.length > 10) score += 10;
    
    // Research interest (20 points max)
    if (userProfile.techInterests?.toLowerCase().includes('research')) score += 20;
    if (userProfile.techInterests?.toLowerCase().includes('analysis')) score += 15;
    
    return Math.min(Math.round(score), 90);
  }

  calculateLifestyleMatchScore(role, userProfile) {
    let score = 45;
    
    // Work preference alignment (25 points max)
    if (userProfile.workPreference === 'Remote work') score += 25;
    else if (userProfile.workPreference === 'Hybrid') score += 20;
    else if (userProfile.workPreference === 'Flexible') score += 15;
    
    // Time commitment alignment (25 points max)
    if (userProfile.timeCommitment === '20+ hours') score += 25;
    else if (userProfile.timeCommitment === '15-20 hours') score += 20;
    else if (userProfile.timeCommitment === '10-15 hours') score += 15;
    
    // Experience level (10 points max)
    const expLevels = { 'Advanced': 10, 'Intermediate': 8, 'Beginner': 6, 'Complete beginner': 4 };
    score += expLevels[userProfile.experienceLevel] || 4;
    
    return Math.min(Math.round(score), 85);
  }

  calculateOverallConfidence(recommendations) {
    if (!recommendations || recommendations.length === 0) return 0;
    
    const avgConfidence = recommendations.reduce((sum, rec) => sum + (rec.confidenceScore || 0), 0) / recommendations.length;
    return Math.round(avgConfidence);
  }

  assessDataCompleteness(userProfile) {
    const requiredFields = ['name', 'careerPathsInterest', 'experienceLevel', 'studyField', 'timeCommitment'];
    const optionalFields = ['toolsUsed', 'transferableSkills', 'workPreference', 'targetSalary'];
    
    const requiredComplete = requiredFields.filter(field => 
      userProfile[field] && userProfile[field] !== 'Not specified' && 
      !(Array.isArray(userProfile[field]) && userProfile[field].length === 0)
    ).length;
    
    const optionalComplete = optionalFields.filter(field => 
      userProfile[field] && userProfile[field] !== 'Not specified' &&
      !(Array.isArray(userProfile[field]) && userProfile[field].length === 0)
    ).length;
    
    const requiredScore = (requiredComplete / requiredFields.length) * 70;
    const optionalScore = (optionalComplete / optionalFields.length) * 30;
    
    return Math.round(requiredScore + optionalScore);
  }

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  mapScoreToConfidence(score) {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  }

  categorizeSkill(skillName) {
    const skillLower = skillName.toLowerCase();
    
    if (['javascript', 'python', 'java', 'sql', 'react', 'node'].some(tech => skillLower.includes(tech))) {
      return 'technical';
    } else if (['communication', 'teamwork', 'leadership'].some(soft => skillLower.includes(soft))) {
      return 'soft';
    } else if (['design', 'figma', 'photoshop'].some(design => skillLower.includes(design))) {
      return 'design';
    } else {
      return 'technical';
    }
  }

  levelToNumber(level) {
    const levels = { 'none': 0, 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4 };
    return levels[level] || 1;
  }

  getMarketDemand(skillName) {
    const demandMap = {
      'JavaScript': 9, 'Python': 9, 'React': 8, 'Node.js': 8, 'SQL': 9,
      'Machine Learning': 10, 'Data Science': 9, 'UX Design': 7, 'Cloud Platforms': 8
    };
    return demandMap[skillName] || 7;
  }

  getSalaryImpact(skillName) {
    const impactMap = {
      'JavaScript': 15000, 'Python': 18000, 'React': 12000, 'Machine Learning': 25000,
      'Cloud Platforms': 20000, 'UX Design': 15000, 'DevOps': 22000
    };
    return impactMap[skillName] || 10000;
  }

  getLearningResources(skillName) {
    return [`${skillName} Complete Course`, `${skillName} Practical Projects`, `${skillName} Certification Program`];
  }

  // ============================================================================
  // BACKWARD COMPATIBILITY
  // ============================================================================

  /**
   * Legacy method for backward compatibility
   * @deprecated Use generateCareerRecommendations instead
   */
  async analyzeCareerPath(formData) {
    console.log("⚠️ Using legacy analyzeCareerPath method - consider upgrading to generateCareerRecommendations");
    
    try {
      const structuredResponse = await this.generateCareerRecommendations(formData);
      
      // Convert structured response back to text format for legacy compatibility
      const textAnalysis = this.convertStructuredToText(structuredResponse);
      
      return textAnalysis;
    } catch (error) {
      console.error('Error in legacy analyzeCareerPath:', error);
      throw error;
    }
  }

  convertStructuredToText(structuredResponse) {
    let text = "CAREER ANALYSIS RESULTS\n\n";
    
    structuredResponse.recommendations.forEach((rec, index) => {
      text += `RECOMMENDATION ${index + 1}: ${rec.title}\n`;
      text += `Description: ${rec.description}\n`;
      text += `Match Score: ${rec.confidenceScore}%\n`;
      text += `Reasoning: ${rec.reasoning}\n\n`;
      
      if (rec.skillGapAnalysis) {
        text += "SKILLS GAP ANALYSIS:\n";
        rec.skillGapAnalysis.missingSkills.forEach(skill => {
          text += `- ${skill.name}: ${skill.importance} (${skill.timeToAcquire})\n`;
        });
        text += "\n";
      }
      
      if (rec.learningMap) {
        text += "LEARNING ROADMAP:\n";
        rec.learningMap.learningPhases.forEach(phase => {
          text += `${phase.name} (${phase.duration}): ${phase.skillsFocus.join(', ')}\n`;
        });
        text += "\n";
      }
      
      text += "---\n\n";
    });
    
    return text;
  }

  // Helper methods for various generators (simplified implementations)
  getUsedCriteria(userProfile) {
    const criteria = [];
    if (userProfile.careerPathsInterest?.length > 0) criteria.push('careerInterests');
    if (userProfile.experienceLevel) criteria.push('experienceLevel');
    if (userProfile.studyField !== 'Not specified') criteria.push('studyField');
    if (userProfile.toolsUsed?.length > 0) criteria.push('toolsUsed');
    return criteria;
  }

  getMissingCriteria(userProfile) {
    const missing = [];
    if (!userProfile.careerPathsInterest || userProfile.careerPathsInterest.length === 0) missing.push('careerInterests');
    if (!userProfile.experienceLevel) missing.push('experienceLevel');
    if (userProfile.studyField === 'Not specified') missing.push('studyField');
    return missing;
  }

  requiresFallback(userProfile) {
    return this.getMissingCriteria(userProfile).length > 2;
  }

  assessProfileQuality(userProfile) {
    return this.assessDataCompleteness(userProfile);
  }

  generateTechMarketReasoning(role, userProfile, score) {
    return `Based on your ${userProfile.experienceLevel} experience level and interest in ${userProfile.careerPathsInterest?.[0] || 'technology'}, ${role.title} is an excellent match (${score}% compatibility).`;
  }

  generateTechMarketActions(userProfile, role) {
    return [
      `Build projects showcasing ${role.title} skills`,
      `Learn ${role.requiredSkills?.[0] || 'relevant technologies'}`,
      `Network with ${role.title} professionals`
    ];
  }

  generateAcademicReasoning(role, userProfile, score) {
    return `Your ${userProfile.educationLevel} and ${userProfile.publications ? 'research background' : 'academic interests'} align well with ${role.title} (${score}% match).`;
  }

  generateLifestyleReasoning(role, userProfile, score) {
    return `Your preference for ${userProfile.workPreference} and ${userProfile.timeCommitment} time commitment makes ${role.title} a good fit (${score}% match).`;
  }

  generateAcademicActions(userProfile, role) {
    return [
      'Pursue advanced research opportunities',
      'Develop academic writing skills',
      'Build research portfolio'
    ];
  }

  generateLifestyleActions(userProfile, role) {
    return [
      'Develop flexible work skills',
      'Build remote work capabilities',
      'Focus on practical applications'
    ];
  }

  estimateAcademicTimeline(userProfile) {
    return userProfile.educationLevel === 'PhD' ? '6-12 months' : '1-2 years';
  }

  estimateLifestyleTimeline(userProfile) {
    return userProfile.experienceLevel === 'Advanced' ? '3-6 months' : '6-12 months';
  }

  calculateOverallTimeline(skillGapAnalysis, userProfile) {
    const baseMonths = 6;
    const gapMultiplier = skillGapAnalysis.overallGapScore ? (100 - skillGapAnalysis.overallGapScore) / 100 : 0.5;
    const timeMultiplier = userProfile.timeCommitment?.includes('20+') ? 0.8 : 1.2;
    
    const totalMonths = Math.ceil(baseMonths * gapMultiplier * timeMultiplier);
    return `${totalMonths}-${totalMonths + 2} months`;
  }

  calculateTimeCommitment(userProfile) {
    const hours = parseInt(userProfile.timeCommitment?.split('-')[0]) || 10;
    return {
      hoursPerWeek: hours,
      intensity: hours > 15 ? 'intensive' : hours > 10 ? 'moderate' : 'light',
      flexibilityLevel: userProfile.workPreference === 'Flexible' ? 'high' : 'medium'
    };
  }

  calculateOverallGapScore(currentSkills, requiredSkills) {
    if (requiredSkills.length === 0) return 80;
    
    const matchedSkills = currentSkills.filter(current =>
      requiredSkills.some(required => 
        required.name.toLowerCase().includes(current.name.toLowerCase()) ||
        current.name.toLowerCase().includes(required.name.toLowerCase())
      )
    ).length;
    
    return Math.round((matchedSkills / requiredSkills.length) * 100);
  }

  determineReadinessLevel(score) {
    if (score >= 80) return 'ready';
    if (score >= 60) return 'near-ready';
    if (score >= 40) return 'developing';
    return 'beginner';
  }

  identifyPrioritySkills(missingSkills, skillsToImprove) {
    const allSkills = [...missingSkills, ...skillsToImprove];
    return allSkills
      .filter(skill => skill.importance === 'critical')
      .map(skill => skill.name)
      .slice(0, 5);
  }

  calculateLearningEffort(missingSkills, skillsToImprove, userProfile) {
    const totalSkills = missingSkills.length + skillsToImprove.length;
    const avgHoursPerSkill = 40;
    const totalHours = totalSkills * avgHoursPerSkill;
    const hoursPerWeek = parseInt(userProfile.timeCommitment?.split('-')[0]) || 10;
    const totalWeeks = Math.ceil(totalHours / hoursPerWeek);
    
    return {
      totalHours,
      totalWeeks,
      intensityLevel: hoursPerWeek > 15 ? 'intensive' : hoursPerWeek > 10 ? 'moderate' : 'light'
    };
  }

  // Additional helper methods with simplified implementations
  assessToolLevel(tool, userProfile) {
    return userProfile.experienceLevel === 'Advanced' ? 'intermediate' : 'beginner';
  }

  getImprovementTime(currentLevel, requiredLevel) {
    const currentNum = this.levelToNumber(currentLevel);
    const requiredNum = this.levelToNumber(requiredLevel);
    const gap = requiredNum - currentNum;
    return gap <= 1 ? '1-2 months' : gap <= 2 ? '2-3 months' : '3-4 months';
  }

  generateSuccessMetrics(learningPhases) {
    return [
      {
        metric: 'Learning Consistency',
        target: '80% of weekly goals completed',
        measurement: 'Weekly progress tracking',
        timeframe: 'Throughout program'
      },
      {
        metric: 'Project Quality',
        target: '3 portfolio-ready projects',
        measurement: 'Code quality and functionality',
        timeframe: 'By program end'
      }
    ];
  }

  getPhaseResources(phaseType) {
    const resourceMap = {
      foundation: [
        { type: 'course', name: 'Programming Fundamentals', provider: 'Coursera', cost: 'low', estimatedTime: '40 hours', difficulty: 'beginner' },
        { type: 'practice', name: 'Coding Exercises', cost: 'free', estimatedTime: '20 hours', difficulty: 'beginner' }
      ],
      core: [
        { type: 'course', name: 'Intermediate Development', provider: 'Udemy', cost: 'medium', estimatedTime: '60 hours', difficulty: 'intermediate' },
        { type: 'project', name: 'Portfolio Projects', cost: 'free', estimatedTime: '40 hours', difficulty: 'intermediate' }
      ],
      advanced: [
        { type: 'certification', name: 'Professional Certification', provider: 'Industry', cost: 'high', estimatedTime: '80 hours', difficulty: 'advanced' },
        { type: 'project', name: 'Capstone Project', cost: 'free', estimatedTime: '60 hours', difficulty: 'advanced' }
      ]
    };
    
    return resourceMap[phaseType] || resourceMap.foundation;
  }

  determineTransitionApproach(userProfile) {
    const timeCommitment = parseInt(userProfile.timeCommitment?.split('-')[0]) || 10;
    if (timeCommitment >= 20) return 'intensive';
    if (timeCommitment >= 15) return 'hybrid';
    return 'gradual';
  }

  mapLearningPhasesToTransition(learningPhases) {
    return learningPhases.map((phase, index) => ({
      phase: index + 1,
      name: phase.name,
      duration: phase.duration,
      primaryFocus: phase.description,
      workLifeBalance: 'Maintain current commitments',
      riskLevel: index < 2 ? 'low' : 'medium',
      exitCriteria: phase.deliverables
    }));
  }

  identifyLeverageOpportunities(userProfile) {
    const opportunities = [];
    if (userProfile.currentRole !== 'Not specified') {
      opportunities.push(`Apply new skills in current ${userProfile.currentRole} role`);
    }
    if (userProfile.transferableSkills) {
      opportunities.push(`Leverage ${userProfile.transferableSkills} in tech context`);
    }
    opportunities.push('Build bridge projects connecting previous experience with tech skills');
    return opportunities;
  }

  generateNetworkingStrategy(roleTitle) {
    return [
      `Connect with ${roleTitle} professionals on LinkedIn`,
      `Join ${roleTitle} communities and forums`,
      `Attend industry meetups and conferences`,
      'Seek mentorship opportunities'
    ];
  }

  generateSkillMilestones(skill) {
    return [
      { id: `${skill}_basic`, name: `${skill} Basics`, target: 'Complete fundamentals', deadline: 'Week 4', completed: false },
      { id: `${skill}_intermediate`, name: `${skill} Application`, target: 'Build practice project', deadline: 'Week 8', completed: false }
    ];
  }

  generateStrengthAnalysis(userProfile, recommendedRole) {
    return {
      coreStrengths: [
        {
          name: 'Learning Ability',
          category: 'soft',
          level: 'strong',
          relevance: 10,
          leverage: 'Apply to mastering new technologies',
          evidence: ['Taking career assessment', 'Career transition initiative']
        }
      ],
      transferableSkills: [
        {
          skill: userProfile.transferableSkills || 'Problem solving',
          currentContext: userProfile.currentRole || 'Previous experience',
          targetContext: recommendedRole.title,
          transferability: 8,
          bridgeActions: ['Apply skills to tech projects', 'Learn technical implementation']
        }
      ],
      competitiveAdvantages: [
        'Diverse background brings unique perspective',
        'Proven ability to learn new skills',
        'Motivated career changer'
      ],
      leverageStrategy: `Position as ${recommendedRole.title} with unique ${userProfile.studyField} background`,
      uniqueValueProposition: `${recommendedRole.title} who understands both technical and ${userProfile.studyField} domains`
    };
  }

  generateRiskMitigation(userProfile, learningMap) {
    return [
      {
        risk: 'Time management challenges',
        probability: 'medium',
        impact: 'medium',
        mitigation: ['Create dedicated learning schedule', 'Use time-blocking techniques', 'Set realistic daily goals'],
        contingency: 'Extend timeline if needed while maintaining consistency'
      },
      {
        risk: 'Technical concepts difficulty',
        probability: 'medium',
        impact: 'medium',
        mitigation: ['Break concepts into smaller parts', 'Seek help from communities', 'Practice regularly'],
        contingency: 'Focus on practical application over theory'
      }
    ];
  }

  generateJobSearchPhases(roleTitle) {
    return [
      {
        phase: 'Resume Preparation',
        duration: '1-2 weeks',
        objectives: [`Optimize resume for ${roleTitle} positions`],
        tasks: [{ task: 'Resume optimization', description: 'Tailor resume to role', timeRequired: '4-6 hours', priority: 'high', resources: ['Resume templates'], completed: false }],
        deliverables: ['ATS-optimized resume'],
        successMetrics: ['Resume passes ATS scanning']
      }
    ];
  }

  generateResumeGuidance(roleTitle) {
    return {
      roleSpecificKeywords: [roleTitle, 'Programming', 'Problem Solving', 'Team Collaboration'],
      skillsToHighlight: ['Technical Skills', 'Learning Ability', 'Project Experience'],
      experienceFraming: ['Frame previous experience in technical context'],
      portfolioIntegration: 'Include portfolio link prominently',
      atsOptimization: ['Use standard headers', 'Include relevant keywords', 'Use bullet points'],
      templates: [{ title: `${roleTitle} Resume Template`, url: '#', type: 'template' }]
    };
  }

  generateApplicationStrategy(roleTitle) {
    return {
      targetCompanies: [
        { companyType: 'Tech Startups', characteristics: ['Innovation-focused', 'Growth-oriented'], advantages: ['Learning opportunities', 'Rapid advancement'] }
      ],
      applicationVolume: { applicationsPerWeek: 5, totalTarget: 20, timeframe: '4 weeks' },
      platforms: [
        { platform: 'LinkedIn', effectiveness: 9, strategy: 'Professional networking', tips: ['Optimize profile', 'Engage with content'], url: 'https://linkedin.com' }
      ]
    };
  }

  generateNetworkingApproach(roleTitle) {
    return {
      targetConnections: [`${roleTitle} professionals`, 'Industry leaders', 'Career changers'],
      platforms: ['LinkedIn', 'Twitter', 'Industry forums'],
      messageTemplates: [{ purpose: 'Initial connection', template: 'Hi, I\'m transitioning to {role}...', personalizationTips: ['Mention shared interests'] }],
      contentStrategy: ['Share learning journey', 'Comment on industry trends']
    };
  }

  generateSalaryGuidance(roleTitle) {
    return {
      marketRateResearch: ['Use salary comparison websites', 'Research company-specific data'],
      negotiationStrategy: ['Highlight unique value proposition', 'Demonstrate growth potential'],
      leveragePoints: ['Diverse background', 'Fresh perspective', 'High motivation'],
      negotiationScripts: ['Based on my research and unique background...']
    };
  }

  getCommonJobSearchMistakes() {
    return [
      'Applying to every job without customization',
      'Neglecting networking opportunities',
      'Poor portfolio presentation',
      'Insufficient interview preparation'
    ];
  }

  getJobSearchSuccessTips() {
    return [
      'Quality over quantity in applications',
      'Build genuine professional relationships',
      'Showcase learning progress consistently',
      'Practice technical communication skills'
    ];
  }

  getInterviewTypes(roleTitle) {
    return [
      {
        type: 'Technical Interview',
        description: 'Assess technical skills and problem-solving',
        duration: '45-60 minutes',
        preparation: ['Practice coding problems', 'Review technical concepts'],
        whatToExpect: ['Coding challenges', 'Technical questions', 'Problem-solving scenarios'],
        successCriteria: ['Clear communication', 'Logical approach', 'Working solutions']
      }
    ];
  }

  getTechnicalPrepGuidance(roleTitle) {
    return {
      keyTopics: ['Core technologies', 'Problem-solving approaches', 'Best practices'],
      practiceProblems: [{ topic: 'Programming Logic', difficulty: 'medium', problem: 'Solve algorithmic challenges', solutionApproach: 'Break down into steps' }],
      codingChallenges: [{ platform: 'LeetCode', difficulty: 'easy', focus: 'Basic algorithms' }],
      portfolioQuestions: ['Walk through your projects', 'Explain technical decisions']
    };
  }

  getBehavioralPrepGuidance() {
    return {
      framework: 'STAR method (Situation, Task, Action, Result)',
      keyQuestions: ['Tell me about a challenging project', 'How do you handle learning new technologies?'],
      storyBank: [{ category: 'Problem-solving', framework: 'STAR', guidingQuestions: ['What was the situation?', 'What actions did you take?'] }],
      strengthsToHighlight: ['Adaptability', 'Learning agility', 'Problem-solving']
    };
  }

  getPortfolioGuidance(roleTitle) {
    return `Prepare to present your projects clearly, explaining the problem solved, technologies used, and your specific contributions for ${roleTitle} roles.`;
  }

  getMockInterviewResources() {
    return [
      { platform: 'Pramp', type: 'Technical', url: 'https://pramp.com', description: 'Free mock technical interviews' },
      { platform: 'InterviewBuddy', type: 'Behavioral', url: 'https://interviewbuddy.in', description: 'Practice behavioral interviews' }
    ];
  }

  getCommonQuestions(roleTitle) {
    return [
      { category: 'Technical', question: `What interests you about ${roleTitle}?`, tips: 'Connect to your background and goals' },
      { category: 'Behavioral', question: 'Why are you transitioning to tech?', tips: 'Show genuine motivation and preparation' },
      { category: 'Technical', question: 'How do you approach learning new technologies?', tips: 'Give specific examples from your journey' }
    ];
  }

  generateCareerGuides(recommendedRole) {
    return [
      {
        title: `Complete ${recommendedRole.title} Guide`,
        category: 'transition',
        description: `Comprehensive guide for becoming a ${recommendedRole.title}`,
        estimatedReadTime: '15 minutes',
        tags: ['career-change', recommendedRole.title.toLowerCase().replace(/\s+/g, '-')]
      }
    ];
  }

  generateAdditionalResources(recommendedRole) {
    return [
      {
        title: `${recommendedRole.title} Community`,
        category: 'Networking',
        description: `Connect with other ${recommendedRole.title} professionals`,
        type: 'community',
        url: '#',
        provider: 'Professional Network',
        relevance: 9,
        tags: ['networking', 'community']
      }
    ];
  }
}

export default new ClaudeApiService();
