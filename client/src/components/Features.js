import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Globe, 
  BarChart3, 
  Clock, 
  TrendingUp, 
  BookOpen,
  Palette,
  Hash
} from 'lucide-react';
import { safeScrollToSection } from '../utils/navigation';

const Features = ({ onNavigateToForm }) => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Content Generation",
      description: "Leverage advanced Gemini AI to create engaging, contextually relevant LinkedIn posts that resonate with your audience.",
      color: "from-purple-600 via-indigo-600 to-secondary-600"
    },
    {
      icon: Target,
      title: "Audience Targeting",
      description: "Tailor your content for specific audiences including founders, students, recruiters, VCs, and general professionals.",
      color: "from-secondary-600 via-teal-600 to-indigo-600"
    },
    {
      icon: Palette,
      title: "Multiple Tone Options",
      description: "Choose from casual, professional, storytelling, or thought-leadership tones to match your brand voice.",
      color: "from-accent-600 via-pink-600 to-purple-600"
    },
    {
      icon: Clock,
      title: "Flexible Post Lengths",
      description: "Generate short, medium, or long posts based on your content strategy and audience preferences.",
      color: "from-indigo-600 via-purple-600 to-accent-600"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Create content in English, Spanish, French, German, and Portuguese to reach global audiences.",
      color: "from-secondary-600 via-accent-600 to-pink-600"
    },
    {
      icon: Hash,
      title: "Smart Hashtag Integration",
      description: "Automatically include relevant hashtags and call-to-action elements for maximum engagement.",
      color: "from-accent-600 via-purple-600 to-secondary-600"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track token usage, response times, and generation efficiency to optimize your content strategy.",
      color: "from-purple-600 via-secondary-600 to-indigo-600"
    },
    {
      icon: BookOpen,
      title: "Post Management",
      description: "Save, organize, and manage your generated posts for future reference and repurposing.",
      color: "from-indigo-600 via-purple-600 to-secondary-600"
    },
    {
      icon: TrendingUp,
      title: "Viral Optimization",
      description: "AI-optimized content structure and engagement patterns designed to maximize reach and interaction.",
      color: "from-accent-600 via-indigo-600 to-purple-600"
    },
 
  
   
  ];

  return (
    <section id="features" className="py-20 relative">
      {/* Background floating elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-accent-500/10 to-purple-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text-animated">Powerful Features</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Everything you need to create engaging LinkedIn content that drives engagement, 
            builds your personal brand, and grows your professional network.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-card p-6 hover-card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto hover-card">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your LinkedIn Presence?
            </h3>
            <p className="text-white/70 mb-6">
              Join thousands of professionals who are already using AI Postsmith to create 
              engaging content that drives real results.
            </p>
            <motion.button
              className="glass-button-accent text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (onNavigateToForm) {
                  onNavigateToForm();
                } else {
                  safeScrollToSection('hero');
                }
              }}
            >
              <Sparkles className="w-5 h-5 mr-2 inline" />
              Start Creating Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
