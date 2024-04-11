interface ErrorToastProps {
	text: string;
	className?: string;
	children?: React.ReactNode;
}

import {ErrorIcon} from './icons';

export function ErrorToast({text, className, children}: ErrorToastProps) {
	const toastClasses = `text-danger text-small ${className || ''}`;
	return (
		<div className={toastClasses}>
			<div className='flex items-center'>
				<ErrorIcon size={16} />
				<span className='ml-1'>{text}</span>
			</div>
			{children}
		</div>
	);
}
