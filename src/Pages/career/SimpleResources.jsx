import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

// Direct access functions to avoid dependencies
const getStoredAnalysis = (email) => {
  try {
    // Try formatted analysis first
    const formattedKey = `tech_talents_formatted_analysis_${email}`;
    const formattedData = localStorage.getItem(formattedKey);
    
    if (formattedData) {
      try {
        const parsed = JSON.parse(formattedData);
        return parsed.content;
      } catch (e) {
        console.error("Failed to parse formatted analysis", e);
      }
    }
    
    // Fallback to raw analyses
    try {
      const analyses = JSON.parse(localStorage.getItem('tech_talents_analyses') || '[]');
      const userAnalyses = analyses
        .filter(a => a.userId === email)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      if (userAnalyses.length > 0) {
        return userAnalyses[0].analysis || userAnalyses[0].raw;
      }
    } catch (e) {
      console.error("Failed to parse analyses", e);
    }
    
    return null;
  } catch (error) {
    console.error("Error getting stored analysis:", error);
    return null;
  }
};

const SimpleResources = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learning');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysisData, setAnalysisData] = useState({
    careerPath: "Tech Career",
    skills: ["Programming", "Design", "Analytics"]
  });
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        if (!currentUser || !currentUser.email) {
          setError('Please log in to view this page');
          setLoading(false);
          return;
        }
        
        // Get analysis directly from localStorage
        const analysis = getStoredAnalysis(currentUser.email);
        
        if (analysis) {
          // Extract career path if possible
          let careerPath = "Tech Career";
          let skills = ["Programming", "Design", "Analytics"];
          
          try {
            const careerPathMatch = analysis.match(/CAREER PATH RECOMMENDATIONS:[\s\S]*?a\)\s*([^(]+)\s*\(\d+%\s*match\)/i);
            if (careerPathMatch && careerPathMatch[1]) {
              careerPath = careerPathMatch[1].trim();
            }
            
            const skillsGapSection = analysis.match(/SKILLS GAP ANALYSIS:[\s\S]*?LEARNING ROADMAP:/i);
            if (skillsGapSection && skillsGapSection[0]) {
              const skillMatches = skillsGapSection[0].match(/\d+\.\s*([^:]+):/g);
              if (skillMatches) {
                skills = skillMatches.map(match => 
                  match.replace(/\d+\.\s*/, '').replace(':', '').trim()
                );
              }
            }
          } catch (e) {
            console.error("Error parsing analysis data", e);
          }
          
          setAnalysisData({
            careerPath,
            skills
          });
        }
      } catch (e) {
        console.error("Error in loadData", e);
        setError("Failed to load your career data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser]);
  
  const handleBack = () => {
    navigate('/career/dashboard');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
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
            onClick={() => setActiveTab('learning')}
          >
            Learning Resources
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'interview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`} 
            onClick={() => setActiveTab('interview')}
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
        <div className="p-4 border rounded-md">
          <h2 className="text-xl font-bold mb-4">
            {activeTab === 'learning' ? 'Learning Resources' : 'Interview Questions'} 
            for {analysisData.careerPath}
          </h2>
          
          <div className="mb-4">
            <p className="text-gray-700">
              This page is under development. We're working on providing personalized resources for your career path.
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Your identified skills to develop:</h3>
            <ul className="list-disc pl-5">
              {analysisData.skills.map((skill, index) => (
                <li key={index} className="mb-1">{skill}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              We're gathering resources for these skills. Please check back soon for updates.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleResources;
