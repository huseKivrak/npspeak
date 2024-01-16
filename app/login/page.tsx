import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import SendEmailIcon from '@/components/icons/SendEmailIcon';
import Link from 'next/link';


export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=incorrect email/password. please try again');
    }

    console.log('data.user: ', data.user);
    const username = data.user.user_metadata.username;

    return redirect(`/?message=welcome back, ${username}`);
  };

  // const signUp = async (formData: FormData) => {
  //   'use server';

  //   const origin = headers().get('origin');
  //   const email = formData.get('email') as string;
  //   const password = formData.get('password') as string;
  //   const cookieStore = cookies();
  //   const supabase = createClient(cookieStore);

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${origin}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     return redirect('/login?message=oops, something went wrong. please try again');
  //   }

  //   return redirect('/login?message=account created! check your email to confirm');
  // };

  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <h2 className='text-4xl font-extralight tracking-widest flex items-center justify-center mt-24'>
        login
      </h2>
      <div className='flex justify-center font-thin tracking-wide'></div>

      {searchParams?.message && (
        <p className='p-2 text-center font-thin tracking-widest'>{searchParams.message}</p>
      )}

      <form
        className='animate-in flex-1 flex flex-col w-full justify-items-center gap-2 text-foreground'
        action={signIn}
      >
        <label className='font-thin tracking-widest' htmlFor='email'>
          email
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-1 font-thin tracking-widest'
          name='email'
          placeholder='you@example.com'
          required
        />
        <label className='font-thin tracking-widest' htmlFor='password'>
          password
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-1 font-thin tracking-widest'
          type='password'
          name='password'
          placeholder='••••••••'
          required
        />
        {/* <span className='flex flex-col items-center'> */}
          <button className='btn btn-success font-light w-full rounded-md px-1 py-2 text-foreground mb-4'>
            log in
          </button>
        {/* <button
          formAction={signUp}
          className='btn btn-secondary font-light w-full rounded-md px-1 py-2 text-foreground'
          >
          create account
          <SendEmailIcon className='w-6 h-6' />
        </button> */}
          {/* </span> */}
          <span className='font-thin tracking-widest'>
            no account?
            <Link href='signup' className=' text-blue-400 ml-8'>
              sign up here
            </Link>
          </span>
      </form>
    </div>
  );
}
