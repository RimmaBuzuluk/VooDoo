/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    extend: {
      colors:{
        'mainColor':"#FCF7E6",
      },
      padding:{
        'paddingX': '120px',
        'paddingTop': '48px'
        
      },
      width:{
        'widthV':'45px',
        'widthVooDoo':'192.79px',
        'widthShop':'20px',
        'bigBut':'101px'
      },
      height:{
        'mainHeight':'100%',
        'heightV':'45px',
        'heightVooDoo':'97.88px',
        'heightShop':'20px',
        'itemHeight': '402px'
      },
      fontSize: {
        'custom': '14px',
      },


    },
  },
  plugins: [],
}

