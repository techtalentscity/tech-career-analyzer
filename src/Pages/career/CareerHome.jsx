// src/Pages/career/CareerHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CareerHome = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/career/test');
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 mb-12 text-white">
        <h1 className="text-4xl font-bold mb-4">Discover Your Tech Career Path</h1>
        <p className="text-xl mb-6">
          Find the perfect tech career that matches your interests, skills, and goals with our AI-powered assessment.
        </p>
        <button
          onClick={handleStartTest}
          className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
        >
          Start Your Assessment
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</div>
              <div>
                <p className="font-semibold text-lg">Complete the Assessment</p>
                <p className="text-gray-600">Answer questions about your interests, skills, and goals in technology.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</div>
              <div>
                <p className="font-semibold text-lg">AI Analysis</p>
                <p className="text-gray-600">Our AI analyzes your responses to identify the best career paths for you.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</div>
              <div>
                <p className="font-semibold text-lg">Get Your Personalized Results</p>
                <p className="text-gray-600">Receive detailed career recommendations, skill development advice, and courses.</p>
              </div>
            </li>
          </ol>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Use Our Assessment</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              <p><span className="font-semibold">AI-Powered Analysis</span> - An advanced AI assistant, to analyze your unique profile</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              <p><span className="font-semibold">Personalized Recommendations</span> - Tailored career paths based on your specific interests and strengths</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              <p><span className="font-semibold">Skill Development Guidance</span> - Clear direction on which skills to focus on for your chosen path</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              <p><span className="font-semibold">Curated Learning Resources</span> - Recommended courses, learning roadmap and transition strategy</p>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2 text-xl">✓</span>
              <p><span className="font-semibold">100% Free</span> - No cost - just valuable insights for your tech journey</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to Find Your Path?</h2>
        <p className="mb-6 text-lg">
          Take 5-10 minutes to complete our assessment and discover the tech career that's right for you.
        </p>
        <button
          onClick={handleStartTest}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Your Assessment Now
        </button>
      </div>
    </div>
  );
};

export default CareerHome;
