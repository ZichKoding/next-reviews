/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-exo-2)', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};