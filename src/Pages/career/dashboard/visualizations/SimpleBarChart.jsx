import React from 'react';

const SimpleBarChart = ({ data, title }) => {
  if (!data || data.length === 0) return null;
  
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="mb-6">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
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

export default SimpleBarChart;
