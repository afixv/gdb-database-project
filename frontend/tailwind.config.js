/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: "#FF70A5",
        "blue-white": "#99CEFF",
        "sky-blue": "#87CEEB",
      },
    },
  },
  plugins: [],
});
