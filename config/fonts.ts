import { Grenze as FontGrenze, Red_Hat_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Red_Hat_Text } from 'next/font/google';

export const fontGrenze = FontGrenze({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-grenze',
});

export const fontAlagard = localFont({
  src: '../public/fonts/alagard12.otf',
  variable: '--font-alagard',
});

export const redHatText = Red_Hat_Text({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rht',
});

export const redHatMono = Red_Hat_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});
