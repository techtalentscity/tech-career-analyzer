import React from 'react';

const NetworkingSection = ({ strategies }) => {
  const strategyItems = strategies.filter(item => item.type === 'strategy');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">Networking Strategy</h2>
      <div className="bg-gray-50 rounded-lg p-4">
        <ul className="space-y-3">
          {strategyItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-600 mr-2 mt-1">•</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NetworkingSection;
