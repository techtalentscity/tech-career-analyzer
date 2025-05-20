// src/Pages/career/CareerResources.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import geminiApiService from '../../services/geminiApiService';
import storageService from '../../services/storageService';
import LearningResourcesTab from '../../components/LearningResourcesTab';
import InterviewPrepTab from '../../components/InterviewPrepTab';
import LoadingSpinner from '../../components/LoadingSpinner';

console.log("Storage Service Methods:", Object.keys(storageService));

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
    const loadAnalysisAndResources = async () => {
      try {
        setLoading(true);

        if (!currentUser || !currentUser.email) {
          setError('User not authenticated. Please log in to continue.');
          setLoading(false);
          return;
        }

        let analysis = null;

        try {
          // Safer method checking
          if (typeof storageService.getCareerAnalysis === 'function') {
            analysis = await storageService.getCareerAnalysis(currentUser.email);
          }

          if (!analysis && typeof storageService.getFormattedAnalysis === 'function') {
            analysis = await storageService.getFormattedAnalysis(currentUser.email);
            if (!analysis && typeof storageService.getLatestAnalysis === 'function') {
              const latestAnalysis = await storageService.getLatestAnalysis();
              if (latestAnalysis) {
                analysis = latestAnalysis.analysis || latestAnalysis.raw;
              }
            }
          }
        } catch (error) {
          console.error("Error in analysis retrieval:", error);
        }

        if (!analysis) {
          setError('Career analysis not found. Please complete the career assessment first.');
          setLoading(false);
          return;
        }

        setCareerAnalysis(analysis);

        const careerPathData = extractCareerDataFromAnalysis(analysis);

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
  }, [currentUser, activeTab]);

  const handleTabChange = async (tab) => {
    setActiveTab(tab);
  };

  const extractCareerDataFromAnalysis = (analysis) => {
    if (!analysis || typeof analysis !== 'string') {
      console.warn("Invalid analysis format:", analysis);
      return { careerPath: "Software Developer", skills: ["Programming", "Data Structures", "Algorithms"] };
    }

    // Using explicit variables instead of regex matches to avoid potential TDZ issues
    let careerPath = "Software Developer";
    const careerPathMatch = analysis.match(/CAREER PATH RECOMMENDATIONS:[\s\S]*?a\)\s*([^(]+)\s*\(\d+%\s*match\)/i);
    if (careerPathMatch && careerPathMatch.length > 1) {
      careerPath = careerPathMatch[1].trim();
    }

    // Default skills
    let skills = ["Programming", "Data Structures", "Algorithms"];
    
    try {
      const skillsGapSection = analysis.match(/SKILLS GAP ANALYSIS:[\s\S]*?LEARNING ROADMAP:/i);
      if (skillsGapSection && skillsGapSection.length > 0) {
        const sectionText = skillsGapSection[0];
        const skillMatches = sectionText.match(/\d+\.\s*([^:]+):/g);
        
        if (skillMatches && skillMatches.length > 0) {
          // Process each match separately to avoid using map with arrow functions
          skills = [];
          for (let i = 0; i < skillMatches.length; i++) {
            let match = skillMatches[i];
            match = match.replace(/\d+\.\s*/, '').replace(':', '').trim();
            skills.push(match);
          }
        }
      }
    } catch (err) {
      console.error("Error extracting skills:", err);
    }

    return { careerPath, skills };
  };

  const loadLearningResources = async (userEmail, careerPathData) => {
    try {
      if (!userEmail) {
        throw new Error("User email is required to load resources");
      }

      // Check if method exists and if resources exist
      if (typeof storageService.hasLearningResources === 'function' && 
          storageService.hasLearningResources(userEmail)) {
        const loadedResources = await storageService.getLearningResources(userEmail);
        if (loadedResources) {
          setResources(loadedResources);
          return;
        }
      }

      // Fallback to API
      if (typeof geminiApiService.getLearningResources === 'function') {
        const newResources = await geminiApiService.getLearningResources(careerPathData);
        
        // Save only if the method exists
        if (typeof storageService.saveLearningResources === 'function') {
          await storageService.saveLearningResources(userEmail, newResources);
        }
        
        setResources(newResources);
      } else {
        throw new Error("Learning resources service is not available");
      }
    } catch (error) {
      console.error("Failed to load learning resources", error);
      throw error;
    }
  };

  const loadInterviewQuestions = async (userEmail, careerPathData) => {
    try {
      if (!userEmail) {
        throw new Error("User email is required to load interview questions");
      }

      // Check if method exists and if questions exist
      if (typeof storageService.hasInterviewQuestions === 'function' && 
          storageService.hasInterviewQuestions(userEmail)) {
        const loadedQuestions = await storageService.getInterviewQuestions(userEmail);
        if (loadedQuestions) {
          setInterviewQA(loadedQuestions);
          return;
        }
      }

      // Fallback to API
      if (typeof geminiApiService.getInterviewQuestions === 'function') {
        const newInterviewQA = await geminiApiService.getInterviewQuestions(careerPathData);
        
        // Save only if the method exists
        if (typeof storageService.saveInterviewQuestions === 'function') {
          await storageService.saveInterviewQuestions(userEmail, newInterviewQA);
        }
        
        setInterviewQA(newInterviewQA);
      } else {
        throw new Error("Interview questions service is not available");
      }
    } catch (error) {
      console.error("Failed to load interview questions", error);
      throw error;
    }
  };

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
