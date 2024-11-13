import tailwindTypography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./k4itrun.config.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-layout': 'var(--color-layout)',
        white: '#ffffff',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [tailwindTypography]
}
