import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#242526",
        main: "#87CEEB",
        error: "#f35759",
        sucess: "#366912",
      },
      textColor: {
        primary: "#242526",
        contrast: "#ffff"
      }
    },
  },
  plugins: [],
} satisfies Config;
