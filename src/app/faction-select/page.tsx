'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function FactionSelectPage() {
  const [selectedFaction, setSelectedFaction] = useState<'lumina' | 'syndicate' | null>(null);
  const [hoveredSide, setHoveredSide] = useState<'lumina' | 'syndicate' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint in Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load Beehiiv script when component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://subscribe-forms.beehiiv.com/embed.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Clean up script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleFactionSelect = (faction: 'lumina' | 'syndicate') => {
    setSelectedFaction(faction);
    
    // Store faction choice in localStorage
    localStorage.setItem('selectedFaction', faction);
    
    // Brief pause to show selection, then show subscription form
    setTimeout(() => {
      setShowSubscriptionForm(true);
    }, 2000);
  };

  const handleContinueToMenu = () => {
    // Mark story as completed when returning from faction selection
    localStorage.setItem('storyCompleted', 'true');
    router.push('/?from=faction-select');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      console.log('Subscribing to faction:', selectedFaction, 'with email:', email);
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          faction: selectedFaction
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Subscription API error:', data);
        throw new Error(data.error || 'Subscription failed');
      }

      console.log('Subscription successful:', data);
      
      // Success!
      setIsSubmitted(true);
      setIsSubmitting(false);

    } catch (error) {
      console.error('Subscription error:', error);
      setIsSubmitting(false);
      
      // Show user-friendly error message
      alert(`Failed to join the ${selectedFaction === 'lumina' ? 'Lumina Collective' : 'Shadow Syndicate'}. Please try again.`);
    }
  };

  // Determine which background image to show based on screen size and hover state
  const getBackgroundImage = () => {
    const prefix = isMobile ? 'slide_mobile_' : 'slide_';
    
    if (hoveredSide === 'lumina') return `/images/${prefix}hover_a.png`;
    if (hoveredSide === 'syndicate') return `/images/${prefix}hover_b.png`;
    return `/images/${prefix}faction.png`;
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      {/* Conditional Background - Dynamic images for selection, black for subscription form */}
      {!showSubscriptionForm ? (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
            style={{
              backgroundImage: `url(${getBackgroundImage()})`,
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : (
        // Solid black background for subscription form
        <div className="absolute inset-0 bg-black" />
      )}
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-8">
        {!showSubscriptionForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <h1 className="text-green-400 retro-glow font-pkmn text-2xl md:text-3xl mb-2 md:mb-3">
              CHOOSE YOUR FACTION
            </h1>
            
            <a 
              href="https://hoops.finance" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-300/60 font-pixel text-xs mb-6 md:mb-8 hover:text-green-300/90 transition-colors duration-200 cursor-pointer underline-offset-2 hover:underline"
            >
              An Experience by Hoops Finance
            </a>
            
            <p className="text-green-300 font-pkmn text-sm md:text-base mb-16 md:mb-20 leading-relaxed max-w-2xl mx-auto">
              The future of Earth-0 hangs in the balance.<br />
              Your allegiance will shape the world to come.
            </p>
          </motion.div>
        )}

        {showSubscriptionForm ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="text-center w-full flex flex-col items-center"
          >
            {/* Subscription Form */}
            <div className="flex justify-center items-center mb-8 w-full">
              <div className={`retro-border rounded-lg bg-black/40 p-6 ${
                selectedFaction === 'lumina' ? 'border-yellow-400' : 'border-purple-400'
              }`}
              style={{
                boxShadow: selectedFaction === 'lumina' 
                  ? '0 0 20px rgba(234, 179, 8, 0.5), inset 0 0 20px rgba(234, 179, 8, 0.1)' 
                  : '0 0 20px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(168, 85, 247, 0.1)'
              }}>
                {/* Terminal Header */}
                <div className={`flex items-center mb-4 pb-3 border-b ${
                  selectedFaction === 'lumina' ? 'border-yellow-400/30' : 'border-purple-400/30'
                }`}>
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    selectedFaction === 'lumina' ? 'bg-yellow-400' : 'bg-purple-400'
                  }`} />
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    selectedFaction === 'lumina' ? 'bg-yellow-400/50' : 'bg-purple-400/50'
                  }`} />
                  <div className={`w-3 h-3 rounded-full mr-4 ${
                    selectedFaction === 'lumina' ? 'bg-yellow-400/30' : 'bg-purple-400/30'
                  }`} />
                  <span className={`font-pixel text-xs ${
                    selectedFaction === 'lumina' ? 'text-yellow-300' : 'text-purple-300'
                  }`}>
                    SECURE TRANSMISSION PROTOCOL
                  </span>
                </div>

                                {/* Welcome Text Inside Terminal */}
                <div className="text-center mb-6">
                  <div className={`font-pkmn text-lg md:text-xl retro-glow mb-3 ${
                    selectedFaction === 'lumina' ? 'text-yellow-400' : 'text-purple-400'
                  }`}>
                    {selectedFaction === 'lumina' ? 'WELCOME TO THE LUMINA COLLECTIVE' : 'WELCOME TO THE SHADOW SYNDICATE'}
                  </div>
                  
                  <div className="text-green-300 font-pkmn text-xs mb-4">
                    Join your faction&apos;s communication network
                  </div>
                </div>



                {/* Custom Terminal Email Form */}
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className={`font-pkmn text-lg retro-glow mb-3 ${
                      selectedFaction === 'lumina' ? 'text-yellow-400' : 'text-purple-400'
                    }`}>
                      TRANSMISSION SUCCESSFUL
                    </div>
                    <div className="text-green-300 font-pkmn text-xs mb-4">
                      Welcome to the network, runner.
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded ${
                      selectedFaction === 'lumina' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-purple-400/20 text-purple-300'
                    } font-pkmn text-xs mb-4`}>
                      STATUS: AUTHENTICATED
                    </div>
                    <div className="text-gray-400 font-pkmn text-xs">
                      Your secure channel has been established.
                      <br />
                      Check your communications terminal for further instructions.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                                             <label className={`block font-pkmn text-xs mb-2 ${
                         selectedFaction === 'lumina' ? 'text-yellow-300' : 'text-purple-300'
                       }`}>
                         ENTER TRANSMISSION CODE:
                       </label>
                                              <motion.input
                         type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="runner@earth-0.net"
                         required
                         disabled={isSubmitting}
                         whileFocus={{
                           scale: 1.01,
                           transition: { duration: 0.2, ease: "easeOut" }
                         }}
                         className={`w-full bg-black/60 retro-border rounded px-4 py-3 font-pkmn text-sm text-green-300 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                           selectedFaction === 'lumina' 
                             ? 'border-yellow-400 focus:ring-yellow-400' 
                             : 'border-purple-400 focus:ring-purple-400'
                         }`}
                       />
                    </div>
                    
                                         <motion.button
                       type="submit"
                       disabled={isSubmitting || !email.trim()}
                       whileHover={!isSubmitting && email.trim() ? { 
                         scale: 1.02,
                         transition: { duration: 0.15, ease: "easeOut" }
                       } : {}}
                       whileTap={!isSubmitting && email.trim() ? { 
                         scale: 0.98,
                         transition: { duration: 0.1 }
                       } : {}}
                       className={`group w-full retro-border rounded-lg py-3 px-6 font-pkmn text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none ${
                         selectedFaction === 'lumina'
                           ? 'border-yellow-400 text-yellow-400 bg-yellow-950/20 hover:bg-yellow-950/40'
                           : 'border-purple-400 text-purple-400 bg-purple-950/20 hover:bg-purple-950/40'
                       }`}
                     >
                       {isSubmitting ? (
                         <div className="flex items-center justify-center">
                           <div className={`animate-spin rounded-full h-4 w-4 border-2 border-t-transparent mr-2 ${
                             selectedFaction === 'lumina' ? 'border-yellow-400' : 'border-purple-400'
                           }`} />
                          TRANSMITTING...
                        </div>
                      ) : (
                        <span className="group-hover:animate-glow">
                          INITIATE SECURE TRANSMISSION
                        </span>
                                             )}
                     </motion.button>
                  </form>
                )}
              </div>
            </div>

            {/* Continue Button */}
            <motion.button
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.3,
                duration: 0.3,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
              onClick={handleContinueToMenu}
              className={`group bg-black/80 retro-border ${
                selectedFaction === 'lumina' ? 'border-yellow-400 text-yellow-400' : 'border-purple-400 text-purple-400'
              } rounded-lg py-3 px-6 hover:bg-gray-900/90 transition-all duration-200 font-pkmn text-sm cursor-pointer select-none`}
            >
              <span className="group-hover:animate-glow">
                CONTINUE TO MAIN TERMINAL
              </span>
            </motion.button>
          </motion.div>
        ) : selectedFaction ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="text-center"
          >
            <div className={`font-pkmn text-xl md:text-2xl retro-glow mb-4 md:mb-6 ${
              selectedFaction === 'lumina' ? 'text-yellow-400' : 'text-purple-400'
            }`}>
              {selectedFaction === 'lumina' ? 'LUMINA COLLECTIVE CHOSEN' : 'SHADOW SYNDICATE CHOSEN'}
            </div>
            <div className="text-green-400 font-pkmn text-sm md:text-base">
              Initializing communication protocols...
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
            {/* Lumina Collective */}
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                scale: 1.03,
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.97,
                transition: { duration: 0.1 }
              }}
              onClick={() => handleFactionSelect('lumina')}
              onMouseEnter={() => setHoveredSide('lumina')}
              onMouseLeave={() => setHoveredSide(null)}
              onTouchStart={() => setHoveredSide('lumina')}
              onTouchEnd={() => setHoveredSide(null)}
              className="group bg-black/80 retro-border border-yellow-400 rounded-lg p-6 md:p-10 hover:bg-yellow-950/20 transition-all duration-200 h-full cursor-pointer select-none"
            >
              <div className="text-yellow-400 retro-glow font-pkmn text-lg md:text-xl mb-6 md:mb-8 group-hover:animate-glow">
                LUMINA COLLECTIVE
              </div>
              <div className="text-yellow-300 font-pkmn text-sm leading-loose mb-8 md:mb-10">
                &ldquo;Through unity and knowledge,<br />
                we shall rebuild civilization<br />
                and illuminate the darkness.&rdquo;
              </div>
              <div className="text-yellow-500 font-pkmn text-sm leading-relaxed">
                • Seeks to restore order<br />
                • Values collaboration<br />
                • Believes in transparency
              </div>
            </motion.button>

            {/* Shadow Syndicate */}
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                scale: 1.03,
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.97,
                transition: { duration: 0.1 }
              }}
              onClick={() => handleFactionSelect('syndicate')}
              onMouseEnter={() => setHoveredSide('syndicate')}
              onMouseLeave={() => setHoveredSide(null)}
              onTouchStart={() => setHoveredSide('syndicate')}
              onTouchEnd={() => setHoveredSide(null)}
              className="group bg-black/80 retro-border border-purple-400 rounded-lg p-6 md:p-10 hover:bg-purple-950/20 transition-all duration-200 h-full cursor-pointer select-none"
            >
              <div className="text-purple-400 retro-glow font-pkmn text-xl mb-6 md:mb-8 group-hover:animate-glow">
                SHADOW SYNDICATE
              </div>
              <div className="text-purple-300 font-pkmn text-sm leading-loose mb-8 md:mb-10">
                &ldquo;Power flows to those bold<br />
                enough to seize it.<br />
                Strength through dominance.&rdquo;
              </div>
              <div className="text-purple-500 font-pkmn text-sm leading-relaxed">
                • Embraces pragmatism<br />
                • Values individual strength<br />
                • Believes in decisive action
              </div>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
} 