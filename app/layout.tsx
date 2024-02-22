import {GeistSans} from 'geist/font/sans';
import './globals.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'npSpeak',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='en' className={GeistSans.className}>
			<head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
			</head>
			<body className=''>
				<NavBar />
				<main className='flex min-h-screen w-full flex-col items-center py-16'>
					{children}
					<Analytics />
					<SpeedInsights />
				</main>
				<Footer />
			</body>
		</html>
	);
}
