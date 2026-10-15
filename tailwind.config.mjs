/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: 'var(--color-bg)',
          card: 'var(--color-card)',
          border: 'var(--color-border)',
          ink: 'var(--color-ink)',
          muted: 'var(--color-muted)',
          saffron: {
            DEFAULT: '#d97706',
            light: '#f59e0b',
            dark: '#b45309',
            subtle: 'rgba(217, 119, 6, 0.1)',
          },
          emerald: {
            DEFAULT: '#059669',
            light: '#10b981',
            dark: '#047857',
            subtle: 'rgba(5, 150, 105, 0.1)',
          },
          ruby: {
            DEFAULT: '#dc2626',
            light: '#ef4444',
            dark: '#b91c1c',
            subtle: 'rgba(220, 38, 38, 0.1)',
          },
          gold: '#eab308',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Cambria', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'var(--color-ink)',
            a: {
              color: '#d97706',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                color: '#b45309',
              },
            },
            h1: { fontFamily: 'Newsreader, Georgia, serif' },
            h2: { fontFamily: 'Newsreader, Georgia, serif' },
            h3: { fontFamily: 'Newsreader, Georgia, serif' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
