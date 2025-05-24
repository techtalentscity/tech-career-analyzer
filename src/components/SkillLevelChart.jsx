// src/components/SkillLevelChart.jsx - UPDATED TO MATCH TECHNICAL SPECIFICATION v2.0
import React from 'react';
import SkillLearningResources from './SkillLearningResources';

const SkillLevelChart = ({ 
  skill, 
  userData, 
  careerPathRecommendation = null,
  skillGapAnalysis = null,
  learningRoadmap = null,
  systemResponse = null 
}) => {
  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  
  // Enhanced skill gap analysis based on Technical Specification v2.0
  const analyzeSkillGapSequentialSystem = (skill, userData, careerPathRec, skillGapAnalysis, learningRoadmap) => {
    const gapAreas = [];
    const sequentialInsights = [];
    
    // Analyze based on 16-Criteria System with 4-Tier Weighting from Technical Specification v2.0
    
    // Tier 1: Core Drivers (45%) Analysis
    if (userData.futureGoal) {
      const goalAlignment = getFutureGoalSkillAlignment(userData.futureGoal, skill.name);
      if (goalAlignment < 0.6 && skill.requiredLevel >= 4) {
        gapAreas.push('future-goal-alignment');
        sequentialInsights.push('Skill critical for achieving stated future goals');
      }
    }
    
    if (userData.techInterests) {
      const techAlignment = getTechInterestSkillAlignment(userData.techInterests, skill.name);
      if (techAlignment < 0.5) {
        gapAreas.push('tech-interest-gap');
        sequentialInsights.push('Skill not strongly aligned with tech interests');
      }
    }
    
    if (userData.leverageDomainExpertise) {
      const domainLeverage = getDomainExpertiseSkillRelevance(userData.leverageDomainExpertise, skill.name, userData.currentRole);
      if (domainLeverage < 0.4) {
        gapAreas.push('domain-leverage');
        sequentialInsights.push('Skill important for leveraging domain expertise');
      }
    }
    
    if (userData.careerPathsInterest && Array.isArray(userData.careerPathsInterest)) {
      const pathAlignment = getCareerPathSkillRelevance(userData.careerPathsInterest, skill.name);
      if (pathAlignment < 0.5) {
        gapAreas.push('career-path-alignment');
        sequentialInsights.push('Skill essential for target career paths');
      }
    }
    
    // Tier 2: Strong Motivators (25%) Analysis
    if (userData.industryPreference && Array.isArray(userData.industryPreference)) {
      const industryRelevance = getIndustrySkillDemand(userData.industryPreference, skill.name);
      if (industryRelevance > 0.7) {
        gapAreas.push('industry-demand');
        sequentialInsights.push('High demand skill in target industries');
      }
    }
    
    if (userData.techMotivation) {
      const motivationAlignment = getTechMotivationSkillAlignment(userData.techMotivation, skill.name);
      if (motivationAlignment > 0.6 && skill.gap >= 2) {
        gapAreas.push('motivation-skill-gap');
        sequentialInsights.push('Skill aligns with tech motivation but needs development');
      }
    }
    
    // Tier 3: Supporting Evidence (20%) Analysis
    if (userData.transferableSkills) {
      const transferableValue = getTransferableSkillValue(userData.transferableSkills, skill.name);
      if (transferableValue < 0.4) {
        gapAreas.push('transferable-skills');
        sequentialInsights.push('Limited transferable skills for this area');
      }
    }
    
    if (userData.jobTechnologies) {
      const techFoundation = getTechnologyFoundationForSkill(userData.jobTechnologies, skill.name);
      if (techFoundation < 0.5 && skill.requiredLevel >= 3) {
        gapAreas.push('technology-foundation');
        sequentialInsights.push('Current job technologies provide limited foundation');
      }
    }
    
    // Tier 4: Background Context (10%) Analysis
    if (userData.studyField) {
      const fieldRelevance = getStudyFieldRelevance(userData.studyField, skill.name);
      if (fieldRelevance < 0.6) {
        gapAreas.push('academic-foundation');
        sequentialInsights.push('Study field provides limited foundation for this skill');
      }
    }
    
    if (userData.certifications && userData.certificationsDetail) {
      const certRelevance = getCertificationSkillRelevance(userData.certificationsDetail, skill.name);
      if (certRelevance < 0.3 && skill.requiredLevel >= 4) {
        gapAreas.push('certification-gap');
        sequentialInsights.push('Advanced certifications may be needed for this skill level');
      }
    }
    
    // Sequential System Specific Analysis - Technical Specification v2.0
    
    // Career Path Foundation Analysis
    if (careerPathRec) {
      if (careerPathRec.requiredSkills && !careerPathRec.requiredSkills.includes(skill.name)) {
        gapAreas.push('career-path-optional');
        sequentialInsights.push('Skill is supplementary to core career path requirements');
      }
      
      if (careerPathRec.confidenceScore < 70 && skill.priority === 'high') {
        gapAreas.push('path-confidence-skill');
        sequentialInsights.push('High-priority skill despite moderate career path confidence');
      }
      
      // Industry Focus Analysis
      if (careerPathRec.industryFocus && careerPathRec.industryFocus.length > 0) {
        const industrySkillDemand = getIndustrySkillDemand(careerPathRec.industryFocus, skill.name);
        if (industrySkillDemand > 0.8) {
          gapAreas.push('industry-critical');
          sequentialInsights.push('Critical skill for target industry focus');
        }
      }
    }
    
    // Skill Gap Analysis Context
    if (skillGapAnalysis) {
      if (skillGapAnalysis.currentSkillLevel === 'entry-level-beginner' && skill.requiredLevel >= 4) {
        gapAreas.push('significant-advancement');
        sequentialInsights.push('Requires substantial skill level advancement');
      }
      
      if (skillGapAnalysis.strengthsToLeverage && 
          skillGapAnalysis.strengthsToLeverage.some(strength => 
            strength.toLowerCase().includes(skill.name.toLowerCase().split(' ')[0])
          )) {
        gapAreas.push('leverage-strength');
        sequentialInsights.push('Can leverage existing strengths for this skill');
      }
      
      if (skillGapAnalysis.recommendedCertifications && 
          skillGapAnalysis.recommendedCertifications.some(cert => 
            cert.toLowerCase().includes(skill.name.toLowerCase().split(' ')[0])
          )) {
        gapAreas.push('certification-pathway');
        sequentialInsights.push('Certification pathway available for this skill');
      }
    }
    
    // Learning Roadmap Context Analysis
    if (learningRoadmap) {
      const skillInRoadmap = learningRoadmap.phases && learningRoadmap.phases.some(phase => 
        phase.skills && phase.skills.some(s => s.toLowerCase().includes(skill.name.toLowerCase().split(' ')[0]))
      );
      
      if (!skillInRoadmap && skill.priority === 'high') {
        gapAreas.push('roadmap-missing');
        sequentialInsights.push('High-priority skill not explicitly in learning roadmap');
      }
      
      if (learningRoadmap.totalTimelineEstimate && skill.estimatedLearningTime) {
        const roadmapMonths = parseInt(learningRoadmap.totalTimelineEstimate.split('-')[0]) || 12;
        const skillWeeks = parseInt(skill.estimatedLearningTime.split('-')[0]) || 4;
        const skillMonths = Math.ceil(skillWeeks / 4);
        
        if (skillMonths > roadmapMonths * 0.3) {
          gapAreas.push('time-intensive');
          sequentialInsights.push('Time-intensive skill relative to overall roadmap');
        }
      }
      
      if (learningRoadmap.budgetEstimate && skill.priority === 'high') {
        gapAreas.push('budget-consideration');
        sequentialInsights.push('Consider budget allocation for high-priority skill development');
      }
    }
    
    // System-Level Analysis
    if (systemResponse) {
      if (systemResponse.overallConfidence < 70 && skill.gap >= 2) {
        gapAreas.push('system-confidence');
        sequentialInsights.push('Significant skill gap with moderate system confidence');
      }
      
      if (systemResponse.dataCompleteness < 80) {
        gapAreas.push('data-completeness');
        sequentialInsights.push('Skill analysis based on incomplete profile data');
      }
      
      if (systemResponse.careerPathCriteriaComplete < 12) {
        gapAreas.push('criteria-incomplete');
        sequentialInsights.push('Skill recommendations based on limited criteria');
      }
    }
    
    // Advanced Learning Context Analysis
    if (skill.gap >= 2 && userData.learningComfort === 'Not very comfortable') {
      gapAreas.push('learning-comfort');
      sequentialInsights.push('Consider additional support given learning comfort level');
    }
    
    if (userData.timeCommitment && skill.estimatedLearningTime) {
      const timeAvailable = getTimeCommitmentHours(userData.timeCommitment);
      const skillIntensity = getSkillLearningIntensity(skill.estimatedLearningTime);
      
      if (skillIntensity > timeAvailable * 0.5) {
        gapAreas.push('time-commitment-gap');
        sequentialInsights.push('Skill learning time may exceed available commitment');
      }
    }
    
    return { gapAreas, sequentialInsights };
  };

  // Technical Specification v2.0 Scoring Functions
  
  // Tier 1: Core Drivers Scoring
  const getFutureGoalSkillAlignment = (futureGoal, skillName) => {
    if (!futureGoal) return 0.3;
    const goalLower = futureGoal.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    // Extract key terms from future goal
    const goalTerms = goalLower.split(' ');
    const skillTerms = skillLower.split(' ');
    
    // Check for direct alignment
    const directMatch = goalTerms.some(term => skillTerms.includes(term));
    if (directMatch) return 0.9;
    
    // Check for conceptual alignment
    if (goalLower.includes('senior') && skillLower.includes('advanced')) return 0.8;
    if (goalLower.includes('engineer') && skillLower.includes('programming')) return 0.8;
    if (goalLower.includes('data') && skillLower.includes('analysis')) return 0.8;
    if (goalLower.includes('ai') && skillLower.includes('machine learning')) return 0.9;
    
    return 0.5;
  };

  const getTechInterestSkillAlignment = (techInterests, skillName) => {
    if (!techInterests) return 0.3;
    const interestsLower = techInterests.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    // Direct keyword matching
    if (interestsLower.includes(skillLower) || skillLower.includes(interestsLower.split(',')[0])) {
      return 0.9;
    }
    
    // Conceptual matching
    const interestKeywords = interestsLower.split(',').map(i => i.trim());
    for (const interest of interestKeywords) {
      if (skillLower.includes(interest) || interest.includes(skillLower.split(' ')[0])) {
        return 0.8;
      }
    }
    
    return 0.4;
  };

  const getDomainExpertiseSkillRelevance = (leverageDomainExpertise, skillName, currentRole) => {
    if (!leverageDomainExpertise) return 0.5;
    
    const leverage = leverageDomainExpertise.toLowerCase();
    const skillLower = skillName.toLowerCase();
    const roleLower = (currentRole || '').toLowerCase();
    
    if (leverage.includes('yes')) {
      // If user wants to leverage domain expertise, check if skill helps bridge domains
      if (skillLower.includes('communication') || skillLower.includes('management')) return 0.8;
      if (roleLower.includes('analyst') && skillLower.includes('data')) return 0.9;
      if (roleLower.includes('manager') && skillLower.includes('leadership')) return 0.9;
      return 0.6;
    }
    
    if (leverage.includes('no')) {
      // If user wants complete change, all new skills are relevant
      return 0.7;
    }
    
    return 0.5;
  };

  const getCareerPathSkillRelevance = (careerPathsInterest, skillName) => {
    if (!careerPathsInterest || careerPathsInterest.length === 0) return 0.3;
    
    const skillLower = skillName.toLowerCase();
    
    for (const path of careerPathsInterest) {
      const pathLower = path.toLowerCase();
      
      if (pathLower.includes('software') && skillLower.includes('programming')) return 0.9;
      if (pathLower.includes('data') && skillLower.includes('analysis')) return 0.9;
      if (pathLower.includes('ai') && skillLower.includes('machine learning')) return 0.9;
      if (pathLower.includes('ux') && skillLower.includes('design')) return 0.9;
      if (pathLower.includes('product') && skillLower.includes('management')) return 0.8;
      if (pathLower.includes('cyber') && skillLower.includes('security')) return 0.9;
    }
    
    return 0.4;
  };

  // Tier 2: Strong Motivators Scoring
  const getIndustrySkillDemand = (industryPreference, skillName) => {
    if (!industryPreference || industryPreference.length === 0) return 0.5;
    
    const skillLower = skillName.toLowerCase();
    
    for (const industry of industryPreference) {
      const industryLower = industry.toLowerCase();
      
      if (industryLower.includes('technology')) {
        if (skillLower.includes('programming') || skillLower.includes('development')) return 0.9;
        if (skillLower.includes('cloud') || skillLower.includes('devops')) return 0.8;
      }
      
      if (industryLower.includes('healthcare')) {
        if (skillLower.includes('data') || skillLower.includes('compliance')) return 0.8;
        if (skillLower.includes('security') || skillLower.includes('privacy')) return 0.9;
      }
      
      if (industryLower.includes('finance')) {
        if (skillLower.includes('analysis') || skillLower.includes('modeling')) return 0.8;
        if (skillLower.includes('security') || skillLower.includes('risk')) return 0.9;
      }
    }
    
    return 0.6;
  };

  const getTechMotivationSkillAlignment = (techMotivation, skillName) => {
    if (!techMotivation) return 0.5;
    
    const motivationLower = techMotivation.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    if (motivationLower.includes('passion') && skillLower.includes('creative')) return 0.8;
    if (motivationLower.includes('problem') && skillLower.includes('solving')) return 0.9;
    if (motivationLower.includes('innovation') && skillLower.includes('advanced')) return 0.8;
    if (motivationLower.includes('growth') && skillLower.includes('learning')) return 0.7;
    
    return 0.6;
  };

  // Tier 3: Supporting Evidence Scoring
  const getTransferableSkillValue = (skills, skillName) => {
    if (!skills) return 0.3;
    const skillsLower = skills.toLowerCase();
    const skillNameLower = skillName.toLowerCase();
    
    const relevantSkills = {
      'programming': ['analytical', 'problem', 'logical', 'technical'],
      'communication': ['communication', 'writing', 'presentation', 'teamwork'],
      'leadership': ['leadership', 'management', 'coordination', 'planning'],
      'research': ['analytical', 'critical thinking', 'investigation', 'methodology'],
      'design': ['creative', 'visual', 'aesthetic', 'user-focused'],
      'data': ['analytical', 'mathematical', 'statistical', 'detail-oriented']
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

  const getTechnologyFoundationForSkill = (jobTechnologies, skillName) => {
    if (!jobTechnologies) return 0.3;
    
    const techLower = jobTechnologies.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    // Direct technology match
    if (techLower.includes(skillLower) || skillLower.includes(techLower.split(',')[0])) {
      return 0.9;
    }
    
    // Related technology foundation
    const techStack = techLower.split(',').map(t => t.trim());
    for (const tech of techStack) {
      if (skillLower.includes(tech) || tech.includes(skillLower.split(' ')[0])) {
        return 0.7;
      }
    }
    
    // General tech foundation
    const generalTech = ['programming', 'software', 'database', 'web', 'api'];
    const hasGeneralTech = generalTech.some(tech => techLower.includes(tech));
    if (hasGeneralTech && skillLower.includes('programming')) return 0.6;
    
    return 0.4;
  };

  // Tier 4: Background Context Scoring
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
    
    return 0.6;
  };

  const getCertificationSkillRelevance = (certificationsDetail, skillName) => {
    if (!certificationsDetail) return 0.2;
    
    const certLower = certificationsDetail.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    if (certLower.includes('none')) return 0.2;
    
    // Direct skill match in certifications
    if (certLower.includes(skillLower) || skillLower.includes(certLower.split(' ')[0])) {
      return 0.9;
    }
    
    // Related certification areas
    if (skillLower.includes('cloud') && certLower.includes('aws')) return 0.8;
    if (skillLower.includes('data') && certLower.includes('analytics')) return 0.8;
    if (skillLower.includes('programming') && certLower.includes('developer')) return 0.7;
    
    return 0.4;
  };

  // Helper functions for analysis
  const getTimeCommitmentHours = (timeCommitment) => {
    if (!timeCommitment) return 10;
    
    const timeMap = {
      '5 hours or less': 5,
      '5-10 hours': 7.5,
      '10-15 hours': 12.5,
      '15-20 hours': 17.5,
      '20+ hours': 25
    };
    
    return timeMap[timeCommitment] || 10;
  };

  const getSkillLearningIntensity = (estimatedLearningTime) => {
    if (!estimatedLearningTime) return 5;
    
    const weeks = parseInt(estimatedLearningTime.split('-')[0]) || 4;
    return weeks * 1.5; // Approximate hours per week needed
  };

  // Get sequential system specific skill category
  const getSequentialSystemCategory = (skillName, careerPathRec, skillGapAnalysis) => {
    const skillLower = skillName.toLowerCase();
    
    // Check if skill is from career path requirements
    if (careerPathRec?.requiredSkills?.includes(skillName)) {
      return '🎯 Career Path Foundation';
    }
    
    // Check if skill is from skill gap analysis
    if (skillGapAnalysis?.skillGaps?.some(gap => gap.skill === skillName)) {
      return '📚 Skill Gap Priority';
    }
    
    // Categorize by skill type
    if (skillLower.includes('programming') || skillLower.includes('coding')) return 'Core Technical Skills';
    if (skillLower.includes('data') || skillLower.includes('analytics')) return 'Data & Analysis Skills';
    if (skillLower.includes('leadership') || skillLower.includes('management')) return 'Leadership Skills';
    if (skillLower.includes('communication') || skillLower.includes('presentation')) return 'Soft Skills';
    if (skillLower.includes('design') || skillLower.includes('ui')) return 'Design Skills';
    
    return 'Professional Skills';
  };

  // Enhance the skill details with Technical Specification v2.0 analysis
  const gapAnalysis = analyzeSkillGapSequentialSystem(skill, userData, careerPathRecommendation, skillGapAnalysis, learningRoadmap);
  const enhancedSkillDetails = {
    ...skill,
    gapAreas: gapAnalysis.gapAreas,
    sequentialInsights: gapAnalysis.sequentialInsights,
    sequentialCategory: getSequentialSystemCategory(skill.name, careerPathRecommendation, skillGapAnalysis),
    technicalSpecVersion: '2.0'
  };
  
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-lg">{skill.name}</h4>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-sm text-gray-500">{enhancedSkillDetails.sequentialCategory}</span>
            
            {/* Technical Specification v2.0 Badge */}
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              Tech Spec v2.0
            </span>
            
            {/* Sequential System Badge */}
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              Sequential Dependency
            </span>
            
            {/* System Phase Badge */}
            {careerPathRecommendation && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                🎯→📚→⚖️ Optimized
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
            
            {/* Priority Badge based on Technical Specification v2.0 */}
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
      
      {/* Technical Specification v2.0 Sequential System Analysis */}
      {systemResponse && (
        <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <h5 className="text-sm font-medium text-blue-800 mb-2">
            Technical Specification v2.0 - Sequential System Analysis:
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="font-medium text-blue-700">System Confidence:</span>
              <div className="text-blue-600">{systemResponse.overallConfidence}%</div>
            </div>
            <div>
              <span className="font-medium text-blue-700">Criteria Complete:</span>
              <div className="text-blue-600">{systemResponse.careerPathCriteriaComplete}/16</div>
            </div>
            <div>
              <span className="font-medium text-blue-700">Data Quality:</span>
              <div className="text-blue-600">{systemResponse.dataCompleteness}%</div>
            </div>
            <div>
              <span className="font-medium text-blue-700">Sequential Phases:</span>
              <div className="text-blue-600">
                {careerPathRecommendation ? '🎯' : '⭕'}
                {skillGapAnalysis ? '📚' : '⭕'}
                {learningRoadmap ? '⚖️' : '⭕'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Career Path Context Display */}
      {careerPathRecommendation && (
        <div className="mb-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
          <h5 className="text-sm font-medium text-purple-800 mb-2">
            🎯 Career Path Context:
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="font-medium text-purple-700">Path Confidence:</span>
              <div className="text-purple-600">{careerPathRecommendation.confidenceScore}%</div>
            </div>
            <div>
              <span className="font-medium text-purple-700">16-Criteria Used:</span>
              <div className="text-purple-600">{careerPathRecommendation.metadata?.criteriaUsed?.length || 0}</div>
            </div>
            <div>
              <span className="font-medium text-purple-700">Core Drivers:</span>
              <div className="text-purple-600">{Math.round((careerPathRecommendation.metadata?.tierScores?.coreDriving || 0) * 100)}%</div>
            </div>
            <div>
              <span className="font-medium text-purple-700">Required Skill:</span>
              <div className="text-purple-600">
                {careerPathRecommendation.requiredSkills?.includes(skill.name) ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {skill.description && (
        <p className="text-sm text-gray-700 mb-3">{skill.description}</p>
      )}
      
      {/* Sequential System Insights from Technical Specification v2.0 */}
      {enhancedSkillDetails.sequentialInsights && enhancedSkillDetails.sequentialInsights.length > 0 && (
        <div className="mb-3 p-3 bg-gray-100 rounded-lg">
          <h5 className="text-sm font-medium text-gray-800 mb-2">
            🔗 Sequential System Insights:
          </h5>
          <ul className="text-xs text-gray-700 space-y-1">
            {enhancedSkillDetails.sequentialInsights.slice(0, 3).map((insight, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Enhanced Gap Areas with Technical Specification v2.0 context */}
      {enhancedSkillDetails.gapAreas && enhancedSkillDetails.gapAreas.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {enhancedSkillDetails.gapAreas.map((area, idx) => (
            <span key={idx} className={`inline-block px-2 py-0.5 text-xs rounded ${
              area.includes('gap') || area.includes('missing') ? 'bg-red-100 text-red-800' :
              area.includes('foundation') || area.includes('alignment') ? 'bg-yellow-100 text-yellow-800' :
              area.includes('leverage') || area.includes('strength') ? 'bg-green-100 text-green-800' :
              area.includes('critical') || area.includes('demand') ? 'bg-purple-100 text-purple-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {area === 'future-goal-alignment' ? 'Future Goal Critical' :
               area === 'tech-interest-gap' ? 'Tech Interest Gap' :
               area === 'domain-leverage' ? 'Domain Leverage Skill' :
               area === 'career-path-alignment' ? 'Career Path Essential' :
               area === 'industry-demand' ? 'High Industry Demand' :
               area === 'motivation-skill-gap' ? 'Motivation-Aligned Gap' :
               area === 'transferable-skills' ? 'Limited Transferable Skills' :
               area === 'technology-foundation' ? 'Tech Foundation Gap' :
               area === 'academic-foundation' ? 'Academic Foundation' :
               area === 'certification-gap' ? 'Certification Needed' :
               area === 'career-path-optional' ? 'Supplementary Skill' :
               area === 'path-confidence-skill' ? 'High Priority Despite Confidence' :
               area === 'industry-critical' ? 'Industry Critical' :
               area === 'significant-advancement' ? 'Major Advancement Needed' :
               area === 'leverage-strength' ? 'Leverage Existing Strength' :
               area === 'certification-pathway' ? 'Certification Available' :
               area === 'roadmap-missing' ? 'Not in Roadmap' :
               area === 'time-intensive' ? 'Time Intensive' :
               area === 'budget-consideration' ? 'Budget Impact' :
               area === 'system-confidence' ? 'System Confidence Factor' :
               area === 'data-completeness' ? 'Limited Data Analysis' :
               area === 'criteria-incomplete' ? 'Incomplete Criteria' :
               area === 'learning-comfort' ? 'Learning Support Needed' :
               area === 'time-commitment-gap' ? 'Time Commitment Challenge' :
               area}
            </span>
          ))}
        </div>
      )}
      
      {/* Learning Path Recommendation based on Technical Specification v2.0 */}
      {skill.learningPath && (
        <div className="mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <h5 className="text-sm font-medium text-green-800 mb-1">
            💡 Learning Path (Sequential System v2.0):
          </h5>
          <p className="text-sm text-green-700">{skill.learningPath}</p>
        </div>
      )}

      {/* Sequential System Progress Indicator */}
      {(careerPathRecommendation || skillGapAnalysis || learningRoadmap) && (
        <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-green-50 rounded-lg border border-purple-200">
          <h5 className="text-sm font-medium text-purple-700 mb-2">
            🔗 Sequential System Progress for {skill.name}:
          </h5>
          <div className="flex items-center space-x-2 text-xs">
            <div className={`px-2 py-1 rounded ${careerPathRecommendation ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-600'}`}>
              🎯 Career Foundation: {careerPathRecommendation ? 'Established' : 'Pending'}
            </div>
            <span className="text-gray-400">→</span>
            <div className={`px-2 py-1 rounded ${skillGapAnalysis ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
              📚 Gap Analysis: {skillGapAnalysis ? 'Complete' : 'Pending'}
            </div>
            <span className="text-gray-400">→</span>
            <div className={`px-2 py-1 rounded ${learningRoadmap ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
              ⚖️ Learning Plan: {learningRoadmap ? 'Ready' : 'Pending'}
            </div>
          </div>
        </div>
      )}
      
      {/* Use enhanced skill details and pass technical specification v2.0 data */}
      <SkillLearningResources 
        skillName={skill.name} 
        userData={userData} 
        skillDetails={enhancedSkillDetails}
        careerPathRecommendation={careerPathRecommendation}
        skillGapAnalysis={skillGapAnalysis}
        learningRoadmap={learningRoadmap}
        systemResponse={systemResponse}
      />
    </div>
  );
};

export default SkillLevelChart;
