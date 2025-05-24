import { useState } from 'react';

const CareerGuide = () => {
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
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg shadow-sm my-6 relative">
      <div className="absolute top-4 left-4 text-green-400 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <div className="ml-8">
        <p className="text-lg italic font-light text-gray-800 mb-3">{quote}</p>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
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
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-800 font-bold text-xl">
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
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
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
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-4">
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
                Learning to code is a journey that can open countless doors in the tech industry. The key is finding a structured approach that matches your learning style and goals. Remember, you don't have to start with a perfect plan - the key is to begin by discovering your "why" and embracing the learning process.
              </p>
              
              <QuoteCard 
                quote="Don't compare yourself with others. The only person you should try to be better than is who you were yesterday."
                author="Quincy Larson"
                role="Founder, freeCodeCamp"
              />
              
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Finding Your Place in Tech</h3>
                <p className="text-gray-700 mb-4">
                  The tech industry is vast and not confined to traditional tech companies. Opportunities exist across healthcare, government, finance, education, and beyond. You can choose between becoming an employee or launching your own venture.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Popular Entry-Level Roles:</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-medium text-green-800">QA Tester</div>
                      <div className="text-gray-600">Testing & Quality</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-medium text-blue-800">DevOps Engineer</div>
                      <div className="text-gray-600">Infrastructure</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-medium text-purple-800">Software Developer</div>
                      <div className="text-gray-600">Programming</div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900">Four Main Pathways to Tech Skills</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <svg className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    College Degrees
                  </h4>
                  <p className="text-gray-700 mb-3">Offers foundational theory and broad exposure. However, a degree alone won't guarantee a job if practical skills are lacking.</p>
                  <div className="text-sm text-blue-600">
                    <strong>Best for:</strong> Long-term foundational learning, networking, and comprehensive understanding
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Bootcamps
                  </h4>
                  <p className="text-gray-700 mb-3">Intense, hands-on learning experiences focused on rapid upskilling, ideal for working professionals looking to transition quickly.</p>
                  <div className="text-sm text-green-600">
                    <strong>Best for:</strong> Career changers, intensive skill building, job placement support
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <svg className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Online Courses
                  </h4>
                  <p className="text-gray-700 mb-3">Flexible, often affordable, and allow for learning at your own pace with platforms like Coursera, Udemy, and edX.</p>
                  <div className="text-sm text-purple-600">
                    <strong>Best for:</strong> Self-directed learners, budget-conscious students, flexible scheduling
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <svg className="h-6 w-6 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Certification Programs
                  </h4>
                  <p className="text-gray-700 mb-3">Formal proof of competence, critical for credibility, job competitiveness, and international opportunities.</p>
                  <div className="text-sm text-yellow-600">
                    <strong>Best for:</strong> Professional validation, specific skill verification, career advancement
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold mb-3 text-indigo-900">💡 Pro Tip: Combine Learning with Action</h3>
                <p className="text-gray-700 mb-3">
                  No matter which path you choose, pairing learning with practical projects and community engagement can fast-track your transition into tech.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Build projects while learning - don't wait until you're "ready"</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Join coding communities and forums for support and networking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Embrace failure as part of the learning process</span>
                  </li>
                </ul>
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
                  <div className="absolute left-4 top-0 bottom-0 w-1 bg-green-200 rounded"></div>
                  
                  {/* Milestones */}
                  <div className="ml-12 space-y-12 relative">
                    <div className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <h4 className="text-lg font-semibold mb-2 text-green-800">Develop T-Shaped Knowledge</h4>
                      <p className="text-gray-700 mb-3">
                        Go broad across your field to understand the landscape, then go deep in a specialized area. The "T" shape represents breadth and depth.
                      </p>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-medium text-gray-900 mb-2">Action Items:</h5>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Map out your field and identify where you want to specialize</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Take introductory courses in adjacent areas (breadth)</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Deep dive into your specialization through projects and advanced courses</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <h4 className="text-lg font-semibold mb-2 text-green-800">Practice Deliberately</h4>
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
                      <div className="absolute -left-14 top-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <h4 className="text-lg font-semibold mb-2 text-green-800">Understand First Principles</h4>
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
                Building a successful tech career goes beyond technical skills. It requires strategic planning, soft skills development, understanding the industry landscape, and balancing both depth and breadth in your expertise.
              </p>
              
              <QuoteCard 
                quote="Your career is a marathon, not a sprint. Focus on making decisions that compound over time rather than seeking short-term gains."
                author="Satya Nadella"
                role="CEO, Microsoft"
              />

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Breadth vs. Depth: Building Your Tech Identity</h3>
                <p className="text-gray-700 mb-4">
                  Growth in tech follows two main axes: <strong>depth</strong> (deep expertise in a single discipline) and <strong>breadth</strong> (understanding of adjacent disciplines and business functions).
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                      <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      Depth (Specialization)
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Deep technical expertise in core discipline</li>
                      <li>• Mastery of specific tools and frameworks</li>
                      <li>• Advanced problem-solving in your domain</li>
                      <li>• Recognition as a subject matter expert</li>
                    </ul>
                    <div className="mt-3 p-2 bg-blue-50 rounded text-xs">
                      <strong>Example:</strong> A data analyst mastering SQL, statistics, and advanced analytics
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                      <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      Breadth (Generalization)
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Understanding adjacent disciplines</li>
                      <li>• Business and product knowledge</li>
                      <li>• Cross-functional collaboration skills</li>
                      <li>• Strategic thinking capabilities</li>
                    </ul>
                    <div className="mt-3 p-2 bg-green-50 rounded text-xs">
                      <strong>Example:</strong> Same analyst expanding into product management, visualization, or business strategy
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                  <h5 className="font-medium text-yellow-800 mb-2">💡 The Ideal Balance</h5>
                  <p className="text-sm text-gray-700">
                    <strong>Start with depth</strong> to prevent becoming a generalist with no core specialty. <strong>Then gain breadth</strong> to understand how your work impacts the bigger picture, especially if you aspire to lead, innovate, or launch a company.
                  </p>
                </div>
              </div>
              
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

              <h3 className="text-xl font-semibold mb-4 text-gray-900">The Power of Personal Branding and Networking</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <p className="text-gray-700 mb-4">
                  One of the most overlooked but powerful tools in tech is networking. Building genuine, professional relationships helps unlock job referrals, learning opportunities, and collaborative ventures.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-lg">
                    <h4 className="font-semibold text-lg text-purple-900 mb-3">
                      🌐 Digital Networking Strategies
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Follow and engage with thought leaders online</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Share ideas and comment insightfully to build visibility</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Join relevant online communities (Discord, Slack, Reddit)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Clearly communicate what you do, consistently</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-lg">
                    <h4 className="font-semibold text-lg text-blue-900 mb-3">
                      🤝 Physical Networking Strategies
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Attend seminars and tech events</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Join local tech meetups and user groups</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Volunteer at tech conferences</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Schedule coffee chats with industry peers</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Remember:</strong> Whether you're seeking your first role or aiming for a leadership position, networking amplifies your visibility, credibility, and influence in the tech community.
                  </p>
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
                Technology evolves rapidly, and staying relevant requires intentional effort and a non-negotiable mindset toward continuous learning. Here are proven strategies to ensure your skills and knowledge remain in demand throughout your career.
              </p>
              
              <QuoteCard 
                quote="The ability to learn is the most important quality a leader can have."
                author="Satya Nadella"
                role="CEO, Microsoft"
              />

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-900">🚨 Staying Relevant: A Non-Negotiable Mindset</h3>
                <p className="text-gray-700 mb-4">
                  Staying competitive in tech demands continuous learning and evolution. Professionals must evolve from being problem-solvers to strategic thinkers, understanding not just how to code or analyze data, but also how their contributions shape outcomes, products, and customer experiences.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">📚</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Embrace Online Learning</h4>
                    <p className="text-sm text-gray-700">Continuously take online courses and earn certifications to stay current with emerging technologies.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">🔬</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Learn New Technologies</h4>
                    <p className="text-sm text-gray-700">Stay ahead by learning emerging tech like blockchain, AI, cloud computing, and other trending technologies.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl mb-2">💼</div>
                    <h4 className="font-semibold text-gray-900 mb-2">Understand Business Impact</h4>
                    <p className="text-sm text-gray-700">Align your work with company goals and understand how technology drives business outcomes.</p>
                  </div>
                </div>
              </div>
              
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

              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 text-green-900">🎯 Strategic Career Evolution</h3>
                <p className="text-gray-700 mb-4">
                  Your tech career is a journey of intentional growth. Don't just focus on what tech skill to learn next. Ask what kind of professional and leader you want to become, and build toward that vision one step at a time.
                </p>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Key Questions for Self-Reflection:</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start">
                      <span className="font-medium text-green-600 mr-2">•</span>
                      <span>What kind of problems do I want to solve in 5 years?</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-green-600 mr-2">•</span>
                      <span>How do I want my work to impact customers and business outcomes?</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-green-600 mr-2">•</span>
                      <span>What leadership qualities do I need to develop?</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-green-600 mr-2">•</span>
                      <span>How can I better align my technical skills with strategic thinking?</span>
                    </div>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tech Career Development Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate your career in technology with expert advice on learning, growth, and strategic career planning.
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
            <button
              onClick={() => alert('Navigate to dashboard')}
              className="px-4 py-3 text-sm md:text-base whitespace-nowrap font-medium flex items-center text-white bg-green-600 hover:bg-green-700 transition-colors border-b-2 border-green-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-3 text-sm md:text-base whitespace-nowrap font-medium flex items-center ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-500'
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
            
            {/* Final thoughts section that appears on all tabs */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border-t-4 border-green-500">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Final Thoughts: Your Tech Career is a Journey</h3>
              <div className="max-w-4xl">
                <p className="text-gray-700 mb-4 text-lg">
                  Whether you're a beginner or a seasoned professional, the message is clear: <strong>tech is not just about skills</strong>. It's about direction, identity, relationships, and resilience.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg text-green-800 mb-3">Your Growth Foundation</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Finding your niche and specialization</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Building depth in your core skills</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Expanding your reach and influence</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Showing up boldly in communities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-lg text-blue-800 mb-3">Key Reflection Questions</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">❓</span>
                        <span>What kind of professional do I want to become?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">❓</span>
                        <span>What type of leader do I aspire to be?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">❓</span>
                        <span>How do I want to impact the tech industry?</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">❓</span>
                        <span>What legacy do I want to build?</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                    <svg className="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Remember: Build Intentionally
                  </h4>
                  <p className="text-gray-700">
                    Your growth in tech is a reflection of how intentionally you build your career. The tech industry is vast, dynamic, and rich with opportunity, but success requires more than technical skills—it demands clarity, intentionality, networking, continuous learning, and the ability to balance specialization with versatility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGuide;
