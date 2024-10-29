'use client';

import { useState } from 'react';
import { getPromoCodeStatus } from '@/actions/db/promo';
import { Button, Input } from '@nextui-org/react';
import { FaCircleArrowRight } from 'react-icons/fa6';

interface PromoFormProps {
  onValidPromoCode: (code: string) => void;
}
export default function PromoForm({ onValidPromoCode }: PromoFormProps) {
  const [ promoCode, setPromoCode ] = useState('');
  const [ error, setError ] = useState('');
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const codeStatus = await getPromoCodeStatus(promoCode);
    if (codeStatus.status === 'error') {
      setError(codeStatus.message);
      setIsSubmitting(false);
    } else {
      setError('');
      onValidPromoCode(promoCode);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        isInvalid={!!error}
        errorMessage={error}
        size="lg"
        variant="faded"
        color="warning"
        className="max-w-sm md:max-w-md"
        classNames={{
          input: 'text-3xl tracking-widest font-mono text-center text-warning',
          errorMessage: 'text-lg',
          description: 'text-lg md:text-xl lg:text-2xl',
        }}
        description="enter your invite code to get started."
      />
      <Button
        color={error ? 'danger' : 'success'}
        isLoading={isSubmitting}
        isIconOnly
        type="submit"
        aria-label="apply code"
        size="lg"
        className="text-success-foreground"
      >
        <FaCircleArrowRight size={24} />
      </Button>
    </form>
  );
}
