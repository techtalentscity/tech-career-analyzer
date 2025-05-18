import React from 'react';
import { formatAnalysisText } from '../utils/dataExtractors';

const AnalysisSection = ({ analysis }) => {
  const formattedContent = formatAnalysisText(analysis);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6">
      <h2 className="text-2xl font-bold mb-6">Detailed Analysis</h2>
      <div>
        {formattedContent}
      </div>
    </div>
  );
};

export default AnalysisSection;
