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
    extend: {},
    textColor: {
      'default': 'black',
      'white': 'white',
      'darkblue': '#0072BC',
    },
    colors: {
      'white': 'white',
      'default': 'black',
      'darkblue': '#0072BC',
      'lightblue': '#D5EEFF',
      'lightpink': '#FFEDFA',
    },
  },
  plugins: [],
}