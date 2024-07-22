'use client';

import { signUpAction } from '@/actions/auth';
import { useForm, FieldPath } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from './FormInput';
import { signupSchema } from '@/database/drizzle/validation';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import { SendEmailIcon } from '@/components/icons';
import { ErrorToast } from '../ErrorToast';
import { ErrorMessage } from '@hookform/error-message';
import { ActionStatus } from '@/types/drizzle';

type Inputs = z.infer<typeof signupSchema>;
export default function SignUpForm() {
  const [state, formAction] = useFormState<ActionStatus, FormData>(
    signUpAction,
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
    mode: 'onBlur',
    criteriaMode: 'all',
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (state.status === 'idle') return;
    if (state.status === 'error') {
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
        errors={errors}
        name="email"
        render={({ message }) => <ErrorToast text={message} />}
      />

      <FormInput
        isRequired
        label="username"
        placeholder="your username"
        variant="flat"
        size="lg"
        {...register('username')}
      />
      <ErrorMessage
        errors={errors}
        name="username"
        render={({ message }) => <ErrorToast text={message} />}
      />

      <FormInput
        isRequired
        type="password"
        label="password"
        placeholder="••••••••"
        variant="flat"
        size="lg"
        {...register('password')}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => <ErrorToast text={message} />}
      />

      <FormInput
        isRequired
        type="password"
        label="confirm password"
        placeholder="•••••••"
        variant="flat"
        size="lg"
        {...register('confirm_password')}
      />
      <ErrorMessage
        errors={errors}
        name="confirm_password"
        render={({ message }) => <ErrorToast text={message} />}
      />
      <div className="flex flex-col gap-4">
        <SubmitButton
          variant="flat"
          formAction={formAction}
          pendingText="creating account..."
          endContent={<SendEmailIcon width={24} color="white" />}
          className=" text-large tracking-wider"
          radius="sm"
          size="lg"
        >
          create
        </SubmitButton>
        <p className="text-2xl">
          Have an account?{' '}
          <Link href="/login" className="underline">
            Click here to login.
          </Link>
        </p>
      </div>
    </form>
  );
}
