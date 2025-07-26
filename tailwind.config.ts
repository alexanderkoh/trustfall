import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lumina: {
          50: "#f0f7ff",
          100: "#e0efff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          900: "#1e3a8a",
        },
        syndicate: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          900: "#7f1d1d",
        },
      },
      fontFamily: {
        'pkmn': ['"PKMN RBYGSC"', '"Press Start 2P"', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'typewriter': 'typewriter 0.05s steps(1) forwards',
        'blink': 'blink 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '100%': { 
            boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config; 