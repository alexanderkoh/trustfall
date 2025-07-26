// Audio configuration for the Trustfall story experience

export interface AudioTrack {
  path: string;
  loop?: boolean;
  volume?: number;
  fadeIn?: number;
  fadeOut?: number;
}

export const musicTracks: Record<string, AudioTrack> = {
  // Main menu music
  'main-menu': {
    path: '/audio/music/main-menu.mp3',
    loop: true,
    volume: 0.4,
    fadeIn: 2000,
    fadeOut: 1000
  },
  
  // Faction-specific menu music
  'main-menu-lumina': {
    path: '/audio/music/faction-lumina.mp3',
    loop: true,
    volume: 0.4,
    fadeIn: 2000,
    fadeOut: 1000
  },
  
  'main-menu-syndicate': {
    path: '/audio/music/faction-syndicate.mp3',
    loop: true,
    volume: 0.4,
    fadeIn: 2000,
    fadeOut: 1000
  },

  // Story music phases
  'story-intro': {
    path: '/audio/music/story-intro.m4a',
    loop: true,
    volume: 0.5,
    fadeIn: 0,    // No fade for instant loop start
    fadeOut: 0    // No fade for instant loop transitions
  },
  
  'story-collapse': {
    path: '/audio/music/story-collapse.mp3',
    loop: true,
    volume: 0.5,
    fadeIn: 1500,
    fadeOut: 1500
  },
  
  'story-emergence': {
    path: '/audio/music/story-emergence.mp3',
    loop: true,
    volume: 0.5,
    fadeIn: 1500,
    fadeOut: 1500
  },

  // Faction selection
  'faction-selection': {
    path: '/audio/music/faction-selection.mp3',
    loop: true,
    volume: 0.45,
    fadeIn: 1000,
    fadeOut: 1000
  }
};

// Map slides to music tracks
export const slideMusicMap: Record<number, string> = {
  1: 'story-intro',    // Earth's peak
  2: 'story-intro',    // AI governance
  3: 'story-intro',    // Cache Vaults intro
  4: 'story-intro',    // AI malfunction
  5: 'story-intro',    // Self-destruct
  6: 'story-collapse', // Vaults corrupted
  7: 'story-collapse', // Civilization collapse
  8: 'story-emergence', // Vault Runners emerge
  9: 'story-emergence', // Knowledge seekers
  10: 'story-emergence', // Earth-0 reset
  11: 'story-emergence', // New beginning
  12: 'story-emergence', // Two factions
  13: 'story-emergence', // Lumina Collective
  14: 'story-emergence', // Shadow Syndicate
  15: 'story-emergence', // The Neutral Zone
  16: 'story-emergence', // Runners gather
  17: 'story-emergence', // Trustfall Protocol
  18: 'story-emergence', // Trust or betray
  19: 'story-emergence', // Your choice approaches
  20: 'story-emergence'  // Final decision
};

// SFX paths for easy reference
export const sfxPaths = {
  click: '/audio/sfx/click.mp3',
  textAdvance: '/audio/sfx/text-advance.m4a',
  hover: '/audio/sfx/hover.mp3',
  slideTransition: '/audio/sfx/slide-transition.mp3',
  factionSelect: '/audio/sfx/faction-select.mp3',
  protocolStart: '/audio/sfx/protocol-start.mp3',
  loading: '/audio/sfx/loading.mp3',
  typing: '/audio/sfx/typing.mp3',
  earthAmbience: '/audio/sfx/earth-ambience.mp3',
  vaultEcho: '/audio/sfx/vault-echo.mp3',
  aiGlitch: '/audio/sfx/ai-glitch.mp3'
} as const;

export type SFXType = keyof typeof sfxPaths; 