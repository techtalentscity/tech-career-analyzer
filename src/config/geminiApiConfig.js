// src/config/geminiApiConfig.js
const GEMINI_API_CONFIG = {
  models: {
    default: 'gemini-pro',
    vision: 'gemini-pro-vision'
  },
  maxTokens: {
    learningResources: 4096,
    interviewQuestions: 4096
  }
};

// Prompts for different Gemini API requests
const GEMINI_PROMPTS = {
  learningResources: (careerPath, skills) => `
    Generate comprehensive learning resources for someone pursuing a career as a ${careerPath}.
    They need to learn the following skills: ${skills.join(', ')}.
    
    For EACH skill, provide:
    1. Free resources (online tutorials, documentation, videos)
    2. Recommended paid courses (with platform, cost, and URL)
    3. Books (with author and brief description)
    4. Practice projects that reinforce this skill
    5. Certifications if relevant
    
    Format the response as JSON with the following structure:
    {
      "resources": [
        {
          "skillName": "Skill name",
          "importance": 8,
          "freeResources": [
            {"name": "Resource name", "link": "URL", "format": "Video/Article/Tutorial", "difficulty": "Beginner/Intermediate/Advanced", "estimatedHours": 10}
          ],
          "paidCourses": [
            {"platform": "Udemy/Coursera/etc", "name": "Course name", "link": "URL", "cost": "$XX", "rating": 4.5, "duration": "X hours/weeks"}
          ],
          "books": [
            {"title": "Book title", "author": "Author name", "link": "URL", "description": "Brief description"}
          ],
          "practiceProjects": [
            {"name": "Project name", "description": "Brief description", "difficulty": "Beginner/Intermediate/Advanced"}
          ],
          "certifications": [
            {"name": "Certification name", "provider": "Provider name", "cost": "$XX", "link": "URL", "difficulty": "Beginner/Intermediate/Advanced"}
          ]
        }
      ]
    }
  `,
  
  interviewQuestions: (careerPath, skills) => `
    Generate a comprehensive interview preparation guide for a ${careerPath} role.
    Include questions that test knowledge of: ${skills.join(', ')}.
    
    Format the response as JSON with the following structure:
    {
      "technical": [
        {
          "question": "Technical question text",
          "difficulty": "Easy/Medium/Hard",
          "answer": "Detailed answer",
          "code": "Code example if applicable",
          "followUpQuestions": ["Potential follow-up question 1", "Potential follow-up question 2"]
        }
      ],
      "behavioral": [
        {
          "question": "Behavioral question text",
          "context": "When this question is typically asked",
          "answer": "Sample answer structure and key points to include",
          "tips": "Tips for answering effectively"
        }
      ],
      "systemDesign": [
        {
          "question": "System design question text",
          "difficulty": "Easy/Medium/Hard",
          "approach": "Step-by-step approach to tackling this question",
          "keyConsiderations": ["Consideration 1", "Consideration 2"],
          "diagrams": ["Description of diagram 1 to include"]
        }
      ],
      "questionsToAsk": [
        {
          "question": "Question to ask the interviewer",
          "purpose": "Why this question is effective to ask",
          "timing": "When in the interview to ask this"
        }
      ]
    }
  `
};

export { GEMINI_API_CONFIG, GEMINI_PROMPTS };
