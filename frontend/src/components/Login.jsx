import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { ArrowLeft, Mail, Lock, LogIn, User, UserPlus, Phone, Calendar, Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const { setCurrentScreen, isDarkMode, setUser } = useApp();
  const [activeTab, setActiveTab] = useState('signin');
  const [loading, setLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phoneno, setPhoneno] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted. Mode:', activeTab);
    setLoading(true);

    try {
      if (activeTab === 'signin') {
        console.log('Attempting sign in for:', email);
        const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        console.log('Response received status:', response.status);
        const data = await response.json();

        if (response.ok) {
          console.log('Login successful');
          toast.success('Login successful!');
          localStorage.setItem('token', data.token);
          setUser({ loggedIn: true });
          setCurrentScreen('welcome');
        } else {
          console.error('Login failed:', data.message);
          toast.error(data.message || 'Login failed');
        }
      } else {
        console.log('Attempting registration for:', email);
        const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, age: Number(age), gender, phoneno }),
        });

        console.log('Response received status:', response.status);
        const data = await response.json();

        if (response.ok) {
          console.log('Registration successful');
          toast.success('Account created! Please sign in.');
          setActiveTab('signin');
        } else {
          console.error('Registration failed:', data.message);
          toast.error(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Network or server error:', error);
      toast.error('Connection error. Is the server running on port 5000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 py-12">
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
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden space-y-4"
              >
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Username
                  </label>
                  <div className="relative">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`} size={20} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="johndoe123"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-600'
                          : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-400'
                      }`}
                      required={activeTab === 'signup'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Age
                    </label>
                    <div className="relative">
                      <Calendar className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} size={20} />
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="25"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-600'
                            : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 placeholder:text-slate-400'
                        }`}
                        required={activeTab === 'signup'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Gender
                    </label>
                    <div className="relative">
                      <Users className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`} size={20} />
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all appearance-none ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                            : 'bg-white border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-500'
                        }`}
                        required={activeTab === 'signup'}
                      >
                        <option value="" disabled className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>Select</option>
                        <option value="male" className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>Male</option>
                        <option value="female" className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>Female</option>
                        <option value="other" className={isDarkMode ? 'bg-slate-900' : 'bg-white'}>Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`} size={20} />
                    <input
                      type="tel"
                      value={phoneno}
                      onChange={(e) => setPhoneno(e.target.value)}
                      placeholder="+1 (555) 000-0000"
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
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 mt-6 disabled:opacity-70 ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'
                : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : activeTab === 'signin' ? (
                <LogIn size={20} />
              ) : (
                <UserPlus size={20} />
              )}
              <span>{loading ? 'Processing...' : activeTab === 'signin' ? 'Sign In' : 'Create Account'}</span>
            </div>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => !loading && (activeTab === 'signup' ? setActiveTab('signin') : setActiveTab('signup'))}
            className={`text-sm hover:underline ${
              isDarkMode ? 'text-purple-300' : 'text-purple-600'
            }`}
          >
            {activeTab === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}