module.exports = {
  darkMode: 'class', 
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
      },
    },
  },
  plugins: [],
}
