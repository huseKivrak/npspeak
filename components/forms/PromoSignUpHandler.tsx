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
    <div className="flex flex-col">
      <h1 className="font-alagard tracking-tight sm:tracking-normal self-center mb-12">
        what&apos;s the password?
      </h1>
      <span className="text-warning font-mono font-semibold text-3xl sm:text-4xl mb-2">
        early access
      </span>
      <PromoForm onValidPromoCode={onValidPromoCode} />
    </div>
  );
}
