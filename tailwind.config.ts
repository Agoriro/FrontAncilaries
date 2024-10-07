import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/pages/manageReservation/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      'xxl': '36px',//36p
      'xl': '26px', //24px
      'lg': '22px', //20px
      'base': '20px', //18px
      'sm': '18px', //16px
      's':'16px',
      'xs': '14px'
    },
    colors: {
      'avia-blue': '#316BB2'
    },
    textColor: {
      'general': '#585858',
      'avia-blue': '#316BB2'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;