/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Rubik', 'sans-serif']
      },
      colors: {
        'spotify-dark': '#2F2D2E',
        'spotify-green': '#1DB954',
        'spotify-card': '#181818'
      },
      animation: {
        fadein: 'fadein 250ms ease-in 1',
        wiggle: 'wiggle 250ms linear 2',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' }
        },
        wiggle: {
          '0%, 100%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
        },
      }
    },
  },
  plugins: [],
}
