// src/services/claudeApiService.js - Enhanced with Video Insights
import { CLAUDE_API_CONFIG, CLAUDE_PROMPTS, VIDEO_INSIGHTS, getContextualAdvice } from '../config/claudeApiConfig';
import storageService from './storageService';
import videoInsightsService from './videoInsightsService';

class ClaudeApiService {
  /**
   * Generate form field suggestions based on video insights and typical tech enthusiast profile
   * @returns {Promise<string>} The suggested form responses
   */
  async getFormSuggestions() {
    try {
      console.log("Calling Claude API for form suggestions with video insights");
      
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
   * Enhanced form suggestions with video insights fallback
   * @param {Object} partialFormData - Any existing form data to build upon
   * @returns {Object} Enhanced form suggestions
   */
  async getEnhancedFormSuggestions(partialFormData = {}) {
    try {
      // Try to get AI suggestions first
      const aiSuggestions = await this.getFormSuggestions();
      return this.parseAISuggestions(aiSuggestions, partialFormData);
    } catch (error) {
      console.warn('AI suggestions failed, falling back to video insights:', error);
      
      // Fallback to video insights-based suggestions
      return this.getVideoInsightBasedSuggestions(partialFormData);
    }
  }

  /**
   * Get form suggestions based on video insights (fallback method)
   * @param {Object} partialFormData - Any existing form data
   * @returns {Object} Form suggestions based on video analysis
   */
  getVideoInsightBasedSuggestions(partialFormData = {}) {
    const trendingSkills = videoInsightsService.getTrendingSkills();
    const careerAdvice = videoInsightsService.getCareerAdvicePatterns();
    const industryInsights = videoInsightsService.getIndustryGrowthInsights();
    
    // Generate suggestions based on video insights
    const suggestions = {
      // Education suggestions
      educationLevel: partialFormData.educationLevel || "Bachelor's Degree",
      studyField: partialFormData.studyField || "Computer Science",
      
      // Experience suggestions based on video insights
      currentRole: partialFormData.currentRole || "Software Developer",
      yearsExperience: partialFormData.yearsExperience || "3-5 years",
      
      // Job experience with trending technologies
      jobTechnologies: partialFormData.jobTechnologies || 
        `${trendingSkills.slice(0, 3).map(s => s.name).join(', ')}, Git, SQL`,
      
      // Motivation based on video analysis patterns
      techMotivation: partialFormData.techMotivation || 
        "Growing demand for AI/ML skills and opportunities for remote work in the tech industry",
      
      techPassion: partialFormData.techPassion || 
        "Problem-solving with technology and continuous learning in emerging fields like AI and data science",
      
      // Tech interests based on trending skills
      techInterests: partialFormData.techInterests || 
        `${trendingSkills.slice(0, 4).map(s => s.name).join(', ')}`,
      
      // Career paths based on video analysis
      careerPathsInterest: partialFormData.careerPathsInterest || 
        ['Software Development', 'Data Analysis/Science', 'AI/Machine Learning'],
      
      // Industry preferences from video insights
      industryPreference: partialFormData.industryPreference || 
        industryInsights.slice(0, 2).map(i => i.industry),
      
      // Tools based on trending skills
      toolsUsed: partialFormData.toolsUsed || 
        ['Python', 'JavaScript', 'Git', 'VS Code'],
      
      // Timeline based on video analysis (6-18 months is typical)
      transitionTimeline: partialFormData.transitionTimeline || '6-12 months',
      
      // Time commitment
      timeCommitment: partialFormData.timeCommitment || '10-15 hours',
      
      // Guidance based on common video advice
      guidanceNeeded: partialFormData.guidanceNeeded || 
        'Learning roadmap, networking strategies, and portfolio building guidance',
      
      // Future goal incorporating video insights
      futureGoal: partialFormData.futureGoal || 
        'Complete foundational skills training and land first tech role in a growth industry like FinTech or Healthcare Technology'
    };
    
    return suggestions;
  }

  /**
   * Parse AI suggestions and enhance with video insights
   */
  parseAISuggestions(aiSuggestions, partialFormData) {
    // This method would parse the AI response and combine it with video insights
    // For now, return the AI suggestions as-is, but you could enhance this
    return aiSuggestions;
  }

  /**
   * Analyze the submitted form data and generate career path recommendations
   * Enhanced with video insights
   * @param {Object} formData The user's form responses
   * @returns {Promise<string>} The career path analysis and recommendations
   */
  async analyzeCareerPath(formData) {
    try {
      console.log("Calling Claude API for career analysis with video insights");
      
      // Get contextual advice from video insights
      const contextualAdvice = getContextualAdvice(formData);
      
      console.log("Contextual advice from video insights:", contextualAdvice);
      
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
          const errorJson = await response.json();
          errorText = JSON.stringify(errorJson);
        } catch {
          errorText = await response.text();
        }
        console.error("API Error Response:", errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Received successful response from Claude API");
      
      const responseText = data.content[0].text;
      
      // Enhance the analysis with video insights
      const enhancedAnalysis = this.enhanceAnalysisWithVideoInsights(responseText, formData, contextualAdvice);
      
      // Save analysis to storage
      try {
        const analysisData = {
          userId: formData.email || String(new Date().getTime()),
          analysis: enhancedAnalysis,
          raw: responseText,
          videoInsights: contextualAdvice
        };
        
        storageService.saveCareerAnalysis(analysisData);
        
        if (formData.email) {
          storageService.saveFormattedAnalysis(formData.email, enhancedAnalysis);
        }
        
        console.log('Enhanced analysis saved to local storage');
      } catch (storageError) {
        console.error('Error saving analysis to storage:', storageError);
      }
      
      return enhancedAnalysis;
    } catch (error) {
      console.error('Error getting career analysis from Claude API:', error);
      throw error;
    }
  }

  /**
   * Enhance the Claude analysis with video insights
   * @param {string} analysis - Original analysis from Claude
   * @param {Object} formData - User form data
   * @param {Array} contextualAdvice - Advice from video insights
   * @returns {string} Enhanced analysis
   */
  enhanceAnalysisWithVideoInsights(analysis, formData, contextualAdvice) {
    let enhancedAnalysis = analysis;
    
    // Add video insights footer
    const videoInsightsFooter = `

## INSIGHTS FROM TECH CAREER EXPERT ANALYSIS

**Based on analysis of 16 comprehensive tech career guidance videos:**

### Key Market Trends (2025)
${VIDEO_INSIGHTS.market_trends.slice(0, 5).map(trend => `- ${trend}`).join('\n')}

### Your Personalized Action Steps
${this.getPersonalizedActionSteps(formData).map(step => `- ${step}`).join('\n')}

### Industry Expert Advice
${VIDEO_INSIGHTS.career_advice_patterns.slice(0, 3).map(advice => 
  `**${advice.theme}** (mentioned in ${advice.frequency}/16 videos): ${advice.description}`
).join('\n\n')}

### Recommended Communities
Based on the video analysis, consider joining these tech communities:
- **DSN (Data Science Nigeria)** - For data science and AI/ML networking
- **I4G (Ingressive For Good)** - For general tech career support
- **Omdena** - For collaborative AI projects and portfolio building

---
*This analysis incorporates insights from 16 hours of expert tech career guidance videos, analyzed using AI to provide you with evidence-based recommendations.*
`;

    enhancedAnalysis += videoInsightsFooter;
    
    return enhancedAnalysis;
  }

  /**
   * Get personalized action steps based on user profile and video insights
   * @param {Object} formData - User form data
   * @returns {Array} Personalized action steps
   */
  getPersonalizedActionSteps(formData) {
    const experienceLevel = formData.experienceLevel || 'Complete beginner';
    const careerInterests = formData.careerPathsInterest || [];
    
    // Map experience level to video insights categories
    const levelMapping = {
      'Complete beginner': 'Entry-Level',
      'Some exposure': 'Entry-Level',
      'Beginner': 'Entry-Level',
      'Intermediate': 'Mid-Career',
      'Advanced': 'Senior-Level'
    };
    
    const mappedLevel = levelMapping[experienceLevel] || 'Entry-Level';
    const levelSteps = VIDEO_INSIGHTS.actionable_steps_by_level[mappedLevel] || [];
    
    // Get trending skills relevant to user's interests
    const trendingSkills = VIDEO_INSIGHTS.trending_skills
      .filter(skill => {
        return careerInterests.some(interest => {
          if (interest.includes('Data') && (skill.name === 'Python' || skill.name === 'Data Science' || skill.name === 'AI/ML')) return true;
          if (interest.includes('Software') && (skill.name === 'JavaScript' || skill.name === 'Python')) return true;
          if (interest.includes('DevOps') && skill.name === 'DevOps') return true;
          if (interest.includes('AI') && skill.name === 'AI/ML') return true;
          return false;
        });
      })
      .slice(0, 3)
      .map(skill => `Focus on learning ${skill.name} (${skill.growth_trend} growth trend)`);
    
    // Combine level-appropriate steps with trending skills
    const personalizedSteps = [
      ...levelSteps.slice(0, 5),
      ...trendingSkills,
      'Join tech communities mentioned in expert videos (DSN, I4G, Omdena)',
      'Build a portfolio showcasing projects in your areas of interest'
    ];
    
    return personalizedSteps.slice(0, 8); // Return top 8 steps
  }

  /**
   * Get market insights for specific career path
   * @param {string} careerPath - The career path to analyze
   * @returns {Object} Market insights for the career path
   */
  getCareerPathInsights(careerPath) {
    const pathInsight = VIDEO_INSIGHTS.career_path_insights.find(
      path => path.path === careerPath
    );
    
    const relevantSkills = VIDEO_INSIGHTS.trending_skills.filter(skill => {
      // Logic to match skills to career paths
      if (careerPath.includes('Data') && (skill.name === 'Python' || skill.name === 'Data Science')) return true;
      if (careerPath.includes('Software') && (skill.name === 'JavaScript' || skill.name === 'Python')) return true;
      if (careerPath.includes('AI') && skill.name === 'AI/ML') return true;
      return false;
    });
    
    return {
      pathDetails: pathInsight,
      relevantSkills: relevantSkills,
      industryOpportunities: VIDEO_INSIGHTS.industry_opportunities
    };
  }
}

export default new ClaudeApiService();
