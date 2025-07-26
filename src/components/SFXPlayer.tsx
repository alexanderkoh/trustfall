'use client';

import { useRef, useCallback, useEffect } from 'react';

interface SFXPlayerProps {
  volume?: number;
  enabled?: boolean;
}

const SFXPlayer = ({ volume = 0.3, enabled = true }: SFXPlayerProps) => {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const preloadSFX = useCallback((sfxPath: string) => {
    if (!enabled) return;
    
    if (!audioCache.current.has(sfxPath)) {
      const audio = new Audio(sfxPath);
      audio.volume = volume;
      audio.preload = 'auto';
      audioCache.current.set(sfxPath, audio);
    }
  }, [volume, enabled]);

  const playSFX = useCallback((sfxPath: string, customVolume?: number) => {
    if (!enabled) return;

    let audio = audioCache.current.get(sfxPath);
    
    if (!audio) {
      audio = new Audio(sfxPath);
      audio.volume = customVolume || volume;
      audioCache.current.set(sfxPath, audio);
    } else {
      audio.volume = customVolume || volume;
    }

    // Reset audio to beginning and play
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn('SFX playback failed:', error);
    });
  }, [volume, enabled]);

  // Preload common SFX on component mount
  const preloadCommonSFX = useCallback(() => {
    const commonSFX = [
      '/audio/sfx/click.mp3',
      '/audio/sfx/text-advance.m4a',
      '/audio/sfx/hover.mp3',
      '/audio/sfx/slide-transition.mp3'
    ];

    commonSFX.forEach(preloadSFX);
  }, [preloadSFX]);

  // Expose the play function globally for easy access and preload on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).playSFX = playSFX;
      (window as any).preloadSFX = preloadSFX;
      
      // Preload common SFX when component mounts
      preloadCommonSFX();
    }
  }, [playSFX, preloadSFX, preloadCommonSFX]);

  return null; // This component only provides side effects
};

// Hook for using SFX in components
export const useSFX = (volume?: number, enabled?: boolean) => {
  return SFXPlayer({ volume, enabled });
};

// Utility functions for common SFX
export const SFXUtils = {
  playClick: () => (window as any).playSFX?.('/audio/sfx/click.mp3'),
  playTextAdvance: () => (window as any).playSFX?.('/audio/sfx/text-advance.m4a', 0.4),
  playTyping: () => (window as any).playSFX?.('/audio/sfx/text-advance.m4a', 0.2),
  playHover: () => (window as any).playSFX?.('/audio/sfx/hover.mp3', 0.2),
  playSlideTransition: () => (window as any).playSFX?.('/audio/sfx/slide-transition.mp3'),
  playFactionSelect: () => (window as any).playSFX?.('/audio/sfx/faction-select.mp3'),
  playProtocolStart: () => (window as any).playSFX?.('/audio/sfx/protocol-start.mp3'),
};

export default SFXPlayer; 