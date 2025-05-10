// src/services/claudeApiService.js
import { CLAUDE_API_CONFIG, CLAUDE_PROMPTS } from '../config/claudeApiConfig';

class ClaudeApiService {
  /**
   * Generate form field suggestions based on typical tech enthusiast profile
   * @returns {Promise<string>} The suggested form responses
   */
  async getFormSuggestions() {
    try {
      console.log("Calling Claude API for form suggestions");
      
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
        max_tokens: requestBody.max_tokens
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
      console.log("Received successful response from Claude API");
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
      console.log("Calling Claude API for career analysis");
      
      // Use the updated prompt from configuration that highlights important questions
      const requestBody = {
        model: CLAUDE_API_CONFIG.models.default,
        max_tokens: CLAUDE_API_CONFIG.maxTokens.careerAnalysis,
        messages: [
          {
            role: "user",
            content: CLAUDE_PROMPTS.careerAnalysis(formData)
          }
        ]
      };
      
      console.log("Request details:", {
        model: requestBody.model,
        max_tokens: requestBody.max_tokens
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
        let errorText;
        try {
          // Try to parse as JSON first
          const errorJson = await response.json();
          errorText = JSON.stringify(errorJson);
        } catch {
          // If not JSON, get as text
          errorText = await response.text();
        }
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Received successful response from Claude API");
      return data.content[0].text;
    } catch (error) {
      console.error('Error getting career analysis from Claude API:', error);
      throw error;
    }
  }
}

export default new ClaudeApiService();
