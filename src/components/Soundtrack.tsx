'use client';

interface SoundtrackProps {
  trackKey?: string;
  src?: string; // Fallback for direct src usage
  volume?: number;
  autoPlay?: boolean;
}

export default function Soundtrack(_props: SoundtrackProps) {
  // TEMPORARILY DISABLED - All music commented out for now
  // Music will be re-enabled later
  
  // Prevent unused parameter warnings
  void _props;
  
  return null;
} 