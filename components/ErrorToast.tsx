interface ErrorToastProps {
	text: string;
	className?: string;
	children?: React.ReactNode;
}
import {cn} from '@/utils/helpers/clsxMerge';
import {ErrorIcon} from './icons';

export function ErrorToast({text, className, children}: ErrorToastProps) {
	return (
		<div className={cn('text-danger text-small', className)}>
			<div className='flex items-center'>
				<ErrorIcon size={16} />
				<span className='ml-1'>{text}</span>
			</div>
			{children}
		</div>
	);
}
