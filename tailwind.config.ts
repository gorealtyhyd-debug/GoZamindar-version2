import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FEFBF6",
        sand: "#F4F0E6",
        stone: "#E8E2D4",
        olive: { DEFAULT: "#4B4D39", dark: "#383A2A", muted: "#5C5E47" },
        ink: "#1E2016",
        brand: { red: "#E3161B", blue: "#1F3C98" },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      letterSpacing: { eyebrow: "0.34em", label: "0.22em", btn: "0.2em" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        rise: { from: { opacity: "0", transform: "translateY(18px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { marquee: "marquee 40s linear infinite", rise: "rise 0.9s ease both", pop: "rise 0.35s ease both" },
    },
  },
  plugins: [],
};
export default config;
