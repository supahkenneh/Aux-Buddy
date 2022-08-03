/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Rubik', 'sans-serif']
      },
      colors: {
        'spotify-dark': '#191414',
        'spotify-green': '#1DB954'
      }
    },
  },
  plugins: [],
}
