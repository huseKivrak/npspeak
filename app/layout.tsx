import './globals.css';
import {Metadata} from 'next';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {Providers} from './providers';
import {siteConfig} from '@/config/site';
import {fontSans} from '@/config/fonts';
import clsx from 'clsx';
import {NavBar} from '@/components/layout/NavBar';
import AuthButton from '@/components/buttons/AuthButton';
const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable
				)}
			>
				<Providers>
					<div className='relative flex flex-col h-screen'>
						<NavBar>
							<AuthButton />
						</NavBar>
						<main className='container mx-auto max-w-7xl pt-8 px-6 flex-grow'>
							{children}
						</main>
						<Analytics />
						<SpeedInsights />
						<footer className='w-full flex items-center justify-center py-3'>
							<p className='text-default-600 text-small'>
								Copyright © 2024 - All rights reserved by npSpeak
							</p>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
