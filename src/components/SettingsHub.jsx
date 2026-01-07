import { motion } from 'motion/react';
import { useApp } from '../App';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Contrast, 
  Type,
  Zap,
  Volume2,
  Settings as SettingsIcon
} from 'lucide-react';

export function SettingsHub() {
  const { 
    setCurrentScreen, 
    isDarkMode, 
    setIsDarkMode,
    isHighContrast,
    setIsHighContrast,
    fontSize,
    setFontSize,
    reduceMotion,
    setReduceMotion
  } = useApp();

  const previewText = "The quick brown fox jumps over the lazy dog. This is how your text will look with current settings.";

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
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-2">
            <SettingsIcon className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} size={28} />
            <h1 className={`font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`} style={{ fontSize: '2rem' }}>
              Accessibility Settings
            </h1>
          </div>
          <p className={isDarkMode ? 'text-purple-200' : 'text-slate-600'}>
            Customize your experience with real-time preview
          </p>
        </motion.div>

        {/* Preview Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-3xl border ${
            isDarkMode
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white/60 backdrop-blur-xl border-white/50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Live Preview
            </h3>
            <span className={`text-xs px-3 py-1 rounded-full ${
              isDarkMode 
                ? 'bg-purple-500/20 text-purple-300' 
                : 'bg-purple-100 text-purple-700'
            }`}>
              Updates in real-time
            </span>
          </div>
          <p className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>
            {previewText}
          </p>
        </motion.div>

        {/* Settings */}
        <div className="space-y-4">
          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white/60 backdrop-blur-xl border-white/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {isDarkMode ? (
                  <div className="p-3 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700">
                    <Moon size={24} className="text-white" />
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400">
                    <Sun size={24} className="text-white" />
                  </div>
                )}
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Theme Mode
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {isDarkMode ? 'Dark mode active' : 'Light mode active'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsDarkMode(false)}
                  className={`p-3 rounded-xl transition-all ${
                    !isDarkMode
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg scale-110'
                      : isDarkMode
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Sun size={20} />
                </button>
                <button
                  onClick={() => setIsDarkMode(true)}
                  className={`p-3 rounded-xl transition-all ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-lg scale-110'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Moon size={20} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* High Contrast */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white/60 backdrop-blur-xl border-white/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  isHighContrast
                    ? 'bg-gradient-to-br from-black to-slate-900'
                    : isDarkMode
                      ? 'bg-gradient-to-br from-slate-600 to-slate-700'
                      : 'bg-gradient-to-br from-slate-400 to-slate-500'
                }`}>
                  <Contrast size={24} className="text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    High Contrast
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Improve text visibility
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  isHighContrast 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                    : isDarkMode 
                      ? 'bg-white/20' 
                      : 'bg-slate-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ left: isHighContrast ? '28px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </motion.div>

          {/* Font Size */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white/60 backdrop-blur-xl border-white/50'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <Type size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Font Size
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Current: {fontSize}px
                </p>
              </div>
              <span className={`px-3 py-1 rounded-lg font-mono ${
                isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                {fontSize}px
              </span>
            </div>

            <div className="space-y-3">
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: isDarkMode
                    ? `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${((fontSize - 12) / 12) * 100}%, rgba(255,255,255,0.2) ${((fontSize - 12) / 12) * 100}%, rgba(255,255,255,0.2) 100%)`
                    : `linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(59, 130, 246) ${((fontSize - 12) / 12) * 100}%, rgb(203, 213, 225) ${((fontSize - 12) / 12) * 100}%, rgb(203, 213, 225) 100%)`
                }}
              />
              <div className="flex justify-between text-xs">
                {[12, 14, 16, 18, 20, 22, 24].map(size => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-2 py-1 rounded transition-colors ${
                      fontSize === size
                        ? isDarkMode
                          ? 'bg-blue-500 text-white'
                          : 'bg-blue-500 text-white'
                        : isDarkMode
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Reduce Motion */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white/60 backdrop-blur-xl border-white/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    Reduce Motion
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Minimize animations
                  </p>
                </div>
              </div>

              <button
                onClick={() => setReduceMotion(!reduceMotion)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  reduceMotion 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                    : isDarkMode 
                      ? 'bg-white/20' 
                      : 'bg-slate-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{ left: reduceMotion ? '28px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </motion.div>

          {/* Voice Sensitivity (Mock) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-white/5 backdrop-blur-xl border-white/10'
                : 'bg-white/60 backdrop-blur-xl border-white/50'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500">
                <Volume2 size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  Voice Sensitivity
                </h3>
                <p className={`text-sm ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Adjust voice detection
                </p>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: isDarkMode
                  ? 'linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) 70%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.2) 100%)'
                  : 'linear-gradient(to right, rgb(34, 197, 94) 0%, rgb(34, 197, 94) 70%, rgb(203, 213, 225) 70%, rgb(203, 213, 225) 100%)'
              }}
            />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center pt-4"
        >
          <button
            onClick={() => setCurrentScreen('modes')}
            className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
            } shadow-lg`}
          >
            Browse Modes
          </button>
          <button
            onClick={() => setCurrentScreen('privacy')}
            className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            Privacy & Ethics
          </button>
        </motion.div>
      </div>
    </div>
  );
}
