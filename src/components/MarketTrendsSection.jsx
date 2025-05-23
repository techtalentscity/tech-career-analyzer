// Combined Enhanced MarketTrendsSection.jsx
import React from 'react';

const MarketTrendsSection = ({ marketTrends = [], careerPaths = [], structuredMode = false }) => {
  console.log('🔍 MarketTrendsSection rendering:', marketTrends.length, 'trends');

  // If no market trends data is available, show a clear message
  if (!marketTrends || marketTrends.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Generating Market Analysis</h3>
        <p className="text-gray-500">Market insights will appear here after processing your career assessment.</p>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-700">
              Market trends data is not available for this analysis. Please retake the assessment
              to get the latest market insights or consult industry resources for current trends.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Helper functions for data processing
  const getGrowthColor = (text) => {
    if (!text) return 'text-gray-600';
    const lowerText = text.toLowerCase();
    if (lowerText.includes('high') || lowerText.includes('strong') || lowerText.includes('growing') || lowerText.includes('increase')) {
      return 'text-green-600';
    } else if (lowerText.includes('moderate') || lowerText.includes('stable')) {
      return 'text-blue-600';
    } else if (lowerText.includes('low') || lowerText.includes('declin') || lowerText.includes('decrease')) {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const extractTechnologies = (text) => {
    if (!text) return [];
    
    const techLists = text.match(/such as ([^.]+)/i) || 
                     text.match(/including ([^.]+)/i) ||
                     text.match(/notably ([^.]+)/i);
    
    if (techLists && techLists[1]) {
      return techLists[1].split(',')
        .map(tech => tech.replace(/and/i, '').trim())
        .filter(tech => tech.length > 0);
    }
    
    const techKeywords = [
      'AI', 'Machine Learning', 'Python', 'JavaScript', 'React', 'Cloud', 'DevOps',
      'Data Science', 'Cybersecurity', 'Blockchain', 'AR/VR', 'IoT', 'Docker',
      'Kubernetes', 'AWS', 'Azure', 'GCP', 'GraphQL', 'Node.js', 'TypeScript'
    ];
    
    const foundTechs = [];
    techKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        foundTechs.push(keyword);
      }
    });
    
    return foundTechs.length > 0 ? foundTechs : [];
  };

  const extractIndustries = (text) => {
    if (!text) return [];
    
    const industryLists = text.match(/sectors include ([^.]+)/i) || 
                         text.match(/industries like ([^.]+)/i) ||
                         text.match(/notably in ([^.]+)/i);
    
    if (industryLists && industryLists[1]) {
      return industryLists[1].split(',')
        .map(ind => ind.replace(/and/i, '').trim())
        .filter(ind => ind.length > 0);
    }
    
    const commonIndustries = [
      'Healthcare', 'Finance', 'Banking', 'Insurance', 'Technology', 'Retail',
      'Manufacturing', 'Education', 'Government', 'Consulting', 'Energy'
    ];
    
    const foundIndustries = [];
    commonIndustries.forEach(ind => {
      if (text.includes(ind)) {
        foundIndustries.push(ind);
      }
    });
    
    return foundIndustries.length > 0 ? foundIndustries : [];
  };

  // Find specific trend types
  const findTrendByAspect = (aspects) => {
    return marketTrends.find(trend => 
      aspects.some(aspect => 
        trend.aspect === aspect || 
        trend.title === aspect ||
        trend.category === aspect
      )
    );
  };

  const salaryTrend = findTrendByAspect(['SALARY TRENDS', 'Salary Trends', 'SALARY ANALYSIS']);
  const jobMarketTrend = findTrendByAspect(['JOB MARKET OUTLOOK', 'Job Market Outlook', 'MARKET DEMAND']);
  const techTrend = findTrendByAspect(['EMERGING TECHNOLOGIES', 'Emerging Technologies', 'TECHNOLOGY TRENDS']);
  const industryTrend = findTrendByAspect(['INDUSTRY SECTOR ANALYSIS', 'Industry Sector Analysis', 'INDUSTRY DEMAND']);
  const regionalTrend = findTrendByAspect(['REGIONAL OPPORTUNITIES', 'Regional Opportunities']);

  // Check for missing trends
  const missingTrends = [];
  if (!jobMarketTrend) missingTrends.push('Job Market Outlook');
  if (!salaryTrend) missingTrends.push('Salary Trends');
  if (!techTrend) missingTrends.push('Emerging Technologies');
  if (!industryTrend) missingTrends.push('Industry Sector Analysis');

  // If we have structured data, use the card layout
  if (structuredMode || marketTrends.some(trend => trend.salaryData || trend.techData)) {
    return (
      <div className="space-y-6">
        {/* Warning note if some sections are missing */}
        {missingTrends.length > 0 && (
          <div className="bg-yellow-50 p-4 rounded-lg mb-6">
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-yellow-800 font-medium">Some market trend data may be incomplete</p>
                <p className="text-yellow-700 text-sm mt-1">
                  The following sections are not available: {missingTrends.join(', ')}. 
                  This analysis uses only the available data.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketTrends.map((trend, index) => (
            <MarketTrendCard 
              key={index} 
              trend={trend} 
              index={index} 
              structuredMode={true}
              careerPaths={careerPaths}
              getGrowthColor={getGrowthColor}
              extractTechnologies={extractTechnologies}
              extractIndustries={extractIndustries}
            />
          ))}
        </div>

        {/* Source Note */}
        <div className="text-sm text-gray-500 italic mt-4">
          Note: Market trend data is based on the latest available information as of 2025. Industry trends may change rapidly.
        </div>
      </div>
    );
  }

  // Legacy layout for unstructured data
  return (
    <div className="space-y-6">
      {/* Warning note if some sections are missing */}
      {missingTrends.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-yellow-800 font-medium">Some market trend data may be incomplete</p>
              <p className="text-yellow-700 text-sm mt-1">
                The following sections are not available: {missingTrends.join(', ')}. 
                This analysis uses only the available data.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Job Market Outlook */}
      {jobMarketTrend && (
        <TrendSection
          title="Job Market Outlook"
          trend={jobMarketTrend}
          careerPaths={careerPaths}
          getGrowthColor={getGrowthColor}
        />
      )}

      {/* Salary Trends */}
      {salaryTrend && (
        <SalaryTrendSection trend={salaryTrend} />
      )}

      {/* Regional Opportunities */}
      {regionalTrend && (
        <TrendSection
          title="Regional Opportunities"
          trend={regionalTrend}
        />
      )}

      {/* Emerging Technologies */}
      {techTrend && (
        <TechnologyTrendSection 
          trend={techTrend} 
          extractTechnologies={extractTechnologies}
        />
      )}

      {/* Industry Sector Analysis */}
      {industryTrend && (
        <IndustryTrendSection 
          trend={industryTrend} 
          extractIndustries={extractIndustries}
        />
      )}

      {/* Fallback: Display remaining trends as cards */}
      {marketTrends.filter(trend => 
        trend !== salaryTrend && 
        trend !== jobMarketTrend && 
        trend !== techTrend && 
        trend !== industryTrend && 
        trend !== regionalTrend
      ).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketTrends.filter(trend => 
            trend !== salaryTrend && 
            trend !== jobMarketTrend && 
            trend !== techTrend && 
            trend !== industryTrend && 
            trend !== regionalTrend
          ).map((trend, index) => (
            <MarketTrendCard 
              key={index} 
              trend={trend} 
              index={index} 
              structuredMode={false}
            />
          ))}
        </div>
      )}

      {/* Source Note */}
      <div className="text-sm text-gray-500 italic mt-4">
        Note: Market trend data is based on the latest available information as of 2025. Industry trends may change rapidly.
      </div>
    </div>
  );
};

// Enhanced Market Trend Card Component
const MarketTrendCard = ({ trend, index, structuredMode = false, careerPaths = [], getGrowthColor, extractTechnologies, extractIndustries }) => {
  const trendIcons = {
    'SALARY TRENDS': '💰',
    'EMERGING TECHNOLOGIES': '🚀',
    'SALARY ANALYSIS': '💰',
    'TECHNOLOGY TRENDS': '🔧',
    'MARKET DEMAND': '📈',
    'INDUSTRY DEMAND': '📊',
    'JOB MARKET OUTLOOK': '🎯',
    'REGIONAL OPPORTUNITIES': '🌍',
    'INDUSTRY SECTOR ANALYSIS': '🏢'
  };
  
  const icon = trendIcons[trend.title] || trendIcons[trend.category] || trendIcons[trend.aspect] || '📊';
  const title = trend.title || trend.aspect || trend.category || 'Market Analysis';
  const description = trend.description || trend.details || 'Market trend information';
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start mb-4">
        <span className="text-3xl mr-4">{icon}</span>
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-gray-800">{title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">{trend.category || trend.aspect || 'Market Analysis'}</span>
            {trend.userCareer && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                Personalized for {trend.userCareer}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{description}</p>
      
      {/* Enhanced content for structured data */}
      {structuredMode && trend.salaryData && (
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h5 className="font-medium text-green-800 mb-2">💰 Salary Information:</h5>
          <div className="text-sm text-green-700">
            <div><strong>Growth Rate:</strong> {trend.salaryData.growthRate}% year-over-year</div>
            <div><strong>Trend:</strong> {trend.salaryData.trendDirection}</div>
          </div>
        </div>
      )}
      
      {structuredMode && trend.techData && (
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h5 className="font-medium text-purple-800 mb-2">🚀 Key Technologies:</h5>
          <div className="flex flex-wrap gap-2">
            {trend.techData.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-medium">
                {tech.technology}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Extract and display technologies from text */}
      {extractTechnologies && (
        (() => {
          const techs = extractTechnologies(description);
          return techs.length > 0 && (
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <h5 className="font-medium text-purple-800 mb-2">🚀 Key Technologies:</h5>
              <div className="flex flex-wrap gap-2">
                {techs.slice(0, 4).map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })()
      )}
      
      <div className="pt-4 border-t mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Relevance:</span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            trend.relevance === 'High' ? 'bg-green-100 text-green-700' :
            trend.relevance === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {trend.relevance || 'High'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Specialized section components
const TrendSection = ({ title, trend, careerPaths = [], getGrowthColor }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-bold text-blue-800 mb-4">{title}</h3>
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <p className="text-gray-700">{trend.details || trend.description}</p>
    </div>
    
    {careerPaths.length > 0 && (
      <div className="grid md:grid-cols-2 gap-6">
        {careerPaths.slice(0, 4).map((path, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-2">{path.title}</h4>
            <div className="flex items-center mb-2">
              <span className="mr-2">Demand:</span>
              <span className={`font-semibold ${getGrowthColor ? getGrowthColor(
                trend.details?.includes(path.title) ? 
                  trend.details.substring(
                    trend.details.indexOf(path.title),
                    trend.details.indexOf('.', trend.details.indexOf(path.title))
                  ) : ''
              ) : 'text-blue-600'}`}>
                {path.match}% Match
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const SalaryTrendSection = ({ trend }) => {
  const formatSalaryRange = (salaryText) => {
    if (!salaryText) return null;
    
    const ranges = salaryText.match(/\$[\d,]+-\$[\d,]+/g) || [];
    if (ranges.length === 0) return <span>{salaryText}</span>;
    
    return (
      <div className="grid grid-cols-1 gap-2">
        {ranges.map((range, idx) => (
          <div key={idx} className="flex items-center">
            <span className="font-semibold text-green-700">{range}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-blue-800 mb-4">Salary Trends</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700">{trend.details || trend.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">Entry Level</h4>
          <div className="text-green-700 font-semibold">
            {formatSalaryRange(trend.entryLevel || trend.details || trend.description)}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">Mid Level</h4>
          <div className="text-green-700 font-semibold">
            {formatSalaryRange(trend.midLevel || trend.details || trend.description)}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">Senior Level</h4>
          <div className="text-green-700 font-semibold">
            {formatSalaryRange(trend.seniorLevel || trend.details || trend.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

const TechnologyTrendSection = ({ trend, extractTechnologies }) => {
  const technologies = trend.technologies || extractTechnologies(trend.details || trend.description || '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-blue-800 mb-4">Emerging Technologies</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700">{trend.details || trend.description}</p>
      </div>
      
      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, techIndex) => (
            <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const IndustryTrendSection = ({ trend, extractIndustries }) => {
  const industries = trend.topIndustries || extractIndustries(trend.details || trend.description || '');

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-blue-800 mb-4">Top Hiring Industries</h3>
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700">{trend.details || trend.description}</p>
      </div>
      
      {industries.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {industries.map((industry, indIndex) => (
            <span key={indIndex} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              {industry}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketTrendsSection;
