/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'light-green': 'var(--light-green)',
        'dark-green': 'var(--dark-green)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'text-color': 'var(--text-color)',
        red1: 'var(--red1)',
      },
      backgroundImage: {
        'sidebar': 'linear-gradient(180deg, #133C3C 0%, #475D5D 100%)',
        'metric-1': 'linear-gradient(180deg, #0E60EE 0%, #8A4189 100%)',
        'metric-2': 'linear-gradient(180deg, #E7C60F 0%, #784908 100%)',
        'metric-3': 'linear-gradient(180deg, #7D0034 0%, #CC4911 100%)',
        'popup': 'linear-gradient(180deg, #000000 0%, #4F4F4F 100%)',
      },
      
    },
  },
  plugins: [],
};
