// src/data/videoInsights.js
// Processed insights from 16 tech career guidance videos

export const videoAnalysisData = {
  project_info: {
    title: "Comprehensive Tech Career Video Analysis",
    description: "Complete analysis of 16 tech career guidance YouTube videos",
    total_videos_analyzed: 16,
    processing_date: "2025-05-22",
    total_actionable_steps: 128
  },

  // Key skills mentioned across all videos with frequency
  trending_skills: [
    { name: 'AI/ML', frequency: 12, growth_trend: 'Very High', category: 'Emerging Tech' },
    { name: 'Python', frequency: 8, growth_trend: 'High', category: 'Programming' },
    { name: 'Data Science', frequency: 9, growth_trend: 'High', category: 'Analytics' },
    { name: 'Cloud Computing', frequency: 8, growth_trend: 'Very High', category: 'Infrastructure' },
    { name: 'DevOps', frequency: 7, growth_trend: 'High', category: 'Infrastructure' },
    { name: 'JavaScript', frequency: 6, growth_trend: 'Stable', category: 'Programming' },
    { name: 'Cybersecurity', frequency: 5, growth_trend: 'High', category: 'Security' },
    { name: 'Java', frequency: 6, growth_trend: 'Stable', category: 'Programming' },
    { name: 'UX/UI Design', frequency: 4, growth_trend: 'Moderate', category: 'Design' },
    { name: 'Project Management', frequency: 10, growth_trend: 'Stable', category: 'Leadership' }
  ],

  // Common themes across all videos
  career_advice_patterns: [
    {
      theme: 'Continuous Learning',
      frequency: 16,
      description: 'Lifelong learning and staying updated with technology trends',
      key_points: [
        'Technology evolves rapidly, requiring constant skill updates',
        'Online courses and certifications are essential',
        'Daily learning habits lead to career success',
        'Industry publications and blogs are valuable resources'
      ]
    },
    {
      theme: 'Networking and Mentorship',
      frequency: 14,
      description: 'Building professional networks and finding mentors',
      key_points: [
        'Professional networks are crucial for career opportunities',
        'Mentorship accelerates career growth',
        'Tech communities provide valuable support',
        'Online platforms like LinkedIn are essential'
      ]
    },
    {
      theme: 'Skills Over Education',
      frequency: 12,
      description: 'Practical skills matter more than formal education',
      key_points: [
        'Portfolio projects demonstrate real capabilities',
        'Hands-on experience is highly valued',
        'Self-taught skills are respected in tech',
        'Bootcamps can be as valuable as degrees'
      ]
    },
    {
      theme: 'Personal Branding',
      frequency: 8,
      description: 'Building online presence and professional brand',
      key_points: [
        'GitHub profiles showcase technical skills',
        'LinkedIn optimization increases visibility',
        'Content creation establishes expertise',
        'Online portfolios are essential for job hunting'
      ]
    }
  ],

  // Industry insights from video analysis
  industry_opportunities: [
    {
      sector: 'FinTech',
      growth_rating: 'Very High',
      mentions: 6,
      key_technologies: ['Blockchain', 'Mobile Development', 'Security', 'APIs'],
      opportunities: ['Digital payments', 'Cryptocurrency', 'Financial apps', 'Regulatory tech']
    },
    {
      sector: 'Healthcare Technology',
      growth_rating: 'High',
      mentions: 4,
      key_technologies: ['Telemedicine', 'IoT', 'AI/ML', 'Mobile Health'],
      opportunities: ['Remote monitoring', 'AI diagnostics', 'Health apps', 'Medical devices']
    },
    {
      sector: 'Renewable Energy',
      growth_rating: 'High',
      mentions: 3,
      key_technologies: ['IoT', 'Data Analytics', 'Smart Grids', 'Mobile Apps'],
      opportunities: ['Energy management', 'Smart home tech', 'Grid optimization', 'Sustainability tracking']
    },
    {
      sector: 'E-commerce',
      growth_rating: 'Moderate',
      mentions: 5,
      key_technologies: ['Web Development', 'Mobile Apps', 'Analytics', 'Cloud Computing'],
      opportunities: ['Platform development', 'Mobile commerce', 'Supply chain tech', 'Customer analytics']
    }
  ],

  // Actionable steps extracted from videos, categorized by career stage
  actionable_steps_by_level: {
    'Entry-Level': [
      'Start with foundational courses in chosen tech area',
      'Build 2-3 portfolio projects to demonstrate skills',
      'Join tech communities like DSN, I4G, and Omdena',
      'Focus on learning one programming language thoroughly',
      'Apply for internships to gain practical experience',
      'Get comfortable with version control (Git/GitHub)',
      'Practice coding challenges and algorithm problems',
      'Find a mentor in your target field',
      'Create a professional LinkedIn profile',
      'Attend virtual meetups and tech events',
      'Start with free online courses and tutorials',
      'Build a simple personal website or portfolio',
      'Learn basic command line and development tools',
      'Join online coding communities and forums',
      'Practice explaining technical concepts clearly'
    ],
    'Mid-Career': [
      'Specialize in a specific technology or domain',
      'Take on leadership roles in technical projects',
      'Contribute to open source projects regularly',
      'Write technical articles or blog posts',
      'Speak at local meetups or virtual events',
      'Pursue advanced certifications in your field',
      'Mentor junior developers or career changers',
      'Build expertise in adjacent technologies',
      'Develop project management skills',
      'Create comprehensive portfolio showcasing growth',
      'Network with other mid-level professionals',
      'Stay updated with industry trends and tools',
      'Participate in hackathons and coding competitions',
      'Consider freelance or consulting opportunities',
      'Build relationships with recruiters and hiring managers'
    ],
    'Senior-Level': [
      'Lead technical architecture and design decisions',
      'Manage and grow development teams',
      'Drive adoption of new technologies and methodologies',
      'Contribute to technical strategy and planning',
      'Build relationships with C-level executives',
      'Speak at major conferences and industry events',
      'Author technical papers or industry reports',
      'Mentor other senior professionals',
      'Evaluate business impact of technical decisions',
      'Stay ahead of emerging technology trends',
      'Build strategic partnerships with other companies',
      'Contribute to industry standards and best practices',
      'Lead digital transformation initiatives',
      'Develop and execute long-term technical vision',
      'Foster innovation culture within organizations'
    ]
  },

  // Common career paths and their requirements
  career_path_insights: [
    {
      path: 'Software Development',
      demand: 'Very High',
      skills: ['Programming', 'Problem Solving', 'System Design', 'Testing'],
      timeline: '6-12 months for entry level',
      salary_range: '$60k-$150k+',
      growth_potential: 'Excellent'
    },
    {
      path: 'Data Science',
      demand: 'High',
      skills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization'],
      timeline: '8-18 months for entry level',
      salary_range: '$70k-$180k+',
      growth_potential: 'Very High'
    },
    {
      path: 'DevOps Engineering',
      demand: 'Very High',
      skills: ['Cloud Platforms', 'Automation', 'Infrastructure', 'CI/CD'],
      timeline: '6-15 months for entry level',
      salary_range: '$75k-$170k+',
      growth_potential: 'Excellent'
    },
    {
      path: 'Cybersecurity',
      demand: 'High',
      skills: ['Network Security', 'Risk Assessment', 'Compliance', 'Incident Response'],
      timeline: '8-18 months for entry level',
      salary_range: '$65k-$160k+',
      growth_potential: 'Very High'
    },
    {
      path: 'UX/UI Design',
      demand: 'Moderate',
      skills: ['Design Thinking', 'Prototyping', 'User Research', 'Design Tools'],
      timeline: '4-12 months for entry level',
      salary_range: '$55k-$130k+',
      growth_potential: 'Good'
    }
  ],

  // Key insights for career changers
  transition_insights: [
    {
      category: 'Timeline Expectations',
      insight: 'Most successful transitions take 6-18 months with consistent effort',
      supporting_evidence: 'Mentioned in 12 of 16 videos'
    },
    {
      category: 'Learning Approach',
      insight: 'Project-based learning is more effective than theory-only study',
      supporting_evidence: 'Emphasized in 14 of 16 videos'
    },
    {
      category: 'Job Search Strategy',
      insight: 'Networking and referrals are more important than cold applications',
      supporting_evidence: 'Highlighted in 13 of 16 videos'
    },
    {
      category: 'Skill Prioritization',
      insight: 'Focus on depth in one area before breadth across many technologies',
      supporting_evidence: 'Recommended in 11 of 16 videos'
    }
  ],

  // Market trends identified from video analysis
  market_trends: [
    'Remote work creating global opportunities',
    'AI/ML integration across all industries',
    'Cloud-first architecture becoming standard',
    'Emphasis on full-stack capabilities',
    'Growing importance of soft skills',
    'Shift towards agile and DevOps practices',
    'Increased focus on cybersecurity',
    'Rise of low-code/no-code platforms',
    'Growing demand for data literacy',
    'Importance of continuous learning culture'
  ]
};
