'use client';
import {
	Navbar as NextUINavbar,
	NavbarBrand,
	NavbarContent,
} from '@nextui-org/navbar';
import Link from 'next/link';
import {ScrollEmojiIcon} from '../icons';
import {ThemeSwitcher} from '../buttons/ThemeSwitcher';

export const Navbar = ({children}: {children: React.ReactNode}) => {
	return (
		<NextUINavbar maxWidth='xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand as='li' className='gap-3 max-w-fit'>
					<Link href='/' className='flex justify-start items-center'>
						<ScrollEmojiIcon size={30} />
						<p className='font-bold text-2xl text-inherit'>npSpeak</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='basis-1 pl-4' justify='end'>
				{children}
				<ThemeSwitcher />
			</NavbarContent>
		</NextUINavbar>
	);
};
