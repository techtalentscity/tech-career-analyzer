// src/services/storageService.js - UPDATED FOR CAREER PATH RECOMMENDATION SYSTEM v2.0

// v2.0 Storage keys - Sequential Dependency Engine support
const V2_SUBMISSIONS_KEY = 'career_path_v2_submissions';
const V2_CAREER_PATHS_KEY = 'career_path_v2_recommendations';
const V2_SKILL_GAPS_KEY = 'career_path_v2_skill_gaps';
const V2_LEARNING_ROADMAPS_KEY = 'career_path_v2_learning_roadmaps';
const V2_COMPLETE_RESPONSES_KEY = 'career_path_v2_complete_responses';
const V2_FORMATTED_ANALYSES_PREFIX = 'career_path_v2_formatted_analysis_';

// Legacy storage keys (maintained for backward compatibility)
const SUBMISSIONS_KEY = 'tech_talents_submissions';
const ANALYSES_KEY = 'tech_talents_analyses';
const RECOMMENDATIONS_KEY = 'tech_talents_recommendations';
const FORMATTED_ANALYSES_PREFIX = 'tech_talents_formatted_analysis_';

class StorageService {
  constructor() {
    // Initialize v2.0 storage if not already done
    this._initializeV2Storage();
    
    // Initialize legacy storage for backward compatibility
    this._initializeLegacyStorage();
  }

  // ============================================================================
  // v2.0 SEQUENTIAL DEPENDENCY ENGINE STORAGE METHODS
  // ============================================================================

  /**
   * Save v2.0 career test form submission with 16-criteria validation
   * @param {Object} formData - Form data conforming to v2.0 UserProfile schema
   * @returns {Object} - Saved submission with v2.0 validation metadata
   */
  saveCareerTestV2(formData) {
    try {
      const submissions = this._getItem(V2_SUBMISSIONS_KEY) || [];
      
      // Validate against v2.0 UserProfile schema (16 career path criteria)
      const validation = this._validateUserProfileV2(formData);
      
      const submission = {
        id: this._generateId('sub_v2'),
        submittedAt: new Date().toISOString(),
        systemVersion: '2.0',
        engineType: 'Sequential Dependency Recommendation Engine',
        profile: formData,
        validation: validation,
        dataCompleteness: validation.dataCompleteness,
        careerPathCriteriaComplete: validation.careerPathCriteriaComplete,
        tierAnalysis: validation.tierAnalysis
      };
      
      submissions.push(submission);
      this._setItem(V2_SUBMISSIONS_KEY, submissions);
      
      return submission;
    } catch (error) {
      console.error('Error saving v2.0 career test:', error);
      throw error;
    }
  }

  /**
   * Save complete v2.0 recommendation response (Career Path → Skill Gap → Learning Roadmap)
   * @param {Object} recommendationResponse - Complete RecommendationResponse object
   * @param {string} userId - User identifier
   * @returns {Object} - Saved recommendation with sequential dependency metadata
   */
  saveRecommendationResponseV2(recommendationResponse, userId) {
    try {
      const responses = this._getItem(V2_COMPLETE_RESPONSES_KEY) || [];
      
      const savedResponse = {
        id: this._generateId('resp_v2'),
        userId: userId,
        createdAt: new Date().toISOString(),
        systemVersion: '2.0',
        engineType: 'Sequential Dependency Recommendation Engine',
        response: recommendationResponse,
        submissionId: this._findLatestSubmissionIdV2(userId),
        
        // v2.0 specific metadata
        overallConfidence: recommendationResponse.overallConfidence,
        dataCompleteness: recommendationResponse.dataCompleteness,
        careerPathCriteriaComplete: recommendationResponse.careerPathCriteriaComplete,
        processingTime: recommendationResponse.processingTime,
        
        // Sequential dependency IDs for cross-referencing
        careerPathId: recommendationResponse.careerPath?.id,
        skillGapId: recommendationResponse.skillGap?.id,
        learningRoadmapId: recommendationResponse.learningRoadmap?.id
      };
      
      responses.push(savedResponse);
      this._setItem(V2_COMPLETE_RESPONSES_KEY, responses);
      
      // Also save individual components for granular access
      this._saveCareerPathRecommendation(recommendationResponse.careerPath, userId, savedResponse.id);
      this._saveSkillGapAnalysis(recommendationResponse.skillGap, userId, savedResponse.id);
      this._saveLearningRoadmap(recommendationResponse.learningRoadmap, userId, savedResponse.id);
      
      return savedResponse;
    } catch (error) {
      console.error('Error saving v2.0 recommendation response:', error);
      throw error;
    }
  }

  /**
   * Save individual career path recommendation
   * @param {Object} careerPath - CareerPathRecommendation object
   * @param {string} userId - User identifier
   * @param {string} responseId - Parent response ID
   * @returns {Object} - Saved career path recommendation
   */
  _saveCareerPathRecommendation(careerPath, userId, responseId) {
    try {
      const careerPaths = this._getItem(V2_CAREER_PATHS_KEY) || [];
      
      const savedCareerPath = {
        id: careerPath.id,
        userId: userId,
        responseId: responseId,
        createdAt: new Date().toISOString(),
        systemVersion: '2.0',
        data: careerPath
      };
      
      careerPaths.push(savedCareerPath);
      this._setItem(V2_CAREER_PATHS_KEY, careerPaths);
      
      return savedCareerPath;
    } catch (error) {
      console.error('Error saving career path recommendation:', error);
      throw error;
    }
  }

  /**
   * Save individual skill gap analysis
   * @param {Object} skillGap - SkillGapAnalysis object
   * @param {string} userId - User identifier
   * @param {string} responseId - Parent response ID
   * @returns {Object} - Saved skill gap analysis
   */
  _saveSkillGapAnalysis(skillGap, userId, responseId) {
    try {
      const skillGaps = this._getItem(V2_SKILL_GAPS_KEY) || [];
      
      const savedSkillGap = {
        id: skillGap.id,
        userId: userId,
        responseId: responseId,
        careerPathId: skillGap.careerPathId,
        createdAt: new Date().toISOString(),
        systemVersion: '2.0',
        data: skillGap
      };
      
      skillGaps.push(savedSkillGap);
      this._setItem(V2_SKILL_GAPS_KEY, skillGaps);
      
      return savedSkillGap;
    } catch (error) {
      console.error('Error saving skill gap analysis:', error);
      throw error;
    }
  }

  /**
   * Save individual learning roadmap
   * @param {Object} learningRoadmap - LearningRoadmap object
   * @param {string} userId - User identifier
   * @param {string} responseId - Parent response ID
   * @returns {Object} - Saved learning roadmap
   */
  _saveLearningRoadmap(learningRoadmap, userId, responseId) {
    try {
      const roadmaps = this._getItem(V2_LEARNING_ROADMAPS_KEY) || [];
      
      const savedRoadmap = {
        id: learningRoadmap.id,
        userId: userId,
        responseId: responseId,
        careerPathId: learningRoadmap.careerPathId,
        skillGapId: learningRoadmap.skillGapId,
        createdAt: new Date().toISOString(),
        systemVersion: '2.0',
        data: learningRoadmap
      };
      
      roadmaps.push(savedRoadmap);
      this._setItem(V2_LEARNING_ROADMAPS_KEY, roadmaps);
      
      return savedRoadmap;
    } catch (error) {
      console.error('Error saving learning roadmap:', error);
      throw error;
    }
  }

  // ============================================================================
  // v2.0 RETRIEVAL METHODS
  // ============================================================================

  /**
   * Get complete v2.0 recommendation responses by user ID
   * @param {string} userId - User identifier
   * @returns {Array} - Array of complete recommendation responses
   */
  getRecommendationResponsesV2ByUserId(userId) {
    try {
      const responses = this._getItem(V2_COMPLETE_RESPONSES_KEY) || [];
      return responses
        .filter(resp => resp.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error getting v2.0 recommendations by user ID:', error);
      return [];
    }
  }

  /**
   * Get latest v2.0 recommendation response
   * @param {string} userId - User identifier (optional)
   * @returns {Object|null} - Latest recommendation response or null
   */
  getLatestRecommendationV2(userId = null) {
    try {
      const responses = this._getItem(V2_COMPLETE_RESPONSES_KEY) || [];
      
      let filtered = responses;
      if (userId) {
        filtered = responses.filter(resp => resp.userId === userId);
      }
      
      if (filtered.length === 0) {
        return null;
      }
      
      return filtered
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    } catch (error) {
      console.error('Error getting latest v2.0 recommendation:', error);
      return null;
    }
  }

  /**
   * Get career path recommendations by user ID
   * @param {string} userId - User identifier
   * @returns {Array} - Array of career path recommendations
   */
  getCareerPathRecommendationsV2ByUserId(userId) {
    try {
      const careerPaths = this._getItem(V2_CAREER_PATHS_KEY) || [];
      return careerPaths
        .filter(cp => cp.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error getting career path recommendations by user ID:', error);
      return [];
    }
  }

  /**
   * Get skill gap analyses by user ID
   * @param {string} userId - User identifier
   * @returns {Array} - Array of skill gap analyses
   */
  getSkillGapAnalysesV2ByUserId(userId) {
    try {
      const skillGaps = this._getItem(V2_SKILL_GAPS_KEY) || [];
      return skillGaps
        .filter(sg => sg.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error getting skill gap analyses by user ID:', error);
      return [];
    }
  }

  /**
   * Get learning roadmaps by user ID
   * @param {string} userId - User identifier
   * @returns {Array} - Array of learning roadmaps
   */
  getLearningRoadmapsV2ByUserId(userId) {
    try {
      const roadmaps = this._getItem(V2_LEARNING_ROADMAPS_KEY) || [];
      return roadmaps
        .filter(lr => lr.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error getting learning roadmaps by user ID:', error);
      return [];
    }
  }

  /**
   * Get sequential dependency chain by career path ID
   * @param {string} careerPathId - Career path ID
   * @returns {Object} - Complete dependency chain (careerPath → skillGap → learningRoadmap)
   */
  getSequentialDependencyChain(careerPathId) {
    try {
      const careerPaths = this._getItem(V2_CAREER_PATHS_KEY) || [];
      const skillGaps = this._getItem(V2_SKILL_GAPS_KEY) || [];
      const roadmaps = this._getItem(V2_LEARNING_ROADMAPS_KEY) || [];
      
      const careerPath = careerPaths.find(cp => cp.id === careerPathId);
      if (!careerPath) {
        return null;
      }
      
      const skillGap = skillGaps.find(sg => sg.careerPathId === careerPathId);
      const learningRoadmap = roadmaps.find(lr => lr.careerPathId === careerPathId);
      
      return {
        careerPath: careerPath?.data || null,
        skillGap: skillGap?.data || null,
        learningRoadmap: learningRoadmap?.data || null,
        metadata: {
          careerPathCreated: careerPath?.createdAt,
          skillGapCreated: skillGap?.createdAt,
          roadmapCreated: learningRoadmap?.createdAt,
          sequentialDependencyComplete: !!(careerPath && skillGap && learningRoadmap)
        }
      };
    } catch (error) {
      console.error('Error getting sequential dependency chain:', error);
      return null;
    }
  }

  /**
   * Get v2.0 submissions by user ID with tier analysis
   * @param {string} userId - User identifier
   * @returns {Array} - Array of v2.0 user submissions
   */
  getSubmissionsV2ByUserId(userId) {
    try {
      const submissions = this._getItem(V2_SUBMISSIONS_KEY) || [];
      return submissions
        .filter(s => s.profile.email === userId || s.userId === userId)
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    } catch (error) {
      console.error('Error getting v2.0 submissions by user ID:', error);
      return [];
    }
  }

  // ============================================================================
  // v2.0 FORMATTED ANALYSIS METHODS
  // ============================================================================

  /**
   * Save v2.0 formatted analysis with enhanced metadata
   * @param {string} userId - User identifier
   * @param {string} formattedAnalysis - Formatted analysis content
   * @param {Object} metadata - v2.0 metadata (confidence, tier scores, etc.)
   * @returns {boolean} - Success status
   */
  saveFormattedAnalysisV2(userId, formattedAnalysis, metadata = {}) {
    try {
      if (!userId || !formattedAnalysis) {
        return false;
      }
      
      const storageKey = `${V2_FORMATTED_ANALYSES_PREFIX}${userId}`;
      
      const storageObject = {
        timestamp: new Date().getTime(),
        content: formattedAnalysis,
        metadata: {
          ...metadata,
          systemVersion: '2.0',
          engineType: 'Sequential Dependency Recommendation Engine',
          dataCompleteness: metadata.dataCompleteness || 0,
          overallConfidence: metadata.overallConfidence || 0,
          careerPathCriteriaComplete: metadata.careerPathCriteriaComplete || 0,
          tierScores: metadata.tierScores || {},
          processingTime: metadata.processingTime || 0
        }
      };
      
      this._setItem(storageKey, storageObject);
      return true;
    } catch (error) {
      console.error('Error saving v2.0 formatted analysis:', error);
      return false;
    }
  }

  /**
   * Get v2.0 formatted analysis with metadata
   * @param {string} userId - User identifier
   * @returns {Object|null} - v2.0 formatted analysis object or null
   */
  getFormattedAnalysisV2(userId) {
    try {
      if (!userId) {
        return null;
      }
      
      const storageKey = `${V2_FORMATTED_ANALYSES_PREFIX}${userId}`;
      const storedData = this._getItem(storageKey);
      
      if (!storedData) {
        return null;
      }
      
      // Check if data is fresh (24 hours)
      const currentTime = new Date().getTime();
      const dataAge = currentTime - storedData.timestamp;
      const maxAge = 24 * 60 * 60 * 1000;
      
      if (dataAge > maxAge) {
        this._removeItem(storageKey);
        return null;
      }
      
      return storedData;
    } catch (error) {
      console.error('Error retrieving v2.0 formatted analysis:', error);
      return null;
    }
  }

  /**
   * Clear v2.0 formatted analysis cache
   * @param {string} userId - User identifier
   * @returns {boolean} - Success status
   */
  clearFormattedAnalysisV2(userId) {
    try {
      if (!userId) {
        return false;
      }
      
      const storageKey = `${V2_FORMATTED_ANALYSES_PREFIX}${userId}`;
      this._removeItem(storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing v2.0 formatted analysis:', error);
      return false;
    }
  }

  // ============================================================================
  // v2.0 ANALYTICS AND INSIGHTS
  // ============================================================================

  /**
   * Get v2.0 analytics/stats about stored data
   * @returns {Object} - v2.0 analytics object
   */
  getStorageAnalyticsV2() {
    try {
      const submissions = this._getItem(V2_SUBMISSIONS_KEY) || [];
      const responses = this._getItem(V2_COMPLETE_RESPONSES_KEY) || [];
      const careerPaths = this._getItem(V2_CAREER_PATHS_KEY) || [];
      const skillGaps = this._getItem(V2_SKILL_GAPS_KEY) || [];
      const roadmaps = this._getItem(V2_LEARNING_ROADMAPS_KEY) || [];
      
      return {
        systemVersion: '2.0',
        engineType: 'Sequential Dependency Recommendation Engine',
        totalSubmissions: submissions.length,
        totalCompleteResponses: responses.length,
        totalCareerPaths: careerPaths.length,
        totalSkillGaps: skillGaps.length,
        totalLearningRoadmaps: roadmaps.length,
        
        // v2.0 specific metrics
        averageDataCompleteness: this._calculateAverageCompletenessV2(submissions),
        averageCareerPathCriteria: this._calculateAverageCareerPathCriteria(submissions),
        averageOverallConfidence: this._calculateAverageConfidence(responses),
        averageProcessingTime: this._calculateAverageProcessingTime(responses),
        
        // Sequential dependency metrics
        sequentialDependencyCompleteness: this._calculateSequentialDependencyStats(responses),
        
        // 4-Tier scoring analytics
        tierPerformanceAnalytics: this._calculateTierPerformanceAnalytics(submissions),
        
        // AI content metrics
        aiContentMetrics: this._calculateAIContentMetrics(responses),
        
        lastActivityV2: this._getLastActivityDateV2(submissions, responses)
      };
    } catch (error) {
      console.error('Error getting v2.0 storage analytics:', error);
      return { systemVersion: '2.0', error: error.message };
    }
  }

  /**
   * Get performance insights for v2.0 system
   * @returns {Object} - Performance insights
   */
  getV2PerformanceInsights() {
    try {
      const analytics = this.getStorageAnalyticsV2();
      
      return {
        systemHealth: {
          dataQuality: analytics.averageDataCompleteness > 70 ? 'Good' : analytics.averageDataCompleteness > 50 ? 'Fair' : 'Poor',
          confidenceLevel: analytics.averageOverallConfidence > 75 ? 'High' : analytics.averageOverallConfidence > 50 ? 'Medium' : 'Low',
          processingEfficiency: analytics.averageProcessingTime < 2000 ? 'Excellent' : analytics.averageProcessingTime < 5000 ? 'Good' : 'Needs Improvement'
        },
        recommendations: {
          improveDataCollection: analytics.averageCareerPathCriteria < 12 ? 'Focus on collecting more career path criteria' : null,
          optimizeProcessing: analytics.averageProcessingTime > 3000 ? 'Consider optimizing AI processing pipeline' : null,
          enhanceConfidence: analytics.averageOverallConfidence < 70 ? 'Review confidence scoring algorithms' : null
        },
        insights: analytics
      };
    } catch (error) {
      console.error('Error getting v2.0 performance insights:', error);
      return { error: error.message };
    }
  }

  // ============================================================================
  // v2.0 VALIDATION AND UTILITY METHODS
  // ============================================================================

  /**
   * Validate UserProfile against v2.0 schema (16 career path criteria + additional)
   * @private
   */
  _validateUserProfileV2(profile) {
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
    
    // Validate each tier
    const tierAnalysis = {
      tier1CoreDrivers: this._validateTier(profile, tier1CoreDrivers),
      tier2StrongMotivators: this._validateTier(profile, tier2StrongMotivators),
      tier3SupportingEvidence: this._validateTier(profile, tier3SupportingEvidence),
      tier4BackgroundContext: this._validateTier(profile, tier4BackgroundContext)
    };
    
    // Overall validation metrics
    const validCareerPathCriteria = careerPathCriteria.filter(key => this._isV2Valid(profile[key]));
    const validAllCriteria = allCriteria.filter(key => this._isV2Valid(profile[key]));
    
    const careerPathCriteriaComplete = validCareerPathCriteria.length;
    const totalCriteriaComplete = validAllCriteria.length;
    
    // v2.0 validation rules
    const requiresFallback = careerPathCriteriaComplete < 8; // Less than 50% of 16 criteria
    const isValid = careerPathCriteriaComplete >= 4; // Minimum 25% of criteria
    
    return {
      isValid,
      careerPathCriteriaComplete,
      totalCriteriaComplete,
      validCareerPathCriteria,
      validAllCriteria,
      requiresFallback,
      dataCompleteness: Math.round((totalCriteriaComplete / allCriteria.length) * 100),
      careerPathCompleteness: Math.round((careerPathCriteriaComplete / careerPathCriteria.length) * 100),
      tierAnalysis,
      systemVersion: '2.0'
    };
  }

  /**
   * Validate specific tier
   * @private
   */
  _validateTier(profile, tierFields) {
    const validFields = tierFields.filter(field => this._isV2Valid(profile[field]));
    return {
      validCount: validFields.length,
      totalCount: tierFields.length,
      completeness: Math.round((validFields.length / tierFields.length) * 100),
      validFields,
      missingFields: tierFields.filter(field => !this._isV2Valid(profile[field]))
    };
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

  // ============================================================================
  // v2.0 ANALYTICS CALCULATION METHODS
  // ============================================================================

  /**
   * Calculate average data completeness for v2.0 submissions
   * @private
   */
  _calculateAverageCompletenessV2(submissions) {
    if (submissions.length === 0) return 0;
    
    const total = submissions.reduce((sum, sub) => sum + (sub.dataCompleteness || 0), 0);
    return Math.round(total / submissions.length);
  }

  /**
   * Calculate average career path criteria completion
   * @private
   */
  _calculateAverageCareerPathCriteria(submissions) {
    if (submissions.length === 0) return 0;
    
    const total = submissions.reduce((sum, sub) => sum + (sub.careerPathCriteriaComplete || 0), 0);
    return Math.round((total / submissions.length) * 10) / 10; // One decimal place
  }

  /**
   * Calculate average overall confidence across responses
   * @private
   */
  _calculateAverageConfidence(responses) {
    if (responses.length === 0) return 0;
    
    const total = responses.reduce((sum, resp) => sum + (resp.overallConfidence || 0), 0);
    return Math.round(total / responses.length);
  }

  /**
   * Calculate average processing time
   * @private
   */
  _calculateAverageProcessingTime(responses) {
    if (responses.length === 0) return 0;
    
    const total = responses.reduce((sum, resp) => sum + (resp.processingTime || 0), 0);
    return Math.round(total / responses.length);
  }

  /**
   * Calculate sequential dependency completion statistics
   * @private
   */
  _calculateSequentialDependencyStats(responses) {
    if (responses.length === 0) return { completeness: 0, stages: {} };
    
    const stats = {
      hasCareerPath: 0,
      hasSkillGap: 0,
      hasLearningRoadmap: 0,
      allThreeComplete: 0
    };
    
    responses.forEach(resp => {
      if (resp.careerPathId) stats.hasCareerPath++;
      if (resp.skillGapId) stats.hasSkillGap++;
      if (resp.learningRoadmapId) stats.hasLearningRoadmap++;
      if (resp.careerPathId && resp.skillGapId && resp.learningRoadmapId) stats.allThreeComplete++;
    });
    
    return {
      completeness: Math.round((stats.allThreeComplete / responses.length) * 100),
      stages: {
        careerPath: Math.round((stats.hasCareerPath / responses.length) * 100),
        skillGap: Math.round((stats.hasSkillGap / responses.length) * 100),
        learningRoadmap: Math.round((stats.hasLearningRoadmap / responses.length) * 100)
      }
    };
  }

  /**
   * Calculate 4-tier performance analytics
   * @private
   */
  _calculateTierPerformanceAnalytics(submissions) {
    if (submissions.length === 0) return {};
    
    const tierStats = {
      tier1CoreDrivers: { total: 0, count: 0 },
      tier2StrongMotivators: { total: 0, count: 0 },
      tier3SupportingEvidence: { total: 0, count: 0 },
      tier4BackgroundContext: { total: 0, count: 0 }
    };
    
    submissions.forEach(sub => {
      if (sub.tierAnalysis) {
        Object.keys(tierStats).forEach(tier => {
          if (sub.tierAnalysis[tier]) {
            tierStats[tier].total += sub.tierAnalysis[tier].completeness || 0;
            tierStats[tier].count++;
          }
        });
      }
    });
    
    const averages = {};
    Object.keys(tierStats).forEach(tier => {
      averages[tier] = tierStats[tier].count > 0 ? 
        Math.round(tierStats[tier].total / tierStats[tier].count) : 0;
    });
    
    return averages;
  }

  /**
   * Calculate AI content generation metrics
   * @private
   */
  _calculateAIContentMetrics(responses) {
    if (responses.length === 0) return {};
    
    const metrics = {
      aiGeneratedTitles: 0,
      aiGeneratedDescriptions: 0,
      aiGeneratedSkillGaps: 0,
      aiGeneratedRoadmaps: 0,
      averageAIConfidence: 0
    };
    
    let confidenceSum = 0;
    let confidenceCount = 0;
    
    responses.forEach(resp => {
      const response = resp.response;
      if (response?.careerPath?.title) metrics.aiGeneratedTitles++;
      if (response?.careerPath?.description) metrics.aiGeneratedDescriptions++;
      if (response?.skillGap?.skillGaps?.length > 0) metrics.aiGeneratedSkillGaps++;
      if (response?.learningRoadmap?.phases?.length > 0) metrics.aiGeneratedRoadmaps++;
      
      if (response?.overallConfidence) {
        confidenceSum += response.overallConfidence;
        confidenceCount++;
      }
    });
    
    metrics.averageAIConfidence = confidenceCount > 0 ? Math.round(confidenceSum / confidenceCount) : 0;
    
    return metrics;
  }

  /**
   * Get last activity date for v2.0 system
   * @private
   */
  _getLastActivityDateV2(submissions, responses) {
    const allDates = [
      ...submissions.map(s => s.submittedAt),
      ...responses.map(r => r.createdAt)
    ].filter(Boolean);
    
    return allDates.length > 0 ? 
      allDates.sort((a, b) => new Date(b) - new Date(a))[0] : 
      null;
  }

  /**
   * Find latest submission ID for v2.0 system
   * @private
   */
  _findLatestSubmissionIdV2(userId) {
    const submissions = this._getItem(V2_SUBMISSIONS_KEY) || [];
    const userSubmissions = submissions
      .filter(s => s.profile.email === userId || s.userId === userId)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    return userSubmissions.length > 0 ? userSubmissions[0].id : null;
  }

  // ============================================================================
  // BACKWARD COMPATIBILITY METHODS
  // ============================================================================

  /**
   * Legacy method - save career test (v1.x compatibility)
   * @deprecated Use saveCareerTestV2 instead
   */
  saveCareerTest(formData) {
    console.log("⚠️ Using legacy saveCareerTest method - consider upgrading to v2.0");
    
    try {
      const submissions = this._getItem(SUBMISSIONS_KEY) || [];
      
      // Legacy validation (4 constant variables)
      const validation = this._validateUserProfile(formData);
      
      const submission = {
        id: this._generateId('sub_legacy'),
        submittedAt: new Date().toISOString(),
        profile: formData,
        validation: validation,
        dataCompleteness: this._calculateDataCompleteness(formData),
        constantVariablesComplete: this._countValidConstants(formData),
        legacy: true
      };
      
      submissions.push(submission);
      this._setItem(SUBMISSIONS_KEY, submissions);
      
      return submission;
    } catch (error) {
      console.error('Error saving legacy career test:', error);
      throw error;
    }
  }

  /**
   * Legacy method - save recommendation response
   * @deprecated Use saveRecommendationResponseV2 instead
   */
  saveRecommendationResponse(recommendationResponse, userId) {
    console.log("⚠️ Using legacy saveRecommendationResponse method - consider upgrading to v2.0");
    
    try {
      const recommendations = this._getItem(RECOMMENDATIONS_KEY) || [];
      
      const savedRecommendation = {
        id: this._generateId('rec_legacy'),
        userId: userId,
        createdAt: new Date().toISOString(),
        response: recommendationResponse,
        submissionId: this._findLatestSubmissionId(userId),
        legacy: true
      };
      
      recommendations.push(savedRecommendation);
      this._setItem(RECOMMENDATIONS_KEY, savedRecommendation);
      
      return savedRecommendation;
    } catch (error) {
      console.error('Error saving legacy recommendation response:', error);
      throw error;
    }
  }

  /**
   * Get recommendations by user ID (legacy)
   * @deprecated Use getRecommendationResponsesV2ByUserId instead
   */
  getRecommendationsByUserId(userId) {
    console.log("⚠️ Using legacy getRecommendationsByUserId method");
    
    try {
      const recommendations = this._getItem(RECOMMENDATIONS_KEY) || [];
      return recommendations
        .filter(rec => rec.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error getting legacy recommendations by user ID:', error);
      return [];
    }
  }

  /**
   * Get latest recommendation (legacy)
   * @deprecated Use getLatestRecommendationV2 instead
   */
  getLatestRecommendation(userId = null) {
    console.log("⚠️ Using legacy getLatestRecommendation method");
    
    try {
      const recommendations = this._getItem(RECOMMENDATIONS_KEY) || [];
      
      let filtered = recommendations;
      if (userId) {
        filtered = recommendations.filter(rec => rec.userId === userId);
      }
      
      if (filtered.length === 0) {
        return null;
      }
      
      return filtered
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    } catch (error) {
      console.error('Error getting latest legacy recommendation:', error);
      return null;
    }
  }

  // Maintain other legacy methods with deprecation warnings...
  saveCareerAnalysis(analysisData) {
    console.log("⚠️ Using legacy saveCareerAnalysis method");
    return this._saveLegacyCareerAnalysis(analysisData);
  }

  getLatestAnalysis() {
    console.log("⚠️ Using legacy getLatestAnalysis method");
    return this._getLatestLegacyAnalysis();
  }

  saveFormattedAnalysis(userId, formattedAnalysis, metadata = {}) {
    console.log("⚠️ Using legacy saveFormattedAnalysis method - consider upgrading to v2.0");
    return this._saveLegacyFormattedAnalysis(userId, formattedAnalysis, metadata);
  }

  getFormattedAnalysis(userId) {
    console.log("⚠️ Using legacy getFormattedAnalysis method");
    return this._getLegacyFormattedAnalysis(userId);
  }

  // ============================================================================
  // INITIALIZATION AND UTILITY METHODS
  // ============================================================================

  /**
   * Initialize v2.0 storage
   * @private
   */
  _initializeV2Storage() {
    if (!this._getItem(V2_SUBMISSIONS_KEY)) {
      this._setItem(V2_SUBMISSIONS_KEY, []);
    }
    if (!this._getItem(V2_CAREER_PATHS_KEY)) {
      this._setItem(V2_CAREER_PATHS_KEY, []);
    }
    if (!this._getItem(V2_SKILL_GAPS_KEY)) {
      this._setItem(V2_SKILL_GAPS_KEY, []);
    }
    if (!this._getItem(V2_LEARNING_ROADMAPS_KEY)) {
      this._setItem(V2_LEARNING_ROADMAPS_KEY, []);
    }
    if (!this._getItem(V2_COMPLETE_RESPONSES_KEY)) {
      this._setItem(V2_COMPLETE_RESPONSES_KEY, []);
    }
  }

  /**
   * Initialize legacy storage
   * @private
   */
  _initializeLegacyStorage() {
    if (!this._getItem(SUBMISSIONS_KEY)) {
      this._setItem(SUBMISSIONS_KEY, []);
    }
    if (!this._getItem(ANALYSES_KEY)) {
      this._setItem(ANALYSES_KEY, []);
    }
    if (!this._getItem(RECOMMENDATIONS_KEY)) {
      this._setItem(RECOMMENDATIONS_KEY, []);
    }
  }

  /**
   * Generate unique ID with prefix
   * @private
   */
  _generateId(prefix = 'item') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
  }

  // Include existing private helper methods for backward compatibility
  _getItem(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error parsing stored item ${key}:`, error);
      return null;
    }
  }

  _setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing item ${key}:`, error);
      throw error;
    }
  }

  _removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  }

  // Legacy helper methods (maintained for backward compatibility)
  _validateUserProfile(profile) {
    const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    const validConstants = constants.filter(key => this._isValid(profile[key]));
    
    return {
      constantsPresent: validConstants.length,
      constantsValid: validConstants,
      requiresFallback: validConstants.length < 2,
      dataQuality: this._assessDataQuality(profile)
    };
  }

  _calculateDataCompleteness(profile) {
    const allFields = [
      'yearsExperience', 'studyField', 'interests', 'transferableSkills',
      'techInterests', 'currentRole', 'jobTechnologies',
      'publications', 'toolsUsed', 'timeCommitment',
      'workPreference', 'educationLevel', 'targetSalary'
    ];
    
    const validFields = allFields.filter(field => this._isValid(profile[field]));
    return Math.round((validFields.length / allFields.length) * 100);
  }

  _countValidConstants(profile) {
    const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    return constants.filter(key => this._isValid(profile[key])).length;
  }

  _isValid(value) {
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

  _assessDataQuality(profile) {
    const completeness = this._calculateDataCompleteness(profile);
    return completeness > 80 ? 'high' : completeness > 50 ? 'medium' : 'low';
  }

  _findLatestSubmissionId(userId) {
    const submissions = this._getItem(SUBMISSIONS_KEY) || [];
    const userSubmissions = submissions
      .filter(s => s.profile.email === userId || s.userId === userId)
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    return userSubmissions.length > 0 ? userSubmissions[0].id : null;
  }

  _saveLegacyCareerAnalysis(analysisData) {
    try {
      const analyses = this._getItem(ANALYSES_KEY) || [];
      
      const analysis = {
        id: this._generateId('analysis_legacy'),
        createdAt: new Date().toISOString(),
        submissionId: this._findLatestSubmissionId(analysisData.userId),
        legacy: true,
        ...analysisData
      };
      
      analyses.push(analysis);
      this._setItem(ANALYSES_KEY, analyses);
      
      return analysis;
    } catch (error) {
      console.error('Error saving legacy career analysis:', error);
      throw error;
    }
  }

  _getLatestLegacyAnalysis() {
    try {
      const analyses = this._getItem(ANALYSES_KEY) || [];
      
      if (analyses.length === 0) {
        return null;
      }
      
      return analyses
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    } catch (error) {
      console.error('Error getting latest legacy analysis:', error);
      return null;
    }
  }

  _saveLegacyFormattedAnalysis(userId, formattedAnalysis, metadata = {}) {
    try {
      if (!userId || !formattedAnalysis) {
        return false;
      }
      
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      
      const storageObject = {
        timestamp: new Date().getTime(),
        content: formattedAnalysis,
        metadata: {
          ...metadata,
          version: '1.1',
          dataCompleteness: metadata.dataCompleteness || 0,
          overallConfidence: metadata.overallConfidence || 0,
          legacy: true
        }
      };
      
      this._setItem(storageKey, storageObject);
      return true;
    } catch (error) {
      console.error('Error saving legacy formatted analysis:', error);
      return false;
    }
  }

  _getLegacyFormattedAnalysis(userId) {
    try {
      if (!userId) {
        return null;
      }
      
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      const storedData = this._getItem(storageKey);
      
      if (!storedData) {
        return null;
      }
      
      // Check if data is fresh (24 hours)
      const currentTime = new Date().getTime();
      const dataAge = currentTime - storedData.timestamp;
      const maxAge = 24 * 60 * 60 * 1000;
      
      if (dataAge > maxAge) {
        this._removeItem(storageKey);
        return null;
      }
      
      return storedData;
    } catch (error) {
      console.error('Error retrieving legacy formatted analysis:', error);
      return null;
    }
  }
}

export default new StorageService();
