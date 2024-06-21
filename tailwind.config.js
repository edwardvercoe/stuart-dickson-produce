const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,

    extend: {
      fontFamily: {
        sans: 'var(--font-poppins)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
