import '@/styles/globals.css';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import { fontAlagard, fontGrenze } from '@/config/fonts';
import clsx from 'clsx';
import { Navbar } from '@/components/layout/Navbar';
import AuthButton from '@/components/buttons/AuthButton';
import { Toaster } from '@/components/toaster/toaster';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen mainTheme text-foreground bg-background font-grenze antialiased',
          fontGrenze.variable,
          fontAlagard.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col">
            <Navbar>
              <AuthButton />
            </Navbar>
            <main className="container mx-auto max-w-7xl sm:px-4 pt-8 flex-grow">
              {children}
            </main>
            <Analytics />
            <SpeedInsights />
            <footer className="w-full flex items-center justify-center py-4">
              <p className="text-tiny sm:text-small text-white">
                Copyright © 2024 - All rights reserved by npSpeak
              </p>
            </footer>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
