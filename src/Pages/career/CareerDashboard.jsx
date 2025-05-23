import React, { useState, useEffect } from 'react';

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

  const [recommendationMetadata, setRecommendationMetadata] = useState({
    overallConfidence: 85,
    dataCompleteness: 78,
    algorithmVersion: '1.0.0'
  });

  // ============================================================================
  // ADVANCED RECOMMENDATION SYSTEM
  // ============================================================================

  const isValid = (value) => {
    if (!value) return false;
    if (typeof value === 'string') {
      const invalid = ['', 'none', 'not sure', 'unclear', 'n/a', 'not specified'];
      return !invalid.includes(value.toLowerCase().trim());
    }
    if (Array.isArray(value)) {
      return value.length > 0 && !value.some(v => ['not sure', 'unclear', 'none'].includes(v?.toLowerCase()));
    }
    return true;
  };

  const getExperienceScore = (experience) => {
    const expMap = {
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      'Beginner': 0.3, 'Intermediate': 0.6, 'Advanced': 0.9
    };
    return expMap[experience] || 0.5;
  };

  const getTechAlignment = (field) => {
    if (!field) return 0.3;
    const fieldLower = field.toLowerCase();
    if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
    if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.8;
    return 0.5;
  };

  const getInterestScore = (interests) => {
    if (!interests || interests.length === 0) return 0.3;
    const techKeywords = ['programming', 'coding', 'software', 'ai', 'data', 'web', 'machine learning'];
    const hasMatch = interests.some(interest => 
      techKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    return hasMatch ? 0.8 : 0.4;
  };

  const calculateTechMarketScore = (profile) => {
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
      score += 85; // High score for having tech experience
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
  };

  const calculateAcademicScore = (profile) => {
    let score = 0;
    let criteriaCount = 0;

    if (isValid(profile.yearsExperience)) {
      score += getExperienceScore(profile.yearsExperience) * 100;
      criteriaCount++;
    }

    if (isValid(profile.studyField)) {
      score += getTechAlignment(profile.studyField) * 100;
      criteriaCount++;
    }

    if (isValid(profile.interests)) {
      score += getInterestScore(profile.interests) * 100;
      criteriaCount++;
    }

    if (isValid(profile.educationLevel)) {
      const eduScore = profile.educationLevel.toLowerCase().includes('master') ? 0.8 : 
                     profile.educationLevel.toLowerCase().includes('bachelor') ? 0.6 : 0.4;
      score += eduScore * 100;
      criteriaCount++;
    }

    if (isValid(profile.techInterests)) {
      score += profile.techInterests.toLowerCase().includes('research') ? 85 : 70;
      criteriaCount++;
    }

    return { totalScore: Math.min(score / criteriaCount, 100), criteriaCount };
  };

  const calculatePracticalScore = (profile) => {
    let score = 0;
    let criteriaCount = 0;

    if (isValid(profile.yearsExperience)) {
      score += getExperienceScore(profile.yearsExperience) * 100;
      criteriaCount++;
    }

    if (isValid(profile.workPreference)) {
      score += profile.workPreference.toLowerCase() === 'remote' ? 85 : 75;
      criteriaCount++;
    }

    if (isValid(profile.timeCommitment)) {
      score += profile.timeCommitment.toLowerCase() === 'full-time' ? 90 : 70;
      criteriaCount++;
    }

    if (isValid(profile.currentRole)) {
      score += 80; // Having current role is positive
      criteriaCount++;
    }

    if (isValid(profile.targetSalary)) {
      score += 75; // Having salary expectations is realistic
      criteriaCount++;
    }

    return { totalScore: Math.min(score / criteriaCount, 100), criteriaCount };
  };

  const generateRecommendations = (profile) => {
    const techScore = calculateTechMarketScore(profile);
    const academicScore = calculateAcademicScore(profile);
    const practicalScore = calculatePracticalScore(profile);

    const recommendations = [
      {
        id: 'rec_1_tech_market',
        type: 'tech-market',
        title: 'Senior Full-Stack Developer',
        description: 'Leverage your technical skills in modern web development with focus on scalable applications',
        reasoning: `Based on your ${techScore.criteriaCount} qualifying criteria and ${Math.round(techScore.totalScore)}% alignment with tech market demands`,
        confidence: techScore.totalScore > 75 ? 'high' : techScore.totalScore > 50 ? 'medium' : 'low',
        confidenceScore: Math.round(techScore.totalScore),
        match: Math.round(techScore.totalScore),
        requiredSkills: ['React', 'Node.js', 'Python', 'Database Design', 'API Development'],
        suggestedActions: [
          'Build portfolio projects using React and Node.js',
          'Contribute to open source projects',
          'Complete AWS or Azure certifications'
        ],
        salaryRange: '$75k - $120k',
        marketDemand: 'high',
        metadata: {
          criteriaUsed: ['yearsExperience', 'studyField', 'interests', 'jobTechnologies', 'toolsUsed'],
          techStack: techScore.techStack,
          algorithm: 'tech-market-v1.0'
        }
      },
      {
        id: 'rec_2_academic_research',
        type: 'academic-research',
        title: 'AI Research Analyst',
        description: 'Apply machine learning research in practical business applications and data science',
        reasoning: `Your academic background aligns ${Math.round(academicScore.totalScore)}% with research opportunities`,
        confidence: academicScore.totalScore > 75 ? 'high' : academicScore.totalScore > 50 ? 'medium' : 'low',
        confidenceScore: Math.round(academicScore.totalScore),
        match: Math.round(academicScore.totalScore),
        requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'Research Methods', 'Data Visualization'],
        suggestedActions: [
          'Publish research in AI applications',
          'Attend machine learning conferences',
          'Collaborate on research projects'
        ],
        salaryRange: '$70k - $110k',
        marketDemand: 'high',
        metadata: {
          criteriaUsed: ['yearsExperience', 'studyField', 'interests', 'educationLevel', 'techInterests'],
          algorithm: 'academic-research-v1.0'
        }
      },
      {
        id: 'rec_3_practical_lifestyle',
        type: 'practical-lifestyle',
        title: 'Remote Senior Developer',
        description: 'Balance technical expertise with flexible work arrangements and career growth',
        reasoning: `Considering lifestyle preferences, this path offers ${Math.round(practicalScore.totalScore)}% compatibility`,
        confidence: practicalScore.totalScore > 75 ? 'high' : practicalScore.totalScore > 50 ? 'medium' : 'low',
        confidenceScore: Math.round(practicalScore.totalScore),
        match: Math.round(practicalScore.totalScore),
        requiredSkills: ['Remote Communication', 'Project Management', 'Full-Stack Development', 'Self-Management'],
        suggestedActions: [
          'Develop remote work portfolio',
          'Network with remote-first companies',
          'Build time management skills'
        ],
        salaryRange: '$80k - $125k',
        marketDemand: 'high',
        metadata: {
          criteriaUsed: ['workPreference', 'timeCommitment', 'currentRole', 'targetSalary'],
          algorithm: 'practical-lifestyle-v1.0'
        }
      }
    ];

    return recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
  };

  const generateSkillsGap = (recommendations) => {
    const topRec = recommendations[0];
    if (!topRec) return [];

    return topRec.requiredSkills.map((skill, index) => ({
      name: skill,
      description: `Essential ${skill.toLowerCase()} skills for ${topRec.title} roles`,
      currentLevel: Math.floor(Math.random() * 3) + 1, // Random for demo
      requiredLevel: Math.floor(Math.random() * 2) + 4, // Random for demo
      gap: Math.floor(Math.random() * 2) + 1,
      category: skill.includes('React') || skill.includes('Python') ? 'Technical Skills' : 
               skill.includes('Communication') || skill.includes('Management') ? 'Soft Skills' : 'Technical Skills',
      priority: index < 2 ? 'high' : 'medium',
      learningPath: `Focus on practical projects and structured learning for ${skill}`
    }));
  };

  const generateLearningRoadmap = () => [
    {
      phase: 'Phase 1',
      title: 'Foundation Building',
      duration: 'Months 1-2',
      description: 'Build fundamental skills and understanding',
      skills: ['Programming Fundamentals', 'Problem Solving', 'Version Control'],
      resources: ['Online courses', 'Coding practice', 'Git tutorials']
    },
    {
      phase: 'Phase 2', 
      title: 'Skill Development',
      duration: 'Months 3-4',
      description: 'Develop core technical skills',
      skills: ['Framework Mastery', 'Database Design', 'API Development'],
      resources: ['Advanced tutorials', 'Documentation', 'Practice projects']
    },
    {
      phase: 'Phase 3',
      title: 'Project Building',
      duration: 'Months 5-6',
      description: 'Apply skills through hands-on projects',
      skills: ['Full-Stack Projects', 'Deployment', 'Testing'],
      resources: ['Portfolio projects', 'GitHub', 'Cloud platforms']
    }
  ];

  const generateMarketTrends = (recommendations) => {
    const topRec = recommendations[0];
    if (!topRec) return [];

    return [
      {
        title: `${topRec.title} SALARY OUTLOOK`,
        description: `Compensation trends for ${topRec.title} roles`,
        category: 'Salary Analysis',
        relevance: 'High',
        personalizedData: {
          ranges: ['$75,000 - $120,000 (Average)', '$60,000 - $85,000 (Entry Level)', '$100,000 - $150,000 (Senior Level)'],
          growth: '12% year-over-year growth',
          hotSkills: topRec.requiredSkills.slice(0, 4)
        },
        userCareer: topRec.title
      },
      {
        title: `${topRec.title} MARKET DEMAND`,
        description: `Job market demand and growth prospects`,
        category: 'Industry Demand', 
        relevance: 'High',
        personalizedData: {
          growth: '18% faster than average',
          opportunities: ['High demand in tech', 'Remote work growth', 'Startup ecosystem'],
          industries: ['Technology', 'Healthcare', 'Finance', 'E-commerce']
        },
        userCareer: topRec.title
      }
    ];
  };

  // ============================================================================
  // COMPONENT EFFECTS
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate AI recommendations
      const generatedRecs = generateRecommendations(userData);
      setRecommendations(generatedRecs);
      setCareerPaths(generatedRecs);
      
      // Generate supporting data
      setSkillsGap(generateSkillsGap(generatedRecs));
      setLearningRoadmap(generateLearningRoadmap());
      setMarketTrends(generateMarketTrends(generatedRecs));
      
      setLoading(false);
    };

    loadData();
  }, []);

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
          
          {path.requiredSkills && (
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
          )}
          
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

  const SkillCard = ({ skill }) => {
    const progress = (skill.currentLevel / skill.requiredLevel) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
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
            <ProgressBar value={progress} />
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
        
        <div className="mt-3 p-2 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 font-medium">{skill.learningPath}</p>
        </div>
      </div>
    );
  };

  const RoadmapCard = ({ item, index }) => {
    const colors = ['from-green-400 to-green-600', 'from-blue-400 to-blue-600', 'from-purple-400 to-purple-600'];
    const colorClass = colors[index % colors.length];
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-start mb-4">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center text-white font-bold mr-4`}>
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
    );
  };

  const MarketTrendCard = ({ trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start mb-4">
        <span className="text-3xl mr-4">📈</span>
        <div>
          <h4 className="font-semibold text-lg text-gray-800">{trend.title}</h4>
          <span className="text-sm text-gray-500">{trend.category}</span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-3">{trend.description}</p>
      
      {trend.personalizedData && (
        <div className="space-y-3">
          {trend.personalizedData.ranges && (
            <div className="bg-green-50 p-3 rounded-lg">
              <h5 className="font-medium text-green-800 mb-2">💰 Salary Ranges:</h5>
              <ul className="text-sm text-green-700 space-y-1">
                {trend.personalizedData.ranges.map((range, idx) => (
                  <li key={idx}>• {range}</li>
                ))}
              </ul>
            </div>
          )}
          
          {trend.personalizedData.hotSkills && (
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
          )}
        </div>
      )}
    </div>
  );

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
              <div className="bg-purple-500 bg-opacity-20 px-4 py-2 rounded-full border border-purple-300">
                🔬 {highConfidenceCount} High-Confidence Recommendations
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

            {/* Algorithm Quality */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="mr-3">🔬</span>
                AI Recommendation Quality
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
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{recommendationMetadata.overallConfidence}%</div>
                  <div className="text-sm text-green-700">Overall Confidence</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{recommendationMetadata.dataCompleteness}%</div>
                  <div className="text-sm text-blue-700">Profile Completeness</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{recommendations.length}</div>
                  <div className="text-sm text-purple-700">Recommendations</div>
                </div>
              </div>
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
              <h2 className="text-3xl font-bold mb-4">AI-Powered Skills Development Plan</h2>
              <p className="text-gray-600 text-lg">
                Personalized skill analysis for {recommendations[0]?.title || 'your target role'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillsGap.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
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
                <RoadmapCard key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Market Insights</h2>
              <p className="text-gray-600 text-lg">
                Personalized market analysis for {recommendations[0]?.title}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketTrends.map((trend, index) => (
                <MarketTrendCard key={index} trend={trend} />
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
