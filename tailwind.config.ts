import type {Config} from 'tailwindcss';

const config: Config = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	daisyui: {
		themes: [
			{
				retro2: {
					primary: '#35693c',
					'primary-focus': '#5a9062',
					'primary-content': '#daccbe',

					secondary: '#8ca0ca',
					'secondary-focus': '#c0d2f2',
					'secondary-content': '#daccbe',

					accent: '#c992a4',
					'accent-focus': '#f0b2c8',
					'accent-content': '#daccbe',

					neutral: '#705f4d',
					'neutral-focus': '#423d33',
					'neutral-content': '#daccbe',

					'base-100': '#8b7e66',
					'base-200': '#615847',
					'base-300': '#373228',
					'base-content': '#daccbe',

					info: '#7e668b',
					success: '#a8e1a9',
					warning: '#c67e4e',
					error: '#d86f6f',

					'--rounded-box': '.4rem',
					'--rounded-btn': '.4rem',
					'--rounded-badge': '.4rem',

					'--animation-btn': '.25s',
					'--animation-input': '.2s',

					'--btn-text-case': 'uppercase',
					'--navbar-padding': '.5rem',
					'--border-btn': '1px',
				},
			},
		],
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
