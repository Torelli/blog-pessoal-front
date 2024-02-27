/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        closeModal: {
          "0%": {
            visibility: "visible",
          },
          "100%": {
            visibility: "hidden",
          },
        },
      },
    },
    plugins: [],
  },
};
