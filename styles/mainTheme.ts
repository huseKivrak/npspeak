import { ConfigTheme } from '@nextui-org/react';

/**
 * @link https://lospec.com/palette-list/cc-29
 */
export const mainTheme: ConfigTheme = {
  layout: {
    dividerWeight: '2px',
    disabledOpacity: 0.5,
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
    radius: {
      small: '10px', // rounded-small
      medium: '15px', // rounded-medium
      large: '18px', // rounded-large
    },
    borderWidth: {
      small: '2px', // border-small
      medium: '3px', // border-medium (default)
      large: '4px', // border-large
    },
  },
  colors: {
    background: '#212123',
    foreground: '#f2f0e5',
    divider: '#b8b5b9',
    focus: '#4b80ca',
    content1: '#45444f',
    content2: '#646365',
    content3: '#868188',
    content4: '#b8b5b9',
    default: {
      100: '#b8b5b9',
      200: '#868188',
      600: '#646365',
      800: '#45444f',
      DEFAULT: '#868188',
      foreground: '#212123',
    },
    primary: {
      200: '#68c2d3',
      800: '#352b42',
      DEFAULT: '#4b80ca',
      foreground: '#212123',
    },
    secondary: {
      200: '#edc8c4',
      800: '#6a536e',
      DEFAULT: '#cf8acb',
      foreground: '#212123',
    },
    success: {
      200: '#c2d368',
      800: '#4e584a',
      DEFAULT: '#8ab060',
      foreground: '#212123',
    },
    warning: {
      200: '#ede19e',
      800: '#a77b5b',
      DEFAULT: '#d3a068',
      foreground: '#212123',
    },
    danger: {
      800: '#80493a',
      DEFAULT: '#b45252',
      foreground: '#212123',
    },
  },
};
