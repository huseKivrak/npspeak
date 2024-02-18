import Hero from '@/components/layout/Hero';
import {redirect} from 'next/navigation';
import {getUsername} from '@/actions/auth';
import SignUpForm from '@/components/forms/SignUpForm';

export default async function Index() {
	const usernameFromSession = await getUsername();
	if (usernameFromSession) {
		const username = usernameFromSession.toLowerCase();
		redirect(`/${username}`);
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
