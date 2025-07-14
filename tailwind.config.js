/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}", // ✅ Scans all components/pages for Tailwind classes
  ],
  theme: {
    extend: {}, // ✅ Place to customize your theme (e.g., fonts, colors)
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ], // ✅ You can add Tailwind plugins like typography/forms here
}
