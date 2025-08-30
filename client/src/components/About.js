import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Shield, 
  Users, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { safeScrollToSection } from '../utils/navigation';

const About = ({ onNavigateToForm }) => {
  const stats = [
    { number: "10K+", label: "Posts Generated" },
    { number: "5K+", label: "Active Users" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "24/7", label: "AI Availability" }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation First",
      description: "We continuously push the boundaries of AI technology to deliver cutting-edge content creation tools."
    },
    {
      icon: Target,
      title: "User-Centric Design",
      description: "Every feature is designed with our users in mind, ensuring an intuitive and powerful experience."
    },
    {
      icon: Shield,
      title: "Quality & Safety",
      description: "We maintain the highest standards of content quality and safety for professional use."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Our platform grows and improves based on feedback from our vibrant user community."
    }
  ];

  const team = [
    {
      name: "AI Research Team",
      description: "Leading experts in natural language processing and content generation"
    },
    {
      name: "UX/UI Designers",
      description: "Creating intuitive interfaces that make content creation effortless"
    },
    {
      name: "Product Engineers",
      description: "Building robust, scalable systems that power millions of content generations"
    },
    {
      name: "Content Strategists",
      description: "Ensuring our AI understands the nuances of professional networking"
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      {/* Background floating elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-28 h-28 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-gradient-to-r from-secondary-500/10 to-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-accent-500/10 to-purple-500/10 rounded-full blur-2xl animate-float" style={{animationDelay: '8s'}}></div>
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
            <span className="gradient-text-animated">About AI Postsmith</span>
          </h2>
          <p className="text-xl text-white/70 max-w-4xl mx-auto">
            We're revolutionizing how professionals create LinkedIn content by combining 
            cutting-edge AI technology with deep understanding of professional networking.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="glass-card p-8 mb-16 text-center hover-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
          <p className="text-white/70 text-lg leading-relaxed max-w-3xl mx-auto">
            To democratize professional content creation by providing every professional with 
            AI-powered tools that help them build meaningful connections, establish thought leadership, 
            and grow their careers through engaging LinkedIn content.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-animated mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={value.title} className="glass-card p-6 hover-card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-purple-glow">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{value.title}</h4>
                    <p className="text-white/60 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={member.name} className="glass-card p-6 hover-card">
                <h4 className="text-lg font-semibold text-white mb-2">{member.name}</h4>
                <p className="text-white/60">{member.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technology */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">Powered by Advanced AI</h3>
          <div className="glass-card p-8 hover-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">Google Gemini AI</h4>
                <p className="text-white/70 mb-6 leading-relaxed">
                  We leverage Google's most advanced AI model to understand context, 
                  generate human-like content, and adapt to your specific needs.
                </p>
                <ul className="space-y-3">
                  {[
                    "Advanced natural language understanding",
                    "Context-aware content generation",
                    "Multi-language support",
                    "Professional tone adaptation"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-white/70">
                      <CheckCircle className="w-5 h-5 text-accent-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-purple-glow">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
                <p className="text-white/60 text-sm">State-of-the-art AI technology</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-8 max-w-2xl mx-auto hover-card">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join the Future of Content Creation
            </h3>
            <p className="text-white/70 mb-6">
              Experience the power of AI-driven content creation and transform your 
              LinkedIn presence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Start Creating
              </motion.button>
              <motion.button
                className="glass-button-secondary text-lg px-8 py-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => safeScrollToSection('features')}
              >
                <ArrowRight className="w-5 h-5 mr-2 inline" />
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
