import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { 
  ArrowLeft, 
  Heart, 
  Brain, 
  Eye, 
  Mic,
  Pause,
  Play,
  X,
  Clock,
  CheckCircle2
} from 'lucide-react';

export function ProfilesTimeline() {
  const { setCurrentScreen, isDarkMode, modes, toggleMode } = useApp();
  const [timeRemaining, setTimeRemaining] = useState({});

  const modeConfig = {
    'recovery': {
      icon: Heart,
      color: isDarkMode ? 'from-pink-600 to-rose-600' : 'from-pink-500 to-rose-500',
      bgColor: isDarkMode ? 'bg-pink-500/10' : 'bg-pink-50',
      textColor: isDarkMode ? 'text-pink-300' : 'text-pink-700',
    },
    'low-focus': {
      icon: Brain,
      color: isDarkMode ? 'from-purple-600 to-indigo-600' : 'from-purple-500 to-indigo-500',
      bgColor: isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50',
      textColor: isDarkMode ? 'text-purple-300' : 'text-purple-700',
    },
    'eye-strain': {
      icon: Eye,
      color: isDarkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500',
      bgColor: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
      textColor: isDarkMode ? 'text-blue-300' : 'text-blue-700',
    },
    'voice-first': {
      icon: Mic,
      color: isDarkMode ? 'from-green-600 to-teal-600' : 'from-green-500 to-teal-500',
      bgColor: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
      textColor: isDarkMode ? 'text-green-300' : 'text-green-700',
    },
  };

  // Initialize time remaining
  useEffect(() => {
    const initial = {};
    modes.forEach(mode => {
      if (mode.enabled && mode.duration) {
        initial[mode.id] = mode.duration * 60 * 60; // Convert hours to seconds
      }
    });
    setTimeRemaining(initial);
  }, [modes]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (updated[key] > 0) {
            updated[key] -= 1;
          }
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const activeModes = modes.filter(m => m.enabled);
  const hasActiveModes = activeModes.length > 0;

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
            onClick={() => setCurrentScreen('modes')}
            className={`p-3 rounded-xl transition-colors ${
              isDarkMode 
                ? 'hover:bg-white/10 text-white' 
                : 'hover:bg-black/5 text-slate-900'
            }`}
          >
            <ArrowLeft size={24} />
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
            Your Accessibility Profiles
          </h1>
          <p className={isDarkMode ? 'text-purple-200' : 'text-slate-600'}>
            Temporary settings that adapt to your current needs
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-2xl border ${
            isDarkMode
              ? 'bg-blue-500/10 border-blue-500/20'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <p className={`text-sm text-center ${
            isDarkMode ? 'text-blue-200' : 'text-blue-700'
          }`}>
            These settings are temporary and can be changed anytime. No permanent labels.
          </p>
        </motion.div>

        {/* Active Profiles */}
        {hasActiveModes ? (
          <div className="space-y-4">
            <h2 className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Active Modes ({activeModes.length})
            </h2>
            
            <AnimatePresence>
              {activeModes.map((mode, index) => {
                const config = modeConfig[mode.id];
                const Icon = config.icon;
                const time = timeRemaining[mode.id] || 0;
                const progress = mode.duration ? (time / (mode.duration * 3600)) * 100 : 100;

                return (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                    className={`rounded-3xl border overflow-hidden ${
                      isDarkMode
                        ? 'bg-white/5 backdrop-blur-xl border-white/10'
                        : 'bg-white/60 backdrop-blur-xl border-white/50'
                    }`}
                  >
                    {/* Progress Bar */}
                    <div className="h-1 bg-slate-200 dark:bg-slate-700">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${config.color}`}
                        initial={{ width: '100%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg`}>
                            <Icon size={24} className="text-white" />
                          </div>
                          <div>
                            <h3 className={`font-semibold mb-1 ${
                              isDarkMode ? 'text-white' : 'text-slate-900'
                            }`}>
                              {mode.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Clock size={14} className={config.textColor} />
                              <span className={`text-sm font-medium ${config.textColor}`}>
                                {formatTime(time)} remaining
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleMode(mode.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDarkMode
                              ? 'hover:bg-white/10 text-red-400'
                              : 'hover:bg-red-50 text-red-600'
                          }`}
                          title="Disable mode"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Features */}
                      <div className={`p-4 rounded-xl ${config.bgColor}`}>
                        <h4 className={`text-sm font-semibold mb-2 ${config.textColor}`}>
                          Active Features:
                        </h4>
                        <ul className="space-y-1">
                          {mode.features.map((feature, i) => (
                            <li key={i} className={`flex items-center gap-2 text-sm ${
                              isDarkMode ? 'text-slate-200' : 'text-slate-700'
                            }`}>
                              <CheckCircle2 size={14} className={config.textColor} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <button
                          className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                            isDarkMode
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Pause size={16} className="inline mr-2" />
                          Pause
                        </button>
                        <button
                          onClick={() => {
                            // Add more time
                            setTimeRemaining(prev => ({
                              ...prev,
                              [mode.id]: (prev[mode.id] || 0) + 3600
                            }));
                          }}
                          className={`flex-1 px-4 py-2 rounded-xl font-medium transition-all hover:scale-105 ${
                            isDarkMode
                              ? 'bg-white/10 text-white hover:bg-white/20'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <Clock size={16} className="inline mr-2" />
                          +1 Hour
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-12 rounded-3xl border text-center ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white/40 backdrop-blur-xl border-white/50'
            }`}
          >
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
              isDarkMode ? 'bg-purple-500/20' : 'bg-purple-100'
            }`}>
              <Play size={32} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
            </div>
            <h3 className={`font-semibold mb-2 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`} style={{ fontSize: '1.25rem' }}>
              No Active Profiles
            </h3>
            <p className={`mb-6 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Choose accessibility modes to get started
            </p>
            <button
              onClick={() => setCurrentScreen('modes')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
              } shadow-lg`}
            >
              Browse Modes
            </button>
          </motion.div>
        )}

        {/* Quick Stats */}
        {hasActiveModes && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white/40 backdrop-blur-xl border-white/50'
            }`}
          >
            <h3 className={`font-semibold mb-4 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Quick Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {activeModes.length}
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Active Modes
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {activeModes.reduce((sum, m) => sum + m.features.length, 0)}
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Features Enabled
                </div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  100%
                </div>
                <div className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Your Control
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
