/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      screens: {
        'xxs': '0px',
        'xs': '400px',
        'xsm': '450px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        grow: {
          '0%': { maxHeight: '0', maxWidth: '0vw', opacity: '0' },
          '100%': { maxHeight: '100vh', maxWidth: '100vw', opacity: '1' },
        },
        shrink: {
          '0%': { maxHeight: '100vh', maxWidth: '100vw', opacity: '1' },
          '100%': { maxHeight: '0', maxWidth: '0vw',  opacity: '0' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        grow: 'grow 0.8s ease-out forwards',
        shrink: 'shrink 0.5s ease-out forwards',
        slideIn: 'slideIn 1s ease-in-out forwards',
        slideOut: 'slideOut 1s ease-in-out forwards',
      },
      padding: {
        'vw-1': '1vw',
        'vw-2': '2vw',
        'vw-3': '3vw',
        'vw-4': '4vw',
        'vw-5': '5vw',
        
      },
      margin: {
        'vw-1': '1vw',
        'vw-2': '2vw',
        'vw-3': '3vw',
        'vw-4': '4vw',
        'vw-5': '5vw',
        
      },

    },
    textColor: {
      'default': 'black',
      'white': 'white',
      'darkblue': '#405DB5',
      'blue-600' : '#1E88E5',
      'purple-600' : '#8E24AA',
      'pink-600': '#D81B60',
      'gray': '#909090',
      'green':'#22c55e',
      'lightgreen':'#bbf7d0',
      'yellow':'#ffa000',
      'lightyellow':'#fde68a',
      'red':'#ef4444',
      'lightred':'#ffcdd2',
      'purpleblue':'#6350FF',
      'mutedgreen':'#2C7662',
      'mutedyellow':'#B49438',
      'mutedred':'#AF1B1B',
      'lightpink':'#F38CE3',
      'lightblue':'#4378DB',
      'lightpurple':'#9B65B5',
      'darkpurple':'#7C4EA0',
      'darkpink':'#D649B7',
    },
    colors: {
      'white': '#FFFFFF',
      'disabled': '#AFAFAF',
      'default': 'black',
      'paleblue': '#009BFF',
      'darkblue': '#405DB5',
      'deepblue': '#005994',
      'lightblue': '#D5EEFF',
      'lightpink': '#FFDDFA',
      'purple-100' : '#E1BEE7',
      'lightorange': '#FFFF00',
      'pink-100' : '#F8BBD0',
      'gray': '#C0C0C0',
      'lightgray': '#E0E0E0',
      'lightergray': '#F0F0F0',
      'blue-50': '#E2F1FB',
      'blue-100': '#BBDEFB',
      'green':'#22c55e',
      'lightgreen':'#bbf7d0',
      'yellow':'#ffa000',
      'lightyellow':'#fde68a',
      'red':'#ef4444',
      'lightred':'#ffcdd2',
      'purpleblue':'#526AFF',
      'blue-600': '#1E88E5',
      'lightpurple':'#E6D6FA',
      'darkpurple':'#3222AF',
      'mutedgreen':'#27D5A6',
      'mutedyellow':'#EEBD2F',
      'mutedred':'#DA5071',
      'lightblue': '#D2EFFF',
    },
    fontSize: {
      'xs': '0.1rem',
      'sm': '0.4rem',
      'xsm': '0.5rem',
      'md': '0.6rem',
      'mdd': '0.8rem',
      '2mdd': '0.9rem',
      'base': '1rem',
      'lg': '1.2rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem'
    },
    screens: { // New lines added for custom breakpoints
      'xxs': '0px',
      'xs': '400px',
      'xsm': '450px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    //custom shadow
    function ({ addUtilities }) {
      addUtilities({
        '.custom-shadow': {
          position: 'relative',
          overflow: 'hidden',
        },
        '.custom-shadow::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '15px', /* Adjust the height as needed */
          boxShadow: '0 -10px 20px rgba(0, 0, 0, 0.1)', /* Adjust the shadow properties as needed */
          pointerEvents: 'none', /* Ensures the pseudo-element does not interfere with other interactions */
        },
      }, ['responsive']);
    }
  ],
};

