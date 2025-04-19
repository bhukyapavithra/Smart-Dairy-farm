/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'farm-green': {
          50: '#f0f9f1',
          100: '#dcf1de',
          200: '#bae3c0',
          300: '#8fce97',
          400: '#5fb26a',
          500: '#3c9249',
          600: '#2c7539',
          700: '#255e30',
          800: '#214b2a',
          900: '#1d3e25',
          950: '#0e2213',
        },
        'farm-amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde58a',
          300: '#fbd24e',
          400: '#f9bd23',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        'cream': {
          50: '#fefdf9',
          100: '#fcf9ed',
          200: '#f8f0d2',
          300: '#f2e2ad',
          400: '#eaca80',
          500: '#e3b55b',
          600: '#db9a39',
          700: '#c17f2b',
          800: '#9c6425',
          900: '#7d5120',
          950: '#432a10',
        }
      }
    },
  },
  plugins: [],
};