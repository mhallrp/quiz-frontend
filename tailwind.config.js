/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["roboto", "Arial", "san-serif"],
        oswald: ['Oswald', "sans-serif"],
      },
      backgroundImage: {
        main:"linear-gradient(126deg, #F9ED32 4.79%, #D9BD32 54.4%)"
      },
      colors:{
        darkYellow:"#FFD600",
        grey:"#EAEAEA",
        mustard:"#BB8700",
      },
    },
  },
  plugins: [],
}

