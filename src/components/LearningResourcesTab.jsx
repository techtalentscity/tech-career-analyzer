// src/components/LearningResourcesTab.jsx
import React, { useState } from 'react';

const LearningResourcesTab = ({ resources, careerPath }) => {
  const [expandedSkill, setExpandedSkill] = useState(null);
  
  const toggleSkill = (skillIndex) => {
    setExpandedSkill(expandedSkill === skillIndex ? null : skillIndex);
  };
  
  return (
    <div className="learning-resources">
      <h2 className="text-2xl font-bold mb-6">Learning Resources for {careerPath}</h2>
      
      {resources.resources && resources.resources.map((skillResource, index) => (
        <div key={index} className="skill-resource-card mb-6 border rounded-lg overflow-hidden">
          <div 
            className="skill-header bg-gray-50 p-4 cursor-pointer flex justify-between items-center"
            onClick={() => toggleSkill(index)}
          >
            <div>
              <h3 className="text-xl font-semibold">{skillResource.skillName}</h3>
              <div className="text-sm text-gray-600">Importance: {skillResource.importance}/10</div>
            </div>
            <span className="text-xl">{expandedSkill === index ? '▲' : '▼'}</span>
          </div>
          
          {expandedSkill === index && (
            <div className="p-4">
              {skillResource.freeResources && skillResource.freeResources.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Free Resources</h4>
                  <ul className="resource-list space-y-2">
                    {skillResource.freeResources.map((resource, i) => (
                      <li key={i} className="border-l-4 border-green-300 pl-3 py-1">
                        <a 
                          href={resource.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {resource.name}
                        </a>
                        <div className="text-sm text-gray-600">
                          {resource.format} • {resource.difficulty} • {resource.estimatedHours} hours
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {skillResource.paidCourses && skillResource.paidCourses.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Paid Courses</h4>
                  <ul className="resource-list space-y-2">
                    {skillResource.paidCourses.map((course, i) => (
                      <li key={i} className="border-l-4 border-blue-300 pl-3 py-1">
                        <a 
                          href={course.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {course.name}
                        </a>
                        <div className="text-sm text-gray-600">
                          {course.platform} • {course.cost} • {course.duration} • Rating: {course.rating}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {skillResource.books && skillResource.books.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Books</h4>
                  <ul className="resource-list space-y-2">
                    {skillResource.books.map((book, i) => (
                      <li key={i} className="border-l-4 border-yellow-300 pl-3 py-1">
                        <a 
                          href={book.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {book.title}
                        </a>
                        <div className="text-sm text-gray-600">
                          By {book.author}
                        </div>
                        <div className="text-sm mt-1">
                          {book.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {skillResource.practiceProjects && skillResource.practiceProjects.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Practice Projects</h4>
                  <ul className="resource-list space-y-2">
                    {skillResource.practiceProjects.map((project, i) => (
                      <li key={i} className="border-l-4 border-purple-300 pl-3 py-1">
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-gray-600">
                          Difficulty: {project.difficulty}
                        </div>
                        <div className="text-sm mt-1">
                          {project.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {skillResource.certifications && skillResource.certifications.length > 0 && (
                <div>
                  <h4 className="text-lg font-medium mb-2">Certifications</h4>
                  <ul className="resource-list space-y-2">
                    {skillResource.certifications.map((cert, i) => (
                      <li key={i} className="border-l-4 border-red-300 pl-3 py-1">
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {cert.name}
                        </a>
                        <div className="text-sm text-gray-600">
                          {cert.provider} • {cert.cost} • Difficulty: {cert.difficulty}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LearningResourcesTab;
