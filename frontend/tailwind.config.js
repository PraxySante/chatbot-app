import colors from 'tailwindcss/colors';
import config from './src/config/config.json';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        text: config.design.text,
        bot: config.design.bot,
        user: config.design.user,
        primary: config.design.primary,
        secondary: config.design.secondary,
        third: config.design.third,
        bg:'rgb(255, 255, 255)',

        sucess: config.design.sucess,
        warning: config.design.warning,
        error: config.design.error,
        information: config.design.information,
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
