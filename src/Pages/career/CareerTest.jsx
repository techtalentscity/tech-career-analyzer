import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import FormSection from '../../components/FormSection';
import claudeApiService from '../../services/claudeApiService';
import storageService from '../../services/storageService';
import googleFormService from '../../services/googleFormService';
import { toast } from 'react-toastify';

const CareerTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    // Personal information
    fullName: '',
    email: '',
    educationLevel: '', 
    
    // Career background
    studyField: '', 
    yearsExperience: '',
    currentRole: '',
    
    // Job Experience
    jobResponsibilities: '',
    jobProjects: '',
    jobTechnologies: '',
    internships: '',
    publications: '', 
    
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

  // Helper function to show a user-friendly message for API errors
  const getErrorMessage = (error) => {
    if (!error) return "An unknown error occurred";
    
    // Check if it's an overload error (529)
    if (error.message && (
      error.message.includes("529") ||
      error.message.toLowerCase().includes("overloaded")
    )) {
      return "The AI service is currently experiencing high traffic. Please try again in a few minutes or fill out the form manually.";
    }
    
    // Check for timeout
    if (error.message && (
      error.message.toLowerCase().includes("timeout") ||
      error.message.toLowerCase().includes("timed out")
    )) {
      return "The request to the AI service timed out. Please try again or fill out the form manually.";
    }
    
    // Check for network errors
    if (error.message && (
      error.message.toLowerCase().includes("network") ||
      error.message.toLowerCase().includes("internet") ||
      error.message.toLowerCase().includes("offline")
    )) {
      return "There seems to be a network issue. Please check your internet connection and try again.";
    }
    
    // Return the actual error message as fallback
    return error.message;
  };

  useEffect(() => {
    // Check for messages passed via location state (e.g., from results page)
    if (location.state?.message) {
      toast.info(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler for checkboxes
  const handleCheckboxChange = (fieldName, value) => {
    setFormData(prevState => {
      // If value is already in array, remove it (unchecked)
      // Otherwise, add it (checked)
      const updatedArray = prevState[fieldName].includes(value)
        ? prevState[fieldName].filter(item => item !== value)
        : [...prevState[fieldName], value];
      
      return {
        ...prevState,
        [fieldName]: updatedArray
      };
    });
  };

  const toggleAiAssistant = () => {
    setShowAiAssistant(!showAiAssistant);
  };

  const handleAiFillForm = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Display a message to the user that AI is working
      toast.info("AI is generating suggestions. This may take a moment...");
      
      console.log('Requesting AI form suggestions...');
      
      // Call the Claude API service to get form suggestions
      const suggestions = await claudeApiService.getFormSuggestions();
      
      console.log('Received suggestions, processing...');
      console.log('Suggestions preview:', suggestions.substring(0, 100) + '...');
      
      if (!suggestions || typeof suggestions !== 'string') {
        throw new Error('Invalid response format from AI service');
      }
      
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
      
      // Use the helper function to get a user-friendly error message
      const userMessage = getErrorMessage(error);
      setError(userMessage);
      toast.error(userMessage);
    }
  };

  // FIXED: Updated handleSubmit function to use the correct API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setAiAnalyzing(true);
      setError(null);
      
      console.log('Starting form submission process...');
      
      // 1. Save form data to local storage for the app's use
      const savedSubmission = storageService.saveCareerTest(formData);
      console.log('Form data saved to local storage');
      
      // 2. Submit only name and email to Google Form
      const googleFormData = {
        fullName: formData.fullName,
        email: formData.email
      };
      
      console.log('Submitting minimal data to Google Form...');
      try {
        // Submit the minimal data to Google Form
        const formSubmissionResult = await googleFormService.submitToGoogleForm(googleFormData);
        
        if (!formSubmissionResult.success) {
          console.warn('Google Form submission may have failed, but continuing analysis');
        } else {
          console.log('Google Form submission successful');
        }
      } catch (googleFormError) {
        console.warn('Google Form submission error, but continuing analysis:', googleFormError);
      }
      
      // 3. Use the Claude API service to analyze the complete form data
      console.log('Sending data to Claude API for analysis...');
      
      try {
        const analysis = await claudeApiService.analyzeCareerPath(formData);
        
        // Verify we got a valid string response
        if (!analysis || typeof analysis !== 'string') {
          throw new Error('Invalid response from career analysis. Please try again.');
        }
        
        console.log('Analysis successfully received from Claude API');
        console.log('Analysis length:', analysis.length);
        
        setCareerAnalysis(analysis);
        
        // Note: Analysis is now saved inside claudeApiService.analyzeCareerPath
        // We do NOT need to save it again here - this is the fix!
        // The previous code was trying to call storageService.saveAnalysis() which doesn't exist
        
        setAiAnalyzing(false);
        
        // 4. Navigate to dashboard page with analysis and form data
        navigate('/career/dashboard', { 
          state: { 
            analysis,
            formData 
          } 
        });
      } catch (claudeError) {
        console.error('Claude API error:', claudeError);
        throw new Error('Failed to analyze your career data: ' + claudeError.message);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setAiAnalyzing(false);
      setError('Error submitting form: ' + error.message);
      toast.error('Error submitting form. Please try again.');
    }
  };

  // Helper function to render a checkbox group
  const renderCheckboxGroup = (fieldName, options, required = false) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map(option => (
          <div key={option.value} className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
            <input
              type="checkbox"
              id={`${fieldName}-${option.value}`}
              name={fieldName}
              value={option.value}
              checked={formData[fieldName].includes(option.value)}
              onChange={() => handleCheckboxChange(fieldName, option.value)}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required={required && formData[fieldName].length === 0}
            />
            <label 
              htmlFor={`${fieldName}-${option.value}`}
              className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  };

  // Beautiful Enhanced Loading Spinner
  if (loading || aiAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-center font-medium">
            {aiAnalyzing ? "🤖 AI is analyzing your results..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Define options for checkbox groups
  const toolsOptions = [
    { value: 'VS Code', label: 'VS Code' },
    { value: 'GitHub', label: 'GitHub' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'SQL', label: 'SQL' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Docker', label: 'Docker' },
    { value: 'None', label: 'None' }
  ];

  const careerPathsOptions = [
    { value: 'Software Development', label: 'Software Development' },
    { value: 'Data Analysis/Science', label: 'Data Analysis/Science' },
    { value: 'UX/UI Design', label: 'UX/UI Design' },
    { value: 'Product Management', label: 'Product Management' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'Cloud Engineering', label: 'Cloud Engineering' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'AI/Machine Learning', label: 'AI/Machine Learning' },
    { value: 'Technical Writing', label: 'Technical Writing' },
    { value: 'Quality Assurance', label: 'Quality Assurance' },
    { value: 'Technical Support', label: 'Technical Support' },
    { value: 'Not Sure Yet', label: 'Not Sure Yet' }
  ];

  const industryOptions = [
    { value: 'Healthcare/Medical', label: 'Healthcare/Medical' },
    { value: 'Finance/Fintech', label: 'Finance/Fintech' },
    { value: 'Education', label: 'Education' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Entertainment/Media', label: 'Entertainment/Media' },
    { value: 'Government', label: 'Government' },
    { value: 'Same as current industry', label: 'Same as current industry' },
    { value: 'No preference', label: 'No preference' },
    { value: 'Other', label: 'Other' }
  ];

  // Enhanced FormSection Component
  const EnhancedFormSection = ({ title, children }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Career Transition to Tech
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Discover your perfect tech career path with AI-powered insights
              </p>
            </div>
            <button 
              onClick={() => navigate('/career')}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg animate-pulse">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* AI Assistant */}
        <div className="mb-8">
          <button 
            onClick={toggleAiAssistant}
            className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-2xl hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-2xl mr-3">🤖</span>
            <span className="font-semibold">
              {showAiAssistant ? 'Hide AI Assistant' : 'Use AI Assistant'}
            </span>
            <svg className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${showAiAssistant ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showAiAssistant && (
            <div className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-2xl border border-purple-200 shadow-lg animate-fadeIn">
              <div className="flex items-start">
                <div className="text-4xl mr-4">🚀</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Career Assistant</h3>
                  <p className="text-gray-600 mb-4">
                    Let our advanced AI analyze your background and automatically fill out the form with personalized suggestions based on your career goals.
                  </p>
                  <button 
                    onClick={handleAiFillForm}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    ✨ Generate AI Suggestions
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Progress Indicator */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shadow-lg">
                <span className="font-bold">1</span>
              </div>
              <span className="font-semibold text-gray-800">Career Assessment</span>
            </div>
            <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-1/3"></div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-300 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <span className="font-bold">2</span>
              </div>
              <span className="text-gray-500">AI Analysis</span>
            </div>
            <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-gray-200 rounded-full w-0"></div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-300 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                <span className="font-bold">3</span>
              </div>
              <span className="text-gray-500">Results</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <EnhancedFormSection title="👤 Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                <span className="text-red-500">*</span> Highest Level of Education
              </label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                required
              >
                <option value="">Select your education level</option>
                <option value="High School">High School</option>
                <option value="Associate's Degree">Associate's Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </EnhancedFormSection>
          
          <EnhancedFormSection title="🎓 Educational Background">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Most Recent Course of Study
                </label>
                <input
                  type="text"
                  name="studyField"
                  value={formData.studyField}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="E.g., Computer Science, Biology, Business, etc."
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Current or Most Recent Job Title
                </label>
                <input
                  type="text"
                  name="currentRole"
                  value={formData.currentRole}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="E.g., Research Assistant, Project Manager, Teacher, etc."
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Years of Experience in Current/Previous Field
                </label>
                <select
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                >
                  <option value="">Select your experience level</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
            </div>
          </EnhancedFormSection>
          
          <EnhancedFormSection title="💼 Experience Details">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Key Job Responsibilities
                </label>
                <textarea
                  name="jobResponsibilities"
                  value={formData.jobResponsibilities}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Describe your main responsibilities in your current/previous role. Feel free to copy and paste from your resume."
                  rows="4"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">List your key responsibilities, tasks performed, or duties from your current/previous job</p>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Notable Projects or Achievements
                </label>
                <textarea
                  name="jobProjects"
                  value={formData.jobProjects}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Describe 2-3 significant projects, achievements, or initiatives you've worked on"
                  rows="4"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">Include measurable results if possible (e.g., "Increased efficiency by 20%", "Managed a team of 5")</p>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Software or Technologies Used
                </label>
                <textarea
                  name="jobTechnologies"
                  value={formData.jobTechnologies}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="List all software, tools, systems, or technologies you've used professionally"
                  rows="3"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">Include all technical and non-technical tools (e.g., CRM systems, MS Office, specialized software)</p>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Internships or Relevant Experience
                </label>
                <textarea
                  name="internships"
                  value={formData.internships}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Describe any internships, volunteer work, or other experiences relevant to technology"
                  rows="3"
                />
                <p className="text-sm text-gray-500 mt-2">Include any tech-related side projects, freelance work, or personal initiatives</p>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Publications, Papers, Articles, or Blogs
                </label>
                <textarea
                  name="publications"
                  value={formData.publications}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="List any publications, research papers, articles, or blogs you've authored"
                  rows="3"
                />
                <p className="text-sm text-gray-500 mt-2">Include titles, publications, dates, and brief descriptions if applicable</p>
              </div>
            </div>
          </EnhancedFormSection>
          
          <EnhancedFormSection title="💡 Motivation & Personal Strengths">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> What is your biggest motivation for pursuing a tech career?
                </label>
                <textarea
                  name="techMotivation"
                  value={formData.techMotivation}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="What drives you to pursue a career in technology?"
                  rows="3"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> What are you passionate about?
                </label>
                <textarea
                  name="techPassion"
                  value={formData.techPassion}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="Describe topics, activities or causes you're passionate about"
                  rows="3"
                  required
                />
              </div>
            </div>
          </EnhancedFormSection>
          
          <EnhancedFormSection title="🔄 Transition Information">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> What is your primary reason for transitioning to tech?
                </label>
                <select
                  name="transitionReason"
                  value={formData.transitionReason}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                >
                  <option value="">Select your primary reason</option>
                  <option value="Better career prospects">Better career prospects</option>
                  <option value="Higher salary potential">Higher salary potential</option>
                  <option value="Work-life balance">Work-life balance</option>
                  <option value="Remote work opportunities">Remote work opportunities</option>
                  <option value="Interest in technology">Interest in technology</option>
                  <option value="Career advancement">Career advancement</option>
                  <option value="Industry is changing/declining">Industry is changing/declining</option>
                  <option value="Other">Other (please specify in comments)</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Which skills from your current/previous career do you believe will transfer well to tech?
                </label>
                <textarea
                  name="transferableSkills"
                  value={formData.transferableSkills}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="E.g., analytical thinking, project management, attention to detail, problem-solving, etc."
                  rows="4"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> What challenges do you anticipate in transitioning to tech?
                </label>
                <textarea
                  name="anticipatedChallenges"
                  value={formData.anticipatedChallenges}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="E.g., learning programming, technical terminology, finding entry-level positions, etc."
                  rows="4"
                  required
                />
              </div>
            </div>
          </EnhancedFormSection>
          
          <EnhancedFormSection title="🛠️ Tech Preferences & Experience">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Which tech areas are you most curious about or interested in learning?
                </label>
                <textarea
                  name="techInterests"
                  value={formData.techInterests}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="E.g., web development, data science, cybersecurity, etc."
                  rows="3"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Learning Comfort Level
                  </label>
                  <select
                    name="learningComfort"
                    value={formData.learningComfort}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select comfort level</option>
                    <option value="Very comfortable">Very comfortable</option>
                    <option value="Comfortable">Comfortable</option>
                    <option value="Somewhat comfortable">Somewhat comfortable</option>
                    <option value="Not very comfortable">Not very comfortable</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Work Preference
                  </label>
                  <select
                    name="workPreference"
                    value={formData.workPreference}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select work preference</option>
                    <option value="Remote work">Remote work</option>
                    <option value="Office work">Office work</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Current Tech Experience Level
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="Complete beginner">Complete beginner</option>
                  <option value="Some exposure">Some exposure</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-4 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Which tools or platforms have you used before?
                </label>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
                  {renderCheckboxGroup('toolsUsed', toolsOptions, true)}
                </div>
                <p className="text-sm text-gray-500 mt-2">Select all that apply</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Existing Certifications
                  </label>
                  <select
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Currently pursuing">Currently pursuing</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Certification Details
                  </label>
                  <textarea
                    name="certificationsDetail"
                    value={formData.certificationsDetail}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    placeholder="Enter your certifications (or type 'None')"
                    rows="3"
                    required
                  />
                </div>
              </div>
            </div>
          </EnhancedFormSection>
          
          <EnhancedFormSection title="🚀 Tech Career Aspirations">
            <div className="space-y-6">
              <div>
                <label className="block mb-4 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Which tech career paths interest you most?
                </label>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 max-h-80 overflow-y-auto">
                  {renderCheckboxGroup('careerPathsInterest', careerPathsOptions, true)}
                </div>
                <p className="text-sm text-gray-500 mt-2">Select all that apply</p>
              </div>
              
              <div>
                <label className="block mb-4 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Industry Preferences
                </label>
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6">
                  {renderCheckboxGroup('industryPreference', industryOptions, true)}
                </div>
                <p className="text-sm text-gray-500 mt-2">Select all that apply</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Leverage Domain Expertise?
                  </label>
                  <select
                    name="leverageDomainExpertise"
                    value={formData.leverageDomainExpertise}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes, definitely">Yes, definitely</option>
                    <option value="Yes, somewhat">Yes, somewhat</option>
                    <option value="Not sure">Not sure</option>
                    <option value="No, I want a complete change">No, I want a complete change</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Target Salary Range
                  </label>
                  <select
                    name="targetSalary"
                    value={formData.targetSalary}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select salary range</option>
                    <option value="$40,000-$60,000">$40,000-$60,000</option>
                    <option value="$60,000-$80,000">$60,000-$80,000</option>
                    <option value="$80,000-$100,000">$80,000-$100,000</option>
                    <option value="$100,000-$120,000">$100,000-$120,000</option>
                    <option value="$120,000+">$120,000+</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </div>
              </div>
            </div>
          </EnhancedFormSection>
          
          <EnhancedFormSection title="⏰ Commitment & Goals">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Weekly Time Commitment
                  </label>
                  <select
                    name="timeCommitment"
                    value={formData.timeCommitment}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select time commitment</option>
                    <option value="5 hours or less">5 hours or less</option>
                    <option value="5-10 hours">5-10 hours</option>
                    <option value="10-15 hours">10-15 hours</option>
                    <option value="15-20 hours">15-20 hours</option>
                    <option value="20+ hours">20+ hours</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    <span className="text-red-500">*</span> Transition Timeline
                  </label>
                  <select
                    name="transitionTimeline"
                    value={formData.transitionTimeline}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="Less than 6 months">Less than 6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2+ years">2+ years</option>
                    <option value="Already transitioning">Already transitioning</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> Current Role Status
                </label>
                <select
                  name="continueCurrent"
                  value={formData.continueCurrent}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                >
                  <option value="">Select current status</option>
                  <option value="Yes, continuing full-time">Yes, continuing full-time</option>
                  <option value="Yes, but reducing to part-time">Yes, but reducing to part-time</option>
                  <option value="No, focusing exclusively on the transition">No, focusing exclusively on the transition</option>
                  <option value="Currently unemployed/between roles">Currently unemployed/between roles</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> What guidance do you need most right now?
                </label>
                <textarea
                  name="guidanceNeeded"
                  value={formData.guidanceNeeded}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="E.g., learning resources, career roadmap, resume help, etc."
                  rows="3"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  <span className="text-red-500">*</span> 12-Month Goal
                </label>
                <textarea
                  name="futureGoal"
                  value={formData.futureGoal}
                  onChange={handleChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  placeholder="E.g., completing a bootcamp, landing first tech job, etc."
                  rows="3"
                  required
                />
              </div>
            </div>
          </EnhancedFormSection>
          
          {/* Terms and Submit */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-6">
                By continuing, you agree to our{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">Terms of Service</a>
                {' '}and acknowledge you've read our{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</a>.
              </div>
              
              <button 
                type="submit" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-12 rounded-2xl hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold"
              >
                🚀 Get My Career Analysis
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerTest;
