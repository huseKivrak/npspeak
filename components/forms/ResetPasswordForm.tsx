'use client';

import { updatePasswordAction } from '@/actions/auth';
import { useState } from 'react';
import { Button, Input, Spinner } from '@nextui-org/react';
import { SendEmailIcon } from '../icons';

export default function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const errorMessage = await updatePasswordAction(formData);
    setErrorMessage(errorMessage);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>reset password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          autoFocus
          isRequired
          type="password"
          label="new password"
          name="password"
          placeholder="•••••••"
          variant="flat"
          size="lg"
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />

        <Input
          isRequired
          type="password"
          label="confirm password"
          name="confirm_password"
          placeholder="•••••••"
          variant="flat"
          size="lg"
          isInvalid={!!errorMessage}
          errorMessage={errorMessage}
        />

        <Button
          variant="flat"
          className=" tracking-wider"
          size="lg"
          color="success"
          isDisabled={isSubmitting}
          endContent={!isSubmitting && <SendEmailIcon />}
          type="submit"
        >
          {isSubmitting ? <Spinner /> : 'update'}
        </Button>
      </form>
    </div>
  );
}
