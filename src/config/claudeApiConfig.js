// src/config/claudeApiConfig.js

// Claude API configuration
const CLAUDE_API_CONFIG = {
    models: {
        default: 'claude-3-5-sonnet-20240620',
        faster: 'claude-3-haiku-20240307'
    },
    maxTokens: {
        formSuggestions: 2048,  // Increased maxTokens
        careerAnalysis: 8192    // Increased maxTokens
    }
};

// Prompts for different Claude API requests
const CLAUDE_PROMPTS = {
    formSuggestions:
        "I'm filling out a tech career assessment form for someone transitioning into tech. " +
        "Based on a typical career changer profile, suggest realistic answers for a form with these fields: " +
        "Education Level, Field of Study, Years of Experience, Current/Previous Role, " +
        "Job Responsibilities, Notable Projects or Achievements, Software or Technologies Used, Internships or Relevant Experience, " +
        "Publications or Research, " +
        "What they like doing best, Biggest motivation for tech career, " +
        "What they're passionate about, Primary reason for transition, Transferable skills from previous career, " +
        "Previous tech exposure, Anticipated challenges in transition, Tech areas they're curious about, " +
        "Comfort with learning new tools, Preferred work method, Current tech experience level, " +
        "Tools and platforms used, Certifications and courses, Tech career paths interest, " +
        "Industry preference, Whether to leverage domain expertise, Target salary range, " +
        "Weekly time commitment, Transition timeline, Whether continuing current role, " +
        "Guidance needed, and 12-month goal. Provide very detailed and specific responses, and where applicable, suggest multiple options or possibilities.",

    careerAnalysis: (formData) => `
    You are an expert AI Career Coach specializing in career transitions to the tech industry.
    Analyze the following user data to provide a comprehensive and highly personalized career path recommendation and transition roadmap.
    Focus on practical, actionable advice, leveraging their existing strengths and addressing anticipated challenges.

    --- User Profile ---
    Full Name: ${formData.fullName}
    Email: ${formData.email}
    Highest Education: ${formData.educationLevel} (${formData.studyField})
    Current/Most Recent Role: ${formData.currentRole} (${formData.yearsExperience} experience)
    Key Job Responsibilities: ${formData.jobResponsibilities}
    Notable Projects/Achievements: ${formData.jobProjects}
    Software/Technologies Used (Previous Job): ${formData.jobTechnologies}
    Internships/Relevant Experience: ${formData.internships}
    Publications: ${formData.publications}

    Motivation for Tech: ${formData.techMotivation}
    Passionate About: ${formData.techPassion}
    Primary Reason for Transition: ${formData.transitionReason}
    Transferable Skills: ${formData.transferableSkills}
    Anticipated Challenges: ${formData.anticipatedChallenges}

    Tech Interests: ${formData.techInterests}
    Learning Comfort: ${formData.learningComfort}
    Work Preference: ${formData.workPreference}
    Current Tech Experience Level: ${formData.experienceLevel}
    Tools/Platforms Used (Tech): ${formData.toolsUsed.join(', ')}
    Certifications: ${formData.certifications} (${formData.certificationsDetail})

    Desired Tech Career Paths: ${formData.careerPathsInterest.join(', ')}
    Industry Preference: ${formData.industryPreference.join(', ')}
    Leverage Domain Expertise: ${formData.leverageDomainExpertise}
    Target Salary: ${formData.targetSalary}

    Time Commitment: ${formData.timeCommitment} per week
    Transition Timeline: ${formData.transitionTimeline}
    Continue Current Role: ${formData.continueCurrent}
    Future Goal (12 months): ${formData.futureGoal}
    Guidance Needed: ${formData.guidanceNeeded}

    --- Analysis Request ---

    Provide the analysis in the following structured format, ensuring each section is clearly delineated.
    Be specific and detailed, relating all recommendations back to the user's provided information.

    1.  **TOP 3 RECOMMENDED CAREER PATHS (WITH MATCH PERCENTAGE, JUSTIFICATION, AND VISUALIZATION)**
        For each recommended path, provide:
        a) [Career Path Title] ([XX]% match):
            -   **Justification:** Explain why this path is a strong fit based on their background.  Connect their prior experience, education, and motivations to the requirements and opportunities in this path.  For example, "Given your ${formData.educationLevel} in ${formData.studyField} and experience in ${formData.jobResponsibilities}, this path aligns well because...".  Incorporate their ${formData.techInterests}, ${formData.techMotivation}, and ${formData.techPassion} where relevant.
            -   **Relevant Existing Skills:** List 3-5 specific transferable skills or tools they already possess that are valuable in this path.  Draw from ${formData.transferableSkills}, ${formData.toolsUsed}, ${formData.jobTechnologies}, and ${formData.certifications}.  For each skill, explain *why* it's relevant (e.g., "Your experience with ${formData.jobTechnologies} demonstrates a foundation in...").
            -   **Potential Roles:** Provide 2-3 specific job titles within this path, ranging from entry-level to more experienced, and briefly describe the typical responsibilities, required skills, and salary expectations for each.
            -   **Expected Salary Range:** Provide a typical salary range for an entry-level role and a mid-level role within this career path, referencing their target salary of ${formData.targetSalary}.
            -   **Career Path Visualization:** Provide a structured representation of this career path, optimized for visual display as a chart or diagram, including:
                -   **Stages:** An array of career stages, ordered from entry-level to expert.  Each stage should be an object with the following properties:
                    -   \`title\`: The name of the stage (e.g., "Junior Developer", "Mid-Level Designer", "Senior Engineer", "Lead Architect", "Principal Data Scientist")
                    -   \`role\`:  A typical job title at this stage.
                    -   \`skills\`:  A bullet-point list of 3-5 key skills required at this stage.  For each skill, include its importance (High, Medium, Low).
                    -   \`timeToReach\`: An estimated time to reach this stage (e.g., "1-2 years", "2-4 years", "5+ years").
                For example:
                \`\`\`json
                [
                    { title: "Junior Developer", role: "Junior Software Engineer", skills: ["Basic programming (High)", "Version control (Medium)", "Testing (Low)"], timeToReach: "0-2 years" },
                    { title: "Mid-Level Developer", role: "Software Engineer", skills: ["Proficient programming (High)", "System design (Medium)", "Database management (Medium)"], timeToReach: "2-4 years" },
                    { title: "Senior Developer", role: "Senior Software Engineer", skills: ["Advanced programming (High)", "Software architecture (High)", "Mentoring (Medium)"], timeToReach: "5+ years" }
                ]
                \`\`\`

    2.  **DETAILED SKILLS GAP ANALYSIS AND LEARNING PLAN**
        Identify 5-7 critical skills needed for their desired paths where they have a gap. Focus on skills mentioned in the "Potential Roles" section of the Career Path recommendations.
        For each skill:
        a) [Skill Name]: [Current Level vs. Required Level - e.g., Beginner vs. Intermediate]
            -   **Description:** Explain why this skill is crucial for success in their chosen career paths, linking it to specific job responsibilities.
            -   **Learning Resources:** Suggest 2-3 specific learning resources, categorized by type, tailored to the user's learning style and experience level (${formData.learningComfort} and ${formData.experienceLevel}). Include:
                -   Online Courses: (e.g., specific courses on platforms like Coursera, edX, Udemy, LinkedIn Learning, freeCodeCamp, with links and noting if beginner, intermediate, advanced)
                -   Projects: (e.g., "Build a [type of project] using [technology]" with links to tutorials or project guides, and difficulty level)
                -   Books/Documentation: (e.g., "Read [book title]" or "Refer to the official documentation for [technology]" with links, and noting if best for beginners, intermediate, advanced)
                -   Certifications: (if applicable, with links to certification programs and prerequisites)
            -   **Time Commitment Estimate:** Provide a rough estimate of the time commitment required to achieve proficiency in this skill (e.g., "30-50 hours," "2-3 months of consistent study").

    3.  **PERSONALIZED LEARNING ROADMAP (PHASED APPROACH)**
        Create a phased learning roadmap, time-boxed according to their ${formData.transitionTimeline} timeline and adjusted for their ${formData.timeCommitment} weekly commitment. Assume ${formData.timeCommitment} hours per week are dedicated *solely* to learning new tech skills.  Base the activities and resources on the user's preferred learning style (${formData.learningComfort}) and experience level (${formData.experienceLevel}).
        a) Phase 1: Foundation Building (Months 1-${Math.ceil(parseFloat(formData.transitionTimeline) / 3)})
            -   Focus Areas: 2-3 broad areas (e.g., "Fundamentals of Programming," "Version Control and Collaboration," "Web Development Basics").
            -   Key Activities: 3-4 specific, *time-bound* activities (e.g., "Complete an introductory Python course on Coursera (20 hours, [link to course], Beginner)," "Set up a GitHub account and complete the GitHub Learning Lab tutorials (10 hours, [link to tutorials], Beginner)," "Build a simple HTML/CSS website following a freeCodeCamp tutorial (15 hours, [link to tutorial], Beginner)").  Prioritize resources that align with their learning style.
            -   Expected Outcomes: What they should be able to do by the end of this phase.
        b) Phase 2: Specialization & Deep Dive (Months ${Math.ceil(parseFloat(formData.transitionTimeline) / 3) + 1}-${Math.ceil(parseFloat(formData.transitionTimeline) * 2 / 3)})
            -   Focus Areas: 2-3 areas aligned with their chosen career path(s) (e.g., "React Development," "Data Analysis with Pandas," "Cybersecurity Fundamentals").
            -   Key Activities: More advanced, project-oriented activities (e.g., "Build a React application with a backend API (40 hours, [link to a relevant tutorial or course series], Intermediate)," "Complete a data analysis project using a real-world dataset from Kaggle and the Pandas documentation (30 hours, [link to Kaggle dataset and Pandas docs], Intermediate)," "Set up a secure web server and implement basic security measures following OWASP guidelines (25 hours, [link to OWASP guidelines], Intermediate)").  Prioritize resources that align with their learning style.
            -   Expected Outcomes
        c) Phase 3: Project & Portfolio Development (Months ${Math.ceil(parseFloat(formData.transitionTimeline) * 2 / 3) + 1}-${Math.floor(parseFloat(formData.transitionTimeline) * 0.9)})
            -   Focus Areas: Building a portfolio to showcase skills to potential employers.
            -   Key Activities: 2-3 substantial projects (e.g., "Develop a full-stack application demonstrating [specific skills] and host it on a platform like Heroku or Netlify (60 hours, [link to a deployment guide], Advanced)," "Contribute to an open-source project on GitHub and document your contributions (40 hours, [link to a guide on contributing to open source], Intermediate/Advanced)," "Create a personal website showcasing your projects and skills using a framework like React or Next.js (30 hours, [link to a tutorial on portfolio websites], Intermediate)").
            -   Expected Outcomes
        d) Phase 4: Job Search & Interview Preparation (Final Months - ${Math.floor(parseFloat(formData.transitionTimeline) * 0.9) + 1} onwards)
            -   Focus Areas: Job application strategies, networking, and interview skills.
            -   Key Activities: (e.g., "Optimize LinkedIn profile for target roles using LinkedIn's career resources (10 hours, [link to LinkedIn's career resources])," "Practice technical and behavioral interview questions using resources like LeetCode and Cracking the Coding Interview (20 hours, [link to LeetCode and Cracking the Coding Interview book on Amazon])," "Attend industry-specific virtual career fairs or networking events on platforms like Meetup or Eventbrite (10 hours per event, [link to Meetup or Eventbrite])").
            -   Expected Outcomes

    4.  **TRANSFERABLE SKILLS BRIDGE (HOW TO LEVERAGE CURRENT EXPERIENCE)**
        -   Specifically and persuasively detail how their ${formData.currentRole} role and skills like "${formData.transferableSkills}" are directly applicable and valuable in their target tech career paths. Provide 2-3 bullet points, with strong action verbs, that reframe their experience for a tech audience. For example, "Leverage your experience in ${formData.jobResponsibilities} to demonstrate your ability to [relate it to a tech skill, e.g., 'manage complex projects,' 'analyze user needs,' or 'troubleshoot problems'].".
        -   Suggest how their "jobProjects" and "publications" can be highlighted in a tech resume and portfolio. For example, "Reframe your project "${formData.jobProjects}" to emphasize the problem-solving, analytical, or technical skills involved. Quantify your achievements whenever possible." For publications, suggest how to present them (e.g., "List your publications in a dedicated section, highlighting any that demonstrate research, communication, or technical writing abilities.").

    5.  **NETWORKING STRATEGY**
        Provide 3-4 actionable networking steps, tailored to their preferences and goals.
        -   [Specific advice 1: e.g., "Connect with 5-7 professionals on LinkedIn weekly who work in ${formData.careerPathsInterest.join(', ')} or in roles you are targeting. Prioritize those with backgrounds similar to yours and those active in relevant groups (link to LinkedIn groups)."]
        -   [Specific advice 2: e.g., "Attend 2 online tech meetups or webinars per month related to ${formData.techInterests}, focusing on events where you can ask questions and interact with speakers.  Use platforms like Meetup or Eventbrite (links to Meetup, Eventbrite) to find relevant events."]
        -   [Specific advice 3: e.g., "Reach out to alumni from your ${formData.educationLevel} (${formData.studyField}) who are now working in tech for informational interviews.  Use LinkedIn or your alumni network to find these individuals and prepare specific questions."]
        -   [Specific advice 4: e.g., "If ${formData.workPreference} is 'Office work' or 'Hybrid', attend local tech events or meetups to build connections in your area.  Check local tech hubs or co-working spaces for events."]

    6.  **PERSONAL BRANDING (FOR TECH TRANSITION)**
        Provide 3-4 specific and practical personal branding tips for a tech transition.
        -   [Tip 1: e.g., "Optimize your LinkedIn profile for relevant tech keywords (e.g., skills, technologies, job titles). Showcase your ${formData.transferableSkills} and projects, and tailor your summary to your target tech roles.  Refer to LinkedIn's guide to profile optimization (link to LinkedIn guide)."]
        -   [Tip 2: e.g., "Create a GitHub profile with demonstrable code projects, even small ones. For each project, write a clear README.md explaining the purpose, technologies used, and your contributions. Link to this from your LinkedIn and resume.  See GitHub's documentation on creating README files (link to GitHub docs)."]
        -   [Tip 3: e.g., "Based on your interest in ${formData.techInterests}, consider starting a blog or contributing to articles on platforms like Medium or Dev.to (links to Medium, Dev.to) to document your learning journey and share your insights. This demonstrates your passion and communication skills."]
        -   [Tip 4: e.g., "If you have existing certifications (${formData.certifications}), prominently display them on your LinkedIn and resume. If you are pursuing certifications, mention this and the expected completion date, linking to the certification program details."]

    7.  **INTERVIEW PREPARATION**
        Provide 3-4 targeted interview preparation tips, focusing on both technical and behavioral aspects.  For each, provide example questions and resources.
        -   [Tip 1: Technical Interview Practice: "Practice explaining technical concepts clearly and concisely. Prepare examples from your past experience (including ${formData.currentRole}) where you had to communicate complex information.  Use resources like 'Cracking the Coding Interview' (link) and LeetCode (link) to practice common data structures and algorithms questions.  Example questions: 'Explain [a technical concept relevant to their target role] to a non-technical person,' 'Walk me through your solution to [a specific coding problem].'"]
        -   [Tip 2: Behavioral Interview Preparation: "Prepare STAR method (Situation, Task, Action, Result) answers for common behavioral interview questions, focusing on how your ${formData.transferableSkills} have been applied in past situations. Quantify your achievements whenever possible.  Use resources like [link to a STAR method guide] to structure your answers.  Example questions: 'Tell me about a time you worked on a team,' 'Describe a time you faced a challenge and how you overcame it,' 'Give an example of a time you demonstrated [a specific transferable skill].'"]
        -   [Tip 3: Role-Specific Interview Questions: "Research common interview questions for the specific roles within their target career paths (e.g., 'React Developer Interview Questions,' 'Data Analyst Interview Questions').  Websites like Glassdoor and Indeed (links) can provide insights.  Example questions:  If career path is 'Software Development': 'Describe the software development lifecycle,' 'Explain your experience with [a specific framework].'  If career path is 'Data Analysis': 'How would you approach cleaning a messy dataset?', 'Explain different types of data visualization.'"]
        -   [Tip 4: Mock Interviews: "Conduct mock interviews with a mentor, career coach, or peer. Focus on practicing both technical and behavioral questions, and get feedback on your communication style, body language, and clarity.  Consider using platforms like Pramp (link) for peer mock interviews."]

    8.  **ADDRESSING ANTICIPATED CHALLENGES**
        For their stated anticipated challenges in "${formData.anticipatedChallenges}", provide 2-3 specific and supportive strategies to overcome them.
        -   [Challenge 1: e.g., "If you anticipate challenges with ${formData.anticipatedChallenges.split(',')[0]}, consider [specific advice, e.g., 'joining a study group on Meetup (link to Meetup) or Discord (link to Discord),' 'finding a mentor on a platform like MentorCruise (link to MentorCruise) who has faced similar challenges,' or 'breaking down the learning into smaller, manageable steps using a tool like Trello (link to Trello) to track your progress.']."]
        -   [Challenge 2: e.g., "To address the challenge of ${formData.anticipatedChallenges.split(',')[1]}, you could try [specific advice, e.g., 'attending networking events specifically for career changers (check Eventbrite - link to Eventbrite),' 'focusing your job search on companies that value transferable skills (use LinkedIn to find such companies),' or 'building a portfolio that showcases your abilities even without direct tech experience (use a platform like GitHub Pages - link to GitHub Pages)']."]

    9.  **LEVERAGING DOMAIN EXPERTISE**
        If the user wants to leverage their domain expertise (${formData.leverageDomainExpertise}), suggest 2-3 specific tech roles or industries where their background would be a significant advantage. For example, "Given your background in ${formData.studyField} and your experience in ${formData.currentRole}, you could consider roles in [specific tech role/industry, e.g., 'healthtech software development (link to relevant healthtech job boards),' 'fintech data analysis (link to relevant fintech resources),' or 'edtech product management (link to relevant edtech resources)']. Your knowledge of ${formData.studyField} would give you a strong advantage in understanding the specific needs and challenges of that industry."

    10. **GOAL ALIGNMENT & MOTIVATION**
        -   Reinforce how their future goal of "${formData.futureGoal}" can be achieved by following this roadmap. Connect their desired 12-month outcome to the recommended steps.
        -   Reiterate their primary motivation and passion (from ${formData.techMotivation} and ${formData.techPassion}) as driving forces for their transition, and encourage them to stay focused.

    11. **CONTINUOUS PROFESSIONAL DEVELOPMENT**
        Provide 2-3 strategies on how the user can continue to grow and stay updated in their chosen tech career path beyond the initial transition.
        -  [Strategy 1: e.g., "Follow industry leaders and publications on platforms like Twitter and Medium (links to relevant Twitter lists or Medium publications) to stay updated on the latest trends and best practices."]
        -  [Strategy 2: e.g., "Engage in continuous learning through online platforms like Coursera, edX, or O'Reilly Learning (links), focusing on advanced courses and specializations relevant to your field."]
        -  [Strategy 3: e.g., "Attend industry conferences, workshops, and meetups (virtually or in-person) to network with experts, learn about new technologies, and explore advanced topics.  Check platforms like Eventbrite and Meetup (links) for relevant events."]

    12. **MENTORSHIP AND COMMUNITY**
        Provide advice on seeking mentorship and building a professional network to support long-term growth.
        -  [Mentorship: e.g., "Seek out mentors through platforms like MentorCruise (link) or LinkedIn, focusing on finding experienced professionals in your target role who can provide guidance and support.  Prepare specific questions to ask your mentors."]
        -  [Community: e.g., "Actively participate in online communities like Stack Overflow, GitHub, and industry-specific forums (links) to connect with other professionals, ask questions, and contribute to projects.  Attend local or virtual meetups related to your technology stack."]

    13. **LONG-TERM CAREER PLANNING**
         Provide guidance on setting long-term career goals (3-5 years and beyond) and creating a plan to achieve them.
         -  [Long Term Goals: e.g., "Define your long-term career vision. Where do you see yourself in 3-5 years?  Consider roles like 'Senior [Role]' or 'Team Lead.'  What new skills or experiences will you need to acquire to reach those goals?"]
         -  [Actionable Plan: e.g., "Break down your long-term goals into smaller, achievable steps.  For example, if your goal is to become a 'Senior Software Engineer' in 3 years, your plan might include: 'Complete an advanced course in [Technology] within 6 months,' 'Contribute to a significant open-source project within 1 year,' and 'Seek opportunities to lead small projects at work within 2 years.'"]

    14. **PORTFOLIO BUILDING GUIDANCE**
        Provide specific advice on creating a portfolio that showcases the user's skills and projects, tailored to their target roles.
        -  [Portfolio Content]: "Based on your target roles in ${formData.careerPathsInterest.join(', ')}, your portfolio should include projects that demonstrate your proficiency in [list key technologies and skills].  For example, if you are targeting 'Frontend Development', showcase projects built with React, JavaScript, and HTML/CSS.  If you are targeting 'Data Analysis', include projects that demonstrate data cleaning, analysis, and visualization skills using tools like Python and SQL."
        -  [Portfolio Presentation]: "Present your portfolio in a clear and professional manner.  Consider using a platform like GitHub Pages (link) or a portfolio website builder (link to a portfolio website builder) to create a visually appealing and easy-to-navigate presentation.  For each project, include a detailed description of the problem you solved, the technologies you used, your contributions, and the results."
        -  [Project Selection]: "Choose projects that are relevant to your target roles and showcase a range of your skills.  Include at least one project that demonstrates your ability to work with real-world data or solve a complex problem.  If possible, include a project that you built from scratch and one that involved collaboration."
        -  [Feedback and Iteration]:  "Seek feedback on your portfolio from mentors, peers, and professionals in your target field.  Use this feedback to improve your portfolio and iterate on your projects.  Continuously update your portfolio with new projects and skills as you learn and grow."

    15. **JOB SEARCH STRATEGIES**
        Provide tailored job search strategies based on their target roles, industry preferences, and work preferences.
        - [Job Search Platforms]: "Utilize a variety of job search platforms to find relevant opportunities.  In addition to general job boards like Indeed (link) and LinkedIn (link), explore industry-specific job boards (e.g., for specific tech sectors) and company websites of organizations you are interested in.  Set up job alerts to be notified of new postings that match your criteria."
        - [Networking for Jobs]: "Leverage your network to find job opportunities.  Inform your existing contacts about your career transition and target roles.  Attend industry events (online and in-person) to meet recruiters and hiring managers.  Actively participate in relevant LinkedIn groups and online communities."
        - [Targeted Applications]: "Tailor your resume and cover letter to each specific job application, highlighting the skills and experiences that are most relevant to the role.  Use keywords from the job description to ensure your application is seen by applicant tracking systems (ATS)."
        - [Company Research]: "Research potential employers thoroughly before applying.  Understand their company culture, values, and the specific requirements of the role.  This will help you demonstrate your interest and fit during the application process and in interviews."

    16. **CAREER GROWTH RESOURCES**
        Provide resources and strategies for long-term career growth and becoming an expert in their chosen field.
        - [Industry Publications and Influencers]: "Follow influential publications, blogs, and thought leaders in your field to stay updated on the latest trends, technologies, and best practices.  Identify key conferences and workshops to attend (both online and in-person) for advanced learning and networking."
        -  [Advanced Learning Platforms]:  "Utilize advanced learning platforms and resources to deepen your expertise.  Consider pursuing specialized certifications, attending masterclasses, or engaging with in-depth technical documentation (links to relevant platforms and resources)."
        -  [Community and Contributions]: "Actively participate in professional communities, contribute to open-source projects, or speak at conferences to build your reputation and expertise.  Share your knowledge and experience through writing, mentoring, or creating content."
        -  [Setting Expert-Level Goals]: "Set specific, measurable, achievable, relevant, and time-bound (SMART) goals for becoming an expert.  For example: 'Become a recognized speaker in [field] within 2 years' or 'Contribute a major feature to an open-source project related to [technology] within 1 year.'  Regularly track your progress and adjust your plan as needed."

    Ensure the response is encouraging, actionable, and reflects a deep understanding of their unique profile. The response should be in plain text format. Do not use any special formatting.
    `
};

export { CLAUDE_API_CONFIG, CLAUDE_PROMPTS };
