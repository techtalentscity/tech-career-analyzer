// src/Pages/career/CareerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { Radar, Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
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

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/viewform';

  useEffect(() => {
    const loadData = async () => {
      try {
        // First check if analysis was passed via location state
        if (location.state?.analysis) {
          setAnalysis(location.state.analysis);
          
          // If form data is available, set user data
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
          // If not in location state, try to retrieve from storage
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            setAnalysis(storedAnalysis.analysis);
            
            // Try to get the corresponding form submission
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
            // No analysis found, redirect to career test
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

  // Extract career paths and their match percentages from analysis text
  const extractCareerPaths = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    const careerPaths = [];
    
    // Regular expression to match career path lines with percentages
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

  // Extract skills gap data from analysis text and user data
  const extractSkillsGap = (text) => {
    if (!text) return [];
    
    const skills = [];
    const userToolsUsed = userData.toolsUsed || [];
    
    // Create skill map based on user's current tools
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

    // Map user's current skill levels based on their experience
    const experienceLevelMap = {
      'Complete beginner': 1,
      'Some exposure': 2,
      'Beginner': 2,
      'Intermediate': 3,
      'Advanced': 4
    };

    const currentLevel = experienceLevelMap[userData.experienceLevel] || 1;

    // Extract required skills from analysis
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
          
          // Determine current level based on user's tools
          let userCurrentLevel = currentLevel;
          
          // Check if user has related tool experience
          userToolsUsed.forEach(tool => {
            const mapping = toolSkillMapping[tool];
            if (mapping && skillName.toLowerCase().includes(mapping.name.toLowerCase())) {
              userCurrentLevel = Math.min(currentLevel + 1, 5);
            }
          });
          
          // Extract required level from description
          let requiredLevel = 4; // Default
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
            gap: requiredLevel - userCurrentLevel
          });
        }
      }
    });
    
    // If no skills found in analysis, create based on user's career interests
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
            careerPath: path
          });
        });
      });
    }
    
    return skills;
  };

  // Create skills radar chart data
  const createSkillsRadarData = () => {
    const skillsGap = extractSkillsGap(analysis);
    const skillCategories = {};
    
    // Group skills by category
    skillsGap.forEach(skill => {
      const category = skill.careerPath || 'General Skills';
      if (!skillCategories[category]) {
        skillCategories[category] = [];
      }
      skillCategories[category].push(skill);
    });
    
    // Create data for the most relevant career path
    const primaryPath = userData.careerPathsInterest[0] || 'General Skills';
    const primarySkills = skillCategories[primaryPath] || skillsGap.slice(0, 6);
    
    return {
      labels: primarySkills.map(skill => skill.name),
      datasets: [
        {
          label: 'Current Level',
          data: primarySkills.map(skill => skill.currentLevel),
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
        },
        {
          label: 'Required Level',
          data: primarySkills.map(skill => skill.requiredLevel),
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          borderColor: 'rgba(34, 197, 94, 1)',
          borderWidth: 2,
        }
      ]
    };
  };

  // Create tools proficiency chart
  const createToolsProficiencyData = () => {
    const toolsData = userData.toolsUsed.filter(tool => tool !== 'None');
    
    if (toolsData.length === 0) {
      return null;
    }

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

    // Adjust proficiency based on user's experience level
    const experienceMultiplier = {
      'Complete beginner': 0.5,
      'Some exposure': 0.7,
      'Beginner': 0.8,
      'Intermediate': 1,
      'Advanced': 1.2
    };

    const multiplier = experienceMultiplier[userData.experienceLevel] || 1;

    return {
      labels: toolsData,
      datasets: [{
        label: 'Proficiency Level',
        data: toolsData.map(tool => Math.round((toolProficiencyMap[tool] || 3) * multiplier)),
        backgroundColor: [
          'rgba(59, 130, 246, 0.6)',
          'rgba(34, 197, 94, 0.6)',
          'rgba(251, 146, 60, 0.6)',
          'rgba(168, 85, 247, 0.6)',
          'rgba(236, 72, 153, 0.6)',
          'rgba(250, 204, 21, 0.6)',
          'rgba(99, 102, 241, 0.6)',
          'rgba(14, 165, 233, 0.6)',
          'rgba(220, 38, 38, 0.6)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(250, 204, 21, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(220, 38, 38, 1)'
        ],
        borderWidth: 1,
      }]
    };
  };

  // Create career path interest distribution
  const createCareerInterestData = () => {
    const pathsWithMatches = extractCareerPaths(analysis);
    
    if (pathsWithMatches.length > 0) {
      return {
        labels: pathsWithMatches.map(path => path.title),
        datasets: [{
          label: 'Match Percentage',
          data: pathsWithMatches.map(path => path.match),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 146, 60, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 72, 153, 0.8)'
          ],
          borderColor: [
            'rgba(59, 130, 246, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(251, 146, 60, 1)',
            'rgba(168, 85, 247, 1)',
            'rgba(236, 72, 153, 1)'
          ],
          borderWidth: 2,
        }]
      };
    }
    
    // Fallback to user's selected interests
    const interestCounts = {};
    userData.careerPathsInterest.forEach(interest => {
      interestCounts[interest] = (interestCounts[interest] || 0) + 1;
    });
    
    return {
      labels: Object.keys(interestCounts),
      datasets: [{
        label: 'Interest Level',
        data: Object.values(interestCounts),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 2,
      }]
    };
  };

  // Create timeline visualization
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
    
    // Create milestones based on timeline
    if (months <= 6) {
      milestones.push(
        { month: 1, label: 'Start Learning', value: 20 },
        { month: 3, label: 'Complete Basics', value: 50 },
        { month: 6, label: 'Job Ready', value: 100 }
      );
    } else if (months <= 12) {
      milestones.push(
        { month: 2, label: 'Foundation', value: 20 },
        { month: 4, label: 'Core Skills', value: 40 },
        { month: 6, label: 'Projects', value: 60 },
        { month: 9, label: 'Portfolio', value: 80 },
        { month: 12, label: 'Job Ready', value: 100 }
      );
    } else {
      milestones.push(
        { month: 3, label: 'Foundation', value: 15 },
        { month: 6, label: 'Core Skills', value: 30 },
        { month: 9, label: 'Specialization', value: 45 },
        { month: 12, label: 'Projects', value: 60 },
        { month: 15, label: 'Portfolio', value: 80 },
        { month: 18, label: 'Job Ready', value: 100 }
      );
    }
    
    return {
      labels: milestones.map(m => m.label),
      datasets: [{
        label: 'Progress Timeline',
        data: milestones.map(m => m.value),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    };
  };

  // Format analysis text for display
  const formatAnalysisText = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    let formattedContent = [];
    let inSkillsGapSection = false;

    // Helper function to highlight important keywords and fix pronouns
    const processContent = (content) => {
      // First, replace third-person pronouns with second-person
      content = content.replace(/\btheir\b/gi, 'your');
      content = content.replace(/\bthey\b/gi, 'you');
      content = content.replace(/\bthem\b/gi, 'you');
      content = content.replace(/\bthemselves\b/gi, 'yourself');
      
      // Highlight important user data
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
      // Check if we're entering or leaving the skills gap section
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

      // Skip skills gap numbered items since we're showing them in charts
      if (inSkillsGapSection && line.match(/^\d+\.\s+/) && line.includes(':')) {
        return;
      }

      // Format section headers
      if (line.match(/^\d+\.\s+[A-Z]/)) {
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
      }
      // Format subsection headers
      else if (line.match(/^[a-z]\)\s+.*?\(\d+%\s+match/i)) {
        formattedContent.push(
          <h4 key={`subheader-${index}`} className="text-lg font-semibold mt-6 mb-2 text-blue-700">
            {line}
          </h4>
        );
      }
      // Format list items
      else if (line.trim().startsWith('-')) {
        const content = line.replace(/^-\s+/, '');
        formattedContent.push(
          <div key={`bullet-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      // Format numbered list items
      else if (line.trim().match(/^\d+\.\s+/)) {
        const content = line.replace(/^\d+\.\s+/, '');
        formattedContent.push(
          <div key={`numbered-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      // Format monthly sections
      else if (line.trim().match(/^Month\s+\d+-?\d*:/i)) {
        formattedContent.push(
          <h5 key={`month-${index}`} className="font-semibold mt-4 mb-2 text-blue-600 ml-4">
            {line}
          </h5>
        );
      }
      // Format empty lines
      else if (line.trim() === '') {
        formattedContent.push(<br key={`break-${index}`} />);
      }
      // Format regular text
      else {
        formattedContent.push(
          <p key={`text-${index}`} className="mb-3 text-gray-900" dangerouslySetInnerHTML={processContent(line)} />
        );
      }
    });

    return formattedContent;
  };

  // Component to render skill gap chart
  const SkillGapChart = ({ skill }) => {
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

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  // Extract data for visualizations
  const careerPaths = extractCareerPaths(analysis);
  const skillsGap = extractSkillsGap(analysis);
  const toolsData = createToolsProficiencyData();
  const timelineData = createTimelineData();

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

        {/* User Profile Summary with Enhanced Details */}
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
            
            <div className="mb-8">
              <Bar 
                data={createCareerInterestData()}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: 'Match Percentage by Career Path'
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        callback: function(value) {
                          return value + '%';
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            
            {/* Detailed Path Analysis */}
            <div className="space-y-6">
              {careerPaths.map((path, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{path.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      path.match >= 80 ? 'bg-green-100 text-green-700' :
                      path.match >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {path.match}% Match
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${path.match}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills Analysis with User Data */}
        {skillsGap.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
            
            {/* Skills Radar Chart */}
            <div className="mb-8" style={{ height: '400px' }}>
              <Radar 
                data={createSkillsRadarData()}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Current vs Required Skills'
                    }
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 5,
                      ticks: {
                        stepSize: 1,
                        callback: function(value) {
                          const labels = ['', 'Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
                          return labels[value] || '';
                        }
                      }
                    }
                  }
                }}
              />
            </div>
            
            {/* Individual Skill Gap Charts */}
            <div className="grid md:grid-cols-2 gap-4">
              {skillsGap.slice(0, 6).map((skill, index) => (
                <SkillGapChart key={index} skill={skill} />
              ))}
            </div>
          </div>
        )}
        
        {/* Current Tools Proficiency */}
        {toolsData && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Current Tools & Technologies</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div style={{ height: '300px' }}>
                <Doughnut 
                  data={toolsData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      title: {
                        display: true,
                        text: 'Tool Proficiency Distribution'
                      }
                    }
                  }}
                />
              </div>
              <div>
                <h3 className="font-semibold mb-3">Technology Stack</h3>
                <div className="space-y-3">
                  {userData.toolsUsed.filter(tool => tool !== 'None').map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{tool}</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ 
                              width: `${(toolsData.datasets[0].data[index] / 5) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">
                          {['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'][toolsData.datasets[0].data[index] - 1]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
          <div style={{ height: '300px' }}>
            <Line 
              data={timelineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: function(value) {
                        return value + '%';
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        
        {/* Complete Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
          <div>
            {formatAnalysisText(analysis)}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Start Learning</h3>
              <p className="text-sm text-gray-600">Begin with fundamentals in your chosen path</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-green-600 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Build Portfolio</h3>
              <p className="text-sm text-gray-600">Create projects to showcase your skills</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-purple-600 mb-2">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Network</h3>
              <p className="text-sm text-gray-600">Connect with professionals in your target field</p>
            </div>
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

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] relative">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">TTC-CareerTest Feedback Form</h2>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(90vh-5rem)] overflow-hidden">
              <iframe
                src={`${GOOGLE_FORM_URL}?embedded=true`}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="TTC-CareerTest Feedback Form"
              >
                Loading...
              </iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
