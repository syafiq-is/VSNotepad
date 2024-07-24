/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{vue,ts}"],
  theme: {
    extend: {
      colors: {
        myBrand: "#00EDC7",
        myDarkest: "#181818",
        myDarker: "#1F1F1F",
        myDark: "#242424",
        myGray: "#37373D",
        myDarkWhite: "#b8b8b8",
      },
    },
  },
  plugins: [],
};
