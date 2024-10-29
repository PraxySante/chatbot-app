import colors from 'tailwindcss/colors';
import animation from 'tailwindcss/animation';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        text: 'var(--text)',
        bot: 'var(--bot)',
        user: 'var(--user)',
        primary: 'var(--primay)',
        secondary: 'var(--secondary)',
        third: 'var(--third)',

        sucess: 'var(--sucess)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        information: 'var(--information)',
      },
      animation: {
        loading: 'loading 0.5s alternate infinite ease',
      },
      keyframes: {
        loading: {
          'O%': { top: '1rem' },
          '40%': { borderRadius: '50%' },
          '100%': { top: '0%' },
        },
      },
    },
  },
  plugins: [],
};
