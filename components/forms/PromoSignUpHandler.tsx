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
      description: 'code accepted. please continue with sign up.',
    });
  };

  return validPromoCode ? (
    <SignUpForm promoCode={validPromoCode} />
  ) : (
    <div className="flex flex-col">
      <h1 className="text-secondary font-alagard">what&apos;s the password?</h1>
      <h2 className="text-warning text-2xl mt-4"> npSpeak is in beta!</h2>
      <span className="text-xl sm:text-2xl">
        please enter your invite code to get started.
      </span>
      <PromoForm onValidPromoCode={onValidPromoCode} />
    </div>
  );
}
