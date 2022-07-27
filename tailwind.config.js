/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-bg-img': "url('/images/hero_bg.jpg')",
        'tvBg': "url('/images/tv.png')",
        'notFoundBg':"url('/images/bg-lost-in-space.png')",
        'elipse-gradient': 'radial-gradient(ellipse at center,rgba(0,0,0,.7) 0,rgba(0,0,0,.2) 45%,rgba(0,0,0,.2) 55%,transparent 70%)',
      },
      colors: {
        'netGray':'#303030',
        'linksGrey':'#737373',
        'redBtn':'#e50914',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
