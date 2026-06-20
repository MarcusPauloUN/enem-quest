/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/ui/**/*.{ts,tsx}', './src/App.tsx', './src/main.tsx'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        'rpg-gold': '#FFD700',
        'rpg-dark': '#1a1a2e',
        'rpg-panel': '#16213e',
        'rpg-border': '#0f3460',
        'hp-red': '#e74c3c',
        'xp-blue': '#3498db',
      },
    },
  },
  plugins: [],
}

