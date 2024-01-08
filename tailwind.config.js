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
        greydark:"#484848",
        greylight:"#EAEAEA",
        greyanswer:"#F1F1F1",
        greyanswerb:"#989898",
        greytext:"#5A5A5A",
        selected:"#FFF500",
        correct:"#E4FFA9",
        mustard:"#BB8700",
        spinnerYellow:"#d0a310",
        black10: 'rgba(0, 0, 0, 0.1)',
        darkGreen:'#3AB400'
      },
      borderRadius: {
        '25px': '25px',
      },
    },
  },
  plugins: [
  ],
}

