'use client';
import { signUpAction } from '@/app/auth/actions';
import { useFormState } from 'react-dom';
import SendEmailIcon from '@/components/icons/SendEmailIcon';
import { SubmitButton } from '@/components/buttons/SubmitButton';

export default function SignUpForm() {
  const [message, formAction] = useFormState(signUpAction, '');
  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <h2 className='text-4xl font-extralight tracking-widest flex items-center justify-center mt-24'>
        signup
      </h2>
      <div className='flex justify-center font-thin tracking-wide'></div>

      <form
        action={formAction}
        className='animate-in flex-1 flex flex-col w-full justify-items-center gap-2 text-foreground'
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
        <label className='font-thin tracking-widest' htmlFor='password2'>
          confirm password
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-1 font-thin tracking-widest'
          type='password'
          name='password2'
          placeholder='••••••••'
          required
        />
        <label className='font-thin tracking-widest' htmlFor='username'>
          what should we call you?
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-1 font-thin tracking-widest'
          name='username'
          placeholder='(admin is taken)'
          required
        />

        <span className='flex flex-col items-center'>
          <SubmitButton
            text={'create account'}
            className={'btn btn-secondary font-light w-full rounded-md px-1 py-2 text-foreground'}
          >
            <SendEmailIcon className='w-6 h-6' />
          </SubmitButton>
          {message && <p className='text-red-500'>{message}</p>}
        </span>
      </form>
    </div>
  );
}
