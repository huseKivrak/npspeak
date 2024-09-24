import { ConfigThemes, LayoutTheme } from '@nextui-org/react';

const themeColors: ConfigThemes = {
  // light: {
  //   colors: {
  //     background: {
  //       DEFAULT: '#3A4046',
  //     },
  //     foreground: {
  //       DEFAULT: '#e3cfb4',
  //       50: '#FCFAF8',
  //       100: '#F9F5F0',
  //       200: '#F4ECE1',
  //       300: '#EEE2D2',
  //       400: '#E9D9C4',
  //       500: '#E3CFB4',
  //       600: '#CDA979',
  //       700: '#B28243',
  //       800: '#77572C',
  //       900: '#3B2B16',
  //     },
  //     divider: {
  //       DEFAULT: '#',
  //     },
  //     overlay: {
  //       DEFAULT: '#624c3c',
  //     },
  //     focus: {
  //       DEFAULT: '#5c8b93',
  //     },
  //     content1: {
  //       DEFAULT: '#F9F5F0',
  //       foreground: '#1D2023',
  //     },
  //     content2: {},
  //     content3: {},
  //     content4: {},

  //     default: {
  //       foreground: '#1D2023',
  //       DEFAULT: '#624c3c',
  //       50: '#F1ECE9',
  //       100: '#E4DAD3',
  //       200: '#C9B5A6',
  //       300: '#B0927D',
  //       400: '#8E6E57',
  //       500: '#624C3C',
  //       600: '#4F3D30',
  //       700: '#3C2F25',
  //       800: '#261D17',
  //       900: '#130F0C',
  //     },
  //     primary: {
  //       50: '#F4F7FB',
  //       100: '#E5ECF5',
  //       200: '#CCDAEB',
  //       300: '#ABC2DE',
  //       400: '#82A5CE',
  //       500: '#4B7DB9',
  //       600: '#243D5C',
  //       700: '#1D3149',
  //       800: '#17273B',
  //       900: '#101B28',
  //       DEFAULT: '#82A5CE',
  //     },
  //     secondary: {
  //       50: '#EFF6F3',
  //       100: '#DFECE7',
  //       200: '#BFD9CF',
  //       300: '#95C0AF',
  //       400: '#5FA086',
  //       500: '#3E6958',
  //       600: '#375D4E',
  //       700: '#2F5043',
  //       800: '#284338',
  //       900: '#192A23',
  //       DEFAULT: '#5FA086',
  //     },

  //     success: {
  //       50: '#E5F0EC',
  //       100: '#C9DFD6',
  //       200: '#92BFAD',
  //       300: '#5FA086',
  //       400: '#3E6958',
  //       500: '#335748',
  //       600: '#2A473B',
  //       700: '#1E332B',
  //       800: '#15231D',
  //       900: '#09100D',
  //       DEFAULT: '#3E6958',
  //     },
  //     warning: {
  //       50: '#FCFAF2',
  //       100: '#F9F4E2',
  //       200: '#F1E7C0',
  //       300: '#E9D89B',
  //       400: '#E0C872',
  //       500: '#D7B747',
  //       600: '#C5A32B',
  //       700: '#AB8E26',
  //       800: '#8E761F',
  //       900: '#695717',
  //       DEFAULT: '#E0C872',
  //     },
  //     danger: {
  //       50: '#FAF0F1',
  //       100: '#F5E0E3',
  //       200: '#E8BABF',
  //       300: '#D98C95',
  //       400: '#B03A48',
  //       500: '#A53643',
  //       600: '#8E2F3A',
  //       700: '#7B2832',
  //       800: '#642129',
  //       900: '#45171C',
  //       DEFAULT: '#B03A48',
  //     },
  //   },
  // },
  dark: {
    colors: {
      background: {
        DEFAULT: '#111315',
      },
      foreground: {
        DEFAULT: '#FDF2E4',
        50: '#5A3607',
        100: '#B46C0D',
        200: '#F09E33',
        300: '#F6C788',
        400: '#FDF2E4',
        500: '#FDF4E7',
        600: '#FEF8F1',
        700: '#FEFAF6',
        800: '#FFFDFA',
        900: '#FFFDFA',
      },
      divider: {
        DEFAULT: '#1d2023',
      },
      overlay: {
        DEFAULT: '#4a4d4f',
      },
      focus: {
        DEFAULT: '#5c8b93',
      },
      content1: {
        DEFAULT: '#171a1c',
        foreground: '#FDF2E4',
      },
      content2: {
        DEFAULT: '#1d2023',
        foreground: '#FDF2E4',
      },
      content3: {
        DEFAULT: '#4a4d4f',
        foreground: '#FDF2E4',
      },
      content4: {
        DEFAULT: '#77797b',
        foreground: '#FDF2E4',
      },

      default: {
        foreground: '#FDF2E4',
        DEFAULT: '#4a4d4f',
        50: '#171A1C',
        100: '#1d2023',
        200: '#4a4d4f',
        300: '#77797b',
        400: '#a0a2a4',
        500: '#c8c9cb',
        600: '#e0e1e2',
        700: '#f0f1f2',
        800: '#f8f9fa',
        900: '#ffffff',
      },
      primary: {
        50: '#171A1C',
        100: '#171A1C',
        200: '#151719',
        300: '#121516',
        400: '#101214',
        500: '#0E1011',
        600: '#0C0D0E',
        700: '#090A0B',
        800: '#070808',
        900: '#050506',
        DEFAULT: '#5E8AC0',
      },

      secondary: {
        50: '#372032',
        100: '#58324F',
        200: '#683B5E',
        300: '#7B4770',
        400: '#8A4F7D',
        500: '#B884AD',
        600: '#CFABC7',
        700: '#E3CEDF',
        800: '#F2E8F0',
        900: '#F8F2F6',
        DEFAULT: '#B884AD',
      },
      success: {
        50: '#192A23',
        100: '#284338',
        200: '#2F5043',
        300: '#375D4E',
        400: '#3E6958',
        500: '#5FA086',
        600: '#95C0AF',
        700: '#BFD9CF',
        800: '#DFECE7',
        900: '#EFF6F3',
        DEFAULT: '#5FA086',
        foreground: '#FDF2E4',
      },
      warning: {
        50: '#75611A',
        100: '#9B8122',
        200: '#BC9C29',
        300: '#D5B43F',
        400: '#E0C872',
        500: '#E7D592',
        600: '#EEE0B0',
        700: '#F4EBCD',
        800: '#FAF7EA',
        900: '#FCFAF2',
        DEFAULT: '#E7D592',
      },
      danger: {
        50: '#581D24',
        100: '#6F252D',
        200: '#8E2F3A',
        300: '#9D3440',
        400: '#B03A48',
        500: '#D47D87',
        600: '#E3ABB1',
        700: '#EDC9CE',
        800: '#F7E8EA',
        900: '#FBF3F4',
        DEFAULT: '#D47D87',
      },
    },
  },
};

const themeLayout: LayoutTheme = {
  //default font size
  fontSize: {
    tiny: '1rem', //text-tiny
    small: '1.125rem', //text-small
    medium: '1.25rem', //text-medium
    large: '1.375rem', //text-large
  },

  //default line height (rem)
  lineHeight: {
    tiny: '1.25rem', //text-tiny
    small: '1.5rem', //text-small
    medium: '1.75rem', //text-medium
    large: '2rem', //text-large
  },

  //default border radius (px)
  radius: {
    small: '2px', //rounded-small
    medium: '4px', //rounded-medium
    large: '6px', //rounded-large
  },

  //default border width
  borderWidth: {
    small: '1px', //border-small
    medium: '2px', //border-medium (default)
    large: '3px', //border-large
  },

  //number between 0 and 1 applied as opacity-[val] to disabled elements
  disabledOpacity: '0.3',

  //default height applied to divider (px)
  dividerWeight: '2',

  //number between 0 and 1 applied as opacity-[val] to hover state
  hoverOpacity: '0.8',

  //default box shadows
  boxShadow: {
    //shadow-small
    small: '3px 3px 0px 0px #000',
    //shadow-medium
    medium: '6px 6px 0px 0px #000',
    //shadow-large
    large: '9px 9px 0px 0px #000',
  },
};

export default {
  colors: themeColors,
  layout: themeLayout,
};
