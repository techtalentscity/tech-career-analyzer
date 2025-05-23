// src/services/storageService.js

// Storage keys
const SUBMISSIONS_KEY = 'tech_talents_submissions';
const ANALYSES_KEY = 'tech_talents_analyses';
const RECOMMENDATIONS_KEY = 'tech_talents_recommendations';
const FORMATTED_ANALYSES_PREFIX = 'tech_talents_formatted_analysis_';

class StorageService {
  constructor() {
    // Initialize local storage if not already done
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
   * Save career test form submission with structured validation
   * @param {Object} formData - Form data conforming to UserProfile schema
   * @returns {Object} - Saved submission with ID and validation metadata
   */
  saveCareerTest(formData) {
    try {
      const submissions = this._getItem(SUBMISSIONS_KEY) || [];
      
      // Validate against UserProfile schema
      const validation = this._validateUserProfile(formData);
      
      const submission = {
        id: this._generateId(),
        submittedAt: new Date().toISOString(),
        profile: formData,
        validation: validation,
        dataCompleteness: this._calculateDataCompleteness(formData),
        constantVariablesComplete: this._countValidConstants(formData)
      };
      
      submissions.push(submission);
      this._setItem(SUBMISSIONS_KEY, submissions);
      
      return submission;
    } catch (error) {
      console.error('Error saving career test:', error);
      throw error;
    }
  }

  /**
   * Save structured recommendation response
   * @param {Object} recommendationResponse - RecommendationResponse object
   * @param {string} userId - User identifier
   * @returns {Object} - Saved recommendation with metadata
   */
  saveRecommendationResponse(recommendationResponse, userId) {
    try {
      const recommendations = this._getItem(RECOMMENDATIONS_KEY) || [];
      
      const savedRecommendation = {
        id: this._generateId(),
        userId: userId,
        createdAt: new Date().toISOString(),
        response: recommendationResponse,
        submissionId: this._findLatestSubmissionId(userId)
      };
      
      recommendations.push(savedRecommendation);
      this._setItem(RECOMMENDATIONS_KEY, recommendations);
      
      return savedRecommendation;
    } catch (error) {
      console.error('Error saving recommendation response:', error);
      throw error;
    }
  }

  /**
   * Get recommendations by user ID
   * @param {string} userId - User identifier
   * @returns {Array} - Array of recommendation responses
   */
  getRecommendationsByUserId(userId) {
    try {
      const recommendations = this._getItem(RECOMMENDATIONS_KEY) || [];
      return recommendations
        .filter(rec => rec.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error getting recommendations by user ID:', error);
      return [];
    }
  }

  /**
   * Get latest recommendation response
   * @param {string} userId - User identifier (optional)
   * @returns {Object|null} - Latest recommendation response or null
   */
  getLatestRecommendation(userId = null) {
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
      console.error('Error getting latest recommendation:', error);
      return null;
    }
  }

  /**
   * Get recommendations by type
   * @param {string} type - Recommendation type ('tech-interest-based', 'research-development', 'lifestyle-market')
   * @param {string} userId - User identifier (optional)
   * @returns {Array} - Filtered recommendations
   */
  getRecommendationsByType(type, userId = null) {
    try {
      const recommendations = this._getItem(RECOMMENDATIONS_KEY) || [];
      
      return recommendations
        .filter(rec => {
          const userMatch = !userId || rec.userId === userId;
          const typeMatch = rec.response.recommendations.some(r => r.type === type);
          return userMatch && typeMatch;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error getting recommendations by type:', error);
      return [];
    }
  }

  /**
   * Save career analysis (legacy method - maintained for backward compatibility)
   * @param {Object} analysisData - Analysis data
   * @returns {Object} - Saved analysis
   */
  saveCareerAnalysis(analysisData) {
    try {
      const analyses = this._getItem(ANALYSES_KEY) || [];
      
      const analysis = {
        id: this._generateId(),
        createdAt: new Date().toISOString(),
        submissionId: this._findLatestSubmissionId(analysisData.userId),
        ...analysisData
      };
      
      analyses.push(analysis);
      this._setItem(ANALYSES_KEY, analyses);
      
      return analysis;
    } catch (error) {
      console.error('Error saving career analysis:', error);
      throw error;
    }
  }

  /**
   * Get the latest analysis (legacy method)
   * @returns {Object|null} - Latest analysis or null
   */
  getLatestAnalysis() {
    try {
      const analyses = this._getItem(ANALYSES_KEY) || [];
      
      if (analyses.length === 0) {
        return null;
      }
      
      return analyses
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    } catch (error) {
      console.error('Error getting latest analysis:', error);
      return null;
    }
  }

  /**
   * Get submission by ID
   * @param {string} id - Submission ID
   * @returns {Object|null} - Submission or null
   */
  getSubmissionById(id) {
    try {
      const submissions = this._getItem(SUBMISSIONS_KEY) || [];
      return submissions.find(s => s.id === id) || null;
    } catch (error) {
      console.error('Error getting submission by ID:', error);
      return null;
    }
  }

  /**
   * Get submissions by user ID with validation status
   * @param {string} userId - User identifier
   * @returns {Array} - Array of user submissions
   */
  getSubmissionsByUserId(userId) {
    try {
      const submissions = this._getItem(SUBMISSIONS_KEY) || [];
      return submissions
        .filter(s => s.profile.email === userId || s.userId === userId)
        .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    } catch (error) {
      console.error('Error getting submissions by user ID:', error);
      return [];
    }
  }

  /**
   * Save formatted analysis with enhanced metadata
   * @param {string} userId - User identifier
   * @param {string} formattedAnalysis - Formatted analysis content
   * @param {Object} metadata - Additional metadata (confidence, type, etc.)
   * @returns {boolean} - Success status
   */
  saveFormattedAnalysis(userId, formattedAnalysis, metadata = {}) {
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
          version: '1.1', // Track format version
          dataCompleteness: metadata.dataCompleteness || 0,
          overallConfidence: metadata.overallConfidence || 0
        }
      };
      
      this._setItem(storageKey, storageObject);
      return true;
    } catch (error) {
      console.error('Error saving formatted analysis:', error);
      return false;
    }
  }

  /**
   * Get formatted analysis with metadata
   * @param {string} userId - User identifier
   * @returns {Object|null} - Formatted analysis object or null
   */
  getFormattedAnalysis(userId) {
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
      console.error('Error retrieving formatted analysis:', error);
      return null;
    }
  }

  /**
   * Clear formatted analysis cache
   * @param {string} userId - User identifier
   * @returns {boolean} - Success status
   */
  clearFormattedAnalysis(userId) {
    try {
      if (!userId) {
        return false;
      }
      
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      this._removeItem(storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing formatted analysis:', error);
      return false;
    }
  }

  /**
   * Clear all formatted analyses caches
   * @returns {number} - Number of cache entries cleared
   */
  clearAllFormattedAnalyses() {
    try {
      const keysToRemove = [];
      
      // In browser environment, we need to iterate through storage keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(FORMATTED_ANALYSES_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => this._removeItem(key));
      return keysToRemove.length;
    } catch (error) {
      console.error('Error clearing all formatted analyses:', error);
      return 0;
    }
  }

  /**
   * Get analytics/stats about stored data
   * @returns {Object} - Analytics object
   */
  getStorageAnalytics() {
    try {
      const submissions = this._getItem(SUBMISSIONS_KEY) || [];
      const recommendations = this._getItem(RECOMMENDATIONS_KEY) || [];
      const analyses = this._getItem(ANALYSES_KEY) || [];
      
      return {
        totalSubmissions: submissions.length,
        totalRecommendations: recommendations.length,
        totalAnalyses: analyses.length,
        averageDataCompleteness: this._calculateAverageCompleteness(submissions),
        recommendationTypes: this._getRecommendationTypeStats(recommendations),
        lastActivity: this._getLastActivityDate(submissions, recommendations, analyses)
      };
    } catch (error) {
      console.error('Error getting storage analytics:', error);
      return {};
    }
  }

  // Private helper methods
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
    // Simple quality assessment based on completeness and specificity
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

  _calculateAverageCompleteness(submissions) {
    if (submissions.length === 0) return 0;
    
    const total = submissions.reduce((sum, sub) => sum + (sub.dataCompleteness || 0), 0);
    return Math.round(total / submissions.length);
  }

  _getRecommendationTypeStats(recommendations) {
    const stats = {
      'tech-interest-based': 0,
      'research-development': 0,
      'lifestyle-market': 0
    };
    
    recommendations.forEach(rec => {
      if (rec.response && rec.response.recommendations) {
        rec.response.recommendations.forEach(r => {
          if (stats.hasOwnProperty(r.type)) {
            stats[r.type]++;
          }
        });
      }
    });
    
    return stats;
  }

  _getLastActivityDate(submissions, recommendations, analyses) {
    const allDates = [
      ...submissions.map(s => s.submittedAt),
      ...recommendations.map(r => r.createdAt),
      ...analyses.map(a => a.createdAt)
    ].filter(Boolean);
    
    return allDates.length > 0 ? 
      allDates.sort((a, b) => new Date(b) - new Date(a))[0] : 
      null;
  }

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}

export default new StorageService();
