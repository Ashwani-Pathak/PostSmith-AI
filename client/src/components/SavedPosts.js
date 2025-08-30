import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, Copy, Check, Calendar, Hash } from 'lucide-react';

const SavedPosts = ({ posts, onDelete, onCopy, onNavigateToForm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTone, setFilterTone] = useState('all');
  const [filterAudience, setFilterAudience] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (content, id) => {
    await onCopy(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.topic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTone = filterTone === 'all' || post.tone === filterTone;
      const matchesAudience = filterAudience === 'all' || post.audience === filterAudience;
      
      return matchesSearch && matchesTone && matchesAudience;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'viralScore':
          return (b.viralScore || 0) - (a.viralScore || 0);
        case 'topic':
          return a.topic.localeCompare(b.topic);
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchTerm, filterTone, filterAudience, sortBy]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="glass-card p-12 max-w-md mx-auto hover-card">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-purple-glow">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Saved Posts Yet</h3>
          <p className="text-white/60 mb-6">
            Start generating posts and save your favorites to build your content library.
          </p>
          <motion.button
            className="glass-button-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNavigateToForm}
          >
            Generate Your First Post
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">My Saved Posts</h2>
          <p className="text-white/60">
            {filteredAndSortedPosts.length} of {posts.length} posts
          </p>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 hover-card"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search posts by topic or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input w-full pl-10"
              />
            </div>
          </div>

          {/* Tone Filter */}
          <div>
            <select
              value={filterTone}
              onChange={(e) => setFilterTone(e.target.value)}
              className="glass-input w-full"
            >
              <option value="all">All Tones</option>
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
              <option value="storytelling">Storytelling</option>
              <option value="thought-leadership">Thought Leadership</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="glass-input w-full"
            >
              <option value="date">Sort by Date</option>
              <option value="viralScore">Sort by Viral Score</option>
              <option value="topic">Sort by Topic</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {filteredAndSortedPosts.map((post, index) => (
            <motion.div
              key={post._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 hover-card"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-full flex items-center justify-center shadow-purple-glow">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{post.topic}</h3>
                    <div className="flex items-center space-x-2 text-sm text-white/60">
                      <span className="capitalize">{post.tone}</span>
                      <span>•</span>
                      <span className="capitalize">{post.audience}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Copy Button */}
                  <motion.button
                    onClick={() => handleCopy(post.content, post._id)}
                    className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 hover:shadow-purple-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    title="Copy to clipboard"
                  >
                    {copiedId === post._id ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>

                  {/* Delete Button */}
                  <motion.button
                    onClick={() => onDelete(post._id)}
                    className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-all duration-300 hover:shadow-red-glow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <pre className="text-white/80 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {post.content}
                  </pre>
                </div>
              </div>

              {/* Post Footer */}
              <div className="flex items-center justify-between text-sm text-white/60">
                <div className="flex items-center space-x-4">
                  <span>Saved with AI Postsmith</span>
                  <span>•</span>
                  <span>Ready to use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4" />
                  <span>Saved Post</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State for Filtered Results */}
      {filteredAndSortedPosts.length === 0 && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="glass-card p-8 max-w-md mx-auto hover-card">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-purple-glow">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Posts Found</h3>
            <p className="text-white/60">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SavedPosts;
