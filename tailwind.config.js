const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      colors:{
        primary: '#1F2858',
        secondary: '#B3D1F4',
        black: "#111111",
        white: "#F5F5F5",
        oilblack: '#0B1215',
      }
    },
  },
  plugins: [nextui()],
};
