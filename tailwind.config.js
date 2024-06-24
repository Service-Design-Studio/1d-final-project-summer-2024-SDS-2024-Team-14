/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
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
    },
    colors: {
      'white': 'white',
      'disabled': '#AFAFAF',
      'default': 'black',
      'paleblue': '#009BFF',
      'darkblue': '#0072BC',
      'deepblue': '#005994',
      'lightblue': '#D5EEFF',
      'lightpink': '#FFEDFA',
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
  },
  plugins: [],
}