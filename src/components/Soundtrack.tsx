'use client';

import { useEffect, useRef, useState } from 'react';
import { musicTracks, type AudioTrack } from '@/lib/audioConfig';

interface SoundtrackProps {
  trackKey?: string;
  src?: string; // Fallback for direct src usage
  volume?: number;
  autoPlay?: boolean;
}

export default function Soundtrack({ trackKey, src, volume, autoPlay = true }: SoundtrackProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentTrackRef = useRef<string>('');
  const [userInteracted, setUserInteracted] = useState(false);
  const pendingTrackRef = useRef<{
    audioSrc: string;
    audioVolume: number;
    shouldLoop: boolean;
    fadeInDuration: number;
    isTrackSwitch: boolean;
  } | null>(null);

  useEffect(() => {
    // Get track configuration
    const track: AudioTrack | undefined = trackKey ? musicTracks[trackKey] : undefined;
    const audioSrc = track?.path || src;
    const audioVolume = volume ?? track?.volume ?? 0.5;
    const shouldLoop = track?.loop ?? true;
    const fadeInDuration = track?.fadeIn ?? 1000;
    
    if (!audioSrc) {
      fadeOut();
      return;
    }

    // If same track is already playing, don't restart
    if (currentTrackRef.current === audioSrc && audioRef.current && !audioRef.current.paused) {
      return;
    }

    // Store track info if user hasn't interacted yet
    if (!userInteracted) {
      pendingTrackRef.current = {
        audioSrc,
        audioVolume,
        shouldLoop,
        fadeInDuration,
        isTrackSwitch: !!(audioRef.current && !audioRef.current.paused)
      };
      return;
    }

    // Fade out current track before switching
    if (audioRef.current && !audioRef.current.paused) {
      fadeOut(() => {
        loadAndPlayTrack(audioSrc, audioVolume, shouldLoop, fadeInDuration, true);
      });
    } else {
      loadAndPlayTrack(audioSrc, audioVolume, shouldLoop, fadeInDuration, false);
    }

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackKey, src, volume, autoPlay]);

  // Set up user interaction detection
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      
      // Play pending track if any
      if (pendingTrackRef.current) {
        const { audioSrc, audioVolume, shouldLoop, fadeInDuration, isTrackSwitch } = pendingTrackRef.current;
        
        if (audioRef.current && !audioRef.current.paused) {
          fadeOut(() => {
            loadAndPlayTrack(audioSrc, audioVolume, shouldLoop, fadeInDuration, true);
          });
        } else {
          loadAndPlayTrack(audioSrc, audioVolume, shouldLoop, fadeInDuration, isTrackSwitch);
        }
        
        pendingTrackRef.current = null;
      }
      
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    if (!userInteracted) {
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
    }

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInteracted]);

  const loadAndPlayTrack = (
    audioSrc: string, 
    audioVolume: number, 
    shouldLoop: boolean, 
    fadeInDuration: number,
    isTrackSwitch: boolean = false
  ) => {
    const audio = new Audio(audioSrc);
    audio.loop = shouldLoop;
    audio.preload = 'auto'; // Ensure full audio is preloaded
    
    // For looping tracks, start at full volume immediately unless switching tracks
    const initialVolume = (shouldLoop && !isTrackSwitch) ? audioVolume : 0;
    audio.volume = initialVolume;
    
    // Enhanced settings for perfect looping
    if (shouldLoop) {
      // Prevent audio gaps during loop with multiple fallback methods
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.warn('Loop restart failed:', error);
        });
      });
      
      // Additional loop protection - check for near-end and restart early
      audio.addEventListener('timeupdate', () => {
        if (audio.duration && audio.currentTime >= audio.duration - 0.1) {
          audio.currentTime = 0;
        }
      });
    }
    
    const handleCanPlayThrough = () => {
      if (autoPlay) {
        audio.play().then(() => {
          // Always set the current track reference
          currentTrackRef.current = audioSrc;
          
          // Only fade in if this is a track switch or non-looping track
          if (isTrackSwitch || !shouldLoop) {
            fadeIn(audio, audioVolume, fadeInDuration);
          }
          // For looping tracks that aren't switches, volume is already set correctly above
        }).catch(error => {
          console.warn('Audio playback failed:', error);
        });
      }
    };

    const handleError = () => {
      console.warn(`Failed to load audio: ${audioSrc}`);
    };

    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;
  };

  const fadeIn = (audio: HTMLAudioElement, targetVolume: number, duration: number) => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const steps = 50;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;

    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      if (currentStep < steps && audio) {
        audio.volume = Math.min(volumeStep * currentStep, targetVolume);
        currentStep++;
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, stepTime);
  };

  const fadeOut = (callback?: () => void) => {
    if (!audioRef.current || audioRef.current.paused) {
      callback?.();
      return;
    }

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const steps = 20;
    const stepTime = 50;
    const currentVolume = audioRef.current.volume;
    const volumeStep = currentVolume / steps;

    let currentStep = 0;
    fadeIntervalRef.current = setInterval(() => {
      if (currentStep < steps && audioRef.current) {
        audioRef.current.volume = Math.max(currentVolume - (volumeStep * currentStep), 0);
        currentStep++;
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        currentTrackRef.current = '';
        callback?.();
      }
    }, stepTime);
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

  return null;
} 