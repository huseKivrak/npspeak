'use client';

import { useState } from 'react';
import PromoForm from './PromoForm';
import SignUpForm from './SignUpForm';
import { toast } from '../toaster/use-toast';

export default function PromoSignUpHandler() {
  const [validPromoCode, setValidPromoCode] = useState('');

  const onValidPromoCode = (code: string) => {
    setValidPromoCode(code);
    toast({
      title: 'success!',
      description: 'code accepted',
    });
  };

  return validPromoCode ? (
    <SignUpForm promoCode={validPromoCode} />
  ) : (
    <div className="flex flex-col gap-4">
      <h1>what&apos;s the password?</h1>
      <span className="text-warning font-mono font-semibold text-3xl md:text-4xl lg:text-6xl ">
        early access
      </span>
      <PromoForm onValidPromoCode={onValidPromoCode} />
    </div>
  );
}
