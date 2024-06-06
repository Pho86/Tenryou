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
        'bg': '#2a2727',
        'bg-dark': '#161515',
        'bg-light': '#241E1E',
        'bg-lighter': '#3B3434',
        'bg-darker': '#151212',
        'bg-darkest': '#080606',
        'primary': '#FF7373',
        'text': '#FFF7F7',
        'accent': '#FFA2A2',
        'dark-accent': '#8C7F7F',
        'gradient-SSR': {
          'start': 'hsla(33, 39%, 39%, 1)',
          'end': 'hsla(34, 78%, 56%, 1)',
        },
        'gradient-SR': {
          'start': 'hsla(231, 23%, 49%, 1)',
          'end': 'hsla(268, 37%, 65%, 1)',
        },
        'gradient-R': {
          'start': 'hsla(217, 26%, 39%, 1)',
          'end': 'hsla(207, 51%, 53%, 1)',
        },
        'gradient-UC': {
          'start': 'hsla(178, 17%, 33%, 1)',
          'end': 'hsla(151, 32%, 50%, 1)',
        },
        'gradient-C': {
          'start': 'hsla(0, 0%, 39%, 1)',
          'end': 'hsla(0, 0%, 65%, 1)',
        },
        'gradient-Pyro': {
          'start': '#E94F25',
          'end': '#FF9D82'
        },
        'gradient-Hydro': {
          'start': '#8296E7',
          'end': '#1945C1'
        },
        'gradient-Cryo': {
          'start': '#30508E',
          'end': '#86B7F1'
        },
        'gradient-Electro': {
          'start': '#A575BD',
          'end': '#6E44AB'
        },
        'gradient-Geo': {
          'start': '#6C5548',
          'end': '#A07A53'
        },
        'gradient-Anemo': {
          'start': '#258B8D',
          'end': '#37ADA7'
        },
        'gradient-Dendro': {
          'start': '#274541',
          'end': '#619871'
        },
      },

      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      dropShadow: {
        'primary': '0px 10px 10px rgba(91, 205, 249, .2)',
        'dark': '0px 5px 3px rgba(0, 0, 0, .2)',
        'text': '1px 1px .6px rgba(0, 0, 0, .6)',
        'icon': '1px 1px 1px rgba(0, 0, 0, .8)',
      },
      boxShadow: {
        'light': '0 0px 2px 4px rgba(223, 229, 220, 1)',
      },
      borderRadius: {
        "4xl": "1.75rem"
      },
      fontFamily: {
        // 👇 Add CSS variables
        poppins: ["var(--font-poppins)"],
        signika: ["var(--font-signika)"],
      },
    },
  },
  plugins: [

  ],
};
export default config;