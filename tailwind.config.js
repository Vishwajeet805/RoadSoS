/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#020818",
          900: "#040f2b",
          800: "#071640",
          700: "#0a1f55",
        },
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        emergency: "#ef4444",
        accent: {
          blue: "#0ea5e9",
          purple: "#a855f7",
          indigo: "#6366f1",
        },
      },
      fontFamily: {
        display: ["'Exo 2'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(34, 211, 238, 0.2)",
        "glow-md": "0 0 30px rgba(34, 211, 238, 0.3)",
        "glow-lg": "0 0 50px rgba(34, 211, 238, 0.4)",
        "emergency-glow": "0 0 30px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.2)",
        "emergency-glow-lg": "0 0 60px rgba(239, 68, 68, 0.6), 0 0 90px rgba(239, 68, 68, 0.3)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "slide-up": {
          "from": { transform: "translateY(40px)", opacity: "0" },
          "to": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in-up": {
          "from": { transform: "translateY(30px)", opacity: "0" },
          "to": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
