import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Hash, BookOpen, TrendingUp, Zap, Target } from 'lucide-react';

const Sidebar = ({ metadata, onTabChange, savedPostsCount, onNavigateToForm }) => {
  // Create default metadata if none provided
  const displayMetadata = metadata || {
    topic: 'No topic specified',
    tone: 'professional',
    audience: 'general',
    length: 'medium',
    tokensUsed: 0,
    estimatedCost: '$0.0000',
    latency: '0ms',
    timestamp: new Date().toISOString()
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Unknown';
    }
  };

  const getEfficiencyScore = () => {
    try {
      // Calculate efficiency based on multiple factors
      let score = 50; // Base score
      
      // Factor 1: Response time (faster = higher score)
      if (displayMetadata.latency) {
        const latencyMs = parseInt(displayMetadata.latency.replace('ms', ''));
        if (latencyMs < 1000) score += 25; // Very fast
        else if (latencyMs < 3000) score += 15; // Fast
        else if (latencyMs < 5000) score += 5; // Normal
        else score -= 10; // Slow
      }
      
      // Factor 2: Token usage efficiency
      if (displayMetadata.tokensUsed) {
        const tokens = parseInt(displayMetadata.tokensUsed);
        if (tokens > 0) {
          // More tokens used = more comprehensive generation
          if (tokens > 1000) score += 15;
          else if (tokens > 500) score += 10;
          else if (tokens > 100) score += 5;
        }
      }
      
      // Factor 3: Generation steps completed
      if (displayMetadata.generationSteps) {
        const steps = parseInt(displayMetadata.generationSteps);
        if (steps >= 4) score += 10; // All steps completed
        else if (steps >= 2) score += 5; // Some steps completed
      }
      
      // Ensure score is between 0 and 100
      score = Math.max(0, Math.min(100, score));
      
      if (score >= 80) return { score, label: 'Excellent', color: 'text-green-400' };
      if (score >= 60) return { score, label: 'Good', color: 'text-yellow-400' };
      return { score, label: 'Fair', color: 'text-red-400' };
    } catch (error) {
      console.warn('Error calculating efficiency score:', error);
      return { score: 50, label: 'Fair', color: 'text-yellow-400' };
    }
  };

  const efficiencyScore = getEfficiencyScore();

  return (
    <div className="space-y-6">
      {/* Analytics Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-6 hover-card"
      >
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Analytics</h3>
        </div>

        <div className="space-y-4">
          {/* Token Usage */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Tokens Used</span>
            <span className="text-white font-medium">{displayMetadata.tokensUsed?.toLocaleString() || 'N/A'}</span>
          </div>

          {/* Estimated Cost */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Estimated Cost</span>
            <span className="text-white font-medium">{displayMetadata.estimatedCost || 'N/A'}</span>
          </div>

          {/* Latency */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Response Time</span>
            <span className="text-white font-medium">{displayMetadata.latency || 'N/A'}</span>
          </div>

          {/* Generation Steps */}
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">AI Steps</span>
            <span className="text-white font-medium">{displayMetadata.generationSteps || 4}</span>
          </div>
        </div>
      </motion.div>

      {/* Performance Card */}
      <div className="glass-card p-4 hover-card">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-purple-glow">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white font-semibold">Performance</h3>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">
            {efficiencyScore.score}
          </div>
          <div className={`text-sm font-medium mb-2 ${efficiencyScore.color}`}>
            {efficiencyScore.label}
          </div>
          <div className="text-xs text-white/60 mb-3">Efficiency Score</div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${efficiencyScore.score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Generation Details */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6 hover-card"
      >
        <div className="flex items-center mb-4">
          <Zap className="w-5 h-5 text-secondary-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Generation Details</h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Topic</span>
            <span className="text-white text-sm text-right max-w-[120px] truncate" title={displayMetadata.topic}>
              {displayMetadata.topic}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Tone</span>
            <span className="text-white text-sm capitalize">{displayMetadata.tone}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Audience</span>
            <span className="text-white text-sm capitalize">{displayMetadata.audience}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/60 text-sm">Length</span>
            <span className="text-white text-sm capitalize">{displayMetadata.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card p-6 hover-card"
      >
        <div className="flex items-center mb-4">
          <Target className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Navigation</h3>
        </div>

        <div className="space-y-3">
          <motion.button
            onClick={() => {
              if (onNavigateToForm) {
                onNavigateToForm();
              } else {
                onTabChange('generate');
              }
            }}
            className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300 border border-purple-500/30 hover:from-purple-600/30 hover:to-indigo-600/30 transition-all duration-300 shadow-purple-glow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              <span>Generate New</span>
            </div>
          </motion.button>

          <motion.button
            onClick={() => onTabChange('saved')}
            className="w-full text-left p-3 rounded-lg bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>My Posts</span>
              </div>
              <span className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                {savedPostsCount}
              </span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Timestamp */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="glass-card p-4 hover-card"
      >
        <div className="flex items-center text-white/40 text-xs">
          <Clock className="w-3 h-3 mr-2" />
          <span>Generated: {formatDate(displayMetadata.timestamp)}</span>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="glass-card p-6 hover-card"
      >
        <div className="flex items-center mb-4">
          <Hash className="w-5 h-5 text-accent-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Pro Tips</h3>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Use specific topics for better AI understanding</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Experiment with different tones for your audience</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-accent-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Save your best posts for future reference</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
