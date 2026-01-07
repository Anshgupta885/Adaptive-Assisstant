import { motion } from 'motion/react';
import { useApp } from '../App';
import { 
  Sparkles, 
  Eye, 
  Brain, 
  HandHeart, 
  Mic, 
  Shield,
  Settings 
} from 'lucide-react';

export function WelcomeScreen() {
  const { setCurrentScreen, isDarkMode, reduceMotion } = useApp();

  const floatingIcons = [
    { Icon: Eye, delay: 0, x: '10%', y: '20%' },
    { Icon: Brain, delay: 0.2, x: '80%', y: '15%' },
    { Icon: HandHeart, delay: 0.4, x: '15%', y: '70%' },
    { Icon: Mic, delay: 0.6, x: '85%', y: '75%' },
    { Icon: Shield, delay: 0.8, x: '50%', y: '85%' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center p-6">
      {/* Floating Icons Background */}
      {!reduceMotion && floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className={`absolute ${isDarkMode ? 'text-purple-400/20' : 'text-purple-300/30'}`}
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3"
        >
          <div className={`p-4 rounded-2xl ${
            isDarkMode 
              ? 'bg-gradient-to-br from-purple-600 to-blue-600' 
              : 'bg-gradient-to-br from-purple-500 to-blue-500'
          } shadow-2xl`}>
            <Sparkles size={40} className="text-white" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className={`font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`} style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
            Accessibility that adapts in real time
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-purple-200' : 'text-slate-600'
          }`}>
            Support for temporary and invisible challenges — without labels or permanent settings
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            'Post-surgery recovery',
            'Migraines & eye strain',
            'ADHD & anxiety',
            'Reduced motor control'
          ].map((feature, i) => (
            <span
              key={i}
              className={`px-4 py-2 rounded-full text-sm ${
                isDarkMode
                  ? 'bg-white/10 backdrop-blur-xl text-purple-200 border border-white/20'
                  : 'bg-white/60 backdrop-blur-xl text-purple-700 border border-purple-200'
              }`}
            >
              {feature}
            </span>
          ))}
        </motion.div>

        {/* Ethical Reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white/40 backdrop-blur-xl border-white/50'
          } shadow-lg`}
        >
          <Shield className={`mx-auto mb-3 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`} size={32} />
          <p className={`font-medium ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            No diagnosis. No permanent labels. You stay in control.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => setCurrentScreen('modes')}
            className={`group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                : 'bg-gradient-to-r from-purple-500 to-blue-500'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Start Adaptive Support
              <Sparkles size={20} />
            </span>
          </button>

          <button
            onClick={() => setCurrentScreen('privacy')}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 ${
              isDarkMode
                ? 'bg-white/10 backdrop-blur-xl text-white border border-white/20 hover:bg-white/20'
                : 'bg-white/60 backdrop-blur-xl text-slate-700 border border-white/50 hover:bg-white/80'
            }`}
          >
            Learn About Privacy
          </button>
        </motion.div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="pt-8"
        >
          <button
            onClick={() => setCurrentScreen('settings')}
            className={`flex items-center gap-2 mx-auto ${
              isDarkMode ? 'text-purple-300 hover:text-purple-100' : 'text-purple-600 hover:text-purple-800'
            } transition-colors`}
          >
            <Settings size={20} />
            <span className="text-sm">Accessibility Settings</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
