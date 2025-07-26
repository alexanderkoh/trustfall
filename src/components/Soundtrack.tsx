'use client';

import { useEffect, useRef } from 'react';

interface SoundtrackProps {
  src?: string;
  volume?: number;
}

export default function Soundtrack({ src, volume = 0.5 }: SoundtrackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!src) {
      // Fade out and stop current audio
      fadeOut();
      return;
    }

    // If same source is already playing, don't restart
    if (audioRef.current?.src.endsWith(src) && !audioRef.current.paused) {
      return;
    }

    // Create new audio element
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    
    const fadeIn = () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume < volume) {
          audio.volume = Math.min(audio.volume + 0.05, volume);
        } else {
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
          }
        }
      }, 100);
    };

    const handleCanPlayThrough = () => {
      audio.play().then(() => {
        fadeIn();
      }).catch(error => {
        console.warn('Audio playback failed:', error);
      });
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    // Fade out current audio before switching
    if (audioRef.current && !audioRef.current.paused) {
      fadeOut(() => {
        audioRef.current = audio;
      });
    } else {
      audioRef.current = audio;
    }

    return () => {
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [src, volume]);

  const fadeOut = (callback?: () => void) => {
    if (!audioRef.current || audioRef.current.paused) {
      callback?.();
      return;
    }

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    fadeIntervalRef.current = setInterval(() => {
      if (audioRef.current && audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(audioRef.current.volume - 0.05, 0);
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        callback?.();
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
} 