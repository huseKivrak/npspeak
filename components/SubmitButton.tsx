'use client';

import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  text: string;
  className?: string;
};

export function SubmitButton({ text, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const buttonClasses = `btn btn-primary ${className || ''}`;

  return (
    <button type='submit' aria-disabled={pending} className={buttonClasses}>
      {text}
    </button>
  );
}
