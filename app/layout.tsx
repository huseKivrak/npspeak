import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'ppw',
  description: 'get paid for every word',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex flex-col justify-center items-center h-screen lowercase tracking-wide font-extralight'>{children}</body>
    </html>
  )
}
