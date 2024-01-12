import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  daisyui: {
    themes: ['dracula'],
  },
  plugins: [require('daisyui')],
};
export default config;
