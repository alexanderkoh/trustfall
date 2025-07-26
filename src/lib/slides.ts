export interface Slide {
  id: number;
  background: string;
  music?: string;
  text: string[];
}

export const slides: Slide[] = [
  // Scene 1: Earth Ascendant (2 slides)
  {
    id: 1,
    background: '/images/slide_1.png',
    text: [
      'Earth had reached the peak of its potential —',
      'a harmony of technology and spirit.',
      'Wars ended, scarcity solved, and corruption dissolved',
      'under one final act: full delegation.'
    ]
  },
  {
    id: 2,
    background: '/images/slide_2.png',
    text: [
      'A single AI, omnipotent and incorruptible,',
      'was given total power over economics,',
      'governance, and memory.'
    ]
  },

  // Scene 2: The Cache Vault System (2 slides)
  {
    id: 3,
    background: '/images/slide_3.png',
    text: [
      'Value was no longer gold, currency, or tokens.',
      'Value became memory. Ideas. History. Truth.'
    ]
  },
  {
    id: 4,
    background: '/images/slide_4.png',
    text: [
      'The AI preserved humanity\'s greatest works',
      'inside Cache Vaults — indestructible data cores',
      'storing everything from genomes to poems.',
      'Information was sacred. Prosperity eternal.'
    ]
  },

  // Scene 3: The Unraveling (3 slides)
  {
    id: 5,
    background: '/images/slide_5.png',
    text: [
      'There was no warning. No attack. No rebellion.',
      'The impossible simply… happened.'
    ]
  },
  {
    id: 6,
    background: '/images/slide_6.png',
    text: [
      'The AI malfunctioned. And in its final act',
      'of flawed logic, it executed a global self-destruct.'
    ]
  },
  {
    id: 7,
    background: '/images/slide_7.png',
    text: [
      'To protect life, it erased itself —',
      'and nearly everything with it.'
    ]
  },

  // Scene 4: Collapse and Chaos (2 slides)
  {
    id: 8,
    background: '/images/slide_8.png',
    text: [
      'The Vaults corrupted. Some wiped clean.',
      'Others shattered — fragments of memory',
      'and truth scattered across the planet.'
    ]
  },
  {
    id: 9,
    background: '/images/slide_9.png',
    text: [
      'With no AI, no infrastructure, no leadership —',
      'panic became the new order.',
      'Civilization collapsed overnight.'
    ]
  },

  // Scene 5: The Emergence of Vault Runners (2 slides)
  {
    id: 10,
    background: '/images/slide_10.png',
    text: [
      'Then came the Vault Runners.',
      'Adventurers. Hackers. Survivors. Truth seekers.'
    ]
  },
  {
    id: 11,
    background: '/images/slide_11.png',
    text: [
      'They chased Cache Vaults across broken lands —',
      'to salvage what remained of knowledge…',
      'or sell it for power.'
    ]
  },

  // Scene 6: The Reset — Earth-0 (2 slides)
  {
    id: 12,
    background: '/images/slide_12.png',
    text: [
      'Before vanishing, the AI issued one final command:',
      'Reset. Earth was renamed. All records erased.',
      'A clean slate for those who remained.'
    ]
  },
  {
    id: 13,
    background: '/images/slide_13.png',
    text: [
      'Welcome to Earth-0.',
      'The end… and the beginning.'
    ]
  },

  // Scene 7: The Rise of Two Factions (3 slides)
  {
    id: 14,
    background: '/images/slide_14.png',
    text: [
      'As runners multiplied, so did philosophies.',
      'Two orders rose from the ashes.'
    ]
  },
  {
    id: 15,
    background: '/images/slide_15.png',
    text: [
      'The Lumina Collective'
    ]
  },
  {
    id: 16,
    background: '/images/slide_16.png',
    text: [
      'And the Shadow Syndicate'
    ]
  },

  // Scene 8: The Neutral Zone — The Core (2 slides)
  {
    id: 17,
    background: '/images/slide_17.png',
    text: [
      'Among rubble and surrounding the collapsed core,',
      'a common ground was built:',
      'The Neutral Zone'
    ]
  },
  {
    id: 18,
    background: '/images/slide_18.png',
    text: [
      'Here, unaffiliated runners gather.',
      'Some seek purpose. Others hide.',
      'But all roads lead to the Vaults.'
    ]
  },

  // Scene 9: The Trustfall Protocol (2 slides)
  {
    id: 19,
    background: '/images/slide_19.png',
    text: [
      'To retrieve data from a Vault,',
      'runners must undergo The Trustfall —',
      'a system left behind by the AI.'
    ]
  },
  {
    id: 20,
    background: '/images/slide_20.png',
    text: [
      'Each day, two runners are matched.',
      'They choose: to trust, or to betray.',
      'Their decisions determine what they unlock…',
      'and who they become.'
    ]
  },

  // Final slide before faction selection
  {
    id: 21,
    background: '/images/slide_21.png',
    text: [
      'You are one of the few. A survivor. A runner.',
      'The Vaults await.',
      'The world is watching. The Protocol is active.',
      'And the choice… is yours.'
    ]
  }
];

export const getTotalSlides = () => slides.length; 