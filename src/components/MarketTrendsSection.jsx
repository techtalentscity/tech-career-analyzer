// src/components/MarketTrendsSection.jsx - UPDATED TO MATCH TECHNICAL SPECIFICATION v2.0
import React from 'react';

const MarketTrendsSection = ({ 
  marketTrends, 
  careerPathRecommendation = null,
  skillGapAnalysis = null,
  learningRoadmap = null,
  systemResponse = null,
  structuredMode = false 
}) => {
  // Enhanced Market Trends Card Component with Technical Spec v2.0 integration
  const MarketTrendsCard = ({ trend, index }) => {
    const trendIcons = {
      'SALARY OUTLOOK': '💰',
      'MARKET DEMAND': '📈',
      'SALARY TRENDS': '💰',
      'INDUSTRY DEMAND': '📊',
      'CAREER PATH': '🎯',
      'SKILL GAP': '📚',
      'LEARNING ROADMAP': '⚖️'
    };
    
    const icon = trendIcons[trend.title.split(' ').slice(-2).join(' ')] || 
                 trendIcons[trend.title.split(' ').slice(0, 2).join(' ')] || '📊';
    
    // Get sequential system phase styling based on Technical Specification v2.0
    const getPhaseColor = (phase) => {
      switch(phase) {
        case 'career-path': return 'bg-purple-100 text-purple-700';
        case 'skill-gap': return 'bg-blue-100 text-blue-700';
        case 'learning-roadmap': return 'bg-green-100 text-green-700';
        default: return 'bg-gray-100 text-gray-700';
      }
    };
    
    // Get sequential system display name based on Technical Specification v2.0
    const getSequentialSystemName = () => {
      return '🎯 Career Path → 📚 Skill Gap → ⚖️ Learning Roadmap';
    };
    
    // Determine which phase this trend is most relevant to
    const getRelevantPhase = (trend) => {
      if (trend.title.toLowerCase().includes('career') || trend.title.toLowerCase().includes('path')) {
        return 'career-path';
      }
      if (trend.title.toLowerCase().includes('skill') || trend.title.toLowerCase().includes('gap')) {
        return 'skill-gap';
      }
      if (trend.title.toLowerCase().includes('learning') || trend.title.toLowerCase().includes('roadmap')) {
        return 'learning-roadmap';
      }
      return 'general';
    };
    
    const relevantPhase = getRelevantPhase(trend);
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-gray-800">{trend.title}</h4>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="text-sm text-gray-500">Market Analysis</span>
              
              {/* Technical Specification v2.0 Badge */}
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Tech Spec v2.0
              </span>
              
              {/* 2024-2025 Data Badge */}
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                2024-2025 Data
              </span>
              
              {structuredMode && trend.userCareer && (
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                  {trend.userCareer}
                </span>
              )}
              
              {structuredMode && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  Sequential Dependency Engine
                </span>
              )}

              {/* Sequential System Phase Badge - Technical Specification v2.0 */}
              {careerPathRecommendation && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(relevantPhase)}`}>
                  {relevantPhase === 'career-path' ? '🎯 Career Path Optimized' :
                   relevantPhase === 'skill-gap' ? '📚 Skill Gap Optimized' :
                   relevantPhase === 'learning-roadmap' ? '⚖️ Learning Optimized' :
                   '📊 System Optimized'}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-3">{trend.description}</p>
        
        {trend.personalizedData && (
          <div className="space-y-3">
            {/* Enhanced Salary Ranges with Growth Data */}
            {trend.personalizedData.ranges && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">💰 Salary Ranges:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  {trend.personalizedData.ranges.slice(0, 3).map((range, idx) => (
                    <li key={idx}>• {range}</li>
                  ))}
                </ul>
                {trend.personalizedData.growth && (
                  <div className="mt-2 text-xs text-green-600 font-medium">
                    📈 Growth: {trend.personalizedData.growth}
                  </div>
                )}
                {trend.personalizedData.salaryGrowth && (
                  <div className="mt-1 text-xs text-green-600">
                    💹 Annual Increase: {trend.personalizedData.salaryGrowth}
                  </div>
                )}
              </div>
            )}
            
            {/* Hot Skills Section */}
            {trend.personalizedData.hotSkills && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">🔥 Hot Skills:</h5>
                <div className="flex flex-wrap gap-1">
                  {trend.personalizedData.hotSkills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                {trend.personalizedData.hotSkills.length > 4 && (
                  <div className="mt-2 text-xs text-blue-600">
                    +{trend.personalizedData.hotSkills.length - 4} more skills in demand
                  </div>
                )}
              </div>
            )}

            {/* Market Opportunities */}
            {trend.personalizedData.opportunities && (
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">🚀 Market Opportunities:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  {trend.personalizedData.opportunities.slice(0, 3).map((opp, idx) => (
                    <li key={idx}>• {opp}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Top Industries */}
            {trend.personalizedData.industries && (
              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                <h5 className="font-medium text-orange-800 mb-2">🏢 Top Industries:</h5>
                <div className="flex flex-wrap gap-1">
                  {trend.personalizedData.industries.slice(0, 4).map((industry, idx) => (
                    <span key={idx} className="px-2 py-1 bg-orange-200 text-orange-800 rounded-full text-xs">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Market Outlook */}
            {trend.personalizedData.outlook && (
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                <h5 className="font-medium text-indigo-800 mb-2">🔮 Market Outlook:</h5>
                <p className="text-sm text-indigo-700">{trend.personalizedData.outlook}</p>
              </div>
            )}

            {/* Career Path Specific Data (v2.0) */}
            {trend.personalizedData.careerPathAlignment && careerPathRecommendation && (
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800 mb-2">🎯 Career Path Alignment:</h5>
                <p className="text-sm text-purple-700">{trend.personalizedData.careerPathAlignment}</p>
              </div>
            )}

            {/* Skill Gap Trends (v2.0) */}
            {trend.personalizedData.skillGapTrends && skillGapAnalysis && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">📚 Skill Gap Market Trends:</h5>
                <p className="text-sm text-blue-700">{trend.personalizedData.skillGapTrends}</p>
              </div>
            )}

            {/* Learning Platform Trends (v2.0) */}
            {trend.personalizedData.learningTrends && learningRoadmap && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800 mb-2">⚖️ Learning Platform Trends:</h5>
                <p className="text-sm text-green-700">{trend.personalizedData.learningTrends}</p>
              </div>
            )}

            {/* Domain Expertise Leverage (v2.0) */}
            {trend.personalizedData.domainLeverage && careerPathRecommendation?.metadata?.criteriaUsed?.includes('leverageDomainExpertise') && (
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                <h5 className="font-medium text-teal-800 mb-2">🔗 Domain Expertise Market:</h5>
                <p className="text-sm text-teal-700">{trend.personalizedData.domainLeverage}</p>
              </div>
            )}

            {/* Remote Work Trends (Enhanced for v2.0) */}
            {trend.personalizedData.remoteWork && (
              <div className="bg-pink-50 p-3 rounded-lg border border-pink-200">
                <h5 className="font-medium text-pink-800 mb-2">🏠 Remote Work Trends:</h5>
                <p className="text-sm text-pink-700">{trend.personalizedData.remoteWork}</p>
              </div>
            )}

            {/* Tech Innovation Trends (Enhanced for v2.0) */}
            {trend.personalizedData.techInnovation && (
              <div className="bg-violet-50 p-3 rounded-lg border border-violet-200">
                <h5 className="font-medium text-violet-800 mb-2">🚀 Tech Innovation:</h5>
                <p className="text-sm text-violet-700">{trend.personalizedData.techInnovation}</p>
              </div>
            )}

            {/* Certification ROI (v2.0) */}
            {trend.personalizedData.certificationROI && skillGapAnalysis?.recommendedCertifications && (
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">🏆 Certification ROI:</h5>
                <p className="text-sm text-yellow-700">{trend.personalizedData.certificationROI}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="pt-4 border-t mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Data Source:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
              Technical Spec v2.0 Analysis
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-gray-600">Relevance:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              trend.relevance === 'High' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {trend.relevance || 'High'}
            </span>
          </div>
          {/* Sequential System Metadata Display (v2.0) */}
          {careerPathRecommendation?.metadata && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-medium text-gray-600">Sequential System:</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {careerPathRecommendation.metadata.criteriaUsed?.length || 0}/16 criteria
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!marketTrends || marketTrends.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📊</div>
        <h4 className="text-lg font-semibold text-gray-600 mb-2">
          {structuredMode ? 'Generating Technical Spec v2.0 Market Analysis' : 'Generating Market Analysis'}
        </h4>
        <p className="text-gray-500">
          {structuredMode 
            ? 'Creating personalized market insights using Sequential Dependency Engine...'
            : 'Creating market insights...'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Market Performance Summary - Technical Specification v2.0 */}
      {structuredMode && systemResponse && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Market Performance Summary - Sequential Dependency System v2.0
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">
                {systemResponse.overallConfidence}%
              </div>
              <div className="text-sm text-green-700">System Confidence</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {systemResponse.careerPathCriteriaComplete}/16
              </div>
              <div className="text-sm text-blue-700">Criteria Complete</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{marketTrends.length}</div>
              <div className="text-sm text-purple-700">Market Insights</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-600">
                {careerPathRecommendation?.marketDemand === 'high' ? 'Very High' : 
                 careerPathRecommendation?.marketDemand === 'medium' ? 'High' : 'Medium'}
              </div>
              <div className="text-sm text-orange-700">Market Demand</div>
            </div>
          </div>
          
          {/* Sequential System Market Insight - Technical Specification v2.0 */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h5 className="text-sm font-medium text-gray-700 mb-2">
              Key Market Insights (Sequential Dependency System v2.0):
            </h5>
            <p className="text-sm text-gray-600">
              🎯 <strong>Career Path Foundation:</strong> {careerPathRecommendation?.title || 'Generated'} shows {careerPathRecommendation?.confidenceScore || 0}% alignment with {careerPathRecommendation?.marketDemand || 'medium'} market demand. 
              Industry focus: {careerPathRecommendation?.industryFocus?.join(', ') || 'Technology'}. 
              📚 <strong>Skill Development:</strong> {skillGapAnalysis?.skillGaps?.length || 0} skill gaps identified with {skillGapAnalysis?.recommendedCertifications?.length || 0} certification recommendations. 
              ⚖️ <strong>Learning Strategy:</strong> {learningRoadmap?.phases?.length || 0}-phase roadmap with {learningRoadmap?.totalTimelineEstimate || 'flexible'} timeline targeting your {learningRoadmap?.budgetEstimate || 'personalized'} investment level.
            </p>
          </div>

          {/* Technical Specification v2.0 Metadata Display */}
          {careerPathRecommendation?.metadata && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="text-sm font-medium text-blue-700 mb-2">
                Technical Specification v2.0 - Sequential System Performance:
              </h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="font-medium text-blue-700">Career Path:</span>
                  <div className="text-blue-600">{careerPathRecommendation.confidence} ({careerPathRecommendation.confidenceScore}%)</div>
                </div>
                <div>
                  <span className="font-medium text-blue-700">16 Criteria:</span>
                  <div className="text-blue-600">{careerPathRecommendation.metadata.criteriaUsed?.length || 0} used</div>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Core Drivers:</span>
                  <div className="text-blue-600">{Math.round((careerPathRecommendation.metadata.tierScores?.coreDriving || 0) * 100)}%</div>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Fallback:</span>
                  <div className="text-blue-600">{careerPathRecommendation.metadata.fallbackApplied ? 'Yes' : 'No'}</div>
                </div>
              </div>
              
              {/* 4-Tier Breakdown Display */}
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-white p-2 rounded">
                  <span className="font-medium text-purple-700">Tier 1 (45%):</span>
                  <div className="text-purple-600">{Math.round((careerPathRecommendation.metadata.tierScores?.coreDriving || 0) * 100)}%</div>
                </div>
                <div className="bg-white p-2 rounded">
                  <span className="font-medium text-blue-700">Tier 2 (25%):</span>
                  <div className="text-blue-600">{Math.round((careerPathRecommendation.metadata.tierScores?.strongMotivators || 0) * 100)}%</div>
                </div>
                <div className="bg-white p-2 rounded">
                  <span className="font-medium text-green-700">Tier 3 (20%):</span>
                  <div className="text-green-600">{Math.round((careerPathRecommendation.metadata.tierScores?.supportingEvidence || 0) * 100)}%</div>
                </div>
                <div className="bg-white p-2 rounded">
                  <span className="font-medium text-orange-700">Tier 4 (10%):</span>
                  <div className="text-orange-600">{Math.round((careerPathRecommendation.metadata.tierScores?.backgroundContext || 0) * 100)}%</div>
                </div>
              </div>
            </div>
          )}

          {/* Sequential System Progress Indicator */}
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-green-50 rounded-lg border border-purple-200">
            <h5 className="text-sm font-medium text-purple-700 mb-2">
              🔗 Sequential Dependency Progress:
            </h5>
            <div className="flex items-center space-x-2 text-xs">
              <div className={`px-2 py-1 rounded ${careerPathRecommendation ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-600'}`}>
                🎯 Career Path: {careerPathRecommendation ? 'Complete' : 'Pending'}
              </div>
              <span className="text-gray-400">→</span>
              <div className={`px-2 py-1 rounded ${skillGapAnalysis ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
                📚 Skill Gap: {skillGapAnalysis ? 'Analyzed' : 'Pending'}
              </div>
              <span className="text-gray-400">→</span>
              <div className={`px-2 py-1 rounded ${learningRoadmap ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                ⚖️ Roadmap: {learningRoadmap ? 'Created' : 'Pending'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Standard Market Analysis Summary (for non-structured mode) */}
      {!systemResponse && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Market Analysis Summary - Technical Spec v2.0
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{marketTrends.length}</div>
              <div className="text-sm text-green-700">Market Insights</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {marketTrends.filter(t => t.relevance === 'High').length}
              </div>
              <div className="text-sm text-blue-700">High Relevance</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">
                {marketTrends.filter(t => t.userCareer).length}
              </div>
              <div className="text-sm text-purple-700">Personalized</div>
            </div>
          </div>
        </div>
      )}

      {/* Market Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketTrends.map((trend, index) => (
          <MarketTrendsCard key={index} trend={trend} index={index} />
        ))}
      </div>

      {/* Enhanced Key Takeaways - Technical Specification v2.0 */}
      {structuredMode && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">💡</span>
            Key Takeaways & Action Items - Technical Spec v2.0
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 mt-1">✓</span>
              <p className="text-sm text-gray-700">
                Market trends are personalized using Sequential Dependency Engine v2.0
                {careerPathRecommendation && ` (Career Path: ${careerPathRecommendation.confidenceScore}% confidence)`}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 mt-1">ℹ</span>
              <p className="text-sm text-gray-700">
                16-criteria analysis with 4-tier weighting: {careerPathRecommendation?.metadata?.fallbackApplied ? 
                'Fallback logic activated due to missing criteria' : 
                'Full sequential system performance with complete validation'}
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-purple-500 mt-1">🎯</span>
              <p className="text-sm text-gray-700">
                Career Foundation: {careerPathRecommendation?.metadata?.criteriaUsed?.length || 0} criteria established baseline for skill and learning analysis
              </p>
            </div>
            
            {/* Sequential System Specific Takeaways - Technical Specification v2.0 */}
            {skillGapAnalysis && (
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 mt-1">📚</span>
                <p className="text-sm text-gray-700">
                  Skill Development: {skillGapAnalysis.skillGaps?.filter(gap => gap.priority === 'high').length || 0} high-priority gaps identified, 
                  {skillGapAnalysis.recommendedCertifications?.length || 0} certifications recommended with {skillGapAnalysis.confidenceScore}% confidence
                </p>
              </div>
            )}
            
            {learningRoadmap && (
              <div className="flex items-start space-x-3">
                <span className="text-teal-500 mt-1">⚖️</span>
                <p className="text-sm text-gray-700">
                  Learning Strategy: {learningRoadmap.phases?.length || 0}-phase roadmap designed for {learningRoadmap.totalTimelineEstimate || 'flexible timeline'}, 
                  budget estimate {learningRoadmap.budgetEstimate || 'personalized'} with {learningRoadmap.confidenceScore}% confidence
                </p>
              </div>
            )}

            {/* Tier-Based Analysis */}
            {careerPathRecommendation?.metadata?.tierScores && (
              <div className="flex items-start space-x-3">
                <span className="text-cyan-500 mt-1">📊</span>
                <p className="text-sm text-gray-700">
                  4-Tier Analysis: Core Drivers {Math.round(careerPathRecommendation.metadata.tierScores.coreDriving * 100)}%, 
                  Strong Motivators {Math.round(careerPathRecommendation.metadata.tierScores.strongMotivators * 100)}%, 
                  Supporting Evidence {Math.round(careerPathRecommendation.metadata.tierScores.supportingEvidence * 100)}%, 
                  Background Context {Math.round(careerPathRecommendation.metadata.tierScores.backgroundContext * 100)}%
                </p>
              </div>
            )}

            {/* Data Completeness */}
            {systemResponse && (
              <div className="flex items-start space-x-3">
                <span className="text-indigo-500 mt-1">📈</span>
                <p className="text-sm text-gray-700">
                  Data Quality: {systemResponse.dataCompleteness}% profile completeness with {systemResponse.careerPathCriteriaComplete}/16 career path criteria present, 
                  enabling {systemResponse.overallConfidence}% system confidence
                </p>
              </div>
            )}
          </div>

          {/* Technical Specification v2.0 Summary */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <h5 className="text-sm font-bold text-blue-800 mb-2">
              🔬 Technical Specification v2.0 Summary:
            </h5>
            <p className="text-xs text-blue-700">
              This analysis uses the Sequential Dependency Engine with 16-criteria career path foundation, skill gap analysis, and learning roadmap generation. 
              {careerPathRecommendation ? `Your career path (${careerPathRecommendation.title}) achieved ${careerPathRecommendation.confidenceScore}% confidence using ${careerPathRecommendation.metadata?.criteriaUsed?.length || 0} criteria with 4-tier weighting. ` : ''}
              {skillGapAnalysis ? `Skill analysis identified ${skillGapAnalysis.skillGaps?.length || 0} gaps. ` : ''}
              {learningRoadmap ? `Learning roadmap provides ${learningRoadmap.phases?.length || 0} structured phases. ` : ''}
              Market insights are optimized for your complete career transition strategy.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketTrendsSection;
