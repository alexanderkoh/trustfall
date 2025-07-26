# 🧠 Trustfall: Vault Wars - Interactive Cinematic Story

An immersive, full-screen story experience built with Next.js 14, featuring retro-style UI and interactive narrative elements.

## 🚀 Features

### Core Components
- **StoryEngine**: Full-screen slide management with preloading and smooth transitions
- **TextBox**: Retro RPG-style dialogue box with typewriter animation
- **Soundtrack**: Audio management with fade in/out transitions
- **Faction System**: Player choice system with persistent theming

### Interactive Elements
- **Typewriter Animation**: Character-by-character text reveal
- **Click-to-Progress**: Skip animation or advance to next line
- **Image Preloading**: Seamless slide transitions with background loading
- **Faction Theming**: Dynamic UI colors based on player choice
- **Early Access Signup**: Email collection modal

### Visual Design
- **Retro Pixel Font**: "Press Start 2P" for authentic 16-bit feel
- **Glowing Effects**: CSS animations for retro terminal aesthetics
- **Dark Mode**: Atmospheric dark theme with faction-based color schemes
- **Responsive Design**: Works on desktop and mobile devices

## 🎮 Game Flow

1. **Main Menu** (`/`) - Central hub with faction-based theming
2. **Story Mode** (`/story`) - 10 slides of cinematic narrative
3. **Faction Selection** (`/faction-select`) - Choose between:
   - **Lumina Collective** (Blue theme) - Unity and knowledge
   - **Shadow Syndicate** (Red theme) - Power and dominance

## 🛠 Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Local Storage** for faction persistence

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main menu
│   ├── story/page.tsx        # Story mode
│   ├── faction-select/page.tsx # Faction selection
│   └── globals.css           # Global styles with themes
├── components/
│   ├── StoryEngine.tsx       # Main story component
│   ├── TextBox.tsx          # Dialogue system
│   └── Soundtrack.tsx       # Audio management
└── lib/
    └── slides.ts            # Story content data

public/images/
└── slide1-10.png           # Background images
```

## 🎨 Customization

### Adding New Slides
Edit `src/lib/slides.ts` to add more story content:

```typescript
{
  id: 11,
  background: '/images/slide11.png',
  music: '/audio/track11.mp3', // Optional
  text: [
    'Your story line here...',
    'Multiple lines supported...'
  ]
}
```

### Theme Colors
Modify CSS variables in `src/app/globals.css`:

```css
.lumina-theme {
  --text-glow: #3b82f6;
  --border-glow: #60a5fa;
}
```

## 🔊 Adding Audio

1. Place audio files in `public/audio/`
2. Add `music: '/audio/filename.mp3'` to slide data
3. Audio will automatically loop and fade between slides

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start your journey into Earth-0!

## 🌟 Future Enhancements

- [ ] Sound effects for UI interactions
- [ ] Dev preview mode with keyboard navigation
- [ ] Additional faction options
- [ ] Save/load story progress
- [ ] Multiplayer faction battles
- [ ] Dynamic story branching based on choices

---

**Welcome, Vault Runner. The future of Earth-0 awaits your decision.**
