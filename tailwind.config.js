/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   'custom-bg': "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), url('../src/assets/ocean.jpg')",
      // },
      backgroundImage: (theme) => ({
        'custom-bg': "linear-gradient(to bottom, rgba(0, 0, 0, 0.078), rgba(9, 14, 90, 0.67)), url('../src/assets/ocean.jpg')",
      }),
  
      colors: {
        primary: '#1A2A45', // Dark blue background
        secondary: '#2E4269', // Lighter blue card background
        accent: '#3B5998', // Blue accent
        textPrimary: '#FFFFFF', // White text
        textSecondary: '#B0C4DE', // Light blue text
        borderColor: '#DDEEFF', // Light blue border
        buttonBg: '#3B5998', // Button background
        buttonText: '#FFFFFF', // Button text
        warning: '#FFD700', // Yellow for warning icons
        success: '#00C851', // Green for success icons
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      fontSize: {
        '3xl': '2rem', // Large headings
        '2xl': '1.5rem', // Smaller headings
        xl: '1.25rem', // Standard text
        lg: '1rem', // Smaller text
        base: '0.875rem', // Base text
        sm: '0.75rem', // Small text
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for cards
        button: '0 2px 4px rgba(0, 0, 0, 0.1)', // Shadow for buttons
      },
      screens: {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
    },
  },
  variants: {},
  plugins: [],
}
