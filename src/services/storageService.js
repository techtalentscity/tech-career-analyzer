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
    if (!localStorage.getItem(SUBMISSIONS_KEY)) {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(ANALYSES_KEY)) {
      localStorage.setItem(ANALYSES_KEY, JSON.stringify([]));
    }
  }

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

  saveCareerAnalysis(analysisData) {
    try {
      const analyses = JSON.parse(localStorage.getItem(ANALYSES_KEY) || '[]');
      const submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
      let submissionId = null;

      if (analysisData.userId) {
        // Fixed potential TDZ issue by avoiding arrow function with 's' parameter
        const userSubmissions = [];
        for (let i = 0; i < submissions.length; i++) {
          const sub = submissions[i];
          if (sub.email === analysisData.userId || sub.userId === analysisData.userId) {
            userSubmissions.push(sub);
          }
        }
        userSubmissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        
        if (userSubmissions.length > 0) {
          submissionId = userSubmissions[0].id;
        }
      }

      const analysis = {
        id: this._generateId(),
        createdAt: new Date().toISOString(),
        submissionId,
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

  getLatestAnalysis() {
    try {
      const analyses = JSON.parse(localStorage.getItem(ANALYSES_KEY) || '[]');
      if (analyses.length === 0) return null;
      // Create a copy and then sort to avoid potential issues
      const sortedAnalyses = [...analyses];
      sortedAnalyses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sortedAnalyses[0];
    } catch (error) {
      console.error('Error getting latest analysis:', error);
      return null;
    }
  }

  getCareerAnalysis(userId) {
    try {
      if (!userId) return null;

      const formattedAnalysis = this.getFormattedAnalysis(userId);
      if (formattedAnalysis) return formattedAnalysis;

      const analyses = JSON.parse(localStorage.getItem(ANALYSES_KEY) || '[]');
      // Fixed potential TDZ issue by avoiding arrow function with 'a' parameter
      const userAnalyses = [];
      for (let i = 0; i < analyses.length; i++) {
        const analysis = analyses[i];
        if (analysis.userId === userId) {
          userAnalyses.push(analysis);
        }
      }
      
      // Sort the filtered analyses
      userAnalyses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      if (userAnalyses.length > 0) {
        return userAnalyses[0].analysis || userAnalyses[0].raw;
      }
      return null;
    } catch (error) {
      console.error('Error getting career analysis:', error);
      return null;
    }
  }

  getSubmissionById(id) {
    try {
      const submissions = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]');
      // Avoid using find with arrow function to prevent potential TDZ issues
      for (let i = 0; i < submissions.length; i++) {
        if (submissions[i].id === id) {
          return submissions[i];
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting submission by ID:', error);
      return null;
    }
  }

  saveFormattedAnalysis(userId, formattedAnalysis) {
    try {
      if (!userId || !formattedAnalysis) return false;

      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      const storageObject = {
        timestamp: new Date().getTime(),
        content: formattedAnalysis
      };
      localStorage.setItem(storageKey, JSON.stringify(storageObject));
      return true;
    } catch (error) {
      console.error('Error saving formatted analysis:', error);
      return false;
    }
  }

  getFormattedAnalysis(userId) {
    try {
      if (!userId) return null;
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      const storedData = localStorage.getItem(storageKey);
      if (!storedData) return null;

      const parsedData = JSON.parse(storedData);
      const currentTime = new Date().getTime();
      const dataAge = currentTime - parsedData.timestamp;
      const maxAge = 24 * 60 * 60 * 1000;

      if (dataAge > maxAge) {
        localStorage.removeItem(storageKey);
        return null;
      }

      return parsedData.content;
    } catch (error) {
      console.error('Error retrieving formatted analysis:', error);
      return null;
    }
  }

  clearFormattedAnalysis(userId) {
    try {
      if (!userId) return false;
      const storageKey = `${FORMATTED_ANALYSES_PREFIX}${userId}`;
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing formatted analysis:', error);
      return false;
    }
  }

  // Fixed the TDZ issue by declaring i outside the for loop initialization
  clearAllFormattedAnalyses() {
    try {
      const keysToRemove = [];
      // Declare i before the loop to avoid TDZ issues
      let i;
      for (i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(FORMATTED_ANALYSES_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      
      // Avoid using forEach with arrow function to prevent potential TDZ issues
      for (let j = 0; j < keysToRemove.length; j++) {
        localStorage.removeItem(keysToRemove[j]);
      }
      
      return keysToRemove.length;
    } catch (error) {
      console.error('Error clearing all formatted analyses:', error);
      return 0;
    }
  }

  saveLearningSources(userId, resources) {
    try {
      if (!userId) return false;
      localStorage.setItem(`${LEARNING_RESOURCES_PREFIX}${userId}`, JSON.stringify(resources));
      return true;
    } catch (error) {
      console.error('Error saving learning resources to storage:', error);
      return false;
    }
  }

  saveLearningResources(userEmail, resources) {
    return this.saveLearningSources(userEmail, resources);
  }

  getLearningResources(userId) {
    try {
      if (!userId) return null;
      const data = localStorage.getItem(`${LEARNING_RESOURCES_PREFIX}${userId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting learning resources from storage:', error);
      return null;
    }
  }

  hasLearningResources(userId) {
    if (!userId) return false;
    return !!localStorage.getItem(`${LEARNING_RESOURCES_PREFIX}${userId}`);
  }

  saveInterviewQuestions(userId, questions) {
    try {
      if (!userId) return false;
      localStorage.setItem(`${INTERVIEW_QUESTIONS_PREFIX}${userId}`, JSON.stringify(questions));
      return true;
    } catch (error) {
      console.error('Error saving interview questions to storage:', error);
      return false;
    }
  }

  getInterviewQuestions(userId) {
    try {
      if (!userId) return null;
      const data = localStorage.getItem(`${INTERVIEW_QUESTIONS_PREFIX}${userId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting interview questions from storage:', error);
      return null;
    }
  }

  hasInterviewQuestions(userId) {
    if (!userId) return false;
    return !!localStorage.getItem(`${INTERVIEW_QUESTIONS_PREFIX}${userId}`);
  }

  getCurrentUserId() {
    try {
      const userData = localStorage.getItem(CURRENT_USER_KEY);
      if (!userData) return null;
      const parsedData = JSON.parse(userData);
      return parsedData && parsedData.email ? parsedData.email : null;
    } catch (error) {
      console.error('Error getting current user ID:', error);
      return null;
    }
  }

  getCurrentUserEmail() {
    try {
      const userData = localStorage.getItem(USER_KEY);
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.email) return parsedData.email;
      }
      return this.getCurrentUserId();
    } catch (error) {
      console.error('Error getting current user email:', error);
      return null;
    }
  }

  _generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}

export default new StorageService();
