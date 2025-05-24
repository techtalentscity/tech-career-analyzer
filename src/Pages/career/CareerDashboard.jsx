// CareerDashboard.jsx - FULLY CLAUDE AI-POWERED VERSION
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
  // CLAUDE API INTEGRATION FUNCTIONS
  // ============================================================================

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

  const generateInterviewPrep = async () => {
    try {
      const topCareer = careerRecommendations[0];
      const prompt = `Create interview preparation guidance for ${topCareer?.title} roles:

**User Context:**
- Target Role: ${topCareer?.title}
- Current Experience: ${userData.experienceLevel}
- Background: ${userData.studyField}
- Technical Skills: ${userData.jobTechnologies}

Return JSON array of interview prep items:
[
  {
    "text": "Specific interview preparation action",
    "type": "tip",
    "category": "Technical" or "Behavioral" or "General",
    "difficulty": "Beginner" or "Intermediate" or "Advanced"
  }
]

Include technical questions, behavioral questions, and presentation tips.`;

      const response = await callClaudeAPI(prompt, 800);
      const prep = JSON.parse(response);
      setInterviewPrep(prep);
      
    } catch (error) {
      console.error('Error generating interview prep:', error);
      setInterviewPrep([{
        text: 'Practice coding challenges and technical questions relevant to your target role',
        type: 'tip'
      }]);
    }
  };

  const generateLearningResources = async () => {
    try {
      const topCareer = careerRecommendations[0];
      const prompt = `Recommend learning resources for transitioning to ${topCareer?.title}:

**User Profile:**
- Target: ${topCareer?.title}
- Experience: ${userData.experienceLevel}
- Timeline: ${userData.transitionTimeline}
- Interests: ${userData.interests.join(', ')}
- Time Available: ${userData.timeCommitment}

Return JSON array of learning recommendations:
[
  {
    "text": "Specific learning resource or action",
    "type": "course" or "book" or "practice" or "certification",
    "category": "category name",
    "difficulty": "Beginner" or "Intermediate" or "Advanced",
    "timeRequired": "estimated time"
  }
]

Focus on the most effective resources for their level and timeline.`;

      const response = await callClaudeAPI(prompt, 800);
      const resources = JSON.parse(response);
      setLearningResources(resources);
      
    } catch (error) {
      console.error('Error generating learning resources:', error);
      setLearningResources([{
        text: 'Focus on building practical projects that demonstrate your skills to potential employers',
        type: 'practice',
        category: 'Portfolio Building'
      }]);
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
      generateInterviewPrep();
      generateLearningResources();
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
    return <LoadingSpinner message="Loading your Claude AI-powered career analysis..." />;
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
              Your Claude AI-powered career recommendations and insights
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
                🤖 Claude AI Powered
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
              { id: 'retake', label: '🔄 Retake', action: () => navigate('/career/test') }
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
              <h2 className="text-3xl font-bold mb-4">Claude AI Career Recommendations</h2>
              <p className="text-gray-600 text-lg">Personalized career paths based on your complete profile analysis</p>
              
              {generatingRecommendations && (
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
                  <span className="text-green-600">Claude AI is analyzing your profile...</span>
                </div>
              )}
            </div>

            {careerRecommendations.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Generating AI Recommendations</h3>
                <p className="text-gray-500">Claude AI is analyzing your profile to create personalized career recommendations.</p>
              </div>
            )}
          </div>
        )}

        {/* Career Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Claude AI Career Roadmap</h2>
              <p className="text-gray-600 text-lg">Personalized step-by-step plan generated by Claude AI</p>
            </div>

            {!personalizedRoadmap ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🗺️</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Generate Your AI Roadmap</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Claude AI will create a detailed, personalized roadmap for your career transition to{' '}
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
                        <span>Claude AI is creating your roadmap...</span>
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
                    <h2 className="text-2xl font-bold mb-2">Your Claude AI Roadmap</h2>
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
              <h2 className="text-3xl font-bold mb-4">Claude AI Market Insights</h2>
              <p className="text-gray-600 text-lg">Real-time market intelligence generated by Claude AI</p>
            </div>

            {!marketInsights ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Generate Market Intelligence</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Claude AI will analyze current market trends, salary data, and opportunities for{' '}
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
                        <span>Claude AI is analyzing market data...</span>
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
                    <h2 className="text-2xl font-bold mb-2">Claude AI Market Analysis: {marketInsights.careerTitle}</h2>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actionPlan.map((step, index) => (
                  <ActionCard key={index} step={step} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready for Your Action Plan?</h3>
                <p className="text-gray-500">Generate personalized next steps with Claude AI.</p>
              </div>
            )}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Claude AI Learning Resources</h2>
              <p className="text-gray-600 text-lg">Personalized learning recommendations powered by Claude AI</p>
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
                    How would you rate your experience with Claude AI career recommendations?
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
                    How can we improve the Claude AI career dashboard?
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackData.improvements}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="Tell us about your experience with Claude AI recommendations..."
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
          🤖 {careerRecommendations.length} Claude AI recommendations generated
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
