/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],

  theme: {
    fontFamily: {
      violetSans: ['Violet Sans', 'sans-serif'],
      halibutSerifRegular: ['Halibut Serif', 'sans-serif'],
      halibutSerifThin: ['Halibut Serif Thin', 'sans-serif'],
      halibutSerifExpanded: ['Halibut Serif Expanded', 'sans-serif']
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
    extend: {
      colors: {
        whiteishMain: '#ECE6DB',
        whiteishDarker: '#E8D6CA',
        whiteishPink: '#e6d4d2',
        pinkDarker: '#b89088',
        pinkMain: '#dd9e8d',
        pinkDark: '#574a56',
        blackishMain: '#211c1b',
        blackishDark: '#111010',
        borderDarkColor: '#474545',
        grayLight: '#e8dcdc',
        grayDark: '#5c5856'
      },
      fontSize: {
        '10xl': '10rem'
      },
      transform: {
        flipHorizontally: 'rotateY(180deg)'
      }
    }
  },
  plugins: []
}
