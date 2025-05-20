// src/services/storageService.js

// Storage keys
const SUBMISSIONS_KEY = 'tech_talents_submissions';
const ANALYSES_KEY = 'tech_talents_analyses';
const FORMATTED_ANALYSES_PREFIX = 'tech_talents_formatted_analysis_';
const LEARNING_RESOURCES_PREFIX = 'learning_resources_';
const INTERVIEW_QUESTIONS_PREFIX = 'interview_questions_';
const CURRENT_USER_KEY = 'current_user';
const USER_KEY = 'user'; // Added new key for compatibility

class StorageService {
  constructor() {
    // Initialize local storage if not already done
    if (!localStorage.getItem(SUBMISSIONS_KEY)) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(ANALYSES_KEY)) {
      localStorage.setItem(ANALYSES_KEY, JSON.stringify([]));
    }
  }

  /**
   * Save career test form submission
   * @param {Object} formData - Form data to save
   * @returns {Object} - Saved submission with ID
   */
  saveCareerTest(formData) {
    try {
      const submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
      
      const submission = {
        id: this._generateId(),
        submittedAt: new Date().toISOString(),
        ...formData
      };
      
      submissions.push(submission);
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
      
      return submission;
    } catch (error) {
      console.error('Error saving career test:', error);
      throw error;
    }
  }

  /**
   * Save career analysis results
   * @param {Object} analysisData - Analysis data with userId and analysis text
   * @returns {Object} - Saved analysis with ID
   */
  saveCareerAnalysis(analysisData) {
    try {
      const analyses = JSON.parse(localStorage.getItem(ANALYSES_KEY) || '[]');
      
      // Find the corresponding submission
      const submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
      let submissionId = null;
      
      if (analysisData.userId) {
        // Find the most recent submission for this user
        const userSubmissions = submissions
          .filter(s => s.email === analysisData.userId || s.userId === analysisData.userId)
          .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        
        if (userSubmissions.length > 0) {
          submissionId = userSubmissions[0].id;
        }
      }
      
      const analysis = {
        id: this._generateId(),
        createdAt: new Date().toISOString(),
        submissionId: submissionId,
        ...analysisData
      };
      
      analyses.push(analysis);
      localStorage.setItem(ANALYSES_KEY, JSON.stringify(analyses));
      
      return analysis;
    } catch (error) {
      console.error('Error saving career analysis:', error);
      throw error;
    }
  }

  /**
   * Get the latest analysis (regardless of user)
   * @returns {Object|null} - Latest analysis or null if none found
   */
  getLatestAnalysis() {
    try {
      const analyses = JSON.parse(localStorage.getItem(ANALYSES_KEY) || '[]');
      
      if (analyses.length === 0) {
        return null;
      }
      
      // Sort by date (newest first) and return the first
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
   * @returns {Object|null} - Submission or null if not found
   */
  getSubmissionById(id) {
    try {
      const submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
      return submissions.find(s => s.id === id) || null;
    } catch (error) {
      console.error('Error getting submission by ID:', error);
      return null;
    }
  }

  /**
   * Save formatted analysis to localStorage for faster rendering
   * @param {string} userId - User email or ID 
   * @param {string} formattedAnalysis - Raw analysis text
   * @returns {boolean} - Success status
   */
  saveFormattedAnalysis(userId, formattedAnalysis) {
    try {
      if (!userId || !formattedAnalysis) {
        return false;
      }
      
      // Create a storage key based on the user's email/ID
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      
      // Create a storage object with timestamp to handle cache invalidation
      const storageObject = {
        timestamp: new Date().getTime(),
        content: formattedAnalysis
      };
      
      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(storageObject));
      
      return true;
    } catch (error) {
      console.error('Error saving formatted analysis:', error);
      return false;
    }
  }

  /**
   * Get formatted analysis from localStorage
   * @param {string} userId - User email or ID
   * @returns {string|null} - Formatted analysis or null if not found/expired
   */
  getFormattedAnalysis(userId) {
    try {
      if (!userId) {
        return null;
      }
      
      // Create the storage key
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      
      // Get the stored item
      const storedData = localStorage.getItem(storageKey);
      
      if (!storedData) {
        return null;
      }
      
      // Parse the stored data
      const parsedData = JSON.parse(storedData);
      
      // Check if the data is still fresh (less than 24 hours old)
      const currentTime = new Date().getTime();
      const dataAge = currentTime - parsedData.timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (dataAge > maxAge) {
        // Data is stale, remove it and return null
        localStorage.removeItem(storageKey);
        return null;
      }
      
      // Return the content
      return parsedData.content;
    } catch (error) {
      console.error('Error retrieving formatted analysis:', error);
      return null;
    }
  }

  /**
   * Clear formatted analysis cache
   * @param {string} userId - User email or ID
   * @returns {boolean} - Success status
   */
  clearFormattedAnalysis(userId) {
    try {
      if (!userId) {
        return false;
      }
      
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing formatted analysis:', error);
      return false;
    }
  }

  /**
   * Clear all formatted analyses caches (useful when upgrading app version)
   * @returns {number} - Number of cache entries cleared
   */
  clearAllFormattedAnalyses() {
    try {
      const keysToRemove = [];
      
      // Find all keys with the formatted analyses prefix
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(FORMATTED_ANALYSES_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      
      // Remove all found keys
      keysToRemove.forEach(key => localStorage.removeItem(key));
      
      return keysToRemove.length;
    } catch (error) {
      console.error('Error clearing all formatted analyses:', error);
      return 0;
    }
  }

  /**
   * Save learning resources to local storage
   * @param {string} userId User identifier
   * @param {Object} resources Learning resources data
   * @returns {boolean} Success status
   */
  saveLearningSources(userId, resources) {
    try {
      if (!userId) {
        return false;
      }
      
      localStorage.setItem(`${LEARNING_RESOURCES_PREFIX}${userId}`, JSON.stringify(resources));
      return true;
    } catch (error) {
      console.error('Error saving learning resources to storage:', error);
      return false;
    }
  }

  /**
   * Save learning resources to local storage (alias with userEmail parameter)
   * @param {string} userEmail User email identifier
   * @param {Object} resources Learning resources data
   */
  saveLearningResources(userEmail, resources) {
    return this.saveLearningSources(userEmail, resources);
  }

  /**
   * Get learning resources from local storage
   * @param {string} userId User identifier
   * @returns {Object|null} Learning resources data
   */
  getLearningResources(userId) {
    try {
      if (!userId) {
        return null;
      }
      
      const data = localStorage.getItem(`${LEARNING_RESOURCES_PREFIX}${userId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting learning resources from storage:', error);
      return null;
    }
  }

  /**
   * Check if learning resources exist in storage
   * @param {string} userId User identifier
   * @returns {boolean} True if resources exist
   */
  hasLearningResources(userId) {
    if (!userId) {
      return false;
    }
    return !!localStorage.getItem(`${LEARNING_RESOURCES_PREFIX}${userId}`);
  }

  /**
   * Save interview questions to local storage
   * @param {string} userId User identifier
   * @param {Object} questions Interview questions data
   * @returns {boolean} Success status
   */
  saveInterviewQuestions(userId, questions) {
    try {
      if (!userId) {
        return false;
      }
      
      localStorage.setItem(`${INTERVIEW_QUESTIONS_PREFIX}${userId}`, JSON.stringify(questions));
      return true;
    } catch (error) {
      console.error('Error saving interview questions to storage:', error);
      return false;
    }
  }

  /**
   * Get interview questions from local storage
   * @param {string} userId User identifier
   * @returns {Object|null} Interview questions data
   */
  getInterviewQuestions(userId) {
    try {
      if (!userId) {
        return null;
      }
      
      const data = localStorage.getItem(`${INTERVIEW_QUESTIONS_PREFIX}${userId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting interview questions from storage:', error);
      return null;
    }
  }

  /**
   * Check if interview questions exist in storage
   * @param {string} userId User identifier
   * @returns {boolean} True if questions exist
   */
  hasInterviewQuestions(userId) {
    if (!userId) {
      return false;
    }
    return !!localStorage.getItem(`${INTERVIEW_QUESTIONS_PREFIX}${userId}`);
  }

  /**
   * Get current user ID
   * @returns {string|null} User ID or null if not available
   */
  getCurrentUserId() {
    try {
      const userData = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
      return userData?.email || null;
    } catch (error) {
      console.error('Error getting current user ID:', error);
      return null;
    }
  }

  /**
   * Get current user email (alternative implementation)
   * @returns {string|null} User email or null if not available
   */
  getCurrentUserEmail() {
    try {
      // First try from the 'user' key (new implementation)
      const userData = JSON.parse(localStorage.getItem(USER_KEY));
      if (userData?.email) {
        return userData.email;
      }
      
      // Fallback to the existing method
      return this.getCurrentUserId();
    } catch (error) {
      console.error('Error getting current user email:', error);
      return null;
    }
  }

  /**
   * Generate a simple ID
   * @returns {string} - Random ID
   * @private
   */
  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}

export default new StorageService();
