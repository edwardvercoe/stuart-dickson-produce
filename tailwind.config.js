const { theme } = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      ...theme,
  	extend: {
  		fontFamily: {
  			sans: 'var(--font-rubik)'
  		},
  		colors: {
  			accent: '#F2A71B',
  			secondary: '#fefbf5',
  			'brand-black': '#0D1615',
  			'brand-darker-green': '#263000',
  			'brand-mahogany': '#8C2C08',
  			'brand-gray': '#667085',
  			'brand-orange': '#F27D16'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require('@tailwindcss/typography'), require("tailwindcss-animate")],
}
