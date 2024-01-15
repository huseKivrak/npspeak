import Link from 'next/link';

export default function Index({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className='flex-1 w-full flex flex-col gap-20 items-center'>
      <div className='animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3'>
        <main className='flex-1 flex flex-col gap-6'>
          <h1 className='text-4xl font-extralight tracking-widest flex items-center justify-center mt-24'>
            npSpeak
          </h1>
          {searchParams?.message && (
            <p className='p-2 text-center font-thin tracking-widest'>{searchParams.message}</p>
          )}
          <Link href='/create-clone'> clone me </Link>
          <Link href='/text-to-speech'> TTS </Link>
        </main>
      </div>
    </div>
  )
}
