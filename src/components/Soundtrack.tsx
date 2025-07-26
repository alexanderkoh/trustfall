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
  // TEMPORARILY DISABLED - All music commented out for now
  // Music will be re-enabled later
  
  // Prevent unused parameter warnings
  void trackKey;
  void src;
  void volume;
  void autoPlay;
  
  return null;
} 