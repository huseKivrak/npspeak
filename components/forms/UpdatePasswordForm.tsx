'use client';

import { updatePasswordAction } from '@/actions/auth';
import { useState } from 'react';
import { FormInput } from './FormInput';
import { Button, Spinner } from '@nextui-org/react';

export default function UpdatePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    } else if (password.length < 6) {
      setError('Password must be at least 8 characters');
      return;
    }
    try {
      //Handle error message if not redirected
      const errorMessage = await updatePasswordAction(formData);
      setError(errorMessage);
    } catch (error) {
      setError('An error occurred while updating the password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Reset Password Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          autoFocus
          isClearable
          isRequired
          type="password"
          label="New Password"
          name="password"
          placeholder="•••••••"
          variant="flat"
          size="lg"
        />

        <FormInput
          isRequired
          type="password"
          label="Confirm Password"
          name="confirm_password"
          placeholder="•••••••"
          variant="flat"
          size="lg"
        />
        {error && <p className="text-danger">{error}</p>}

        <Button
          variant="flat"
          className=" tracking-wider"
          radius="sm"
          size="lg"
          isDisabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Update Password'}
        </Button>
      </form>
    </div>
  );
}
