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
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
      <p className="text-gray-600 mb-4">
        Visual representation of your current skill levels versus required levels for your target career paths.
      </p>
      
      {/* Career-specific learning banner */}
      {careerPaths.length > 0 && (
        <div className="bg-indigo-50 px-6 py-5 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-indigo-800">
            Personalized Learning for {careerPaths[0].title}
          </h3>
          <p className="mt-2 text-sm text-indigo-700">
            Your learning resources are specifically tailored to help you become a successful {careerPaths[0].title}.
          </p>
        </div>
      )}
      
      {/* Simple version of the skills gap visualization */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {skillsGap.slice(0, 6).map((skill, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">{skill.name}</h3>
            <p className="text-sm text-gray-600">
              Current: {skill.currentLevel} → Required: {skill.requiredLevel}
            </p>
            <p className="text-sm text-gray-700 mt-2">{skill.description || 'No description available.'}</p>
            
            <div className="mt-4">
              <SkillLevelChart skill={skill} careerPaths={careerPaths} />
            </div>
          </div>
        ))}
      </div>
      
      {/* Show more/less skills button */}
      {skillsGap.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllSkills(!showAllSkills)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {showAllSkills ? 'Show Less' : 'View All Skills'}
          </button>
        </div>
      )}
      
      {/* Additional skills when "show all" is clicked */}
      {showAllSkills && skillsGap.length > 6 && (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {skillsGap.slice(6).map((skill, index) => (
            <div key={index + 6} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">{skill.name}</h3>
              <p className="text-sm text-gray-600">
                Current: {skill.currentLevel} → Required: {skill.requiredLevel}
              </p>
              <div className="mt-4">
                <SkillLevelChart skill={skill} careerPaths={careerPaths} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsGapSection;
