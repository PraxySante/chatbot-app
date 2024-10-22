/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        bot: 'var(--bot)',
        user: 'var(--user)',
        primary: 'var(--primay)',
        secondary: 'var(--secondary)',
        third: 'var(--third)',
      },
    },
  },
  plugins: [],
};
