/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premiumGold': '#D4C79C',
        'premiumGold-light': '#FAF8F2',
        'premiumGold-dark': '#B8A874',
        'premiumBlue': '#4B6BB6',
        'premiumBlue-dark': '#0E131F',
        'premiumBlue-light': '#6B8BD6',
        'lumina-gold': '#D4C79C',
        'lumina-gold-light': '#E5DDC0',
        'lumina-gold-dark': '#B8A874',
        'lumina-blue': '#4B6BB6',
        'lumina-blue-dark': '#385396',
        'lumina-blue-light': '#6B8BD6',
        'lumina-accent-blue': '#153FD4',
        'lumina-cyan': '#31A8FF',
        'lumina-dark': '#131720',
        'lumina-slate': '#737B8C',
        'lumina-offwhite': '#FCFBF8',
        'lumina-bg-light': '#EEF1F6',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
      boxShadow: {
        'pill': '1px 4px 22.2px 3px rgba(0, 0, 0, 0.48)',
        'pill-sm': '1.2px 4.8px 26.8px 3.6px rgba(0, 0, 0, 0.48)',
        'glow-blue': '0px 5.7px 72.9px #153FD4',
        'glow-cyan': '0px 0px 40px rgba(0, 128, 255, 0.3)',
        'glass': '0px 9.1px 36.4px rgba(0, 128, 255, 0.1), inset 0px 1.1px 0px 1.1px rgba(255, 255, 255, 0.1)',
        'figma-glow': '6.75px 9.75px 34.2px -3px #F24E1E',
        'blue-tag': '0px 4.55px 22.76px rgba(0, 128, 255, 0.5), 0px 0px 45.53px rgba(0, 128, 255, 0.3)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '27px',
        'pill': '80px',
      }
    },
  },
  plugins: [],
}
