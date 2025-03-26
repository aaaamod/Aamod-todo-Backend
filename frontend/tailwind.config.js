/** @type {import('tailwindcss').Config} */
export default {
  corePlugins:{
    preflight:false
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        blue:{
          "200":"#111827",
          "300":"#2563eb"
        },
        gray:{
          "20":"#1f2937",
          "30":"#787f8c",
          "40":"#374151"
        },
       
      },
      fontSize:{
        "vs":"10px",
        "xs":"12px"
      }
    },
  },
  plugins: [],
}

