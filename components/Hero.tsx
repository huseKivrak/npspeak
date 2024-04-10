import {Button} from '@nextui-org/button';
import Link from 'next/link';

export const Hero = () => {
	return (
		<div className='flex flex-col gap-2'>
			<h1 className='text-6xl lg:text-8xl font-bold text-secondary-500'>
				npSpeak
			</h1>
			<p className='text-xl lg:text-2xl'>Bring your character's dialogue </p>
			<div className='flex gap-4 py-2'>
				<Button variant='flat' color='success'>
					<Link href='/signup'>Get started</Link>
				</Button>
				<Button variant='flat' color='primary'>
					<Link href='/about'>Learn more</Link>
				</Button>
			</div>
		</div>
	);
};
