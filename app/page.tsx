import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/forms/LoginForm';
import Hero from '@/components/layout/Hero';
export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='w-full mt-12'>
      <div className='animate-in opacity-0 px-24'>
        {!session && (
          <div className='flex flex-col justify-center items-center'>
            <Hero />
          </div>
        )}
        {session && (
          <div className='flex flex-col justify-center items-center'>
            <h2>welcome back, {session.user.user_metadata.username}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
