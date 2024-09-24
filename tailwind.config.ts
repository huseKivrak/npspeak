import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import theme from './styles/theme';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '.styles/**/*.{js, ts, jsx, tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        alagard: ['var(--font-alagard)'],
        mono: ['var(--font-mono)'],
        rht: ['var(--font-rht)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      themes: theme.colors,
      layout: theme.layout,
    }),
  ],
};
export default config;
