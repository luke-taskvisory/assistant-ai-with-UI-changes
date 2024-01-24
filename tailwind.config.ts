/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#A8A8A8",
        "sec-color": "#D6D6D6",
      },
    },
  },
  plugins: [],
};
