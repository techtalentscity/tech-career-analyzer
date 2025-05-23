// src/services/claudeApiService.js - UPDATED TO MATCH TECHNICAL SPECIFICATION v1.1
import { CLAUDE_API_CONFIG, CLAUDE_PROMPTS, TECHNICAL_SPEC_VALIDATION } from '../config/claudeApiConfig';
import storageService from './storageService';

class ClaudeApiService {
  /**
   * Generate form field suggestions based on Technical Specification v1.1
   * @returns {Promise<string>} The suggested form responses
   */
  async getFormSuggestions() {
    try {
      console.log("🔬 Calling Claude API for Technical Spec v1.1 form suggestions");
      
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
        technicalSpecVersion: CLAUDE_API_CONFIG.technicalSpecVersion
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
      console.log("✅ Received successful response from Claude API (Technical Spec v1.1)");
      return data.content[0].text;
    } catch (error) {
      console.error('❌ Error getting form suggestions from Claude API:', error);
      throw error;
    }
  }

  /**
   * Generate career recommendations using Technical Specification v1.1 Multi-Tier Engine
   * @param {Object} formData The user's form responses
   * @returns {Promise<Object>} The structured SystemResponse with recommendations
   */
  async generateCareerRecommendations(formData) {
    try {
      console.log("🚀 Generating Technical Specification v1.1 career recommendations for:", formData.fullName);
      const startTime = Date.now();
      
      // Step 1: Validate and process user profile according to Technical Specification
      const userProfile = this.validateAndProcessProfileTechnicalSpec(formData);
      console.log("✅ User profile processed for Technical Spec v1.1:", userProfile.name);
      
      // Step 2: Validate minimum viable data for Technical Specification
      const validation = TECHNICAL_SPEC_VALIDATION.validateMinimumData(userProfile);
      if (!validation.isValid) {
        throw new Error('Insufficient data for Technical Specification v1.1 analysis - need at least 1 constant variable');
      }
      
      console.log("📊 Technical Spec validation:", {
        constantsPresent: validation.constantsPresent,
        requiresFallback: validation.requiresFallback,
        dataQuality: Math.round(validation.dataQuality * 100) + '%'
      });
      
      // Step 3: Generate the 3 Technical Specification recommendations in parallel
      const [recommendation1, recommendation2, recommendation3] = await Promise.all([
        this.generateTechInterestBasedRecommendation(userProfile),
        this.generateResearchDevelopmentRecommendation(userProfile),
        this.generateLifestyleMarketRecommendation(userProfile)
      ]);
      
      console.log("✅ Generated 3 Technical Specification v1.1 recommendations");
      
      // Step 4: Sort by confidence score (highest first) as per Technical Specification
      const recommendations = [recommendation1, recommendation2, recommendation3]
        .filter(Boolean)
        .sort((a, b) => b.confidenceScore - a.confidenceScore);
      
      // Step 5: Calculate Technical Specification metrics
      const overallConfidence = this.calculateOverallConfidence(recommendations);
      const dataCompleteness = this.assessDataCompleteness(userProfile);
      const constantVariablesComplete = validation.constantsPresent;
      
      // Step 6: Create Technical Specification v1.1 system response
      const systemResponse = {
        recommendations,
        overallConfidence,
        dataCompleteness,
        constantVariablesComplete,
        processingTime: Date.now() - startTime,
        processedAt: new Date().toISOString(),
        technicalSpecVersion: '1.1',
        algorithmVersion: 'Multi-Tier with Fallback Logic',
        engineType: 'Multi-Tier Recommendation Engine'
      };
      
      // Step 7: Save to storage (maintaining existing functionality)
      try {
        const analysisData = {
          userId: formData.email || String(new Date().getTime()),
          analysis: JSON.stringify(systemResponse, null, 2),
          raw: JSON.stringify(systemResponse),
          structured: systemResponse,
          technicalSpecVersion: '1.1'
        };
        
        storageService.saveCareerAnalysis(analysisData);
        
        if (formData.email) {
          storageService.saveFormattedAnalysis(formData.email, JSON.stringify(systemResponse, null, 2));
        }
        
        console.log('✅ Technical Specification v1.1 analysis saved to storage');
      } catch (storageError) {
        console.error('❌ Error saving analysis to storage:', storageError);
      }
      
      console.log(`🎉 Technical Specification v1.1 recommendations generated successfully in ${systemResponse.processingTime}ms`);
      console.log(`📈 Overall confidence: ${systemResponse.overallConfidence}% | Data completeness: ${systemResponse.dataCompleteness}% | Constants: ${systemResponse.constantVariablesComplete}/4`);
      
      return systemResponse;
      
    } catch (error) {
      console.error('❌ Error generating Technical Specification v1.1 recommendations:', error);
      throw error;
    }
  }

  /**
   * Validate and standardize user profile data according to Technical Specification v1.1
   */
  validateAndProcessProfileTechnicalSpec(formData) {
    return {
      // Personal Information
      name: formData.fullName || 'User',
      email: formData.email || '',
      
      // 4 CONSTANT VARIABLES (Used in ALL recommendations) - Technical Specification v1.1
      yearsExperience: formData.yearsExperience || formData.experienceLevel || '',
      studyField: formData.studyField || '',
      interests: Array.isArray(formData.interests) 
        ? formData.interests 
        : (typeof formData.interests === 'string' ? formData.interests.split(',').map(i => i.trim()) : []),
      transferableSkills: formData.transferableSkills || '',
      
      // RECOMMENDATION 1 SPECIFIC (🎯 Tech-Interest Based) - Technical Specification
      techInterests: formData.techInterests || '',
      currentRole: formData.currentRole || '',
      jobTechnologies: formData.jobTechnologies || '',
      
      // RECOMMENDATION 2 SPECIFIC (📚 Research/Development Based) - Technical Specification
      publications: formData.publications || '',
      toolsUsed: formData.toolsUsed || [],
      timeCommitment: formData.timeCommitment || '',
      
      // RECOMMENDATION 3 SPECIFIC (⚖️ Lifestyle/Market Based) - Technical Specification
      workPreference: formData.workPreference || '',
      educationLevel: formData.educationLevel || '',
      targetSalary: formData.targetSalary || '',
      
      // Additional Context
      experienceLevel: formData.experienceLevel || '',
      jobResponsibilities: formData.jobResponsibilities || '',
      jobProjects: formData.jobProjects || '',
      careerPathsInterest: formData.careerPathsInterest || [],
      transitionTimeline: formData.transitionTimeline || ''
    };
  }

  /**
   * Generate Tech-Interest Based Recommendation (🎯) - Technical Specification v1.1
   * Criteria: techInterests + currentRole + jobTechnologies + 4 constants
   */
  async generateTechInterestBasedRecommendation(userProfile) {
    console.log("🎯 Generating Tech-Interest Based recommendation (Technical Spec v1.1)...");
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['techInterests', 'currentRole', 'jobTechnologies']
    };
    
    const weights = this.calculateDynamicWeights(userProfile, criteria);
    const score = this.calculateTechInterestScore(userProfile, weights);
    const confidence = this.determineConfidence(score.criteriaCount, score.totalScore);
    
    // Generate role title based on tech interests and experience
    const roleTitle = this.generateTechInterestRoleTitle(score.techAlignment, userProfile.yearsExperience);
    
    return {
      id: 'rec_1_tech_interest',
      type: 'tech-interest-based',
      title: roleTitle,
      description: this.generateTechInterestDescription(score.techAlignment, userProfile),
      reasoning: this.generateTechInterestReasoning(userProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      
      requiredSkills: this.extractTechInterestSkills(score.techAlignment, userProfile),
      suggestedActions: this.generateTechInterestActions(userProfile, score.techAlignment),
      salaryRange: this.getTechInterestSalaryRange(score.techAlignment, userProfile.yearsExperience),
      marketDemand: this.getTechInterestMarketDemand(score.techAlignment),
      
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        fallbackApplied: score.fallbackUsed,
        constantsScore: score.constantsScore,
        specificsScore: score.specificsScore,
        algorithm: 'tech-interest-based-v1.1'
      }
    };
  }

  /**
   * Generate Research/Development Based Recommendation (📚) - Technical Specification v1.1
   * Criteria: publications + toolsUsed + timeCommitment + 4 constants
   */
  async generateResearchDevelopmentRecommendation(userProfile) {
    console.log("📚 Generating Research/Development Based recommendation (Technical Spec v1.1)...");
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['publications', 'toolsUsed', 'timeCommitment']
    };
    
    const weights = this.calculateDynamicWeights(userProfile, criteria);
    const score = this.calculateResearchDevelopmentScore(userProfile, weights);
    const confidence = this.determineConfidence(score.criteriaCount, score.totalScore);
    
    // Generate role title based on research background and experience
    const roleTitle = this.generateResearchRoleTitle(score.researchAlignment, userProfile.yearsExperience);
    
    return {
      id: 'rec_2_research_dev',
      type: 'research-development',
      title: roleTitle,
      description: this.generateResearchDescription(score.researchAlignment, userProfile),
      reasoning: this.generateResearchReasoning(userProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      
      requiredSkills: this.extractResearchSkills(score.researchAlignment, userProfile),
      suggestedActions: this.generateResearchActions(userProfile, score.researchAlignment),
      salaryRange: this.getResearchSalaryRange(score.researchAlignment, userProfile.yearsExperience),
      marketDemand: this.getResearchMarketDemand(score.researchAlignment),
      
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        fallbackApplied: score.fallbackUsed,
        constantsScore: score.constantsScore,
        specificsScore: score.specificsScore,
        algorithm: 'research-development-v1.1'
      }
    };
  }

  /**
   * Generate Lifestyle/Market Based Recommendation (⚖️) - Technical Specification v1.1
   * Criteria: workPreference + educationLevel + targetSalary + 4 constants
   */
  async generateLifestyleMarketRecommendation(userProfile) {
    console.log("⚖️ Generating Lifestyle/Market Based recommendation (Technical Spec v1.1)...");
    
    const criteria = {
      constants: ['yearsExperience', 'studyField', 'interests', 'transferableSkills'],
      specific: ['workPreference', 'educationLevel', 'targetSalary']
    };
    
    const weights = this.calculateDynamicWeights(userProfile, criteria);
    const score = this.calculateLifestyleMarketScore(userProfile, weights);
    const confidence = this.determineConfidence(score.criteriaCount, score.totalScore);
    
    // Generate role title based on lifestyle preferences and market fit
    const roleTitle = this.generateLifestyleRoleTitle(score.marketFit, userProfile.yearsExperience);
    
    return {
      id: 'rec_3_lifestyle_market',
      type: 'lifestyle-market',
      title: roleTitle,
      description: this.generateLifestyleDescription(score.marketFit, userProfile),
      reasoning: this.generateLifestyleReasoning(userProfile, score),
      confidence: confidence.level,
      confidenceScore: confidence.score,
      match: Math.round(score.totalScore),
      
      requiredSkills: this.extractLifestyleSkills(score.marketFit, userProfile),
      suggestedActions: this.generateLifestyleActions(userProfile, score.marketFit),
      salaryRange: this.getLifestyleSalaryRange(score.marketFit, userProfile.targetSalary),
      marketDemand: this.getLifestyleMarketDemand(score.marketFit),
      
      metadata: {
        criteriaUsed: score.usedCriteria,
        missingCriteria: score.missingCriteria,
        fallbackApplied: score.fallbackUsed,
        constantsScore: score.constantsScore,
        specificsScore: score.specificsScore,
        algorithm: 'lifestyle-market-v1.1'
      }
    };
  }

  // ============================================================================
  // TECHNICAL SPECIFICATION v1.1 - DYNAMIC WEIGHTING & FALLBACK LOGIC
  // ============================================================================

  /**
   * Calculate dynamic weights based on Technical Specification v1.1
   */
  calculateDynamicWeights(profile, criteria) {
    const constantsResult = this.assessConstantVariables(profile);
    const specificsResult = this.assessSpecificCriteria(profile, criteria.specific);
    
    // Base weights: 60% constants, 40% specifics (Technical Specification default)
    let constantWeight = 0.6;
    let specificWeight = 0.4;
    
    // Fallback Logic Based on Missing Constants (Technical Specification)
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
    
    return this.distributeWeights(constantWeight, specificWeight, criteria);
  }

  /**
   * Assess constant variables according to Technical Specification v1.1
   */
  assessConstantVariables(profile) {
    const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    const validCount = constants.filter(key => this.isValid(profile[key])).length;
    
    return {
      validCount,
      totalCount: 4,
      completeness: validCount / 4,
      critical: validCount < 2  // Less than 2 constants is critical
    };
  }

  /**
   * Assess specific criteria for each algorithm
   */
  assessSpecificCriteria(profile, specificFields) {
    const validCount = specificFields.filter(field => this.isValid(profile[field])).length;
    
    return {
      validCount,
      totalCount: specificFields.length,
      completeness: validCount / specificFields.length
    };
  }

  /**
   * Enhanced validation function from Technical Specification v1.1
   */
  isValid(value) {
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
  }

  /**
   * Distribute weights according to Technical Specification
   */
  distributeWeights(constantWeight, specificWeight, criteria) {
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
  }

  /**
   * Check if fallback is required according to Technical Specification
   */
  checkFallbackRequired(constantsCount, totalCriteriaCount) {
    return constantsCount < 2 || totalCriteriaCount < 4;
  }

  // ============================================================================
  // TECHNICAL SPECIFICATION v1.1 - SCORING FUNCTIONS
  // ============================================================================

  /**
   * Calculate Tech-Interest Based score using Technical Specification v1.1
   */
  calculateTechInterestScore(profile, weights) {
    let constantsScore = 0;
    let specificsScore = 0;
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // 4 Constant Variables Scoring
    const constantResults = this.scoreConstantVariables(profile, weights);
    constantsScore = constantResults.score;
    criteriaCount += constantResults.count;
    usedCriteria.push(...constantResults.used);
    missingCriteria.push(...constantResults.missing);
    
    // Tech-Interest Specific Criteria
    if (this.isValid(profile.techInterests)) {
      specificsScore += weights.techInterests * this.getTechInterestMarketAlignment(profile.techInterests) * 100;
      criteriaCount++;
      usedCriteria.push('techInterests');
    } else {
      missingCriteria.push('techInterests');
    }
    
    if (this.isValid(profile.currentRole)) {
      specificsScore += weights.currentRole * this.getCurrentRoleTechTransition(profile.currentRole) * 100;
      criteriaCount++;
      usedCriteria.push('currentRole');
    } else {
      missingCriteria.push('currentRole');
    }
    
    if (this.isValid(profile.jobTechnologies)) {
      specificsScore += weights.jobTechnologies * this.getTechnologyMarketDemand(profile.jobTechnologies) * 100;
      criteriaCount++;
      usedCriteria.push('jobTechnologies');
    } else {
      missingCriteria.push('jobTechnologies');
    }
    
    const totalScore = constantsScore + specificsScore;
    const fallbackUsed = this.checkFallbackRequired(constantResults.count, criteriaCount);
    
    return { 
      totalScore, 
      criteriaCount, 
      constantsScore, 
      specificsScore,
      usedCriteria,
      missingCriteria,
      fallbackUsed,
      techAlignment: this.extractTechAlignment(profile) 
    };
  }

  /**
   * Calculate Research/Development score using Technical Specification v1.1
   */
  calculateResearchDevelopmentScore(profile, weights) {
    let constantsScore = 0;
    let specificsScore = 0;
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // 4 Constant Variables Scoring
    const constantResults = this.scoreConstantVariables(profile, weights);
    constantsScore = constantResults.score;
    criteriaCount += constantResults.count;
    usedCriteria.push(...constantResults.used);
    missingCriteria.push(...constantResults.missing);
    
    // Research/Development Specific Criteria
    if (this.isValid(profile.publications)) {
      specificsScore += weights.publications * this.getPublicationScore(profile.publications) * 100;
      criteriaCount++;
      usedCriteria.push('publications');
    } else {
      missingCriteria.push('publications');
    }
    
    if (this.isValid(profile.toolsUsed)) {
      specificsScore += weights.toolsUsed * this.getResearchToolProficiency(profile.toolsUsed) * 100;
      criteriaCount++;
      usedCriteria.push('toolsUsed');
    } else {
      missingCriteria.push('toolsUsed');
    }
    
    if (this.isValid(profile.timeCommitment)) {
      specificsScore += weights.timeCommitment * this.getTimeCommitmentFlexibility(profile.timeCommitment) * 100;
      criteriaCount++;
      usedCriteria.push('timeCommitment');
    } else {
      missingCriteria.push('timeCommitment');
    }
    
    const totalScore = constantsScore + specificsScore;
    const fallbackUsed = this.checkFallbackRequired(constantResults.count, criteriaCount);
    
    return { 
      totalScore, 
      criteriaCount, 
      constantsScore, 
      specificsScore,
      usedCriteria,
      missingCriteria,
      fallbackUsed,
      researchAlignment: this.extractResearchAlignment(profile) 
    };
  }

  /**
   * Calculate Lifestyle/Market score using Technical Specification v1.1
   */
  calculateLifestyleMarketScore(profile, weights) {
    let constantsScore = 0;
    let specificsScore = 0;
    let criteriaCount = 0;
    let usedCriteria = [];
    let missingCriteria = [];
    
    // 4 Constant Variables Scoring
    const constantResults = this.scoreConstantVariables(profile, weights);
    constantsScore = constantResults.score;
    criteriaCount += constantResults.count;
    usedCriteria.push(...constantResults.used);
    missingCriteria.push(...constantResults.missing);
    
    // Lifestyle/Market Specific Criteria
    if (this.isValid(profile.workPreference)) {
      specificsScore += weights.workPreference * this.getWorkPreferenceMarketFit(profile.workPreference) * 100;
      criteriaCount++;
      usedCriteria.push('workPreference');
    } else {
      missingCriteria.push('workPreference');
    }
    
    if (this.isValid(profile.educationLevel)) {
      specificsScore += weights.educationLevel * this.getEducationLevelAlignment(profile.educationLevel) * 100;
      criteriaCount++;
      usedCriteria.push('educationLevel');
    } else {
      missingCriteria.push('educationLevel');
    }
    
    if (this.isValid(profile.targetSalary)) {
      specificsScore += weights.targetSalary * this.getSalaryMarketRealism(profile.targetSalary, profile.yearsExperience) * 100;
      criteriaCount++;
      usedCriteria.push('targetSalary');
    } else {
      missingCriteria.push('targetSalary');
    }
    
    const totalScore = constantsScore + specificsScore;
    const fallbackUsed = this.checkFallbackRequired(constantResults.count, criteriaCount);
    
    return { 
      totalScore, 
      criteriaCount, 
      constantsScore, 
      specificsScore,
      usedCriteria,
      missingCriteria,
      fallbackUsed,
      marketFit: this.extractMarketFit(profile) 
    };
  }

  /**
   * Score constant variables according to Technical Specification v1.1
   */
  scoreConstantVariables(profile, weights) {
    let score = 0;
    let count = 0;
    let used = [];
    let missing = [];
    
    // Years Experience (Universal baseline)
    if (this.isValid(profile.yearsExperience)) {
      score += weights.yearsExperience * this.getExperienceScore(profile.yearsExperience) * 100;
      count++;
      used.push('yearsExperience');
    } else {
      missing.push('yearsExperience');
    }
    
    // Study Field (Academic foundation)
    if (this.isValid(profile.studyField)) {
      score += weights.studyField * this.getStudyFieldRelevance(profile.studyField) * 100;
      count++;
      used.push('studyField');
    } else {
      missing.push('studyField');
    }
    
    // Interests (Passion alignment)
    if (this.isValid(profile.interests)) {
      score += weights.interests * this.getInterestAlignment(profile.interests) * 100;
      count++;
      used.push('interests');
    } else {
      missing.push('interests');
    }
    
    // Transferable Skills (Cross-domain value)
    if (this.isValid(profile.transferableSkills)) {
      score += weights.transferableSkills * this.getTransferableSkillValue(profile.transferableSkills) * 100;
      count++;
      used.push('transferableSkills');
    } else {
      missing.push('transferableSkills');
    }
    
    return { score, count, used, missing };
  }

  /**
   * Confidence scoring according to Technical Specification v1.1
   */
  determineConfidence(criteriaCount, totalScore) {
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
  }

  // ============================================================================
  // TECHNICAL SPECIFICATION v1.1 - SCORING HELPER FUNCTIONS
  // ============================================================================

  getExperienceScore(experience) {
    const expMap = {
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      '0': 0.2, '1': 0.3, '2': 0.4, '3': 0.5, '4': 0.6, '5': 0.7,
      'Complete beginner': 0.2, 'Some exposure': 0.4, 'Beginner': 0.5,
      'Intermediate': 0.7, 'Advanced': 0.9
    };
    return expMap[experience] || 0.5;
  }

  getStudyFieldRelevance(field) {
    if (!field) return 0.3;
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
    if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.8;
    if (fieldLower.includes('science') || fieldLower.includes('data')) return 0.7;
    if (fieldLower.includes('business') || fieldLower.includes('management')) return 0.6;
    return 0.4;
  }

  getInterestAlignment(interests) {
    if (!interests || interests.length === 0) return 0.3;
    const techKeywords = ['programming', 'coding', 'software', 'ai', 'data', 'web', 'mobile', 'technology'];
    const hasMatch = interests.some(interest => 
      techKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    return hasMatch ? 0.8 : 0.5;
  }

  getTransferableSkillValue(skills) {
    if (!skills) return 0.3;
    const skillsLower = skills.toLowerCase();
    const valuableSkills = ['analytical', 'problem', 'logical', 'technical', 'creative', 'communication', 'leadership'];
    const matches = valuableSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.4 + (matches * 0.1), 0.9);
  }

  // Tech-Interest specific scoring
  getTechInterestMarketAlignment(techInterests) {
    if (!techInterests) return 0.3;
    const interestsLower = techInterests.toLowerCase();
    const hotTech = ['machine learning', 'ai', 'cloud', 'cybersecurity', 'blockchain', 'data science'];
    const matches = hotTech.filter(tech => interestsLower.includes(tech)).length;
    return Math.min(0.5 + (matches * 0.15), 0.95);
  }

  getCurrentRoleTechTransition(currentRole) {
    if (!currentRole) return 0.4;
    const roleLower = currentRole.toLowerCase();
    if (roleLower.includes('engineer') || roleLower.includes('developer')) return 0.9;
    if (roleLower.includes('analyst') || roleLower.includes('manager')) return 0.7;
    if (roleLower.includes('coordinator') || roleLower.includes('assistant')) return 0.5;
    return 0.6;
  }

  getTechnologyMarketDemand(technologies) {
    if (!technologies) return 0.3;
    const techLower = technologies.toLowerCase();
    const highDemandTech = ['python', 'javascript', 'react', 'aws', 'sql', 'java', 'nodejs'];
    const matches = highDemandTech.filter(tech => techLower.includes(tech)).length;
    return Math.min(0.5 + (matches * 0.1), 0.95);
  }

  // Research/Development specific scoring
  getPublicationScore(publications) {
    if (!publications) return 0.2;
    const pubLower = publications.toLowerCase();
    if (pubLower.includes('none') || pubLower.includes('0')) return 0.2;
    if (pubLower.includes('1') || pubLower.includes('few')) return 0.6;
    if (pubLower.includes('several') || pubLower.includes('many')) return 0.8;
    return 0.7;
  }

  getResearchToolProficiency(toolsUsed) {
    if (!toolsUsed || toolsUsed.length === 0) return 0.3;
    const researchTools = ['jupyter', 'r', 'matlab', 'git', 'docker', 'python', 'spss', 'stata'];
    const matches = toolsUsed.filter(tool => 
      researchTools.some(rTool => tool.toLowerCase().includes(rTool))
    ).length;
    return Math.min(0.4 + (matches * 0.1), 0.9);
  }

  getTimeCommitmentFlexibility(timeCommitment) {
    const commitMap = { 
      'full-time': 0.9, 
      'part-time': 0.7, 
      'flexible': 0.8,
      'evenings': 0.6,
      'weekends': 0.5,
      '20+ hours': 0.9,
      '15-20 hours': 0.7,
      '10-15 hours': 0.6
    };
    return commitMap[timeCommitment?.toLowerCase()] || 0.6;
  }

  // Lifestyle/Market specific scoring
  getWorkPreferenceMarketFit(workPreference) {
    const prefMap = { 
      'remote': 0.9, 
      'hybrid': 0.8, 
      'onsite': 0.6,
      'flexible': 0.7,
      'remote work': 0.9
    };
    return prefMap[workPreference?.toLowerCase()] || 0.7;
  }

  getEducationLevelAlignment(educationLevel) {
    const levelMap = {
      'high school': 0.4, 
      'bachelor': 0.7, 
      'master': 0.9, 
      'phd': 0.95,
      'associate': 0.5,
      'bootcamp': 0.6,
      'bachelor\'s degree': 0.7,
      'master\'s degree': 0.9
    };
    return levelMap[educationLevel?.toLowerCase()] || 0.6;
  }

  getSalaryMarketRealism(targetSalary, yearsExperience) {
    if (!targetSalary) return 0.5;
    const salaryNum = parseInt(targetSalary.replace(/[^\d]/g, ''));
    const expScore = this.getExperienceScore(yearsExperience);
    
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
  }

  // ============================================================================
  // TECHNICAL SPECIFICATION v1.1 - CONTENT GENERATION
  // ============================================================================

  // Alignment extraction functions
  extractTechAlignment(profile) {
    const techKeys = [];
    if (profile.techInterests) techKeys.push(...profile.techInterests.split(',').map(t => t.trim()));
    if (profile.jobTechnologies) techKeys.push(...profile.jobTechnologies.split(',').map(t => t.trim()));
    return techKeys.length > 0 ? techKeys[0] : 'General Technology';
  }

  extractResearchAlignment(profile) {
    if (profile.studyField && profile.studyField.toLowerCase().includes('research')) {
      return profile.studyField + ' Research';
    }
    if (profile.publications && !profile.publications.toLowerCase().includes('none')) {
      return 'Technology Research';
    }
    return 'Academic Research';
  }

  extractMarketFit(profile) {
    const workPref = profile.workPreference || 'flexible';
    const eduLevel = profile.educationLevel || 'bachelor';
    return `${workPref.charAt(0).toUpperCase() + workPref.slice(1)} ${eduLevel.charAt(0).toUpperCase() + eduLevel.slice(1)} Professional`;
  }

  // Title generation functions
  generateTechInterestRoleTitle(techAlignment, experience) {
    const expScore = this.getExperienceScore(experience);
    const prefix = expScore > 0.7 ? 'Senior ' : expScore > 0.4 ? '' : 'Junior ';
    
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
  }

  generateResearchRoleTitle(researchAlignment, experience) {
    const expScore = this.getExperienceScore(experience);
    const prefix = expScore > 0.7 ? 'Senior Research ' : 'Research ';
    return `${prefix}Scientist - ${researchAlignment}`;
  }

  generateLifestyleRoleTitle(marketFit, experience) {
    const expScore = this.getExperienceScore(experience);
    const prefix = expScore > 0.7 ? 'Senior ' : '';
    return `${prefix}${marketFit}`;
  }

  // Description generators
  generateTechInterestDescription(techAlignment, profile) {
    return `Leverage your interest in ${techAlignment.toLowerCase()} to build innovative solutions and drive technical excellence in the industry.`;
  }

  generateResearchDescription(researchAlignment, profile) {
    return `Conduct cutting-edge research in ${researchAlignment.toLowerCase()} with focus on practical applications and theoretical advancement.`;
  }

  generateLifestyleDescription(marketFit, profile) {
    return `Apply technology skills in a ${marketFit.toLowerCase()} role that balances technical expertise with your lifestyle preferences.`;
  }

  // Reasoning generators
  generateTechInterestReasoning(profile, score) {
    return `Based on your tech interests and ${score.criteriaCount} qualifying criteria with ${Math.round(score.totalScore)}% alignment score from Technical Specification v1.1 analysis.`;
  }

  generateResearchReasoning(profile, score) {
    return `Your research background and academic interests align ${Math.round(score.totalScore)}% with development opportunities based on Technical Specification v1.1 analysis.`;
  }

  generateLifestyleReasoning(profile, score) {
    return `Considering your lifestyle preferences and career goals, this path offers ${Math.round(score.totalScore)}% compatibility according to Technical Specification v1.1 analysis.`;
  }

  // Skills extraction
  extractTechInterestSkills(techAlignment, profile) {
    const baseSkills = ['Programming Fundamentals', 'Problem Solving', 'Version Control'];
    if (techAlignment.toLowerCase().includes('data')) {
      baseSkills.push('Data Analysis', 'Statistics', 'Python');
    } else if (techAlignment.toLowerCase().includes('web')) {
      baseSkills.push('HTML/CSS', 'JavaScript', 'Frameworks');
    }
    return baseSkills;
  }

  extractResearchSkills(researchAlignment, profile) {
    return ['Research Methodology', 'Data Analysis', 'Technical Writing', 'Critical Thinking', 'Statistical Analysis'];
  }

  extractLifestyleSkills(marketFit, profile) {
    return ['Project Management', 'Communication', 'Business Analysis', 'Team Collaboration', 'Adaptability'];
  }

  // Action generators
  generateTechInterestActions(profile, techAlignment) {
    return [
      `Build portfolio projects showcasing ${techAlignment.toLowerCase()} skills`,
      'Contribute to open source projects in your area of interest',
      'Complete relevant technical certifications',
      'Network with professionals in your target field'
    ];
  }

  generateResearchActions(profile, researchAlignment) {
    return [
      `Publish research papers in ${researchAlignment.toLowerCase()}`,
      'Attend academic conferences and workshops',
      'Collaborate on research projects with institutions',
      'Develop grant writing and funding skills'
    ];
  }

  generateLifestyleActions(profile, marketFit) {
    return [
      'Develop business-focused technical projects',
      'Network with industry professionals in your preferred work style',
      'Gain certifications that align with your career goals',
      'Build a portfolio that showcases your unique value proposition'
    ];
  }

  // Market data functions
  getTechInterestSalaryRange(techAlignment, experience) {
    const expScore = this.getExperienceScore(experience);
    const baseRange = { low: 50000, high: 90000 };
    
    if (techAlignment.toLowerCase().includes('data') || techAlignment.toLowerCase().includes('ai')) {
      baseRange.low += 10000;
      baseRange.high += 20000;
    }
    
    const adjustedLow = baseRange.low + (expScore * 30000);
    const adjustedHigh = baseRange.high + (expScore * 50000);
    
    return `$${Math.round(adjustedLow/1000)}k - $${Math.round(adjustedHigh/1000)}k`;
  }

  getResearchSalaryRange(researchAlignment, experience) {
    const expScore = this.getExperienceScore(experience);
    const baseLow = 55000 + (expScore * 25000);
    const baseHigh = 95000 + (expScore * 40000);
    return `$${Math.round(baseLow/1000)}k - $${Math.round(baseHigh/1000)}k`;
  }

  getLifestyleSalaryRange(marketFit, targetSalary) {
    if (targetSalary && this.isValid(targetSalary)) {
      const salaryNum = parseInt(targetSalary.replace(/[^\d]/g, ''));
      const range = salaryNum * 0.2;
      return `$${Math.round((salaryNum - range)/1000)}k - $${Math.round((salaryNum + range)/1000)}k`;
    }
    return '$60k - $110k';
  }

  // Market demand functions
  getTechInterestMarketDemand(techAlignment) {
    const highDemandAreas = ['data', 'ai', 'cloud', 'cybersecurity', 'mobile'];
    const hasHighDemand = highDemandAreas.some(area => 
      techAlignment.toLowerCase().includes(area)
    );
    return hasHighDemand ? 'high' : 'medium';
  }

  getResearchMarketDemand(researchAlignment) {
    return researchAlignment.toLowerCase().includes('data') ? 'high' : 'medium';
  }

  getLifestyleMarketDemand(marketFit) {
    return marketFit.toLowerCase().includes('remote') ? 'high' : 'medium';
  }

  // ============================================================================
  // TECHNICAL SPECIFICATION v1.1 - SYSTEM CALCULATION FUNCTIONS
  // ============================================================================

  calculateOverallConfidence(recommendations) {
    if (!recommendations || recommendations.length === 0) return 0;
    
    const avgConfidence = recommendations.reduce((sum, rec) => sum + (rec.confidenceScore || 0), 0) / recommendations.length;
    return Math.round(avgConfidence);
  }

  assessDataCompleteness(userProfile) {
    const constantFields = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    const specificFields = [
      'techInterests', 'currentRole', 'jobTechnologies',
      'publications', 'toolsUsed', 'timeCommitment',
      'workPreference', 'educationLevel', 'targetSalary'
    ];
    const allFields = [...constantFields, ...specificFields];
    
    const validFields = allFields.filter(field => this.isValid(userProfile[field])).length;
    return Math.round((validFields / allFields.length) * 100);
  }

  // ============================================================================
  // BACKWARD COMPATIBILITY
  // ============================================================================

  /**
   * Legacy method for backward compatibility
   * @deprecated Use generateCareerRecommendations instead
   */
  async analyzeCareerPath(formData) {
    console.log("⚠️ Using legacy analyzeCareerPath method - consider upgrading to Technical Specification v1.1");
    
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
    let text = "TECHNICAL SPECIFICATION v1.1 - CAREER ANALYSIS RESULTS\n\n";
    
    text += `MULTI-TIER RECOMMENDATION ENGINE ANALYSIS\n`;
    text += `Overall Confidence: ${structuredResponse.overallConfidence}%\n`;
    text += `Data Completeness: ${structuredResponse.dataCompleteness}%\n`;
    text += `Constant Variables Present: ${structuredResponse.constantVariablesComplete}/4\n\n`;
    
    structuredResponse.recommendations.forEach((rec, index) => {
      const algorithmEmoji = rec.type === 'tech-interest-based' ? '🎯' : 
                            rec.type === 'research-development' ? '📚' : '⚖️';
      
      text += `${algorithmEmoji} RECOMMENDATION ${index + 1}: ${rec.title}\n`;
      text += `Algorithm: ${rec.type}\n`;
      text += `Description: ${rec.description}\n`;
      text += `Confidence: ${rec.confidence} (${rec.confidenceScore}%)\n`;
      text += `Reasoning: ${rec.reasoning}\n`;
      text += `Required Skills: ${rec.requiredSkills.join(', ')}\n`;
      text += `Suggested Actions: ${rec.suggestedActions.join(', ')}\n`;
      text += `Salary Range: ${rec.salaryRange}\n`;
      text += `Market Demand: ${rec.marketDemand}\n`;
      
      if (rec.metadata) {
        text += `\nTechnical Specification Metadata:\n`;
        text += `- Criteria Used: ${rec.metadata.criteriaUsed.join(', ')}\n`;
        text += `- Missing Criteria: ${rec.metadata.missingCriteria.join(', ')}\n`;
        text += `- Fallback Applied: ${rec.metadata.fallbackApplied ? 'Yes' : 'No'}\n`;
        text += `- Constants Score: ${Math.round(rec.metadata.constantsScore || 0)}%\n`;
        text += `- Specifics Score: ${Math.round(rec.metadata.specificsScore || 0)}%\n`;
      }
      
      text += "\n---\n\n";
    });
    
    return text;
  }
}

export default new ClaudeApiService();
