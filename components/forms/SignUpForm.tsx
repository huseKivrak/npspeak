'use client';

import { signUpAction } from '@/actions/auth';
import { useForm, FieldPath } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { Link as NextUILink } from '@nextui-org/react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/database/drizzle/validation';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import { SendEmailIcon } from '@/components/icons';
import { ErrorToast } from '../ErrorToast';
import { ErrorMessage } from '@hookform/error-message';
import { ActionStatus } from '@/types/drizzle';
import { Input } from '@nextui-org/react';

type Inputs = z.infer<typeof signupSchema>;
export default function SignUpForm({ promoCode }: { promoCode?: string }) {
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
      <h1>signup</h1>
      {promoCode && (
        <Input
          isReadOnly
          label="applied code"
          defaultValue={promoCode}
          size="lg"
          color="secondary"
          {...register('promo_code')}
        />
      )}
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
        errors={errors}
        name="email"
        render={({ message }) => <ErrorToast text={message} />}
      />

      <Input
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

      <Input
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

      <Input
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
      <div className="flex flex-col items-center gap-4 w-full">
        <SubmitButton
          fullWidth
          variant="flat"
          formAction={formAction}
          pendingText="creating account..."
          endContent={<SendEmailIcon size={28} strokeWidth={2} />}
          className=" text-large tracking-wider"
          color="success"
          size="lg"
        >
          create
        </SubmitButton>

        <NextUILink href="/login" underline="hover">
          Have an account?
        </NextUILink>
      </div>
    </form>
  );
}
