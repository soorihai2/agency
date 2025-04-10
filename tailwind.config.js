/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#3B82F6",
        accent: "#60A5FA",
        background: "#F8FAFC",
        text: "#1E293B",
        "text-light": "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      spacing: {
        section: "100px",
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(0, 0, 0, 0.1)",
        hover: "0 20px 40px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        card: "16px",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [],
};
