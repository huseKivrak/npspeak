'use client';
import {Navbar, NavbarBrand, NavbarContent} from '@nextui-org/navbar';
import Link from 'next/link';
import {ScrollEmojiIcon} from '../icons';
import {ThemeSwitcher} from '../buttons/ThemeSwitcher';

export const NavBar = ({children}: {children: React.ReactNode}) => {
	return (
		<Navbar maxWidth='xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand as='li' className='gap-3 max-w-fit'>
					<Link href='/' className='flex justify-start items-center'>
						<ScrollEmojiIcon />
						<p className='font-bold text-2xl text-inherit'>npSpeak</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='basis-1 pl-4' justify='end'>
				{children}
				<ThemeSwitcher />
			</NavbarContent>
		</Navbar>
	);
};
