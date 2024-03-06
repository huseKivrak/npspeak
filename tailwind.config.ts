import type {Config} from 'tailwindcss';

const config: Config = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	daisyui: {
		themes: [
			{
				'1': {
					primary: '#046307',
					'primary-focus': '#034f05',
					'primary-content': '#F4EDE4',

					secondary: '#DAA520',
					'secondary-focus': '#b68d1e',
					'secondary-content': '#f4ede4',

					accent: '#7B4B94',
					'accent-focus': '#6A3D81',
					'accent-content': '#f4ede4',

					neutral: '#3E3E3E',
					'neutral-focus': '#2c2c2c',
					'neutral-content': '#f4ede4',

					'base-100': '#FAF0E6',
					'base-200': '#ede5d9',
					'base-300': '#e0d9cc',
					'base-content': '#1E1E1E',

					info: '#3B82F6',
					success: '#467f3d',
					warning: '#f59e0b',
					error: '#EF4444',

					'--rounded-box': '.5rem',
					'--rounded-btn': '.375rem',
					'--rounded-badge': '.5rem',

					'--animation-btn': '.15s',
					'--animation-input': '.2s',

					'--btn-text-case': 'capitalize',
					'--navbar-padding': '1rem 2rem',
					'--border-btn': '2px',
				},
			},
		],
	},
	theme: {
		extend: {
			spacing: {
				'128': '32rem',
				'144': '36rem',
			},
			fontSize: {
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '4rem',
				'7xl': '5rem',
			},
			borderRadius: {
				lg: '.5rem',
			},
			padding: {
				btn: '1.5rem 3rem',
				card: '2rem',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
export default config;
