import { useState, createContext, useContext, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ModeSelector } from './components/ModeSelector';
import { LiveAdaptation } from './components/LiveAdaptation';
import { AIContentPanel } from './components/AIContentPanel';
import { VoiceInteraction } from './components/VoiceInteraction';
import { ProfilesTimeline } from './components/ProfilesTimeline';
import { SettingsHub } from './components/SettingsHub';
import { PrivacyEthics } from './components/PrivacyEthics';
import { Login } from './components/Login';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [modes, setModes] = useState([
    {
      id: 'recovery',
      name: 'Recovery Mode',
      description: 'For reduced movement or fatigue',
      enabled: false,
      features: ['Larger touch targets', 'Voice navigation', 'Simplified layouts'],
    },
    {
      id: 'low-focus',
      name: 'Low Focus Mode',
      description: 'For cognitive overload, ADHD, or anxiety',
      enabled: false,
      features: ['Reduced clutter', 'Step-by-step guidance', 'Calm colors'],
    },
    {
      id: 'eye-strain',
      name: 'Eye Strain Mode',
      description: 'For migraines or tired eyes',
      enabled: false,
      features: ['High contrast', 'Reduced motion', 'Larger fonts'],
    },
    {
      id: 'voice-first',
      name: 'Voice-First Mode',
      description: 'Hands-free interaction',
      enabled: false,
      features: ['Voice commands', 'Audio feedback', 'Speech recognition'],
    },
  ]);

  const toggleMode = (id) => {
    setModes(prev => prev.map(mode =>
      mode.id === id
        ? { ...mode, enabled: !mode.enabled, duration: !mode.enabled ? 2 : undefined }
        : mode
    ));
  };

  const contextValue = {
    currentScreen,
    setCurrentScreen,
    isDarkMode,
    setIsDarkMode,
    isHighContrast,
    setIsHighContrast,
    fontSize,
    setFontSize,
    reduceMotion,
    setReduceMotion,
    modes,
    toggleMode,
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className="min-h-screen transition-colors duration-500"
        style={{ fontSize: `${fontSize}px` }}
      >
        {currentScreen === 'welcome' && <WelcomeScreen />}
        {currentScreen === 'modes' && <ModeSelector />}
        {currentScreen === 'adaptation' && <LiveAdaptation />}
        {currentScreen === 'ai-content' && <AIContentPanel />}
        {currentScreen === 'voice' && <VoiceInteraction />}
        {currentScreen === 'profiles' && <ProfilesTimeline />}
        {currentScreen === 'settings' && <SettingsHub />}
        {currentScreen === 'privacy' && <PrivacyEthics />}
        {currentScreen === 'login' && <Login />}
      </div>
    </AppContext.Provider>
  );
}
