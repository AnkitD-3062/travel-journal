/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#12182b",
          light: "#1b2337",
          card: "#232d46",
          border: "#2e3b59",
        },
        paper: {
          DEFAULT: "#f4efe3",
          light: "#fcf9f2",
          dark: "#ede6d3",
          border: "#dcd4c0",
        },
        gold: {
          DEFAULT: "#c9a227",
          light: "#e0c775",
          dark: "#9c7c1b",
        },
        teal: {
          DEFAULT: "#4c7a6e",
          light: "#6f9a8d",
          dark: "#33554c",
        },
        brick: {
          DEFAULT: "#a9503f",
          light: "#c26d5c",
        },
        sand: "#e8dfcc",
        muted: "#8a93ac",
      },
      fontFamily: {
        serif: ["Georgia", "Playfair Display", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        'paper': '0 15px 35px -10px rgba(0, 0, 0, 0.35)',
        'paper-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        'glow-gold': '0 0 20px -3px rgba(201, 162, 39, 0.3)',
      }
    },
  },
  plugins: [],
}
