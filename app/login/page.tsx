import Link from 'next/link';
import { headers, cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=incorrect email/password. please try again');
    }

    return redirect(`/?message=welcome back, ${email}`);
  };

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/login?message=email sent - click the link to confirm');
  };

  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <h1 className='text-4xl font-extralight tracking-widest flex items-center justify-center mt-24'>
        login
      </h1>
      <div className='flex justify-center font-thin tracking-wide'>
        <p>enter your email/password to sign in or sign up.</p>
      </div>

      {searchParams?.message && (
        <p className='p-2 text-center font-thin tracking-widest'>{searchParams.message}</p>
      )}

      <form
        className='animate-in flex-1 flex flex-col w-full justify-items-center gap-2 text-foreground'
        action={signIn}
      >
        <label className='text-md' htmlFor='email'>
          email
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          name='email'
          placeholder='you@example.com'
          required
        />
        <label className='' htmlFor='password'>
          password
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          type='password'
          name='password'
          placeholder='••••••••'
          required
        />
        <span className='flex flex-col items-center'>
          <button className='btn btn-success w-1/4 rounded-md px-1 py-2 text-foreground mb-4'>
            sign in
          </button>
          <button
            formAction={signUp}
            className='btn btn-secondary w-1/4 rounded-md px-1 py-2 text-foreground mb-2'
          >
            sign up
          </button>
          <p className='font-thin text-sm tracking-widest'>(email verification required)</p>
        </span>
      </form>
    </div>
  );
}
