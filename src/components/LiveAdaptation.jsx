import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { 
  ArrowLeft, 
  Type, 
  Volume2, 
  Contrast, 
  Pause,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export function LiveAdaptation() {
  const { setCurrentScreen, isDarkMode, reduceMotion } = useApp();
  const [isAdapted, setIsAdapted] = useState(false);
  const [activeControls, setActiveControls] = useState({
    simplify: false,
    readAloud: false,
    contrast: false,
    reduceMotion: false,
  });

  const toggleControl = (control) => {
    setActiveControls(prev => ({ ...prev, [control]: !prev[control] }));
  };

  // Sample content
  const originalContent = {
    title: "Understanding Your Healthcare Benefits and Coverage Options",
    text: "Our comprehensive healthcare plan provides extensive coverage across multiple tiers including preventive care, diagnostic services, specialist consultations, and prescription medications. Deductibles vary based on your selected tier and family coverage status. Out-of-pocket maximums are calculated annually and reset on January 1st of each calendar year. Network providers offer discounted rates, while out-of-network services may result in higher cost-sharing responsibilities.",
  };

  const simplifiedContent = {
    title: "Your Healthcare Benefits",
    text: "Your healthcare plan covers doctor visits, tests, specialists, and medicine. You pay a deductible first, then we help with costs. Using in-network doctors costs less than out-of-network.",
  };

  const currentContent = isAdapted ? simplifiedContent : originalContent;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
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
          <div className={`flex items-center gap-2 text-sm ${
            isDarkMode ? 'text-purple-300' : 'text-purple-600'
          }`}>
            <Sparkles size={16} />
            <span>Live Adaptation Active</span>
          </div>
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
            Adaptive Interface Preview
          </h1>
          <p className={isDarkMode ? 'text-purple-200' : 'text-slate-600'}>
            Watch how content transforms in real-time to meet your needs
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className={`inline-flex p-1 rounded-2xl ${
            isDarkMode 
              ? 'bg-white/10 backdrop-blur-xl' 
              : 'bg-white/60 backdrop-blur-xl'
          }`}>
            <button
              onClick={() => setIsAdapted(false)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                !isAdapted
                  ? isDarkMode
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-purple-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-white'
                    : 'text-slate-700'
              }`}
            >
              Original View
            </button>
            <button
              onClick={() => setIsAdapted(true)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                isAdapted
                  ? isDarkMode
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-green-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'text-white'
                    : 'text-slate-700'
              }`}
            >
              Adapted View
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          layout
          className={`relative rounded-3xl border overflow-hidden ${
            isDarkMode
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white/60 backdrop-blur-xl border-white/50'
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isAdapted ? 'adapted' : 'original'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
              className="p-8 space-y-6"
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  isAdapted
                    ? isDarkMode
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-green-100 text-green-700 border border-green-200'
                    : isDarkMode
                      ? 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {isAdapted ? (
                    <>
                      <Sparkles size={16} />
                      <span className="text-sm font-medium">Adapted for Clarity</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} />
                      <span className="text-sm font-medium">Original Format</span>
                    </>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h2 
                  className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}
                  style={{ 
                    fontSize: isAdapted ? '1.75rem' : '1.5rem',
                    lineHeight: isAdapted ? '1.3' : '1.4'
                  }}
                >
                  {currentContent.title}
                </h2>
                <p 
                  className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}
                  style={{ 
                    fontSize: isAdapted ? '1.25rem' : '1rem',
                    lineHeight: isAdapted ? '1.8' : '1.6',
                    letterSpacing: isAdapted ? '0.01em' : '0'
                  }}
                >
                  {currentContent.text}
                </p>
              </div>

              {/* Comparison Stats */}
              {isAdapted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    isDarkMode 
                      ? 'bg-purple-500/10 border border-purple-500/20' 
                      : 'bg-purple-50 border border-purple-100'
                  }`}
                >
                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>
                        Reading Level:
                      </span>
                      <span className={`ml-2 font-semibold ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        Grade 6 (from Grade 12)
                      </span>
                    </div>
                    <div>
                      <span className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>
                        Word Count:
                      </span>
                      <span className={`ml-2 font-semibold ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        32 words (from 68)
                      </span>
                    </div>
                    <div>
                      <span className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>
                        Clarity Score:
                      </span>
                      <span className={`ml-2 font-semibold ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        95/100
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Floating AI Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`sticky bottom-6 p-4 rounded-3xl border ${
            isDarkMode
              ? 'bg-slate-900/90 backdrop-blur-xl border-white/10'
              : 'bg-white/90 backdrop-blur-xl border-white/50'
          } shadow-2xl`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              AI Controls
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-purple-600'}`}>
              Click to toggle
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => {
                toggleControl('simplify');
                setIsAdapted(!isAdapted);
              }}
              className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                activeControls.simplify
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Type size={24} />
              <span className="text-sm font-medium">Simplify</span>
            </button>

            <button
              onClick={() => toggleControl('readAloud')}
              className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                activeControls.readAloud
                  ? 'bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Volume2 size={24} />
              <span className="text-sm font-medium">Read Aloud</span>
            </button>

            <button
              onClick={() => toggleControl('contrast')}
              className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                activeControls.contrast
                  ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Contrast size={24} />
              <span className="text-sm font-medium">Contrast</span>
            </button>

            <button
              onClick={() => toggleControl('reduceMotion')}
              className={`p-4 rounded-2xl flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                activeControls.reduceMotion
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Pause size={24} />
              <span className="text-sm font-medium">Reduce Motion</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}