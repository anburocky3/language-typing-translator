/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ta-noto': ['Noto Sans Tamil', 'sans-serif']
      }
    },
  },
  plugins: [],
}

