import React from 'react';

const MarketTrendsSection = ({ marketTrends, emptyState }) => {
  if (emptyState) {
    return (
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
    );
  }

  const salaryTrends = marketTrends.filter(trend => trend.type === 'salary');
  const growthTrends = marketTrends.filter(trend => trend.type === 'growth');
  const generalTrends = marketTrends.filter(trend => trend.type === 'general');
  const sectionHeaders = marketTrends.filter(trend => trend.type === 'section_header');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Market Trends Analysis</h2>
      <p className="text-gray-600 mb-6">
        Current job market trends and salary data for your recommended career paths as of {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.
      </p>
      
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

export default MarketTrendsSection;
