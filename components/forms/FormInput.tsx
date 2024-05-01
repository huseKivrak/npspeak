// MyInput.tsx
import {extendVariants, Input} from '@nextui-org/react';

export const FormInput = extendVariants(Input, {
	variants: {
		color: {
			form: {
				label: 'text-foreground text-2xl',
				inputWrapper: [
					'shadow-xl',
					'bg-transparent',
					'backdrop-blur-xl',
					'backdrop-saturate-200',
					'hover:bg-danger-400/50',
					'data-[hover=true]:bg-danger-400',
					'group-data-[focus=true]:bg-danger-300',
				],
				input: ['text-default', 'placeholder:text-foreground tracking-wider'],
			},
		},
		size: {
			xs: {
				inputWrapper: 'h-6 min-h-6 px-1',
				input: 'text-tiny',
			},
			md: {
				inputWrapper: 'h-10 min-h-10',
				input: 'text-small',
			},
			xl: {
				inputWrapper: 'h-14 min-h-14',
				input: 'text-medium',
			},
		},
		radius: {
			xs: {
				inputWrapper: 'rounded',
			},
			sm: {
				inputWrapper: 'rounded-[4px]',
			},
		},
		textSize: {
			base: {
				input: 'text-base',
			},
		},
		removeLabel: {
			true: {
				label: 'hidden',
			},
			false: {},
		},
	},
	defaultVariants: {
		color: 'form',
		textSize: 'base',
		removeLabel: false,
	},
});
