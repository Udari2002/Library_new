/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',   // Indigo-600
        accent: '#059669',    // Emerald-500
        bgSoft: '#f9fafb',    // Gray-50
        textMain: '#1f2937',  // Gray-800
      },
    },
  },
  plugins: [],
}
