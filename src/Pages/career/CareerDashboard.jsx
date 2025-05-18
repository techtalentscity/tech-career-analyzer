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
    
    // Create a mapping of tools to skill names and categories based on actual user choices
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
          
          // Determine learning resources based on skill name
          let resources = determineSkillResources(skillName);
          
          skills.push({
            name: skillName,
            description: description,
            currentLevel: userCurrentLevel,
            requiredLevel: requiredLevel,
            gap: requiredLevel - userCurrentLevel,
            resources: resources
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
          
          // Determine learning resources based on skill name
          let resources = determineSkillResources(skillName);
          
          skills.push({
            name: skillName,
            description: description,
            currentLevel: userCurrentLevel,
            requiredLevel: requiredLevel,
            gap: requiredLevel - userCurrentLevel,
            resources: resources
          });
        }
      }
    });
    
    // If no skills found but user has tools, generate skills based on tools
    if (skills.length === 0 && userToolsUsed && userToolsUsed.length > 0 && userToolsUsed[0] !== 'None') {
      userToolsUsed.forEach(tool => {
        if (toolSkillMapping[tool]) {
          const skillInfo = toolSkillMapping[tool];
          const userCurrentLevel = currentLevel;
          const requiredLevel = Math.min(userCurrentLevel + 2, 5);
          
          // Determine learning resources based on skill name
          let resources = determineSkillResources(tool);
          
          skills.push({
            name: skillInfo.name,
            description: `Enhance your ${tool} skills to advance in your chosen career path.`,
            currentLevel: userCurrentLevel,
            requiredLevel: requiredLevel,
            gap: requiredLevel - userCurrentLevel,
            category: skillInfo.category,
            resources: resources
          });
        }
      });
    }
    
    // If still no skills found, generate based on experience level and career paths
    if (skills.length === 0 && careerPaths.length > 0) {
      const topCareerPath = careerPaths[0].title;
      const defaultSkills = determineDefaultSkillsForCareer(topCareerPath);
      
      defaultSkills.forEach(skill => {
        const userCurrentLevel = currentLevel;
        const requiredLevel = Math.min(userCurrentLevel + 2, 5);
        
        // Determine learning resources based on skill name
        let resources = determineSkillResources(skill.name);
        
        skills.push({
          name: skill.name,
          description: skill.description,
          currentLevel: userCurrentLevel,
          requiredLevel: requiredLevel,
          gap: requiredLevel - userCurrentLevel,
          category: skill.category,
          resources: resources
        });
      });
    }
    
    return skills;
  };
  
  // Helper function to determine relevant learning resources for a skill
  const determineSkillResources = (skillName) => {
    const skillLower = skillName.toLowerCase();
    
    // Default resources
    let resources = {
      courses: [{
        title: "Comprehensive Learning Path",
        url: `https://www.coursera.org/search?query=${encodeURIComponent(skillName)}`,
        platform: "Coursera"
      }],
      tutorials: [{
        title: "Practical Tutorials",
        url: `https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skillName)}`,
        platform: "Udemy"
      }],
      videos: [{
        title: "Video Tutorials",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName)}+tutorial+beginner`,
        platform: "YouTube"
      }],
      projects: [{
        title: "Example Projects",
        url: `https://github.com/topics/${encodeURIComponent(skillName.toLowerCase().replace(/ /g, '-'))}`,
        platform: "GitHub"
      }]
    };
    
    // Add specific resources based on skill name - EXPANDED FOR ALL TECH ROLES
    
    // Frontend Development
    if (skillLower.includes('javascript') || skillLower.includes('js')) {
      resources.courses.push({
        title: "JavaScript Fundamentals",
        url: "https://javascript.info/",
        platform: "JavaScript.info"
      });
      resources.courses.push({
        title: "Modern JavaScript",
        url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
        platform: "freeCodeCamp"
      });
      resources.tutorials.push({
        title: "JavaScript Exercises",
        url: "https://exercism.org/tracks/javascript",
        platform: "Exercism"
      });
    }
    else if (skillLower.includes('react')) {
      resources.courses.push({
        title: "React Documentation",
        url: "https://react.dev/learn",
        platform: "React.dev"
      });
      resources.tutorials.push({
        title: "React Projects",
        url: "https://www.freecodecamp.org/learn/front-end-development-libraries/#react",
        platform: "freeCodeCamp"
      });
      resources.projects.push({
        title: "React Project Ideas",
        url: "https://github.com/florinpop17/app-ideas",
        platform: "GitHub"
      });
    }
    else if (skillLower.includes('vue')) {
      resources.courses.push({
        title: "Vue.js Documentation",
        url: "https://vuejs.org/guide/introduction.html",
        platform: "Vue.js"
      });
      resources.tutorials.push({
        title: "Vue Mastery",
        url: "https://www.vuemastery.com/courses/",
        platform: "Vue Mastery"
      });
    }
    else if (skillLower.includes('angular')) {
      resources.courses.push({
        title: "Angular Documentation",
        url: "https://angular.io/docs",
        platform: "Angular.io"
      });
      resources.tutorials.push({
        title: "Angular University",
        url: "https://angular-university.io/",
        platform: "Angular University"
      });
    }
    else if (skillLower.includes('css') || skillLower.includes('html')) {
      resources.courses.push({
        title: "CSS Grid & Flexbox",
        url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
        platform: "CSS-Tricks"
      });
      resources.tutorials.push({
        title: "Frontend Mentor Challenges",
        url: "https://www.frontendmentor.io/challenges",
        platform: "Frontend Mentor"
      });
    }
    else if (skillLower.includes('typescript')) {
      resources.courses.push({
        title: "TypeScript Handbook",
        url: "https://www.typescriptlang.org/docs/handbook/intro.html",
        platform: "TypeScript"
      });
      resources.tutorials.push({
        title: "TypeScript Exercises",
        url: "https://typescript-exercises.github.io/",
        platform: "TypeScript Exercises"
      });
    }
    
    // Backend Development
    else if (skillLower.includes('python')) {
      resources.courses.push({
        title: "Python for Everybody",
        url: "https://www.py4e.com/",
        platform: "py4e"
      });
      resources.tutorials.push({
        title: "Python Exercises",
        url: "https://exercism.org/tracks/python",
        platform: "Exercism"
      });
      resources.videos.push({
        title: "Python Crash Course",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        platform: "YouTube"
      });
    }
    else if (skillLower.includes('node') || skillLower.includes('express')) {
      resources.courses.push({
        title: "Node.js Documentation",
        url: "https://nodejs.org/en/docs/",
        platform: "Node.js"
      });
      resources.tutorials.push({
        title: "Express.js Guide",
        url: "https://expressjs.com/en/guide/routing.html",
        platform: "Express.js"
      });
    }
    else if (skillLower.includes('java') && !skillLower.includes('javascript')) {
      resources.courses.push({
        title: "Java Programming",
        url: "https://dev.java/learn/",
        platform: "dev.java"
      });
      resources.tutorials.push({
        title: "Spring Boot Documentation",
        url: "https://spring.io/projects/spring-boot",
        platform: "Spring.io"
      });
    }
    else if (skillLower.includes('c#') || skillLower.includes('asp.net') || skillLower.includes('dotnet')) {
      resources.courses.push({
        title: ".NET Documentation",
        url: "https://learn.microsoft.com/en-us/dotnet/",
        platform: "Microsoft Learn"
      });
      resources.tutorials.push({
        title: "ASP.NET Core Documentation",
        url: "https://learn.microsoft.com/en-us/aspnet/core/",
        platform: "Microsoft Learn"
      });
    }
    else if (skillLower.includes('php') || skillLower.includes('laravel')) {
      resources.courses.push({
        title: "PHP Documentation",
        url: "https://www.php.net/docs.php",
        platform: "PHP.net"
      });
      resources.tutorials.push({
        title: "Laravel Documentation",
        url: "https://laravel.com/docs",
        platform: "Laravel"
      });
    }
    else if (skillLower.includes('ruby') || skillLower.includes('rails')) {
      resources.courses.push({
        title: "Ruby Documentation",
        url: "https://ruby-doc.org/",
        platform: "Ruby-Doc"
      });
      resources.tutorials.push({
        title: "Ruby on Rails Guides",
        url: "https://guides.rubyonrails.org/",
        platform: "Ruby on Rails"
      });
    }
    else if (skillLower.includes('go') || skillLower.includes('golang')) {
      resources.courses.push({
        title: "Go Documentation",
        url: "https://go.dev/doc/",
        platform: "Go.dev"
      });
      resources.tutorials.push({
        title: "Go by Example",
        url: "https://gobyexample.com/",
        platform: "Go by Example"
      });
    }
    
    // Database & Data Engineering
    else if (skillLower.includes('database') || skillLower.includes('sql')) {
      resources.courses.push({
        title: "SQL Course",
        url: "https://www.khanacademy.org/computing/computer-programming/sql",
        platform: "Khan Academy"
      });
      resources.tutorials.push({
        title: "SQL Exercises",
        url: "https://www.sqlzoo.net/",
        platform: "SQLZoo"
      });
      resources.courses.push({
        title: "Database Design",
        url: "https://www.coursera.org/learn/database-design",
        platform: "Coursera"
      });
    }
    else if (skillLower.includes('mongodb') || skillLower.includes('nosql')) {
      resources.courses.push({
        title: "MongoDB University",
        url: "https://university.mongodb.com/",
        platform: "MongoDB"
      });
      resources.tutorials.push({
        title: "NoSQL Design Patterns",
        url: "https://docs.mongodb.com/manual/core/data-modeling-introduction/",
        platform: "MongoDB Docs"
      });
    }
    else if (skillLower.includes('postgresql') || skillLower.includes('postgres')) {
      resources.courses.push({
        title: "PostgreSQL Documentation",
        url: "https://www.postgresql.org/docs/",
        platform: "PostgreSQL"
      });
      resources.tutorials.push({
        title: "PostgreSQL Exercises",
        url: "https://pgexercises.com/",
        platform: "PG Exercises"
      });
    }
    
    // DevOps & Cloud
    else if (skillLower.includes('devops') || skillLower.includes('ci/cd') || skillLower.includes('cicd')) {
      resources.courses.push({
        title: "DevOps Fundamentals",
        url: "https://www.atlassian.com/devops",
        platform: "Atlassian"
      });
      resources.tutorials.push({
        title: "CI/CD Pipeline Tutorials",
        url: "https://www.jenkins.io/doc/tutorials/",
        platform: "Jenkins"
      });
    }
    else if (skillLower.includes('kubernetes') || skillLower.includes('k8s')) {
      resources.courses.push({
        title: "Kubernetes Documentation",
        url: "https://kubernetes.io/docs/tutorials/",
        platform: "Kubernetes.io"
      });
      resources.tutorials.push({
        title: "Kubernetes Learning Path",
        url: "https://azure.microsoft.com/en-us/resources/kubernetes-learning-path/",
        platform: "Microsoft Azure"
      });
    }
    else if (skillLower.includes('docker') || skillLower.includes('container')) {
      resources.courses.push({
        title: "Docker Documentation",
        url: "https://docs.docker.com/get-started/",
        platform: "Docker"
      });
      resources.tutorials.push({
        title: "Docker Labs",
        url: "https://github.com/docker/labs",
        platform: "GitHub"
      });
    }
    else if (skillLower.includes('cloud') || skillLower.includes('aws') || skillLower.includes('azure')) {
      resources.courses.push({
        title: "Cloud Fundamentals",
        url: "https://aws.amazon.com/training/learn-about/",
        platform: "AWS Training"
      });
      resources.tutorials.push({
        title: "Cloud Architecture Center",
        url: "https://cloud.google.com/architecture",
        platform: "Google Cloud"
      });
    }
    else if (skillLower.includes('terraform') || skillLower.includes('infrastructure as code')) {
      resources.courses.push({
        title: "Terraform Documentation",
        url: "https://learn.hashicorp.com/terraform",
        platform: "HashiCorp Learn"
      });
      resources.tutorials.push({
        title: "Infrastructure as Code Tutorials",
        url: "https://developer.hashicorp.com/terraform/tutorials",
        platform: "HashiCorp"
      });
    }
    
    // Data Science & Machine Learning
    else if (skillLower.includes('data science') || skillLower.includes('data analysis')) {
      resources.courses.push({
        title: "Data Science Path",
        url: "https://www.datacamp.com/",
        platform: "DataCamp"
      });
      resources.tutorials.push({
        title: "Kaggle Tutorials",
        url: "https://www.kaggle.com/learn",
        platform: "Kaggle"
      });
    }
    else if (skillLower.includes('machine learning') || skillLower.includes('ml') || skillLower.includes('ai')) {
      resources.courses.push({
        title: "ML Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        platform: "Google"
      });
      resources.tutorials.push({
        title: "Practical ML",
        url: "https://www.kaggle.com/learn/intro-to-machine-learning",
        platform: "Kaggle"
      });
    }
    else if (skillLower.includes('deep learning') || skillLower.includes('neural network')) {
      resources.courses.push({
        title: "Deep Learning Specialization",
        url: "https://www.deeplearning.ai/courses/deep-learning-specialization/",
        platform: "DeepLearning.AI"
      });
      resources.tutorials.push({
        title: "PyTorch Tutorials",
        url: "https://pytorch.org/tutorials/",
        platform: "PyTorch"
      });
    }
    else if (skillLower.includes('tensorflow') || skillLower.includes('keras')) {
      resources.courses.push({
        title: "TensorFlow Documentation",
        url: "https://www.tensorflow.org/learn",
        platform: "TensorFlow"
      });
      resources.tutorials.push({
        title: "Keras Documentation",
        url: "https://keras.io/guides/",
        platform: "Keras"
      });
    }
    else if (skillLower.includes('nlp') || skillLower.includes('natural language')) {
      resources.courses.push({
        title: "NLP Specialization",
        url: "https://www.coursera.org/specializations/natural-language-processing",
        platform: "Coursera"
      });
      resources.tutorials.push({
        title: "Hugging Face Transformers",
        url: "https://huggingface.co/docs/transformers/index",
        platform: "Hugging Face"
      });
    }
    
    // Mobile Development
    else if (skillLower.includes('android') || skillLower.includes('kotlin')) {
      resources.courses.push({
        title: "Android Developers",
        url: "https://developer.android.com/courses",
        platform: "Android"
      });
      resources.tutorials.push({
        title: "Kotlin Documentation",
        url: "https://kotlinlang.org/docs/home.html",
        platform: "Kotlin"
      });
    }
    else if (skillLower.includes('ios') || skillLower.includes('swift')) {
      resources.courses.push({
        title: "Swift Documentation",
        url: "https://docs.swift.org/swift-book/",
        platform: "Swift.org"
      });
      resources.tutorials.push({
        title: "iOS App Dev Tutorials",
        url: "https://developer.apple.com/tutorials/app-dev-training/",
        platform: "Apple Developer"
      });
    }
    else if (skillLower.includes('react native') || (skillLower.includes('react') && skillLower.includes('mobile'))) {
      resources.courses.push({
        title: "React Native Documentation",
        url: "https://reactnative.dev/docs/getting-started",
        platform: "React Native"
      });
      resources.tutorials.push({
        title: "React Native Express",
        url: "https://www.reactnative.express/",
        platform: "React Native Express"
      });
    }
    else if (skillLower.includes('flutter') || skillLower.includes('dart')) {
      resources.courses.push({
        title: "Flutter Documentation",
        url: "https://docs.flutter.dev/",
        platform: "Flutter"
      });
      resources.tutorials.push({
        title: "Flutter Codelabs",
        url: "https://codelabs.developers.google.com/?cat=flutter",
        platform: "Google Developers"
      });
    }
    
    // Cybersecurity
    else if (skillLower.includes('security') || skillLower.includes('cyber') || skillLower.includes('infosec')) {
      resources.courses.push({
        title: "Cybersecurity Fundamentals",
        url: "https://www.coursera.org/specializations/intro-cyber-security",
        platform: "Coursera"
      });
      resources.tutorials.push({
        title: "OWASP Top Ten",
        url: "https://owasp.org/www-project-top-ten/",
        platform: "OWASP"
      });
    }
    else if (skillLower.includes('penetration testing') || skillLower.includes('ethical hacking') || skillLower.includes('pen test')) {
      resources.courses.push({
        title: "Penetration Testing",
        url: "https://www.offensive-security.com/pwk-oscp/",
        platform: "Offensive Security"
      });
      resources.tutorials.push({
        title: "HackTheBox Academy",
        url: "https://academy.hackthebox.com/",
        platform: "HackTheBox"
      });
    }
    else if (skillLower.includes('network security') || skillLower.includes('firewall')) {
      resources.courses.push({
        title: "Network Security",
        url: "https://www.comptia.org/certifications/security",
        platform: "CompTIA"
      });
      resources.tutorials.push({
        title: "Cisco Security",
        url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/security.html",
        platform: "Cisco"
      });
    }
    
    // QA & Testing
    else if (skillLower.includes('test') || skillLower.includes('qa') || skillLower.includes('quality assurance')) {
      resources.courses.push({
        title: "Software Testing",
        url: "https://www.ministryoftesting.com/",
        platform: "Ministry of Testing"
      });
      resources.tutorials.push({
        title: "Test Automation University",
        url: "https://testautomationu.applitools.com/",
        platform: "Applitools"
      });
    }
    else if (skillLower.includes('selenium') || skillLower.includes('webdriver')) {
      resources.courses.push({
        title: "Selenium Documentation",
        url: "https://www.selenium.dev/documentation/en/",
        platform: "Selenium"
      });
      resources.tutorials.push({
        title: "Selenium WebDriver Tutorials",
        url: "https://ultimateqa.com/automation/",
        platform: "UltimateQA"
      });
    }
    else if (skillLower.includes('cypress') || skillLower.includes('playwright')) {
      resources.courses.push({
        title: "Cypress Documentation",
        url: "https://docs.cypress.io/",
        platform: "Cypress"
      });
      resources.tutorials.push({
        title: "Playwright Documentation",
        url: "https://playwright.dev/docs/intro",
        platform: "Playwright"
      });
    }
    
    // UX/UI Design
    else if (skillLower.includes('ux') || skillLower.includes('ui') || skillLower.includes('user experience') || skillLower.includes('user interface')) {
      resources.courses.push({
        title: "UX Design Course",
        url: "https://www.interaction-design.org/courses",
        platform: "Interaction Design Foundation"
      });
      resources.tutorials.push({
        title: "UI/UX Case Studies",
        url: "https://www.nngroup.com/articles/",
        platform: "Nielsen Norman Group"
      });
    }
    else if (skillLower.includes('figma')) {
      resources.courses.push({
        title: "Figma Documentation",
        url: "https://help.figma.com/hc/en-us",
        platform: "Figma"
      });
      resources.tutorials.push({
        title: "Figma Community",
        url: "https://www.figma.com/community/explore",
        platform: "Figma"
      });
    }
    else if (skillLower.includes('design system') || skillLower.includes('design thinking')) {
      resources.courses.push({
        title: "Design Systems Course",
        url: "https://designsystemcourse.com/",
        platform: "Design Systems"
      });
      resources.tutorials.push({
        title: "Design Thinking",
        url: "https://www.ideou.com/pages/design-thinking",
        platform: "IDEO U"
      });
    }
    
    // Product Management
    else if (skillLower.includes('product management') || skillLower.includes('product manager')) {
      resources.courses.push({
        title: "Product Management Courses",
        url: "https://www.productschool.com/",
        platform: "Product School"
      });
      resources.tutorials.push({
        title: "Product Management Resources",
        url: "https://www.mindtheproduct.com/",
        platform: "Mind the Product"
      });
    }
    else if (skillLower.includes('agile') || skillLower.includes('scrum')) {
      resources.courses.push({
        title: "Agile Methodologies",
        url: "https://www.scrum.org/resources/what-is-scrum",
        platform: "Scrum.org"
      });
      resources.tutorials.push({
        title: "Agile Resources",
        url: "https://www.atlassian.com/agile",
        platform: "Atlassian"
      });
    }
    else if (skillLower.includes('product management') || skillLower.includes('roadmap')) {
      resources.courses.push({
        title: "Product Roadmapping",
        url: "https://www.productplan.com/learn/",
        platform: "ProductPlan"
      });
      resources.tutorials.push({
        title: "Product Management Templates",
        url: "https://www.aha.io/roadmapping/guide",
        platform: "Aha!"
      });
    }
    
    // Web Development General
    else if (skillLower.includes('web dev') || skillLower.includes('frontend') || skillLower.includes('front-end') || skillLower.includes('front end')) {
      resources.courses.push({
        title: "Web Development Path",
        url: "https://www.freecodecamp.org/learn/responsive-web-design/",
        platform: "freeCodeCamp"
      });
      resources.tutorials.push({
        title: "Frontend Mentor",
        url: "https://www.frontendmentor.io/challenges",
        platform: "Frontend Mentor"
      });
    }
    else if (skillLower.includes('backend') || skillLower.includes('back-end') || skillLower.includes('back end') || skillLower.includes('server')) {
      resources.courses.push({
        title: "Backend Development",
        url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs",
        platform: "The Odin Project"
      });
      resources.tutorials.push({
        title: "Backend Web Development",
        url: "https://roadmap.sh/backend",
        platform: "roadmap.sh"
      });
    }
    else if (skillLower.includes('fullstack') || skillLower.includes('full-stack') || skillLower.includes('full stack')) {
      resources.courses.push({
        title: "Full Stack Development",
        url: "https://www.freecodecamp.org/learn/",
        platform: "freeCodeCamp"
      });
      resources.tutorials.push({
        title: "Full Stack Open",
        url: "https://fullstackopen.com/en/",
        platform: "University of Helsinki"
      });
    }
    
    // Blockchain & Web3
    else if (skillLower.includes('blockchain') || skillLower.includes('web3') || skillLower.includes('crypto')) {
      resources.courses.push({
        title: "Blockchain Basics",
        url: "https://www.coursera.org/learn/blockchain-basics",
        platform: "Coursera"
      });
      resources.tutorials.push({
        title: "Web3 University",
        url: "https://www.web3.university/",
        platform: "Web3 University"
      });
    }
    else if (skillLower.includes('solidity') || skillLower.includes('smart contract')) {
      resources.courses.push({
        title: "Solidity Documentation",
        url: "https://docs.soliditylang.org/",
        platform: "Solidity"
      });
      resources.tutorials.push({
        title: "CryptoZombies",
        url: "https://cryptozombies.io/",
        platform: "CryptoZombies"
      });
    }
    
    // Soft Skills & Career Development
    else if (skillLower.includes('communication') || skillLower.includes('soft skill')) {
      resources.courses.push({
        title: "Communication Skills",
        url: "https://www.coursera.org/specializations/effective-communication",
        platform: "Coursera"
      });
      resources.tutorials.push({
        title: "Professional Communication",
        url: "https://www.linkedin.com/learning/topics/communication",
        platform: "LinkedIn Learning"
      });
    }
    else if (skillLower.includes('leadership') || skillLower.includes('management')) {
      resources.courses.push({
        title: "Leadership Skills",
        url: "https://www.coursera.org/specializations/organizational-leadership",
        platform: "Coursera"
      });
      resources.tutorials.push({
        title: "Management Training",
        url: "https://www.mindtools.com/pages/main/newMN_LDR.htm",
        platform: "Mind Tools"
      });
    }
    
    return resources;
  };
  
  // Helper function to determine default skills based on career path
  const determineDefaultSkillsForCareer = (careerPath) => {
    const careerLower = careerPath.toLowerCase();
    
    // Frontend Development Paths
    if (careerLower.includes('frontend') || careerLower.includes('front-end') || careerLower.includes('front end')) {
      return [
        {
          name: "JavaScript Programming",
          description: "Develop strong JavaScript skills required for modern frontend development",
          category: "Programming Languages"
        },
        {
          name: "Frontend Frameworks",
          description: "Learn React, Vue, or Angular to build interactive web applications",
          category: "Frontend"
        },
        {
          name: "Responsive Design",
          description: "Master CSS and responsive design principles for modern web applications",
          category: "Web Development"
        }
      ];
    }
    // Backend Development Paths
    else if (careerLower.includes('backend') || careerLower.includes('back-end') || careerLower.includes('back end')) {
      return [
        {
          name: "Server-side Programming",
          description: "Master Node.js, Python, or Java for backend development",
          category: "Programming Languages"
        },
        {
          name: "Database Management",
          description: "Learn SQL and database design principles for efficient data storage",
          category: "Database"
        },
        {
          name: "API Development",
          description: "Develop skills in creating RESTful and GraphQL APIs",
          category: "Web Development"
        }
      ];
    }
    // Full Stack Development Paths
    else if (careerLower.includes('fullstack') || careerLower.includes('full-stack') || careerLower.includes('full stack')) {
      return [
        {
          name: "JavaScript Full Stack",
          description: "Develop end-to-end JavaScript skills for both frontend and backend",
          category: "Programming Languages"
        },
        {
          name: "Database Management",
          description: "Learn SQL and NoSQL database technologies for data persistence",
          category: "Database"
        },
        {
          name: "Web Application Architecture",
          description: "Understand how to design scalable and maintainable web applications",
          category: "System Design"
        }
      ];
    }
    // Data Science & Analytics Paths
    else if (careerLower.includes('data') || careerLower.includes('analyst')) {
      return [
        {
          name: "Data Analysis",
          description: "Learn techniques for cleaning, processing, and analyzing large datasets",
          category: "Data Science"
        },
        {
          name: "Python for Data Science",
          description: "Master Python with pandas, NumPy, and matplotlib for data analysis",
          category: "Programming Languages"
        },
        {
          name: "Data Visualization",
          description: "Develop skills in creating insightful visualizations and dashboards",
          category: "Data Science"
        }
      ];
    }
    // Machine Learning & AI Paths
    else if (careerLower.includes('machine learning') || careerLower.includes('ml') || careerLower.includes('ai')) {
      return [
        {
          name: "Machine Learning Fundamentals",
          description: "Master core ML algorithms and their applications",
          category: "Artificial Intelligence"
        },
        {
          name: "Python for ML",
          description: "Learn Python with scikit-learn, TensorFlow, and PyTorch",
          category: "Programming Languages"
        },
        {
          name: "Mathematics for ML",
          description: "Develop skills in statistics, linear algebra, and calculus for ML",
          category: "Mathematics"
        }
      ];
    }
    // DevOps & Cloud Paths
    else if (careerLower.includes('devops') || careerLower.includes('cloud')) {
      return [
        {
          name: "Cloud Technologies",
          description: "Master AWS, Azure, or Google Cloud for cloud infrastructure",
          category: "Cloud Computing"
        },
        {
          name: "Containerization",
          description: "Learn Docker and Kubernetes for container orchestration",
          category: "DevOps"
        },
        {
          name: "Infrastructure as Code",
          description: "Develop skills in Terraform, CloudFormation, or Ansible",
          category: "DevOps"
        }
      ];
    }
    // Mobile Development Paths
    else if (careerLower.includes('mobile') || careerLower.includes('app')) {
      return [
        {
          name: "Mobile Development",
          description: "Learn React Native or Flutter for cross-platform app development",
          category: "Mobile Development"
        },
        {
          name: "UI/UX for Mobile",
          description: "Master mobile interface design principles and user experience",
          category: "Design"
        },
        {
          name: "State Management",
          description: "Develop skills in managing application state for complex apps",
          category: "Software Architecture"
        }
      ];
    }
    // Cybersecurity Paths
    else if (careerLower.includes('security') || careerLower.includes('cyber')) {
      return [
        {
          name: "Security Fundamentals",
          description: "Learn core cybersecurity principles and best practices",
          category: "Cybersecurity"
        },
        {
          name: "Network Security",
          description: "Understand network protocols and security measures",
          category: "Cybersecurity"
        },
        {
          name: "Security Operations",
          description: "Develop skills in threat detection, incident response, and security monitoring",
          category: "Cybersecurity"
        }
      ];
    }
    // QA & Testing Paths
    else if (careerLower.includes('qa') || careerLower.includes('test') || careerLower.includes('quality')) {
      return [
        {
          name: "Test Automation",
          description: "Learn frameworks like Selenium, Cypress, or Playwright for automated testing",
          category: "QA"
        },
        {
          name: "Testing Methodologies",
          description: "Understand different testing approaches including unit, integration, and E2E testing",
          category: "QA"
        },
        {
          name: "CI/CD for Testing",
          description: "Implement continuous testing in development pipelines",
          category: "DevOps"
        }
      ];
    }
    // UX/UI Design Paths
    else if (careerLower.includes('ux') || careerLower.includes('ui') || careerLower.includes('design')) {
      return [
        {
          name: "UI Design Principles",
          description: "Master visual design, typography, and layout for digital interfaces",
          category: "Design"
        },
        {
          name: "User Experience Research",
          description: "Learn methods for understanding user needs and testing designs",
          category: "Design"
        },
        {
          name: "Design Tools",
          description: "Develop proficiency in industry tools like Figma, Sketch, or Adobe XD",
          category: "Design"
        }
      ];
    }
    // Product Management Paths
    else if (careerLower.includes('product') || careerLower.includes('manager')) {
      return [
        {
          name: "Product Strategy",
          description: "Understand how to define and execute product vision and roadmap",
          category: "Product Management"
        },
        {
          name: "User Research",
          description: "Learn techniques for gathering and analyzing user feedback",
          category: "Product Management"
        },
        {
          name: "Agile Methodologies",
          description: "Master frameworks for iterative product development and delivery",
          category: "Project Management"
        }
      ];
    }
    // Blockchain & Web3 Paths
    else if (careerLower.includes('blockchain') || careerLower.includes('web3')) {
      return [
        {
          name: "Blockchain Fundamentals",
          description: "Understand the core concepts of distributed ledger technology",
          category: "Blockchain"
        },
        {
          name: "Smart Contract Development",
          description: "Learn languages like Solidity for creating decentralized applications",
          category: "Blockchain"
        },
        {
          name: "Web3 Architecture",
          description: "Develop skills in building decentralized applications and services",
          category: "Blockchain"
        }
      ];
    }
    
    // Default skills for general tech careers
    return [
      {
        name: "Programming Fundamentals",
        description: "Build a strong foundation in programming principles and logic",
        category: "Programming"
      },
      {
        name: "Web Development",
        description: "Develop skills in creating modern web applications and services",
        category: "Web Development"
      },
      {
        name: "Project Management",
        description: "Learn to manage technical projects and collaborate effectively",
        category: "Soft Skills"
      }
    ];
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
      
      // Add enhanced resources based on the tasks
      const resourcesForTasks = generateResourcesForTasks(tasks);
      
      if (resourcesForTasks.length > 0) {
        formattedContent.push(
          <div key={`enhanced-resources-${monthHeader}`} className="ml-6 mt-2 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h6 className="font-medium text-blue-800 mb-2 text-sm">Recommended Resources:</h6>
              <div className="space-y-2">
                {resourcesForTasks.map((resource, rIndex) => (
                  <div key={`resource-${monthHeader}-${rIndex}`} className="flex items-start">
                    <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-800 font-medium">{resource.title}</p>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {resource.platform || 'View Resource'} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    };
    
    // Generate specific resources based on task descriptions
    const generateResourcesForTasks = (tasks) => {
      const resources = [];
      
      // Join all tasks into a single string for easier checking
      const tasksText = tasks.join(' ').toLowerCase();
      
      // Check for specific keywords and add relevant resources
      if (tasksText.includes('ai') || tasksText.includes('machine learning')) {
        resources.push({
          title: 'Machine Learning for Healthcare',
          url: 'https://www.coursera.org/specializations/ai-for-medicine',
          platform: 'Coursera'
        });
        resources.push({
          title: 'AI for Financial Services',
          url: 'https://www.edx.org/course/artificial-intelligence-for-trading',
          platform: 'edX'
        });
      }
      
      if (tasksText.includes('cloud') || tasksText.includes('azure') || tasksText.includes('google cloud')) {
        resources.push({
          title: 'Google Cloud Certification Training',
          url: 'https://cloud.google.com/certification',
          platform: 'Google Cloud'
        });
        resources.push({
          title: 'Microsoft Azure Fundamentals',
          url: 'https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/',
          platform: 'Microsoft Learn'
        });
      }
      
      if (tasksText.includes('mlops') || tasksText.includes('kubeflow') || tasksText.includes('mlflow')) {
        resources.push({
          title: 'MLOps Specialization',
          url: 'https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-mlops/',
          platform: 'DeepLearning.AI'
        });
        resources.push({
          title: 'Kubeflow Documentation & Tutorials',
          url: 'https://www.kubeflow.org/docs/started/getting-started/',
          platform: 'Kubeflow.org'
        });
      }
      
      if (tasksText.includes('business analytics') || tasksText.includes('performance indicators')) {
        resources.push({
          title: 'Business Analytics Specialization',
          url: 'https://www.coursera.org/specializations/business-analytics',
          platform: 'Coursera'
        });
      }
      
      if (tasksText.includes('data engineering') || tasksText.includes('hadoop') || tasksText.includes('spark')) {
        resources.push({
          title: 'Data Engineering with Google Cloud',
          url: 'https://www.coursera.org/professional-certificates/gcp-data-engineering',
          platform: 'Coursera'
        });
        resources.push({
          title: 'Spark & Hadoop Fundamentals',
          url: 'https://www.udemy.com/course/best-hands-on-big-data-practices-hadoop-spark-using-python/',
          platform: 'Udemy'
        });
      }
      
      if (tasksText.includes('project') || tasksText.includes('capstone')) {
        resources.push({
          title: 'End-to-End ML Project Template',
          url: 'https://github.com/https-deeplearning-ai/machine-learning-engineering-for-production-public',
          platform: 'GitHub'
        });
      }
      
      // Add professional certifications if career paths indicate they're valuable
      if (careerPaths.some(path => path.title.includes('Data Scientist') || path.title.includes('ML Engineer'))) {
        resources.push({
          title: 'TensorFlow Developer Certification',
          url: 'https://www.tensorflow.org/certificate',
          platform: 'TensorFlow.org'
        });
      }
      
      // Limit to 3 resources to avoid overwhelming the user
      return resources.slice(0, 3);
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
      
      // Add additional months based on timeline
      const timelineMap = {
        'Less than 6 months': 9,
        '6-12 months': 12,
        '1-2 years': 18,
        '2+ years': 24,
        'Already transitioning': 9
      };
      
      const maxMonths = timelineMap[userData.transitionTimeline] || 12;
      
      // Month 7-8
      if (maxMonths >= 8) {
        const month78Tasks = [
          "Start building a personal portfolio website showcasing your projects and skills",
          "Begin contributing to open-source projects related to your field",
          "Enhance your understanding of system design and architecture principles"
        ];
        
        enhanceLearningRoadmap("Month 7-8:", month78Tasks);
      }
      
      // Month 9-10
      if (maxMonths >= 10) {
        const month910Tasks = [
          "Take advanced specialized courses in your chosen career path's domain",
          "Start networking with professionals in your target industry through meetups and conferences",
          "Begin preparing for technical interviews with practice sessions"
        ];
        
        enhanceLearningRoadmap("Month 9-10:", month910Tasks);
      }
      
      // Month 11-12
      if (maxMonths >= 12) {
        const month1112Tasks = [
          "Finalize your professional portfolio with at least 3-5 substantial projects",
          "Prepare case studies of your projects to showcase problem-solving abilities",
          "Start applying for relevant positions and opportunities"
        ];
        
        enhanceLearningRoadmap("Month 11-12:", month1112Tasks);
      }
      
      // Month 13-15 (for longer timelines)
      if (maxMonths >= 15) {
        const month1315Tasks = [
          "Deepen expertise in specialized areas with advanced certifications",
          "Mentor others and lead collaborative projects to demonstrate leadership",
          "Explore freelance opportunities to build real-world experience"
        ];
        
        enhanceLearningRoadmap("Month 13-15:", month1315Tasks);
      }
      
      // Month 16-18 (for longer timelines)
      if (maxMonths >= 18) {
        const month1618Tasks = [
          "Focus on emerging technologies and trends in your field",
          "Consider publishing articles or research on your learnings",
          "Position yourself as a specialist in a high-demand niche"
        ];
        
        enhanceLearningRoadmap("Month 16-18:", month1618Tasks);
      }
      
      // Beyond (for 2+ year timelines)
      if (maxMonths >= 24) {
        const beyondTasks = [
          "Consider advanced degrees or specialized education if beneficial for your career goals",
          "Build a personal brand as a thought leader in your specialty",
          "Explore entrepreneurial opportunities leveraging your technical expertise"
        ];
        
        enhanceLearningRoadmap("Month 19-24:", beyondTasks);
      }
      
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

  // Custom Tools Proficiency Component
  const ToolsProficiency = ({ tools }) => {
    if (!tools || tools.length === 0 || (tools.length === 1 && tools[0] === 'None')) {
      return null;
    }
    
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
    
    // Monthly weekly commitment translation
    const commitmentMap = {
      'Less than 5 hours per week': 'part-time',
      '5-10 hours per week': 'balanced',
      '10-20 hours per week': 'dedicated',
      '20+ hours per week': 'intensive',
      'Full-time': 'full-time'
    };
    
    const commitment = commitmentMap[userData.timeCommitment] || 'balanced';
    
    if (months <= 6) {
      // Accelerated learning path (6 months or less)
      milestones.push(
        { 
          month: 1, 
          label: 'Core Foundations', 
          progress: 20,
          details: [
            `Begin learning ${topSkillsGaps[0] || 'fundamentals'} through online courses`,
            `Set up development environment for ${topCareerPath || 'your selected path'}`,
            'Join relevant tech communities and forums'
          ]
        },
        { 
          month: 2, 
          label: 'Skill Building', 
          progress: 40,
          details: [
            `Advance to intermediate ${topSkillsGaps[0] || 'skills'} concepts`,
            `Start learning ${topSkillsGaps[1] || 'additional skills'}`,
            'Complete first small project to apply new skills'
          ]
        },
        { 
          month: 3, 
          label: 'Project Development', 
          progress: 60,
          details: [
            'Begin comprehensive portfolio project',
            `Continue advancing ${topSkillsGaps[0] || 'primary skill'} with advanced topics`,
            'Prepare resume highlighting transferable skills from current role'
          ]
        },
        { 
          month: 4, 
          label: 'Portfolio Building', 
          progress: 75,
          details: [
            'Complete and refine main portfolio project',
            'Create professional online presence (GitHub, LinkedIn)',
            'Begin networking with professionals in target field'
          ]
        },
        { 
          month: 5, 
          label: 'Job Search Preparation', 
          progress: 90,
          details: [
            'Practice technical interviews and coding challenges',
            'Reach out to recruiters and companies in your desired field',
            'Attend industry meetups and events'
          ]
        },
        { 
          month: 6, 
          label: 'Job Ready', 
          progress: 100,
          details: [
            'Launch full job search campaign',
            'Continue enhancing skills while interviewing',
            'Consider freelance or contract work to build experience'
          ]
        }
      );
    } else if (months <= 12) {
      // Standard learning path (12 months)
      milestones.push(
        { 
          month: 1, 
          label: 'Self-Assessment', 
          progress: 10,
          details: [
            'Analyze your transferable skills from current role',
            'Research trends and requirements for your target careers',
            'Set up initial learning schedule and goals'
          ]
        },
        { 
          month: 2, 
          label: 'Foundation Building', 
          progress: 20,
          details: [
            `Begin foundational courses in ${topSkillsGaps[0] || 'key skills'}`,
            'Set up development environment and tools',
            'Join online communities related to your target field'
          ]
        },
        { 
          month: 4, 
          label: 'Core Skills Development', 
          progress: 40,
          details: [
            `Continue advancing ${topSkillsGaps[0] || 'primary skill'}`,
            `Begin learning ${topSkillsGaps[1] || 'secondary skills'}`,
            'Complete first set of guided projects'
          ]
        },
        { 
          month: 6, 
          label: 'Project Implementation', 
          progress: 60,
          details: [
            'Start independent portfolio projects',
            'Enhance online presence (LinkedIn, GitHub)',
            'Begin networking with industry professionals'
          ]
        },
        { 
          month: 8, 
          label: 'Advanced Learning', 
          progress: 70,
          details: [
            `Focus on advanced ${topCareerPath || 'career path'} concepts`,
            'Refine portfolio with complex projects',
            'Get feedback from mentors on your progress'
          ]
        },
        { 
          month: 10, 
          label: 'Portfolio Refinement', 
          progress: 85,
          details: [
            'Complete and polish 2-3 substantial portfolio projects',
            'Update resume highlighting new skills and projects',
            'Prepare for technical interviews and challenges'
          ]
        },
        { 
          month: 12, 
          label: 'Job Ready', 
          progress: 100,
          details: [
            'Launch targeted job search in your chosen field',
            'Continue skills enhancement while interviewing',
            'Consider freelance opportunities to build experience'
          ]
        }
      );
    } else {
      // Extended learning path (18+ months)
      milestones.push(
        { 
          month: 1, 
          label: 'Career Exploration', 
          progress: 5,
          details: [
            'Explore different specializations within your chosen path',
            'Identify mentors and learning resources',
            'Create comprehensive learning plan'
          ]
        },
        { 
          month: 3, 
          label: 'Foundation Building', 
          progress: 15,
          details: [
            `Begin learning ${topSkillsGaps[0] || 'foundational skills'}`,
            'Set up development environment and basic tools',
            'Complete basic exercises and small projects'
          ]
        },
        { 
          month: 6, 
          label: 'Core Skills', 
          progress: 30,
          details: [
            `Continue advancing in ${topSkillsGaps[0] || 'primary skill'}`,
            `Begin learning ${topSkillsGaps[1] || 'complementary skills'}`,
            'Start building simple portfolio projects'
          ]
        },
        { 
          month: 9, 
          label: 'Specialization', 
          progress: 45,
          details: [
            `Focus on ${topCareerPath || 'chosen specialization'} specific skills`,
            'Begin networking with professionals in target field',
            'Enhance online presence (LinkedIn, GitHub)'
          ]
        },
        { 
          month: 12, 
          label: 'Advanced Projects', 
          progress: 60,
          details: [
            'Develop complex portfolio projects',
            'Contribute to open source or community projects',
            'Build professional relationships in the industry'
          ]
        },
        { 
          month: 15, 
          label: 'Professional Development', 
          progress: 80,
          details: [
            'Refine portfolio with high-quality projects',
            'Attend industry events and conferences',
            'Prepare for technical interviews and assessments'
          ]
        },
        { 
          month: 18, 
          label: 'Career Transition', 
          progress: 100,
          details: [
            'Launch targeted job search in your specialized field',
            'Consider freelance or contract work to build experience',
            'Continue learning advanced topics while interviewing'
          ]
        }
      );
    }
    
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
              {(() => {
                // Ensure we have three paths to display
                let displayPaths = [...careerPaths];
                
                // If we have fewer than 3 paths, add some suggested ones
                if (displayPaths.length < 3) {
                  // For AI/ML paths
                  if (displayPaths.some(p => 
                      p.title.toLowerCase().includes('machine learning') || 
                      p.title.toLowerCase().includes('ai'))) {
                    
                    // Add MLOps if not already present
                    if (!displayPaths.some(p => p.title.toLowerCase().includes('mlops'))) {
                      displayPaths.push({
                        title: 'MLOps Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                      });
                    }
                    
                    // Add AI Research Scientist if still needed
                    if (displayPaths.length < 3 && 
                        !displayPaths.some(p => p.title.toLowerCase().includes('research'))) {
                      displayPaths.push({
                        title: 'AI Research Scientist',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                      });
                    }
                  }
                  // For Data Science paths
                  else if (displayPaths.some(p => p.title.toLowerCase().includes('data'))) {
                    // Add Data Engineer if not already present
                    if (!displayPaths.some(p => p.title.toLowerCase().includes('engineer'))) {
                      displayPaths.push({
                        title: 'Data Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                      });
                    }
                    
                    // Add Analytics Engineer if still needed
                    if (displayPaths.length < 3 && 
                        !displayPaths.some(p => p.title.toLowerCase().includes('analytics'))) {
                      displayPaths.push({
                        title: 'Analytics Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                      });
                    }
                  }
                  // Default fallbacks
                  else {
                    if (displayPaths.length < 3) {
                      displayPaths.push({
                        title: 'Data Scientist',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                      });
                    }
                    
                    if (displayPaths.length < 3) {
                      displayPaths.push({
                        title: 'MLOps Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                      });
                    }
                  }
                }
                
                // Only show first 3 paths
                displayPaths = displayPaths.slice(0, 3);
                
                return displayPaths.map((path, index) => (
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
                    
                    <div className="space-y-3 mt-4">
                      {index === 0 && (
                        <>
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Perfect Fit:</strong> Your {userData.experienceLevel.toLowerCase()} experience
                              {userData.studyField ? ` in ${userData.studyField}` : ''} aligns with the core requirements.
                            </p>
                            <p className="text-gray-700 mt-2">
                              <strong>Key Advantage:</strong> Your background in {
                                userData.currentRole ? userData.currentRole : 'your current field'
                              } provides transferable skills highly valued in this role.
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Required Skills</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skillsGap.filter(skill => skill.gap > 0).slice(0, 3).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Estimated Timeline</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>{userData.transitionTimeline === 'Less than 6 months' || userData.transitionTimeline === 'Already transitioning' ? 
                                '3-6 months' : 
                                userData.transitionTimeline === '6-12 months' ? 
                                '6-9 months' : 
                                '9-12 months'}</strong> based on your current experience and commitment level
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Career Outlook</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Strong Growth:</strong> Projected 22% increase in demand over the next 5 years with competitive salary ranges
                            </p>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Strong Alternative:</strong> Your technical skills combined with your background
                              {userData.currentRole ? ` in ${userData.currentRole}` : ''} create an excellent foundation.
                            </p>
                            <p className="text-gray-700 mt-2">
                              <strong>Natural Fit:</strong> Your interest in {
                                userData.careerPathsInterest && userData.careerPathsInterest.length > 0 
                                  ? userData.careerPathsInterest[0] 
                                  : 'technology'
                              } aligns well with the core responsibilities.
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Required Skills</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skillsGap.filter(skill => skill.gap > 0).slice(2, 5).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Estimated Timeline</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>{userData.transitionTimeline === 'Less than 6 months' || userData.transitionTimeline === 'Already transitioning' ? 
                                '4-8 months' : 
                                userData.transitionTimeline === '6-12 months' ? 
                                '8-12 months' : 
                                '10-14 months'}</strong> to build necessary specialization and portfolio
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Career Outlook</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>High Demand:</strong> Consistent growth with varied opportunities across industries
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Complementary Option:</strong> Leverages your analytical skills and technical knowledge while opening different opportunities.
                            </p>
                            <p className="text-gray-700 mt-2">
                              <strong>Growth Potential:</strong> Your background in {userData.studyField || 'your field'} provides a strong foundation for this emerging role.
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Required Skills</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skillsGap.filter(skill => skill.gap > 0).slice(4, 7).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Estimated Timeline</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>{userData.transitionTimeline === 'Less than 6 months' || userData.transitionTimeline === 'Already transitioning' ? 
                                '6-10 months' : 
                                userData.transitionTimeline === '6-12 months' ? 
                                '10-14 months' : 
                                '12-18 months'}</strong> to acquire specialized knowledge and experience
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Career Outlook</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Emerging Field:</strong> Growing demand for specialists with your technical background
                            </p>
                          </div>
                        </>
                      )}
                      
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
                  </div>
                ));
              })()}
            </div>
            
            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Career Path Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Career Path</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transition Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Focus</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(() => {
                      // Ensure we have three paths to display
                      let displayPaths = [...careerPaths];
                      
                      // If we have fewer than 3 paths, add some suggested ones
                      if (displayPaths.length < 3) {
                        // For AI/ML paths
                        if (displayPaths.some(p => 
                            p.title.toLowerCase().includes('machine learning') || 
                            p.title.toLowerCase().includes('ai'))) {
                          
                          // Add MLOps if not already present
                          if (!displayPaths.some(p => p.title.toLowerCase().includes('mlops'))) {
                            displayPaths.push({
                              title: 'MLOps Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                            });
                          }
                          
                          // Add AI Research Scientist if still needed
                          if (displayPaths.length < 3 && 
                              !displayPaths.some(p => p.title.toLowerCase().includes('research'))) {
                            displayPaths.push({
                              title: 'AI Research Scientist',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                            });
                          }
                        }
                        // For Data Science paths
                        else if (displayPaths.some(p => p.title.toLowerCase().includes('data'))) {
                          // Add Data Engineer if not already present
                          if (!displayPaths.some(p => p.title.toLowerCase().includes('engineer'))) {
                            displayPaths.push({
                              title: 'Data Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                            });
                          }
                          
                          // Add Analytics Engineer if still needed
                          if (displayPaths.length < 3 && 
                              !displayPaths.some(p => p.title.toLowerCase().includes('analytics'))) {
                            displayPaths.push({
                              title: 'Analytics Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                            });
                          }
                        }
                        // Default fallbacks
                        else {
                          if (displayPaths.length < 3) {
                            displayPaths.push({
                              title: 'Data Scientist',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                            });
                          }
                          
                          if (displayPaths.length < 3) {
                            displayPaths.push({
                              title: 'MLOps Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                            });
                          }
                        }
                      }
                      
                      // Only show first 3 paths
                      displayPaths = displayPaths.slice(0, 3);
                      
                      return displayPaths.map((path, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{path.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                              index === 0 ? 'bg-blue-100 text-blue-800' :
                              index === 1 ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'}`}>
                              {path.match}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {index === 0 ? 
                                (userData.transitionTimeline === 'Less than 6 months' ? '3-6 months' : '6-12 months') :
                              index === 1 ? 
                                (userData.transitionTimeline === 'Less than 6 months' ? '4-8 months' : '8-12 months') :
                                (userData.transitionTimeline === 'Less than 6 months' ? '6-10 months' : '10-16 months')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {index === 0 ? 
                                (skillsGap.length > 0 ? skillsGap[0].name : 'Technical foundations') :
                              index === 1 ? 
                                (skillsGap.length > 1 ? skillsGap[1].name : 'Analytical skills') :
                                (skillsGap.length > 2 ? skillsGap[2].name : 'Specialized knowledge')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${
                              index === 0 ? 'text-green-600' :
                              index === 1 ? 'text-blue-600' :
                              'text-purple-600'}`}>
                              {index === 0 ? 'Very High' : index === 1 ? 'High' : 'Growing'}
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Skills Gap Analysis - UPDATED SECTION */}
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
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-green-800 mb-1">Recommended Courses</h5>
                        <ul className="space-y-1">
                          {skill.resources?.courses.map((course, cIdx) => (
                            <li key={cIdx} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={course.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {course.title} ({course.platform})
                              </a>
                            </li>
                          )) || (
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={`https://www.coursera.org/search?query=${encodeURIComponent(skill.name)}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                Coursera Courses
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-green-800 mb-1">Practice & Projects</h5>
                        <ul className="space-y-1">
                          {skill.resources?.tutorials.map((tutorial, tIdx) => (
                            <li key={tIdx} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={tutorial.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {tutorial.title} ({tutorial.platform})
                              </a>
                            </li>
                          )) || (
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={`https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skill.name)}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                Udemy Tutorials
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-green-800 mb-1">Learning Communities</h5>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <a 
                              href={`https://www.reddit.com/search/?q=${encodeURIComponent(skill.name)}%20learning`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Reddit Communities
                            </a>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <a 
                              href={`https://discord.com/servers?search=${encodeURIComponent(skill.name)}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Discord Learning Groups
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {skillsGap.length > 4 && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {skillsGap.slice(4, 6).map((skill, index) => (
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
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skill.resources?.courses.slice(0, 1).map((course, cIdx) => (
                          <a 
                            key={cIdx}
                            href={course.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100"
                          >
                            {course.platform} Courses
                          </a>
                        ))}
                        
                        {skill.resources?.tutorials.slice(0, 1).map((tutorial, tIdx) => (
                          <a 
                            key={tIdx}
                            href={tutorial.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100"
                          >
                            {tutorial.platform}
                          </a>
                        ))}
                        
                        <a 
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill.name)}+tutorial+beginner`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100"
                        >
                          YouTube
                        </a>
                        
                        <a 
                          href={`https://github.com/topics/${encodeURIComponent(skill.name.toLowerCase().replace(/ /g, '-'))}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-gray-100"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 bg-white rounded-lg p-4 border border-green-100">
                <h4 className="font-medium text-green-800 mb-3">Learning Path Strategy</h4>
                <div className="flex">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Focus on your highest gap skills first</strong> - Begin with {
                      skillsGap.length > 0 ? skillsGap.sort((a, b) => b.gap - a.gap)[0].name : 'core skills'
                    } to build a strong foundation for your career transition.
                  </p>
                </div>
                <div className="flex mt-2">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Apply as you learn</strong> - For each skill, complete at least one project to reinforce your learning 
                    before moving to the next skill.
                  </p>
                </div>
                <div className="flex mt-2">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Commit to a schedule</strong> - Based on your {userData.timeCommitment || "available time"}, 
                    allocate specific hours each week dedicated to each skill in your learning roadmap.
                  </p>
                </div>
                <div className="flex mt-2">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Join learning communities</strong> - Engage with others learning the same skills to stay motivated
                    and solve problems collaboratively.
                  </p>
                </div>
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
        {userData.transitionTimeline && (
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
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong className="text-yellow-700">Pro Tip:</strong> Click "Show Details" on each milestone to see specific 
                    activities and objectives. Adjust your pace as needed based on your progress and changing circumstances.
                  </p>
                </div>
              </div>
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
        
        {/* Technical Proficiency Section - COMMENTED OUT as requested */}
        {/* 
        // Current Tools Proficiency - Removed as requested
        {userData.toolsUsed && userData.toolsUsed.length > 0 && userData.toolsUsed[0] !== 'None' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Technical Proficiency</h2>
            <ToolsProficiency tools={userData.toolsUsed} />
          </div>
        )}
        */}
        
        {/* Complete Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
          <div>
            {formatAnalysisText(analysis)}
          </div>
        </div>

        {/* Next Steps - Dynamic based on user analysis */}
        {nextSteps.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
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
