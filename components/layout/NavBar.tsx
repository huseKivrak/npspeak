'use client';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import {ScrollEmoji} from '../icons/ScrollEmoji';

export const NavBar = ({children}: {children: React.ReactNode}) => {
	return (
		<Navbar maxWidth='xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand className='gap-3 max-w-fit'>
					<Link href='/'>
						<ScrollEmoji />
						<p className='font-bold text-inherit'>npSpeak</p>
					</Link>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='basis-1' justify='end'>
				<NavbarItem>{children}</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
