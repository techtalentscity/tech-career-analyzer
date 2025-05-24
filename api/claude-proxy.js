// api/claude-proxy-fetch.js - UPDATED FOR CAREER PATH RECOMMENDATION SYSTEM v2.0

export default async function handler(req, res) {
  // Enhanced CORS configuration for v2.0 system
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-System-Version, X-Engine-Type'
  );
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      systemVersion: '2.0'
    });
  }
  
  // Enhanced request validation for v2.0 system
  if (!req.body) {
    return res.status(400).json({ 
      error: 'Missing request body',
      systemVersion: '2.0',
      engineType: 'Sequential Dependency Recommendation Engine'
    });
  }
  
  if (!req.body.messages) {
    return res.status(400).json({ 
      error: 'Missing messages array in request', 
      details: 'Request must include a messages array with at least one message',
      systemVersion: '2.0',
      requiredFormat: 'v2.0 Sequential Dependency Engine format'
    });
  }
  
  if (!req.body.model) {
    return res.status(400).json({ 
      error: 'Missing model in request', 
      details: 'Request must specify a valid Claude model for v2.0 system',
      systemVersion: '2.0',
      supportedModels: ['claude-3-5-sonnet-20240620', 'claude-3-haiku-20240307', 'claude-3-opus-20240229']
    });
  }
  
  // Validate messages format
  if (!Array.isArray(req.body.messages) || req.body.messages.length === 0) {
    return res.status(400).json({
      error: 'Invalid messages format',
      details: 'Messages must be a non-empty array for v2.0 analysis',
      systemVersion: '2.0'
    });
  }
  
  // v2.0 System detection and validation
  const systemVersion = detectSystemVersion(req.body);
  const isV2Request = systemVersion === '2.0';
  
  try {
    // Enhanced logging for v2.0 Sequential Dependency Engine
    const requestMetadata = {
      systemVersion: systemVersion,
      engineType: isV2Request ? 'Sequential Dependency Recommendation Engine' : 'Legacy Multi-Tier Engine',
      model: req.body.model,
      messageCount: req.body.messages.length,
      maxTokens: req.body.max_tokens || 'default',
      requestType: detectRequestType(req.body.messages),
      timestamp: new Date().toISOString()
    };
    
    console.log('🤖 Career Path Recommendation System API Request:', requestMetadata);
    
    // Validate v2.0 specific requirements
    if (isV2Request) {
      const v2Validation = validateV2Request(req.body);
      if (!v2Validation.isValid) {
        return res.status(400).json({
          error: 'Invalid v2.0 request format',
          details: v2Validation.errors,
          systemVersion: '2.0',
          requiredFormat: 'Sequential Dependency Engine with 4-Tier Scoring'
        });
      }
    }
    
    // Check API key
    if (!process.env.CLAUDE_API_KEY) {
      console.error('❌ CLAUDE_API_KEY environment variable is not set');
      return res.status(500).json({
        error: 'API configuration error',
        details: 'Claude API key is not configured for v2.0 system',
        systemVersion: systemVersion
      });
    }
    
    // Prepare enhanced request body for v2.0 system
    const requestBody = {
      model: req.body.model,
      messages: req.body.messages,
      max_tokens: req.body.max_tokens || (isV2Request ? 8192 : 4096), // Higher token limit for v2.0
      temperature: req.body.temperature !== undefined ? req.body.temperature : (isV2Request ? 0.7 : 0.7),
      system: req.body.system || (isV2Request ? getV2SystemPrompt() : '')
    };
    
    // Add v2.0 specific parameters if applicable
    if (isV2Request) {
      requestBody.metadata = {
        systemVersion: '2.0',
        engineType: 'Sequential Dependency Recommendation Engine',
        processingType: detectProcessingType(req.body.messages),
        tierScoringEnabled: true,
        aiContentGeneration: true
      };
    }
    
    // Performance monitoring start
    const startTime = Date.now();
    
    // Call the Claude API using fetch with enhanced configuration
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'User-Agent': `CareerPathRecommendationSystem/${systemVersion}`,
        'X-System-Version': systemVersion,
        'X-Engine-Type': isV2Request ? 'Sequential-Dependency' : 'Multi-Tier'
      },
      body: JSON.stringify(requestBody)
    });
    
    // Performance monitoring
    const responseTime = Date.now() - startTime;
    
    // Enhanced error handling for v2.0 system
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Enhanced error logging for v2.0
      console.error('❌ Claude API Error (v2.0 Enhanced):', {
        systemVersion: systemVersion,
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        responseTime: responseTime,
        requestType: requestMetadata.requestType
      });
      
      return res.status(response.status).json({
        error: 'Claude API error',
        details: errorData.error?.message || response.statusText,
        status: response.status,
        systemVersion: systemVersion,
        engineType: requestMetadata.engineType,
        responseTime: responseTime
      });
    }
    
    // Successfully received response from Claude API
    const data = await response.json();
    
    // Enhanced response processing for v2.0 system
    const processedResponse = isV2Request 
      ? await processV2Response(data, requestMetadata, responseTime)
      : await processLegacyResponse(data, requestMetadata, responseTime);
    
    // v2.0 response validation and enhancement
    if (isV2Request) {
      const validationResult = validateV2Response(processedResponse);
      if (!validationResult.isValid) {
        console.warn('⚠️ v2.0 Response validation warnings:', validationResult.warnings);
        
        // Add validation metadata to response
        processedResponse.validationMetadata = {
          warnings: validationResult.warnings,
          systemVersion: '2.0',
          validationPerformed: true
        };
      }
    }
    
    // Enhanced success logging for v2.0
    console.log('✅ Career Path Recommendation System API Response:', {
      systemVersion: systemVersion,
      engineType: requestMetadata.engineType,
      responseTime: responseTime,
      contentGenerated: !!processedResponse.content,
      aiContentDetected: isV2Request ? detectAIGeneratedContent(processedResponse) : false,
      sequentialDependencyComplete: isV2Request ? checkSequentialDependencyCompleteness(processedResponse) : null
    });
    
    // Return enhanced response with v2.0 metadata
    return res.status(200).json(processedResponse);
    
  } catch (error) {
    console.error('❌ Career Path Recommendation System API Error:', {
      systemVersion: systemVersion,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      requestType: req.body.messages ? detectRequestType(req.body.messages) : 'unknown'
    });
    
    // Enhanced error response for v2.0
    return res.status(500).json({ 
      error: 'Error processing Career Path Recommendation System request',
      message: error.message,
      systemVersion: systemVersion,
      engineType: isV2Request ? 'Sequential Dependency Recommendation Engine' : 'Legacy Multi-Tier Engine',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// ============================================================================
// v2.0 SYSTEM DETECTION AND VALIDATION FUNCTIONS
// ============================================================================

/**
 * Detect system version from request content
 */
function detectSystemVersion(requestBody) {
  if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
    return 'unknown';
  }
  
  const content = JSON.stringify(requestBody.messages).toLowerCase();
  
  // v2.0 indicators
  if (content.includes('career path recommendation system v2.0') ||
      content.includes('sequential dependency engine') ||
      content.includes('4-tier scoring') ||
      content.includes('careerpath') && content.includes('skillgap') && content.includes('learningroadmap')) {
    return '2.0';
  }
  
  // Legacy v1.x indicators  
  if (content.includes('technical specification v1.1') ||
      content.includes('multi-tier recommendation engine') ||
      content.includes('tech-interest-based') ||
      content.includes('research-development') ||
      content.includes('lifestyle-market')) {
    return '1.1';
  }
  
  return '1.0'; // Default fallback
}

/**
 * Detect request type for enhanced logging
 */
function detectRequestType(messages) {
  const content = JSON.stringify(messages).toLowerCase();
  
  if (content.includes('form suggestions') || content.includes('filling out')) {
    return 'form-suggestions';
  }
  
  if (content.includes('career path recommendation') || content.includes('futuregoal')) {
    return 'career-path-analysis';
  }
  
  if (content.includes('skill gap') || content.includes('skillgap')) {
    return 'skill-gap-analysis';
  }
  
  if (content.includes('learning roadmap') || content.includes('learningroadmap')) {
    return 'learning-roadmap';
  }
  
  if (content.includes('sequential dependency')) {
    return 'complete-v2-analysis';
  }
  
  return 'general-analysis';
}

/**
 * Detect processing type for v2.0 requests
 */
function detectProcessingType(messages) {
  const content = JSON.stringify(messages).toLowerCase();
  
  if (content.includes('json') && content.includes('careerpath') && content.includes('skillgap')) {
    return 'structured-sequential-dependency';
  }
  
  if (content.includes('4-tier scoring') && content.includes('16 criteria')) {
    return '4-tier-career-path';
  }
  
  if (content.includes('ai-generated') && content.includes('personalized')) {
    return 'ai-content-generation';
  }
  
  return 'standard-v2-analysis';
}

/**
 * Validate v2.0 request format
 */
function validateV2Request(requestBody) {
  const errors = [];
  const warnings = [];
  
  // Check for v2.0 required elements
  const content = JSON.stringify(requestBody.messages);
  
  if (!content.includes('Sequential Dependency') && !content.includes('4-Tier')) {
    warnings.push('Request may not be properly formatted for v2.0 Sequential Dependency Engine');
  }
  
  if (requestBody.max_tokens && requestBody.max_tokens < 4096) {
    warnings.push('Token limit may be insufficient for v2.0 comprehensive analysis');
  }
  
  // Check for AI content generation indicators
  if (content.includes('AI-GENERATED') || content.includes('personalized')) {
    if (!content.includes('JSON')) {
      errors.push('AI content generation requests must specify JSON output format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get v2.0 system prompt enhancement
 */
function getV2SystemPrompt() {
  return "You are an expert career transition analyst using the Career Path Recommendation System v2.0 " +
         "with Sequential Dependency Engine and 4-Tier Scoring System. Generate comprehensive, " +
         "AI-personalized recommendations with proper JSON formatting when requested.";
}

// ============================================================================
// v2.0 RESPONSE PROCESSING FUNCTIONS
// ============================================================================

/**
 * Process v2.0 response with enhanced features
 */
async function processV2Response(data, requestMetadata, responseTime) {
  // Enhanced response structure for v2.0
  const processedResponse = {
    ...data,
    systemMetadata: {
      systemVersion: '2.0',
      engineType: 'Sequential Dependency Recommendation Engine',
      responseTime: responseTime,
      processingType: requestMetadata.requestType,
      aiContentGeneration: true,
      processedAt: new Date().toISOString()
    }
  };
  
  // Enhance content structure if needed
  if (data.content && Array.isArray(data.content) && data.content.length > 0) {
    const contentText = data.content[0].text;
    
    // Detect and validate JSON content for structured responses
    if (contentText && (contentText.includes('{') && contentText.includes('}'))) {
      try {
        // Attempt to extract and validate JSON for Sequential Dependency responses
        const jsonMatch = contentText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonContent = JSON.parse(jsonMatch[0]);
          
          // Validate v2.0 RecommendationResponse structure
          if (jsonContent.careerPath || jsonContent.skillGap || jsonContent.learningRoadmap) {
            processedResponse.structuredContent = jsonContent;
            processedResponse.contentType = 'sequential-dependency-json';
            
            console.log('✅ v2.0 Structured JSON content detected and validated');
          }
        }
      } catch (jsonError) {
        console.warn('⚠️ JSON parsing warning for v2.0 response:', jsonError.message);
        processedResponse.jsonParsingWarning = jsonError.message;
      }
    }
    
    // Detect AI-generated content markers
    if (contentText && (contentText.includes('AI-GENERATED') || contentText.includes('AI-generated'))) {
      processedResponse.aiContentDetected = true;
    }
    
    // Detect 4-tier scoring content
    if (contentText && (contentText.includes('tier1') || contentText.includes('coreDriving') || contentText.includes('Tier 1'))) {
      processedResponse.tierScoringDetected = true;
    }
  }
  
  return processedResponse;
}

/**
 * Process legacy response (backward compatibility)
 */
async function processLegacyResponse(data, requestMetadata, responseTime) {
  console.log('📊 Processing legacy response with v1.x compatibility');
  
  const processedResponse = {
    ...data,
    systemMetadata: {
      systemVersion: requestMetadata.systemVersion || '1.x',
      engineType: 'Legacy Multi-Tier Engine',
      responseTime: responseTime,
      processingType: requestMetadata.requestType,
      legacy: true,
      processedAt: new Date().toISOString()
    }
  };
  
  // Legacy format conversion if needed
  if (data.content && Array.isArray(data.content) && data.content.length > 0) {
    // Already in modern format
    console.log('✅ Legacy content in modern format');
  } else if (data.completion) {
    // Convert legacy Claude API format to new format
    console.log('🔄 Converting legacy format to modern format');
    processedResponse.content = [{ type: 'text', text: data.completion }];
  }
  
  return processedResponse;
}

/**
 * Validate v2.0 response structure
 */
function validateV2Response(response) {
  const warnings = [];
  
  if (!response.systemMetadata) {
    warnings.push('Missing system metadata in v2.0 response');
  }
  
  if (response.content && Array.isArray(response.content)) {
    const contentText = response.content[0]?.text || '';
    
    // Check for expected v2.0 content elements
    if (response.systemMetadata?.processingType === 'complete-v2-analysis') {
      if (!contentText.includes('careerPath') && !contentText.includes('Career Path')) {
        warnings.push('Expected career path content not found in complete v2.0 analysis');
      }
      
      if (!contentText.includes('skillGap') && !contentText.includes('Skill Gap')) {
        warnings.push('Expected skill gap content not found in complete v2.0 analysis');
      }
      
      if (!contentText.includes('learningRoadmap') && !contentText.includes('Learning Roadmap')) {
        warnings.push('Expected learning roadmap content not found in complete v2.0 analysis');
      }
    }
    
    // Check for 4-tier scoring elements
    if (response.systemMetadata?.processingType?.includes('4-tier')) {
      if (!contentText.includes('tier') && !contentText.includes('Tier')) {
        warnings.push('Expected 4-tier scoring content not found');
      }
    }
  }
  
  return {
    isValid: warnings.length === 0,
    warnings
  };
}

/**
 * Detect AI-generated content in response
 */
function detectAIGeneratedContent(response) {
  if (!response.content || !Array.isArray(response.content)) {
    return false;
  }
  
  const contentText = response.content[0]?.text || '';
  
  return contentText.includes('AI-GENERATED') ||
         contentText.includes('AI-generated') ||
         contentText.includes('personalized') ||
         (response.structuredContent && 
          (response.structuredContent.careerPath?.title || 
           response.structuredContent.skillGap?.skillGaps ||
           response.structuredContent.learningRoadmap?.phases));
}

/**
 * Check Sequential Dependency completeness
 */
function checkSequentialDependencyCompleteness(response) {
  if (!response.structuredContent) {
    return null;
  }
  
  const content = response.structuredContent;
  
  return {
    hasCareerPath: !!content.careerPath,
    hasSkillGap: !!content.skillGap,
    hasLearningRoadmap: !!content.learningRoadmap,
    isComplete: !!(content.careerPath && content.skillGap && content.learningRoadmap),
    dependencyLinks: {
      skillGapLinked: content.skillGap?.careerPathId === content.careerPath?.id,
      roadmapLinked: content.learningRoadmap?.careerPathId === content.careerPath?.id &&
                     content.learningRoadmap?.skillGapId === content.skillGap?.id
    }
  };
}
