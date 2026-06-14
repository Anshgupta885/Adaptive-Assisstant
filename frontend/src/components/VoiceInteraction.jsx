import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { 
  ArrowLeft, 
  Mic, 
  MicOff,
  CheckCircle2,
  Volume2
} from 'lucide-react';

export function VoiceInteraction() {
  const { setCurrentScreen, isDarkMode, reduceMotion } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [response, setResponse] = useState('');
  const [waveformHeights, setWaveformHeights] = useState(Array(20).fill(20));

  const exampleCommands = [
    'Simplify this',
    'Read this aloud',
    'Switch to Low Focus Mode',
    'Go back',
    'Increase font size',
    'Enable high contrast',
  ];

  // Simulate waveform animation
  useEffect(() => {
    if (!isListening) return;

    const interval = setInterval(() => {
      setWaveformHeights(prev => 
        prev.map(() => Math.random() * 60 + 20)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isListening]);

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setRecognizedText('');
      setResponse('');

      // Simulate speech recognition
      setTimeout(() => {
        const randomCommand = exampleCommands[Math.floor(Math.random() * exampleCommands.length)];
        setRecognizedText(randomCommand);
        
        setTimeout(() => {
          setIsListening(false);
          
          // Generate response
          if (randomCommand.includes('Simplify')) {
            setResponse('Content simplified. Reading level reduced to grade 6.');
          } else if (randomCommand.includes('Read')) {
            setResponse('Reading content aloud. Tap to pause.');
          } else if (randomCommand.includes('Focus Mode')) {
            setResponse('Low Focus Mode activated. Interface simplified.');
          } else if (randomCommand.includes('back')) {
            setResponse('Going back to previous screen.');
          } else if (randomCommand.includes('font')) {
            setResponse('Font size increased to 18pt.');
          } else if (randomCommand.includes('contrast')) {
            setResponse('High contrast mode enabled.');
          }
        }, 2000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-8">
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
            Voice-First Navigation
          </h1>
          <p className={isDarkMode ? 'text-purple-200' : 'text-slate-600'}>
            Use your voice to control accessibility features
          </p>
        </motion.div>

        {/* Microphone Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            onClick={handleMicClick}
            className={`relative w-40 h-40 rounded-full transition-all hover:scale-105 active:scale-95 ${
              isListening
                ? 'bg-gradient-to-br from-red-500 to-pink-500 shadow-2xl'
                : isDarkMode
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-xl hover:shadow-2xl'
                  : 'bg-gradient-to-br from-purple-500 to-blue-500 shadow-xl hover:shadow-2xl'
            }`}
          >
            {/* Pulse Animation */}
            {isListening && !reduceMotion && (
              <>
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-400"
                  animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-400"
                  animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}

            {/* Icon */}
            {isListening ? (
              <Mic size={64} className="absolute inset-0 m-auto text-white" />
            ) : (
              <MicOff size={64} className="absolute inset-0 m-auto text-white opacity-60" />
            )}
          </button>
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className={`font-medium ${
            isListening
              ? isDarkMode ? 'text-red-300' : 'text-red-600'
              : isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {isListening ? 'Listening...' : 'Tap microphone to speak'}
          </p>
        </motion.div>

        {/* Waveform */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-center gap-1 h-24"
            >
              {waveformHeights.map((height, i) => (
                <motion.div
                  key={i}
                  className={`w-2 rounded-full ${
                    isDarkMode ? 'bg-red-400' : 'bg-red-500'
                  }`}
                  animate={{ height: reduceMotion ? 40 : height }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recognized Text */}
        <AnimatePresence>
          {recognizedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl border ${
                isDarkMode
                  ? 'bg-white/5 backdrop-blur-xl border-white/10'
                  : 'bg-white/60 backdrop-blur-xl border-white/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <Mic className={isDarkMode ? 'text-purple-400 flex-shrink-0' : 'text-purple-600 flex-shrink-0'} size={24} />
                <div className="flex-1">
                  <p className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-purple-300' : 'text-purple-600'
                  }`}>
                    You said:
                  </p>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`} style={{ fontSize: '1.25rem' }}>
                    "{recognizedText}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-6 rounded-2xl border ${
                isDarkMode
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className={`flex-shrink-0 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`} size={24} />
                <div className="flex-1">
                  <p className={`text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-green-300' : 'text-green-700'
                  }`}>
                    Assistant:
                  </p>
                  <p className={`font-medium ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`} style={{ fontSize: '1.125rem' }}>
                    {response}
                  </p>
                </div>
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'hover:bg-white/10 text-green-300'
                      : 'hover:bg-green-100 text-green-700'
                  }`}
                >
                  <Volume2 size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Example Commands */}
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
            Try saying:
          </h3>
          <div className="flex flex-wrap gap-2">
            {exampleCommands.map((command, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                onClick={() => {
                  setRecognizedText(command);
                  setTimeout(() => {
                    if (command.includes('Simplify')) {
                      setResponse('Content simplified. Reading level reduced to grade 6.');
                    } else if (command.includes('Read')) {
                      setResponse('Reading content aloud. Tap to pause.');
                    } else if (command.includes('Focus Mode')) {
                      setResponse('Low Focus Mode activated. Interface simplified.');
                    } else if (command.includes('back')) {
                      setResponse('Going back to previous screen.');
                    } else if (command.includes('font')) {
                      setResponse('Font size increased to 18pt.');
                    } else if (command.includes('contrast')) {
                      setResponse('High contrast mode enabled.');
                    }
                  }, 500);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all hover:scale-105 ${
                  isDarkMode
                    ? 'bg-white/10 text-purple-200 hover:bg-white/20'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                "{command}"
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className={`text-center text-sm ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          <p>Voice commands are processed locally and securely</p>
        </motion.div>
      </div>
    </div>
  );
}
