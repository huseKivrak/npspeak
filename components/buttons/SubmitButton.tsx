'use client';

import {useFormStatus} from 'react-dom';
import {Button} from '@nextui-org/button';
type SubmitButtonProps = {
	text: string;
	className?: string;
	children?: React.ReactNode;
};

export function SubmitButton({text, className, children}: SubmitButtonProps) {
	const {pending} = useFormStatus();

	const buttonClasses = ` ${className || ''}`;

	return (
		<Button
			type='submit'
			radius='sm'
			aria-disabled={pending}
			disabled={pending}
			className={buttonClasses}
		>
			{text}
			{children}
		</Button>
	);
}
