import '@/styles/globals.css';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import {
  fontAlagard,
  fontGrenze,
  redHatText,
  redHatMono,
} from '@/config/fonts';

import clsx from 'clsx';
import { Navbar } from '@/components/layout/Navbar';
import AuthButton from '@/components/buttons/AuthButton';
import { Toaster } from '@/components/toaster/toaster';
import { Suspense, PropsWithChildren } from 'react';

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

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen text-foreground bg-background font-rht antialiased',
          fontGrenze.variable,
          fontAlagard.variable,
          redHatText.variable,
          redHatMono.variable
        )}
      >
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <Navbar>
              <AuthButton />
            </Navbar>
            <main className="container mx-auto max-w-4xl md:max-w-7xl px-4 sm:px-8 flex-grow">
              {children}
            </main>
            <Analytics />
            <SpeedInsights />
            <footer className="mx-auto max-w-[1920px] flex items-center justify-center px-4 py-4 md:py-8 lg:py-12">
              <span className="sm:text-small md:text-base lg:text-large tracking-wider">
                &copy; {new Date().getFullYear()} npSpeak. All rights reserved.
              </span>
            </footer>
          </div>
          <Suspense>
            <Toaster />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
