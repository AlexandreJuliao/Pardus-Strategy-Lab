import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // rgb(var(--x-rgb) / <alpha-value>) lets Tailwind's opacity modifier
        // (bg-gold/50, border-gold/40...) actually work — a hex value inside
        // var() can't be split into a channel + alpha by Tailwind, so every
        // `/NN` on these tokens used to silently render transparent.
        bg: "rgb(var(--bg-rgb) / <alpha-value>)",
        "bg-2": "rgb(var(--bg-2-rgb) / <alpha-value>)",
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2-rgb) / <alpha-value>)",
        // line/line-strong keep their baked-in low alpha (rgba(...)) — they're
        // used bare (border-line) almost everywhere; switching them to the
        // <alpha-value> pattern would make every plain hairline fully opaque.
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        gold: "rgb(var(--gold-rgb) / <alpha-value>)",
        "gold-soft": "rgb(var(--gold-soft-rgb) / <alpha-value>)",
        "gold-bright": "rgb(var(--gold-bright-rgb) / <alpha-value>)",
        "gold-deep": "rgb(var(--gold-deep-rgb) / <alpha-value>)",
        blue: "rgb(var(--blue-rgb) / <alpha-value>)",
        "blue-bright": "rgb(var(--blue-bright-rgb) / <alpha-value>)",
        "blue-deep": "rgb(var(--blue-deep-rgb) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary-rgb) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted-rgb) / <alpha-value>)",
        cream: "rgb(var(--cream-rgb) / <alpha-value>)",
        "cream-ink": "rgb(var(--cream-ink-rgb) / <alpha-value>)",
        bronze: "rgb(var(--bronze-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-space-grotesk)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        wordmark: ["var(--font-wordmark)", "Georgia", "serif"],
        // 2-font rule: "mono" contexts (kickers, numbers, chips) render in
        // Space Grotesk, matching the social system.
        mono: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "4px",
        md: "4px",
        lg: "6px",
      },
      keyframes: {
        "bounce-chevron": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "bounce-chevron": "bounce-chevron 1.6s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "marquee-reverse": "marquee-reverse 38s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
