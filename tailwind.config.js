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
        "mtg-blue-secondary": "#4687b8",
        "mtg-black": "#120126",
        "mtg-black-secondary": "#301252",
        "mtg-red": "#d3202a",
        "mtg-red-secondary": "#bf4d53",
        "mtg-green": "#00733d",
        "mtg-green-secondary": "#2a9664",
        "mtg-gold": "#fcba03",
        "mtg-gold-secondary": "#c49d2f",
        "mtg-colorless": "#878787",
        "mtg-colorless-secondary": "#ababab",
        "mtg-land": "#592b14",
        "mtg-land-secondary": "#784228",

        "primary-100": "#382bf0",
        "primary-200": "#5e43f3",
        "primary-300": "#7a5af5",
        "primary-400": "#9171f8",
        "primary-500": "#a688fa",
        "primary-600": "#ba9ffb",

        "dark-100": "#121212",
        "dark-200": "#282828",
        "dark-300": "#3f3f3f",
        "dark-400": "#575757",
        "dark-500": "#717171",
        "dark-600": "#8b8b8b",

        "background-100": "#1a1625",
        "background-200": "#2f2b3a",
        "background-300": "#46424f",
        "background-400": "#5e5a66",
        "background-500": "#76737e",
        "background-600": "#908d96",
      },
    },
  },
  plugins: [],
};
