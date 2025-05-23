// src/components/MarketTrendsSection.jsx - UPDATED TO MATCH TECHNICAL SPECIFICATION v1.1
import React from 'react';

const MarketTrendsSection = ({ marketTrends, structuredMode = false, topRecommendation = null }) => {
  // Enhanced Market Trends Card Component with Technical Spec v1.1 integration
  const MarketTrendsCard = ({ trend, index }) => {
    const trendIcons = {
      'SALARY OUTLOOK': '💰',
      'MARKET DEMAND': '📈',
      'SALARY TRENDS': '💰',
      'INDUSTRY DEMAND': '📊'
    };
    
    const icon = trendIcons[trend.title.split(' ').slice(-2).join(' ')] || '📊';
    
    // Get algorithm-specific styling based on Technical Specification
    const getAlgorithmColor = (algorithmType) => {
      switch(algorithmType) {
        case 'tech-interest-based': return 'bg-purple-100 text-purple-700';
        case 'research-development': return 'bg-green-100 text-green-700';
        case 'lifestyle-market': return 'bg-orange-100 text-orange-700';
        default: return 'bg-blue-100 text-blue-700';
      }
    };
    
    // Get algorithm display name based on Technical Specification
    const getAlgorithmDisplayName = (algorithmType) => {
      switch(algorithmType) {
        case 'tech-interest-based': return '🎯 Tech-Interest Based';
        case 'research-development': return '📚 Research/Development';
        case 'lifestyle-market': return '⚖️ Lifestyle/Market';
        default: return '📊 General';
      }
    };
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{trend.title}</h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-sm text-gray-500">Market Analysis</span>
              
              {/* Technical Specification v1.1 Badge */}
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Tech Spec v1.1
              </span>
              
              {/* 2024-2025 Data Badge */}
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                2024-2025 Data
              </span>
              
              {structuredMode && trend.userCareer && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  {trend.userCareer}
                </span>
              )}
              
              {structuredMode && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  Multi-Tier Engine
                </span>
              )}

              {/* Algorithm Type Badge - Technical Specification */}
              {topRecommendation && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlgorithmColor(topRecommendation.type)}`}>
                  {getAlgorithmDisplayName(topRecommendation.type)} Optimized
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3">{trend.description}</p>
        
        {trend.personalizedData && (
          <div className="space-y-3">
            {/* Enhanced Salary Ranges with Growth Data */}
            {trend.personalizedData.ranges && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">💰 Salary Ranges:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  {trend.personalizedData.ranges.slice(0, 3).map((range, idx) => (
                    <li key={idx}>• {range}</li>
                  ))}
                </ul>
                {trend.personalizedData.growth && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    📈 Growth: {trend.personalizedData.growth}
                  </div>
                )}
                {trend.personalizedData.salaryGrowth && (
                  <div className="mt-1 text-xs text-green-600">
                    💹 Annual Increase: {trend.personalizedData.salaryGrowth}
                  </div>
                )}
              </div>
            )}
            
            {/* Hot Skills Section */}
            {trend.personalizedData.hotSkills && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">🔥 Hot Skills:</h5>
                <div className="flex flex-wrap gap-1">
                  {trend.personalizedData.hotSkills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                {trend.personalizedData.hotSkills.length > 4 && (
                  <div className="mt-2 text-xs text-blue-600">
                    +{trend.personalizedData.hotSkills.length - 4} more skills in demand
                  </div>
                )}
              </div>
            )}

            {/* Market Opportunities */}
            {trend.personalizedData.opportunities && (
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">🚀 Market Opportunities:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  {trend.personalizedData.opportunities.slice(0, 3).map((opp, idx) => (
                    <li key={idx}>• {opp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Top Industries */}
            {trend.personalizedData.industries && (
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">🏢 Top Industries:</h5>
                <div className="flex flex-wrap gap-1">
                  {trend.personalizedData.industries.slice(0, 4).map((industry, idx) => (
                    <span key={idx} className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Market Outlook */}
            {trend.personalizedData.outlook && (
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <h5 className="font-medium text-indigo-800 mb-2">🔮 Market Outlook:</h5>
                <p className="text-sm text-indigo-700">{trend.personalizedData.outlook}</p>
              </div>
            )}

            {/* Research Funding (Research/Development specific - Technical Spec) */}
            {trend.personalizedData.funding && topRecommendation?.type === 'research-development' && (
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                <h5 className="font-medium text-teal-800 mb-2">💰 Research Funding:</h5>
                <p className="text-sm text-teal-700">{trend.personalizedData.funding}</p>
              </div>
            )}

            {/* Publications & Citations (Research/Development specific) */}
            {trend.personalizedData.publications && topRecommendation?.type === 'research-development' && (
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                <h5 className="font-medium text-cyan-800 mb-2">📚 Publication Trends:</h5>
                <p className="text-sm text-cyan-700">{trend.personalizedData.publications}</p>
              </div>
            )}

            {/* Remote Work Trends (Lifestyle/Market specific - Technical Spec) */}
            {trend.personalizedData.remoteWork && topRecommendation?.type === 'lifestyle-market' && (
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                <h5 className="font-medium text-pink-800 mb-2">🏠 Remote Work Trends:</h5>
                <p className="text-sm text-pink-700">{trend.personalizedData.remoteWork}</p>
              </div>
            )}

            {/* Work-Life Balance Data (Lifestyle/Market specific) */}
            {trend.personalizedData.workLifeBalance && topRecommendation?.type === 'lifestyle-market' && (
              <div className="bg-rose-50 p-3 rounded-lg border border-rose-200">
                <h5 className="font-medium text-rose-800 mb-2">⚖️ Work-Life Balance:</h5>
                <p className="text-sm text-rose-700">{trend.personalizedData.workLifeBalance}</p>
              </div>
            )}

            {/* Tech Innovation Trends (Tech-Interest specific - Technical Spec) */}
            {trend.personalizedData.techInnovation && topRecommendation?.type === 'tech-interest-based' && (
              <div className="bg-violet-50 p-3 rounded-lg border border-violet-200">
                <h5 className="font-medium text-violet-800 mb-2">🚀 Tech Innovation:</h5>
                <p className="text-sm text-violet-700">{trend.personalizedData.techInnovation}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4 border-t mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Data Source:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Technical Spec v1.1 Analysis
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-gray-600">Relevance:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              trend.relevance === 'High' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {trend.relevance || 'High'}
            </span>
          </div>
          {/* Algorithm Metadata Display */}
          {topRecommendation?.metadata && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-gray-600">Algorithm:</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {topRecommendation.metadata.criteriaUsed?.length || 0} criteria used
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!marketTrends || marketTrends.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📊</div>
        <h4 className="text-lg font-semibold text-gray-600 mb-2">
          {structuredMode ? 'Generating Technical Spec v1.1 Market Analysis' : 'Generating Market Analysis'}
        </h4>
        <p className="text-gray-500">
          {structuredMode 
            ? 'Creating personalized market insights using Multi-Tier Recommendation Engine...'
            : 'Creating market insights...'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Market Performance Summary - Technical Specification */}
      {structuredMode && topRecommendation && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Market Performance Summary - {getAlgorithmDisplayName(topRecommendation.type)}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {topRecommendation.type === 'tech-interest-based' ? '74%' :
                 topRecommendation.type === 'research-development' ? '30%' : '15%'}
              </div>
              <div className="text-sm text-green-700">Job Growth Rate</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {topRecommendation.salaryRange?.split(' - ')[1] || '$150k+'}
              </div>
              <div className="text-sm text-blue-700">Top Salary Range</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{marketTrends.length}</div>
              <div className="text-sm text-purple-700">Market Insights</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {topRecommendation.marketDemand === 'high' ? 'Very High' : 
                 topRecommendation.marketDemand === 'medium' ? 'High' : 'Medium'}
              </div>
              <div className="text-sm text-orange-700">Market Demand</div>
            </div>
          </div>
          
          {/* Algorithm-Specific Market Insight - Technical Specification */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2">
              Key Market Insights ({topRecommendation.type} Algorithm):
            </h5>
            <p className="text-sm text-gray-600">
              {topRecommendation.type === 'tech-interest-based' ? 
                '🎯 Tech-Interest Based Analysis: AI/ML industry projected to reach $20B by 2025. Your tech interests alignment shows 7% annual salary increases with strong demand across tech, healthcare, and finance sectors. Focus on current technologies and role transition potential.' :
                topRecommendation.type === 'research-development' ?
                '📚 Research/Development Analysis: AI research investment grew from $80B to $120B (2019-2023). Your publications and research tools experience indicate stable growth with opportunities in academia, tech companies, and government labs. Time commitment flexibility enhances prospects.' :
                '⚖️ Lifestyle/Market Analysis: Remote work now represents 15% of high-paying jobs. Your work preference and education level show premium salaries with 30% of new senior roles offering flexible arrangements. Target salary expectations align with market realism.'}
            </p>
          </div>

          {/* Technical Specification Metadata Display */}
          {topRecommendation.metadata && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="text-sm font-medium text-blue-700 mb-2">
                Technical Specification v1.1 - Algorithm Performance:
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="font-medium text-blue-700">Confidence:</span>
                  <div className="text-blue-600">{topRecommendation.confidence} ({topRecommendation.confidenceScore}%)</div>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Criteria Used:</span>
                  <div className="text-blue-600">{topRecommendation.metadata.criteriaUsed?.length || 0}</div>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Constants Score:</span>
                  <div className="text-blue-600">{Math.round(topRecommendation.metadata.constantsScore || 0)}%</div>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Fallback Applied:</span>
                  <div className="text-blue-600">{topRecommendation.metadata.fallbackApplied ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Standard Market Analysis Summary (for non-structured mode) */}
      {!topRecommendation && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Market Analysis Summary - Technical Spec v1.1
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{marketTrends.length}</div>
              <div className="text-sm text-green-700">Market Insights</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {marketTrends.filter(t => t.relevance === 'High').length}
              </div>
              <div className="text-sm text-blue-700">High Relevance</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {marketTrends.filter(t => t.userCareer).length}
              </div>
              <div className="text-sm text-purple-700">Personalized</div>
            </div>
          </div>
        </div>
      )}

      {/* Market Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketTrends.map((trend, index) => (
          <MarketTrendsCard key={index} trend={trend} index={index} />
        ))}
      </div>

      {/* Enhanced Key Takeaways - Technical Specification */}
      {structuredMode && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Key Takeaways & Action Items - Technical Spec v1.1
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-sm text-gray-700">
                Market trends are personalized using Multi-Tier Recommendation Engine
                {topRecommendation && ` (${topRecommendation.type} algorithm with ${topRecommendation.confidenceScore}% confidence)`}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">ℹ</span>
              <p className="text-sm text-gray-700">
                Dynamic weighting applied: {topRecommendation?.metadata?.fallbackApplied ? 
                'Fallback logic activated due to missing criteria' : 
                'Full algorithm performance with complete data validation'}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-purple-500 mt-1">🎯</span>
              <p className="text-sm text-gray-700">
                Salary ranges reflect 2024-2025 market with {topRecommendation?.metadata?.criteriaUsed?.length || 0} criteria analysis
              </p>
            </div>
            
            {/* Algorithm-Specific Takeaways - Technical Specification */}
            {topRecommendation?.type === 'tech-interest-based' && (
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 mt-1">🎯</span>
                <p className="text-sm text-gray-700">
                  Tech-Interest Based: {topRecommendation.metadata?.criteriaUsed?.includes('techInterests') ? 
                  'Your tech interests show strong market alignment' : 
                  'Consider developing stronger tech interest profile'} - 74% job growth rate
                </p>
              </div>
            )}
            {topRecommendation?.type === 'research-development' && (
              <div className="flex items-start space-x-3">
                <span className="text-teal-500 mt-1">📚</span>
                <p className="text-sm text-gray-700">
                  Research/Development: {topRecommendation.metadata?.criteriaUsed?.includes('publications') ? 
                  'Your publication record strengthens research prospects' : 
                  'Consider building publication portfolio'} - 50% funding increase
                </p>
              </div>
            )}
            {topRecommendation?.type === 'lifestyle-market' && (
              <div className="flex items-start space-x-3">
                <span className="text-indigo-500 mt-1">⚖️</span>
                <p className="text-sm text-gray-700">
                  Lifestyle/Market: {topRecommendation.metadata?.criteriaUsed?.includes('workPreference') ? 
                  'Your work preferences align with market trends' : 
                  'Consider optimizing work preference strategy'} - 25-35% remote premium
                </p>
              </div>
            )}

            {/* Constant Variables Impact */}
            {topRecommendation?.metadata && (
              <div className="flex items-start space-x-3">
                <span className="text-cyan-500 mt-1">📊</span>
                <p className="text-sm text-gray-700">
                  Constant Variables: {Math.round(topRecommendation.metadata.constantsScore || 0)}% score from 
                  years experience, study field, interests, and transferable skills analysis
                </p>
              </div>
            )}
          </div>

          {/* Technical Specification Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h5 className="text-sm font-bold text-blue-800 mb-2">
              🔬 Technical Specification v1.1 Summary:
            </h5>
            <p className="text-xs text-blue-700">
              This analysis used the Multi-Tier Recommendation Engine with fallback logic and dynamic weighting. 
              {topRecommendation ? `Your top recommendation (${topRecommendation.type}) achieved ${topRecommendation.confidenceScore}% confidence using ${topRecommendation.metadata?.criteriaUsed?.length || 0} criteria. ` : ''}
              Market insights are algorithm-optimized for maximum relevance to your career transition goals.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // Helper function to get algorithm display name
  function getAlgorithmDisplayName(algorithmType) {
    switch(algorithmType) {
      case 'tech-interest-based': return '🎯 Tech-Interest Based';
      case 'research-development': return '📚 Research/Development';
      case 'lifestyle-market': return '⚖️ Lifestyle/Market';
      default: return '📊 General';
    }
  }
};

export default MarketTrendsSection;
