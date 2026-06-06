/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        solariam: {
          void: 'var(--solariam-void)',
          night: 'var(--solariam-night)',
          slate: 'var(--solariam-slate)',
          panel: 'var(--solariam-panel)',
          border: 'var(--solariam-border)',
          gold: 'var(--solariam-gold)',
          'gold-light': 'var(--solariam-gold-light)',
          'gold-dim': 'var(--solariam-gold-dim)',
          ember: 'var(--solariam-ember)',
          frost: 'var(--solariam-frost)',
          mist: 'var(--solariam-mist)',
          parchment: 'var(--solariam-parchment)',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['"Source Sans 3"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(201, 162, 39, 0.15)',
        panel: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'starfield':
          'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.2) 0%, transparent 100%), radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.15) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
}