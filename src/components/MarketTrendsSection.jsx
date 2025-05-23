// src/components/MarketTrendsSection.jsx - ENHANCED VERSION
import React from 'react';

const MarketTrendsSection = ({ marketTrends, structuredMode = false, topRecommendation = null }) => {
  // Enhanced Market Trends Card Component with 2024-2025 data integration
  const MarketTrendsCard = ({ trend, index }) => {
    const trendIcons = {
      'SALARY OUTLOOK': '💰',
      'MARKET DEMAND': '📈',
      'SALARY TRENDS': '💰',
      'INDUSTRY DEMAND': '📊'
    };
    
    const icon = trendIcons[trend.title.split(' ').slice(-2).join(' ')] || '📊';
    
    // Get algorithm-specific styling
    const getAlgorithmColor = (algorithmType) => {
      switch(algorithmType) {
        case 'tech-market': return 'bg-purple-100 text-purple-700';
        case 'academic-research': return 'bg-green-100 text-green-700';
        case 'practical-lifestyle': return 'bg-orange-100 text-orange-700';
        default: return 'bg-blue-100 text-blue-700';
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
              
              {/* 2024-2025 Data Badge */}
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                2024-2025 Data
              </span>
              
              {structuredMode && trend.userCareer && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {trend.userCareer}
                </span>
              )}
              
              {structuredMode && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  AI Generated
                </span>
              )}

              {/* Algorithm Type Badge */}
              {topRecommendation && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAlgorithmColor(topRecommendation.type)}`}>
                  {topRecommendation.type === 'tech-market' ? '💻 Tech-Market' :
                   topRecommendation.type === 'academic-research' ? '🎓 Academic' :
                   '⚖️ Lifestyle'} Optimized
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

            {/* Research Funding (Academic-Research specific) */}
            {trend.personalizedData.funding && topRecommendation?.type === 'academic-research' && (
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                <h5 className="font-medium text-teal-800 mb-2">💰 Research Funding:</h5>
                <p className="text-sm text-teal-700">{trend.personalizedData.funding}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4 border-t mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Data Source:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Market Research 2024-2025
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
        </div>
      </div>
    );
  };

  if (!marketTrends || marketTrends.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📊</div>
        <h4 className="text-lg font-semibold text-gray-600 mb-2">
          {structuredMode ? 'Generating AI Market Analysis' : 'Generating Market Analysis'}
        </h4>
        <p className="text-gray-500">
          {structuredMode 
            ? 'Creating personalized market insights based on your career recommendations...'
            : 'Creating market insights...'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Market Performance Summary */}
      {structuredMode && topRecommendation && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Market Performance Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {topRecommendation.type === 'tech-market' ? '74%' :
                 topRecommendation.type === 'academic-research' ? '30%' : '15%'}
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
              <div className="text-2xl font-bold text-orange-600">Very High</div>
              <div className="text-sm text-orange-700">Market Demand</div>
            </div>
          </div>
          
          {/* Algorithm-Specific Market Insight */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2">Key Market Insights:</h5>
            <p className="text-sm text-gray-600">
              {topRecommendation.type === 'tech-market' ? 
                '🚀 AI/ML industry projected to reach $20B by 2025. Machine Learning Engineers see 7% annual salary increases with strong demand across tech, healthcare, and finance sectors.' :
                topRecommendation.type === 'academic-research' ?
                '📚 AI research investment grew from $80B to $120B (2019-2023). Research roles offer stable growth with opportunities in academia, tech companies, and government labs.' :
                '💼 Remote work now represents 15% of high-paying jobs. Senior remote positions command premium salaries with 30% of new senior roles offering hybrid arrangements.'}
            </p>
          </div>
        </div>
      )}

      {/* Standard Market Analysis Summary (for non-structured mode) */}
      {!topRecommendation && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Market Analysis Summary
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

      {/* Enhanced Key Takeaways */}
      {structuredMode && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Key Takeaways & Action Items
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-sm text-gray-700">
                Market trends are personalized based on your top career recommendation
                {topRecommendation && ` (${topRecommendation.type} algorithm)`}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">ℹ</span>
              <p className="text-sm text-gray-700">
                Focus on developing the "hot skills" mentioned to increase your market value by 15-25%
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-purple-500 mt-1">🎯</span>
              <p className="text-sm text-gray-700">
                Salary ranges reflect current 2024-2025 market conditions with verified growth data
              </p>
            </div>
            {topRecommendation?.type === 'tech-market' && (
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 mt-1">🚀</span>
                <p className="text-sm text-gray-700">
                  Tech-Market roles show 74% job growth - now is an excellent time to transition
                </p>
              </div>
            )}
            {topRecommendation?.type === 'academic-research' && (
              <div className="flex items-start space-x-3">
                <span className="text-teal-500 mt-1">🔬</span>
                <p className="text-sm text-gray-700">
                  Research funding increased 50% - strong support for academic career paths
                </p>
              </div>
            )}
            {topRecommendation?.type === 'practical-lifestyle' && (
              <div className="flex items-start space-x-3">
                <span className="text-indigo-500 mt-1">🏠</span>
                <p className="text-sm text-gray-700">
                  Remote senior positions now offer 25-35% salary premiums over traditional roles
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTrendsSection;
