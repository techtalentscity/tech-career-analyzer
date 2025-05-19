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
  // Restored marketTrends state
  const [marketTrends, setMarketTrends] = useState([]);
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
  const [activeTab, setActiveTab] = useState('analysis');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  // Feedback form state - Updated to match Google Form
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  useEffect(() => {
    const loadData = async () => {
      try {
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          // Extract data from analysis
          const paths = extractCareerPaths(analysisText);
          const skills = extractSkillsGap(analysisText);
          // Restored extractMarketTrends call
          const trends = extractMarketTrends(analysisText);
          
          setCareerPaths(paths);
          setSkillsGap(skills);
          // Restored setMarketTrends
          setMarketTrends(trends);
          
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
            // Restored extractMarketTrends call
            const trends = extractMarketTrends(analysisText);
            
            setCareerPaths(paths);
            setSkillsGap(skills);
            // Restored setMarketTrends
            setMarketTrends(trends);
            
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

  // Handle feedback form changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit feedback to Google Form - Updated with actual entry IDs
  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    
    try {
      // Create FormData and append the feedback entries
      const formData = new FormData();
      
      // Use the actual entry IDs from your Google Form
      formData.append('entry.162050771', feedbackData.rating); // Rating question
      formData.append('entry.2083196363', feedbackData.improvements); // Improvement suggestions
      
      // Submit to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Google Forms requires no-cors
      });
      
      // Show success message
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

  // Extract career paths and their match percentages from analysis text
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

  // Restored extractMarketTrends function
  const extractMarketTrends = (text) => {
    if (!text) return [];
    
    const trends = [];
    const lines = text.split('\n');
    let inMarketTrendsSection = false;
    
    lines.forEach((line) => {
      if (line.includes("MARKET TRENDS") || line.includes("INDUSTRY ANALYSIS")) {
        inMarketTrendsSection = true;
        return;
      }
      
      if (line.includes("SKILLS GAP") || line.includes("LEARNING ROADMAP")) {
        inMarketTrendsSection = false;
        return;
      }
      
      if (inMarketTrendsSection && line.trim().startsWith('-')) {
        const trend = line.replace(/^-\s+/, '').trim();
        
        if (trend.length > 10) {
          let category = 'General';
          let icon = (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          );
          
          if (trend.toLowerCase().includes('demand') || trend.toLowerCase().includes('growth')) {
            category = 'Demand';
            icon = (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            );
          } else if (trend.toLowerCase().includes('salary') || trend.toLowerCase().includes('compensation')) {
            category = 'Salary';
            icon = (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            );
          } else if (trend.toLowerCase().includes('skill') || trend.toLowerCase().includes('technology')) {
            category = 'Skills';
            icon = (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            );
          } else if (trend.toLowerCase().includes('location') || trend.toLowerCase().includes('remote')) {
            category = 'Work Model';
            icon = (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
            );
          }
          
          let trendColor = 'text-blue-600';
          if (category === 'Demand') trendColor = 'text-green-600';
          if (category === 'Salary') trendColor = 'text-purple-600';
          if (category === 'Skills') trendColor = 'text-orange-600';
          if (category === 'Work Model') trendColor = 'text-indigo-600';
          
          trends.push({
            description: trend,
            category,
            icon,
            color: trendColor
          });
        }
      }
    });
    
    // If no trends found, add some default ones based on career path
    if (trends.length === 0 && userData.careerPathsInterest.length > 0) {
      const defaultTrends = {
        'Software Development': [
          { description: 'Growing demand for full-stack developers with both frontend and backend expertise', category: 'Demand', color: 'text-green-600' },
          { description: 'Average salary ranges from $75,000 for junior to $150,000+ for senior roles', category: 'Salary', color: 'text-purple-600' }
        ],
        'Data Analysis/Science': [
          { description: 'Data science roles projected to grow 36% by 2026, much faster than average', category: 'Demand', color: 'text-green-600' },
          { description: 'Increasing emphasis on machine learning and AI expertise', category: 'Skills', color: 'text-orange-600' }
        ],
        'UX/UI Design': [
          { description: 'Companies prioritizing user experience as key competitive advantage', category: 'Demand', color: 'text-green-600' },
          { description: 'Growing integration of UX with product development processes', category: 'Work Model', color: 'text-indigo-600' }
        ],
        'Cybersecurity': [
          { description: 'Critical shortage of cybersecurity professionals globally', category: 'Demand', color: 'text-green-600' },
          { description: 'Average cybersecurity salaries 16% higher than other IT roles', category: 'Salary', color: 'text-purple-600' }
        ]
      };
      
      userData.careerPathsInterest.forEach(path => {
        const pathTrends = defaultTrends[path];
        if (pathTrends) {
          pathTrends.forEach(trend => {
            let trendIcon;
            
            if (trend.category === 'Demand') {
              trendIcon = (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              );
            } else if (trend.category === 'Salary') {
              trendIcon = (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              );
            } else if (trend.category === 'Skills') {
              trendIcon = (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              );
            } else if (trend.category === 'Work Model') {
              trendIcon = (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
                </svg>
              );
            }
            
            trends.push({
              ...trend,
              icon: trendIcon,
              careerPath: path
            });
          });
        }
      });
    }
    
    return trends;
  };

  // Format analysis text for display
  const formatAnalysisText = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    let formattedContent = [];
    let inSkillsGapSection = false;

    const processContent = (content) => {
      content = content.replace(/\btheir\b/gi, 'your');
      content = content.replace(/\bthey\b/gi, 'you');
      content = content.replace(/\bthem\b/gi, 'you');
      content = content.replace(/\bthemselves\b/gi, 'yourself');
      
      if (userData.educationLevel && userData.educationLevel !== 'Not specified') {
        const educationTerms = [userData.educationLevel, userData.studyField].filter(Boolean);
        educationTerms.forEach(term => {
          if (term && term.length > 3) {
            const regex = new RegExp(`(${term})`, 'gi');
            content = content.replace(regex, '<strong class="text-blue-700">$1</strong>');
          }
        });
      }
      
      if (userData.currentRole && userData.currentRole !== 'Not specified') {
        const regex = new RegExp(`(${userData.currentRole})`, 'gi');
        content = content.replace(regex, '<strong class="text-purple-700">$1</strong>');
      }
      
      return { __html: content };
    };

    lines.forEach((line, index) => {
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
        return;
      }
      
      if (line.includes("LEARNING ROADMAP") || line.includes("TRANSITION STRATEGY")) {
        inSkillsGapSection = false;
      }

      if (inSkillsGapSection && line.match(/^\d+\.\s+/) && line.includes(':')) {
        return;
      }

      if (line.match(/^\d+\.\s+[A-Z]/)) {
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
      }
      else if (line.match(/^[a-z]\)\s+.*?\(\d+%\s+match/i)) {
        formattedContent.push(
          <h4 key={`subheader-${index}`} className="text-lg font-semibold mt-6 mb-2 text-blue-700">
            {line}
          </h4>
        );
      }
      else if (line.trim().startsWith('-')) {
        const content = line.replace(/^-\s+/, '');
        formattedContent.push(
          <div key={`bullet-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      else if (line.trim().match(/^\d+\.\s+/)) {
        const content = line.replace(/^\d+\.\s+/, '');
        formattedContent.push(
          <div key={`numbered-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      else if (line.trim().match(/^Month\s+\d+-?\d*:/i)) {
        formattedContent.push(
          <h5 key={`month-${index}`} className="font-semibold mt-4 mb-2 text-blue-600 ml-4">
            {line}
          </h5>
        );
      }
      else if (line.trim() === '') {
        formattedContent.push(<br key={`break-${index}`} />);
      }
      else {
        formattedContent.push(
          <p key={`text-${index}`} className="mb-3 text-gray-900" dangerouslySetInnerHTML={processContent(line)} />
        );
      }
    });

    return formattedContent;
  };

  // Custom Simple Bar Chart Component
  const SimpleBarChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-blue-600' : 
                    index === 1 ? 'bg-green-500' : 
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-orange-500' :
                    'bg-pink-500'
                  }`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Custom Skill Level Chart Component
  const SkillLevelChart = ({ skill }) => {
    const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-lg">{skill.name}</h4>
          {skill.gap > 0 && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              skill.gap > 2 ? 'bg-red-100 text-red-700' : 
              skill.gap === 2 ? 'bg-yellow-100 text-yellow-700' : 
              'bg-green-100 text-green-700'
            }`}>
              Gap: {skill.gap} {skill.gap === 1 ? 'level' : 'levels'}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-5 gap-1 mb-3">
          {levels.map((level, index) => (
            <div key={index} className="relative">
              <div className={`h-8 rounded ${
                index < skill.currentLevel ? levelColors[index] : 'bg-gray-300'
              } ${index < skill.requiredLevel ? 'opacity-100' : 'opacity-30'}`}>
                {index < skill.requiredLevel && index >= skill.currentLevel && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Need</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-1">{level}</p>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current: {levels[Math.max(0, skill.currentLevel - 1)]}</span>
          <span className="text-blue-600 font-medium">Target: {levels[Math.max(0, skill.requiredLevel - 1)]}</span>
        </div>
        
        {skill.description && (
          <p className="text-sm text-gray-700 mt-3">{skill.description}</p>
        )}
      </div>
    );
  };

  // Custom Tools Proficiency Component
  const ToolsProficiency = ({ tools }) => {
    const experienceMultiplier = {
      'Complete beginner': 0.5,
      'Some exposure': 0.7,
      'Beginner': 0.8,
      'Intermediate': 1,
      'Advanced': 1.2
    };

    const toolProficiencyMap = {
      'VS Code': 3,
      'GitHub': 3,
      'JavaScript': 4,
      'Python': 4,
      'React': 4,
      'Node.js': 4,
      'SQL': 3,
      'AWS': 5,
      'Docker': 4
    };

    const multiplier = experienceMultiplier[userData.experienceLevel] || 1;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Current Tools & Technologies</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {tools.filter(tool => tool !== 'None').map((tool, index) => {
            const proficiency = Math.round((toolProficiencyMap[tool] || 3) * multiplier);
            const proficiencyLabels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
            
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{tool}</span>
                  <span className="text-sm text-gray-600">{proficiencyLabels[proficiency - 1]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(proficiency / 5) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Restored MarketTrendsSection component
  const MarketTrendsSection = ({ trends }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-6">Market Trends Analysis</h2>
        <p className="text-gray-600 mb-6">
          Key insights into current industry trends relevant to your career interests.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {trends.slice(0, 8).map((trend, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className={`${trend.color} mb-2`}>
                {trend.icon}
              </div>
              <h3 className="font-semibold mb-2">{trend.category}</h3>
              <p className="text-sm text-gray-600">{trend.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
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
        { month: 1, label: 'Start Learning', progress: 20 },
        { month: 3, label: 'Complete Basics', progress: 50 },
        { month: 6, label: 'Job Ready', progress: 100 }
      );
    } else if (months <= 12) {
      milestones.push(
        { month: 2, label: 'Foundation', progress: 20 },
        { month: 4, label: 'Core Skills', progress: 40 },
        { month: 6, label: 'Projects', progress: 60 },
        { month: 9, label: 'Portfolio', progress: 80 },
        { month: 12, label: 'Job Ready', progress: 100 }
      );
    } else {
      milestones.push(
        { month: 3, label: 'Foundation', progress: 15 },
        { month: 6, label: 'Core Skills', progress: 30 },
        { month: 9, label: 'Specialization', progress: 45 },
        { month: 12, label: 'Projects', progress: 60 },
        { month: 15, label: 'Portfolio', progress: 80 },
        { month: 18, label: 'Job Ready', progress: 100 }
      );
    }
    
    return milestones;
  };

  // Custom Timeline Component
  const TimelineChart = ({ milestones }) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Transition Roadmap</h3>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-1 bg-gray-300" />
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-center mb-8">
              <div className={`absolute left-0 w-4 h-4 rounded-full ${
                index === 0 ? 'bg-blue-600' : 'bg-gray-400'
              } -translate-x-1.5`} />
              <div className="ml-8">
                <div className="flex items-center mb-1">
                  <span className="font-semibold">{milestone.label}</span>
                  <span className="ml-2 text-sm text-gray-600">({milestone.month} months)</span>
                </div>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate dynamic next steps based on user data and analysis
  const generateNextSteps = () => {
    const steps = [];
    
    // Based on experience level
    if (userData.experienceLevel === 'Complete beginner' || userData.experienceLevel === 'Some exposure') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        color: 'text-blue-600',
        title: 'Start with Fundamentals',
        description: getBeginnerLearningPath()
      });
    }
    
    // Based on career path interests
    if (userData.careerPathsInterest.includes('Software Development')) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
        color: 'text-indigo-600',
        title: 'Practice Coding Daily',
        description: 'Start with LeetCode or HackerRank exercises'
      });
    }
    
    if (userData.careerPathsInterest.includes('Data Analysis/Science')) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        color: 'text-green-600',
        title: 'Learn Data Visualization',
        description: 'Master Python libraries like Pandas and Matplotlib'
      });
    }
    
    // Based on timeline
    if (userData.transitionTimeline === 'Less than 6 months') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        color: 'text-yellow-600',
        title: 'Accelerated Learning Plan',
        description: 'Focus on bootcamps or intensive courses'
      });
    }
    
    // Based on skills gap
    const hasLargeSkillGap = skillsGap.some(skill => skill.gap > 2);
    if (hasLargeSkillGap) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        color: 'text-red-600',
        title: 'Bridge Skill Gaps',
        description: `Focus on: ${getTopSkillGaps()}`
      });
    }
    
    // Based on current role
    if (userData.currentRole && userData.currentRole !== 'Not specified') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: 'text-purple-600',
        title: 'Leverage Current Experience',
        description: `Apply your ${userData.currentRole} skills to tech projects`
      });
    }
    
    // Based on time commitment
    if (userData.timeCommitment === '1-5 hours' || userData.timeCommitment === '5-10 hours') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        color: 'text-cyan-600',
        title: 'Micro-Learning Strategy',
        description: 'Use lunch breaks and commute time for learning'
      });
    }
    
    // Always include networking if not already added
    const hasNetworking = steps.some(step => step.title.includes('Network'));
    if (!hasNetworking) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        color: 'text-gray-600',
        title: 'Build Professional Network',
        description: 'Join tech meetups and online communities'
      });
    }
    
    // Return top 3-4 most relevant steps
    return steps.slice(0, 4);
  };

  // Helper functions for generating specific content
  const getBeginnerLearningPath = () => {
    const paths = userData.careerPathsInterest;
    if (paths.includes('Software Development')) {
      return 'Start with HTML, CSS, and JavaScript basics';
    } else if (paths.includes('Data Analysis/Science')) {
      return 'Begin with Python fundamentals and statistics';
    } else if (paths.includes('UX/UI Design')) {
      return 'Learn design principles and Figma basics';
    } else if (paths.includes('Cybersecurity')) {
      return 'Start with networking and security fundamentals';
    }
    return 'Begin with computer science fundamentals';
  };

  const getTopSkillGaps = () => {
    const topGaps = skillsGap
      .filter(skill => skill.gap > 2)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3)
      .map(skill => skill.name);
    
    return topGaps.join(', ') || 'Key technical skills';
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  // Extract data for visualizations
  const chartData = careerPaths.map(path => ({
    label: path.title,
    value: path.match
  }));
  const timelineMilestones = createTimelineData();

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Your Career Analysis</h1>
          <p className="text-lg mt-2 opacity-90">
            Personalized assessment for {userData.name}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        {/* Quick Actions Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Results (PDF)
            </button>
            
            <button 
              onClick={() => navigate('/career/test')}
              className="flex items-center justify-center py-3 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake Assessment
            </button>
            
            <a 
              href="https://techtalentscity.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Join Real Projects
            </a>
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Education Background</h3>
                <p className="text-lg font-semibold">{userData.educationLevel}</p>
                <p className="text-md text-gray-700">{userData.studyField}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Role</h3>
                <p className="text-lg font-semibold">{userData.currentRole}</p>
                <p className="text-md text-gray-700">{userData.yearsExperience}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tech Experience</h3>
                <p className="text-lg font-semibold">{userData.experienceLevel}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Career Interests</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.careerPathsInterest.slice(0, 3).map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Transition Timeline</h3>
                <p className="text-lg font-semibold">{userData.transitionTimeline}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Time Commitment</h3>
                <p className="text-lg font-semibold">{userData.timeCommitment} per week</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Career Path Matches Visualization */}
        {careerPaths.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Career Path Compatibility</h2>
            <SimpleBarChart data={chartData} title="Match Percentage by Career Path" />
          </div>
        )}
        
        {/* Skills Gap Analysis */}
        {skillsGap.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
            <p className="text-gray-600 mb-6">
              Visual representation of your current skill levels versus required levels for your target career paths.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {skillsGap.slice(0, 6).map((skill, index) => (
                <SkillLevelChart key={index} skill={skill} />
              ))}
            </div>
          </div>
        )}
        
        {/* Restored Market Trends Analysis section */}
        {marketTrends.length > 0 && (
          <MarketTrendsSection trends={marketTrends} />
        )}
        
        {/* Current Tools Proficiency */}
        {userData.toolsUsed && userData.toolsUsed.length > 0 && userData.toolsUsed[0] !== 'None' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Technical Proficiency</h2>
            <ToolsProficiency tools={userData.toolsUsed} />
          </div>
        )}
        
        {/* Transition Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Your Transition Roadmap</h2>
          <div className="mb-4">
            <p className="text-gray-600">
              Based on your {userData.transitionTimeline} timeline and {userData.timeCommitment} weekly commitment
            </p>
          </div>
          <TimelineChart milestones={timelineMilestones} />
        </div>
        
        {/* Complete Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
          <div>
            {formatAnalysisText(analysis)}
          </div>
        </div>

        {/* Next Steps - Dynamic based on user analysis */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {generateNextSteps().map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className={`${step.color} mb-2`}>
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 group"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Custom Feedback Form Modal - Updated to match Google Form */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={submitFeedback} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you rate your experience on our platform on a scale of 1 to 5, with 5 being excellent and 1 being poor?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleFeedbackChange({ target: { name: 'rating', value: value.toString() } })}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          feedbackData.rating === value.toString()
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Improvements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share any improvement suggestions you have
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackData.improvements}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
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
