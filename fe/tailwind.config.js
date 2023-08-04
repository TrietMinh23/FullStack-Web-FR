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
        "dark-jungle-green": "#13182B",
        "steel-teal": "#55928B",
        "light-grey": "#D2D2D2",
        cultured: "#F5F5F5",
        "philippine-yellow": "#F7CA00",
        graydark: "#333A48",
        'meta-4': "#313D4A",
        primary: '#3C50E0',
        secondary: '#80CAEE',
        "venetian-red": "#ee4d2d",
        lotion: "#fafafa",
        primary: "#3C50E0",
        secondary: "#80CAEE",
      },
      flexGrow: {
        2: "2",
      },
      boxShadow: {
        inner: "inset 0 2px 0 0 rgba(0, 0, 0, .02)",
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
