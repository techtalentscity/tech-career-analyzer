// src/Pages/career/CareerTest.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import FormSection from '../../components/FormSection';
import claudeApiService from '../../services/claudeApiService';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

const CareerTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bestActivity: '',
    workPreference: '',
    learningComfort: '',
    techExcitement: '',
    techInterests: '',
    techActivities: '',
    personalStrength: '',
    techMotivation: '',
    experienceLevel: '',
    emergingTechInterest: '',
    certifications: '',
    certificationsDetail: '',
    toolsUsed: [],
    timeCommitment: '',
    impactType: '',
    guidanceNeeded: '',
    futureGoal: ''
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
    const { value, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prevState => ({
      ...prevState,
      toolsUsed: selectedValues
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
        if (line.toLowerCase().includes('like doing best') || line.toLowerCase().includes('favorite activity')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.bestActivity = match[1].trim();
        }
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
        if (line.toLowerCase().includes('excites me') || line.toLowerCase().includes('exciting about')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.techExcitement = match[1].trim();
        }
        if (line.toLowerCase().includes('tech interests') || line.toLowerCase().includes('interested in learning')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.techInterests = match[1].trim();
        }
        if (line.toLowerCase().includes('activities enjoyed') || line.toLowerCase().includes('enjoyed')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.techActivities = match[1].trim();
        }
        if (line.toLowerCase().includes('personal strength') || line.toLowerCase().includes('strength')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.personalStrength = match[1].trim();
        }
        if (line.toLowerCase().includes('motivation') || line.toLowerCase().includes('motivated by')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.techMotivation = match[1].trim();
        }
        if (line.toLowerCase().includes('experience level')) {
          if (line.toLowerCase().includes('beginner')) {
            if (line.toLowerCase().includes('complete')) newFormData.experienceLevel = 'Complete beginner';
            else newFormData.experienceLevel = 'Beginner';
          }
          else if (line.toLowerCase().includes('intermediate')) newFormData.experienceLevel = 'Intermediate';
          else if (line.toLowerCase().includes('advanced')) newFormData.experienceLevel = 'Advanced';
          else newFormData.experienceLevel = 'Some exposure';
        }
        if (line.toLowerCase().includes('emerging tech') || line.toLowerCase().includes('ai') || line.toLowerCase().includes('blockchain')) {
          if (line.toLowerCase().includes('very interested')) newFormData.emergingTechInterest = 'Yes, very interested';
          else if (line.toLowerCase().includes('somewhat interested')) newFormData.emergingTechInterest = 'Yes, somewhat interested';
          else if (line.toLowerCase().includes('not sure')) newFormData.emergingTechInterest = 'Not sure';
          else newFormData.emergingTechInterest = 'Not particularly interested';
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
        if (line.toLowerCase().includes('time commitment') || line.toLowerCase().includes('hours per week')) {
          if (line.toLowerCase().includes('5 hours or less')) newFormData.timeCommitment = '5 hours or less';
          else if (line.toLowerCase().includes('5-10')) newFormData.timeCommitment = '5-10 hours';
          else if (line.toLowerCase().includes('10-15')) newFormData.timeCommitment = '10-15 hours';
          else if (line.toLowerCase().includes('15-20')) newFormData.timeCommitment = '15-20 hours';
          else if (line.toLowerCase().includes('20+')) newFormData.timeCommitment = '20+ hours';
          else newFormData.timeCommitment = '10-15 hours';
        }
        if (line.toLowerCase().includes('impact') || line.toLowerCase().includes('make a difference')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.impactType = match[1].trim();
        }
        if (line.toLowerCase().includes('guidance') || line.toLowerCase().includes('help needed')) {
          const match = line.match(/:\s*(.+)/);
          if (match) newFormData.guidanceNeeded = match[1].trim();
        }
        if (line.toLowerCase().includes('12-month') || line.toLowerCase().includes('future goal')) {
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
      
      // Save form data to storage
      const savedSubmission = storageService.saveCareerTest(formData);
      
      // Use the Claude API service to analyze the form data
      const analysis = await claudeApiService.analyzeCareerPath(formData);
      setCareerAnalysis(analysis);
      
      // Save the analysis to storage
      storageService.saveCareerAnalysis({
        userId: formData.email,
        analysis
      });
      
      setAiAnalyzing(false);
      
      // Navigate to dashboard page with analysis and form data
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
      <h1 className="text-3xl font-bold mb-6">Career Path in Tech</h1>
      <p className="mb-8">Help us understand your tech interests and experience</p>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <a href="#" onClick={() => navigate('/career')} className="text-blue-600 flex items-center">
            <span className="material-icons mr-2">arrow_back</span>
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
          <span>Verification</span>
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
        </FormSection>
        
        <FormSection title="Tech Interests & Experience">
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What do you like doing best?
            </label>
            <textarea
              name="bestActivity"
              value={formData.bestActivity}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer"
              rows="3"
              required
            />
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
              <span className="text-red-500">*</span> What excites you most about working in tech?
            </label>
            <textarea
              name="techExcitement"
              value={formData.techExcitement}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer"
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Which tech areas are you most curious about or interested in learning?
            </label>
            <textarea
              name="techInterests"
              value={formData.techInterests}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer"
              rows="3"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> Which tech-related activities have you enjoyed the most so far?
            </label>
            <textarea
              name="techActivities"
              value={formData.techActivities}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer"
              rows="4"
              required
            />
            <p className="text-sm text-gray-500 mt-1">(even if it's informal — e.g., tinkering with websites, playing with data, cybersecurity games, etc.)</p>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What is one personal strength you believe will help you succeed in tech?
            </label>
            <textarea
              name="personalStrength"
              value={formData.personalStrength}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer"
              rows="4"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">
              <span className="text-red-500">*</span> What is your biggest motivation for pursuing a tech career?
            </label>
            <textarea
              name="techMotivation"
              value={formData.techMotivation}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer"
              rows="3"
              required
            />
          </div>
        </FormSection>
        
        <FormSection title="Experience & Skills">
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
              <span className="text-red-500">*</span> Are you open to working in emerging areas like AI, Blockchain, or Cybersecurity if given the right support?
            </label>
            <select
              name="emergingTechInterest"
              value={formData.emergingTechInterest}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select an option</option>
              <option value="Yes, very interested">Yes, very interested</option>
              <option value="Yes, somewhat interested">Yes, somewhat interested</option>
              <option value="Not sure">Not sure</option>
              <option value="Not particularly interested">Not particularly interested</option>
            </select>
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
              rows="4"
              required
            />
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
              <span className="text-red-500">*</span> What type of impact do you want your work to have?
            </label>
            <textarea
              name="impactType"
              value={formData.impactType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your answer"
              rows="3"
              required
            />
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
              placeholder="Enter your answer"
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
              placeholder="Enter your answer"
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
