import SignUpForm from '@/components/forms/SignUpForm';

export default function SignUpPage() {
	return (
		<div className='flex flex-col items-center w-full gap-4'>
			<h1 className='text-4xl lg:text-6xl text-danger'>sign up</h1>
			<SignUpForm />
		</div>
	);
}
