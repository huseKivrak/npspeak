import { ConfigTheme } from '@nextui-org/react';

export const mainTheme: ConfigTheme = {
  extend: 'dark',
  layout: {
    fontSize: {
      tiny: '0.9375rem',
      small: '1.09375rem',
      medium: '1.25rem',
      large: '1.40625rem',
    },
    lineHeight: {
      tiny: '1.25rem',
      small: '1.5rem',
      medium: '1.75rem',
      large: '2rem',
    },
    // radius: {
    //   small: '10px', // rounded-small
    //   medium: '15px', // rounded-medium
    //   large: '18px', // rounded-large
    // },
    // borderWidth: {
    //   small: '2px', // border-small
    //   medium: '3px', // border-medium (default)
    //   large: '4px', // border-large
    // },
  },

  colors: {
    background: 'hsl(0, 0%, 13%)',
    foreground: 'hsl(0, 0%, 91%)',
    focus: 'hsl(0, 0%, 91%)',
    default: 'hsl(0, 0%, 35%)',
    primary: 'hsl(0, 0%, 50%)',
    secondary: 'hsl(0, 0%, 45%)',
    success: {
      '50': '#eef6f3',
      '100': '#ddede7',
      '200': '#bbdccf',
      '300': '#9acab7',
      '400': '#78b99f',
      '500': '#56a787',
      '600': '#45866c',
      '700': '#346451',
      '800': '#224336',
      '900': '#11211b',
      DEFAULT: '#56a787',
      foreground: '#FFFFFF',
    },
    warning: 'hsl(0, 0%, 40%)',
    danger: {
      '50': '#ffefee',
      '100': '#fedfdd',
      '200': '#febfbb',
      '300': '#fd9e98',
      '400': '#fd7e76',
      '500': '#fc5e54',
      '600': '#ca4b43',
      '700': '#973832',
      '800': '#652622',
      '900': '#321311',
      DEFAULT: '#fc5e54',
      foreground: '#FFFFFF',
    },
  },
};
