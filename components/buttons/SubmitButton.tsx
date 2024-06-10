'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@nextui-org/button';
type Props = ButtonProps & {
  pendingText?: string;
};

export function SubmitButton({ pendingText, children, ...props }: Props) {
  const { pending, action } = useFormStatus();
  const isPending = pending && action === props.formAction;

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {isPending ? pendingText : children}
    </Button>
  );
}
