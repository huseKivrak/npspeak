export default function ErrorToast({message}: {message: string}) {
	return <div className='text-xs text-red-600 ml-2'>{message}</div>;
}
