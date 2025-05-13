// src/Pages/career/CareerHome.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Constants
const FEATURES = [
  {
    title: "Career Path Recommendations",
    description: "Get matched with ideal tech careers based on your profile, with match percentages and timeline estimates",
    icon: "🎯",
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Strengths Analysis",
    description: "Detailed breakdown of your transferable skills and how they apply to tech roles",
    icon: "💪",
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Skills Gap Analysis",
    description: "Identify exact technical skills you need to develop for your target career path",
    icon: "📊",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Learning Roadmap",
    description: "Month-by-month plan with specific courses and projects to build your skills",
    icon: "🗺️",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Transition Strategy",
    description: "Practical steps to move from your current role to your target tech position",
    icon: "🚀",
    color: "from-indigo-500 to-purple-500"
  },
  {
    title: "Export Results",
    description: "Download your complete career analysis as a PDF for future reference",
    icon: "📄",
    color: "from-gray-600 to-gray-800"
  }
];

const PROCESS_STEPS = [
  {
    step: "1",
    title: "Complete Assessment",
    description: "Answer questions about your education, experience, skills, and career goals",
    icon: "📝",
    animationDelay: "delay-0"
  },
  {
    step: "2",
    title: "AI Analysis",
    description: "Our AI analyzes your profile to identify the best career matches and learning paths",
    icon: "🤖",
    animationDelay: "delay-100"
  },
  {
    step: "3",
    title: "Get Your Results",
    description: "Receive comprehensive career recommendations with actionable next steps",
    icon: "📊",
    animationDelay: "delay-200"
  }
];

const FAQs = [
  {
    question: "How long does the assessment take?",
    answer: "The assessment typically takes 15-20 minutes to complete. We recommend setting aside uninterrupted time to thoughtfully answer each question."
  },
  {
    question: "What if I don't have any tech experience?",
    answer: "That's perfectly fine! Our AI is designed to identify transferable skills from any background and recommend career paths with realistic transition plans."
  },
  {
    question: "How accurate are the recommendations?",
    answer: "Our recommendations are based on analysis of thousands of successful career transitions. While individual results vary, most users find our suggestions highly relevant."
  },
  {
    question: "Can I retake the assessment?",
    answer: "Yes, you can retake the assessment anytime to update your profile or explore different career options."
  }
];

// Component
const CareerHome = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const sampleResultsRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStartTest = () => {
    navigate('/career/test');
  };

  const handleViewSampleResults = () => {
    sampleResultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <section 
          className={`relative mb-20 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          aria-label="Hero section"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl transform rotate-1 opacity-90 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl transform -rotate-1 opacity-90 animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl backdrop-blur-sm">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-indigo-100 uppercase tracking-wider text-sm font-medium">AI-Powered Career Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Your Tech
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                  Career Path
                </span>
              </h1>
              <p className="text-lg md:text-xl mb-10 text-indigo-100 max-w-2xl">
                Get comprehensive AI-powered analysis of your career options with personalized recommendations, skills gap analysis, and learning roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartTest}
                  className="bg-white text-indigo-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-indigo-50 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center group"
                  aria-label="Start your career assessment"
                >
                  Start Your Assessment
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={handleViewSampleResults}
                  className="bg-transparent border-2 border-white text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
                  aria-label="View sample results"
                >
                  See Sample Results
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="mb-16 text-center">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔒</span>
              <span className="text-gray-600">Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="text-gray-600">Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎯</span>
              <span className="text-gray-600">Science-Based</span>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="mb-20" aria-label="Features">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">What You Get</h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
            Our comprehensive career assessment provides everything you need to make an informed career transition
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature, index) => (
              <article 
                key={index} 
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`text-4xl mb-4 transform group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-500 mt-4 rounded-full`}></div>
              </article>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20" aria-label="Process">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {PROCESS_STEPS.map((item, index) => (
                <article 
                  key={index} 
                  className={`text-center transition-all duration-700 ${isVisible ? 'animate-fade-up' : 'opacity-0'} ${item.animationDelay}`}
                >
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold transform hover:rotate-12 transition-transform">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="text-3xl mt-4 transform hover:scale-110 transition-transform">{item.icon}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Results Preview */}
        <section ref={sampleResultsRef} className="mb-20" aria-label="Sample results">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">What Your Results Look Like</h2>
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4 text-indigo-600">Career Matches</h3>
                <div className="space-y-3">
                  {[
                    { title: "Data Analyst", match: 85, color: "green" },
                    { title: "AI Research Assistant", match: 70, color: "blue" },
                    { title: "Technical Writer", match: 65, color: "yellow" }
                  ].map((career, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span>{career.title}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 bg-${career.color}-500 rounded-full transition-all duration-1000`} 
                            style={{ width: `${career.match}%` }}
                          ></div>
                        </div>
                        <span className={`font-bold text-${career.color}-600`}>{career.match}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4 text-indigo-600">Your Strengths</h3>
                <ul className="space-y-2">
                  {[
                    "Strong analytical skills",
                    "Computer Science background",
                    "Project management experience",
                    "Excellent communication abilities",
                    "Problem-solving mindset"
                  ].map((strength, index) => (
                    <li key={index} className="flex items-center group">
                      <span className="text-green-500 mr-2 transform group-hover:scale-110 transition-transform">✓</span>
                      <span className="group-hover:text-indigo-600 transition-colors">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
              <p className="text-sm text-indigo-700 font-medium">
                <span className="font-bold">Next Step:</span> Complete the full assessment to get your personalized career roadmap
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20" aria-label="Frequently asked questions">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {FAQs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  className="w-full text-left p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  aria-expanded={expandedFAQ === index}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-800">{faq.question}</h3>
                    <span className={`transform transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </div>
                  {expandedFAQ === index && (
                    <p className="mt-4 text-gray-600">{faq.answer}</p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative" aria-label="Call to action">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-70"></div>
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Tech Career Path?</h2>
            <p className="mb-10 text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Take our comprehensive assessment and get personalized recommendations for your tech career transition.
            </p>
            <button
              onClick={handleStartTest}
              className="bg-white text-purple-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-white hover:to-purple-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
              aria-label="Begin your career assessment"
            >
              Begin Your Assessment
            </button>
            <p className="mt-8 text-sm text-purple-200">
              Join the professionals who've successfully transitioned to tech careers
            </p>
          </div>
        </section>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-0 {
          animation-delay: 0ms;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
};

export default CareerHome;
