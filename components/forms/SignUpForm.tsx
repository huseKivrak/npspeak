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
import { ActionStatus } from '@/types/drizzle';
import { Input } from '@nextui-org/react';

type Inputs = z.infer<typeof signupSchema>;
export default function SignUpForm({ promoCode }: { promoCode?: string; }) {
  const [ state, formAction ] = useFormState<ActionStatus, FormData>(
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
    criteriaMode: 'firstError',
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
  }, [ state, setError ]);

  return (
    <form className="flex flex-col gap-10 max-w-md">
      <h1>signup</h1>
      {promoCode && (
        <Input
          isReadOnly
          label="applied code"
          defaultValue={promoCode}
          size="lg"
          color="warning"
          variant="bordered"
          classNames={{
            inputWrapper: 'border-warning data-[hover=true]:border-warning',
          }}
          {...register('promo_code')}
        />
      )}
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
        label="username"
        variant="flat"
        size="lg"
        isInvalid={!!errors.username}
        errorMessage={errors.username && errors.username.message}
        {...register('username')}
      />

      <Input
        isRequired
        type="password"
        label="password"
        variant="flat"
        size="lg"
        {...register('password')}
        isInvalid={!!errors.password}
        errorMessage={errors.password && errors.password.message}
      />

      <Input
        isRequired
        type="password"
        label="confirm password"
        variant="flat"
        size="lg"
        {...register('confirm_password')}
        isInvalid={!!errors.confirm_password}
        errorMessage={
          errors.confirm_password && errors.confirm_password.message
        }
      />
      <div className="flex flex-col gap-4 w-full">
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
          have an account?
        </NextUILink>
      </div>
    </form>
  );
}
