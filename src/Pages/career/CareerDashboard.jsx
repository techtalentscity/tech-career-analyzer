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

  // Format analysis text for display with emphasis on important elements
  const formatAnalysisText = (text) => {
    const lines = text.split('\n');
    let formattedContent = [];

    // Helper function to highlight important keywords
    const highlightImportantTerms = (content) => {
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
          <div key={`bullet-${index}`} className="flex items-start ml-4 mb-2">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={highlightImportantTerms(content)} />
          </div>
        );
      }
      // Format list items starting with numbers (e.g., "1. Item")
      else if (line.trim().match(/^\d+\.\s+/)) {
        const prefixMatch = line.match(/^\d+\./);
        const content = line.replace(/^\d+\.\s+/, '');
        
        formattedContent.push(
          <div key={`numbered-${index}`} className="flex items-start ml-4 mb-2">
            <span className="text-blue-600 mr-2 font-medium">{prefixMatch ? prefixMatch[0] : ''}</span>
            <p dangerouslySetInnerHTML={highlightImportantTerms(content)} />
          </div>
        );
      }
      // Format monthly sections (e.g., "Month 1-2:")
      else if (line.trim().match(/^Month\s+\d+-\d+:/i)) {
        formattedContent.push(
          <h5 key={`month-${index}`} className="font-semibold mt-4 mb-2 text-blue-600">
            {line}
          </h5>
        );
      }
      // Format section labeled "Throughout:"
      else if (line.trim() === "Throughout:") {
        formattedContent.push(
          <h5 key={`throughout-${index}`} className="font-semibold mt-4 mb-2 text-blue-600">
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
          <p key={`text-${index}`} className="mb-3" dangerouslySetInnerHTML={highlightImportantTerms(line)} />
        );
      }
    });

    return formattedContent;
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

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
            <div className="prose max-w-none">
              {formatAnalysisText(analysis)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDashboard;
