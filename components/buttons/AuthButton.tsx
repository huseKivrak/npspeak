import Link from 'next/link';
import LoginForm from '../forms/LoginForm';
import {logoutAction} from '@/actions/auth';
import {Button} from '@nextui-org/button';

/**
 * Login/logout button depending on user auth state
 */

export default async function AuthButton({username}: {username?: string}) {
	return (
		<div className='flex items-center gap-4 text-primary-content'>
			{username ? (
				<Button variant='flat' color='warning' formAction={logoutAction}>
					logout
				</Button>
			) : (
				<Link href='/login'>
					<Button variant='flat' color='secondary'>
						login
					</Button>
				</Link>
			)}
		</div>
	);
}
