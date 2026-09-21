/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        banner: '#F4C400',
        ink: '#111111',
      },
      fontFamily: {
        poster: ['Arial', 'Helvetica', 'sans-serif'],
        impact: ['Impact', 'Haettenschweiler', 'Arial Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
