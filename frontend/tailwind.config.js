/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "primary-variant": "#3b82f6",
        secondary: "#3b82f6",
        "secondary-variant": "#5e92e7"
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #6200EE 0%, #3700B3 100%)',
        'gradient-secondary': 'linear-gradient(90deg, #03DAC6 0%, #018786 100%)',
        'gradient-primary-diagonal': 'linear-gradient(45deg, #6200EE 0%, #3700B3 100%)',
        'gradient-secondary-diagonal': 'linear-gradient(45deg, #03DAC6 0%, #018786 100%)'
      },
      borderRadius: {
        DEFAULT: '4px',
        lg: '16px',
        xl: '24px',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}