import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        a: {
          fluo: "#B3CF3D",
          green: "#D0F603",
          charcoal: "#191919",
          grey: "#0F0F11",
        },
        dark: {
          100: "#000000",
          200: "#0F1117",
          300: "#151821",
          400: "#212734",
          500: "#101012",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        VT323: ["VT323", "monospace"],
      },
      // animation: {
      //   // scroll: "scroll 10s reverse linear infinite",
      //   "loop-scroll": "loop-scroll 10s linear infinite",
      // },
      // keyframes: {
      //   // scroll: {
      //   //   to: {
      //   //     transform: "translate(calc(-50% - 0.5rem))",
      //   //   },
      //   // },
      //   "loop-scroll": {
      //     from: { transform: "translateX(0)" },
      //     to: { transform: "translateX(-100%)" },
      //   },
      // },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
