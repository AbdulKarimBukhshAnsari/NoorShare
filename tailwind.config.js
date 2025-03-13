/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}" , "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FFFDD0", // Soft Cream (Main Background)
          beige: "#F8E5B0", // Warm Beige
          lightgold: "#EAD08B", // Light Gold
          softwhite: "#FFF4E1", // Soft White
        },
        secondary: {
          DEFAULT: "#760F13", // Deep Maroon (Main Accent)
          dark: "#5A0B0E", // Dark Maroon
          muted: "#A32A30", // Muted Maroon
          soft: "#C45C5F", // Soft Red
        },
        accent: {
          gold: "#D4A017", // Gold/Yellow (Icons, highlights)
          gray: "#B6A999", // Soft Gray (Borders, secondary text)
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
        aquran : ["Al-Mushaf-Quran" , "sans-serif"],
        qquran : ['Al-Qalam-Quran' , "sans-serif"],
        cregular: ["Clarendon-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
}