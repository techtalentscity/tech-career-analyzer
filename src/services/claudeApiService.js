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
      
      // We'll use the existing CLAUDE_PROMPTS.formSuggestions but make sure it includes the important questions
      const formSuggestionsPrompt = `
You are helping someone fill out a career assessment form for transitioning into tech.
Please provide sample answers for the following form fields based on a typical career changer.
Format each answer with the field name followed by a colon and then the answer:

Current Field of Work:
Years of Experience:
Current Role:
What do you like doing best?:
Personal Strength for tech success:
Biggest motivation for tech career:
What are you passionate about?:
Primary reason for transition:
Transferable Skills:
Previous Tech Exposure:
Anticipated Challenges:
Tech Interests:
Learning Comfort with new tools:
Work Preference:
Current Tech Experience Level:
Tools & Platforms Used:
Certifications:
Certification Details:
Career Paths Interest:
Industry Preference:
Leverage Domain Expertise:
Target Salary:
Time Commitment:
Transition Timeline:
Continue Current Role:
Guidance Needed:
12-month Future Goal:
      `;
      
      const requestBody = {
        model: CLAUDE_API_CONFIG.models.default,
        max_tokens: CLAUDE_API_CONFIG.maxTokens.formSuggestions,
        messages: [
          {
            role: "user",
            content: formSuggestionsPrompt // Using our updated prompt
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
      
      // Enhanced career analysis prompt that highlights important questions
      const careerAnalysisPrompt = `
You are a career transition expert specialized in helping people move into tech careers. 
Analyze the following career assessment data for a person looking to transition into technology.
Focus especially on their personal strengths, tech interests, passion, tech motivation, experience level, tools used, and certifications.

FORM DATA:
--------------
Personal Information:
- Name: ${formData.fullName}
- Email: ${formData.email}

Current Career Background:
- Current/Previous Field: ${formData.currentField}
- Current/Previous Role: ${formData.currentRole}
- Years of Experience: ${formData.yearsExperience}

Personal Strengths & Motivation (IMPORTANT):
- What they like doing best: ${formData.bestActivity}
- Personal strength for tech: ${formData.personalStrength}
- Biggest motivation for tech career: ${formData.techMotivation}
- What they're passionate about: ${formData.techPassion}

Transition Information:
- Primary reason for transition: ${formData.transitionReason}
- Transferable skills: ${formData.transferableSkills}
- Previous tech exposure: ${formData.previousTechExposure}
- Anticipated challenges: ${formData.anticipatedChallenges}

Tech Preferences & Experience (IMPORTANT):
- Tech interests: ${formData.techInterests}
- Learning comfort: ${formData.learningComfort}
- Work preference: ${formData.workPreference}
- Current tech experience level: ${formData.experienceLevel}
- Tools & platforms used: ${formData.toolsUsed.join(', ')}
- Certifications: ${formData.certifications}
- Certification details: ${formData.certificationsDetail}

Career Aspirations:
- Tech career paths interest: ${formData.careerPathsInterest.join(', ')}
- Industry preferences: ${formData.industryPreference.join(', ')}
- Leverage domain expertise: ${formData.leverageDomainExpertise}
- Target salary range: ${formData.targetSalary}

Commitment & Goals:
- Weekly time commitment: ${formData.timeCommitment}
- Transition timeline: ${formData.transitionTimeline}
- Continue current role: ${formData.continueCurrent}
- Guidance needed: ${formData.guidanceNeeded}
- 12-month goal: ${formData.futureGoal}
--------------

Based on this information, provide a comprehensive analysis with the following sections:

1. Career Path Recommendation: Recommend 2-3 specific tech roles that match their background, interests, and strengths. Explain why each role would be a good fit.

2. Strengths Analysis: Identify their key strengths and how these will transfer to their tech career. Focus on both technical aptitudes and soft skills.

3. Skills Gap Analysis: Identify the most critical skills they need to develop for their recommended paths.

4. Learning Roadmap: Create a specific 6-month learning plan with resources and milestones.

5. Transition Strategy: Provide practical advice on how to manage their career transition based on their timeline and commitments.

Make your analysis practical, personalized, and actionable. Focus on leveraging their specific background, strengths, and interests.`;
      
      const requestBody = {
        model: CLAUDE_API_CONFIG.models.default,
        max_tokens: CLAUDE_API_CONFIG.maxTokens.careerAnalysis,
        messages: [
          {
            role: "user",
            content: careerAnalysisPrompt // Using our enhanced analysis prompt
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
