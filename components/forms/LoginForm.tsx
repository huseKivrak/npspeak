'use client';

import { signInAction } from '@/actions/auth';
import { useEffect } from 'react';
import { useForm, FieldPath } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { Link as NextUILink } from '@nextui-org/react';
import { SubmitButton } from '../buttons/SubmitButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/database/drizzle/validation';
import { ActionStatus } from '@/types/types';
import { Input } from '@nextui-org/react';

type Inputs = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const [ state, formAction ] = useFormState<ActionStatus, FormData>(
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
    mode: 'onBlur',
    criteriaMode: 'firstError',
    resolver: zodResolver(loginSchema),
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
  }, [ state, setError ]);

  return (
    <form className="flex flex-col gap-10 max-w-md">
      <h1>login</h1>
      <Input
        isRequired
        label="email"
        variant="flat"
        size="lg"
        isInvalid={!!errors.email}
        errorMessage={errors.email && errors.email.message}
        {...register('email')}
      />
      <Input
        isRequired
        type="password"
        label="password"
        variant="flat"
        size="lg"
        isInvalid={!!errors.password}
        errorMessage={errors.password && errors.password.message}
        {...register('password')}
      />

      <div className="flex flex-col gap-4 w-full">
        <SubmitButton
          fullWidth
          variant="flat"
          formAction={formAction}
          pendingText="signing in..."
          className="text-large tracking-wider"
          size="lg"
          color="success"
        >
          login
        </SubmitButton>
        <NextUILink href="/forgot-password" underline="hover">
          forgot password?
        </NextUILink>

        <NextUILink href="/signup" underline="hover">
          sign up
        </NextUILink>
      </div>
    </form>
  );
}
