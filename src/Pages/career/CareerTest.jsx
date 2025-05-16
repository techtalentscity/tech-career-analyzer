// src/Pages/career/CareerTest.jsx
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

  const handleMultiSelect = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prevState => ({
      ...prevState,
      [name]: selectedValues
    }));
  };

  const toggleAiAssistant = () => {
    setShowAiAssistant(!showAiAssistant);
  };

  const handleAiFillForm = async () => {
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Career Transition to Tech</h1>
      <p className="mb-8">Help us understand your background and tech interests to recommend the best career path</p>

  
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
      <div className="flex justify-between mb-8">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">1</div>
          <span className="font-semibold">Career Test</span>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">2</div>
          <span>Analysis</span>
        </div>
        <div className="flex items-center">
          <div className="bg-gray-300 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">3</div>
          <span>Complete</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection title="Personal Information">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          {/* New Education Level field */}
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Highest Level of Education
            </label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
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
          </div>
        </FormSection>
        
        <FormSection title="Educational Background">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Most Recent Course of Study
            </label>
            <input
              type="text"
              name="studyField"
              value={formData.studyField}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="E.g., Computer Science, Biology, Business, etc."
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Current or Most Recent Job Title
            </label>
            <input
              type="text"
              name="currentRole"
              value={formData.currentRole}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="E.g., Research Assistant, Project Manager, Teacher, etc."
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Years of Experience in Current/Previous Field
            </label>
            <select
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5-10 years">5-10 years</option>
              <option value="10+ years">10+ years</option>
            </select>
          </div>
        </FormSection>
        
        {/* Job Experience Section */}
        <FormSection title="Experience Details">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Key Job Responsibilities
            </label>
            <textarea
              name="jobResponsibilities"
              value={formData.jobResponsibilities}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Describe your main responsibilities in your current/previous role. Feel free to copy and paste from your resume."
              rows="4"
              required
            />
            <p className="text-sm text-gray-500 mt-1">List your key responsibilities, tasks performed, or duties from your current/previous job</p>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Notable Projects or Achievements
            </label>
            <textarea
              name="jobProjects"
              value={formData.jobProjects}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Describe 2-3 significant projects, achievements, or initiatives you've worked on"
              rows="4"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Include measurable results if possible (e.g., "Increased efficiency by 20%", "Managed a team of 5")</p>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Software or Technologies Used
            </label>
            <textarea
              name="jobTechnologies"
              value={formData.jobTechnologies}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="List all software, tools, systems, or technologies you've used professionally"
              rows="3"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Include all technical and non-technical tools (e.g., CRM systems, MS Office, specialized software)</p>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              Internships or Relevant Experience
            </label>
            <textarea
              name="internships"
              value={formData.internships}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Describe any internships, volunteer work, or other experiences relevant to technology"
              rows="3"
            />
            <p className="text-sm text-gray-500 mt-1">Include any tech-related side projects, freelance work, or personal initiatives</p>
          </div>
          
          {/* New Publications field */}
          <div className="mb-4">
            <label className="block mb-2">
              Publications, Papers, Articles, or Blogs
            </label>
            <textarea
              name="publications"
              value={formData.publications}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="List any publications, research papers, articles, or blogs you've authored"
              rows="3"
            />
            <p className="text-sm text-gray-500 mt-1">Include titles, publications, dates, and brief descriptions if applicable</p>
          </div>
        </FormSection>
        
        <FormSection title="Motivation & Personal Strengths">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What is your biggest motivation for pursuing a tech career?
            </label>
            <textarea
              name="techMotivation"
              value={formData.techMotivation}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="What drives you to pursue a career in technology?"
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What are you passionate about?
            </label>
            <textarea
              name="techPassion"
              value={formData.techPassion}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Describe topics, activities or causes you're passionate about"
              rows="3"
              required
            />
          </div>
        </FormSection>
        
        <FormSection title="Transition Information">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What is your primary reason for transitioning to tech?
            </label>
            <select
              name="transitionReason"
              value={formData.transitionReason}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
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
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Which skills from your current/previous career do you believe will transfer well to tech?
            </label>
            <textarea
              name="transferableSkills"
              value={formData.transferableSkills}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="E.g., analytical thinking, project management, attention to detail, problem-solving, etc."
              rows="4"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What challenges do you anticipate in transitioning to tech?
            </label>
            <textarea
              name="anticipatedChallenges"
              value={formData.anticipatedChallenges}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="E.g., learning programming, technical terminology, finding entry-level positions, etc."
              rows="4"
              required
            />
          </div>
        </FormSection>
        
        <FormSection title="Tech Preferences & Experience">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Which tech areas are you most curious about or interested in learning?
            </label>
            <textarea
              name="techInterests"
              value={formData.techInterests}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="E.g., web development, data science, cybersecurity, etc."
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> How comfortable are you with learning new tools or programming languages?
            </label>
            <select
              name="learningComfort"
              value={formData.learningComfort}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Very comfortable">Very comfortable</option>
              <option value="Comfortable">Comfortable</option>
              <option value="Somewhat comfortable">Somewhat comfortable</option>
              <option value="Not very comfortable">Not very comfortable</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> How do you prefer to work?
            </label>
            <select
              name="workPreference"
              value={formData.workPreference}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Remote work">Remote work</option>
              <option value="Office work">Office work</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Which of these best describes your current experience level in tech?
            </label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Complete beginner">Complete beginner</option>
              <option value="Some exposure">Some exposure</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Which of the following tools or platforms have you used before?
            </label>
            <select
              name="toolsUsed"
              value={formData.toolsUsed}
              onChange={handleMultiSelect}
              className="w-full p-2 border rounded-md"
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
            <label className="block mb-2">
              <span className="text-red-500">*</span> Do you already have any certifications or completed courses?
            </label>
            <select
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Currently pursuing">Currently pursuing</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> List Any Certifications that you have
            </label>
            <textarea
              name="certificationsDetail"
              value={formData.certificationsDetail}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer (or type 'None' if you don't have any)"
              rows="3"
              required
            />
          </div>
        </FormSection>
        
        <FormSection title="Tech Career Aspirations">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Which tech career paths are you most interested in exploring?
            </label>
            <select
              name="careerPathsInterest"
              value={formData.careerPathsInterest}
              onChange={handleMultiSelect}
              className="w-full p-2 border rounded-md"
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
            <label className="block mb-2">
              <span className="text-red-500">*</span> Do you have a preference for working in specific industries or sectors with your tech skills?
            </label>
            <select
              name="industryPreference"
              value={formData.industryPreference}
              onChange={handleMultiSelect}
              className="w-full p-2 border rounded-md"
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
            <label className="block mb-2">
              <span className="text-red-500">*</span> Would you prefer to leverage your domain expertise from your current field in your tech role?
            </label>
            <select
              name="leverageDomainExpertise"
              value={formData.leverageDomainExpertise}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Yes, definitely">Yes, definitely</option>
              <option value="Yes, somewhat">Yes, somewhat</option>
              <option value="Not sure">Not sure</option>
              <option value="No, I want a complete change">No, I want a complete change</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What salary range are you targeting in your tech role?
            </label>
            <select
              name="targetSalary"
              value={formData.targetSalary}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
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
          </div>
        </FormSection>
        
        <FormSection title="Commitment & Goals">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> How much time can you realistically commit to learning or working on a project each week?
            </label>
            <select
              name="timeCommitment"
              value={formData.timeCommitment}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="5 hours or less">5 hours or less</option>
              <option value="5-10 hours">5-10 hours</option>
              <option value="10-15 hours">10-15 hours</option>
              <option value="15-20 hours">15-20 hours</option>
              <option value="20+ hours">20+ hours</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What timeline do you envision for your transition to tech?
            </label>
            <select
              name="transitionTimeline"
              value={formData.transitionTimeline}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Less than 6 months">Less than 6 months</option>
              <option value="6-12 months">6-12 months</option>
              <option value="1-2 years">1-2 years</option>
              <option value="2+ years">2+ years</option>
              <option value="Already transitioning">Already transitioning</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Are you planning to continue in your current role while learning tech skills?
            </label>
            <select
              name="continueCurrent"
              value={formData.continueCurrent}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Yes, continuing full-time">Yes, continuing full-time</option>
              <option value="Yes, but reducing to part-time">Yes, but reducing to part-time</option>
              <option value="No, focusing exclusively on the transition">No, focusing exclusively on the transition</option>
              <option value="Currently unemployed/between roles">Currently unemployed/between roles</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What kind of guidance do you need most right now?
            </label>
            <textarea
              name="guidanceNeeded"
              value={formData.guidanceNeeded}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="E.g., learning resources, career roadmap, resume help, etc."
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> In the next 12 months, where would you like to be in your tech journey?
            </label>
            <textarea
              name="futureGoal"
              value={formData.futureGoal}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="E.g., completing a bootcamp, landing first tech job, etc."
              rows="3"
              required
            />
          </div>
        </FormSection>
        
        <div className="text-sm text-gray-600 mb-6">
          By continuing, you agree to the <a href="/terms" className="text-blue-600">Terms of Service</a> and acknowledge you've read our <a href="/privacy" className="text-blue-600">Privacy Policy</a>.
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Continue to Results
        </button>
      </form>
    </div>
  );
};

export default CareerTest;
