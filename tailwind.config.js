/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        1: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        2: '0 4px 8px 0 rgba(253, 116, 1), 0 6px 20px 0 rgba(253, 116, 1)',
      }
    },
  },
  plugins: [],
}

