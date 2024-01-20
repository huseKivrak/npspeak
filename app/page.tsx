import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/forms/LoginForm';
export default async function Index({ searchParams }: { searchParams: { message: string } }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='flex-1 w-full flex flex-col gap-12 items-center'>
      <div className='animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3'>
        <main className='flex-1 flex flex-col gap-6'>
          <h1 className='text-4xl font-extralight tracking-widest flex items-center justify-center mt-12'>
            npSpeak
          </h1>
          {searchParams?.message && (
            <p className='p-2 text-center font-thin tracking-widest'>{searchParams.message}</p>
          )}
          {!session && <LoginForm />}
        </main>
      </div>
    </div>
  );
}
