/** @type {import('tailwindcss').Config} */
export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',

  // Or if using `src` directory:
  './src/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
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
    }, keyframes: {
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
      slideIn: 'slideIn 1s ease-in-out forwards',
      slideOut: 'slideOut 1s ease-in-out forwards',
    },
  },
  textColor: {
    'default': 'black',
    'white': 'white',
    'darkblue': '#0072BC',
    'blue-600': '#1E88E5',
    'purple-600': '#8E24AA',
    'pink-600': '#D81B60',
    'gray': '#909090',
    'green': '#22c55e',
    'lightgreen': '#bbf7d0',
    'yellow': '#ffa000',
    'lightyellow': '#fde68a',
    'red': '#ef4444',
    'lightred': '#ffcdd2',
  },
  colors: {
    'white': '#FFFFFF',
    'disabled': '#AFAFAF',
    'default': '#000000',
    'paleblue': '#009BFF',
    'darkblue': '#0072BC',
    'deepblue': '#005994',
    'lightblue': '#D5EEFF',
    'lightpink': '#FFEDFA',
    'purple-100': '#E1BEE7',
    'lightorange': '#FFFF00',
    'pink-100': '#F8BBD0',
    'gray': '#C0C0C0',
    'blue-100': '#BBDEFB',
    'green': '#22c55e',
    'lightgreen': '#bbf7d0',
    'yellow': '#ffa000',
    'lightyellow': '#fde68a',
    'red': '#ef4444',
    'lightred': '#ffcdd2',
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
    '5xl': '3.052rem',
  },
};
export const plugins = [];