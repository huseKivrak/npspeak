import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from '../forms/LoginForm';

/**
 * Login/logout button depending on user auth state
 */
export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect('/?message=successfully logged out');
  };

  const username = user?.user_metadata.username;
  return user ? (
    <div className='flex items-center gap-4'>
      <Link href='/dashboard'>{username}</Link>
      <form action={signOut}>
        <button className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
          logout
        </button>
      </form>
    </div>
  ) : (
    // <Link
    //   href='/login'
    //   className='py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'
    // >
    //   login
    // </Link>
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='btn btn-ghost m-1'>
        login
      </div>
      <div
        tabIndex={0}
        className='dropdown-content z-[1] w-64 p-2 shadow bg-base-100 border border-white'
      >
        <LoginForm searchParams={{ message: '' }} />
      </div>
    </div>
  );
}
