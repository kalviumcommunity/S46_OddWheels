/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pallet1: "#0D2100",
      },
      height: {
        "7/100": "7%",
        "91/100": "91%",
      },
    },
  },

  plugins: [],
};
