import {Spinner} from '@nextui-org/spinner';
export default function Loading() {
	return (
		<div className='flex items-center justify-center h-3/5'>
			<Spinner size='lg' color='primary' />
		</div>
	);
}
