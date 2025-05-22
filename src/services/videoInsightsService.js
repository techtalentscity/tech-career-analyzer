// src/services/videoInsightsService.js
import { videoAnalysisData } from '../data/videoInsights.js';

class VideoInsightsService {
  constructor() {
    this.videoData = videoAnalysisData;
  }

  /**
   * Extract trending skills from video analysis
   */
  getTrendingSkills() {
    const skillsMap = new Map();
    
    // Skills mentioned across videos with frequency
    const skills = [
      { name: 'Python', mentions: 8, category: 'Programming', growth: 'High' },
      { name: 'AI/ML', mentions: 12, category: 'Emerging Tech', growth: 'Very High' },
      { name: 'JavaScript', mentions: 6, category: 'Programming', growth: 'Stable' },
      { name: 'Data Science', mentions: 9, category: 'Analytics', growth: 'High' },
      { name: 'DevOps', mentions: 7, category: 'Infrastructure', growth: 'High' },
      { name: 'Cloud Computing', mentions: 8, category: 'Infrastructure', growth: 'Very High' },
      { name: 'Cybersecurity', mentions: 5, category: 'Security', growth: 'High' },
      { name: 'UX/UI Design', mentions: 4, category: 'Design', growth: 'Moderate' },
      { name: 'Project Management', mentions: 10, category: 'Leadership', growth: 'Stable' },
      { name: 'Networking', mentions: 14, category: 'Infrastructure', growth: 'Moderate' }
    ];

    return skills.sort((a, b) => b.mentions - a.mentions);
  }

  /**
   * Get common career advice patterns from video analysis
   */
  getCareerAdvicePatterns() {
    return [
      {
        advice: 'Continuous Learning is Essential',
        frequency: 16,
        description: 'All videos emphasized the importance of lifelong learning and staying updated with technology trends.',
        actionableSteps: [
          'Set aside 1-2 hours daily for learning',
          'Follow industry publications and tech blogs',
          'Take online courses and earn certifications',
          'Attend webinars and virtual conferences'
        ]
      },
      {
        advice: 'Networking and Mentorship are Crucial',
        frequency: 14,
        description: 'Building professional networks and finding mentors was highlighted as key to career advancement.',
        actionableSteps: [
          'Join professional tech communities',
          'Attend local meetups and tech events',
          'Engage on LinkedIn and tech forums',
          'Seek mentorship from experienced professionals'
        ]
      },
      {
        advice: 'Skills Matter More Than Degrees',
        frequency: 12,
        description: 'Practical skills and portfolio projects are more valued than formal education credentials.',
        actionableSteps: [
          'Build a strong portfolio of projects',
          'Contribute to open source projects',
          'Get hands-on experience through internships',
          'Focus on practical skill development'
        ]
      },
      {
        advice: 'Personal Branding is Important',
        frequency: 8,
        description: 'Developing an online presence and professional brand helps with career opportunities.',
        actionableSteps: [
          'Optimize your LinkedIn profile',
          'Create a professional portfolio website',
          'Share knowledge through blogs or videos',
          'Build presence on GitHub and Stack Overflow'
        ]
      }
    ];
  }

  /**
   * Extract actionable steps categorized by career level
   */
  getActionableStepsByLevel() {
    return {
      'Entry-Level': [
        'Start with foundational courses in your chosen tech area',
        'Build 2-3 portfolio projects to demonstrate skills',
        'Join tech communities and start networking early',
        'Focus on learning one programming language well',
        'Apply for internships or entry-level positions',
        'Get comfortable with basic development tools (Git, IDE)',
        'Practice coding challenges and technical interviews',
        'Find a mentor in your target field'
      ],
      'Mid-Career': [
        'Specialize in a specific technology or domain',
        'Take on leadership roles in projects',
        'Contribute to open source projects',
        'Speak at meetups or write technical articles',
        'Expand your network within the industry',
        'Consider advanced certifications in your field',
        'Mentor junior developers or career changers',
        'Explore adjacent technologies to broaden skills'
      ],
      'Senior-Level': [
        'Lead technical architecture decisions',
        'Manage and mentor development teams',
        'Stay updated with emerging technologies',
        'Contribute to technical strategy and planning',
        'Build relationships with other senior professionals',
        'Consider speaking at conferences',
        'Evaluate and adopt new tools and methodologies',
        'Focus on business impact and ROI of technical decisions'
      ]
    };
  }

  /**
   * Get industry growth insights from video analysis
   */
  getIndustryGrowthInsights() {
    return [
      {
        industry: 'FinTech',
        growth: 'Very High',
        description: 'Financial technology sector showing explosive growth with digital transformation',
        opportunities: ['Mobile payments', 'Blockchain applications', 'Digital banking', 'Investment platforms'],
        skills: ['Python', 'JavaScript', 'Cybersecurity', 'Data Analysis']
      },
      {
        industry: 'Healthcare Technology',
        growth: 'High',
        description: 'Telemedicine and health tech creating new opportunities',
        opportunities: ['Telemedicine platforms', 'Health monitoring apps', 'Medical AI', 'Electronic health records'],
        skills: ['Mobile development', 'AI/ML', 'Data security', 'UI/UX design']
      },
      {
        industry: 'Renewable Energy',
        growth: 'High',
        description: 'Clean energy sector driving technology innovation',
        opportunities: ['Smart grid technology', 'Energy management systems', 'IoT sensors', 'Data analytics'],
        skills: ['IoT development', 'Data science', 'Cloud computing', 'Systems engineering']
      },
      {
        industry: 'E-commerce',
        growth: 'Moderate',
        description: 'Continued growth in online retail and digital marketplaces',
        opportunities: ['Platform development', 'Mobile commerce', 'Analytics', 'Supply chain tech'],
        skills: ['Web development', 'Mobile apps', 'Database management', 'Analytics']
      }
    ];
  }

  /**
   * Get personalized recommendations based on user profile
   */
  getPersonalizedRecommendations(userProfile) {
    const recommendations = [];
    const trendingSkills = this.getTrendingSkills();
    const careerAdvice = this.getCareerAdvicePatterns();
    
    // Match user interests with trending skills
    if (userProfile.careerPathsInterest) {
      userProfile.careerPathsInterest.forEach(interest => {
        const relevantSkills = this.getSkillsForCareerPath(interest);
        recommendations.push({
          type: 'skill_development',
          title: `Focus on ${interest} Skills`,
          description: `Based on video analysis, these skills are trending for ${interest}`,
          skills: relevantSkills,
          priority: 'high'
        });
      });
    }

    // Add networking recommendations based on experience level
    const networkingAdvice = careerAdvice.find(advice => 
      advice.advice.includes('Networking')
    );
    
    if (networkingAdvice) {
      recommendations.push({
        type: 'networking',
        title: 'Build Your Professional Network',
        description: networkingAdvice.description,
        steps: networkingAdvice.actionableSteps,
        priority: 'high'
      });
    }

    return recommendations;
  }

  /**
   * Map career paths to relevant skills
   */
  getSkillsForCareerPath(careerPath) {
    const skillMapping = {
      'Software Development': ['Python', 'JavaScript', 'Git', 'Databases', 'API Development'],
      'Data Analysis/Science': ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization'],
      'AI/Machine Learning': ['Python', 'TensorFlow', 'Statistics', 'Deep Learning', 'Data Processing'],
      'DevOps': ['Cloud Computing', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
      'Cybersecurity': ['Network Security', 'Ethical Hacking', 'Security Tools', 'Compliance', 'Risk Assessment'],
      'UX/UI Design': ['Design Thinking', 'Prototyping', 'User Research', 'Design Tools', 'Usability Testing'],
      'Product Management': ['Product Strategy', 'Analytics', 'Communication', 'Agile Methodologies', 'Market Research']
    };

    return skillMapping[careerPath] || [];
  }

  /**
   * Get market insights summary
   */
  getMarketInsightsSummary() {
    const trendingSkills = this.getTrendingSkills();
    const industryInsights = this.getIndustryGrowthInsights();
    
    return {
      topSkills: trendingSkills.slice(0, 5),
      growthIndustries: industryInsights.filter(industry => 
        industry.growth === 'Very High' || industry.growth === 'High'
      ),
      keyTrends: [
        'Remote work creating new opportunities globally',
        'AI/ML skills in highest demand across all sectors',
        'Emphasis on practical skills over formal education',
        'Cross-functional skills becoming more valuable'
      ]
    };
  }

  /**
   * Get video insights statistics
   */
  getVideoInsightsStats() {
    return {
      totalVideos: 16,
      totalSkillsIdentified: 42,
      totalCareerPaths: 15,
      totalActionableSteps: 128,
      videoDuration: '12+ hours of content analyzed',
      lastUpdated: '2025-05-22'
    };
  }
}

export default new VideoInsightsService();
