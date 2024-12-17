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
        ltgreen:'E1EFE6',
        greenbg: '#046C71',
        darkgreen:'hsl(180, 51.90%, 15.50%)',
        customGray: 'rgba(51, 50, 50, 1)',
        background: "var(--background)",
        searchbar: "#D9D9D9",
        heading: "hsl(180, 51.90%, 15.50%)",
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
        'metric-2': 'linear-gradient(180deg, #103535 0%, #EDCC48 100%)',
        'metric-3': 'linear-gradient(180deg, #660909 0%, #CC1114 100%)',
        'popup': 'linear-gradient(180deg, #000000 0%, #4F4F4F 100%)',
      },
      
    },
  },
  plugins: [],
};
