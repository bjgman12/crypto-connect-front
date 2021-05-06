module.exports = {
  // mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        login: '250px',
        nav: '330px',
      },
      fontSize: {
        mobileHeader: '42px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
