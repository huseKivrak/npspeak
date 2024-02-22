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
		<div className='w-full mt-12'>
			<div className='animate-in opacity-0 px-24'>
				<div className='flex flex-col justify-center items-center'>
					<Hero />
					<SignUpForm />
				</div>
			</div>
		</div>
	);
}
