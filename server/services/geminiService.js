const { GoogleGenerativeAI } = require('@google/generative-ai');

// Check if API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY environment variable is not set!');
  throw new Error('GEMINI_API_KEY environment variable is required');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize the model
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Profanity filter and content moderation
const PROFANITY_WORDS = [
  'profanity', 'inappropriate', 'offensive', 'hate', 'discrimination'
];

const isContentAppropriate = (content) => {
  const lowerContent = content.toLowerCase();
  return !PROFANITY_WORDS.some(word => lowerContent.includes(word));
};

// Calculate viral potential score
const calculateViralScore = (content) => {
  let score = 50; // Base score
  
  // Engagement factors
  if (content.includes('?')) score += 10; // Questions increase engagement
  if (content.includes('!')) score += 5;  // Exclamation marks add energy
  if (content.includes('💡') || content.includes('🚀') || content.includes('🔥')) score += 8; // Emojis
  if (content.length > 200 && content.length < 500) score += 15; // Optimal length
  if (content.includes('story') || content.includes('experience')) score += 12; // Storytelling
  
  return Math.min(score, 100); // Cap at 100
};

// Step 1: Plan - Generate outline
const generateOutline = async (topic, tone, audience, length) => {
  const lengthInstructions = {
    short: 'Keep it concise (2-3 sentences, under 100 words)',
    medium: 'Standard length (4-6 sentences, 150-250 words)',
    long: 'Comprehensive and detailed (8-12 sentences, 300-500 words with multiple paragraphs)'
  };

  const prompt = `Create a LinkedIn post outline for the topic "${topic}" with:
  - Tone: ${tone}
  - Target audience: ${audience}
  - Length: ${length} - ${lengthInstructions[length]}
  
  For ${length} posts, include:
  - A compelling hook
  - Multiple detailed points or examples
  - Personal insights or experiences
  - Industry context or trends
  - Practical takeaways
  - Strong call-to-action
  
  Return a JSON object with:
  {
    "hook": "attention-grabbing opening line",
    "body": "main content points with detailed explanations",
    "cta": "call-to-action that encourages engagement"
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        // Fallback to default outline
      }
    }
    
    // Fallback if JSON parsing fails
    return {
      hook: "Engaging opening about " + topic,
      body: "Key insights and value about " + topic,
      cta: "What are your thoughts on " + topic + "?"
    };
  } catch (error) {
    console.error('Outline generation error:', error);
    // Return fallback outline instead of throwing
    return {
      hook: "Engaging opening about " + topic,
      body: "Key insights and value about " + topic,
      cta: "What are your thoughts on " + topic + "?"
    };
  }
};

// Step 2: Draft - Expand into multiple posts
const generateDrafts = async (outline, postCount, tone, audience, language, length) => {
  const lengthRequirements = {
    short: 'Keep each post concise (2-3 sentences, under 100 words)',
    medium: 'Standard length posts (4-6 sentences, 150-250 words)',
    long: 'Comprehensive posts (8-12 sentences, 300-500 words with multiple paragraphs, detailed examples, and insights)'
  };

  const prompt = `Based on this outline:
  Hook: ${outline.hook}
  Body: ${outline.body}
  CTA: ${outline.cta}
  
  Create ${postCount} different LinkedIn posts in ${language} with:
  - Tone: ${tone}
  - Audience: ${audience}
  - Length: ${length} - ${lengthRequirements[length]}
  - Each post should be unique but follow the same outline
  - Make them engaging and professional
  - For ${length} posts, include detailed examples, personal insights, and industry context
  
  Return as a JSON array of posts with the exact structure:
  [
    {
      "content": "Full post content here...",
      "id": 1
    }
  ]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON array from response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('JSON parsing error in drafts:', parseError);
        // Fallback to default posts
      }
    }
    
    // Fallback posts
    return Array.from({ length: postCount }, (_, i) => ({
      content: `${outline.hook}\n\n${outline.body}\n\n${outline.cta}`,
      id: i + 1
    }));
  } catch (error) {
    console.error('Draft generation error:', error);
    // Return fallback posts instead of throwing
    return Array.from({ length: postCount }, (_, i) => ({
      content: `${outline.hook}\n\n${outline.body}\n\n${outline.cta}`,
      id: i + 1
    }));
  }
};

// Step 3: Polish - Adjust tone and add hashtags/CTA
const polishPosts = async (posts, tone, includeHashtags) => {
  const polishedPosts = [];
  
  for (const post of posts) {
    try {
      // Ensure post.content is always a string
      let polishedContent = typeof post.content === "string" ? post.content : "";

      // Add hashtags if requested
      if (includeHashtags) {
        try {
          const preview = polishedContent.substring(0, 100);
          const hashtagPrompt = `Generate 5-8 relevant hashtags for this LinkedIn post about ${preview}...`;
          const result = await model.generateContent(hashtagPrompt);
          const response = await result.response;
          const hashtags = response.text().match(/#\w+/g) || ['#LinkedIn', '#Professional', '#Networking'];
          polishedContent += '\n\n' + hashtags.join(' ');
        } catch (hashtagError) {
          console.error('Hashtag generation error:', hashtagError);
          // Fallback hashtags
          polishedContent += '\n\n#LinkedIn #Professional #Networking #Growth #Success';
        }
      }
      
      // Calculate viral score
      const viralScore = calculateViralScore(polishedContent);
      
      polishedPosts.push({
        ...post,
        content: polishedContent,
        viralScore,
        hashtags: includeHashtags ? polishedContent.match(/#\w+/g) || [] : []
      });
    } catch (postError) {
      console.error('Error polishing post:', postError);
      // Add fallback post
      polishedPosts.push({
        ...post,
        content: post.content || 'Content generation failed',
        viralScore: 50,
        hashtags: []
      });
    }
  }
  
  return polishedPosts;
};

// Step 4: Guardrail - Content moderation
const applyGuardrails = (posts) => {
  return posts.map(post => {
    const isAppropriate = isContentAppropriate(post.content);
    return {
      ...post,
      isModerated: isAppropriate,
      moderationNote: isAppropriate ? 'Content approved' : 'Content flagged for review'
    };
  });
};

// Main function that orchestrates the 4-step pipeline
const generatePosts = async (params) => {
  const {
    topic,
    tone,
    audience,
    length,
    language,
    postCount,
    includeHashtags
  } = params;

  try {
    // Validate required parameters
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      throw new Error('Topic is required and must be a non-empty string');
    }

    if (!postCount || postCount < 1 || postCount > 10) {
      throw new Error('Post count must be between 1 and 10');
    }

    if (!['short', 'medium', 'long'].includes(length)) {
      throw new Error('Length must be short, medium, or long');
    }

    if (!['casual', 'professional', 'storytelling', 'thought-leadership'].includes(tone)) {
      throw new Error('Invalid tone specified');
    }

    if (!['founders', 'students', 'recruiters', 'VCs', 'general'].includes(audience)) {
      throw new Error('Invalid audience specified');
    }

    console.log(`🚀 Starting post generation for: ${topic}`);
    console.log(`📊 Parameters: ${postCount} posts, ${length} length, ${tone} tone, ${audience} audience`);
    
    // Step 1: Plan
    console.log('📋 Step 1: Planning outline...');
    const outline = await generateOutline(topic, tone, audience, length);
    
    // Step 2: Draft
    console.log('✍️ Step 2: Generating drafts...');
    const drafts = await generateDrafts(outline, postCount, tone, audience, language, length);
    
    // Step 3: Polish
    console.log('✨ Step 3: Polishing posts...');
    const polishedPosts = await polishPosts(drafts, tone, includeHashtags);
    
    // Step 4: Guardrail
    console.log('🛡️ Step 4: Applying guardrails...');
    const finalPosts = applyGuardrails(polishedPosts);
    
    // Calculate metadata
    const totalTokens = finalPosts.reduce((sum, post) => sum + (post.content?.length || 0), 0);
    const estimatedCost = (totalTokens / 1000) * 0.001; // Rough estimate
    
    console.log(`✅ Generated ${finalPosts.length} posts successfully`);
    
    return {
      posts: finalPosts,
      metadata: {
        tokensUsed: totalTokens,
        estimatedCost: `$${estimatedCost.toFixed(4)}`,
        generationSteps: 4,
        topic,
        tone,
        audience,
        length
      }
    };
    
  } catch (error) {
    console.error('Post generation pipeline error:', error);
    throw new Error(`Failed to generate posts: ${error.message}`);
  }
};

module.exports = {
  generatePosts
};
