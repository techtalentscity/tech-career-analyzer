import { useState } from 'react';

const PortfolioPlatforms = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Platform categories
  const categories = [
    { id: 'all', label: 'All Platforms', icon: 'grid' },
    { id: 'code-hosting', label: 'Code & Hosting', icon: 'code' },
    { id: 'project-learning', label: 'Project Learning', icon: 'academic' },
    { id: 'ml-datascience', label: 'ML & Data Science', icon: 'chart' },
    { id: 'design-showcase', label: 'Design & Frontend', icon: 'design' },
    { id: 'professional', label: 'Professional Networks', icon: 'briefcase' },
    { id: 'talent-platforms', label: 'Talent Platforms', icon: 'users' },
  ];

  // Platform data
  const platforms = [
    // Code Hosting & Portfolio
    {
      name: "GitHub",
      category: "code-hosting",
      description: "The world's leading platform for code hosting, version control, and developer collaboration. Perfect for showcasing your coding projects and contributing to open source.",
      features: ["Code repositories", "Project documentation", "Issue tracking", "CI/CD integration", "GitHub Pages hosting"],
      pricing: "Free tier available",
      bestFor: "Developers, Open Source Contributors",
      url: "https://github.com",
      logo: "🐙",
      color: "bg-gray-900"
    },
    {
      name: "GitLab",
      category: "code-hosting",
      description: "Complete DevOps platform with integrated CI/CD, project management, and code hosting. Great for showcasing full development workflows.",
      features: ["Git repository management", "Built-in CI/CD", "Issue boards", "Wiki documentation", "Static site hosting"],
      pricing: "Free tier available",
      bestFor: "DevOps Engineers, Full-stack Developers",
      url: "https://gitlab.com",
      logo: "🦊",
      color: "bg-orange-600"
    },
    {
      name: "Netlify",
      category: "code-hosting",
      description: "Modern web development platform for deploying and hosting static sites and serverless functions. Perfect for frontend portfolios.",
      features: ["Static site hosting", "Continuous deployment", "Form handling", "Serverless functions", "Custom domains"],
      pricing: "Free tier available",
      bestFor: "Frontend Developers, Jamstack Projects",
      url: "https://netlify.com",
      logo: "🌐",
      color: "bg-teal-600"
    },
    {
      name: "Vercel",
      category: "code-hosting",
      description: "Frontend cloud platform optimized for React, Next.js, and modern web frameworks. Excellent for showcasing modern web applications.",
      features: ["Zero-config deployments", "Preview deployments", "Edge functions", "Analytics", "Custom domains"],
      pricing: "Free tier available",
      bestFor: "React/Next.js Developers, Frontend Engineers",
      url: "https://vercel.com",
      logo: "▲",
      color: "bg-black"
    },

    // Project-based Learning
    {
      name: "freeCodeCamp",
      category: "project-learning",
      description: "Learn to code through hands-on projects and earn certifications. Build a portfolio while learning web development, data science, and more.",
      features: ["Interactive coding challenges", "Portfolio projects", "Certifications", "Community forum", "Free courses"],
      pricing: "Completely free",
      bestFor: "Beginners, Career Changers",
      url: "https://freecodecamp.org",
      logo: "🔥",
      color: "bg-green-600"
    },
    {
      name: "The Odin Project",
      category: "project-learning",
      description: "Open-source curriculum for learning web development through building real projects. Focuses on practical, project-based learning.",
      features: ["Full-stack curriculum", "Real-world projects", "Community support", "Open source", "Career preparation"],
      pricing: "Completely free",
      bestFor: "Self-directed Learners, Web Developers",
      url: "https://theodinproject.com",
      logo: "⚡",
      color: "bg-blue-600"
    },
    {
      name: "Frontend Mentor",
      category: "project-learning",
      description: "Real-world HTML, CSS, and JavaScript challenges with professional designs. Perfect for building a frontend portfolio.",
      features: ["Professional designs", "HTML/CSS/JS challenges", "Community feedback", "Solution sharing", "Difficulty levels"],
      pricing: "Free and premium tiers",
      bestFor: "Frontend Developers, UI Developers",
      url: "https://frontendmentor.io",
      logo: "🎨",
      color: "bg-indigo-600"
    },
    {
      name: "Codecademy",
      category: "project-learning",
      description: "Interactive coding platform with hands-on projects across multiple programming languages and technologies.",
      features: ["Interactive lessons", "Portfolio projects", "Career paths", "Code challenges", "Certificates"],
      pricing: "Free and premium tiers",
      bestFor: "Beginners, Multiple Languages",
      url: "https://codecademy.com",
      logo: "📚",
      color: "bg-purple-600"
    },

    // Machine Learning & Data Science
    {
      name: "Kaggle",
      category: "ml-datascience",
      description: "The world's largest data science community with competitions, datasets, and collaborative notebooks. Perfect for showcasing machine learning skills and building a data science portfolio.",
      features: ["ML competitions", "Public datasets", "Jupyter notebooks", "Community discussions", "Learn courses", "Achievement system"],
      pricing: "Free with premium features",
      bestFor: "Data Scientists, ML Engineers, AI Researchers",
      url: "https://kaggle.com",
      logo: "🏆",
      color: "bg-blue-600"
    },
    {
      name: "Omdena",
      category: "ml-datascience",
      description: "Collaborative AI platform for real-world projects that create positive social impact. Build your portfolio while solving meaningful problems with global teams.",
      features: ["AI for good projects", "Global collaboration", "Real-world impact", "Mentorship programs", "Portfolio building", "Networking opportunities"],
      pricing: "Free participation",
      bestFor: "AI Engineers, Social Impact Enthusiasts, Collaborative Learners",
      url: "https://omdena.com",
      logo: "🌱",
      color: "bg-green-600"
    },

    // Design & Frontend Showcase
    {
      name: "CodePen",
      category: "design-showcase",
      description: "Social development environment for front-end designers and developers. Perfect for showcasing HTML, CSS, and JavaScript experiments.",
      features: ["Live code editor", "Instant preview", "Community showcase", "Collections", "Embedding options"],
      pricing: "Free and premium tiers",
      bestFor: "Frontend Developers, CSS Artists",
      url: "https://codepen.io",
      logo: "✏️",
      color: "bg-green-500"
    },
    {
      name: "Dribbble",
      category: "design-showcase",
      description: "Creative community for designers to showcase their work, connect with other creatives, and find design inspiration.",
      features: ["Design showcase", "Creative community", "Job board", "Design inspiration", "Portfolio hosting"],
      pricing: "Free and premium tiers",
      bestFor: "UI/UX Designers, Creative Professionals",
      url: "https://dribbble.com",
      logo: "🏀",
      color: "bg-pink-500"
    },
    {
      name: "Behance",
      category: "design-showcase",
      description: "Adobe's creative platform for showcasing creative work across various disciplines including web design, UI/UX, and digital art.",
      features: ["Creative portfolios", "Project showcase", "Creative community", "Adobe integration", "Discover feature"],
      pricing: "Free",
      bestFor: "Designers, Creative Professionals",
      url: "https://behance.net",
      logo: "🎭",
      color: "bg-blue-500"
    },

    // Professional Networks
    {
      name: "LinkedIn",
      category: "professional",
      description: "The world's largest professional network. Essential for building your professional brand and showcasing career achievements.",
      features: ["Professional profile", "Work experience showcase", "Skill endorsements", "Professional networking", "Content publishing"],
      pricing: "Free and premium tiers",
      bestFor: "All Professionals, Career Networking",
      url: "https://linkedin.com",
      logo: "💼",
      color: "bg-blue-700"
    },
    {
      name: "AngelList (Wellfound)",
      category: "professional",
      description: "Platform connecting startups with talent. Great for showcasing your profile to innovative companies and startup opportunities.",
      features: ["Startup job board", "Company discovery", "Investor connections", "Salary transparency", "Remote opportunities"],
      pricing: "Free",
      bestFor: "Startup Enthusiasts, Entrepreneurs",
      url: "https://wellfound.com",
      logo: "👼",
      color: "bg-gray-800"
    },

    // Talent Platforms
    {
      name: "Techtalents City",
      category: "talent-platforms",
      description: "Premier platform connecting African tech talents with global opportunities. Showcase your skills and connect with top employers worldwide.",
      features: ["Talent showcase", "Global opportunities", "Skill assessment", "Career guidance", "Community networking"],
      pricing: "Free registration",
      bestFor: "African Tech Talents, Global Opportunities",
      url: "https://techtalentscity.com",
      logo: "🌍",
      color: "bg-green-600",
      featured: true
    },
    {
      name: "Stack Overflow",
      category: "talent-platforms",
      description: "The largest community for developers. Build your reputation by helping others and showcase your expertise through your contributions.",
      features: ["Q&A contributions", "Developer story", "Reputation system", "Job board", "Community recognition"],
      pricing: "Free",
      bestFor: "Developers, Technical Problem Solvers",
      url: "https://stackoverflow.com",
      logo: "📚",
      color: "bg-orange-500"
    },
    {
      name: "Dev.to",
      category: "talent-platforms",
      description: "Community of software developers sharing articles, tutorials, and insights. Build your personal brand through technical writing.",
      features: ["Technical blogging", "Community engagement", "Portfolio showcase", "Learning resources", "Career insights"],
      pricing: "Free",
      bestFor: "Developer Advocates, Technical Writers",
      url: "https://dev.to",
      logo: "👩‍💻",
      color: "bg-gray-900"
    },
    {
      name: "Hashnode",
      category: "talent-platforms",
      description: "Blogging platform for developers. Share your knowledge, build your personal brand, and connect with the developer community.",
      features: ["Developer blogging", "Custom domains", "Team blogs", "Newsletter integration", "Community features"],
      pricing: "Free",
      bestFor: "Developer Bloggers, Technical Writers",
      url: "https://hashnode.com",
      logo: "📝",
      color: "bg-blue-600"
    }
  ];

  // Get category icon
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'grid':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        );
      case 'code':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'academic':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'design':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
        );
      case 'briefcase':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Filter platforms based on active category
  const filteredPlatforms = activeCategory === 'all' 
    ? platforms 
    : platforms.filter(platform => platform.category === activeCategory);

  // Platform card component
  const PlatformCard = ({ platform }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${platform.featured ? 'ring-2 ring-green-400' : ''}`}>
      {platform.featured && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm font-medium">
          ⭐ Featured Platform
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${platform.color} text-white text-2xl mr-4`}>
            {platform.logo}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
            <p className="text-sm text-gray-600">{platform.bestFor}</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 text-sm leading-relaxed">{platform.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Features:</h4>
          <ul className="space-y-1">
            {platform.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
            {platform.features.length > 3 && (
              <li className="text-sm text-gray-500 ml-6">
                +{platform.features.length - 3} more features
              </li>
            )}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium text-gray-800">Pricing: </span>
            <span className="text-gray-600">{platform.pricing}</span>
          </div>
          <a
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Visit Platform
            <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Portfolio Building Platforms
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the best online platforms to build, showcase, and grow your tech portfolio through real projects and professional networking.
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
            <button
              onClick={() => window.location.href = '/career/dashboard'}
              className="px-6 py-4 text-sm md:text-base whitespace-nowrap font-medium flex items-center text-white bg-green-600 hover:bg-green-700 transition-colors border-b-2 border-green-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-4 text-sm md:text-base whitespace-nowrap font-medium flex items-center transition-colors ${
                  activeCategory === category.id
                    ? 'text-green-600 border-b-2 border-green-500 bg-green-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-2">{getCategoryIcon(category.icon)}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPlatforms.map((platform, index) => (
            <PlatformCard key={index} platform={platform} />
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">💡 Portfolio Building Tips</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-800">Getting Started</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Start with 2-3 platforms that align with your career goals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Focus on quality over quantity - showcase your best work</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Use consistent branding across all platforms</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Write clear project descriptions and documentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">For ML projects: include datasets, model performance, and insights</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-800">Best Practices</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Update your portfolio regularly with new projects</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Engage with the community and provide feedback to others</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Include live demos and source code for your projects</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Network actively and contribute to open source projects</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Participate in ML competitions and collaborative AI projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPlatforms;
