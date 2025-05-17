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
      
      // Parse the response data
      const data = await response.json();
      console.log("API Response structure:", Object.keys(data));
      
      // Handle different possible response formats
      let responseText = '';
      
      // Check for Anthropic API v1 format
      if (data.content) {
        console.log("Content structure:", typeof data.content);
        
        // If content is an array of objects with text property (newer Claude API)
        if (Array.isArray(data.content) && data.content.length > 0 && data.content[0].text) {
          responseText = data.content[0].text;
        } 
        // If content is a string (possible format)
        else if (typeof data.content === 'string') {
          responseText = data.content;
        }
        // Otherwise try to get the content in a different way
        else {
          console.log("Unexpected content format:", data.content);
          // Try to parse content as JSON if it's an object
          if (typeof data.content === 'object') {
            responseText = JSON.stringify(data.content);
          }
        }
      }
      // Check for completion format (older Claude API)
      else if (data.completion) {
        responseText = data.completion;
      }
      // Final fallback for the standard Claude message format
      else if (data.message && data.message.content) {
        responseText = data.message.content;
      }
      // Last resort - return the entire response as a string
      else {
        console.warn("Unrecognized API response format, returning full response as string");
        responseText = JSON.stringify(data);
      }
      
      console.log("Received successful response from Claude API");
      console.log("First 100 chars of response:", responseText.substring(0, 100));
      
      return responseText;
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
      
      // Log important new fields to help with debugging
      console.log("Key form data fields:", {
        educationLevel: formData.educationLevel || 'Not provided',
        studyField: formData.studyField || 'Not provided',
        publications: formData.publications ? 'Provided' : 'Not provided'
      });
      
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
      
      // Parse the response data
      const data = await response.json();
      console.log("API Response structure:", Object.keys(data));
      
      // Handle different possible response formats
      let responseText = '';
      
      // Check for Anthropic API v1 format
      if (data.content) {
        console.log("Content structure:", typeof data.content);
        
        // If content is an array of objects with text property (newer Claude API)
        if (Array.isArray(data.content) && data.content.length > 0 && data.content[0].text) {
          responseText = data.content[0].text;
        } 
        // If content is a string (possible format)
        else if (typeof data.content === 'string') {
          responseText = data.content;
        }
        // Otherwise try to get the content in a different way
        else {
          console.log("Unexpected content format:", data.content);
          // Try to parse content as JSON if it's an object
          if (typeof data.content === 'object') {
            responseText = JSON.stringify(data.content);
          }
        }
      }
      // Check for completion format (older Claude API)
      else if (data.completion) {
        responseText = data.completion;
      }
      // Check for standard Claude message format
      else if (data.message && data.message.content) {
        responseText = data.message.content;
      }
      // Last resort - return the entire response as a string
      else {
        console.warn("Unrecognized API response format, returning full response as string");
        responseText = JSON.stringify(data);
      }
      
      console.log("Received successful response from Claude API");
      
      // DEBUGGING: Log the actual response text (first 500 chars to avoid console flood)
      console.log("=== CLAUDE RESPONSE START (first 500 chars) ===");
      console.log(responseText.substring(0, 500));
      console.log("=== CLAUDE RESPONSE PREVIEW END ===");
      
      // Check if Skills Gap section exists
      const hasSkillsGap = responseText.includes("SKILLS GAP ANALYSIS");
      console.log("Has Skills Gap section:", hasSkillsGap);
      
      if (hasSkillsGap) {
        // Extract just the Skills Gap section for debugging
        const skillsGapStart = responseText.indexOf("SKILLS GAP ANALYSIS");
        const skillsGapEnd = responseText.indexOf("LEARNING ROADMAP") || responseText.indexOf("TRANSITION STRATEGY");
        if (skillsGapEnd > skillsGapStart) {
          const skillsGapSection = responseText.substring(skillsGapStart, skillsGapEnd);
          console.log("=== SKILLS GAP SECTION PREVIEW ===");
          console.log(skillsGapSection.substring(0, 200) + "...");
          console.log("=== END SKILLS GAP PREVIEW ===");
        }
      }
      
      // Verify that the response includes relevant content about education and publications
      const containsEducationRef = responseText.toLowerCase().includes('education') || 
                                  responseText.toLowerCase().includes('degree') ||
                                  responseText.toLowerCase().includes('study');
      
      const containsPublicationsRef = formData.publications ? 
                                      responseText.toLowerCase().includes('publication') || 
                                      responseText.toLowerCase().includes('research') : true;
      
      if (formData.educationLevel && !containsEducationRef) {
        console.warn("Warning: Response does not mention education despite education level being provided");
      }
      
      if (formData.publications && !containsPublicationsRef) {
        console.warn("Warning: Response does not mention publications despite publications being provided");
      }
      
      return responseText;
    } catch (error) {
      console.error('Error getting career analysis from Claude API:', error);
      throw error;
    }
  }
}

export default new ClaudeApiService();
