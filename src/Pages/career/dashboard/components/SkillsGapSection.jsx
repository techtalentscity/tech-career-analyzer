import React from 'react';
import SkillLevelChart from '../visualizations/SkillLevelChart';
import { 
  getPersonalizedResources, 
  careerPathHasSkill,
  getSkillRelevanceText
} from '../utils/resourceRecommender';
import { determineSkillResources } from '../utils/dataExtractors';

// Helper function to determine if a career path is primarily technical
const isTechnicalCareerPath = (careerPath) => {
  const technicalPaths = [
    'Data Scientist', 'Machine Learning Engineer', 'MLOps Engineer', 'Data Engineer',
    'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 
    'DevOps Engineer', 'Cloud Architect', 'AI Research Scientist',
    'AR/VR Developer', 'Blockchain Developer', 'Quantum Computing Developer',
    'Cybersecurity Engineer'
  ];
  
  return technicalPaths.includes(careerPath);
};

// Helper function to get relevant technical tools for non-technical roles
const getDomainTechTools = (careerPath) => {
  const toolMap = {
    'Product Manager': 'Jira, product analytics, and prototyping tools',
    'Scrum Master': 'Agile management software and analytics dashboards',
    'Business Analyst': 'SQL, Excel, Tableau, and requirements management tools',
    'Financial Analyst': 'Excel, SQL, Power BI, and financial modeling software',
    'Supply Chain Analyst': 'ERP systems, inventory management software, and data visualization',
    'Healthcare Data Analyst': 'SQL, health information systems, and HIPAA-compliant analytics',
    'Nursing Informatics Specialist': 'EHR systems, clinical decision support, and healthcare analytics',
    'EdTech Specialist': 'LMS platforms, analytics, and digital learning tools',
    'Instructional Designer': 'Articulate Storyline, Adobe Captivate, and learning analytics',
    'Engineering Project Manager': 'CAD software, project management tools, and engineering analytics',
    'BIM Manager': 'Revit, Navisworks, and BIM coordination software'
  };
  
  return toolMap[careerPath] || 'relevant technical tools and software';
};

// Helper function for career-specific advice
const getCareerSpecificAdvice = (careerPath) => {
  const advice = {
    // Technical roles
    'Data Scientist': {
      title: 'Build a data science portfolio',
      description: 'Create projects that showcase your data analysis, visualization, and machine learning skills with real-world datasets.'
    },
    'Machine Learning Engineer': {
      title: 'Implement end-to-end ML systems',
      description: 'Focus on building complete machine learning pipelines from data processing to model deployment and monitoring.'
    },
    'MLOps Engineer': {
      title: 'Learn deployment frameworks',
      description: 'Master tools like MLflow, Kubeflow, and CI/CD pipelines specifically for machine learning models.'
    },
    'Data Engineer': {
      title: 'Master data pipeline technologies',
      description: 'Build projects showcasing ETL processes, data warehousing, and efficient data processing at scale.'
    },
    'Frontend Developer': {
      title: 'Create responsive web applications',
      description: 'Build a portfolio of modern, responsive interfaces using frameworks like React, showing your UI/UX skills.'
    },
    'Backend Developer': {
      title: 'Develop API and server solutions',
      description: 'Create robust backend systems with APIs, authentication, and database integration to demonstrate your server-side expertise.'
    },
    'Full Stack Developer': {
      title: 'Build complete web applications',
      description: 'Develop full-stack projects that showcase both frontend and backend skills, using modern technology stacks.'
    }
    // More roles could be added here
  };
  
  return advice[careerPath] || {
    title: 'Build a focused portfolio',
    description: 'Create projects that showcase your skills aligned with your career goals and industry demands.'
  };
};

const SkillsGapSection = ({ skillsGap, showAllSkills, setShowAllSkills, careerPaths, userData }) => {
  // Find the skill with the biggest gap (if any)
  const findTopGapSkill = () => {
    if (!skillsGap || skillsGap.length === 0) return null;
    const sortedSkills = [...skillsGap].sort((a, b) => 
      (b.requiredLevel - b.currentLevel) - (a.requiredLevel - a.currentLevel)
    );
    return sortedSkills[0];
  };
  
  const topGapSkill = findTopGapSkill();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
      <p className="text-gray-600 mb-4">
        Visual representation of your current skill levels versus required levels for your target career paths.
      </p>
      
      {/* Career-specific learning banner */}
      {careerPaths.length > 0 && (
        <div className="bg-indigo-50 px-6 py-5 rounded-lg mb-6 flex items-start">
          <div className="mr-5 flex-shrink-0 rounded-full bg-indigo-100 p-3">
            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-indigo-800">
              Personalized Learning for {careerPaths[0].title}
            </h3>
            <p className="mt-2 text-sm text-indigo-700">
              Your learning resources are specifically tailored to help you become a successful {careerPaths[0].title}. Each resource has been selected based on your current skill level and the requirements of your desired career path.
            </p>
          </div>
        </div>
      )}
      
      {/* Learning Resources Section - Basic version */}
      <div className="bg-green-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-800">
            Career-Focused Learning Resources
          </h3>
          <div className="text-sm text-green-700 font-medium px-3 py-1 bg-green-100 rounded-full">
            {careerPaths.length > 0 ? `Tailored for ${careerPaths[0].title}` : 'Personalized'}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {skillsGap.slice(0, 4).map((skill, index) => {
            // Get personalized resources for this skill based on career paths
            const personalizedResources = getPersonalizedResources(skill, careerPaths, userData);
            
            return (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
                  {careerPaths.length > 0 && careerPaths[0].title && 
                    careerPathHasSkill(careerPaths[0].title, skill.name) && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs">
                      Key for {careerPaths[0].title}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {skill.currentLevel === 1 ? 'Beginner' : 
                   skill.currentLevel === 2 ? 'Basic' :
                   skill.currentLevel === 3 ? 'Intermediate' :
                   skill.currentLevel === 4 ? 'Advanced' : 'Expert'} → {
                   skill.requiredLevel === 1 ? 'Beginner' : 
                   skill.requiredLevel === 2 ? 'Basic' :
                   skill.requiredLevel === 3 ? 'Intermediate' :
                   skill.requiredLevel === 4 ? 'Advanced' : 'Expert'}
                </p>
                <p className="text-sm text-gray-700 mb-4">{skill.description}</p>
                
                {/* Simple Resource Display */}
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-green-800 mb-1">Recommended Courses</h5>
                    <ul className="space-y-2">
                      {personalizedResources.courses.slice(0, 2).map((course, cIdx) => (
                        <li key={cIdx} className="flex items-start border-l-2 border-green-200 pl-3">
                          <div>
                            <a 
                              href={course.url} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm block"
                            >
                              {course.title}
                            </a>
                            <span className="text-xs text-gray-500">
                              {course.platform}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Career-specific learning roadmap - Simplified Version */}
        <div className="mt-6 bg-white rounded-lg p-4 border border-green-100">
          <h4 className="font-medium text-green-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {careerPaths.length > 0 ? `${careerPaths[0].title} Learning Path` : 'Career Learning Path'}
          </h4>
          
          <div className="flex">
            <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-700">
              <strong>Focus on {topGapSkill ? topGapSkill.name : 'core skills'} first</strong> - Begin with foundational skills to build a strong base for your {careerPaths.length > 0 ? careerPaths[0].title : 'career'} transition.
            </p>
          </div>
          
          {/* Career-specific advice based on the path */}
          {careerPaths.length > 0 && (
            <>
              <div className="flex mt-2">
                <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-700">
                  <strong>{getCareerSpecificAdvice(careerPaths[0].title).title}</strong> - {getCareerSpecificAdvice(careerPaths[0].title).description}
                </p>
              </div>
              
              <div className="flex mt-2">
                <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-700">
                  <strong>Join {careerPaths[0].title} communities</strong> - Connect with other professionals to learn industry best practices and stay updated on trends.
                </p>
              </div>
              
              {/* Add specific advice for non-technical roles */}
              {!isTechnicalCareerPath(careerPaths[0].title) && (
                <div className="flex mt-2">
                  <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    <strong>Develop both domain and technical skills</strong> - For {careerPaths[0].title}s, balance industry knowledge with technical tools like {getDomainTechTools(careerPaths[0].title)} to maximize your effectiveness.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Skill level visualization charts */}
      <div className="grid md:grid-cols-2 gap-4">
        {skillsGap.slice(0, 6).map((skill, index) => (
          <SkillLevelChart key={index} skill={skill} careerPaths={careerPaths} />
        ))}
      </div>
      
      {/* Show more/less skills button */}
      {skillsGap.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center mx-auto"
          >
            {showAllSkills ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Show Less
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                View All Skills
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Additional skills when "show all" is clicked */}
      {showAllSkills && skillsGap.length > 6 && (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {skillsGap.slice(6).map((skill, index) => (
            <SkillLevelChart key={index + 6} skill={skill} careerPaths={careerPaths} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsGapSection;
