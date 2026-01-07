import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { ArrowLeft, Mail, Lock, LogIn, User, UserPlus } from 'lucide-react';

export function Login() {
  const { setCurrentScreen, isDarkMode } = useApp();
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'signin') {
      // Redirect to home page
      setCurrentScreen('welcome');
    } else {
      // Redirect to sign in section
      setActiveTab('signin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl ${
          isDarkMode
            ? 'bg-white/5 backdrop-blur-xl border-white/10'
            : 'bg-white/80 backdrop-blur-xl border-white/50'
        }`}
      >
        <button
          onClick={() => setCurrentScreen('welcome')}
          className={`mb-6 p-2 rounded-xl transition-colors ${
            isDarkMode 
              ? 'hover:bg-white/10 text-white' 
              : 'hover:bg-black/5 text-slate-900'
          }`}
        >
          <ArrowLeft size={24} />
        </button>

        {/* Tab Switcher */}
        <div className={`flex p-1 mb-8 rounded-xl ${
          isDarkMode ? 'bg-white/10' : 'bg-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'signin'
                ? isDarkMode 
                  ? 'bg-white/20 text-white shadow-sm' 
                  : 'bg-white text-slate-900 shadow-sm'
                : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'signup'
                ? isDarkMode 
                  ? 'bg-white/20 text-white shadow-sm' 
                  : 'bg-white text-slate-900 shadow-sm'
                : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center mb-6">
          <h2 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
            {activeTab === 'signin' 
              ? 'Sign in to access your saved preferences' 
              : 'Join us to personalize your accessibility journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {activeTab === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`} size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-600'
                          : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-400'
                      }`}
                      required={activeTab === 'signup'}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`} size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-600'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-400'
                }`}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-sm font-medium ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`} size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-600'
                    : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-400'
                }`}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 mt-6 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {activeTab === 'signin' ? <LogIn size={20} /> : <UserPlus size={20} />}
              <span>{activeTab === 'signin' ? 'Sign In' : 'Create Account'}</span>
            </div>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => activeTab === 'signup' && setActiveTab('signin')}
            className={`text-sm hover:underline ${
              isDarkMode ? 'text-purple-300' : 'text-purple-600'
            }`}
          >
            {activeTab === 'signin' ? 'Forgot your password?' : 'Already have an account? Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}