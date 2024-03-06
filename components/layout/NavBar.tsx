import AuthButton from '../buttons/AuthButton';
import Link from 'next/link';

export default function NavBar() {
	return (
		<div className='navbar bg-primary'>
			<div className='navbar-start text-primary-content'>
				<Link href='/' className='btn btn-ghost text-xl'>
					npSpeak
				</Link>
			</div>
			<div className='navbar-end'>
				<AuthButton />
			</div>
		</div>
	);
}
