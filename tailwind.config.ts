import type {Config} from 'tailwindcss';
import {nextui} from '@nextui-org/react';
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
				custom: {
					extend: 'dark',
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
						background: '#2F3B3F',
						foreground: '#FFFFFF',
						focus: '#FFFFFF',
						default: {
							// gray
							'50': '#fdfdfd',
							'100': '#fcfcfc',
							'200': '#f9f9f9',
							'300': '#f5f5f5',
							'400': '#f2f2f2',
							'500': '#efefef',
							'600': '#bfbfbf',
							'700': '#8f8f8f',
							'800': '#606060',
							'900': '#303030',
							DEFAULT: '#efefef',
						},
						primary: {
							// blue
							'50': '#e6f5ff',
							'100': '#ccebff',
							'200': '#99d7fe',
							'300': '#67c4fe',
							'400': '#34b0fd',
							'500': '#019cfd',
							'600': '#017dca',
							'700': '#015e98',
							'800': '#003e65',
							'900': '#001f33',
							DEFAULT: '#019cfd',
							foreground: '#FFFFFF',
						},
						secondary: {
							// purple
							'50': '#f7f0ff',
							'100': '#efe0ff',
							'200': '#dfc1ff',
							'300': '#cea3ff',
							'400': '#be84ff',
							'500': '#ae65ff',
							'600': '#8b51cc',
							'700': '#683d99',
							'800': '#462866',
							'900': '#231433',
							DEFAULT: '#ae65ff',
							foreground: '#FFFFFF',
						},
						success: {
							// green
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
						warning: {
							// orange
							'50': '#fdf5e6',
							'100': '#fbeacc',
							'200': '#f7d599',
							'300': '#f2c166',
							'400': '#eeac33',
							'500': '#ea9700',
							'600': '#bb7900',
							'700': '#8c5b00',
							'800': '#5e3c00',
							'900': '#2f1e00',
							DEFAULT: '#ea9700',
							foreground: '#FFFFFF',
						},
						danger: {
							// red
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
				},
			},
		}),
	],
};
export default config;
