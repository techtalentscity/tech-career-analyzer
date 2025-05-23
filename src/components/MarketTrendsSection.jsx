// src/components/MarketTrendsSection.jsx
import React from 'react';

const MarketTrendsSection = ({ marketTrends, structuredMode = false }) => {
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
              {structuredMode && trend.userCareer && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {trend.userCareer}
                </span>
              )}
              {structuredMode && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  AI Generated
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3">{trend.description}</p>
        
        {trend.personalizedData && (
          <div className="space-y-3">
            {trend.personalizedData.ranges && (
              <div className="bg-green-50 p-3 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">💰 Salary Ranges:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  {trend.personalizedData.ranges.slice(0, 3).map((range, idx) => (
                    <li key={idx}>• {range}</li>
                  ))}
                </ul>
                {structuredMode && trend.personalizedData.growth && (
                  <div className="mt-2 text-xs text-green-600">
                    Growth: {trend.personalizedData.growth}
                  </div>
                )}
              </div>
            )}
            
            {trend.personalizedData.hotSkills && (
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-2">🔥 Hot Skills:</h5>
                <div className="flex flex-wrap gap-1">
                  {trend.personalizedData.hotSkills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {trend.personalizedData.opportunities && (
              <div className="bg-purple-50 p-3 rounded-lg">
                <h5 className="font-medium text-purple-800 mb-2">🚀 Opportunities:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  {trend.personalizedData.opportunities.slice(0, 3).map((opp, idx) => (
                    <li key={idx}>• {opp}</li>
                  ))}
                </ul>
              </div>
            )}

            {trend.personalizedData.industries && (
              <div className="bg-orange-50 p-3 rounded-lg">
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
          </div>
        )}
        
        <div className="pt-4 border-t mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Relevance:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              trend.relevance === 'High' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {trend.relevance || 'High'}
            </span>
          </div>
          {structuredMode && trend.personalizedData?.outlook && (
            <div className="mt-2 text-xs text-gray-600">
              Outlook: {trend.personalizedData.outlook}
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
      {structuredMode && (
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketTrends.map((trend, index) => (
          <MarketTrendsCard key={index} trend={trend} index={index} />
        ))}
      </div>

      {structuredMode && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Key Takeaways
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-sm text-gray-700">
                Market trends are personalized based on your top career recommendation
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">ℹ</span>
              <p className="text-sm text-gray-700">
                Focus on developing the "hot skills" mentioned to increase your market value
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-purple-500 mt-1">🎯</span>
              <p className="text-sm text-gray-700">
                Salary ranges reflect current market conditions for your target role
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTrendsSection;
