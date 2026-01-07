import { motion } from 'motion/react';
import { useApp } from '../App';
import { 
  ArrowLeft, 
  Shield, 
  UserX, 
  Clock, 
  Lock, 
  RotateCcw,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export function PrivacyEthics() {
  const { setCurrentScreen, isDarkMode } = useApp();

  const principles = [
    {
      icon: UserX,
      title: 'No Medical Diagnosis',
      description: 'AAA does not diagnose conditions. It provides temporary support tools that you control.',
      color: isDarkMode ? 'from-red-600 to-pink-600' : 'from-red-500 to-pink-500',
      bgColor: isDarkMode ? 'bg-red-500/10' : 'bg-red-50',
    },
    {
      icon: Clock,
      title: 'Temporary Support',
      description: 'All accessibility modes are time-limited and reversible. Nothing is permanent.',
      color: isDarkMode ? 'from-blue-600 to-cyan-600' : 'from-blue-500 to-cyan-500',
      bgColor: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
    },
    {
      icon: RotateCcw,
      title: 'User-Controlled',
      description: 'You decide what changes to make, when to make them, and when to turn them off.',
      color: isDarkMode ? 'from-green-600 to-teal-600' : 'from-green-500 to-teal-500',
      bgColor: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your preferences are stored locally on your device. No sensitive data is shared.',
      color: isDarkMode ? 'from-purple-600 to-indigo-600' : 'from-purple-500 to-indigo-500',
      bgColor: isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50',
    },
    {
      icon: Shield,
      title: 'No Labeling',
      description: 'AAA never assigns permanent labels or categories based on your accessibility needs.',
      color: isDarkMode ? 'from-orange-600 to-amber-600' : 'from-orange-500 to-amber-500',
      bgColor: isDarkMode ? 'bg-orange-500/10' : 'bg-orange-50',
    },
    {
      icon: CheckCircle2,
      title: 'Reversible Settings',
      description: 'Every change can be undone instantly. You can return to default settings anytime.',
      color: isDarkMode ? 'from-violet-600 to-fuchsia-600' : 'from-violet-500 to-fuchsia-500',
      bgColor: isDarkMode ? 'bg-violet-500/10' : 'bg-violet-50',
    },
  ];

  const ethicsCommitments = [
    'Designed for temporary and invisible challenges',
    'Respects user autonomy at all times',
    'No collection of sensitive health information',
    'Transparent about AI capabilities and limitations',
    'Follows WCAG accessibility guidelines',
    'Built with inclusive design principles',
  ];

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
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Shield className={isDarkMode ? 'text-green-400' : 'text-green-600'} size={48} />
            </motion.div>
          </div>
          <h1 className={`font-bold tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`} style={{ fontSize: '2rem' }}>
            Your Privacy & Control
          </h1>
          <p className={`max-w-2xl mx-auto ${
            isDarkMode ? 'text-purple-200' : 'text-slate-600'
          }`}>
            AAA is built on ethical principles that prioritize your autonomy, privacy, and dignity
          </p>
        </motion.div>

        {/* Hero Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-8 rounded-3xl border text-center ${
            isDarkMode
              ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl border-purple-500/20'
              : 'bg-gradient-to-br from-purple-100 to-blue-100 border-purple-200'
          }`}
        >
          <Sparkles className={`mx-auto mb-4 ${
            isDarkMode ? 'text-purple-400' : 'text-purple-600'
          }`} size={32} />
          <p className={`text-lg font-medium ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            "This product does NOT diagnose medical conditions. All accessibility changes are user-controlled, temporary, and reversible."
          </p>
        </motion.div>

        {/* Core Principles */}
        <div className="space-y-4">
          <h2 className={`font-semibold ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`} style={{ fontSize: '1.5rem' }}>
            Core Principles
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`p-6 rounded-2xl border ${
                    isDarkMode
                      ? 'bg-white/5 backdrop-blur-xl border-white/10'
                      : 'bg-white/60 backdrop-blur-xl border-white/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${principle.color} flex-shrink-0`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}>
                        {principle.title}
                      </h3>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ethics Commitments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-white/5 backdrop-blur-xl border-white/10'
              : 'bg-white/60 backdrop-blur-xl border-white/50'
          }`}
        >
          <h3 className={`font-semibold mb-4 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Our Commitments
          </h3>
          <ul className="space-y-3">
            {ethicsCommitments.map((commitment, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className={`flex items-start gap-3 ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                <CheckCircle2 
                  size={20} 
                  className={`flex-shrink-0 mt-0.5 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} 
                />
                <span>{commitment}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Data & Security */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-blue-500/10 border-blue-500/20'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <Lock className={`flex-shrink-0 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} size={32} />
            <div>
              <h3 className={`font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Data Storage & Security
              </h3>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-blue-200' : 'text-blue-800'
              }`}>
                Your accessibility preferences are stored locally on your device using secure browser storage.
              </p>
              <ul className={`text-sm space-y-1 ${
                isDarkMode ? 'text-blue-200' : 'text-blue-700'
              }`}>
                <li>• No server-side tracking</li>
                <li>• No third-party data sharing</li>
                <li>• You can clear all data anytime</li>
                <li>• No personally identifiable information collected</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Microsoft Imagine Cup Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className={`p-6 rounded-2xl border text-center ${
            isDarkMode
              ? 'bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/20'
              : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} size={20} />
            <span className={`font-semibold ${
              isDarkMode ? 'text-purple-300' : 'text-purple-700'
            }`}>
              Microsoft Imagine Cup 2026
            </span>
          </div>
          <p className={`text-sm ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Building technology that empowers everyone
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap gap-3 justify-center pt-4"
        >
          <button
            onClick={() => setCurrentScreen('modes')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
            } shadow-lg`}
          >
            Get Started
          </button>
          <button
            onClick={() => setCurrentScreen('settings')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${
              isDarkMode
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-white/60 text-slate-700 hover:bg-white/80'
            }`}
          >
            Settings
          </button>
        </motion.div>
      </div>
    </div>
  );
}
