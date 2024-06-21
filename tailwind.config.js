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
      }
    },
    textColor: {
      'default': 'black',
      'white': 'white',
      'darkblue': '#0072BC',
      'blue-600' : '#1E88E5',
      'purple-600' : '#8E24AA',
      'pink-600' : '#D81B60'
    },
    colors: {
      'white': 'white',
      'default': 'black',
      'darkblue': '#0072BC',
      'lightblue': '#D5EEFF',
      'lightpink': '#FFEDFA',
      'blue-100' : '#BBDEFB',
      'purple-100' : '#E1BEE7',
      'pink-100' : '#F8BBD0',
    },
  },
  plugins: [],
}