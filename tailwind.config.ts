import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gabarito: "var(--font-gabarito)",
        outfit: "var(--font-outfit)",
      },
      colors: {
        neutral: {
          50: "#FFFFFF",
          100: "#E9E9E9",
          200: "#BBBBBB",
          300: "#9A9A9A",
          400: "#6C6C6C",
          500: "#505050",
          600: "#242424",
          700: "#212121",
          800: "#1A1A1A",
          900: "#141414",
          950: "#0F0F0F",
        },
        primary: {
          100: "#F8F2C1",
          200: "#F5EBA3",
          300: "#F0E27A",
          400: "#EDDD60",
          500: "#E9D438",
          600: "#D4C133",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(50px)", opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        up: {
          "0%": { transform: "translateY(100%)" },
          "50%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 4px theme(colors.primary.300))" },
          "100%": { filter: "drop-shadow(0 0 0 theme(colors.primary.300))" },
        },
      },
      animation: {
        fadeIn: "fadeIn 350ms ease-in 150ms both",
        fadeOut: "fadeOut 350ms ease-in both",
        scaleIn: "scaleIn 350ms ease-in-out 200ms both",
        up: "up 1.2s ease",
        glow: "glow 2s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;
