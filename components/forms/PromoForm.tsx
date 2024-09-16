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
        autoFocus
        type="text"
        aria-label="promo code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        isInvalid={!!error}
        errorMessage={error}
        size="lg"
        className="max-w-xs"
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
