/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['"BeVietnamPro"', 'sans-serif'],
      },

      colors: {
        "clr-primary": "#1de099",
        "clr-secondary": "#1dc8cd",
        "clr-dark": "#1D1D1D",
        "clr-light": "#3F3F3F",
        "clr-black": "#000000",
        "clr-white": "#FFFFFF",
        "clr-gray": "#EFF5F5",

        "clr-primary-hsl": "158.154 77% 50%",
        "clr-secondary-hsl": "181.705 75% 46%",
        "clr-dark-hsl": "0 0% 11%",
        "clr-light-hsl": "0 0% 25%",
        "clr-black-hsl": "0 0% 0%",
        "clr-white-hsl": "0 0% 100%",
        "clr-gray-hsl": "180 23% 95%",
      },

      backgroundImage: {
        'close-menu': 'url("assets/icon-close.svg")',
        'open-menu': 'url("assets/icon-hamburger.svg")',
      }
    },
  },
  plugins: [],
}

