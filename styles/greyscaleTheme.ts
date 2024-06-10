import { ConfigTheme } from '@nextui-org/react';

export const greyscaleTheme: ConfigTheme = {
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
    success: 'hsl(0, 0%, 40%)',
    warning: 'hsl(0, 0%, 40%)',
    danger: 'hsl(0, 0%, 25%)',
  },
};
