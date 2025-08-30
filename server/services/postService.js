const mongoose = require('mongoose');

// Post Schema
const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 3000
  },
  topic: {
    type: String,
    required: true,
    maxlength: 200
  },
  tone: {
    type: String,
    enum: ['casual', 'professional', 'storytelling', 'thought-leadership'],
    default: 'professional'
  },
  audience: {
    type: String,
    enum: ['founders', 'students', 'recruiters', 'VCs', 'general'],
    default: 'general'
  },
  hashtags: [{
    type: String,
    maxlength: 50
  }],
  viralScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  isModerated: {
    type: Boolean,
    default: true
  },
  moderationNote: {
    type: String,
    default: 'Content approved'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create indexes for better performance
postSchema.index({ topic: 1, createdAt: -1 });
postSchema.index({ tone: 1, audience: 1 });
postSchema.index({ viralScore: -1 });

const Post = mongoose.model('Post', postSchema);

// Save a new post
const savePost = async (postData) => {
  try {
    const post = new Post(postData);
    const savedPost = await post.save();
    return savedPost;
  } catch (error) {
    console.error('Error saving post:', error);
    throw new Error('Failed to save post to database');
  }
};

// Get all saved posts, sorted by creation date
const getSavedPosts = async (limit = 50) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v');
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts from database');
  }
};

// Get posts by topic
const getPostsByTopic = async (topic, limit = 20) => {
  try {
    const posts = await Post.find({
      topic: { $regex: topic, $options: 'i' }
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v');
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts by topic:', error);
    throw new Error('Failed to fetch posts by topic');
  }
};

// Get posts by tone and audience
const getPostsByFilters = async (filters, limit = 20) => {
  try {
    const query = {};
    
    if (filters.tone) query.tone = filters.tone;
    if (filters.audience) query.audience = filters.audience;
    if (filters.minViralScore) query.viralScore = { $gte: filters.minViralScore };
    
    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('-__v');
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts by filters:', error);
    throw new Error('Failed to fetch posts by filters');
  }
};

// Delete a post by ID
const deletePost = async (postId) => {
  try {
    const result = await Post.findByIdAndDelete(postId);
    return result;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};

// Update a post
const updatePost = async (postId, updateData) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    return updatedPost;
  } catch (error) {
    console.error('Error updating post:', error);
    throw new Error('Failed to update post');
  }
};

// Get post statistics
const getPostStats = async () => {
  try {
    const stats = await Post.aggregate([
      {
        $group: {
          _id: null,
          totalPosts: { $sum: 1 },
          avgViralScore: { $avg: '$viralScore' },
          totalTopics: { $addToSet: '$topic' }
        }
      },
      {
        $project: {
          _id: 0,
          totalPosts: 1,
          avgViralScore: { $round: ['$avgViralScore', 2] },
          uniqueTopics: { $size: '$totalTopics' }
        }
      }
    ]);
    
    return stats[0] || { totalPosts: 0, avgViralScore: 0, uniqueTopics: 0 };
  } catch (error) {
    console.error('Error getting post stats:', error);
    throw new Error('Failed to get post statistics');
  }
};

module.exports = {
  savePost,
  getSavedPosts,
  getPostsByTopic,
  getPostsByFilters,
  deletePost,
  updatePost,
  getPostStats
};
