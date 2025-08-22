/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "soft-dark": "#334155",
        "soft-gray": "#64748b",
        "soft-light": "#94a3b8",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        blink: "blink 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        blink: {
          "0%, 50%": {
            borderColor: "#06b6d4",
          },
          "51%, 100%": {
            borderColor: "transparent",
          },
        },
      },
      backdropBlur: {
        12: "12px",
      },
      transitionTimingFunction: {
        "out-cubic": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
