// Updated MarketTrendsSection.jsx - Career path oriented structure
import React from 'react';

const MarketTrendsSection = ({ marketTrends, careerPaths }) => {
  // If no market trends data is available, show a clear message
  if (!marketTrends || marketTrends.length === 0) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg">
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
    );
  }

  // Helper function to get appropriate color based on growth status
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

  // Helper function to format salary ranges with appropriate styling
  const formatSalaryRange = (salaryText) => {
    if (!salaryText) return null;
    
    // Try to extract salary ranges using regex
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

  // Get all unique subsections from market trends to structure the display
  const getMarketTrendCategories = () => {
    // Filter to only include section headers
    return marketTrends
      .filter(trend => trend.type === 'section_header')
      .map(header => header.title);
  };

  // Group salary and growth trends by career path
  const groupTrendsByCareerPath = () => {
    // First collect all unique career paths mentioned in the trends
    const careerPathSet = new Set();
    
    // Add paths from the careerPaths prop
    if (careerPaths && careerPaths.length > 0) {
      careerPaths.forEach(path => careerPathSet.add(path.title));
    }
    
    // Also add paths mentioned in the market trends data
    marketTrends.forEach(trend => {
      if (trend.careerPath) {
        careerPathSet.add(trend.careerPath);
      }
    });
    
    // Convert to array and create the data structure
    const paths = Array.from(careerPathSet);
    
    return paths.map(pathName => {
      // Find salary data for this path
      const salaryData = marketTrends.find(trend => 
        trend.type === 'salary' && trend.careerPath === pathName
      );
      
      // Find growth data for this path
      const growthData = marketTrends.find(trend => 
        trend.type === 'growth' && trend.careerPath === pathName
      );
      
      // Find match percentage from careerPaths
      const matchData = careerPaths?.find(path => path.title === pathName);
      
      return {
        pathName,
        salary: salaryData,
        growth: growthData,
        match: matchData?.match || null
      };
    });
  };

  // Get structured career path data
  const careerPathsData = groupTrendsByCareerPath();
  
  // Get general trend categories
  const trendCategories = getMarketTrendCategories();

  // Display a note at the top if some sections are missing
  const missingTrends = [];
  const requiredCategories = ['JOB MARKET OUTLOOK', 'SALARY TRENDS', 'EMERGING TECHNOLOGIES', 'INDUSTRY SECTOR ANALYSIS'];
  requiredCategories.forEach(category => {
    if (!trendCategories.some(cat => cat.toUpperCase().includes(category))) {
      missingTrends.push(category);
    }
  });

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

      {/* Display overview of job market outlook if available */}
      {marketTrends.find(trend => 
        trend.aspect === 'JOB MARKET OUTLOOK' || trend.aspect === 'Job Market Outlook'
      ) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Job Market Overview</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              {marketTrends.find(trend => 
                trend.aspect === 'JOB MARKET OUTLOOK' || trend.aspect === 'Job Market Outlook'
              )?.details}
            </p>
          </div>
        </div>
      )}

      {/* Career Path Specific Market Data */}
      {careerPathsData.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Career-Specific Market Analysis</h3>
          
          {careerPathsData.map((pathData, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-2">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-indigo-800">
                  {pathData.pathName}
                </h4>
                {pathData.match && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {pathData.match}% Match
                  </span>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Salary information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-lg mb-3">Salary Range</h5>
                  {pathData.salary ? (
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-700">
                        ${pathData.salary.minSalary.toLocaleString()} - ${pathData.salary.maxSalary.toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-gray-500">
                      Salary data not available
                    </div>
                  )}
                  <div className="text-center text-sm text-gray-600 mt-2">Annual salary range</div>
                </div>
                
                {/* Growth information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-lg mb-3">Job Growth</h5>
                  {pathData.growth ? (
                    <div className="flex items-center justify-center">
                      <span className={`text-3xl font-bold ${
                        pathData.growth.growth > 15 ? 'text-green-600' : 
                        pathData.growth.growth > 5 ? 'text-blue-600' : 
                        'text-orange-600'
                      }`}>
                        {pathData.growth.growth}%
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-gray-500">
                      Growth data not available
                    </div>
                  )}
                  <div className="text-center text-sm text-gray-600 mt-2">Projected growth rate</div>
                </div>
              </div>

              {/* Display relevant trends for this career path if we can find them */}
              {marketTrends.filter(trend => 
                trend.type === 'general' && 
                trend.trend && 
                trend.trend.toLowerCase().includes(pathData.pathName.toLowerCase())
              ).length > 0 && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2">Key Insights</h5>
                  <ul className="space-y-2">
                    {marketTrends
                      .filter(trend => 
                        trend.type === 'general' && 
                        trend.trend && 
                        trend.trend.toLowerCase().includes(pathData.pathName.toLowerCase())
                      )
                      .map((trend, trendIndex) => (
                        <li key={trendIndex} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">•</span>
                          <span>{trend.trend}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Emerging Technologies Section */}
      {marketTrends.find(trend => 
        trend.aspect === 'EMERGING TECHNOLOGIES' || trend.aspect === 'Emerging Technologies'
      ) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Emerging Technologies</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              {marketTrends.find(trend => 
                trend.aspect === 'EMERGING TECHNOLOGIES' || trend.aspect === 'Emerging Technologies'
              )?.details}
            </p>
          </div>
          
          {/* Extract technologies if possible */}
          {(() => {
            const techTrend = marketTrends.find(trend => 
              trend.aspect === 'EMERGING TECHNOLOGIES' || trend.aspect === 'Emerging Technologies'
            );
            
            if (!techTrend) return null;
            
            // Extract technologies
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
            
            const technologies = techTrend.technologies || extractTechnologies(techTrend.details || '');
            
            if (technologies.length === 0) return null;
            
            return (
              <div className="flex flex-wrap gap-2 mt-4">
                {technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Industry Sector Analysis */}
      {marketTrends.find(trend => 
        trend.aspect === 'INDUSTRY SECTOR ANALYSIS' || trend.aspect === 'Industry Sector Analysis'
      ) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Top Hiring Industries</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              {marketTrends.find(trend => 
                trend.aspect === 'INDUSTRY SECTOR ANALYSIS' || trend.aspect === 'Industry Sector Analysis'
              )?.details}
            </p>
          </div>
          
          {/* Extract industries if possible */}
          {(() => {
            const industryTrend = marketTrends.find(trend => 
              trend.aspect === 'INDUSTRY SECTOR ANALYSIS' || trend.aspect === 'Industry Sector Analysis'
            );
            
            if (!industryTrend) return null;
            
            // Extract industries
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
            
            const industries = industryTrend.topIndustries || extractIndustries(industryTrend.details || '');
            
            if (industries.length === 0) return null;
            
            return (
              <div className="flex flex-wrap gap-2 mt-4">
                {industries.map((industry, indIndex) => (
                  <span key={indIndex} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    {industry}
                  </span>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Regional Opportunities */}
      {marketTrends.find(trend => 
        trend.aspect === 'REGIONAL OPPORTUNITIES' || trend.aspect === 'Regional Opportunities'
      ) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Regional Opportunities</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              {marketTrends.find(trend => 
                trend.aspect === 'REGIONAL OPPORTUNITIES' || trend.aspect === 'Regional Opportunities'
              )?.details}
            </p>
          </div>
        </div>
      )}

      {/* Source Note */}
      <div className="text-sm text-gray-500 italic mt-4">
        Note: Market trend data is based on the latest available information as of 2025. Industry trends may change rapidly.
      </div>
    </div>
  );
};

export default MarketTrendsSection;
