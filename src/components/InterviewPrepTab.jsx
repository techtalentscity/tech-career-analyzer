// src/components/InterviewPrepTab.jsx
import React, { useState } from 'react';

const InterviewPrepTab = ({ interviewQA, careerPath }) => {
  const [activeCategory, setActiveCategory] = useState('technical');
  const [expandedQuestions, setExpandedQuestions] = useState({});
  
  const toggleQuestion = (questionId) => {
    setExpandedQuestions({
      ...expandedQuestions,
      [questionId]: !expandedQuestions[questionId]
    });
  };
  
  const getQuestionsByCategory = (category) => {
    return interviewQA[category] || [];
  };
  
  return (
    <div className="interview-prep">
      <h2 className="text-2xl font-bold mb-6">Interview Preparation for {careerPath}</h2>
      
      <div className="category-tabs mb-6">
        <div className="flex border-b">
          <button 
            className={`py-2 px-4 ${activeCategory === 'technical' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveCategory('technical')}
          >
            Technical Questions
          </button>
          <button 
            className={`py-2 px-4 ${activeCategory === 'behavioral' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveCategory('behavioral')}
          >
            Behavioral Questions
          </button>
          {interviewQA.systemDesign && interviewQA.systemDesign.length > 0 && (
            <button 
              className={`py-2 px-4 ${activeCategory === 'systemDesign' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveCategory('systemDesign')}
            >
              System Design
            </button>
          )}
          {interviewQA.questionsToAsk && interviewQA.questionsToAsk.length > 0 && (
            <button 
              className={`py-2 px-4 ${activeCategory === 'questionsToAsk' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveCategory('questionsToAsk')}
            >
              Questions to Ask
            </button>
          )}
        </div>
      </div>
      
      <div className="question-list space-y-4">
        {getQuestionsByCategory(activeCategory).map((question, index) => (
          <div key={index} className="question-card border rounded-lg overflow-hidden">
            <div 
              className="question-header p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleQuestion(`${activeCategory}-${index}`)}
            >
              <div className="flex-1">
                <h3 className="text-lg font-medium">{question.question}</h3>
                <div className="question-meta flex mt-1">
                  {question.difficulty && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      question.difficulty.toLowerCase() === 'easy' 
                        ? 'bg-green-100 text-green-800' 
                        : question.difficulty.toLowerCase() === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {question.difficulty}
                    </span>
                  )}
                  {question.context && (
                    <span className="text-xs text-gray-500 ml-2">{question.context}</span>
                  )}
                </div>
              </div>
              <span className="text-xl ml-4">{expandedQuestions[`${activeCategory}-${index}`] ? '▲' : '▼'}</span>
            </div>
            
            {expandedQuestions[`${activeCategory}-${index}`] && (
              <div className="question-details p-4 bg-gray-50 border-t">
                {question.answer && (
                  <div className="answer mb-4">
                    <h4 className="text-md font-medium mb-2">Sample Answer:</h4>
                    <div className="text-gray-700 whitespace-pre-line">{question.answer}</div>
                  </div>
                )}
                
                {question.code && (
                  <div className="code-sample mb-4">
                    <h4 className="text-md font-medium mb-2">Code Solution:</h4>
                    <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">{question.code}</pre>
                  </div>
                )}
                
                {question.approach && (
                  <div className="approach mb-4">
                    <h4 className="text-md font-medium mb-2">Approach:</h4>
                    <div className="text-gray-700">{question.approach}</div>
                  </div>
                )}
                
                {question.tips && (
                  <div className="tips mb-4">
                    <h4 className="text-md font-medium mb-2">Tips:</h4>
                    <div className="text-gray-700">{question.tips}</div>
                  </div>
                )}
                
                {question.purpose && (
                  <div className="purpose mb-4">
                    <h4 className="text-md font-medium mb-2">Purpose:</h4>
                    <div className="text-gray-700">{question.purpose}</div>
                  </div>
                )}
                
                {question.timing && (
                  <div className="timing mb-4">
                    <h4 className="text-md font-medium mb-2">When to Ask:</h4>
                    <div className="text-gray-700">{question.timing}</div>
                  </div>
                )}
                
                {question.keyConsiderations && question.keyConsiderations.length > 0 && (
                  <div className="key-considerations mb-4">
                    <h4 className="text-md font-medium mb-2">Key Considerations:</h4>
                    <ul className="list-disc pl-5">
                      {question.keyConsiderations.map((consideration, i) => (
                        <li key={i} className="text-gray-700">{consideration}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {question.followUpQuestions && question.followUpQuestions.length > 0 && (
                  <div className="follow-up">
                    <h4 className="text-md font-medium mb-2">Follow-up Questions:</h4>
                    <ul className="list-disc pl-5">
                      {question.followUpQuestions.map((followUp, i) => (
                        <li key={i} className="text-gray-700">{followUp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrepTab;
