'use client';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@nextui-org/react';
import AuthButton from '../buttons/AuthButton';
import Link from 'next/link';
import {ScrollEmoji} from '../icons/ScrollEmoji';

export default function NavBar() {
	return (
		<Navbar>
			<NavbarBrand>
				<Link href='/'>
					<ScrollEmoji />
					<p className='font-bold text-inherit'>npSpeak</p>
				</Link>
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gap-4' justify='center'>
				<NavbarItem>
					<AuthButton />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
