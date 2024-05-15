/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        MainFont: ["Fira Sans", "sans-serif"],
      },
      colors: {
        "app-pumpkin": "#FF6600",
        "app-blue": "#00A7E1",
        "app-raspberry": "#D81E5B"
      },
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slidein: "slidein 1s ease 300ms",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
