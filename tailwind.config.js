module.exports = {
  purge: ["./public/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: { 150: "150px" },
      width: { 150: "150px" },
      colors: {
        readee: {
          light: "#D6EBEB",
          DEFAULT: "#48D0B0",
          dark: "#258972",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
