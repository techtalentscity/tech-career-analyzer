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
    studyField: '',
    educationLevel: '',
    currentRole: '',
    yearsExperience: '',
    jobResponsibilities: '',
    jobProjects: '',
    jobTechnologies: '',
    publications: '',
    transferableSkills: '',
    interests: []
  });
  const [activeTab, setActiveTab] = useState('analysis');

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
              studyField,
              educationLevel,
              currentRole,
              yearsExperience,
              jobResponsibilities,
              jobProjects,
              jobTechnologies,
              publications,
              transferableSkills
            } = location.state.formData;
            
            setUserData({
              name: fullName,
              email: email,
              experienceLevel: experienceLevel,
              studyField: studyField || 'Not specified',
              educationLevel: educationLevel || 'Not specified',
              currentRole: currentRole || 'Not specified',
              yearsExperience: yearsExperience || 'Not specified',
              jobResponsibilities: jobResponsibilities || 'Not specified',
              jobProjects: jobProjects || 'Not specified',
              jobTechnologies: jobTechnologies || 'Not specified',
              publications: publications || 'Not specified',
              transferableSkills: transferableSkills || 'Not specified',
              interests: typeof techInterests === 'string' 
                ? techInterests.split(',').map(i => i.trim()) 
                : (Array.isArray(techInterests) ? techInterests : [])
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
                  : (Array.isArray(submission.techInterests) ? submission.techInterests : [])
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

  // Format analysis text for display with emphasis on important elements
  const formatAnalysisText = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    let formattedContent = [];

    // Helper function to highlight important keywords and fix pronouns
    const processContent = (content) => {
      // First, replace third-person pronouns with second-person
      content = content.replace(/\btheir\b/gi, 'your');
      content = content.replace(/\bthey\b/gi, 'you');
      content = content.replace(/\bthem\b/gi, 'you');
      content = content.replace(/\bthemselves\b/gi, 'yourself');
      
      // Check if we need to highlight educational terms
      if (userData.educationLevel && userData.educationLevel !== 'Not specified') {
        const educationTerms = [userData.educationLevel, userData.studyField].filter(Boolean);
        
        // Create regex patterns for education terms to highlight
        educationTerms.forEach(term => {
          if (term && term.length > 3) { // Only highlight meaningful terms
            const regex = new RegExp(`(${term})`, 'gi');
            content = content.replace(regex, '<strong class="text-blue-700">$1</strong>');
          }
        });
      }
      
      // Check if we need to highlight publication/research terms
      if (userData.publications && userData.publications !== 'Not specified') {
        const researchTerms = ['publication', 'research', 'academic', 'paper', 'journal'];
        
        // Create regex for research terms
        researchTerms.forEach(term => {
          const regex = new RegExp(`(${term})`, 'gi');
          content = content.replace(regex, '<strong class="text-purple-700">$1</strong>');
        });
      }
      
      return { __html: content };
    };

    // Helper to check if line is in Skills Gap Analysis section
    const isInSkillsGapSection = (index) => {
      // Look for "SKILLS GAP ANALYSIS" in previous lines
      return index > 0 && lines.slice(Math.max(0, index-10), index).some(l => 
        l.includes("SKILLS GAP ANALYSIS")
      ) && !lines.slice(Math.max(0, index-10), index).some(l => 
        l.includes("LEARNING ROADMAP") || l.includes("TRANSITION STRATEGY")
      );
    };

    lines.forEach((line, index) => {
      // Format section headers (e.g., "1. CAREER PATH RECOMMENDATIONS")
      if (line.match(/^\d+\.\s+[A-Z]/)) {
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
      }
      // Format subsection headers (e.g., "a) AI/Machine Learning Engineer (95% match)")
      else if (line.match(/^[a-z]\)\s+.*?\(\d+%\s+match/i)) {
        formattedContent.push(
          <h4 key={`subheader-${index}`} className="text-lg font-semibold mt-6 mb-2 text-blue-700">
            {line}
          </h4>
        );
      }
      // Format skills gap numbered items (e.g., "1. Programming: Focus on Python...")
      else if (line.match(/^\d+\.\s+/) && isInSkillsGapSection(index)) {
        // Split at the first colon to separate the skill title from description
        const colonIndex = line.indexOf(':');
        
        if (colonIndex > -1) {
          const titlePart = line.substring(0, colonIndex + 1);
          const descriptionPart = line.substring(colonIndex + 1).trim();
          
          formattedContent.push(
            <div key={`skill-gap-${index}`} className="mb-4">
              <h4 className="text-lg font-semibold text-blue-600 mb-1">
                {titlePart}
              </h4>
              <p className="text-gray-800">
                {descriptionPart}
              </p>
            </div>
          );
        } else {
          // If no colon, format as a regular numbered item
          formattedContent.push(
            <p key={`skill-gap-${index}`} className="mb-3 text-gray-800">
              {line}
            </p>
          );
        }
      }
      // Format list items starting with "-"
      else if (line.trim().startsWith('-')) {
        const content = line.replace(/^-\s+/, '');
        formattedContent.push(
          <div key={`bullet-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      // Format list items starting with numbers (e.g., "1. Item") - standard numbered items
      else if (line.trim().match(/^\d+\.\s+/)) {
        const content = line.replace(/^\d+\.\s+/, '');
        
        formattedContent.push(
          <div key={`numbered-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      // Format monthly sections (e.g., "Month 1-2:")
      else if (line.trim().match(/^Month\s+\d+-\d+:/i)) {
        formattedContent.push(
          <h5 key={`month-${index}`} className="font-semibold mt-4 mb-2 text-blue-600 ml-4">
            {line}
          </h5>
        );
      }
      // Format section labeled "Throughout:"
      else if (line.trim() === "Throughout:") {
        formattedContent.push(
          <h5 key={`throughout-${index}`} className="font-semibold mt-4 mb-2 text-blue-600 ml-4">
            {line}
          </h5>
        );
      }
      // Format empty lines as breaks
      else if (line.trim() === '') {
        formattedContent.push(<br key={`break-${index}`} />);
      }
      // Format regular text
      else {
        formattedContent.push(
          <p key={`text-${index}`} className="mb-3" dangerouslySetInnerHTML={processContent(line)} />
        );
      }
    });

    return formattedContent;
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  // The career paths data
  const careerPaths = extractCareerPaths(analysis);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Your Career Analysis</h1>
          <p className="text-lg mt-2 opacity-90">
            Comprehensive assessment based on your profile
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
              onClick={() => {
                // Export PDF functionality will be implemented with a library like jsPDF or html2pdf
                window.print(); // Simple print function as a placeholder
              }}
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
              Find a Mentor
            </a>
          </div>
        </div>
        
        {/* Career Path Matches Visualization */}
        {careerPaths.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Career Path Matches</h2>
            
            {/* Bar Chart Visualization */}
            <div className="space-y-6">
              {careerPaths.map((path, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-lg">{path.title}</span>
                    <span className="font-bold text-blue-600">{path.match}%</span>
                  </div>
                  <div className="relative h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`absolute top-0 left-0 h-full rounded-full ${
                        index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${path.match}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-5 text-xs text-gray-500 mt-1">
                    <div>0%</div>
                    <div className="text-center">25%</div>
                    <div className="text-center">50%</div>
                    <div className="text-center">75%</div>
                    <div className="text-right">100%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* User Profile Summary */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Profile Summary</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Education</h3>
                  <p className="text-lg">{userData.educationLevel} in {userData.studyField}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Current Role</h3>
                  <p className="text-lg">{userData.currentRole}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Experience Level</h3>
                  <p className="text-lg">{userData.experienceLevel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Years of Experience</h3>
                  <p className="text-lg">{userData.yearsExperience}</p>
                </div>
              </div>
              <div>
                {userData.publications && userData.publications !== 'Not specified' && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Publications/Research</h3>
                    <p className="text-lg">{userData.publications}</p>
                  </div>
                )}
                {userData.jobProjects && userData.jobProjects !== 'Not specified' && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500">Notable Projects</h3>
                    <p className="text-lg">{userData.jobProjects}</p>
                  </div>
                )}
                {userData.transferableSkills && userData.transferableSkills !== 'Not specified' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Transferable Skills</h3>
                    <p className="text-lg">{userData.transferableSkills}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Complete Analysis Text */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Complete Analysis</h2>
            <div className="text-base leading-relaxed">
              {formatAnalysisText(analysis)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDashboard;
