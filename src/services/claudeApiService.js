// src/services/claudeApiService.js
import { CLAUDE_API_CONFIG, CLAUDE_PROMPTS } from '../config/claudeApiConfig';

class ClaudeApiService {
  /**
   * Generate form field suggestions based on typical tech enthusiast profile
   * @returns {Promise<string>} The suggested form responses
   */
  async getFormSuggestions() {
    try {
      const response = await fetch('/api/claude-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: CLAUDE_API_CONFIG.models.default,
          max_tokens: CLAUDE_API_CONFIG.maxTokens.formSuggestions,
          messages: [
            {
              role: "user",
              content: CLAUDE_PROMPTS.formSuggestions
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Error getting form suggestions from Claude API:', error);
      throw error;
    }
  }

  /**
   * Analyze the submitted form data and generate career path recommendations
   * @param {Object} formData The user's form responses
   * @returns {Promise<string>} The career path analysis and recommendations
   */
  async analyzeCareerPath(formData) {
    try {
      const response = await fetch('/api/claude-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: CLAUDE_API_CONFIG.models.default,
          max_tokens: CLAUDE_API_CONFIG.maxTokens.careerAnalysis,
          messages: [
            {
              role: "user",
              content: CLAUDE_PROMPTS.careerAnalysis(formData)
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Error getting career analysis from Claude API:', error);
      throw error;
    }
  }
}

export default new ClaudeApiService();
