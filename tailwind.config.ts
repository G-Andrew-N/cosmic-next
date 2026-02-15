import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        "deep-space": "#0A0C10",
        "nebula-blue": "#4A80F0",
        "cosmic-purple": "#6B4FE0",
        "cosmic-gray": "rgba(42, 46, 55, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
