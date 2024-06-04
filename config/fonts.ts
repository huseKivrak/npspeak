import { Grenze as FontGrenze } from 'next/font/google'
import localFont from 'next/font/local'

export const fontGrenze = FontGrenze({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-grenze',
})

export const fontAlagard = localFont({
  src: '../public/fonts/alagard12.otf',
  variable: '--font-alagard',
})
