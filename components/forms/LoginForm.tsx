'use client';

import { signInAction } from '@/actions/auth';
import { useEffect } from 'react';
import { useForm, FieldPath } from 'react-hook-form';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { FormInput } from './FormInput';
import { SubmitButton } from '../buttons/SubmitButton';
import { Button } from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/database/drizzle/validation';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorToast } from '../ErrorToast';
import { ActionStatus } from '@/types/drizzle';

type Inputs = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const [state, formAction] = useFormState<ActionStatus, FormData>(
    signInAction,
    {
      status: 'idle',
      message: '',
    }
  );
  const {
    register,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    mode: 'onSubmit',
    criteriaMode: 'all',
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (state.status === 'idle') return;
    if (state.status === 'error') {
      console.error(state.errors);
      state.errors?.forEach((error) => {
        setError(error.path as FieldPath<Inputs>, {
          message: error.message,
        });
      });
    }
  }, [state, setError]);

  return (
    <form className="flex flex-col items-center gap-4">
      <FormInput
        isRequired
        type="email"
        label="email"
        placeholder="you@example.com"
        variant="flat"
        size="lg"
        {...register('email')}
      />
      <ErrorMessage
        name="email"
        errors={errors}
        render={({ message }) => <ErrorToast text={message} />}
      />
      <FormInput
        isRequired
        type="password"
        label="password"
        variant="flat"
        size="lg"
        placeholder="••••••••"
        {...register('password')}
      />
      <ErrorMessage
        name="password"
        errors={errors}
        render={({ message }) => <ErrorToast text={message} />}
      />
      <div className="flex flex-col gap-4">
        <SubmitButton
          variant="flat"
          formAction={formAction}
          pendingText="signing in..."
          className=" text-large tracking-wider"
          radius="sm"
          size="lg"
        >
          login
        </SubmitButton>
        <p className="text-2xl">
          No account?{' '}
          <Link href="/signup" className="underline">
            Click here to sign up
          </Link>
        </p>
      </div>
    </form>
  );
}
