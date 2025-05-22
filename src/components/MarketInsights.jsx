// src/components/MarketInsights.jsx
import React, { useState } from 'react';
import videoInsightsService from '../services/videoInsightsService';

const MarketInsights = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('trending');
  
  const trendingSkills = videoInsightsService.getTrendingSkills();
  const careerAdvice = videoInsightsService.getCareerAdvicePatterns();
  const industryInsights = videoInsightsService.getIndustryGrowthInsights();
  const marketSummary = videoInsightsService.getMarketInsightsSummary();
  const videoStats = videoInsightsService.getVideoInsightsStats();

  // Simple bar chart component for skills
  const SkillTrendChart = ({ skills }) => {
    const maxMentions = Math.max(...skills.map(skill => skill.mentions));
    
    return (
      <div className="space-y-3">
        {skills.slice(0, 8).map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  skill.growth === 'Very High' ? 'bg-green-100 text-green-700' :
                  skill.growth === 'High' ? 'bg-blue-100 text-blue-700' :
                  skill.growth === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {skill.growth}
                </span>
              </div>
              <span className="text-sm text-gray-600">{skill.mentions} mentions</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  skill.growth === 'Very High' ? 'bg-green-500' :
                  skill.growth === 'High' ? 'bg-blue-500' :
                  skill.growth === 'Moderate' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}
                style={{ width: `${(skill.mentions / maxMentions) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Industry growth component
  const IndustryGrowthCard = ({ industry }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg text-gray-900">{industry.industry}</h4>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          industry.growth === 'Very High' ? 'bg-green-100 text-green-700' :
          industry.growth === 'High' ? 'bg-blue-100 text-blue-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {industry.growth} Growth
        </span>
      </div>
      <p className="text-gray-600 mb-4 text-sm">{industry.description}</p>
      
      <div className="space-y-3">
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Key Opportunities:</h5>
          <div className="flex flex-wrap gap-2">
            {industry.opportunities.slice(0, 3).map((opp, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                {opp}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Required Skills:</h5>
          <div className="flex flex-wrap gap-2">
            {industry.skills.slice(0, 4).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Career advice card component
  const CareerAdviceCard = ({ advice }) => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-lg text-gray-900">{advice.advice}</h4>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
          {advice.frequency}/16 videos
        </span>
      </div>
      <p className="text-gray-600 mb-4 text-sm">{advice.description}</p>
      
      <div className="space-y-2">
        <h5 className="font-medium text-gray-900">Action Steps:</h5>
        <ul className="space-y-1">
          {advice.actionableSteps.slice(0, 3).map((step, index) => (
            <li key={index} className="flex items-start text-sm text-gray-700">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Market Insights</h2>
            <p className="text-gray-600 mt-1">
              Based on analysis of {videoStats.totalVideos} tech career guidance videos
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Last Updated</div>
            <div className="font-medium">{videoStats.lastUpdated}</div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{videoStats.totalVideos}</div>
          <div className="text-sm text-gray-600">Videos Analyzed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{videoStats.totalSkillsIdentified}</div>
          <div className="text-sm text-gray-600">Skills Identified</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{videoStats.totalCareerPaths}</div>
          <div className="text-sm text-gray-600">Career Paths</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{videoStats.totalActionableSteps}</div>
          <div className="text-sm text-gray-600">Action Steps</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'trending', label: 'Trending Skills', icon: '📈' },
          { id: 'industries', label: 'Growth Industries', icon: '🏢' },
          { id: 'advice', label: 'Career Advice', icon: '💡' },
          { id: 'summary', label: 'Market Summary', icon: '📊' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-center font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'trending' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Most In-Demand Skills</h3>
            <p className="text-gray-600 mb-6">
              Skills mentioned most frequently across tech career guidance videos, with growth trends.
            </p>
            <SkillTrendChart skills={trendingSkills} />
          </div>
        )}

        {activeTab === 'industries' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">High-Growth Industries</h3>
            <p className="text-gray-600 mb-6">
              Industries showing the strongest growth and opportunities for tech professionals.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {industryInsights.map((industry, index) => (
                <IndustryGrowthCard key={index} industry={industry} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'advice' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Career Advice</h3>
            <p className="text-gray-600 mb-6">
              Most commonly shared advice from industry experts and career guidance videos.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {careerAdvice.map((advice, index) => (
                <CareerAdviceCard key={index} advice={advice} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Market Summary</h3>
              
              {/* Top Skills Summary */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-3">Top 5 Skills to Focus On:</h4>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {marketSummary.topSkills.map((skill, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 text-center">
                      <div className="font-medium text-gray-900">{skill.name}</div>
                      <div className="text-sm text-gray-600">{skill.mentions} mentions</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Trends */}
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-green-900 mb-3">Key Market Trends:</h4>
                <ul className="space-y-2">
                  {marketSummary.keyTrends.map((trend, index) => (
                    <li key={index} className="flex items-start text-green-800">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth Industries Summary */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-3">High-Growth Sectors:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {marketSummary.growthIndustries.map((industry, index) => (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <div className="font-medium text-gray-900">{industry.industry}</div>
                      <div className="text-sm text-purple-600">{industry.growth} Growth</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Personalized Recommendations */}
      {userProfile && (
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Personalized Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {videoInsightsService.getPersonalizedRecommendations(userProfile).slice(0, 2).map((rec, index) => (
              <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">{rec.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                {rec.skills && (
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {rec.steps && (
                  <ul className="space-y-1">
                    {rec.steps.slice(0, 2).map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm text-gray-700 flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketInsights;
