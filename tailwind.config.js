/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['"Vazirmatn"', "serif"], // Set as default sans font
      },
      
      backgroundImage: {
        "geo-img": "url('src/assets/geometric-bg.svg')",
      },
      darkMode: "class",
      plugins: [require("@tailwindcss/forms")],
    },
  },
};
