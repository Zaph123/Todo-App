/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: "var(--neutral)"
      },
      fontFamily: {
        poppins: ['Poppins', 'DM Serif Display', 'Montserrat', 'Playfair Display']
      },
    },
  },
  plugins: [],
}

