import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PostGrid from './components/PostGrid';
import Sidebar from './components/Sidebar';
import SavedPosts from './components/SavedPosts';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import GenerationProgress from './components/GenerationProgress';
import { generateLinkedInPosts, savePost, getSavedPosts } from './services/api';
import { safeScrollToTop } from './utils/navigation';

function App() {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [activeTab, setActiveTab] = useState('generate');
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [generationSteps, setGenerationSteps] = useState([]);

  // Load saved posts on component mount
  useEffect(() => {
    loadSavedPosts();
  }, []);

  // Handle browser navigation events
  useEffect(() => {
    const handlePopState = () => {
      // When browser back/forward is used, ensure we're at the top
      // This prevents scrollIntoView errors on unmounted components
      setTimeout(() => {
        safeScrollToTop(false); // Use instant scroll to avoid animation issues
      }, 100);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const loadSavedPosts = async () => {
    try {
      const response = await getSavedPosts();
      if (response.success) {
        setSavedPosts(response.posts);
      }
    } catch (error) {
      console.error('Failed to load saved posts:', error);
    }
  };

  const handleGeneratePosts = async (formData) => {
    setIsLoading(true);
    setError(null);
    setGenerationSteps([]);
    setCurrentStep('planning');
    
    try {
      // Simulate step progression
      const steps = ['planning', 'drafting', 'polishing', 'guardrails'];
      
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);
        setGenerationSteps(prev => [...prev, steps[i]]);
        
        // Wait a bit to show the step progression
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      const response = await generateLinkedInPosts(formData);
      if (response.success) {
        // Ensure posts array is properly structured
        const postsArray = response.posts?.posts || response.posts || [];
        if (Array.isArray(postsArray) && postsArray.length > 0) {
          setPosts(postsArray);
          setMetadata(response.metadata);
          setCurrentStep('complete');
          setGenerationSteps(prev => [...prev, 'complete']);
          setActiveTab('results');
        } else {
          throw new Error('Invalid posts data received from server');
        }
      }
    } catch (error) {
      setError(error.message || 'Failed to generate posts');
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePost = async (postData) => {
    try {
      const response = await savePost(postData);
      if (response.success) {
        setSavedPosts(prev => [response.post, ...prev]);
        // Show success message
        return true;
      }
    } catch (error) {
      console.error('Failed to save post:', error);
      return false;
    }
  };

  const handleRegeneratePost = async (postIndex, formData) => {
    setIsLoading(true);
    try {
      const response = await generateLinkedInPosts({ ...formData, postCount: 1 });
      if (response.success && response.posts.length > 0) {
        const newPosts = [...posts];
        newPosts[postIndex] = response.posts[0];
        setPosts(newPosts);
      }
    } catch (error) {
      setError('Failed to regenerate post');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  // Handle navigation to main form
  const navigateToMainForm = () => {
    setActiveTab('generate');
    // Wait for the component to render, then scroll to hero
    setTimeout(() => {
      const heroElement = document.getElementById('hero');
      if (heroElement && typeof heroElement.scrollIntoView === 'function') {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 via-indigo-900 to-slate-900">
      <Navbar onNavigateToForm={navigateToMainForm} />
      
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'generate' && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {isLoading ? (
                <GenerationProgress
                  currentStep={currentStep}
                  steps={generationSteps}
                  isGenerating={isLoading}
                  error={error}
                />
              ) : (
                <Hero 
                  onGenerate={handleGeneratePosts}
                  isLoading={isLoading}
                  error={error}
                />
              )}
            </motion.div>
          )}

          {activeTab === 'results' && posts.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              <div className="lg:col-span-3">
                <PostGrid
                  posts={posts}
                  onSave={handleSavePost}
                  onRegenerate={handleRegeneratePost}
                  onCopy={handleCopyToClipboard}
                  isLoading={isLoading}
                />
              </div>
              
              <div className="lg:col-span-1">
                <Sidebar
                  metadata={metadata}
                  onTabChange={setActiveTab}
                  savedPostsCount={savedPosts.length}
                  onNavigateToForm={navigateToMainForm}
                />
              </div>
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SavedPosts
                posts={savedPosts}
                onDelete={loadSavedPosts}
                onCopy={handleCopyToClipboard}
                onNavigateToForm={navigateToMainForm}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Features Section */}
      <Features onNavigateToForm={navigateToMainForm} />

      {/* About Section */}
      <About onNavigateToForm={navigateToMainForm} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
