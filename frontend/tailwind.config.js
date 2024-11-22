/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        typing: {
          from: {
            width: "0%",
          },
          to: {
            width: "100%",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-7deg)" },
          "50%": { transform: "rotate(7deg)" },
        },
        blinking: {
          "0%": { borderRightColor: "transparent" },
          "50%": { borderRightColor: "inherit" },
          "100%": { borderRightColor: "transparent" },
        },
      },
      animation: {
        typing: "typing 1.5s steps(30, end) forwards, blinking 1s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
