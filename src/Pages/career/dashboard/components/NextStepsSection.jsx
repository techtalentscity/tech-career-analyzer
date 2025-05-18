import React from 'react';

const NextStepsSection = ({ nextSteps }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Recommended Next Steps</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {nextSteps.map((step, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className={`${step.color} mb-2`}>
              {step.icon}
            </div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextStepsSection;
