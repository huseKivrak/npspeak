'use client';
import { useState } from 'react';
import { FormInput } from './FormInput';
import { sendResetPasswordEmail } from '@/actions/auth';
import { SubmitButton } from '../buttons/SubmitButton';
import { isValidEmail } from '@/utils/helpers/vercel';
import { Button, Spinner } from '@nextui-org/react';
import { SendEmailIcon } from '../icons';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const validEmail = isValidEmail(email);
    if (!validEmail) {
      setError('Please enter a valid email.');
      return;
    }
    try {
      //Handle error message if not redirected
      const errorMessage = await sendResetPasswordEmail(email);
      setError(errorMessage);
    } catch (error) {
      setError('An error occurred while sending the reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>reset password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          autoFocus
          isClearable
          isRequired
          label="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-danger">{error}</p>}

        <Button
          variant="flat"
          className=" tracking-wider"
          radius="sm"
          size="lg"
          isDisabled={isSubmitting}
          endContent={!isSubmitting && <SendEmailIcon />}
        >
          {isSubmitting ? <Spinner /> : 'Send reset link'}
        </Button>
      </form>
    </div>
  );
}
