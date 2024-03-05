import {GeistSans} from 'geist/font/sans';
import './globals.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import clsx from 'clsx';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'npSpeak',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html
			lang='en'
			className={clsx(
				'bg-base-100 bg-gradient-to-b bg-no-repeat bg-cover from-base-100 to-base-200 via-neutral',
				GeistSans.className
			)}
		>
			<head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
			</head>
			<body className='font-sans flex flex-col min-h-screen'>
				<NavBar />
				<main className=' flex flex-col items-center py-16 min-h-screen mx-auto'>
					{children}
				</main>
				<Analytics />
				<SpeedInsights />
				<Footer />
			</body>
		</html>
	);
}
