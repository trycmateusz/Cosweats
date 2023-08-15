/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  
  theme: {
    fontFamily: {
      'violetSans': ['Violet Sans', 'sans-serif'],
      'halibutSerifRegular': ['Halibut Serif', 'sans-serif'],
      'halibutSerifThin': ['Halibut Serif Thin', 'sans-serif'],
      'halibutSerifExpanded': ['Halibut Serif Expanded', 'sans-serif'],
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        'whiteishMain': '#ECE6DB',
        'whiteishDarker': '#E8D6CA',
        'whiteishPink': '#e6d4d2',
        'pinkDarker': '#b89088',
        'pinkMain': '#dd9e8d',
        'pinkDark': '#574a56',
        'blackishMain': '#211c1b',
        'borderDarkColor': '#474545',
        'grayLight': '#e8dcdc',
        'grayDark': '#5c5856'
      },
      fontSize: {
        '10xl': '10rem'
      }
    },
  },
  plugins: [],
}
