// src/components/SkillLevelChart.jsx - UPDATED TO MATCH TECHNICAL SPECIFICATION v1.1
import React from 'react';
import SkillLearningResources from './SkillLearningResources';

const SkillLevelChart = ({ skill, userData, topRecommendation = null }) => {
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  
  // Enhanced skill gap analysis based on Technical Specification v1.1
  const analyzeSkillGapTechnicalSpec = (skill, userData, topRecommendation) => {
    const gapAreas = [];
    const algorithmInsights = [];
    
    // Analyze based on 4 Constant Variables from Technical Specification
    
    // 1. Years Experience Analysis
    if (userData.yearsExperience) {
      const expScore = getExperienceScore(userData.yearsExperience);
      if (expScore < 0.5 && skill.requiredLevel >= 4) {
        gapAreas.push('experience-gap');
        algorithmInsights.push('Limited experience for advanced skill level');
      }
    }
    
    // 2. Study Field Relevance Analysis
    if (userData.studyField) {
      const fieldRelevance = getStudyFieldRelevance(userData.studyField, skill.name);
      if (fieldRelevance < 0.6) {
        gapAreas.push('academic-foundation');
        algorithmInsights.push('Study field provides limited foundation for this skill');
      }
    }
    
    // 3. Interest Alignment Analysis
    if (userData.interests && Array.isArray(userData.interests)) {
      const interestAlignment = getInterestAlignment(userData.interests, skill.name);
      if (interestAlignment < 0.5) {
        gapAreas.push('interest-alignment');
        algorithmInsights.push('Skill may not align with stated interests');
      }
    }
    
    // 4. Transferable Skills Analysis
    if (userData.transferableSkills) {
      const transferableValue = getTransferableSkillValue(userData.transferableSkills, skill.name);
      if (transferableValue < 0.4) {
        gapAreas.push('transferable-skills');
        algorithmInsights.push('Limited transferable skills for this area');
      }
    }
    
    // Algorithm-Specific Analysis based on Technical Specification
    if (topRecommendation) {
      switch(topRecommendation.type) {
        case 'tech-interest-based':
          // Tech-Interest Based specific analysis
          if (userData.techInterests && !isSkillInTechInterests(skill.name, userData.techInterests)) {
            gapAreas.push('tech-interest-mismatch');
            algorithmInsights.push('Skill not aligned with stated tech interests');
          }
          
          if (userData.jobTechnologies && !isSkillInJobTechnologies(skill.name, userData.jobTechnologies)) {
            gapAreas.push('job-tech-gap');
            algorithmInsights.push('Skill not present in current job technologies');
          }
          
          if (userData.currentRole && !isSkillRelevantToRole(skill.name, userData.currentRole)) {
            gapAreas.push('role-transition');
            algorithmInsights.push('Skill important for role transition');
          }
          break;
          
        case 'research-development':
          // Research/Development Based specific analysis
          if (userData.publications && skill.name.toLowerCase().includes('research')) {
            const pubScore = getPublicationScore(userData.publications);
            if (pubScore < 0.5) {
              gapAreas.push('research-experience');
              algorithmInsights.push('Limited research publication experience');
            }
          }
          
          if (userData.toolsUsed && !isSkillInResearchTools(skill.name, userData.toolsUsed)) {
            gapAreas.push('research-tools');
            algorithmInsights.push('Skill requires research tool proficiency');
          }
          
          if (userData.timeCommitment !== 'full-time' && skill.requiredLevel >= 4) {
            gapAreas.push('time-commitment');
            algorithmInsights.push('Advanced skills may require full-time commitment');
          }
          break;
          
        case 'lifestyle-market':
          // Lifestyle/Market Based specific analysis
          if (userData.workPreference === 'remote' && isSkillCollaborationHeavy(skill.name)) {
            gapAreas.push('remote-challenges');
            algorithmInsights.push('Skill may be challenging in remote work settings');
          }
          
          if (userData.educationLevel && !isEducationSufficientForSkill(userData.educationLevel, skill.name)) {
            gapAreas.push('education-gap');
            algorithmInsights.push('Education level may need enhancement for this skill');
          }
          
          if (userData.targetSalary && !isSalaryRealisticForSkill(userData.targetSalary, skill.name)) {
            gapAreas.push('salary-expectations');
            algorithmInsights.push('Skill level impacts salary expectations');
          }
          break;
      }
    }
    
    // Technical Specification Gap Analysis
    if (skill.gap >= 2 && userData.experienceLevel === 'Complete beginner') {
      gapAreas.push('foundations');
      algorithmInsights.push('Need strong foundational learning approach');
    }
    
    // Check for practical experience gap
    if (skill.requiredLevel >= 4 && skill.currentLevel <= 2) {
      gapAreas.push('advanced-concepts');
      algorithmInsights.push('Significant skill level advancement needed');
    }
    
    // Project-based learning analysis
    if (userData.educationLevel && userData.educationLevel.includes('Degree') && !userData.jobProjects) {
      gapAreas.push('practical-application');
      algorithmInsights.push('Need hands-on project experience');
    }
    
    return { gapAreas, algorithmInsights };
  };

  // Technical Specification Scoring Functions
  const getExperienceScore = (experience) => {
    const expMap = {
      '0-2': 0.3, '3-5': 0.6, '6-10': 0.8, '10+': 0.9,
      '0': 0.2, '1': 0.3, '2': 0.4, '3': 0.5, '4': 0.6, '5': 0.7,
      'Complete beginner': 0.2, 'Some exposure': 0.4, 'Beginner': 0.5,
      'Intermediate': 0.7, 'Advanced': 0.9
    };
    return expMap[experience] || 0.5;
  };

  const getStudyFieldRelevance = (field, skillName) => {
    if (!field) return 0.3;
    const fieldLower = field.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    if (skillLower.includes('programming') || skillLower.includes('coding')) {
      if (fieldLower.includes('computer') || fieldLower.includes('software')) return 0.9;
      if (fieldLower.includes('engineering') || fieldLower.includes('math')) return 0.7;
      return 0.4;
    }
    
    if (skillLower.includes('data') || skillLower.includes('analytics')) {
      if (fieldLower.includes('data') || fieldLower.includes('statistics')) return 0.9;
      if (fieldLower.includes('math') || fieldLower.includes('science')) return 0.8;
      return 0.5;
    }
    
    if (skillLower.includes('research')) {
      if (fieldLower.includes('research') || fieldLower.includes('phd')) return 0.9;
      if (fieldLower.includes('master') || fieldLower.includes('science')) return 0.7;
      return 0.4;
    }
    
    return 0.6; // Default relevance
  };

  const getInterestAlignment = (interests, skillName) => {
    if (!interests || interests.length === 0) return 0.3;
    const skillLower = skillName.toLowerCase();
    
    const techKeywords = ['programming', 'coding', 'software', 'ai', 'data', 'web', 'mobile', 'technology'];
    const researchKeywords = ['research', 'analysis', 'study', 'investigation', 'academic'];
    const designKeywords = ['design', 'visual', 'ui', 'ux', 'creative'];
    
    let relevantKeywords = [];
    if (techKeywords.some(keyword => skillLower.includes(keyword))) {
      relevantKeywords = techKeywords;
    } else if (researchKeywords.some(keyword => skillLower.includes(keyword))) {
      relevantKeywords = researchKeywords;
    } else if (designKeywords.some(keyword => skillLower.includes(keyword))) {
      relevantKeywords = designKeywords;
    }
    
    const hasMatch = interests.some(interest => 
      relevantKeywords.some(keyword => interest.toLowerCase().includes(keyword))
    );
    
    return hasMatch ? 0.8 : 0.4;
  };

  const getTransferableSkillValue = (skills, skillName) => {
    if (!skills) return 0.3;
    const skillsLower = skills.toLowerCase();
    const skillNameLower = skillName.toLowerCase();
    
    const relevantSkills = {
      'programming': ['analytical', 'problem', 'logical', 'technical'],
      'communication': ['communication', 'writing', 'presentation', 'teamwork'],
      'leadership': ['leadership', 'management', 'coordination', 'planning'],
      'research': ['analytical', 'critical thinking', 'investigation', 'methodology']
    };
    
    let applicableSkills = [];
    Object.keys(relevantSkills).forEach(category => {
      if (skillNameLower.includes(category)) {
        applicableSkills = relevantSkills[category];
      }
    });
    
    const matches = applicableSkills.filter(skill => skillsLower.includes(skill)).length;
    return Math.min(0.4 + (matches * 0.15), 0.9);
  };

  // Algorithm-specific helper functions
  const isSkillInTechInterests = (skillName, techInterests) => {
    if (!techInterests) return false;
    const interestsLower = techInterests.toLowerCase();
    const skillLower = skillName.toLowerCase();
    return interestsLower.includes(skillLower) || 
           skillLower.split(' ').some(word => interestsLower.includes(word));
  };

  const isSkillInJobTechnologies = (skillName, jobTechnologies) => {
    if (!jobTechnologies) return false;
    const techLower = jobTechnologies.toLowerCase();
    const skillLower = skillName.toLowerCase();
    return techLower.includes(skillLower) || 
           skillLower.split(' ').some(word => techLower.includes(word));
  };

  const isSkillRelevantToRole = (skillName, currentRole) => {
    if (!currentRole) return false;
    const roleLower = currentRole.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    // Basic relevance mapping
    if (roleLower.includes('developer') && skillLower.includes('programming')) return true;
    if (roleLower.includes('analyst') && skillLower.includes('data')) return true;
    if (roleLower.includes('manager') && skillLower.includes('leadership')) return true;
    
    return false;
  };

  const isSkillInResearchTools = (skillName, toolsUsed) => {
    if (!toolsUsed || !Array.isArray(toolsUsed)) return false;
    const skillLower = skillName.toLowerCase();
    return toolsUsed.some(tool => 
      tool.toLowerCase().includes(skillLower) || 
      skillLower.includes(tool.toLowerCase())
    );
  };

  const getPublicationScore = (publications) => {
    if (!publications) return 0.2;
    const pubLower = publications.toLowerCase();
    if (pubLower.includes('none') || pubLower.includes('0')) return 0.2;
    if (pubLower.includes('1') || pubLower.includes('few')) return 0.6;
    return 0.8;
  };

  const isSkillCollaborationHeavy = (skillName) => {
    const collaborativeSkills = ['teamwork', 'communication', 'leadership', 'management', 'coordination'];
    return collaborativeSkills.some(collab => skillName.toLowerCase().includes(collab));
  };

  const isEducationSufficientForSkill = (educationLevel, skillName) => {
    const skillLower = skillName.toLowerCase();
    const eduLower = educationLevel.toLowerCase();
    
    if (skillLower.includes('advanced') || skillLower.includes('expert')) {
      return eduLower.includes('master') || eduLower.includes('phd');
    }
    
    if (skillLower.includes('research') || skillLower.includes('analysis')) {
      return eduLower.includes('bachelor') || eduLower.includes('master') || eduLower.includes('phd');
    }
    
    return true; // Most skills can be learned regardless of education level
  };

  const isSalaryRealisticForSkill = (targetSalary, skillName) => {
    if (!targetSalary) return true;
    const salaryNum = parseInt(targetSalary.replace(/[^\d]/g, ''));
    const skillLower = skillName.toLowerCase();
    
    // Advanced skills typically command higher salaries
    if (skillLower.includes('advanced') || skillLower.includes('expert')) {
      return salaryNum >= 80000; // Advanced skills typically $80k+
    }
    
    return true; // Default to realistic
  };

  // Get algorithm-specific skill category
  const getAlgorithmSpecificCategory = (skillName, topRecommendation) => {
    if (!topRecommendation) return 'General';
    
    const skillLower = skillName.toLowerCase();
    
    switch(topRecommendation.type) {
      case 'tech-interest-based':
        if (skillLower.includes('programming') || skillLower.includes('coding')) return 'Core Tech Skills';
        if (skillLower.includes('data') || skillLower.includes('ml')) return 'Data & AI Skills';
        if (skillLower.includes('web') || skillLower.includes('mobile')) return 'Platform Skills';
        return 'Tech Skills';
        
      case 'research-development':
        if (skillLower.includes('research') || skillLower.includes('methodology')) return 'Research Skills';
        if (skillLower.includes('analysis') || skillLower.includes('statistics')) return 'Analytical Skills';
        if (skillLower.includes('writing') || skillLower.includes('publication')) return 'Academic Skills';
        return 'Research Skills';
        
      case 'lifestyle-market':
        if (skillLower.includes('leadership') || skillLower.includes('management')) return 'Leadership Skills';
        if (skillLower.includes('communication') || skillLower.includes('presentation')) return 'Soft Skills';
        if (skillLower.includes('business') || skillLower.includes('strategy')) return 'Business Skills';
        return 'Professional Skills';
        
      default:
        return 'General Skills';
    }
  };

  // Enhance the skill details with Technical Specification analysis
  const gapAnalysis = analyzeSkillGapTechnicalSpec(skill, userData, topRecommendation);
  const enhancedSkillDetails = {
    ...skill,
    gapAreas: gapAnalysis.gapAreas,
    algorithmInsights: gapAnalysis.algorithmInsights,
    algorithmCategory: getAlgorithmSpecificCategory(skill.name, topRecommendation),
    technicalSpecVersion: '1.1'
  };
  
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{skill.name}</h4>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-sm text-gray-500">{enhancedSkillDetails.algorithmCategory}</span>
            
            {/* Technical Specification Badge */}
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Tech Spec v1.1
            </span>
            
            {/* Algorithm Type Badge */}
            {topRecommendation && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                topRecommendation.type === 'tech-interest-based' ? 'bg-purple-100 text-purple-700' :
                topRecommendation.type === 'research-development' ? 'bg-green-100 text-green-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {topRecommendation.type === 'tech-interest-based' ? '🎯 Tech-Interest' :
                 topRecommendation.type === 'research-development' ? '📚 Research/Dev' :
                 '⚖️ Lifestyle/Market'} Optimized
              </span>
            )}
          </div>
        </div>
        
        {skill.gap > 0 && (
          <div className="flex flex-col items-end gap-1">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              skill.gap > 2 ? 'bg-red-100 text-red-700' : 
              skill.gap === 2 ? 'bg-yellow-100 text-yellow-700' : 
              'bg-green-100 text-green-700'
            }`}>
              Gap: {skill.gap} {skill.gap === 1 ? 'level' : 'levels'}
            </span>
            
            {/* Priority Badge based on Technical Specification */}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              skill.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {skill.priority?.toUpperCase() || 'MEDIUM'} Priority
            </span>
          </div>
        )}
      </div>
      
      {/* Enhanced Skill Level Visualization */}
      <div className="grid grid-cols-5 gap-1 mb-3">
        {levels.map((level, index) => (
          <div key={index} className="relative">
            <div className={`h-8 rounded transition-all duration-300 ${
              index < skill.currentLevel ? levelColors[index] : 'bg-gray-300'
            } ${index < skill.requiredLevel ? 'opacity-100' : 'opacity-30'}`}>
              {index < skill.requiredLevel && index >= skill.currentLevel && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Need</span>
                </div>
              )}
              {index === skill.currentLevel - 1 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <p className="text-xs text-center mt-1">{level}</p>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm mb-3">
        <span className="text-gray-600">Current: {levels[Math.max(0, skill.currentLevel - 1)]}</span>
        <span className="text-blue-600 font-medium">Target: {levels[Math.max(0, skill.requiredLevel - 1)]}</span>
      </div>
      
      {/* Technical Specification Analysis Results */}
      {topRecommendation && topRecommendation.metadata && (
        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="text-sm font-medium text-blue-800 mb-2">
            Technical Specification Analysis:
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="font-medium text-blue-700">Algorithm:</span>
              <div className="text-blue-600">{topRecommendation.type}</div>
            </div>
            <div>
              <span className="font-medium text-blue-700">Confidence:</span>
              <div className="text-blue-600">{topRecommendation.confidenceScore}%</div>
            </div>
            <div>
              <span className="font-medium text-blue-700">Criteria Used:</span>
              <div className="text-blue-600">{topRecommendation.metadata.criteriaUsed?.length || 0}</div>
            </div>
            <div>
              <span className="font-medium text-blue-700">Fallback:</span>
              <div className="text-blue-600">{topRecommendation.metadata.fallbackApplied ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      )}
      
      {skill.description && (
        <p className="text-sm text-gray-700 mb-3">{skill.description}</p>
      )}
      
      {/* Algorithm Insights from Technical Specification */}
      {enhancedSkillDetails.algorithmInsights && enhancedSkillDetails.algorithmInsights.length > 0 && (
        <div className="mb-3 p-3 bg-gray-100 rounded-lg">
          <h5 className="text-sm font-medium text-gray-800 mb-2">
            🔬 Algorithm Insights:
          </h5>
          <ul className="text-xs text-gray-700 space-y-1">
            {enhancedSkillDetails.algorithmInsights.slice(0, 3).map((insight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Enhanced Gap Areas with Technical Specification context */}
      {enhancedSkillDetails.gapAreas && enhancedSkillDetails.gapAreas.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {enhancedSkillDetails.gapAreas.map((area, idx) => (
            <span key={idx} className={`inline-block px-2 py-0.5 text-xs rounded ${
              area.includes('gap') || area.includes('mismatch') ? 'bg-red-100 text-red-800' :
              area.includes('foundation') || area.includes('experience') ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {area === 'experience-gap' ? 'Experience Gap' :
               area === 'academic-foundation' ? 'Academic Foundation' :
               area === 'interest-alignment' ? 'Interest Alignment' :
               area === 'transferable-skills' ? 'Transferable Skills' :
               area === 'tech-interest-mismatch' ? 'Tech Interest Mismatch' :
               area === 'job-tech-gap' ? 'Job Technology Gap' :
               area === 'role-transition' ? 'Role Transition Skill' :
               area === 'research-experience' ? 'Research Experience' :
               area === 'research-tools' ? 'Research Tools' :
               area === 'time-commitment' ? 'Time Commitment' :
               area === 'remote-challenges' ? 'Remote Work Challenges' :
               area === 'education-gap' ? 'Education Gap' :
               area === 'salary-expectations' ? 'Salary Impact' :
               area === 'foundations' ? 'Need Fundamentals' :
               area === 'advanced-concepts' ? 'Advanced Concepts Needed' :
               area === 'practical-application' ? 'Practical Application' :
               area}
            </span>
          ))}
        </div>
      )}
      
      {/* Learning Path Recommendation based on Technical Specification */}
      {skill.learningPath && (
        <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <h5 className="text-sm font-medium text-green-800 mb-1">
            💡 Learning Path (Tech Spec v1.1):
          </h5>
          <p className="text-sm text-green-700">{skill.learningPath}</p>
        </div>
      )}
      
      {/* Use enhanced skill details and pass technical specification data */}
      <SkillLearningResources 
        skillName={skill.name} 
        userData={userData} 
        skillDetails={enhancedSkillDetails}
        topRecommendation={topRecommendation}
      />
    </div>
  );
};

export default SkillLevelChart;
