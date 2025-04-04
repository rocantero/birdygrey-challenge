module.exports = {
  // prefix: "tw-",
  content: [
    "./sections/**.liquid",
    "./templates/**.liquid",
    "./snippets/**.liquid",
    "./**/*.html",
    "./**/*.js",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "750px",
      lg: "990px",
      xlg: "1440px",
      x2lg: "1920px",
      pageMaxWidth: "1440px",
    },
    extend: {
      fontFamily: {
        heading: "var(--font-heading-family)",
      },
      aspectRatio: {
        "9/12": "9 / 12",
        "11/12": "11 / 12",
      },
    },
  },
  plugins: [],
};
