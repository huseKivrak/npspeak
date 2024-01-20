import { GeistSans } from 'geist/font/sans';
import AuthButton from '@/components/buttons/AuthButton';
import './globals.css';
import Link from 'next/link';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "npSpeak",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <nav className='w-full flex justify-center border-b border-b-secondary h-16'>
          <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'>
            <Link href='/'>npSpeaks</Link>
            <AuthButton />
          </div>
        </nav>
        <main className='min-h-screen flex flex-col items-center'>{children}</main>
      </body>
    </html>
  );
}
