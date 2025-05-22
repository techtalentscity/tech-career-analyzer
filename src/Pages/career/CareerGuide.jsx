// src/Pages/career/CareerGuide.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerGuide = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('insights');

  // Tabs for different sections
  const tabs = [
    { id: 'insights', label: 'Data-Driven Insights', icon: 'chart' },
    { id: 'coding', label: 'Learning to Code', icon: 'code' },
    { id: 'expert', label: 'Becoming an Expert', icon: 'star' },
    { id: 'career', label: 'Career Development', icon: 'briefcase' },
    { id: 'companies', label: 'Tech Companies', icon: 'office-building' },
    { id: 'relevant', label: 'Staying Relevant', icon: 'refresh' },
    { id: 'company-choice', label: 'Company Choice Impact', icon: 'chart-bar' },
  ];

  // Define icons for each tab
  const getTabIcon = (iconName) => {
    switch (iconName) {
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'star':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'office-building':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'refresh':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'chart-bar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Component for inspirational quote
  const QuoteCard = ({ quote, author, role }) => (
    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg shadow-sm my-6 relative">
      <div className="absolute top-4 left-4 text-teal-400 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <div className="ml-8">
        <p className="text-lg italic font-light text-gray-800 mb-3">{quote}</p>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
            {author.split(' ').map(name => name[0]).join('')}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">{author}</p>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Component for steps with a number
  const NumberedStep = ({ number, title, description }) => (
    <div className="flex mb-6">
      <div className="shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 text-teal-800 font-bold text-xl">
          {number}
        </div>
      </div>
      <div className="ml-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );

  // Content for each tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'insights':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Data-Driven Career Insights</h2>
            
            <div className="max-w-4xl mx-auto mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                Based on comprehensive analysis of 16 tech career guidance videos, here are the most actionable insights for building a successful tech career.
              </p>
              
              <QuoteCard 
                quote="Success in tech isn't just about what you know—it's about who you know, how quickly you learn, and how well you adapt to change."
                author="Analysis of 16 Tech Career Videos"
                role="Data-Driven Insights, May 2025"
              />
              
              {/* Key Findings Dashboard */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">#1 Success Factor</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">Networking</p>
                  <p className="text-gray-700 text-sm">Mentioned 59 times across videos - nearly double any other recommendation</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Hottest Tech</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-2">AI/ML</p>
                  <p className="text-gray-700 text-sm">13 mentions - the most sought-after technical skill</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Data Quality</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 mb-2">100%</p>
                  <p className="text-gray-700 text-sm">Success rate analyzing 16 career guidance videos</p>
                </div>
              </div>
              
              {/* Top Technologies Section */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">🔧 Most Emphasized Technologies</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded">
                        <span className="font-medium">AI/Machine Learning</span>
                        <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded">13 mentions</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-red-100 rounded">
                        <span className="font-medium">Cybersecurity</span>
                        <span className="text-sm bg-red-600 text-white px-2 py-1 rounded">7 mentions</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded">
                        <span className="font-medium">Java</span>
                        <span className="text-sm bg-orange-600 text-white px-2 py-1 rounded">6 mentions</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded">
                        <span className="font-medium">Python</span>
                        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">5 mentions</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded">
                        <span className="font-medium">DevOps</span>
                        <span className="text-sm bg-purple-600 text-white px-2 py-1 rounded">4 mentions</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded">
                        <span className="font-medium">Cloud Computing</span>
                        <span className="text-sm bg-indigo-600 text-white px-2 py-1 rounded">3 mentions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actionable Recommendations */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">✅ Top Actionable Recommendations</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center mr-3 text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Build Professional Networks</h4>
                        <p className="text-sm text-gray-600">59 mentions - The #1 career accelerator</p>
                        <p className="text-sm text-gray-700 mt-1">Attend meetups, join Discord communities, contribute to open source</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center mr-3 text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Continuous Learning</h4>
                        <p className="text-sm text-gray-600">38 mentions - Stay current with tech</p>
                        <p className="text-sm text-gray-700 mt-1">Follow tech blogs, take courses, experiment with new tools</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center mr-3 text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Develop Targeted Skills</h4>
                        <p className="text-sm text-gray-600">32 mentions - Focus on high-impact areas</p>
                        <p className="text-sm text-gray-700 mt-1">Prioritize AI/ML, cybersecurity, and cloud technologies</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center mr-3 text-sm">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Seek Mentorship</h4>
                        <p className="text-sm text-gray-600">31 mentions - Accelerate growth</p>
                        <p className="text-sm text-gray-700 mt-1">Find mentors in your field and become a mentor to others</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center mr-3 text-sm">5</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Pursue Certifications</h4>
                        <p className="text-sm text-gray-600">27 mentions - Validate your skills</p>
                        <p className="text-sm text-gray-700 mt-1">Focus on cloud platforms, AI/ML, and cybersecurity certs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center mr-3 text-sm">6</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Build Portfolio Projects</h4>
                        <p className="text-sm text-gray-600">5 mentions - Demonstrate capabilities</p>
                        <p className="text-sm text-gray-700 mt-1">Create projects that showcase real-world problem solving</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Career Framework */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">🚀 Career Development Framework</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg mb-3 text-blue-800">Entry-Level Professionals</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Focus on foundational skills and certifications</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Build networks early through communities</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Gain practical experience through projects</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Explore various roles to find ideal fit</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg mb-3 text-green-800">Mid-Career Professionals</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Specialize in high-demand technologies</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Develop leadership and mentorship skills</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Consider entrepreneurial opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Build strong personal brand</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg mb-3 text-purple-800">Career Changers</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Leverage transferable skills</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Pursue intensive skill development</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Network extensively in target domains</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Consider entry-level strategic positions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Target Audiences */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">🎯 Primary Target Audiences</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">General Professionals</h4>
                      <p className="text-sm text-gray-600">Broad appeal across career stages</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">64</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Entry-Level Workers</h4>
                      <p className="text-sm text-gray-600">New graduates and career starters</p>
                    </div>
                    <span className="text-2xl font-bold text-green-600">21</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Entrepreneurs</h4>
                      <p className="text-sm text-gray-600">Those considering tech startups</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-600">18</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Career Changers</h4>
                      <p className="text-sm text-gray-600">Transitioning from other industries</p>
                    </div>
                    <span className="text-2xl font-bold text-orange-600">11</span>
                  </div>
                </div>
              </div>
              
              {/* Key Insights Summary */}
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">💼 Key Career Themes</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Adaptability is crucial</strong> in fast-changing tech</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Skills matter more than formal degrees</strong></span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Personal branding enhances visibility</strong></span>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Entrepreneurship as viable career path</strong></span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Diverse career paths</strong> beyond traditional roles</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Industry networking drives opportunities</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-gray-600 font-medium">
                    📊 <strong>Analysis Summary:</strong> 16 videos analyzed • 100% success rate • Frame sampling + AI analysis • May 22, 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'coding':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Learn How to Code</h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                Learning to code is a journey that can open countless doors in the tech industry. The key is finding a structured approach that matches your learning style and goals.
              </p>
              
              <QuoteCard 
                quote="Don't compare yourself with others. The only person you should try to be better than is who you were yesterday."
                author="Quincy Larson"
                role="Founder, freeCodeCamp"
              />
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Choose Your Path</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <h4 className="font-bold text-lg mb-2">For Visual Learners</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Interactive platforms like <a href="https://www.codecademy.com/" className="text-blue-600 hover:underline">Codecademy</a> or <a href="https://www.freecodecamp.org/" className="text-blue-600 hover:underline">freeCodeCamp</a></span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Video courses on platforms like <a href="https://www.udemy.com/" className="text-blue-600 hover:underline">Udemy</a> or <a href="https://www.coursera.org/" className="text-blue-600 hover:underline">Coursera</a></span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>YouTube tutorials from channels like <a href="https://www.youtube.com/c/TraversyMedia" className="text-blue-600 hover:underline">Traversy Media</a> or <a href="https://www.youtube.com/c/TheNetNinja" className="text-blue-600 hover:underline">The Net Ninja</a></span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <h4 className="font-bold text-lg mb-2">For Practical Learners</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Project-based learning with <a href="https://www.theodinproject.com/" className="text-blue-600 hover:underline">The Odin Project</a></span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Coding challenges on <a href="https://www.codewars.com/" className="text-blue-600 hover:underline">Codewars</a> or <a href="https://leetcode.com/" className="text-blue-600 hover:underline">LeetCode</a></span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Contributing to open source on <a href="https://github.com/" className="text-blue-600 hover:underline">GitHub</a></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Proven Learning Framework</h3>
              
              <div className="space-y-6">
                <NumberedStep 
                  number="1" 
                  title="Master the fundamentals first" 
                  description="Start with the basics of a language, understand variables, control flow, and data structures before moving to complex topics."
                />
                
                <NumberedStep 
                  number="2" 
                  title="Build real projects" 
                  description="Apply your knowledge by building complete projects. This cements your learning and gives you portfolio pieces to show employers."
                />
                
                <NumberedStep 
                  number="3" 
                  title="Learn by teaching" 
                  description="Explain concepts to others through blog posts, forums, or mentoring. Teaching forces you to understand topics deeply."
                />
                
                <NumberedStep 
                  number="4" 
                  title="Join a community" 
                  description="Connect with other learners through Discord servers, Reddit communities, or local meetups for support and accountability."
                />
                
                <NumberedStep 
                  number="5" 
                  title="Embrace the debugger" 
                  description="Learning to debug effectively will save you countless hours. Understand how to trace through code and read error messages."
                />
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-3 text-indigo-900">First Programming Language Recommendations</h3>
                <p className="text-sm text-gray-700 mb-4">Based on industry analysis, these languages are most emphasized in tech career guidance:</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm border-l-4 border-green-500">
                    <h4 className="font-bold text-green-700">Python</h4>
                    <p className="text-sm">⭐ Most recommended (5 mentions). Beginner-friendly syntax. Essential for AI/ML, data science, and automation.</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm border-l-4 border-orange-500">
                    <h4 className="font-bold text-orange-700">Java</h4>
                    <p className="text-sm">⭐ Highly demanded (6 mentions). Enterprise-ready with strong typing. Excellent for backend and Android development.</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700">JavaScript</h4>
                    <p className="text-sm">Essential for web development. Can build frontend, backend, and mobile apps. High job market demand.</p>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-100 rounded">
                  <p className="text-sm font-medium text-yellow-800">
                    💡 Pro Tip: Focus on Python or Java first as they're most emphasized in career guidance, then add JavaScript for web development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Other tab content would go here...</div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2">
          <button
            onClick={() => navigate('/career/dashboard')}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tech Career Development Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate your career in technology with data-driven insights and expert advice on learning, growth, and strategic career planning.
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-3 text-sm md:text-base whitespace-nowrap font-medium flex items-center ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{getTabIcon(tab.icon)}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGuide;
