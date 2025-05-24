// src/services/claudeApiService.js - UPDATED FOR CAREER PATH RECOMMENDATION SYSTEM v2.0
import { CLAUDE_API_CONFIG, CLAUDE_PROMPTS, CAREER_PATH_VALIDATION } from '../config/claudeApiConfig';
import storageService from './storageService';

class ClaudeApiService {
  /**
   * Generate form field suggestions based on v2.0 System
   * @returns {Promise<string>} The suggested form responses
   */
  async getFormSuggestions() {
    try {
      console.log("🤖 Calling Claude API for Career Path Recommendation System v2.0 form suggestions");
      
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
        max_tokens: requestBody.max_tokens,
        systemVersion: CLAUDE_API_CONFIG.systemVersion || 'v2.0'
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
      console.log("✅ Received successful response from Claude API (v2.0 System)");
      return data.content[0].text;
    } catch (error) {
      console.error('❌ Error getting form suggestions from Claude API:', error);
      throw error;
    }
  }

  /**
   * Generate career recommendations using Career Path Recommendation System v2.0
   * Sequential Dependency Engine: Career Path → Skill Gap → Learning Roadmap
   * @param {Object} formData The user's form responses
   * @returns {Promise<Object>} The structured RecommendationResponse
   */
  async generateCareerRecommendations(formData) {
    try {
      console.log("🤖 Generating Career Path Recommendation System v2.0 analysis for:", formData.fullName);
      const startTime = Date.now();
      
      // Step 1: Validate and process user profile according to v2.0 Schema
      const userProfile = this.validateAndProcessProfileV2(formData);
      console.log("✅ User profile processed for v2.0 System:", userProfile.name);
      
      // Step 2: Validate data completeness for v2.0 analysis
      const validation = this.validateV2Data(userProfile);
      if (!validation.isValid) {
        throw new Error('Insufficient data for v2.0 Sequential Dependency Engine - need minimum criteria for Career Path recommendation');
      }
      
      console.log("📊 v2.0 System validation:", {
        careerPathCriteriaComplete: validation.careerPathCriteriaComplete,
        dataCompleteness: Math.round(validation.dataCompleteness * 100) + '%',
        requiresFallback: validation.requiresFallback
      });
      
      // Step 3: Sequential Dependency Engine - Career Path → Skill Gap → Learning Roadmap
      console.log("🎯 Generating Career Path Recommendation...");
      const careerPath = await this.generateCareerPathRecommendation(userProfile);
      
      console.log("📚 Generating Skill Gap Analysis...");
      const skillGap = await this.generateSkillGapAnalysis(userProfile, careerPath);
      
      console.log("⚖️ Generating Learning Roadmap...");
      const learningRoadmap = await this.generateLearningRoadmap(userProfile, careerPath, skillGap);
      
      console.log("✅ Sequential Dependency Engine completed successfully");
      
      // Step 4: Calculate overall system metrics
      const overallConfidence = this.calculateV2OverallConfidence(careerPath, skillGap, learningRoadmap);
      const dataCompleteness = Math.round(validation.dataCompleteness * 100);
      
      // Step 5: Create v2.0 system response
      const recommendationResponse = {
        careerPath,
        skillGap,
        learningRoadmap,
        overallConfidence,
        dataCompleteness,
        careerPathCriteriaComplete: validation.careerPathCriteriaComplete,
        processingTime: Date.now() - startTime,
        processedAt: new Date().toISOString(),
        systemVersion: 'v2.0',
        engineType: 'Sequential Dependency Recommendation Engine'
      };
      
      // Step 6: Save to storage (maintaining existing functionality)
      try {
        const analysisData = {
          userId: formData.email || String(new Date().getTime()),
          analysis: JSON.stringify(recommendationResponse, null, 2),
          raw: JSON.stringify(recommendationResponse),
          structured: recommendationResponse,
          systemVersion: 'v2.0'
        };
        
        storageService.saveCareerAnalysis(analysisData);
        
        if (formData.email) {
          storageService.saveFormattedAnalysis(formData.email, JSON.stringify(recommendationResponse, null, 2));
        }
        
        console.log('✅ v2.0 analysis saved to storage');
      } catch (storageError) {
        console.error('❌ Error saving analysis to storage:', storageError);
      }
      
      console.log(`🎉 Career Path Recommendation System v2.0 completed successfully in ${recommendationResponse.processingTime}ms`);
      console.log(`📈 Overall confidence: ${recommendationResponse.overallConfidence}% | Data completeness: ${recommendationResponse.dataCompleteness}% | Career criteria: ${recommendationResponse.careerPathCriteriaComplete}/16`);
      
      return recommendationResponse;
      
    } catch (error) {
      console.error('❌ Error generating v2.0 recommendations:', error);
      throw error;
    }
  }

  /**
   * Validate and standardize user profile data according to v2.0 Schema
   */
  validateAndProcessProfileV2(formData) {
    return {
      // Personal Information
      name: formData.fullName || 'User',
      email: formData.email || '',
      
      // 🎯 Career Path Recommendation Criteria (16 total)
      // Tier 1: Core Drivers (45%)
      futureGoal: formData.futureGoal || '',
      techInterests: formData.techInterests || '',
      leverageDomainExpertise: formData.leverageDomainExpertise || '',
      careerPathsInterest: Array.isArray(formData.careerPathsInterest) 
        ? formData.careerPathsInterest 
        : (typeof formData.careerPathsInterest === 'string' ? formData.careerPathsInterest.split(',').map(i => i.trim()) : []),
      
      // Tier 2: Strong Motivators (25%)
      industryPreference: Array.isArray(formData.industryPreference) 
        ? formData.industryPreference 
        : (typeof formData.industryPreference === 'string' ? formData.industryPreference.split(',').map(i => i.trim()) : []),
      techMotivation: formData.techMotivation || '',
      techPassion: formData.techPassion || '',
      
      // Tier 3: Supporting Evidence (20%)
      transferableSkills: formData.transferableSkills || '',
      jobTechnologies: formData.jobTechnologies || '',
      jobResponsibilities: formData.jobResponsibilities || '',
      jobProjects: formData.jobProjects || '',
      
      // Tier 4: Background Context (10%)
      continueCurrent: formData.continueCurrent || formData.currentRole || '',
      studyField: formData.studyField || '',
      certifications: formData.certifications || '',
      internships: formData.internships || '',
      publications: formData.publications || '',
      
      // 📚 Skill Gap Additional Criteria
      certificationsDetail: formData.certificationsDetail || '',
      experienceLevel: formData.experienceLevel || '',
      yearsExperience: formData.yearsExperience || '',
      currentRole: formData.currentRole || '',
      toolsUsed: Array.isArray(formData.toolsUsed) ? formData.toolsUsed : [],
      
      // ⚖️ Learning Roadmap Additional Criteria  
      timeCommitment: formData.timeCommitment || '',
      targetSalary: formData.targetSalary || '',
      transitionTimeline: formData.transitionTimeline || '',
      learningComfort: formData.learningComfort || '',
      transitionReason: formData.transitionReason || '',
      guidanceNeeded: Array.isArray(formData.guidanceNeeded) ? formData.guidanceNeeded : [],
      
      // Legacy compatibility fields
      interests: Array.isArray(formData.interests) 
        ? formData.interests 
        : (typeof formData.interests === 'string' ? formData.interests.split(',').map(i => i.trim()) : []),
      workPreference: formData.workPreference || '',
      educationLevel: formData.educationLevel || ''
    };
  }

  /**
   * Validate data completeness for v2.0 system
   */
  validateV2Data(userProfile) {
    // Count Career Path Recommendation criteria (16 total)
    const careerPathCriteria = [
      // Tier 1: Core Drivers (45%)
      'futureGoal', 'techInterests', 'leverageDomainExpertise', 'careerPathsInterest',
      // Tier 2: Strong Motivators (25%)
      'industryPreference', 'techMotivation', 'techPassion',
      // Tier 3: Supporting Evidence (20%)
      'transferableSkills', 'jobTechnologies', 'jobResponsibilities', 'jobProjects',
      // Tier 4: Background Context (10%)
      'continueCurrent', 'studyField', 'certifications', 'internships', 'publications'
    ];
    
    const careerPathCriteriaComplete = careerPathCriteria.filter(field => this.isV2Valid(userProfile[field])).length;
    
    // All criteria for data completeness assessment
    const allCriteria = [
      ...careerPathCriteria,
      'certificationsDetail', 'experienceLevel', 'yearsExperience', 'currentRole', 'toolsUsed',
      'timeCommitment', 'targetSalary', 'transitionTimeline', 'learningComfort', 'transitionReason', 'guidanceNeeded'
    ];
    
    const totalValid = allCriteria.filter(field => this.isV2Valid(userProfile[field])).length;
    const dataCompleteness = totalValid / allCriteria.length;
    
    // Minimum requirements for v2.0 system
    const requiresFallback = careerPathCriteriaComplete < 8; // Less than 50% of 16 criteria
    const isValid = careerPathCriteriaComplete >= 4; // Minimum 25% of criteria needed
    
    return {
      isValid,
      requiresFallback,
      careerPathCriteriaComplete,
      dataCompleteness
    };
  }

  /**
   * Enhanced validation function for v2.0 system
   */
  isV2Valid(value) {
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
  }

  // ============================================================================
  // CAREER PATH RECOMMENDATION SYSTEM v2.0 - SEQUENTIAL DEPENDENCY ENGINE
  // ============================================================================

  /**
   * Generate Career Path Recommendation using v2.0 4-Tier Scoring System
   * Primary recommendation using all 16 criteria with weighted scoring
   */
  async generateCareerPathRecommendation(userProfile) {
    console.log("🎯 Generating Career Path Recommendation with 4-Tier Scoring...");
    
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
    
    const score = this.calculateCareerPathScore(userProfile, weights);
    const confidence = this.determineV2Confidence(score.criteriaCount, score.totalWeightedScore);
    
    // 🤖 AI-Generated Content based on user criteria
    const aiContent = this.generateAICareerPathContent(userProfile, score);
    
    return {
      id: this.generateId('cp'),
      type: 'career-path',
      title: aiContent.title,
      description: aiContent.description,
      reasoning: aiContent.reasoning,
      confidence: confidence.level,
      confidenceScore: confidence.score,
      recommendedPaths: aiContent.recommendedPaths,
      industryFocus: aiContent.industryFocus,
      marketDemand: aiContent.marketDemand,
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        tierScores: score.tierScores,
        totalWeightedScore: score.totalWeightedScore,
        fallbackApplied: score.fallbackUsed
      }
    };
  }

  /**
   * Generate Skill Gap Analysis building on Career Path Recommendation
   */
  async generateSkillGapAnalysis(userProfile, careerPath) {
    console.log("📚 Generating Skill Gap Analysis based on Career Path...");
    
    const additionalCriteria = [
      'certificationsDetail', 'studyField', 'experienceLevel', 
      'yearsExperience', 'currentRole', 'toolsUsed'
    ];
    
    // 🤖 AI-Generated skill analysis based on career path
    const aiSkillAnalysis = this.generateAISkillGapContent(userProfile, careerPath, additionalCriteria);
    
    const confidence = this.determineSkillGapConfidence(aiSkillAnalysis.skillGaps, userProfile);
    
    return {
      id: this.generateId('sg'),
      type: 'skill-gap',
      careerPathId: careerPath.id,
      currentSkillLevel: aiSkillAnalysis.currentSkillLevel,
      requiredSkills: aiSkillAnalysis.requiredSkills,
      skillGaps: aiSkillAnalysis.skillGaps,
      strengthsToLeverage: aiSkillAnalysis.strengthsToLeverage,
      recommendedCertifications: aiSkillAnalysis.recommendedCertifications,
      confidence: confidence.level,
      confidenceScore: confidence.score,
      metadata: {
        basedOnCareerPath: true,
        criteriaUsed: this.extractUsedCriteria(userProfile, additionalCriteria),
        missingCriteria: this.extractMissingCriteria(userProfile, additionalCriteria)
      }
    };
  }

  /**
   * Generate Learning Roadmap building on Career Path + Skill Gap
   */
  async generateLearningRoadmap(userProfile, careerPath, skillGap) {
    console.log("⚖️ Generating Learning Roadmap based on Career Path + Skill Gap...");
    
    const additionalCriteria = [
      'timeCommitment', 'targetSalary', 'transitionTimeline', 
      'learningComfort', 'transitionReason', 'guidanceNeeded'
    ];
    
    // 🤖 AI-Generated learning roadmap based on previous recommendations
    const aiRoadmapContent = this.generateAILearningRoadmapContent(userProfile, careerPath, skillGap, additionalCriteria);
    
    const confidence = this.determineLearningRoadmapConfidence(aiRoadmapContent.phases, userProfile);
    
    return {
      id: this.generateId('lr'),
      type: 'learning-roadmap',
      careerPathId: careerPath.id,
      skillGapId: skillGap.id,
      phases: aiRoadmapContent.phases,
      totalTimelineEstimate: aiRoadmapContent.totalTimelineEstimate,
      budgetEstimate: aiRoadmapContent.budgetEstimate,
      flexibilityOptions: aiRoadmapContent.flexibilityOptions,
      supportRecommendations: aiRoadmapContent.supportRecommendations,
      confidence: confidence.level,
      confidenceScore: confidence.score,
      metadata: {
        basedOnCareerPath: true,
        basedOnSkillGap: true,
        criteriaUsed: this.extractUsedCriteria(userProfile, additionalCriteria),
        missingCriteria: this.extractMissingCriteria(userProfile, additionalCriteria)
      }
    };
  }

  // ============================================================================
  // v2.0 4-TIER SCORING SYSTEM
  // ============================================================================

  /**
   * Calculate Career Path score using v2.0 4-Tier weighted scoring
   */
  calculateCareerPathScore(userProfile, weights) {
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
    if (this.isV2Valid(userProfile.futureGoal)) {
      tierScores.coreDriving += weights.futureGoal * this.getFutureGoalAlignment(userProfile.futureGoal);
      criteriaCount++; usedCriteria.push('futureGoal');
    } else { missingCriteria.push('futureGoal'); }
    
    if (this.isV2Valid(userProfile.techInterests)) {
      tierScores.coreDriving += weights.techInterests * this.getTechInterestMarketAlignment(userProfile.techInterests);
      criteriaCount++; usedCriteria.push('techInterests');
    } else { missingCriteria.push('techInterests'); }
    
    if (this.isV2Valid(userProfile.leverageDomainExpertise)) {
      tierScores.coreDriving += weights.leverageDomainExpertise * this.getDomainLeverageScore(userProfile.leverageDomainExpertise);
      criteriaCount++; usedCriteria.push('leverageDomainExpertise');
    } else { missingCriteria.push('leverageDomainExpertise'); }
    
    if (this.isV2Valid(userProfile.careerPathsInterest)) {
      tierScores.coreDriving += weights.careerPathsInterest * this.getCareerPathInterestAlignment(userProfile.careerPathsInterest);
      criteriaCount++; usedCriteria.push('careerPathsInterest');
    } else { missingCriteria.push('careerPathsInterest'); }
    
    // Tier 2: Strong Motivators (25%)
    if (this.isV2Valid(userProfile.industryPreference)) {
      tierScores.strongMotivators += weights.industryPreference * this.getIndustryMarketOpportunity(userProfile.industryPreference);
      criteriaCount++; usedCriteria.push('industryPreference');
    } else { missingCriteria.push('industryPreference'); }
    
    if (this.isV2Valid(userProfile.techMotivation)) {
      tierScores.strongMotivators += weights.techMotivation * this.getTechMotivationScore(userProfile.techMotivation);
      criteriaCount++; usedCriteria.push('techMotivation');
    } else { missingCriteria.push('techMotivation'); }
    
    if (this.isV2Valid(userProfile.techPassion)) {
      tierScores.strongMotivators += weights.techPassion * this.getTechPassionSustainability(userProfile.techPassion);
      criteriaCount++; usedCriteria.push('techPassion');
    } else { missingCriteria.push('techPassion'); }
    
    // Tier 3: Supporting Evidence (20%)
    if (this.isV2Valid(userProfile.transferableSkills)) {
      tierScores.supportingEvidence += weights.transferableSkills * this.getTransferableSkillValue(userProfile.transferableSkills);
      criteriaCount++; usedCriteria.push('transferableSkills');
    } else { missingCriteria.push('transferableSkills'); }
    
    if (this.isV2Valid(userProfile.jobTechnologies)) {
      tierScores.supportingEvidence += weights.jobTechnologies * this.getTechnologyFoundationScore(userProfile.jobTechnologies);
      criteriaCount++; usedCriteria.push('jobTechnologies');
    } else { missingCriteria.push('jobTechnologies'); }
    
    if (this.isV2Valid(userProfile.jobResponsibilities)) {
      tierScores.supportingEvidence += weights.jobResponsibilities * this.getCurrentTrajectoryScore(userProfile.jobResponsibilities);
      criteriaCount++; usedCriteria.push('jobResponsibilities');
    } else { missingCriteria.push('jobResponsibilities'); }
    
    if (this.isV2Valid(userProfile.jobProjects)) {
      tierScores.supportingEvidence += weights.jobProjects * this.getPracticalExperienceScore(userProfile.jobProjects);
      criteriaCount++; usedCriteria.push('jobProjects');
    } else { missingCriteria.push('jobProjects'); }
    
    // Tier 4: Background Context (10%)
    if (this.isV2Valid(userProfile.continueCurrent)) {
      tierScores.backgroundContext += weights.continueCurrent * this.getCurrentRoleContextScore(userProfile.continueCurrent);
      criteriaCount++; usedCriteria.push('continueCurrent');
    } else { missingCriteria.push('continueCurrent'); }
    
    if (this.isV2Valid(userProfile.studyField)) {
      tierScores.backgroundContext += weights.studyField * this.getStudyFieldRelevance(userProfile.studyField);
      criteriaCount++; usedCriteria.push('studyField');
    } else { missingCriteria.push('studyField'); }
    
    if (this.isV2Valid(userProfile.certifications)) {
      tierScores.backgroundContext += weights.certifications * this.getCertificationValue(userProfile.certifications);
      criteriaCount++; usedCriteria.push('certifications');
    } else { missingCriteria.push('certifications'); }
    
    if (this.isV2Valid(userProfile.internships)) {
      tierScores.backgroundContext += weights.internships * this.getInternshipExperienceScore(userProfile.internships);
      criteriaCount++; usedCriteria.push('internships');
    } else { missingCriteria.push('internships'); }
    
    if (this.isV2Valid(userProfile.publications)) {
      tierScores.backgroundContext += weights.publications * this.getPublicationLeadershipScore(userProfile.publications);
      criteriaCount++; usedCriteria.push('publications');
    } else { missingCriteria.push('publications'); }
    
    const totalWeightedScore = 
      tierScores.coreDriving + 
      tierScores.strongMotivators + 
      tierScores.supportingEvidence + 
      tierScores.backgroundContext;
    
    const fallbackUsed = this.checkV2FallbackRequired(criteriaCount, tierScores);
    
    return {
      totalWeightedScore,
      criteriaCount,
      tierScores,
      usedCriteria,
      missingCriteria,
      fallbackUsed
    };
  }

  /**
   * Check if fallback is required for v2.0 system
   */
  checkV2FallbackRequired(criteriaCount, tierScores) {
    // Fallback required if:
    // - Less than 8 total criteria (50% of 16)
    // - Tier 1 (Core Drivers) has insufficient data
    // - Total weighted score is below minimum threshold
    
    const tier1Score = tierScores.coreDriving;
    const minimumTier1 = 0.2; // Need at least 20% of Tier 1 potential
    const minimumTotal = 0.3; // Need at least 30% of total potential
    
    const totalScore = tierScores.coreDriving + tierScores.strongMotivators + 
                      tierScores.supportingEvidence + tierScores.backgroundContext;
    
    return criteriaCount < 8 || tier1Score < minimumTier1 || totalScore < minimumTotal;
  }

  // ============================================================================
  // v2.0 AI CONTENT GENERATION
  // ============================================================================

  /**
   * 🤖 Generate AI-optimized Career Path content based on user criteria
   */
  generateAICareerPathContent(userProfile, score) {
    // AI analyzes futureGoal + techInterests + leverageDomainExpertise + industryPreference
    const title = this.generateAICareerPathTitle(userProfile, score);
    const description = this.generateAICareerPathDescription(userProfile, score);
    const reasoning = this.generateAICareerPathReasoning(userProfile, score);
    const recommendedPaths = this.generateAIRecommendedPaths(userProfile);
    const industryFocus = this.generateAIIndustryFocus(userProfile);
    const marketDemand = this.assessAIMarketDemand(userProfile, recommendedPaths);
    
    return {
      title,
      description,
      reasoning,
      recommendedPaths,
      industryFocus,
      marketDemand
    };
  }

  /**
   * 🤖 Generate AI-optimized Skill Gap content
   */
  generateAISkillGapContent(userProfile, careerPath, additionalCriteria) {
    // AI analyzes current state vs target state from careerPath
    const currentSkillLevel = this.assessAICurrentSkillLevel(userProfile);
    const requiredSkills = this.generateAIRequiredSkills(careerPath, userProfile);
    const skillGaps = this.generateAISkillGaps(userProfile, careerPath, requiredSkills);
    const strengthsToLeverage = this.generateAIStrengthsToLeverage(userProfile);
    const recommendedCertifications = this.generateAIRecommendedCertifications(skillGaps, userProfile);
    
    return {
      currentSkillLevel,
      requiredSkills,
      skillGaps,
      strengthsToLeverage,
      recommendedCertifications
    };
  }

  /**
   * 🤖 Generate AI-optimized Learning Roadmap content
   */
  generateAILearningRoadmapContent(userProfile, careerPath, skillGap, additionalCriteria) {
    // AI analyzes learning constraints and creates personalized phases
    const phases = this.generateAILearningPhases(skillGap, userProfile);
    const totalTimelineEstimate = this.calculateAITimeline(phases, userProfile.timeCommitment);
    const budgetEstimate = this.calculateAIBudgetEstimate(phases, userProfile);
    const flexibilityOptions = this.generateAIFlexibilityOptions(userProfile);
    const supportRecommendations = this.generateAISupportRecommendations(userProfile);
    
    return {
      phases,
      totalTimelineEstimate,
      budgetEstimate,
      flexibilityOptions,
      supportRecommendations
    };
  }

  // ============================================================================
  // v2.0 AI CONTENT GENERATION HELPER FUNCTIONS
  // ============================================================================

  generateAICareerPathTitle(userProfile, score) {
    // AI analyzes futureGoal + techInterests + leverageDomainExpertise + continueCurrent
    let title = '';
    
    if (userProfile.futureGoal && userProfile.techInterests) {
      // Extract key role from future goal
      const goalLower = userProfile.futureGoal.toLowerCase();
      const interestsLower = userProfile.techInterests.toLowerCase();
      
      if (goalLower.includes('ai') || goalLower.includes('machine learning') || interestsLower.includes('ai')) {
        title = userProfile.leverageDomainExpertise === 'yes' && userProfile.continueCurrent 
          ? `AI Engineer with ${userProfile.continueCurrent} Background`
          : 'Machine Learning Engineer';
      } else if (goalLower.includes('data') || interestsLower.includes('data')) {
        title = userProfile.leverageDomainExpertise === 'yes' && userProfile.continueCurrent
          ? `Data Scientist with ${userProfile.continueCurrent} Expertise`
          : 'Data Scientist';
      } else if (goalLower.includes('software') || goalLower.includes('developer') || interestsLower.includes('web')) {
        title = this.getExperienceLevel(userProfile.yearsExperience) > 0.7 
          ? 'Senior Software Developer' 
          : 'Software Developer';
      } else if (goalLower.includes('product') || goalLower.includes('management')) {
        title = 'Technical Product Manager';
      } else {
        // Fallback based on tech interests
        title = `${this.extractPrimaryTechInterest(userProfile.techInterests)} Specialist`;
      }
    } else if (userProfile.studyField) {
      // Fallback to study field + technology
      title = `Technology Professional - ${userProfile.studyField} Background`;
    } else {
      // Final fallback
      title = 'Technology Professional';
    }
    
    return title;
  }

  generateAICareerPathDescription(userProfile, score) {
    const primaryGoal = userProfile.futureGoal || 'advance in technology';
    const techFocus = userProfile.techInterests || 'technology';
    const leverageDomain = userProfile.leverageDomainExpertise === 'yes';
    const currentRole = userProfile.continueCurrent || userProfile.currentRole;
    
    let description = `Leverage your `;
    
    if (leverageDomain && currentRole) {
      description += `${currentRole.toLowerCase()} background and `;
    }
    
    description += `interest in ${techFocus.toLowerCase()} to ${primaryGoal.toLowerCase()}`;
    
    if (userProfile.industryPreference && userProfile.industryPreference.length > 0) {
      description += ` in the ${userProfile.industryPreference.slice(0, 2).join(' and ')} industry`;
    }
    
    description += '.';
    
    return description;
  }

  generateAICareerPathReasoning(userProfile, score) {
    const criteriaCount = score.criteriaCount;
    const totalScore = Math.round(score.totalWeightedScore * 100);
    const strongestTier = this.getStrongestTier(score.tierScores);
    
    return `Strong alignment across ${criteriaCount} criteria with ${totalScore}% compatibility score. ` +
           `Strongest performance in ${strongestTier} category, indicating excellent career path fit ` +
           `based on v2.0 Sequential Dependency Analysis.`;
  }

  generateAIRecommendedPaths(userProfile) {
    const paths = [];
    const goalLower = (userProfile.futureGoal || '').toLowerCase();
    const interestsLower = (userProfile.techInterests || '').toLowerCase();
    
    // Primary path based on goal and interests
    if (goalLower.includes('ai') || interestsLower.includes('machine learning')) {
      paths.push('Machine Learning Engineer', 'AI Researcher', 'Data Scientist');
    } else if (goalLower.includes('data') || interestsLower.includes('data')) {
      paths.push('Data Scientist', 'Data Engineer', 'Business Intelligence Analyst');
    } else if (goalLower.includes('software') || interestsLower.includes('web')) {
      paths.push('Software Developer', 'Full Stack Developer', 'DevOps Engineer');
    } else if (goalLower.includes('product') || goalLower.includes('management')) {
      paths.push('Technical Product Manager', 'Engineering Manager', 'Solutions Architect');
    } else {
      // Fallback based on experience and skills
      paths.push('Software Developer', 'Data Analyst', 'Technical Consultant');
    }
    
    return paths.slice(0, 3); // Return top 3 paths
  }

  generateAIIndustryFocus(userProfile) {
    if (userProfile.industryPreference && userProfile.industryPreference.length > 0) {
      return userProfile.industryPreference.slice(0, 3);
    }
    
    // Fallback based on tech interests
    const interestsLower = (userProfile.techInterests || '').toLowerCase();
    if (interestsLower.includes('healthcare') || interestsLower.includes('medical')) {
      return ['Healthcare', 'Biotechnology'];
    } else if (interestsLower.includes('finance') || interestsLower.includes('fintech')) {
      return ['Finance', 'FinTech'];
    } else if (interestsLower.includes('gaming') || interestsLower.includes('entertainment')) {
      return ['Gaming', 'Entertainment'];
    }
    
    return ['Technology', 'Software'];
  }

  assessAIMarketDemand(userProfile, recommendedPaths) {
    const highDemandRoles = ['machine learning engineer', 'data scientist', 'software developer', 'devops engineer'];
    const hasHighDemandRole = recommendedPaths.some(path => 
      highDemandRoles.some(role => path.toLowerCase().includes(role))
    );
    
    return hasHighDemandRole ? 'high' : 'medium';
  }

  // Skill Gap AI functions
  assessAICurrentSkillLevel(userProfile) {
    const experience = this.getExperienceLevel(userProfile.yearsExperience || userProfile.experienceLevel);
    const hasTools = userProfile.toolsUsed && userProfile.toolsUsed.length > 0;
    const hasTech = userProfile.jobTechnologies && userProfile.jobTechnologies.length > 0;
    
    if (experience > 0.7 && hasTools && hasTech) return 'advanced';
    if (experience > 0.4 && (hasTools || hasTech)) return 'intermediate';
    return 'beginner';
  }

  generateAIRequiredSkills(careerPath, userProfile) {
    const skills = [];
    const pathLower = careerPath.title.toLowerCase();
    
    if (pathLower.includes('machine learning') || pathLower.includes('ai')) {
      skills.push('Machine Learning', 'Python', 'Statistics', 'Deep Learning', 'MLOps');
    } else if (pathLower.includes('data')) {
      skills.push('Data Analysis', 'SQL', 'Python/R', 'Statistics', 'Data Visualization');
    } else if (pathLower.includes('software') || pathLower.includes('developer')) {
      skills.push('Programming', 'Version Control', 'Software Architecture', 'Testing', 'Deployment');
    } else {
      skills.push('Technical Skills', 'Problem Solving', 'Programming', 'Data Analysis');
    }
    
    return skills;
  }

  generateAISkillGaps(userProfile, careerPath, requiredSkills) {
    const currentTools = userProfile.toolsUsed || [];
    const currentTech = (userProfile.jobTechnologies || '').toLowerCase();
    const skillGaps = [];
    
    requiredSkills.forEach(skill => {
      const skillLower = skill.toLowerCase();
      let currentLevel = 'none';
      let priority = 'medium';
      
      // Assess current level based on tools and technologies
      if (currentTools.some(tool => tool.toLowerCase().includes(skillLower)) ||
          currentTech.includes(skillLower)) {
        currentLevel = 'basic';
      }
      
      // Set priority based on career path importance
      const pathTitle = careerPath.title.toLowerCase();
      if ((pathTitle.includes('data') && skillLower.includes('data')) ||
          (pathTitle.includes('machine learning') && skillLower.includes('machine learning'))) {
        priority = 'high';
      }
      
      skillGaps.push({
        skill: skill,
        currentLevel: currentLevel,
        requiredLevel: priority === 'high' ? 'advanced' : 'intermediate',
        priority: priority,
        estimatedLearningTime: this.calculateLearningTime(currentLevel, skill, userProfile.timeCommitment)
      });
    });
    
    return skillGaps;
  }

  generateAIStrengthsToLeverage(userProfile) {
    const strengths = [];
    
    if (userProfile.transferableSkills) {
      const skillsLower = userProfile.transferableSkills.toLowerCase();
      if (skillsLower.includes('analytical') || skillsLower.includes('analysis')) {
        strengths.push('Analytical thinking');
      }
      if (skillsLower.includes('communication')) {
        strengths.push('Communication skills');
      }
      if (skillsLower.includes('leadership') || skillsLower.includes('management')) {
        strengths.push('Leadership experience');
      }
    }
    
    if (userProfile.studyField) {
      strengths.push(`${userProfile.studyField} domain knowledge`);
    }
    
    if (userProfile.jobTechnologies) {
      strengths.push(`Technical foundation: ${userProfile.jobTechnologies}`);
    }
    
    return strengths.length > 0 ? strengths : ['Problem-solving abilities', 'Learning agility'];
  }

  generateAIRecommendedCertifications(skillGaps, userProfile) {
    const certifications = [];
    const highPrioritySkills = skillGaps.filter(gap => gap.priority === 'high').map(gap => gap.skill);
    
    highPrioritySkills.forEach(skill => {
      if (skill.toLowerCase().includes('machine learning') || skill.toLowerCase().includes('ai')) {
        certifications.push('AWS Machine Learning Specialty', 'Google Cloud ML Engineer');
      } else if (skill.toLowerCase().includes('data')) {
        certifications.push('Google Data Analytics Certificate', 'Microsoft Azure Data Scientist');
      } else if (skill.toLowerCase().includes('programming') || skill.toLowerCase().includes('software')) {
        certifications.push('AWS Developer Associate', 'Microsoft Azure Developer');
      }
    });
    
    return [...new Set(certifications)].slice(0, 3); // Remove duplicates and limit to 3
  }

  // Learning Roadmap AI functions
  generateAILearningPhases(skillGap, userProfile) {
    const phases = [];
    const timeCommitment = userProfile.timeCommitment || 'part-time';
    const isFullTime = timeCommitment.toLowerCase().includes('full');
    
    // Group skills by priority and learning sequence
    const highPrioritySkills = skillGap.skillGaps.filter(gap => gap.priority === 'high');
    const mediumPrioritySkills = skillGap.skillGaps.filter(gap => gap.priority === 'medium');
    
    // Phase 1: Foundation
    if (highPrioritySkills.length > 0) {
      phases.push({
        phase: 1,
        title: 'Foundation Building',
        duration: isFullTime ? '2-3 months' : '3-4 months',
        skills: highPrioritySkills.slice(0, 3).map(gap => gap.skill),
        resources: this.generatePhaseResources('foundation', userProfile),
        milestones: this.generatePhaseMilestones('foundation', highPrioritySkills.slice(0, 3))
      });
    }
    
    // Phase 2: Skill Development
    if (mediumPrioritySkills.length > 0 || highPrioritySkills.length > 3) {
      const remainingSkills = [
        ...highPrioritySkills.slice(3),
        ...mediumPrioritySkills.slice(0, 3)
      ];
      
      phases.push({
        phase: 2,
        title: 'Skill Development & Application',
        duration: isFullTime ? '3-4 months' : '4-6 months',
        skills: remainingSkills.map(gap => gap.skill),
        resources: this.generatePhaseResources('development', userProfile),
        milestones: this.generatePhaseMilestones('development', remainingSkills)
      });
    }
    
    // Phase 3: Mastery (if needed)
    if (highPrioritySkills.length > 3 || mediumPrioritySkills.length > 3) {
      phases.push({
        phase: 3,
        title: 'Advanced Mastery & Portfolio',
        duration: isFullTime ? '2-3 months' : '3-4 months',
        skills: ['Advanced Projects', 'Portfolio Development', 'Interview Preparation'],
        resources: this.generatePhaseResources('mastery', userProfile),
        milestones: this.generatePhaseMilestones('mastery', [])
      });
    }
    
    return phases;
  }

  calculateAITimeline(phases, timeCommitment) {
    const totalMonths = phases.reduce((total, phase) => {
      const duration = phase.duration;
      const avgMonths = this.extractAvgMonths(duration);
      return total + avgMonths;
    }, 0);
    
    const commitment = timeCommitment || 'part-time';
    return `${Math.round(totalMonths)} months (${commitment})`;
  }

  calculateAIBudgetEstimate(phases, userProfile) {
    const basePhase = 800; // Base cost per phase
    const totalPhases = phases.length;
    const baseCost = basePhase * totalPhases;
    
    // Adjust based on target salary (higher salary = willing to invest more)
    let multiplier = 1;
    if (userProfile.targetSalary) {
      const salaryNum = parseInt(userProfile.targetSalary.replace(/[^\d]/g, ''));
      if (salaryNum > 100000) multiplier = 1.5;
      else if (salaryNum > 80000) multiplier = 1.2;
    }
    
    const estimatedCost = baseCost * multiplier;
    return `$${Math.round(estimatedCost/100)*100} - $${Math.round(estimatedCost*1.5/100)*100}`;
  }

  generateAIFlexibilityOptions(userProfile) {
    const options = [];
    const timeCommitment = userProfile.timeCommitment || '';
    const learningComfort = userProfile.learningComfort || '';
    
    if (timeCommitment.toLowerCase().includes('part-time') || timeCommitment.toLowerCase().includes('flexible')) {
      options.push('Self-paced online courses', 'Evening and weekend programs', 'Micro-learning modules');
    }
    
    if (learningComfort.toLowerCase().includes('self-directed') || learningComfort.toLowerCase().includes('comfortable')) {
      options.push('Online bootcamps', 'Project-based learning', 'Interactive tutorials');
    }
    
    options.push('Blended learning approach', 'Community-supported learning');
    
    return [...new Set(options)].slice(0, 4);
  }

  generateAISupportRecommendations(userProfile) {
    const recommendations = [];
    const guidanceNeeded = userProfile.guidanceNeeded || [];
    
    if (guidanceNeeded.includes('mentorship') || guidanceNeeded.includes('mentor')) {
      recommendations.push('Find industry mentor through LinkedIn or professional networks');
    }
    
    if (guidanceNeeded.includes('portfolio') || guidanceNeeded.includes('project')) {
      recommendations.push('Join project collaboration platforms like GitHub');
    }
    
    if (guidanceNeeded.includes('interview') || guidanceNeeded.includes('job search')) {
      recommendations.push('Practice technical interviews and coding challenges');
    }
    
    // Default recommendations
    recommendations.push('Join professional communities and forums');
    recommendations.push('Attend virtual meetups and conferences');
    
    return [...new Set(recommendations)].slice(0, 4);
  }

  // ============================================================================
  // v2.0 SCORING HELPER FUNCTIONS
  // ============================================================================

  // Tier 1 scoring functions
  getFutureGoalAlignment(futureGoal) {
    if (!futureGoal) return 0.3;
    const goalLower = futureGoal.toLowerCase();
    const techKeywords = ['ai', 'data', 'software', 'engineer', 'developer', 'technology', 'tech'];
    const matches = techKeywords.filter(keyword => goalLower.includes(keyword)).length;
    return Math.min(0.6 + (matches * 0.1), 0.95);
  }

  getTechInterestMarketAlignment(techInterests) {
    if (!techInterests) return 0.3;
    const interestsLower = techInterests.toLowerCase();
    const hotTech = ['machine learning', 'ai', 'cloud', 'data science', 'cybersecurity', 'blockchain'];
    const matches = hotTech.filter(tech => interestsLower.includes(tech)).length;
    return Math.min(0.5 + (matches * 0.15), 0.95);
  }

  getDomainLeverageScore(leverageDomainExpertise) {
    const scoreMap = { 'yes': 0.9, 'maybe': 0.6, 'no': 0.4 };
    return scoreMap[leverageDomainExpertise?.toLowerCase()] || 0.5;
  }

  getCareerPathInterestAlignment(careerPathsInterest) {
    if (!careerPathsInterest || careerPathsInterest.length === 0) return 0.4;
    const techRoles = ['engineer', 'developer', 'scientist', 'analyst', 'manager'];
    const hasMatch = careerPathsInterest.some(path => 
      techRoles.some(role => path.toLowerCase().includes(role))
    );
    return hasMatch ? 0.8 : 0.6;
  }

  // Tier 2 scoring functions
  getIndustryMarketOpportunity(industryPreference) {
    if (!industryPreference || industryPreference.length === 0) return 0.5;
    const highOpportunityIndustries = ['technology', 'healthcare', 'finance', 'e-commerce', 'education'];
    const hasMatch = industryPreference.some(industry => 
      highOpportunityIndustries.some(highOp => industry.toLowerCase().includes(highOp))
    );
    return hasMatch ? 0.85 : 0.6;
  }

  getTechMotivationScore(techMotivation) {
    if (!techMotivation) return 0.4;
    const motivationLower = techMotivation.toLowerCase();
    const strongMotivators = ['passion', 'solve problems', 'innovation', 'impact', 'challenge'];
    const matches = strongMotivators.filter(motivator => motivationLower.includes(motivator)).length;
    return Math.min(0.5 + (matches * 0.1), 0.9);
  }

  getTechPassionSustainability(techPassion) {
    if (!techPassion) return 0.4;
    const passionLower = techPassion.toLowerCase();
    const sustainabilityIndicators = ['deeply', 'passionate', 'excited', 'fascinated', 'love'];
    const hasStrong = sustainabilityIndicators.some(indicator => passionLower.includes(indicator));
    return hasStrong ? 0.85 : 0.6;
  }

  // Tier 3 scoring functions
  getTransferableSkillValue(transferableSkills) {
    if (!transferableSkills) return 0.3;
    const skillsLower = transferableSkills.toLowerCase();
    const valuableSkills = ['analytical', 'problem', 'logical', 'technical', 'creative', 'communication', 'leadership', 'project management'];
    const matches = valuableSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.4 + (matches * 0.08), 0.9);
  }

  getTechnologyFoundationScore(jobTechnologies) {
    if (!jobTechnologies) return 0.3;
    const techLower = jobTechnologies.toLowerCase();
    const foundationTech = ['python', 'javascript', 'sql', 'excel', 'git', 'aws', 'java', 'r'];
    const matches = foundationTech.filter(tech => techLower.includes(tech)).length;
    return Math.min(0.4 + (matches * 0.1), 0.9);
  }

  getCurrentTrajectoryScore(jobResponsibilities) {
    if (!jobResponsibilities) return 0.4;
    const respLower = jobResponsibilities.toLowerCase();
    const techResponsibilities = ['analysis', 'programming', 'development', 'technical', 'data', 'automation'];
    const matches = techResponsibilities.filter(resp => respLower.includes(resp)).length;
    return Math.min(0.4 + (matches * 0.1), 0.85);
  }

  getPracticalExperienceScore(jobProjects) {
    if (!jobProjects) return 0.3;
    const projectsLower = jobProjects.toLowerCase();
    const techProjects = ['software', 'system', 'application', 'database', 'automation', 'analysis'];
    const matches = techProjects.filter(project => projectsLower.includes(project)).length;
    return Math.min(0.4 + (matches * 0.1), 0.8);
  }

  // Tier 4 scoring functions
  getCurrentRoleContextScore(continueCurrent) {
    if (!continueCurrent) return 0.4;
    const roleLower = continueCurrent.toLowerCase();
    if (roleLower.includes('engineer') || roleLower.includes('developer')) return 0.9;
    if (roleLower.includes('analyst') || roleLower.includes('specialist')) return 0.7;
    if (roleLower.includes('manager') || roleLower.includes('coordinator')) return 0.6;
    return 0.5;
  }

  getStudyFieldRelevance(studyField) {
    if (!studyField) return 0.3;
    const fieldLower = studyField.toLowerCase();
    if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
    if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.8;
    if (fieldLower.includes('science') || fieldLower.includes('data')) return 0.7;
    if (fieldLower.includes('business') || fieldLower.includes('management')) return 0.6;
    return 0.4;
  }

  getCertificationValue(certifications) {
    if (!certifications) return 0.2;
    const certLower = certifications.toLowerCase();
    if (certLower.includes('none') || certLower.includes('0')) return 0.2;
    const techCerts = ['aws', 'google', 'microsoft', 'cisco', 'oracle', 'programming'];
    const hasMatch = techCerts.some(cert => certLower.includes(cert));
    return hasMatch ? 0.8 : 0.5;
  }

  getInternshipExperienceScore(internships) {
    if (!internships) return 0.2;
    const internLower = internships.toLowerCase();
    if (internLower.includes('none') || internLower.includes('0')) return 0.2;
    const techInternships = ['technology', 'software', 'engineering', 'data', 'tech'];
    const hasMatch = techInternships.some(tech => internLower.includes(tech));
    return hasMatch ? 0.7 : 0.5;
  }

  getPublicationLeadershipScore(publications) {
    if (!publications) return 0.2;
    const pubLower = publications.toLowerCase();
    if (pubLower.includes('none') || pubLower.includes('0')) return 0.2;
    if (pubLower.includes('several') || pubLower.includes('many')) return 0.8;
    return 0.6;
  }

  // ============================================================================
  // v2.0 UTILITY FUNCTIONS
  // ============================================================================

  determineV2Confidence(criteriaCount, totalWeightedScore) {
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

  determineSkillGapConfidence(skillGaps, userProfile) {
    const hasCurrentSkills = userProfile.toolsUsed && userProfile.toolsUsed.length > 0;
    const hasExperience = userProfile.yearsExperience && this.getExperienceLevel(userProfile.yearsExperience) > 0.3;
    const skillGapCount = skillGaps.length;
    
    let confidence = 0.5;
    if (hasCurrentSkills) confidence += 0.2;
    if (hasExperience) confidence += 0.2;
    if (skillGapCount <= 5) confidence += 0.1;
    
    const normalizedScore = Math.round(confidence * 100);
    const level = normalizedScore >= 75 ? 'high' : normalizedScore >= 50 ? 'medium' : 'low';
    
    return { level, score: normalizedScore };
  }

  determineLearningRoadmapConfidence(phases, userProfile) {
    const hasTimeCommitment = userProfile.timeCommitment && userProfile.timeCommitment !== '';
    const hasLearningComfort = userProfile.learningComfort && userProfile.learningComfort !== '';
    const phaseCount = phases.length;
    
    let confidence = 0.6;
    if (hasTimeCommitment) confidence += 0.15;
    if (hasLearningComfort) confidence += 0.15;
    if (phaseCount <= 3) confidence += 0.1;
    
    const normalizedScore = Math.round(confidence * 100);
    const level = normalizedScore >= 75 ? 'high' : normalizedScore >= 50 ? 'medium' : 'low';
    
    return { level, score: normalizedScore };
  }

  calculateV2OverallConfidence(careerPath, skillGap, learningRoadmap) {
    const careerPathScore = careerPath.confidenceScore || 0;
    const skillGapScore = skillGap.confidenceScore || 0;
    const roadmapScore = learningRoadmap.confidenceScore || 0;
    
    // Weighted average: Career Path is most important
    const weightedAvg = (careerPathScore * 0.5) + (skillGapScore * 0.3) + (roadmapScore * 0.2);
    return Math.round(weightedAvg);
  }

  extractUsedCriteria(userProfile, criteria) {
    return criteria.filter(field => this.isV2Valid(userProfile[field]));
  }

  extractMissingCriteria(userProfile, criteria) {
    return criteria.filter(field => !this.isV2Valid(userProfile[field]));
  }

  getExperienceLevel(experience) {
    const expMap = {
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      '0': 0.2, '1': 0.3, '2': 0.4, '3': 0.5, '4': 0.6, '5': 0.7,
      'Complete beginner': 0.2, 'Some exposure': 0.4, 'Beginner': 0.5,
      'Intermediate': 0.7, 'Advanced': 0.9, 'entry': 0.3, 'mid': 0.6, 'senior': 0.9
    };
    return expMap[experience] || 0.5;
  }

  getStrongestTier(tierScores) {
    const tiers = {
      'Core Drivers': tierScores.coreDriving,
      'Strong Motivators': tierScores.strongMotivators,
      'Supporting Evidence': tierScores.supportingEvidence,
      'Background Context': tierScores.backgroundContext
    };
    
    return Object.keys(tiers).reduce((a, b) => tiers[a] > tiers[b] ? a : b);
  }

  extractPrimaryTechInterest(techInterests) {
    if (!techInterests) return 'Technology';
    const interests = techInterests.split(',')[0].trim();
    return interests.charAt(0).toUpperCase() + interests.slice(1);
  }

  calculateLearningTime(currentLevel, skill, timeCommitment) {
    const baseHours = { 'none': 120, 'basic': 80, 'intermediate': 40 };
    const skillComplexity = skill.toLowerCase().includes('advanced') || skill.toLowerCase().includes('deep') ? 1.5 : 1;
    const totalHours = (baseHours[currentLevel] || 100) * skillComplexity;
    
    const weeklyHours = timeCommitment?.toLowerCase().includes('full') ? 40 : 15;
    const weeks = Math.ceil(totalHours / weeklyHours);
    const months = Math.ceil(weeks / 4);
    
    return `${months}-${months + 1} months`;
  }

  generatePhaseResources(phaseType, userProfile) {
    const resources = [];
    const learningComfort = (userProfile.learningComfort || '').toLowerCase();
    
    if (phaseType === 'foundation') {
      resources.push('Online fundamentals courses', 'Interactive tutorials', 'Practice exercises');
    } else if (phaseType === 'development') {
      resources.push('Specialized courses', 'Real-world projects', 'Certification programs');
    } else if (phaseType === 'mastery') {
      resources.push('Advanced projects', 'Capstone portfolio', 'Interview preparation');
    }
    
    if (learningComfort.includes('mentorship') || learningComfort.includes('guidance')) {
      resources.push('Mentored learning programs');
    }
    
    return resources;
  }

  generatePhaseMilestones(phaseType, skills) {
    if (phaseType === 'foundation') {
      return ['Complete fundamental concepts', 'Build first project', 'Pass knowledge assessment'];
    } else if (phaseType === 'development') {
      return ['Complete 2-3 intermediate projects', 'Obtain relevant certification', 'Demonstrate practical skills'];
    } else if (phaseType === 'mastery') {
      return ['Complete portfolio project', 'Conduct mock interviews', 'Demonstrate job readiness'];
    }
    
    return ['Complete phase objectives', 'Demonstrate competency'];
  }

  extractAvgMonths(duration) {
    const matches = duration.match(/(\d+)-?(\d+)?\s*months?/);
    if (matches) {
      const start = parseInt(matches[1]);
      const end = matches[2] ? parseInt(matches[2]) : start;
      return (start + end) / 2;
    }
    return 3; // Default fallback
  }

  generateId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // ============================================================================
  // BACKWARD COMPATIBILITY
  // ============================================================================

  /**
   * Legacy method for backward compatibility
   * @deprecated Use generateCareerRecommendations instead
   */
  async analyzeCareerPath(formData) {
    console.log("⚠️ Using legacy analyzeCareerPath method - consider upgrading to v2.0 System");
    
    try {
      const structuredResponse = await this.generateCareerRecommendations(formData);
      
      // Convert structured response back to text format for legacy compatibility
      const textAnalysis = this.convertV2StructuredToText(structuredResponse);
      
      return textAnalysis;
    } catch (error) {
      console.error('Error in legacy analyzeCareerPath:', error);
      throw error;
    }
  }

  convertV2StructuredToText(recommendationResponse) {
    let text = "CAREER PATH RECOMMENDATION SYSTEM v2.0 - SEQUENTIAL DEPENDENCY ENGINE ANALYSIS\n\n";
    
    text += `SYSTEM PERFORMANCE METRICS\n`;
    text += `Overall Confidence: ${recommendationResponse.overallConfidence}%\n`;
    text += `Data Completeness: ${recommendationResponse.dataCompleteness}%\n`;
    text += `Career Path Criteria Complete: ${recommendationResponse.careerPathCriteriaComplete}/16\n`;
    text += `Processing Time: ${recommendationResponse.processingTime}ms\n\n`;
    
    // Career Path Recommendation
    const cp = recommendationResponse.careerPath;
    text += `🎯 CAREER PATH RECOMMENDATION\n`;
    text += `Title: ${cp.title}\n`;
    text += `Description: ${cp.description}\n`;
    text += `Reasoning: ${cp.reasoning}\n`;
    text += `Confidence: ${cp.confidence} (${cp.confidenceScore}%)\n`;
    text += `Recommended Paths: ${cp.recommendedPaths.join(', ')}\n`;
    text += `Industry Focus: ${cp.industryFocus.join(', ')}\n`;
    text += `Market Demand: ${cp.marketDemand}\n`;
    
    if (cp.metadata) {
      text += `\n4-Tier Scoring Breakdown:\n`;
      text += `- Core Drivers (45%): ${Math.round(cp.metadata.tierScores.coreDriving * 100)}%\n`;
      text += `- Strong Motivators (25%): ${Math.round(cp.metadata.tierScores.strongMotivators * 100)}%\n`;
      text += `- Supporting Evidence (20%): ${Math.round(cp.metadata.tierScores.supportingEvidence * 100)}%\n`;
      text += `- Background Context (10%): ${Math.round(cp.metadata.tierScores.backgroundContext * 100)}%\n`;
      text += `- Criteria Used: ${cp.metadata.criteriaUsed.join(', ')}\n`;
      text += `- Fallback Applied: ${cp.metadata.fallbackApplied ? 'Yes' : 'No'}\n`;
    }
    
    text += "\n---\n\n";
    
    // Skill Gap Analysis
    const sg = recommendationResponse.skillGap;
    text += `📚 SKILL GAP ANALYSIS\n`;
    text += `Current Skill Level: ${sg.currentSkillLevel}\n`;
    text += `Required Skills: ${sg.requiredSkills.join(', ')}\n`;
    text += `Confidence: ${sg.confidence} (${sg.confidenceScore}%)\n`;
    
    text += `\nSkill Gaps:\n`;
    sg.skillGaps.forEach(gap => {
      text += `- ${gap.skill}: ${gap.currentLevel} → ${gap.requiredLevel} (${gap.priority} priority, ${gap.estimatedLearningTime})\n`;
    });
    
    text += `\nStrengths to Leverage: ${sg.strengthsToLeverage.join(', ')}\n`;
    text += `Recommended Certifications: ${sg.recommendedCertifications.join(', ')}\n`;
    
    text += "\n---\n\n";
    
    // Learning Roadmap
    const lr = recommendationResponse.learningRoadmap;
    text += `⚖️ LEARNING ROADMAP\n`;
    text += `Total Timeline: ${lr.totalTimelineEstimate}\n`;
    text += `Budget Estimate: ${lr.budgetEstimate}\n`;
    text += `Confidence: ${lr.confidence} (${lr.confidenceScore}%)\n`;
    
    text += `\nLearning Phases:\n`;
    lr.phases.forEach(phase => {
      text += `Phase ${phase.phase}: ${phase.title} (${phase.duration})\n`;
      text += `  Skills: ${phase.skills.join(', ')}\n`;
      text += `  Resources: ${phase.resources.join(', ')}\n`;
      text += `  Milestones: ${phase.milestones.join(', ')}\n\n`;
    });
    
    text += `Flexibility Options: ${lr.flexibilityOptions.join(', ')}\n`;
    text += `Support Recommendations: ${lr.supportRecommendations.join(', ')}\n`;
    
    text += "\n---\n\n";
    text += "SEQUENTIAL DEPENDENCY ENGINE: Career Path → Skill Gap → Learning Roadmap\n";
    text += "All content dynamically generated using AI-driven personalization based on your unique profile.\n";
    
    return text;
  }
}

export default new ClaudeApiService();
