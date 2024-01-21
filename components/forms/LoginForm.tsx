'use client';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { signInAction } from '@/app/auth/actions';
import { SubmitButton } from '../buttons/SubmitButton';

export default function LoginForm() {
  return (
    <div className='flex flex-col flex-1 w-full px-4 sm:max-w-md items-center'>
      <h2 className='text-3xl font-thin tracking-widest mt-2'>login</h2>

      <form
        className='animate-in flex-1 flex flex-col w-full justify-items-center gap-2'
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
        <SubmitButton
          className={'btn btn-success font-light w-full rounded-md px-1 py-2 text-foreground mb-1'}
          text={'sign in'}
        />
        <span className='font-thin text-sm  tracking-widest ml-1'>
          no account?
          <Link href='signup' className='ml-2 text-secondary'>
            sign up here
          </Link>
        </span>
      </form>
    </div>
  );
}
