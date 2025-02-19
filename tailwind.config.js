/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 15s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff5722",  
          "secondary": "#03a9f4",
          "accent": "#8e24aa",
          "neutral": "#2a2e37",
          "base-100": "#ffffff", 
          "base-content": "#1a1a1a", 
          "info": "#29b6f6",
          "success": "#66bb6a",
          "warning": "#ffa726",
          "error": "#ef5350",
        },
      },
      {
        dark: {
          "primary": "#ff9800",
          "secondary": "#03a9f4",
          "accent": "#8e24aa",
          "neutral": "#1e1e1e",
          "base-100": "#121212", 
          "base-content": "#ffffff", 
          "info": "#29b6f6",
          "success": "#66bb6a",
          "warning": "#ffa726",
          "error": "#ef5350",
        },
      },
    ],
  },
};
