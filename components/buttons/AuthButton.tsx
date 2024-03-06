import Link from 'next/link';
import LoginForm from '../forms/LoginForm';
import {logoutAction} from '@/actions/auth';
import {getUserInfo} from '@/actions/auth';

/**
 * Login/logout button depending on user auth state
 */
export default async function AuthButton() {
	const {user} = await getUserInfo();

	return user ? (
		<div className='flex items-center gap-4 text-primary-content'>
			<Link
				href='/dashboard'
				className='btn btn-ghost text-secondary text-xl tracking-widest'
			>
				{user.username}
			</Link>
			<form action={logoutAction}>
				<button className='btn btn-ghost text-xl'>logout</button>
			</form>
		</div>
	) : (
		<div className='dropdown dropdown-end'>
			<div
				tabIndex={0}
				role='button'
				className='btn btn-ghost m-1 text-xl text-primary-content'
			>
				login
			</div>
			<div
				tabIndex={0}
				className='dropdown-content z-[1] w-64 p-2 shadow bg-base-100 border border-white'
			>
				<LoginForm />
			</div>
		</div>
	);
}
