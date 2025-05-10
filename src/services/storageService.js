// src/services/storageService.js

// Storage keys
const SUBMISSIONS_KEY = 'tech_talents_submissions';
const ANALYSES_KEY = 'tech_talents_analyses';

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
   * Generate a simple ID
   * @returns {string} - Random ID
   * @private
   */
  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}

export default new StorageService();
