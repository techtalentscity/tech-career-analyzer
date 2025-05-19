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
  const [marketTrends, setMarketTrends] = useState([]);
  const [networkingStrategy, setNetworkingStrategy] = useState([]);
  const [personalBranding, setPersonalBranding] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState([]);
  const [showAllSkills, setShowAllSkills] = useState(false);
  // Set showLearningResources to true by default so resources are visible
  const [showLearningResources, setShowLearningResources] = useState(true);
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
  
  // Feedback form state
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
          const trends = extractMarketTrends(analysisText);
          const networking = extractNetworkingStrategy(analysisText);
          const branding = extractPersonalBranding(analysisText);
          const interview = extractInterviewPrep(analysisText);
          
          // Set the extracted data
          setCareerPaths(paths);
          setSkillsGap(skills);
          setMarketTrends(trends);
          setNetworkingStrategy(networking);
          setPersonalBranding(branding);
          setInterviewPrep(interview);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            
            setUserData({
              name: formData.fullName || '',
              email: formData.email || '',
              experienceLevel: formData.experienceLevel || '',
              studyField: formData.studyField || '',
              educationLevel: formData.educationLevel || '',
              currentRole: formData.currentRole || '',
              yearsExperience: formData.yearsExperience || '',
              jobResponsibilities: formData.jobResponsibilities || '',
              jobProjects: formData.jobProjects || '',
              jobTechnologies: formData.jobTechnologies || '',
              publications: formData.publications || '',
              transferableSkills: formData.transferableSkills || '',
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
            const trends = extractMarketTrends(analysisText);
            const networking = extractNetworkingStrategy(analysisText);
            const branding = extractPersonalBranding(analysisText);
            const interview = extractInterviewPrep(analysisText);
            
            // Set the extracted data
            setCareerPaths(paths);
            setSkillsGap(skills);
            setMarketTrends(trends);
            setNetworkingStrategy(networking);
            setPersonalBranding(branding);
            setInterviewPrep(interview);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              setUserData({
                name: submission.fullName || '',
                email: submission.email || '',
                experienceLevel: submission.experienceLevel || '',
                studyField: submission.studyField || '',
                educationLevel: submission.educationLevel || '',
                currentRole: submission.currentRole || '',
                yearsExperience: submission.yearsExperience || '',
                jobResponsibilities: submission.jobResponsibilities || '',
                jobProjects: submission.jobProjects || '',
                jobTechnologies: submission.jobTechnologies || '',
                publications: submission.publications || '',
                transferableSkills: submission.transferableSkills || '',
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

  // Submit feedback to Google Form
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
  
  // Generate a related career path based on existing paths
  const generateRelatedCareerPath = (existingPaths, userData, skillsGap) => {
    // Generate complementary career path based on user data
    // Implementation would use user data and skills to suggest relevant paths
    return {
      title: "Technical Project Manager",
      match: 70
    };
  };
  
  // Ensure we have exactly three career paths for display
  const getThreeCareerPaths = (paths, userData, skillsGap) => {
    // Make a defensive copy to avoid modifying the original
    let displayPaths = [...paths];
    
    // If we have fewer than 3 paths, generate additional ones
    while (displayPaths.length < 3) {
      // Generate a complementary career path
      const generatedPath = generateRelatedCareerPath(displayPaths, userData, skillsGap);
      displayPaths.push(generatedPath);
    }
    
    // Limit to exactly 3 paths
    return displayPaths.slice(0, 3);
  };

  // Extract market trends data from analysis text
  const extractMarketTrends = (text) => {
    if (!text) return [];
    
    const marketTrends = [];
    const lines = text.split('\n');
    let inMarketTrendsSection = false;
    let currentSubsection = "";
    
    lines.forEach((line, index) => {
      if (line.includes("MARKET TRENDS") || line.includes("JOB MARKET ANALYSIS")) {
        inMarketTrendsSection = true;
        return;
      }
      
      // Check for end of Market Trends section
      if (inMarketTrendsSection && (
          line.includes("NETWORKING STRATEGY") || 
          line.includes("PERSONAL BRANDING") || 
          line.includes("INTERVIEW PREPARATION") ||
          line.includes("LEARNING ROADMAP") || 
          line.includes("SKILLS GAP ANALYSIS") || 
          line.includes("TRANSITION STRATEGY")
        )) {
        inMarketTrendsSection = false;
        return;
      }
      
      // Check for subsections within market trends
      if (inMarketTrendsSection && line.match(/^\d+\.\s+[A-Z]/)) {
        currentSubsection = line.replace(/^\d+\.\s+/, '').trim();
        marketTrends.push({
          title: currentSubsection,
          type: 'section_header'
        });
        return;
      }
      
      if (inMarketTrendsSection && line.trim() !== '') {
        // Look for career path mentions with salary ranges
        const salaryMatch = line.match(/(.+?)\s*:\s*\$(\d+[,\d]*)\s*-\s*\$(\d+[,\d]*)/i);
        if (salaryMatch) {
          marketTrends.push({
            careerPath: salaryMatch[1].trim(),
            minSalary: parseInt(salaryMatch[2].replace(/,/g, ''), 10),
            maxSalary: parseInt(salaryMatch[3].replace(/,/g, ''), 10),
            type: 'salary',
            subsection: currentSubsection
          });
          return;
        }
        
        // Look for growth statistics
        const growthMatch = line.match(/(.+?)\s*:?\s*(\d+)%\s*growth/i);
        if (growthMatch) {
          marketTrends.push({
            careerPath: growthMatch[1].trim(),
            growth: parseInt(growthMatch[2], 10),
            type: 'growth',
            subsection: currentSubsection
          });
          return;
        }
        
        // Look for general trends
        if (line.match(/^\d+\.\s+/) || line.match(/^•\s+/) || line.match(/^-\s+/)) {
          const trendText = line.replace(/^(\d+\.|•|-)\s+/, '').trim();
          if (trendText) {
            marketTrends.push({
              trend: trendText,
              type: 'general',
              subsection: currentSubsection
            });
          }
        }
      }
    });
    
    // Only return what's found in the analysis
    return marketTrends;
  };

  // Extract networking strategy from analysis text
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
    
    // Only return networking strategies found in the analysis
    return strategies;
  };

  // Extract personal branding tips from analysis text
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
    
    // Only return personal branding tips found in the analysis
    return brandingTips;
  };

  // Extract interview preparation advice from analysis text
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
    
    // Only return interview preparation tips found in the analysis
    return interviewTips;
  };

  // Extract skills gap data from analysis text
  const extractSkillsGap = (text) => {
    if (!text) return [];
    
    const skills = [];
    const userToolsUsed = userData.toolsUsed || [];
    
    // Map user experience level to numeric values for skill comparison
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
      // Check for section headers with both formats - plain and numbered
      if (line.includes("SKILLS GAP ANALYSIS") || line.match(/\d+\.\s+SKILLS\s+GAP\s+ANALYSIS/i)) {
        inSkillsGapSection = true;
        return;
      }
      
      // Check for end of section with both formats - plain and numbered
      if (inSkillsGapSection && (
        line.includes("LEARNING ROADMAP") || 
        line.includes("TRANSITION STRATEGY") ||
        line.match(/\d+\.\s+LEARNING\s+ROADMAP/i) ||
        line.match(/\d+\.\s+TRANSITION\s+STRATEGY/i)
      )) {
        inSkillsGapSection = false;
        return;
      }
      
      // Pattern 1: numbered skills with descriptions (like in screenshot)
      if (inSkillsGapSection && line.match(/^\d+\.\s+[^:]+:/)) {
        // Format: "1. Programming Proficiency: Need to advance Python skills..."
        const skillMatch = line.match(/^\d+\.\s+([^:]+):\s*(.+)/);
        
        if (skillMatch) {
          const skillName = skillMatch[1].trim();
          const description = skillMatch[2].trim();
          
          let userCurrentLevel = currentLevel;
          let requiredLevel = 4;
          
          // Adjust required level based on description wording
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
            resources: {} // Empty resources object instead of dummy data
          });
        }
      }
      
      // Alternative pattern: bullet points with colons
      if (inSkillsGapSection && line.match(/^\s*-\s+[^:]+:/)) {
        // Format: "- Programming Proficiency: Need to advance Python skills..."
        const skillMatch = line.match(/^\s*-\s+([^:]+):\s*(.+)/);
        
        if (skillMatch) {
          const skillName = skillMatch[1].trim();
          const description = skillMatch[2].trim();
          
          let userCurrentLevel = currentLevel;
          let requiredLevel = 4;
          
          // Determine levels based on description
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
            resources: {} // Empty resources object instead of dummy data
          });
        }
      }
    });
    
    return skills;
  };
  
  // Helper function to determine relevant learning resources for a skill
  const determineSkillResources = (skillName) => {
    // Return an empty resources object instead of hardcoded dummy data
    return {
      courses: [],
      tutorials: [],
      videos: [],
      projects: []
    };
  };

  // Format analysis text for display
  const formatAnalysisText = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    let formattedContent = [];
    let inSkillsGapSection = false;
    let inLearningRoadmapSection = false;
    
    // Track if we should skip the current section
    let skipCurrentSection = false;
    let currentSkipSection = "";
    
    // Sections to skip - both plain names and numbered versions
    const skipSectionKeywords = [
      "NETWORKING STRATEGY", 
      "PERSONAL BRANDING", 
      "INTERVIEW PREPARATION",
      "MARKET TRENDS",
      "JOB MARKET ANALYSIS"
    ];
    
    // Enhance learning roadmap with more comprehensive content
    const enhanceLearningRoadmap = (monthHeader, tasks) => {
      // First, add the original month header
      formattedContent.push(
        <h5 key={`enhanced-month-${monthHeader}`} className="font-semibold mt-4 mb-2 text-blue-600 ml-4">
          {monthHeader}
        </h5>
      );
      
      // Add the original tasks
      tasks.forEach((task, tIndex) => {
        formattedContent.push(
          <div key={`enhanced-task-${monthHeader}-${tIndex}`} className="flex items-start mb-3 ml-6">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(task)} />
          </div>
        );
      });
    };
    
    // Generate specific resources based on task descriptions
    const generateResourcesForTasks = (tasks) => {
      // Return empty array instead of dummy resources
      return [];
    };
    
    // Add comprehensive roadmap continuation based on user's timeline
    const addLearningRoadmapContinuation = () => {
      // Only add continuation if we found a learning roadmap section
      if (!inLearningRoadmapSection) return;
      
      // Get first career path if available
      const topCareerPath = careerPaths.length > 0 ? careerPaths[0].title : "";
      
      // Add continuation header
      formattedContent.push(
        <div key="roadmap-continuation-header" className="mt-6 mb-4 bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800">Extended Learning Roadmap</h4>
          <p className="text-sm text-gray-700 mt-1">
            Continuing your journey toward {topCareerPath || "your career goals"} with additional milestones.
          </p>
        </div>
      );
      
      // Add final milestone
      formattedContent.push(
        <div key="roadmap-final-milestone" className="mt-6 mb-6 ml-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h5 className="font-bold text-green-700">Career Transition Complete!</h5>
          </div>
          <p className="text-gray-700 ml-11 mt-1">
            By this point, you should have the skills, portfolio, and experience needed 
            to successfully transition into your new role as a {topCareerPath || "technology professional"}.
          </p>
        </div>
      );
    };
    
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
    
    // Store the current month in learning roadmap for task collection
    let currentMonthTasks = [];
    let currentMonthHeader = '';

    lines.forEach((line, index) => {
      // Check for numbered section headers (like "7. NETWORKING STRATEGY:")
      const numberedSectionMatch = line.match(/^\d+\.\s+([A-Z\s]+):/);
      
      // If this is a numbered section header that matches our skip list
      if (numberedSectionMatch && skipSectionKeywords.some(keyword => 
          numberedSectionMatch[1].includes(keyword))) {
        skipCurrentSection = true;
        currentSkipSection = numberedSectionMatch[1];
        return;
      }
      
      // Look for learning roadmap section
      if (line.includes("LEARNING ROADMAP") || line.match(/\d+\.\s+LEARNING\s+ROADMAP/i)) {
        inLearningRoadmapSection = true;
        formattedContent.push(
          <h3 key={`header-roadmap-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
        return;
      }
      
      // Check if we're exiting a section we're skipping
      // (When we hit another numbered section heading)
      if (skipCurrentSection && line.match(/^\d+\.\s+[A-Z\s]+:/)) {
        skipCurrentSection = false;
        currentSkipSection = "";
      }
      
      // Skip processing this line if we're in a section to skip
      if (skipCurrentSection) {
        return;
      }

      // Continue with normal processing for non-skipped sections
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
        return;
      }
      
      if (line.includes("TRANSITION STRATEGY") || (inLearningRoadmapSection && line.match(/^\d+\.\s+[A-Z\s]+:/))) {
        // If we were in learning roadmap section, add the continuation
        if (inLearningRoadmapSection) {
          // Process any remaining tasks from the last month
          if (currentMonthHeader && currentMonthTasks.length > 0) {
            enhanceLearningRoadmap(currentMonthHeader, currentMonthTasks);
            currentMonthTasks = [];
            currentMonthHeader = '';
          }
          
          // Add continuation roadmap
          addLearningRoadmapContinuation();
        }
        
        inSkillsGapSection = false;
        inLearningRoadmapSection = false;
        
        // Continue normal processing for the new section header
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
        return;
      }

      if (inSkillsGapSection && line.match(/^\d+\.\s+/) && line.includes(':')) {
        return;
      }

      // Process month headers in learning roadmap
      if (inLearningRoadmapSection && line.trim().match(/^Month\s+\d+-?\d*:/i)) {
        // If we already have a month with tasks, process it before starting a new one
        if (currentMonthHeader && currentMonthTasks.length > 0) {
          enhanceLearningRoadmap(currentMonthHeader, currentMonthTasks);
          currentMonthTasks = [];
        }
        
        // Set the new current month
        currentMonthHeader = line.trim();
        return;
      }
      
      // Process tasks within a month
      if (inLearningRoadmapSection && currentMonthHeader && (line.trim().startsWith('-') || line.trim().startsWith('•'))) {
        currentMonthTasks.push(line.replace(/^[-•]\s+/, '').trim());
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
      else if (line.trim() === '') {
        formattedContent.push(<br key={`break-${index}`} />);
      }
      else {
        formattedContent.push(
          <p key={`text-${index}`} className="mb-3 text-gray-900" dangerouslySetInnerHTML={processContent(line)} />
        );
      }
    });
    
    // Process any remaining month tasks at the end
    if (inLearningRoadmapSection && currentMonthHeader && currentMonthTasks.length > 0) {
      enhanceLearningRoadmap(currentMonthHeader, currentMonthTasks);
      
      // Add continuation roadmap at the end
      addLearningRoadmapContinuation();
    }

    return formattedContent;
  };

  // Custom Simple Bar Chart Component
  const SimpleBarChart = ({ data, title }) => {
    if (!data || data.length === 0) return null;
    
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

  // Market Trends Section Component
  const MarketTrendsSection = ({ marketTrends }) => {
    if (!marketTrends || marketTrends.length === 0) {
      return null;
    }
    
    const salaryTrends = marketTrends.filter(trend => trend.type === 'salary');
    const growthTrends = marketTrends.filter(trend => trend.type === 'growth');
    const generalTrends = marketTrends.filter(trend => trend.type === 'general');
    const sectionHeaders = marketTrends.filter(trend => trend.type === 'section_header');
    
    return (
      <div>
        {salaryTrends.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Salary Ranges</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {salaryTrends.map((trend, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{trend.careerPath}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-700">
                      ${trend.minSalary.toLocaleString()} - ${trend.maxSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">Annual salary range</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {growthTrends.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Job Growth Projections</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {growthTrends.map((trend, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{trend.careerPath}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`text-3xl font-bold ${
                      trend.growth > 15 ? 'text-green-600' : 
                      trend.growth > 5 ? 'text-blue-600' : 
                      'text-orange-600'
                    }`}>
                      {trend.growth}%
                    </span>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">Projected growth rate</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {sectionHeaders.length > 0 && generalTrends.length > 0 && (
          <div>
            {sectionHeaders.map((header, hIndex) => {
              const relatedTrends = generalTrends.filter(trend => trend.subsection === header.title);
              if (relatedTrends.length === 0) return null;
              
              return (
                <div key={hIndex} className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">{header.title}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-3">
                      {relatedTrends.map((trend, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">•</span>
                          <span>{trend.trend}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {!sectionHeaders.length && generalTrends.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Industry Insights</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-3">
                {generalTrends.map((trend, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span>{trend.trend}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Networking Strategy Component
  const NetworkingStrategySection = ({ strategies }) => {
    if (!strategies || strategies.length === 0) {
      return null;
    }
    
    const strategyItems = strategies.filter(item => item.type === 'strategy');
    
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-3">
            {strategyItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Personal Branding Component
  const PersonalBrandingSection = ({ tips }) => {
    if (!tips || tips.length === 0) {
      return null;
    }
    
    const brandingTips = tips.filter(item => item.type === 'tip');
    
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-3">
            {brandingTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Interview Preparation Component
  const InterviewPrepSection = ({ tips }) => {
    if (!tips || tips.length === 0) {
      return null;
    }
    
    const interviewTips = tips.filter(item => item.type === 'tip');
    
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-3">
            {interviewTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Create timeline visualization data - Based on user's specified timeline, career paths, and skills gap
  const createTimelineData = () => {
    const timelineMap = {
      'Less than 6 months': 6,
      '6-12 months': 12,
      '1-2 years': 18,
      '2+ years': 24,
      'Already transitioning': 3
    };
    
    // Get user's top career path if available
    const topCareerPath = careerPaths.length > 0 ? careerPaths[0].title : "";
    
    // Get user's top skills gaps
    const topSkillsGaps = skillsGap
      .filter(skill => skill.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3)
      .map(skill => skill.name);
    
    const months = timelineMap[userData.transitionTimeline] || 12;
    const milestones = [];
    
    // Only generate the actual number of needed milestone objects based on the timeline
    // This removes the dummy milestone data
    
    return milestones;
  };

  // Custom Timeline Component
  const TimelineChart = ({ milestones }) => {
    const [expandedMilestone, setExpandedMilestone] = useState(null);
    
    if (!milestones || milestones.length === 0) {
      return null;
    }
    
    return (
      <div className="mb-6">
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-1 bg-gray-300" />
          {milestones.map((milestone, index) => (
            <div key={index} className="relative mb-10">
              <div className="flex items-center">
                <div className={`absolute left-0 w-5 h-5 rounded-full ${
                  index === 0 ? 'bg-blue-600' : 'bg-gray-400'
                } -translate-x-2 z-10`} />
                <div className="ml-8 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-lg">{milestone.label}</span>
                      <span className="ml-2 text-sm text-gray-600">Month {milestone.month}</span>
                    </div>
                    <button 
                      onClick={() => setExpandedMilestone(expandedMilestone === index ? null : index)}
                      className="text-blue-600 text-sm font-medium flex items-center"
                    >
                      {expandedMilestone === index ? 'Hide Details' : 'Show Details'}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${expandedMilestone === index ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                  
                  {expandedMilestone === index && milestone.details && (
                    <div className="mt-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2">Activities & Objectives</h4>
                      <ul className="space-y-2">
                        {milestone.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate next steps based on user data and analysis - only using actual extracted data
  const generateNextSteps = () => {
    const steps = [];
    
    // Use networking strategies if available
    if (networkingStrategy && networkingStrategy.length > 0) {
      const networkingStrategies = networkingStrategy.filter(item => item.type === 'strategy');
      if (networkingStrategies.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          color: 'text-blue-600',
          title: 'Build Your Network',
          description: networkingStrategies[0].text
        });
      }
    }
    
    // Use personal branding tips if available
    if (personalBranding && personalBranding.length > 0) {
      const brandingTips = personalBranding.filter(item => item.type === 'tip');
      if (brandingTips.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          color: 'text-purple-600',
          title: 'Develop Your Brand',
          description: brandingTips[0].text
        });
      }
    }
    
    // Based on skills gap
    if (skillsGap && skillsGap.length > 0) {
      const topGaps = skillsGap
        .filter(skill => skill.gap > 1)
        .sort((a, b) => b.gap - a.gap)
        .slice(0, 1);
        
      if (topGaps.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          color: 'text-red-600',
          title: `Learn ${topGaps[0].name}`,
          description: topGaps[0].description
        });
      }
    }
    
    // Use interview preparation tips if available
    if (interviewPrep && interviewPrep.length > 0) {
      const interviewTips = interviewPrep.filter(item => item.type === 'tip');
      if (interviewTips.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          ),
          color: 'text-green-600',
          title: 'Prepare for Interviews',
          description: interviewTips[0].text
        });
      }
    }
    
    // Based on current role (only if available)
    if (userData.currentRole && userData.currentRole !== '') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: 'text-indigo-600',
        title: 'Leverage Current Experience',
        description: `Apply your ${userData.currentRole} skills to tech projects`
      });
    }
    
    // Return only the steps that were generated from actual user data
    // No default steps or fallbacks
    return steps;
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
  const nextSteps = generateNextSteps();

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
              className="flex items-center justify-center py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
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
                  {userData.careerPathsInterest && userData.careerPathsInterest.length > 0 ? (
                    userData.careerPathsInterest.slice(0, 3).map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No specific interests provided</span>
                  )}
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
                <p className="text-lg font-semibold">{userData.timeCommitment || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Career Path Matches Visualization */}
        {careerPaths.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Career Path Compatibility</h2>
            <p className="text-gray-600 mb-4">
              Based on your experience, skills, and interests, these career paths have the highest compatibility with your profile.
            </p>
            
            <SimpleBarChart data={chartData} title="" />
            
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {getThreeCareerPaths(careerPaths, userData, skillsGap).map((path, index) => (
                <div key={index} className={`p-5 rounded-lg ${
                  index === 0 ? 'bg-blue-50 border border-blue-100' :
                  index === 1 ? 'bg-green-50 border border-green-100' :
                  'bg-purple-50 border border-purple-100'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{path.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      index === 0 ? 'bg-blue-100 text-blue-800' :
                      index === 1 ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {path.match}% Match
                    </span>
                  </div>
                  
                  <div className="pt-3">
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(path.title)}+career+path+requirements`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium ${
                        index === 0 ? 'text-blue-600 hover:text-blue-800' :
                        index === 1 ? 'text-green-600 hover:text-green-800' :
                        'text-purple-600 hover:text-purple-800'
                      }`}
                    >
                      Learn more about this career →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills Gap Analysis */}
        {skillsGap.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
            <p className="text-gray-600 mb-4">
              Visual representation of your current skill levels versus required levels for your target career paths.
            </p>
            
            {/* Learning Resources - Always visible when skills are present */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Personalized Learning Resources</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {skillsGap.slice(0, 4).map((skill, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {skill.currentLevel === 1 ? 'Beginner' : 
                       skill.currentLevel === 2 ? 'Basic' :
                       skill.currentLevel === 3 ? 'Intermediate' :
                       skill.currentLevel === 4 ? 'Advanced' : 'Expert'} → {
                       skill.requiredLevel === 1 ? 'Beginner' : 
                       skill.requiredLevel === 2 ? 'Basic' :
                       skill.requiredLevel === 3 ? 'Intermediate' :
                       skill.requiredLevel === 4 ? 'Advanced' : 'Expert'}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {skillsGap.slice(0, 6).map((skill, index) => (
                <SkillLevelChart key={index} skill={skill} />
              ))}
            </div>
            
            {skillsGap.length > 6 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllSkills(prevState => !prevState)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
                >
                  {showAllSkills ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Show Less
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      View All Skills
                    </>
                  )}
                </button>
              </div>
            )}
            
            {showAllSkills && skillsGap.length > 6 && (
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {skillsGap.slice(6).map((skill, index) => (
                  <SkillLevelChart key={index + 6} skill={skill} />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Transition Timeline */}
        {userData.transitionTimeline && timelineMilestones.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Your Career Transition Roadmap</h2>
            <div className="mb-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Timeline: {userData.transitionTimeline}
                </span>
                {userData.timeCommitment && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Weekly Commitment: {userData.timeCommitment}
                  </span>
                )}
                {userData.workPreference && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Preferred Work: {userData.workPreference}
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                This personalized roadmap is based on your specific circumstances, target career paths, and identified skill gaps.
                Each milestone includes recommended activities aligned with your goals and timeline.
              </p>
            </div>
            <TimelineChart milestones={timelineMilestones} />
          </div>
        )}
        
        {/* Market Trends Analysis */}
        {marketTrends.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Market Trends Analysis</h2>
            <p className="text-gray-600 mb-6">
              Current job market trends and salary data for your recommended career paths as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
            </p>
            <MarketTrendsSection marketTrends={marketTrends} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Market Trends Analysis</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-blue-700 font-medium mb-2">Market data not available for this analysis</p>
                  <p className="text-gray-600">
                    For the most current job market insights related to your career path recommendations, 
                    consider reading industry reports or visiting job market websites focused on tech careers.
                    You can also retake the assessment to generate a new analysis that includes market data.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a 
                  href="https://www.bls.gov/ooh/computer-and-information-technology/home.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-md hover:bg-blue-50"
                >
                  BLS Tech Outlook
                </a>
                <a 
                  href="https://insights.dice.com/tech-job-report/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-md hover:bg-blue-50"
                >
                  Dice Tech Jobs Report
                </a>
                <a 
                  href="https://www.roberthalf.com/us/en/insights/salary-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-md hover:bg-blue-50"
                >
                  Salary Guides
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Complete Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
          <div>
            {formatAnalysisText(analysis)}
          </div>
        </div>
        
        {/* Next Steps - Dynamic based on user analysis */}
        {nextSteps.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 mt-8 mb-6">
            <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {nextSteps.map((step, index) => (
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
        )}
        
        {/* Networking Strategy */}
        {networkingStrategy.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Networking Strategy</h2>
            <NetworkingStrategySection strategies={networkingStrategy} />
          </div>
        )}
        
        {/* Personal Branding */}
        {personalBranding.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Personal Branding</h2>
            <PersonalBrandingSection tips={personalBranding} />
          </div>
        )}
        
        {/* Interview Preparation */}
        {interviewPrep.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Interview Preparation</h2>
            <InterviewPrepSection tips={interviewPrep} />
          </div>
        )}

      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 group"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Custom Feedback Form Modal */}
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
                            ? 'bg-red-600 text-white border-red-600'
                            : 'border-gray-300 hover:border-red-500'
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
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
