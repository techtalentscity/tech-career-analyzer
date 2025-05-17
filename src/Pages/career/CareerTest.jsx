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
      <div className="space-y-2">
        {options.map(option => (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={`${fieldName}-${option.value}`}
              name={fieldName}
              value={option.value}
              checked={formData[fieldName].includes(option.value)}
              onChange={() => handleCheckboxChange(fieldName, option.value)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required={required && formData[fieldName].length === 0}
            />
            <label 
              htmlFor={`${fieldName}-${option.value}`}
              className="text-sm font-medium text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    );
  };

  if (loading || aiAnalyzing) {
    return <LoadingSpinner message={aiAnalyzing ? "AI is analyzing your results..." : "Loading..."} />;
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Career Transition to Tech</h1>
      <p className="mb-8">Help us understand your background and tech interests to recommend the best career path</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
  
      <div className="flex justify-between items-center mb-6">
        <div>
          <a href="#" onClick={() => navigate('/career')} className="text-blue-600">
            Back to Home
          </a>
        </div>
        
        <button 
          onClick={toggleAiAssistant}
          className="flex items-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
        >
          <span className="mr-2">🤖</span>
          {showAiAssistant ? 'Hide AI Assistant' : 'Use AI Assistant'}
        </button>
      </div>
      
      {showAiAssistant && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
          <p className="mb-4">Let our AI help you fill out the form or analyze your results.</p>
          <div className="flex space-x-4">
            <button 
              onClick={handleAiFillForm}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Let AI Fill Form
            </button>
          </div>
        </div>
      )}
      
      {/* Rest of the component remains the same */}
      {/* ... */}
    </div>
  );
};

export default CareerTest;
