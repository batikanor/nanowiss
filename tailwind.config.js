/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#b083ff', // Light purple for highlights
          DEFAULT: '#6d4ab6', // Main purple tone
          dark: '#422768', // Dark purple for deeper accents
        },
        secondary: {
          light: '#2d0c59', // Light blue for accents
          DEFAULT: '#2d0c59', // Main blue tone
          dark: '#280c36', // Dark blue for deeper accents
        },
        background: {
          DEFAULT: '#1a1a2e', // Dark blue/purple background
        },
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
