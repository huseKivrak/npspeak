import {redirect} from 'next/navigation';
import {getUserInfo} from '@/actions/auth';
import SignUpForm from '@/components/forms/SignUpForm';

export default async function Index() {
	const {user} = await getUserInfo();
	if (user) {
		redirect('/dashboard');
	}

	return (
		<div className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
			<div className='inline-block max-w-lg text-center justify-center'>
				<h1 className='text-4xl lg:text-6xl'>npSpeak</h1>
				<p className='text-lg'>Bring your characters to life with npSpeak.</p>
				<SignUpForm />
			</div>
		</div>
	);
}
