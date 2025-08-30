import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 relative">
      {/* Background floating elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-10 right-1/4 w-20 h-20 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: '5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-xl flex items-center justify-center shadow-purple-glow">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text-animated">AI Postsmith</h3>
                <p className="text-sm text-white/60">Crafting viral LinkedIn content with AI</p>
              </div>
            </motion.div>
            <p className="text-white/70 mb-6 max-w-md">
              Transform your LinkedIn presence with AI-powered content that resonates with your audience. 
              Generate engaging posts tailored to your brand voice and goals.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-purple-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-secondary-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-indigo-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@aipostsmith.com"
                className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 hover:shadow-accent-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  Features
                </span>
              </li>
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  About
                </span>
              </li>
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  Pricing
                </span>
              </li>
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  Support
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  Blog
                </span>
              </li>
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  Tutorials
                </span>
              </li>
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  API Docs
                </span>
              </li>
              <li>
                <span className="text-white/60 cursor-default opacity-50">
                  Community
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm mb-4 md:mb-0">
              © 2024 AI Postsmith. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-white/40">
              <span className="cursor-default opacity-50">
                Privacy Policy
              </span>
              <span className="cursor-default opacity-50">
                Terms of Service
              </span>
              <span className="cursor-default opacity-50">
                Cookie Policy
              </span>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-white/30 text-xs flex items-center justify-center">
              Made with <Heart className="w-3 h-3 mx-1 text-accent-400 animate-pulse" /> by the AI Postsmith team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
