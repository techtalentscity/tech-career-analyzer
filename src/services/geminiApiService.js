// src/services/geminiApiService.js
import { GEMINI_API_CONFIG, GEMINI_PROMPTS } from '../config/geminiApiConfig';
import storageService from './storageService';

class GeminiApiService {
  /**
   * Generate learning resources based on career path and skills
   * @param {Object} data Object containing careerPath and skills
   * @returns {Promise<Object>} Learning resources data
   */
  async getLearningResources(data) {
    try {
      console.log("Calling Gemini API for learning resources");
      
      const { careerPath, skills } = data;
      
      console.log("Career path and skills:", {
        careerPath: careerPath || 'Not provided',
        skillsCount: skills ? skills.length : 0
      });
      
      const requestBody = {
        model: GEMINI_API_CONFIG.models.default,
        contents: [
          {
            parts: [
              {
                text: GEMINI_PROMPTS.learningResources(careerPath, skills)
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: GEMINI_API_CONFIG.maxTokens.learningResources
        }
      };
      
      console.log("Request details:", {
        model: requestBody.model,
        maxTokens: requestBody.generationConfig.maxOutputTokens
      });
      
      const response = await fetch('/api/gemini-proxy', {
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
          const errorJson = await response.json();
          errorText = JSON.stringify(errorJson);
        } catch {
          errorText = await response.text();
        }
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Received successful response from Gemini API");
      
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON response
      try {
        const parsedData = JSON.parse(responseText);
        
        // Save to storage
        const userEmail = storageService.getCurrentUserEmail();
        if (userEmail) {
          storageService.saveLearningResources(userEmail, parsedData);
        }
        
        return parsedData;
      } catch (parseError) {
        console.error("Error parsing Gemini response:", parseError);
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error('Error getting learning resources from Gemini API:', error);
      throw error;
    }
  }

  /**
   * Generate interview questions based on career path and skills
   * @param {Object} data Object containing careerPath and skills
   * @returns {Promise<Object>} Interview questions data
   */
  async getInterviewQuestions(data) {
    try {
      console.log("Calling Gemini API for interview questions");
      
      const { careerPath, skills } = data;
      
      console.log("Career path and skills:", {
        careerPath: careerPath || 'Not provided',
        skillsCount: skills ? skills.length : 0
      });
      
      const requestBody = {
        model: GEMINI_API_CONFIG.models.default,
        contents: [
          {
            parts: [
              {
                text: GEMINI_PROMPTS.interviewQuestions(careerPath, skills)
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: GEMINI_API_CONFIG.maxTokens.interviewQuestions
        }
      };
      
      console.log("Request details:", {
        model: requestBody.model,
        maxTokens: requestBody.generationConfig.maxOutputTokens
      });
      
      const response = await fetch('/api/gemini-proxy', {
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
          const errorJson = await response.json();
          errorText = JSON.stringify(errorJson);
        } catch {
          errorText = await response.text();
        }
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Received successful response from Gemini API");
      
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Parse the JSON response
      try {
        const parsedData = JSON.parse(responseText);
        
        // Save to storage
        const userEmail = storageService.getCurrentUserEmail();
        if (userEmail) {
          storageService.saveInterviewQuestions(userEmail, parsedData);
        }
        
        return parsedData;
      } catch (parseError) {
        console.error("Error parsing Gemini response:", parseError);
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error('Error getting interview questions from Gemini API:', error);
      throw error;
    }
  }
}

export default new GeminiApiService();
