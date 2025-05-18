import React from 'react';
import SkillLevelChart from '../visualizations/SkillLevelChart';
import { determineSkillResources } from '../utils/dataExtractors';

const SkillsGapSection = ({ skillsGap, showAllSkills, setShowAllSkills }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-6">Skills Gap Analysis</h2>
      <p className="text-gray-600 mb-4">
        Visual representation of your current skill levels versus required levels for your target career paths.
      </p>
      
      {/* Learning Resources - Always visible when skills are present */}
      <div className="bg-green-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Personalized Learning Resources</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {skillsGap.slice(0, 4).map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
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
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-green-800 mb-1">Recommended Courses</h5>
                  <ul className="space-y-1">
                    {skill.resources?.courses.map((course, cIdx) => (
                      <li key={cIdx} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <a 
                          href={course.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {course.title} ({course.platform})
                        </a>
                      </li>
                    )) || (
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <a 
                          href={`https://www.coursera.org/search?query=${encodeURIComponent(skill.name)}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Coursera Courses
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-green-800 mb-1">Practice & Projects</h5>
                  <ul className="space-y-1">
                    {skill.resources?.tutorials.map((tutorial, tIdx) => (
                      <li key={tIdx} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <a 
                          href={tutorial.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {tutorial.title} ({tutorial.platform})
                        </a>
                      </li>
                    )) || (
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <a 
                          href={`https://www.udemy.com/courses/search/?src=ukw&q=${encodeURIComponent(skill.name)}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Udemy Tutorials
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-green-800 mb-1">Learning Communities</h5>
                  <ul className="space-y-1">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <a 
                        href={`https://www.reddit.com/search/?q=${encodeURIComponent(skill.name)}%20learning`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Reddit Communities
                      </a>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <a 
                        href={`https://discord.com/servers?search=${encodeURIComponent(skill.name)}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Discord Learning Groups
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {skillsGap.length > 4 && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {skillsGap.slice(4, 6).map((skill, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
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
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {skill.resources?.courses.slice(0, 1).map((course, cIdx) => (
                    <a 
                      key={cIdx}
                      href={course.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100"
                    >
                      {course.platform} Courses
                    </a>
                  ))}
                  
                  {skill.resources?.tutorials.slice(0, 1).map((tutorial, tIdx) => (
                    <a 
                      key={tIdx}
                      href={tutorial.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100"
                    >
                      {tutorial.platform}
                    </a>
                  ))}
                  
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(skill.name)}+tutorial+beginner`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100"
                  >
                    YouTube
                  </a>
                  
                  <a 
                    href={`https://github.com/topics/${encodeURIComponent(skill.name.toLowerCase().replace(/ /g, '-'))}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-gray-100"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 bg-white rounded-lg p-4 border border-green-100">
          <h4 className="font-medium text-green-800 mb-3">Learning Path Strategy</h4>
          <div className="flex">
            <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-700">
              <strong>Focus on your highest gap skills first</strong> - Begin with {
                skillsGap.length > 0 ? skillsGap.sort((a, b) => b.gap - a.gap)[0].name : 'core skills'
              } to build a strong foundation for your career transition.
            </p>
          </div>
          <div className="flex mt-2">
            <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-700">
              <strong>Apply as you learn</strong> - For each skill, complete at least one project to reinforce your learning 
              before moving to the next skill.
            </p>
          </div>
          <div className="flex mt-2">
            <svg className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-gray-700">
              <strong>Join learning communities</strong> - Engage with others learning the same skills to stay motivated
              and solve problems collaboratively.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {skillsGap.slice(0, 6).map((skill, index) => (
          <SkillLevelChart key={index} skill={skill} />
        ))}
      </div>
      
      {skillsGap.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllSkills(prevState => !prevState)}
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
      
      {showAllSkills && skillsGap.length > 6 && (
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {skillsGap.slice(6).map((skill, index) => (
            <SkillLevelChart key={index + 6} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsGapSection;
