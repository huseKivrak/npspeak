'use client';
import { useState } from 'react';
import { sendResetPasswordEmail } from '@/actions/auth';

import { isValidEmail } from '@/utils/helpers/vercel';
import { Button, Input, Spinner } from '@nextui-org/react';
import { IconSendEmail } from '../../lib/icons';

export function ForgotPasswordForm() {
  const [ email, setEmail ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validEmail = isValidEmail(email);
    if (!validEmail) {
      setErrorMessage('please enter a valid email');
      setIsSubmitting(false);
      return;
    }

    const errorMessage = await sendResetPasswordEmail(email);
    setErrorMessage(errorMessage);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>reset password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          isRequired
          label="email address"
          value={email}
          onValueChange={setEmail}
          color={errorMessage ? 'danger' : 'default'}
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />

        <Button
          variant="flat"
          className=" tracking-wider"
          size="lg"
          color="success"
          isDisabled={isSubmitting}
          endContent={!isSubmitting && <IconSendEmail />}
          type="submit"
        >
          {isSubmitting ? <Spinner /> : 'Send reset link'}
        </Button>
      </form>
    </div>
  );
}
