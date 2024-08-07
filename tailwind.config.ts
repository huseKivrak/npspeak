import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';

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
        redHatMono: ['var(--font-mono)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      prefix: 'nextui',
      addCommonColors: false,

      themes: {
        light: {
          colors: {
            default: {
              '50': '#efece9',
              '100': '#d8d1c9',
              '200': '#c2b7aa',
              '300': '#ab9c8b',
              '400': '#95826b',
              '500': '#7e674c',
              '600': '#68553f',
              '700': '#524331',
              '800': '#3c3124',
              '900': '#261f17',
              foreground: '#25252c',
              DEFAULT: '#7e674c',
            },
            primary: {
              '50': '#ecf1f4',
              '100': '#d1dde5',
              '200': '#b6c9d6',
              '300': '#9cb5c7',
              '400': '#81a1b8',
              '500': '#668da9',
              '600': '#54748b',
              '700': '#425c6e',
              '800': '#304350',
              '900': '#1f2a33',
              foreground: '#ede4da',
              DEFAULT: '#668da9',
            },
            secondary: {
              '50': '#f7f0f4',
              '100': '#ebdbe4',
              '200': '#dfc6d4',
              '300': '#d3b1c5',
              '400': '#c89cb5',
              '500': '#bc87a5',
              '600': '#9b6f88',
              '700': '#7a586b',
              '800': '#59404e',
              '900': '#382932',
              foreground: '#ede4da',
              DEFAULT: '#bc87a5',
            },
            success: {
              '50': '#eaefea',
              '100': '#ccd8cc',
              '200': '#aec1ae',
              '300': '#91ab91',
              '400': '#739473',
              '500': '#557d55',
              '600': '#466746',
              '700': '#375137',
              '800': '#283b28',
              '900': '#1a261a',
              foreground: '#ede4da',
              DEFAULT: '#557d55',
            },
            warning: {
              '50': '#fdf6e9',
              '100': '#fae9cb',
              '200': '#f7dcac',
              '300': '#f4cf8e',
              '400': '#f1c26f',
              '500': '#eeb551',
              '600': '#c49543',
              '700': '#9b7635',
              '800': '#715626',
              '900': '#473618',
              foreground: '#ede4da',
              DEFAULT: '#eeb551',
            },
            danger: {
              '50': '#f8eaea',
              '100': '#efcdcc',
              '200': '#e6b0ae',
              '300': '#dd9390',
              '400': '#d37672',
              '500': '#ca5954',
              '600': '#a74945',
              '700': '#833a37',
              '800': '#602a28',
              '900': '#3d1b19',
              foreground: '#ede4da',
              DEFAULT: '#ca5954',
            },
            background: '#ede4da',
            foreground: {
              '50': '#e4e4e5',
              '100': '#bebec0',
              '200': '#97979b',
              '300': '#717176',
              '400': '#4b4b51',
              '500': '#25252c',
              '600': '#1f1f24',
              '700': '#18181d',
              '800': '#121215',
              '900': '#0b0b0d',
              foreground: '#ede4da',
              DEFAULT: '#25252c',
            },
            content1: {
              DEFAULT: '#d4c2b6',
              foreground: '#25252c',
            },
            content2: {
              DEFAULT: '#bdaa97',
              foreground: '#25252c',
            },
            content3: {
              DEFAULT: '#86735b',
              foreground: '#25252c',
            },
            content4: {
              DEFAULT: '#7e674c',
              foreground: '#25252c',
            },
            focus: '#668da9',
            overlay: '#bdaa97',
            divider: '#716560',
          },
        },
        dark: {
          colors: {
            default: {
              '50': '#1e1d1f',
              '100': '#2f2e31',
              '200': '#403f43',
              '300': '#525055',
              '400': '#636167',
              '500': '#7e7d82',
              '600': '#9a989c',
              '700': '#b5b4b7',
              '800': '#d0d0d1',
              '900': '#ecebec',
              foreground: '#ede4da',
              DEFAULT: '#636167',
            },
            primary: {
              '50': '#1f2a33',
              '100': '#304350',
              '200': '#425c6e',
              '300': '#54748b',
              '400': '#668da9',
              '500': '#81a1b8',
              '600': '#9cb5c7',
              '700': '#b6c9d6',
              '800': '#d1dde5',
              '900': '#ecf1f4',
              foreground: '#ede4da',
              DEFAULT: '#668da9',
            },
            secondary: {
              '50': '#382932',
              '100': '#59404e',
              '200': '#7a586b',
              '300': '#9b6f88',
              '400': '#bc87a5',
              '500': '#c89cb5',
              '600': '#d3b1c5',
              '700': '#dfc6d4',
              '800': '#ebdbe4',
              '900': '#f7f0f4',
              foreground: '#ede4da',
              DEFAULT: '#bc87a5',
            },
            success: {
              '50': '#1a261a',
              '100': '#283b28',
              '200': '#375137',
              '300': '#466746',
              '400': '#557d55',
              '500': '#739473',
              '600': '#91ab91',
              '700': '#aec1ae',
              '800': '#ccd8cc',
              '900': '#eaefea',
              foreground: '#ede4da',
              DEFAULT: '#557d55',
            },
            warning: {
              '50': '#473618',
              '100': '#715626',
              '200': '#9b7635',
              '300': '#c49543',
              '400': '#eeb551',
              '500': '#f1c26f',
              '600': '#f4cf8e',
              '700': '#f7dcac',
              '800': '#fae9cb',
              '900': '#fdf6e9',
              foreground: '#ede4da',
              DEFAULT: '#eeb551',
            },
            danger: {
              '50': '#3d1b19',
              '100': '#602a28',
              '200': '#833a37',
              '300': '#a74945',
              '400': '#ca5954',
              '500': '#d37672',
              '600': '#dd9390',
              '700': '#e6b0ae',
              '800': '#efcdcc',
              '900': '#f8eaea',
              foreground: '#ede4da',
              DEFAULT: '#ca5954',
            },
            background: '#25252c',
            foreground: {
              '50': '#474441',
              '100': '#716c68',
              '200': '#9a948e',
              '300': '#c4bcb4',
              '400': '#ede4da',
              '500': '#f0e9e0',
              '600': '#f3ede7',
              '700': '#f6f2ed',
              '800': '#faf7f4',
              '900': '#fdfcfa',
              foreground: '#353540',
              DEFAULT: '#ede4da',
            },
            content1: {
              DEFAULT: '#282729',
              foreground: '#ede4da',
            },
            content2: {
              DEFAULT: '#3b3a3e',
              foreground: '#ede4da',
            },
            content3: {
              DEFAULT: '#636167',
              foreground: '#ede4da',
            },
            content4: {
              DEFAULT: '#c1c0c2',
              foreground: '#ede4da',
            },
            focus: '#668da9',
            overlay: '#282729',
            divider: '#636167',
          },
        },
      },
      layout: {
        fontSize: {
          tiny: '1rem',
          small: '1.125rem',
          medium: '1.25rem',
          large: '1.375rem',
        },
        lineHeight: {
          tiny: '1.25rem',
          small: '1.5rem',
          medium: '1.75rem',
          large: '2rem',
        },
        radius: {
          small: '2px',
          medium: '4px',
          large: '6px',
        },
        borderWidth: {
          small: '1px',
          medium: '2px',
          large: '3px',
        },
        disabledOpacity: '0.3',
        dividerWeight: '2',
        hoverOpacity: '0.8',
        boxShadow: {
          small: '3px 3px 0px 0px #000',
          medium: '6px 6px 0px 0px #000',
          large: '9px 9px 0px 0px #000',
        },
      },
    }),
  ],
};
export default config;
