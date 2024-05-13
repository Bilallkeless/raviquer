/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/css/**/*.css", "./views/**/*.html", "./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      margin: {
        100: "100px",
      },
    },
  },
  plugins: [],
};
