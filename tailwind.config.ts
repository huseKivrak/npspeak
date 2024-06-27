import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import { balatroTheme } from './styles/balatroTheme';
import { greyscaleTheme } from './styles/greyscaleTheme';
import { mainTheme } from './styles/mainTheme';

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        alagard: ['var(--font-alagard)'],
        grenze: ['var(--font-grenze)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      layout: {},
      themes: {
        balatro: balatroTheme,
        greyscale: greyscaleTheme,
        mainTheme
      },
    }),
  ],
};
export default config;
