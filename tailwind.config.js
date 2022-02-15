const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: { 150: "150px", "70-screen": "70vh" },
      width: { 150: "150px", "fit-content": "fit-content" },
      colors: {
        readee: {
          light: "#D6EBEB",
          DEFAULT: "#48D0B0",
          dark: "#258972",
        },
        primary: {
          light: "#EFE9E2",
          DEFAULT: "#f8bd6e",
        },
        secondary: {
          DEFAULT: "#e0526d",
        },
        dark: {
          DEFAULT: "#142F43",
        },
        "light-blue": colors.lightBlue,
        cyan: colors.cyan,
      },
      maxHeight: {
        "70-screen": "70vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
