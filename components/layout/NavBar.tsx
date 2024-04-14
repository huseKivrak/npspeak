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
		<NextUINavbar shouldHideOnScroll maxWidth='lg' position='sticky'>
			<NavbarContent justify='start'>
				<NavbarBrand as='li' className='gap-3'>
					<Link href='/' className='flex justify-start items-center'>
						<ScrollEmojiIcon />
						<p className='text-secondary tracking-widest font-thin font-alagard'>
							npSpeak
						</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent justify='end'>
				{children}
				<ThemeSwitcher />
			</NavbarContent>
		</NextUINavbar>
	);
};
