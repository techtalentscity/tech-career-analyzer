// src/Pages/career/CareerDashboard.jsx
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
  const [careerPaths, setCareerPaths] = useState([]);
  const [skillsGap, setSkillsGap] = useState([]);
  const [networkingStrategy, setNetworkingStrategy] = useState([]);
  const [personalBranding, setPersonalBranding] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState([]);
  const [portfolioGuidance, setPortfolioGuidance] = useState([]);
  const [jobSearchStrategies, setJobSearchStrategies] = useState([]);
  const [careerGrowthResources, setCareerGrowthResources] = useState([]);
  const [careerPathVisualizations, setCareerPathVisualizations] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  
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

  // Animation effect for counters
  useEffect(() => {
    if (careerPaths.length > 0) {
      const timer = setTimeout(() => {
        careerPaths.forEach((path, index) => {
          const targetValue = path.match;
          let currentValue = 0;
          const increment = targetValue / 30;
          
          const countUp = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(countUp);
            }
            setAnimatedValues(prev => ({
              ...prev,
              [`path-${index}`]: Math.round(currentValue)
            }));
          }, 50);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [careerPaths]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          // Extract data from analysis
          const paths = extractCareerPaths(analysisText);
          const skills = extractSkillsGap(analysisText);
          const networking = extractNetworkingStrategy(analysisText);
          const branding = extractPersonalBranding(analysisText);
          const interview = extractInterviewPrep(analysisText);
          const portfolio = extractPortfolioGuidance(analysisText);
          const jobSearch = extractJobSearchStrategies(analysisText);
          const careerGrowth = extractCareerGrowthResources(analysisText);
          const pathVisualizations = extractCareerPathVisualizations(analysisText);
          
          setCareerPaths(paths);
          setSkillsGap(skills);
          setNetworkingStrategy(networking);
          setPersonalBranding(branding);
          setInterviewPrep(interview);
          setPortfolioGuidance(portfolio);
          setJobSearchStrategies(jobSearch);
          setCareerGrowthResources(careerGrowth);
          setCareerPathVisualizations(pathVisualizations);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            
            setUserData({
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
            });
          }
        } else {
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const analysisText = storedAnalysis.analysis;
            setAnalysis(analysisText);
            
            // Extract data from analysis
            const paths = extractCareerPaths(analysisText);
            const skills = extractSkillsGap(analysisText);
            const networking = extractNetworkingStrategy(analysisText);
            const branding = extractPersonalBranding(analysisText);
            const interview = extractInterviewPrep(analysisText);
            const portfolio = extractPortfolioGuidance(analysisText);
            const jobSearch = extractJobSearchStrategies(analysisText);
            const careerGrowth = extractCareerGrowthResources(analysisText);
            const pathVisualizations = extractCareerPathVisualizations(analysisText);
            
            setCareerPaths(paths);
            setSkillsGap(skills);
            setNetworkingStrategy(networking);
            setPersonalBranding(branding);
            setInterviewPrep(interview);
            setPortfolioGuidance(portfolio);
            setJobSearchStrategies(jobSearch);
            setCareerGrowthResources(careerGrowth);
            setCareerPathVisualizations(pathVisualizations);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              setUserData({
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
              });
            }
          } else {
            navigate('/career/test', { 
              state: { message: 'Please complete the assessment to view your dashboard' } 
            });
            return;
          }
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        navigate('/career/test', { 
          state: { message: 'Error loading your results. Please try again.' } 
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [location, navigate]);

  // Enhanced Progress Bar Component
  const EnhancedProgressBar = ({ value, maxValue = 100, className = "from-blue-400 to-blue-600", showLabel = true }) => (
    <div className="relative">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r transition-all duration-1000 ease-out ${className}`}
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
    </div>
  );

  // Enhanced Career Path Card Component
  const CareerPathCard = ({ path, index }) => {
    const animatedValue = animatedValues[`path-${index}`] || 0;
    const colorClasses = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500', 
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    const colorClass = colorClasses[index % colorClasses.length];
    
    return (
      <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
              {path.title}
            </h3>
            <div className={`text-3xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
              {animatedValue}%
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Compatibility Score</span>
              <span className="text-sm text-gray-500">{animatedValue}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
                style={{ width: `${animatedValue}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              path.match >= 80 ? 'bg-green-100 text-green-700' :
              path.match >= 70 ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {path.match >= 80 ? 'Excellent Match' : path.match >= 70 ? 'Good Match' : 'Consider'}
            </span>
            
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline transition-all">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Skill Card Component
  const SkillCard = ({ skill, index }) => {
    const gap = skill.gap || (skill.requiredLevel - skill.currentLevel);
    const progress = (skill.currentLevel / skill.requiredLevel) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{skill.name}</h4>
            <span className="text-sm text-gray-500">{skill.category || 'General'}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            gap <= 1 ? 'bg-green-100 text-green-700' :
            gap === 2 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {gap <= 1 ? 'Almost there!' : gap === 2 ? 'Getting close' : 'Needs work'}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Current Level</span>
              <span>{skill.currentLevel}/5</span>
            </div>
            <EnhancedProgressBar 
              value={progress} 
              className="from-blue-400 to-blue-600"
              showLabel={false}
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Target Level</span>
              <span>{skill.requiredLevel}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                style={{ width: `${(skill.requiredLevel / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {skill.description && (
          <p className="text-sm text-gray-600 mt-3">{skill.description}</p>
        )}
      </div>
    );
  };

  // Enhanced Action Card Component
  const ActionCard = ({ step, index }) => {
    const priorityColors = {
      high: 'from-red-500 to-pink-500',
      medium: 'from-yellow-500 to-orange-500',
      low: 'from-gray-500 to-gray-600'
    };

    const icons = ['🎓', '💼', '🎨', '🤝', '📚', '🚀'];
    const icon = step.icon || icons[index % icons.length];

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{step.title || step.text}</h4>
              <p className="text-sm text-gray-600">{step.timeline || 'Ongoing'}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${priorityColors[step.priority || 'medium']} text-white`}>
            {(step.priority || 'MEDIUM').toUpperCase()}
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{step.description || step.text}</p>
        
        <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
          Start Now
        </button>
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

  // All the existing extraction functions remain the same
  const extractCareerPaths = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    const careerPaths = [];
    
    const careerPathRegex = /^[a-z]\)\s+(.*?)\s+\((\d+)%\s+match/i;
    
    lines.forEach(line => {
      const match = line.match(careerPathRegex);
      if (match) {
        careerPaths.push({
          title: match[1].trim(),
          match: parseInt(match[2], 10)
        });
      }
    });
    
    return careerPaths;
  };

  const extractNetworkingStrategy = (text) => {
    if (!text) return [];
    
    const strategies = [];
    const lines = text.split('\n');
    let inNetworkingSection = false;
    
    lines.forEach((line, index) => {
      if (line.includes("NETWORKING STRATEGY")) {
        inNetworkingSection = true;
        strategies.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inNetworkingSection && (
        line.includes("PERSONAL BRANDING") || 
        line.includes("INTERVIEW PREPARATION") ||
        line.includes("LEARNING ROADMAP") || 
        line.includes("SKILLS GAP ANALYSIS") || 
        line.includes("TRANSITION STRATEGY")
      )) {
        inNetworkingSection = false;
        return;
      }
      
      if (inNetworkingSection && line.trim() !== '') {
        if (line.trim().startsWith('-')) {
          const strategyText = line.replace(/^-\s+/, '').trim();
          strategies.push({
            text: strategyText,
            type: 'strategy'
          });
        }
      }
    });
    
    return strategies;
  };

  const extractPersonalBranding = (text) => {
    if (!text) return [];
    
    const brandingTips = [];
    const lines = text.split('\n');
    let inBrandingSection = false;
    
    lines.forEach((line, index) => {
      if (line.includes("PERSONAL BRANDING")) {
        inBrandingSection = true;
        brandingTips.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inBrandingSection && (
        line.includes("NETWORKING STRATEGY") || 
        line.includes("INTERVIEW PREPARATION") ||
        line.includes("LEARNING ROADMAP") || 
        line.includes("SKILLS GAP ANALYSIS") || 
        line.includes("TRANSITION STRATEGY")
      )) {
        inBrandingSection = false;
        return;
      }
      
      if (inBrandingSection && line.trim() !== '') {
        if (line.trim().startsWith('-')) {
          const tipText = line.replace(/^-\s+/, '').trim();
          brandingTips.push({
            text: tipText,
            type: 'tip'
          });
        }
      }
    });
    
    return brandingTips;
  };

  const extractInterviewPrep = (text) => {
    if (!text) return [];
    
    const interviewTips = [];
    const lines = text.split('\n');
    let inInterviewSection = false;
    
    lines.forEach((line, index) => {
      if (line.includes("INTERVIEW PREPARATION")) {
        inInterviewSection = true;
        interviewTips.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inInterviewSection && (
        line.includes("NETWORKING STRATEGY") || 
        line.includes("PERSONAL BRANDING") ||
        line.includes("LEARNING ROADMAP") || 
        line.includes("SKILLS GAP ANALYSIS") || 
        line.includes("TRANSITION STRATEGY")
      )) {
        inInterviewSection = false;
        return;
      }
      
      if (inInterviewSection && line.trim() !== '') {
        if (line.trim().startsWith('-')) {
          const tipText = line.replace(/^-\s+/, '').trim();
          interviewTips.push({
            text: tipText,
            type: 'tip'
          });
        }
      }
    });
    
    return interviewTips;
  };

  const extractPortfolioGuidance = (text) => {
    if (!text) return [];
    
    const portfolioTips = [];
    const lines = text.split('\n');
    let inPortfolioSection = false;
    
    lines.forEach((line, index) => {
      if (line.includes("PORTFOLIO BUILDING GUIDANCE")) {
        inPortfolioSection = true;
        portfolioTips.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inPortfolioSection && (
        line.includes("JOB SEARCH STRATEGIES") || 
        line.includes("CAREER GROWTH RESOURCES") ||
        line.includes("NETWORKING STRATEGY") || 
        line.includes("PERSONAL BRANDING")
      )) {
        inPortfolioSection = false;
        return;
      }
      
      if (inPortfolioSection && line.trim() !== '') {
        if (line.trim().startsWith('-')) {
          const tipText = line.replace(/^-\s+/, '').trim();
          portfolioTips.push({
            text: tipText,
            type: 'tip'
          });
        } else if (line.includes('[Portfolio Content]') || 
                  line.includes('[Portfolio Presentation]') || 
                  line.includes('[Project Selection]') || 
                  line.includes('[Feedback and Iteration]')) {
          const category = line.match(/\[(.*?)\]/)?.[1] || 'General';
          const content = line.replace(/\[.*?\]:\s*/, '').trim();
          
          portfolioTips.push({
            category,
            text: content,
            type: 'category_tip'
          });
        }
      }
    });
    
    return portfolioTips;
  };

  const extractJobSearchStrategies = (text) => {
    if (!text) return [];
    
    const jobSearchTips = [];
    const lines = text.split('\n');
    let inJobSearchSection = false;
    
    lines.forEach((line, index) => {
      if (line.includes("JOB SEARCH STRATEGIES")) {
        inJobSearchSection = true;
        jobSearchTips.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inJobSearchSection && (
        line.includes("CAREER GROWTH RESOURCES") || 
        line.includes("PORTFOLIO BUILDING GUIDANCE") ||
        line.includes("NETWORKING STRATEGY")
      )) {
        inJobSearchSection = false;
        return;
      }
      
      if (inJobSearchSection && line.trim() !== '') {
        if (line.trim().startsWith('-')) {
          const tipText = line.replace(/^-\s+/, '').trim();
          jobSearchTips.push({
            text: tipText,
            type: 'tip'
          });
        } else if (line.includes('[Job Search Platforms]') || 
                  line.includes('[Networking for Jobs]') || 
                  line.includes('[Targeted Applications]') || 
                  line.includes('[Company Research]')) {
          const category = line.match(/\[(.*?)\]/)?.[1] || 'General';
          const content = line.replace(/\[.*?\]:\s*/, '').trim();
          
          jobSearchTips.push({
            category,
            text: content,
            type: 'category_tip'
          });
        }
      }
    });
    
    return jobSearchTips;
  };

  const extractCareerGrowthResources = (text) => {
    if (!text) return [];
    
    const careerGrowthTips = [];
    const lines = text.split('\n');
    let inCareerGrowthSection = false;
    
    lines.forEach((line, index) => {
      if (line.includes("CAREER GROWTH RESOURCES")) {
        inCareerGrowthSection = true;
        careerGrowthTips.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inCareerGrowthSection && (
        line.includes("JOB SEARCH STRATEGIES") || 
        line.includes("PORTFOLIO BUILDING GUIDANCE") ||
        line.includes("NETWORKING STRATEGY")
      )) {
        inCareerGrowthSection = false;
        return;
      }
      
      if (inCareerGrowthSection && line.trim() !== '') {
        if (line.trim().startsWith('-')) {
          const tipText = line.replace(/^-\s+/, '').trim();
          careerGrowthTips.push({
            text: tipText,
            type: 'tip'
          });
        } else if (line.includes('[Industry Publications and Influencers]') || 
                  line.includes('[Advanced Learning Platforms]') || 
                  line.includes('[Community and Contributions]') || 
                  line.includes('[Setting Expert-Level Goals]')) {
          const category = line.match(/\[(.*?)\]/)?.[1] || 'General';
          const content = line.replace(/\[.*?\]:\s*/, '').trim();
          
          careerGrowthTips.push({
            category,
            text: content,
            type: 'category_tip'
          });
        }
      }
    });
    
    return careerGrowthTips;
  };

  const extractCareerPathVisualizations = (text) => {
    if (!text) return [];
    
    const pathVisualizations = [];
    const lines = text.split('\n');
    let inCareerVisualizationSection = false;
    let jsonContent = '';
    let currentPath = '';
    
    lines.forEach((line, index) => {
      if (line.includes("Career Path Visualization")) {
        inCareerVisualizationSection = true;
        const previousLines = lines.slice(Math.max(0, index - 10), index);
        for (let i = previousLines.length - 1; i >= 0; i--) {
          const match = previousLines[i].match(/^[a-z]\)\s+(.*?)\s+\((\d+)%\s+match/i);
          if (match) {
            currentPath = match[1].trim();
            break;
          }
        }
        return;
      }
      
      if (inCareerVisualizationSection && line.includes('```json')) {
        jsonContent = '';
        return;
      }
      
      if (inCareerVisualizationSection && line.includes('```') && jsonContent) {
        try {
          const cleanedJson = jsonContent
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
            .replace(/'/g, '"');
          
          const stagesData = JSON.parse(cleanedJson);
          
          pathVisualizations.push({
            careerPath: currentPath,
            stages: stagesData
          });
        } catch (error) {
          console.error('Failed to parse career path visualization JSON:', error);
        }
        
        inCareerVisualizationSection = false;
        jsonContent = '';
        currentPath = '';
        return;
      }
      
      if (inCareerVisualizationSection && jsonContent !== undefined) {
        jsonContent += line + '\n';
      }
    });
    
    return pathVisualizations;
  };

  const extractSkillsGap = (text) => {
    if (!text) return [];
    
    const skills = [];
    const userToolsUsed = userData.toolsUsed || [];
    
    const toolSkillMapping = {
      'VS Code': { name: 'IDE Proficiency', category: 'Development Tools' },
      'GitHub': { name: 'Version Control', category: 'Collaboration Tools' },
      'JavaScript': { name: 'JavaScript Programming', category: 'Programming Languages' },
      'Python': { name: 'Python Programming', category: 'Programming Languages' },
      'React': { name: 'React Framework', category: 'Frontend Frameworks' },
      'Node.js': { name: 'Node.js Runtime', category: 'Backend Technologies' },
      'SQL': { name: 'Database Management', category: 'Database' },
      'AWS': { name: 'Cloud Computing', category: 'Cloud Services' },
      'Docker': { name: 'Containerization', category: 'DevOps' }
    };

    const experienceLevelMap = {
      'Complete beginner': 1,
      'Some exposure': 2,
      'Beginner': 2,
      'Intermediate': 3,
      'Advanced': 4
    };

    const currentLevel = experienceLevelMap[userData.experienceLevel] || 1;

    const lines = text.split('\n');
    let inSkillsGapSection = false;
    
    lines.forEach((line) => {
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        return;
      }
      
      if (line.includes("LEARNING ROADMAP") || line.includes("TRANSITION STRATEGY")) {
        inSkillsGapSection = false;
        return;
      }
      
      if (inSkillsGapSection && line.match(/^\d+\.\s+/)) {
        const skillMatch = line.match(/^\d+\.\s+([^:]+):\s*(.+)/);
        
        if (skillMatch) {
          const skillName = skillMatch[1].trim();
          const description = skillMatch[2].trim();
          
          let userCurrentLevel = currentLevel;
          
          userToolsUsed.forEach(tool => {
            const mapping = toolSkillMapping[tool];
            if (mapping && skillName.toLowerCase().includes(mapping.name.toLowerCase())) {
              userCurrentLevel = Math.min(currentLevel + 1, 5);
            }
          });
          
          let requiredLevel = 4;
          const descLower = description.toLowerCase();
          
          if (descLower.includes('basic') || descLower.includes('fundamental')) {
            requiredLevel = 2;
          } else if (descLower.includes('intermediate') || descLower.includes('solid')) {
            requiredLevel = 3;
          } else if (descLower.includes('advanced') || descLower.includes('deep')) {
            requiredLevel = 4;
          } else if (descLower.includes('expert') || descLower.includes('mastery')) {
            requiredLevel = 5;
          }
          
          skills.push({
            name: skillName,
            description: description,
            currentLevel: userCurrentLevel,
            requiredLevel: requiredLevel,
            gap: requiredLevel - userCurrentLevel,
            category: 'Technical Skills'
          });
        }
      }
    });
    
    if (skills.length === 0 && userData.careerPathsInterest.length > 0) {
      const defaultSkillsByPath = {
        'Software Development': ['Programming', 'Problem Solving', 'System Design', 'Testing'],
        'Data Analysis/Science': ['Statistics', 'Data Visualization', 'SQL', 'Python'],
        'UX/UI Design': ['Design Principles', 'Prototyping', 'User Research', 'Design Tools'],
        'Product Management': ['Product Strategy', 'Analytics', 'Communication', 'Agile Methods'],
        'Cybersecurity': ['Network Security', 'Ethical Hacking', 'Security Tools', 'Compliance'],
        'Cloud Engineering': ['Cloud Platforms', 'Infrastructure', 'Automation', 'Monitoring'],
        'DevOps': ['CI/CD', 'Automation', 'Infrastructure as Code', 'Containerization'],
        'AI/Machine Learning': ['Mathematics', 'ML Algorithms', 'Data Processing', 'Deep Learning']
      };
      
      userData.careerPathsInterest.forEach(path => {
        const pathSkills = defaultSkillsByPath[path] || [];
        pathSkills.forEach(skill => {
          skills.push({
            name: skill,
            currentLevel: currentLevel,
            requiredLevel: 4,
            gap: 4 - currentLevel,
            careerPath: path,
            category: 'Core Skills'
          });
        });
      });
    }
    
    return skills;
  };

  // Generate next steps based on user data and analysis
  const generateNextSteps = () => {
    const steps = [];
    
    if (networkingStrategy && networkingStrategy.length > 0) {
      const networkingStrategies = networkingStrategy.filter(item => item.type === 'strategy');
      if (networkingStrategies.length > 0) {
        steps.push({
          title: 'Build Your Network',
          text: networkingStrategies[0].text,
          priority: 'high',
          icon: '🤝'
        });
      }
    }
    
    if (personalBranding && personalBranding.length > 0) {
      const brandingTips = personalBranding.filter(item => item.type === 'tip');
      if (brandingTips.length > 0) {
        steps.push({
          title: 'Develop Your Brand',
          text: brandingTips[0].text,
          priority: 'high',
          icon: '💼'
        });
      }
    }
    
    if (portfolioGuidance && portfolioGuidance.length > 0) {
      const portfolioTips = portfolioGuidance.filter(item => item.type === 'category_tip' || item.type === 'tip');
      if (portfolioTips.length > 0) {
        steps.push({
          title: 'Build Your Portfolio',
          text: portfolioTips[0].text.substring(0, 100) + (portfolioTips[0].text.length > 100 ? '...' : ''),
          priority: 'high',
          icon: '🎨'
        });
      }
    }
    
    if (skillsGap && skillsGap.length > 0) {
      const topGaps = skillsGap
        .filter(skill => skill.gap > 1)
        .sort((a, b) => b.gap - a.gap)
        .slice(0, 1);
        
      if (topGaps.length > 0) {
        steps.push({
          title: `Learn ${topGaps[0].name}`,
          text: topGaps[0].description,
          priority: 'high',
          icon: '📚'
        });
      }
    }
    
    if (interviewPrep && interviewPrep.length > 0) {
      const interviewTips = interviewPrep.filter(item => item.type === 'tip');
      if (interviewTips.length > 0) {
        steps.push({
          title: 'Prepare for Interviews',
          text: interviewTips[0].text,
          priority: 'medium',
          icon: '🎯'
        });
      }
    }
    
    if (jobSearchStrategies && jobSearchStrategies.length > 0) {
      const jobSearchTips = jobSearchStrategies.filter(item => item.type === 'category_tip' || item.type === 'tip');
      if (jobSearchTips.length > 0) {
        steps.push({
          title: 'Plan Your Job Search',
          text: jobSearchTips[0].text.substring(0, 100) + (jobSearchTips[0].text.length > 100 ? '...' : ''),
          priority: 'medium',
          icon: '🔍'
        });
      }
    }
    
    return steps.slice(0, 6);
  };

  // Create timeline visualization data
  const createTimelineData = () => {
    const timelineMap = {
      'Less than 6 months': 6,
      '6-12 months': 12,
      '1-2 years': 18,
      '2+ years': 24,
      'Already transitioning': 3
    };
    
    const months = timelineMap[userData.transitionTimeline] || 12;
    const milestones = [];
    
    if (months <= 6) {
      milestones.push(
        { month: 1, label: 'Start Learning', progress: 20, status: 'current' },
        { month: 3, label: 'Complete Basics', progress: 50, status: 'upcoming' },
        { month: 6, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    } else if (months <= 12) {
      milestones.push(
        { month: 2, label: 'Foundation', progress: 20, status: 'current' },
        { month: 4, label: 'Core Skills', progress: 40, status: 'upcoming' },
        { month: 6, label: 'Projects', progress: 60, status: 'upcoming' },
        { month: 9, label: 'Portfolio', progress: 80, status: 'upcoming' },
        { month: 12, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    } else {
      milestones.push(
        { month: 3, label: 'Foundation', progress: 15, status: 'current' },
        { month: 6, label: 'Core Skills', progress: 30, status: 'upcoming' },
        { month: 9, label: 'Specialization', progress: 45, status: 'upcoming' },
        { month: 12, label: 'Projects', progress: 60, status: 'upcoming' },
        { month: 15, label: 'Portfolio', progress: 80, status: 'upcoming' },
        { month: 18, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    }
    
    return milestones;
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  const nextSteps = generateNextSteps();
  const timelineMilestones = createTimelineData();

  // Calculate quick stats
  const topMatchPercentage = careerPaths.length > 0 ? Math.max(...careerPaths.map(p => p.match)) : 0;
  const skillsToLearn = skillsGap.filter(skill => skill.gap > 0).length;
  const estimatedMonths = userData.transitionTimeline?.includes('6-12') ? '8' : 
                         userData.transitionTimeline?.includes('Less than 6') ? '4' :
                         userData.transitionTimeline?.includes('1-2') ? '18' : '12';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Your personalized tech career roadmap is ready
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole !== 'Not specified' && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  📍 Currently: {userData.currentRole}
                </div>
              )}
              {careerPaths.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  🎯 Top Match: {careerPaths[0].title}
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  ⏰ Timeline: {userData.transitionTimeline}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'paths', label: 'Career Paths', icon: '🛤️' },
              { id: 'skills', label: 'Skills Gap', icon: '📈' },
              { id: 'roadmap', label: 'Action Plan', icon: '🗺️' },
              { id: 'resources', label: 'Resources', icon: '📚' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Top Match', value: `${topMatchPercentage}%`, color: 'from-green-500 to-emerald-500', icon: '🎯' },
                { label: 'Skills to Learn', value: skillsToLearn.toString(), color: 'from-blue-500 to-cyan-500', icon: '📚' },
                { label: 'Estimated Timeline', value: `${estimatedMonths} months`, color: 'from-purple-500 to-pink-500', icon: '⏱️' },
                { label: 'Action Items', value: nextSteps.length.toString(), color: 'from-orange-500 to-red-500', icon: '✅' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800">{stat.label}</h3>
                </div>
              ))}
            </div>

            {/* Enhanced Progress Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🚀</span>
                Your Journey Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {timelineMilestones.slice(0, 3).map((milestone, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                      milestone.status === 'current' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className={`font-semibold ${
                      milestone.status === 'current' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {milestone.label}
                    </h3>
                    <p className="text-sm text-gray-600">Month {milestone.month}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Next Steps Preview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">⚡</span>
                Priority Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.slice(0, 4).map((step, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{step.icon}</span>
                      <h3 className="font-semibold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{step.text?.substring(0, 80) + (step.text?.length > 80 ? '...' : '')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Personalized Career Paths</h2>
              <p className="text-gray-600 text-lg">Based on your background, interests, and goals</p>
            </div>
            {careerPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {careerPaths.map((path, index) => (
                  <CareerPathCard key={index} path={path} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Analyzing Your Path</h3>
                <p className="text-gray-500">Career recommendations will appear here once analysis is complete.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Skills Development Plan</h2>
              <p className="text-gray-600 text-lg">Focus areas to reach your career goals</p>
            </div>
            {skillsGap.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsGap.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Skills Analysis in Progress</h3>
                <p className="text-gray-500">Your personalized skill recommendations will appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Action Plan</h2>
              <p className="text-gray-600 text-lg">Step-by-step roadmap to success</p>
            </div>
            {nextSteps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.map((step, index) => (
                  <ActionCard key={index} step={step} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Your Roadmap</h3>
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
            
            {/* Quick Actions Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-sm font-medium">Export</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/test')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-medium">Retake</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/learning')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium">Learning</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/interviews')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="text-sm font-medium">Interviews</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/guide')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Guide</span>
                </button>
                
                <a 
                  href="https://techtalentscity.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">Projects</span>
                </a>
              </div>
            </div>

            {/* Resource Sections */}
            {portfolioGuidance.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">💼</span>
                  Portfolio Building Guidance
                </h3>
                <div className="space-y-4">
                  {portfolioGuidance.filter(item => item.type === 'category_tip' || item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                      {tip.category && (
                        <h4 className="font-semibold text-blue-700 mb-2">{tip.category}</h4>
                      )}
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {jobSearchStrategies.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🔍</span>
                  Job Search Strategies
                </h3>
                <div className="space-y-4">
                  {jobSearchStrategies.filter(item => item.type === 'category_tip' || item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                      {tip.category && (
                        <h4 className="font-semibold text-green-700 mb-2">{tip.category}</h4>
                      )}
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {careerGrowthResources.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">📈</span>
                  Career Growth Resources
                </h3>
                <div className="space-y-4">
                  {careerGrowthResources.filter(item => item.type === 'category_tip' || item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                      {tip.category && (
                        <h4 className="font-semibold text-purple-700 mb-2">{tip.category}</h4>
                      )}
                      <p className="text-gray-700">{tip.text}</p>
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
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group z-50"
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
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Your Feedback</h2>
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
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-500 shadow-lg'
                            : 'border-gray-300 hover:border-red-500 hover:shadow-md'
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
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none font-medium"
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
    </div>
  );
};

export default CareerDashboard;
