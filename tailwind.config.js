/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  safelist: [
    // Add safelist for dynamically generated color classes
    {
      pattern: /bg-(amber|red|green|blue|purple|teal|sky|gray|yellow|orange|rose)-(50|100|500|600)/,
    },
    {
      pattern: /from-(amber|red|green|blue|purple|teal|sky|gray|yellow|orange|rose)-(50|100)/,
    },
    {
      pattern: /to-(amber|red|green|blue|purple|teal|sky|gray|yellow|orange|rose)-(50|100)/,
    },
    {
      pattern: /text-(amber|red|green|blue|purple|teal|sky|gray|yellow|orange|rose)-(500|600)/,
    },
    {
      pattern: /border-(amber|red|green|blue|purple|teal|sky|gray|yellow|orange|rose)-(500|600)/,
    },
    // Additional patterns for testimonials and customer section
    {
      pattern: /bg-(primary|blue|green|purple|amber)-(DEFAULT|500)/,
    },
    'bg-primary',
    'from-primary/10',
    'to-primary/20',
    '-space-x-2',
  ],
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}; 