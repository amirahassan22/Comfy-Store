/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), require('daisyui'),
    
  ],daisyui: {
    themes: ['winter',{dracula:{
      ...require("daisyui/src/theming/themes")["dracula"],
      "svg": {
       "color": "#ffffff"
      },
      "h1,h2,h3,h4,h5,h6,p" : {
        "color":"#ffffff"
      },
      
    }}],
  },
}

