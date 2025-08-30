import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  PenTool, 
  Sparkles, 
  Shield, 
  CheckCircle,
  Clock
} from 'lucide-react';

const GenerationProgress = ({ currentStep, steps, isGenerating, error }) => {
  const stepConfigs = {
    'planning': {
      icon: FileText,
      title: 'Planning Outline',
      description: 'Creating strategic content structure',
      color: 'from-purple-600 to-indigo-600'
    },
    'drafting': {
      icon: PenTool,
      title: 'Generating Drafts',
      description: 'Writing multiple post variations',
      color: 'from-indigo-600 to-secondary-600'
    },
    'polishing': {
      icon: Sparkles,
      title: 'Polishing Posts',
      description: 'Adding hashtags and optimizing content',
      color: 'from-secondary-600 to-accent-600'
    },
    'guardrails': {
      icon: Shield,
      title: 'Applying Guardrails',
      description: 'Content moderation and safety checks',
      color: 'from-accent-600 to-pink-600'
    },
    'complete': {
      icon: CheckCircle,
      title: 'Generation Complete',
      description: 'Posts ready for use',
      color: 'from-green-600 to-emerald-600'
    }
  };

  const getStepStatus = (stepName) => {
    if (error && stepName === currentStep) return 'error';
    if (stepName === currentStep && isGenerating) return 'active';
    if (steps.includes(stepName)) return 'completed';
    return 'pending';
  };

  const getStepIcon = (stepName) => {
    const config = stepConfigs[stepName];
    if (!config) return Clock;
    
    const IconComponent = config.icon;
    const status = getStepStatus(stepName);
    
    let iconColor = 'text-white/40';
    if (status === 'active') iconColor = 'text-white';
    if (status === 'completed') iconColor = 'text-green-400';
    if (status === 'error') iconColor = 'text-red-400';
    
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconColor}`}>
        {status === 'completed' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <IconComponent className="w-5 h-5" />
        )}
      </div>
    );
  };

  const getStepStyle = (stepName) => {
    const status = getStepStatus(stepName);
    const config = stepConfigs[stepName];
    
    if (status === 'completed') {
      return 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30';
    }
    if (status === 'active') {
      return `bg-gradient-to-r ${config?.color} bg-opacity-20 border-opacity-50`;
    }
    if (status === 'error') {
      return 'bg-red-600/20 border-red-500/30';
    }
    return 'bg-white/5 border-white/10';
  };

  return (
    <div className="glass-card p-6 mb-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {isGenerating ? 'AI Generation in Progress' : 'Generation Complete'}
        </h3>
        <p className="text-white/60">
          {isGenerating 
            ? 'Our AI is crafting your posts step by step...' 
            : 'Your posts have been generated successfully!'
          }
        </p>
      </div>

      <div className="space-y-4">
        {Object.keys(stepConfigs).map((stepName, index) => {
          const config = stepConfigs[stepName];
          const status = getStepStatus(stepName);
          const isActive = status === 'active';
          
          return (
            <motion.div
              key={stepName}
              className={`glass-card p-4 border transition-all duration-300 ${
                getStepStyle(stepName)
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getStepIcon(stepName)}
                </div>
                
                <div className="flex-1">
                  <h4 className="text-white font-medium">{config.title}</h4>
                  <p className="text-white/60 text-sm">{config.description}</p>
                </div>
                
                <div className="flex-shrink-0">
                  {status === 'active' && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {status === 'error' && (
                    <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                  )}
                </div>
              </div>
              
              {isActive && (
                <motion.div
                  className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                >
                  <div className={`h-full bg-gradient-to-r ${config.color} rounded-full`}></div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {error && (
        <motion.div
          className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-red-300 text-center">
            ❌ Generation failed: {error}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default GenerationProgress;
