<h3 className="text-xl font-bold mb-4 text-indigo-700">{industry}</h3>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Key Trends</h4>
          <ul className="space-y-1">
            {insights.trends.map((trend, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>{trend}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Essential Skills</h4>
          <div className="flex flex-wrap gap-2">
            {insights.keySkills.map((skill, idx) => (
              <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Industry Challenges</h4>
          <ul className="space-y-1">
            {insights.challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  // Extract data for visualizations
  console.log("Extracting visualization data");
  const careerPaths = extractCareerPaths(analysis);
  const skillsGap = extractSkillsGap(analysis);
  const chartData = careerPaths.map(path => ({
    label: path.title,
    value: path.match
  }));
  const timelineMilestones = createTimelineData();

  // NEW: Extract data for Market Analysis tab
  const careerGrowthMetrics = getCareerGrowthMetrics();
  const aiImpactAnalysis = getAIImpactAnalysis();
  const industryInsights = getIndustryInsights();

  console.log("Rendering dashboard with activeTab:", activeTab);

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
              className="flex items-center justify-center py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
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
                  {userData.careerPathsInterest.slice(0, 3).map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
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
                <p className="text-lg font-semibold">{userData.timeCommitment} per week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'analysis'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Detailed Analysis
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'skills'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Skills Gap
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'market'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Market Analysis
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'roadmap'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Transition Roadmap
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Career Path Matches Visualization */}
                {careerPaths.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Career Path Compatibility</h2>
                    <SimpleBarChart data={chartData} title="Match Percentage by Career Path" />
                  </div>
                )}
                
                {/* Current Tools Proficiency */}
                {userData.toolsUsed && userData.toolsUsed.length > 0 && userData.toolsUsed[0] !== 'None' && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Technical Proficiency</h2>
                    <ToolsProficiency tools={userData.toolsUsed} />
                  </div>
                )}
                
                {/* Next Steps - Dynamic based on user analysis */}
                <div className="bg-blue-50 rounded-lg p-6 mt-8">
                  <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {generateNextSteps().map((step, index) => (
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
              </div>
            )}

            {/* Detailed Analysis Tab */}
            {activeTab === 'analysis' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Detailed Career Analysis</h2>
                <div className="prose max-w-none">
                  {formatAnalysisText(analysis)}
                </div>
              </div>
            )}

            {/* Skills Gap Tab */}
            {activeTab === 'skills' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Skills Gap Analysis</h2>
                <p className="text-gray-600 mb-6">
                  This analysis compares your current skill levels with what's required for your target career paths.
                  Focus on areas with the largest gaps for maximum impact on your transition.
                </p>
                
                {skillsGap.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {skillsGap.map((skill, index) => (
                      <SkillLevelChart key={index} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800">
                    <p>Insufficient data to generate a detailed skills gap analysis. Please update your assessment with more information about your current skills and target career paths.</p>
                  </div>
                )}
              </div>
            )}

            {/* Market Analysis Tab */}
            {activeTab === 'market' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Market Analysis & Future Outlook</h2>
                <p className="text-gray-600 mb-8">
                  Based on your selected career paths and industry preferences, here's an analysis of current market conditions,
                  growth projections, and how AI is expected to impact these fields.
                </p>
                
                {/* Career Growth Metrics */}
                {careerGrowthMetrics.length > 0 && (
                  <MarketGrowthChart careers={careerGrowthMetrics} />
                )}
                
                {/* AI Impact Analysis */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">AI Impact on Your Career Paths</h3>
                  <p className="text-gray-600 mb-4">
                    AI is transforming all technical fields. Here's how it's specifically impacting your chosen career paths
                    and what you can do to stay ahead of these changes.
                  </p>
                  
                  {aiImpactAnalysis.map((careerImpact, careerIndex) => (
                    <div key={careerIndex} className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-indigo-700">{careerImpact.career}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {careerImpact.impacts.map((impact, impactIndex) => (
                          <AIImpactCard 
                            key={impactIndex} 
                            trend={impact.trend}
                            impact={impact.impact}
                            action={impact.action}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Industry Insights */}
                {industryInsights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Industry-Specific Insights</h3>
                    <p className="text-gray-600 mb-4">
                      Analysis of the industries you're interested in, including key trends, required skills, and challenges.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {industryInsights.map((item, index) => (
                        <IndustryInsightsCard 
                          key={index}
                          industry={item.industry}
                          insights={item.insights}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Future Outlook Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Future Outlook Summary</h3>
                  <p className="text-gray-700 mb-4">
                    Based on your selected career paths in {userData.careerPathsInterest.join(', ')}, 
                    the overall market outlook is 
                    <span className="font-bold text-green-700 mx-1">
                      positive
                    </span> 
                    with strong growth projected over the next 5 years.
                  </p>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="font-semibold">• AI Impact:</span> While AI is automating some routine tasks,
                      it's creating more opportunities in these fields than it's eliminating. 
                      Focus on developing skills that complement AI rather than compete with it.
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">• Key Differentiators:</span> Domain expertise from your 
                      background in {userData.studyField || "your field"} will be valuable in your transition, 
                      especially combined with technical skills.
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">• Emerging Opportunities:</span> Look for roles that bridge your 
                      existing {userData.currentRole || "experience"} with your target tech areas, as these hybrid positions 
                      often offer less competition and higher value.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Transition Roadmap Tab */}
            {activeTab === 'roadmap' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Transition Roadmap</h2>
                <p className="text-gray-600 mb-6">
                  Based on your {userData.transitionTimeline} timeline and {userData.timeCommitment} weekly commitment,
                  here's a personalized roadmap to guide your transition into tech.
                </p>
                
                {/* Timeline Chart */}
                <TimelineChart milestones={timelineMilestones} />
                
                {/* Learning Path Recommendation */}
                <div className="mt-8 mb-6">
                  <h3 className="text-xl font-bold mb-4">Recommended Learning Path</h3>
                  <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg text-blue-700">Phase 1: Foundation</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Core concepts in {userData.careerPathsInterest[0] || "your chosen field"}</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Fundamental tools and technologies</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Building your learning environment</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg text-blue-700">Phase 2: Skill Building</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Focused learning in your top skill gaps</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Hands-on projects to build portfolio</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Expanding your technical toolkit</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg text-blue-700">Phase 3: Career Preparation</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Building your professional brand</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Networking and community engagement</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Interview preparation and job search strategy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Resource Recommendations */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Recommended Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Learning Platforms</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Online courses tailored to {userData.careerPathsInterest[0] || "your field"}</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Interactive coding platforms and tutorials</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Specialized learning paths for career changers</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Community & Networking</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Professional communities in your target fields</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Mentorship opportunities for career changers</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Virtual and local tech meetups</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 group"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Custom Feedback Form Modal - Updated to match Google Form */}
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
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:border-blue-500'
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
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

export default CareerDashboard;      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Current Tools & Technologies</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {displayTools.filter(tool => tool !== 'None').map((tool, index) => {
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
        { month: 1, label: 'Start Learning', progress: 20 },
        { month: 3, label: 'Complete Basics', progress: 50 },
        { month: 6, label: 'Job Ready', progress: 100 }
      );
    } else if (months <= 12) {
      milestones.push(
        { month: 2, label: 'Foundation', progress: 20 },
        { month: 4, label: 'Core Skills', progress: 40 },
        { month: 6, label: 'Projects', progress: 60 },
        { month: 9, label: 'Portfolio', progress: 80 },
        { month: 12, label: 'Job Ready', progress: 100 }
      );
    } else {
      milestones.push(
        { month: 3, label: 'Foundation', progress: 15 },
        { month: 6, label: 'Core Skills', progress: 30 },
        { month: 9, label: 'Specialization', progress: 45 },
        { month: 12, label: 'Projects', progress: 60 },
        { month: 15, label: 'Portfolio', progress: 80 },
        { month: 18, label: 'Job Ready', progress: 100 }
      );
    }
    
    return milestones;
  };

  // Custom Timeline Component
  const TimelineChart = ({ milestones }) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Transition Roadmap</h3>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-1 bg-gray-300" />
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-center mb-8">
              <div className={`absolute left-0 w-4 h-4 rounded-full ${
                index === 0 ? 'bg-blue-600' : 'bg-gray-400'
              } -translate-x-1.5`} />
              <div className="ml-8">
                <div className="flex items-center mb-1">
                  <span className="font-semibold">{milestone.label}</span>
                  <span className="ml-2 text-sm text-gray-600">({milestone.month} months)</span>
                </div>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate dynamic next steps based on user data and analysis
  const generateNextSteps = () => {
    const steps = [];
    
    // Based on experience level
    if (userData.experienceLevel === 'Complete beginner' || userData.experienceLevel === 'Some exposure') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        color: 'text-blue-600',
        title: 'Start with Fundamentals',
        description: getBeginnerLearningPath()
      });
    }
    
    // Based on career path interests
    if (userData.careerPathsInterest.includes('Software Development')) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
        color: 'text-indigo-600',
        title: 'Practice Coding Daily',
        description: 'Start with LeetCode or HackerRank exercises'
      });
    }
    
    if (userData.careerPathsInterest.includes('Data Analysis/Science')) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        color: 'text-green-600',
        title: 'Learn Data Visualization',
        description: 'Master Python libraries like Pandas and Matplotlib'
      });
    }
    
    // Based on timeline
    if (userData.transitionTimeline === 'Less than 6 months') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        color: 'text-yellow-600',
        title: 'Accelerated Learning Plan',
        description: 'Focus on bootcamps or intensive courses'
      });
    }
    
    // Based on skills gap
    const hasLargeSkillGap = skillsGap.some(skill => skill.gap > 2);
    if (hasLargeSkillGap) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        color: 'text-red-600',
        title: 'Bridge Skill Gaps',
        description: `Focus on: ${getTopSkillGaps()}`
      });
    }
    
    // Based on current role
    if (userData.currentRole && userData.currentRole !== 'Not specified') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: 'text-purple-600',
        title: 'Leverage Current Experience',
        description: `Apply your ${userData.currentRole} skills to tech projects`
      });
    }
    
    // Always include networking if not already added
    const hasNetworking = steps.some(step => step.title.includes('Network'));
    if (!hasNetworking) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        color: 'text-gray-600',
        title: 'Build Professional Network',
        description: 'Join tech meetups and online communities'
      });
    }
    
    // Return top 3-4 most relevant steps
    return steps.slice(0, 4);
  };

  // Helper functions for generating specific content
  const getBeginnerLearningPath = () => {
    const paths = userData.careerPathsInterest;
    if (paths.includes('Software Development')) {
      return 'Start with HTML, CSS, and JavaScript basics';
    } else if (paths.includes('Data Analysis/Science')) {
      return 'Begin with Python fundamentals and statistics';
    } else if (paths.includes('UX/UI Design')) {
      return 'Learn design principles and Figma basics';
    } else if (paths.includes('Cybersecurity')) {
      return 'Start with networking and security fundamentals';
    }
    return 'Begin with computer science fundamentals';
  };

  const getTopSkillGaps = () => {
    const topGaps = skillsGap
      .filter(skill => skill.gap > 2)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3)
      .map(skill => skill.name);
    
    return topGaps.join(', ') || 'Key technical skills';
  };

  // NEW: Get career growth metrics based on career interests
  const getCareerGrowthMetrics = () => {
    const careerGrowthData = {
      'Software Development': {
        growthRate: '22%',
        medianSalary: '$110,000',
        jobPostings: '245,000+',
        hotSkills: ['JavaScript', 'React', 'Cloud Services', 'DevOps'],
        aiImpact: 'Medium - High',
        futureOutlook: 'Strong positive growth despite AI advancements. Focus on understanding AI integration and tools.'
      },
      'Data Analysis/Science': {
        growthRate: '36%',
        medianSalary: '$125,000',
        jobPostings: '165,000+',
        hotSkills: ['Python', 'SQL', 'ML/AI', 'Data Visualization'],
        aiImpact: 'Medium',
        futureOutlook: 'Excellent growth as businesses rely more on data. AI tools are enhancing capabilities rather than replacing analysts.'
      },
      'UX/UI Design': {
        growthRate: '13%',
        medianSalary: '$95,000',
        jobPostings: '85,000+',
        hotSkills: ['Figma', 'User Research', 'Design Systems', 'Prototyping'],
        aiImpact: 'Medium',
        futureOutlook: 'Steady growth with emphasis on accessibility and inclusive design. AI is changing workflows but human-centered design remains essential.'
      },
      'Product Management': {
        growthRate: '10%',
        medianSalary: '$120,000',
        jobPostings: '115,000+',
        hotSkills: ['Agile', 'Data Analysis', 'User Research', 'Strategy'],
        aiImpact: 'Low - Medium',
        futureOutlook: 'Stable growth with increasing emphasis on AI product integration. Strategic thinking remains highly valued.'
      },
      'Cybersecurity': {
        growthRate: '33%',
        medianSalary: '$115,000',
        jobPostings: '90,000+',
        hotSkills: ['Threat Intelligence', 'Cloud Security', 'Incident Response', 'Zero Trust'],
        aiImpact: 'Medium',
        futureOutlook: 'Exceptional growth as security threats evolve. AI both creates new security challenges and helps address them.'
      },
      'Cloud Engineering': {
        growthRate: '25%',
        medianSalary: '$130,000',
        jobPostings: '110,000+',
        hotSkills: ['AWS/Azure/GCP', 'Kubernetes', 'IaC', 'Serverless'],
        aiImpact: 'Medium',
        futureOutlook: 'Strong continued growth as cloud adoption accelerates. AI integration is enhancing cloud capabilities.'
      },
      'DevOps': {
        growthRate: '25%',
        medianSalary: '$125,000',
        jobPostings: '95,000+',
        hotSkills: ['CI/CD', 'Kubernetes', 'Monitoring', 'Infrastructure as Code'],
        aiImpact: 'Medium',
        futureOutlook: 'Robust growth with increasing focus on security (DevSecOps). AI automating routine tasks but creating new opportunities.'
      },
      'AI/Machine Learning': {
        growthRate: '40%',
        medianSalary: '$135,000',
        jobPostings: '75,000+',
        hotSkills: ['Python', 'Deep Learning', 'MLOps', 'Large Language Models'],
        aiImpact: 'High',
        futureOutlook: 'Explosive growth expected to continue. Focus shifting from model development to integration and responsible AI.'
      },
      'Technical Writing': {
        growthRate: '8%',
        medianSalary: '$78,000',
        jobPostings: '20,000+',
        hotSkills: ['API Documentation', 'UX Writing', 'Developer Experience', 'Content Strategy'],
        aiImpact: 'Medium - High',
        futureOutlook: 'Moderate growth with emphasis on specialized technical domains. AI is changing workflow but not replacing quality content creation.'
      },
      'Quality Assurance': {
        growthRate: '13%',
        medianSalary: '$90,000',
        jobPostings: '50,000+',
        hotSkills: ['Test Automation', 'CI/CD', 'Security Testing', 'Performance Testing'],
        aiImpact: 'Medium',
        futureOutlook: 'Steady growth with focus shifting to automation and integration testing. AI automating routine testing but creating specialization opportunities.'
      },
      'Technical Support': {
        growthRate: '9%',
        medianSalary: '$65,000',
        jobPostings: '100,000+',
        hotSkills: ['Cloud Platforms', 'Automation', 'IT Security', 'Problem Solving'],
        aiImpact: 'Medium - High',
        futureOutlook: 'Moderate growth with substantial transformation. Entry-level positions increasingly automated while complex support and customer success roles grow.'
      }
    };

    // Return data for user's selected career paths or default for Software Development
    let careerPaths = userData.careerPathsInterest;
    if (!careerPaths || careerPaths.length === 0) {
      careerPaths = ['Software Development'];
    }
    
    return careerPaths.map(career => {
      return {
        career,
        metrics: careerGrowthData[career] || {
          growthRate: '20%',
          medianSalary: '$100,000',
          jobPostings: '100,000+',
          hotSkills: ['JavaScript', 'Python', 'Cloud', 'Data Analysis'],
          aiImpact: 'Medium',
          futureOutlook: 'Positive growth trajectory with increasing demand for technical skills'
        }
      };
    });
  };

  // NEW: Get AI impact analysis based on user's career interests
  const getAIImpactAnalysis = () => {
    const aiImpactMap = {
      'Software Development': [
        {
          trend: 'AI-assisted coding',
          impact: 'Productivity boost for developers, with tools like GitHub Copilot and Claude automating routine coding tasks',
          action: 'Learn to effectively prompt and work with AI coding assistants'
        },
        {
          trend: 'Low-code/No-code platforms',
          impact: 'Making basic development accessible to non-developers, shifting focus to complex problem-solving',
          action: 'Focus on architecture, systems design, and integration skills'
        }
      ],
      'Data Analysis/Science': [
        {
          trend: 'Automated data preparation',
          impact: 'AI streamlining data cleaning and feature engineering',
          action: 'Focus on business problem framing and result interpretation'
        },
        {
          trend: 'Accessible ML platforms',
          impact: 'Democratizing basic ML model building',
          action: 'Develop expertise in model evaluation, ethics, and domain-specific applications'
        }
      ],
      'UX/UI Design': [
        {
          trend: 'AI design tools',
          impact: 'Automating aspects of wireframing and visual design',
          action: 'Strengthen research, strategic thinking, and ethical design skills'
        },
        {
          trend: 'Design system automation',
          impact: 'Making consistent implementation easier',
          action: 'Focus on design systems architecture and component thinking'
        }
      ],
      'Product Management': [
        {
          trend: 'AI-powered analytics',
          impact: 'Enhanced data-driven decision making',
          action: 'Develop skills in AI tool selection and integration'
        },
        {
          trend: 'Automated user research',
          impact: 'Faster insights generation',
          action: 'Focus on research design and translating insights to product strategy'
        }
      ],
      'Cybersecurity': [
        {
          trend: 'AI threat detection',
          impact: 'Improved identification of novel threats',
          action: 'Develop skills in AI security system design and configuration'
        },
        {
          trend: 'AI-powered attacks',
          impact: 'More sophisticated phishing and social engineering',
          action: 'Learn adversarial techniques and countermeasures'
        }
      ],
      'Cloud Engineering': [
        {
          trend: 'AI-Ops',
          impact: 'Intelligent infrastructure management and optimization',
          action: 'Focus on integration of AI into cloud architecture'
        },
        {
          trend: 'Serverless AI',
          impact: 'Easier deployment of AI workloads',
          action: 'Develop expertise in AI service orchestration'
        }
      ],
      'DevOps': [
        {
          trend: 'Predictive monitoring',
          impact: 'AI identifying potential system issues before they occur',
          action: 'Learn to implement and tune AI monitoring systems'
        },
        {
          trend: 'Automated deployment optimization',
          impact: 'AI determining optimal deployment strategies',
          action: 'Focus on defining business and technical constraints for AI to optimize within'
        }
      ],
      'AI/Machine Learning': [
        {
          trend: 'AutoML and foundation models',
          impact: 'Simplified model building for standard problems',
          action: 'Specialize in customization, fine-tuning, and responsible AI'
        },
        {
          trend: 'MLOps automation',
          impact: 'Streamlined deployment and monitoring',
          action: 'Develop expertise in evaluation metrics and governance'
        }
      ]
    };

    // Return AI impact data relevant to user's career paths or default
    let careerPaths = userData.careerPathsInterest;
    if (!careerPaths || careerPaths.length === 0) {
      careerPaths = ['Software Development'];
    }
    
    return careerPaths.map(career => {
      return {
        career,
        impacts: aiImpactMap[career] || [
          {
            trend: 'AI automation',
            impact: 'General impact on technical fields',
            action: 'Focus on human-centered skills and AI collaboration'
          },
          {
            trend: 'AI-enhanced tools',
            impact: 'Improved productivity across technical domains',
            action: 'Learn to leverage AI tools as productivity multipliers'
          }
        ]
      };
    });
  };

  // NEW: Industry-specific insights based on user preferences
  const getIndustryInsights = () => {
    const industryInsightsMap = {
      'Healthcare/Medical': {
        trends: [
          'Increased adoption of telehealth and remote monitoring',
          'AI-powered diagnostics and treatment planning',
          'Enhanced health data interoperability'
        ],
        keySkills: ['HIPAA compliance', 'Healthcare data standards', 'Clinical workflows'],
        challenges: ['Regulatory compliance', 'Legacy system integration', 'Patient data privacy']
      },
      'Finance/Fintech': {
        trends: [
          'Expansion of blockchain and cryptocurrency applications',
          'AI-driven financial analysis and risk assessment',
          'Growing focus on financial inclusion through technology'
        ],
        keySkills: ['Financial regulations', 'Security and compliance', 'Payment systems'],
        challenges: ['Strict regulatory environment', 'High security requirements', 'Complex legacy infrastructure']
      },
      'Education': {
        trends: [
          'Growth of personalized and adaptive learning platforms',
          'Expanded use of VR/AR in educational experiences',
          'Data-driven student success initiatives'
        ],
        keySkills: ['LMS integration', 'Accessibility standards', 'Educational technology frameworks'],
        challenges: ['Budget constraints', 'Varied technical literacy', 'Privacy concerns with student data']
      },
      'E-commerce': {
        trends: [
          'AI-powered personalization and recommendation engines',
          'Omnichannel retail experiences',
          'Voice commerce and conversational shopping'
        ],
        keySkills: ['Payment processing', 'Inventory management', 'Consumer behavior analytics'],
        challenges: ['High performance expectations', 'Complex logistics integration', 'Evolving consumer expectations']
      },
      'Entertainment/Media': {
        trends: [
          'Streaming platform consolidation and specialization',
          'AI-generated and enhanced content creation',
          'Growth of interactive and immersive experiences'
        ],
        keySkills: ['Content delivery networks', 'Digital rights management', 'Media formats and standards'],
        challenges: ['High bandwidth requirements', 'Content protection', 'Platform fragmentation']
      },
      'Government': {
        trends: [
          'Digital transformation of citizen services',
          'Focus on cybersecurity and data protection',
          'Smart city initiatives and IoT implementation'
        ],
        keySkills: ['Security clearance requirements', 'Compliance frameworks', 'Procurement processes'],
        challenges: ['Lengthy approval processes', 'Legacy system modernization', 'Strict security requirements']
      }
    };

    // Return industry insights for user's selected industries or default
    let industries = userData.industryPreference
      .filter(industry => industry !== 'No preference' && industry !== 'Other' && industry !== 'Same as current industry');
    
    if (!industries || industries.length === 0) {
      industries = ['Technology'];
    }
    
    return industries.map(industry => {
      return {
        industry,
        insights: industryInsightsMap[industry] || {
          trends: ['Technological innovation', 'Digital transformation', 'AI integration'],
          keySkills: ['Industry-specific knowledge', 'Technical expertise', 'Business acumen'],
          challenges: ['Keeping pace with change', 'Talent acquisition', 'Technical debt']
        }
      };
    });
  };

  // Market Growth Chart Component (for Market Analysis tab)
  const MarketGrowthChart = ({ careers }) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Career Growth Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Career Path</th>
                <th className="py-3 px-4 text-left">Growth Rate</th>
                <th className="py-3 px-4 text-left">Median Salary</th>
                <th className="py-3 px-4 text-left">Job Postings</th>
                <th className="py-3 px-4 text-left">AI Impact</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4 font-medium">{item.career}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className={`mr-2 px-2 py-1 rounded text-xs font-semibold 
                        ${parseFloat(item.metrics.growthRate) > 20 ? 'bg-green-100 text-green-800' : 
                          parseFloat(item.metrics.growthRate) > 10 ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {item.metrics.growthRate}
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            parseFloat(item.metrics.growthRate) > 20 ? 'bg-green-500' : 
                            parseFloat(item.metrics.growthRate) > 10 ? 'bg-blue-500' : 
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(parseFloat(item.metrics.growthRate) * 2.5, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{item.metrics.medianSalary}</td>
                  <td className="py-3 px-4">{item.metrics.jobPostings}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold 
                      ${item.metrics.aiImpact.includes('High') ? 'bg-red-100 text-red-800' : 
                        item.metrics.aiImpact.includes('Medium') ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {item.metrics.aiImpact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // AI Impact Card Component (for Market Analysis tab)
  const AIImpactCard = ({ trend, impact, action }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h4 className="font-semibold text-blue-700 mb-2">{trend}</h4>
        <p className="text-gray-700 mb-3"><strong>Impact:</strong> {impact}</p>
        <p className="text-gray-800 font-medium"><strong>Recommended action:</strong> {action}</p>
      </div>
    );
  };

  // Industry Insights Card Component (for Market Analysis tab)
  const IndustryInsightsCard = ({ industry, insights }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <h3 className="text-xl font-bolimport React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
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
  
  // Changed initial tab to "overview" which should always have content
  const [activeTab, setActiveTab] = useState('overview');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  // Feedback form state
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Loading data from location state or storage");
        if (location.state?.analysis) {
          console.log("Found analysis in location state");
          setAnalysis(location.state.analysis);
          
          if (location.state.formData) {
            console.log("Found form data in location state");
            const formData = location.state.formData;
            
            setUserData({
              name: formData.fullName || 'User',
              email: formData.email || 'Not specified',
              experienceLevel: formData.experienceLevel || 'Beginner',
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
              careerPathsInterest: formData.careerPathsInterest || ['Software Development'],
              toolsUsed: formData.toolsUsed || [],
              techInterests: formData.techInterests || '',
              timeCommitment: formData.timeCommitment || '10-15 hours',
              targetSalary: formData.targetSalary || 'Not specified',
              workPreference: formData.workPreference || 'Flexible',
              transitionTimeline: formData.transitionTimeline || '6-12 months'
            });
          }
        } else {
          console.log("Looking for analysis in storage");
          const storedAnalysis = storageService.getLatestAnalysis();
          if (storedAnalysis) {
            console.log("Found analysis in storage");
            setAnalysis(storedAnalysis.analysis);
            
            const submission = storageService.getSubmissionById(storedAnalysis.submissionId);
            if (submission) {
              console.log("Found submission in storage");
              setUserData({
                name: submission.fullName || 'User',
                email: submission.email || 'Not specified',
                experienceLevel: submission.experienceLevel || 'Beginner',
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
                careerPathsInterest: submission.careerPathsInterest || ['Software Development'],
                toolsUsed: submission.toolsUsed || [],
                techInterests: submission.techInterests || '',
                timeCommitment: submission.timeCommitment || '10-15 hours',
                targetSalary: submission.targetSalary || 'Not specified',
                workPreference: submission.workPreference || 'Flexible',
                transitionTimeline: submission.transitionTimeline || '6-12 months'
              });
            }
          } else {
            console.log("No analysis found, redirecting to test page");
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
        console.log("Data loading complete");
        setLoading(false);
      }
    };
    
    loadData();
  }, [location, navigate]);

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
      // Create FormData and append the feedback entries
      const formData = new FormData();
      
      // Use the actual entry IDs from your Google Form
      formData.append('entry.162050771', feedbackData.rating); // Rating question
      formData.append('entry.2083196363', feedbackData.improvements); // Improvement suggestions
      
      // Submit to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Google Forms requires no-cors
      });
      
      // Show success message
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

  // Extract career paths and their match percentages from analysis text
  const extractCareerPaths = (text) => {
    if (!text) {
      console.log("No analysis text for extracting career paths");
      return [
        { title: "Software Development", match: 85 },
        { title: "Data Analysis/Science", match: 70 }
      ]; // Default values
    }
    
    console.log("Extracting career paths from analysis text");
    const lines = text.split('\n');
    const careerPaths = [];
    
    const careerPathRegex = /^[a-z]\)\s+(.*?)\s+\((\d+)%\s+match/i;
    
    lines.forEach(line => {
      const match = line.match(careerPathRegex);
      if (match) {
        careerPaths.push({
          title: match[1].trim(),
          match: parseInt(match[2], 10)
        });
      }
    });
    
    if (careerPaths.length === 0) {
      console.log("No career paths found in analysis, using defaults");
      return [
        { title: "Software Development", match: 85 },
        { title: "Data Analysis/Science", match: 70 }
      ];
    }
    
    return careerPaths;
  };

  // Extract skills gap data from analysis text
  const extractSkillsGap = (text) => {
    if (!text) {
      console.log("No analysis text for extracting skills gap");
      return generateDefaultSkillsGap();
    }
    
    console.log("Extracting skills gap from analysis text");
    const skills = [];
    const userToolsUsed = userData.toolsUsed || [];
    
    const toolSkillMapping = {
      'VS Code': { name: 'IDE Proficiency', category: 'Development Tools' },
      'GitHub': { name: 'Version Control', category: 'Collaboration Tools' },
      'JavaScript': { name: 'JavaScript Programming', category: 'Programming Languages' },
      'Python': { name: 'Python Programming', category: 'Programming Languages' },
      'React': { name: 'React Framework', category: 'Frontend Frameworks' },
      'Node.js': { name: 'Node.js Runtime', category: 'Backend Technologies' },
      'SQL': { name: 'Database Management', category: 'Database' },
      'AWS': { name: 'Cloud Computing', category: 'Cloud Services' },
      'Docker': { name: 'Containerization', category: 'DevOps' }
    };

    const experienceLevelMap = {
      'Complete beginner': 1,
      'Some exposure': 2,
      'Beginner': 2,
      'Intermediate': 3,
      'Advanced': 4
    };

    const currentLevel = experienceLevelMap[userData.experienceLevel] || 1;

    const lines = text.split('\n');
    let inSkillsGapSection = false;
    
    lines.forEach((line) => {
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        return;
      }
      
      if (line.includes("LEARNING ROADMAP") || line.includes("TRANSITION STRATEGY")) {
        inSkillsGapSection = false;
        return;
      }
      
      if (inSkillsGapSection && line.match(/^\d+\.\s+/)) {
        const skillMatch = line.match(/^\d+\.\s+([^:]+):\s*(.+)/);
        
        if (skillMatch) {
          const skillName = skillMatch[1].trim();
          const description = skillMatch[2].trim();
          
          let userCurrentLevel = currentLevel;
          
          userToolsUsed.forEach(tool => {
            const mapping = toolSkillMapping[tool];
            if (mapping && skillName.toLowerCase().includes(mapping.name.toLowerCase())) {
              userCurrentLevel = Math.min(currentLevel + 1, 5);
            }
          });
          
          let requiredLevel = 4;
          const descLower = description.toLowerCase();
          
          if (descLower.includes('basic') || descLower.includes('fundamental')) {
            requiredLevel = 2;
          } else if (descLower.includes('intermediate') || descLower.includes('solid')) {
            requiredLevel = 3;
          } else if (descLower.includes('advanced') || descLower.includes('deep')) {
            requiredLevel = 4;
          } else if (descLower.includes('expert') || descLower.includes('mastery')) {
            requiredLevel = 5;
          }
          
          skills.push({
            name: skillName,
            description: description,
            currentLevel: userCurrentLevel,
            requiredLevel: requiredLevel,
            gap: requiredLevel - userCurrentLevel
          });
        }
      }
    });
    
    if (skills.length === 0) {
      console.log("No skills gap found in analysis, generating from user data");
      return generateDefaultSkillsGap();
    }
    
    return skills;
  };

  // Generate default skills gap when analysis doesn't provide any
  const generateDefaultSkillsGap = () => {
    console.log("Generating default skills gap based on career interests");
    const skills = [];
    const userCareerPaths = userData.careerPathsInterest || ['Software Development'];
    const experienceLevelMap = {
      'Complete beginner': 1,
      'Some exposure': 2,
      'Beginner': 2,
      'Intermediate': 3,
      'Advanced': 4
    };
    const currentLevel = experienceLevelMap[userData.experienceLevel] || 1;
    
    const defaultSkillsByPath = {
      'Software Development': [
        { name: 'Programming Fundamentals', description: 'Core concepts of programming logic, data structures, and algorithms', requiredLevel: 3 },
        { name: 'JavaScript', description: 'Modern JavaScript for web development', requiredLevel: 4 },
        { name: 'Version Control', description: 'Git workflow and collaboration tools', requiredLevel: 3 },
        { name: 'Web Development', description: 'HTML, CSS, and responsive design principles', requiredLevel: 3 }
      ],
      'Data Analysis/Science': [
        { name: 'Statistics', description: 'Statistical analysis methods and interpretation', requiredLevel: 4 },
        { name: 'Python', description: 'Python programming for data analysis', requiredLevel: 4 },
        { name: 'Data Visualization', description: 'Creating clear and informative data visualizations', requiredLevel: 3 },
        { name: 'SQL', description: 'Database querying and data extraction', requiredLevel: 3 }
      ],
      'UX/UI Design': [
        { name: 'Design Principles', description: 'Core visual and interactive design concepts', requiredLevel: 4 },
        { name: 'User Research', description: 'Understanding user needs and behaviors', requiredLevel: 3 },
        { name: 'Prototyping', description: 'Creating interactive prototypes', requiredLevel: 3 },
        { name: 'Design Tools', description: 'Proficiency with industry standard design software', requiredLevel: 3 }
      ],
      'Product Management': [
        { name: 'Product Strategy', description: 'Defining product vision and roadmap', requiredLevel: 4 },
        { name: 'User Research', description: 'Understanding user needs and market fit', requiredLevel: 3 },
        { name: 'Agile Methods', description: 'Managing product development in agile environments', requiredLevel: 3 },
        { name: 'Analytics', description: 'Using data to drive product decisions', requiredLevel: 3 }
      ],
      'Cybersecurity': [
        { name: 'Network Security', description: 'Securing network infrastructure and detecting threats', requiredLevel: 4 },
        { name: 'Security Tools', description: 'Proficiency with security analysis tools', requiredLevel: 3 },
        { name: 'Ethical Hacking', description: 'Identifying vulnerabilities through penetration testing', requiredLevel: 3 },
        { name: 'Security Compliance', description: 'Understanding regulatory requirements and frameworks', requiredLevel: 3 }
      ],
      'Cloud Engineering': [
        { name: 'Cloud Platforms', description: 'Working with major cloud providers (AWS/Azure/GCP)', requiredLevel: 4 },
        { name: 'Infrastructure as Code', description: 'Automating infrastructure provisioning', requiredLevel: 3 },
        { name: 'Containerization', description: 'Working with Docker and container orchestration', requiredLevel: 3 },
        { name: 'Networking', description: 'Understanding cloud networking concepts', requiredLevel: 3 }
      ],
      'DevOps': [
        { name: 'CI/CD', description: 'Building and maintaining continuous integration pipelines', requiredLevel: 4 },
        { name: 'Infrastructure as Code', description: 'Managing infrastructure through code', requiredLevel: 3 },
        { name: 'Monitoring', description: 'Setting up system monitoring and alerting', requiredLevel: 3 },
        { name: 'Containerization', description: 'Working with container technologies', requiredLevel: 3 }
      ],
      'AI/Machine Learning': [
        { name: 'Mathematics', description: 'Understanding the math behind ML algorithms', requiredLevel: 4 },
        { name: 'Python Programming', description: 'Python and key ML libraries', requiredLevel: 4 },
        { name: 'Machine Learning Concepts', description: 'Core ML algorithms and approaches', requiredLevel: 3 },
        { name: 'Data Processing', description: 'Data preparation and feature engineering', requiredLevel: 3 }
      ]
    };
    
    userCareerPaths.forEach(path => {
      const pathSkills = defaultSkillsByPath[path] || defaultSkillsByPath['Software Development'];
      pathSkills.forEach(skill => {
        skills.push({
          name: skill.name,
          description: skill.description,
          currentLevel: currentLevel,
          requiredLevel: skill.requiredLevel,
          gap: skill.requiredLevel - currentLevel,
          careerPath: path
        });
      });
    });
    
    return skills;
  };

  // Format analysis text for display
  const formatAnalysisText = (text) => {
    if (!text) {
      console.log("No analysis text to format, using default");
      return [
        <h3 key="default-header" className="text-xl font-bold mt-8 mb-4 text-blue-800">
          Career Analysis Summary
        </h3>,
        <p key="default-para" className="mb-3 text-gray-900">
          Based on your background in {userData.studyField || "your field"} and interest in {userData.careerPathsInterest.join(', ') || "technology"}, 
          we recommend focusing on building foundational technical skills while leveraging your existing expertise in {userData.currentRole || "your current role"}.
        </p>
      ];
    }
    
    console.log("Formatting analysis text");
    const lines = text.split('\n');
    let formattedContent = [];
    let inSkillsGapSection = false;

    const processContent = (content) => {
      content = content.replace(/\btheir\b/gi, 'your');
      content = content.replace(/\bthey\b/gi, 'you');
      content = content.replace(/\bthem\b/gi, 'you');
      content = content.replace(/\bthemselves\b/gi, 'yourself');
      
      if (userData.educationLevel && userData.educationLevel !== 'Not specified') {
        const educationTerms = [userData.educationLevel, userData.studyField].filter(Boolean);
        educationTerms.forEach(term => {
          if (term && term.length > 3) {
            const regex = new RegExp(`(${term})`, 'gi');
            content = content.replace(regex, '<strong class="text-blue-700">$1</strong>');
          }
        });
      }
      
      if (userData.currentRole && userData.currentRole !== 'Not specified') {
        const regex = new RegExp(`(${userData.currentRole})`, 'gi');
        content = content.replace(regex, '<strong class="text-purple-700">$1</strong>');
      }
      
      return { __html: content };
    };

    lines.forEach((line, index) => {
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
        return;
      }
      
      if (line.includes("LEARNING ROADMAP") || line.includes("TRANSITION STRATEGY")) {
        inSkillsGapSection = false;
      }

      if (inSkillsGapSection && line.match(/^\d+\.\s+/) && line.includes(':')) {
        return;
      }

      if (line.match(/^\d+\.\s+[A-Z]/)) {
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
      }
      else if (line.match(/^[a-z]\)\s+.*?\(\d+%\s+match/i)) {
        formattedContent.push(
          <h4 key={`subheader-${index}`} className="text-lg font-semibold mt-6 mb-2 text-blue-700">
            {line}
          </h4>
        );
      }
      else if (line.trim().startsWith('-')) {
        const content = line.replace(/^-\s+/, '');
        formattedContent.push(
          <div key={`bullet-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      else if (line.trim().match(/^\d+\.\s+/)) {
        const content = line.replace(/^\d+\.\s+/, '');
        formattedContent.push(
          <div key={`numbered-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      else if (line.trim().match(/^Month\s+\d+-?\d*:/i)) {
        formattedContent.push(
          <h5 key={`month-${index}`} className="font-semibold mt-4 mb-2 text-blue-600 ml-4">
            {line}
          </h5>
        );
      }
      else if (line.trim() === '') {
        formattedContent.push(<br key={`break-${index}`} />);
      }
      else {
        formattedContent.push(
          <p key={`text-${index}`} className="mb-3 text-gray-900" dangerouslySetInnerHTML={processContent(line)} />
        );
      }
    });

    if (formattedContent.length === 0) {
      console.log("No formatted content generated, adding default content");
      formattedContent = [
        <h3 key="default-header" className="text-xl font-bold mt-8 mb-4 text-blue-800">
          Career Analysis Summary
        </h3>,
        <p key="default-para" className="mb-3 text-gray-900">
          Based on your background in {userData.studyField || "your field"} and interest in {userData.careerPathsInterest.join(', ') || "technology"}, 
          we recommend focusing on building foundational technical skills while leveraging your existing expertise in {userData.currentRole || "your current role"}.
        </p>
      ];
    }

    return formattedContent;
  };

  // Custom Simple Bar Chart Component
  const SimpleBarChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-blue-600' : 
                    index === 1 ? 'bg-green-500' : 
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-orange-500' :
                    'bg-pink-500'
                  }`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Custom Skill Level Chart Component
  const SkillLevelChart = ({ skill }) => {
    const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-lg">{skill.name}</h4>
          {skill.gap > 0 && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              skill.gap > 2 ? 'bg-red-100 text-red-700' : 
              skill.gap === 2 ? 'bg-yellow-100 text-yellow-700' : 
              'bg-green-100 text-green-700'
            }`}>
              Gap: {skill.gap} {skill.gap === 1 ? 'level' : 'levels'}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-5 gap-1 mb-3">
          {levels.map((level, index) => (
            <div key={index} className="relative">
              <div className={`h-8 rounded ${
                index < skill.currentLevel ? levelColors[index] : 'bg-gray-300'
              } ${index < skill.requiredLevel ? 'opacity-100' : 'opacity-30'}`}>
                {index < skill.requiredLevel && index >= skill.currentLevel && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Need</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-1">{level}</p>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current: {levels[Math.max(0, skill.currentLevel - 1)]}</span>
          <span className="text-blue-600 font-medium">Target: {levels[Math.max(0, skill.requiredLevel - 1)]}</span>
        </div>
        
        {skill.description && (
          <p className="text-sm text-gray-700 mt-3">{skill.description}</p>
        )}
      </div>
    );
  };

  // Custom Tools Proficiency Component
  const ToolsProficiency = ({ tools }) => {
    const experienceMultiplier = {
      'Complete beginner': 0.5,
      'Some exposure': 0.7,
      'Beginner': 0.8,
      'Intermediate': 1,
      'Advanced': 1.2
    };

    const toolProficiencyMap = {
      'VS Code': 3,
      'GitHub': 3,
      'JavaScript': 4,
      'Python': 4,
      'React': 4,
      'Node.js': 4,
      'SQL': 3,
      'AWS': 5,
      'Docker': 4
    };

    const multiplier = experienceMultiplier[userData.experienceLevel] || 1;
    
    // Ensure we have at least one tool to display
    const displayTools = tools && tools.length > 0 && tools[0] !== 'None' 
      ? tools 
      : ['VS Code', 'JavaScript'];
    
    return (
      <div classNameimport React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import storageService from '../../services/storageService';
import { toast } from 'react-toastify';

const CareerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState('');
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
  
  // Updated to include new tab options
  const [activeTab, setActiveTab] = useState('analysis');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  // Feedback form state - Updated to match Google Form
  const [feedbackData, setFeedbackData] = useState({
    rating: '',
    improvements: ''
  });
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeX9C7YtHTSBy4COsV6KaogdEvrjXoVQ0O2psoyfs1xqrySNg/formResponse';

  useEffect(() => {
    const loadData = async () => {
      try {
        if (location.state?.analysis) {
          setAnalysis(location.state.analysis);
          
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
            setAnalysis(storedAnalysis.analysis);
            
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

  // Handle feedback form changes
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit feedback to Google Form - Updated with actual entry IDs
  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    
    try {
      // Create FormData and append the feedback entries
      const formData = new FormData();
      
      // Use the actual entry IDs from your Google Form
      formData.append('entry.162050771', feedbackData.rating); // Rating question
      formData.append('entry.2083196363', feedbackData.improvements); // Improvement suggestions
      
      // Submit to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' // Google Forms requires no-cors
      });
      
      // Show success message
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

  // Extract career paths and their match percentages from analysis text
  const extractCareerPaths = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    const careerPaths = [];
    
    const careerPathRegex = /^[a-z]\)\s+(.*?)\s+\((\d+)%\s+match/i;
    
    lines.forEach(line => {
      const match = line.match(careerPathRegex);
      if (match) {
        careerPaths.push({
          title: match[1].trim(),
          match: parseInt(match[2], 10)
        });
      }
    });
    
    return careerPaths;
  };

  // Extract skills gap data from analysis text
  const extractSkillsGap = (text) => {
    if (!text) return [];
    
    const skills = [];
    const userToolsUsed = userData.toolsUsed || [];
    
    const toolSkillMapping = {
      'VS Code': { name: 'IDE Proficiency', category: 'Development Tools' },
      'GitHub': { name: 'Version Control', category: 'Collaboration Tools' },
      'JavaScript': { name: 'JavaScript Programming', category: 'Programming Languages' },
      'Python': { name: 'Python Programming', category: 'Programming Languages' },
      'React': { name: 'React Framework', category: 'Frontend Frameworks' },
      'Node.js': { name: 'Node.js Runtime', category: 'Backend Technologies' },
      'SQL': { name: 'Database Management', category: 'Database' },
      'AWS': { name: 'Cloud Computing', category: 'Cloud Services' },
      'Docker': { name: 'Containerization', category: 'DevOps' }
    };

    const experienceLevelMap = {
      'Complete beginner': 1,
      'Some exposure': 2,
      'Beginner': 2,
      'Intermediate': 3,
      'Advanced': 4
    };

    const currentLevel = experienceLevelMap[userData.experienceLevel] || 1;

    const lines = text.split('\n');
    let inSkillsGapSection = false;
    
    lines.forEach((line) => {
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        return;
      }
      
      if (line.includes("LEARNING ROADMAP") || line.includes("TRANSITION STRATEGY")) {
        inSkillsGapSection = false;
        return;
      }
      
      if (inSkillsGapSection && line.match(/^\d+\.\s+/)) {
        const skillMatch = line.match(/^\d+\.\s+([^:]+):\s*(.+)/);
        
        if (skillMatch) {
          const skillName = skillMatch[1].trim();
          const description = skillMatch[2].trim();
          
          let userCurrentLevel = currentLevel;
          
          userToolsUsed.forEach(tool => {
            const mapping = toolSkillMapping[tool];
            if (mapping && skillName.toLowerCase().includes(mapping.name.toLowerCase())) {
              userCurrentLevel = Math.min(currentLevel + 1, 5);
            }
          });
          
          let requiredLevel = 4;
          const descLower = description.toLowerCase();
          
          if (descLower.includes('basic') || descLower.includes('fundamental')) {
            requiredLevel = 2;
          } else if (descLower.includes('intermediate') || descLower.includes('solid')) {
            requiredLevel = 3;
          } else if (descLower.includes('advanced') || descLower.includes('deep')) {
            requiredLevel = 4;
          } else if (descLower.includes('expert') || descLower.includes('mastery')) {
            requiredLevel = 5;
          }
          
          skills.push({
            name: skillName,
            description: description,
            currentLevel: userCurrentLevel,
            requiredLevel: requiredLevel,
            gap: requiredLevel - userCurrentLevel
          });
        }
      }
    });
    
    if (skills.length === 0 && userData.careerPathsInterest.length > 0) {
      const defaultSkillsByPath = {
        'Software Development': ['Programming', 'Problem Solving', 'System Design', 'Testing'],
        'Data Analysis/Science': ['Statistics', 'Data Visualization', 'SQL', 'Python'],
        'UX/UI Design': ['Design Principles', 'Prototyping', 'User Research', 'Design Tools'],
        'Product Management': ['Product Strategy', 'Analytics', 'Communication', 'Agile Methods'],
        'Cybersecurity': ['Network Security', 'Ethical Hacking', 'Security Tools', 'Compliance'],
        'Cloud Engineering': ['Cloud Platforms', 'Infrastructure', 'Automation', 'Monitoring'],
        'DevOps': ['CI/CD', 'Automation', 'Infrastructure as Code', 'Containerization'],
        'AI/Machine Learning': ['Mathematics', 'ML Algorithms', 'Data Processing', 'Deep Learning']
      };
      
      userData.careerPathsInterest.forEach(path => {
        const pathSkills = defaultSkillsByPath[path] || [];
        pathSkills.forEach(skill => {
          skills.push({
            name: skill,
            currentLevel: currentLevel,
            requiredLevel: 4,
            gap: 4 - currentLevel,
            careerPath: path
          });
        });
      });
    }
    
    return skills;
  };

  // Format analysis text for display
  const formatAnalysisText = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n');
    let formattedContent = [];
    let inSkillsGapSection = false;

    const processContent = (content) => {
      content = content.replace(/\btheir\b/gi, 'your');
      content = content.replace(/\bthey\b/gi, 'you');
      content = content.replace(/\bthem\b/gi, 'you');
      content = content.replace(/\bthemselves\b/gi, 'yourself');
      
      if (userData.educationLevel && userData.educationLevel !== 'Not specified') {
        const educationTerms = [userData.educationLevel, userData.studyField].filter(Boolean);
        educationTerms.forEach(term => {
          if (term && term.length > 3) {
            const regex = new RegExp(`(${term})`, 'gi');
            content = content.replace(regex, '<strong class="text-blue-700">$1</strong>');
          }
        });
      }
      
      if (userData.currentRole && userData.currentRole !== 'Not specified') {
        const regex = new RegExp(`(${userData.currentRole})`, 'gi');
        content = content.replace(regex, '<strong class="text-purple-700">$1</strong>');
      }
      
      return { __html: content };
    };

    lines.forEach((line, index) => {
      if (line.includes("SKILLS GAP ANALYSIS")) {
        inSkillsGapSection = true;
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
        return;
      }
      
      if (line.includes("LEARNING ROADMAP") || line.includes("TRANSITION STRATEGY")) {
        inSkillsGapSection = false;
      }

      if (inSkillsGapSection && line.match(/^\d+\.\s+/) && line.includes(':')) {
        return;
      }

      if (line.match(/^\d+\.\s+[A-Z]/)) {
        formattedContent.push(
          <h3 key={`header-${index}`} className="text-xl font-bold mt-8 mb-4 text-blue-800">
            {line}
          </h3>
        );
      }
      else if (line.match(/^[a-z]\)\s+.*?\(\d+%\s+match/i)) {
        formattedContent.push(
          <h4 key={`subheader-${index}`} className="text-lg font-semibold mt-6 mb-2 text-blue-700">
            {line}
          </h4>
        );
      }
      else if (line.trim().startsWith('-')) {
        const content = line.replace(/^-\s+/, '');
        formattedContent.push(
          <div key={`bullet-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      else if (line.trim().match(/^\d+\.\s+/)) {
        const content = line.replace(/^\d+\.\s+/, '');
        formattedContent.push(
          <div key={`numbered-${index}`} className="flex items-start mb-3">
            <span className="text-blue-600 mr-2">•</span>
            <p dangerouslySetInnerHTML={processContent(content)} />
          </div>
        );
      }
      else if (line.trim().match(/^Month\s+\d+-?\d*:/i)) {
        formattedContent.push(
          <h5 key={`month-${index}`} className="font-semibold mt-4 mb-2 text-blue-600 ml-4">
            {line}
          </h5>
        );
      }
      else if (line.trim() === '') {
        formattedContent.push(<br key={`break-${index}`} />);
      }
      else {
        formattedContent.push(
          <p key={`text-${index}`} className="mb-3 text-gray-900" dangerouslySetInnerHTML={processContent(line)} />
        );
      }
    });

    return formattedContent;
  };

  // Custom Simple Bar Chart Component
  const SimpleBarChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-gray-600">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8 relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-blue-600' : 
                    index === 1 ? 'bg-green-500' : 
                    index === 2 ? 'bg-purple-500' :
                    index === 3 ? 'bg-orange-500' :
                    'bg-pink-500'
                  }`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Custom Skill Level Chart Component
  const SkillLevelChart = ({ skill }) => {
    const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-start mb-3">
          <h4 className="font-semibold text-lg">{skill.name}</h4>
          {skill.gap > 0 && (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              skill.gap > 2 ? 'bg-red-100 text-red-700' : 
              skill.gap === 2 ? 'bg-yellow-100 text-yellow-700' : 
              'bg-green-100 text-green-700'
            }`}>
              Gap: {skill.gap} {skill.gap === 1 ? 'level' : 'levels'}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-5 gap-1 mb-3">
          {levels.map((level, index) => (
            <div key={index} className="relative">
              <div className={`h-8 rounded ${
                index < skill.currentLevel ? levelColors[index] : 'bg-gray-300'
              } ${index < skill.requiredLevel ? 'opacity-100' : 'opacity-30'}`}>
                {index < skill.requiredLevel && index >= skill.currentLevel && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">Need</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-1">{level}</p>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Current: {levels[Math.max(0, skill.currentLevel - 1)]}</span>
          <span className="text-blue-600 font-medium">Target: {levels[Math.max(0, skill.requiredLevel - 1)]}</span>
        </div>
        
        {skill.description && (
          <p className="text-sm text-gray-700 mt-3">{skill.description}</p>
        )}
      </div>
    );
  };

  // Custom Tools Proficiency Component
  const ToolsProficiency = ({ tools }) => {
    const experienceMultiplier = {
      'Complete beginner': 0.5,
      'Some exposure': 0.7,
      'Beginner': 0.8,
      'Intermediate': 1,
      'Advanced': 1.2
    };

    const toolProficiencyMap = {
      'VS Code': 3,
      'GitHub': 3,
      'JavaScript': 4,
      'Python': 4,
      'React': 4,
      'Node.js': 4,
      'SQL': 3,
      'AWS': 5,
      'Docker': 4
    };

    const multiplier = experienceMultiplier[userData.experienceLevel] || 1;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Current Tools & Technologies</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {tools.filter(tool => tool !== 'None').map((tool, index) => {
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
        { month: 1, label: 'Start Learning', progress: 20 },
        { month: 3, label: 'Complete Basics', progress: 50 },
        { month: 6, label: 'Job Ready', progress: 100 }
      );
    } else if (months <= 12) {
      milestones.push(
        { month: 2, label: 'Foundation', progress: 20 },
        { month: 4, label: 'Core Skills', progress: 40 },
        { month: 6, label: 'Projects', progress: 60 },
        { month: 9, label: 'Portfolio', progress: 80 },
        { month: 12, label: 'Job Ready', progress: 100 }
      );
    } else {
      milestones.push(
        { month: 3, label: 'Foundation', progress: 15 },
        { month: 6, label: 'Core Skills', progress: 30 },
        { month: 9, label: 'Specialization', progress: 45 },
        { month: 12, label: 'Projects', progress: 60 },
        { month: 15, label: 'Portfolio', progress: 80 },
        { month: 18, label: 'Job Ready', progress: 100 }
      );
    }
    
    return milestones;
  };

  // Custom Timeline Component
  const TimelineChart = ({ milestones }) => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Transition Roadmap</h3>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-1 bg-gray-300" />
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-center mb-8">
              <div className={`absolute left-0 w-4 h-4 rounded-full ${
                index === 0 ? 'bg-blue-600' : 'bg-gray-400'
              } -translate-x-1.5`} />
              <div className="ml-8">
                <div className="flex items-center mb-1">
                  <span className="font-semibold">{milestone.label}</span>
                  <span className="ml-2 text-sm text-gray-600">({milestone.month} months)</span>
                </div>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate dynamic next steps based on user data and analysis
  const generateNextSteps = () => {
    const steps = [];
    
    // Based on experience level
    if (userData.experienceLevel === 'Complete beginner' || userData.experienceLevel === 'Some exposure') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        color: 'text-blue-600',
        title: 'Start with Fundamentals',
        description: getBeginnerLearningPath()
      });
    }
    
    // Based on career path interests
    if (userData.careerPathsInterest.includes('Software Development')) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
        color: 'text-indigo-600',
        title: 'Practice Coding Daily',
        description: 'Start with LeetCode or HackerRank exercises'
      });
    }
    
    if (userData.careerPathsInterest.includes('Data Analysis/Science')) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        color: 'text-green-600',
        title: 'Learn Data Visualization',
        description: 'Master Python libraries like Pandas and Matplotlib'
      });
    }
    
    // Based on timeline
    if (userData.transitionTimeline === 'Less than 6 months') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
        color: 'text-yellow-600',
        title: 'Accelerated Learning Plan',
        description: 'Focus on bootcamps or intensive courses'
      });
    }
    
    // Based on skills gap
    const hasLargeSkillGap = skillsGap.some(skill => skill.gap > 2);
    if (hasLargeSkillGap) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        ),
        color: 'text-red-600',
        title: 'Bridge Skill Gaps',
        description: `Focus on: ${getTopSkillGaps()}`
      });
    }
    
    // Based on current role
    if (userData.currentRole && userData.currentRole !== 'Not specified') {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        color: 'text-purple-600',
        title: 'Leverage Current Experience',
        description: `Apply your ${userData.currentRole} skills to tech projects`
      });
    }
    
    // Always include networking if not already added
    const hasNetworking = steps.some(step => step.title.includes('Network'));
    if (!hasNetworking) {
      steps.push({
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        color: 'text-gray-600',
        title: 'Build Professional Network',
        description: 'Join tech meetups and online communities'
      });
    }
    
    // Return top 3-4 most relevant steps
    return steps.slice(0, 4);
  };

  // Helper functions for generating specific content
  const getBeginnerLearningPath = () => {
    const paths = userData.careerPathsInterest;
    if (paths.includes('Software Development')) {
      return 'Start with HTML, CSS, and JavaScript basics';
    } else if (paths.includes('Data Analysis/Science')) {
      return 'Begin with Python fundamentals and statistics';
    } else if (paths.includes('UX/UI Design')) {
      return 'Learn design principles and Figma basics';
    } else if (paths.includes('Cybersecurity')) {
      return 'Start with networking and security fundamentals';
    }
    return 'Begin with computer science fundamentals';
  };

  const getTopSkillGaps = () => {
    const topGaps = skillsGap
      .filter(skill => skill.gap > 2)
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 3)
      .map(skill => skill.name);
    
    return topGaps.join(', ') || 'Key technical skills';
  };

  // NEW: Get career growth metrics based on career interests
  const getCareerGrowthMetrics = () => {
    const careerGrowthData = {
      'Software Development': {
        growthRate: '22%',
        medianSalary: '$110,000',
        jobPostings: '245,000+',
        hotSkills: ['JavaScript', 'React', 'Cloud Services', 'DevOps'],
        aiImpact: 'Medium - High',
        futureOutlook: 'Strong positive growth despite AI advancements. Focus on understanding AI integration and tools.'
      },
      'Data Analysis/Science': {
        growthRate: '36%',
        medianSalary: '$125,000',
        jobPostings: '165,000+',
        hotSkills: ['Python', 'SQL', 'ML/AI', 'Data Visualization'],
        aiImpact: 'Medium',
        futureOutlook: 'Excellent growth as businesses rely more on data. AI tools are enhancing capabilities rather than replacing analysts.'
      },
      'UX/UI Design': {
        growthRate: '13%',
        medianSalary: '$95,000',
        jobPostings: '85,000+',
        hotSkills: ['Figma', 'User Research', 'Design Systems', 'Prototyping'],
        aiImpact: 'Medium',
        futureOutlook: 'Steady growth with emphasis on accessibility and inclusive design. AI is changing workflows but human-centered design remains essential.'
      },
      'Product Management': {
        growthRate: '10%',
        medianSalary: '$120,000',
        jobPostings: '115,000+',
        hotSkills: ['Agile', 'Data Analysis', 'User Research', 'Strategy'],
        aiImpact: 'Low - Medium',
        futureOutlook: 'Stable growth with increasing emphasis on AI product integration. Strategic thinking remains highly valued.'
      },
      'Cybersecurity': {
        growthRate: '33%',
        medianSalary: '$115,000',
        jobPostings: '90,000+',
        hotSkills: ['Threat Intelligence', 'Cloud Security', 'Incident Response', 'Zero Trust'],
        aiImpact: 'Medium',
        futureOutlook: 'Exceptional growth as security threats evolve. AI both creates new security challenges and helps address them.'
      },
      'Cloud Engineering': {
        growthRate: '25%',
        medianSalary: '$130,000',
        jobPostings: '110,000+',
        hotSkills: ['AWS/Azure/GCP', 'Kubernetes', 'IaC', 'Serverless'],
        aiImpact: 'Medium',
        futureOutlook: 'Strong continued growth as cloud adoption accelerates. AI integration is enhancing cloud capabilities.'
      },
      'DevOps': {
        growthRate: '25%',
        medianSalary: '$125,000',
        jobPostings: '95,000+',
        hotSkills: ['CI/CD', 'Kubernetes', 'Monitoring', 'Infrastructure as Code'],
        aiImpact: 'Medium',
        futureOutlook: 'Robust growth with increasing focus on security (DevSecOps). AI automating routine tasks but creating new opportunities.'
      },
      'AI/Machine Learning': {
        growthRate: '40%',
        medianSalary: '$135,000',
        jobPostings: '75,000+',
        hotSkills: ['Python', 'Deep Learning', 'MLOps', 'Large Language Models'],
        aiImpact: 'High',
        futureOutlook: 'Explosive growth expected to continue. Focus shifting from model development to integration and responsible AI.'
      },
      'Technical Writing': {
        growthRate: '8%',
        medianSalary: '$78,000',
        jobPostings: '20,000+',
        hotSkills: ['API Documentation', 'UX Writing', 'Developer Experience', 'Content Strategy'],
        aiImpact: 'Medium - High',
        futureOutlook: 'Moderate growth with emphasis on specialized technical domains. AI is changing workflow but not replacing quality content creation.'
      },
      'Quality Assurance': {
        growthRate: '13%',
        medianSalary: '$90,000',
        jobPostings: '50,000+',
        hotSkills: ['Test Automation', 'CI/CD', 'Security Testing', 'Performance Testing'],
        aiImpact: 'Medium',
        futureOutlook: 'Steady growth with focus shifting to automation and integration testing. AI automating routine testing but creating specialization opportunities.'
      },
      'Technical Support': {
        growthRate: '9%',
        medianSalary: '$65,000',
        jobPostings: '100,000+',
        hotSkills: ['Cloud Platforms', 'Automation', 'IT Security', 'Problem Solving'],
        aiImpact: 'Medium - High',
        futureOutlook: 'Moderate growth with substantial transformation. Entry-level positions increasingly automated while complex support and customer success roles grow.'
      }
    };

    // Return data for user's selected career paths
    return userData.careerPathsInterest.map(career => {
      return {
        career,
        metrics: careerGrowthData[career] || {
          growthRate: 'N/A',
          medianSalary: 'N/A',
          jobPostings: 'N/A',
          hotSkills: [],
          aiImpact: 'Unknown',
          futureOutlook: 'Data not available for this career path'
        }
      };
    });
  };

  // NEW: Get AI impact analysis based on user's career interests
  const getAIImpactAnalysis = () => {
    const aiImpactMap = {
      'Software Development': [
        {
          trend: 'AI-assisted coding',
          impact: 'Productivity boost for developers, with tools like GitHub Copilot and Claude automating routine coding tasks',
          action: 'Learn to effectively prompt and work with AI coding assistants'
        },
        {
          trend: 'Low-code/No-code platforms',
          impact: 'Making basic development accessible to non-developers, shifting focus to complex problem-solving',
          action: 'Focus on architecture, systems design, and integration skills'
        }
      ],
      'Data Analysis/Science': [
        {
          trend: 'Automated data preparation',
          impact: 'AI streamlining data cleaning and feature engineering',
          action: 'Focus on business problem framing and result interpretation'
        },
        {
          trend: 'Accessible ML platforms',
          impact: 'Democratizing basic ML model building',
          action: 'Develop expertise in model evaluation, ethics, and domain-specific applications'
        }
      ],
      'UX/UI Design': [
        {
          trend: 'AI design tools',
          impact: 'Automating aspects of wireframing and visual design',
          action: 'Strengthen research, strategic thinking, and ethical design skills'
        },
        {
          trend: 'Design system automation',
          impact: 'Making consistent implementation easier',
          action: 'Focus on design systems architecture and component thinking'
        }
      ],
      'Product Management': [
        {
          trend: 'AI-powered analytics',
          impact: 'Enhanced data-driven decision making',
          action: 'Develop skills in AI tool selection and integration'
        },
        {
          trend: 'Automated user research',
          impact: 'Faster insights generation',
          action: 'Focus on research design and translating insights to product strategy'
        }
      ],
      'Cybersecurity': [
        {
          trend: 'AI threat detection',
          impact: 'Improved identification of novel threats',
          action: 'Develop skills in AI security system design and configuration'
        },
        {
          trend: 'AI-powered attacks',
          impact: 'More sophisticated phishing and social engineering',
          action: 'Learn adversarial techniques and countermeasures'
        }
      ],
      'Cloud Engineering': [
        {
          trend: 'AI-Ops',
          impact: 'Intelligent infrastructure management and optimization',
          action: 'Focus on integration of AI into cloud architecture'
        },
        {
          trend: 'Serverless AI',
          impact: 'Easier deployment of AI workloads',
          action: 'Develop expertise in AI service orchestration'
        }
      ],
      'DevOps': [
        {
          trend: 'Predictive monitoring',
          impact: 'AI identifying potential system issues before they occur',
          action: 'Learn to implement and tune AI monitoring systems'
        },
        {
          trend: 'Automated deployment optimization',
          impact: 'AI determining optimal deployment strategies',
          action: 'Focus on defining business and technical constraints for AI to optimize within'
        }
      ],
      'AI/Machine Learning': [
        {
          trend: 'AutoML and foundation models',
          impact: 'Simplified model building for standard problems',
          action: 'Specialize in customization, fine-tuning, and responsible AI'
        },
        {
          trend: 'MLOps automation',
          impact: 'Streamlined deployment and monitoring',
          action: 'Develop expertise in evaluation metrics and governance'
        }
      ]
    };

    // Return AI impact data relevant to user's career paths
    return userData.careerPathsInterest.map(career => {
      return {
        career,
        impacts: aiImpactMap[career] || [
          {
            trend: 'AI automation',
            impact: 'General impact on technical fields',
            action: 'Focus on human-centered skills and AI collaboration'
          }
        ]
      };
    });
  };

  // NEW: Industry-specific insights based on user preferences
  const getIndustryInsights = () => {
    const industryInsightsMap = {
      'Healthcare/Medical': {
        trends: [
          'Increased adoption of telehealth and remote monitoring',
          'AI-powered diagnostics and treatment planning',
          'Enhanced health data interoperability'
        ],
        keySkills: ['HIPAA compliance', 'Healthcare data standards', 'Clinical workflows'],
        challenges: ['Regulatory compliance', 'Legacy system integration', 'Patient data privacy']
      },
      'Finance/Fintech': {
        trends: [
          'Expansion of blockchain and cryptocurrency applications',
          'AI-driven financial analysis and risk assessment',
          'Growing focus on financial inclusion through technology'
        ],
        keySkills: ['Financial regulations', 'Security and compliance', 'Payment systems'],
        challenges: ['Strict regulatory environment', 'High security requirements', 'Complex legacy infrastructure']
      },
      'Education': {
        trends: [
          'Growth of personalized and adaptive learning platforms',
          'Expanded use of VR/AR in educational experiences',
          'Data-driven student success initiatives'
        ],
        keySkills: ['LMS integration', 'Accessibility standards', 'Educational technology frameworks'],
        challenges: ['Budget constraints', 'Varied technical literacy', 'Privacy concerns with student data']
      },
      'E-commerce': {
        trends: [
          'AI-powered personalization and recommendation engines',
          'Omnichannel retail experiences',
          'Voice commerce and conversational shopping'
        ],
        keySkills: ['Payment processing', 'Inventory management', 'Consumer behavior analytics'],
        challenges: ['High performance expectations', 'Complex logistics integration', 'Evolving consumer expectations']
      },
      'Entertainment/Media': {
        trends: [
          'Streaming platform consolidation and specialization',
          'AI-generated and enhanced content creation',
          'Growth of interactive and immersive experiences'
        ],
        keySkills: ['Content delivery networks', 'Digital rights management', 'Media formats and standards'],
        challenges: ['High bandwidth requirements', 'Content protection', 'Platform fragmentation']
      },
      'Government': {
        trends: [
          'Digital transformation of citizen services',
          'Focus on cybersecurity and data protection',
          'Smart city initiatives and IoT implementation'
        ],
        keySkills: ['Security clearance requirements', 'Compliance frameworks', 'Procurement processes'],
        challenges: ['Lengthy approval processes', 'Legacy system modernization', 'Strict security requirements']
      }
    };

    // Return industry insights for user's selected industries
    return userData.industryPreference
      .filter(industry => industry !== 'No preference' && industry !== 'Other' && industry !== 'Same as current industry')
      .map(industry => {
        return {
          industry,
          insights: industryInsightsMap[industry] || {
            trends: ['Technological innovation', 'Digital transformation', 'AI integration'],
            keySkills: ['Industry-specific knowledge', 'Technical expertise', 'Business acumen'],
            challenges: ['Keeping pace with change', 'Talent acquisition', 'Technical debt']
          }
        };
      });
  };

  // Market Growth Chart Component (for Market Analysis tab)
  const MarketGrowthChart = ({ careers }) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Career Growth Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Career Path</th>
                <th className="py-3 px-4 text-left">Growth Rate</th>
                <th className="py-3 px-4 text-left">Median Salary</th>
                <th className="py-3 px-4 text-left">Job Postings</th>
                <th className="py-3 px-4 text-left">AI Impact</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="py-3 px-4 font-medium">{item.career}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className={`mr-2 px-2 py-1 rounded text-xs font-semibold 
                        ${parseFloat(item.metrics.growthRate) > 20 ? 'bg-green-100 text-green-800' : 
                          parseFloat(item.metrics.growthRate) > 10 ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {item.metrics.growthRate}
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            parseFloat(item.metrics.growthRate) > 20 ? 'bg-green-500' : 
                            parseFloat(item.metrics.growthRate) > 10 ? 'bg-blue-500' : 
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(parseFloat(item.metrics.growthRate) * 2.5, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{item.metrics.medianSalary}</td>
                  <td className="py-3 px-4">{item.metrics.jobPostings}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold 
                      ${item.metrics.aiImpact.includes('High') ? 'bg-red-100 text-red-800' : 
                        item.metrics.aiImpact.includes('Medium') ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {item.metrics.aiImpact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // AI Impact Card Component (for Market Analysis tab)
  const AIImpactCard = ({ trend, impact, action }) => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h4 className="font-semibold text-blue-700 mb-2">{trend}</h4>
        <p className="text-gray-700 mb-3"><strong>Impact:</strong> {impact}</p>
        <p className="text-gray-800 font-medium"><strong>Recommended action:</strong> {action}</p>
      </div>
    );
  };

  // Industry Insights Card Component (for Market Analysis tab)
  const IndustryInsightsCard = ({ industry, insights }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <h3 className="text-xl font-bold mb-4 text-indigo-700">{industry}</h3>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Key Trends</h4>
          <ul className="space-y-1">
            {insights.trends.map((trend, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>{trend}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Essential Skills</h4>
          <div className="flex flex-wrap gap-2">
            {insights.keySkills.map((skill, idx) => (
              <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Industry Challenges</h4>
          <ul className="space-y-1">
            {insights.challenges.map((challenge, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner message="Loading your career analysis..." />;
  }

  // Extract data for visualizations
  const careerPaths = extractCareerPaths(analysis);
  const skillsGap = extractSkillsGap(analysis);
  const chartData = careerPaths.map(path => ({
    label: path.title,
    value: path.match
  }));
  const timelineMilestones = createTimelineData();

  // NEW: Extract data for Market Analysis tab
  const careerGrowthMetrics = getCareerGrowthMetrics();
  const aiImpactAnalysis = getAIImpactAnalysis();
  const industryInsights = getIndustryInsights();

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
              className="flex items-center justify-center py-3 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
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
                  {userData.careerPathsInterest.slice(0, 3).map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
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
                <p className="text-lg font-semibold">{userData.timeCommitment} per week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'analysis'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Detailed Analysis
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'skills'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Skills Gap
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'market'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Market Analysis
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'roadmap'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Transition Roadmap
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Career Path Matches Visualization */}
                {careerPaths.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Career Path Compatibility</h2>
                    <SimpleBarChart data={chartData} title="Match Percentage by Career Path" />
                  </div>
                )}
                
                {/* Current Tools Proficiency */}
                {userData.toolsUsed && userData.toolsUsed.length > 0 && userData.toolsUsed[0] !== 'None' && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Technical Proficiency</h2>
                    <ToolsProficiency tools={userData.toolsUsed} />
                  </div>
                )}
                
                {/* Next Steps - Dynamic based on user analysis */}
                <div className="bg-blue-50 rounded-lg p-6 mt-8">
                  <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {generateNextSteps().map((step, index) => (
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
              </div>
            )}

            {/* Detailed Analysis Tab */}
            {activeTab === 'analysis' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Detailed Career Analysis</h2>
                <div className="prose max-w-none">
                  {formatAnalysisText(analysis)}
                </div>
              </div>
            )}

            {/* Skills Gap Tab */}
            {activeTab === 'skills' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Skills Gap Analysis</h2>
                <p className="text-gray-600 mb-6">
                  This analysis compares your current skill levels with what's required for your target career paths.
                  Focus on areas with the largest gaps for maximum impact on your transition.
                </p>
                
                {skillsGap.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {skillsGap.map((skill, index) => (
                      <SkillLevelChart key={index} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800">
                    <p>Insufficient data to generate a detailed skills gap analysis. Please update your assessment with more information about your current skills and target career paths.</p>
                  </div>
                )}
              </div>
            )}

            {/* Market Analysis Tab */}
            {activeTab === 'market' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Market Analysis & Future Outlook</h2>
                <p className="text-gray-600 mb-8">
                  Based on your selected career paths and industry preferences, here's an analysis of current market conditions,
                  growth projections, and how AI is expected to impact these fields.
                </p>
                
                {/* Career Growth Metrics */}
                {careerGrowthMetrics.length > 0 && (
                  <MarketGrowthChart careers={careerGrowthMetrics} />
                )}
                
                {/* AI Impact Analysis */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">AI Impact on Your Career Paths</h3>
                  <p className="text-gray-600 mb-4">
                    AI is transforming all technical fields. Here's how it's specifically impacting your chosen career paths
                    and what you can do to stay ahead of these changes.
                  </p>
                  
                  {aiImpactAnalysis.map((careerImpact, careerIndex) => (
                    <div key={careerIndex} className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-indigo-700">{careerImpact.career}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {careerImpact.impacts.map((impact, impactIndex) => (
                          <AIImpactCard 
                            key={impactIndex} 
                            trend={impact.trend}
                            impact={impact.impact}
                            action={impact.action}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Industry Insights */}
                {industryInsights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Industry-Specific Insights</h3>
                    <p className="text-gray-600 mb-4">
                      Analysis of the industries you're interested in, including key trends, required skills, and challenges.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {industryInsights.map((item, index) => (
                        <IndustryInsightsCard 
                          key={index}
                          industry={item.industry}
                          insights={item.insights}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Future Outlook Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">Future Outlook Summary</h3>
                  <p className="text-gray-700 mb-4">
                    Based on your selected career paths in {userData.careerPathsInterest.join(', ')}, 
                    the overall market outlook is 
                    <span className="font-bold text-green-700 mx-1">
                      positive
                    </span> 
                    with strong growth projected over the next 5 years.
                  </p>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <span className="font-semibold">• AI Impact:</span> While AI is automating some routine tasks,
                      it's creating more opportunities in these fields than it's eliminating. 
                      Focus on developing skills that complement AI rather than compete with it.
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">• Key Differentiators:</span> Domain expertise from your 
                      background in {userData.studyField || "your field"} will be valuable in your transition, 
                      especially combined with technical skills.
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">• Emerging Opportunities:</span> Look for roles that bridge your 
                      existing {userData.currentRole || "experience"} with your target tech areas, as these hybrid positions 
                      often offer less competition and higher value.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Transition Roadmap Tab */}
            {activeTab === 'roadmap' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Transition Roadmap</h2>
                <p className="text-gray-600 mb-6">
                  Based on your {userData.transitionTimeline} timeline and {userData.timeCommitment} weekly commitment,
                  here's a personalized roadmap to guide your transition into tech.
                </p>
                
                {/* Timeline Chart */}
                <TimelineChart milestones={timelineMilestones} />
                
                {/* Learning Path Recommendation */}
                <div className="mt-8 mb-6">
                  <h3 className="text-xl font-bold mb-4">Recommended Learning Path</h3>
                  <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-lg text-blue-700">Phase 1: Foundation</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Core concepts in {userData.careerPathsInterest[0] || "your chosen field"}</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Fundamental tools and technologies</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Building your learning environment</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg text-blue-700">Phase 2: Skill Building</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Focused learning in your top skill gaps</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Hands-on projects to build portfolio</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Expanding your technical toolkit</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-lg text-blue-700">Phase 3: Career Preparation</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Building your professional brand</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Networking and community engagement</span>
                          </li>
                          <li className="flex">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>Interview preparation and job search strategy</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Resource Recommendations */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Recommended Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Learning Platforms</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Online courses tailored to {userData.careerPathsInterest[0] || "your field"}</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Interactive coding platforms and tutorials</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Specialized learning paths for career changers</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-blue-700 mb-2">Community & Networking</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Professional communities in your target fields</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Mentorship opportunities for career changers</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-blue-500 mr-2">•</span>
                          <span>Virtual and local tech meetups</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 group"
        aria-label="Give Feedback"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
        <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Share Feedback
        </span>
      </button>

      {/* Custom Feedback Form Modal - Updated to match Google Form */}
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
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:border-blue-500'
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us how we can make this better..."
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={submittingFeedback || !feedbackData.rating || !feedbackData.improvements}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
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
