interface ErrorToastProps {
	text: string;
	className?: string;
	children?: React.ReactNode;
}

export function ErrorToast({text, className, children}: ErrorToastProps) {
	const toastClasses = `text-error ml-2 ${className || ''}`;
	return (
		<div className={toastClasses}>
			{text}
			{children}
		</div>
	);
}
