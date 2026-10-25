/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./sections/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#061d43",
          950: "#040b15",
          900: "#071120",
          800: "#0b1a30",
          700: "#102544",
          600: "#183661",
        },
        orange: {
          DEFAULT: "#e85d04",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
        },
        sky: "#eef6ff",
      },
      boxShadow: {
        lift: "0 18px 50px rgba(6,29,67,.12)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
