/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // Añade esta línea
  theme: {
    extend: {
      fontFamily: {
        primary: ['"BeVietnamPro"', "sans-serif"],
      },

      colors: {
        "primary-200": "hsl(157.864, 67%, 70%)",
        primary: "hsl(161.647, 70%, 52%)",
        "secondary-200": "hsl(180, 60%, 69%)",
        secondary: "hsl(181.324, 61%, 56%)",
        dark: "hsl(0, 0%, 11%)",
        "dark-200": "hsl(0, 0%, 6%)",
        light: "hsl(0, 0%, 25%)",
        black: "hsl(0, 0%, 0%)",
        white: "hsl(0, 0%, 100%)",
        gray: "hsl(180, 23%, 95%)",
      },
      backgroundColor: {
        "primary-200": "hsl(157.864, 67%, 70%)",
        primary: "hsl(161.647, 70%, 52%)",
        "secondary-200": "hsl(180, 60%, 69%)",
        secondary: "hsl(181.324, 61%, 56%)",
        dark: "hsl(0, 0%, 11%)",
        "dark-200": "hsl(0, 0%, 6%)",
        "gray:": "hsl(180, 23%, 95%)",
      },

      backgroundImage: {
        "close-menu": 'url("assets/icon-close.svg")',
        "open-menu": 'url("assets/icon-hamburger.svg")',
      },
      boxShadow: {
        "primary-hover": "0 0 0 2px hsl(161.647, 70%, 52%)",
        "focus-primary": "0 0 2px 3px hsla(161.647, 70%, 52%, 0.3)", // Añade esta línea
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover", "focus"], // Añade "focus" aquí
    },
  },
  plugins: [],
};
