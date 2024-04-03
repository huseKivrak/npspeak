'use client';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import Link from 'next/link';
import {ScrollEmoji} from '../icons/ScrollEmoji';

export default function NavBar({children}: {children: React.ReactNode}) {
	return (
		<Navbar>
			<NavbarBrand>
				<Link href='/'>
					<ScrollEmoji />
					<p className='font-bold text-inherit'>npSpeak</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavbarItem>{children}</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
