import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { 
  Heart, 
  Brain, 
  Eye, 
  Mic, 
  ArrowLeft, 
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export function ModeSelector() {
  const { setCurrentScreen, isDarkMode, modes, toggleMode, reduceMotion } = useApp();
  const [expandedMode, setExpandedMode] = useState(null);

  const modeConfig = {
    'recovery': {
      icon: Heart,
      color: isDarkMode ? 'from-pink-600 to-rose-600' : 'from-pink-500 to-rose-500',
      bgColor: isDarkMode ? 'bg-pink-500/20' : 'bg-pink-100',
      textColor: isDarkMode ? 'text-pink-300' : 'text-pink-700',
    },
    'low-focus': {
      icon: Brain,
      color: isDarkMode ? 'from-purple-600 to-indigo-600' : 'from-purple-500 to-indigo-500',
      bgColor: isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100',
      textColor: isDarkMode ? 'text-purple-300' : 'text-purple-700',
    },
    'eye-strain': {
      icon: Eye,
      color: isDarkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500',
      bgColor: isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100',
      textColor: isDarkMode ? 'text-blue-300' : 'text-blue-700',
    },
    'voice-first': {
      icon: Mic,
      color: isDarkMode ? 'from-green-600 to-teal-600' : 'from-green-500 to-teal-500',
      bgColor: isDarkMode ? 'bg-green-500/20' : 'bg-green-100',
      textColor: isDarkMode ? 'text-green-300' : 'text-green-700',
    },
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={() => setCurrentScreen('welcome')}
            className={`p-3 rounded-xl transition-colors ${
              isDarkMode 
                ? 'hover:bg-white/10 text-white' 
                : 'hover:bg-black/5 text-slate-900'
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentScreen('profiles')}
            className={`text-sm flex items-center gap-2 ${
              isDarkMode ? 'text-purple-300' : 'text-purple-600'
            }`}
          >
            View Active Profiles
            <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2"
        >
          <h1 className={`font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`} style={{ fontSize: '2rem' }}>
            Choose Your Accessibility Support
          </h1>
          <p className={isDarkMode ? 'text-purple-200' : 'text-slate-600'}>
            Select one or more modes based on your current needs
          </p>
        </motion.div>

        {/* Mode Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {modes.map((mode, index) => {
            const config = modeConfig[mode.id];
            const Icon = config.icon;
            const isExpanded = expandedMode === mode.id;

            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
                className={`relative rounded-3xl border overflow-hidden transition-all ${
                  isDarkMode
                    ? 'bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10'
                    : 'bg-white/60 backdrop-blur-xl border-white/50 hover:bg-white/80'
                } ${isExpanded ? 'sm:col-span-2' : ''}`}
              >
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {mode.name}
                        </h3>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {mode.description}
                        </p>
                      </div>
                    </div>

                    {/* Toggle */}
                    <button
                      onClick={() => toggleMode(mode.id)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        mode.enabled 
                          ? `bg-gradient-to-r ${config.color}` 
                          : isDarkMode 
                            ? 'bg-white/20' 
                            : 'bg-slate-300'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{ left: mode.enabled ? '28px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        {mode.enabled && (
                          <Check size={16} className={config.textColor} />
                        )}
                      </motion.div>
                    </button>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedMode(isExpanded ? null : mode.id)}
                    className={`text-sm flex items-center gap-2 ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}
                  >
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                    <ChevronRight 
                      size={16} 
                      className={`transform transition-transform ${
                        isExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3 }}
                        className="space-y-4"
                      >
                        {/* Features */}
                        <div className={`p-4 rounded-xl ${config.bgColor}`}>
                          <h4 className={`font-semibold mb-2 ${config.textColor}`}>
                            What will change:
                          </h4>
                          <ul className="space-y-2">
                            {mode.features.map((feature, i) => (
                              <li key={i} className={`flex items-center gap-2 text-sm ${
                                isDarkMode ? 'text-slate-200' : 'text-slate-700'
                              }`}>
                                <Check size={16} className={config.textColor} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Preview Button */}
                        <button
                          onClick={() => {
                            if (mode.id === 'voice-first') {
                              setCurrentScreen('voice');
                            } else {
                              setCurrentScreen('adaptation');
                            }
                          }}
                          className={`w-full px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                            isDarkMode
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-slate-900 text-white hover:bg-slate-800'
                          }`}
                        >
                          Preview {mode.name}
                          <Sparkles size={18} />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Active Indicator */}
                {mode.enabled && (
                  <motion.div
                    layoutId={`active-${mode.id}`}
                    className={`absolute top-0 right-0 m-4 px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}
                  >
                    Active
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center pt-4"
        >
          <button
            onClick={() => setCurrentScreen('ai-content')}
            className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            AI Content Assistant
          </button>
          <button
            onClick={() => setCurrentScreen('settings')}
            className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            Customize Settings
          </button>
        </motion.div>
      </div>
    </div>
  );
}
