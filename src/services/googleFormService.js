// src/services/googleFormService.js

/**
 * Google Form Service for Career Recommendation System
 * Handles submission of comprehensive UserProfile data to Google Forms
 * Supports both lead capture and full career assessment submissions
 */

class GoogleFormService {
  constructor() {
    // Google Form URLs - replace with your actual form URLs
    this.forms = {
      // Lead capture form (name + email only)
      leadCapture: 'https://docs.google.com/forms/d/e/1FAIpQLScgJFqxHTOlfB7qfG-5954B-qMsY3j6TOngfSm7ZaLToZ1_Yg/formResponse',
      
      // Full career assessment form (complete UserProfile data)
      careerAssessment: 'https://docs.google.com/forms/d/e/YOUR_FULL_ASSESSMENT_FORM_ID/formResponse'
    };

    // Field mappings for lead capture form
    this.leadCaptureFields = {
      fullName: 'entry.2120631500',
      email: 'entry.289230066'
    };

    // Field mappings for full career assessment form
    // You'll need to update these with your actual Google Form entry IDs
    this.careerAssessmentFields = {
      // Basic Info
      fullName: 'entry.XXXXXXXXX',
      email: 'entry.XXXXXXXXX',
      
      // 4 Constant Variables (used in ALL recommendations)
      yearsExperience: 'entry.XXXXXXXXX',
      studyField: 'entry.XXXXXXXXX',
      interests: 'entry.XXXXXXXXX',           // Array - will be joined
      transferableSkills: 'entry.XXXXXXXXX',
      
      // Recommendation 1 Specific (🎯 Tech-Interest Based)
      techInterests: 'entry.XXXXXXXXX',
      currentRole: 'entry.XXXXXXXXX',
      jobTechnologies: 'entry.XXXXXXXXX',
      
      // Recommendation 2 Specific (📚 Research/Development Based)
      publications: 'entry.XXXXXXXXX',
      toolsUsed: 'entry.XXXXXXXXX',           // Array - will be joined
      timeCommitment: 'entry.XXXXXXXXX',
      
      // Recommendation 3 Specific (⚖️ Lifestyle/Market Based)
      workPreference: 'entry.XXXXXXXXX',
      educationLevel: 'entry.XXXXXXXXX',
      targetSalary: 'entry.XXXXXXXXX',
      
      // Additional Context
      experienceLevel: 'entry.XXXXXXXXX',
      jobResponsibilities: 'entry.XXXXXXXXX',
      jobProjects: 'entry.XXXXXXXXX'
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
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error submitting lead capture:', error);
      return { success: false, error: error.message, type: 'lead-capture' };
    }
  }

  /**
   * Submit complete career assessment data (full UserProfile)
   * @param {Object} userProfile - Complete UserProfile object conforming to schema
   * @returns {Promise<Object>} - Promise resolving to submission status with validation
   */
  async submitCareerAssessment(userProfile) {
    try {
      // Validate UserProfile against schema
      const validation = this._validateUserProfile(userProfile);
      
      if (!validation.isValid) {
        return {
          success: false,
          error: 'Invalid user profile data',
          validation: validation,
          type: 'career-assessment'
        };
      }

      const formData = new FormData();
      
      // Map UserProfile to Google Form fields
      this._mapUserProfileToFormData(userProfile, formData);
      
      const result = await this._submitForm(this.forms.careerAssessment, formData);
      
      return {
        ...result,
        type: 'career-assessment',
        validation: validation,
        timestamp: new Date().toISOString(),
        dataCompleteness: this._calculateDataCompleteness(userProfile)
      };
    } catch (error) {
      console.error('Error submitting career assessment:', error);
      return { 
        success: false, 
        error: error.message, 
        type: 'career-assessment' 
      };
    }
  }

  /**
   * Submit both lead capture and career assessment data
   * @param {Object} userData - Basic user data (name, email)
   * @param {Object} userProfile - Complete UserProfile object
   * @returns {Promise<Object>} - Combined submission results
   */
  async submitComplete(userData, userProfile) {
    try {
      // Submit to both forms in parallel
      const [leadResult, assessmentResult] = await Promise.allSettled([
        this.submitLeadCapture(userData),
        this.submitCareerAssessment(userProfile)
      ]);

      return {
        leadCapture: leadResult.status === 'fulfilled' ? leadResult.value : { success: false, error: leadResult.reason },
        careerAssessment: assessmentResult.status === 'fulfilled' ? assessmentResult.value : { success: false, error: assessmentResult.reason },
        timestamp: new Date().toISOString(),
        overallSuccess: leadResult.status === 'fulfilled' && assessmentResult.status === 'fulfilled'
      };
    } catch (error) {
      console.error('Error submitting complete data:', error);
      return { 
        success: false, 
        error: error.message, 
        type: 'complete-submission' 
      };
    }
  }

  /**
   * Test Google Form connectivity
   * @param {string} formType - 'lead-capture' or 'career-assessment'
   * @returns {Promise<Object>} - Connection test results
   */
  async testConnection(formType = 'lead-capture') {
    try {
      const testData = formType === 'lead-capture' 
        ? { fullName: 'Test User', email: 'test@example.com' }
        : this._createTestUserProfile();

      const result = formType === 'lead-capture'
        ? await this.submitLeadCapture(testData)
        : await this.submitCareerAssessment(testData);

      return {
        connectionTest: true,
        formType: formType,
        success: result.success,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        connectionTest: true,
        formType: formType,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Private helper methods

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
        message: 'Form submitted successfully',
        url: formUrl 
      };
    } catch (error) {
      throw new Error(`Form submission failed: ${error.message}`);
    }
  }

  /**
   * Map UserProfile object to Google Form FormData
   * @private
   */
  _mapUserProfileToFormData(userProfile, formData) {
    Object.entries(this.careerAssessmentFields).forEach(([key, entryId]) => {
      const value = userProfile[key];
      
      if (value !== undefined && value !== null) {
        // Handle arrays (interests, toolsUsed)
        if (Array.isArray(value)) {
          formData.append(entryId, value.join(', '));
        } else {
          formData.append(entryId, String(value));
        }
      }
    });
  }

  /**
   * Validate UserProfile against schema requirements
   * @private
   */
  _validateUserProfile(userProfile) {
    const constants = ['yearsExperience', 'studyField', 'interests', 'transferableSkills'];
    const validConstants = constants.filter(key => this._isValid(userProfile[key]));
    
    const requiredFields = ['fullName', 'email'];
    const missingRequired = requiredFields.filter(field => !userProfile[field]);
    
    return {
      isValid: missingRequired.length === 0 && validConstants.length >= 1,
      constantsPresent: validConstants.length,
      constantsValid: validConstants,
      missingRequired: missingRequired,
      requiresFallback: validConstants.length < 2,
      dataCompleteness: this._calculateDataCompleteness(userProfile)
    };
  }

  /**
   * Check if value is valid according to system specs
   * @private
   */
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

  /**
   * Calculate data completeness percentage
   * @private
   */
  _calculateDataCompleteness(userProfile) {
    const allFields = [
      'fullName', 'email',
      'yearsExperience', 'studyField', 'interests', 'transferableSkills',
      'techInterests', 'currentRole', 'jobTechnologies',
      'publications', 'toolsUsed', 'timeCommitment',
      'workPreference', 'educationLevel', 'targetSalary',
      'experienceLevel', 'jobResponsibilities', 'jobProjects'
    ];
    
    const validFields = allFields.filter(field => this._isValid(userProfile[field]));
    return Math.round((validFields.length / allFields.length) * 100);
  }

  /**
   * Create test UserProfile for connection testing
   * @private
   */
  _createTestUserProfile() {
    return {
      fullName: 'Test User',
      email: 'test@example.com',
      yearsExperience: '3-5',
      studyField: 'Computer Science',
      interests: ['AI', 'problem-solving'],
      transferableSkills: 'communication, analytical thinking',
      techInterests: 'machine learning',
      currentRole: 'Developer',
      jobTechnologies: 'Python, JavaScript',
      workPreference: 'hybrid',
      educationLevel: 'Bachelor\'s',
      targetSalary: '$80k'
    };
  }
}

// Legacy function for backward compatibility
const googleFormService = {
  submitToGoogleForm: async (userData) => {
    const service = new GoogleFormService();
    return await service.submitLeadCapture(userData);
  }
};

// Export both the class and legacy object
export default googleFormService;
export { GoogleFormService };
