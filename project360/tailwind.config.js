/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loading: {
          to: { "clip-path": "inset(0 -0.5ch 0 0)" },
        },
        spincube: {
          "0%": { transform: "rotateX(-20deg) rotateY(20deg)" },
          "100%": { transform: "rotateX(-20deg)  rotateY(740deg)" },
        },
      },
      animation: {
        loading: "loading 1.5s steps(4) infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
