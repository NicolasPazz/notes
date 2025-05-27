const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0A66C2',
        dark: '#004182',
        text: '#CFCFCF',
        background: '#1D2226',
        surface: '#2C2F33',
        green: '#00A550',
        red: '#D93025',
        yellow: '#F8D147',
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
