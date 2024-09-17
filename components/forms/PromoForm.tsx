'use client';

import { useState } from 'react';
import { getPromoCodeStatus } from '@/actions/db/promo';
import { Button, Input } from '@nextui-org/react';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';

interface PromoFormProps {
  onValidPromoCode: (code: string) => void;
}
export default function PromoForm({ onValidPromoCode }: PromoFormProps) {
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        className="max-w-sm"
        classNames={{
          input: 'text-3xl tracking-widest font-mono text-center',
          errorMessage: 'text-lg',
          description: 'text-xl',
        }}
        description="Enter your invite code to get started."
      />
      <Button
        color={error ? 'danger' : 'success'}
        isLoading={isSubmitting}
        isIconOnly
        type="submit"
        aria-label="apply code"
        size="lg"
      >
        <FaRegArrowAltCircleRight />
      </Button>
    </form>
  );
}
