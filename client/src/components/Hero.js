import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Target, Palette, Clock, Globe, Hash, Zap } from 'lucide-react';

const Hero = ({ onGenerate, isLoading, error }) => {
  const [formData, setFormData] = useState({
    topic: 'cold-start strategies for marketplaces',
    tone: 'professional',
    audience: 'founders',
    length: 'medium',
    language: 'English',
    postCount: 3,
    includeHashtags: true
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.topic.trim() && formData.postCount >= 1) {
      onGenerate(formData);
    }
  };

  const toneOptions = [
    { value: 'casual', label: 'Casual', icon: '💬' },
    { value: 'professional', label: 'Professional', icon: '💼' },
    { value: 'storytelling', label: 'Storytelling', icon: '📖' },
    { value: 'thought-leadership', label: 'Thought Leadership', icon: '🧠' }
  ];

  const audienceOptions = [
    { value: 'founders', label: 'Founders', icon: '🚀' },
    { value: 'students', label: 'Students', icon: '🎓' },
    { value: 'recruiters', label: 'Recruiters', icon: '🔍' },
    { value: 'VCs', label: 'VCs', icon: '💰' },
    { value: 'general', label: 'General', icon: '👥' }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', icon: '⚡' },
    { value: 'medium', label: 'Medium', icon: '📝' },
    { value: 'long', label: 'Long', icon: '📚' }
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Portuguese', label: 'Portuguese' }
  ];

  return (
    <div id="hero" className="text-center max-w-4xl mx-auto relative">
      {/* Floating background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-accent-500/20 to-purple-500/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-text-animated">AI Postsmith</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-4">
          Craft engaging LinkedIn posts with AI-powered precision
        </p>
        <p className="text-lg text-white/60">
          Generate viral content tailored to your audience, tone, and goals
        </p>
      </motion.div>

      {/* Main Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="glass-card p-8 mb-8 hover-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Topic Input */}
        <div className="mb-6">
          <label className="block text-left text-white/80 font-medium mb-3">
            <Sparkles className="inline w-5 h-5 mr-2 text-purple-400" />
            What's your topic? *
          </label>
          <input
            type="text"
            value={formData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            placeholder="e.g., cold-start strategies for marketplaces"
            className="glass-input w-full text-lg"
            required
          />
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Tone Selection */}
          <div>
            <label className="block text-left text-white/80 font-medium mb-3">
              <Palette className="inline w-5 h-5 mr-2 text-accent-400" />
              Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {toneOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('tone', option.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    formData.tone === option.value
                      ? 'border-purple-400 bg-purple-600/20 text-purple-300 shadow-purple-glow'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg mr-2">{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Audience Selection */}
          <div>
            <label className="block text-left text-white/80 font-medium mb-3">
              <Target className="inline w-5 h-5 mr-2 text-secondary-400" />
              Target Audience
            </label>
            <div className="grid grid-cols-2 gap-2">
              {audienceOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('audience', option.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    formData.audience === option.value
                      ? 'border-secondary-400 bg-secondary-600/20 text-secondary-300 shadow-teal-glow'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg mr-2">{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Length Selection */}
          <div>
            <label className="block text-left text-white/80 font-medium mb-3">
              <Clock className="inline w-5 h-5 mr-2 text-indigo-400" />
              Post Length
            </label>
            <div className="grid grid-cols-3 gap-2">
              {lengthOptions.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('length', option.value)}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    formData.length === option.value
                      ? 'border-indigo-400 bg-indigo-600/20 text-indigo-300 shadow-purple-glow'
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg mr-2">{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-left text-white/80 font-medium mb-3">
              <Globe className="inline w-5 h-5 mr-2 text-accent-400" />
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => handleInputChange('language', e.target.value)}
              className="glass-input w-full"
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Post Count */}
          <div>
            <label className="block text-left text-white/80 font-medium mb-3">
              <Zap className="inline w-5 h-5 mr-2 text-secondary-400" />
              Number of Posts (1-10)
            </label>
            <input
              type="number"
              min="0"
              max="10"
              value={formData.postCount}
              onChange={(e) => handleInputChange('postCount', Math.min(10, Math.max(0, parseInt(e.target.value) || 0)))}
              className="glass-input w-full text-center"
              placeholder="3"
            />
            <div className="text-xs text-white/40 mt-1 text-center">
              Enter the number of posts you want to generate
            </div>
          </div>

          {/* Hashtags Toggle */}
          <div>
            <label className="block text-left text-white/80 font-medium mb-3">
              <Hash className="inline w-5 h-5 mr-2 text-accent-400" />
              Include Hashtags & CTA
            </label>
            <div className="flex items-center">
              <motion.button
                type="button"
                onClick={() => handleInputChange('includeHashtags', !formData.includeHashtags)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  formData.includeHashtags ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-white/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    formData.includeHashtags ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </motion.button>
              <span className="ml-3 text-white/60">
                {formData.includeHashtags ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300"
          >
            {error}
          </motion.div>
        )}

        {/* Generate Button */}
        <motion.button
          type="submit"
          disabled={isLoading || !formData.topic.trim() || formData.postCount < 1}
          className="glass-button-accent w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Crafting your posts<span className="loading-dots"></span>
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Send className="w-5 h-5 mr-2" />
              Generate {formData.postCount} LinkedIn Posts
            </span>
          )}
        </motion.button>
      </motion.form>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass-card p-6 text-center hover-card">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-purple-glow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">AI-Powered</h3>
          <p className="text-white/60">Advanced Gemini AI for engaging content</p>
        </div>
        
        <div className="glass-card p-6 text-center hover-card">
          <div className="w-12 h-12 bg-gradient-to-r from-accent-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-pink-glow">
            <Target className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Audience-Focused</h3>
          <p className="text-white/60">Tailored for your specific audience</p>
        </div>
        
        <div className="glass-card p-6 text-center hover-card">
          <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 via-teal-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-teal-glow">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Viral Potential</h3>
          <p className="text-white/60">Optimized for maximum engagement</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
