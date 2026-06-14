import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../App';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Shield, 
  Settings, 
  ArrowLeft,
  Zap,
  Activity,
  LogOut,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

export function UserDashboard() {
  const { setCurrentScreen, isDarkMode, logout, modes } = useApp();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Not authorized');
          setCurrentScreen('login');
          return;
        }

        const response = await fetch('http://127.0.0.1:5000/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          toast.error('Failed to load profile');
          if (response.status === 401) logout();
        }
      } catch (error) {
        toast.error('Connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setCurrentScreen, logout]);

  const activeModes = modes.filter(m => m.enabled);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
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
          <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
          <button
            onClick={logout}
            className="p-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
          >
            <LogOut size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-xl">
                <User size={48} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">{profile?.username}</h2>
              <p className="text-slate-400 text-sm">Member since 2026</p>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <Shield size={18} className="text-purple-400" />
                Personal Info
              </h3>
              <div className="space-y-3">
                <InfoRow icon={Mail} label="Email" value={profile?.email} />
                <InfoRow icon={Calendar} label="Age" value={profile?.age} />
                <InfoRow icon={Users} label="Gender" value={profile?.gender} />
                <InfoRow icon={Phone} label="Phone" value={profile?.phoneno} />
              </div>
            </div>
          </motion.div>

          {/* Active Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity size={24} className="text-green-400" />
                  Active Accessibility Features
                </h3>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                  {activeModes.length} Active
                </span>
              </div>

              {activeModes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeModes.map(mode => (
                    <motion.div
                      key={mode.id}
                      layoutId={mode.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3"
                    >
                      <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                        <Zap size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{mode.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{mode.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center space-y-4">
                  <Settings size={48} className="text-slate-600" />
                  <div>
                    <p className="text-slate-300 font-medium">No features active</p>
                    <p className="text-slate-500 text-sm">Enable accessibility modes in the selector</p>
                  </div>
                  <button
                    onClick={() => setCurrentScreen('modes')}
                    className="px-6 py-2 rounded-xl bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-colors"
                  >
                    Select Modes
                  </button>
                </div>
              )}
              
              <div className="mt-12 p-6 rounded-2xl bg-purple-600/10 border border-purple-500/20">
                <h4 className="text-purple-300 font-semibold mb-2">Live Adaptation Active</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The assistant is currently monitoring your interaction patterns to provide real-time adjustments based on your selected modes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-white/5 text-slate-400">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{label}</p>
        <p className="text-sm text-slate-200 capitalize">{value || 'Not set'}</p>
      </div>
    </div>
  );
}
