/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
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
      },
      flexGrow: {
        2: "2",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
