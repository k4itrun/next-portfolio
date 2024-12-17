import tailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./config/config/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        color: {
          DEFAULT: 'var(--color-layout)',
          layout: 'var(--color-layout)',
        },
        white: {
          DEFAULT: '#ffffff',
        },
        black: {
          DEFAULT: '#000000',
        }
      },
    },
  },
  plugins: [tailwindTypography]
} satisfies Config;
