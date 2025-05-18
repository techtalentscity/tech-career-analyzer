const proficiency = Math.round((toolProficiencyMap[tool] || 3) * multiplier);
            const proficiencyLabels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
            
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{tool}</span>
                  <span className="text-sm text-gray-600">{proficiencyLabels[proficiency - 1]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(proficiency / 5) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Market Trends Section Component
  const MarketTrendsSection = ({ marketTrends }) => {
    if (!marketTrends || marketTrends.length === 0) {
      return null;
    }
    
    const salaryTrends = marketTrends.filter(trend => trend.type === 'salary');
    const growthTrends = marketTrends.filter(trend => trend.type === 'growth');
    const generalTrends = marketTrends.filter(trend => trend.type === 'general');
    const sectionHeaders = marketTrends.filter(trend => trend.type === 'section_header');
    
    return (
      <div>
        {salaryTrends.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Salary Ranges</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {salaryTrends.map((trend, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{trend.careerPath}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-700">
                      ${trend.minSalary.toLocaleString()} - ${trend.maxSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">Annual salary range</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {growthTrends.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Job Growth Projections</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {growthTrends.map((trend, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{trend.careerPath}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className={`text-3xl font-bold ${
                      trend.growth > 15 ? 'text-green-600' : 
                      trend.growth > 5 ? 'text-blue-600' : 
                      'text-orange-600'
                    }`}>
                      {trend.growth}%
                    </span>
                  </div>
                  <div className="text-center text-sm text-gray-600 mt-2">Projected growth rate</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {sectionHeaders.length > 0 && generalTrends.length > 0 && (
          <div>
            {sectionHeaders.map((header, hIndex) => {
              const relatedTrends = generalTrends.filter(trend => trend.subsection === header.title);
              if (relatedTrends.length === 0) return null;
              
              return (
                <div key={hIndex} className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">{header.title}</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-3">
                      {relatedTrends.map((trend, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">•</span>
                          <span>{trend.trend}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {!sectionHeaders.length && generalTrends.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Industry Insights</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-3">
                {generalTrends.map((trend, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span>{trend.trend}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Networking Strategy Component
  const NetworkingStrategySection = ({ strategies }) => {
    if (!strategies || strategies.length === 0) {
      return null;
    }
    
    const strategyItems = strategies.filter(item => item.type === 'strategy');
    
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-3">
            {strategyItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Personal Branding Component
  const PersonalBrandingSection = ({ tips }) => {
    if (!tips || tips.length === 0) {
      return null;
    }
    
    const brandingTips = tips.filter(item => item.type === 'tip');
    
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-3">
            {brandingTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Interview Preparation Component
  const InterviewPrepSection = ({ tips }) => {
    if (!tips || tips.length === 0) {
      return null;
    }
    
    const interviewTips = tips.filter(item => item.type === 'tip');
    
    return (
      <div className="mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <ul className="space-y-3">
            {interviewTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Create timeline visualization data - Based on user's specified timeline, career paths, and skills gap
  const createTimelineData = () => {
    const timelineMap = {
      'Less than 6 months': 6,
      '6-12 months': 12,
      '1-2 years': 18,
      '2+ years': 24,
      'Already transitioning': 3
    };
    
    // Get user's top career path if available
    const topCareerPath = careerPaths.length > 0 ? careerPaths[0].title : "";
    
    // Get user's top skills gaps
    const topSkillsGaps = skillsGap
      .filter(skill => skill.gap > 0)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3)
      .map(skill => skill.name);
    
    const months = timelineMap[userData.transitionTimeline] || 12;
    const milestones = [];
    
    // Monthly weekly commitment translation
    const commitmentMap = {
      'Less than 5 hours per week': 'part-time',
      '5-10 hours per week': 'balanced',
      '10-20 hours per week': 'dedicated',
      '20+ hours per week': 'intensive',
      'Full-time': 'full-time'
    };
    
    const commitment = commitmentMap[userData.timeCommitment] || 'balanced';
    
    if (months <= 6) {
      // Accelerated learning path (6 months or less)
      milestones.push(
        { 
          month: 1, 
          label: 'Core Foundations', 
          progress: 20,
          details: [
            `Begin learning ${topSkillsGaps[0] || 'fundamentals'} through online courses`,
            `Set up development environment for ${topCareerPath || 'your selected path'}`,
            'Join relevant tech communities and forums'
          ]
        },
        { 
          month: 2, 
          label: 'Skill Building', 
          progress: 40,
          details: [
            `Advance to intermediate ${topSkillsGaps[0] || 'skills'} concepts`,
            `Start learning ${topSkillsGaps[1] || 'additional skills'}`,
            'Complete first small project to apply new skills'
          ]
        },
        { 
          month: 3, 
          label: 'Project Development', 
          progress: 60,
          details: [
            'Begin comprehensive portfolio project',
            `Continue advancing ${topSkillsGaps[0] || 'primary skill'} with advanced topics`,
            'Prepare resume highlighting transferable skills from current role'
          ]
        },
        { 
          month: 4, 
          label: 'Portfolio Building', 
          progress: 75,
          details: [
            'Complete and refine main portfolio project',
            'Create professional online presence (GitHub, LinkedIn)',
            'Begin networking with professionals in target field'
          ]
        },
        { 
          month: 5, 
          label: 'Job Search Preparation', 
          progress: 90,
          details: [
            'Practice technical interviews and coding challenges',
            'Reach out to recruiters and companies in your desired field',
            'Attend industry meetups and events'
          ]
        },
        { 
          month: 6, 
          label: 'Job Ready', 
          progress: 100,
          details: [
            'Launch full job search campaign',
            'Continue enhancing skills while interviewing',
            'Consider freelance or contract work to build experience'
          ]
        }
      );
    } else if (months <= 12) {
      // Standard learning path (12 months)
      milestones.push(
        { 
          month: 1, 
          label: 'Self-Assessment', 
          progress: 10,
          details: [
            'Analyze your transferable skills from current role',
            'Research trends and requirements for your target careers',
            'Set up initial learning schedule and goals'
          ]
        },
        { 
          month: 2, 
          label: 'Foundation Building', 
          progress: 20,
          details: [
            `Begin foundational courses in ${topSkillsGaps[0] || 'key skills'}`,
            'Set up development environment and tools',
            'Join online communities related to your target field'
          ]
        },
        { 
          month: 4, 
          label: 'Core Skills Development', 
          progress: 40,
          details: [
            `Continue advancing ${topSkillsGaps[0] || 'primary skill'}`,
            `Begin learning ${topSkillsGaps[1] || 'secondary skills'}`,
            'Complete first set of guided projects'
          ]
        },
        { 
          month: 6, 
          label: 'Project Implementation', 
          progress: 60,
          details: [
            'Start independent portfolio projects',
            'Enhance online presence (LinkedIn, GitHub)',
            'Begin networking with industry professionals'
          ]
        },
        { 
          month: 8, 
          label: 'Advanced Learning', 
          progress: 70,
          details: [
            `Focus on advanced ${topCareerPath || 'career path'} concepts`,
            'Refine portfolio with complex projects',
            'Get feedback from mentors on your progress'
          ]
        },
        { 
          month: 10, 
          label: 'Portfolio Refinement', 
          progress: 85,
          details: [
            'Complete and polish 2-3 substantial portfolio projects',
            'Update resume highlighting new skills and projects',
            'Prepare for technical interviews and challenges'
          ]
        },
        { 
          month: 12, 
          label: 'Job Ready', 
          progress: 100,
          details: [
            'Launch targeted job search in your chosen field',
            'Continue skills enhancement while interviewing',
            'Consider freelance opportunities to build experience'
          ]
        }
      );
    } else {
      // Extended learning path (18+ months)
      milestones.push(
        { 
          month: 1, 
          label: 'Career Exploration', 
          progress: 5,
          details: [
            'Explore different specializations within your chosen path',
            'Identify mentors and learning resources',
            'Create comprehensive learning plan'
          ]
        },
        { 
          month: 3, 
          label: 'Foundation Building', 
          progress: 15,
          details: [
            `Begin learning ${topSkillsGaps[0] || 'foundational skills'}`,
            'Set up development environment and basic tools',
            'Complete basic exercises and small projects'
          ]
        },
        { 
          month: 6, 
          label: 'Core Skills', 
          progress: 30,
          details: [
            `Continue advancing in ${topSkillsGaps[0] || 'primary skill'}`,
            `Begin learning ${topSkillsGaps[1] || 'complementary skills'}`,
            'Start building simple portfolio projects'
          ]
        },
        { 
          month: 9, 
          label: 'Specialization', 
          progress: 45,
          details: [
            `Focus on ${topCareerPath || 'chosen specialization'} specific skills`,
            'Begin networking with professionals in target field',
            'Enhance online presence (LinkedIn, GitHub)'
          ]
        },
        { 
          month: 12, 
          label: 'Advanced Projects', 
          progress: 60,
          details: [
            'Develop complex portfolio projects',
            'Contribute to open source or community projects',
            'Build professional relationships in the industry'
          ]
        },
        { 
          month: 15, 
          label: 'Professional Development', 
          progress: 80,
          details: [
            'Refine portfolio with high-quality projects',
            'Attend industry events and conferences',
            'Prepare for technical interviews and assessments'
          ]
        },
        { 
          month: 18, 
          label: 'Career Transition', 
          progress: 100,
          details: [
            'Launch targeted job search in your specialized field',
            'Consider freelance or contract work to build experience',
            'Continue learning advanced topics while interviewing'
          ]
        }
      );
    }
    
    return milestones;
  };

  // Custom Timeline Component
  const TimelineChart = ({ milestones }) => {
    const [expandedMilestone, setExpandedMilestone] = useState(null);
    
    if (!milestones || milestones.length === 0) {
      return null;
    }
    
    return (
      <div className="mb-6">
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-1 bg-gray-300" />
          {milestones.map((milestone, index) => (
            <div key={index} className="relative mb-10">
              <div className="flex items-center">
                <div className={`absolute left-0 w-5 h-5 rounded-full ${
                  index === 0 ? 'bg-blue-600' : 'bg-gray-400'
                } -translate-x-2 z-10`} />
                <div className="ml-8 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-semibold text-lg">{milestone.label}</span>
                      <span className="ml-2 text-sm text-gray-600">Month {milestone.month}</span>
                    </div>
                    <button 
                      onClick={() => setExpandedMilestone(expandedMilestone === index ? null : index)}
                      className="text-blue-600 text-sm font-medium flex items-center"
                    >
                      {expandedMilestone === index ? 'Hide Details' : 'Show Details'}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 transition-transform duration-200 ${expandedMilestone === index ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                  
                  {expandedMilestone === index && milestone.details && (
                    <div className="mt-3 bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2">Activities & Objectives</h4>
                      <ul className="space-y-2">
                        {milestone.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate next steps based on user data and analysis - only using actual extracted data
  const generateNextSteps = () => {
    const steps = [];
    
    // Use networking strategies if available
    if (networkingStrategy && networkingStrategy.length > 0) {
      const networkingStrategies = networkingStrategy.filter(item => item.type === 'strategy');
      if (networkingStrategies.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          color: 'text-blue-600',
          title: 'Build Your Network',
          description: networkingStrategies[0].text
        });
      }
    }
    
    // Use personal branding tips if available
    if (personalBranding && personalBranding.length > 0) {
      const brandingTips = personalBranding.filter(item => item.type === 'tip');
      if (brandingTips.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          color: 'text-purple-600',
          title: 'Develop Your Brand',
          description: brandingTips[0].text
        });
      }
    }
    
    // Based on skills gap
    if (skillsGap && skillsGap.length > 0) {
      const topGaps = skillsGap
        .filter(skill => skill.gap > 1)
        .sort((a, b) => b.gap - a.gap)
        .slice(0, 1);
        
      if (topGaps.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
          color: 'text-red-600',
          title: `Learn ${topGaps[0].name}`,
          description: topGaps[0].description
        });
      }
    }
    
    // Use interview preparation tips if available
    if (interviewPrep && interviewPrep.length > 0) {
      const interviewTips = interviewPrep.filter(item => item.type === 'tip');
      if (interviewTips.length > 0) {
        steps.push({
          icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          ),
          color: 'text-green-600',
          title: 'Prepare for Interviews',
          description: interviewTips[0].text
        });
      }
    }
    
    // Based on current role (only if available)
    if (userData.currentRole && userData.currentRole !== '') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: 'text-indigo-600',
        title: 'Leverage Current Experience',
        description: `Apply your ${userData.currentRole} skills to tech projects`
      });
    }
    
    // Return only the steps that were generated from actual user data
    // No default steps or fallbacks
    return steps;
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  // Extract data for visualizations
  const chartData = careerPaths.map(path => ({
    label: path.title,
    value: path.match
  }));
  const timelineMilestones = createTimelineData();
  const nextSteps = generateNextSteps();

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

        {/* User Profile Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Education Background</h3>
                <p className="text-lg font-semibold">{userData.educationLevel}</p>
                <p className="text-md text-gray-700">{userData.studyField}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Role</h3>
                <p className="text-lg font-semibold">{userData.currentRole}</p>
                <p className="text-md text-gray-700">{userData.yearsExperience}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tech Experience</h3>
                <p className="text-lg font-semibold">{userData.experienceLevel}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Career Interests</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {userData.careerPathsInterest && userData.careerPathsInterest.length > 0 ? (
                    userData.careerPathsInterest.slice(0, 3).map((interest, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500">No specific interests provided</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Transition Timeline</h3>
                <p className="text-lg font-semibold">{userData.transitionTimeline}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Time Commitment</h3>
                <p className="text-lg font-semibold">{userData.timeCommitment || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Career Path Matches Visualization */}
        {careerPaths.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Career Path Compatibility</h2>
            <p className="text-gray-600 mb-4">
              Based on your experience, skills, and interests, these career paths have the highest compatibility with your profile.
            </p>
            
            <SimpleBarChart data={chartData} title="" />
            
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {(() => {
                // Ensure we have three paths to display
                let displayPaths = [...careerPaths];
                
                // If we have fewer than 3 paths, add some suggested ones
                if (displayPaths.length < 3) {
                  // For AI/ML paths
                  if (displayPaths.some(p => 
                      p.title.toLowerCase().includes('machine learning') || 
                      p.title.toLowerCase().includes('ai'))) {
                    
                    // Add MLOps if not already present
                    if (!displayPaths.some(p => p.title.toLowerCase().includes('mlops'))) {
                      displayPaths.push({
                        title: 'MLOps Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                      });
                    }
                    
                    // Add AI Research Scientist if still needed
                    if (displayPaths.length < 3 && 
                        !displayPaths.some(p => p.title.toLowerCase().includes('research'))) {
                      displayPaths.push({
                        title: 'AI Research Scientist',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                      });
                    }
                  }
                  // For Data Science paths
                  else if (displayPaths.some(p => p.title.toLowerCase().includes('data'))) {
                    // Add Data Engineer if not already present
                    if (!displayPaths.some(p => p.title.toLowerCase().includes('engineer'))) {
                      displayPaths.push({
                        title: 'Data Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                      });
                    }
                    
                    // Add Analytics Engineer if still needed
                    if (displayPaths.length < 3 && 
                        !displayPaths.some(p => p.title.toLowerCase().includes('analytics'))) {
                      displayPaths.push({
                        title: 'Analytics Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                      });
                    }
                  }
                  // Default fallbacks
                  else {
                    if (displayPaths.length < 3) {
                      displayPaths.push({
                        title: 'Data Scientist',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                      });
                    }
                    
                    if (displayPaths.length < 3) {
                      displayPaths.push({
                        title: 'MLOps Engineer',
                        match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                      });
                    }
                  }
                }
                
                // Only show first 3 paths
                displayPaths = displayPaths.slice(0, 3);
                
                return displayPaths.map((path, index) => (
                  <div key={index} className={`p-5 rounded-lg ${
                    index === 0 ? 'bg-blue-50 border border-blue-100' :
                    index === 1 ? 'bg-green-50 border border-green-100' :
                    'bg-purple-50 border border-purple-100'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">{path.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        index === 0 ? 'bg-blue-100 text-blue-800' :
                        index === 1 ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {path.match}% Match
                      </span>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      {index === 0 && (
                        <>
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Perfect Fit:</strong> Your {userData.experienceLevel.toLowerCase()} experience
                              {userData.studyField ? ` in ${userData.studyField}` : ''} aligns with the core requirements.
                            </p>
                            <p className="text-gray-700 mt-2">
                              <strong>Key Advantage:</strong> Your background in {
                                userData.currentRole ? userData.currentRole : 'your current field'
                              } provides transferable skills highly valued in this role.
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Required Skills</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skillsGap.filter(skill => skill.gap > 0).slice(0, 3).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Estimated Timeline</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>{userData.transitionTimeline === 'Less than 6 months' || userData.transitionTimeline === 'Already transitioning' ? 
                                '3-6 months' : 
                                userData.transitionTimeline === '6-12 months' ? 
                                '6-9 months' : 
                                '9-12 months'}</strong> based on your current experience and commitment level
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Career Outlook</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Strong Growth:</strong> Projected 22% increase in demand over the next 5 years with competitive salary ranges
                            </p>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Strong Alternative:</strong> Your technical skills combined with your background
                              {userData.currentRole ? ` in ${userData.currentRole}` : ''} create an excellent foundation.
                            </p>
                            <p className="text-gray-700 mt-2">
                              <strong>Natural Fit:</strong> Your interest in {
                                userData.careerPathsInterest && userData.careerPathsInterest.length > 0 
                                  ? userData.careerPathsInterest[0] 
                                  : 'technology'
                              } aligns well with the core responsibilities.
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Required Skills</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skillsGap.filter(skill => skill.gap > 0).slice(2, 5).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Estimated Timeline</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>{userData.transitionTimeline === 'Less than 6 months' || userData.transitionTimeline === 'Already transitioning' ? 
                                '4-8 months' : 
                                userData.transitionTimeline === '6-12 months' ? 
                                '8-12 months' : 
                                '10-14 months'}</strong> to build necessary specialization and portfolio
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Career Outlook</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>High Demand:</strong> Consistent growth with varied opportunities across industries
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Why This Path</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Complementary Option:</strong> Leverages your analytical skills and technical knowledge while opening different opportunities.
                            </p>
                            <p className="text-gray-700 mt-2">
                              <strong>Growth Potential:</strong> Your background in {userData.studyField || 'your field'} provides a strong foundation for this emerging role.
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Required Skills</h4>
                            <div className="mt-1 flex flex-wrap gap-2">
                              {skillsGap.filter(skill => skill.gap > 0).slice(4, 7).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Estimated Timeline</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>{userData.transitionTimeline === 'Less than 6 months' || userData.transitionTimeline === 'Already transitioning' ? 
                                '6-10 months' : 
                                userData.transitionTimeline === '6-12 months' ? 
                                '10-14 months' : 
                                '12-18 months'}</strong> to acquire specialized knowledge and experience
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h4 className="text-sm font-medium text-gray-500 uppercase">Career Outlook</h4>
                            <p className="text-gray-700 mt-1">
                              <strong>Emerging Field:</strong> Growing demand for specialists with your technical background
                            </p>
                          </div>
                        </>
                      )}
                      
                      <div className="pt-3">
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(path.title)}+career+path+requirements`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm font-medium ${
                            index === 0 ? 'text-blue-600 hover:text-blue-800' :
                            index === 1 ? 'text-green-600 hover:text-green-800' :
                            'text-purple-600 hover:text-purple-800'
                          }`}
                        >
                          Learn more about this career →
                        </a>
                      </div>
                    </div>
                  </div>
                ));
              })()}
            </div>
            
            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Career Path Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Career Path</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transition Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Focus</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Demand</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(() => {
                      // Ensure we have three paths to display
                      let displayPaths = [...careerPaths];
                      
                      // If we have fewer than 3 paths, add some suggested ones
                      if (displayPaths.length < 3) {
                        // For AI/ML paths
                        if (displayPaths.some(p => 
                            p.title.toLowerCase().includes('machine learning') || 
                            p.title.toLowerCase().includes('ai'))) {
                          
                          // Add MLOps if not already present
                          if (!displayPaths.some(p => p.title.toLowerCase().includes('mlops'))) {
                            displayPaths.push({
                              title: 'MLOps Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                            });
                          }
                          
                          // Add AI Research Scientist if still needed
                          if (displayPaths.length < 3 && 
                              !displayPaths.some(p => p.title.toLowerCase().includes('research'))) {
                            displayPaths.push({
                              title: 'AI Research Scientist',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                            });
                          }
                        }
                        // For Data Science paths
                        else if (displayPaths.some(p => p.title.toLowerCase().includes('data'))) {
                          // Add Data Engineer if not already present
                          if (!displayPaths.some(p => p.title.toLowerCase().includes('engineer'))) {
                            displayPaths.push({
                              title: 'Data Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                            });
                          }
                          
                          // Add Analytics Engineer if still needed
                          if (displayPaths.length < 3 && 
                              !displayPaths.some(p => p.title.toLowerCase().includes('analytics'))) {
                            displayPaths.push({
                              title: 'Analytics Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                            });
                          }
                        }
                        // Default fallbacks
                        else {
                          if (displayPaths.length < 3) {
                            displayPaths.push({
                              title: 'Data Scientist',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 75)
                            });
                          }
                          
                          if (displayPaths.length < 3) {
                            displayPaths.push({
                              title: 'MLOps Engineer',
                              match: Math.max(displayPaths[displayPaths.length-1].match - 5, 70)
                            });
                          }
                        }
                      }
                      
                      // Only show first 3 paths
                      displayPaths = displayPaths.slice(0, 3);
                      
                      return displayPaths.map((path, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{path.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                              index === 0 ? 'bg-blue-100 text-blue-800' :
                              index === 1 ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'}`}>
                              {path.match}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {index === 0 ? 
                                (userData.transitionTimeline === 'Less than 6 months' ? '3-6 months' : '6-12 months') :
                              index === 1 ? 
                                (userData.transitionTimeline === 'Less than 6 months' ? '4-8 months' : '8-12 months') :
                                (userData.transitionTimeline === 'Less than 6 months' ? '6-10 months' : '10-16 months')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {index === 0 ? 
                                (skillsGap.length > 0 ? skillsGap[0].name : 'Technical foundations') :
                              index === 1 ? 
                                (skillsGap.length > 1 ? skillsGap[1].name : 'Analytical skills') :
                                (skillsGap.length > 2 ? skillsGap[2].name : 'Specialized knowledge')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${
                              index === 0 ? 'text-green-600' :
                              index === 1 ? 'text-blue-600' :
                              'text-purple-600'}`}>
                              {index === 0 ? 'Very High' : index === 1 ? 'High' : 'Growing'}
                            </div>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Skills Gap Analysis - UPDATED SECTION */}
        {skillsGap.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
            <p className="text-gray-600 mb-4">
              Visual representation of your current skill levels versus required levels for your target career paths.
            </p>
            
            {/* Learning Resources - Always visible when skills are present */}
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Personalized Learning Resources</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {skillsGap.slice(0, 4).map((skill, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {skill.currentLevel === 1 ? 'Beginner' : 
                       skill.currentLevel === 2 ? 'Basic' :
                       skill.currentLevel === 3 ? 'Intermediate' :
                       skill.currentLevel === 4 ? 'Advanced' : 'Expert'} → {
                       skill.requiredLevel === 1 ? 'Beginner' : 
                       skill.requiredLevel === 2 ? 'Basic' :
                       skill.requiredLevel === 3 ? 'Intermediate' :
                       skill.requiredLevel === 4 ? 'Advanced' : 'Expert'}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">{skill.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-green-800 mb-1">Recommended Courses</h5>
                        <ul className="space-y-1">
                          {skill.resources?.courses.map((course, cIdx) => (
                            <li key={cIdx} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={course.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {course.title} ({course.platform})
                              </a>
                            </li>
                          )) || (
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={`https://www.coursera.org/search?query=${encodeURIComponent(skill.name)}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                Coursera Courses
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-green-800 mb-1">Practice & Projects</h5>
                        <ul className="space-y-1">
                          {skill.resources?.tutorials.map((tutorial, tIdx) => (
                            <li key={tIdx} className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={tutorial.url} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                {tutorial.title} ({tutorial.platform})
                              </a>
                            </li>
                          )) || (
                            <li className="flex items-start">
                              <span className="text-green-600 mr-2">•</span>
                              <a 
                                href={`https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skill.name)}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                Udemy Tutorials
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium text-green-800 mb-1">Learning Communities</h5>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <a 
                              href={`https://www.reddit.com/search/?q=${encodeURIComponent(skill.name)}%20learning`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Reddit Communities
                            </a>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            <a 
                              href={`https://discord.com/servers?search=${encodeURIComponent(skill.name)}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              Discord Learning Groups
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {skillsGap.length > 4 && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  {skillsGap.slice(4, 6).map((skill, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {skill.currentLevel === 1 ? 'Beginner' : 
                         skill.currentLevel === 2 ? 'Basic' :
                         skill.currentLevel === 3 ? 'Intermediate' :
                         skill.currentLevel === 4 ? 'Advanced' : 'Expert'} → {
                         skill.requiredLevel === 1 ? 'Beginner' : 
                         skill.requiredLevel === 2 ? 'Basic' :
                         skill.requiredLevel === 3 ? 'Intermediate' :
                         skill.requiredLevel === 4 ? 'Advanced' : 'Expert'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {skill.resources?.courses.slice(0, 1).map((course, cIdx) => (
                          <a 
                            key={cIdx}
                            href={course.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100"
                          >
                            {course.platform} Courses
                          </a>
                        ))}
                        
                        {skill.resources?.tutorials.slice(0, 1).map((tutorial, tIdx) => (
                          <a 
                            key={tIdx}
                            href={tutorial.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100"
                          >
                            {tutorial.platform}
                          </a>
                        ))}
                        
                        <a 
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill.name)}+tutorial+beginner`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100"
                        >
                          YouTube
                        </a>
                        
                        <a 
                          href={`https://github.com/topics/${encodeURIComponent(skill.name.toLowerCase().replace(/ /g, '-'))}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-gray-100"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-6 bg-white rounded-lg p-4 border border-green-100">
                <h4 className="font-medium text-green-800 mb-3">Learning Path Strategy</h4>
                <div className="flex">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Focus on your highest gap skills first</strong> - Begin with {
                      skillsGap.length > 0 ? skillsGap.sort((a, b) => b.gap - a.gap)[0].name : 'core skills'
                    } to build a strong foundation for your career transition.
                  </p>
                </div>
                <div className="flex mt-2">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Apply as you learn</strong> - For each skill, complete at least one project to reinforce your learning 
                    before moving to the next skill.
                  </p>
                </div>
                <div className="flex mt-2">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Commit to a schedule</strong> - Based on your {userData.timeCommitment || "available time"}, 
                    allocate specific hours each week dedicated to each skill in your learning roadmap.
                  </p>
                </div>
                <div className="flex mt-2">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Join learning communities</strong> - Engage with others learning the same skills to stay motivated
                    and solve problems collaboratively.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {skillsGap.slice(0, 6).map((skill, index) => (
                <SkillLevelChart key={index} skill={skill} />
              ))}
            </div>
            
            {skillsGap.length > 6 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllSkills(prevState => !prevState)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
                >
                  {showAllSkills ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Show Less
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      View All Skills
                    </>
                  )}
                </button>
              </div>
            )}
            
            {showAllSkills && skillsGap.length > 6 && (
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {skillsGap.slice(6).map((skill, index) => (
                  <SkillLevelChart key={index + 6} skill={skill} />
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Transition Timeline */}
        {userData.transitionTimeline && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Your Career Transition Roadmap</h2>
            <div className="mb-6">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Timeline: {userData.transitionTimeline}
                </span>
                {userData.timeCommitment && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Weekly Commitment: {userData.timeCommitment}
                  </span>
                )}
                {userData.workPreference && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Preferred Work: {userData.workPreference}
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                This personalized roadmap is based on your specific circumstances, target career paths, and identified skill gaps.
                Each milestone includes recommended activities aligned with your goals and timeline.
              </p>
              <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-4">
                <div className="flex">
                  <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong className="text-yellow-700">Pro Tip:</strong> Click "Show Details" on each milestone to see specific 
                    activities and objectives. Adjust your pace as needed based on your progress and changing circumstances.
                  </p>
                </div>
              </div>
            </div>
            <TimelineChart milestones={timelineMilestones} />
          </div>
        )}
        
        {/* Market Trends Analysis */}
        {marketTrends.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Market Trends Analysis</h2>
            <p className="text-gray-600 mb-6">
              Current job market trends and salary data for your recommended career paths as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
            </p>
            <MarketTrendsSection marketTrends={marketTrends} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Market Trends Analysis</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-blue-700 font-medium mb-2">Market data not available for this analysis</p>
                  <p className="text-gray-600">
                    For the most current job market insights related to your career path recommendations, 
                    consider reading industry reports or visiting job market websites focused on tech careers.
                    You can also retake the assessment to generate a new analysis that includes market data.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <a 
                  href="https://www.bls.gov/ooh/computer-and-information-technology/home.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-md hover:bg-blue-50"
                >
                  BLS Tech Outlook
                </a>
                <a 
                  href="https://insights.dice.com/tech-job-report/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-md hover:bg-blue-50"
                >
                  Dice Tech Jobs Report
                </a>
                <a 
                  href="https://www.roberthalf.com/us/en/insights/salary-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-blue-700 rounded-md hover:bg-blue-50"
                >
                  Salary Guides
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Networking Strategy */}
        {networkingStrategy.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Networking Strategy</h2>
            <NetworkingStrategySection strategies={networkingStrategy} />
          </div>
        )}
        
        {/* Personal Branding */}
        {personalBranding.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Personal Branding</h2>
            <PersonalBrandingSection tips={personalBranding} />
          </div>
        )}
        
        {/* Interview Preparation */}
        {interviewPrep.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Interview Preparation</h2>
            <InterviewPrepSection tips={interviewPrep} />
          </div>
        )}
        
        {/* Current Tools Proficiency */}
        {userData.toolsUsed && userData.toolsUsed.length > 0 && userData.toolsUsed[0] !== 'None' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Technical Proficiency</h2>
            <ToolsProficiency tools={userData.toolsUsed} />
          </div>
        )}
        
        {/* Complete Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
          <div>
            {formatAnalysisText(analysis)}
          </div>
        </div>

        {/* Next Steps - Dynamic based on user analysis */}
        {nextSteps.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 mt-8">
            <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className={`${step.color} mb-2`}>
                    {step.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
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

      {/* Custom Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={submitFeedback} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How would you rate your experience on our platform on a scale of 1 to 5, with 5 being excellent and 1 being poor?
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleFeedbackChange({ target: { name: 'rating', value: value.toString() } })}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          feedbackData.rating === value.toString()
                            ? 'bg-red-600 text-white border-red-600'
                            : 'border-gray-300 hover:border-red-500'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Improvements */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share any improvement suggestions you have
                  </label>
                  <textarea
                    name="improvements"
                    value={feedbackData.improvements}
                    onChange={handleFeedbackChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
                  >
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
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
