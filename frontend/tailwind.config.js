import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        third: 'rgb(var(--color-third))',
        text: 'rgb(var(--color-text))',
        bot: 'rgba(var(--color-bot),0.5)',
        user: 'rgba(var(--color-user), 0.5)',
        success: 'rgb(var(--color-success))',
        warning: 'rgba(var(--color-warning), 0.3)',
        error: 'rgb(var(--color-error))',
        information: 'rgba(var(--color-information), 0.5)',
        bg: 'rgb(var(--color-bg))', // Corrigé pour utiliser la variable
      },
      animation: {
        loading: 'loading 0.5s alternate infinite ease',
      },
      keyframes: {
        loading: {
          '0%': { top: '1rem' }, // Corrigé : '0%' au lieu de 'O%'
          '40%': { borderRadius: '50%' },
          '100%': { top: '0%' },
        },
      },
    },
  },
  plugins: [],
};