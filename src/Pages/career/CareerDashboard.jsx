// CareerDashboard.jsx - FULLY AI-POWERED VERSION WITH PDF DOWNLOADS
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
  
  // Claude AI-powered states
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [marketInsights, setMarketInsights] = useState(null);
  const [personalizedRoadmap, setPersonalizedRoadmap] = useState(null);
  const [actionPlan, setActionPlan] = useState([]);
  const [networkingStrategy, setNetworkingStrategy] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState([]);
  // NEW: Enhanced states for career-specific content
  const [learningPlan, setLearningPlan] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState(null);
  const [generatingLearning, setGeneratingLearning] = useState(false);
  const [generatingInterviews, setGeneratingInterviews] = useState(false);
  // Enhanced states with timestamp tracking
  const [contentTimestamp, setContentTimestamp] = useState(null);
  const [learningResources, setLearningResources] = useState([]);
  
  // Generation states
  const [generatingRecommendations, setGeneratingRecommendations] = useState(false);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [generatingInsights, setGeneratingInsights] = useState(false);
  const [generatingActionPlan, setGeneratingActionPlan] = useState(false);
  
  const [activeTab, setActiveTab] = useState('paths');
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    experienceLevel: '',
    studyField: '',
    educationLevel: '',
    currentRole: '',
    yearsExperience: '',
    jobResponsibilities: '',
    jobProjects: '',
    jobTechnologies: '',
    publications: '',
    transferableSkills: '',
    interests: [],
    careerPathsInterest: [],
    toolsUsed: [],
    techInterests: '',
    timeCommitment: '',
    targetSalary: '',
    workPreference: '',
    transitionTimeline: ''
  });
  
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  // ============================================================================
  // PDF DOWNLOAD FUNCTIONALITY FOR AI CONTENT
  // ============================================================================

  const downloadAsPDF = (content, filename) => {
    // Create a temporary HTML document for PDF generation
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 40px;
              color: #333;
            }
            h1 {
              color: #2563eb;
              border-bottom: 3px solid #2563eb;
              padding-bottom: 10px;
              font-size: 24px;
            }
            h2 {
              color: #059669;
              margin-top: 30px;
              margin-bottom: 15px;
              font-size: 18px;
            }
            h3 {
              color: #7c3aed;
              margin-top: 20px;
              margin-bottom: 10px;
              font-size: 16px;
            }
            h4 {
              color: #dc2626;
              margin-top: 15px;
              margin-bottom: 8px;
              font-size: 14px;
            }
            p, li {
              margin-bottom: 8px;
              font-size: 12px;
            }
            ul, ol {
              margin-left: 20px;
            }
            .metadata {
              background-color: #f3f4f6;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
              font-size: 11px;
            }
            .section {
              margin-bottom: 25px;
              page-break-inside: avoid;
            }
            .divider {
              border-top: 1px solid #e5e7eb;
              margin: 20px 0;
            }
            strong {
              color: #1f2937;
            }
            @media print {
              body { margin: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${formatContentForPDF(content)}
          <div class="no-print" style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="background: #059669; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer;">
              Download as PDF
            </button>
            <button onclick="window.close()" style="background: #6b7280; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; margin-left: 10px;">
              Close
            </button>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto-trigger print dialog after content loads
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
    
    toast.success(`${filename} opened for PDF download!`);
  };

  const formatContentForPDF = (content) => {
    // Convert markdown-like content to HTML
    const lines = content.split('\n');
    let html = '';
    let inList = false;
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += '<br>';
      } else if (trimmedLine.startsWith('# ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h1>${trimmedLine.substring(2)}</h1>`;
      } else if (trimmedLine.startsWith('## ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h2>${trimmedLine.substring(3)}</h2>`;
      } else if (trimmedLine.startsWith('### ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h3>${trimmedLine.substring(4)}</h3>`;
      } else if (trimmedLine.startsWith('#### ')) {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<h4>${trimmedLine.substring(5)}</h4>`;
      } else if (trimmedLine === '---') {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<div class="divider"></div>';
      } else if (trimmedLine.startsWith('- ')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${formatText(trimmedLine.substring(2))}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        if (trimmedLine.includes('Generated on:') || trimmedLine.includes('User:') || 
            trimmedLine.includes('Timeline:') || trimmedLine.includes('Career Match:')) {
          html += `<div class="metadata">${formatText(trimmedLine)}</div>`;
        } else {
          html += `<p>${formatText(trimmedLine)}</p>`;
        }
      }
    });
    
    if (inList) {
      html += '</ul>';
    }
    
    return html;
  };

  const formatText = (text) => {
    // Convert **bold** to <strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const downloadCareerRecommendations = () => {
    const content = `# AI Career Recommendations

Generated on: ${new Date().toLocaleDateString()}
User: ${userData.name}

## Top Career Recommendations:

${careerRecommendations.map((career, index) => `
### ${index + 1}. ${career.title} (${career.match}% Match)

**Description:** ${career.description}

**Why This Fits You:** ${career.whyGoodFit}

**Key Skills Needed:**
${career.keySkills.map(skill => `- ${skill}`).join('\n')}

**Salary Range:** ${career.salaryRange}
**Demand Level:** ${career.demandLevel}
**Entry Path:** ${career.entryPath}

---
`).join('\n')}`;

    downloadAsPDF(content, `AI_Career_Recommendations_${userData.name}`);
  };

  const downloadRoadmap = () => {
    if (!personalizedRoadmap) return;
    
    const content = `# ${personalizedRoadmap.careerTitle} - AI Career Roadmap

Generated on: ${new Date().toLocaleDateString()}
User: ${userData.name}
Career Match: ${personalizedRoadmap.matchScore}%
Timeline: ${personalizedRoadmap.totalDuration}
Weekly Commitment: ${personalizedRoadmap.weeklyCommitment}

---

${personalizedRoadmap.phases.map((phase, index) => `
## Phase ${index + 1}: ${phase.title}
**Timeline:** ${phase.timeline}
**Description:** ${phase.description}

### Key Milestones:
${phase.milestones.map(milestone => `- ${milestone}`).join('\n')}

### Skills to Learn:
${phase.skills ? phase.skills.map(skill => `- ${skill}`).join('\n') : 'No specific skills listed'}

---
`).join('\n')}`;

    downloadAsPDF(content, `AI_Career_Roadmap_${personalizedRoadmap.careerTitle}_${userData.name}`);
  };

  const downloadMarketInsights = () => {
    if (!marketInsights) return;
    
    const content = `# ${marketInsights.careerTitle} - AI Market Insights

Generated on: ${marketInsights.lastUpdated}
User: ${userData.name}

## Market Overview
- **Demand Level:** ${marketInsights.overview.demandLevel}
- **Growth Projection:** ${marketInsights.overview.growthProjection}
- **Competition Level:** ${marketInsights.overview.competitionLevel}
- **Entry Barrier:** ${marketInsights.overview.entryBarrier}

## Salary Insights
- **Entry Level:** ${marketInsights.salary.entry}
- **Mid Level:** ${marketInsights.salary.mid}
- **Senior Level:** ${marketInsights.salary.senior}
- **Top 10%:** ${marketInsights.salary.topPercentile}

## Job Market Statistics
- **Total Jobs:** ${marketInsights.jobMarket.totalJobs}
- **New Monthly Jobs:** ${marketInsights.jobMarket.newJobsMonthly}
- **Remote Percentage:** ${marketInsights.jobMarket.remotePercentage}
- **Top Companies:** ${marketInsights.jobMarket.topCompanies.join(', ')}

## Skills in Demand
**Trending:** ${marketInsights.skills.trending.join(', ')}
**Essential:** ${marketInsights.skills.essential.join(', ')}
**Emerging:** ${marketInsights.skills.emerging.join(', ')}

## Location Insights
**Top Cities:** ${marketInsights.locations.topCities.join(', ')}
**Remote Work:** ${marketInsights.locations.remote}
**International:** ${marketInsights.locations.international.join(', ')}

## Market Trends
${marketInsights.trends.map(trend => `- ${trend}`).join('\n')}

## AI Recommendations
${marketInsights.recommendations.map(rec => `
### ${rec.title}
**Type:** ${rec.type}
**Description:** ${rec.description}
**Action:** ${rec.action}
`).join('\n')}`;

    downloadAsPDF(content, `AI_Market_Insights_${marketInsights.careerTitle}_${userData.name}`);
  };

  const downloadActionPlan = () => {
    if (!actionPlan.length) return;
    
    const content = `# AI Action Plan

Generated on: ${new Date().toLocaleDateString()}
User: ${userData.name}
Career Goal: ${careerRecommendations[0]?.title || 'Not specified'}

## Your Personalized Action Steps:

${actionPlan.map((step, index) => `
### ${index + 1}. ${step.title}
**Timeline:** ${step.timeline}
**Priority:** ${step.priority.toUpperCase()}
**Personalized:** ${step.personalized ? 'Yes' : 'No'}

**Description:** ${step.text}

${step.resources ? `**Recommended Resources:**
${step.resources.map(resource => `- ${resource}`).join('\n')}` : ''}

---
`).join('\n')}`;

    downloadAsPDF(content, `AI_Action_Plan_${userData.name}`);
  };

  const downloadLearningPlan = () => {
    if (!learningPlan) return;
    
    const content = `# ${learningPlan.careerTitle} - AI Learning Plan

Generated on: ${new Date().toLocaleDateString()}
User: ${userData.name}
Timeline: ${learningPlan.totalDuration}

## Learning Tracks

${learningPlan.learningTracks.map(track => `
### ${track.category}
**Priority:** ${track.priority}
**Timeframe:** ${track.timeframe}

#### Resources:
${track.resources.map(resource => `
**${resource.title}**
- Provider: ${resource.provider}
- Type: ${resource.type}
- Duration: ${resource.duration}
- Cost: ${resource.cost}
- Difficulty: ${resource.difficulty}
- Description: ${resource.description}
- Skills: ${resource.skills.join(', ')}
`).join('\n')}
`).join('\n')}

${learningPlan.practiceProjects ? `
## Practice Projects
${learningPlan.practiceProjects.map(project => `
### ${project.title}
**Time Estimate:** ${project.timeEstimate}
**Difficulty:** ${project.difficulty}
**Description:** ${project.description}
**Skills:** ${project.skills.join(', ')}
`).join('\n')}` : ''}

${learningPlan.certifications ? `
## Recommended Certifications
${learningPlan.certifications.map(cert => `
### ${cert.name}
**Provider:** ${cert.provider}
**Cost:** ${cert.cost}
**Time to Complete:** ${cert.timeToComplete}
**Priority:** ${cert.priority}
**Description:** ${cert.description}
`).join('\n')}` : ''}

${learningPlan.communityResources ? `
## Community Resources
${learningPlan.communityResources.map(community => `
### ${community.name}
**Type:** ${community.type}
**Description:** ${community.description}
${community.url ? `**URL:** ${community.url}` : ''}
`).join('\n')}` : ''}`;

    downloadAsPDF(content, `AI_Learning_Plan_${learningPlan.careerTitle}_${userData.name}`);
  };

  const downloadInterviewQuestions = () => {
    if (!interviewQuestions) return;
    
    const content = `# ${interviewQuestions.careerTitle} - AI Interview Questions

Generated on: ${new Date().toLocaleDateString()}
User: ${userData.name}

${interviewQuestions.categories.map(category => `
## ${category.category}
**Description:** ${category.description}

${category.questions.map((q, index) => `
### Question ${index + 1}: ${q.question}
**Type:** ${q.type}
**Difficulty:** ${q.difficulty}
**Topic:** ${q.topic}

**Sample Answer Approach:** ${q.sampleAnswer}

**Key Points to Address:**
${q.keyPoints.map(point => `- ${point}`).join('\n')}

---
`).join('\n')}
`).join('\n')}

${interviewQuestions.preparationTips ? `
## Preparation Tips
${interviewQuestions.preparationTips.map(tip => `- ${tip.tip} (${tip.category})`).join('\n')}` : ''}

${interviewQuestions.commonMistakes ? `
## Common Mistakes to Avoid
${interviewQuestions.commonMistakes.map(mistake => `
**Mistake:** ${mistake.mistake}
**Better Approach:** ${mistake.correction}
`).join('\n')}` : ''}`;

    downloadAsPDF(content, `AI_Interview_Questions_${interviewQuestions.careerTitle}_${userData.name}`);
  };

  const callClaudeAPI = async (prompt, maxTokens = 1000) => {
    try {
      // Using your existing Claude API proxy infrastructure
      const requestBody = {
        model: 'claude-3-5-sonnet-20240620', // Using your configured model
        max_tokens: maxTokens,
        temperature: 0.7,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      };

      console.log('Calling Claude API with request:', {
        model: requestBody.model,
        max_tokens: requestBody.max_tokens,
        promptLength: prompt.length
      });

      const response = await fetch('/api/claude-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API Error Response:', errorText);
        throw new Error(`Claude API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Claude API Response received successfully');
      
      // Extract text from your Claude API response format
      if (data.content && Array.isArray(data.content) && data.content[0]?.text) {
        return data.content[0].text;
      } else if (data.completion) {
        return data.completion;
      } else {
        throw new Error('Unexpected response format from Claude API');
      }
      
    } catch (error) {
      console.error('Claude API Error:', error);
      throw new Error(`Failed to generate AI response: ${error.message}`);
    }
  };

  // ============================================================================
  // CAREER RECOMMENDATIONS - CLAUDE AI POWERED
  // ============================================================================

  const generateCareerRecommendations = async (userData) => {
    setGeneratingRecommendations(true);
    
    try {
      const prompt = `Analyze this professional profile and recommend the top 5 most suitable tech career paths:

**User Profile:**
- Name: ${userData.name}
- Current Role: ${userData.currentRole}
- Experience Level: ${userData.experienceLevel}
- Education: ${userData.studyField} (${userData.educationLevel})
- Years Experience: ${userData.yearsExperience}
- Work Preference: ${userData.workPreference}
- Target Salary: ${userData.targetSalary}
- Transition Timeline: ${userData.transitionTimeline}
- Time Commitment: ${userData.timeCommitment}

**Background:**
- Responsibilities: ${userData.jobResponsibilities}
- Projects: ${userData.jobProjects}
- Technologies: ${userData.jobTechnologies}
- Publications: ${userData.publications}
- Transferable Skills: ${userData.transferableSkills}
- Interests: ${userData.interests.join(', ')}
- Career Interests: ${userData.careerPathsInterest.join(', ')}
- Tools Used: ${userData.toolsUsed.join(', ')}

Return ONLY a JSON array with exactly 5 career recommendations, each with:
{
  "title": "Career Title",
  "match": 85,
  "description": "Brief description of the role",
  "whyGoodFit": "Why this matches their profile",
  "keySkills": ["skill1", "skill2", "skill3"],
  "salaryRange": "$80k - $150k",
  "demandLevel": "High",
  "entryPath": "How to get started"
}

Focus on realistic, achievable career transitions based on their background.`;

      const response = await callClaudeAPI(prompt, 1500);
      const recommendations = JSON.parse(response);
      
      setCareerRecommendations(recommendations);
      setContentTimestamp(new Date());
      toast.success('Career recommendations generated!');
      
    } catch (error) {
      console.error('Error generating career recommendations:', error);
      toast.error('Failed to generate recommendations. Using fallback.');
      setCareerRecommendations(getFallbackRecommendations());
    } finally {
      setGeneratingRecommendations(false);
    }
  };

  // ============================================================================
  // PERSONALIZED ROADMAP - CLAUDE AI POWERED
  // ============================================================================

  const generatePersonalizedRoadmap = async () => {
    setGeneratingRoadmap(true);
    
    try {
      const topCareer = careerRecommendations[0];
      if (!topCareer) {
        toast.error('Please generate career recommendations first.');
        return;
      }

      const prompt = `Create a detailed, personalized career roadmap for transitioning to: ${topCareer.title}

**User Context:**
- Current: ${userData.currentRole} (${userData.experienceLevel})
- Target: ${topCareer.title}
- Timeline: ${userData.transitionTimeline}
- Time Commitment: ${userData.timeCommitment}
- Background: ${userData.studyField}
- Interests: ${userData.interests.join(', ')}

Create a roadmap with 3-4 phases. Return ONLY JSON:
{
  "careerTitle": "${topCareer.title}",
  "matchScore": ${topCareer.match},
  "totalDuration": "${userData.transitionTimeline}",
  "weeklyCommitment": "${userData.timeCommitment}",
  "phases": [
    {
      "title": "Phase Name",
      "timeline": "0-2 months",
      "description": "What you'll accomplish",
      "milestones": ["milestone 1", "milestone 2", "milestone 3"],
      "skills": ["skill 1", "skill 2", "skill 3", "skill 4"],
      "completed": false
    }
  ]
}

Make it specific to their background and realistic for their timeline.`;

      const response = await callClaudeAPI(prompt, 2000);
      const roadmap = JSON.parse(response);
      
      setPersonalizedRoadmap(roadmap);
      toast.success('Personalized roadmap generated!');
      
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast.error('Failed to generate roadmap.');
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  // ============================================================================
  // MARKET INSIGHTS - CLAUDE AI POWERED
  // ============================================================================

  const generateMarketInsights = async () => {
    setGeneratingInsights(true);
    
    try {
      const topCareer = careerRecommendations[0];
      if (!topCareer) {
        toast.error('Please generate career recommendations first.');
        return;
      }

      const prompt = `Provide current market analysis for: ${topCareer.title}

Include real market data and trends. Return ONLY JSON:
{
  "careerTitle": "${topCareer.title}",
  "lastUpdated": "${new Date().toLocaleDateString()}",
  "overview": {
    "demandLevel": "Very High",
    "growthProjection": "+25% (2024-2034)",
    "competitionLevel": "Medium-High",
    "entryBarrier": "Medium"
  },
  "salary": {
    "entry": "$75,000 - $110,000",
    "mid": "$110,000 - $150,000",
    "senior": "$150,000 - $200,000",
    "topPercentile": "$250,000+"
  },
  "jobMarket": {
    "totalJobs": "85,000+ active positions",
    "newJobsMonthly": "7,500+ new openings",
    "remotePercentage": "78%",
    "topCompanies": ["Company1", "Company2", "Company3", "Company4"]
  },
  "skills": {
    "trending": ["skill1", "skill2", "skill3"],
    "essential": ["skill1", "skill2", "skill3"],
    "emerging": ["skill1", "skill2", "skill3"]
  },
  "locations": {
    "topCities": ["San Francisco", "Seattle", "New York"],
    "remote": "High availability",
    "international": ["London", "Toronto", "Berlin"]
  },
  "trends": ["trend 1", "trend 2", "trend 3"],
  "recommendations": [
    {
      "type": "skills",
      "title": "Recommendation Title",
      "description": "Detailed description",
      "action": "Specific action to take"
    }
  ]
}

Base this on current 2024-2025 market conditions.`;

      const response = await callClaudeAPI(prompt, 2000);
      const insights = JSON.parse(response);
      
      setMarketInsights(insights);
      toast.success('Market insights generated!');
      
    } catch (error) {
      console.error('Error generating market insights:', error);
      toast.error('Failed to generate market insights.');
    } finally {
      setGeneratingInsights(false);
    }
  };

  // ============================================================================
  // ACTION PLAN - CLAUDE AI POWERED
  // ============================================================================

  const generateActionPlan = async () => {
    setGeneratingActionPlan(true);
    
    try {
      const topCareer = careerRecommendations[0];
      if (!topCareer) {
        toast.error('Please generate career recommendations first.');
        return;
      }

      const prompt = `Create a personalized action plan for ${userData.name} transitioning to ${topCareer.title}:

**Context:**
- Current Role: ${userData.currentRole}
- Experience: ${userData.experienceLevel}
- Timeline: ${userData.transitionTimeline}
- Time Available: ${userData.timeCommitment}
- Background: ${userData.studyField}

Generate 6-8 specific, actionable steps. Return ONLY JSON array:
[
  {
    "title": "Action Item Title",
    "text": "Detailed description of what to do and why",
    "timeline": "2-4 weeks",
    "priority": "high",
    "personalized": true,
    "resources": ["resource 1", "resource 2"],
    "icon": "🎓"
  }
]

Make each action specific, time-bound, and directly relevant to their transition goal.`;

      const response = await callClaudeAPI(prompt, 1500);
      const actions = JSON.parse(response);
      
      setActionPlan(actions);
      toast.success('Action plan generated!');
      
    } catch (error) {
      console.error('Error generating action plan:', error);
      toast.error('Failed to generate action plan.');
    } finally {
      setGeneratingActionPlan(false);
    }
  };

  // ============================================================================
  // ADDITIONAL CLAUDE AI GENERATIONS
  // ============================================================================

  const generateNetworkingStrategy = async () => {
    try {
      const topCareer = careerRecommendations[0];
      const prompt = `Create a networking strategy for someone transitioning to ${topCareer?.title}:

**User Profile:**
- Current: ${userData.currentRole}
- Target: ${topCareer?.title}
- Location Preference: ${userData.workPreference}
- Experience: ${userData.experienceLevel}

Return JSON array of networking strategies:
[
  {
    "text": "Specific networking action",
    "type": "strategy",
    "timeline": "timeline",
    "platforms": ["LinkedIn", "Twitter"],
    "why": "Why this helps"
  }
]

Focus on realistic, achievable networking actions.`;

      const response = await callClaudeAPI(prompt, 800);
      const strategies = JSON.parse(response);
      setNetworkingStrategy(strategies);
      
    } catch (error) {
      console.error('Error generating networking strategy:', error);
      setNetworkingStrategy([{
        text: 'Join professional associations and industry groups relevant to your target career',
        type: 'strategy'
      }]);
    }
  };

  // ============================================================================
  // PERSISTENCE AND AUTO-SAVE FUNCTIONALITY
  // ============================================================================

  // Save generated content to localStorage for persistence
  useEffect(() => {
    if (careerRecommendations.length > 0) {
      const contentData = {
        careerRecommendations,
        personalizedRoadmap,
        marketInsights,
        actionPlan,
        learningPlan,
        interviewQuestions,
        lastGenerated: new Date().toISOString(),
        userEmail: userData.email
      };
      localStorage.setItem('ai_generated_content', JSON.stringify(contentData));
    }
  }, [careerRecommendations, personalizedRoadmap, marketInsights, actionPlan, learningPlan, interviewQuestions, userData.email]);

  // Load persisted content on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('ai_generated_content');
    if (savedContent && !careerRecommendations.length) {
      try {
        const contentData = JSON.parse(savedContent);
        // Only restore if it's for the same user and within last 24 hours
        const lastGenerated = new Date(contentData.lastGenerated);
        const isRecent = (Date.now() - lastGenerated.getTime()) < 24 * 60 * 60 * 1000; // 24 hours
        const isSameUser = contentData.userEmail === userData.email;
        
        if (isRecent && isSameUser && contentData.careerRecommendations) {
          setCareerRecommendations(contentData.careerRecommendations);
          if (contentData.personalizedRoadmap) setPersonalizedRoadmap(contentData.personalizedRoadmap);
          if (contentData.marketInsights) setMarketInsights(contentData.marketInsights);
          if (contentData.actionPlan) setActionPlan(contentData.actionPlan);
          if (contentData.learningPlan) setLearningPlan(contentData.learningPlan);
          if (contentData.interviewQuestions) setInterviewQuestions(contentData.interviewQuestions);
          
          console.log('✅ Restored previously generated AI content');
        }
      } catch (error) {
        console.error('Error restoring saved content:', error);
        localStorage.removeItem('ai_generated_content');
      }
    }
  }, [userData.email, careerRecommendations.length]);

  // Clear saved content when user navigates to retake test
  const handleRetakeTest = () => {
    localStorage.removeItem('ai_generated_content');
    navigate('/career/test');
  };

  const generateCareerLearningPlan = async () => {
    setGeneratingLearning(true);
    
    try {
      const topCareer = careerRecommendations[0];
      if (!topCareer) {
        toast.error('Please generate career recommendations first.');
        return;
      }

      const prompt = `Create a comprehensive learning plan for someone transitioning to: ${topCareer.title}

**User Profile:**
- Current Role: ${userData.currentRole}
- Experience Level: ${userData.experienceLevel}
- Educational Background: ${userData.studyField} (${userData.educationLevel})
- Timeline: ${userData.transitionTimeline}
- Time Commitment: ${userData.timeCommitment}
- Current Tech Skills: ${userData.jobTechnologies}
- Interests: ${userData.interests.join(', ')}

Create a detailed learning plan with specific resources. Return ONLY JSON:
{
  "careerTitle": "${topCareer.title}",
  "totalDuration": "${userData.transitionTimeline}",
  "learningTracks": [
    {
      "category": "Foundation Skills",
      "priority": "High",
      "timeframe": "Month 1-2",
      "resources": [
        {
          "title": "Specific Course/Resource Name",
          "type": "Course" or "Book" or "Certification" or "Practice" or "Project",
          "provider": "Coursera/Udemy/FreeCodeCamp/etc",
          "duration": "4 weeks",
          "cost": "Free" or "$49" or "$199",
          "difficulty": "Beginner" or "Intermediate" or "Advanced",
          "description": "Why this resource is essential",
          "skills": ["skill1", "skill2", "skill3"]
        }
      ]
    }
  ],
  "practiceProjects": [
    {
      "title": "Project Name",
      "description": "What to build and why",
      "skills": ["skill1", "skill2"],
      "timeEstimate": "2-3 weeks",
      "difficulty": "Beginner" or "Intermediate" or "Advanced"
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "provider": "AWS/Google/Microsoft/etc",
      "cost": "$150",
      "timeToComplete": "2-4 weeks",
      "priority": "High" or "Medium" or "Low",
      "description": "Why this certification matters"
    }
  ],
  "communityResources": [
    {
      "name": "Community/Forum Name",
      "type": "Forum" or "Slack" or "Discord" or "Meetup",
      "description": "How this helps with learning",
      "url": "Optional URL if well-known"
    }
  ]
}

Make recommendations specific to their background and very actionable.`;

      const response = await callClaudeAPI(prompt, 2500);
      const learningPlan = JSON.parse(response);
      
      setLearningPlan(learningPlan);
      toast.success('Learning plan generated!');
      
    } catch (error) {
      console.error('Error generating learning plan:', error);
      toast.error('Failed to generate learning plan.');
    } finally {
      setGeneratingLearning(false);
    }
  };

  // ============================================================================
  // CAREER-SPECIFIC INTERVIEW QUESTIONS
  // ============================================================================

  const generateInterviewQuestions = async () => {
    setGeneratingInterviews(true);
    
    try {
      const topCareer = careerRecommendations[0];
      if (!topCareer) {
        toast.error('Please generate career recommendations first.');
        return;
      }

      const prompt = `Generate comprehensive interview questions for ${topCareer.title} positions:

**Context:**
- Target Role: ${topCareer.title}
- Candidate Background: ${userData.currentRole} transitioning to tech
- Experience Level: ${userData.experienceLevel}
- Educational Background: ${userData.studyField}
- Technical Skills: ${userData.jobTechnologies}

Create interview questions covering all aspects. Return ONLY JSON:
{
  "careerTitle": "${topCareer.title}",
  "categories": [
    {
      "category": "Technical Questions",
      "description": "Core technical skills assessment",
      "questions": [
        {
          "question": "Specific technical question",
          "type": "Technical",
          "difficulty": "Entry" or "Mid" or "Senior",
          "topic": "Programming/Data/Design/etc",
          "sampleAnswer": "Brief guidance on how to approach this question",
          "keyPoints": ["point1", "point2", "point3"]
        }
      ]
    },
    {
      "category": "Behavioral Questions",
      "description": "Assessing soft skills and fit",
      "questions": [
        {
          "question": "Behavioral question",
          "type": "Behavioral",
          "difficulty": "Standard",
          "topic": "Leadership/Communication/Problem-solving",
          "sampleAnswer": "STAR method guidance",
          "keyPoints": ["what interviewers look for"]
        }
      ]
    },
    {
      "category": "Career Transition Questions",
      "description": "Questions specific to career changers",
      "questions": [
        {
          "question": "Why are you transitioning from ${userData.currentRole} to ${topCareer.title}?",
          "type": "Transition",
          "difficulty": "Standard",
          "topic": "Career Change",
          "sampleAnswer": "How to frame your transition positively",
          "keyPoints": ["emphasize transferable skills", "show passion for tech"]
        }
      ]
    },
    {
      "category": "Situational Questions",
      "description": "Real-world scenario questions",
      "questions": [
        {
          "question": "Situational question",
          "type": "Situational",
          "difficulty": "Standard",
          "topic": "Problem-solving",
          "sampleAnswer": "Approach to solve the situation",
          "keyPoints": ["key considerations"]
        }
      ]
    }
  ],
  "preparationTips": [
    {
      "tip": "Specific preparation advice",
      "category": "Technical" or "Behavioral" or "General"
    }
  ],
  "commonMistakes": [
    {
      "mistake": "What not to do",
      "correction": "What to do instead"
    }
  ]
}

Focus on questions that are realistic for someone transitioning from ${userData.currentRole} to ${topCareer.title}.`;

      const response = await callClaudeAPI(prompt, 2500);
      const questions = JSON.parse(response);
      
      setInterviewQuestions(questions);
      toast.success('Interview questions generated!');
      
    } catch (error) {
      console.error('Error generating interview questions:', error);
      toast.error('Failed to generate interview questions.');
    } finally {
      setGeneratingInterviews(false);
    }
  };

  // ============================================================================
  // FALLBACK DATA
  // ============================================================================

  const getFallbackRecommendations = () => [
    {
      title: 'Software Developer',
      match: 85,
      description: 'Build applications and systems using programming languages',
      whyGoodFit: 'Strong technical background and problem-solving skills',
      keySkills: ['Programming', 'Web Development', 'Database Management'],
      salaryRange: '$75k - $150k',
      demandLevel: 'Very High',
      entryPath: 'Learn programming fundamentals and build portfolio projects'
    },
    {
      title: 'Data Analyst',
      match: 78,
      description: 'Analyze data to help businesses make informed decisions',
      whyGoodFit: 'Analytical thinking and attention to detail',
      keySkills: ['SQL', 'Data Visualization', 'Statistics'],
      salaryRange: '$65k - $120k',
      demandLevel: 'High',
      entryPath: 'Learn SQL and data analysis tools like Excel and Tableau'
    }
  ];

  // ============================================================================
  // MAIN DATA LOADING
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        let processedUserData = null;
        
        if (location.state?.formData) {
          const formData = location.state.formData;
          
          processedUserData = {
            name: formData.fullName,
            email: formData.email,
            experienceLevel: formData.experienceLevel,
            studyField: formData.studyField || 'Not specified',
            educationLevel: formData.educationLevel || 'Not specified',
            currentRole: formData.currentRole || 'Not specified',
            yearsExperience: formData.yearsExperience || 'Not specified',
            jobResponsibilities: formData.jobResponsibilities || 'Not specified',
            jobProjects: formData.jobProjects || 'Not specified',
            jobTechnologies: formData.jobTechnologies || 'Not specified',
            publications: formData.publications || 'Not specified',
            transferableSkills: formData.transferableSkills || 'Not specified',
            interests: typeof formData.techInterests === 'string' 
              ? formData.techInterests.split(',').map(i => i.trim()) 
              : (Array.isArray(formData.techInterests) ? formData.techInterests : []),
            careerPathsInterest: formData.careerPathsInterest || [],
            toolsUsed: formData.toolsUsed || [],
            techInterests: formData.techInterests || '',
            timeCommitment: formData.timeCommitment || '',
            targetSalary: formData.targetSalary || '',
            workPreference: formData.workPreference || '',
            transitionTimeline: formData.transitionTimeline || ''
          };
          
          setUserData(processedUserData);
          setAnalysis(location.state.analysis || '');
          
          // Generate initial career recommendations
          await generateCareerRecommendations(processedUserData);
          
        } else {
          // Load from storage
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              processedUserData = {
                name: submission.fullName,
                email: submission.email,
                experienceLevel: submission.experienceLevel,
                studyField: submission.studyField || 'Not specified',
                educationLevel: submission.educationLevel || 'Not specified',
                currentRole: submission.currentRole || 'Not specified',
                yearsExperience: submission.yearsExperience || 'Not specified',
                jobResponsibilities: submission.jobResponsibilities || 'Not specified',
                jobProjects: submission.jobProjects || 'Not specified',
                jobTechnologies: submission.jobTechnologies || 'Not specified',
                publications: submission.publications || 'Not specified',
                transferableSkills: submission.transferableSkills || 'Not specified',
                interests: typeof submission.techInterests === 'string' 
                  ? submission.techInterests.split(',').map(i => i.trim()) 
                  : (Array.isArray(submission.techInterests) ? submission.techInterests : []),
                careerPathsInterest: submission.careerPathsInterest || [],
                toolsUsed: submission.toolsUsed || [],
                techInterests: submission.techInterests || '',
                timeCommitment: submission.timeCommitment || '',
                targetSalary: submission.targetSalary || '',
                workPreference: submission.workPreference || '',
                transitionTimeline: submission.transitionTimeline || ''
              };
              
              setUserData(processedUserData);
              setAnalysis(storedAnalysis.analysis);
              
              // Generate career recommendations from stored data
              await generateCareerRecommendations(processedUserData);
            }
          } else {
            navigate('/career/test', { 
              state: { message: 'Please complete the assessment to view your dashboard' } 
            });
            return;
          }
        }
        
      } catch (error) {
        console.error('❌ Error loading dashboard data:', error);
        navigate('/career/test', { 
          state: { message: 'Error loading your results. Please try again.' } 
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [location, navigate]);

  // Generate additional AI content when career recommendations are ready
  useEffect(() => {
    if (careerRecommendations.length > 0) {
      generateNetworkingStrategy();
    }
  }, [careerRecommendations]);

  // ============================================================================
  // UI COMPONENTS
  // ============================================================================

  const CareerRecommendationCard = ({ career, index, isTop }) => (
    <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
      isTop ? 'border-l-4 border-green-500 ring-2 ring-green-100' : 'border-l-4 border-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="text-3xl mr-3">
            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '💼'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{career.title}</h3>
            <p className="text-sm text-gray-600">{career.demandLevel} Demand</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">{career.match}%</div>
          <div className="text-sm text-gray-500">Match</div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{career.description}</p>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Why This Fits You:</h4>
        <p className="text-sm text-gray-600">{career.whyGoodFit}</p>
      </div>
      
      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-2">Key Skills Needed:</h4>
        <div className="flex flex-wrap gap-2">
          {career.keySkills.map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700">Salary Range:</span>
          <div className="text-green-600 font-semibold">{career.salaryRange}</div>
        </div>
        <div>
          <span className="font-medium text-gray-700">Entry Path:</span>
          <div className="text-gray-600">{career.entryPath}</div>
        </div>
      </div>
      
      {isTop && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center">
            <span className="text-green-600 mr-2">⭐</span>
            <span className="text-green-800 font-medium">Top Recommendation - Generate roadmap below!</span>
          </div>
        </div>
      )}
    </div>
  );

  const ActionCard = ({ step, index }) => {
    const priorityColors = {
      high: 'from-red-500 to-pink-500',
      medium: 'from-lime-500 to-green-500',
      low: 'from-gray-500 to-gray-600'
    };

    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        step.personalized ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{step.icon}</span>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{step.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{step.timeline}</p>
                {step.personalized && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    AI-Generated
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${priorityColors[step.priority || 'medium']} text-white`}>
            {(step.priority || 'MEDIUM').toUpperCase()}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">{step.text}</p>
        
        {step.resources && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">Recommended Resources:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {step.resources.slice(0, 2).map((resource, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Market Insights Components (same as before but now AI-generated)
  const MarketOverviewCard = ({ overview, careerTitle }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Market Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${
            overview.demandLevel === 'Very High' ? 'text-green-600' : 
            overview.demandLevel === 'High' ? 'text-lime-600' : 'text-yellow-600'
          }`}>
            {overview.demandLevel}
          </div>
          <div className="text-sm text-gray-600">Demand Level</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold mb-1 text-green-600">{overview.growthProjection}</div>
          <div className="text-sm text-gray-600">Growth Rate</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${
            overview.competitionLevel === 'High' ? 'text-orange-600' : 
            overview.competitionLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {overview.competitionLevel}
          </div>
          <div className="text-sm text-gray-600">Competition</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold mb-1 ${
            overview.entryBarrier === 'High' ? 'text-red-600' : 
            overview.entryBarrier === 'Medium' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {overview.entryBarrier}
          </div>
          <div className="text-sm text-gray-600">Entry Barrier</div>
        </div>
      </div>
    </div>
  );

  // Handle feedback form changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit feedback to Google Form
  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    
    try {
      const formData = new FormData();
      formData.append('entry.162050771', feedbackData.rating);
      formData.append('entry.2083196363', feedbackData.improvements);
      
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      toast.success('Thank you for your feedback!');
      setShowFeedbackForm(false);
      setFeedbackData({
        rating: '',
        improvements: ''
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your AI-powered career analysis..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      {/* Enhanced Header - Green Theme */}
      <div className="bg-gradient-to-r from-green-600 via-lime-500 to-green-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Your AI-powered career recommendations and insights
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole !== 'Not specified' && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Currently: {userData.currentRole}
                </div>
              )}
              {careerRecommendations.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Top Match: {careerRecommendations[0].title} ({careerRecommendations[0].match}%)
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Timeline: {userData.transitionTimeline}
                </div>
              )}
              <div className="bg-purple-400 bg-opacity-30 px-4 py-2 rounded-full border border-purple-300">
                🤖 AI Powered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex justify-center overflow-x-auto">
            {[
              { id: 'home', label: '🏠 Home', action: () => navigate('/') },
              { id: 'paths', label: '🤖 AI Career Paths' },
              { id: 'roadmap', label: '🗺️ Career Roadmap' },
              { id: 'market', label: '📊 Market Insights' },
              { id: 'action', label: '⚡ Action Plan' },
              { id: 'resources', label: '📚 Resources'},
              { id: 'retake', label: '🔄 Retake', action: handleRetakeTest }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => tab.action ? tab.action() : setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  tab.id === 'home' || tab.id === 'retake'
                    ? 'border-transparent text-gray-600 hover:text-green-600 hover:bg-green-50'
                    : activeTab === tab.id
                    ? 'border-green-600 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="container mx-auto px-6 py-8">
        
        {/* AI Career Paths Tab */}
        {activeTab === 'paths' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">AI Career Recommendations</h2>
              <p className="text-gray-600 text-lg">Personalized career paths based on your complete profile analysis</p>
              
              {generatingRecommendations && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                  <span className="text-green-600">AI is analyzing your profile...</span>
                </div>
              )}
            </div>

            {careerRecommendations.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {careerRecommendations.map((career, index) => (
                    <CareerRecommendationCard 
                      key={index} 
                      career={career} 
                      index={index} 
                      isTop={index === 0}
                    />
                  ))}
                </div>
                
                {/* Download Button for Career Recommendations */}
                <div className="text-center mt-6">
                  <button
                    onClick={downloadCareerRecommendations}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all font-medium inline-flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Career Recommendations (PDF)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Generating AI Recommendations</h3>
                <p className="text-gray-500">AI is analyzing your profile to create personalized career recommendations.</p>
              </div>
            )}
          </div>
        )}

        {/* Career Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">AI Career Roadmap</h2>
              <p className="text-gray-600 text-lg">Personalized step-by-step plan generated by AI</p>
            </div>

            {!personalizedRoadmap ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🗺️</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Generate Your AI Roadmap</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    AI will create a detailed, personalized roadmap for your career transition to{' '}
                    <span className="font-semibold text-green-600">
                      {careerRecommendations[0]?.title || 'your selected career'}
                    </span>.
                  </p>
                  
                  <button
                    onClick={generatePersonalizedRoadmap}
                    disabled={generatingRoadmap || careerRecommendations.length === 0}
                    className="bg-gradient-to-r from-green-500 to-lime-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-lime-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    {generatingRoadmap ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>AI is creating your roadmap...</span>
                      </div>
                    ) : (
                      '🤖 Generate AI Roadmap'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Roadmap display - same UI as before but now AI-generated content */}
                <div className="bg-gradient-to-r from-green-500 to-lime-600 text-white rounded-xl p-6 mb-8 shadow-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Your AI Roadmap</h2>
                    <p className="text-green-100 mb-4">Tailored path to become a {personalizedRoadmap.careerTitle}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white bg-opacity-20 rounded-lg p-4">
                        <div className="text-2xl font-bold">{personalizedRoadmap.matchScore}%</div>
                        <div className="text-sm text-green-100">Career Match</div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-lg p-4">
                        <div className="text-2xl font-bold">{personalizedRoadmap.totalDuration}</div>
                        <div className="text-sm text-green-100">Timeline</div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-lg p-4">
                        <div className="text-2xl font-bold">{personalizedRoadmap.weeklyCommitment}</div>
                        <div className="text-sm text-green-100">Weekly Time</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Roadmap phases display */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Your AI-Generated Phases</h3>
                  <div className="space-y-6">
                    {personalizedRoadmap.phases.map((phase, index) => (
                      <div key={index} className="relative">
                        {index < personalizedRoadmap.phases.length - 1 && (
                          <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-green-500 to-lime-500 opacity-30"></div>
                        )}
                        
                        <div className="flex items-start space-x-4 mb-8">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-lime-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          
                          <div className="flex-grow bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{phase.title}</h3>
                                <p className="text-green-600 font-medium">{phase.timeline}</p>
                              </div>
                              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                🤖 AI Generated
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{phase.description}</p>
                            
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-800 mb-3">Key Milestones:</h4>
                              <div className="space-y-2">
                                {phase.milestones.map((milestone, idx) => (
                                  <div key={idx} className="flex items-start space-x-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-700">{milestone}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {phase.skills && phase.skills.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                  <span className="mr-2">🎯</span>Skills to Learn
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {phase.skills.map((skill, idx) => (
                                    <div 
                                      key={idx}
                                      className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-100"
                                    >
                                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                      <span className="text-green-800 text-sm font-medium">{skill}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Market Insights Tab */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">AI Market Insights</h2>
              <p className="text-gray-600 text-lg">Real-time market intelligence generated by AI</p>
            </div>

            {!marketInsights ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Generate Market Intelligence</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    AI will analyze current market trends, salary data, and opportunities for{' '}
                    <span className="font-semibold text-blue-600">
                      {careerRecommendations[0]?.title || 'your selected career'}
                    </span>.
                  </p>
                  
                  <button
                    onClick={generateMarketInsights}
                    disabled={generatingInsights || careerRecommendations.length === 0}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    {generatingInsights ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>AI is analyzing market data...</span>
                      </div>
                    ) : (
                      '🤖 Generate AI Market Insights'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Market insights display - same UI structure but now AI-generated */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">AI Market Analysis: {marketInsights.careerTitle}</h2>
                    <p className="text-blue-100 mb-4">
                      AI-generated insights • Updated {marketInsights.lastUpdated}
                    </p>
                  </div>
                </div>

                <MarketOverviewCard overview={marketInsights.overview} careerTitle={marketInsights.careerTitle} />
                {/* Add other market insight components here as needed */}
              </div>
            )}
          </div>
        )}

        {/* Action Plan Tab */}
        {activeTab === 'action' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Claude AI Action Plan</h2>
              <p className="text-gray-600 text-lg">Personalized next steps generated by Claude AI</p>
              
              {actionPlan.length === 0 && careerRecommendations.length > 0 && (
                <button
                  onClick={generateActionPlan}
                  disabled={generatingActionPlan}
                  className="mt-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  {generatingActionPlan ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating Action Plan...</span>
                    </div>
                  ) : (
                    '🤖 Generate AI Action Plan'
                  )}
                </button>
              )}
            </div>
            
            {actionPlan.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {actionPlan.map((step, index) => (
                    <ActionCard key={index} step={step} index={index} />
                  ))}
                </div>
                
                {/* Download Button for Action Plan */}
                <div className="text-center mt-6">
                  <button
                    onClick={downloadActionPlan}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all font-medium inline-flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Action Plan (PDF)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for Your Action Plan?</h3>
                <p className="text-gray-500">Generate personalized next steps with AI.</p>
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">AI Learning Resources</h2>
              <p className="text-gray-600 text-lg">Personalized learning recommendations powered by AI</p>
            </div>
            
            {/* Quick Actions Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <button 
                  onClick={() => navigate('/career/learning')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-lime-500 to-green-600 text-white rounded-lg hover:from-lime-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">📚</span>
                  <span className="text-sm font-medium">Learning</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/interviews')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">💬</span>
                  <span className="text-sm font-medium">Interviews</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/guide')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg hover:from-teal-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">📖</span>
                  <span className="text-sm font-medium">Guide</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/portfolioplatforms')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-lg hover:from-yellow-600 hover:to-green-600 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">🚀</span>
                  <span className="text-sm font-medium">Projects</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/mentorshipsection')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-purple-500 to-green-500 text-white rounded-lg hover:from-purple-600 hover:to-green-600 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">🤝</span>
                  <span className="text-sm font-medium">Mentorship</span>
                </button>
              </div>
            </div>

            {/* AI-Generated Learning Plan */}
            {!learningPlan ? (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-2">📚</span>
                  Career-Specific Learning Plan
                </h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Generate Your Learning Plan</h4>
                  <p className="text-gray-600 mb-4">
                    Get a detailed learning roadmap with specific courses, books, certifications, and projects for{' '}
                    <span className="font-semibold text-green-600">
                      {careerRecommendations[0]?.title || 'your career goal'}
                    </span>.
                  </p>
                  
                  <button
                    onClick={generateCareerLearningPlan}
                    disabled={generatingLearning || careerRecommendations.length === 0}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    {generatingLearning ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>AI is creating your learning plan...</span>
                      </div>
                    ) : (
                      '🤖 Generate Learning Plan'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-2">📚</span>
                  Your AI Learning Plan: {learningPlan.careerTitle}
                </h3>
                
                {/* Learning Tracks */}
                <div className="space-y-6">
                  {learningPlan.learningTracks.map((track, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-lg text-gray-800">{track.category}</h4>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            track.priority === 'High' ? 'bg-red-100 text-red-700' :
                            track.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {track.priority} Priority
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {track.timeframe}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {track.resources.map((resource, resIdx) => (
                          <div key={resIdx} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-800">{resource.title}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                resource.cost === 'Free' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {resource.cost}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {resource.skills.slice(0, 3).map((skill, skillIdx) => (
                                <span key={skillIdx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-gray-500">
                              {resource.provider} • {resource.duration} • {resource.difficulty}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Practice Projects */}
                {learningPlan.practiceProjects && learningPlan.practiceProjects.length > 0 && (
                  <div className="mt-6 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg text-gray-800 mb-3">Practice Projects</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {learningPlan.practiceProjects.map((project, idx) => (
                        <div key={idx} className="p-3 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-gray-800 mb-2">{project.title}</h5>
                          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                          <div className="text-xs text-gray-500">
                            {project.timeEstimate} • {project.difficulty}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Download Button for Interview Questions */}
                <div className="text-center mt-6">
                  <button
                    onClick={downloadInterviewQuestions}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all font-medium inline-flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Interview Questions</span>
                  </button>
                </div>
                
                {/* Download Button for Learning Plan */}
                <div className="text-center mt-6">
                  <button
                    onClick={downloadLearningPlan}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all font-medium inline-flex items-center space-x-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Learning Plan (PDF)</span>
                  </button>
                </div>

                {/* Certifications */}
                {learningPlan.certifications && learningPlan.certifications.length > 0 && (
                  <div className="mt-6 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-lg text-gray-800 mb-3">Recommended Certifications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {learningPlan.certifications.map((cert, idx) => (
                        <div key={idx} className="p-3 bg-yellow-50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-800">{cert.name}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              cert.priority === 'High' ? 'bg-red-100 text-red-700' :
                              cert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {cert.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{cert.description}</p>
                          <div className="text-xs text-gray-500">
                            {cert.provider} • {cert.cost} • {cert.timeToComplete}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* AI-Generated Interview Questions */}
            {!interviewQuestions ? (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-2">💬</span>
                  Career-Specific Interview Prep
                </h3>
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎤</div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Generate Interview Questions</h4>
                  <p className="text-gray-600 mb-4">
                    Get comprehensive interview questions and answers specifically for{' '}
                    <span className="font-semibold text-green-600">
                      {careerRecommendations[0]?.title || 'your career goal'}
                    </span>{' '}
                    positions, including technical, behavioral, and transition-specific questions.
                  </p>
                  
                  <button
                    onClick={generateInterviewQuestions}
                    disabled={generatingInterviews || careerRecommendations.length === 0}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    {generatingInterviews ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>AI is creating interview questions...</span>
                      </div>
                    ) : (
                      '🤖 Generate Interview Prep'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-2">💬</span>
                  Your AI Interview Prep: {interviewQuestions.careerTitle}
                </h3>
                
                {/* Interview Question Categories */}
                <div className="space-y-6">
                  {interviewQuestions.categories.map((category, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-lg text-gray-800 mb-2">{category.category}</h4>
                      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                      
                      <div className="space-y-4">
                        {category.questions.slice(0, 3).map((q, qIdx) => (
                          <div key={qIdx} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-800 pr-4">{q.question}</h5>
                              <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${
                                q.difficulty === 'Entry' ? 'bg-green-100 text-green-700' :
                                q.difficulty === 'Mid' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {q.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Approach:</strong> {q.sampleAnswer}
                            </p>
                            <div className="text-xs text-gray-500">
                              <strong>Key Points:</strong> {q.keyPoints.join(', ')}
                            </div>
                          </div>
                        ))}
                        {category.questions.length > 3 && (
                          <div className="text-center">
                            <span className="text-sm text-gray-500">
                              + {category.questions.length - 3} more questions in this category
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preparation Tips */}
                {interviewQuestions.preparationTips && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">💡 Preparation Tips</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {interviewQuestions.preparationTips.map((tip, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          <span className="text-blue-600 mr-2">•</span>
                          {tip.tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Common Mistakes */}
                {interviewQuestions.commonMistakes && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">⚠️ Common Mistakes to Avoid</h4>
                    <div className="space-y-2">
                      {interviewQuestions.commonMistakes.slice(0, 3).map((mistake, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="text-red-700">❌ {mistake.mistake}</div>
                          <div className="text-green-700">✅ {mistake.correction}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Download Button for Interview Questions - Positioned at Bottom */}
                <div className="mt-8 text-center">
                  <button
                    onClick={downloadInterviewQuestions}
                    className="bg-green-500 text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-all font-semibold text-lg inline-flex items-center space-x-2 shadow-lg transform hover:scale-105"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Complete Interview Guide (PDF)</span>
                  </button>
                </div>
              </div>
            )}

            {/* AI-Generated Learning Resources */}
            {learningResources.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-2">🤖</span>
                  AI-Recommended Learning Path
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningResources.map((resource, idx) => (
                    <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{resource.text}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {resource.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Type: {resource.type}</p>
                      {resource.timeRequired && (
                        <p className="text-sm text-gray-500">Time: {resource.timeRequired}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-lime-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group z-50"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Enhanced Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-lime-600 bg-clip-text text-transparent">Your Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={submitFeedback} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience with AI career recommendations?
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleFeedbackChange({ target: { name: 'rating', value: value.toString() } })}
                        className={`w-14 h-14 rounded-full border-2 transition-all transform hover:scale-110 ${
                          feedbackData.rating === value.toString()
                            ? 'bg-gradient-to-r from-green-500 to-lime-600 text-white border-green-500 shadow-lg'
                            : 'border-gray-300 hover:border-green-500 hover:shadow-md'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How can we improve the AI career dashboard?
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackData.improvements}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="Tell us about your experience with AI recommendations..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-gradient-to-r from-green-500 to-lime-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-lime-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none font-medium"
                  >
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Indicators */}
      {careerRecommendations.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-purple-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-40">
          <div>🤖 {careerRecommendations.length} AI recommendations generated</div>
          {contentTimestamp && (
            <div className="text-xs opacity-75">
              Last updated: {contentTimestamp.toLocaleString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
