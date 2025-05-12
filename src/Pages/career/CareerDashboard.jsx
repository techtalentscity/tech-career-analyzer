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

  // Extract skills gap data from analysis text
  const extractSkillsGap = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    const skills = [];
    let inSkillsGapSection = false;
    let currentCareerPath = '';
    
    lines.forEach((line, index) => {
      // Check if we're in the skills gap section
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        return;
      }
      
      // Exit skills gap section if we reach another major section
      if (line.includes("LEARNING ROADMAP") || line.includes("TRANSITION STRATEGY")) {
        inSkillsGapSection = false;
        return;
      }
      
      // Track current career path
      if (line.match(/^[a-z]\)\s+.*?\(\d+%\s+match/i)) {
        const pathMatch = line.match(/^[a-z]\)\s+(.*?)\s+\(/);
        if (pathMatch) {
          currentCareerPath = pathMatch[1].trim();
        }
      }
      
      // Extract skills if we're in the skills gap section
      if (inSkillsGapSection && line.match(/^\d+\.\s+/)) {
        const colonIndex = line.indexOf(':');
        
        if (colonIndex > -1) {
          const skillMatch = line.match(/^\d+\.\s+([^:]+):\s*(.+)/);
          
          if (skillMatch) {
            const skillName = skillMatch[1].trim();
            const description = skillMatch[2].trim();
            
            // Parse level information from the description text if available
            let currentLevel = 3; // Default intermediate
            let requiredLevel = 5; // Default expert
            
            // Look for skill level patterns in the description
            const descLower = description.toLowerCase();
            
            // Extract current level
            if (descLower.includes('no experience') || descLower.includes('need to learn')) {
              currentLevel = 1;
            } else if (descLower.includes('basic knowledge') || descLower.includes('basic understanding')) {
              currentLevel = 2;
            } else if (descLower.includes('intermediate') || descLower.includes('some experience')) {
              currentLevel = 3;
            } else if (descLower.includes('advanced') || descLower.includes('strong understanding')) {
              currentLevel = 4;
            } else if (descLower.includes('expert') || descLower.includes('mastery')) {
              currentLevel = 5;
            }
            
            // Extract required level
            if (descLower.includes('basic proficiency required') || descLower.includes('basic level')) {
              requiredLevel = 2;
            } else if (descLower.includes('intermediate proficiency') || descLower.includes('solid understanding')) {
              requiredLevel = 3;
            } else if (descLower.includes('advanced proficiency') || descLower.includes('deep understanding')) {
              requiredLevel = 4;
            } else if (descLower.includes('expert level') || descLower.includes('mastery required')) {
              requiredLevel = 5;
            }
            
            // Check for gap indicators in the text
            const gapMatch = description.match(/(\d+)\s*level/i);
            if (gapMatch) {
              const gap = parseInt(gapMatch[1]);
              requiredLevel = Math.min(currentLevel + gap, 5);
            }
            
            skills.push({
              name: skillName,
              description: description,
              currentLevel: currentLevel,
              requiredLevel: requiredLevel,
              careerPath: currentCareerPath,
              gap: requiredLevel - currentLevel
            });
          }
        }
      }
    });
    
    return skills;
  };

  // Format analysis text for display with emphasis on important elements
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
      else if (line.trim().match(/^Month\s+\d+-?\d*:/i)) {
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

  // The career paths data
  const careerPaths = extractCareerPaths(analysis);
  const skillsGap = extractSkillsGap(analysis);

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
              Join Real Projects
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
        
        {/* Skills Gap Analysis Charts */}
        {skillsGap.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
            <p className="text-gray-600 mb-6">
              Visual representation of your current skill levels versus required levels for your target career paths.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {skillsGap.map((skill, index) => (
                <SkillGapChart key={index} skill={skill} />
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
            <div>
              {formatAnalysisText(analysis)}
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
