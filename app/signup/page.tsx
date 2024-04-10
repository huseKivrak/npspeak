import SignUpForm from '@/components/forms/SignUpForm';

export default function SignUpPage() {
	return (
		<div className='flex flex-col items-center gap-4'>
			<h1 className='text-3xl text-primary'>sign up</h1>
			<SignUpForm />
		</div>
	);
}
