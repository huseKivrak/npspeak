import { GeistSans } from 'geist/font/sans';
import './globals.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

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
      <body className=''>
        <NavBar />
        <main className='min-h-screen flex flex-col items-center'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
