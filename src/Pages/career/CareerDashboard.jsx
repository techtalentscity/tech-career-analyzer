// UPDATED: CareerDashboard.jsx with Authentic Career Path Recommendations
// Key changes: Remove generic fallbacks, use only user data, authentic scoring

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

  // ============================================================================
  // AUTHENTIC CAREER PATH GENERATION SYSTEM
  // ============================================================================

  /**
   * Generate authentic career paths based ONLY on user's actual form data
   */
  const generateAuthenticCareerPaths = (userData) => {
    console.log('🎯 Generating AUTHENTIC career paths for user:', userData.name);
    console.log('📊 User data analysis:', {
      interests: userData.careerPathsInterest,
      techInterests: userData.techInterests,
      experience: userData.experienceLevel,
      studyField: userData.studyField,
      currentRole: userData.currentRole,
      tools: userData.toolsUsed
    });

    // CRITICAL: Validate we have user's career interests
    if (!userData.careerPathsInterest || userData.careerPathsInterest.length === 0) {
      console.error('❌ NO CAREER INTERESTS PROVIDED - Cannot generate authentic recommendations');
      return [];
    }

    const careerPaths = [];
    
    // Process each user's stated career interest
    userData.careerPathsInterest.forEach((userInterest, index) => {
      const careerPath = buildAuthenticCareerPath(userInterest, userData, index);
      if (careerPath) {
        careerPaths.push(careerPath);
        console.log(`✅ Created authentic path: ${careerPath.title} (${careerPath.match}% match)`);
      }
    });

    // Add complementary paths based on user's tools/tech interests
    const complementaryPaths = generateComplementaryPaths(userData, careerPaths);
    careerPaths.push(...complementaryPaths);

    // Sort by authenticity score
    careerPaths.sort((a, b) => b.match - a.match);
    
    console.log(`🎉 Generated ${careerPaths.length} authentic career paths`);
    return careerPaths.slice(0, 6);
  };

  /**
   * Build an authentic career path based on user's specific interest
   */
  const buildAuthenticCareerPath = (userInterest, userData, priority) => {
    console.log(`🔍 Processing user interest: "${userInterest}"`);
    
    const standardizedPath = mapUserInterestToCareerPath(userInterest);
    if (!standardizedPath) {
      console.log(`⚠️ Could not map interest "${userInterest}" to valid career path`);
      return null;
    }

    const matchScore = calculateAuthenticMatchScore(standardizedPath, userData, priority);
    const personalizedInsights = generatePersonalizedInsights(standardizedPath, userData);

    return {
      title: standardizedPath.title,
      match: matchScore,
      userInterest: userInterest,
      insights: personalizedInsights,
      reasoning: generateMatchReasoning(standardizedPath, userData, matchScore),
      authenticated: true,
      category: standardizedPath.category,
      level: standardizedPath.level
    };
  };

  /**
   * Map user's raw interest to standardized career paths
   */
  const mapUserInterestToCareerPath = (userInterest) => {
    const interest = userInterest.toLowerCase().trim();
    
    const careerMappings = {
      // Software Development
      'software developer': { title: 'Software Developer', category: 'development', level: 'mid' },
      'software engineering': { title: 'Software Engineer', category: 'development', level: 'mid' },
      'web developer': { title: 'Web Developer', category: 'development', level: 'entry' },
      'frontend developer': { title: 'Frontend Developer', category: 'development', level: 'mid' },
      'backend developer': { title: 'Backend Developer', category: 'development', level: 'mid' },
      'full stack developer': { title: 'Full Stack Developer', category: 'development', level: 'senior' },
      'mobile developer': { title: 'Mobile App Developer', category: 'development', level: 'mid' },
      
      // Data & Analytics
      'data scientist': { title: 'Data Scientist', category: 'data', level: 'senior' },
      'data analyst': { title: 'Data Analyst', category: 'data', level: 'entry' },
      'data engineer': { title: 'Data Engineer', category: 'data', level: 'mid' },
      'machine learning engineer': { title: 'ML Engineer', category: 'ai', level: 'senior' },
      'ai engineer': { title: 'AI Engineer', category: 'ai', level: 'senior' },
      
      // Design & User Experience
      'ux designer': { title: 'UX Designer', category: 'design', level: 'mid' },
      'ui designer': { title: 'UI Designer', category: 'design', level: 'mid' },
      'product designer': { title: 'Product Designer', category: 'design', level: 'senior' },
      'graphic designer': { title: 'Digital Designer', category: 'design', level: 'entry' },
      
      // Product & Management
      'product manager': { title: 'Product Manager', category: 'management', level: 'senior' },
      'project manager': { title: 'Technical Project Manager', category: 'management', level: 'mid' },
      
      // Infrastructure & Operations
      'devops engineer': { title: 'DevOps Engineer', category: 'infrastructure', level: 'senior' },
      'cloud engineer': { title: 'Cloud Engineer', category: 'infrastructure', level: 'mid' },
      'systems administrator': { title: 'Systems Engineer', category: 'infrastructure', level: 'mid' },
      
      // Security
      'cybersecurity analyst': { title: 'Cybersecurity Analyst', category: 'security', level: 'mid' },
      'security engineer': { title: 'Security Engineer', category: 'security', level: 'senior' }
    };

    // Exact match
    if (careerMappings[interest]) {
      return careerMappings[interest];
    }

    // Partial matches
    for (const [key, value] of Object.entries(careerMappings)) {
      if (interest.includes(key) || key.includes(interest)) {
        console.log(`✅ Mapped "${userInterest}" → "${value.title}"`);
        return value;
      }
    }

    // Keyword matching
    const keywordMappings = {
      'programming': careerMappings['software developer'],
      'coding': careerMappings['software developer'],
      'website': careerMappings['web developer'],
      'app': careerMappings['mobile developer'],
      'design': careerMappings['ux designer'],
      'data': careerMappings['data analyst'],
      'analytics': careerMappings['data analyst'],
      'security': careerMappings['cybersecurity analyst'],
      'management': careerMappings['product manager']
    };

    for (const [keyword, mapping] of Object.entries(keywordMappings)) {
      if (interest.includes(keyword)) {
        console.log(`✅ Keyword match "${userInterest}" → "${mapping.title}"`);
        return mapping;
      }
    }

    return null;
  };

  /**
   * Calculate AUTHENTIC match score based on user's profile
   */
  const calculateAuthenticMatchScore = (careerPath, userData, priority) => {
    let score = 50; // Base score
    const reasons = [];

    // User explicitly stated this interest
    score += 20;
    reasons.push(`+20 (stated interest)`);

    // Experience level alignment
    const experienceBoost = calculateExperienceAlignment(careerPath, userData.experienceLevel);
    score += experienceBoost;
    reasons.push(`+${experienceBoost} (experience)`);

    // Educational background alignment
    const educationBoost = calculateEducationAlignment(careerPath, userData.studyField);
    score += educationBoost;
    reasons.push(`+${educationBoost} (education)`);

    // Current role relevance
    const roleBoost = calculateCurrentRoleAlignment(careerPath, userData.currentRole);
    score += roleBoost;
    reasons.push(`+${roleBoost} (current role)`);

    // Tools & technology alignment
    const toolsBoost = calculateToolsAlignment(careerPath, userData.toolsUsed);
    score += toolsBoost;
    reasons.push(`+${toolsBoost} (tools)`);

    // Timeline feasibility
    const timelineBoost = calculateTimelineAlignment(careerPath, userData.transitionTimeline, userData.experienceLevel);
    score += timelineBoost;
    reasons.push(`+${timelineBoost} (timeline)`);

    // Priority adjustment
    if (priority === 0) score += 5;
    else if (priority === 1) score += 3;

    const finalScore = Math.min(Math.round(score), 95);
    console.log(`📊 ${careerPath.title} score: ${finalScore}% (${reasons.join(', ')})`);
    return finalScore;
  };

  // Helper functions for score calculation
  const calculateExperienceAlignment = (careerPath, experienceLevel) => {
    if (!experienceLevel) return 0;

    const experienceMap = {
      'Complete beginner': 1,
      'Some exposure': 2,
      'Beginner': 3,
      'Intermediate': 4,
      'Advanced': 5
    };

    const userLevel = experienceMap[experienceLevel] || 1;
    const pathRequirement = getCareerPathRequiredLevel(careerPath);

    if (userLevel === pathRequirement) return 15;
    if (Math.abs(userLevel - pathRequirement) === 1) return 10;
    if (userLevel > pathRequirement) return 12;
    if (userLevel < pathRequirement) {
      const gap = pathRequirement - userLevel;
      return Math.max(0, 8 - (gap * 2));
    }
    return 5;
  };

  const getCareerPathRequiredLevel = (careerPath) => {
    const levelMap = { 'entry': 2, 'mid': 3, 'senior': 4, 'expert': 5 };
    return levelMap[careerPath.level] || 3;
  };

  const calculateEducationAlignment = (careerPath, studyField) => {
    if (!studyField || studyField === 'Not specified') return 0;

    const field = studyField.toLowerCase();
    const category = careerPath.category;

    const strongAlignment = {
      'development': ['computer science', 'software engineering', 'information technology'],
      'data': ['data science', 'statistics', 'mathematics', 'computer science'],
      'design': ['design', 'graphic design', 'digital media', 'art'],
      'ai': ['computer science', 'machine learning', 'artificial intelligence'],
      'security': ['cybersecurity', 'information security', 'computer science']
    };

    if (strongAlignment[category]) {
      for (const alignedField of strongAlignment[category]) {
        if (field.includes(alignedField)) return 12;
      }
    }

    if (field.includes('engineering') || field.includes('science')) return 6;
    return 0;
  };

  const calculateCurrentRoleAlignment = (careerPath, currentRole) => {
    if (!currentRole || currentRole === 'Not specified') return 0;

    const role = currentRole.toLowerCase();
    const category = careerPath.category;

    const roleAlignment = {
      'development': ['developer', 'programmer', 'engineer', 'analyst'],
      'data': ['analyst', 'researcher', 'scientist', 'data'],
      'design': ['designer', 'creative', 'artist', 'marketing'],
      'management': ['manager', 'coordinator', 'lead', 'supervisor']
    };

    if (roleAlignment[category]) {
      for (const alignedRole of roleAlignment[category]) {
        if (role.includes(alignedRole)) return 8;
      }
    }

    if (role.includes('tech') || role.includes('IT')) return 4;
    return 0;
  };

  const calculateToolsAlignment = (careerPath, toolsUsed) => {
    if (!toolsUsed || toolsUsed.length === 0 || toolsUsed.includes('None')) return 0;

    const category = careerPath.category;
    let alignment = 0;

    const toolsAlignment = {
      'development': {
        'high': ['javascript', 'python', 'java', 'react', 'angular', 'vue'],
        'medium': ['html', 'css', 'sql', 'git']
      },
      'data': {
        'high': ['python', 'r', 'sql', 'tableau', 'power bi'],
        'medium': ['excel', 'analytics']
      },
      'design': {
        'high': ['figma', 'sketch', 'adobe', 'photoshop'],
        'medium': ['canva', 'illustrator']
      }
    };

    if (toolsAlignment[category]) {
      toolsUsed.forEach(tool => {
        const toolLower = tool.toLowerCase();
        if (toolsAlignment[category].high?.some(t => toolLower.includes(t))) {
          alignment += 3;
        } else if (toolsAlignment[category].medium?.some(t => toolLower.includes(t))) {
          alignment += 2;
        }
      });
    }

    return Math.min(alignment, 10);
  };

  const calculateTimelineAlignment = (careerPath, timeline, experienceLevel) => {
    if (!timeline) return 0;

    const timelineMonths = {
      'Less than 6 months': 6,
      '6-12 months': 12,
      '1-2 years': 24,
      '2+ years': 36,
      'Already transitioning': 3
    };

    const months = timelineMonths[timeline] || 12;
    const pathLevel = careerPath.level;

    const pathRequiredMonths = {
      'entry': { 'Complete beginner': 12, 'Some exposure': 8, 'Beginner': 6 },
      'mid': { 'Complete beginner': 18, 'Some exposure': 12, 'Beginner': 10, 'Intermediate': 6 },
      'senior': { 'Beginner': 24, 'Intermediate': 18, 'Advanced': 12 }
    };

    const requiredMonths = pathRequiredMonths[pathLevel]?.[experienceLevel] || 12;

    if (months >= requiredMonths) return 8;
    if (months >= requiredMonths * 0.75) return 5;
    if (months >= requiredMonths * 0.5) return 2;
    return 0;
  };

  const generateComplementaryPaths = (userData, existingPaths) => {
    const complementaryPaths = [];
    const existingTitles = existingPaths.map(p => p.title.toLowerCase());

    if (userData.toolsUsed && userData.toolsUsed.length > 0) {
      const toolBasedSuggestions = suggestPathsFromTools(userData.toolsUsed);
      
      toolBasedSuggestions.forEach(suggestion => {
        if (!existingTitles.includes(suggestion.title.toLowerCase())) {
          const score = calculateAuthenticMatchScore(suggestion, userData, 10);
          if (score >= 60) {
            complementaryPaths.push({
              title: suggestion.title,
              match: score,
              userInterest: `Based on your ${userData.toolsUsed.join(', ')} experience`,
              insights: generatePersonalizedInsights(suggestion, userData),
              reasoning: `Recommended based on your tool experience`,
              authenticated: true,
              isComplementary: true,
              category: suggestion.category,
              level: suggestion.level
            });
          }
        }
      });
    }

    return complementaryPaths.slice(0, 2);
  };

  const suggestPathsFromTools = (tools) => {
    const suggestions = [];
    const toolsLower = tools.map(t => t.toLowerCase());

    const toolToCareerMap = {
      'javascript': { title: 'Frontend Developer', category: 'development', level: 'mid' },
      'react': { title: 'React Developer', category: 'development', level: 'mid' },
      'python': { title: 'Backend Developer', category: 'development', level: 'mid' },
      'sql': { title: 'Data Analyst', category: 'data', level: 'entry' },
      'figma': { title: 'UX Designer', category: 'design', level: 'mid' },
      'tableau': { title: 'Data Analyst', category: 'data', level: 'mid' },
      'aws': { title: 'Cloud Engineer', category: 'infrastructure', level: 'mid' }
    };

    toolsLower.forEach(tool => {
      if (toolToCareerMap[tool]) {
        suggestions.push(toolToCareerMap[tool]);
      }
    });

    return suggestions;
  };

  const generatePersonalizedInsights = (careerPath, userData) => {
    const insights = [];

    if (userData.experienceLevel) {
      insights.push(`Your ${userData.experienceLevel.toLowerCase()} experience level aligns well with ${careerPath.title} requirements`);
    }

    if (userData.studyField && userData.studyField !== 'Not specified') {
      insights.push(`Your ${userData.studyField} background provides a strong foundation for this role`);
    }

    if (userData.toolsUsed && userData.toolsUsed.length > 0 && !userData.toolsUsed.includes('None')) {
      insights.push(`Your experience with ${userData.toolsUsed.slice(0, 2).join(' and ')} gives you a head start`);
    }

    return insights.slice(0, 2);
  };

  const generateMatchReasoning = (careerPath, userData, score) => {
    if (score >= 85) {
      return "Excellent match based on your interests, experience, and background";
    } else if (score >= 75) {
      return "Strong match with good alignment to your profile and goals";
    } else if (score >= 65) {
      return "Good potential match that builds on your existing strengths";
    } else {
      return "Consider this path after building foundational skills";
    }
  };

  // UPDATED: Replace the old extraction function
  const extractCareerPathsImproved = (text) => {
    console.log('🎯 AUTHENTIC CAREER PATH GENERATION: Using user data instead of analysis parsing');
    
    // Generate authentic paths based on user's actual form data
    const authenticPaths = generateAuthenticCareerPaths(userData);
    
    if (authenticPaths.length === 0) {
      console.error('❌ Could not generate any authentic career paths - user may not have provided career interests');
      return [];
    }

    console.log(`✅ Generated ${authenticPaths.length} authentic, user-driven career paths`);
    return authenticPaths;
  };

  // ============================================================================
  // COMPONENT LOGIC
  // ============================================================================

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

  // UPDATED: Enhanced useEffect to ensure authentic career path generation
  useEffect(() => {
    const loadData = async () => {
      try {
        if (location.state?.analysis) {
          const analysisText = location.state.analysis;
          setAnalysis(analysisText);
          
          if (location.state.formData) {
            const formData = location.state.formData;
            
            const processedUserData = {
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
            
            // Generate authentic career paths using the new system
            const paths = generateAuthenticCareerPaths(processedUserData);
            setCareerPaths(paths);
            
            console.log('✅ Authentic career paths generated:', paths.length);
          }
        } else {
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            const analysisText = storedAnalysis.analysis;
            setAnalysis(analysisText);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              const processedUserData = {
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
              
              // Generate authentic career paths
              const paths = generateAuthenticCareerPaths(processedUserData);
              setCareerPaths(paths);
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

  // Enhanced Career Path Card Component with authentic data display
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
    
    return (
      <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-2">
                {path.title}
              </h3>
              
              {/* Show user's original interest if different */}
              {path.userInterest && path.userInterest !== path.title && (
                <p className="text-sm text-blue-600 mb-2 italic">
                  Based on your interest: "{path.userInterest}"
                </p>
              )}
              
              {/* Show authentic reasoning */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {path.reasoning || `Recommended based on your profile and interests`}
              </p>
              
              {/* Show if it's complementary */}
              {path.isComplementary && (
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  Bonus recommendation
                </span>
              )}
            </div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent ml-4`}>
              {animatedValue}%
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Match Score</span>
              <span className="text-sm text-gray-500">{animatedValue}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000 ease-out`}
                style={{ width: `${animatedValue}%` }}
              />
            </div>
          </div>
          
          {/* Show personalized insights */}
          {path.insights && path.insights.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Why this fits you:</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {path.insights.map((insight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-0.5">✓</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              path.match >= 80 ? 'bg-green-100 text-green-700' :
              path.match >= 70 ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {path.match >= 80 ? 'Excellent Match' : path.match >= 70 ? 'Good Match' : 'Consider'}
            </span>
            
            {path.authenticated && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                Personalized
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading your personalized career analysis..." />;
  }

  // Calculate quick stats
  const topMatchPercentage = careerPaths.length > 0 ? Math.max(...careerPaths.map(p => p.match)) : 0;
  const authenticPathsCount = careerPaths.filter(p => p.authenticated).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header with authenticity indicator */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Your authentic tech career recommendations based on your profile
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {userData.currentRole !== 'Not specified' && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  📍 Currently: {userData.currentRole}
                </div>
              )}
              {careerPaths.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  🎯 Top Match: {careerPaths[0].title} ({careerPaths[0].match}%)
                </div>
              )}
              {userData.transitionTimeline && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  ⏰ Timeline: {userData.transitionTimeline}
                </div>
              )}
              {authenticPathsCount > 0 && (
                <div className="bg-green-500 bg-opacity-20 px-4 py-2 rounded-full border border-green-300">
                  ✅ {authenticPathsCount} Authentic Recommendations
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'paths', label: 'Career Paths', icon: '🛤️' }
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

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Top Match', value: `${topMatchPercentage}%`, color: 'from-green-500 to-emerald-500', icon: '🎯' },
                { label: 'Authentic Paths', value: authenticPathsCount.toString(), color: 'from-blue-500 to-cyan-500', icon: '✅' },
                { label: 'User Interests', value: userData.careerPathsInterest?.length?.toString() || '0', color: 'from-purple-500 to-pink-500', icon: '💝' },
                { label: 'Experience Level', value: userData.experienceLevel?.split(' ')[0] || 'N/A', color: 'from-orange-500 to-red-500', icon: '📈' }
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

            {/* Data Quality Indicator */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🎯</span>
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
          </div>
        )}

        {activeTab === 'paths' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Authentic Career Paths</h2>
              <p className="text-gray-600 text-lg">
                Based on your stated interests: {userData.careerPathsInterest?.join(', ') || 'Not specified'}
              </p>
              {careerPaths.length === 0 && userData.careerPathsInterest?.length === 0 && (
                <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    <strong>No career interests found.</strong> Please retake the assessment and specify your career interests to get personalized recommendations.
                  </p>
                  <button 
                    onClick={() => navigate('/career/test')}
                    className="mt-4 bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Retake Assessment
                  </button>
                </div>
              )}
            </div>
            
            {careerPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {careerPaths.map((path, index) => (
                  <CareerPathCard key={index} path={path} index={index} />
                ))}
              </div>
            ) : userData.careerPathsInterest?.length > 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Processing Your Interests</h3>
                <p className="text-gray-500">Generating recommendations based on: {userData.careerPathsInterest.join(', ')}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerDashboard;
