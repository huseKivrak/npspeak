'use client';
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/navbar';
import Link from 'next/link';
import { ScrollEmojiIcon } from '../icons';
import { ThemeSwitcher } from '../buttons/ThemeSwitcher';

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUINavbar
      shouldHideOnScroll
      maxWidth="xl"
      isBlurred={false}
      className="py-4 sm:py-8 px-0 md:px-4"
    >
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-4">
          <Link href="/" className="flex justify-start items-center">
            <ScrollEmojiIcon className="w-8 h-8 sm:w-16 sm:h-16" />
            <p className="text-xl sm:text-4xl tracking-widest font-thin font-alagard">
              npSpeak
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        {children}
        <ThemeSwitcher />
      </NavbarContent>
    </NextUINavbar>
  );
};
