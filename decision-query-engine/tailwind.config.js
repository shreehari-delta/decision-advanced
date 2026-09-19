/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        engine: {
          bg: '#F8FAFF',
          surface: '#FFFFFF',
          sky: '#E0E7FF',
          indigo: '#818CF8',
          lavender: '#E9D5FF',
          text: '#0F172A',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 10px 40px -10px rgba(0,0,0,0.03)',
        'float': '0 20px 40px -20px rgba(129, 140, 248, 0.15)',
      }
    },
  },
  plugins: [],
}