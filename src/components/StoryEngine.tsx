'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { slides, type Slide } from '@/lib/slides';
import { slideMusicMap } from '@/lib/audioConfig';
import TextBox from './TextBox';
import Soundtrack from './Soundtrack';
import SFXPlayer from './SFXPlayer';

export default function StoryEngine() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const router = useRouter();

  const currentSlide = slides[currentSlideIndex];
  const nextSlide = slides[currentSlideIndex + 1];
  
  // Get the music track key for the current slide (slides are 1-indexed in the map)
  const currentMusicTrack = slideMusicMap[currentSlideIndex + 1];

  // Preload images
  useEffect(() => {
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setPreloadedImages(prev => new Set([...prev, src]));
          resolve();
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    const preloadAllImages = async () => {
      try {
        // Preload first few images for immediate playback
        const priorityImages = slides.slice(0, 3).map(slide => slide.background);
        await Promise.all(priorityImages.map(preloadImage));
        setIsLoading(false);

        // Continue preloading remaining images in background
        const remainingImages = slides.slice(3).map(slide => slide.background);
        remainingImages.forEach(src => preloadImage(src));
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        setIsLoading(false);
      }
    };

    preloadAllImages();
  }, []);

  // Preload next image when advancing
  useEffect(() => {
    if (nextSlide && !preloadedImages.has(nextSlide.background)) {
      const img = new Image();
      img.src = nextSlide.background;
    }
  }, [currentSlideIndex, nextSlide, preloadedImages]);

  const handleNextSlide = () => {
    if (currentSlideIndex >= slides.length - 1) {
      // Story finished, show faction selection
      router.push('/faction-select');
      return;
    }
    
    setCurrentSlideIndex(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-green-400 retro-glow font-pixel text-lg mb-8">
            INITIALIZING TRUSTFALL PROTOCOL
          </div>
          <div className="flex space-x-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-green-400 rounded-sm retro-border"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  if (!currentSlide) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Soundtrack trackKey={currentMusicTrack} />
      <SFXPlayer volume={0.3} enabled={true} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentSlide.background})`,
            }}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Slide counter */}
          <div className="absolute top-8 right-8 z-40">
            <div className="text-green-400 retro-glow font-pixel text-sm">
              {currentSlideIndex + 1} / {slides.length}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Text Box */}
      <TextBox
        lines={currentSlide.text}
        onNext={handleNextSlide}
      />
    </div>
  );
} 