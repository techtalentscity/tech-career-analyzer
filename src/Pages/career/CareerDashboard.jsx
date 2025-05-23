import React, { useState, useEffect, useMemo, useCallback } from 'react';

const CareerDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [careerPaths, setCareerPaths] = useState([]);
  const [skillsGap, setSkillsGap] = useState([]);
  const [learningRoadmap, setLearningRoadmap] = useState([]);
  const [marketTrends, setMarketTrends] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ rating: '', improvements: '' });
  
  // Sample user data - in real app this would come from props or API
  const [userData] = useState({
    name: 'Alex Johnson',
    yearsExperience: '3-5',
    studyField: 'Computer Science',
    interests: ['Machine Learning', 'Web Development', 'Data Analysis'],
    transferableSkills: 'Problem solving, analytical thinking, communication',
    jobTechnologies: 'Python, JavaScript, SQL',
    toolsUsed: ['React', 'Node.js', 'PostgreSQL'],
    educationLevel: 'Bachelor',
    publications: 'None',
    techInterests: 'AI and Machine Learning',
    workPreference: 'Remote',
    timeCommitment: 'Full-time',
    currentRole: 'Junior Developer',
    targetSalary: '$80,000-$100,000',
    experienceLevel: 'Intermediate'
  });

  const [recommendationMetadata] = useState({
    overallConfidence: 85,
    dataCompleteness: 78,
    algorithmVersion: '1.0.0'
  });

  // ============================================================================
  // ADVANCED RECOMMENDATION SYSTEM
  // ============================================================================

  const isValid = useCallback((value) => {
    if (!value) return false;
    if (typeof value === 'string') {
      const invalid = ['', 'none', 'not sure', 'unclear', 'n/a', 'not specified'];
      return !invalid.includes(value.toLowerCase().trim());
    }
    if (Array.isArray(value)) {
      return value.length > 0 && !value.some(v => ['not sure', 'unclear', 'none'].includes(v?.toLowerCase()));
    }
    return true;
  }, []);

  const getExperienceScore = useCallback((experience) => {
    const expMap = {
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      'Beginner': 0.3, 'Intermediate': 0.6, 'Advanced': 0.9
    };
    return expMap[experience] || 0.5;
  }, []);

  const getTechAlignment = useCallback((field) => {
    if (!field) return 0.3;
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
    if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.8;
    return 0.5;
  }, []);

  const getInterestScore = useCallback((interests) => {
    if (!interests || interests.length === 0) return 0.3;
    const techKeywords = ['programming', 'coding', 'software', 'ai', 'data', 'web', 'machine learning'];
    const hasMatch = interests.some(interest => 
      techKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    return hasMatch ? 0.8 : 0.4;
  }, []);

  const calculateTechMarketScore = useCallback((profile) => {
    let score = 0;
    let criteriaCount = 0;
    let techStack = [];

    if (isValid(profile.yearsExperience)) {
      score += getExperienceScore(profile.yearsExperience) * 100;
      criteriaCount++;
    }

    if (isValid(profile.studyField)) {
      score += getTechAlignment(profile.studyField) * 100;
      criteriaCount++;
    }

    if (isValid(profile.interests)) {
      const interestScore = getInterestScore(profile.interests);
      score += interestScore * 100;
      criteriaCount++;
      if (interestScore > 0.7) {
        techStack.push(...profile.interests.filter(i => 
          ['machine learning', 'web development', 'data'].some(tech => 
            i.toLowerCase().includes(tech)
          )
        ));
      }
    }

    if (isValid(profile.jobTechnologies)) {
      score += 85;
      criteriaCount++;
      techStack.push(...profile.jobTechnologies.split(',').map(t => t.trim()));
    }

    if (isValid(profile.toolsUsed)) {
      score += Math.min(70 + (profile.toolsUsed.length * 5), 90);
      criteriaCount++;
      techStack.push(...profile.toolsUsed);
    }

    return { 
      totalScore: Math.min(score / criteriaCount, 100), 
      criteriaCount, 
      techStack: [...new Set(techStack)]
    };
  }, [isValid, getExperienceScore, getTechAlignment, getInterestScore]);

  const generateRecommendations = useMemo(() => {
    return (profile) => {
      const techScore = calculateTechMarketScore(profile);
      const academicScore = {
        totalScore: 78,
        criteriaCount: 5
      };
      const practicalScore = {
        totalScore: 82,
        criteriaCount: 4
      };

      const recommendations = [
        {
          id: 'rec_1_tech_market',
          type: 'tech-market',
          title: 'Machine Learning Engineer',
          description: `Leverage ${techScore.techStack.slice(0,2).join(' and ')} expertise to build innovative AI/ML solutions with high market demand`,
          reasoning: `Based on your ${techScore.criteriaCount} qualifying criteria and ${Math.round(techScore.totalScore)}% alignment with tech market demands.`,
          confidence: techScore.totalScore > 75 ? 'high' : techScore.totalScore > 50 ? 'medium' : 'low',
          confidenceScore: Math.round(techScore.totalScore),
          match: Math.round(techScore.totalScore),
          requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'PyTorch/TensorFlow', 'Cloud Platforms'],
          suggestedActions: [
            'Build ML portfolio projects with real datasets',
            'Complete AWS/Google Cloud ML certifications',
            'Contribute to open source ML frameworks'
          ],
          salaryRange: '$140k - $185k',
          marketDemand: 'very high',
          marketData: {
            growth: '74% annual job posting increase',
            outlook: 'AI industry growing to $20B by 2025',
            salaryGrowth: '7% year-over-year increase'
          }
        },
        {
          id: 'rec_2_academic_research',
          type: 'academic-research',
          title: 'AI Research Scientist',
          description: 'Conduct cutting-edge AI research with focus on practical applications',
          reasoning: `Your academic background aligns ${Math.round(academicScore.totalScore)}% with research opportunities.`,
          confidence: 'high',
          confidenceScore: Math.round(academicScore.totalScore),
          match: Math.round(academicScore.totalScore),
          requiredSkills: ['Research Methods', 'Python', 'Statistical Analysis', 'Academic Writing'],
          suggestedActions: [
            'Publish papers in AI/ML conferences',
            'Collaborate on university research projects',
            'Apply for research internships'
          ],
          salaryRange: '$95k - $145k',
          marketDemand: 'high',
          marketData: {
            growth: '30% industry growth expected',
            outlook: 'Strong research funding availability',
            salaryGrowth: '5% year-over-year increase'
          }
        },
        {
          id: 'rec_3_practical_lifestyle',
          type: 'practical-lifestyle',
          title: 'Remote Senior Software Engineer',
          description: 'Apply technical expertise in flexible remote environment',
          reasoning: `${Math.round(practicalScore.totalScore)}% compatibility with your lifestyle goals.`,
          confidence: 'high',
          confidenceScore: Math.round(practicalScore.totalScore),
          match: Math.round(practicalScore.totalScore),
          requiredSkills: ['Remote Communication', 'Self-Management', 'Full-Stack Development'],
          suggestedActions: [
            'Build strong remote work portfolio',
            'Network with remote-first companies',
            'Develop async communication skills'
          ],
          salaryRange: '$170k - $195k',
          marketDemand: 'high',
          marketData: {
            growth: 'Remote senior roles: 30% hybrid, 16% fully remote',
            outlook: 'Remote work stabilized at 15% of high-paying jobs',
            salaryGrowth: '6% year-over-year increase'
          }
        }
      ];

      return recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
    };
  }, [calculateTechMarketScore]);

  // ============================================================================
  // COMPONENT EFFECTS
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedRecs = generateRecommendations(userData);
      setRecommendations(generatedRecs);
      setCareerPaths(generatedRecs);
      
      // Generate mock skills gap
      setSkillsGap([
        {
          name: 'Machine Learning',
          description: 'Core ML algorithms and frameworks',
          currentLevel: 2,
          requiredLevel: 4,
          gap: 2,
          category: 'Technical Skills',
          priority: 'high'
        },
        {
          name: 'Cloud Platforms',
          description: 'AWS/GCP deployment and scaling',
          currentLevel: 1,
          requiredLevel: 4,
          gap: 3,
          category: 'Technical Skills',
          priority: 'high'
        }
      ]);
      
      // Generate mock roadmap
      setLearningRoadmap([
        {
          phase: 'Phase 1',
          title: 'Foundation Building',
          duration: 'Months 1-2',
          description: 'Build fundamental ML skills',
          skills: ['Python Fundamentals', 'Statistics', 'Linear Algebra'],
          resources: ['Online courses', 'Practice problems', 'Math review']
        },
        {
          phase: 'Phase 2',
          title: 'ML Development',
          duration: 'Months 3-4',
          description: 'Hands-on ML implementation',
          skills: ['Scikit-learn', 'TensorFlow', 'Model Evaluation'],
          resources: ['Projects', 'Kaggle competitions', 'Documentation']
        }
      ]);
      
      // Generate mock market trends
      setMarketTrends([
        {
          title: 'ML ENGINEER SALARY OUTLOOK',
          description: '2024-2025 compensation trends for ML roles',
          category: 'Salary Analysis',
          relevance: 'High',
          personalizedData: {
            ranges: ['$140k - $185k (Average)', '$120k - $160k (Mid-Level)', '$160k - $220k (Senior)'],
            growth: '7% year-over-year growth',
            hotSkills: ['Python', 'TensorFlow', 'MLOps', 'Cloud'],
            outlook: 'Strong growth expected through 2025'
          }
        }
      ]);
      
      setLoading(false);
    };

    loadData();
  }, [generateRecommendations, userData]);

  // Animate progress bars
  useEffect(() => {
    if (careerPaths.length > 0) {
      const timer = setTimeout(() => {
        careerPaths.forEach((path, index) => {
          const targetValue = path.confidenceScore;
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

  // ============================================================================
  // UI COMPONENTS
  // ============================================================================

  const LoadingSpinner = ({ message }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  );

  const ProgressBar = ({ value, className = "from-blue-400 to-blue-600" }) => (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r transition-all duration-1000 ease-out ${className}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const CareerPathCard = ({ path, index }) => {
    const animatedValue = animatedValues[`path-${index}`] || 0;
    const colorClasses = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500', 
      'from-green-500 to-teal-500'
    ];
    const colorClass = colorClasses[index % colorClasses.length];
    
    const getTypeIcon = (type) => {
      switch(type) {
        case 'tech-market': return '💻';
        case 'academic-research': return '🎓';
        case 'practical-lifestyle': return '🎯';
        default: return '📊';
      }
    };
    
    return (
      <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getTypeIcon(path.type)}</span>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {path.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{path.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{path.description}</p>
              <p className="text-sm text-green-700 italic">{path.reasoning}</p>
              
              <div className="mt-3 flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  path.confidence === 'high' ? 'bg-green-100 text-green-700' :
                  path.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {path.confidence} confidence
                </span>
              </div>
            </div>
            <div className={`text-3xl font-bold bg-gradient-to-r ${colorClass} bg-clip-text text-transparent ml-4`}>
              {animatedValue}%
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Confidence Score</span>
              <span className="text-sm text-gray-500">{animatedValue}/100</span>
            </div>
            <ProgressBar value={animatedValue} className={colorClass} />
          </div>
          
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Required Skills:</h5>
            <div className="flex flex-wrap gap-1">
              {path.requiredSkills.slice(0, 4).map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Salary:</span>
              <span className="text-xs font-medium text-gray-800">{path.salaryRange}</span>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {path.marketDemand} demand
            </span>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  if (loading) {
    return <LoadingSpinner message="Loading your advanced career analysis..." />;
  }

  const topMatchPercentage = careerPaths.length > 0 ? Math.max(...careerPaths.map(p => p.confidenceScore)) : 0;
  const highConfidenceCount = careerPaths.filter(p => p.confidence === 'high').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Advanced AI-powered career recommendations with {recommendationMetadata.overallConfidence}% overall confidence
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                📍 Currently: {userData.currentRole}
              </div>
              {careerPaths.length > 0 && (
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  🎯 Top Match: {careerPaths[0].title} ({careerPaths[0].confidenceScore}%)
                </div>
              )}
              <div className="bg-green-500 bg-opacity-20 px-4 py-2 rounded-full border border-green-300">
                ✅ {recommendationMetadata.dataCompleteness}% Profile Complete
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 bg-white shadow-md z-40">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'paths', label: 'Career Paths', icon: '🛤️' },
              { id: 'skills', label: 'Skills Gap', icon: '📈' },
              { id: 'roadmap', label: 'Learning Roadmap', icon: '🗺️' },
              { id: 'market', label: 'Market Insights', icon: '📈' }
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
                { label: 'Skills to Learn', value: skillsGap.length.toString(), color: 'from-blue-500 to-cyan-500', icon: '📚' },
                { label: 'Learning Phases', value: learningRoadmap.length.toString(), color: 'from-purple-500 to-pink-500', icon: '🗺️' },
                { label: 'Market Trends', value: marketTrends.length.toString(), color: 'from-orange-500 to-red-500', icon: '📈' }
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

            {/* AI Recommendation Quality */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🔬</span>
                AI Recommendation Quality & Market Alignment
              </h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Confidence Score</span>
                  <span>{recommendationMetadata.overallConfidence}%</span>  
                </div>
                <ProgressBar value={recommendationMetadata.overallConfidence} className="from-green-400 to-green-600" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                  Data Quality: {recommendationMetadata.dataCompleteness}%
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                  Recommendations: {careerPaths.length}
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-green-500"></span>
                  High Confidence: {highConfidenceCount}
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-blue-500"></span>
                  Algorithm: v{recommendationMetadata.algorithmVersion}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'paths' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Career Recommendations</h2>
              <p className="text-gray-600 text-lg">
                {recommendations.length} personalized recommendations based on your profile
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {careerPaths.map((path, index) => (
                <CareerPathCard key={index} path={path} index={index} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Skills Development Plan</h2>
              <p className="text-gray-600 text-lg">
                Personalized skill analysis for {recommendations[0]?.title || 'your target role'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsGap.map((skill, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{skill.name}</h4>
                      <span className="text-sm text-gray-500">{skill.category}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      skill.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {skill.priority} priority
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Level</span>
                        <span>{skill.currentLevel}/5</span>
                      </div>
                      <ProgressBar value={(skill.currentLevel / 5) * 100} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Target Level</span>
                        <span>{skill.requiredLevel}/5</span>
                      </div>
                      <ProgressBar value={(skill.requiredLevel / 5) * 100} className="from-purple-400 to-purple-600" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-3">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Your Learning Roadmap</h2>
              <p className="text-gray-600 text-lg">Step-by-step learning path tailored to your goals</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {learningRoadmap.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-green-400 to-green-600' : 'from-blue-400 to-blue-600'
                    } flex items-center justify-center text-white font-bold mr-4`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
                      <span className="text-sm text-gray-500">{item.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{item.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-800 mb-2">Key Skills:</h5>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Resources:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {item.resources.map((resource, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Market Insights & Salary Analysis</h2>
              <p className="text-gray-600 text-lg">
                Real-time market analysis for Machine Learning Engineer roles
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketTrends.map((trend, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-4">📈</span>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{trend.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">{trend.category}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          2024-2025 Data
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{trend.description}</p>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">💰 Salary Ranges:</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        {trend.personalizedData.ranges.map((range, idx) => (
                          <li key={idx}>• {range}</li>
                        ))}
                      </ul>
                      <div className="mt-2 text-xs text-green-600 font-medium">
                        📈 Growth: {trend.personalizedData.growth}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-medium text-blue-800 mb-2">🔥 Hot Skills:</h5>
                      <div className="flex flex-wrap gap-1">
                        {trend.personalizedData.hotSkills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </button>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Feedback</h2>
              <button onClick={() => setShowFeedbackForm(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rate your experience (1-5):
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setFeedbackData(prev => ({...prev, rating: value.toString()}))}
                      className={`w-14 h-14 rounded-full border-2 transition-all ${
                        feedbackData.rating === value.toString()
                          ? 'bg-red-500 text-white border-red-500'
                          : 'border-gray-300 hover:border-red-500'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Improvement suggestions:
                </label>
                <textarea
                  value={feedbackData.improvements}
                  onChange={(e) => setFeedbackData(prev => ({...prev, improvements: e.target.value}))}
                  rows="4"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Tell us how we can make this better..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    alert('Thank you for your feedback!');
                    setShowFeedbackForm(false);
                    setFeedbackData({rating: '', improvements: ''});
                  }}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerDashboard;
