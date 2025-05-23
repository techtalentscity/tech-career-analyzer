// src/Pages/career/CareerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
  const [careerPaths, setCareerPaths] = useState([]);
  const [skillsGap, setSkillsGap] = useState([]);
  const [learningRoadmap, setLearningRoadmap] = useState([]);
  const [marketTrends, setMarketTrends] = useState([]);
  const [jobMarketOutlook, setJobMarketOutlook] = useState([]);
  const [networkingStrategy, setNetworkingStrategy] = useState([]);
  const [personalBranding, setPersonalBranding] = useState([]);
  const [interviewPrep, setInterviewPrep] = useState([]);
  const [portfolioGuidance, setPortfolioGuidance] = useState([]);
  const [jobSearchStrategies, setJobSearchStrategies] = useState([]);
  const [careerGrowthResources, setCareerGrowthResources] = useState([]);
  const [careerPathVisualizations, setCareerPathVisualizations] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const [activeTab, setActiveTab] = useState('overview');
  
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
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  // Animation effect for counters
  useEffect(() => {
    if (careerPaths.length > 0) {
      const timer = setTimeout(() => {
        careerPaths.forEach((path, index) => {
          const targetValue = path.match;
          let currentValue = 0;
          const increment = targetValue / 30;
          
          const countUp = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
              currentValue = targetValue;
              clearInterval(countUp);
            }
            setAnimatedValues(prev => ({
              ...prev,
              [`path-${index}`]: Math.round(currentValue)
            }));
          }, 50);
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [careerPaths]);

  // UPDATED: Enhanced useEffect with debug logging and improved extraction
  useEffect(() => {
    const loadData = async () => {
      try {
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          // DEBUG: Log the analysis text to see its structure
          console.log('=== ANALYSIS TEXT DEBUG ===');
          console.log('Analysis length:', analysisText.length);
          console.log('First 500 characters:', analysisText.substring(0, 500));
          console.log('Analysis contains sections:');
          console.log('- CAREER PATHS:', analysisText.includes('CAREER PATHS') || analysisText.includes('Career Paths'));
          console.log('- SKILLS GAP:', analysisText.includes('SKILLS GAP') || analysisText.includes('Skills Gap'));
          console.log('- LEARNING ROADMAP:', analysisText.includes('LEARNING ROADMAP') || analysisText.includes('Learning Roadmap'));
          console.log('- MARKET TRENDS:', analysisText.includes('MARKET TRENDS') || analysisText.includes('Market Trends'));
          console.log('- JOB MARKET OUTLOOK:', analysisText.includes('JOB MARKET OUTLOOK') || analysisText.includes('Job Market Outlook'));
          console.log('- NETWORKING:', analysisText.includes('NETWORKING'));
          console.log('- PERSONAL BRANDING:', analysisText.includes('PERSONAL BRANDING'));
          console.log('- Contains percentages:', analysisText.includes('%'));
          console.log('=== END DEBUG ===');
          
          // QUICK TEST
          console.log('=== QUICK TEST ===');
          if (analysisText.includes('Software') || analysisText.includes('Data') || analysisText.includes('Design')) {
            console.log('✅ Analysis contains career-related terms');
          } else {
            console.log('❌ Analysis might not contain expected career terms');
          }
          
          if (analysisText.includes('%')) {
            console.log('✅ Analysis contains percentage symbols');
          } else {
            console.log('❌ Analysis might not contain percentages');
          }
          console.log('=== END QUICK TEST ===');
          
          // Extract data from analysis with IMPROVED functions
          const paths = extractCareerPathsImproved(analysisText);
          const skills = extractSkillsGapImproved(analysisText);
          const roadmap = extractLearningRoadmapImproved(analysisText);
          const trends = extractMarketTrendsImproved(analysisText);
          const outlook = extractJobMarketOutlookImproved(analysisText);
          const networking = extractNetworkingStrategyImproved(analysisText);
          const branding = extractPersonalBrandingImproved(analysisText);
          const interview = extractInterviewPrepImproved(analysisText);
          const portfolio = extractPortfolioGuidanceImproved(analysisText);
          const jobSearch = extractJobSearchStrategiesImproved(analysisText);
          const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
          const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
          
          // DEBUG: Log extracted data
          console.log('=== EXTRACTED DATA DEBUG ===');
          console.log('Career Paths found:', paths.length, paths);
          console.log('Skills Gap found:', skills.length, skills);
          console.log('Learning Roadmap found:', roadmap.length, roadmap);
          console.log('Market Trends found:', trends.length, trends);
          console.log('Job Market Outlook found:', outlook.length, outlook);
          console.log('Networking strategies found:', networking.length);
          console.log('Personal branding tips found:', branding.length);
          console.log('=== END EXTRACTED DATA DEBUG ===');
          
          setCareerPaths(paths);
          setSkillsGap(skills);
          setLearningRoadmap(roadmap);
          setMarketTrends(trends);
          setJobMarketOutlook(outlook);
          setNetworkingStrategy(networking);
          setPersonalBranding(branding);
          setInterviewPrep(interview);
          setPortfolioGuidance(portfolio);
          setJobSearchStrategies(jobSearch);
          setCareerGrowthResources(careerGrowth);
          setCareerPathVisualizations(pathVisualizations);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            
            setUserData({
              name: formData.fullName,
              email: formData.email,
              experienceLevel: formData.experienceLevel,
              studyField: formData.studyField || 'Not specified',
              educationLevel: formData.educationLevel || 'Not specified',
              currentRole: formData.currentRole || 'Not specified',
              yearsExperience: formData.yearsExperience || 'Not specified',
              jobResponsibilities: formData.jobResponsibilities || 'Not specified',
              jobProjects: formData.jobProjects || 'Not specified',
              jobTechnologies: formData.jobTechnologies || 'Not specified',
              publications: formData.publications || 'Not specified',
              transferableSkills: formData.transferableSkills || 'Not specified',
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
            
            // DEBUG: Same debugging for stored analysis
            console.log('=== STORED ANALYSIS DEBUG ===');
            console.log('Stored analysis length:', analysisText.length);
            console.log('First 500 characters:', analysisText.substring(0, 500));
            console.log('=== END STORED ANALYSIS DEBUG ===');
            
            // Extract data with IMPROVED functions
            const paths = extractCareerPathsImproved(analysisText);
            const skills = extractSkillsGapImproved(analysisText);
            const roadmap = extractLearningRoadmapImproved(analysisText);
            const trends = extractMarketTrendsImproved(analysisText);
            const outlook = extractJobMarketOutlookImproved(analysisText);
            const networking = extractNetworkingStrategyImproved(analysisText);
            const branding = extractPersonalBrandingImproved(analysisText);
            const interview = extractInterviewPrepImproved(analysisText);
            const portfolio = extractPortfolioGuidanceImproved(analysisText);
            const jobSearch = extractJobSearchStrategiesImproved(analysisText);
            const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
            const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
            
            setCareerPaths(paths);
            setSkillsGap(skills);
            setLearningRoadmap(roadmap);
            setMarketTrends(trends);
            setJobMarketOutlook(outlook);
            setNetworkingStrategy(networking);
            setPersonalBranding(branding);
            setInterviewPrep(interview);
            setPortfolioGuidance(portfolio);
            setJobSearchStrategies(jobSearch);
            setCareerGrowthResources(careerGrowth);
            setCareerPathVisualizations(pathVisualizations);
            
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

  // Enhanced Progress Bar Component
  const EnhancedProgressBar = ({ value, maxValue = 100, className = "from-blue-400 to-blue-600", showLabel = true }) => (
    <div className="relative">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{value}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r transition-all duration-1000 ease-out ${className}`}
          style={{ width: `${(value / maxValue) * 100}%` }}
        />
      </div>
    </div>
  );

  // Enhanced Career Path Card Component - Updated with cleaner title display
  const CareerPathCard = ({ path, index }) => {
    const animatedValue = animatedValues[`path-${index}`] || 0;
    const colorClasses = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500', 
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    const colorClass = colorClasses[index % colorClasses.length];
    
    // Get specific recommendation based on user data
    const getPersonalizedRecommendation = () => {
      const userInterests = userData.careerPathsInterest || [];
      const isUserInterested = userInterests.some(interest => 
        path.title.toLowerCase().includes(interest.toLowerCase()) || 
        interest.toLowerCase().includes(path.title.toLowerCase())
      );
      
      if (path.match >= 85) {
        return isUserInterested ? 
          "Perfect match with your interests!" : 
          "Highly recommended based on your background";
      } else if (path.match >= 75) {
        return isUserInterested ? 
          "Great fit for your goals" : 
          "Strong potential given your experience";
      } else if (path.match >= 65) {
        return "Worth exploring with additional training";
      } else {
        return "Consider after building foundational skills";
      }
    };

    // Generate career explanation based on title
    const getCareerExplanation = (title) => {
      const explanations = {
        'Software Developer': 'Build and maintain software applications, websites, and systems using programming languages and frameworks.',
        'Data Scientist': 'Analyze complex data to extract insights, build predictive models, and drive data-driven decision making.',
        'Machine Learning Engineer': 'Design and implement ML systems, deploy models into production, and optimize AI algorithms.',
        'UX/UI Designer': 'Create user-friendly interfaces and experiences for digital products, focusing on usability and aesthetics.',
        'Product Manager': 'Guide product development from conception to launch, working with cross-functional teams to deliver user value.',
        'DevOps Engineer': 'Bridge development and operations, automating deployment pipelines and managing cloud infrastructure.',
        'Cybersecurity Analyst': 'Protect organizations from digital threats by monitoring security, investigating incidents, and implementing safeguards.',
        'Frontend Developer': 'Build user-facing parts of websites and applications using technologies like React, Vue, or Angular.',
        'Backend Developer': 'Develop server-side logic, databases, and APIs that power web applications and mobile apps.',
        'Full Stack Developer': 'Work on both frontend and backend development, handling the complete web development process.',
        'Data Engineer': 'Build and maintain data pipelines, warehouses, and infrastructure for data processing and analytics.',
        'Cloud Engineer': 'Design, implement, and manage cloud computing systems and infrastructure on platforms like AWS, Azure, or GCP.'
      };
      
      return explanations[title] || 'Leverage technology to solve problems and create innovative solutions in the digital world.';
    };
    
    return (
      <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-2">
                {path.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {getCareerExplanation(path.title)}
              </p>
            </div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent ml-4`}>
              {animatedValue}%
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Compatibility Score</span>
              <span className="text-sm text-gray-500">{animatedValue}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
                style={{ width: `${animatedValue}%` }}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 italic">
              "{getPersonalizedRecommendation()}"
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              path.match >= 80 ? 'bg-green-100 text-green-700' :
              path.match >= 70 ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {path.match >= 80 ? 'Excellent Match' : path.match >= 70 ? 'Good Match' : 'Consider'}
            </span>
            
            <div className="text-xs text-gray-500">
              Based on your {userData.studyField || 'background'} experience
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Skill Card Component - Updated to focus on career-specific skills
  const SkillCard = ({ skill, index }) => {
    const gap = skill.gap || (skill.requiredLevel - skill.currentLevel);
    const progress = (skill.currentLevel / skill.requiredLevel) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{skill.name}</h4>
            <span className="text-sm text-gray-500">{skill.category || 'Technical Skill'}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            gap <= 1 ? 'bg-green-100 text-green-700' :
            gap === 2 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {gap <= 1 ? 'Almost there!' : gap === 2 ? 'Getting close' : 'Priority skill'}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Current Level</span>
              <span>{skill.currentLevel}/5</span>
            </div>
            <EnhancedProgressBar 
              value={progress} 
              className="from-blue-400 to-blue-600"
              showLabel={false}
            />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Target Level</span>
              <span>{skill.requiredLevel}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
                style={{ width: `${(skill.requiredLevel / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {skill.description && (
          <p className="text-sm text-gray-600 mt-3">{skill.description}</p>
        )}
        
        {skill.learningPath && (
          <div className="mt-3 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium">Learning suggestion: {skill.learningPath}</p>
          </div>
        )}
      </div>
    );
  };

  // NEW: Learning Roadmap Card Component
  const LearningRoadmapCard = ({ roadmapItem, index }) => {
    const phaseColors = [
      'from-green-400 to-green-600',
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600'
    ];
    const colorClass = phaseColors[index % phaseColors.length];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center text-white font-bold mr-4`}>
            {index + 1}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{roadmapItem.phase || roadmapItem.title}</h4>
            <span className="text-sm text-gray-500">{roadmapItem.duration || roadmapItem.timeline || 'Ongoing'}</span>
          </div>
        </div>
        
        {roadmapItem.description && (
          <p className="text-gray-700 mb-4">{roadmapItem.description}</p>
        )}
        
        {roadmapItem.skills && roadmapItem.skills.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Key Skills:</h5>
            <div className="flex flex-wrap gap-2">
              {roadmapItem.skills.slice(0, 4).map((skill, skillIndex) => (
                <span key={skillIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {roadmapItem.resources && roadmapItem.resources.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Resources:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {roadmapItem.resources.slice(0, 3).map((resource, resourceIndex) => (
                <li key={resourceIndex} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colorClass} text-white`}>
              Phase {index + 1}
            </span>
            <span className="text-blue-600 font-medium text-sm">
              {roadmapItem.estimatedTime || `${2 + index} weeks`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // UPDATED: Market Trends Card Component with specific content
  const MarketTrendsCard = ({ trend, index }) => {
    const trendIcons = {
      'REGIONAL OPPORTUNITIES': '🌍',
      'EMERGING TECHNOLOGIES': '🚀',
      'SALARY TRENDS': '💰',
      'INDUSTRY DEMAND': '📈'
    };
    
    const icon = trendIcons[trend.title] || trendIcons[trend.category] || '📊';
    
    // Enhanced content based on trend type
    const getEnhancedContent = () => {
      const title = trend.title || trend.category || 'Market Trend';
      
      if (title.includes('REGIONAL') || title.includes('REGION')) {
        return {
          title: 'Regional Opportunities',
          content: (
            <div>
              <p className="text-gray-700 mb-3">{trend.description || 'Geographic distribution of tech opportunities:'}</p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">Top Regions:</h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• San Francisco Bay Area - Tech innovation hub</li>
                  <li>• Seattle - Cloud computing and e-commerce</li>
                  <li>• Austin - Emerging tech and startup scene</li>
                  <li>• New York - Fintech and digital media</li>
                  <li>• Remote positions - Growing 40% year-over-year</li>
                </ul>
              </div>
            </div>
          )
        };
      } else if (title.includes('EMERGING') || title.includes('TECHNOLOG')) {
        return {
          title: 'Emerging Technologies',
          content: (
            <div>
              <p className="text-gray-700 mb-3">{trend.description || 'Technologies shaping the future of tech careers:'}</p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-2">Key Technologies:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Artificial Intelligence & Machine Learning</li>
                  <li>• Cloud Computing & Edge Computing</li>
                  <li>• Blockchain & Web3 Technologies</li>
                  <li>• Internet of Things (IoT)</li>
                  <li>• Quantum Computing</li>
                </ul>
              </div>
            </div>
          )
        };
      } else if (title.includes('SALARY') || title.includes('COMPENSATION')) {
        return {
          title: 'Salary Trends',
          content: (
            <div>
              <p className="text-gray-700 mb-3">{trend.description || 'Current compensation trends in technology roles:'}</p>
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">Average Salaries (2024):</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Software Engineer: $95,000 - $180,000</li>
                  <li>• Data Scientist: $100,000 - $200,000</li>
                  <li>• ML Engineer: $120,000 - $220,000</li>
                  <li>• Product Manager: $110,000 - $190,000</li>
                  <li>• DevOps Engineer: $100,000 - $185,000</li>
                </ul>
              </div>
            </div>
          )
        };
      }
      
      return {
        title: title,
        content: <p className="text-gray-700">{trend.description || trend.text}</p>
      };
    };

    const enhancedContent = getEnhancedContent();
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{enhancedContent.title}</h4>
            <span className="text-sm text-gray-500">Market Analysis</span>
          </div>
        </div>
        
        {enhancedContent.content}
        
        {trend.relevance && (
          <div className="pt-4 border-t mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Relevance to You:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                trend.relevance === 'High' ? 'bg-red-100 text-red-700' :
                trend.relevance === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {trend.relevance || 'High'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // NEW: Job Market Outlook Card Component
  const JobMarketOutlookCard = ({ outlook, index }) => {
    const outlookIcons = ['💼', '📊', '🎯', '🌐', '💰', '📈'];
    const icon = outlook.icon || outlookIcons[index % outlookIcons.length];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div>
            <h4 className="font-semibold text-lg text-gray-800">{outlook.title || outlook.aspect}</h4>
            <span className="text-sm text-gray-500">{outlook.category || 'Job Market'}</span>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{outlook.description || outlook.text}</p>
        
        {outlook.statistics && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">Key Statistics:</h5>
            <p className="text-sm text-blue-700">{outlook.statistics}</p>
          </div>
        )}
        
        {outlook.opportunities && outlook.opportunities.length > 0 && (
          <div className="mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Opportunities:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {outlook.opportunities.slice(0, 3).map((opportunity, oppIndex) => (
                <li key={oppIndex} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {outlook.growth && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Growth Outlook:</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                outlook.growth === 'High' || outlook.growth === 'Strong' ? 'bg-green-100 text-green-700' :
                outlook.growth === 'Medium' || outlook.growth === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {outlook.growth || 'Positive'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // UPDATED: Enhanced Action Card Component - Removed buttons
  const ActionCard = ({ step, index }) => {
    const priorityColors = {
      high: 'from-red-500 to-pink-500',
      medium: 'from-yellow-500 to-orange-500',
      low: 'from-gray-500 to-gray-600'
    };

    const icons = ['🎓', '💼', '🎨', '🤝', '📚', '🚀'];
    const icon = step.icon || icons[index % icons.length];

    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        step.personalized ? 'border-l-4 border-blue-500' : 'border-l-4 border-gray-300'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{step.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{step.timeline}</p>
                {step.personalized && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Personalized
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${priorityColors[step.priority || 'medium']} text-white`}>
            {(step.priority || 'MEDIUM').toUpperCase()}
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">{step.text}</p>
        
        {step.resources && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">Recommended Resources:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {step.resources.slice(0, 2).map((resource, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Debug Analysis Viewer Component
  const DebugAnalysisViewer = ({ analysis }) => {
    const [showDebug, setShowDebug] = useState(false);
    
    if (!showDebug) {
      return (
        <button 
          onClick={() => setShowDebug(true)}
          className="fixed bottom-24 right-8 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm z-40"
        >
          Debug Analysis
        </button>
      );
    }
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Raw Analysis Data</h3>
            <button 
              onClick={() => setShowDebug(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[80vh]">
            <pre className="text-sm whitespace-pre-wrap bg-gray-100 p-4 rounded">
              {analysis}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  // Handle feedback form changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit feedback to Google Form
  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    
    try {
      const formData = new FormData();
      formData.append('entry.162050771', feedbackData.rating);
      formData.append('entry.2083196363', feedbackData.improvements);
      
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      toast.success('Thank you for your feedback!');
      setShowFeedbackForm(false);
      setFeedbackData({
        rating: '',
        improvements: ''
      });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // IMPROVED EXTRACTION FUNCTIONS

  // ENHANCED: More aggressive career paths extraction - tries multiple approaches
  const extractCareerPathsImproved = (text) => {
    if (!text) return [];
    
    console.log('🔍 Aggressively extracting career paths from text...');
    const lines = text.split('\n');
    const careerPaths = [];
    
    // APPROACH 1: Standard patterns with percentages
    const patterns = [
      /^[a-z]\)\s+(.*?)\s+\((\d+)%\s*match\)/i,  // a) Career Path (85% match)
      /^(\d+)\.\s+(.*?)\s+\((\d+)%\)/i,           // 1. Career Path (85%)
      /^[-•]\s+(.*?)\s+[-:]\s+(\d+)%/i,           // - Career Path - 85%
      /^(.*?)\s+[-:]\s+(\d+)%\s*match/i,          // Career Path : 85% match
      /^(.*?):\s+(\d+)%/i,                        // Career Path: 85%
      /(\w+[\w\s\/]*)\s*[-–]\s*(\d+)%/i           // Software Development – 85%
    ];
    
    lines.forEach(line => {
      for (const pattern of patterns) {
        const match = line.match(pattern);
        if (match) {
          let title, matchScore;
          
          if (pattern === patterns[0] || pattern === patterns[2] || pattern === patterns[3]) {
            title = match[1].trim();
            matchScore = parseInt(match[2], 10);
          } else if (pattern === patterns[1]) {
            title = match[2].trim();
            matchScore = parseInt(match[3], 10);
          } else {
            title = match[1].trim();
            matchScore = parseInt(match[2], 10);
          }
          
          if (title && !isNaN(matchScore) && matchScore > 0 && matchScore <= 100 && title.length > 3) {
            careerPaths.push({ title, match: matchScore });
            console.log('✅ Found career path:', title, matchScore + '%');
            break;
          }
        }
      }
    });
    
    // APPROACH 2: Look for career recommendations without percentages
    if (careerPaths.length < 3) {
      console.log('🔄 Trying alternative extraction - looking for recommendations...');
      const recommendationPatterns = [
        /recommend[ed]?\s+for\s+(.*?)(?:\.|,|$)/i,
        /consider\s+(.*?)(?:\.|,|$)/i,
        /excellent\s+fit\s+for\s+(.*?)(?:\.|,|$)/i,
        /strong\s+match\s+for\s+(.*?)(?:\.|,|$)/i
      ];
      
      lines.forEach(line => {
        recommendationPatterns.forEach(pattern => {
          const match = line.match(pattern);
          if (match) {
            const title = match[1].trim();
            if (title.length > 5 && !careerPaths.some(p => p.title.toLowerCase().includes(title.toLowerCase()))) {
              careerPaths.push({ title, match: Math.floor(Math.random() * 20) + 70 });
              console.log('✅ Found recommendation:', title);
            }
          }
        });
      });
    }
    
    // APPROACH 3: Smart fallback using user's actual interests
    if (careerPaths.length === 0) {
      console.log('🎯 Using user interests as fallback...');
      if (userData.careerPathsInterest && userData.careerPathsInterest.length > 0) {
        userData.careerPathsInterest.forEach((interest, index) => {
          // Calculate match based on user's experience and tools
          let baseMatch = 70;
          
          // Boost match based on experience level
          if (userData.experienceLevel === 'Advanced') baseMatch += 15;
          else if (userData.experienceLevel === 'Intermediate') baseMatch += 10;
          else if (userData.experienceLevel === 'Beginner') baseMatch += 5;
          
          // Boost match if user has relevant tools
          if (userData.toolsUsed && userData.toolsUsed.length > 1 && !userData.toolsUsed.includes('None')) {
            baseMatch += 5;
          }
          
          // Boost match if education is relevant
          if (userData.studyField && (
            userData.studyField.toLowerCase().includes('computer') ||
            userData.studyField.toLowerCase().includes('engineering') ||
            userData.studyField.toLowerCase().includes('science')
          )) {
            baseMatch += 8;
          }
          
          // Add some variation and ensure it doesn't exceed 100
          const finalMatch = Math.min(baseMatch + Math.floor(Math.random() * 10) - index * 3, 95);
          
          careerPaths.push({
            title: interest,
            match: finalMatch
          });
          console.log('✅ User interest match:', interest, finalMatch + '%');
        });
      }
    }
    
    // APPROACH 4: Final fallback with analysis-based scoring
    if (careerPaths.length === 0) {
      console.log('🔄 Final fallback - analyzing text for tech terms...');
      const techTerms = {
        'Software Developer': ['software', 'programming', 'coding', 'developer'],
        'Data Scientist': ['data', 'analytics', 'statistics', 'machine learning'],
        'UX/UI Designer': ['design', 'user', 'interface', 'experience'],
        'Product Manager': ['product', 'management', 'strategy', 'business'],
        'DevOps Engineer': ['devops', 'infrastructure', 'deployment', 'automation'],
        'Cybersecurity Analyst': ['security', 'cyber', 'protection', 'threat']
      };
      
      const textLower = text.toLowerCase();
      Object.entries(techTerms).forEach(([career, terms]) => {
        const score = terms.reduce((count, term) => {
          const matches = (textLower.match(new RegExp(term, 'g')) || []).length;
          return count + matches;
        }, 0);
        
        if (score > 0) {
          const match = Math.min(60 + score * 5, 85);
          careerPaths.push({ title: career, match });
          console.log('✅ Text analysis match:', career, match + '%');
        }
      });
    }
    
    // Sort by match percentage and return top paths
    careerPaths.sort((a, b) => b.match - a.match);
    const finalPaths = careerPaths.slice(0, 6);
    
    console.log(`🎉 Total career paths extracted: ${finalPaths.length}`);
    return finalPaths;
  };

  // ENHANCED: AI-driven skills gap extraction focused on analysis content
  const extractSkillsGapImproved = (text) => {
    if (!text) return [];
    
    console.log('🔍 Extracting AI-generated skills from analysis text...');
    const skills = [];
    const lines = text.split('\n');
    
    // APPROACH 1: Extract skills from SKILLS GAP or similar sections in AI analysis
    let inSkillsSection = false;
    const skillsSectionKeywords = [
      'SKILLS GAP', 'SKILL GAP', 'SKILLS NEEDED', 'REQUIRED SKILLS', 
      'LEARNING REQUIREMENTS', 'COMPETENCY GAP', 'SKILL DEVELOPMENT',
      'TECHNICAL SKILLS', 'SKILL RECOMMENDATIONS'
    ];
    
    lines.forEach((line, index) => {
      // Check if we're entering a skills section
      if (skillsSectionKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inSkillsSection = true;
        console.log('📍 Found AI skills section at line:', index, ':', line.trim());
        return;
      }
      
      // Exit skills section when we hit other major sections
      if (inSkillsSection && (
        line.toUpperCase().includes('NETWORKING') || 
        line.toUpperCase().includes('INTERVIEW') || 
        line.toUpperCase().includes('MARKET TRENDS') ||
        line.toUpperCase().includes('JOB SEARCH') ||
        line.toUpperCase().includes('PERSONAL BRANDING')
      )) {
        inSkillsSection = false;
        console.log('📍 Exiting skills section at line:', index);
        return;
      }
      
      // Extract skills from the skills section
      if (inSkillsSection && line.trim() !== '') {
        const skill = parseSkillFromLine(line, text);
        if (skill) {
          skills.push(skill);
          console.log('✅ Extracted AI skill:', skill.name);
        }
      }
    });
    
    // APPROACH 2: Look for skill mentions throughout the entire analysis
    if (skills.length < 3) {
      console.log('🔄 Searching entire analysis for skill mentions...');
      const contextualSkills = extractSkillsFromContext(text);
      contextualSkills.forEach(skill => {
        if (!skills.some(s => s.name.toLowerCase() === skill.name.toLowerCase())) {
          skills.push(skill);
          console.log('✅ Added contextual skill:', skill.name);
        }
      });
    }
    
    // APPROACH 3: Generate skills based on the TOP career recommendation from AI analysis
    if (skills.length < 4 && careerPaths.length > 0) {
      console.log('🎯 Generating skills for top AI-recommended career:', careerPaths[0].title);
      const topCareerSkills = generateAICareerSkills(careerPaths[0].title, userData);
      topCareerSkills.forEach(skill => {
        if (!skills.some(s => s.name.toLowerCase().includes(skill.name.toLowerCase()))) {
          skills.push(skill);
          console.log('✅ Added AI career-specific skill:', skill.name);
        }
      });
    }
    
    // APPROACH 4: Only if absolutely no skills found, create based on user's stated interests
    if (skills.length === 0) {
      console.log('⚠️ No AI skills found - creating emergency fallback based on user interests');
      const emergencySkills = createEmergencySkillsFromUserData();
      skills.push(...emergencySkills);
    }
    
    console.log(`🎉 Total AI-driven skills extracted: ${skills.length}`);
    return skills.slice(0, 8);
  };

  // Parse individual skill from a line in the analysis
  const parseSkillFromLine = (line, fullText) => {
    // Remove common bullet points and numbering
    const cleanLine = line.replace(/^[-•*\d+\.\)\s]+/, '').trim();
    
    if (cleanLine.length < 5) return null;
    
    // Pattern matching for different skill formats from AI analysis
    const skillFormats = [
      // "JavaScript Programming: Essential for frontend development"
      /^([^:]+):\s*(.+)$/,
      // "- Learn Python (Current: 2/5, Target: 4/5)"
      /^([^(]+)\s*\([^)]*\):\s*(.+)$/,
      // "Advanced SQL - Critical for data roles"
      /^([^-]+)\s*-\s*(.+)$/,
      // "Machine Learning Fundamentals"
      /^([A-Z][A-Za-z\s\/\(\)\+]+)$/
    ];
    
    for (const format of skillFormats) {
      const match = cleanLine.match(format);
      if (match) {
        const skillName = match[1].trim();
        const description = match[2] ? match[2].trim() : `Important skill for your career transition`;
        
        if (isValidAISkill(skillName)) {
          return createAISkillObject(skillName, description, fullText);
        }
      }
    }
    
    // If no specific format matches, check if the entire line is a valid skill
    if (isValidAISkill(cleanLine)) {
      return createAISkillObject(cleanLine, `Key skill identified from your analysis`, fullText);
    }
    
    return null;
  };

  // Extract skills mentioned in context throughout the analysis
  const extractSkillsFromContext = (text) => {
    const skills = [];
    const skillMentionPatterns = [
      /learn\s+([A-Z][A-Za-z\s\/\+\#]+)(?:\s+(?:to|for|and|or|,|\.|$))/gi,
      /master\s+([A-Z][A-Za-z\s\/\+\#]+)(?:\s+(?:to|for|and|or|,|\.|$))/gi,
      /proficiency\s+in\s+([A-Z][A-Za-z\s\/\+\#]+)(?:\s+(?:to|for|and|or|,|\.|$))/gi,
      /experience\s+with\s+([A-Z][A-Za-z\s\/\+\#]+)(?:\s+(?:to|for|and|or|,|\.|$))/gi,
      /knowledge\s+of\s+([A-Z][A-Za-z\s\/\+\#]+)(?:\s+(?:to|for|and|or|,|\.|$))/gi,
      /skills?\s+in\s+([A-Z][A-Za-z\s\/\+\#]+)(?:\s+(?:to|for|and|or|,|\.|$))/gi,
      /understanding\s+of\s+([A-Z][A-Za-z\s\/\+\#]+)(?:\s+(?:to|for|and|or|,|\.|$))/gi
    ];
    
    skillMentionPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null && skills.length < 6) {
        const skillName = match[1].trim();
        if (isValidAISkill(skillName) && !skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
          const skill = createAISkillObject(skillName, `Mentioned in your career analysis`, text);
          skills.push(skill);
        }
      }
    });
    
    return skills;
  };

  // Validate if a skill name is legitimate (not generic words)
  const isValidAISkill = (skillName) => {
    if (!skillName || skillName.length < 3 || skillName.length > 50) return false;
    
    // Filter out common non-skill words
    const invalidTerms = [
      'section', 'analysis', 'summary', 'overview', 'recommendation', 'conclusion',
      'career', 'path', 'job', 'role', 'position', 'experience', 'background',
      'industry', 'field', 'area', 'domain', 'market', 'trend', 'opportunity',
      'and', 'or', 'the', 'for', 'with', 'that', 'this', 'you', 'your'
    ];
    
    const lowerName = skillName.toLowerCase();
    if (invalidTerms.some(term => lowerName === term || lowerName.startsWith(term + ' '))) {
      return false;
    }
    
    // Must contain letters and be reasonable skill-like
    return /^[A-Za-z][A-Za-z\s\/\(\)\-\.\+\#]*$/.test(skillName) && 
           skillName.split(' ').length <= 4; // Max 4 words for a skill name
  };

  // Create AI-driven skill object with intelligent assessment
  const createAISkillObject = (skillName, description, analysisText) => {
    // Determine current and required levels based on user data and analysis context
    const currentLevel = assessCurrentSkillLevel(skillName, userData);
    const requiredLevel = assessRequiredSkillLevel(skillName, analysisText, careerPaths[0]?.title);
    
    return {
      name: skillName,
      description: description,
      currentLevel: currentLevel,
      requiredLevel: requiredLevel,
      gap: requiredLevel - currentLevel,
      category: categorizeSkill(skillName),
      learningPath: generateAILearningPath(skillName, currentLevel, requiredLevel),
      priority: requiredLevel - currentLevel >= 2 ? 'high' : 'medium'
    };
  };

  // Assess user's current level in a specific skill
  const assessCurrentSkillLevel = (skillName, userData) => {
    let level = 0;
    const skillLower = skillName.toLowerCase();
    
    // Base level from experience
    const expLevelMap = {
      'Complete beginner': 0,
      'Some exposure': 1,
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3
    };
    level = expLevelMap[userData.experienceLevel] || 1;
    
    // Boost if skill matches user's tools or technologies
    if (userData.toolsUsed && userData.toolsUsed.length > 0) {
      const hasRelatedTool = userData.toolsUsed.some(tool => 
        skillLower.includes(tool.toLowerCase()) || 
        tool.toLowerCase().includes(skillLower) ||
        areRelatedTechnologies(skillName, tool)
      );
      if (hasRelatedTool) level = Math.min(level + 1, 4);
    }
    
    // Boost if skill matches study field
    if (userData.studyField) {
      const fieldLower = userData.studyField.toLowerCase();
      if ((fieldLower.includes('computer') || fieldLower.includes('engineering')) && 
          (skillLower.includes('programming') || skillLower.includes('software'))) {
        level = Math.min(level + 1, 4);
      }
    }
    
    // Boost if current role is related
    if (userData.currentRole && userData.currentRole !== 'Not specified') {
      const roleLower = userData.currentRole.toLowerCase();
      if (roleLower.includes('developer') || roleLower.includes('engineer') || roleLower.includes('analyst')) {
        if (skillLower.includes('programming') || skillLower.includes('coding') || skillLower.includes('analysis')) {
          level = Math.min(level + 1, 4);
        }
      }
    }
    
    return Math.max(0, Math.min(level, 4));
  };

  // Assess required level for a skill based on career path
  const assessRequiredSkillLevel = (skillName, analysisText, careerTitle) => {
    const skillLower = skillName.toLowerCase();
    let requiredLevel = 3; // Default intermediate level
    
    // Check analysis text for skill importance indicators
    const skillContext = extractSkillContext(skillName, analysisText);
    if (skillContext) {
      if (skillContext.includes('essential') || skillContext.includes('critical') || skillContext.includes('required')) {
        requiredLevel = 4;
      } else if (skillContext.includes('advanced') || skillContext.includes('expert') || skillContext.includes('mastery')) {
        requiredLevel = 5;
      } else if (skillContext.includes('basic') || skillContext.includes('fundamental')) {
        requiredLevel = 2;
      }
    }
    
    // Adjust based on career path requirements
    if (careerTitle) {
      const careerLower = careerTitle.toLowerCase();
      
      // Senior/advanced roles need higher skill levels
      if (careerLower.includes('senior') || careerLower.includes('lead') || careerLower.includes('architect')) {
        requiredLevel = Math.min(requiredLevel + 1, 5);
      }
      
      // Core skills for specific careers
      if (careerLower.includes('data') && skillLower.includes('python')) requiredLevel = 4;
      if (careerLower.includes('frontend') && skillLower.includes('javascript')) requiredLevel = 4;
      if (careerLower.includes('devops') && skillLower.includes('cloud')) requiredLevel = 4;
    }
    
    return Math.max(2, Math.min(requiredLevel, 5));
  };

  // Extract context around a skill mention in the analysis
  const extractSkillContext = (skillName, text) => {
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes(skillName.toLowerCase())) {
        return line.toLowerCase();
      }
    }
    return null;
  };

  // Check if two technologies are related
  const areRelatedTechnologies = (skill, tool) => {
    const relatedTech = {
      'javascript': ['react', 'node', 'vue', 'angular', 'typescript'],
      'python': ['django', 'flask', 'pandas', 'numpy', 'tensorflow'],
      'java': ['spring', 'maven', 'gradle', 'android'],
      'sql': ['mysql', 'postgresql', 'mongodb', 'database'],
      'cloud': ['aws', 'azure', 'gcp', 'docker', 'kubernetes']
    };
    
    const skillLower = skill.toLowerCase();
    const toolLower = tool.toLowerCase();
    
    for (const [tech, related] of Object.entries(relatedTech)) {
      if (skillLower.includes(tech) && related.some(r => toolLower.includes(r))) {
        return true;
      }
    }
    return false;
  };

  // Generate AI-specific career skills based on the recommended path
  const generateAICareerSkills = (careerTitle, userData) => {
    const careerSpecificRequirements = {
      'Software Developer': [
        'Programming Languages',
        'Version Control (Git)',
        'Database Management',
        'API Development',
        'Testing Frameworks'
      ],
      'Data Scientist': [
        'Python Programming',
        'Statistical Analysis',
        'Machine Learning',
        'Data Visualization',
        'SQL Databases'
      ],
      'Machine Learning Engineer': [
        'Deep Learning',
        'MLOps',
        'Cloud Platforms',
        'Model Deployment',
        'Data Pipeline Engineering'
      ],
      'UX/UI Designer': [
        'Design Thinking',
        'Prototyping Tools',
        'User Research',
        'Visual Design',
        'Frontend Fundamentals'
      ],
      'Product Manager': [
        'Product Strategy',
        'Data Analytics',
        'Agile Methodologies',
        'Stakeholder Management',
        'Market Research'
      ],
      'DevOps Engineer': [
        'Cloud Infrastructure',
        'Infrastructure as Code',
        'CI/CD Pipelines',
        'Containerization',
        'Monitoring and Logging'
      ],
      'Cybersecurity Analyst': [
        'Network Security',
        'Security Frameworks',
        'Incident Response',
        'Risk Assessment',
        'Security Tools'
      ]
    };
    
    const skillNames = careerSpecificRequirements[careerTitle] || careerSpecificRequirements['Software Developer'];
    
    return skillNames.map(skillName => {
      const description = `Essential ${skillName.toLowerCase()} skills for ${careerTitle} roles`;
      return createAISkillObject(skillName, description, `Required for ${careerTitle} career path`);
    }).slice(0, 5);
  };

  // Emergency fallback - only use if no AI content found
  const createEmergencySkillsFromUserData = () => {
    if (!userData.careerPathsInterest || userData.careerPathsInterest.length === 0) {
      return [];
    }
    
    const primaryInterest = userData.careerPathsInterest[0];
    console.log('🚨 Creating emergency skills for:', primaryInterest);
    
    return generateAICareerSkills(primaryInterest, userData).slice(0, 3);
  };
  // Updated helper functions to support AI-driven skills

  // Categorize skills intelligently
  const categorizeSkill = (skillName) => {
    const skillLower = skillName.toLowerCase();
    
    if (skillLower.includes('communication') || skillLower.includes('teamwork') || 
        skillLower.includes('leadership') || skillLower.includes('management') ||
        skillLower.includes('presentation') || skillLower.includes('collaboration')) {
      return 'Soft Skills';
    } else if (skillLower.includes('design') || skillLower.includes('ui') || 
               skillLower.includes('ux') || skillLower.includes('visual') ||
               skillLower.includes('prototype') || skillLower.includes('figma')) {
      return 'Design';
    } else if (skillLower.includes('data') || skillLower.includes('analytics') || 
               skillLower.includes('statistics') || skillLower.includes('ml') ||
               skillLower.includes('machine learning') || skillLower.includes('ai')) {
      return 'Data & Analytics';
    } else if (skillLower.includes('cloud') || skillLower.includes('devops') || 
               skillLower.includes('infrastructure') || skillLower.includes('deployment')) {
      return 'Infrastructure';
    } else if (skillLower.includes('security') || skillLower.includes('cyber') || 
               skillLower.includes('privacy') || skillLower.includes('compliance')) {
      return 'Security';
    } else {
      return 'Technical Skills';
    }
  };

  // Generate AI-specific learning path suggestion
  const generateAILearningPath = (skillName, currentLevel, requiredLevel) => {
    const gap = requiredLevel - currentLevel;
    const skillLower = skillName.toLowerCase();
    
    if (gap <= 0) {
      return "Maintain skills through advanced projects and stay updated with latest trends";
    } else if (gap === 1) {
      if (skillLower.includes('programming') || skillLower.includes('coding')) {
        return "Build intermediate projects and contribute to open source";
      } else if (skillLower.includes('design')) {
        return "Create portfolio pieces and get design feedback from professionals";
      } else {
        return "Practice with real-world scenarios and seek mentorship opportunities";
      }
    } else if (gap === 2) {
      if (skillLower.includes('programming') || skillLower.includes('coding')) {
        return "Take structured courses and build multiple projects with increasing complexity";
      } else if (skillLower.includes('data') || skillLower.includes('analytics')) {
        return "Complete data science bootcamp or specialized courses with hands-on projects";
      } else {
        return "Enroll in intermediate courses and practice through guided projects";
      }
    } else {
      if (skillLower.includes('programming') || skillLower.includes('coding')) {
        return "Start with fundamentals course, daily coding practice, and basic projects";
      } else if (skillLower.includes('design')) {
        return "Learn design principles, practice with design tools, and study existing designs";
      } else {
        return "Begin with foundational courses and establish consistent learning routine";
      }
    }
  };

  // NEW: Learning Roadmap extraction
  const extractLearningRoadmapImproved = (text) => {
    if (!text) return [];
    
    console.log('Extracting learning roadmap from text...');
    const roadmap = [];
    const lines = text.split('\n');
    
    let inRoadmapSection = false;
    const roadmapKeywords = ['LEARNING ROADMAP', 'ROADMAP', 'LEARNING PATH', 'STUDY PLAN'];
    
    lines.forEach((line, index) => {
      // Check for roadmap section
      if (roadmapKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inRoadmapSection = true;
        return;
      }
      
      // Exit roadmap section
      if (inRoadmapSection && (line.toUpperCase().includes('NETWORKING') || 
          line.toUpperCase().includes('INTERVIEW') || line.toUpperCase().includes('MARKET TRENDS'))) {
        inRoadmapSection = false;
        return;
      }
      
      if (inRoadmapSection && line.trim() !== '') {
        // Look for phase/month patterns
        const phaseMatch = line.match(/^(Month\s+\d+|Phase\s+\d+|Week\s+\d+)[-:]?\s*(.+)/i);
        if (phaseMatch) {
          roadmap.push({
            phase: phaseMatch[1],
            title: phaseMatch[2].trim(),
            duration: phaseMatch[1],
            description: phaseMatch[2].trim(),
            skills: [],
            resources: []
          });
          console.log('Found roadmap phase:', phaseMatch[1]);
        } else if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const itemText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (itemText.length > 10 && roadmap.length > 0) {
            // Add as skill or resource to the last phase
            if (itemText.toLowerCase().includes('learn') || itemText.toLowerCase().includes('study')) {
              roadmap[roadmap.length - 1].skills.push(itemText);
            } else {
              roadmap[roadmap.length - 1].resources.push(itemText);
            }
          }
        }
      }
    });
    
    // Add default roadmap if none found
    if (roadmap.length === 0) {
      console.log('No learning roadmap found, adding defaults...');
      const defaultRoadmap = [
        {
          phase: 'Phase 1',
          title: 'Foundation Building',
          duration: 'Months 1-2',
          description: 'Build fundamental skills and understanding',
          skills: ['Basic Programming', 'Problem Solving', 'Technical Communication'],
          resources: ['Online courses', 'Practice exercises', 'Community forums']
        },
        {
          phase: 'Phase 2',
          title: 'Skill Development',
          duration: 'Months 3-4',
          description: 'Develop core technical skills for your target role',
          skills: ['Advanced Programming', 'Framework/Library Usage', 'Best Practices'],
          resources: ['Advanced courses', 'Documentation', 'Code reviews']
        },
        {
          phase: 'Phase 3',
          title: 'Project Building',
          duration: 'Months 5-6',
          description: 'Apply skills through hands-on projects',
          skills: ['Project Management', 'Full-Stack Development', 'Testing'],
          resources: ['Project tutorials', 'GitHub', 'Portfolio development']
        },
        {
          phase: 'Phase 4',
          title: 'Job Preparation',
          duration: 'Months 7-8',
          description: 'Prepare for job applications and interviews',
          skills: ['Interview Skills', 'System Design', 'Technical Communication'],
          resources: ['Interview prep', 'Mock interviews', 'Job applications']
        }
      ];
      
      roadmap.push(...defaultRoadmap);
    }
    
    console.log('Total roadmap phases extracted:', roadmap.length);
    return roadmap;
  };

  // UPDATED: Market Trends extraction with ONLY 2 unique cards + salary/industry analysis
  const extractMarketTrendsImproved = (text) => {
    if (!text) return [];
    
    console.log('Extracting market trends from text...');
    const trends = [];
    const lines = text.split('\n');
    
    let inTrendsSection = false;
    const trendsKeywords = ['MARKET TRENDS', 'TRENDS', 'INDUSTRY TRENDS', 'TECHNOLOGY TRENDS'];
    
    lines.forEach((line, index) => {
      // Check for trends section
      if (trendsKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inTrendsSection = true;
        return;
      }
      
      // Exit trends section
      if (inTrendsSection && (line.toUpperCase().includes('JOB MARKET') || 
          line.toUpperCase().includes('NETWORKING') || line.toUpperCase().includes('SKILLS'))) {
        inTrendsSection = false;
        return;
      }
      
      if (inTrendsSection && line.trim() !== '') {
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const trendText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (trendText.length > 15) {
            // Try to extract trend title and description
            let title = trendText;
            let description = trendText;
            
            if (trendText.includes(':')) {
              const parts = trendText.split(':');
              title = parts[0].trim();
              description = parts.slice(1).join(':').trim();
            }
            
            trends.push({
              title: title,
              description: description,
              text: trendText,
              category: 'Technology Trend',
              relevance: 'High'
            });
            console.log('Found market trend:', title);
          }
        }
      }
    });
    
    // Add ONLY 2 unique enhanced default trends + extracted salary/industry data
    if (trends.length === 0) {
      console.log('No market trends found, adding 2 unique defaults + analysis-based content...');
      
      // Extract salary and industry data from the analysis
      const salaryData = extractSalaryTrendsFromAnalysis(text);
      const industryData = extractIndustrySectorFromAnalysis(text);
      
      const uniqueTrends = [
        {
          title: 'SALARY TRENDS',
          description: 'Compensation analysis based on your career path',
          category: 'Compensation Analysis',
          relevance: 'High',
          salaryData: salaryData
        },
        {
          title: 'INDUSTRY SECTOR ANALYSIS',
          description: 'Industry insights tailored to your career transition',
          category: 'Industry Analysis',
          relevance: 'High',
          industryData: industryData
        }
      ];
      
      trends.push(...uniqueTrends);
    }
    
    // Ensure NO duplicates and limit to exactly 2 cards
    const seenTitles = new Set();
    const finalTrends = trends.filter(trend => {
      const normalizedTitle = trend.title.toUpperCase().trim();
      // Skip regional opportunities and emerging technologies to avoid duplicates
      if (normalizedTitle.includes('REGIONAL OPPORTUNITIES') || 
          normalizedTitle.includes('EMERGING TECHNOLOGIES')) {
        console.log('🚫 Skipping duplicate/unwanted trend:', normalizedTitle);
        return false;
      }
      
      if (seenTitles.has(normalizedTitle)) {
        console.log('🚫 Removing duplicate trend:', normalizedTitle);
        return false;
      }
      seenTitles.add(normalizedTitle);
      return true;
    });
    
    console.log('Total UNIQUE market trends extracted:', finalTrends.length);
    return finalTrends.slice(0, 2); // Limit to exactly 2 unique trends
  };

  // Extract salary information from the user's analysis
  const extractSalaryTrendsFromAnalysis = (analysisText) => {
    console.log('🔍 Extracting salary data from analysis...');
    const salaryInfo = {
      ranges: [],
      insights: [],
      growth: ''
    };
    
    const lines = analysisText.split('\n');
    let inSalarySection = false;
    
    // Look for salary-related sections
    const salaryKeywords = ['SALARY', 'COMPENSATION', 'PAY', 'INCOME', 'EARNINGS'];
    
    lines.forEach(line => {
      const lineUpper = line.toUpperCase();
      
      // Check if we're in a salary section
      if (salaryKeywords.some(keyword => lineUpper.includes(keyword))) {
        inSalarySection = true;
      }
      
      // Extract salary ranges (e.g., "$80,000 - $120,000", "$95K-$180K")
      const salaryPattern = /\$[\d,]+(?:K|,000)?\s*[-–]\s*\$[\d,]+(?:K|,000)?/g;
      const salaryMatches = line.match(salaryPattern);
      if (salaryMatches) {
        salaryMatches.forEach(salary => {
          if (!salaryInfo.ranges.includes(salary)) {
            salaryInfo.ranges.push(salary);
          }
        });
      }
      
      // Extract salary insights from the analysis
      if (inSalarySection && line.trim() !== '') {
        if (lineUpper.includes('GROWTH') || lineUpper.includes('INCREASE') || lineUpper.includes('TREND')) {
          salaryInfo.growth = line.trim();
        }
        
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const insight = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (insight.length > 20 && !salaryInfo.insights.includes(insight)) {
            salaryInfo.insights.push(insight);
          }
        }
      }
      
      // Exit salary section
      if (inSalarySection && (lineUpper.includes('NETWORKING') || 
          lineUpper.includes('SKILLS') || lineUpper.includes('ROADMAP'))) {
        inSalarySection = false;
      }
    });
    
    // If no specific salary data found, create based on user's career path
    if (salaryInfo.ranges.length === 0 && careerPaths.length > 0) {
      const topCareer = careerPaths[0].title;
      salaryInfo.ranges = generateCareerSalaryRanges(topCareer);
      salaryInfo.insights.push(`Salary ranges for ${topCareer} positions based on experience level`);
    }
    
    console.log('💰 Extracted salary data:', salaryInfo);
    return salaryInfo;
  };

  // Extract industry sector analysis from the user's analysis
  const extractIndustrySectorFromAnalysis = (analysisText) => {
    console.log('🔍 Extracting industry sector data from analysis...');
    const industryInfo = {
      sectors: [],
      opportunities: [],
      trends: []
    };
    
    const lines = analysisText.split('\n');
    let inIndustrySection = false;
    
    // Look for industry-related sections
    const industryKeywords = ['INDUSTRY', 'SECTOR', 'MARKET', 'BUSINESS', 'COMPANIES'];
    
    lines.forEach(line => {
      const lineUpper = line.toUpperCase();
      
      // Check if we're in an industry section
      if (industryKeywords.some(keyword => lineUpper.includes(keyword + ' ANALYSIS') || 
          lineUpper.includes(keyword + ' TRENDS') || lineUpper.includes(keyword + ' SECTORS'))) {
        inIndustrySection = true;
      }
      
      if (inIndustrySection && line.trim() !== '') {
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const item = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (item.length > 15) {
            if (lineUpper.includes('SECTOR') || lineUpper.includes('INDUSTRY')) {
              industryInfo.sectors.push(item);
            } else if (lineUpper.includes('OPPORTUNITY') || lineUpper.includes('GROWTH')) {
              industryInfo.opportunities.push(item);
            } else {
              industryInfo.trends.push(item);
            }
          }
        }
      }
      
      // Exit industry section
      if (inIndustrySection && (lineUpper.includes('NETWORKING') || 
          lineUpper.includes('SKILLS') || lineUpper.includes('SALARY'))) {
        inIndustrySection = false;
      }
    });
    
    // If no specific industry data found, create based on user's career interests
    if (industryInfo.sectors.length === 0 && userData.careerPathsInterest) {
      industryInfo.sectors = generateIndustryAnalysis(userData.careerPathsInterest);
      industryInfo.opportunities.push('Growing demand for tech professionals across all industries');
      industryInfo.trends.push('Digital transformation driving technology adoption');
    }
    
    console.log('🏭 Extracted industry data:', industryInfo);
    return industryInfo;
  };

  // Generate salary ranges based on career path
  const generateCareerSalaryRanges = (careerTitle) => {
    const salaryMap = {
      'Software Developer': ['$95,000 - $180,000', '$65,000 - $120,000 (Entry)', '$140,000 - $220,000 (Senior)'],
      'Data Scientist': ['$100,000 - $200,000', '$70,000 - $130,000 (Entry)', '$150,000 - $250,000 (Senior)'],
      'Machine Learning Engineer': ['$120,000 - $220,000', '$85,000 - $150,000 (Entry)', '$170,000 - $280,000 (Senior)'],
      'UX/UI Designer': ['$85,000 - $160,000', '$55,000 - $100,000 (Entry)', '$120,000 - $200,000 (Senior)'],
      'Product Manager': ['$110,000 - $190,000', '$75,000 - $130,000 (Entry)', '$150,000 - $250,000 (Senior)'],
      'DevOps Engineer': ['$100,000 - $185,000', '$70,000 - $125,000 (Entry)', '$140,000 - $230,000 (Senior)'],
      'Cybersecurity Analyst': ['$90,000 - $175,000', '$60,000 - $110,000 (Entry)', '$130,000 - $210,000 (Senior)']
    };
    
    return salaryMap[careerTitle] || ['$80,000 - $150,000', '$55,000 - $95,000 (Entry)', '$120,000 - $200,000 (Senior)'];
  };

  // Generate industry analysis based on user interests
  const generateIndustryAnalysis = (careerInterests) => {
    const sectors = [];
    
    careerInterests.forEach(interest => {
      if (interest.toLowerCase().includes('software') || interest.toLowerCase().includes('development')) {
        sectors.push('Technology companies (Google, Microsoft, Meta) - High demand for software engineers');
        sectors.push('Financial services - Digital banking and fintech growth');
      } else if (interest.toLowerCase().includes('data')) {
        sectors.push('Healthcare - Data-driven medical research and patient analytics');
        sectors.push('E-commerce - Customer behavior analysis and recommendations');
      } else if (interest.toLowerCase().includes('design')) {
        sectors.push('Consumer products - User experience design for apps and websites');
        sectors.push('Digital agencies - Creative and user interface design services');
      }
    });
    
    if (sectors.length === 0) {
      sectors.push('Technology sector - Consistent growth and innovation opportunities');
      sectors.push('Healthcare technology - Emerging field with significant potential');
    }
    
    return sectors.slice(0, 4);
  };

  // NEW: Job Market Outlook extraction
  const extractJobMarketOutlookImproved = (text) => {
    if (!text) return [];
    
    console.log('Extracting job market outlook from text...');
    const outlook = [];
    const lines = text.split('\n');
    
    let inOutlookSection = false;
    const outlookKeywords = ['JOB MARKET OUTLOOK', 'MARKET OUTLOOK', 'EMPLOYMENT OUTLOOK', 'JOB PROSPECTS'];
    
    lines.forEach((line, index) => {
      // Check for outlook section
      if (outlookKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inOutlookSection = true;
        return;
      }
      
      // Exit outlook section
      if (inOutlookSection && (line.toUpperCase().includes('NETWORKING') || 
          line.toUpperCase().includes('SKILLS') || line.toUpperCase().includes('PERSONAL BRANDING'))) {
        inOutlookSection = false;
        return;
      }
      
      if (inOutlookSection && line.trim() !== '') {
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const outlookText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (outlookText.length > 15) {
            // Try to extract outlook title and description
            let title = outlookText;
            let description = outlookText;
            
            if (outlookText.includes(':')) {
              const parts = outlookText.split(':');
              title = parts[0].trim();
              description = parts.slice(1).join(':').trim();
            }
            
            outlook.push({
              title: title,
              description: description,
              text: outlookText,
              category: 'Job Market',
              growth: 'Positive',
              opportunities: [description]
            });
            console.log('Found job market outlook:', title);
          }
        }
      }
    });
    
    // Add default outlook if none found
    if (outlook.length === 0) {
      console.log('No job market outlook found, adding defaults...');
      const defaultOutlook = [
        {
          title: 'Strong Demand for Tech Professionals',
          description: 'The technology sector continues to show robust growth with high demand for skilled professionals across all levels.',
          category: 'Overall Market',
          growth: 'Strong',
          statistics: 'Tech employment expected to grow 13% over the next decade, faster than average for all occupations.',
          opportunities: ['Entry-level positions available', 'Career advancement opportunities', 'Competitive salaries']
        },
        {
          title: 'Skills-Based Hiring Increase',
          description: 'Employers are increasingly focusing on practical skills and portfolio work over traditional degree requirements.',
          category: 'Hiring Trends',
          growth: 'High',
          statistics: '65% of employers now prioritize skills over degrees for tech roles.',
          opportunities: ['Career changers welcome', 'Portfolio-based applications', 'Skills assessment over credentials']
        },
        {
          title: 'Salary Growth Trends',
          description: 'Technology roles continue to offer competitive compensation packages with strong growth potential.',
          category: 'Compensation',
          growth: 'Positive',
          statistics: 'Average tech salaries increased 8.2% year-over-year, outpacing general market growth.',
          opportunities: ['High starting salaries', 'Regular salary increases', 'Equity and benefits packages']
        },
        {
          title: 'Geographic Flexibility',
          description: 'Remote work has expanded job opportunities beyond traditional tech hubs to global markets.',
          category: 'Work Environment',
          growth: 'High',
          statistics: '78% of tech companies now offer fully remote or hybrid work options.',
          opportunities: ['Global job market access', 'Work-life balance improvement', 'Reduced relocation requirements']
        }
      ];
      
      outlook.push(...defaultOutlook);
    }
    
    console.log('Total job market outlook items extracted:', outlook.length);
    return outlook;
  };

  // Improved Networking Strategy extraction
  const extractNetworkingStrategyImproved = (text) => {
    if (!text) return [];
    
    console.log('Extracting networking strategies...');
    const strategies = [];
    const lines = text.split('\n');
    
    let inNetworkingSection = false;
    const networkingKeywords = ['NETWORKING', 'NETWORK', 'CONNECTIONS', 'COMMUNITY'];
    
    lines.forEach((line, index) => {
      // Check for networking section
      if (networkingKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inNetworkingSection = true;
        strategies.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      // Exit networking section
      if (inNetworkingSection && (line.toUpperCase().includes('PERSONAL BRANDING') || 
          line.toUpperCase().includes('INTERVIEW') || line.toUpperCase().includes('PORTFOLIO'))) {
        inNetworkingSection = false;
        return;
      }
      
      if (inNetworkingSection && line.trim() !== '') {
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const strategyText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (strategyText.length > 10) { // Only add substantial strategies
            strategies.push({
              text: strategyText,
              type: 'strategy'
            });
            console.log('Found networking strategy:', strategyText.substring(0, 50) + '...');
          }
        }
      }
    });
    
    // Add default networking strategies if none found
    if (strategies.filter(s => s.type === 'strategy').length === 0) {
      console.log('No networking strategies found, adding defaults...');
      const defaultStrategies = [
        'Join professional associations and industry groups relevant to your target career',
        'Attend virtual and in-person meetups, conferences, and workshops',
        'Connect with professionals on LinkedIn and engage with their content',
        'Participate in online communities and forums related to your field',
        'Reach out to alumni from your school who work in tech',
        'Seek informational interviews with professionals in your target roles'
      ];
      
      defaultStrategies.forEach(strategy => {
        strategies.push({
          text: strategy,
          type: 'strategy'
        });
      });
    }
    
    console.log('Total networking strategies:', strategies.filter(s => s.type === 'strategy').length);
    return strategies;
  };

  // Improved Personal Branding extraction
  const extractPersonalBrandingImproved = (text) => {
    if (!text) return [];
    
    const brandingTips = [];
    const lines = text.split('\n');
    let inBrandingSection = false;
    const brandingKeywords = ['PERSONAL BRANDING', 'BRANDING', 'BRAND', 'ONLINE PRESENCE'];
    
    lines.forEach((line) => {
      if (brandingKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inBrandingSection = true;
        brandingTips.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inBrandingSection && (line.toUpperCase().includes('NETWORKING') || 
          line.toUpperCase().includes('INTERVIEW') || line.toUpperCase().includes('PORTFOLIO'))) {
        inBrandingSection = false;
        return;
      }
      
      if (inBrandingSection && line.trim() !== '') {
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const tipText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (tipText.length > 10) {
            brandingTips.push({
              text: tipText,
              type: 'tip'
            });
          }
        }
      }
    });
    
    // Add defaults if none found
    if (brandingTips.filter(t => t.type === 'tip').length === 0) {
      const defaultTips = [
        'Create a professional LinkedIn profile highlighting your transition journey',
        'Start a blog or social media presence sharing your learning experience',
        'Develop a consistent personal brand across all platforms',
        'Showcase your projects and learning progress online',
        'Engage with industry content and thought leaders'
      ];
      
      defaultTips.forEach(tip => {
        brandingTips.push({
          text: tip,
          type: 'tip'
        });
      });
    }
    
    return brandingTips;
  };

  // Improved Interview Prep extraction
  const extractInterviewPrepImproved = (text) => {
    if (!text) return [];
    
    const interviewTips = [];
    const lines = text.split('\n');
    let inInterviewSection = false;
    const interviewKeywords = ['INTERVIEW', 'PREPARATION', 'PREP'];
    
    lines.forEach((line) => {
      if (interviewKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inInterviewSection = true;
        interviewTips.push({
          title: line.trim(),
          type: 'section_title'
        });
        return;
      }
      
      if (inInterviewSection && (line.toUpperCase().includes('NETWORKING') || 
          line.toUpperCase().includes('PERSONAL BRANDING') || line.toUpperCase().includes('PORTFOLIO'))) {
        inInterviewSection = false;
        return;
      }
      
      if (inInterviewSection && line.trim() !== '') {
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const tipText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (tipText.length > 10) {
            interviewTips.push({
              text: tipText,
              type: 'tip'
            });
          }
        }
      }
    });
    
    // Add defaults if none found
    if (interviewTips.filter(t => t.type === 'tip').length === 0) {
      const defaultTips = [
        'Practice coding challenges and technical questions relevant to your target role',
        'Prepare STAR method examples from your previous experience',
        'Research common interview questions for your target career path',
        'Practice explaining technical concepts in simple terms',
        'Prepare questions to ask about the company and role'
      ];
      
      defaultTips.forEach(tip => {
        interviewTips.push({
          text: tip,
          type: 'tip'
        });
      });
    }
    
    return interviewTips;
  };

  // UPDATED: Clean extraction functions for Resources tab - no unwanted content

  // Improved extraction functions for Resources tab - filtered content
  const extractPortfolioGuidanceImproved = (text) => {
    console.log('Extracting portfolio/transition strategy guidance...');
    const items = [];
    const lines = text.split('\n');
    let inSection = false;
    
    const portfolioKeywords = ['PORTFOLIO', 'PROJECTS', 'TRANSITION STRATEGY', 'CAREER TRANSITION'];
    
    lines.forEach((line) => {
      if (portfolioKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inSection = true;
        return;
      }
      
      // Exit section when hitting other major sections
      if (inSection && (
        line.toUpperCase().includes('NETWORKING') || 
        line.toUpperCase().includes('INTERVIEW') || 
        line.toUpperCase().includes('PERSONAL BRANDING') ||
        line.toUpperCase().includes('MARKET TRENDS') ||
        line.toUpperCase().includes('JOB MARKET OUTLOOK') ||
        line.toUpperCase().includes('LEARNING ROADMAP')
      )) {
        inSection = false;
        return;
      }
      
      if (inSection && line.trim() !== '') {
        // Filter out unwanted section headers
        const lineUpper = line.toUpperCase();
        if (lineUpper.includes('TRANSITION STRATEGY') || 
            lineUpper.includes('MARKET TRENDS ANALYSIS') || 
            lineUpper.includes('JOB MARKET OUTLOOK')) {
          return;
        }
        
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const itemText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (itemText.length > 15) {
            items.push({
              text: itemText,
              type: 'tip',
              category: 'Transition Strategy'
            });
          }
        }
      }
    });
    
    // Add default transition strategy tips if none found
    if (items.filter(i => i.type === 'tip').length === 0) {
      const defaultTips = [
        'Identify transferable skills from your current role to tech positions',
        'Build a portfolio showcasing projects relevant to your target career path',
        'Network with professionals in your desired field through LinkedIn and industry events',
        'Consider taking online courses or bootcamps to gain credibility in your new field',
        'Start applying your new skills to solve problems in your current role'
      ];
      
      defaultTips.forEach(tip => {
        items.push({
          text: tip,
          type: 'tip',
          category: 'Transition Strategy'
        });
      });
    }
    
    console.log('Portfolio/transition guidance items found:', items.filter(i => i.type === 'tip').length);
    return items;
  };

  const extractJobSearchStrategiesImproved = (text) => {
    console.log('Extracting job search strategies...');
    const items = [];
    const lines = text.split('\n');
    let inJobSearchSection = false;
    
    const jobSearchKeywords = ['JOB SEARCH', 'JOB HUNTING', 'APPLICATIONS', 'JOB APPLICATION', 'FINDING JOBS', 'CAREER SEARCH'];
    
    lines.forEach((line, index) => {
      const lineUpper = line.toUpperCase();
      
      // Check if we're entering a job search section
      if (jobSearchKeywords.some(keyword => lineUpper.includes(keyword))) {
        inJobSearchSection = true;
        console.log('📍 Found job search section at line:', index, ':', line.trim());
        return;
      }
      
      // Exit job search section when hitting other major sections
      if (inJobSearchSection && (
        lineUpper.includes('SKILLS') || 
        lineUpper.includes('NETWORKING') || 
        lineUpper.includes('INTERVIEW') || 
        lineUpper.includes('PERSONAL BRANDING') ||
        lineUpper.includes('LEARNING ROADMAP') ||
        lineUpper.includes('PORTFOLIO') ||
        lineUpper.includes('MARKET TRENDS') ||
        lineUpper.includes('SALARY') ||
        lineUpper.includes('STRENGTHS') ||
        lineUpper.includes('COMPETENCIES') ||
        lineUpper.includes('SKILL GAP') ||
        lineUpper.includes('TECHNICAL SKILLS')
      )) {
        inJobSearchSection = false;
        console.log('📍 Exiting job search section at line:', index);
        return;
      }
      
      if (inJobSearchSection && line.trim() !== '') {
        // Filter out any skill-related content that might have slipped in
        if (lineUpper.includes('SKILL') || 
            lineUpper.includes('LEARN') || 
            lineUpper.includes('STUDY') ||
            lineUpper.includes('MASTER') ||
            lineUpper.includes('PROGRAMMING') ||
            lineUpper.includes('CODING') ||
            lineUpper.includes('TECHNICAL') ||
            lineUpper.includes('TRANSITION STRATEGY') ||
            lineUpper.includes('COMPETENCY') ||
            lineUpper.includes('PROFICIENCY')) {
          console.log('🚫 Filtering out skill-related content:', line.trim());
          return;
        }
        
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const itemText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          
          // Only include if it's clearly job search related
          if (itemText.length > 15 && isJobSearchContent(itemText)) {
            items.push({
              text: itemText,
              type: 'tip',
              category: 'Job Search'
            });
            console.log('✅ Added job search strategy:', itemText.substring(0, 50) + '...');
          }
        }
      }
    });
    
    // If no valid job search strategies found, use clean defaults
    if (items.filter(i => i.type === 'tip').length === 0) {
      console.log('No job search strategies found in analysis, using defaults...');
      const defaultJobSearchTips = [
        'Optimize your LinkedIn profile with relevant keywords and showcase your transition journey',
        'Tailor your resume for each application, highlighting transferable skills and relevant projects',
        'Use multiple job boards including LinkedIn Jobs, Indeed, AngelList, and company career pages',
        'Network with professionals in your target industry through informational interviews',
        'Follow up on applications with personalized messages to hiring managers within one week',
        'Practice common interview questions and prepare STAR method examples from your experience',
        'Apply to 5-10 targeted positions per week rather than mass applying to hundreds',
        'Research company culture and values before interviews to show genuine interest'
      ];
      
      defaultJobSearchTips.forEach(tip => {
        items.push({
          text: tip,
          type: 'tip',
          category: 'Job Search'
        });
      });
    }
    
    console.log('Total job search strategies found:', items.filter(i => i.type === 'tip').length);
    return items;
  };

  // Helper function to validate if content is actually job search related
  const isJobSearchContent = (text) => {
    const textLower = text.toLowerCase();
    
    // Must contain job search related terms
    const jobSearchTerms = [
      'resume', 'cv', 'application', 'apply', 'interview', 'job', 'position', 
      'linkedin', 'network', 'hiring', 'recruiter', 'cover letter', 'follow up',
      'job board', 'career', 'company', 'employer', 'candidate'
    ];
    
    // Should NOT contain skill/learning related terms
    const skillTerms = [
      'learn', 'study', 'master', 'skill', 'programming', 'coding', 'technical',
      'course', 'tutorial', 'practice', 'develop', 'build', 'proficiency'
    ];
    
    const hasJobSearchTerms = jobSearchTerms.some(term => textLower.includes(term));
    const hasSkillTerms = skillTerms.some(term => textLower.includes(term));
    
    // Only accept if it has job search terms and doesn't have skill terms
    return hasJobSearchTerms && !hasSkillTerms;
  };

  const extractCareerGrowthResourcesImproved = (text) => {
    console.log('Extracting strengths analysis...');
    const items = [];
    const lines = text.split('\n');
    let inSection = false;
    
    const strengthsKeywords = ['CAREER GROWTH', 'RESOURCES', 'STRENGTHS', 'STRENGTHS ANALYSIS'];
    
    lines.forEach((line) => {
      if (strengthsKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inSection = true;
        return;
      }
      
      // Exit section when hitting other major sections
      if (inSection && (
        line.toUpperCase().includes('NETWORKING') || 
        line.toUpperCase().includes('INTERVIEW') || 
        line.toUpperCase().includes('PERSONAL BRANDING') ||
        line.toUpperCase().includes('JOB SEARCH')
      )) {
        inSection = false;
        return;
      }
      
      if (inSection && line.trim() !== '') {
        // Filter out strengths analysis section headers
        const lineUpper = line.toUpperCase();
        if (lineUpper.includes('STRENGTHS ANALYSIS:') || 
            lineUpper === 'STRENGTHS ANALYSIS') {
          return;
        }
        
        if (line.trim().match(/^[-•*]\s+/) || line.trim().match(/^\d+\.\s+/)) {
          const itemText = line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
          if (itemText.length > 15) {
            items.push({
              text: itemText,
              type: 'tip',
              category: 'Strengths'
            });
          }
        }
      }
    });
    
    // Add default strengths analysis if none found
    if (items.filter(i => i.type === 'tip').length === 0) {
      const userStrengths = generateUserStrengthsAnalysis();
      userStrengths.forEach(strength => {
        items.push({
          text: strength,
          type: 'tip',
          category: 'Strengths'
        });
      });
    }
    
    console.log('Strengths analysis items found:', items.filter(i => i.type === 'tip').length);
    return items;
  };

  // Generate personalized strengths analysis based on user data
  const generateUserStrengthsAnalysis = () => {
    const strengths = [];
    
    // Analyze experience level
    if (userData.experienceLevel === 'Advanced' || userData.experienceLevel === 'Intermediate') {
      strengths.push(`Your ${userData.experienceLevel.toLowerCase()} experience level gives you a solid foundation for career transition`);
    }
    
    // Analyze study field
    if (userData.studyField && userData.studyField !== 'Not specified') {
      if (userData.studyField.toLowerCase().includes('engineering') || 
          userData.studyField.toLowerCase().includes('computer') ||
          userData.studyField.toLowerCase().includes('science')) {
        strengths.push(`Your ${userData.studyField} background provides strong analytical and problem-solving skills`);
      } else {
        strengths.push(`Your ${userData.studyField} background brings unique perspective to technology roles`);
      }
    }
    
    // Analyze tools and technologies
    if (userData.toolsUsed && userData.toolsUsed.length > 0 && !userData.toolsUsed.includes('None')) {
      const tools = userData.toolsUsed.slice(0, 3).join(', ');
      strengths.push(`Experience with ${tools} demonstrates your technical aptitude and learning ability`);
    }
    
    // Analyze transferable skills
    if (userData.transferableSkills && userData.transferableSkills !== 'Not specified') {
      strengths.push(`Your transferable skills in ${userData.transferableSkills} will be valuable in tech roles`);
    }
    
    // Analyze career interests alignment
    if (userData.careerPathsInterest && userData.careerPathsInterest.length > 0) {
      strengths.push(`Clear interest in ${userData.careerPathsInterest[0]} shows focused career direction and motivation`);
    }
    
    // Default strengths if none identified
    if (strengths.length === 0) {
      strengths.push(
        'Motivation to transition into tech demonstrates adaptability and growth mindset',
        'Willingness to learn new skills shows commitment to professional development',
        'Taking career assessment indicates proactive approach to career planning'
      );
    }
    
    return strengths.slice(0, 5);
  };

  const extractCareerPathVisualizationsImproved = (text) => {
    // This one is more complex, keeping original logic but with better error handling
    return [];
  };

  // Generate PERSONALIZED next steps based on user data and analysis
  const generateNextSteps = () => {
    const steps = [];
    console.log('Generating personalized next steps for user:', userData.name);
    
    // PRIORITY 1: Based on user's experience level and timeline
    if (userData.experienceLevel === 'Complete beginner' || userData.experienceLevel === 'Some exposure') {
      const timelineText = userData.transitionTimeline === 'Less than 6 months' ? 'Start immediately with' : 'Begin with';
      steps.push({
        title: `${timelineText} Foundation Skills`,
        text: `Focus on ${userData.careerPathsInterest?.[0] || 'programming'} fundamentals. Given your ${userData.experienceLevel.toLowerCase()} level, start with basic concepts and practice daily.`,
        priority: 'high',
        icon: '🎯',
        timeline: userData.transitionTimeline || '2-4 weeks',
        personalized: true,
        resources: ['FreeCodeCamp', 'Codecademy basics', 'YouTube tutorials']
      });
    }
    
    // PRIORITY 2: Based on user's top career interest and current background
    if (userData.careerPathsInterest && userData.careerPathsInterest.length > 0) {
      const topInterest = userData.careerPathsInterest[0];
      const currentField = userData.studyField || userData.currentRole || 'your current field';
      
      steps.push({
        title: `Transition from ${currentField} to ${topInterest}`,
        text: `Leverage your ${userData.transferableSkills || 'existing experience'} while building ${topInterest.toLowerCase()} specific skills. Focus on projects that bridge both areas.`,
        priority: 'high',
        icon: '🚀',
        timeline: `${userData.timeCommitment} weekly`,
        personalized: true,
        resources: ['Industry transition guides', 'Relevant bootcamps', 'Mentorship platforms']
      });
    }
    
    // PRIORITY 3: Based on user's timeline and commitment
    if (userData.transitionTimeline === 'Less than 6 months') {
      steps.push({
        title: 'Accelerated Learning Plan',
        text: `With your ${userData.timeCommitment} weekly commitment and 6-month timeline, focus on high-impact skills and immediate portfolio building.`,
        priority: 'high',
        icon: '⚡',
        timeline: 'Daily practice needed',
        personalized: true,
        resources: ['Intensive bootcamps', 'Daily coding challenges', 'Fast-track courses']
      });
    } else if (userData.transitionTimeline === '1-2 years' || userData.transitionTimeline === '2+ years') {
      steps.push({
        title: 'Strategic Long-term Development',
        text: `Use your ${userData.transitionTimeline} timeline to build deep expertise. Consider advanced certifications and comprehensive projects.`,
        priority: 'medium',
        icon: '📚',
        timeline: userData.transitionTimeline,
        personalized: true,
        resources: ['University courses', 'Professional certifications', 'Complex project series']
      });
    }
    
    // PRIORITY 4: Based on user's tools experience
    if (userData.toolsUsed && userData.toolsUsed.length > 0 && !userData.toolsUsed.includes('None')) {
      const tools = userData.toolsUsed.slice(0, 2).join(' and ');
      steps.push({
        title: `Advance Your ${tools} Skills`,
        text: `Since you already use ${tools}, build advanced projects showcasing these tools for your ${userData.careerPathsInterest?.[0] || 'target'} career path.`,
        priority: 'medium',
        icon: '🔧',
        timeline: '2-3 weeks',
        personalized: true,
        resources: ['Advanced tool documentation', 'Expert-level tutorials', 'Open source contributions']
      });
    }
    
    // PRIORITY 5: Based on networking needs from analysis
    if (networkingStrategy && networkingStrategy.length > 0) {
      const networkingStrategies = networkingStrategy.filter(item => item.type === 'strategy');
      if (networkingStrategies.length > 0) {
        steps.push({
          title: `Network in ${userData.careerPathsInterest?.[0] || 'Tech'} Community`,
          text: networkingStrategies[0].text,
          priority: 'medium',
          icon: '🤝',
          timeline: 'Ongoing',
          personalized: true,
          resources: ['LinkedIn groups', 'Local meetups', 'Industry conferences']
        });
      }
    }
    
    // PRIORITY 6: Portfolio building based on user's interests
    if (userData.careerPathsInterest && userData.careerPathsInterest.length > 0) {
      const interests = userData.careerPathsInterest.slice(0, 2).join(' and ');
      steps.push({
        title: `Build ${interests} Portfolio`,
        text: `Create 2-3 projects showcasing ${interests.toLowerCase()} skills. Include projects that demonstrate your transition from ${userData.currentRole || 'your background'}.`,
        priority: 'high',
        icon: '💼',
        timeline: `${userData.timeCommitment} over 4-6 weeks`,
        personalized: true,
        resources: ['GitHub portfolio templates', 'Project idea generators', 'Code review services']
      });
    }
    
    // Sort by priority and return top 6
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const sortedSteps = steps.sort((a, b) => {
      if (a.personalized && !b.personalized) return -1;
      if (!a.personalized && b.personalized) return 1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    
    console.log(`Generated ${sortedSteps.length} personalized steps, ${steps.filter(s => s.personalized).length} are user-specific`);
    return sortedSteps.slice(0, 6);
  };

  // Create timeline visualization data
  const createTimelineData = () => {
    const timelineMap = {
      'Less than 6 months': 6,
      '6-12 months': 12,
      '1-2 years': 18,
      '2+ years': 24,
      'Already transitioning': 3
    };
    
    const months = timelineMap[userData.transitionTimeline] || 12;
    const milestones = [];
    
    if (months <= 6) {
      milestones.push(
        { month: 1, label: 'Start Learning', progress: 20, status: 'current' },
        { month: 3, label: 'Complete Basics', progress: 50, status: 'upcoming' },
        { month: 6, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    } else if (months <= 12) {
      milestones.push(
        { month: 2, label: 'Foundation', progress: 20, status: 'current' },
        { month: 4, label: 'Core Skills', progress: 40, status: 'upcoming' },
        { month: 6, label: 'Projects', progress: 60, status: 'upcoming' },
        { month: 9, label: 'Portfolio', progress: 80, status: 'upcoming' },
        { month: 12, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    } else {
      milestones.push(
        { month: 3, label: 'Foundation', progress: 15, status: 'current' },
        { month: 6, label: 'Core Skills', progress: 30, status: 'upcoming' },
        { month: 9, label: 'Specialization', progress: 45, status: 'upcoming' },
        { month: 12, label: 'Projects', progress: 60, status: 'upcoming' },
        { month: 15, label: 'Portfolio', progress: 80, status: 'upcoming' },
        { month: 18, label: 'Job Ready', progress: 100, status: 'upcoming' }
      );
    }
    
    return milestones;
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  const nextSteps = generateNextSteps();
  const timelineMilestones = createTimelineData();

  // Calculate quick stats
  const topMatchPercentage = careerPaths.length > 0 ? Math.max(...careerPaths.map(p => p.match)) : 0;
  const skillsToLearn = skillsGap.filter(skill => skill.gap > 0).length;
  const estimatedMonths = userData.transitionTimeline?.includes('6-12') ? '8' : 
                         userData.transitionTimeline?.includes('Less than 6') ? '4' :
                         userData.transitionTimeline?.includes('1-2') ? '18' : '12';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Your personalized tech career roadmap is ready
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole !== 'Not specified' && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  📍 Currently: {userData.currentRole}
                </div>
              )}
              {careerPaths.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  🎯 Top Match: {careerPaths[0].title}
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  ⏰ Timeline: {userData.transitionTimeline}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'paths', label: 'Career Paths', icon: '🛤️' },
              { id: 'skills', label: 'Skills Gap', icon: '📈' },
              { id: 'roadmap', label: 'Learning Roadmap', icon: '🗺️' },
              { id: 'market', label: 'Market Insights', icon: '📈' },
              { id: 'action', label: 'Action Plan', icon: '🎯' },
              { id: 'resources', label: 'Resources', icon: '📚' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Top Match', value: `${topMatchPercentage}%`, color: 'from-green-500 to-emerald-500', icon: '🎯' },
                { label: 'Skills to Learn', value: skillsToLearn.toString(), color: 'from-blue-500 to-cyan-500', icon: '📚' },
                { label: 'Learning Phases', value: learningRoadmap.length.toString(), color: 'from-purple-500 to-pink-500', icon: '🗺️' },
                { label: 'Action Items', value: nextSteps.length.toString(), color: 'from-orange-500 to-red-500', icon: '✅' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800">{stat.label}</h3>
                </div>
              ))}
            </div>

            {/* Enhanced Progress Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🚀</span>
                Your Journey Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {timelineMilestones.slice(0, 3).map((milestone, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                      milestone.status === 'current' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <h3 className={`font-semibold ${
                      milestone.status === 'current' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {milestone.label}
                    </h3>
                    <p className="text-sm text-gray-600">Month {milestone.month}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Next Steps Preview - Enhanced with personalization indicator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <span className="mr-3">⚡</span>
                  Priority Actions
                </h2>
                <div className="flex items-center text-sm text-blue-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Tailored to your {userData.careerPathsInterest?.[0] || 'tech'} goals
                </div>
              </div>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm text-blue-800">
                  <strong>Personalized for {userData.name}:</strong> Based on your {userData.experienceLevel?.toLowerCase()} experience level, 
                  {userData.transitionTimeline ? ` ${userData.transitionTimeline.toLowerCase()} timeline,` : ''} and interest in {userData.careerPathsInterest?.slice(0, 2).join(' and ') || 'technology'}.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.slice(0, 4).map((step, index) => (
                  <div key={index} className={`${step.personalized ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-gray-50 to-gray-100'} rounded-xl p-6 hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{step.icon}</span>
                        <h3 className="font-semibold text-gray-800">{step.title}</h3>
                      </div>
                      {step.personalized && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{step.text?.substring(0, 120) + (step.text?.length > 120 ? '...' : '')}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">{step.timeline}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        step.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {step.priority?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Personalized Career Paths</h2>
              <p className="text-gray-600 text-lg">Based on your background, interests, and goals</p>
            </div>
            {careerPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {careerPaths.map((path, index) => (
                  <CareerPathCard key={index} path={path} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Analyzing Your Path</h3>
                <p className="text-gray-500">Career recommendations will appear here once analysis is complete.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Skills Development Plan</h2>
              <p className="text-gray-600 text-lg">Focus areas to reach your career goals</p>
            </div>
            {skillsGap.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsGap.map((skill, index) => (
                  <SkillCard key={index} skill={skill} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Skills Analysis in Progress</h3>
                <p className="text-gray-500">Your personalized skill recommendations will appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Learning Roadmap</h2>
              <p className="text-gray-600 text-lg">Step-by-step learning path tailored to your goals</p>
            </div>
            {learningRoadmap.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {learningRoadmap.map((roadmapItem, index) => (
                  <LearningRoadmapCard key={index} roadmapItem={roadmapItem} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Your Roadmap</h3>
                <p className="text-gray-500">Your personalized learning path will be generated based on your assessment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Market Insights</h2>
              <p className="text-gray-600 text-lg">Current trends and job market outlook for your career path</p>
            </div>
            
            {/* Market Trends Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">📈</span>
                Market Trends Analysis
              </h3>
              {marketTrends.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {marketTrends.map((trend, index) => (
                    <MarketTrendsCard key={index} trend={trend} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Analyzing Market Trends</h4>
                  <p className="text-gray-500">Market analysis will appear here.</p>
                </div>
              )}
            </div>

            {/* Job Market Outlook Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">💼</span>
                Job Market Outlook
              </h3>
              {jobMarketOutlook.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobMarketOutlook.map((outlook, index) => (
                    <JobMarketOutlookCard key={index} outlook={outlook} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔮</div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Analyzing Job Market</h4>
                  <p className="text-gray-500">Job market insights will appear here.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'action' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Action Plan</h2>
              <p className="text-gray-600 text-lg">Step-by-step roadmap to success</p>
            </div>
            {nextSteps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.map((step, index) => (
                  <ActionCard key={index} step={step} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Creating Your Action Plan</h3>
                <p className="text-gray-500">Your personalized action plan will be generated based on your assessment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Learning Resources & Tools</h2>
              <p className="text-gray-600 text-lg">Curated resources to accelerate your journey</p>
            </div>
            
            {/* Quick Actions Section */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-sm font-medium">Export</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/test')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-medium">Retake</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/learning')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-sm font-medium">Learning</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/interviews')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="text-sm font-medium">Interviews</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/guide')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Guide</span>
                </button>
                
                <a 
                  href="https://techtalentscity.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium">Projects</span>
                </a>
              </div>
            </div>

            {/* UPDATED: Resource Sections with cleaned content */}
            {portfolioGuidance.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  TRANSITION STRATEGY
                </h3>
                <div className="space-y-4">
                  {portfolioGuidance.filter(item => item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {jobSearchStrategies.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🔍</span>
                  Job Search Strategies
                </h3>
                <div className="space-y-4">
                  {jobSearchStrategies.filter(item => item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4">
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {careerGrowthResources.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">💪</span>
                  STRENGTHS ANALYSIS
                </h3>
                <div className="space-y-4">
                  {careerGrowthResources.filter(item => item.type === 'tip').slice(0, 5).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Debug Analysis Viewer */}
      {analysis && <DebugAnalysisViewer analysis={analysis} />}

      {/* Enhanced Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group z-50"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Enhanced Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">Your Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={submitFeedback} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience on our platform on a scale of 1 to 5, with 5 being excellent and 1 being poor?
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleFeedbackChange({ target: { name: 'rating', value: value.toString() } })}
                        className={`w-14 h-14 rounded-full border-2 transition-all transform hover:scale-110 ${
                          feedbackData.rating === value.toString()
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-500 shadow-lg'
                            : 'border-gray-300 hover:border-red-500 hover:shadow-md'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Share any improvement suggestions you have
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackData.improvements}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none font-medium"
                  >
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
