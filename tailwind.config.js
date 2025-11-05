import { fontFamily } from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";
import aspectRatio from "@tailwindcss/aspect-ratio";

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
  plugins: [typography, animate, aspectRatio],
};

export default tailwindConfig;
