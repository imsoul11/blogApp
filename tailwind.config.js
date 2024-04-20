// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '120': '35rem', // 480px
      },
      scale: {
        '105': '1.005',
      },
      
    },
  },
  plugins: [],
}
