import tailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const tailwindConfig = {
  darkMode: ['class'],
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Lexend Deca', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        color: {
          DEFAULT: 'var(--color-layout)',
          layout: 'var(--color-layout)',
        }
      },
    },
  },
  plugins: [tailwindTypography]
} satisfies Config;

export default {
  ...tailwindConfig
} satisfies Config;
