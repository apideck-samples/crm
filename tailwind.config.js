const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Basier Circle', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/ui'),
    function ({ addBase }) {
      addBase([
        {
          '@font-face': {
            fontFamily: 'Basier Circle',
            fontWeight: '100 400',
            fontStyle: 'normal',
            fontNamedInstance: 'Regular',
            fontDisplay: 'swap',
            src: `url("/fonts/barier-circle/basiercircle-regular.woff2") format("woff2"), url("/fonts/barier-circle/basiercircle-regular.woff") format("woff"), url("/fonts/barier-circle/basiercircle-regular.otf") format("otf")`
          }
        },
        {
          '@font-face': {
            fontFamily: 'Basier Circle',
            fontWeight: '500 700',
            fontStyle: 'normal',
            fontNamedInstance: 'Medium',
            fontDisplay: 'swap',
            src: `url("/fonts/barier-circle/basiercircle-medium.woff2") format("woff2"), url("/fonts/barier-circle/basiercircle-medium.woff") format("woff"), url("/fonts/barier-circle/basiercircle-medium.otf") format("otf")`
          }
        },
        {
          '@font-face': {
            fontFamily: 'Basier Circle',
            fontWeight: '800 900',
            fontStyle: 'normal',
            fontNamedInstance: 'Bold',
            fontDisplay: 'swap',
            src: `url("/fonts/barier-circle/basiercircle-semibold.woff2") format("woff2"), url("/fonts/barier-circle/basiercircle-semibold.woff") format("woff"), url("/fonts/barier-circle/basiercircle-semibold.otf") format("otf")`
          }
        }
      ])
    }
  ]
}
