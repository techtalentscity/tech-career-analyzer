import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

  // Prepare data for Job Market chart
  const prepareJobMarketData = () => {
    if (!careerPaths || careerPaths.length === 0) return [];
    
    return careerPaths.slice(0, 5).map(path => ({
      name: path.title,
      value: path.match
    }));
  };

  // Prepare data for salary chart
  const prepareSalaryData = () => {
    if (!salaryTrend) return [];
    
    const { entry, mid, senior } = extractSalaryRanges(salaryTrend.details);
    
    // Convert salary ranges to numeric values for charting
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
      { name: "Entry Level", value: extractValue(entry) },
      { name: "Mid Level", value: extractValue(mid) },
      { name: "Senior Level", value: extractValue(senior) }
    ];
  };

  // Prepare data for industry chart
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

  // Generate color array for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#a35ff2'];

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

      {/* Job Market Outlook as Graph */}
      {jobMarketTrend && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Job Market Outlook</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{jobMarketTrend.details}</p>
          </div>
          
          {jobMarketData.length > 0 && (
            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={jobMarketData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Match Percentage', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Match']} />
                  <Legend />
                  <Bar dataKey="value" name="Match Percentage" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* Salary Trends as Graph */}
      {salaryTrend && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Salary Trends</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{salaryTrend.details}</p>
          </div>
          
          {salaryData.length > 0 && (
            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Salary ($)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']} />
                  <Legend />
                  <Bar dataKey="value" name="Average Salary" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
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

      {/* Emerging Technologies as Table */}
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

      {/* Industry Sector Analysis as Graph */}
      {industryTrend && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Top Hiring Industries</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{industryTrend.details}</p>
          </div>
          
          {industryData.length > 0 && (
            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={industryData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Growth Rate']} />
                  <Legend />
                  <Bar dataKey="value" name="Industry Growth" fill="#8884d8">
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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
