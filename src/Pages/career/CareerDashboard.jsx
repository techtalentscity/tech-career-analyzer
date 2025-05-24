// CareerDashboard.jsx - GREEN THEMED VERSION
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

// Import the hybrid ML components
import {
  MLEnhancedCareerCard,
  MLInsightsDashboard, 
  HybridRecommendationsDisplay
} from './HybridMLComponents';

// Import the hybrid recommendation engine
import { generateHybridCareerRecommendations } from './HybridMLRecommendations';

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
  
  // ENHANCED: Complete recommendation states combining ML + Authentic approaches
  const [hybridResults, setHybridResults] = useState(null);
  const [mlInsights, setMLInsights] = useState(null);
  const [authenticPaths, setAuthenticPaths] = useState([]);
  const [careerRecommendations, setCareerRecommendations] = useState({ 
    primary: [], 
    inferred: [], 
    adjacent: [],
    mlDiscovered: [],
    authentic: []
  });
  
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

  // Debug useEffect to track changes
  useEffect(() => {
    console.log('🔍 Dashboard state changed:', {
      marketTrends: marketTrends.length,
      careerPaths: careerPaths.length,
      hybridResults: !!hybridResults,
      mlInsights: !!mlInsights
    });
  }, [marketTrends, careerPaths, hybridResults, mlInsights]);

  // Animation effect for counters
  useEffect(() => {
    if (careerPaths.length > 0) {
      const timer = setTimeout(() => {
        careerPaths.forEach((path, index) => {
          const targetValue = path.hybridScore || path.match;
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

  // MAIN DATA LOADING EFFECT - Enhanced with complete feature integration
  useEffect(() => {
    const loadData = async () => {
      try {
        let processedUserData = null;
        let hybridResults = null;
        
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            
            processedUserData = {
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
            };
            
            setUserData(processedUserData);
            
            // Generate hybrid career recommendations (ML + Rule-based)
            console.log('🚀 Generating hybrid recommendations...');
            hybridResults = generateHybridCareerRecommendations(processedUserData);
            setCareerPaths(hybridResults.allRecommendations);
            setHybridResults(hybridResults);
            setCareerRecommendations(hybridResults.recommendations);
            setMLInsights(hybridResults.mlInsights);
            
            console.log('✅ Hybrid recommendations generated:', {
              total: hybridResults.allRecommendations.length,
              primary: hybridResults.recommendations.primary.length,
              inferred: hybridResults.recommendations.inferred.length,
              mlDiscovered: hybridResults.recommendations.mlDiscovered.length
            });
          }
          
          // Extract enhanced data from analysis
          const skills = extractSkillsGapImproved(analysisText);
          const roadmap = extractLearningRoadmapImproved(analysisText);
          const networking = extractNetworkingStrategyImproved(analysisText);
          const branding = extractPersonalBrandingImproved(analysisText);
          const interview = extractInterviewPrepImproved(analysisText);
          const portfolio = extractPortfolioGuidanceImproved(analysisText);
          const jobSearch = extractJobSearchStrategiesImproved(analysisText);
          const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
          const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
          
          setSkillsGap(skills);
          setLearningRoadmap(roadmap);
          setNetworkingStrategy(networking);
          setPersonalBranding(branding);
          setInterviewPrep(interview);
          setPortfolioGuidance(portfolio);
          setJobSearchStrategies(jobSearch);
          setCareerGrowthResources(careerGrowth);
          setCareerPathVisualizations(pathVisualizations);
          
        } else {
          // Load from storage
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const analysisText = storedAnalysis.analysis;
            setAnalysis(analysisText);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              processedUserData = {
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
              };
              
              setUserData(processedUserData);
              
              // Generate hybrid recommendations from stored data
              hybridResults = generateHybridCareerRecommendations(processedUserData);
              setCareerPaths(hybridResults.allRecommendations);
              setHybridResults(hybridResults);
              setCareerRecommendations(hybridResults.recommendations);
              setMLInsights(hybridResults.mlInsights);
              
              console.log('✅ Stored hybrid recommendations generated:', hybridResults.allRecommendations.length);
            }
            
            // Extract other data from stored analysis
            const skills = extractSkillsGapImproved(analysisText);
            const roadmap = extractLearningRoadmapImproved(analysisText);
            const networking = extractNetworkingStrategyImproved(analysisText);
            const branding = extractPersonalBrandingImproved(analysisText);
            const interview = extractInterviewPrepImproved(analysisText);
            const portfolio = extractPortfolioGuidanceImproved(analysisText);
            const jobSearch = extractJobSearchStrategiesImproved(analysisText);
            const careerGrowth = extractCareerGrowthResourcesImproved(analysisText);
            const pathVisualizations = extractCareerPathVisualizationsImproved(analysisText);
            
            setSkillsGap(skills);
            setLearningRoadmap(roadmap);
            setNetworkingStrategy(networking);
            setPersonalBranding(branding);
            setInterviewPrep(interview);
            setPortfolioGuidance(portfolio);
            setJobSearchStrategies(jobSearch);
            setCareerGrowthResources(careerGrowth);
            setCareerPathVisualizations(pathVisualizations);
          } else {
            navigate('/career/test', { 
              state: { message: 'Please complete the assessment to view your dashboard' } 
            });
            return;
          }
        }
        
        // Generate personalized market trends and job outlook AFTER hybrid results are available
        if (processedUserData && hybridResults && hybridResults.allRecommendations.length > 0) {
          console.log('📈 Generating personalized market analysis...');
          
          const personalizedTrends = generatePersonalizedMarketTrendsWithPaths(
            hybridResults.allRecommendations, 
            processedUserData
          );
          setMarketTrends(personalizedTrends);
          
          const personalizedOutlook = generatePersonalizedJobMarketOutlook(
            hybridResults.allRecommendations, 
            processedUserData
          );
          setJobMarketOutlook(personalizedOutlook);
          
          console.log('✅ Market analysis generated:', {
            trends: personalizedTrends.length,
            outlook: personalizedOutlook.length
          });
        } else {
          console.log('📊 Using generic market trends - no hybrid results available');
          setMarketTrends(generateGenericMarketTrends());
          setJobMarketOutlook(generateGenericJobMarketOutlook());
        }
        
      } catch (error) {
        console.error('❌ Error loading dashboard data:', error);
        navigate('/career/test', { 
          state: { message: 'Error loading your results. Please try again.' } 
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [location, navigate]);

  // ============================================================================
  // ENHANCED EXTRACTION FUNCTIONS - Comprehensive Analysis Processing
  // ============================================================================

  const extractSkillsGapImproved = (text) => {
    if (!text) return [];
    
    console.log('🔍 Extracting AI-generated skills from analysis...');
    const skills = [];
    const lines = text.split('\n');
    
    // Look for skills sections in AI analysis
    let inSkillsSection = false;
    const skillsSectionKeywords = [
      'SKILLS GAP', 'SKILL GAP', 'SKILLS NEEDED', 'REQUIRED SKILLS', 
      'LEARNING REQUIREMENTS', 'COMPETENCY GAP', 'SKILL DEVELOPMENT',
      'TECHNICAL SKILLS', 'SKILL RECOMMENDATIONS'
    ];
    
    lines.forEach((line, index) => {
      if (skillsSectionKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inSkillsSection = true;
        console.log('📍 Found skills section:', line.trim());
        return;
      }
      
      if (inSkillsSection && (
        line.toUpperCase().includes('NETWORKING') || 
        line.toUpperCase().includes('INTERVIEW') || 
        line.toUpperCase().includes('MARKET TRENDS') ||
        line.toUpperCase().includes('JOB SEARCH') ||
        line.toUpperCase().includes('PERSONAL BRANDING')
      )) {
        inSkillsSection = false;
        return;
      }
      
      if (inSkillsSection && line.trim() !== '') {
        const skill = parseSkillFromLine(line, text);
        if (skill) {
          skills.push(skill);
          console.log('✅ Extracted skill:', skill.name);
        }
      }
    });
    
    // Generate skills based on top career recommendation if needed
    if (skills.length < 4 && careerPaths.length > 0) {
      console.log('🎯 Generating skills for top career:', careerPaths[0].title);
      const topCareerSkills = generateAICareerSkills(careerPaths[0].title, userData);
      topCareerSkills.forEach(skill => {
        if (!skills.some(s => s.name.toLowerCase().includes(skill.name.toLowerCase()))) {
          skills.push(skill);
        }
      });
    }
    
    console.log(`📊 Total skills extracted: ${skills.length}`);
    return skills.slice(0, 8);
  };

  const parseSkillFromLine = (line, fullText) => {
    const cleanLine = line.replace(/^[-•*\d+\.\)\s]+/, '').trim();
    if (cleanLine.length < 5) return null;
    
    const skillFormats = [
      /^([^:]+):\s*(.+)$/,
      /^([^(]+)\s*\([^)]*\):\s*(.+)$/,
      /^([^-]+)\s*-\s*(.+)$/,
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
    
    if (isValidAISkill(cleanLine)) {
      return createAISkillObject(cleanLine, `Key skill identified from your analysis`, fullText);
    }
    
    return null;
  };

  const isValidAISkill = (skillName) => {
    if (!skillName || skillName.length < 3 || skillName.length > 50) return false;
    
    const invalidTerms = [
      'section', 'analysis', 'summary', 'overview', 'recommendation', 'conclusion',
      'career', 'path', 'job', 'role', 'position', 'experience', 'background',
      'industry', 'field', 'area', 'domain', 'market', 'trend', 'opportunity'
    ];
    
    const lowerName = skillName.toLowerCase();
    if (invalidTerms.some(term => lowerName === term || lowerName.startsWith(term + ' '))) {
      return false;
    }
    
    return /^[A-Za-z][A-Za-z\s\/\(\)\-\.\+\#]*$/.test(skillName) && 
           skillName.split(' ').length <= 4;
  };

  const createAISkillObject = (skillName, description, analysisText) => {
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

  const assessCurrentSkillLevel = (skillName, userData) => {
    let level = 0;
    const skillLower = skillName.toLowerCase();
    
    const expLevelMap = {
      'Complete beginner': 0,
      'Some exposure': 1,
      'Beginner': 1,
      'Intermediate': 2,
      'Advanced': 3
    };
    level = expLevelMap[userData.experienceLevel] || 1;
    
    if (userData.toolsUsed && userData.toolsUsed.length > 0) {
      const hasRelatedTool = userData.toolsUsed.some(tool => 
        skillLower.includes(tool.toLowerCase()) || 
        tool.toLowerCase().includes(skillLower) ||
        areRelatedTechnologies(skillName, tool)
      );
      if (hasRelatedTool) level = Math.min(level + 1, 4);
    }
    
    if (userData.studyField) {
      const fieldLower = userData.studyField.toLowerCase();
      if ((fieldLower.includes('computer') || fieldLower.includes('engineering')) && 
          (skillLower.includes('programming') || skillLower.includes('software'))) {
        level = Math.min(level + 1, 4);
      }
    }
    
    return Math.max(0, Math.min(level, 4));
  };

  const assessRequiredSkillLevel = (skillName, analysisText, careerTitle) => {
    const skillLower = skillName.toLowerCase();
    let requiredLevel = 3;
    
    const skillContext = extractSkillContext(skillName, analysisText);
    if (skillContext) {
      if (skillContext.includes('essential') || skillContext.includes('critical')) {
        requiredLevel = 4;
      } else if (skillContext.includes('advanced') || skillContext.includes('expert')) {
        requiredLevel = 5;
      } else if (skillContext.includes('basic') || skillContext.includes('fundamental')) {
        requiredLevel = 2;
      }
    }
    
    if (careerTitle) {
      const careerLower = careerTitle.toLowerCase();
      if (careerLower.includes('senior') || careerLower.includes('lead')) {
        requiredLevel = Math.min(requiredLevel + 1, 5);
      }
      
      if (careerLower.includes('data') && skillLower.includes('python')) requiredLevel = 4;
      if (careerLower.includes('frontend') && skillLower.includes('javascript')) requiredLevel = 4;
      if (careerLower.includes('devops') && skillLower.includes('cloud')) requiredLevel = 4;
    }
    
    return Math.max(2, Math.min(requiredLevel, 5));
  };

  const extractSkillContext = (skillName, text) => {
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes(skillName.toLowerCase())) {
        return line.toLowerCase();
      }
    }
    return null;
  };

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
      'UX Designer': [
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
      ]
    };
    
    const skillNames = careerSpecificRequirements[careerTitle] || careerSpecificRequirements['Software Developer'];
    
    return skillNames.map(skillName => {
      const description = `Essential ${skillName.toLowerCase()} skills for ${careerTitle} roles`;
      return createAISkillObject(skillName, description, `Required for ${careerTitle} career path`);
    }).slice(0, 5);
  };

  const categorizeSkill = (skillName) => {
    const skillLower = skillName.toLowerCase();
    
    if (skillLower.includes('communication') || skillLower.includes('leadership')) {
      return 'Soft Skills';
    } else if (skillLower.includes('design') || skillLower.includes('ui') || skillLower.includes('ux')) {
      return 'Design';
    } else if (skillLower.includes('data') || skillLower.includes('analytics') || skillLower.includes('ml')) {
      return 'Data & Analytics';
    } else if (skillLower.includes('cloud') || skillLower.includes('devops')) {
      return 'Infrastructure';
    } else if (skillLower.includes('security') || skillLower.includes('cyber')) {
      return 'Security';
    } else {
      return 'Technical Skills';
    }
  };

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

  // Learning Roadmap extraction
  const extractLearningRoadmapImproved = (text) => {
    if (!text) return [];
    
    console.log('🗺️ Extracting learning roadmap...');
    const roadmap = [];
    const lines = text.split('\n');
    
    let inRoadmapSection = false;
    const roadmapKeywords = ['LEARNING ROADMAP', 'ROADMAP', 'LEARNING PATH', 'STUDY PLAN'];
    
    lines.forEach((line, index) => {
      if (roadmapKeywords.some(keyword => line.toUpperCase().includes(keyword))) {
        inRoadmapSection = true;
        return;
      }
      
      if (inRoadmapSection && (line.toUpperCase().includes('NETWORKING') || 
          line.toUpperCase().includes('INTERVIEW') || line.toUpperCase().includes('MARKET TRENDS'))) {
        inRoadmapSection = false;
        return;
      }
      
      if (inRoadmapSection && line.trim() !== '') {
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
        }
      }
    });
    
    // Add default roadmap if none found
    if (roadmap.length === 0) {
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
    
    console.log(`✅ Roadmap phases extracted: ${roadmap.length}`);
    return roadmap;
  };

  // ENHANCED: Market trends generation with personalization
  const generatePersonalizedMarketTrendsWithPaths = (careerPaths, userData) => {
    console.log('📈 Generating personalized market trends...');
    
    if (!careerPaths || careerPaths.length === 0) {
      return generateGenericMarketTrends();
    }

    const trends = [];
    const topCareer = careerPaths[0];

    // Salary Analysis
    const salaryTrend = {
      title: `${topCareer.title} SALARY OUTLOOK`,
      description: `Compensation trends specifically for ${topCareer.title} roles`,
      category: 'Salary Analysis',
      relevance: 'High',
      personalizedData: generatePersonalizedSalaryData(topCareer.title),
      userCareer: topCareer.title
    };
    trends.push(salaryTrend);

    // Market Demand Analysis
    const demandTrend = {
      title: `${topCareer.title} MARKET DEMAND`,
      description: `Job market demand and growth prospects for ${topCareer.title}`,
      category: 'Industry Demand',
      relevance: 'High',
      personalizedData: generatePersonalizedDemandData(topCareer.title, userData.careerPathsInterest),
      userCareer: topCareer.title
    };
    trends.push(demandTrend);

    console.log(`✅ Generated ${trends.length} personalized market trends`);
    return trends;
  };

  const generatePersonalizedSalaryData = (careerTitle) => {
    const salaryData = {
      ranges: [],
      insights: [],
      growth: '',
      comparison: ''
    };

    const careerSalaryMap = {
      'Software Developer': {
        ranges: ['$95,000 - $180,000 (Average)', '$65,000 - $120,000 (Entry Level)', '$140,000 - $220,000 (Senior Level)'],
        growth: '8.2% year-over-year salary growth, outpacing most industries',
        insights: [
          'High demand for JavaScript, Python, and React developers',
          'Remote work options increase salary potential by 15-25%',
          'Full-stack developers command 20% premium over specialists'
        ],
        comparison: '23% higher than national average for all occupations'
      },
      'Data Scientist': {
        ranges: ['$100,000 - $200,000 (Average)', '$70,000 - $130,000 (Entry Level)', '$150,000 - $250,000 (Senior Level)'],
        growth: '11.5% year-over-year growth, highest among tech roles',
        insights: [
          'Machine learning expertise adds $25K+ to base salary',
          'Healthcare and finance sectors pay 30% premium',
          'PhD holders earn 40% more than bachelors degree holders'
        ],
        comparison: '45% higher than national average for all occupations'
      },
      'UX Designer': {
        ranges: ['$85,000 - $160,000 (Average)', '$55,000 - $100,000 (Entry Level)', '$120,000 - $200,000 (Senior Level)'],
        growth: '6.8% year-over-year growth in design roles',
        insights: [
          'Product design roles pay 25% more than general UX roles',
          'Tech companies offer highest compensation packages',
          'Portfolio quality directly impacts salary negotiations'
        ],
        comparison: '18% higher than national average for all occupations'
      },
      'Product Manager': {
        ranges: ['$110,000 - $190,000 (Average)', '$75,000 - $130,000 (Entry Level)', '$150,000 - $250,000 (Senior Level)'],
        growth: '7.8% year-over-year growth in PM roles',
        insights: [
          'Technical PM roles pay 30% more than general PM',
          'B2B product experience highly valued',
          'Data-driven decision making skills essential'
        ],
        comparison: '35% higher than national average for all occupations'
      }
    };

    return careerSalaryMap[careerTitle] || careerSalaryMap['Software Developer'];
  };

  const generatePersonalizedDemandData = (careerTitle, userInterests) => {
    const demandData = {
      growth: '',
      opportunities: [],
      hotSkills: [],
      industries: [],
      outlook: ''
    };

    const careerDemandMap = {
      'Software Developer': {
        growth: '22% faster than average (vs 4% average for all occupations)',
        opportunities: [
          '1.4 million software developer jobs projected by 2031',
          'Startup ecosystem creating 35K+ new developer roles annually',
          'Remote work expanding global opportunities'
        ],
        hotSkills: ['React/Next.js', 'Python', 'Cloud platforms', 'Microservices', 'API design'],
        industries: ['Fintech', 'Healthcare Technology', 'E-commerce', 'Enterprise Software'],
        outlook: 'Excellent - Strongest job growth in technology sector'
      },
      'Data Scientist': {
        growth: '35% faster than average - fastest growing tech role',
        opportunities: [
          '11.5 million data science jobs expected by 2026',
          'AI/ML adoption driving unprecedented demand',
          'Every industry now requires data expertise'
        ],
        hotSkills: ['Machine Learning', 'Python/R', 'Deep Learning', 'MLOps', 'Statistical Analysis'],
        industries: ['Healthcare', 'Financial Services', 'Retail', 'Manufacturing'],
        outlook: 'Outstanding - Highest demand among all tech roles'
      },
      'UX Designer': {
        growth: '13% faster than average for design roles',
        opportunities: [
          'Digital transformation driving UX hiring surge',
          '450K+ UX roles projected by 2030',
          'Voice UI and AR/VR creating new specializations'
        ],
        hotSkills: ['User Research', 'Prototyping', 'Design Systems', 'Accessibility', 'Data-driven Design'],
        industries: ['SaaS Products', 'E-commerce', 'Healthcare', 'Financial Technology'],
        outlook: 'Very Strong - Essential for digital product success'
      }
    };

    return careerDemandMap[careerTitle] || careerDemandMap['Software Developer'];
  };

  // Job Market Outlook generation
  const generatePersonalizedJobMarketOutlook = (careerPaths, userData) => {
    console.log('💼 Generating job market outlook...');
    
    if (!careerPaths || careerPaths.length === 0) {
      return generateGenericJobMarketOutlook();
    }

    const outlook = [];
    const topCareer = careerPaths[0];

    // Salary Trends Outlook
    const salaryOutlook = {
      title: `${topCareer.title} Salary Trends`,
      description: `Current and projected salary trends for ${topCareer.title} professionals`,
      category: 'Salary Trends',
      growth: 'Strong',
      personalizedData: generatePersonalizedSalaryOutlook(topCareer.title),
      userCareer: topCareer.title
    };
    outlook.push(salaryOutlook);

    // Regional Opportunities
    const regionalOutlook = {
      title: `${topCareer.title} Regional Opportunities`,
      description: `Geographic distribution and opportunities for ${topCareer.title} roles`,
      category: 'Regional Opportunities',
      growth: 'High',
      personalizedData: generatePersonalizedRegionalData(topCareer.title),
      userCareer: topCareer.title
    };
    outlook.push(regionalOutlook);

    console.log(`✅ Generated ${outlook.length} job market outlook items`);
    return outlook;
  };

  const generatePersonalizedSalaryOutlook = (careerTitle) => {
    const salaryOutlookMap = {
      'Software Developer': {
        trends: ['Salaries increased 8.2% year-over-year', 'Remote work premium of 15-25%', 'Full-stack developers earn 20% more'],
        projections: ['Continued growth expected through 2027', 'AI/ML skills commanding highest premiums', 'Entry-level salaries rising due to talent shortage']
      },
      'Data Scientist': {
        trends: ['Highest salary growth in tech at 11.5%', 'PhD holders earn 40% premium', 'Healthcare/Finance sectors pay most'],
        projections: ['MLOps skills becoming essential', 'Domain expertise increasingly valued', 'Senior roles seeing 15%+ annual increases']
      }
    };

    return salaryOutlookMap[careerTitle] || salaryOutlookMap['Software Developer'];
  };

  const generatePersonalizedRegionalData = (careerTitle) => {
    const regionalDataMap = {
      'Software Developer': {
        topRegions: ['San Francisco Bay Area - $180K avg', 'Seattle - $165K avg', 'New York - $155K avg', 'Austin - $135K avg'],
        emerging: ['Denver - 25% growth', 'Nashville - 30% growth', 'Miami - 35% growth'],
        remote: '78% of companies offer remote work'
      },
      'Data Scientist': {
        topRegions: ['San Francisco - $195K avg', 'Boston - $175K avg', 'Seattle - $170K avg', 'Washington DC - $160K avg'],
        emerging: ['Research Triangle - 40% growth', 'Chicago - 28% growth', 'Atlanta - 32% growth'],
        remote: '85% of data science roles support remote work'
      }
    };

    return regionalDataMap[careerTitle] || regionalDataMap['Software Developer'];
  };

  // Generic fallbacks
  const generateGenericMarketTrends = () => {
    return [
      {
        title: 'TECHNOLOGY SALARY TRENDS',
        description: 'General compensation trends in technology sector',
        category: 'Salary Analysis',
        relevance: 'Medium'
      },
      {
        title: 'TECH INDUSTRY OUTLOOK',
        description: 'Overall technology industry growth and opportunities',
        category: 'Industry Analysis',
        relevance: 'Medium'
      }
    ];
  };

  const generateGenericJobMarketOutlook = () => {
    return [
      {
        title: 'Technology Sector Growth',
        description: 'Overall growth trends in the technology industry',
        category: 'Industry Growth',
        growth: 'Strong'
      },
      {
        title: 'Skills-Based Hiring',
        description: 'Shift towards skills-based hiring practices',
        category: 'Hiring Trends',
        growth: 'High'
      }
    ];
  };

  // Placeholder extraction functions for other sections
  const extractNetworkingStrategyImproved = (text) => {
    return [{
      text: 'Join professional associations and industry groups relevant to your target career',
      type: 'strategy'
    }];
  };

  const extractPersonalBrandingImproved = (text) => {
    return [{
      text: 'Create a professional LinkedIn profile highlighting your transition journey',
      type: 'tip'
    }];
  };

  const extractInterviewPrepImproved = (text) => {
    return [{
      text: 'Practice coding challenges and technical questions relevant to your target role',
      type: 'tip'
    }];
  };

  const extractPortfolioGuidanceImproved = (text) => {
    return [{
      text: 'Build a portfolio showcasing projects that bridge your background with target career skills',
      type: 'tip',
      category: 'Transition Strategy'
    }];
  };

  const extractJobSearchStrategiesImproved = (text) => {
    return [{
      text: 'Optimize your LinkedIn profile with relevant keywords and showcase your career transition journey',
      type: 'tip',
      category: 'Job Search'
    }];
  };

  const extractCareerGrowthResourcesImproved = (text) => {
    return [{
      text: 'Analytical Skills: Experience in data analysis from digital marketing is directly transferable to data-focused tech roles',
      type: 'tip',
      category: 'Strengths'
    }];
  };

  const extractCareerPathVisualizationsImproved = (text) => {
    return [];
  };

  // ============================================================================
  // UI COMPONENTS - UPDATED WITH GREEN THEME
  // ============================================================================

  // Enhanced Progress Bar Component
  const EnhancedProgressBar = ({ value, maxValue = 100, className = "from-green-400 to-green-600", showLabel = true }) => (
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

  // Enhanced Skill Card Component
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
              className="from-green-400 to-green-600"
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
                className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full"
                style={{ width: `${(skill.requiredLevel / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {skill.description && (
          <p className="text-sm text-gray-600 mt-3">{skill.description}</p>
        )}
        
        {skill.learningPath && (
          <div className="mt-3 p-2 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 font-medium">Learning suggestion: {skill.learningPath}</p>
          </div>
        )}
      </div>
    );
  };

  // Learning Roadmap Card Component
  const LearningRoadmapCard = ({ roadmapItem, index }) => {
    const phaseColors = [
      'from-green-400 to-green-600',
      'from-lime-400 to-green-500',
      'from-emerald-400 to-green-600',
      'from-teal-400 to-green-500',
      'from-green-500 to-emerald-600'
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
                <span key={skillIndex} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${colorClass} text-white`}>
              Phase {index + 1}
            </span>
            <span className="text-green-600 font-medium text-sm">
              {roadmapItem.estimatedTime || `${2 + index} weeks`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Market Trends Card Component
  const MarketTrendsCard = ({ trend, index }) => {
    const trendIcons = {
      'SALARY OUTLOOK': '💰',
      'MARKET DEMAND': '📈',
      'SALARY TRENDS': '💰',
      'INDUSTRY DEMAND': '📊'
    };
    
    const icon = trendIcons[trend.title.split(' ').slice(-2).join(' ')] || '📊';
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{trend.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">Market Analysis</span>
              {trend.userCareer && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Personalized for {trend.userCareer}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3">{trend.description}</p>
        
        {trend.personalizedData && (
          <div>
            {trend.personalizedData.ranges && (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h5 className="font-medium text-green-800 mb-3">💰 Salary Ranges:</h5>
                <ul className="text-sm text-green-700 space-y-2">
                  {trend.personalizedData.ranges.map((range, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">💵</span>
                      {range}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {trend.personalizedData.hotSkills && (
              <div className="bg-lime-50 p-4 rounded-lg mb-4">
                <h5 className="font-medium text-green-800 mb-2">🔥 Hot Skills:</h5>
                <div className="flex flex-wrap gap-2">
                  {trend.personalizedData.hotSkills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4 border-t mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Relevance to You:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              trend.relevance === 'High' ? 'bg-green-100 text-green-700' :
              trend.relevance === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {trend.relevance || 'High'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Job Market Outlook Card Component
  const JobMarketOutlookCard = ({ outlook, index }) => {
    const outlookIcons = ['💼', '📊', '🎯', '🌐', '💰', '📈'];
    const icon = outlook.icon || outlookIcons[index % outlookIcons.length];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{outlook.title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">{outlook.category || 'Job Market'}</span>
              {outlook.userCareer && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  {outlook.userCareer} Specific
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{outlook.description}</p>
        
        {outlook.personalizedData && (
          <div>
            {outlook.personalizedData.trends && (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h5 className="font-medium text-green-800 mb-3">📈 Current Trends:</h5>
                <ul className="text-sm text-green-700 space-y-2">
                  {outlook.personalizedData.trends.map((trend, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">•</span>
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {outlook.growth && (
          <div className="pt-4 border-t mt-4">
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

  // Action Card Component
  const ActionCard = ({ step, index }) => {
    const priorityColors = {
      high: 'from-red-500 to-pink-500',
      medium: 'from-lime-500 to-green-500',
      low: 'from-gray-500 to-gray-600'
    };

    const icons = ['🎓', '💼', '🎨', '🤝', '📚', '🚀'];
    const icon = step.icon || icons[index % icons.length];

    return (
      <div className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
        step.personalized ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{icon}</span>
            <div>
              <h4 className="font-semibold text-lg text-gray-800">{step.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600">{step.timeline}</p>
                {step.personalized && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
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
                  <span className="text-green-500 mr-2">•</span>
                  {resource}
                </li>
              ))}
            </ul>
          </div>
        )}
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

  // Generate personalized next steps
  const generateNextSteps = () => {
    const steps = [];
    const topCareer = hybridResults?.allRecommendations?.[0] || careerPaths[0];
    
    if (userData.experienceLevel === 'Complete beginner' || userData.experienceLevel === 'Some exposure') {
      const timelineText = userData.transitionTimeline === 'Less than 6 months' ? 'Start immediately with' : 'Begin with';
      steps.push({
        title: `${timelineText} Foundation Skills`,
        text: `Focus on ${topCareer?.title || 'programming'} fundamentals. Given your ${userData.experienceLevel.toLowerCase()} level, start with basic concepts and practice daily.`,
        priority: 'high',
        timeline: userData.transitionTimeline || '2-4 weeks',
        personalized: true,
        resources: ['FreeCodeCamp', 'Codecademy basics', 'YouTube tutorials']
      });
    }
    
    if (topCareer) {
      steps.push({
        title: `Build ${topCareer.title} Skills`,
        text: `Focus on developing skills for ${topCareer.title}. This is your top AI-recommended career with ${topCareer.hybridScore || topCareer.match}% match score.`,
        priority: 'high',
        timeline: userData.timeCommitment || 'Weekly',
        personalized: true,
        resources: ['Specialized courses', 'Industry certifications', 'Practice projects']
      });
    }
    
    return steps.slice(0, 6);
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
    return <LoadingSpinner message="Loading your AI-enhanced career analysis..." />;
  }

  const nextSteps = generateNextSteps();
  const timelineMilestones = createTimelineData();

  // Calculate quick stats using hybrid results
  const topMatchPercentage = hybridResults?.allRecommendations.length > 0 
    ? Math.max(...hybridResults.allRecommendations.map(p => p.hybridScore || p.match)) 
    : (careerPaths.length > 0 ? Math.max(...careerPaths.map(p => p.match)) : 0);
  
  const skillsToLearn = skillsGap.filter(skill => skill.gap > 0).length;
  const totalRecommendations = hybridResults?.allRecommendations.length || careerPaths.length;
  const mlDiscoveries = hybridResults?.recommendations?.mlDiscovered?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50">
      {/* Enhanced Header - Green Theme */}
      <div className="bg-gradient-to-r from-green-600 via-lime-500 to-green-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Your AI-enhanced tech career recommendations based on hybrid intelligence
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole !== 'Not specified' && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Currently: {userData.currentRole}
                </div>
              )}
              {hybridResults?.allRecommendations.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Top Match: {hybridResults.allRecommendations[0].title} ({hybridResults.allRecommendations[0].hybridScore || hybridResults.allRecommendations[0].match}%)
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  Timeline: {userData.transitionTimeline}
                </div>
              )}
              {totalRecommendations > 0 && (
                <div className="bg-green-400 bg-opacity-30 px-4 py-2 rounded-full border border-green-300">
                  {totalRecommendations} Hybrid Recommendations
                </div>
              )}
              {mlDiscoveries > 0 && (
                <div className="bg-lime-400 bg-opacity-30 px-4 py-2 rounded-full border border-lime-300">
                  🤖 {mlDiscoveries} ML Discoveries
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Tabs - Green Theme */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'home', label: '🏠 Home', action: () => navigate('/') },
              { id: 'overview', label: '📊 Overview' },
              { id: 'paths', label: '🤖 AI Career Paths' },
              { id: 'skills', label: '🎯 Skills Gap' },
              { id: 'roadmap', label: '🗺️ Learning Roadmap' },
              { id: 'market', label: '📈 Market Insights'},
              { id: 'action', label: '⚡ Action Plan' },
              { id: 'resources', label: '📚 Resources'}
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => tab.action ? tab.action() : setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium transition-all duration-300 border-b-2 whitespace-nowrap ${
                  tab.id === 'home' 
                    ? 'border-transparent text-gray-600 hover:text-green-600 hover:bg-green-50'
                    : activeTab === tab.id
                    ? 'border-green-600 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-600 hover:text-green-600 hover:bg-gray-50'
                }`}
              >
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
            {/* Enhanced Quick Stats - Green Theme */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Top AI Match', value: `${topMatchPercentage}%`, color: 'from-green-500 to-emerald-500', icon: '🎯' },
                { label: 'Skills to Learn', value: skillsToLearn.toString(), color: 'from-lime-500 to-green-500', icon: '📚' },
                { label: 'Learning Phases', value: learningRoadmap.length.toString(), color: 'from-emerald-500 to-green-600', icon: '🗺️' },
                { label: 'Total Recommendations', value: totalRecommendations.toString(), color: 'from-teal-500 to-green-500', icon: '💼' }
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

            {/* ML Insights Preview - Green Theme */}
            {mlInsights && (
              <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-2">🤖</span>
                  AI Insights Preview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {mlInsights.dominantPattern?.replace('_', ' to ').toUpperCase() || 'Unique'}
                    </div>
                    <div className="text-sm text-green-700">Career Pattern</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lime-600">
                      {mlInsights.topCluster?.replace('_', ' ').toUpperCase() || 'Multi-Skill'}
                    </div>
                    <div className="text-sm text-lime-700">Best Fit Cluster</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {Math.round((mlInsights.patternConfidence || 0.8) * 100)}%
                    </div>
                    <div className="text-sm text-emerald-700">AI Confidence</div>
                  </div>
                </div>
              </div>
            )}

            {/* Data Quality Indicator - Green Theme */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">📊</span>
                Recommendation Quality
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Based on your profile completeness</span>
                  <span>{userData.careerPathsInterest?.length > 0 ? '100%' : '0%'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                    style={{ width: userData.careerPathsInterest?.length > 0 ? '100%' : '0%' }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${userData.careerPathsInterest?.length > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  Career Interests
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${userData.experienceLevel ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  Experience Level
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${userData.studyField !== 'Not specified' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  Education
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${userData.toolsUsed?.length > 0 && !userData.toolsUsed.includes('None') ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  Tools Experience
                </div>
              </div>
            </div>

            {/* Enhanced Progress Overview - Green Theme */}
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

            {/* Top Next Steps Preview - Green Theme */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <span className="mr-3">⚡</span>
                  Priority Actions
                </h2>
                <div className="flex items-center text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Tailored to your {userData.careerPathsInterest?.[0] || 'tech'} goals
                </div>
              </div>
              <div className="mb-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <p className="text-sm text-green-800">
                  <strong>Personalized for {userData.name}:</strong> Based on your {userData.experienceLevel?.toLowerCase()} experience level, 
                  {userData.transitionTimeline ? ` ${userData.transitionTimeline.toLowerCase()} timeline,` : ''} and AI recommendations.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {nextSteps.slice(0, 4).map((step, index) => (
                  <div key={index} className={`${step.personalized ? 'bg-gradient-to-br from-green-50 to-lime-50' : 'bg-gradient-to-br from-gray-50 to-gray-100'} rounded-xl p-6 hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{step.icon}</span>
                        <h3 className="font-semibold text-gray-800">{step.title}</h3>
                      </div>
                      {step.personalized && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Custom
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{step.text?.substring(0, 120) + (step.text?.length > 120 ? '...' : '')}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">{step.timeline}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        step.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
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

        {/* Career Paths Tab - Uses Hybrid ML Component */}
        {activeTab === 'paths' && (
          <div className="space-y-8">
            <HybridRecommendationsDisplay 
              hybridResults={hybridResults} 
              userData={userData}
              animatedValues={animatedValues}
              onLearnMore={(path) => console.log('Learn more about:', path.title)}
            />
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
                <div className="text-6xl mb-4">🎯</div>
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
              <p className="text-gray-600 text-lg">
                {hybridResults?.allRecommendations.length > 0 
                  ? `AI-enhanced market analysis for your top career match: ${hybridResults.allRecommendations[0].title}`
                  : 'Market trends and job outlook for your career path'
                }
              </p>
              {hybridResults?.allRecommendations.length > 0 && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-400 max-w-2xl mx-auto">
                  <p className="text-sm text-green-800">
                    <strong>🎯 AI-Enhanced Analysis:</strong> These insights are specifically generated for your top AI recommendation 
                    based on machine learning analysis of your profile.
                  </p>
                </div>
              )}
            </div>
            
            {/* Market Trends Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">📈</span>
                {hybridResults?.allRecommendations.length > 0 
                  ? `${hybridResults.allRecommendations[0].title} Market Analysis`
                  : 'Market Trends Analysis'
                }
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
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Generating Personalized Market Analysis</h4>
                  <p className="text-gray-500">
                    {hybridResults?.allRecommendations.length > 0 
                      ? `Creating market insights for ${hybridResults.allRecommendations[0].title}...`
                      : 'Complete your career assessment to get personalized market insights.'
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Job Market Outlook Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">💼</span>
                {hybridResults?.allRecommendations.length > 0 
                  ? `${hybridResults.allRecommendations[0].title} Job Market Outlook`
                  : 'Job Market Outlook'
                }
              </h3>
              
              {jobMarketOutlook.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobMarketOutlook.map((outlook, index) => (
                    <JobMarketOutlookCard key={index} outlook={outlook} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">Generating Job Market Analysis</h4>
                  <p className="text-gray-500">
                    {hybridResults?.allRecommendations.length > 0 
                      ? `Creating job market insights for ${hybridResults.allRecommendations[0].title}...`
                      : 'Complete your career assessment to get personalized job market insights.'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'action' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your AI-Powered Action Plan</h2>
              <p className="text-gray-600 text-lg">Step-by-step roadmap to success based on your top AI recommendations</p>
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
            
            {/* Quick Actions Section - Green Theme */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <button 
                  onClick={() => window.print()}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">📄</span>
                  <span className="text-sm font-medium">Export</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/test')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">🔄</span>
                  <span className="text-sm font-medium">Retake</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/learning')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-lime-500 to-green-600 text-white rounded-lg hover:from-lime-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">📚</span>
                  <span className="text-sm font-medium">Learning</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/interviews')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">💬</span>
                  <span className="text-sm font-medium">Interviews</span>
                </button>
                
                <button 
                  onClick={() => navigate('/career/guide')}
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-teal-500 to-green-600 text-white rounded-lg hover:from-teal-600 hover:to-green-700 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">📖</span>
                  <span className="text-sm font-medium">Guide</span>
                </button>
                
                <a 
                  href="https://techtalentscity.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-4 px-4 bg-gradient-to-r from-yellow-500 to-green-500 text-white rounded-lg hover:from-yellow-600 hover:to-green-600 transition-all transform hover:scale-105"
                >
                  <span className="text-2xl mb-2">🚀</span>
                  <span className="text-sm font-medium">Projects</span>
                </a>
              </div>
            </div>

            {/* Resource Sections - Green Theme */}
            {(portfolioGuidance.length > 0 || jobSearchStrategies.length > 0) && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  TRANSITION STRATEGY
                </h3>
                <div className="space-y-4">
                  {[
                    ...portfolioGuidance.filter(item => 
                      item.type === 'tip' && 
                      !item.text.includes('CAREER PATH RECOMMENDATIONS:') &&
                      !item.text.includes('Why: Strong alignment with their Computer Science background')
                    ),
                    ...jobSearchStrategies.filter(item => 
                      item.type === 'tip' && 
                      !item.text.includes('Big Data Technologies:') &&
                      !item.text.includes('Cloud Computing:')
                    )
                  ].slice(0, 8).map((tip, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-lime-50 rounded-lg p-4">
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
                    <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Learning Resources - Green Theme */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="mr-3">📚</span>
                RECOMMENDED LEARNING RESOURCES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Free Resources */}
                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="mr-2">🆓</span>
                    Free Resources
                  </h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• FreeCodeCamp - Complete web development curriculum</li>
                    <li>• Codecademy (Free tier) - Interactive coding lessons</li>
                    <li>• YouTube tutorials - Khan Academy, Traversy Media</li>
                    <li>• GitHub - Version control and portfolio hosting</li>
                    <li>• Stack Overflow - Community Q&A platform</li>
                  </ul>
                </div>

                {/* Paid Resources */}
                <div className="bg-lime-50 rounded-lg p-6 border-l-4 border-lime-400">
                  <h4 className="font-semibold text-lime-800 mb-3 flex items-center">
                    <span className="mr-2">💰</span>
                    Premium Resources
                  </h4>
                  <ul className="space-y-2 text-sm text-lime-700">
                    <li>• Udemy - Comprehensive course library</li>
                    <li>• Pluralsight - Technology skill development</li>
                    <li>• LinkedIn Learning - Professional development</li>
                    <li>• Coursera - University-level courses</li>
                    <li>• Bootcamps - Intensive skill-building programs</li>
                  </ul>
                </div>

                {/* Tools & Platforms */}
                <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-400">
                  <h4 className="font-semibold text-emerald-800 mb-3 flex items-center">
                    <span className="mr-2">🛠️</span>
                    Essential Tools
                  </h4>
                  <ul className="space-y-2 text-sm text-emerald-700">
                    <li>• VS Code - Code editor</li>
                    <li>• Git/GitHub - Version control</li>
                    <li>• Figma - Design and prototyping</li>
                    <li>• Slack/Discord - Community participation</li>
                    <li>• Portfolio platforms - Showcase your work</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Career-Specific Resources - Green Theme */}
            {hybridResults?.allRecommendations.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🎯</span>
                  RESOURCES FOR {hybridResults.allRecommendations[0].title.toUpperCase()}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-lime-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-800 mb-3">📖 Learning Path</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Customized learning sequence for {hybridResults.allRecommendations[0].title} based on your {userData.experienceLevel?.toLowerCase()} level.
                    </p>
                    <div className="space-y-2 text-xs text-green-600">
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Foundation skills (Weeks 1-4)
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Core competencies (Weeks 5-12)
                      </div>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Advanced projects (Weeks 13-20)
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-emerald-800 mb-3">🌐 Communities</h4>
                    <p className="text-sm text-emerald-700 mb-3">
                      Connect with professionals and peers in the {hybridResults.allRecommendations[0].title} community.
                    </p>
                    <div className="space-y-1 text-xs text-emerald-600">
                      <div>• LinkedIn professional groups</div>
                      <div>• Reddit communities (r/programming, r/webdev)</div>
                      <div>• Discord servers for developers</div>
                      <div>• Local meetups and tech events</div>
                      <div>• Professional associations</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Floating Feedback Button - Green Theme */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-500 to-lime-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 group z-50"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Enhanced Feedback Form Modal - Green Theme */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-lime-600 bg-clip-text text-transparent">Your Feedback</h2>
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
                            ? 'bg-gradient-to-r from-green-500 to-lime-600 text-white border-green-500 shadow-lg'
                            : 'border-gray-300 hover:border-green-500 hover:shadow-md'
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
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-gradient-to-r from-green-500 to-lime-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-lime-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none font-medium"
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

      {/* Debug Analysis Viewer (Development Mode) */}
      {process.env.NODE_ENV === 'development' && analysis && (
        <div className="fixed bottom-24 left-8 z-40">
          <button
            onClick={() => {
              const debugWindow = window.open('', '_blank', 'width=800,height=600');
              debugWindow.document.write(`
                <html>
                  <head><title>Debug Analysis</title></head>
                  <body style="font-family: monospace; padding: 20px;">
                    <h2>Raw Analysis Data</h2>
                    <pre style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
                      ${analysis}
                    </pre>
                  </body>
                </html>
              `);
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            🐛 Debug Analysis
          </button>
        </div>
      )}

      {/* Success Indicators - Green Theme */}
      {hybridResults?.allRecommendations.length > 0 && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg text-sm shadow-lg z-40">
          ✅ {hybridResults.allRecommendations.length} recommendations generated
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
