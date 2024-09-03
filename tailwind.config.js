/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "mtg-white": "#f9faf4",
        "mtg-white-secondary": "#f8e7b9",
        "mtg-blue": "#0e68ab",
        "mtg-blue-secondary": "#b3ceea",
        "mtg-black": "#150b00",
        "mtg-black-secondary": "#a69f9d",
        "mtg-red": "#d3202a",
        "mtg-red-secondary": "#eba082",
        "mtg-green": "#00733d",
        "mtg-green-secondary": "#c4d3ca",
      },
    },
  },
  plugins: [],
};
