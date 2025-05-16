// src/Pages/career/CareerTest.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import claudeApiService from '../../services/claudeApiService';
import storageService from '../../services/storageService';
import googleFormService from '../../services/googleFormService';
import { toast } from 'react-toastify';

// No more dependency on FormSection component

const CareerTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [formData, setFormData] = useState({
    // Personal information
    fullName: '',
    email: '',
    educationLevel: '', // New field
    
    // Career background
    studyField: '', // Renamed from currentField
    yearsExperience: '',
    currentRole: '',
    
    // Job Experience (new section)
    jobResponsibilities: '',
    jobProjects: '',
    jobTechnologies: '',
    internships: '',
    publications: '', // New field
    
    // Transition information
    transitionReason: '',
    transferableSkills: '',
    anticipatedChallenges: '',
    
    // Personal motivation and strengths
    techMotivation: '',
    techPassion: '',
    
    // Tech preferences and interests
    workPreference: '',
    techInterests: '',
    learningComfort: '',
    toolsUsed: [],
    
    // Tech aspirations
    careerPathsInterest: [],
    industryPreference: [],
    leverageDomainExpertise: '',
    
    // Experience
    experienceLevel: '',
    certifications: '',
    certificationsDetail: '',
    
    // Goals and timeline
    timeCommitment: '',
    targetSalary: '',
    transitionTimeline: '',
    continueCurrent: '',
    futureGoal: '',
    guidanceNeeded: ''
  });

  const [careerAnalysis, setCareerAnalysis] = useState(null);
  
  // Define section icons for enhanced UI - using SVG instead of lucide-react
  const sectionIcons = {
    personal: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    education: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    experience: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    motivation: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    transition: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    ),
    preferences: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    aspirations: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    goals: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    code: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    check: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  useEffect(() => {
    // Check for messages passed via location state (e.g., from results page)
    if (location.state?.message) {
      toast.info(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    e.preventDefault(); // Prevent default form behavior
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Prevent scrolling to bottom
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    setTimeout(() => {
      window.scrollTo(0, currentPosition);
    }, 1);
  };

  const handleMultiSelect = (e) => {
    e.preventDefault(); // Prevent default form behavior
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedValues
    }));
    
    // Prevent scrolling to bottom
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    setTimeout(() => {
      window.scrollTo(0, currentPosition);
    }, 1);
  };

  const toggleAiAssistant = (e) => {
    e.preventDefault(); // Prevent default behavior
    setShowAiAssistant(!showAiAssistant);
    
    // Prevent scrolling
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    setTimeout(() => {
      window.scrollTo(0, currentPosition);
    }, 1);
  };

  const handleAiFillForm = async (e) => {
    e.preventDefault(); // Prevent default behavior
    
    try {
      setLoading(true);
      
      // Call the Claude API service to get form suggestions
      const suggestions = await claudeApiService.getFormSuggestions();
      
      // Parse suggestions and update form
      const suggestionLines = suggestions.split('\n');
      const newFormData = { ...formData };
      
      // Process each line of Claude's response to extract relevant information
      suggestionLines.forEach(line => {
        // Process previous career fields
        if (line.toLowerCase().includes('course of study') || line.toLowerCase().includes('study field')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.studyField = match[1].trim();
        }
        if (line.toLowerCase().includes('education level') || line.toLowerCase().includes('highest education')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.educationLevel = match[1].trim();
        }
        if (line.toLowerCase().includes('years of experience')) {
          if (line.toLowerCase().includes('less than 1')) newFormData.yearsExperience = 'Less than 1 year';
          else if (line.toLowerCase().includes('1-3')) newFormData.yearsExperience = '1-3 years';
          else if (line.toLowerCase().includes('3-5')) newFormData.yearsExperience = '3-5 years';
          else if (line.toLowerCase().includes('5-10')) newFormData.yearsExperience = '5-10 years';
          else if (line.toLowerCase().includes('10+')) newFormData.yearsExperience = '10+ years';
        }
        if (line.toLowerCase().includes('current role') || line.toLowerCase().includes('job title')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.currentRole = match[1].trim();
        }
        
        // Process job experience fields
        if (line.toLowerCase().includes('job responsibilities') || 
            line.toLowerCase().includes('key responsibilities') || 
            line.toLowerCase().includes('main duties')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.jobResponsibilities = match[1].trim();
        }
        if (line.toLowerCase().includes('projects') || 
            line.toLowerCase().includes('achievements') || 
            line.toLowerCase().includes('accomplishments')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.jobProjects = match[1].trim();
        }
        if (line.toLowerCase().includes('software used') || 
            line.toLowerCase().includes('technologies used') || 
            line.toLowerCase().includes('tools used in job')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.jobTechnologies = match[1].trim();
        }
        if (line.toLowerCase().includes('internship') || 
            line.toLowerCase().includes('relevant experience')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.internships = match[1].trim();
        }
        if (line.toLowerCase().includes('publications') || 
            line.toLowerCase().includes('papers') || 
            line.toLowerCase().includes('articles') ||
            line.toLowerCase().includes('blogs')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.publications = match[1].trim();
        }
        
        // Process motivation fields
        if (line.toLowerCase().includes('motivation') || line.toLowerCase().includes('motivated by')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.techMotivation = match[1].trim();
        }
        if (line.toLowerCase().includes('passion') || line.toLowerCase().includes('passionate about')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.techPassion = match[1].trim();
        }
        
        // Process transition information
        if (line.toLowerCase().includes('transition reason')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.transitionReason = match[1].trim();
        }
        if (line.toLowerCase().includes('transferable skills') || line.toLowerCase().includes('strength')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.transferableSkills = match[1].trim();
        }
        if (line.toLowerCase().includes('challenges')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.anticipatedChallenges = match[1].trim();
        }
        
        // Process existing fields
        if (line.toLowerCase().includes('work preference') || line.toLowerCase().includes('prefer to work')) {
          if (line.toLowerCase().includes('remote')) newFormData.workPreference = 'Remote work';
          else if (line.toLowerCase().includes('office')) newFormData.workPreference = 'Office work';
          else if (line.toLowerCase().includes('hybrid')) newFormData.workPreference = 'Hybrid';
          else newFormData.workPreference = 'Flexible';
        }
        if (line.toLowerCase().includes('learning comfort') || line.toLowerCase().includes('comfortable with')) {
          if (line.toLowerCase().includes('very comfortable')) newFormData.learningComfort = 'Very comfortable';
          else if (line.toLowerCase().includes('comfortable')) newFormData.learningComfort = 'Comfortable';
          else if (line.toLowerCase().includes('somewhat')) newFormData.learningComfort = 'Somewhat comfortable';
          else newFormData.learningComfort = 'Not very comfortable';
        }
        if (line.toLowerCase().includes('tech interests') || line.toLowerCase().includes('interested in learning')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.techInterests = match[1].trim();
        }
        
        // Process career aspirations
        if (line.toLowerCase().includes('career paths')) {
          const careerPaths = [];
          if (line.toLowerCase().includes('software')) careerPaths.push('Software Development');
          if (line.toLowerCase().includes('data')) careerPaths.push('Data Analysis/Science');
          if (line.toLowerCase().includes('design')) careerPaths.push('UX/UI Design');
          if (line.toLowerCase().includes('product')) careerPaths.push('Product Management');
          if (line.toLowerCase().includes('cyber')) careerPaths.push('Cybersecurity');
          if (line.toLowerCase().includes('cloud')) careerPaths.push('Cloud Engineering');
          if (line.toLowerCase().includes('devops')) careerPaths.push('DevOps');
          if (line.toLowerCase().includes('ai') || line.toLowerCase().includes('machine learning')) careerPaths.push('AI/Machine Learning');
          
          if (careerPaths.length > 0) {
            newFormData.careerPathsInterest = careerPaths;
          }
        }
        if (line.toLowerCase().includes('industry preference')) {
          const industries = [];
          if (line.toLowerCase().includes('healthcare')) industries.push('Healthcare/Medical');
          if (line.toLowerCase().includes('finance')) industries.push('Finance/Fintech');
          if (line.toLowerCase().includes('education')) industries.push('Education');
          if (line.toLowerCase().includes('commerce')) industries.push('E-commerce');
          if (line.toLowerCase().includes('media')) industries.push('Entertainment/Media');
          
          if (industries.length > 0) {
            newFormData.industryPreference = industries;
          } else {
            newFormData.industryPreference = ['No preference'];
          }
        }
        if (line.toLowerCase().includes('leverage domain') || line.toLowerCase().includes('current expertise')) {
          if (line.toLowerCase().includes('definitely')) newFormData.leverageDomainExpertise = 'Yes, definitely';
          else if (line.toLowerCase().includes('somewhat')) newFormData.leverageDomainExpertise = 'Yes, somewhat';
          else if (line.toLowerCase().includes('not sure')) newFormData.leverageDomainExpertise = 'Not sure';
          else if (line.toLowerCase().includes('change')) newFormData.leverageDomainExpertise = 'No, I want a complete change';
        }
        
        // Process existing experience fields
        if (line.toLowerCase().includes('experience level')) {
          if (line.toLowerCase().includes('beginner')) {
            if (line.toLowerCase().includes('complete')) newFormData.experienceLevel = 'Complete beginner';
            else newFormData.experienceLevel = 'Beginner';
          }
          else if (line.toLowerCase().includes('intermediate')) newFormData.experienceLevel = 'Intermediate';
          else if (line.toLowerCase().includes('advanced')) newFormData.experienceLevel = 'Advanced';
          else newFormData.experienceLevel = 'Some exposure';
        }
        if (line.toLowerCase().includes('certifications') && !line.includes('?')) {
          if (line.toLowerCase().includes('yes')) newFormData.certifications = 'Yes';
          else if (line.toLowerCase().includes('no')) newFormData.certifications = 'No';
          else if (line.toLowerCase().includes('pursuing')) newFormData.certifications = 'Currently pursuing';
          
          // Extract any specific certifications mentioned
          const certMatch = line.match(/:\s*(.+)/);
          if (certMatch && certMatch[1].trim().length > 2) {
            newFormData.certificationsDetail = certMatch[1].trim();
          } else {
            newFormData.certificationsDetail = 'None';
          }
        }
        if (line.toLowerCase().includes('tools used')) {
          const toolsList = [];
          if (line.toLowerCase().includes('vs code')) toolsList.push('VS Code');
          if (line.toLowerCase().includes('github')) toolsList.push('GitHub');
          if (line.toLowerCase().includes('javascript')) toolsList.push('JavaScript');
          if (line.toLowerCase().includes('python')) toolsList.push('Python');
          if (line.toLowerCase().includes('react')) toolsList.push('React');
          if (line.toLowerCase().includes('node')) toolsList.push('Node.js');
          if (line.toLowerCase().includes('sql')) toolsList.push('SQL');
          if (line.toLowerCase().includes('aws')) toolsList.push('AWS');
          if (line.toLowerCase().includes('docker')) toolsList.push('Docker');
          
          if (toolsList.length > 0) {
            newFormData.toolsUsed = toolsList;
          } else {
            newFormData.toolsUsed = ['None'];
          }
        }
        
        // Process timeline and goals
        if (line.toLowerCase().includes('time commitment') || line.toLowerCase().includes('hours per week')) {
          if (line.toLowerCase().includes('5 hours or less')) newFormData.timeCommitment = '5 hours or less';
          else if (line.toLowerCase().includes('5-10')) newFormData.timeCommitment = '5-10 hours';
          else if (line.toLowerCase().includes('10-15')) newFormData.timeCommitment = '10-15 hours';
          else if (line.toLowerCase().includes('15-20')) newFormData.timeCommitment = '15-20 hours';
          else if (line.toLowerCase().includes('20+')) newFormData.timeCommitment = '20+ hours';
          else newFormData.timeCommitment = '10-15 hours';
        }
        if (line.toLowerCase().includes('salary') || line.toLowerCase().includes('compensation')) {
          if (line.toLowerCase().includes('40,000-60,000')) newFormData.targetSalary = '$40,000-$60,000';
          else if (line.toLowerCase().includes('60,000-80,000')) newFormData.targetSalary = '$60,000-$80,000';
          else if (line.toLowerCase().includes('80,000-100,000')) newFormData.targetSalary = '$80,000-$100,000';
          else if (line.toLowerCase().includes('100,000-120,000')) newFormData.targetSalary = '$100,000-$120,000';
          else if (line.toLowerCase().includes('120,000')) newFormData.targetSalary = '$120,000+';
          else newFormData.targetSalary = 'Not sure';
        }
        if (line.toLowerCase().includes('transition timeline') || line.toLowerCase().includes('how long')) {
          if (line.toLowerCase().includes('less than 6')) newFormData.transitionTimeline = 'Less than 6 months';
          else if (line.toLowerCase().includes('6-12')) newFormData.transitionTimeline = '6-12 months';
          else if (line.toLowerCase().includes('1-2 years')) newFormData.transitionTimeline = '1-2 years';
          else if (line.toLowerCase().includes('2+')) newFormData.transitionTimeline = '2+ years';
          else newFormData.transitionTimeline = '6-12 months';
        }
        if (line.toLowerCase().includes('continue in current role') || line.toLowerCase().includes('current job')) {
          if (line.toLowerCase().includes('full-time')) newFormData.continueCurrent = 'Yes, continuing full-time';
          else if (line.toLowerCase().includes('part-time')) newFormData.continueCurrent = 'Yes, but reducing to part-time';
          else if (line.toLowerCase().includes('no')) newFormData.continueCurrent = 'No, focusing exclusively on the transition';
          else if (line.toLowerCase().includes('unemployed')) newFormData.continueCurrent = 'Currently unemployed/between roles';
        }
        if (line.toLowerCase().includes('guidance needed') || line.toLowerCase().includes('help needed')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.guidanceNeeded = match[1].trim();
        }
        if (line.toLowerCase().includes('future goal') || line.toLowerCase().includes('12-month')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.futureGoal = match[1].trim();
        }
      });
      
      setFormData(newFormData);
      setLoading(false);
      toast.success('Form filled with AI suggestions! Please review and edit as needed.');
      
    } catch (error) {
      console.error('Error with AI form fill:', error);
      setLoading(false);
      toast.error('Failed to get AI suggestions. Please fill the form manually.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setAiAnalyzing(true);
      
      // 1. Save form data to local storage for the app's use
      const savedSubmission = storageService.saveCareerTest(formData);
      
      // 2. Submit only name and email to Google Form
      const googleFormData = {
        fullName: formData.fullName,
        email: formData.email
      };
      
      // Submit the minimal data to Google Form
      const formSubmissionResult = await googleFormService.submitToGoogleForm(googleFormData);
      
      if (!formSubmissionResult.success) {
        console.warn('Google Form submission may have failed, but continuing analysis');
      }
      
      // 3. Use the Claude API service to analyze the complete form data
      const analysis = await claudeApiService.analyzeCareerPath(formData);
      setCareerAnalysis(analysis);
      
      // 4. Save the analysis to storage
      storageService.saveCareerAnalysis({
        userId: formData.email,
        analysis
      });
      
      setAiAnalyzing(false);
      
      // 5. Navigate to dashboard page with analysis and form data
      navigate('/career/dashboard', { 
        state: { 
          analysis,
          formData 
        } 
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setAiAnalyzing(false);
      toast.error('Error submitting form. Please try again.');
    }
  };

  if (loading || aiAnalyzing) {
    return <LoadingSpinner message={aiAnalyzing ? "AI is analyzing your results..." : "Loading..."} />;
  }

  // Custom form section component that replaces the imported FormSection
  const CustomFormSection = ({ title, children, icon }) => {
    return (
      <div className="mb-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="border-b border-gray-200 pb-3 mb-6 flex items-center">
          {icon}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    );
  };

  // Prevent default behavior for select elements
  const handleSelectClick = (e) => {
    // Store the current scroll position
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Set a timeout to restore the scroll position after the dropdown opens
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 10);
  };

  // Link handler with preventDefault
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate('/career');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen py-8">
      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <h1 className="text-3xl font-bold">Career Transition to Tech</h1>
          <p className="mt-2 text-blue-100">Help us understand your background and interests to find your ideal tech path</p>
        </div>

        <div className="p-8">
          {/* Navigation and AI Assistant Controls */}
          <div className="flex flex-wrap justify-between items-center mb-6">
            <div>
              <a 
                href="#" 
                onClick={handleBackClick} 
                className="text-blue-600 hover:text-blue-800 transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </a>
            </div>
            
            <button 
              onClick={toggleAiAssistant}
              className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-md"
            >
              <span className="mr-2">🤖</span>
              {showAiAssistant ? 'Hide AI Assistant' : 'Use AI Assistant'}
            </button>
          </div>
          
          {/* AI Assistant Panel */}
          {showAiAssistant && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg mb-6 border border-blue-100 shadow-sm">
              <h3 className="text-xl font-semibold text-blue-700 mb-2 flex items-center">
                {sectionIcons.code}
                AI Assistant
              </h3>
              <p className="mb-4 text-gray-600">Let our AI help you fill out the form or analyze your results.</p>
              <div className="flex space-x-4">
                <button 
                  onClick={handleAiFillForm}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  Let AI Fill Form
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Progress Steps */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8 border border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-sm">
                  <span className="font-bold">1</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-blue-600">Career Test</p>
                  <p className="text-xs text-gray-500">Tell us about yourself</p>
                </div>
              </div>
              <div className="hidden md:block w-24 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-600">
                  <span className="font-bold">2</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-500">Analysis</p>
                  <p className="text-xs text-gray-500">AI processing</p>
                </div>
              </div>
              <div className="hidden md:block w-24 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-gray-600">
                  <span className="font-bold">3</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-500">Results</p>
                  <p className="text-xs text-gray-500">Your career path</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <CustomFormSection title="Personal Information" icon={sectionIcons.personal}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              {/* New Education Level field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Highest Level of Education
                </label>
                <div className="relative">
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="High School">High School</option>
                    <option value="Associate's Degree">Associate's Degree</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </CustomFormSection>
            
            <CustomFormSection title="Educational Background" icon={sectionIcons.education}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Most Recent Course of Study
                </label>
                <input
                  type="text"
                  name="studyField"
                  value={formData.studyField}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="E.g., Computer Science, Biology, Business, etc."
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Current or Most Recent Job Title
                </label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="E.g., Research Assistant, Project Manager, Teacher, etc."
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Years of Experience in Current/Previous Field
                </label>
                <div className="relative">
                  <select
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </CustomFormSection>
            
            {/* Job Experience Section */}
            <CustomFormSection title="Experience Details" icon={sectionIcons.experience}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Key Job Responsibilities
                </label>
                <textarea
                  name="jobResponsibilities"
                  value={formData.jobResponsibilities}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Describe your main responsibilities in your current/previous role. Feel free to copy and paste from your resume."
                  rows="4"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">List your key responsibilities, tasks performed, or duties from your current/previous job</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Notable Projects or Achievements
                </label>
                <textarea
                  name="jobProjects"
                  value={formData.jobProjects}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Describe 2-3 significant projects, achievements, or initiatives you've worked on"
                  rows="4"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Include measurable results if possible (e.g., "Increased efficiency by 20%", "Managed a team of 5")</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Software or Technologies Used
                </label>
                <textarea
                  name="jobTechnologies"
                  value={formData.jobTechnologies}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="List all software, tools, systems, or technologies you've used professionally"
                  rows="3"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Include all technical and non-technical tools (e.g., CRM systems, MS Office, specialized software)</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Internships or Relevant Experience
                </label>
                <textarea
                  name="internships"
                  value={formData.internships}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Describe any internships, volunteer work, or other experiences relevant to technology"
                  rows="3"
                />
                <p className="text-sm text-gray-500 mt-1">Include any tech-related side projects, freelance work, or personal initiatives</p>
              </div>
              
              {/* New Publications field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publications, Papers, Articles, or Blogs
                </label>
                <textarea
                  name="publications"
                  value={formData.publications}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="List any publications, research papers, articles, or blogs you've authored"
                  rows="3"
                />
                <p className="text-sm text-gray-500 mt-1">Include titles, publications, dates, and brief descriptions if applicable</p>
              </div>
            </CustomFormSection>
            
            <CustomFormSection title="Motivation & Personal Strengths" icon={sectionIcons.motivation}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>What is your biggest motivation for pursuing a tech career?
                </label>
                <textarea
                  name="techMotivation"
                  value={formData.techMotivation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="What drives you to pursue a career in technology?"
                  rows="3"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>What are you passionate about?
                </label>
                <textarea
                  name="techPassion"
                  value={formData.techPassion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Describe topics, activities or causes you're passionate about"
                  rows="3"
                  required
                />
              </div>
            </CustomFormSection>
            
            <CustomFormSection title="Transition Information" icon={sectionIcons.transition}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>What is your primary reason for transitioning to tech?
                </label>
                <div className="relative">
                  <select
                    name="transitionReason"
                    value={formData.transitionReason}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Better career prospects">Better career prospects</option>
                    <option value="Higher salary potential">Higher salary potential</option>
                    <option value="Work-life balance">Work-life balance</option>
                    <option value="Remote work opportunities">Remote work opportunities</option>
                    <option value="Interest in technology">Interest in technology</option>
                    <option value="Career advancement">Career advancement</option>
                    <option value="Industry is changing/declining">Industry is changing/declining</option>
                    <option value="Other">Other (please specify in comments)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Which skills from your current/previous career do you believe will transfer well to tech?
                </label>
                <textarea
                  name="transferableSkills"
                  value={formData.transferableSkills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="E.g., analytical thinking, project management, attention to detail, problem-solving, etc."
                  rows="4"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>What challenges do you anticipate in transitioning to tech?
                </label>
                <textarea
                  name="anticipatedChallenges"
                  value={formData.anticipatedChallenges}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="E.g., learning programming, technical terminology, finding entry-level positions, etc."
                  rows="4"
                  required
                />
              </div>
            </CustomFormSection>
            
            <CustomFormSection title="Tech Preferences & Experience" icon={sectionIcons.preferences}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Which tech areas are you most curious about or interested in learning?
                </label>
                <textarea
                  name="techInterests"
                  value={formData.techInterests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="E.g., web development, data science, cybersecurity, etc."
                  rows="3"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>How comfortable are you with learning new tools or programming languages?
                </label>
                <div className="relative">
                  <select
                    name="learningComfort"
                    value={formData.learningComfort}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Very comfortable">Very comfortable</option>
                    <option value="Comfortable">Comfortable</option>
                    <option value="Somewhat comfortable">Somewhat comfortable</option>
                    <option value="Not very comfortable">Not very comfortable</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>How do you prefer to work?
                </label>
                <div className="relative">
                  <select
                    name="workPreference"
                    value={formData.workPreference}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Remote work">Remote work</option>
                    <option value="Office work">Office work</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Which of these best describes your current experience level in tech?
                </label>
                <div className="relative">
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Complete beginner">Complete beginner</option>
                    <option value="Some exposure">Some exposure</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Which of the following tools or platforms have you used before?
                </label>
                <select
                  name="toolsUsed"
                  value={formData.toolsUsed}
                  onChange={handleMultiSelect}
                  onClick={handleSelectClick}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  multiple
                  required
                  size="5"
                >
                  <option value="VS Code">VS Code</option>
                  <option value="GitHub">GitHub</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="React">React</option>
                  <option value="Node.js">Node.js</option>
                  <option value="SQL">SQL</option>
                  <option value="AWS">AWS</option>
                  <option value="Docker">Docker</option>
                  <option value="None">None</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">(Hold Ctrl/Cmd to select multiple options)</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Do you already have any certifications or completed courses?
                </label>
                <div className="relative">
                  <select
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Currently pursuing">Currently pursuing</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>List Any Certifications that you have
                </label>
                <textarea
                  name="certificationsDetail"
                  value={formData.certificationsDetail}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your answer (or type 'None' if you don't have any)"
                  rows="3"
                  required
                />
              </div>
            </CustomFormSection>
            
            <CustomFormSection title="Tech Career Aspirations" icon={sectionIcons.aspirations}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Which tech career paths are you most interested in exploring?
                </label>
                <select
                  name="careerPathsInterest"
                  value={formData.careerPathsInterest}
                  onChange={handleMultiSelect}
                  onClick={handleSelectClick}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  multiple
                  required
                  size="8"
                >
                  <option value="Software Development">Software Development</option>
                  <option value="Data Analysis/Science">Data Analysis/Science</option>
                  <option value="UX/UI Design">UX/UI Design</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud Engineering">Cloud Engineering</option>
                  <option value="DevOps">DevOps</option>
                  <option value="AI/Machine Learning">AI/Machine Learning</option>
                  <option value="Technical Writing">Technical Writing</option>
                  <option value="Quality Assurance">Quality Assurance</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Not Sure Yet">Not Sure Yet</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">(Hold Ctrl/Cmd to select multiple options)</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Do you have a preference for working in specific industries or sectors with your tech skills?
                </label>
                <select
                  name="industryPreference"
                  value={formData.industryPreference}
                  onChange={handleMultiSelect}
                  onClick={handleSelectClick}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  multiple
                  required
                  size="5"
                >
                  <option value="Healthcare/Medical">Healthcare/Medical</option>
                  <option value="Finance/Fintech">Finance/Fintech</option>
                  <option value="Education">Education</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Entertainment/Media">Entertainment/Media</option>
                  <option value="Government">Government</option>
                  <option value="Same as current industry">Same as current industry</option>
                  <option value="No preference">No preference</option>
                  <option value="Other">Other</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">(Hold Ctrl/Cmd to select multiple options)</p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Would you prefer to leverage your domain expertise from your current field in your tech role?
                </label>
                <div className="relative">
                  <select
                    name="leverageDomainExpertise"
                    value={formData.leverageDomainExpertise}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes, definitely">Yes, definitely</option>
                    <option value="Yes, somewhat">Yes, somewhat</option>
                    <option value="Not sure">Not sure</option>
                    <option value="No, I want a complete change">No, I want a complete change</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>What salary range are you targeting in your tech role?
                </label>
                <div className="relative">
                  <select
                    name="targetSalary"
                    value={formData.targetSalary}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="$40,000-$60,000">$40,000-$60,000</option>
                    <option value="$60,000-$80,000">$60,000-$80,000</option>
                    <option value="$80,000-$100,000">$80,000-$100,000</option>
                    <option value="$100,000-$120,000">$100,000-$120,000</option>
                    <option value="$120,000+">$120,000+</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </CustomFormSection>
            
            <CustomFormSection title="Commitment & Goals" icon={sectionIcons.goals}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>How much time can you realistically commit to learning or working on a project each week?
                </label>
                <div className="relative">
                  <select
                    name="timeCommitment"
                    value={formData.timeCommitment}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="5 hours or less">5 hours or less</option>
                    <option value="5-10 hours">5-10 hours</option>
                    <option value="10-15 hours">10-15 hours</option>
                    <option value="15-20 hours">15-20 hours</option>
                    <option value="20+ hours">20+ hours</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>What timeline do you envision for your transition to tech?
                </label>
                <div className="relative">
                  <select
                    name="transitionTimeline"
                    value={formData.transitionTimeline}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Less than 6 months">Less than 6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2+ years">2+ years</option>
                    <option value="Already transitioning">Already transitioning</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>Are you planning to continue in your current role while learning tech skills?
                </label>
                <div className="relative">
                  <select
                    name="continueCurrent"
                    value={formData.continueCurrent}
                    onChange={handleChange}
                    onClick={handleSelectClick}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes, continuing full-time">Yes, continuing full-time</option>
                    <option value="Yes, but reducing to part-time">Yes, but reducing to part-time</option>
                    <option value="No, focusing exclusively on the transition">No, focusing exclusively on the transition</option>
                    <option value="Currently unemployed/between roles">Currently unemployed/between roles</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>What kind of guidance do you need most right now?
                </label>
                <textarea
                  name="guidanceNeeded"
                  value={formData.guidanceNeeded}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="E.g., learning resources, career roadmap, resume help, etc."
                  rows="3"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <span className="text-red-500 mr-1">*</span>In the next 12 months, where would you like to be in your tech journey?
                </label>
                <textarea
                  name="futureGoal"
                  value={formData.futureGoal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="E.g., completing a bootcamp, landing first tech job, etc."
                  rows="3"
                  required
                />
              </div>
            </CustomFormSection>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm text-gray-600 mb-6">
                By continuing, you agree to the <a href="/terms" className="text-blue-600 hover:text-blue-800 transition">Terms of Service</a> and acknowledge you've read our <a href="/privacy" className="text-blue-600 hover:text-blue-800 transition">Privacy Policy</a>.
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              >
                Continue to Results
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-sm mt-6">
        &copy; 2025 Tech Career Transition. All rights reserved.
      </p>
    </div>
  );
};

export default CareerTest;
