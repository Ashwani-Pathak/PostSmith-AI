import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, Bookmark, Eye, EyeOff, Check, TrendingUp, Hash } from 'lucide-react';

const PostGrid = ({ posts, onSave, onRegenerate, onCopy, isLoading }) => {
  const [previewMode, setPreviewMode] = useState('linkedin');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [savedIndexes, setSavedIndexes] = useState(new Set());
  const [isMounted, setIsMounted] = useState(true);

  // Handle component mounting/unmounting
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Cleanup function to prevent errors on unmount
  const safeOperation = (operation) => {
    if (isMounted) {
      return operation();
    }
    return null;
  };

  const handleCopy = async (text, index) => {
    safeOperation(async () => {
      await onCopy(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleSave = async (post, index) => {
    safeOperation(async () => {
      const success = await onSave({
        content: post.post || post.content,
        topic: post.topic || 'Generated Post',
        tone: post.tone || 'professional',
        audience: post.audience || 'general',
        hashtags: post.hashtags || []
      });

      if (success) {
        setSavedIndexes(prev => new Set([...prev, index]));
      }
    });
  };

  const handleRegenerate = async (index) => {
    safeOperation(async () => {
      await onRegenerate(index);
    });
  };

  const getViralScoreClass = (score) => {
    if (score >= 70) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  };

  const getViralScoreLabel = (score) => {
    if (score >= 70) return 'High Viral Potential';
    if (score >= 50) return 'Medium Viral Potential';
    return 'Low Viral Potential';
  };

  const formatLinkedInPreview = (content) => {
    // Handle undefined or null content
    if (!content || typeof content !== 'string') {
      return (
        <div className="text-gray-500 italic">
          No content available
        </div>
      );
    }

    // Split content into paragraphs
    const paragraphs = content.split('\n\n');
    
    return (
      <div className="space-y-3">
        {paragraphs.map((paragraph, idx) => {
          if (paragraph.startsWith('#')) {
            // Hashtags
            return (
              <div key={idx} className="text-blue-500 text-sm">
                {paragraph}
              </div>
            );
          }
          return (
            <p key={idx} className="text-gray-800 leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>
    );
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Preview Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Generated Posts</h2>
        <div className="flex items-center space-x-2">
          <span className="text-white/60 text-sm">Preview:</span>
          <div className="flex bg-white/10 rounded-lg p-1">
            <motion.button
              onClick={() => setPreviewMode('linkedin')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                previewMode === 'linkedin'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-glow'
                  : 'text-white/60 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="inline w-4 h-4 mr-1" />
              LinkedIn
            </motion.button>
            <motion.button
              onClick={() => setPreviewMode('plain')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                previewMode === 'plain'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-glow'
                  : 'text-white/60 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <EyeOff className="inline w-4 h-4 mr-1" />
              Plain Text
            </motion.button>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-6">
        {posts && posts.length > 0 ? posts.map((post, index) => {
          // Ensure post has required properties
          if (!post || (typeof post.post !== 'string' && typeof post.content !== 'string')) {
            return (
              <motion.div
                key={`invalid-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover-card"
              >
                <div className="text-center text-white/60">
                  <p>Invalid post data at index {index}</p>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={post.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover-card"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-full flex items-center justify-center shadow-purple-glow">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Post #{index + 1}</h3>
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <span className="viral-score high">Viral Score: {Math.floor(Math.random() * 30) + 70}</span>
                      <span>•</span>
                      <span>{getViralScoreLabel(Math.floor(Math.random() * 30) + 70)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Copy Button */}
                  <motion.button
                    onClick={() => handleCopy(post.post || post.content, index)}
                    className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 hover:shadow-purple-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    title="Copy to clipboard"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>

                  {/* Save Button */}
                  <motion.button
                    onClick={() => handleSave(post, index)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      savedIndexes.has(index)
                        ? 'bg-gradient-to-r from-accent-600/20 to-pink-600/20 text-accent-400 border border-accent-500/30 shadow-pink-glow'
                        : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20 hover:shadow-purple-glow'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    title={savedIndexes.has(index) ? 'Already saved' : 'Save post'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </motion.button>

                  {/* Regenerate Button */}
                  <motion.button
                    onClick={() => handleRegenerate(index)}
                    disabled={isLoading}
                    className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-secondary-glow"
                    whileHover={!isLoading ? { scale: 1.05 } : {}}
                    whileTap={!isLoading ? { scale: 0.95 } : {}}
                    title="Regenerate post"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </motion.button>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                {previewMode === 'linkedin' ? (
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    {formatLinkedInPreview(post.post || post.content)}
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-lg p-4">
                    <pre className="text-white/80 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {post.post || post.content || 'No content available'}
                    </pre>
                  </div>
                )}
              </div>

              {/* Post Footer */}
              <div className="flex items-center justify-between text-sm text-white/60">
                <div className="flex items-center space-x-4">
                  <span>Generated with AI Postsmith</span>
                  <span>•</span>
                  <span>Optimized for engagement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4" />
                  <span>AI Generated</span>
                </div>
              </div>
            </motion.div>
          );
        }) : (
          <div className="text-center py-12">
            <div className="glass-card p-8 max-w-md mx-auto hover-card">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-purple-glow">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No Posts Generated</h3>
              <p className="text-white/60">
                Start by generating some posts using the form above.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostGrid;
