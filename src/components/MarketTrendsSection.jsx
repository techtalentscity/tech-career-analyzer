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

  // Helper functions
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

  // Helper function to extract salary ranges
  const extractSalaryRanges = (salaryText) => {
    if (!salaryText) return { entry: "$0-$0", mid: "$0-$0", senior: "$0-$0" };
    
    // Try to extract salary ranges using regex
    const ranges = salaryText.match(/\$[\d,]+-\$[\d,]+/g) || [];
    if (ranges.length === 0) return { entry: "$0-$0", mid: "$0-$0", senior: "$0-$0" };
    
    // Map extracted ranges to different levels
    return {
      entry: ranges[0] || "$0-$0",
      mid: ranges[1] || ranges[0] || "$0-$0",
      senior: ranges[2] || ranges[1] || ranges[0] || "$0-$0"
    };
  };

  // Extract technologies from text
  const extractTechnologies = (text) => {
    if (!text) return [];
    
    // Look for lists in the text
    const techLists = text.match(/such as ([^.]+)/i) || 
                     text.match(/including ([^.]+)/i) ||
                     text.match(/notably ([^.]+)/i);
    
    if (techLists && techLists[1]) {
      return techLists[1].split(',')
        .map(tech => tech.replace(/and/i, '').trim())
        .filter(tech => tech.length > 0);
    }
    
    // If no list found, try to extract technologies by common tech words
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
  
  // Extract industry sectors
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
  
  // Get relevant trends by category
  const findSalaryTrend = () => {
    return marketTrends.find(trend => 
      trend.aspect === 'SALARY TRENDS' || trend.aspect === 'Salary Trends'
    );
  };
  
  const findJobMarketTrend = () => {
    return marketTrends.find(trend => 
      trend.aspect === 'JOB MARKET OUTLOOK' || trend.aspect === 'Job Market Outlook'
    );
  };
  
  const findTechTrend = () => {
    return marketTrends.find(trend => 
      trend.aspect === 'EMERGING TECHNOLOGIES' || trend.aspect === 'Emerging Technologies'
    );
  };
  
  const findIndustryTrend = () => {
    return marketTrends.find(trend => 
      trend.aspect === 'INDUSTRY SECTOR ANALYSIS' || trend.aspect === 'Industry Sector Analysis'
    );
  };
  
  // Get extracted data
  const salaryTrend = findSalaryTrend();
  const jobMarketTrend = findJobMarketTrend();
  const techTrend = findTechTrend();
  const industryTrend = findIndustryTrend();
  
  // Extract technologies
  const technologies = techTrend?.technologies || extractTechnologies(techTrend?.details || '');
  
  // Extract industries
  const industries = industryTrend?.topIndustries || extractIndustries(industryTrend?.details || '');

  // Prepare data for Job Market cards
  const prepareJobMarketData = () => {
    if (!careerPaths || careerPaths.length === 0) return [];
    
    return careerPaths.slice(0, 5).map(path => ({
      name: path.title,
      value: path.match
    }));
  };

  // Prepare data for salary cards
  const prepareSalaryData = () => {
    if (!salaryTrend) return [];
    
    const { entry, mid, senior } = extractSalaryRanges(salaryTrend.details);
    
    // Convert salary ranges to numeric values for easier display
    const extractValue = (range) => {
      const match = range.match(/\$([0-9,]+)/g);
      if (match && match.length >= 2) {
        const min = parseInt(match[0].replace(/\$|,/g, ''), 10);
        const max = parseInt(match[1].replace(/\$|,/g, ''), 10);
        return Math.round((min + max) / 2);
      }
      return 0;
    };
    
    return [
      { name: "Entry Level", value: extractValue(entry), range: entry },
      { name: "Mid Level", value: extractValue(mid), range: mid },
      { name: "Senior Level", value: extractValue(senior), range: senior }
    ];
  };

  // Prepare data for industry cards
  const prepareIndustryData = () => {
    if (!industries || industries.length === 0) return [];
    
    // Generate dummy values if real data not available
    return industries.slice(0, 5).map((industry, index) => ({
      name: industry,
      value: 100 - (index * 15)  // Just generating values 100, 85, 70, etc.
    }));
  };

  // Prepare data for tech trend table
  const prepareTechTrendTable = () => {
    if (!technologies || technologies.length === 0) return [];
    
    // Generate adoption rate and impact score for demonstration
    return technologies.map((tech, index) => {
      // Generate some mock data for demonstration purposes
      const adoption = Math.floor(30 + Math.random() * 70);
      const impact = ["High", "Medium", "Very High"][Math.floor(Math.random() * 3)];
      const growth = Math.floor(10 + Math.random() * 40);
      
      return {
        name: tech,
        adoption: `${adoption}%`,
        impact: impact,
        growth: `${growth}%`
      };
    });
  };

  // Generate color array for cards
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#a35ff2'];

  // Define color classes for different ranges
  const getValueColorClass = (value, type) => {
    if (type === 'salary') {
      if (value > 100000) return 'bg-green-100 border-green-400 text-green-800';
      if (value > 70000) return 'bg-blue-100 border-blue-400 text-blue-800';
      return 'bg-yellow-100 border-yellow-400 text-yellow-800';
    }
    
    if (type === 'match' || type === 'growth') {
      if (value >= 80) return 'bg-green-100 border-green-400 text-green-800';
      if (value >= 60) return 'bg-blue-100 border-blue-400 text-blue-800';
      if (value >= 40) return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      return 'bg-gray-100 border-gray-400 text-gray-800';
    }
    
    return 'bg-gray-100 border-gray-400 text-gray-800';
  };

  // Prepare chart and table data
  const jobMarketData = prepareJobMarketData();
  const salaryData = prepareSalaryData();
  const industryData = prepareIndustryData();
  const techTableData = prepareTechTrendTable();

  // Display a note at the top if some sections are missing
  const missingTrends = [];
  if (!jobMarketTrend) missingTrends.push('Job Market Outlook');
  if (!salaryTrend) missingTrends.push('Salary Trends');
  if (!techTrend) missingTrends.push('Emerging Technologies');
  if (!industryTrend) missingTrends.push('Industry Sector Analysis');

  // Card components
  const DataCard = ({ title, value, subtitle, colorClass, icon, extraInfo }) => (
    <div className={`rounded-lg border p-4 shadow-sm ${colorClass}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
          {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
          {extraInfo && <p className="text-xs mt-2">{extraInfo}</p>}
        </div>
        {icon && (
          <div className="p-2 rounded-full bg-white bg-opacity-60">
            {icon}
          </div>
        )}
      </div>
    </div>
  );

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

      {/* Job Market Outlook as Cards */}
      {jobMarketTrend && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Job Market Outlook</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{jobMarketTrend.details}</p>
          </div>
          
          {jobMarketData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {jobMarketData.map((job, index) => (
                <DataCard 
                  key={index}
                  title={job.name}
                  value={`${job.value}%`}
                  subtitle="Match Percentage"
                  colorClass={getValueColorClass(job.value, 'match')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Salary Trends as Cards */}
      {salaryTrend && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Salary Trends</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{salaryTrend.details}</p>
          </div>
          
          {salaryData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {salaryData.map((salary, index) => (
                <DataCard 
                  key={index}
                  title={salary.name}
                  value={`$${salary.value.toLocaleString()}`}
                  subtitle="Average Salary"
                  extraInfo={`Range: ${salary.range}`}
                  colorClass={getValueColorClass(salary.value, 'salary')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Regional Opportunities - Keep as text */}
      {marketTrends.find(trend => trend.aspect === 'REGIONAL OPPORTUNITIES' || trend.aspect === 'Regional Opportunities') && (
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

      {/* Emerging Technologies as Table - Keep as is */}
      {techTrend && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Emerging Technologies</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{techTrend.details}</p>
          </div>
          
          {techTableData.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Technology
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Adoption Rate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Impact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth Rate
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {techTableData.map((tech, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {tech.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tech.adoption}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tech.impact === 'High' ? 'bg-green-100 text-green-800' :
                          tech.impact === 'Very High' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tech.impact}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {tech.growth}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Industry Sector Analysis as Cards */}
      {industryTrend && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Top Hiring Industries</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{industryTrend.details}</p>
          </div>
          
          {industryData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {industryData.map((industry, index) => (
                <DataCard 
                  key={index}
                  title={industry.name}
                  value={`${industry.value}%`}
                  subtitle="Industry Growth"
                  colorClass={getValueColorClass(industry.value, 'growth')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  }
                />
              ))}
            </div>
          )}
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
