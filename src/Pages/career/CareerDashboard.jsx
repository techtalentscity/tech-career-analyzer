// src/Pages/career/CareerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    experienceLevel: '',
    studyField: '',          // Changed from currentField
    educationLevel: '',      // New field
    currentRole: '',
    yearsExperience: '',
    jobResponsibilities: '',
    jobProjects: '',
    jobTechnologies: '',
    publications: '',        // New field
    transferableSkills: '',
    interests: []
  });
  const [dashboardData, setDashboardData] = useState({
    careerPaths: [],
    skillsMap: {},
    resources: [],
    strengthsWeaknesses: { strengths: [], weaknesses: [] },
    timeToCareer: {}
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadData = async () => {
      try {
        // First check if analysis was passed via location state
        if (location.state?.analysis) {
          setAnalysis(location.state.analysis);
          
          // If form data is available, set user data
          if (location.state.formData) {
            const { 
              fullName, 
              email, 
              experienceLevel, 
              techInterests,
              techMotivation,
              techPassion,
              studyField,           // Changed from currentField
              educationLevel,       // New field
              currentRole,
              yearsExperience,
              jobResponsibilities,
              jobProjects,
              jobTechnologies,
              publications,         // New field
              transferableSkills
            } = location.state.formData;
            
            setUserData({
              name: fullName,
              email: email,
              experienceLevel: experienceLevel,
              studyField: studyField || 'Not specified',  // Changed from currentField
              educationLevel: educationLevel || 'Not specified', // New field
              currentRole: currentRole || 'Not specified',
              yearsExperience: yearsExperience || 'Not specified',
              jobResponsibilities: jobResponsibilities || 'Not specified',
              jobProjects: jobProjects || 'Not specified',
              jobTechnologies: jobTechnologies || 'Not specified',
              publications: publications || 'Not specified', // New field
              transferableSkills: transferableSkills || 'Not specified',
              interests: typeof techInterests === 'string' 
                ? techInterests.split(',').map(i => i.trim()) 
                : (Array.isArray(techInterests) ? techInterests : [])
            });
          }
          
          const parsedData = parseAnalysisData(location.state.analysis);
          setDashboardData(parsedData);
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
                studyField: submission.studyField || 'Not specified',  // Changed from currentField
                educationLevel: submission.educationLevel || 'Not specified', // New field
                currentRole: submission.currentRole || 'Not specified',
                yearsExperience: submission.yearsExperience || 'Not specified',
                jobResponsibilities: submission.jobResponsibilities || 'Not specified',
                jobProjects: submission.jobProjects || 'Not specified',
                jobTechnologies: submission.jobTechnologies || 'Not specified',
                publications: submission.publications || 'Not specified', // New field
                transferableSkills: submission.transferableSkills || 'Not specified',
                interests: typeof submission.techInterests === 'string' 
                  ? submission.techInterests.split(',').map(i => i.trim()) 
                  : (Array.isArray(submission.techInterests) ? submission.techInterests : [])
              });
            }
            
            const parsedData = parseAnalysisData(storedAnalysis.analysis);
            setDashboardData(parsedData);
          } else {
            // No analysis found, redirect to career test
            navigate('/career/test', { 
              state: { message: 'Please complete the assessment to view your dashboard' } 
            });
            return;
          }
        }
        
        // Add fallback check to ensure we have data to display
        if (
          dashboardData.careerPaths.length === 0 &&
          Object.keys(dashboardData.skillsMap).length === 0 &&
          dashboardData.resources.length === 0
        ) {
          // If still no data after parsing, create some defaults based on user data
          createDefaultDashboardData();
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

  const createDefaultDashboardData = () => {
    // Create some default career paths based on tech interests if available
    const careerPaths = [];
    const interests = userData.interests && userData.interests.length > 0 
      ? userData.interests 
      : ['Software Development', 'Data Analysis'];
    
    interests.forEach((interest, index) => {
      careerPaths.push({
        title: interest,
        match: 95 - (index * 5),
        description: `Career path based on your interest in ${interest}`,
        skills: ['Programming fundamentals', 'Problem solving', 'Communication skills'],
        resources: []
      });
    });
    
    // Add some default skills
    const skillsMap = {};
    ['Programming fundamentals', 'Problem solving', 'Communication skills', 'Web development', 'Data analysis'].forEach((skill, index) => {
      skillsMap[skill] = {
        count: 5 - index,
        careers: careerPaths.map(p => p.title)
      };
    });
    
    // Add default timeline
    const timeToCareer = {};
    careerPaths.forEach(path => {
      timeToCareer[path.title] = "9-15 months";
    });
    
    // Add some default resources
    const resources = [
      'Codecademy - Interactive coding lessons',
      'freeCodeCamp - Full web development curriculum',
      'Coursera - Technology courses from top universities',
      'Udemy - Affordable tech courses',
      'YouTube tutorials for beginners'
    ];

    // Extract some study-related skills from user data
    const techKeywords = ['software', 'programming', 'development', 'analysis', 'design', 'database', 'web', 'testing', 'automation', 'cloud', 'security'];
    let jobTechSkills = [];
    
    // Try to extract tech skills from job technologies
    if (userData.jobTechnologies && userData.jobTechnologies !== 'Not specified') {
      const techItems = userData.jobTechnologies.split(/[,;]/).map(item => item.trim());
      jobTechSkills = techItems.filter(item => 
        techKeywords.some(keyword => item.toLowerCase().includes(keyword))
      );
    }
    
    // Set dashboard data with defaults
    setDashboardData({
      careerPaths,
      skillsMap,
      resources,
      strengthsWeaknesses: { 
        strengths: [
          'Educational background in ' + userData.studyField,  // Changed from currentField
          ...jobTechSkills.slice(0, 3),
          'Willingness to learn new skills',
          'Problem-solving aptitude',
          'Attention to detail',
          'Adaptability to new technologies'
        ].filter(s => s !== 'Educational background in Not specified'), 
        weaknesses: [
          'Technical knowledge in programming languages',
          'Experience with development tools',
          'Portfolio of completed projects'
        ] 
      },
      timeToCareer
    });
  };

  const parseAnalysisData = (analysisText) => {
    try {
      // Initialize data structures
      const careerPaths = [];
      const skillsMap = {};
      const resources = [];
      const strengths = [];
      const weaknesses = [];
      const timeToCareer = {};
      
      // Split into lines for processing
      const lines = analysisText.split('\n');
      
      // Updated regex patterns for more accurate career path extraction - handles "a) Role Name (XX% match)"
      const careerPathRegex = /([a-z]\)\s+)?([^(]+)\s+\((\d+)%\s+match[,\s]*(.*?)?\)/i;
      
      // Define section matchers for identifying different parts of the analysis
      const sectionMatchers = {
        careerPaths: /career path recommendations|recommended career paths|career paths|path recommendations/i,
        skills: /skills development|skills gap|skills to develop|priority skills|skills analysis/i,
        resources: /learning resources|recommended resources|resources|learning plan/i,
        strengths: /strengths|your strengths|key strengths|strengths analysis/i,
        weaknesses: /areas for improvement|areas to improve|weaknesses|gaps|improvement areas/i,
        roadmap: /learning roadmap|roadmap|learning plan|development plan/i,
        transition: /transition strategy|transition plan|career transition/i
      };
      
      let currentSection = '';
      let subSection = '';
      let inCareerPathsSection = false;
      
      // First pass - identify the CAREER PATH RECOMMENDATIONS section to prioritize those paths
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Look for section headers like "1. CAREER PATH RECOMMENDATIONS:"
        if (line.match(/^\d+[\.\)]\s+CAREER PATH/i) || line.match(/CAREER PATH RECOMMENDATIONS/i)) {
          inCareerPathsSection = true;
          break;
        }
      }
      
      // Process each line
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (!line) continue;
        
        // Check for section headers (now more flexible)
        if (line.match(/^\d+[\.\)]\s+/)) {
          // This is likely a numbered section header (e.g. "1. Career Path Recommendations")
          for (const [section, pattern] of Object.entries(sectionMatchers)) {
            if (line.match(pattern)) {
              currentSection = section;
              subSection = '';
              // If we enter the career paths section, set the flag
              if (section === 'careerPaths') {
                inCareerPathsSection = true;
              } else if (inCareerPathsSection) {
                // If we're leaving the career paths section, set the flag to false
                inCareerPathsSection = false;
              }
              break;
            }
          }
          continue;
        }
        
        // Check for subsection headers like "a) Bioinformatics Specialist (85% match)"
        if (line.match(/^[a-z]\)\s+.+\(\d+%\s+match/i)) {
          subSection = line;
          
          // If we're in the career paths section, extract the career path
          if (inCareerPathsSection || currentSection === 'careerPaths') {
            const match = line.match(careerPathRegex);
            
            if (match) {
              const title = match[2].trim();
              const matchPercentage = parseInt(match[3], 10);
              
              // Look for timeline lines in the next lines
              let timeline = "12-18 months"; // Default timeline
              let j = i + 1;
              while (j < lines.length && j < i + 5) { // Look only a few lines ahead
                const nextLine = lines[j].trim();
                if (nextLine.match(/timeline|months|transition/i)) {
                  const timeMatch = nextLine.match(/(\d+)[-–](\d+)\s*(months|years)/i);
                  if (timeMatch) {
                    let start = parseInt(timeMatch[1], 10);
                    let end = parseInt(timeMatch[2], 10);
                    let unit = timeMatch[3].toLowerCase();
                    
                    if (unit.includes('year')) {
                      // Convert years to months for consistency
                      timeline = `${start*12}-${end*12} months`;
                    } else {
                      timeline = `${start}-${end} months`;
                    }
                    break;
                  }
                }
                j++;
              }
              
              // Create a new career path
              const careerPath = {
                title,
                match: matchPercentage,
                description: '',
                skills: [],
                resources: []
              };
              
              // Add to the careerPaths array
              careerPaths.push(careerPath);
              
              // Store the timeline
              timeToCareer[title] = timeline;
              
              // Look ahead for the description, which often starts with "- Explanation:"
              j = i + 1;
              let descriptionText = '';
              
              while (j < lines.length && 
                     !lines[j].match(/^[a-z]\)\s+.+\(\d+%\s+match/i) && 
                     !lines[j].match(/^\d+[\.\)]\s+/) &&
                     lines[j].trim() !== '') {
                    
                const descLine = lines[j].trim();
                
                // If this is an explanation line, use it as the description
                if (descLine.match(/^-\s+Explanation:/i)) {
                  const explanationMatch = descLine.match(/^-\s+Explanation:\s*(.+)/i);
                  if (explanationMatch) {
                    descriptionText = explanationMatch[1].trim();
                    
                    // Sometimes the explanation continues to the next line
                    if (j+1 < lines.length && !lines[j+1].match(/^-/)) {
                      const nextLine = lines[j+1].trim();
                      if (nextLine && !nextLine.match(/^[a-z]\)/i)) {
                        descriptionText += ' ' + nextLine;
                      }
                    }
                  }
                }
                
                // If it's another bullet point about skills mentioned in the explanation
                if (descLine.match(/^-\s+/) && 
                    (descLine.toLowerCase().includes('skill') || descLine.toLowerCase().includes('knowledge'))) {
                  const skill = descLine.replace(/^-\s+/, '').trim();
                  if (skill && !careerPath.skills.includes(skill)) {
                    careerPath.skills.push(skill);
                  }
                } 
                
                j++;
              }
              
              if (descriptionText) {
                careerPath.description = descriptionText;
              }
            }
          }
          
          continue;
        }
        
        // Process skills
        if ((currentSection === 'skills' || currentSection === 'roadmap') && 
            (line.match(/^\-\s+/) || line.match(/^\d+[\.\)]\s+/) || line.match(/^\*\s+/))) {
          
          // Extract the skill from bullet points or numbered lists
          const skill = line.replace(/^[\-\*\d\.]\s+/, '').trim();
          
          if (skill) {
            // Add to overall skills map
            if (!skillsMap[skill]) {
              skillsMap[skill] = {
                count: 0,
                careers: []
              };
            }
            skillsMap[skill].count++;
            
            // Try to associate with career paths
            for (const path of careerPaths) {
              if (!path.skills.includes(skill)) {
                path.skills.push(skill);
              }
              if (!skillsMap[skill].careers.includes(path.title)) {
                skillsMap[skill].careers.push(path.title);
              }
            }
          }
        }
        
        // Process strengths section
        if (currentSection === 'strengths' || line.match(/^\d+[\.\)]\s+STRENGTHS ANALYSIS/i)) {
          currentSection = 'strengths';
          if (line.match(/^\-\s+/)) {
            const strength = line.replace(/^[\-\*]\s+/, '').trim();
            if (strength && !strengths.includes(strength)) {
              strengths.push(strength);
            }
          }
        }
        
        // Process weaknesses/areas for improvement
        if (currentSection === 'weaknesses' || 
            (line.match(/^\-\s+/) && 
             (line.toLowerCase().includes('improve') || 
              line.toLowerCase().includes('weakness') || 
              subSection.toLowerCase().includes('improve') ||
              subSection.toLowerCase().includes('weakness')))) {
          
          const weakness = line.replace(/^[\-\*]\s+/, '').trim();
          if (weakness && !weaknesses.includes(weakness)) {
            weaknesses.push(weakness);
          }
        }
        
        // Process resources
        if ((currentSection === 'resources' || currentSection === 'roadmap') && 
            (line.match(/^\-\s+/) || line.match(/^\*\s+/) || line.startsWith('http'))) {
          
          // Extract resource from bullet points or links
          const resource = line.replace(/^[\-\*]\s+/, '').trim();
          
          if (resource && !resources.includes(resource)) {
            resources.push(resource);
            
            // Try to associate with career paths if in a subsection
            if (subSection) {
              for (const path of careerPaths) {
                // Check if the subsection contains this career path name
                if (subSection.toLowerCase().includes(path.title.toLowerCase()) && 
                    !path.resources.includes(resource)) {
                  path.resources.push(resource);
                }
              }
            }
          }
        }
      }
      
      // If we didn't find specialized career paths, fallback to the original method
      if (careerPaths.length === 0) {
        // Process the analysis text again with the regular expression for more general career paths
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          
          const match = line.match(careerPathRegex);
          
          if (match) {
            const title = match[2].trim();
            const matchPercentage = parseInt(match[3], 10);
            const timeline = match[4] ? match[4].trim() : "6-12 months"; // Default timeline
            
            // Create a new career path
            const careerPath = {
              title,
              match: matchPercentage,
              description: '',
              skills: [],
              resources: []
            };
            
            careerPaths.push(careerPath);
            timeToCareer[title] = timeline;
            
            // Look ahead for description lines
            let j = i + 1;
            let descriptionText = '';
            
            while (j < lines.length && 
                   !lines[j].match(careerPathRegex) && 
                   !lines[j].match(/^\d+[\.\)]\s+/) &&
                   lines[j].trim() !== '') {
              
              const descLine = lines[j].trim();
              
              if (descLine.match(/^\-\s+/) && 
                  (descLine.toLowerCase().includes('skill') || descLine.toLowerCase().includes('knowledge'))) {
                const skill = descLine.replace(/^\-\s+/, '').trim();
                if (skill && !careerPath.skills.includes(skill)) {
                  careerPath.skills.push(skill);
                }
              } 
              else if (descLine.match(/^\-\s+/) || descLine.match(/^\*\s+/)) {
                const descPart = descLine.replace(/^[\-\*]\s+/, '').trim();
                if (descriptionText) {
                  descriptionText += ' ' + descPart;
                } else {
                  descriptionText = descPart;
                }
              }
              
              j++;
            }
            
            careerPath.description = descriptionText;
            i = j - 1;
          }
        }
      }
      
      // Sort skills by frequency
      const sortedSkillsMap = {};
      Object.keys(skillsMap)
        .sort((a, b) => skillsMap[b].count - skillsMap[a].count)
        .forEach(key => {
          sortedSkillsMap[key] = skillsMap[key];
        });
      
      // If still no career paths, create a last-resort backup
      if (careerPaths.length === 0) {
        // Create default career paths based on common patterns in the analysis
        let careerMentions = [];
        
        // Look for career mentions in the text
        const careerKeywords = [
          { name: "Software Development", pattern: /software\s+dev|developer|coding|programming/i },
          { name: "Data Analysis", pattern: /data\s+analy|data\s+scien/i },
          { name: "UX/UI Design", pattern: /ux|ui\s+design|user\s+interface/i },
          { name: "Product Management", pattern: /product\s+manag/i },
          { name: "Cybersecurity", pattern: /cyber|security|secure/i },
          { name: "DevOps", pattern: /devops|operations/i },
          { name: "AI/Machine Learning", pattern: /ai|machine\s+learning|ml/i },
          { name: "Bioinformatics", pattern: /bioinformatics|biology|bio/i },
          { name: "Healthcare IT", pattern: /healthcare\s+it|medical\s+tech|health\s+system/i },
          { name: "Life Sciences", pattern: /life\s+science|pharmaceutical|biotech/i }
        ];
        
        // Count mentions of each career
        careerKeywords.forEach(career => {
          const matches = (analysisText.match(career.pattern) || []).length;
          if (matches > 0) {
            careerMentions.push({
              name: career.name,
              count: matches
            });
          }
        });
        
        // Sort by mention count
        careerMentions.sort((a, b) => b.count - a.count);
        
        // Create career paths from the top mentions
        careerMentions.slice(0, 3).forEach((career, index) => {
          careerPaths.push({
            title: career.name,
            match: 95 - (index * 5), // 95%, 90%, 85%
            description: `Career path based on your background and interests in ${career.name.toLowerCase()}`,
            skills: [],
            resources: []
          });
          
          timeToCareer[career.name] = "9-15 months";
        });
      }
      
      // Ensure we have an adequate number of skills per career path
      const commonSkills = [
        "Programming fundamentals", 
        "Problem solving", 
        "Communication skills", 
        "Data analysis", 
        "Project management"
      ];
      
      careerPaths.forEach(path => {
        // If the path has fewer than 3 skills, add some from the common skills
        if (path.skills.length < 3) {
          commonSkills.forEach(skill => {
            if (!path.skills.includes(skill)) {
              path.skills.push(skill);
              
              // Add to skills map if needed
              if (!sortedSkillsMap[skill]) {
                sortedSkillsMap[skill] = {
                  count: 0,
                  careers: []
                };
              }
              sortedSkillsMap[skill].count++;
              if (!sortedSkillsMap[skill].careers.includes(path.title)) {
                sortedSkillsMap[skill].careers.push(path.title);
              }
            }
            
            // Stop once we have at least 3 skills
            if (path.skills.length >= 3) return;
          });
        }
      });
      
      // Return the parsed data
      return {
        careerPaths,
        skillsMap: sortedSkillsMap,
        resources,
        strengthsWeaknesses: { strengths, weaknesses },
        timeToCareer
      };
    } catch (error) {
      console.error('Error parsing analysis data:', error);
      
      // Return a basic default structure that won't break the UI
      return {
        careerPaths: [
          {
            title: "Software Development",
            match: 85,
            description: "A versatile career path with opportunities in many industries.",
            skills: ["Programming", "Problem Solving", "Communication"],
            resources: []
          }
        ],
        skillsMap: {
          "Programming": { count: 3, careers: ["Software Development"] },
          "Problem Solving": { count: 2, careers: ["Software Development"] },
          "Communication": { count: 1, careers: ["Software Development"] }
        },
        resources: ["freeCodeCamp", "The Odin Project", "Codecademy"],
        strengthsWeaknesses: { 
          strengths: ["Analytical thinking", "Attention to detail"], 
          weaknesses: ["Technical experience", "Portfolio projects"] 
        },
        timeToCareer: { "Software Development": "9-15 months" }
      };
    }
  };

  const handleStartLearning = (skill) => {
    // Open a new tab with learning resources for the selected skill
    window.open(`https://www.google.com/search?q=learn+${encodeURIComponent(skill)}+tutorial`, '_blank');
  };

  const handleFindProjects = (careerPath) => {
    // Open a new tab with project ideas for the selected career path
    window.open(`https://www.google.com/search?q=${encodeURIComponent(careerPath)}+project+ideas+for+portfolio`, '_blank');
  };
  
  const getTopSkills = () => {
    return Object.keys(dashboardData.skillsMap).slice(0, 5);
  };
  
  if (loading) {
    return <LoadingSpinner message="Loading your career dashboard..." />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Your Tech Career Dashboard</h1>
          <p className="text-lg mt-2 opacity-90">
            Personalized career insights and learning path
          </p>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto">
          <nav className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-6 py-4 focus:outline-none ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('careerPaths')} 
              className={`px-6 py-4 focus:outline-none ${activeTab === 'careerPaths' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            >
              Career Paths
            </button>
            <button 
              onClick={() => setActiveTab('skills')} 
              className={`px-6 py-4 focus:outline-none ${activeTab === 'skills' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            >
              Skills to Develop
            </button>
            <button 
              onClick={() => setActiveTab('resources')} 
              className={`px-6 py-4 focus:outline-none ${activeTab === 'resources' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            >
              Learning Resources
            </button>
            <button 
              onClick={() => setActiveTab('analysis')} 
              className={`px-6 py-4 focus:outline-none ${activeTab === 'analysis' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            >
              Full Analysis
            </button>
          </nav>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="container mx-auto py-8 px-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Career Summary */}
            <div className="md:col-span-2 space-y-6">
              {/* Top Career Matches */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Top Career Matches</h2>
                <div className="space-y-4">
                  {dashboardData.careerPaths.slice(0, 3).map((path, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mr-4 flex-shrink-0" 
                        style={{ 
                          background: `conic-gradient(#3b82f6 ${path.match}%, #e5e7eb 0)`,
                          position: 'relative'
                        }}
                      >
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <span className="text-blue-600 font-bold">{path.match}%</span>
            >
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{path.title}</h3>
                        <p className="text-sm text-gray-600">Est. timeline: {dashboardData.timeToCareer[path.title] || '9-15 months'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skills to Develop */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Priority Skills to Develop</h2>
                <div className="space-y-4">
                  {getTopSkills().map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill}</span>
                        <span className="text-sm text-gray-500">
                          {dashboardData.skillsMap[skill].careers.length} career paths
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, dashboardData.skillsMap[skill].count * 20)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('skills')}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none transition"
                >
                  View All Skills
                </button>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleStartLearning(getTopSkills()[0])}
                    className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition"
                  >
                    <span className="block font-medium text-green-700 mb-1">Start Learning</span>
                    <span className="text-sm text-green-600">Begin with top skill: {getTopSkills()[0]}</span>
                  </button>
                  <button 
                    onClick={() => handleFindProjects(dashboardData.careerPaths[0]?.title || 'Software Development')}
                    className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition"
                  >
                    <span className="block font-medium text-purple-700 mb-1">Find Projects</span>
                    <span className="text-sm text-purple-600">Build portfolio for: {dashboardData.careerPaths[0]?.title || 'Software Development'}</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('resources')}
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
                  >
                    <span className="block font-medium text-blue-700 mb-1">Learning Resources</span>
                    <span className="text-sm text-blue-600">View recommended courses and tutorials</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('analysis')}
                    className="p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
                  >
                    <span className="block font-medium text-amber-700 mb-1">Full Analysis</span>
                    <span className="text-sm text-amber-600">See your complete career analysis</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Profile Summary */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Profile Summary</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Experience Level</h3>
                    <p>{userData.experienceLevel || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Current Role</h3>
                    <p>{userData.currentRole}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Educational Background</h3>
                    <p>{userData.educationLevel} in {userData.studyField}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Years of Experience</h3>
                    <p>{userData.yearsExperience}</p>
                  </div>
                </div>
              </div>
              
              {/* Strengths and Areas to Improve */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Profile Balance</h2>
                <div className="flex mb-4 rounded-md overflow-hidden text-sm font-medium">
                  <div 
                    className="py-2 text-center bg-green-500 text-white"
                    style={{ width: `${Math.min(100, dashboardData.strengthsWeaknesses.strengths.length * 10)}%` }}
                  >
                    {dashboardData.strengthsWeaknesses.strengths.length} Strengths
                  </div>
                  <div 
                    className="py-2 text-center bg-amber-500 text-white"
                    style={{ width: `${Math.min(100, dashboardData.strengthsWeaknesses.weaknesses.length * 10)}%` }}
                  >
                    {dashboardData.strengthsWeaknesses.weaknesses.length} Areas to Improve
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {dashboardData.strengthsWeaknesses.strengths.slice(0, 3).map((strength, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <p>{strength}</p>
                    </div>
                  ))}
                  {dashboardData.strengthsWeaknesses.weaknesses.slice(0, 3).map((weakness, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <p>{weakness}</p>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('analysis')}
                  className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none transition text-sm"
                >
                  View Full Analysis
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Full Analysis Tab */}
        {activeTab === 'analysis' && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Full Analysis</h2>
              
              {/* Education and Experience Summary - Updated Section */}
              <div className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Education and Experience Summary</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Educational Background</h4>
                    <p className="mb-4">{userData.educationLevel} in {userData.studyField}</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Current/Previous Role</h4>
                    <p className="mb-4">{userData.currentRole} with {userData.yearsExperience} experience</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Key Responsibilities</h4>
                    <p className="mb-4">{userData.jobResponsibilities}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Notable Projects/Achievements</h4>
                    <p className="mb-4">{userData.jobProjects}</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Technologies Used</h4>
                    <p className="mb-4">{userData.jobTechnologies}</p>
                    
                    {userData.publications && userData.publications !== 'Not specified' && (
                      <>
                        <h4 className="font-semibold text-blue-700 mb-2">Publications/Research</h4>
                        <p>{userData.publications}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Data Visualizations */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Data Visualizations</h3>
                
                {/* Career Match Comparison */}
                <div className="my-8">
                  <h3 className="text-xl font-bold mb-4">Career Match Comparison</h3>
                  <div className="mt-6 mb-6 py-10">
                    <div className="flex justify-between">
                      {dashboardData.careerPaths.map((path, index) => (
                        <div key={index} className="text-center">
                          <div className="text-blue-600 font-bold text-2xl mb-2">{path.match}%</div>
                          <div className="max-w-[180px] text-gray-800">{path.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Top Skills Importance */}
                <div className="my-10">
                  <h3 className="text-xl font-bold mb-6">Top Skills Importance</h3>
                  <div className="space-y-4">
                    {Object.keys(dashboardData.skillsMap).slice(0, 5).map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill}</span>
                          <span className="text-sm text-gray-600">
                            {dashboardData.skillsMap[skill].careers.length} career paths
                          </span>
                        </div>
                        <div className="h-8 w-full bg-gray-200 rounded">
                          <div 
                            className="h-8 bg-blue-600 rounded"
                            style={{ width: `${Math.min(100, dashboardData.skillsMap[skill].count * 25)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Career Timeline Comparison */}
                <div className="my-10">
                  <h3 className="text-xl font-bold mb-6">Career Timeline Comparison</h3>
                  
                  {/* Timeline scale */}
                  <div className="relative mb-6">
                    <div className="flex justify-between">
                      {[0, 6, 12, 18, 24, 30, 36].map((month, index) => (
                        <div key={index} className="text-sm text-gray-500">{month}m</div>
                      ))}
                    </div>
                    <div className="h-px bg-gray-300 w-full mt-2"></div>
                  </div>
                  
                  {/* Career timelines */}
                  <div className="space-y-8">
                    {dashboardData.careerPaths.map((path, index) => {
                      const timeline = dashboardData.timeToCareer[path.title] || '2-3 year timeline';
                      const matches = timeline.match(/(\d+)-(\d+)/);
                      let minMonths = 12, maxMonths = 24;
                      
                      if (matches && matches.length >= 3) {
                        const min = parseInt(matches[1], 10);
                        const max = parseInt(matches[2], 10);
                        const unit = timeline.includes('year') ? 12 : 1;
                        minMonths = min * unit;
                        maxMonths = max * unit;
                      }
                      
                      return (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{path.title}</span>
                            <span className="text-sm text-gray-600">{timeline}</span>
                          </div>
                          <div className="relative h-6 bg-gray-100 rounded-full w-full">
                            <div 
                              className="absolute h-6 bg-green-200 rounded-full"
                              style={{ 
                                left: `${Math.max(0, (minMonths / 36) * 100)}%`,
                                width: `${((maxMonths - minMonths) / 36) * 100}%`
                              }}
                            >
                              <div className="absolute -left-1 top-0 w-2 h-6 bg-green-500 rounded-full"></div>
                              <div className="absolute -right-1 top-0 w-2 h-6 bg-green-500 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Profile Balance */}
                <div className="my-10">
                  <h3 className="text-xl font-bold mb-6">Profile Balance</h3>
                  <div className="flex rounded-md overflow-hidden h-12">
                    <div 
                      className="bg-green-500 text-white flex items-center justify-center font-bold"
                      style={{ width: '50%' }}
                    >
                      {dashboardData.strengthsWeaknesses.strengths.length} Strengths
                    </div>
                    <div 
                      className="bg-yellow-500 text-white flex items-center justify-center font-bold"
                      style={{ width: '50%' }}
                    >
                      {dashboardData.strengthsWeaknesses.weaknesses.length} Areas to Improve
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Complete Analysis Text */}
              <div className="border-t pt-8 mt-8">
                <h3 className="text-xl font-bold mb-4">Complete Analysis</h3>
                <div className="prose max-w-none">
                  {analysis.split('\n').map((line, index) => {
                    // Format section headers
                    if (line.trim().match(/^\d+\.\s+/) && line.match(/recommendations|plan|resources|strengths|improvement/i)) {
                      return <h3 key={index} className="text-lg font-bold mt-6 mb-3">{line}</h3>;
                    }
                    // Format career path headings
                    else if (line.trim().match(/^[a-z]\)\s+.*?\(\d+%.*?\)/i)) {
                      return <h4 key={index} className="font-bold mt-4 mb-2">{line}</h4>;
                    }
                    // Format list items
                    else if (line.trim().startsWith('-') || line.trim().match(/^\d+\.\s+/)) {
                      return <p key={index} className="ml-4 mb-2">{line}</p>;
                    }
                    // Empty lines
                    else if (line.trim() === '') {
                      return <br key={index} />;
                    }
                    // Regular paragraphs
                    else {
                      return <p key={index} className="mb-3">{line}</p>;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Career Paths Tab */}
        {activeTab === 'careerPaths' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Career Path Recommendations</h2>
            
            <div className="space-y-6">
              {dashboardData.careerPaths.map((path, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mr-4 flex-shrink-0" 
                      style={{ 
                        background: `conic-gradient(#3b82f6 ${path.match}%, #e5e7eb 0)`,
                        position: 'relative'
                      }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{path.match}%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{path.title}</h3>
                      <p className="text-gray-600">Est. timeline: {dashboardData.timeToCareer[path.title] || '9-15 months'}</p>
                    </div>
                  </div>
                  
                  <p className="mb-6">{path.description || `Career path in ${path.title} based on your background and interests.`}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Skills Required</h4>
                      <ul className="space-y-2">
                        {path.skills.slice(0, 5).map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <p>{skill}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Recommended Resources</h4>
                      <ul className="space-y-2">
                        {path.resources.length > 0 ? (
                          path.resources.slice(0, 3).map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <p>{resource}</p>
                            </li>
                          ))
                        ) : (
                          dashboardData.resources.slice(0, 3).map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              <p>{resource}</p>
                            </li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <button 
                      onClick={() => handleStartLearning(path.skills[0] || getTopSkills()[0])}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none transition flex-grow"
                    >
                      Start Learning Key Skills
                    </button>
                    <button 
                      onClick={() => handleFindProjects(path.title)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none transition flex-grow"
                    >
                      Find Project Ideas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills to Develop Tab */}
        {activeTab === 'skills' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Skills to Develop</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Priority Skills</h3>
                <div className="space-y-6">
                  {Object.keys(dashboardData.skillsMap).slice(0, 8).map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium">{skill}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({dashboardData.skillsMap[skill].careers.length} career paths)
                          </span>
                        </div>
                        <button 
                          onClick={() => handleStartLearning(skill)}
                          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                        >
                          Learn
                        </button>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, dashboardData.skillsMap[skill].count * 20)}%` }}
                        ></div>
                      </div>
                      <div className="mt-1">
                        <p className="text-xs text-gray-500">
                          Relevant for: {dashboardData.skillsMap[skill].careers.slice(0, 2).join(', ')}
                          {dashboardData.skillsMap[skill].careers.length > 2 && ` and ${dashboardData.skillsMap[skill].careers.length - 2} more`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Your Strengths</h3>
                  <ul className="space-y-2">
                    {dashboardData.strengthsWeaknesses.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <p>{strength}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Areas to Improve</h3>
                  <ul className="space-y-2">
                    {dashboardData.strengthsWeaknesses.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <p>{weakness}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Strategy</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      1
                    </div>
                    <h4 className="font-semibold">Foundational Skills</h4>
                  </div>
                  <p className="text-sm text-gray-600">Start with the essential skills that apply across multiple career paths.</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {Object.keys(dashboardData.skillsMap).slice(0, 3).map((skill, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <p>{skill}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <h4 className="font-semibold">Specialization</h4>
                  </div>
                  <p className="text-sm text-gray-600">Focus on skills specific to your top career path choice.</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {dashboardData.careerPaths[0]?.skills.slice(0, 3).map((skill, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <p>{skill}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <h4 className="font-semibold">Portfolio Building</h4>
                  </div>
                  <p className="text-sm text-gray-600">Create projects that demonstrate your skills to potential employers.</p>
                  <button 
                    onClick={() => handleFindProjects(dashboardData.careerPaths[0]?.title || 'Software Development')}
                    className="mt-3 w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none transition"
                  >
                    Find Project Ideas
                  </button>
                </div>
              </div>
            </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      2
                    </div>
                    <h4 className="font-semibold">Specialization</h4>
                  </div>
                  <p className="text-sm text-gray-600">Focus on skills specific to your top career path choice.</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {dashboardData.careerPaths[0]?.skills.slice(0, 3).map((skill, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <p>{skill}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3">
                      3
                    </div>
                    <h4 className="font-semibold">Portfolio Building</h4>
                  </div>
                  <p className="text-sm text-gray-600">Create projects that demonstrate your skills to potential employers.</p>
                  <button 
                    onClick={() => handleFindProjects(dashboardData.careerPaths[0]?.title || 'Software Development')}
                    className="mt-3 w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none transition"
                  >
                    Find Project Ideas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>
                <ul className="space-y-3">
                  {dashboardData.resources.map((resource, index) => (
                    <li key={index} className="flex items-start pb-3 border-b last:border-b-0 last:pb-0">
                      <span className="text-blue-500 mr-2">•</span>
                      <p>{resource}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Free Learning Platforms</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">Codecademy</p>
                        <p className="text-sm text-gray-600">Interactive coding lessons</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">freeCodeCamp</p>
                        <p className="text-sm text-gray-600">Comprehensive web development curriculum</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">The Odin Project</p>
                        <p className="text-sm text-gray-600">Full-stack web development curriculum</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">Khan Academy</p>
                        <p className="text-sm text-gray-600">Computer programming and computer science</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Education-Specific Resources - Updated Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Resources for {userData.educationLevel} Graduates in {userData.studyField}</h3>
                  <p className="mb-4">Specialized resources for professionals with your educational background:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">{userData.studyField} to Tech Communities</p>
                        <p className="text-sm text-gray-600">Connect with others making similar transitions</p>
                      </div>
                    </li>
                    {userData.educationLevel && (userData.educationLevel.includes("Master") || userData.educationLevel.includes("PhD")) && (
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">Advanced Research Skills Workshops</p>
                          <p className="text-sm text-gray-600">Leverage your research expertise in tech projects</p>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">Domain-Specific Tech Projects</p>
                        <p className="text-sm text-gray-600">Build projects that leverage your {userData.studyField} expertise</p>
                      </div>
                    </li>
                    {userData.publications && userData.publications !== 'Not specified' && (
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">Technical Writing & Documentation</p>
                          <p className="text-sm text-gray-600">Use your publication experience for technical documentation</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Project Ideas</h3>
                  <p className="mb-4">Building projects is crucial for skill development. Here are some ideas to get started:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Portfolio website to showcase your work</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Task management application</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Weather app using a public API</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Blog or content management system</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>E-commerce store or product catalog</p>
                    </li>
                    {userData.studyField !== 'Not specified' && (
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <p>A tech solution for a common problem in {userData.studyField}</p>
                      </li>
                    )}
                    {userData.educationLevel && userData.educationLevel.includes("PhD") && (
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <p>Research data visualization dashboard</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'resources' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recommended Resources</h3>
                <ul className="space-y-3">
                  {dashboardData.resources.map((resource, index) => (
                    <li key={index} className="flex items-start pb-3 border-b last:border-b-0 last:pb-0">
                      <span className="text-blue-500 mr-2">•</span>
                      <p>{resource}</p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Free Learning Platforms</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">Codecademy</p>
                        <p className="text-sm text-gray-600">Interactive coding lessons</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">freeCodeCamp</p>
                        <p className="text-sm text-gray-600">Comprehensive web development curriculum</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">The Odin Project</p>
                        <p className="text-sm text-gray-600">Full-stack web development curriculum</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">Khan Academy</p>
                        <p className="text-sm text-gray-600">Computer programming and computer science</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Education-Specific Resources - Updated Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Resources for {userData.educationLevel} Graduates in {userData.studyField}</h3>
                  <p className="mb-4">Specialized resources for professionals with your educational background:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">{userData.studyField} to Tech Communities</p>
                        <p className="text-sm text-gray-600">Connect with others making similar transitions</p>
                      </div>
                    </li>
                    {userData.educationLevel && (userData.educationLevel.includes("Master") || userData.educationLevel.includes("PhD")) && (
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">Advanced Research Skills Workshops</p>
                          <p className="text-sm text-gray-600">Leverage your research expertise in tech projects</p>
                        </div>
                      </li>
                    )}
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">Domain-Specific Tech Projects</p>
                        <p className="text-sm text-gray-600">Build projects that leverage your {userData.studyField} expertise</p>
                      </div>
                    </li>
                    {userData.publications && userData.publications !== 'Not specified' && (
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">Technical Writing & Documentation</p>
                          <p className="text-sm text-gray-600">Use your publication experience for technical documentation</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4">Project Ideas</h3>
                  <p className="mb-4">Building projects is crucial for skill development. Here are some ideas to get started:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Portfolio website to showcase your work</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Task management application</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Weather app using a public API</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>Blog or content management system</p>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-500 mr-2">•</span>
                      <p>E-commerce store or product catalog</p>
                    </li>
                    {userData.studyField !== 'Not specified' && (
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <p>A tech solution for a common problem in {userData.studyField}</p>
                      </li>
                    )}
                    {userData.educationLevel && userData.educationLevel.includes("PhD") && (
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <p>Research data visualization dashboard</p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Full Analysis Tab */}
        {activeTab === 'analysis' && (
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Full Analysis</h2>
              
              {/* Education and Experience Summary - Updated Section */}
              <div className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Education and Experience Summary</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Educational Background</h4>
                    <p className="mb-4">{userData.educationLevel} in {userData.studyField}</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Current/Previous Role</h4>
                    <p className="mb-4">{userData.currentRole} with {userData.yearsExperience} experience</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Key Responsibilities</h4>
                    <p className="mb-4">{userData.jobResponsibilities}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Notable Projects/Achievements</h4>
                    <p className="mb-4">{userData.jobProjects}</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Technologies Used</h4>
                    <p className="mb-4">{userData.jobTechnologies}</p>
                    
                    {userData.publications && userData.publications !== 'Not specified' && (
                      <>
                        <h4 className="font-semibold text-blue-700 mb-2">Publications/Research</h4>
                        <p>{userData.publications}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Data Visualizations */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Data Visualizations</h3>
                
                {/* Career Match Comparison */}
                <div className="my-8">
                  <h3 className="text-xl font-bold mb-4">Career Match Comparison</h3>
                  <div className="mt-6 mb-6 py-10">
                    <div className="flex justify-between">
                      {dashboardData.careerPaths.map((path, index) => (
                        <div key={index} className="text-center">
                          <div className="text-blue-600 font-bold text-2xl mb-2">{path.match}%</div>
                          <div className="max-w-[180px] text-gray-800">{path.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Top Skills Importance */}
                <div className="my-10">
                  <h3 className="text-xl font-bold mb-6">Top Skills Importance</h3>
                  <div className="space-y-4">
                    {Object.keys(dashboardData.skillsMap).slice(0, 5).map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill}</span>
                          <span className="text-sm text-gray-600">
                            {dashboardData.skillsMap[skill].careers.length} career paths
                          </span>
                        </div>
                        <div className="h-8 w-full bg-gray-200 rounded">
                          <div 
                            className="h-8 bg-blue-600 rounded"
                            style={{ width: `${Math.min(100, dashboardData.skillsMap[skill].count * 25)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Career Timeline Comparison */}
                <div className="my-10">
                  <h3 className="text-xl font-bold mb-6">Career Timeline Comparison</h3>
                  
                  {/* Timeline scale */}
                  <div className="relative mb-6">
                    <div className="flex justify-between">
                      {[0, 6, 12, 18, 24, 30, 36].map((month, index) => (
                        <div key={index} className="text-sm text-gray-500">{month}m</div>
                      ))}
                    </div>
                    <div className="h-px bg-gray-300 w-full mt-2"></div>
                  </div>
                  
                  {/* Career timelines */}
                  <div className="space-y-8">
                    {dashboardData.careerPaths.map((path, index) => {
                      const timeline = dashboardData.timeToCareer[path.title] || '2-3 year timeline';
                      const matches = timeline.match(/(\d+)-(\d+)/);
                      let minMonths = 12, maxMonths = 24;
                      
                      if (matches && matches.length >= 3) {
                        const min = parseInt(matches[1], 10);
                        const max = parseInt(matches[2], 10);
                        const unit = timeline.includes('year') ? 12 : 1;
                        minMonths = min * unit;
                        maxMonths = max * unit;
                      }
                      
                      return (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{path.title}</span>
                            <span className="text-sm text-gray-600">{timeline}</span>
                          </div>
                          <div className="relative h-6 bg-gray-100 rounded-full w-full">
                            <div 
                              className="absolute h-6 bg-green-200 rounded-full"
                              style={{ 
                                left: `${Math.max(0, (minMonths / 36) * 100)}%`,
                                width: `${((maxMonths - minMonths) / 36) * 100}%`
                              }}
                            >
                              <div className="absolute -left-1 top-0 w-2 h-6 bg-green-500 rounded-full"></div>
                              <div className="absolute -right-1 top-0 w-2 h-6 bg-green-500 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Profile Balance */}
                <div className="my-10">
                  <h3 className="text-xl font-bold mb-6">Profile Balance</h3>
                  <div className="flex rounded-md overflow-hidden h-12">
                    <div 
                      className="bg-green-500 text-white flex items-center justify-center font-bold"
                      style={{ width: '50%' }}
                    >
                      {dashboardData.strengthsWeaknesses.strengths.length} Strengths
                    </div>
                    <div 
                      className="bg-yellow-500 text-white flex items-center justify-center font-bold"
                      style={{ width: '50%' }}
                    >
                      {dashboardData.strengthsWeaknesses.weaknesses.length} Areas to Improve
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Complete Analysis Text */}
              <div className="border-t pt-8 mt-8">
                <h3 className="text-xl font-bold mb-4">Complete Analysis</h3>
                <div className="prose max-w-none">
                  {analysis.split('\n').map((line, index) => {
                    // Format section headers
                    if (line.trim().match(/^\d+\.\s+/) && line.match(/recommendations|plan|resources|strengths|improvement/i)) {
                      return <h3 key={index} className="text-lg font-bold mt-6 mb-3">{line}</h3>;
                    }
                    // Format career path headings
                    else if (line.trim().match(/^[a-z]\)\s+.*?\(\d+%.*?\)/i)) {
                      return <h4 key={index} className="font-bold mt-4 mb-2">{line}</h4>;
                    }
                    // Format list items
                    else if (line.trim().startsWith('-') || line.trim().match(/^\d+\.\s+/)) {
                      return <p key={index} className="ml-4 mb-2">{line}</p>;
                    }
                    // Empty lines
                    else if (line.trim() === '') {
                      return <br key={index} />;
                    }
                    // Regular paragraphs
                    else {
                      return <p key={index} className="mb-3">{line}</p>;
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerDashboard;
