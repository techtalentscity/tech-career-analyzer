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
            const { fullName, email, experienceLevel, techInterests } = location.state.formData;
            setUserData({
              name: fullName,
              email: email,
              experienceLevel: experienceLevel,
              interests: techInterests.split(',').map(i => i.trim())
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
                interests: submission.techInterests.split(',').map(i => i.trim())
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
    // This pattern looks for lines like "a) Data Scientist (90% match, 2-3 years to senior level)"
    const careerPathRegex = /([a-z]\)\s+)?(.*?)\s+\((\d+)%\s+match,\s+(.*?)\)/i;
    
    let currentSection = '';
    
    // Process each line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Identify sections
      if (line.match(/career path recommendations/i)) {
        currentSection = 'careerPaths';
        continue;
      } else if (line.match(/skills development plan/i)) {
        currentSection = 'skills';
        continue;
      } else if (line.match(/learning resources/i)) {
        currentSection = 'resources';
        continue;
      } else if (line.match(/strengths/i) && !line.match(/areas for improvement/i)) {
        currentSection = 'strengths';
        continue;
      } else if (line.match(/areas for improvement/i) || line.match(/areas to improve/i)) {
        currentSection = 'weaknesses';
        continue;
      }
      
      // Process career paths
      if (currentSection === 'careerPaths') {
        const match = line.match(careerPathRegex);
        if (match) {
          const title = match[2].trim();
          const matchPercentage = parseInt(match[3], 10);
          const timeline = match[4].trim();
          
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
          
          // Look ahead for the description lines (usually start with "- ")
          let j = i + 1;
          while (j < lines.length && lines[j].trim().startsWith('-')) {
            const descLine = lines[j].trim().substring(2).trim();
            if (careerPath.description) {
              careerPath.description += ' ' + descLine;
            } else {
              careerPath.description = descLine;
            }
            j++;
          }
          
          // Skip the lines we've already processed
          i = j - 1;
        }
      }
      
      // Process skills
      else if (currentSection === 'skills' && line.match(/^\d+\.\s+/)) {
        const skill = line.replace(/^\d+\.\s+/, '').trim();
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
      else if (currentSection === 'resources' && line.match(/^-\s+/)) {
        const resource = line.replace(/^-\s+/, '').trim();
        if (resource && !resources.includes(resource)) {
          resources.push(resource);
        }
      }
      
      // Process strengths
      else if (currentSection === 'strengths' && line.match(/^-\s+/)) {
        const strength = line.replace(/^-\s+/, '').trim();
        if (strength && !strengths.includes(strength)) {
          strengths.push(strength);
        }
      }
      
      // Process weaknesses/areas for improvement
      else if (currentSection === 'weaknesses' && line.match(/^-\s+/)) {
        const weakness = line.replace(/^-\s+/, '').trim();
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
    
    setDashboardData({
      careerPaths,
      skillsMap: sortedSkillsMap,
      resources,
      strengthsWeaknesses: { strengths, weaknesses },
      timeToCareer
    });
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
  
  // Career Match Chart Component
  const CareerMatchChart = () => {
    if (!dashboardData.careerPaths || dashboardData.careerPaths.length === 0) {
      return <p className="text-gray-500">No career path data available</p>;
    }
    
    return (
      <div className="mt-8 mb-10">
        <h3 className="text-xl font-bold mb-4">Career Match Comparison</h3>
        <div className="relative overflow-hidden">
          <div className="flex items-end h-64 space-x-4">
            {dashboardData.careerPaths.map((path, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t" 
                  style={{ height: `${path.match * 0.6}%` }}
                ></div>
                <div className="mt-2 text-center">
                  <span className="font-bold text-blue-600">{path.match}%</span>
                  <p className="text-sm">{path.title}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Horizontal axis lines */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gray-200"></div>
          <div className="absolute left-0 right-0 top-1/4 h-px bg-gray-200"></div>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-200"></div>
          <div className="absolute left-0 right-0 top-3/4 h-px bg-gray-200"></div>
          <div className="absolute left-0 right-0 bottom-8 h-px bg-gray-200"></div>
        </div>
      </div>
    );
  };
  
  // Skills Distribution Chart Component
  const SkillsDistributionChart = () => {
    const skills = Object.keys(dashboardData.skillsMap);
    
    if (skills.length === 0) {
      return <p className="text-gray-500">No skills data available</p>;
    }
    
    // Get top 5 skills
    const topSkills = skills.slice(0, Math.min(5, skills.length));
    
    return (
      <div className="mt-10 mb-10">
        <h3 className="text-xl font-bold mb-4">Top Skills Importance</h3>
        <div className="space-y-4">
          {topSkills.map((skill, index) => (
            <div key={index} className="relative">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{skill}</span>
                <span className="text-sm text-gray-600">
                  {dashboardData.skillsMap[skill].careers.length} career paths
                </span>
              </div>
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${Math.min(100, (dashboardData.skillsMap[skill].count / skills.length) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Timeline Visualization Component
  const TimelineVisualization = () => {
    if (Object.keys(dashboardData.timeToCareer).length === 0) {
      return <p className="text-gray-500">No timeline data available</p>;
    }
    
    // Convert timeline strings to numbers for visualization
    const timelineData = {};
    Object.keys(dashboardData.timeToCareer).forEach(career => {
      const timeline = dashboardData.timeToCareer[career];
      // Extract numbers from strings like "2-3 years" or "6-12 months"
      const matches = timeline.match(/(\d+)-(\d+)/);
      if (matches && matches.length >= 3) {
        const minTime = parseInt(matches[1], 10);
        const maxTime = parseInt(matches[2], 10);
        
        // Convert to months if necessary
        const unit = timeline.includes('year') ? 12 : 1;
        timelineData[career] = {
          min: minTime * unit,
          max: maxTime * unit,
          original: timeline
        };
      }
    });
    
    return (
      <div className="mt-10 mb-10">
        <h3 className="text-xl font-bold mb-4">Career Timeline Comparison</h3>
        <div className="relative pt-2">
          {/* Timeline scale */}
          <div className="border-t border-gray-300 h-6 mb-2 relative">
            {[0, 6, 12, 18, 24, 30, 36].map((month, index) => (
              <div key={index} className="absolute" style={{ left: `${(month / 36) * 100}%` }}>
                <div className="h-2 w-px bg-gray-400 -mt-1"></div>
                <span className="text-xs text-gray-500">{month}m</span>
              </div>
            ))}
          </div>
          
          {/* Career timelines */}
          <div className="space-y-6">
            {Object.keys(timelineData).map((career, index) => {
              const data = timelineData[career];
              return (
                <div key={index} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{career}</span>
                    <span className="text-sm text-gray-600">{data.original}</span>
                  </div>
                  <div className="h-6 w-full bg-gray-100 rounded-full relative">
                    <div 
                      className="absolute h-6 bg-green-200 rounded-full"
                      style={{ 
                        left: `${(data.min / 36) * 100}%`,
                        width: `${((data.max - data.min) / 36) * 100}%`
                      }}
                    ></div>
                    <div
                      className="absolute h-6 w-3 bg-green-500 rounded-full z-10"
                      style={{ left: `${(data.min / 36) * 100}%`, transform: 'translateX(-50%)' }}
                    ></div>
                    <div
                      className="absolute h-6 w-3 bg-green-500 rounded-full z-10"
                      style={{ left: `${(data.max / 36) * 100}%`, transform: 'translateX(-50%)' }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  // Strengths vs Weaknesses Chart
  const StrengthWeaknessChart = () => {
    const strengthsCount = dashboardData.strengthsWeaknesses.strengths.length;
    const weaknessesCount = dashboardData.strengthsWeaknesses.weaknesses.length;
    
    if (strengthsCount === 0 && weaknessesCount === 0) {
      return <p className="text-gray-500">No strengths/weaknesses data available</p>;
    }
    
    // Calculate the percentage (with a minimum to make the chart look balanced)
    const total = Math.max(10, strengthsCount + weaknessesCount);
    const strengthsPercentage = Math.max(15, (strengthsCount / total) * 100);
    const weaknessesPercentage = Math.max(15, (weaknessesCount / total) * 100);
    
    return (
      <div className="mt-10 mb-10">
        <h3 className="text-xl font-bold mb-4">Profile Balance</h3>
        <div className="flex mb-6 h-10">
          <div 
            className="bg-green-500 text-white flex items-center justify-center rounded-l"
            style={{ width: `${strengthsPercentage}%` }}
          >
            <span className="font-bold">{strengthsCount} Strengths</span>
          </div>
          <div 
            className="bg-amber-500 text-white flex items-center justify-center rounded-r"
            style={{ width: `${weaknessesPercentage}%` }}
          >
            <span className="font-bold">{weaknessesCount} Areas to Improve</span>
          </div>
        </div>
      </div>
    );
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
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
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
              
              {/* Data Visualizations */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Data Visualizations</h3>
                
                {/* Career Match Chart */}
                <CareerMatchChart />
                
                {/* Skills Distribution Chart */}
                <SkillsDistributionChart />
                
                {/* Timeline Visualization */}
                <TimelineVisualization />
                
                {/* Strengths vs Weaknesses */}
                <StrengthWeaknessChart />
              </div>
              
              {/* Text Analysis */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-bold mb-4">Complete Analysis</h3>
                <div className="prose max-w-none">
                  {analysis.split('\n').map((line, index) => (
                    line.trim() === '' ? <br key={index} /> : <p key={index}>{line}</p>
                  ))}
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
