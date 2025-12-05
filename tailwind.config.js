/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#14b8a6',
          light: '#2dd4bf',
          dark: '#0d9488',
        },
        'grey-dark': '#2a2a2a',
        'grey-medium': '#3a3a3a',
        'grey-light': '#4a4a4a',
      },
    },
  },
  plugins: [],
}
