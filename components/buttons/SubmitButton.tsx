'use client';

import {useFormStatus} from 'react-dom';
import {type ComponentProps} from 'react';
type Props = ComponentProps<'button'> & {
	pendingText?: string;
};

export function SubmitButton({pendingText, children, ...props}: Props) {
	const {pending, action} = useFormStatus();
	const isPending = pending && action === props.formAction;

	return (
		<button type='submit' aria-disabled={pending} {...props}>
			{isPending ? pendingText : children}
		</button>
	);
}
