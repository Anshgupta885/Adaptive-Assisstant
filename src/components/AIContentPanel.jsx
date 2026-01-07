import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2,
  List,
  Volume2,
  Zap
} from 'lucide-react';

export function AIContentPanel() {
  const { setCurrentScreen, isDarkMode, reduceMotion } = useApp();
  const [activeTransform, setActiveTransform] = useState('original');
  const [isProcessing, setIsProcessing] = useState(false);

  const content = {
    original: {
      label: 'Original',
      text: 'To complete your enrollment, please navigate to the member portal using your credentials. Once authenticated, proceed to the benefits section where you can review available plan options. After selecting your preferred coverage tier, you must complete the dependent information form if applicable, then submit the enrollment application before the deadline.',
    },
    simplified: {
      label: 'Simplified',
      text: 'To sign up: Log in to the member portal. Go to benefits. Choose your plan. Add family members if needed. Submit before the deadline.',
    },
    stepByStep: {
      label: 'Step-by-Step',
      steps: [
        'Log in to the member portal with your username and password',
        'Click on the "Benefits" section',
        'Look at the different health plans',
        'Pick the plan that works for you',
        'Add your family members (if you have any)',
        'Click "Submit" before the deadline',
      ],
    },
    voiceFriendly: {
      label: 'Voice-Friendly',
      text: 'Here is what to do. First, log in. Then, go to benefits. Next, pick your plan. After that, add family if needed. Finally, submit.',
    },
  };

  const handleTransform = (type) => {
    setIsProcessing(true);
    setTimeout(() => {
      setActiveTransform(type);
      setIsProcessing(false);
    }, 800);
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
          <div className="flex items-center justify-center gap-2">
            <Sparkles className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} size={28} />
            <h1 className={`font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`} style={{ fontSize: '2rem' }}>
              AI Content Assistant
            </h1>
          </div>
          <p className={isDarkMode ? 'text-purple-200' : 'text-slate-600'}>
            Transform complex text into formats that work better for you
          </p>
        </motion.div>

        {/* Responsible AI Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-4 rounded-2xl border text-center ${
            isDarkMode
              ? 'bg-blue-500/10 border-blue-500/20'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <p className={`text-sm font-medium ${
            isDarkMode ? 'text-blue-300' : 'text-blue-700'
          }`}>
            ⚡ Powered by Responsible AI — No medical inference
          </p>
        </motion.div>

        {/* Transform Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <button
            onClick={() => handleTransform('original')}
            className={`p-4 rounded-2xl font-medium transition-all hover:scale-105 active:scale-95 ${
              activeTransform === 'original'
                ? 'bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-lg'
                : isDarkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            Original
          </button>

          <button
            onClick={() => handleTransform('simplified')}
            className={`p-4 rounded-2xl font-medium transition-all hover:scale-105 active:scale-95 ${
              activeTransform === 'simplified'
                ? 'bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg'
                : isDarkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            <Zap size={18} className="mx-auto mb-1" />
            Simplified
          </button>

          <button
            onClick={() => handleTransform('stepByStep')}
            className={`p-4 rounded-2xl font-medium transition-all hover:scale-105 active:scale-95 ${
              activeTransform === 'stepByStep'
                ? 'bg-gradient-to-br from-green-500 to-teal-500 text-white shadow-lg'
                : isDarkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            <List size={18} className="mx-auto mb-1" />
            Step-by-Step
          </button>

          <button
            onClick={() => handleTransform('voiceFriendly')}
            className={`p-4 rounded-2xl font-medium transition-all hover:scale-105 active:scale-95 ${
              activeTransform === 'voiceFriendly'
                ? 'bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg'
                : isDarkMode
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            <Volume2 size={18} className="mx-auto mb-1" />
            Voice
          </button>
        </motion.div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`p-12 rounded-3xl border text-center ${
                isDarkMode
                  ? 'bg-white/5 backdrop-blur-xl border-white/10'
                  : 'bg-white/60 backdrop-blur-xl border-white/50'
              }`}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="inline-block"
              >
                <Sparkles 
                  size={48} 
                  className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} 
                />
              </motion.div>
              <p className={`mt-4 font-medium ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Transforming content...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTransform}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
              className={`rounded-3xl border overflow-hidden ${
                isDarkMode
                  ? 'bg-white/5 backdrop-blur-xl border-white/10'
                  : 'bg-white/60 backdrop-blur-xl border-white/50'
              }`}
            >
              <div className="p-8 space-y-6">
                {/* Label */}
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`} style={{ fontSize: '1.25rem' }}>
                    {content[activeTransform].label} Version
                  </h3>
                  {activeTransform !== 'original' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                        isDarkMode
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      <span className="text-sm font-medium">Transformed</span>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                {activeTransform === 'stepByStep' ? (
                  <ol className="space-y-4">
                    {content.stepByStep.steps.map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                          isDarkMode
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {index + 1}
                        </div>
                        <p className={`pt-1 ${
                          isDarkMode ? 'text-slate-200' : 'text-slate-700'
                        }`} style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
                          {step}
                        </p>
                      </motion.li>
                    ))}
                  </ol>
                ) : (
                  <p 
                    className={activeTransform === 'original' 
                      ? isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      : isDarkMode ? 'text-slate-200' : 'text-slate-700'
                    }
                    style={{ 
                      fontSize: activeTransform === 'original' ? '1rem' : '1.25rem',
                      lineHeight: activeTransform === 'original' ? '1.6' : '1.8',
                      fontStyle: activeTransform === 'original' ? 'italic' : 'normal'
                    }}
                  >
                    {content[activeTransform].text}
                  </p>
                )}

                {/* Stats */}
                {activeTransform !== 'original' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`p-4 rounded-xl ${
                      isDarkMode 
                        ? 'bg-purple-500/10 border border-purple-500/20' 
                        : 'bg-purple-50 border border-purple-100'
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {activeTransform === 'stepByStep' ? '85%' : '70%'}
                        </div>
                        <div className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>
                          Easier
                        </div>
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          {activeTransform === 'stepByStep' ? '6' : activeTransform === 'simplified' ? '5' : '6'}
                        </div>
                        <div className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>
                          Reading Level
                        </div>
                      </div>
                      <div>
                        <div className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-slate-900'
                        }`}>
                          30 sec
                        </div>
                        <div className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>
                          Read Time
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <button
            onClick={() => setCurrentScreen('voice')}
            className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            <Volume2 size={20} />
            Read Aloud
          </button>
          <button
            onClick={() => setCurrentScreen('adaptation')}
            className={`px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            View Live Adaptation
          </button>
        </motion.div>
      </div>
    </div>
  );
}
