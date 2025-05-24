// CareerDashboard.jsx - ENHANCED WITH PERSONALIZED CAREER ROADMAP
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

// Import the hybrid ML components
import {
  MLEnhancedCareerCard,
  MLInsightsDashboard, 
  HybridRecommendationsDisplay
} from './HybridMLComponents';

// Import the hybrid recommendation engine
import { generateHybridCareerRecommendations } from './HybridMLRecommendations';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
  const [careerPaths, setCareerPaths] = useState([]);
  const [networkingStrategy, setNetworkingStrategy] = useState([]);
  const [personalBranding, setPersonalBranding] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState([]);
  const [portfolioGuidance, setPortfolioGuidance] = useState([]);
  const [jobSearchStrategies, setJobSearchStrategies] = useState([]);
  const [careerGrowthResources, setCareerGrowthResources] = useState([]);
  const [careerPathVisualizations, setCareerPathVisualizations] = useState([]);
  const [activeTab, setActiveTab] = useState('paths'); // Default to paths instead of overview
  
  // NEW: Roadmap states
  const [personalizedRoadmap, setPersonalizedRoadmap] = useState(null);
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  
  // NEW: Market Insights states
  const [marketInsights, setMarketInsights] = useState(null);
  const [generatingInsights, setGeneratingInsights] = useState(false);
  
  // ENHANCED: Complete recommendation states combining ML + Authentic approaches
  const [hybridResults, setHybridResults] = useState(null);
  const [mlInsights, setMLInsights] = useState(null);
  const [authenticPaths, setAuthenticPaths] = useState([]);
  const [careerRecommendations, setCareerRecommendations] = useState({ 
    primary: [], 
    inferred: [], 
    adjacent: [],
    mlDiscovered: [],
    authentic: []
  });
  
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
  // NEW: MARKET INSIGHTS GENERATOR
  // ============================================================================

  const generateMarketInsights = async () => {
    setGeneratingInsights(true);
    
    try {
      // Get the top career recommendation
      const topCareer = hybridResults?.allRecommendations?.[0] || careerPaths[0];
      
      if (!topCareer) {
        toast.error('No career recommendations found. Please retake the assessment.');
        return;
      }

      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      const insights = createMarketInsights(topCareer, userData);
      setMarketInsights(insights);
      
      toast.success('Market insights generated successfully!');
      
    } catch (error) {
      console.error('Error generating market insights:', error);
      toast.error('Failed to generate market insights. Please try again.');
    } finally {
      setGeneratingInsights(false);
    }
  };

  const createMarketInsights = (topCareer, userData) => {
    const careerTitle = topCareer.title;
    const userLocation = userData.workPreference || 'Remote/Flexible';
    
    // Get career-specific market data
    const marketData = getCareerMarketData(careerTitle);
    
    return {
      careerTitle: careerTitle,
      matchScore: topCareer.hybridScore || topCareer.match,
      lastUpdated: new Date().toLocaleDateString(),
      overview: {
        demandLevel: marketData.demandLevel,
        growthProjection: marketData.growthProjection,
        competitionLevel: marketData.competitionLevel,
        entryBarrier: marketData.entryBarrier
      },
      salary: {
        entry: marketData.salary.entry,
        mid: marketData.salary.mid,
        senior: marketData.salary.senior,
        topPercentile: marketData.salary.topPercentile
      },
      jobMarket: {
        totalJobs: marketData.jobMarket.totalJobs,
        newJobsMonthly: marketData.jobMarket.newJobsMonthly,
        remotePercentage: marketData.jobMarket.remotePercentage,
        topCompanies: marketData.jobMarket.topCompanies
      },
      skills: {
        trending: marketData.skills.trending,
        essential: marketData.skills.essential,
        emerging: marketData.skills.emerging,
        declining: marketData.skills.declining
      },
      locations: {
        topCities: marketData.locations.topCities,
        remote: marketData.locations.remote,
        international: marketData.locations.international
      },
      trends: marketData.trends,
      recommendations: generateMarketRecommendations(careerTitle, userData)
    };
  };

  const getCareerMarketData = (careerTitle) => {
    const marketDatabase = {
      'Data Scientist': {
        demandLevel: 'Very High',
        growthProjection: '+22% (2023-2033)',
        competitionLevel: 'High',
        entryBarrier: 'Medium-High',
        salary: {
          entry: '$85,000 - $120,000',
          mid: '$120,000 - $160,000', 
          senior: '$160,000 - $220,000',
          topPercentile: '$250,000+'
        },
        jobMarket: {
          totalJobs: '156,000+ active positions',
          newJobsMonthly: '12,000+ new openings',
          remotePercentage: '78%',
          topCompanies: ['Google', 'Amazon', 'Microsoft', 'Netflix', 'Meta', 'Apple', 'Tesla', 'Uber']
        },
        skills: {
          trending: ['LLMs & AI', 'MLOps', 'Cloud ML Platforms', 'Real-time Analytics'],
          essential: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
          emerging: ['Generative AI', 'Edge ML', 'Federated Learning', 'AutoML'],
          declining: ['Traditional BI Tools', 'Basic Excel Analysis']
        },
        locations: {
          topCities: ['San Francisco', 'Seattle', 'New York', 'Austin', 'Boston'],
          remote: 'High availability (78% remote-friendly)',
          international: ['London', 'Toronto', 'Berlin', 'Singapore', 'Tel Aviv']
        },
        trends: [
          'AI/ML integration in every industry',
          'Increased focus on ethical AI',
          'Real-time decision making systems',
          'Growing demand for domain expertise',
          'Shift towards MLOps and production ML'
        ]
      },
      'Software Developer': {
        demandLevel: 'Very High',
        growthProjection: '+25% (2023-2033)',
        competitionLevel: 'Medium-High',
        entryBarrier: 'Medium',
        salary: {
          entry: '$75,000 - $110,000',
          mid: '$110,000 - $150,000',
          senior: '$150,000 - $200,000',
          topPercentile: '$230,000+'
        },
        jobMarket: {
          totalJobs: '1.4M+ active positions',
          newJobsMonthly: '85,000+ new openings',
          remotePercentage: '72%',
          topCompanies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Salesforce', 'Adobe']
        },
        skills: {
          trending: ['AI Integration', 'Cloud Native', 'Microservices', 'DevOps'],
          essential: ['JavaScript', 'Python', 'React', 'Git', 'Databases', 'APIs'],
          emerging: ['WebAssembly', 'Edge Computing', 'Serverless', 'Low-code/No-code'],
          declining: ['jQuery', 'Monolithic Architecture', 'Legacy PHP']
        },
        locations: {
          topCities: ['San Francisco', 'Seattle', 'Austin', 'Denver', 'Atlanta'],
          remote: 'High availability (72% remote-friendly)',
          international: ['London', 'Berlin', 'Amsterdam', 'Toronto', 'Sydney']
        },
        trends: [
          'AI-assisted development tools',
          'Increased focus on cybersecurity',
          'Rise of full-stack developers',
          'Growing mobile-first development',
          'Emphasis on user experience'
        ]
      },
      'UX/UI Designer': {
        demandLevel: 'High',
        growthProjection: '+13% (2023-2033)',
        competitionLevel: 'Medium',
        entryBarrier: 'Medium',
        salary: {
          entry: '$65,000 - $95,000',
          mid: '$95,000 - $130,000',
          senior: '$130,000 - $170,000',
          topPercentile: '$200,000+'
        },
        jobMarket: {
          totalJobs: '98,000+ active positions',
          newJobsMonthly: '7,500+ new openings',
          remotePercentage: '65%',
          topCompanies: ['Apple', 'Google', 'Adobe', 'Airbnb', 'Spotify', 'Uber', 'Figma', 'Microsoft']
        },
        skills: {
          trending: ['AI-assisted Design', 'Voice UI', 'AR/VR Design', 'Design Systems'],
          essential: ['Figma', 'User Research', 'Prototyping', 'Visual Design', 'Interaction Design'],
          emerging: ['Conversational AI UX', 'Ethical Design', 'Inclusive Design', 'Design Ops'],
          declining: ['Photoshop for UI', 'Static Mockups', 'Waterfall Design Process']
        },
        locations: {
          topCities: ['San Francisco', 'New York', 'Los Angeles', 'Seattle', 'Austin'],
          remote: 'Medium-High availability (65% remote-friendly)',
          international: ['London', 'Amsterdam', 'Barcelona', 'Toronto', 'Melbourne']
        },
        trends: [
          'AI-powered design tools',
          'Focus on accessibility and inclusion',
          'Rise of design systems',
          'Data-driven design decisions',
          'Cross-platform consistency'
        ]
      },
      'Product Manager': {
        demandLevel: 'High',
        growthProjection: '+19% (2023-2033)',
        competitionLevel: 'High',
        entryBarrier: 'High',
        salary: {
          entry: '$90,000 - $130,000',
          mid: '$130,000 - $180,000',
          senior: '$180,000 - $250,000',
          topPercentile: '$300,000+'
        },
        jobMarket: {
          totalJobs: '76,000+ active positions',
          newJobsMonthly: '5,200+ new openings',
          remotePercentage: '58%',
          topCompanies: ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Uber', 'Airbnb', 'Stripe']
        },
        skills: {
          trending: ['AI Product Strategy', 'Data Analytics', 'Growth Hacking', 'Customer Success'],
          essential: ['Strategy', 'Analytics', 'User Research', 'Roadmapping', 'Stakeholder Management'],
          emerging: ['AI/ML Product Management', 'Platform Strategy', 'Developer Relations'],
          declining: ['Traditional Waterfall PM', 'Feature Factory Approach']
        },
        locations: {
          topCities: ['San Francisco', 'Seattle', 'New York', 'Los Angeles', 'Boston'],
          remote: 'Medium availability (58% remote-friendly)',
          international: ['London', 'Singapore', 'Tel Aviv', 'Toronto', 'Berlin']
        },
        trends: [
          'AI-first product development',
          'Platform and ecosystem thinking',
          'Data-driven product decisions',
          'Focus on user outcomes',
          'Cross-functional leadership'
        ]
      }
    };

    return marketDatabase[careerTitle] || marketDatabase['Software Developer'];
  };

  const generateMarketRecommendations = (careerTitle, userData) => {
    const baseRecommendations = [
      {
        type: 'skills',
        title: 'Focus on Trending Skills',
        description: 'Prioritize learning the most in-demand skills for your target role',
        action: 'Start with AI/ML integration and cloud platforms'
      },
      {
        type: 'networking',
        title: 'Build Professional Network',
        description: 'Connect with professionals in top hiring companies',
        action: 'Join industry meetups and LinkedIn professional groups'
      },
      {
        type: 'location',
        title: 'Consider Market Location',
        description: 'Remote work is widely available in this field',
        action: 'Apply to both local and remote opportunities'
      }
    ];

    // Customize based on user data
    if (userData.experienceLevel === 'Complete beginner') {
      baseRecommendations.push({
        type: 'entry',
        title: 'Target Entry-Level Positions',
        description: 'Focus on junior roles and internships to gain experience',
        action: 'Build a strong portfolio and consider bootcamps'
      });
    }

    if (userData.transitionTimeline === 'Less than 6 months') {
      baseRecommendations.push({
        type: 'urgency',
        title: 'Fast-Track Your Learning',
        description: 'Intensive learning path for quick career transition',
        action: 'Consider accelerated programs and intensive bootcamps'
      });
    }

    return baseRecommendations;
  };

  const generatePersonalizedRoadmap = async () => {
    setGeneratingRoadmap(true);
    
    try {
      // Get the top career recommendation
      const topCareer = hybridResults?.allRecommendations?.[0] || careerPaths[0];
      
      if (!topCareer) {
        toast.error('No career recommendations found. Please retake the assessment.');
        return;
      }

      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      const roadmap = createDetailedRoadmap(topCareer, userData);
      setPersonalizedRoadmap(roadmap);
      
      toast.success('Your personalized roadmap has been generated!');
      
    } catch (error) {
      console.error('Error generating roadmap:', error);
      toast.error('Failed to generate roadmap. Please try again.');
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const createDetailedRoadmap = (topCareer, userData) => {
    const experienceLevel = userData.experienceLevel || 'Some exposure';
    const transitionTimeline = userData.transitionTimeline || '6-12 months';
    const timeCommitment = userData.timeCommitment || '5-10 hours per week';
    
    // Base roadmap structure
    const baseRoadmap = {
      careerTitle: topCareer.title,
      matchScore: topCareer.hybridScore || topCareer.match,
      totalDuration: transitionTimeline,
      weeklyCommitment: timeCommitment,
      phases: []
    };

    // Define career-specific skills and requirements
    const careerRequirements = getCareerRequirements(topCareer.title);
    
    // Generate phases based on experience level and timeline
    if (experienceLevel === 'Complete beginner') {
      baseRoadmap.phases = [
        createPhase('Foundation Building', '0-2 months', 'Establish fundamental understanding', [
          'Complete basic programming course (Python/JavaScript)',
          'Set up development environment',
          'Learn version control (Git)',
          'Build first simple project',
          'Join relevant online communities'
        ], careerRequirements.foundationSkills),
        
        createPhase('Skill Development', '2-4 months', 'Develop core technical skills', [
          'Complete intermediate programming projects',
          'Learn frameworks relevant to your target role',
          'Start building portfolio projects',
          'Begin networking in the industry',
          'Take relevant online certifications'
        ], careerRequirements.coreSkills),
        
        createPhase('Portfolio Building', '4-6 months', 'Create impressive portfolio', [
          'Build 3-4 substantial projects',
          'Contribute to open source projects',
          'Create professional portfolio website',
          'Write technical blog posts',
          'Practice coding interviews'
        ], careerRequirements.portfolioProjects),
        
        createPhase('Job Preparation', '6+ months', 'Prepare for job applications', [
          'Optimize LinkedIn and resume',
          'Practice technical interviews',
          'Apply to entry-level positions',
          'Attend networking events',
          'Consider internships or bootcamps'
        ], careerRequirements.jobPrepSkills)
      ];
    } else if (experienceLevel === 'Some exposure') {
      baseRoadmap.phases = [
        createPhase('Skill Assessment & Gap Analysis', '0-1 month', 'Identify your current level', [
          'Take skills assessment tests',
          'Review job requirements for target role',
          'Identify skill gaps',
          'Create learning plan',
          'Set up tracking system'
        ], careerRequirements.assessmentTools),
        
        createPhase('Targeted Skill Building', '1-3 months', 'Focus on missing skills', [
          'Complete advanced courses in weak areas',
          'Build projects showcasing new skills',
          'Get feedback from experienced professionals',
          'Join study groups or bootcamps',
          'Earn relevant certifications'
        ], careerRequirements.advancedSkills),
        
        createPhase('Professional Portfolio', '3-5 months', 'Showcase your abilities', [
          'Refactor existing projects with best practices',
          'Build complex, real-world applications',
          'Document your work professionally',
          'Create technical presentations',
          'Contribute to team projects'
        ], careerRequirements.professionalProjects),
        
        createPhase('Career Transition', '5+ months', 'Land your dream job', [
          'Apply to mid-level positions',
          'Negotiate offers effectively',
          'Build professional network',
          'Consider freelance opportunities',
          'Plan for continuous learning'
        ], careerRequirements.transitionStrategies)
      ];
    } else { // Intermediate/Advanced
      baseRoadmap.phases = [
        createPhase('Specialization Focus', '0-2 months', 'Deepen expertise in target area', [
          'Master advanced concepts in target role',
          'Learn cutting-edge tools and technologies',
          'Build thought leadership through content',
          'Mentor others in your current field',
          'Research industry trends'
        ], careerRequirements.specializationSkills),
        
        createPhase('Strategic Positioning', '2-4 months', 'Position yourself as an expert', [
          'Speak at conferences or meetups',
          'Publish advanced technical content',
          'Lead high-impact projects',
          'Build strategic relationships',
          'Obtain advanced certifications'
        ], careerRequirements.leadershipSkills),
        
        createPhase('Career Advancement', '4+ months', 'Secure senior-level opportunities', [
          'Target senior/lead positions',
          'Develop team leadership skills',
          'Build cross-functional expertise',
          'Consider consulting opportunities',
          'Plan long-term career strategy'
        ], careerRequirements.seniorSkills)
      ];
    }

    return baseRoadmap;
  };

  const createPhase = (title, timeline, description, milestones, skills = []) => ({
    title,
    timeline,
    description,
    milestones,
    skills,
    resources: [],
    completed: false
  });

  const getCareerRequirements = (careerTitle) => {
    const requirements = {
      'Data Scientist': {
        foundationSkills: ['Python', 'Statistics', 'SQL', 'Excel'],
        coreSkills: ['Machine Learning', 'Pandas', 'NumPy', 'Matplotlib'],
        advancedSkills: ['Deep Learning', 'TensorFlow', 'Scikit-learn', 'Data Visualization'],
        portfolioProjects: ['Predictive Model', 'Data Analysis Dashboard', 'ML Classification'],
        jobPrepSkills: ['Technical Interview Prep', 'Business Communication', 'Domain Knowledge'],
        assessmentTools: ['Kaggle Competitions', 'Online Skill Tests', 'Portfolio Review'],
        professionalProjects: ['End-to-end ML Pipeline', 'Real-world Dataset Analysis'],
        transitionStrategies: ['Industry Networking', 'Freelance Projects', 'Certification Display'],
        specializationSkills: ['Advanced ML Algorithms', 'Big Data Tools', 'Cloud Platforms'],
        leadershipSkills: ['Project Management', 'Team Collaboration', 'Stakeholder Communication'],
        seniorSkills: ['Strategic Planning', 'Mentoring', 'Cross-functional Leadership']
      },
      'Software Developer': {
        foundationSkills: ['Programming Fundamentals', 'Git', 'Problem Solving', 'Debugging'],
        coreSkills: ['Web Development', 'Database Management', 'APIs', 'Testing'],
        advancedSkills: ['Frameworks', 'Architecture Patterns', 'Performance Optimization'],
        portfolioProjects: ['Full-stack Application', 'Mobile App', 'API Development'],
        jobPrepSkills: ['Coding Interviews', 'System Design', 'Code Review'],
        assessmentTools: ['Coding Challenges', 'GitHub Portfolio', 'Technical Interviews'],
        professionalProjects: ['Production Application', 'Team Collaboration Projects'],
        transitionStrategies: ['Open Source Contributions', 'Networking Events', 'Job Applications'],
        specializationSkills: ['Advanced Frameworks', 'DevOps', 'Cloud Services'],
        leadershipSkills: ['Code Reviews', 'Technical Mentoring', 'Architecture Decisions'],
        seniorSkills: ['Team Leadership', 'Project Planning', 'Technical Strategy']
      },
      'UX/UI Designer': {
        foundationSkills: ['Design Principles', 'Color Theory', 'Typography', 'User Research'],
        coreSkills: ['Figma/Sketch', 'Prototyping', 'Wireframing', 'User Testing'],
        advancedSkills: ['Interaction Design', 'Design Systems', 'Accessibility'],
        portfolioProjects: ['Mobile App Design', 'Website Redesign', 'User Research Study'],
        jobPrepSkills: ['Portfolio Presentation', 'Design Critique', 'Client Communication'],
        assessmentTools: ['Portfolio Review', 'Design Challenges', 'Peer Feedback'],
        professionalProjects: ['Complete Design System', 'User Experience Optimization'],
        transitionStrategies: ['Design Community Involvement', 'Client Projects', 'Design Contests'],
        specializationSkills: ['Advanced Prototyping', 'Design Research', 'Service Design'],
        leadershipSkills: ['Design Leadership', 'Cross-team Collaboration', 'Design Strategy'],
        seniorSkills: ['Product Strategy', 'Team Management', 'Business Impact']
      }
    };

    return requirements[careerTitle] || requirements['Software Developer'];
  };

  // ============================================================================
  // MARKET INSIGHTS UI COMPONENTS
  // ============================================================================

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

  const SalaryInsightsCard = ({ salary }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Salary Insights</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Entry Level</span>
          <span className="text-green-600 font-bold">{salary.entry}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Mid Level</span>
          <span className="text-green-600 font-bold">{salary.mid}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="font-medium">Senior Level</span>
          <span className="text-green-600 font-bold">{salary.senior}</span>
        </div>
        <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-lime-50 rounded-lg border border-green-200">
          <span className="font-medium">Top 10%</span>
          <span className="text-green-700 font-bold">{salary.topPercentile}</span>
        </div>
      </div>
    </div>
  );

  const JobMarketCard = ({ jobMarket }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Job Market</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{jobMarket.totalJobs}</div>
            <div className="text-sm text-gray-600">Total Jobs</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{jobMarket.newJobsMonthly}</div>
            <div className="text-sm text-gray-600">New Monthly</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{jobMarket.remotePercentage}</div>
            <div className="text-sm text-gray-600">Remote Jobs</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Top Hiring Companies</h4>
          <div className="flex flex-wrap gap-2">
            {jobMarket.topCompanies.map((company, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-sm border"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SkillsTrendsCard = ({ skills }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Skills & Trends</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-green-700 mb-2 flex items-center">
            <span className="mr-2">📈</span>Trending Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.trending.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
            <span className="mr-2">⚡</span>Essential Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.essential.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-purple-700 mb-2 flex items-center">
            <span className="mr-2">🔮</span>Emerging Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {skills.emerging.map((skill, idx) => (
              <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const LocationInsightsCard = ({ locations }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🌍 Location Insights</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Top US Cities</h4>
          <div className="flex flex-wrap gap-2">
            {locations.topCities.map((city, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                📍 {city}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-3 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-1">Remote Work</h4>
          <p className="text-green-700 text-sm">{locations.remote}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">International Opportunities</h4>
          <div className="flex flex-wrap gap-2">
            {locations.international.map((city, idx) => (
              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                🌐 {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const MarketTrendsCard = ({ trends }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Market Trends</h3>
      <div className="space-y-3">
        {trends.map((trend, idx) => (
          <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-700">{trend}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const MarketRecommendationsCard = ({ recommendations }) => (
    <div className="bg-gradient-to-r from-green-500 to-lime-600 text-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">💡 Market-Based Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="bg-white bg-opacity-20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">{rec.title}</h4>
            <p className="text-green-100 text-sm mb-2">{rec.description}</p>
            <div className="text-sm font-medium">Action: {rec.action}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const RoadmapPhase = ({ phase, index, isLast }) => (
    <div className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-green-500 to-lime-500 opacity-30"></div>
      )}
      
      <div className="flex items-start space-x-4 mb-8">
        {/* Phase number */}
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-lime-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
          {index + 1}
        </div>
        
        {/* Phase content */}
        <div className="flex-grow bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{phase.title}</h3>
              <p className="text-green-600 font-medium">{phase.timeline}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Phase {index + 1}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{phase.description}</p>
          
          {/* Milestones */}
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
          
          {/* Skills to focus on */}
          {phase.skills && phase.skills.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Skills to Focus On:</h4>
              <div className="flex flex-wrap gap-2">
                {phase.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-lime-100 text-lime-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const RoadmapSummary = ({ roadmap }) => (
    <div className="bg-gradient-to-r from-green-500 to-lime-600 text-white rounded-xl p-6 mb-8 shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your Personalized Career Roadmap</h2>
        <p className="text-green-100 mb-4">Tailored path to become a {roadmap.careerTitle}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{roadmap.matchScore}%</div>
            <div className="text-sm text-green-100">Career Match</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{roadmap.totalDuration}</div>
            <div className="text-sm text-green-100">Timeline</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <div className="text-2xl font-bold">{roadmap.weeklyCommitment}</div>
            <div className="text-sm text-green-100">Weekly Time</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Debug useEffect to track changes
  useEffect(() => {
    console.log('🔍 Dashboard state changed:', {
      careerPaths: careerPaths.length,
      hybridResults: !!hybridResults,
      mlInsights: !!mlInsights
    });
  }, [careerPaths, hybridResults, mlInsights]);

  // MAIN DATA LOADING EFFECT - Enhanced with complete feature integration
  useEffect(() => {
    const loadData = async () => {
      try {
        let processedUserData = null;
        let hybridResults = null;
        
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          if (location.state.formData) {
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
            
            // Generate hybrid career recommendations (ML + Rule-based)
            console.log('🚀 Generating hybrid recommendations...');
            hybridResults = generateHybridCareerRecommendations(processedUserData);
            setCareerPaths(hybridResults.allRecommendations);
            setHybridResults(hybridResults);
            setCareerRecommendations(hybridResults.recommendations);
            setMLInsights(hybridResults.mlInsights);
            
            console.log('✅ Hybrid recommendations generated:', {
              total: hybridResults.allRecommendations.length,
              primary: hybridResults.recommendations.primary.length,
              inferred: hybridResults.recommendations.inferred.length,
              mlDiscovered: hybridResults.recommendations.mlDiscovered.length
            });
          }
          
          // Extract enhanced data from analysis
          const networking = extractNetworkingStrategyImproved(analysisText);
          const branding = extractPersonalBrandingImproved(analysisText);
          const interview = extractInterviewPrepImproved(analysisText);
          const portfolio = extractPortfolioGuidanceImproved(analysisText);
          const jobSearch = extractJobSearchStrategiesImproved(analysisText);
          const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
          const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
          
          setNetworkingStrategy(networking);
          setPersonalBranding(branding);
          setInterviewPrep(interview);
          setPortfolioGuidance(portfolio);
          setJobSearchStrategies(jobSearch);
          setCareerGrowthResources(careerGrowth);
          setCareerPathVisualizations(pathVisualizations);
          
        } else {
          // Load from storage
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const analysisText = storedAnalysis.analysis;
            setAnalysis(analysisText);
            
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
              
              // Generate hybrid recommendations from stored data
              hybridResults = generateHybridCareerRecommendations(processedUserData);
              setCareerPaths(hybridResults.allRecommendations);
              setHybridResults(hybridResults);
              setCareerRecommendations(hybridResults.recommendations);
              setMLInsights(hybridResults.mlInsights);
              
              console.log('✅ Stored hybrid recommendations generated:', hybridResults.allRecommendations.length);
            }
            
            // Extract other data from stored analysis
            const networking = extractNetworkingStrategyImproved(analysisText);
            const branding = extractPersonalBrandingImproved(analysisText);
            const interview = extractInterviewPrepImproved(analysisText);
            const portfolio = extractPortfolioGuidanceImproved(analysisText);
            const jobSearch = extractJobSearchStrategiesImproved(analysisText);
            const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
            const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
            
            setNetworkingStrategy(networking);
            setPersonalBranding(branding);
            setInterviewPrep(interview);
            setPortfolioGuidance(portfolio);
            setJobSearchStrategies(jobSearch);
            setCareerGrowthResources(careerGrowth);
            setCareerPathVisualizations(pathVisualizations);
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

  // ============================================================================
  // EXTRACTION FUNCTIONS - Simplified (removed skills, roadmap, market functions)
  // ============================================================================

  // Placeholder extraction functions for remaining sections
  const extractNetworkingStrategyImproved = (text) => {
    return [{
      text: 'Join professional associations and industry groups relevant to your target career',
      type: 'strategy'
    }];
  };

  const extractPersonalBrandingImproved = (text) => {
    return [{
      text: 'Create a professional LinkedIn profile highlighting your transition journey',
      type: 'tip'
    }];
  };

  const extractInterviewPrepImproved = (text) => {
    return [{
      text: 'Practice coding challenges and technical questions relevant to your target role',
      type: 'tip'
    }];
  };

  const extractPortfolioGuidanceImproved = (text) => {
    return [{
      text: 'Build a portfolio showcasing projects that bridge your background with target career skills',
      type: 'tip',
      category: 'Transition Strategy'
    }];
  };

  const extractJobSearchStrategiesImproved = (text) => {
    return [{
      text: 'Optimize your LinkedIn profile with relevant keywords and showcase your career transition journey',
      type: 'tip',
      category: 'Job Search'
    }];
  };

  const extractCareerGrowthResourcesImproved = (text) => {
    return [{
      text: 'Analytical Skills: Experience in data analysis from digital marketing is directly transferable to data-focused tech roles',
      type: 'tip',
      category: 'Strengths'
    }];
  };

  const extractCareerPathVisualizationsImproved = (text) => {
    return [];
  };

  // ============================================================================
  // UI COMPONENTS - UPDATED WITH GREEN THEME
  // ============================================================================

  // Action Card Component
  const ActionCard = ({ step, index }) => {
    const priorityColors = {
      high: 'from-red-500 to-pink-500',
      medium: 'from-lime-500 to-green-500',
      low: 'from-gray-500 to-gray-600'
    };

    const icons = ['🎓', '💼', '🎨', '🤝', '📚', '🚀'];
    const icon = step.icon || icons[index % icons.length];

    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        step.personalized ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{step.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{step.timeline}</p>
                {step.personalized && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Personalized
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

  // Generate personalized next steps
  const generateNextSteps = () => {
    const steps = [];
    const topCareer = hybridResults?.allRecommendations?.[0] || careerPaths[0];
    
    if (userData.experienceLevel === 'Complete beginner' || userData.experienceLevel === 'Some exposure') {
      const timelineText = userData.transitionTimeline === 'Less than 6 months' ? 'Start immediately with' : 'Begin with';
      steps.push({
        title: `${timelineText} Foundation Skills`,
        text: `Focus on ${topCareer?.title || 'programming'} fundamentals. Given your ${userData.experienceLevel.toLowerCase()} level, start with basic concepts and practice daily.`,
        priority: 'high',
        timeline: userData.transitionTimeline || '2-4 weeks',
        personalized: true,
        resources: ['FreeCodeCamp', 'Codecademy basics', 'YouTube tutorials']
      });
    }
    
    if (topCareer) {
      steps.push({
        title: `Build ${topCareer.title} Skills`,
        text: `Focus on developing skills for ${topCareer.title}. This is your top AI-recommended career with ${topCareer.hybridScore || topCareer.match}% match score.`,
        priority: 'high',
        timeline: userData.timeCommitment || 'Weekly',
        personalized: true,
        resources: ['Specialized courses', 'Industry certifications', 'Practice projects']
      });
    }
    
    return steps.slice(0, 6);
  };

  if (loading) {
    return <LoadingSpinner message="Loading your AI-enhanced career analysis..." />;
  }

  const nextSteps = generateNextSteps();

  // Calculate quick stats using hybrid results
  const totalRecommendations = hybridResults?.allRecommendations.length || careerPaths.length;
  const mlDiscoveries = hybridResults?.recommendations?.mlDiscovered?.length || 0;

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
              Your AI-enhanced tech career recommendations based on hybrid intelligence
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole !== 'Not specified' && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Currently: {userData.currentRole}
                </div>
              )}
              {hybridResults?.allRecommendations.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Top Match: {hybridResults.allRecommendations[0].title} ({hybridResults.allRecommendations[0].hybridScore || hybridResults.allRecommendations[0].match}%)
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Timeline: {userData.transitionTimeline}
                </div>
              )}
              {totalRecommendations > 0 && (
                <div className="bg-green-400 bg-opacity-30 px-4 py-2 rounded-full border border-green-300">
                  {totalRecommendations} Hybrid Recommendations
                </div>
              )}
              {mlDiscoveries > 0 && (
                <div className="bg-lime-400 bg-opacity-30 px-4 py-2 rounded-full border border-lime-300">
                  🤖 {mlDiscoveries} ML Discoveries
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs - Green Theme with NEW ROADMAP TAB */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex justify-center overflow-x-auto">
            {[
              { id: 'home', label: '🏠 Home', action: () => navigate('/') },
              { id: 'paths', label: '🤖 AI Career Paths' },
              { id: 'roadmap', label: '🗺️ Career Roadmap' }, 
              { id: 'market', label: '📊 Market Insights' }, // NEW TAB
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
        {/* Career Paths Tab - Uses Hybrid ML Component */}
        {activeTab === 'paths' && (
          <div className="space-y-8">
            <HybridRecommendationsDisplay 
              hybridResults={hybridResults} 
              userData={userData}
              onLearnMore={(path) => console.log('Learn more about:', path.title)}
            />
          </div>
        )}

        {/* NEW: Market Insights Tab */}
        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Market Insights & Trends</h2>
              <p className="text-gray-600 text-lg">Real-time market data for your career path</p>
            </div>

            {!marketInsights ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">📊</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Market Intelligence</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Discover current market trends, salary insights, job demand, and competitive landscape for 
                    <span className="font-semibold text-green-600"> {hybridResults?.allRecommendations?.[0]?.title || 'your selected career'}</span>.
                  </p>
                  
                  {hybridResults?.allRecommendations?.[0] && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="text-2xl">🎯</div>
                        <div>
                          <div className="font-semibold text-blue-800">
                            Analyzing: {hybridResults.allRecommendations[0].title}
                          </div>
                          <div className="text-blue-600 text-sm">
                            Market data includes salary, trends, and opportunities
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={generateMarketInsights}
                    disabled={generatingInsights || !hybridResults?.allRecommendations?.length}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    {generatingInsights ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing Market Data...</span>
                      </div>
                    ) : (
                      'Generate Market Insights 📈'
                    )}
                  </button>
                  
                  {!hybridResults?.allRecommendations?.length && (
                    <p className="text-red-500 text-sm mt-4">
                      Please complete the career assessment first to get market insights.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Header with career info */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Market Analysis: {marketInsights.careerTitle}</h2>
                    <p className="text-blue-100 mb-4">
                      Based on your {marketInsights.matchScore}% career match • Updated {marketInsights.lastUpdated}
                    </p>
                  </div>
                </div>

                {/* Market Overview */}
                <MarketOverviewCard overview={marketInsights.overview} careerTitle={marketInsights.careerTitle} />

                {/* Two-column layout for main insights */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <SalaryInsightsCard salary={marketInsights.salary} />
                  <JobMarketCard jobMarket={marketInsights.jobMarket} />
                </div>

                {/* Skills and Trends */}
                <SkillsTrendsCard skills={marketInsights.skills} />

                {/* Location and Market Trends */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <LocationInsightsCard locations={marketInsights.locations} />
                  <MarketTrendsCard trends={marketInsights.trends} />
                </div>

                {/* Market Recommendations */}
                <MarketRecommendationsCard recommendations={marketInsights.recommendations} />
                
                {/* Action buttons */}
                <div className="text-center space-x-4">
                  <button
                    onClick={() => setMarketInsights(null)}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    Refresh Insights
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all font-medium"
                  >
                    Print Report 📄
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Career Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Personalized Career Roadmap</h2>
              <p className="text-gray-600 text-lg">Get a detailed, step-by-step plan for your career transition</p>
            </div>

            {!personalizedRoadmap ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
                  <div className="text-6xl mb-6">🗺️</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Create Your Roadmap?</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    We'll analyze your top career match ({hybridResults?.allRecommendations?.[0]?.title || 'your selected career'}) 
                    and create a personalized, timeline-based roadmap with specific milestones, skills to learn, and actionable steps.
                  </p>
                  
                  {hybridResults?.allRecommendations?.[0] && (
                    <div className="bg-green-50 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="text-2xl">🎯</div>
                        <div>
                          <div className="font-semibold text-green-800">
                            Target Career: {hybridResults.allRecommendations[0].title}
                          </div>
                          <div className="text-green-600 text-sm">
                            {hybridResults.allRecommendations[0].hybridScore || hybridResults.allRecommendations[0].match}% match
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={generatePersonalizedRoadmap}
                    disabled={generatingRoadmap || !hybridResults?.allRecommendations?.length}
                    className="bg-gradient-to-r from-green-500 to-lime-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-lime-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    {generatingRoadmap ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Generating Your Roadmap...</span>
                      </div>
                    ) : (
                      'Generate Personalized Roadmap 🚀'
                    )}
                  </button>
                  
                  {!hybridResults?.allRecommendations?.length && (
                    <p className="text-red-500 text-sm mt-4">
                      Please complete the career assessment first to generate your roadmap.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <RoadmapSummary roadmap={personalizedRoadmap} />
                
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Roadmap Phases</h3>
                  
                  <div className="space-y-6">
                    {personalizedRoadmap.phases.map((phase, index) => (
                      <RoadmapPhase 
                        key={index} 
                        phase={phase} 
                        index={index} 
                        isLast={index === personalizedRoadmap.phases.length - 1}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Action buttons for roadmap */}
                <div className="text-center space-x-4">
                  <button
                    onClick={() => setPersonalizedRoadmap(null)}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    Generate New Roadmap
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all font-medium"
                  >
                    Print Roadmap 📄
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'action' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your AI-Powered Action Plan</h2>
              <p className="text-gray-600 text-lg">Step-by-step roadmap to success based on your top AI recommendations</p>
            </div>
            {nextSteps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.map((step, index) => (
                  <ActionCard key={index} step={step} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Your Action Plan</h3>
                <p className="text-gray-500">Your personalized action plan will be generated based on your assessment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Learning Resources & Tools</h2>
              <p className="text-gray-600 text-lg">Curated resources to accelerate your journey</p>
            </div>
            
            {/* Quick Actions Section - Green Theme */}
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
          </div>
        )}
      </div>

      {/* Enhanced Floating Feedback Button - Green Theme */}
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

      {/* Enhanced Feedback Form Modal - Green Theme */}
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
                    How would you rate your experience on our platform on a scale of 1 to 5, with 5 being excellent and 1 being poor?
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
                    Share any improvement suggestions you have
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackData.improvements}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="Tell us how we can make this better..."
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

      {/* Debug Analysis Viewer (Development Mode) */}
      {process.env.NODE_ENV === 'development' && analysis && (
        <div className="fixed bottom-24 left-8 z-40">
          <button
            onClick={() => {
              const debugWindow = window.open('', '_blank', 'width=800,height=600');
              debugWindow.document.write(`
                <html>
                  <head><title>Debug Analysis</title></head>
                  <body style="font-family: monospace; padding: 20px;">
                    <h2>Raw Analysis Data</h2>
                    <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
                      ${analysis}
                    </pre>
                  </body>
                </html>
              `);
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            🐛 Debug Analysis
          </button>
        </div>
      )}

      {/* Success Indicators - Green Theme */}
      {hybridResults?.allRecommendations.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-40">
          ✅ {hybridResults.allRecommendations.length} recommendations generated
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
