'use client';

import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  text: string;
  className?: string;
  children?: React.ReactNode;
};

export function SubmitButton({ text, className, children }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const buttonClasses = `btn btn-primary ${className || ''}`;

  return (
    <button type='submit' aria-disabled={pending} disabled={pending} className={buttonClasses}>
      {text}
      {children}
    </button>
  );
}
