// src/Pages/career/CareerGuide.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CareerGuide = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('coding');

  // Tabs for different sections
  const tabs = [
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

  // Company card component
  const CompanyCard = ({ name, logo, description, technologies, focus }) => (
    <div className="bg-white rounded-lg shadow-md p-5 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${logo.bgColor}`}>
          {logo.svg}
        </div>
        <h3 className="ml-3 text-xl font-bold">{name}</h3>
      </div>
      <p className="text-gray-700 mb-4 text-sm">{description}</p>
      <div className="mb-3">
        <span className="text-sm font-semibold text-gray-800">Tech Focus:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.map((tech, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="text-sm font-semibold text-gray-800">Career Focus:</span>
        <p className="mt-1 text-sm text-gray-700">{focus}</p>
      </div>
    </div>
  );

  // Info card component
  const InfoCard = ({ icon, title, description }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
          {icon}
        </div>
        <h3 className="ml-3 text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-700">{description}</p>
    </div>
  );

  // Skill comparison card component
  const SkillComparisonCard = ({ companyType, skills, certifications }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-4">
        <h3 className="text-white font-bold text-lg">{companyType}</h3>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-800">Key Skills</h4>
          <ul className="space-y-1">
            {skills.map((skill, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-gray-800">Valuable Certifications</h4>
          <ul className="space-y-1">
            {certifications.map((cert, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Content for each tab
  const renderTabContent = () => {
    switch (activeTab) {
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
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-bold text-indigo-700">JavaScript</h4>
                    <p className="text-sm">Great for web development and widely used. Can build frontend, backend, and mobile apps.</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-bold text-indigo-700">Python</h4>
                    <p className="text-sm">Beginner-friendly syntax. Excellent for data science, automation, and web backends.</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow-sm">
                    <h4 className="font-bold text-indigo-700">Java</h4>
                    <p className="text-sm">Enterprise-ready language with strong typing. Good for Android and backend development.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'expert':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Become an Expert in a Tech Field</h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                Moving from competence to expertise requires deliberate practice, specialized knowledge, and a growth mindset. Here's how to reach the expert level in your chosen tech field.
              </p>
              
              <QuoteCard 
                quote="The key to expertise isn't talent, it's deliberate practice. That means pushing yourself just outside your comfort zone, trying activities beyond your current abilities, and giving your full concentration."
                author="Anders Ericsson"
                role="Psychologist & Expertise Researcher"
              />
              
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">The Expertise Roadmap</h3>
                
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-200 rounded"></div>
                  
                  {/* Milestones */}
                  <div className="ml-12 space-y-12 relative">
                    <div className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <h4 className="text-lg font-semibold mb-2 text-blue-800">Develop T-Shaped Knowledge</h4>
                      <p className="text-gray-700 mb-3">
                        Go broad across your field to understand the landscape, then go deep in a specialized area. The "T" shape represents breadth and depth.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-medium text-gray-900 mb-2">Action Items:</h5>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Map out your field and identify where you want to specialize</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Take introductory courses in adjacent areas (breadth)</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Deep dive into your specialization through projects and advanced courses</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <h4 className="text-lg font-semibold mb-2 text-blue-800">Practice Deliberately</h4>
                      <p className="text-gray-700 mb-3">
                        Focus on specific skills at the edge of your abilities, get immediate feedback, and repeat with adjustments.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-medium text-gray-900 mb-2">Deliberate Practice Technique:</h5>
                        <ol className="list-decimal ml-5 space-y-1">
                          <li>Identify a specific sub-skill to improve</li>
                          <li>Set a measurable goal for that skill</li>
                          <li>Break it down into focused practice sessions</li>
                          <li>Get immediate feedback (from mentors, tests, or output analysis)</li>
                          <li>Reflect on results and adjust accordingly</li>
                          <li>Repeat regularly over time</li>
                        </ol>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <h4 className="text-lg font-semibold mb-2 text-blue-800">Understand First Principles</h4>
                      <p className="text-gray-700 mb-3">
                        Don't just learn how to use tools; understand how and why they work at a fundamental level.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                          <svg className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <h5 className="font-medium text-gray-900">Key Insight:</h5>
                        </div>
                        <p className="text-gray-700">
                          Experts can solve novel problems because they understand the underlying principles, not just memorized solutions. When learning new technologies, always ask: "Why was this designed this way?" and "What problem does this solve?"
                        </p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                      <h4 className="text-lg font-semibold mb-2 text-blue-800">Build a Knowledge Portfolio</h4>
                      <p className="text-gray-700 mb-3">
                        Document your learning journey and build tangible proof of your expertise through content creation.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Create and Share:</h5>
                          <ul className="space-y-1">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Technical blog posts</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Open source contributions</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Conference presentations</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Benefits:</h5>
                          <ul className="space-y-1">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Reinforces your learning</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Builds your reputation</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Attracts mentors and peers</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                      <h4 className="text-lg font-semibold mb-2 text-blue-800">Engage With the Expert Community</h4>
                      <p className="text-gray-700 mb-3">
                        True expertise develops within a community of practice. Find your tribe and engage deeply.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-medium text-gray-900 mb-2">How to Engage:</h5>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Attend and speak at conferences (virtually or in person)</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Join specialized Discord servers, Slack groups, or forums</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Contribute to open source projects in your specialty</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Participate in specialized working groups or standards committees</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-3 text-yellow-800">Expert-Level Resources</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="shrink-0 mr-3">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Academic Papers and Research</h4>
                      <p className="text-sm text-gray-700">Search academic databases like <a href="https://arxiv.org/" className="text-blue-600 hover:underline">arXiv</a> and <a href="https://scholar.google.com/" className="text-blue-600 hover:underline">Google Scholar</a> for cutting-edge research in your field</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="shrink-0 mr-3">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Technical Publications</h4>
                      <p className="text-sm text-gray-700">Follow field-specific journals, blogs from thought leaders, and company engineering blogs like <a href="https://engineering.fb.com/" className="text-blue-600 hover:underline">Meta Engineering</a> or <a href="https://aws.amazon.com/blogs/aws/" className="text-blue-600 hover:underline">AWS Blog</a></p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="shrink-0 mr-3">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Advanced Courses and Workshops</h4>
                      <p className="text-sm text-gray-700">Platforms like <a href="https://frontendmasters.com/" className="text-blue-600 hover:underline">Frontend Masters</a> and <a href="https://www.pluralsight.com/" className="text-blue-600 hover:underline">Pluralsight</a> offer expert-level technical courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'career':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Develop a Successful Career in Tech</h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                Building a successful tech career goes beyond technical skills. It requires strategic planning, soft skills development, and understanding the industry landscape.
              </p>
              
              <QuoteCard 
                quote="Your career is a marathon, not a sprint. Focus on making decisions that compound over time rather than seeking short-term gains."
                author="Satya Nadella"
                role="CEO, Microsoft"
              />
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">The Career Success Framework</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">Technical Excellence</h4>
                    <p className="text-gray-700 mb-3">The foundation of your career. Continuously build your technical skills and stay current with industry trends.</p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Master your core technologies</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Understand adjacent technologies</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-blue-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Create portfolio projects</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-5 rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">Relationship Building</h4>
                    <p className="text-gray-700 mb-3">Tech careers accelerate through meaningful professional relationships and networks.</p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-purple-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Build authentic connections</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-purple-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Find mentors and sponsors</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-purple-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Contribute to communities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-5 rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">Strategic Growth</h4>
                    <p className="text-gray-700 mb-3">Make intentional career moves that build toward your long-term vision and goals.</p>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Define your career vision</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Take high-impact opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Build your personal brand</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Tech Career Growth Tactics</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Build a Visible Portfolio</h4>
                  <p className="text-gray-700 mb-3">
                    Your work should be visible to potential employers and collaborators. Create tangible evidence of your skills and accomplishments.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Maintain an active GitHub profile with clean, well-documented projects</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Create a personal website or blog to share your knowledge and showcase projects</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Contribute to open source or participate in hackathons</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Develop Communication Skills</h4>
                  <p className="text-gray-700 mb-3">
                    Technical excellence alone isn't enough. Your ability to communicate complex ideas clearly sets you apart.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-red-50 p-4 rounded">
                      <h5 className="font-medium text-gray-900 mb-2">Written Communication</h5>
                      <ul className="space-y-1 text-sm">
                        <li>Technical documentation</li>
                        <li>Email and messaging clarity</li>
                        <li>Blog posts and articles</li>
                        <li>Concise and clear specifications</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 p-4 rounded">
                      <h5 className="font-medium text-gray-900 mb-2">Verbal Communication</h5>
                      <ul className="space-y-1 text-sm">
                        <li>Technical presentations</li>
                        <li>Meeting facilitation</li>
                        <li>Explaining complex concepts simply</li>
                        <li>Active listening skills</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Understand the Business Side</h4>
                  <p className="text-gray-700 mb-3">
                    Technical professionals who understand business create more value and advance faster in their careers.
                  </p>
                  <div className="bg-yellow-50 p-4 rounded">
                    <h5 className="font-medium text-gray-900 mb-2">Areas to Develop:</h5>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Product economics</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Market analysis</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Project ROI</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Customer needs</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>Growth metrics</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <span>Industry trends</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Choose the Right Career Path</h4>
                  <p className="text-gray-700 mb-3">
                    Tech careers have multiple advancement paths. Choose the one that aligns with your strengths and interests.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-medium text-gray-900 mb-2">Technical Path</h5>
                      <p className="text-sm text-gray-700 mb-2">Advance as a technical expert without moving into management</p>
                      <div className="text-xs text-gray-500">
                        Junior Developer → Senior Developer → Principal Engineer → Technical Fellow
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-medium text-gray-900 mb-2">Management Path</h5>
                      <p className="text-sm text-gray-700 mb-2">Lead teams and focus on people and project management</p>
                      <div className="text-xs text-gray-500">
                        Team Lead → Engineering Manager → Director → VP of Engineering
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <h5 className="font-medium text-gray-900 mb-2">Product Path</h5>
                      <p className="text-sm text-gray-700 mb-2">Bridge technical and business aspects by managing products</p>
                      <div className="text-xs text-gray-500">
                        Associate PM → Product Manager → Senior PM → Director of Product
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Fast-Track Your Career Growth</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold mr-3 shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Work on high-visibility projects</h4>
                      <p className="text-sm text-gray-700">Volunteer for important projects that get noticed by leadership. Look for opportunities with cross-functional exposure.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold mr-3 shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Seek mentorship from senior leaders</h4>
                      <p className="text-sm text-gray-700">Don't just focus on technical mentors. Build relationships with leaders who can sponsor your advancement.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold mr-3 shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Develop adjacent skills</h4>
                      <p className="text-sm text-gray-700">Broaden your skill set beyond your core technical area. Learn product, design, or business skills to stand out.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center text-blue-700 font-bold mr-3 shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Build your personal brand</h4>
                      <p className="text-sm text-gray-700">Be known for something specific. Speak at conferences, write blog posts, or create content that establishes your expertise.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'companies':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Different Tech Companies and Their Tech Focus</h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                Each technology company has its own unique technological focus and culture. Understanding these differences can help you find the right fit for your career goals and interests.
              </p>
              
              <QuoteCard 
                quote="Choose a company not just for what it is today, but for what it's trying to become tomorrow, and how it aligns with your own vision for the future."
                author="Sundar Pichai"
                role="CEO, Google and Alphabet"
              />
              
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Major Tech Companies</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <CompanyCard 
                  name="Google"
                  logo={{
                    bgColor: "bg-white",
                    svg: <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                  }}
                  description="A global technology leader focused on organizing the world's information and making it universally accessible and useful."
                  technologies={["AI/ML", "Cloud Computing", "Search", "Android", "Ads", "Maps"]}
                  focus="Google emphasizes innovation in AI, machine learning, and data analytics. Engineers work on large-scale systems that impact billions of users."
                />
                
                <CompanyCard 
                  name="Microsoft"
                  logo={{
                    bgColor: "bg-[#f3f3f3]",
                    svg: <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                  }}
                  description="A leading provider of software, services, devices, and solutions that help people and businesses realize their full potential."
                  technologies={["Cloud (Azure)", ".NET", "Windows", "Office 365", "AI", "Gaming"]}
                  focus="Microsoft focuses on enterprise software and cloud services. Engineers work on development tools, operating systems, and business applications."
                />
                
                <CompanyCard 
                  name="Amazon"
                  logo={{
                    bgColor: "bg-white",
                    svg: <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                      <path fill="#FF9900" d="M15.1 36.7c-3.9 2.9-9.5 4.4-14.4 4.4-.8 0-1.6-.1-2.4-.1-1.9-.2-2.8-1.6-1.2-2.9 2.6-2.1 5.4-3.8 8.4-5.6 1.6-1 3.2-2.1 4.8-3.2.3-.2.8-.1 1 .1 1.3 1.5 2.4 3.1 3.8 4.6.3.5.4.7 0 1.1-.1.1-.1.2 0 .2.1.2.2-.2 0 1.4zm8.8-23.7c0 2.2-.2 4.4-.4 6.6-.2 1.7-.4 3.3-.8 5-.1.5-.5.7-.9.3-1.3-1.1-2.6-2.3-3.9-3.5-.2-.2-.3-.5-.3-.8.4-2.3.8-4.7 1.3-7 .2-1.1.5-2.3.7-3.4.1-.5.1-1 .3-1.6.3.2.6.3.8.5 1.1.9 2.1 1.8 3.2 2.7.1.5.1 1.1.1 1.7-.1-.1-.1-.1-.1-.5z"/><path fill="#FF9900" d="M23.9 13c0-.5 0-1-.1-1.5 0-.5-.2-.7-.7-.8-1.2-.2-2.4-.3-3.6-.4-1.3-.1-2.7-.3-4-.3-1.1 0-2.2.2-3.4.3-.8.1-1.7.1-2.5.2-.1 0-.3.1-.4.1-.6.2-.6.2-.6.8v.3c0 .2.1.5.1.7.2.9.3 1.9.5 2.8.3 1.3.5 2.5.8 3.8.1.5.4.7.9.7h.3c1.4-.1 2.8-.3 4.2-.4 1.4-.1 2.8-.2 4.2-.1 1.1.1 2.1.2 3.1.3.2 0 .6.1.8.1.3 0 .4-.2.4-.4.3-2.1.4-4.1.4-6.2h-.4z"/><path fill="#FF9900" d="M32.2 29c-.1.1-.3.2-.4.3-.6.4-1.2.8-1.9 1.1-3.3 1.7-6.6 3.3-9.9 5-1.2.6-2.4 1.2-3.6 1.9-.3.1-.6.3-.9.5-.7.4-1.3.2-1.6-.5-.6-1.2-1.1-2.5-1.6-3.7-.2-.5 0-.8.3-1.1.4-.4.8-.8 1.2-1.1 2.8-2.1 5.8-4 8.8-5.9 1.2-.7 2.3-1.4 3.5-2.1.4-.2.8-.2 1.1.1.1.1.2.2.3.2 1.2.9 2.4 1.8 3.6 2.6.5.3.9.7 1.3 1 .7.7.7 1.1.1 1.8.2-.1-.1-.1-.3-.1z"/><path fill="#232F3E" d="M36.1 29.2c-.8-.1-1.5-.2-2.1-.5-1.5-.4-3.1-.8-4.7-1.1-1-.2-1.9-.1-2.8-.2-1.1-.1-2.2-.2-3.3-.4-2.6-.4-5.1-.9-7.7-1.5-2.1-.5-4.1-1.2-6.1-1.9-1.3-.6-2.4-.6-3.7 0-1.2.5-2.6.6-3.6-.4-.1-.1-.1-.2-.2-.3 0 0 0-.1.1-.1.8-.3 1.7-.6 2.5-.9.3-.1.7-.3 1-.4.4-.1.8-.2 1.2-.2.2 0 .5.1.7.3.3.2.6.5.9.7.1.1.3.1.4.1h.1c.2-.1.1-.3.1-.5v-.9c0-.2-.1-.6.2-.6s.4.3.5.6c.1.4.2.7.2 1.1 0 .2.1.3.3.3s.4-.1.4-.3c.2-.4.4-.8.5-1.2.1-.2.2-.4.4-.4.3 0 .1.3.3.4.1.1.3 0 .4-.1.1-.1.1-.3.1-.4-.1-.7-.3-1.4-.4-2-.1-.5-.2-1-.3-1.5-.1-.3-.1-.6 0-.9.1-.7.2-1.4.3-2 .1-.5.2-1 .3-1.5 0-.2.1-.3.3-.4 1.8-.8 3.8-1.1 5.7-1.2 2-.1 3.9-.1 5.9.3 1.7.3 3.5.5 5.2.8 1.9.3 3.8.7 5.6 1.5.5.2.6.2.8-.3.1-.3.2-.6.2-.9.1-.9.2-1.7.3-2.6.1-.6.1-1.3.2-1.9 0-.2.1-.3.4-.3.3.1.6.2.8.3.1.4.2.7.2 1.1.1.5.1 1 .1 1.4.1.9.2 1.7.3 2.6 0 .2.2.3.4.2.3-.2.5-.4.8-.6.1-.1.3-.2.4-.3.2-.1.5-.1.7 0 .5.1 1 .3 1.4.4.5.2.9.3 1.4.5.2.1.4.2.5.3.2.2.4.4.5.6.1.2.1.4.1.5 0 .4-.1.9-.3 1.3-.8 1.3-1.6 2.6-2.3 3.9-.6 1-1.3 2-1.9 3-.1.1-.2.3-.2.4 0 .2.1.3.2.4.1.1.2.1.3.1h.4c.2 0 .5 0 .7-.1 1.1-.4 2.1-.8 3.2-1.2.5-.2 1-.3 1.5-.5.2-.1.3-.1.5-.2 0 0 .1 0 .1.1-.1.5-.1 1-.2 1.5 0 .4-.2.7-.4 1-.3.4-.6.7-.9 1-.1.1-.2.2-.3.2-.1.2-.2.4-.4.2-.6-.1-1.1-.2-1.6-.3zm-22.5-16c-.7.2-1.4.3-2.1.5-.1 0-.3.1-.4.2-.1.1-.1.2 0 .3.1.1.1.1.2.1.2 0 .4 0 .5-.1.6-.2 1.1-.3 1.7-.5.1 0 .3-.1.4-.2.1-.1.1-.2 0-.3-.1-.1-.2-.1-.3 0zm-2.4 3.6c.5-.1 1-.3 1.5-.4.1 0 .3-.1.3-.2.1-.1.1-.2-.1-.3h-.2c-.5.1-1 .2-1.5.3-.1 0-.3.1-.3.2-.1.1-.1.2.1.3 0 .1.1.1.2.1zm1.2 1.2c-.7.1-1.4.3-2.1.4-.1 0-.2.1-.3.2-.1.1-.1.2 0 .3.1.1.1.1.2.1.2 0 .3 0 .5-.1.6-.1 1.2-.2 1.7-.4.1 0 .2-.1.3-.2.1-.1.1-.2-.1-.3 0 0-.1 0-.2 0zm.7-4.2c-.6.1-1.1.2-1.7.3-.1 0-.3.1-.4.1-.1.1-.2.2-.1.3.1.1.1.1.2.1.2 0 .3 0 .5-.1.5-.1 1.1-.2 1.6-.3.1 0 .3-.1.3-.2.1-.1 0-.3-.1-.3-.1.1-.2.1-.3.1zm3.2.1c-.6 0-1.1 0-1.7.1-.1 0-.3 0-.4.1-.1.1-.2.2-.1.3.1.1.1.1.2.1h.5c.5 0 1.1-.1 1.6-.1.1 0 .3 0 .4-.1.1-.1.1-.2 0-.3-.1-.1-.2-.1-.5-.1zm-6.3 4.8c-.3.1-.5.2-.8.3-.1 0-.1.1-.2.1-.1.1-.1.2 0 .3.1.1.1.1.2 0 .3-.1.5-.2.8-.3.1 0 .1-.1.2-.1.1-.1.1-.2 0-.3-.1.1-.1 0-.2 0zm-.8 2.1c.1-.1.2-.1.2-.2.1-.1.1-.3 0-.3-.1-.1-.1-.1-.2 0-.2.1-.4.1-.5.2-.1 0-.2.1-.2.2-.1.1-.1.2 0 .3.1.1.1.1.2 0 .2-.1.3-.2.5-.2zm-.8 1.6c-.2.1-.3.1-.5.2-.1 0-.1.1-.2.1-.1.1-.1.2 0 .3.1.1.1 0 .2 0 .2-.1.3-.1.5-.2.1 0 .1-.1.2-.1.1-.1.1-.2 0-.3-.1 0-.1 0-.2 0z"/>
                    </svg>
                  }}
                  description="E-commerce giant that also leads in cloud computing with AWS, offering diverse technology solutions and services."
                  technologies={["AWS", "Distributed Systems", "Big Data", "ML/AI", "IoT", "E-commerce"]}
                  focus="Amazon values operational excellence and customer obsession. Engineers at Amazon build highly scalable, fault-tolerant systems that serve millions of customers."
                />
                
                <CompanyCard 
                  name="Apple"
                  logo={{
                    bgColor: "bg-white",
                    svg: <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z"/>
                    </svg>
                  }}
                  description="Known for innovative consumer hardware and integrated software experiences, with a focus on design and user experience."
                  technologies={["iOS/MacOS", "Swift", "Hardware Integration", "UX Design", "AR/VR", "Security"]}
                  focus="Apple emphasizes the intersection of hardware and software. Engineers focus on building tightly integrated, high-performance products with exceptional user experiences."
                />
                
                <CompanyCard 
                  name="Meta (Facebook)"
                  logo={{
                    bgColor: "bg-[#0668E1]",
                    svg: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
                    </svg>
                  }}
                  description="Social media giant focusing on connecting people and building the metaverse, with significant investments in AR/VR technology."
                  technologies={["React", "GraphQL", "Distributed Systems", "AI/ML", "AR/VR", "Mobile"]}
                  focus="Meta builds technologies at massive scale. Engineers focus on performance optimization, distributed systems, and creating new ways for people to connect."
                />
                
                <CompanyCard 
                  name="Netflix"
                  logo={{
                    bgColor: "bg-[#E50914]",
                    svg: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.5 2h4l2.94 8.83L13.5 2h4v20c-1.25-.22-2.63-.36-4-.41L10.5 13.2 10.42 22c-1.37.07-2.75.22-4 .45L6.5 2Z"/>
                    </svg>
                  }}
                  description="Streaming giant known for its recommendation algorithms, content delivery infrastructure, and data-driven culture."
                  technologies={["Microservices", "Content Delivery", "Recommendation Algorithms", "Data Engineering", "A/B Testing"]}
                  focus="Netflix engineers build reliable, globally distributed systems that deliver content to millions of users. Strong emphasis on data science, performance, and resilience."
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <CompanyCard 
                  name="Salesforce"
                  logo={{
                    bgColor: "bg-[#00A1E0]",
                    svg: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.9 7.09c-.4-.2-.7-.3-1.1-.3-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8-.3.3-.6.7-.7 1.1-.2.4-.3.9-.3 1.4 0 .5.1 1 .3 1.4.2.4.5.8.8 1.1.3.3.7.5 1.1.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.4-.2.8-.4 1.2-.8l.9.9c-.4.4-1 .8-1.6 1-1.2.5-2.7.5-3.9 0-.6-.2-1.1-.6-1.6-1s-.8-1-1.1-1.6c-.2-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9c.3-.6.6-1.1 1.1-1.6.4-.4 1-.8 1.6-1 .6-.2 1.2-.4 1.9-.4.6 0 1.3.1 1.9.4.6.3 1.1.6 1.5 1.1l-.9.9c-.3-.3-.7-.5-1.1-.7zm5.8 0c-.4-.2-.7-.3-1.1-.3-.5 0-.9.1-1.4.3-.4.2-.8.5-1.1.8-.3.3-.6.7-.7 1.1-.2.4-.3.9-.3 1.4 0 .5.1 1 .3 1.4.2.4.5.8.8 1.1.3.3.7.5 1.1.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.4-.2.8-.4 1.2-.8l.9.9c-.4.4-1 .8-1.6 1-1.2.5-2.7.5-3.9 0-.6-.2-1.1-.6-1.6-1s-.8-1-1.1-1.6c-.2-.6-.4-1.2-.4-1.9s.1-1.3.4-1.9c.3-.6.6-1.1 1.1-1.6.4-.4 1-.8 1.6-1 .6-.2 1.2-.4 1.9-.4.6 0 1.3.1 1.9.4.6.3 1.1.6 1.5 1.1l-.9.9c-.3-.3-.7-.5-1.1-.7z"/>
                    </svg>
                  }}
                  description="Leading CRM platform with a focus on enterprise cloud applications and customer relationship management solutions."
                  technologies={["Cloud Computing", "Enterprise Apps", "Apex", "Lightning", "CRM", "PaaS"]}
                  focus="Salesforce engineers build scalable business applications and platforms. Focus on customization, integration, and enterprise features."
                />
                
                <CompanyCard 
                  name="Tesla"
                  logo={{
                    bgColor: "bg-white",
                    svg: <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 35">
                      <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z"/>
                    </svg>
                  }}
                  description="Electric vehicle and renewable energy company known for innovation in automotive technology and sustainable energy."
                  technologies={["Embedded Systems", "AI/ML", "Computer Vision", "IoT", "Energy Systems"]}
                  focus="Tesla engineers focus on sustainability and innovation, working on everything from autonomous driving to energy storage and generation."
                />
                
                <CompanyCard 
                  name="Stripe"
                  logo={{
                    bgColor: "bg-white",
                    svg: <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                      <path fill="#635BFF" d="M165 144.7l-43.3 9.2-.2 142.4c0 26.3 19.8 43.3 46.1 43.3 14.6 0 25.3-2.7 31.2-5.9v-33.8c-5.7 2.3-33.7 10.5-33.7-15.7V221h33.7v-37.8h-33.7zm89.1 51.6l-2.7-13.1H213v153.2h44.3V233.3c10.5-13.8 28.2-11.1 33.9-9.3v-40.8c-6-2.1-26.7-6-37.1 13.1zm92.3-72.3l-44.6 9.5v36.2l44.6-9.5zM44.9 228.3c0-6.9 5.8-9.6 15.1-9.7 13.5 0 30.7 4.1 44.2 11.4v-41.8c-14.7-5.8-29.4-8.1-44.1-8.1-36 0-60 18.8-60 50.2 0 49.2 67.5 41.2 67.5 62.4 0 8.2-7.1 10.9-17 10.9-14.7 0-33.7-6.1-48.6-14.2v40c16.5 7.1 33.2 10.1 48.5 10.1 36.9 0 62.3-15.8 62.3-47.8 0-52.9-67.9-43.4-67.9-63.4zM640 261.6c0-45.5-22-81.4-64.2-81.4s-67.9 35.9-67.9 81.1c0 53.5 30.3 78.2 73.5 78.2 21.2 0 37.1-4.8 49.2-11.5v-33.4c-12.1 6.1-26 9.8-43.6 9.8-17.3 0-32.5-6.1-34.5-26.9h86.9c.2-2.3.6-11.6.6-15.9zm-87.9-16.8c0-20 12.3-28.4 23.4-28.4 10.9 0 22.5 8.4 22.5 28.4zm-112.9-64.6c-17.4 0-28.6 8.2-34.8 13.9l-2.3-11H363v204.8l44.4-9.4.1-50.2c6.4 4.7 15.9 11.2 31.4 11.2 31.8 0 60.8-23.2 60.8-79.6.1-51.6-29.3-79.7-60.5-79.7zm-10.6 122.5c-10.4 0-16.6-3.8-20.9-8.4l-.3-66c4.6-5.1 11-8.8 21.2-8.8 16.2 0 27.4 18.2 27.4 41.4.1 23.9-10.9 41.8-27.4 41.8zm-126.7 33.7h44.6V183.2h-44.6z"/>
                    </svg>
                  }}
                  description="Leading payment processing platform known for developer-friendly APIs and financial infrastructure solutions."
                  technologies={["Payment Processing", "APIs", "Security", "Distributed Systems", "Financial Tech"]}
                  focus="Stripe engineers build robust financial infrastructure and APIs. Focus on security, reliability, and developer experience."
                />
                
                <CompanyCard 
                  name="Spotify"
                  logo={{
                    bgColor: "bg-[#1DB954]",
                    svg: <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  }}
                  description="Music streaming platform that uses data-driven approaches to create personalized listening experiences."
                  technologies={["Microservices", "Recommendation Systems", "Data Engineering", "Mobile", "Audio Technology"]}
                  focus="Spotify engineers build personalized, data-driven experiences. Focus on recommendation algorithms, data processing, and real-time audio streaming."
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Tech Companies by Domain Focus</h3>
              
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Companies</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Technologies</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Career Impact</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Cloud Computing</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">AWS (Amazon), Microsoft Azure, Google Cloud, Oracle Cloud</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Distributed Systems, Kubernetes, Infrastructure as Code, Serverless</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Emphasizes infrastructure skills, systems design, networking, and reliability engineering</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">AI/Machine Learning</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">OpenAI, Google DeepMind, Meta AI, NVIDIA, Anthropic</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">PyTorch, TensorFlow, Large Language Models, Computer Vision, Neural Networks</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Focuses on mathematical foundations, research skills, and deep learning expertise</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Social Media</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Meta (Facebook), Twitter, TikTok, LinkedIn, Reddit</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Real-time Systems, Content Recommendation, Feed Algorithms, Engagement Analysis</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Emphasizes high-scale systems, user experience, and content-based algorithms</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Fintech</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Stripe, Square, PayPal, Robinhood, Coinbase</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Payment Processing, Blockchain, Financial APIs, Security, Compliance</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Prioritizes security, reliability, and compliance knowledge with high-stakes systems</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">E-commerce</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Amazon, Shopify, Alibaba, eBay, Walmart Tech</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Inventory Systems, Recommendation Engines, Supply Chain Tech, Payments</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Focuses on system reliability, performance optimization, and customer experience</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">How Company Culture Shapes Technical Skills</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h4 className="font-medium text-lg text-gray-900 mb-2">Google</h4>
                    <p className="text-gray-700 mb-3">Known for a culture of innovation and autonomy. Engineers have "20% time" to work on creative projects.</p>
                    <p className="text-sm text-gray-600">
                      <strong>Impact on Skills:</strong> Engineers develop broad knowledge across domains, creative problem-solving, and the ability to prototype quickly.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-5 rounded-lg">
                    <h4 className="font-medium text-lg text-gray-900 mb-2">Amazon</h4>
                    <p className="text-gray-700 mb-3">Highly autonomous teams with a strong ownership culture. Leadership principles guide decision-making.</p>
                    <p className="text-sm text-gray-600">
                      <strong>Impact on Skills:</strong> Engineers develop strong operational excellence, pragmatic problem-solving, and business acumen.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-5 rounded-lg">
                    <h4 className="font-medium text-lg text-gray-900 mb-2">Microsoft</h4>
                    <p className="text-gray-700 mb-3">Collaborative culture with a focus on growth mindset and learning. Balance between innovation and reliability.</p>
                    <p className="text-sm text-gray-600">
                      <strong>Impact on Skills:</strong> Engineers develop cross-team collaboration abilities, enterprise solution design, and continuous learning habits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'relevant':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How to Stay Relevant in Your Tech Career</h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                Technology evolves rapidly, and staying relevant requires intentional effort. Here are proven strategies to ensure your skills and knowledge remain in demand throughout your career.
              </p>
              
              <QuoteCard 
                quote="The ability to learn is the most important quality a leader can have."
                author="Satya Nadella"
                role="CEO, Microsoft"
              />
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">The Continuous Learning Framework</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-3 text-blue-900">1. Build Learning Habits</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Dedicate 30-60 minutes daily to learning</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Rotate between deep learning and broad exploration</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Track your learning in a tech journal or blog</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Implement a "learn, apply, teach" cycle</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-3 text-green-900">2. Monitor Industry Trends</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Follow top tech blogs and newsletters</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Attend conferences (virtual or in-person)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Join relevant Discord, Slack, or Reddit communities</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Read annual tech trend reports from major firms</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-purple-50 rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-3 text-purple-900">3. Diversify Your Skill Set</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Develop T-shaped skills (deep expertise + broad knowledge)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Learn adjacent technologies to your core stack</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Acquire complementary non-technical skills</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Develop skills in emerging technologies</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-5">
                    <h4 className="font-semibold text-lg mb-3 text-yellow-900">4. Build Your Network</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Participate in open-source projects</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Attend and speak at meetups/conferences</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Maintain an active professional social media presence</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Schedule regular coffee chats with industry peers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Technology Lifecycle Awareness</h3>
              
              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  Understanding where technologies are in their lifecycle helps you make strategic decisions about what to learn. The technology adoption curve below shows the stages of technology maturity:
                </p>
                
                <div className="bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 p-6 rounded-lg relative mb-6">
                  <div className="h-32 relative">
                    {/* Curve path */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path d="M0,100 C50,100 100,80 150,50 C200,20 250,10 300,30 C350,50 400,70 400,70" stroke="gray" fill="none" strokeWidth="2" />
                    </svg>
                    
                    {/* Stage markers */}
                    <div className="absolute bottom-0 left-[5%] transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
                      <div className="text-xs font-medium text-gray-700 -ml-4">Emerging</div>
                    </div>
                    <div className="absolute bottom-0 left-[30%] transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mb-1"></div>
                      <div className="text-xs font-medium text-gray-700 -ml-4">Growing</div>
                    </div>
                    <div className="absolute bottom-0 left-[60%] transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mb-1"></div>
                      <div className="text-xs font-medium text-gray-700 -ml-4">Maturing</div>
                    </div>
                    <div className="absolute bottom-0 left-[85%] transform -translate-x-1/2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
                      <div className="text-xs font-medium text-gray-700 -ml-4">Stable</div>
                    </div>
                  </div>
                  
                  {/* Technology examples */}
                  <div className="grid grid-cols-4 gap-4 mt-6 text-xs">
                    <div>
                      <div className="font-semibold text-red-700 mb-1">Emerging/Experimental</div>
                      <ul className="space-y-1 text-gray-700">
                        <li>Web3</li>
                        <li>Quantum Computing</li>
                        <li>Generative AI</li>
                        <li>AR/VR</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-orange-700 mb-1">Growing/Adoption</div>
                      <ul className="space-y-1 text-gray-700">
                        <li>Edge Computing</li>
                        <li>Blockchain</li>
                        <li>Rust</li>
                        <li>WebAssembly</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-yellow-700 mb-1">Maturing/Mainstream</div>
                      <ul className="space-y-1 text-gray-700">
                        <li>Kubernetes</li>
                        <li>React</li>
                        <li>Python</li>
                        <li>Cloud Computing</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold text-green-700 mb-1">Stable/Established</div>
                      <ul className="space-y-1 text-gray-700">
                        <li>JavaScript</li>
                        <li>SQL</li>
                        <li>Java</li>
                        <li>C/C++</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-5 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-indigo-900">Strategic Learning Approach</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mr-3 mt-0.5">1</div>
                      <div>
                        <p className="font-medium">Keep a strong foundation in stable technologies</p>
                        <p className="text-sm text-gray-600">These form the bedrock of many systems and rarely become obsolete quickly</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mr-3 mt-0.5">2</div>
                      <div>
                        <p className="font-medium">Develop expertise in maturing technologies</p>
                        <p className="text-sm text-gray-600">These offer the best balance of job opportunities and future relevance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mr-3 mt-0.5">3</div>
                      <div>
                        <p className="font-medium">Experiment with growing technologies</p>
                        <p className="text-sm text-gray-600">Allocate some learning time to technologies gaining traction for future positioning</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mr-3 mt-0.5">4</div>
                      <div>
                        <p className="font-medium">Stay aware of emerging technologies</p>
                        <p className="text-sm text-gray-600">Monitor but invest minimal time until they show signs of adoption</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Practical Relevance Strategies</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Build a Personal Projects Portfolio</h4>
                      <p className="text-gray-700 mb-3">
                        Create projects that demonstrate your ability to work with current technologies. This provides hands-on experience and tangible proof of your skills.
                      </p>
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm text-gray-700">
                          <strong>Pro Tip:</strong> Instead of many small projects, build 2-3 substantial ones that solve real problems and showcase multiple skills.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Create Content and Share Knowledge</h4>
                      <p className="text-gray-700 mb-3">
                        Write technical blog posts, create videos, or contribute to documentation. Teaching others reinforces your understanding and builds your reputation.
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-purple-50 p-3 rounded">
                          <p className="font-medium text-gray-900 mb-1">Platforms to Share On:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>Medium</li>
                            <li>Dev.to</li>
                            <li>Hashnode</li>
                            <li>Personal blog</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                          <p className="font-medium text-gray-900 mb-1">Content Ideas:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>Tutorials</li>
                            <li>Technology comparisons</li>
                            <li>Problem-solving case studies</li>
                            <li>New tool/framework reviews</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Contribute to Open Source</h4>
                      <p className="text-gray-700 mb-3">
                        Open source contribution builds practical experience with modern codebases while networking with other developers.
                      </p>
                      <div className="bg-green-50 p-3 rounded">
                        <p className="font-medium text-gray-900 mb-1">Getting Started:</p>
                        <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
                          <li>Find projects aligned with your skills using GitHub's "good first issue" tags</li>
                          <li>Start with documentation or testing contributions</li>
                          <li>Join project Discord or Slack channels</li>
                          <li>Gradually move to feature development</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-4 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Develop Your Innovation Mindset</h4>
                      <p className="text-gray-700 mb-3">
                        Staying relevant isn't just about skills—it's about approaching problems in fresh ways. Cultivate habits that spark innovative thinking.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <ul className="space-y-1 text-gray-700">
                          <li className="flex items-start">
                            <svg className="h-4 w-4 text-red-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Read outside your field</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-4 w-4 text-red-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Question established approaches</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-4 w-4 text-red-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Experiment with new tools</span>
                          </li>
                        </ul>
                        <ul className="space-y-1 text-gray-700">
                          <li className="flex items-start">
                            <svg className="h-4 w-4 text-red-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Participate in hackathons</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-4 w-4 text-red-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Connect ideas from different domains</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-4 w-4 text-red-500 mr-1 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Learn from failed approaches</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Essential Tech News Sources</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">News & Analysis</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <a href="https://www.theverge.com" className="text-blue-600 hover:underline">The Verge</a>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <a href="https://techcrunch.com" className="text-blue-600 hover:underline">TechCrunch</a>
                      </li>
                      <li className="flex items-center">
                        // Completing the SVG that was cut off in the "relevant" section
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        <a href="https://www.wired.com" className="text-blue-600 hover:underline">Wired</a>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Developer Resources</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="https://dev.to" className="text-blue-600 hover:underline">Dev.to</a>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="https://css-tricks.com" className="text-blue-600 hover:underline">CSS-Tricks</a>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="https://hackernoon.com" className="text-blue-600 hover:underline">Hackernoon</a>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Newsletters</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="https://javascriptweekly.com" className="text-blue-600 hover:underline">JavaScript Weekly</a>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="https://tldr.tech" className="text-blue-600 hover:underline">TLDR Newsletter</a>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="https://changelog.com/weekly" className="text-blue-600 hover:underline">Changelog Weekly</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'company-choice':
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">How Your Company Choice Impacts Your Tech Career</h2>
            
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-gray-700 mb-6 text-lg">
                The company you work for shapes your technical skills, career trajectory, and professional network. Understanding these differences can help you make strategic career decisions.
              </p>
              
              <QuoteCard 
                quote="Choose a job you love, and you will never have to work a day in your life. Choose a company that grows your skills, and you'll never have to worry about finding your next job."
                author="Naval Ravikant"
                role="Entrepreneur and Investor"
              />
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Different Company Types and Their Impact</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <SkillComparisonCard 
                    companyType="Large Tech Companies (FAANG, etc.)"
                    skills={[
                      "Building highly scalable systems",
                      "Working with mature codebases",
                      "Specialized, deep technical expertise",
                      "Cross-team collaboration",
                      "Structured engineering practices"
                    ]}
                    certifications={[
                      "Cloud certifications (AWS, GCP, Azure)",
                      "Internal company certifications",
                      "Project management (PMP, Agile)",
                      "Security certifications (CISSP)"
                    ]}
                  />
                  
                  <SkillComparisonCard 
                    companyType="Startups & Small Companies"
                    skills={[
                      "Full-stack development",
                      "Rapid prototyping & MVP building",
                      "Wearing multiple hats (dev/ops/product)",
                      "Quick decision making",
                      "Building systems from scratch"
                    ]}
                    certifications={[
                      "Adaptable tech stack certifications",
                      "Cloud/infrastructure flexibility",
                      "Full-stack frameworks",
                      "Entrepreneurial programs"
                    ]}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <SkillComparisonCard 
                    companyType="Enterprise & Traditional Companies"
                    skills={[
                      "Legacy system maintenance",
                      "Integration with enterprise systems",
                      "Compliance and governance",
                      "Change management",
                      "Documentation and processes"
                    ]}
                    certifications={[
                      "Enterprise software certifications (SAP, Oracle)",
                      "ITIL and service management",
                      "Industry-specific compliance",
                      "Business analysis (CBAP)"
                    ]}
                  />
                  
                  <SkillComparisonCard 
                    companyType="Consultancies & Agencies"
                    skills={[
                      "Rapid learning of new domains",
                      "Client communication",
                      "Adaptability across projects",
                      "Efficient knowledge acquisition",
                      "Estimation and scoping work"
                    ]}
                    certifications={[
                      "Multiple language/framework certifications",
                      "Client-facing communication",
                      "Consulting methodologies",
                      "Professional services automation"
                    ]}
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Career Growth Trajectories</h3>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Large Tech Companies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Career Path</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>Clearly defined leveling system (L3, L4, L5, etc.)</li>
                        <li>Specialized tracks (Management vs. IC)</li>
                        <li>Structured promotion processes</li>
                        <li>Internal mobility between teams/products</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Brand Impact</h5>
                      <p className="text-gray-700">Strong "resume brand" opens doors at other companies. Skills are typically transferable to other large tech companies and highly valued by startups.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Startups</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Career Path</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>Rapid responsibility growth</li>
                        <li>Less structured promotion process</li>
                        <li>Potential for leadership roles earlier</li>
                        <li>Equity vs. cash compensation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Brand Impact</h5>
                      <p className="text-gray-700">Known for resilience, versatility, and entrepreneurial skills. Successful startup experience positions you well for other startups but may require proving specialized skills for large tech companies.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Enterprise Companies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Career Path</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>Emphasis on tenure and experience</li>
                        <li>Formal advancement processes</li>
                        <li>Role specialization and expertise development</li>
                        <li>Stability and benefits focus</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Brand Impact</h5>
                      <p className="text-gray-700">Known for reliability, process adherence, and domain expertise. Most transferable to similar enterprises but may need to demonstrate agility and innovation for tech companies.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-lg text-gray-900 mb-2">Consultancies</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Career Path</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>Up-or-out promotion models (in some firms)</li>
                        <li>Client relationship development</li>
                        <li>Varied project exposure</li>
                        <li>Travel and remote work experience</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800 mb-2">Brand Impact</h5>
                      <p className="text-gray-700">Valued for adaptability, client skills, and broad experience. Well-positioned for product companies needing domain knowledge but may need to demonstrate deep technical skills.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Strategic Career Planning</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h4 className="text-lg font-semibold mb-3">Mapping Your Company Choices to Career Goals</h4>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Career Goal</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Optimal Company Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Why It Works</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Technical expertise in a specific domain</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Large tech companies or specialized startups</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">Deep resources for specialization, mentors with domain expertise, and scale to truly test your solutions</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Founding your own company</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Early-stage startups or high-autonomy teams at large companies</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">Exposure to all aspects of business, experience with rapid product development, and building networks with potential co-founders</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Building a broad technical skill set</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Consultancies or small product companies</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">Exposure to multiple technologies, projects, and domains in a short time, necessity to adapt quickly</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Transitioning to management</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Fast-growing midsize companies or scale-ups</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">Rapid growth creates leadership opportunities, formal training may exist, but stakes are lower than at very established companies</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="space-y-6 mb-6">
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-indigo-900">Best Career Sequencing</h4>
                  <p className="text-gray-700 mb-4">
                    The order of companies you work for matters. Consider these strategic career sequences based on your goals:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-medium text-gray-900 mb-2">The Credibility Builder</h5>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-24 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 font-medium">
                          Large Tech
                        </div>
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="w-24 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-800 font-medium">
                          Startup
                        </div>
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="w-24 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-800 font-medium">
                          Founder
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Start at a prestigious tech company to build credibility and a strong network. Transition to a startup to gain broader experience. Finally, use your credentials and experience to launch your own company.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-medium text-gray-900 mb-2">The Technical Expert</h5>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-24 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-800 font-medium">
                          Consultancy
                        </div>
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="w-24 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 font-medium">
                          Large Tech
                        </div>
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="w-24 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-800 font-medium">
                          Specialized
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Start at a consultancy to gain broad experience across industries. Move to a large tech company to deepen skills in a specific domain. Finally, join a specialized company where you can be a principal engineer or architect.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h5 className="font-medium text-gray-900 mb-2">The Tech Leader</h5>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-24 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-800 font-medium">
                          Large Tech
                        </div>
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="w-24 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-800 font-medium">
                          Midsize
                        </div>
                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className="w-24 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-800 font-medium">
                          Executive
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        Begin at a large tech company to learn structured engineering practices. Move to a midsize growth company to gain leadership experience. Progress to an executive role (CTO, VP Eng) at a company where you can shape technical vision.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Technology Stack Considerations</h3>
                
                <p className="text-gray-700 mb-4">
                  Different companies use different technology stacks, which significantly impacts your career specialization and future opportunities:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoCard 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    }
                    title="Proprietary vs. Open Source"
                    description="Large enterprises often use proprietary technologies, while startups typically leverage open source. Consider how transferable your skills will be if you specialize in a proprietary stack."
                  />
                  
                  <InfoCard 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    }
                    title="Cutting-Edge vs. Stable"
                    description="Startups often use newer technologies, while established companies may rely on proven, stable stacks. Consider your risk tolerance and learning preferences when deciding."
                  />
                  
                  <InfoCard 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                    title="Industry-Specific Technologies"
                    description="Some industries (finance, healthcare, manufacturing) have specialized tech stacks. Specializing in these can be lucrative but may narrow your job market to specific sectors."
                  />
                  
                  <InfoCard 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                    title="In-house vs. Standard Tools"
                    description="Large tech companies often build custom internal tools that may not translate directly to other environments. Balance learning company-specific tools with acquiring transferable skills."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tech Career Development Guide</h1>
          <button
            onClick={() => navigate('/career/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
        </div>
        
        <div className="text-center mb-12">
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate your career in technology with expert advice on learning, growth, and strategic career planning.
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
