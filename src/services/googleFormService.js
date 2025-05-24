// src/services/googleFormService.js - UPDATED FOR CAREER PATH RECOMMENDATION SYSTEM v2.0

/**
 * Google Form Service for Career Path Recommendation System v2.0
 * Handles submission of comprehensive UserProfile data to Google Forms
 * Supports Sequential Dependency Engine: Career Path → Skill Gap → Learning Roadmap
 * Implements 4-Tier Scoring System with 16 Career Path Criteria
 */

class GoogleFormService {
  constructor() {
    // Google Form URLs - replace with your actual form URLs
    this.forms = {
      // Lead capture form (name + email only)
      leadCapture: 'https://docs.google.com/forms/d/e/1FAIpQLScgJFqxHTOlfB7qfG-5954B-qMsY3j6TOngfSm7ZaLToZ1_Yg/formResponse',
      
      // v2.0 Career assessment form (complete UserProfile schema)
      careerAssessmentV2: 'https://docs.google.com/forms/d/e/YOUR_V2_ASSESSMENT_FORM_ID/formResponse',
      
      // v2.0 Recommendation results form (system output data)
      recommendationResults: 'https://docs.google.com/forms/d/e/YOUR_V2_RESULTS_FORM_ID/formResponse'
    };

    // Field mappings for lead capture form
    this.leadCaptureFields = {
      fullName: 'entry.2120631500',
      email: 'entry.289230066'
    };

    // v2.0 Career Path Recommendation System field mappings
    // Update these with your actual Google Form entry IDs
    this.v2CareerAssessmentFields = {
      // Personal Information
      fullName: 'entry.XXXXXXXXX',
      email: 'entry.XXXXXXXXX',
      
      // 🎯 CAREER PATH RECOMMENDATION CRITERIA (16 total)
      // Tier 1: Core Drivers (45%)
      futureGoal: 'entry.XXXXXXXXX',                    // 15% - Primary destination
      techInterests: 'entry.XXXXXXXXX',                 // 12% - Specific path selection  
      leverageDomainExpertise: 'entry.XXXXXXXXX',       // 10% - Strategic approach ("yes"/"no"/"maybe")
      careerPathsInterest: 'entry.XXXXXXXXX',           // 8% - Direct preferences (Array)

      // Tier 2: Strong Motivators (25%)  
      industryPreference: 'entry.XXXXXXXXX',            // 10% - Market opportunities (Array)
      techMotivation: 'entry.XXXXXXXXX',                // 8% - Why change
      techPassion: 'entry.XXXXXXXXX',                   // 7% - Sustainability

      // Tier 3: Supporting Evidence (20%)
      transferableSkills: 'entry.XXXXXXXXX',            // 8% - Feasibility
      jobTechnologies: 'entry.XXXXXXXXX',               // 4% - Tech foundation
      jobResponsibilities: 'entry.XXXXXXXXX',           // 4% - Current trajectory
      jobProjects: 'entry.XXXXXXXXX',                   // 4% - Practical experience

      // Tier 4: Background Context (10%)
      continueCurrent: 'entry.XXXXXXXXX',               // 3% - Current role context (job title)
      studyField: 'entry.XXXXXXXXX',                    // 3% - Educational foundation
      certifications: 'entry.XXXXXXXXX',                // 2% - Formal qualifications
      internships: 'entry.XXXXXXXXX',                   // 1% - Early experience
      publications: 'entry.XXXXXXXXX',                  // 1% - Thought leadership

      // 📚 SKILL GAP ADDITIONAL CRITERIA
      certificationsDetail: 'entry.XXXXXXXXX',          // Detailed certification info
      experienceLevel: 'entry.XXXXXXXXX',               // "entry", "mid", "senior"
      yearsExperience: 'entry.XXXXXXXXX',               // "0-2", "3-5", "6-10", "10+"
      currentRole: 'entry.XXXXXXXXX',                   // Current job title
      toolsUsed: 'entry.XXXXXXXXX',                     // Tools and technologies used (Array)

      // ⚖️ LEARNING ROADMAP ADDITIONAL CRITERIA  
      timeCommitment: 'entry.XXXXXXXXX',                // "full-time", "part-time", "flexible"
      targetSalary: 'entry.XXXXXXXXX',                  // Salary expectations
      transitionTimeline: 'entry.XXXXXXXXX',            // Timeline for career transition
      learningComfort: 'entry.XXXXXXXXX',               // Comfort with learning new technologies
      transitionReason: 'entry.XXXXXXXXX',              // Why making the transition
      guidanceNeeded: 'entry.XXXXXXXXX'                 // Type of guidance needed (Array)
    };

    // v2.0 System Results field mappings (for storing AI-generated recommendations)
    this.v2ResultsFields = {
      // User identification
      userEmail: 'entry.XXXXXXXXX',
      submissionId: 'entry.XXXXXXXXX',
      
      // System metrics
      systemVersion: 'entry.XXXXXXXXX',
      overallConfidence: 'entry.XXXXXXXXX',
      dataCompleteness: 'entry.XXXXXXXXX',
      careerPathCriteriaComplete: 'entry.XXXXXXXXX',
      processingTime: 'entry.XXXXXXXXX',
      
      // Career Path Recommendation
      careerPathTitle: 'entry.XXXXXXXXX',
      careerPathDescription: 'entry.XXXXXXXXX',
      careerPathConfidence: 'entry.XXXXXXXXX',
      recommendedPaths: 'entry.XXXXXXXXX',              // Array
      industryFocus: 'entry.XXXXXXXXX',                 // Array
      marketDemand: 'entry.XXXXXXXXX',
      
      // 4-Tier Scores
      coreDrivingScore: 'entry.XXXXXXXXX',
      strongMotivatorsScore: 'entry.XXXXXXXXX',
      supportingEvidenceScore: 'entry.XXXXXXXXX',
      backgroundContextScore: 'entry.XXXXXXXXX',
      
      // Skill Gap Analysis
      currentSkillLevel: 'entry.XXXXXXXXX',
      requiredSkills: 'entry.XXXXXXXXX',                // Array
      skillGapsCount: 'entry.XXXXXXXXX',
      strengthsToLeverage: 'entry.XXXXXXXXX',           // Array
      recommendedCertifications: 'entry.XXXXXXXXX',     // Array
      
      // Learning Roadmap
      totalTimelineEstimate: 'entry.XXXXXXXXX',
      budgetEstimate: 'entry.XXXXXXXXX',
      learningPhasesCount: 'entry.XXXXXXXXX',
      flexibilityOptions: 'entry.XXXXXXXXX',            // Array
      supportRecommendations: 'entry.XXXXXXXXX'         // Array
    };

    // v2.0 System configuration
    this.v2Config = {
      systemVersion: '2.0',
      engineType: 'Sequential Dependency Recommendation Engine',
      totalCareerPathCriteria: 16,
      totalAllCriteria: 22,
      minimumViableCriteria: 4,
      fallbackThreshold: 8
    };
  }

  /**
   * Submit basic lead capture data (name + email)
   * @param {Object} userData - Object containing user's full name and email
   * @returns {Promise<Object>} - Promise resolving to submission status
   */
  async submitLeadCapture(userData) {
    try {
      const formData = new FormData();
      
      // Validate required fields
      if (!userData.fullName || !userData.email) {
        throw new Error('Full name and email are required for lead capture');
      }
      
      // Add form fields
      formData.append(this.leadCaptureFields.fullName, userData.fullName);
      formData.append(this.leadCaptureFields.email, userData.email);
      
      const result = await this._submitForm(this.forms.leadCapture, formData);
      
      return {
        ...result,
        type: 'lead-capture',
        systemVersion: this.v2Config.systemVersion,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error submitting lead capture:', error);
      return { success: false, error: error.message, type: 'lead-capture' };
    }
  }

  /**
   * Submit v2.0 career assessment data (complete UserProfile schema)
   * @param {Object} userProfile - Complete UserProfile object conforming to v2.0 schema
   * @returns {Promise<Object>} - Promise resolving to submission status with v2.0 validation
   */
  async submitCareerAssessmentV2(userProfile) {
    try {
      // Validate UserProfile against v2.0 schema
      const validation = this._validateUserProfileV2(userProfile);
      
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Invalid user profile data for v2.0 system',
          validation: validation,
          type: 'career-assessment-v2',
          systemVersion: this.v2Config.systemVersion
        };
      }

      const formData = new FormData();
      
      // Map UserProfile to v2.0 Google Form fields
      this._mapUserProfileV2ToFormData(userProfile, formData);
      
      const result = await this._submitForm(this.forms.careerAssessmentV2, formData);
      
      return {
        ...result,
        type: 'career-assessment-v2',
        systemVersion: this.v2Config.systemVersion,
        validation: validation,
        timestamp: new Date().toISOString(),
        dataCompleteness: validation.dataCompleteness,
        careerPathCriteriaComplete: validation.careerPathCriteriaComplete
      };
    } catch (error) {
      console.error('Error submitting v2.0 career assessment:', error);
      return { 
        success: false, 
        error: error.message, 
        type: 'career-assessment-v2',
        systemVersion: this.v2Config.systemVersion
      };
    }
  }

  /**
   * Submit v2.0 recommendation results (AI-generated system output)
   * @param {Object} recommendationResponse - Complete RecommendationResponse from v2.0 system
   * @returns {Promise<Object>} - Promise resolving to submission status
   */
  async submitRecommendationResultsV2(recommendationResponse) {
    try {
      if (!recommendationResponse || !recommendationResponse.careerPath) {
        throw new Error('Invalid recommendation response - missing career path data');
      }

      const formData = new FormData();
      
      // Map RecommendationResponse to Google Form fields
      this._mapRecommendationResultsV2ToFormData(recommendationResponse, formData);
      
      const result = await this._submitForm(this.forms.recommendationResults, formData);
      
      return {
        ...result,
        type: 'recommendation-results-v2',
        systemVersion: this.v2Config.systemVersion,
        timestamp: new Date().toISOString(),
        overallConfidence: recommendationResponse.overallConfidence,
        processingTime: recommendationResponse.processingTime
      };
    } catch (error) {
      console.error('Error submitting v2.0 recommendation results:', error);
      return { 
        success: false, 
        error: error.message, 
        type: 'recommendation-results-v2',
        systemVersion: this.v2Config.systemVersion
      };
    }
  }

  /**
   * Submit complete v2.0 workflow (assessment + results)
   * @param {Object} userProfile - Complete UserProfile object
   * @param {Object} recommendationResponse - AI-generated recommendation results
   * @returns {Promise<Object>} - Combined submission results
   */
  async submitCompleteV2Workflow(userProfile, recommendationResponse) {
    try {
      // Submit to both forms in parallel
      const [assessmentResult, resultsResult] = await Promise.allSettled([
        this.submitCareerAssessmentV2(userProfile),
        this.submitRecommendationResultsV2(recommendationResponse)
      ]);

      return {
        careerAssessment: assessmentResult.status === 'fulfilled' ? assessmentResult.value : { success: false, error: assessmentResult.reason },
        recommendationResults: resultsResult.status === 'fulfilled' ? resultsResult.value : { success: false, error: resultsResult.reason },
        systemVersion: this.v2Config.systemVersion,
        engineType: this.v2Config.engineType,
        timestamp: new Date().toISOString(),
        overallSuccess: assessmentResult.status === 'fulfilled' && resultsResult.status === 'fulfilled',
        workflowType: 'complete-v2-sequential-dependency'
      };
    } catch (error) {
      console.error('Error submitting complete v2.0 workflow:', error);
      return { 
        success: false, 
        error: error.message, 
        type: 'complete-v2-workflow',
        systemVersion: this.v2Config.systemVersion
      };
    }
  }

  /**
   * Test Google Form connectivity for v2.0 system
   * @param {string} formType - 'lead-capture', 'career-assessment-v2', or 'recommendation-results-v2'
   * @returns {Promise<Object>} - Connection test results
   */
  async testConnectionV2(formType = 'career-assessment-v2') {
    try {
      let testData, result;

      switch (formType) {
        case 'lead-capture':
          testData = { fullName: 'Test User V2', email: 'test-v2@example.com' };
          result = await this.submitLeadCapture(testData);
          break;
        
        case 'career-assessment-v2':
          testData = this._createTestUserProfileV2();
          result = await this.submitCareerAssessmentV2(testData);
          break;
        
        case 'recommendation-results-v2':
          testData = this._createTestRecommendationResponseV2();
          result = await this.submitRecommendationResultsV2(testData);
          break;
        
        default:
          throw new Error(`Unknown form type: ${formType}`);
      }

      return {
        connectionTest: true,
        formType: formType,
        systemVersion: this.v2Config.systemVersion,
        success: result.success,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        connectionTest: true,
        formType: formType,
        systemVersion: this.v2Config.systemVersion,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // ============================================================================
  // v2.0 PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Submit form data to Google Form
   * @private
   */
  async _submitForm(formUrl, formData) {
    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      // Since we're using no-cors, we assume success if no error is thrown
      return { 
        success: true, 
        message: 'Form submitted successfully to v2.0 system',
        url: formUrl,
        systemVersion: this.v2Config.systemVersion
      };
    } catch (error) {
      throw new Error(`v2.0 Form submission failed: ${error.message}`);
    }
  }

  /**
   * Map v2.0 UserProfile object to Google Form FormData
   * @private
   */
  _mapUserProfileV2ToFormData(userProfile, formData) {
    Object.entries(this.v2CareerAssessmentFields).forEach(([key, entryId]) => {
      const value = userProfile[key];
      
      if (value !== undefined && value !== null) {
        // Handle arrays (careerPathsInterest, industryPreference, toolsUsed, guidanceNeeded)
        if (Array.isArray(value)) {
          formData.append(entryId, value.join(', '));
        } else {
          formData.append(entryId, String(value));
        }
      }
    });

    // Add v2.0 system metadata
    formData.append('systemVersion', this.v2Config.systemVersion);
    formData.append('engineType', this.v2Config.engineType);
    formData.append('submissionTimestamp', new Date().toISOString());
  }

  /**
   * Map v2.0 RecommendationResponse to Google Form FormData
   * @private
   */
  _mapRecommendationResultsV2ToFormData(recommendationResponse, formData) {
    // User identification (if available)
    if (recommendationResponse.userEmail) {
      formData.append(this.v2ResultsFields.userEmail, recommendationResponse.userEmail);
    }
    
    // Generate submission ID
    const submissionId = `v2_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    formData.append(this.v2ResultsFields.submissionId, submissionId);

    // System metrics
    formData.append(this.v2ResultsFields.systemVersion, this.v2Config.systemVersion);
    formData.append(this.v2ResultsFields.overallConfidence, String(recommendationResponse.overallConfidence || 0));
    formData.append(this.v2ResultsFields.dataCompleteness, String(recommendationResponse.dataCompleteness || 0));
    formData.append(this.v2ResultsFields.careerPathCriteriaComplete, String(recommendationResponse.careerPathCriteriaComplete || 0));
    formData.append(this.v2ResultsFields.processingTime, String(recommendationResponse.processingTime || 0));

    // Career Path Recommendation
    const careerPath = recommendationResponse.careerPath || {};
    if (this.v2ResultsFields.careerPathTitle) formData.append(this.v2ResultsFields.careerPathTitle, careerPath.title || '');
    if (this.v2ResultsFields.careerPathDescription) formData.append(this.v2ResultsFields.careerPathDescription, careerPath.description || '');
    if (this.v2ResultsFields.careerPathConfidence) formData.append(this.v2ResultsFields.careerPathConfidence, String(careerPath.confidenceScore || 0));
    
    if (careerPath.recommendedPaths && Array.isArray(careerPath.recommendedPaths)) {
      formData.append(this.v2ResultsFields.recommendedPaths, careerPath.recommendedPaths.join(', '));
    }
    
    if (careerPath.industryFocus && Array.isArray(careerPath.industryFocus)) {
      formData.append(this.v2ResultsFields.industryFocus, careerPath.industryFocus.join(', '));
    }
    
    if (this.v2ResultsFields.marketDemand) formData.append(this.v2ResultsFields.marketDemand, careerPath.marketDemand || '');

    // 4-Tier Scores
    const tierScores = careerPath.metadata?.tierScores || {};
    if (this.v2ResultsFields.coreDrivingScore) formData.append(this.v2ResultsFields.coreDrivingScore, String(Math.round((tierScores.coreDriving || 0) * 100)));
    if (this.v2ResultsFields.strongMotivatorsScore) formData.append(this.v2ResultsFields.strongMotivatorsScore, String(Math.round((tierScores.strongMotivators || 0) * 100)));
    if (this.v2ResultsFields.supportingEvidenceScore) formData.append(this.v2ResultsFields.supportingEvidenceScore, String(Math.round((tierScores.supportingEvidence || 0) * 100)));
    if (this.v2ResultsFields.backgroundContextScore) formData.append(this.v2ResultsFields.backgroundContextScore, String(Math.round((tierScores.backgroundContext || 0) * 100)));

    // Skill Gap Analysis
    const skillGap = recommendationResponse.skillGap || {};
    if (this.v2ResultsFields.currentSkillLevel) formData.append(this.v2ResultsFields.currentSkillLevel, skillGap.currentSkillLevel || '');
    
    if (skillGap.requiredSkills && Array.isArray(skillGap.requiredSkills)) {
      formData.append(this.v2ResultsFields.requiredSkills, skillGap.requiredSkills.join(', '));
    }
    
    if (this.v2ResultsFields.skillGapsCount) formData.append(this.v2ResultsFields.skillGapsCount, String(skillGap.skillGaps?.length || 0));
    
    if (skillGap.strengthsToLeverage && Array.isArray(skillGap.strengthsToLeverage)) {
      formData.append(this.v2ResultsFields.strengthsToLeverage, skillGap.strengthsToLeverage.join(', '));
    }
    
    if (skillGap.recommendedCertifications && Array.isArray(skillGap.recommendedCertifications)) {
      formData.append(this.v2ResultsFields.recommendedCertifications, skillGap.recommendedCertifications.join(', '));
    }

    // Learning Roadmap
    const learningRoadmap = recommendationResponse.learningRoadmap || {};
    if (this.v2ResultsFields.totalTimelineEstimate) formData.append(this.v2ResultsFields.totalTimelineEstimate, learningRoadmap.totalTimelineEstimate || '');
    if (this.v2ResultsFields.budgetEstimate) formData.append(this.v2ResultsFields.budgetEstimate, learningRoadmap.budgetEstimate || '');
    if (this.v2ResultsFields.learningPhasesCount) formData.append(this.v2ResultsFields.learningPhasesCount, String(learningRoadmap.phases?.length || 0));
    
    if (learningRoadmap.flexibilityOptions && Array.isArray(learningRoadmap.flexibilityOptions)) {
      formData.append(this.v2ResultsFields.flexibilityOptions, learningRoadmap.flexibilityOptions.join(', '));
    }
    
    if (learningRoadmap.supportRecommendations && Array.isArray(learningRoadmap.supportRecommendations)) {
      formData.append(this.v2ResultsFields.supportRecommendations, learningRoadmap.supportRecommendations.join(', '));
    }

    // Add processing metadata
    formData.append('submissionTimestamp', new Date().toISOString());
    formData.append('engineType', this.v2Config.engineType);
  }

  /**
   * Validate UserProfile against v2.0 schema requirements
   * @private
   */
  _validateUserProfileV2(userProfile) {
    // 16 Career Path Recommendation criteria
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

    // Additional criteria for Skill Gap and Learning Roadmap
    const additionalCriteria = [
      'certificationsDetail', 'experienceLevel', 'yearsExperience', 'currentRole', 'toolsUsed',
      'timeCommitment', 'targetSalary', 'transitionTimeline', 'learningComfort', 'transitionReason', 'guidanceNeeded'
    ];

    // All criteria combined
    const allCriteria = [...careerPathCriteria, ...additionalCriteria];

    // Validate career path criteria
    const validCareerPathCriteria = careerPathCriteria.filter(key => this._isV2Valid(userProfile[key]));
    const careerPathCriteriaComplete = validCareerPathCriteria.length;

    // Validate all criteria
    const validAllCriteria = allCriteria.filter(key => this._isV2Valid(userProfile[key]));
    const totalValid = validAllCriteria.length;

    // Required fields
    const requiredFields = ['fullName', 'email'];
    const missingRequired = requiredFields.filter(field => !userProfile[field]);

    // v2.0 validation rules
    const requiresFallback = careerPathCriteriaComplete < this.v2Config.fallbackThreshold; // Less than 8 of 16 criteria
    const isValid = missingRequired.length === 0 && careerPathCriteriaComplete >= this.v2Config.minimumViableCriteria; // At least 4 criteria

    // Tier analysis
    const tierAnalysis = this._analyzeTierCompleteness(userProfile);

    return {
      isValid,
      careerPathCriteriaComplete,
      totalCriteriaComplete: totalValid,
      validCareerPathCriteria,
      validAllCriteria,
      missingRequired,
      requiresFallback,
      dataCompleteness: Math.round((totalValid / allCriteria.length) * 100),
      careerPathCompleteness: Math.round((careerPathCriteriaComplete / careerPathCriteria.length) * 100),
      tierAnalysis,
      systemVersion: this.v2Config.systemVersion,
      minimumViableCriteria: this.v2Config.minimumViableCriteria,
      fallbackThreshold: this.v2Config.fallbackThreshold
    };
  }

  /**
   * Analyze completeness by tier for v2.0 4-tier system
   * @private
   */
  _analyzeTierCompleteness(userProfile) {
    const tiers = {
      tier1CoreDrivers: ['futureGoal', 'techInterests', 'leverageDomainExpertise', 'careerPathsInterest'],
      tier2StrongMotivators: ['industryPreference', 'techMotivation', 'techPassion'],
      tier3SupportingEvidence: ['transferableSkills', 'jobTechnologies', 'jobResponsibilities', 'jobProjects'],
      tier4BackgroundContext: ['continueCurrent', 'studyField', 'certifications', 'internships', 'publications']
    };

    const tierAnalysis = {};

    Object.entries(tiers).forEach(([tierName, fields]) => {
      const validFields = fields.filter(field => this._isV2Valid(userProfile[field]));
      tierAnalysis[tierName] = {
        validCount: validFields.length,
        totalCount: fields.length,
        completeness: Math.round((validFields.length / fields.length) * 100),
        validFields,
        missingFields: fields.filter(field => !this._isV2Valid(userProfile[field]))
      };
    });

    return tierAnalysis;
  }

  /**
   * Enhanced validation function for v2.0 system
   * @private
   */
  _isV2Valid(value) {
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

  /**
   * Create test UserProfile for v2.0 connection testing
   * @private
   */
  _createTestUserProfileV2() {
    return {
      // Personal Information
      fullName: 'Test User V2',
      email: 'test-v2@example.com',
      
      // Tier 1: Core Drivers (45%)
      futureGoal: 'Become a senior AI engineer leading machine learning projects',
      techInterests: 'machine learning, data analysis, AI research',
      leverageDomainExpertise: 'yes',
      careerPathsInterest: ['Machine Learning Engineer', 'Data Scientist', 'AI Researcher'],

      // Tier 2: Strong Motivators (25%)
      industryPreference: ['Technology', 'Healthcare', 'Finance'],
      techMotivation: 'passion for solving complex problems with data',
      techPassion: 'deeply interested in AI and its applications',

      // Tier 3: Supporting Evidence (20%)
      transferableSkills: 'analytical thinking, problem-solving, communication',
      jobTechnologies: 'Python, SQL, Excel, Tableau',
      jobResponsibilities: 'data analysis, reporting, stakeholder communication',
      jobProjects: 'predictive modeling project, dashboard development',

      // Tier 4: Background Context (10%)
      continueCurrent: 'Data Analyst',
      studyField: 'Statistics',
      certifications: 'Google Data Analytics Certificate',
      internships: 'Summer internship at tech startup',
      publications: 'none',

      // Skill Gap Additional Criteria
      certificationsDetail: 'Google Data Analytics Certificate (completed 2024), planning AWS ML certification',
      experienceLevel: 'mid',
      yearsExperience: '3',
      currentRole: 'Data Analyst',
      toolsUsed: ['Python', 'SQL', 'Tableau', 'Excel', 'Git'],

      // Learning Roadmap Additional Criteria
      timeCommitment: 'part-time',
      targetSalary: '$95k',
      transitionTimeline: '12-18 months',
      learningComfort: 'comfortable with self-directed learning',
      transitionReason: 'career growth and passion for AI',
      guidanceNeeded: ['mentorship', 'project portfolio guidance', 'interview preparation']
    };
  }

  /**
   * Create test RecommendationResponse for v2.0 connection testing
   * @private
   */
  _createTestRecommendationResponseV2() {
    return {
      careerPath: {
        id: 'cp_test_v2',
        type: 'career-path',
        title: 'Machine Learning Engineer with Domain Expertise',
        description: 'Leverage your analytical background to build and deploy ML models',
        reasoning: 'Strong alignment between your future goals and tech interests',
        confidence: 'high',
        confidenceScore: 89,
        recommendedPaths: ['Machine Learning Engineer', 'Senior Data Scientist', 'AI Product Manager'],
        industryFocus: ['Technology', 'Healthcare'],
        marketDemand: 'high',
        metadata: {
          tierScores: {
            coreDriving: 0.42,
            strongMotivators: 0.23,
            supportingEvidence: 0.18,
            backgroundContext: 0.06
          },
          totalWeightedScore: 0.89,
          fallbackApplied: false
        }
      },
      skillGap: {
        id: 'sg_test_v2',
        type: 'skill-gap',
        careerPathId: 'cp_test_v2',
        currentSkillLevel: 'intermediate-data-analysis',
        requiredSkills: ['Machine Learning', 'Deep Learning', 'MLOps', 'Cloud Platforms'],
        skillGaps: [
          {
            skill: 'Machine Learning Algorithms',
            currentLevel: 'basic',
            requiredLevel: 'advanced',
            priority: 'high',
            estimatedLearningTime: '4-6 months'
          }
        ],
        strengthsToLeverage: ['SQL expertise', 'Data analysis foundation', 'Python basics'],
        recommendedCertifications: ['AWS Machine Learning Specialty', 'Google Cloud ML Engineer'],
        confidence: 'high',
        confidenceScore: 85
      },
      learningRoadmap: {
        id: 'lr_test_v2',
        type: 'learning-roadmap',
        careerPathId: 'cp_test_v2',
        skillGapId: 'sg_test_v2',
        phases: [
          {
            phase: 1,
            title: 'Foundation Building',
            duration: '3-4 months',
            skills: ['Advanced Python', 'Statistics for ML', 'Basic ML Algorithms'],
            resources: ['Coursera ML Course', 'Python for Data Science books'],
            milestones: ['Complete 3 ML projects', 'Build portfolio repository']
          }
        ],
        totalTimelineEstimate: '12-15 months (part-time)',
        budgetEstimate: '$2,000-3,500',
        flexibilityOptions: ['Self-paced online courses', 'Evening bootcamp'],
        supportRecommendations: ['Find ML mentor', 'Join ML communities'],
        confidence: 'high',
        confidenceScore: 82
      },
      overallConfidence: 85,
      dataCompleteness: 87,
      careerPathCriteriaComplete: 14,
      processingTime: 1250,
      processedAt: new Date().toISOString()
    };
  }

  // ============================================================================
  // BACKWARD COMPATIBILITY METHODS
  // ============================================================================

  /**
   * Legacy method - submit both lead capture and career assessment
   * @deprecated Use submitCompleteV2Workflow instead
   */
  async submitComplete(userData, userProfile) {
    console.log("⚠️ Using legacy submitComplete method - consider upgrading to v2.0 workflow");
    
    try {
      // Convert legacy userProfile to v2.0 format if needed
      const v2Profile = this._convertLegacyToV2Profile(userProfile);
      
      const [leadResult, assessmentResult] = await Promise.allSettled([
        this.submitLeadCapture(userData),
        this.submitCareerAssessmentV2(v2Profile)
      ]);

      return {
        leadCapture: leadResult.status === 'fulfilled' ? leadResult.value : { success: false, error: leadResult.reason },
        careerAssessment: assessmentResult.status === 'fulfilled' ? assessmentResult.value : { success: false, error: assessmentResult.reason },
        systemVersion: this.v2Config.systemVersion,
        legacy: true,
        timestamp: new Date().toISOString(),
        overallSuccess: leadResult.status === 'fulfilled' && assessmentResult.status === 'fulfilled'
      };
    } catch (error) {
      console.error('Error in legacy submitComplete:', error);
      return { 
        success: false, 
        error: error.message, 
        type: 'legacy-complete-submission',
        systemVersion: this.v2Config.systemVersion
      };
    }
  }

  /**
   * Convert legacy user profile to v2.0 format
   * @private
   */
  _convertLegacyToV2Profile(legacyProfile) {
    // Map common fields and add defaults for missing v2.0 fields
    return {
      ...legacyProfile,
      
      // Map legacy fields to v2.0 structure
      futureGoal: legacyProfile.futureGoal || '',
      leverageDomainExpertise: legacyProfile.leverageDomainExpertise || 'maybe',
      careerPathsInterest: legacyProfile.careerPathsInterest || [],
      industryPreference: legacyProfile.industryPreference || [],
      techMotivation: legacyProfile.techMotivation || '',
      techPassion: legacyProfile.techPassion || '',
      continueCurrent: legacyProfile.currentRole || legacyProfile.continueCurrent || '',
      certificationsDetail: legacyProfile.certifications || '',
      guidanceNeeded: legacyProfile.guidanceNeeded || [],
      
      // Add missing v2.0 fields with defaults
      internships: legacyProfile.internships || '',
      publications: legacyProfile.publications || '',
      transitionTimeline: legacyProfile.transitionTimeline || '',
      learningComfort: legacyProfile.learningComfort || '',
      transitionReason: legacyProfile.transitionReason || ''
    };
  }
}

// Legacy function for backward compatibility
const googleFormService = {
  submitToGoogleForm: async (userData) => {
    const service = new GoogleFormService();
    return await service.submitLeadCapture(userData);
  },
  
  // New v2.0 methods for easy access
  submitV2Assessment: async (userProfile) => {
    const service = new GoogleFormService();
    return await service.submitCareerAssessmentV2(userProfile);
  },
  
  submitV2Results: async (recommendationResponse) => {
    const service = new GoogleFormService();
    return await service.submitRecommendationResultsV2(recommendationResponse);
  },
  
  submitV2Complete: async (userProfile, recommendationResponse) => {
    const service = new GoogleFormService();
    return await service.submitCompleteV2Workflow(userProfile, recommendationResponse);
  }
};

// Export both the class and legacy object
export default googleFormService;
export { GoogleFormService };
