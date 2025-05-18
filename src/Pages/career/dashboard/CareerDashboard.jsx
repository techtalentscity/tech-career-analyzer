import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner';
import storageService from '../../../services/storageService';

// Import components
import ProfileOverview from './components/ProfileOverview';
import CareerPathsSection from './components/CareerPathsSection';
import SkillsGapSection from './components/SkillsGapSection';
import TimelineSection from './components/TimelineSection';
import MarketTrendsSection from './components/MarketTrendsSection';
import NetworkingSection from './components/NetworkingSection';
import PersonalBrandingSection from './components/PersonalBrandingSection';
import InterviewPrepSection from './components/InterviewPrepSection';
import AnalysisSection from './components/AnalysisSection';
import NextStepsSection from './components/NextStepsSection';
import FeedbackForm from './components/FeedbackForm';

// Import utility functions
import {
  extractCareerPaths,
  extractSkillsGap,
  extractMarketTrends,
  extractNetworkingStrategy,
  extractPersonalBranding,
  extractInterviewPrep,
  createTimelineData,
  generateNextSteps
} from './utils/dataExtractors';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // State declarations
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
  const [careerPaths, setCareerPaths] = useState([]);
  const [skillsGap, setSkillsGap] = useState([]);
  const [marketTrends, setMarketTrends] = useState([]);
  const [networkingStrategy, setNetworkingStrategy] = useState([]);
  const [personalBranding, setPersonalBranding] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState([]);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showLearningResources, setShowLearningResources] = useState(true);
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
    interests: [],
    careerPathsInterest: [],
    toolsUsed: [],
    techInterests: '',
    timeCommitment: '',
    targetSalary: '',
    workPreference: '',
    transitionTimeline: ''
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  // Google Form URL for feedback
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  useEffect(() => {
    const loadData = async () => {
      try {
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          // Extract data from analysis
          const paths = extractCareerPaths(analysisText);
          const skills = extractSkillsGap(analysisText, location.state.formData || {});
          const trends = extractMarketTrends(analysisText);
          const networking = extractNetworkingStrategy(analysisText);
          const branding = extractPersonalBranding(analysisText);
          const interview = extractInterviewPrep(analysisText);
          
          // Set the extracted data
          setCareerPaths(paths);
          setSkillsGap(skills);
          setMarketTrends(trends);
          setNetworkingStrategy(networking);
          setPersonalBranding(branding);
          setInterviewPrep(interview);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            
            setUserData({
              name: formData.fullName || '',
              email: formData.email || '',
              experienceLevel: formData.experienceLevel || '',
              studyField: formData.studyField || '',
              educationLevel: formData.educationLevel || '',
              currentRole: formData.currentRole || '',
              yearsExperience: formData.yearsExperience || '',
              jobResponsibilities: formData.jobResponsibilities || '',
              jobProjects: formData.jobProjects || '',
              jobTechnologies: formData.jobTechnologies || '',
              publications: formData.publications || '',
              transferableSkills: formData.transferableSkills || '',
              interests: typeof formData.techInterests === 'string' 
                ? formData.techInterests.split(',').map(i => i.trim()) 
                : (Array.isArray(formData.techInterests) ? formData.techInterests : []),
              careerPathsInterest: formData.careerPathsInterest || [],
              toolsUsed: formData.toolsUsed || [],
              techInterests: formData.techInterests || '',
              timeCommitment: formData.timeCommitment || '',
              targetSalary: formData.targetSalary || '',
              workPreference: formData.workPreference || '',
              transitionTimeline: formData.transitionTimeline || ''
            });
          }
        } else {
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const analysisText = storedAnalysis.analysis;
            setAnalysis(analysisText);
            
            // Extract data from analysis
            const paths = extractCareerPaths(analysisText);
            const skills = extractSkillsGap(analysisText);
            const trends = extractMarketTrends(analysisText);
            const networking = extractNetworkingStrategy(analysisText);
            const branding = extractPersonalBranding(analysisText);
            const interview = extractInterviewPrep(analysisText);
            
            // Set the extracted data
            setCareerPaths(paths);
            setSkillsGap(skills);
            setMarketTrends(trends);
            setNetworkingStrategy(networking);
            setPersonalBranding(branding);
            setInterviewPrep(interview);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              setUserData({
                name: submission.fullName || '',
                email: submission.email || '',
                experienceLevel: submission.experienceLevel || '',
                studyField: submission.studyField || '',
                educationLevel: submission.educationLevel || '',
                currentRole: submission.currentRole || '',
                yearsExperience: submission.yearsExperience || '',
                jobResponsibilities: submission.jobResponsibilities || '',
                jobProjects: submission.jobProjects || '',
                jobTechnologies: submission.jobTechnologies || '',
                publications: submission.publications || '',
                transferableSkills: submission.transferableSkills || '',
                interests: typeof submission.techInterests === 'string' 
                  ? submission.techInterests.split(',').map(i => i.trim()) 
                  : (Array.isArray(submission.techInterests) ? submission.techInterests : []),
                careerPathsInterest: submission.careerPathsInterest || [],
                toolsUsed: submission.toolsUsed || [],
                techInterests: submission.techInterests || '',
                timeCommitment: submission.timeCommitment || '',
                targetSalary: submission.targetSalary || '',
                workPreference: submission.workPreference || '',
                transitionTimeline: submission.transitionTimeline || ''
              });
            }
          } else {
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

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  // Generate derived data
  const timelineMilestones = createTimelineData(userData, careerPaths, skillsGap);
  const nextSteps = generateNextSteps(networkingStrategy, personalBranding, skillsGap, interviewPrep, userData);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Your Career Analysis</h1>
          <p className="text-lg mt-2 opacity-90">
            Personalized assessment for {userData.name}
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
              onClick={() => window.print()}
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
              className="flex items-center justify-center py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Join Real Projects
            </a>
          </div>
        </div>

        {/* Component Sections */}
        <ProfileOverview userData={userData} />
        
        {careerPaths.length > 0 && (
          <CareerPathsSection 
            careerPaths={careerPaths} 
            userData={userData}
            skillsGap={skillsGap}
          />
        )}
        
        {skillsGap.length > 0 && (
          <SkillsGapSection 
            skillsGap={skillsGap}
            showAllSkills={showAllSkills}
            setShowAllSkills={setShowAllSkills}
          />
        )}
        
        {userData.transitionTimeline && (
          <TimelineSection 
            timelineMilestones={timelineMilestones}
            userData={userData}
          />
        )}
        
        <MarketTrendsSection 
          marketTrends={marketTrends} 
          emptyState={marketTrends.length === 0}
        />
        
        {networkingStrategy.length > 0 && (
          <NetworkingSection strategies={networkingStrategy} />
        )}
        
        {personalBranding.length > 0 && (
          <PersonalBrandingSection tips={personalBranding} />
        )}
        
        {interviewPrep.length > 0 && (
          <InterviewPrepSection tips={interviewPrep} />
        )}
        
        <AnalysisSection analysis={analysis} />

        {nextSteps.length > 0 && (
          <NextStepsSection nextSteps={nextSteps} />
        )}
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all transform hover:scale-110 group"
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
        <FeedbackForm 
          setShowFeedbackForm={setShowFeedbackForm}
          GOOGLE_FORM_URL={GOOGLE_FORM_URL}
        />
      )}
    </div>
  );
};

export default CareerDashboard;
