// tailwind.config.js
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

// Step 1: Assign config to a named variable
const tailwindConfig = {
  content: ["./app/**/*.{js,jsx}", "./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        accent: "var(--accent)",
        surface: "var(--surface)",
        "surface-variant": "var(--surface-variant)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      boxShadow: {
        glow: "var(--glow)",
        "glow-hover": "var(--glow-hover)",
      },
    },
  },
  plugins: [typography, animate],
};

// Step 2: Export the named variable
export default tailwindConfig;
