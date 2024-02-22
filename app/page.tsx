import Hero from '@/components/layout/Hero';
import {redirect} from 'next/navigation';
import {getUserInfo} from '@/actions/auth';
import SignUpForm from '@/components/forms/SignUpForm';

export default async function Index() {
	const {user} = await getUserInfo();
	if (user) {
		redirect('/dashboard');
	}

	return (
		<div className='w-full max-w-xl px-5 xl:px-0'>
			<div className='animate-in opacity-0'>
				<div className='flex flex-col justify-center items-center'>
					<Hero />
					<SignUpForm />
				</div>
			</div>
		</div>
	);
}
