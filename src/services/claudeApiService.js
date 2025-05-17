// services/claudeApiService.js
import axios from 'axios';
import storageService from './storageService';

const claudeApiService = {
  // Analyze career path data
  async analyzeCareerPath(formData) {
    try {
      console.log('Preparing career data for analysis...');
      
      // Create structured prompt for Claude API
      const prompt = this.createAnalysisPrompt(formData);
      
      // Create messages array in Claude API format
      const messages = [
        { role: 'user', content: prompt }
      ];
      
      // Define request parameters for Claude API
      const requestData = {
        model: 'claude-3-opus-20240229', // Use appropriate model version
        messages: messages,
        max_tokens: 4000,
        temperature: 0.3, // Lower temperature for more consistent outputs
        system: "You are a career advisor specializing in technology career transitions. Provide detailed, personalized analysis and recommendations based on the information provided. Format your response with clear sections and actionable advice."
      };
      
      console.log('Sending analysis request to Claude API...');
      
      // Make API call to our Claude proxy endpoint
      const response = await axios.post('/api/claude-proxy-fetch', requestData);
      
      // Check if the response has the expected structure
      if (response.data && response.data.content && Array.isArray(response.data.content)) {
        // Extract text from the content array
        const analysisText = response.data.content[0].text || '';
        
        if (!analysisText) {
          throw new Error('Empty analysis received from API');
        }
        
        console.log('Analysis received successfully', { length: analysisText.length });
        
        // Save the analysis using storageService - this was the problem area
        try {
          const analysisData = {
            submissionId: new Date().getTime().toString(),
            analysis: analysisText,
            timestamp: new Date().toISOString()
          };
          
          // Call storageService directly (not via 'vt')
          storageService.saveAnalysis(analysisData);
          
          console.log('Analysis saved to local storage');
        } catch (storageError) {
          console.error('Error saving analysis to storage:', storageError);
          // Continue execution even if storage fails
        }
        
        return analysisText;
      } else {
        console.error('Unexpected response format:', response.data);
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error in analyzeCareerPath:', error);
      throw new Error(error.message || 'Failed to analyze career data');
    }
  },
  
  // Get form suggestions from Claude API
  async getFormSuggestions() {
    try {
      console.log('Requesting form suggestions from Claude...');
      
      // Create prompt for form suggestions
      const prompt = `Generate sample responses for a tech career transition assessment form for a hypothetical person transitioning to tech.
      
The person should have:
- A non-tech background (e.g., finance, healthcare, education)
- 3-8 years of professional experience
- Some transferable skills relevant to tech
- Clear motivations for transitioning to tech
      
Please create realistic responses for these form fields:
- Educational background (education level, field of study)
- Current role and responsibilities
- Experience with tech tools or concepts
- Tech career interests and preferences
- Motivation for career change
- Technical skill level (beginner to intermediate)
- Timeline and commitment level
- Desired work environment and industry preferences

Format each response as a clear field/value pair.`;
      
      // Create messages array in Claude API format
      const messages = [
        { role: 'user', content: prompt }
      ];
      
      // Define request parameters for Claude API
      const requestData = {
        model: 'claude-3-haiku-20240307', // Use a faster, cheaper model for suggestions
        messages: messages,
        max_tokens: 2000,
        temperature: 0.7, // Higher temperature for more creative suggestions
        system: "You are a career advisor helping people transition to tech careers. Generate realistic form responses for hypothetical career changers."
      };
      
      // Make API call to our Claude proxy endpoint
      const response = await axios.post('/api/claude-proxy-fetch', requestData);
      
      // Check if the response has the expected structure
      if (response.data && response.data.content && Array.isArray(response.data.content)) {
        // Extract text from the content array
        const suggestions = response.data.content[0].text || '';
        
        if (!suggestions) {
          throw new Error('Empty suggestions received from API');
        }
        
        console.log('Suggestions received successfully', { length: suggestions.length });
        return suggestions;
      } else {
        console.error('Unexpected response format:', response.data);
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error in getFormSuggestions:', error);
      throw new Error(error.message || 'Failed to get form suggestions');
    }
  },
  
  // Helper function to create a structured prompt for Claude API
  createAnalysisPrompt(formData) {
    // Create a detailed prompt that Claude can use to analyze career transition possibilities
    return `
      Based on the following career assessment data, provide a detailed analysis of suitable tech career paths:
      
      PERSONAL INFORMATION:
      - Education Level: ${formData.educationLevel}
      - Field of Study: ${formData.studyField}
      - Current Role: ${formData.currentRole}
      - Years of Experience: ${formData.yearsExperience}
      
      EXPERIENCE DETAILS:
      - Job Responsibilities: ${formData.jobResponsibilities}
      - Projects & Achievements: ${formData.jobProjects}
      - Technologies Used: ${formData.jobTechnologies}
      - Tech Experience Level: ${formData.experienceLevel}
      
      TECH INTERESTS & PREFERENCES:
      - Tech Areas of Interest: ${formData.techInterests}
      - Tools Used: ${formData.toolsUsed.join(', ')}
      - Career Paths Interest: ${formData.careerPathsInterest.join(', ')}
      - Industry Preference: ${formData.industryPreference.join(', ')}
      
      GOALS & TIMELINE:
      - Transition Timeline: ${formData.transitionTimeline}
      - Time Commitment: ${formData.timeCommitment}
      - Target Salary: ${formData.targetSalary}
      
      TRANSITION DETAILS:
      - Reason for Transition: ${formData.transitionReason}
      - Transferable Skills: ${formData.transferableSkills}
      - Anticipated Challenges: ${formData.anticipatedChallenges}
      
      Please provide an in-depth analysis with the following sections:
      
      1. TOP RECOMMENDED CAREER PATHS (in order of suitability with match percentage):
         a) First recommended career path (X% match)
         b) Second recommended career path (Y% match)
         c) Third recommended career path (Z% match)
      
      2. SKILLS GAP ANALYSIS (what skills they need to develop for each path)
      
      3. MARKET TRENDS (salary ranges, job growth, current demand)
      
      4. NETWORKING STRATEGY (specific to their background and target roles)
      
      5. PERSONAL BRANDING (how to position themselves with their unique background)
      
      6. INTERVIEW PREPARATION (key focus areas based on their background)
      
      7. LEARNING ROADMAP (6-12 month timeline with specific resources and milestones)
      
      8. TRANSITION STRATEGY (step-by-step plan based on their timeline and current commitments)
      
      Please be specific, actionable, and tailor the advice to their unique background and goals.
    `;
  }
};

export default claudeApiService;
