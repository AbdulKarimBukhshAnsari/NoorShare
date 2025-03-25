/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/**/*.{js,jsx,ts,tsx}"],

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
        silver: "#A39E9E", // Overlay Color
        rosewood: "#AC9096", // Text Color
        white: "#FFFFFF", // Border Color
        roseTaupe: "#CAA7AB", // Button Background
        deepTaupe: "#864A62", // Bottom Menu
        melon: "#F3B3B8", // Sign-in Overlay
        burgundy: "#6A1A39", // Burgundy (for text and icon)
        pinkLavender: "#E2B4BA", // Dark Pink
        babyPink: "#E9C6CB", // Light Pink
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
        aquran: ["Al-Mushaf-Quran", "sans-serif"],
        qquran: ["Al-Qalam-Quran", "sans-serif"],
        cregular: ["Clarendon-Regular", "sans-serif"],
        indoquran: ["Indopak-Nastaleeq-font", "sans-serif"],
        // newly added fonts 
      
        sorga: ["Sorga-Demo", "sans-serif"],
        osbold: ["OpenSans-Bold", "sans-serif"],
        osbolditalic: ["OpenSans-BoldItalic", "sans-serif"],
        osextrabold: ["OpenSans-ExtraBold", "sans-serif"],
        osextrabolditalic: ["OpenSans-ExtraBoldItalic", "sans-serif"],
        oslight: ["OpenSans-Light", "sans-serif"],
        oslightitalic: ["OpenSans-LightItalic", "sans-serif"],
        ossemibold: ["OpenSans-SemiBold", "sans-serif"],
        ossemibolditalic: ["OpenSans-SemiBoldItalic", "sans-serif"],
        osmedium: ["OpenSans-Medium", "sans-serif"],
        osmediumitalic: ["OpenSans-MediumItalic", "sans-serif"],
        ositalic: ["OpenSans-Italic", "sans-serif"],
        osregular: ["OpenSans-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
