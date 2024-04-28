import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {

      },
      colors: {
        'bg': '#211F20',
        'bg-dark': '#161515',
        'bg-light': '#241E1E',
        'bg-darker': '#151212',
        'primary': '#FF7373',
        'text': '#FFF7F7',
        'accent': '#B8B8B8',
        'dark-accent': '#8C7F7F',
        'gradient-yellow': {
          'start': 'hsla(33, 39%, 39%, 1)',
          'end': 'hsla(34, 78%, 56%, 1)',
        },
        'gradient-purple': {
          'start': 'hsla(231, 23%, 49%, 1)',
          'end': 'hsla(268, 37%, 65%, 1)',
        },
        'gradient-blue': {
          'start': 'hsla(217, 26%, 39%, 1)',
          'end': 'hsla(207, 51%, 53%, 1)',
        },
        'gradient-green': {
          'start': 'hsla(178, 17%, 33%, 1)',
          'end': 'hsla(151, 32%, 50%, 1)',
        },
        'gradient-gray': {
          'start': 'hsla(0, 0%, 39%, 1)',
          'end': 'hsla(0, 0%, 65%, 1)',
        },
      },

      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      dropShadow: {
        'primary': '0px 10px 10px rgba(91, 205, 249, .2)',
        'dark': '0px 5px 3px rgba(0, 0, 0, .2)',
      },
      boxShadow:{
        'light': '0 0px 2px 4px rgba(223, 229, 220, 1)',
      },
      borderRadius: {
        "4xl": "1.75rem"
      },
      fontFamily: {
        // 👇 Add CSS variables
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [

  ],
};
export default config;