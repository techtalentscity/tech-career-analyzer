// src/Pages/career/CareerHome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CareerHome = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate('/career/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl transform rotate-1"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Discover Your Tech Career Path
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Find the perfect tech career that matches your interests, skills, and goals with our AI-powered assessment.
              </p>
              <button
                onClick={handleStartTest}
                className="bg-white text-blue-600 px-10 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition duration-200 shadow-lg"
              >
                Start Your Assessment →
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* How It Works */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">How It Works</h2>
            <div className="space-y-6">
              {[
                {
                  title: "Complete the Assessment",
                  description: "Answer questions about your interests, skills, and goals in technology.",
                  icon: "📝"
                },
                {
                  title: "AI Analysis",
                  description: "Our AI analyzes your responses to identify the best career paths for you.",
                  icon: "🤖"
                },
                {
                  title: "Get Your Personalized Results",
                  description: "Receive detailed career recommendations, skill development advice, and courses.",
                  icon: "📊"
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0 shadow-lg">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-xl mb-1 text-gray-800">{step.title}</p>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="text-3xl ml-4">{step.icon}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Why Use Our Assessment */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Why Choose Us</h2>
            <ul className="space-y-4">
              {[
                {
                  title: "AI-Powered Analysis",
                  description: "Advanced AI technology analyzes your unique profile",
                  icon: "🧠"
                },
                {
                  title: "Personalized Recommendations",
                  description: "Tailored career paths based on your interests and strengths",
                  icon: "🎯"
                },
                {
                  title: "Skill Development Guide",
                  description: "Clear direction on which skills to focus on",
                  icon: "📈"
                },
                {
                  title: "Curated Resources",
                  description: "Recommended courses and learning roadmap",
                  icon: "📚"
                },
                {
                  title: "100% Free",
                  description: "No hidden costs or premium features",
                  icon: "💚"
                }
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-2xl mr-3">{feature.icon}</span>
                  <div>
                    <span className="font-semibold text-gray-800">{feature.title}</span>
                    <span className="text-gray-600"> - {feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { number: "50+", label: "Tech Career Paths", icon: "💼" },
            { number: "5-10", label: "Minutes to Complete", icon: "⏱️" },
            { number: "100%", label: "Free Forever", icon: "✨" }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg transform hover:scale-105 transition duration-200">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Tech Career?</h2>
          <p className="mb-8 text-lg text-indigo-100 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered their ideal tech career path through our AI-powered assessment.
          </p>
          <button
            onClick={handleStartTest}
            className="bg-white text-indigo-600 px-12 py-4 rounded-full font-semibold text-lg hover:bg-indigo-50 transform hover:scale-105 transition duration-200 shadow-lg"
          >
            Start Your Free Assessment
          </button>
          <p className="mt-4 text-sm text-indigo-200">
            No credit card required • Results in minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerHome;
