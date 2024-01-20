import Link from 'next/link';
import { signInAction } from '@/app/auth/actions';

export default function LoginForm() {
  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <h2 className='text-3xl font-thin tracking-widest flex items-center justify-center mt-24'>
        login
      </h2>
      <form
        className='animate-in flex-1 flex flex-col w-full justify-items-center gap-2 text-foreground'
        action={signInAction}
      >
        <label className='font-thin tracking-widest' htmlFor='email'>
          email
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-1 font-thin tracking-widest'
          name='email'
          placeholder='you@example.com'
          autoFocus
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
        <button className='btn btn-success font-light w-full rounded-md px-1 py-2 text-foreground mb-1'>
          log in
        </button>
        <span className='font-thin tracking-widest ml-1'>
          no account?
          <Link href='signup' className=' text-blue-400 font-semibold ml-8'>
            sign up here
          </Link>
        </span>
      </form>
    </div>
  );
}
