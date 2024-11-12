/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{pug,html,css}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3a86ff",
        "gray-dark": "#414558",
        "dark-body": "#242938",
        light: "#edf2f4",
      },
    },
    fontFamily: {
      display: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};