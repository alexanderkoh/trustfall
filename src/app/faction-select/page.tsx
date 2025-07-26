'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function FactionSelectPage() {
  const [selectedFaction, setSelectedFaction] = useState<'lumina' | 'syndicate' | null>(null);
  const [hoveredSide, setHoveredSide] = useState<'lumina' | 'syndicate' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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

  const handleFactionSelect = (faction: 'lumina' | 'syndicate') => {
    setSelectedFaction(faction);
    
    // Store faction choice in localStorage
    localStorage.setItem('selectedFaction', faction);
    
    // Brief pause to show selection, then redirect
    setTimeout(() => {
      router.push('/');
    }, 2000);
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
      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-green-400 retro-glow font-pkmn text-2xl md:text-3xl mb-4 md:mb-6">
            CHOOSE YOUR FACTION
          </h1>
          
          <p className="text-green-300 font-pkmn text-sm md:text-base mb-16 md:mb-20 leading-relaxed max-w-2xl mx-auto">
            The future of Earth-0 hangs in the balance.<br />
            Your allegiance will shape the world to come.
          </p>
        </motion.div>

        {selectedFaction ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className={`font-pkmn text-xl md:text-2xl retro-glow mb-4 md:mb-6 ${
              selectedFaction === 'lumina' ? 'text-blue-400' : 'text-red-400'
            }`}>
              {selectedFaction === 'lumina' ? 'LUMINA COLLECTIVE CHOSEN' : 'SHADOW SYNDICATE CHOSEN'}
            </div>
            <div className="text-green-400 font-pkmn text-sm md:text-base">
              Returning to main terminal...
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-5xl mx-auto">
            {/* Lumina Collective */}
            <motion.button
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => handleFactionSelect('lumina')}
              onMouseEnter={() => setHoveredSide('lumina')}
              onMouseLeave={() => setHoveredSide(null)}
              onTouchStart={() => setHoveredSide('lumina')}
              onTouchEnd={() => setHoveredSide(null)}
              className="group bg-black/80 retro-border border-blue-400 rounded-lg p-6 md:p-10 hover:bg-blue-950/20 transition-all duration-300 h-full"
            >
              <div className="text-blue-400 retro-glow font-pkmn text-lg md:text-xl mb-6 md:mb-8 group-hover:animate-glow">
                LUMINA COLLECTIVE
              </div>
              <div className="text-blue-300 font-pkmn text-sm leading-loose mb-8 md:mb-10">
                "Through unity and knowledge,<br />
                we shall rebuild civilization<br />
                and illuminate the darkness."
              </div>
              <div className="text-blue-500 font-pkmn text-sm leading-relaxed">
                • Seeks to restore order<br />
                • Values collaboration<br />
                • Believes in transparency
              </div>
            </motion.button>

            {/* Shadow Syndicate */}
            <motion.button
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={() => handleFactionSelect('syndicate')}
              onMouseEnter={() => setHoveredSide('syndicate')}
              onMouseLeave={() => setHoveredSide(null)}
              onTouchStart={() => setHoveredSide('syndicate')}
              onTouchEnd={() => setHoveredSide(null)}
              className="group bg-black/80 retro-border border-red-400 rounded-lg p-6 md:p-10 hover:bg-red-950/20 transition-all duration-300 h-full"
            >
              <div className="text-red-400 retro-glow font-pkmn text-xl mb-6 md:mb-8 group-hover:animate-glow">
                SHADOW SYNDICATE
              </div>
              <div className="text-red-300 font-pkmn text-sm leading-loose mb-8 md:mb-10">
                "Power flows to those bold<br />
                enough to seize it.<br />
                Strength through dominance."
              </div>
              <div className="text-red-500 font-pkmn text-sm leading-relaxed">
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