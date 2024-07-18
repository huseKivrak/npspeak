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
      className="pt-8"
    >
      <NavbarContent justify="start">
        <NavbarBrand as="li" className="gap-3">
          <Link href="/" className="flex justify-start items-center">
            <ScrollEmojiIcon size={48} />
            <p className="text-4xl tracking-widest font-thin font-alagard">
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
