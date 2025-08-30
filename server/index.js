const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const { generatePosts } = require('./services/geminiService');
const { savePost, getSavedPosts } = require('./services/postService');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - must be applied before other middleware
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'https://ai-postsmith.vercel.app',
      'https://postsmith-ai.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// Rate limiting - exclude OPTIONS requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  skip: (req) => req.method === 'OPTIONS' // Skip rate limiting for OPTIONS requests
});
app.use('/api/', limiter);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    // Check if Gemini API key is available
    const hasApiKey = !!process.env.GEMINI_API_KEY;
    
    res.status(200).json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'AI Postsmith Backend',
      environment: process.env.NODE_ENV || 'development',
      hasGeminiApiKey: hasApiKey,
      apiKeyStatus: hasApiKey ? 'Configured' : 'Missing'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Main generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const startTime = Date.now();
    const { topic, tone, audience, length, language, postCount, includeHashtags } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Validate postCount
    const validPostCount = parseInt(postCount) || 3;
    if (validPostCount < 1 || validPostCount > 10) {
      return res.status(400).json({ 
        error: 'Post count must be between 1 and 10' 
      });
    }

    const posts = await generatePosts({
      topic,
      tone: tone || 'professional',
      audience: audience || 'general',
      length: length || 'medium',
      language: language || 'English',
      postCount: validPostCount,
      includeHashtags: includeHashtags !== false
    });

    const endTime = Date.now();
    const latency = endTime - startTime;

    res.json({
      success: true,
      posts,
      metadata: {
        tokensUsed: posts.metadata?.tokensUsed || 0,
        estimatedCost: posts.metadata?.estimatedCost || 0,
        latency: `${latency}ms`,
        timestamp: new Date().toISOString(),
        topic: topic,
        tone: tone || 'professional',
        audience: audience || 'general',
        length: length || 'medium',
        language: language || 'English',
        postCount: validPostCount,
        generationSteps: 4
      }
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate posts',
      details: error.message 
    });
  }
});

// Save post endpoint
app.post('/api/save', async (req, res) => {
  try {
    const { content, topic, tone, audience, hashtags } = req.body;
    
    if (!content || !topic) {
      return res.status(400).json({ error: 'Content and topic are required' });
    }

    const savedPost = await savePost({
      content,
      topic,
      tone,
      audience,
      hashtags,
      createdAt: new Date()
    });

    res.json({ success: true, post: savedPost });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});

// Get saved posts endpoint
app.get('/api/myposts', async (req, res) => {
  try {
    const posts = await getSavedPosts();
    res.json({ success: true, posts });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Test Gemini API endpoint
app.get('/api/test-gemini', async (req, res) => {
  try {
    const { generatePosts } = require('./services/geminiService');
    
    // Test with minimal parameters
    const testResult = await generatePosts({
      topic: 'test post',
      tone: 'professional',
      audience: 'general',
      length: 'short',
      language: 'English',
      postCount: 1,
      includeHashtags: false
    });
    
    res.json({
      success: true,
      message: 'Gemini API is working correctly',
      testResult: {
        postsGenerated: testResult.posts?.length || 0,
        hasMetadata: !!testResult.metadata
      }
    });
  } catch (error) {
    console.error('Gemini API test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Gemini API test failed',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-postsmith')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 AI Postsmith Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
