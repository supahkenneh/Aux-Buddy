/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Secular One', 'sans-serif']
      },
      colors: {
        'dark': '#121212',
        'accent-green': '#1dd65f'
      }
    },
  },
  plugins: [],
}
