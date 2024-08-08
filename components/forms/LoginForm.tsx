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
import { ErrorMessage } from '@hookform/error-message';
import { ErrorToast } from '../ErrorToast';
import { ActionStatus } from '@/types/drizzle';
import { Input } from '@nextui-org/react';

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
    <div className="space-y-4">
      <form className="flex flex-col gap-4">
        <Input
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
        <Input
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
      </form>
      <div className="flex flex-col tracking-wide">
        <NextUILink href="/forgot-password" underline="hover">
          forgot password?
        </NextUILink>

        <NextUILink href="/signup" underline="hover">
          sign up
        </NextUILink>
      </div>
    </div>
  );
}
