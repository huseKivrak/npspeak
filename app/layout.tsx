import './globals.css';
import {Metadata} from 'next';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import clsx from 'clsx';
import {Providers} from './providers';
import {siteConfig} from '@/config/site';
import {fontSans} from '@/config/fonts';
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
				<NavBar>
					<AuthButton />
				</NavBar>
				{/* @ts-ignore */}
				<Providers themeProps={{attribute: 'class', defaultTheme: 'dark'}}>
					<div className='relative flex flex-col h-screen'>
						<main className='container mx-auto max-w-7xl pt-16 px-6 flex-grow'>
							{children}
						</main>
						<Analytics />
						<SpeedInsights />
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
