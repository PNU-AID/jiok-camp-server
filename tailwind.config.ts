import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px',
      },
      colors: {
        'aid-blue': '#237feb',
        'aid-green': '#16A34A',
        'aid-red': '#dc4430',
        'aid-yellow': '#dcae30',
        'line-gray': '#7b7b7b',
      },
      fontFamily: {
        baloo: ['var(--Baloo)'],
      },
      screens: {
        xl: { max: '1279px' },
        lg: { max: '1023px' },
        md: { max: '767px' },
        sm: { max: '576px' },
      },
    },
  },
  plugins: [],
} satisfies Config;
