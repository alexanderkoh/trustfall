'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface AnimatedDot {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export default function MainMenu() {
  const [selectedFaction, setSelectedFaction] = useState<'lumina' | 'syndicate' | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [animatedDots, setAnimatedDots] = useState<AnimatedDot[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check for stored faction preference
    const storedFaction = localStorage.getItem('selectedFaction') as 'lumina' | 'syndicate' | null;
    if (storedFaction) {
      setSelectedFaction(storedFaction);
      // Apply theme class to body
      document.body.className = storedFaction === 'lumina' ? 'lumina-theme' : 'syndicate-theme';
    }

    // Generate animated dots client-side only
    const dots: AnimatedDot[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setAnimatedDots(dots);
  }, []);

  const handlePlayAgain = () => {
    router.push('/story');
  };

  const handleChooseFaction = () => {
    router.push('/faction-select');
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In a real app, you'd send this to your backend or service
      console.log('Email signup:', email);
      setEmailSubmitted(true);
      setTimeout(() => {
        setShowEmailForm(false);
        setEmailSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const themeColors = selectedFaction === 'lumina' 
    ? { primary: 'text-blue-400', secondary: 'text-blue-300', border: 'border-blue-400' }
    : selectedFaction === 'syndicate'
    ? { primary: 'text-red-400', secondary: 'text-red-300', border: 'border-red-400' }
    : { primary: 'text-green-400', secondary: 'text-green-300', border: 'border-green-400' };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        {animatedDots.map((dot) => (
          <motion.div
            key={dot.id}
            className={`absolute w-1 h-1 ${themeColors.primary} rounded-full`}
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              delay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className={`${themeColors.primary} retro-glow font-pixel text-3xl mb-4`}>
            TRUSTFALL
          </h1>
          <div className={`${themeColors.secondary} font-pixel text-lg mb-8`}>
            VAULT WARS
          </div>
          
          <p className={`${themeColors.secondary} font-pixel text-sm mb-12 leading-relaxed`}>
            Welcome Vault Runner. Earth-0 awaits.
          </p>
        </motion.div>

        {selectedFaction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className={`${themeColors.primary} font-pixel text-sm mb-2`}>
              FACTION STATUS:
            </div>
            <div className={`${themeColors.secondary} font-pixel text-xs retro-border ${themeColors.border} rounded px-4 py-2 inline-block`}>
              {selectedFaction === 'lumina' ? 'LUMINA COLLECTIVE MEMBER' : 'SHADOW SYNDICATE OPERATIVE'}
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={handlePlayAgain}
            className={`group w-full bg-black/80 retro-border ${themeColors.border} rounded-lg py-4 px-8 hover:bg-gray-900/80 transition-all duration-300 font-pixel text-sm ${themeColors.primary}`}
          >
            <span className="group-hover:animate-glow">
              {selectedFaction ? 'REPLAY PROTOCOL' : 'INITIALIZE PROTOCOL'}
            </span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={handleChooseFaction}
            className={`group w-full bg-black/80 retro-border ${themeColors.border} rounded-lg py-4 px-8 hover:bg-gray-900/80 transition-all duration-300 font-pixel text-sm ${themeColors.primary}`}
          >
            <span className="group-hover:animate-glow">
              {selectedFaction ? 'CHANGE FACTION' : 'CHOOSE YOUR FACTION'}
            </span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            onClick={() => setShowEmailForm(true)}
            className={`group w-full bg-black/80 retro-border ${themeColors.border} rounded-lg py-4 px-8 hover:bg-gray-900/80 transition-all duration-300 font-pixel text-sm ${themeColors.primary}`}
          >
            <span className="group-hover:animate-glow">
              JOIN EARLY ACCESS
            </span>
          </motion.button>
        </div>
      </div>

      {/* Email Form Modal */}
      {showEmailForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowEmailForm(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-black retro-border ${themeColors.border} rounded-lg p-8 max-w-md mx-4`}
            onClick={(e) => e.stopPropagation()}
          >
            {emailSubmitted ? (
              <div className="text-center">
                <div className={`${themeColors.primary} font-pixel text-lg mb-4`}>
                  ACCESS GRANTED
                </div>
                <div className={`${themeColors.secondary} font-pixel text-sm`}>
                  You'll be notified when the vaults open.
                </div>
              </div>
            ) : (
              <>
                <div className={`${themeColors.primary} font-pixel text-lg mb-4 text-center`}>
                  EARLY ACCESS SIGNUP
                </div>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your transmission code"
                    className={`w-full bg-black/60 retro-border ${themeColors.border} rounded px-4 py-3 ${themeColors.secondary} font-pixel text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-current`}
                    required
                  />
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className={`flex-1 bg-black/80 retro-border ${themeColors.border} rounded py-2 px-4 ${themeColors.primary} font-pixel text-xs hover:bg-gray-900/80 transition-colors`}
                    >
                      TRANSMIT
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className={`flex-1 bg-black/80 retro-border border-gray-600 rounded py-2 px-4 text-gray-400 font-pixel text-xs hover:bg-gray-900/80 transition-colors`}
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
