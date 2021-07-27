module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: { "150": "150px" },
      width: { "150": "150px" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
