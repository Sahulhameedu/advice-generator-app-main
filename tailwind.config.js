/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        manrope:["Manrope", 'sans-serif']
      },
      colors:{
        'lightcyan':"hsl(193, 38%, 86%)",
        'neongreen':"hsl(150, 100%, 66%)",
        'grayishblue':"hsl(217, 19%, 38%)",
        "darkgrayishblue":"hsl(217, 19%, 24%)",
        "darkblue":"hsl(218, 23%, 16%)",
      },
    },
  },
  plugins: [],
}

