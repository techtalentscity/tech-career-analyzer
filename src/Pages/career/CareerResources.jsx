// src/Pages/career/CareerResources.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import geminiApiService from '../../services/geminiApiService';
import storageService from '../../services/storageService';
import LearningResourcesTab from '../../components/LearningResourcesTab';
import InterviewPrepTab from '../../components/InterviewPrepTab';
import LoadingSpinner from '../../components/LoadingSpinner';

const CareerResources = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learning');
  const [resources, setResources] = useState(null);
  const [interviewQA, setInterviewQA] = useState(null);
  const [loading, setLoading] = useState(true);
  const [careerAnalysis, setCareerAnalysis] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Load the Claude analysis first
    const loadAnalysisAndResources = async () => {
      try {
        setLoading(true);
        
        if (!currentUser || !currentUser.email) {
          setError('User not authenticated. Please log in to continue.');
          setLoading(false);
          return;
        }
        
        // Get the original Claude analysis from storage
        const analysis = await storageService.getCareerAnalysis(currentUser.email);
        if (!analysis) {
          setError('Career analysis not found. Please complete the career assessment first.');
          setLoading(false);
          return;
        }
        
        setCareerAnalysis(analysis);
        
        // Extract the recommended career paths and skills from Claude's analysis
        const careerPathData = extractCareerDataFromAnalysis(analysis);
        
        // Load resources based on active tab
        if (activeTab === 'learning') {
          await loadLearningResources(currentUser.email, careerPathData);
        } else {
          await loadInterviewQuestions(currentUser.email, careerPathData);
        }
      } catch (error) {
        console.error("Failed to load resources", error);
        setError(`Error loading resources: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalysisAndResources();
  }, [currentUser]);
  
  // Switch tabs and load data if needed
  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    
    if (!currentUser || !currentUser.email) return;
    
    if (tab === 'learning' && !resources) {
      setLoading(true);
      try {
        const careerPathData = extractCareerDataFromAnalysis(careerAnalysis);
        await loadLearningResources(currentUser.email, careerPathData);
      } catch (error) {
        setError(`Error loading learning resources: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else if (tab === 'interview' && !interviewQA) {
      setLoading(true);
      try {
        const careerPathData = extractCareerDataFromAnalysis(careerAnalysis);
        await loadInterviewQuestions(currentUser.email, careerPathData);
      } catch (error) {
        setError(`Error loading interview questions: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };
  
  // Helper function to extract career path and skills from Claude's analysis
  const extractCareerDataFromAnalysis = (analysis) => {
    // This implementation will depend on the structure of your Claude analysis
    // Example implementation:
    const careerPathMatch = analysis.match(/CAREER PATH RECOMMENDATIONS:[\s\S]*?a\)\s*([^(]+)\s*\(\d+%\s*match\)/i);
    const careerPath = careerPathMatch ? careerPathMatch[1].trim() : "Software Developer";
    
    // Extract skills from the skills gap analysis section
    const skillsGapSection = analysis.match(/SKILLS GAP ANALYSIS:[\s\S]*?LEARNING ROADMAP:/i);
    const skills = skillsGapSection 
      ? skillsGapSection[0].match(/\d+\.\s*([^:]+):/g)?.map(match => match.replace(/\d+\.\s*/, '').replace(':', '').trim()) || []
      : ["Programming", "Data Structures", "Algorithms"];
    
    return {
      careerPath,
      skills
    };
  };
  
  // Load learning resources
  const loadLearningResources = async (userEmail, careerPathData) => {
    try {
      // Check if we already have the data in storage
      if (storageService.hasLearningResources(userEmail)) {
        setResources(await storageService.getLearningResources(userEmail));
      } else {
        // Get new data from Gemini
        const newResources = await geminiApiService.getLearningResources(careerPathData);
        await storageService.saveLearningResources(userEmail, newResources);
        setResources(newResources);
      }
    } catch (error) {
      console.error("Failed to load learning resources", error);
      throw error;
    }
  };
  
  // Load interview questions
  const loadInterviewQuestions = async (userEmail, careerPathData) => {
    try {
      // Check if we already have the data in storage
      if (storageService.hasInterviewQuestions(userEmail)) {
        setInterviewQA(await storageService.getInterviewQuestions(userEmail));
      } else {
        // Get new data from Gemini
        const newInterviewQA = await geminiApiService.getInterviewQuestions(careerPathData);
        await storageService.saveInterviewQuestions(userEmail, newInterviewQA);
        setInterviewQA(newInterviewQA);
      }
    } catch (error) {
      console.error("Failed to load interview questions", error);
      throw error;
    }
  };
  
  // Go back to career dashboard
  const handleBack = () => {
    navigate('/career/dashboard');
  };
  
  return (
    <div className="resources-dashboard container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Career Resources</h1>
        <button 
          onClick={handleBack}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center"
        >
          <span className="mr-2">←</span> Back to Dashboard
        </button>
      </div>
      
      <div className="tab-navigation mb-6">
        <div className="flex border-b">
          <button 
            className={`py-2 px-4 ${activeTab === 'learning' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} 
            onClick={() => handleTabChange('learning')}
          >
            Learning Resources
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'interview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} 
            onClick={() => handleTabChange('interview')}
          >
            Interview Preparation
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
          <p className="ml-2">Loading resources...</p>
        </div>
      ) : (
        <div className="tab-content">
          {activeTab === 'learning' && resources && (
            <LearningResourcesTab 
              resources={resources} 
              careerPath={careerAnalysis ? extractCareerDataFromAnalysis(careerAnalysis).careerPath : 'your career path'} 
            />
          )}
          {activeTab === 'interview' && interviewQA && (
            <InterviewPrepTab 
              interviewQA={interviewQA} 
              careerPath={careerAnalysis ? extractCareerDataFromAnalysis(careerAnalysis).careerPath : 'your career path'} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CareerResources;
