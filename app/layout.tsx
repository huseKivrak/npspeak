import { GeistSans } from 'geist/font/sans';
import AuthButton from '@/components/AuthButton';
import BackButton from '@/components/BackButton';
import { headers } from 'next/headers';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ppw",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const headersList = headers();
  // console.log('headersList.get("x-login"): ', headersList.get('x-login'));
  // const onLoginPage = headersList.get('x-login') === 'true';

  return (
    <html lang='en' className={GeistSans.className}>
      <body className='bg-background text-foreground'>
        <nav className='w-full flex justify-center border-b border-b-secondary h-16'>
          <div className='w-full max-w-4xl flex justify-between items-center p-3 text-sm'>
            {/* {!onLoginPage && <AuthButton />} */}
            {/* <BackButton /> */}
            <AuthButton />
          </div>
        </nav>
        <main className='min-h-screen flex flex-col items-center'>{children}</main>
      </body>
    </html>
  );
}
