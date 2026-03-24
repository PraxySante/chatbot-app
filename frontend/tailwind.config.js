import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        third: 'rgb(var(--color-third))',

        text: 'rgb(var(--color-text))',
        title: 'rgb(var(--color-title))',
        subTitle: 'rgb(var(--color-subtitle))',
        textHover: 'rgb(var(--color-text-hover))',
        link: 'rgb(var(--color-link))',
        linkHover: 'rgb(var(--color-link-hover))',

        bg: 'rgb(var(--color-bg))',

        bot: 'rgba(var(--color-bot),0.5)',
        textBot: 'rgb(var(--chat-text-bot))',
        bgBot: 'rgb(var(--chat-bg-bot))',
        borderBot: 'rgb(var(--chat-border-bot))',

        user: 'rgba(var(--color-user), 0.5)',
        textUser: 'rgb(var(--chat-text-user))',
        bgUser: 'rgb(var(--chat-bg-user))',
        borderUser: 'rgb(var(--chat-border-user))',

        success: 'rgba(var(--color-success), 0.3)',
        warning: 'rgba(var(--color-warning), 0.3)',
        error: 'rgba(var(--color-error), 0.3)',
        information: 'rgba(var(--color-information), 0.5)',
      },
      animation: {
        loading: 'loading 0.5s alternate infinite ease',
      },
      keyframes: {
        loading: {
          '0%': { top: '1rem' },
          '40%': { borderRadius: '50%' },
          '100%': { top: '0%' },
        },
      },
    },
  },
  plugins: [],
};
