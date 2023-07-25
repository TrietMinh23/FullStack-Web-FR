const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      // table
      tl: '1110px',
      mt: '600px'
    },
    extend: {
      colors: {
        "green-sheen": "#79B695",
        "dark-pastel-red": "#C13A22",
        "silver-sand": "#B4BCC7",
        emerald: "#4EB47C",
        "light-silver": "#D9D9D9",
        "bright-gray": "#EEEEEE",
        "steel-teal": "#55928B",
        "light-grey": "#D2D2D2",
        cultured: "#F5F5F5",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
});
