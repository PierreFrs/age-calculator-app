/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        primaryPurple: "hsl(259, 100%, 65%)",
        primaryLightRed: "hsl(0, 100%, 67%)",
        neutralWhite: "hsl(0, 0%, 100%)",
        neutralOffWhite: "hsl(0, 0%, 94%)",
        neutralLightGrey: "hsl(0, 0%, 86%)",
        neutralSmokeyGrey: "hsl(0, 1%, 44%)",
        neutralOffBlack: "hsl(0, 0%, 8%)",
      },
      borderRadius: {
        "4xl": "100px",
      },
    },
  },
  plugins: [],
};
