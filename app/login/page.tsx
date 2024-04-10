import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			<h1 className='text-2xl'>login</h1>
			<LoginForm />
		</div>
	);
}
