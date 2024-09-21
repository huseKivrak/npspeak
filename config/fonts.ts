import { Red_Hat_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Red_Hat_Text } from 'next/font/google';

const fontAlagard = localFont({
  src: '../public/fonts/alagard12.otf',
  variable: '--font-alagard',
  display: 'swap',
});

const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rht',
});

const redHatMono = Red_Hat_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const fonts = [
  fontAlagard.variable,
  redHatText.variable,
  redHatMono.variable,
];
