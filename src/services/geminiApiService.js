// src/services/geminiApiService.js
import { GEMINI_API_CONFIG, GEMINI_PROMPTS } from '../config/geminiApiConfig';
import storageService from './storageService';

class GeminiApiService {
  /**
   * Analyzes career test data and generates career recommendations,
   * learning resources, market analysis, and interview questions
   * @param {Object} formData User's career test form data
   * @returns {Promise<Object>} Complete career analysis
   */
  async analyzeCareerData(formData) {
    try {
      console.log("Calling Gemini API for comprehensive career analysis");
      
      // Create a more concise version of the form data to send to Gemini API
      const careerData = {
        education: {
          level: formData.educationLevel,
          field: formData.studyField
        },
        experience: {
          currentRole: formData.currentRole,
          yearsExperience: formData.yearsExperience,
          responsibilities: formData.jobResponsibilities,
          projects: formData.jobProjects,
          technologies: formData.jobTechnologies,
          tools: formData.toolsUsed
        },
        interests: {
          careerPaths: formData.careerPathsInterest,
          industries: formData.industryPreference,
          techInterests: formData.techInterests,
          workPreference: formData.workPreference,
          leverageDomainExpertise: formData.leverageDomainExpertise
        },
        skills: {
          transferable: formData.transferableSkills,
          learningComfort: formData.learningComfort,
          certifications: formData.certifications,
          certificationsDetail: formData.certificationsDetail
        },
        motivation: {
          techMotivation: formData.techMotivation,
          techPassion: formData.techPassion,
          challenges: formData.anticipatedChallenges,
          transitionReason: formData.transitionReason
        },
        goals: {
          timeCommitment: formData.timeCommitment,
          targetSalary: formData.targetSalary,
          transitionTimeline: formData.transitionTimeline,
          continueCurrent: formData.continueCurrent,
          futureGoal: formData.futureGoal,
          guidanceNeeded: formData.guidanceNeeded
        }
      };
      
      const prompt = `
        Act as a career advisor for someone transitioning to tech. Based on the detailed profile information below, provide a comprehensive career analysis with specific recommendations.

        USER PROFILE:
        ${JSON.stringify(careerData, null, 2)}

        Generate a structured JSON response with the following sections:
        1. Career path recommendations (top 3 most suitable tech careers based on background, skills, and interests)
        2. Skills gap analysis (key skills they need to develop for each recommended career)
        3. Learning roadmap (specific steps and timeline to acquire needed skills)
        4. Market analysis (job prospects, salary expectations, and industry trends for recommended paths)
        5. Learning resources (courses, tutorials, books for each skill)
        6. Interview preparation (technical questions, behavioral questions, and system design questions)

        Format your response as a valid JSON object with the following structure:
        {
          "analysis": {
            "careerPathRecommendations": [
              {
                "path": "Career Path Name",
                "matchPercentage": 85,
                "reasoning": "Why this is a good match",
                "timeToEntry": "Estimated time to entry-level position"
              }
            ],
            "skillsGapAnalysis": [
              {
                "skill": "Skill Name",
                "importance": 9,
                "currentLevel": "None/Basic/Intermediate/Advanced",
                "targetLevel": "Intermediate/Advanced",
                "estimatedTimeToLearn": "X months"
              }
            ],
            "learningRoadmap": {
              "phases": [
                {
                  "phase": "Phase name (e.g., Fundamentals)",
                  "duration": "X weeks/months",
                  "focus": "What to focus on",
                  "milestones": ["Milestone 1", "Milestone 2"]
                }
              ]
            },
            "marketAnalysis": {
              "jobMarket": "Growing/Stable/Declining",
              "entryLevelSalary": "$X-$Y",
              "midLevelSalary": "$X-$Y",
              "seniorLevelSalary": "$X-$Y",
              "demandTrends": "Text describing trends",
              "recommendedLocations": ["Location 1", "Location 2"],
              "remoteWorkOpportunities": "High/Medium/Low"
            }
          },
          "resources": {
            "learningResources": [
              {
                "skillName": "Skill name",
                "importance": 8,
                "freeResources": [
                  {"name": "Resource name", "link": "URL", "format": "Video/Article/Tutorial", "difficulty": "Beginner/Intermediate/Advanced", "estimatedHours": 10}
                ],
                "paidCourses": [
                  {"platform": "Udemy/Coursera/etc", "name": "Course name", "link": "Example.com", "cost": "$XX", "rating": 4.5, "duration": "X hours/weeks"}
                ],
                "books": [
                  {"title": "Book title", "author": "Author name", "link": "Example.com", "description": "Brief description"}
                ],
                "practiceProjects": [
                  {"name": "Project name", "description": "Brief description", "difficulty": "Beginner/Intermediate/Advanced"}
                ]
              }
            ],
            "interviewPrep": {
              "technical": [
                {
                  "question": "Technical question text",
                  "difficulty": "Easy/Medium/Hard",
                  "answer": "Detailed answer",
                  "code": "Code example if applicable"
                }
              ],
              "behavioral": [
                {
                  "question": "Behavioral question text",
                  "context": "When this question is typically asked",
                  "answer": "Sample answer structure and key points to include"
                }
              ],
              "systemDesign": [
                {
                  "question": "System design question text",
                  "difficulty": "Easy/Medium/Hard",
                  "approach": "Step-by-step approach to tackling this question",
                  "keyConsiderations": ["Consideration 1", "Consideration 2"]
                }
              ]
            }
          }
        }

        Ensure the JSON is valid and properly formatted.
      `;
      
      const requestBody = {
        model: GEMINI_API_CONFIG.models.default,
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192 // Using a larger token limit for comprehensive analysis
        }
      };
      
      console.log("Sending request to Gemini API for career analysis");
      
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
      
      // Extract the JSON part from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not find valid JSON in the response");
      }
      
      const jsonText = jsonMatch[0];
      
      try {
        // Parse the JSON response
        const parsedData = JSON.parse(jsonText);
        
        // Save to storage
        if (formData.email) {
          // Save the whole analysis
          storageService.saveCareerAnalysis({
            userId: formData.email,
            analysis: JSON.stringify(parsedData.analysis),
            raw: responseText
          });
          
          // Save learning resources separately
          storageService.saveLearningResources(formData.email, parsedData.resources.learningResources);
          
          // Save interview questions separately
          storageService.saveInterviewQuestions(formData.email, parsedData.resources.interviewPrep);
        }
        
        return parsedData;
      } catch (parseError) {
        console.error("Error parsing Gemini response:", parseError);
        console.error("Response text:", responseText);
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error('Error with comprehensive career analysis:', error);
      throw error;
    }
  }

  /**
   * Get learning resources based on career path and skills
   * This is kept for compatibility with existing code, but enhanced to be more robust
   */
  async getLearningResources(data) {
    try {
      console.log("Calling Gemini API for learning resources");
      
      // Defensive check for data format
      const careerPath = data?.careerPath || "Software Developer";
      let skills = ["Programming", "Data Structures", "Algorithms"];
      
      if (data?.skills && Array.isArray(data.skills)) {
        skills = data.skills;
      }
      
      console.log("Career path and skills:", {
        careerPath: careerPath,
        skillsCount: skills.length
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
        // Extract the JSON part from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Could not find valid JSON in the response");
        }
        
        const jsonText = jsonMatch[0];
        const parsedData = JSON.parse(jsonText);
        
        // Verify expected structure
        if (!parsedData.resources || !Array.isArray(parsedData.resources)) {
          throw new Error("Response missing expected 'resources' array");
        }
        
        // Save to storage
        const userEmail = storageService.getCurrentUserEmail();
        if (userEmail) {
          storageService.saveLearningResources(userEmail, parsedData.resources);
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
   * This is kept for compatibility with existing code, but enhanced to be more robust
   */
  async getInterviewQuestions(data) {
    try {
      console.log("Calling Gemini API for interview questions");
      
      // Defensive check for data format
      const careerPath = data?.careerPath || "Software Developer";
      let skills = ["Programming", "Data Structures", "Algorithms"];
      
      if (data?.skills && Array.isArray(data.skills)) {
        skills = data.skills;
      }
      
      console.log("Career path and skills:", {
        careerPath: careerPath,
        skillsCount: skills.length
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
        // Extract the JSON part from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("Could not find valid JSON in the response");
        }
        
        const jsonText = jsonMatch[0];
        const parsedData = JSON.parse(jsonText);
        
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
