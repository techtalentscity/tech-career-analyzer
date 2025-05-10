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
    currentField: '',
    currentRole: '',
    jobResponsibilities: '',
    jobProjects: '',
    jobTechnologies: '',
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
              currentField,
              currentRole,
              jobResponsibilities,
              jobProjects,
              jobTechnologies,
              transferableSkills
            } = location.state.formData;
            
            setUserData({
              name: fullName,
              email: email,
              experienceLevel: experienceLevel,
              currentField: currentField || 'Not specified',
              currentRole: currentRole || 'Not specified',
              jobResponsibilities: jobResponsibilities || 'Not specified',
              jobProjects: jobProjects || 'Not specified',
              jobTechnologies: jobTechnologies || 'Not specified',
              transferableSkills: transferableSkills || 'Not specified',
              interests: typeof techInterests === 'string' 
                ? techInterests.split(',').map(i => i.trim()) 
                : (Array.isArray(techInterests) ? techInterests : [])
            });
          }
          
          parseAnalysisData(location.state.analysis);
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
                currentField: submission.currentField || 'Not specified',
                currentRole: submission.currentRole || 'Not specified',
                jobResponsibilities: submission.jobResponsibilities || 'Not specified',
                jobProjects: submission.jobProjects || 'Not specified',
                jobTechnologies: submission.jobTechnologies || 'Not specified',
                transferableSkills: submission.transferableSkills || 'Not specified',
                interests: typeof submission.techInterests === 'string' 
                  ? submission.techInterests.split(',').map(i => i.trim()) 
                  : (Array.isArray(submission.techInterests) ? submission.techInterests : [])
              });
            }
            
            parseAnalysisData(storedAnalysis.analysis);
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

    // Extract some job-related skills from user data
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
          'Transferable skills from ' + userData.currentField,
          ...jobTechSkills.slice(0, 3),
          'Willingness to learn new skills',
          'Problem-solving aptitude',
          'Attention to detail',
          'Adaptability to new technologies'
        ].filter(s => s !== 'Transferable skills from Not specified'), 
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
    // Initialize data structures
    const careerPaths = [];
    const skillsMap = {};
    const resources = [];
    const strengths = [];
    const weaknesses = [];
    const timeToCareer = {};
    
    // Split into lines for processing
    const lines = analysisText.split('\n');
    
    // Set up regex patterns for career paths
    // This pattern is more flexible to match different formats
    // It will match both "a) Data Scientist (90% match, 2-3 years to senior level)"
    // and "Data Scientist (90% match)" formats
    const careerPathRegex = /([a-z]\)\s+)?([^(]+)\s+\((\d+)%\s+match[,\s]*(.*?)?\)/i;
    
    // Also create a section matcher pattern that's more flexible
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
            break;
          }
        }
        continue;
      }
      
      // Check for subsection headers
      if (line.match(/^[A-Z][\.\)]\s+/i) || 
          line.match(/^[a-z]\)\s+/i) || 
          line.startsWith('**') || 
          line.match(/^#+\s+/)) {
        subSection = line;
        continue;
      }
      
      // Process career paths - either from numbered lists or from subsections
      if (currentSection === 'careerPaths' || 
          (currentSection === '' && (subSection.match(/career path/i) || line.match(careerPathRegex)))) {
        
        // Try to match the career path pattern
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
          
          // Add to the careerPaths array
          careerPaths.push(careerPath);
          
          // Store the timeline
          timeToCareer[title] = timeline;
          
          // Look ahead for the description lines
          let j = i + 1;
          let descriptionText = '';
          
          // Keep looking until we hit another career path or a new section
          while (j < lines.length && 
                !lines[j].match(careerPathRegex) && 
                !lines[j].match(/^\d+[\.\)]\s+/) &&
                lines[j].trim() !== '') {
            
            const descLine = lines[j].trim();
            
            // If it's a bullet point about skills, add to skills
            if (descLine.match(/^\-\s+/) && 
                (descLine.toLowerCase().includes('skill') || descLine.toLowerCase().includes('knowledge'))) {
              const skill = descLine.replace(/^\-\s+/, '').trim();
              if (skill && !careerPath.skills.includes(skill)) {
                careerPath.skills.push(skill);
              }
            } 
            // Otherwise add to description
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
          
          // Skip the lines we've already processed
          i = j - 1;
        }
      }
      
      // Process skills
      else if ((currentSection === 'skills' || currentSection === 'roadmap') && 
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
      
      // Process resources
      else if ((currentSection === 'resources' || currentSection === 'roadmap') && 
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
      
      // Process strengths
      else if (currentSection === 'strengths' || 
              (line.match(/^\-\s+/) && (line.toLowerCase().includes('strength') || subSection.toLowerCase().includes('strength')))) {
        
        const strength = line.replace(/^[\-\*]\s+/, '').trim();
        if (strength && !strengths.includes(strength)) {
          strengths.push(strength);
        }
      }
      
      // Process weaknesses/areas for improvement
      else if (currentSection === 'weaknesses' ||
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
    }
    
    // Sort skills by frequency
    const sortedSkillsMap = {};
    Object.keys(skillsMap)
      .sort((a, b) => skillsMap[b].count - skillsMap[a].count)
      .forEach(key => {
        sortedSkillsMap[key] = skillsMap[key];
      });
    
    // If we don't have career paths data yet, try a second pass with different patterns
    // This handles cases where the format doesn't match our initial expectations
    if (careerPaths.length === 0) {
      let currentCareerPath = null;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Look for lines that might indicate career paths
        if (line.match(/^[\d\.]+\s+(.+)$/)) {
          const title = line.match(/^[\d\.]+\s+(.+)$/)[1].trim();
          
          // Check if this might be a career path heading
          if (title.match(/developer|engineer|scientist|analyst|designer|manager/i)) {
            currentCareerPath = {
              title,
              match: Math.floor(Math.random() * 20) + 80, // Generate a random match percentage 80-99
              description: '',
              skills: [],
              resources: []
            };
            
            // Add default timeline
            timeToCareer[title] = "9-15 months";
            
            careerPaths.push(currentCareerPath);
          }
        }
        
        // If we have a current path, add details to it
        if (currentCareerPath && line.match(/^\-\s+/)) {
          const point = line.replace(/^\-\s+/, '').trim();
          
          // Add to description
          if (currentCareerPath.description) {
            currentCareerPath.description += ' ' + point;
          } else {
            currentCareerPath.description = point;
          }
          
          // If it mentions skills, add to skills
          if (point.toLowerCase().includes('skill') || 
              point.toLowerCase().includes('knowledge')) {
            const skillWords = point.split(/[,;]/).map(s => s.trim());
            for (const skillWord of skillWords) {
              if (skillWord && !currentCareerPath.skills.includes(skillWord)) {
                currentCareerPath.skills.push(skillWord);
                
                // Add to skills map
                if (!sortedSkillsMap[skillWord]) {
                  sortedSkillsMap[skillWord] = {
                    count: 0,
                    careers: []
                  };
                }
                sortedSkillsMap[skillWord].count++;
                if (!sortedSkillsMap[skillWord].careers.includes(currentCareerPath.title)) {
                  sortedSkillsMap[skillWord].careers.push(currentCareerPath.title);
                }
              }
            }
          }
        }
      }
    }
    
    // Check if we have enough data and set it
    if (careerPaths.length > 0 || Object.keys(sortedSkillsMap).length > 0 || resources.length > 0) {
      setDashboardData({
        careerPaths,
        skillsMap: sortedSkillsMap,
        resources,
        strengthsWeaknesses: { strengths, weaknesses },
        timeToCareer
      });
    } else {
      // If no meaningful data was parsed, create defaults
      createDefaultDashboardData();
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
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{path.title}</h3>
                        <p className="text-sm text-gray-600">Est. timeline: {dashboardData.timeToCareer[path.title] || '9-15 months'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Job Experience Highlights - New Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Job Experience Highlights</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-800">Current/Previous Role:</h3>
                    <p className="text-gray-600">{userData.currentRole}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800">Key Technologies Used:</h3>
                    <p className="text-gray-600">{userData.jobTechnologies}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800">Notable Achievements:</h3>
                    <p className="text-gray-600">{userData.jobProjects}</p>
                  </div>
                </div>
              </div>
              
              {/* Key Skills to Develop */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Key Skills to Develop</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {getTopSkills().map((skill, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium">{skill}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Relevant for {dashboardData.skillsMap[skill].careers.length} career paths
                      </p>
                      <button 
                        onClick={() => handleStartLearning(skill)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        Find learning resources →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-2">Your Profile</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Experience:</span> {userData.experienceLevel || 'Not specified'}</p>
                  <p><span className="font-medium">Field:</span> {userData.currentField || 'Not specified'}</p>
                  <div>
                    <p className="font-medium mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-2">
                      {userData.interests && userData.interests.length > 0 ? (
                        userData.interests.map((interest, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">No interests specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Transferable Skills - Modified Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Transferable Skills</h2>
                <p className="text-gray-600 mb-3">
                  Based on your background in {userData.currentField}:
                </p>
                <div className="mt-2">
                  <p className="text-gray-700">{userData.transferableSkills}</p>
                </div>
              </div>
              
              {/* Strengths & Weaknesses */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Your Profile Analysis</h2>
                
                <div className="mb-4">
                  <h3 className="font-medium text-green-600 mb-2">Strengths</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {dashboardData.strengthsWeaknesses.strengths.length > 0 ? (
                      dashboardData.strengthsWeaknesses.strengths.map((strength, index) => (
                        <li key={index} className="text-sm">{strength}</li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500">No specific strengths identified</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-amber-600 mb-2">Areas to Improve</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {dashboardData.strengthsWeaknesses.weaknesses.length > 0 ? (
                      dashboardData.strengthsWeaknesses.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-sm">{weakness}</li>
                      ))
                    ) : (
                      <li className="text-sm text-gray-500">No specific areas identified</li>
                    )}
                  </ul>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      const blob = new Blob([analysis], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'career-analysis.txt';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Export Results
                  </button>
                  <button 
                    onClick={() => navigate('/career/test')}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Retake Assessment
                  </button>
                  <button 
                    onClick={() => window.open('https://www.techtalentscity.com/mentorship', '_blank')}
                    className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Find a Mentor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Career Paths Tab */}
        {activeTab === 'careerPaths' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Recommended Career Paths</h2>
            
            {dashboardData.careerPaths.map((path, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0" 
                        style={{ 
                          background: `conic-gradient(#3b82f6 ${path.match}%, #e5e7eb 0)`,
                          position: 'relative'
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">{path.match}%</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">{path.title}</h3>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {dashboardData.timeToCareer[path.title] || '9-15 months'}
                    </span>
                  </div>
                  
                  <p className="mt-4 text-gray-600">{path.description}</p>
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Required Skills</h4>
                      <ul className="space-y-1">
                        {path.skills.map((skill, skillIndex) => (
                          <li key={skillIndex} className="flex items-center">
                            <span className="text-green-500 mr-2">•</span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Recommended Resources</h4>
                      <ul className="space-y-1">
                        {path.resources.length > 0 ? (
                          path.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {resource}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">See the Resources tab for learning materials</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Relevant Experience Section - New */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">How Your Experience Relates</h4>
                    <p className="text-gray-700">
                      Your experience in {userData.currentField} as a {userData.currentRole} provides valuable transferable skills. 
                      {userData.jobProjects !== 'Not specified' && userData.jobProjects ? 
                        ` Your work on ${userData.jobProjects.split('.')[0]} demonstrates skills applicable to this path.` : ''}
                      {userData.jobTechnologies !== 'Not specified' && userData.jobTechnologies ? 
                        ` Your familiarity with ${userData.jobTechnologies.split(',')[0]} is also relevant.` : ''}
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-6 py-4 flex justify-end">
                  <button 
                    onClick={() => handleFindProjects(path.title)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Find Projects in This Field
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Skills Development Plan</h2>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Top Skills by Importance</h3>
              <div className="space-y-4">
                {Object.keys(dashboardData.skillsMap).map((skill, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{skill}</h4>
                      <span className="text-sm text-gray-500">
                        Relevant for {dashboardData.skillsMap[skill].careers.length} career paths
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div 
                          style={{ width: `${Math.min(100, dashboardData.skillsMap[skill].count * 20)}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {dashboardData.skillsMap[skill].careers.map((career, careerIndex) => (
                        <span key={careerIndex} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                          {career}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3">
                      <button 
                        onClick={() => handleStartLearning(skill)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        Learn this skill →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* New Section - Existing Skills */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Your Existing Technical Skills</h3>
              <p className="mb-4">From your current/previous job experience:</p>
              
              {userData.jobTechnologies !== 'Not specified' && userData.jobTechnologies ? (
                <div className="flex flex-wrap gap-2 mb-4">
                  {userData.jobTechnologies.split(/[,;]/).map((tech, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic mb-4">No specific technologies mentioned</p>
              )}
              
              <p className="text-sm text-gray-600">
                These skills from your work as a {userData.currentRole} can be leveraged in your tech career transition.
              </p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Skill Development Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <p>Focus on the top 3-5 skills that are common across multiple career paths</p>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <p>Create small projects to practice each skill in real-world scenarios</p>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <p>Join online communities like Stack Overflow or GitHub to collaborate with others</p>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <p>Track your progress by keeping a learning journal or portfolio</p>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <p>Look for ways to apply your experience with {userData.jobTechnologies ? userData.jobTechnologies.split(',')[0] : 'previous tools'} to new tech contexts</p>
                </li>
              </ul>
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
                        <p className="font-medium">Codecademy</p>
                        <p className="text-sm text-gray-600">Interactive coding lessons</p>
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
                
                {/* Domain-Specific Resources - New Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Resources for {userData.currentField} Professionals</h3>
                  <p className="mb-4">Specialized resources for professionals transitioning from your field:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">{userData.currentField} to Tech Communities</p>
                        <p className="text-sm text-gray-600">Connect with others making similar transitions</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <div>
                        <p className="font-medium">Domain-Specific Tech Projects</p>
                        <p className="text-sm text-gray-600">Build projects that leverage your {userData.currentField} expertise</p>
                      </div>
                    </li>
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
                    {userData.currentField !== 'Not specified' && (
                      <li className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <p>A tech solution for a common problem in the {userData.currentField} industry</p>
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
              
              {/* Job Experience Summary - New Section */}
              <div className="mb-8 bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Job Experience Summary</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Current/Previous Role</h4>
                    <p className="mb-4">{userData.currentRole} in {userData.currentField} with {userData.yearsExperience} experience</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Key Responsibilities</h4>
                    <p className="mb-4">{userData.jobResponsibilities}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Notable Projects/Achievements</h4>
                    <p className="mb-4">{userData.jobProjects}</p>
                    
                    <h4 className="font-semibold text-blue-700 mb-2">Technologies Used</h4>
                    <p>{userData.jobTechnologies}</p>
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
