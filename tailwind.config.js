/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "big": "-4px -5px 12px 0px rgba(0,0,0,0.46) inset"
      }
    },
  },
  plugins: [],
}

