/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#1F2858',
        secondary: '#B3D1F4',
        black: "#111111",
        white: "#FAF9F6",
        oilblack: '#0B1215',
      }
    },
  },
  plugins: [],
};
