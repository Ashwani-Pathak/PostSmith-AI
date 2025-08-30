import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, BookOpen, Menu, X } from 'lucide-react';

// Utility function for safe navigation
const safeScrollToSection = (sectionId) => {
  try {
    const element = document.getElementById(sectionId);
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    } else {
      // Fallback: scroll to top if section not found
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
  } catch (error) {
    console.warn(`Could not scroll to section ${sectionId}:`, error);
    // Fallback: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return false;
  }
};

const Navbar = ({ onNavigateToForm }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    safeScrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleGetStarted = () => {
    if (onNavigateToForm) {
      onNavigateToForm();
    } else {
      // Fallback to scrolling to hero section
      safeScrollToSection('hero');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      className="glass-card sticky top-0 z-50 mx-4 mt-4 mb-8 hover-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Brand */}
        <motion.div 
          className="flex items-center space-x-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={handleGetStarted}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-purple-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-accent-500 to-pink-500 rounded-full animate-pulse shadow-pink-glow"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text-animated">AI Postsmith</h1>
            <p className="text-xs text-white/60 -mt-1">Craft Viral LinkedIn Posts</p>
          </div>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.button
            onClick={() => scrollToSection('features')}
            className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4 group-hover:text-secondary-400 transition-colors" />
            <span>Features</span>
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('about')}
            className="text-white/80 hover:text-white transition-colors duration-300 flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-4 h-4 group-hover:text-accent-400 transition-colors" />
            <span>About</span>
          </motion.button>
        </div>

        {/* CTA Button */}
        <motion.button
          className="glass-button-accent hidden md:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
        >
          Get Started
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden glass-button-secondary p-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 space-y-3">
          <motion.button
            onClick={() => scrollToSection('features')}
            className="w-full text-left p-3 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Features</span>
            </div>
          </motion.button>
          
          <motion.button
            onClick={() => scrollToSection('about')}
            className="w-full text-left p-3 rounded-lg bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>About</span>
            </div>
          </motion.button>

          <motion.button
            onClick={handleGetStarted}
            className="w-full text-left p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-indigo-600/20 text-purple-300 border border-purple-500/30 hover:from-purple-600/30 hover:to-indigo-600/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Get Started</span>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-6"></div>
    </motion.nav>
  );
};

export default Navbar;
