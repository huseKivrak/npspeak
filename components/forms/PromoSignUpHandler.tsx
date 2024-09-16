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
    <div className="flex flex-col gap-4">
      <h1 className="text-secondary font-alagard">what&apos;s the password?</h1>
      <p className="text-xl">
        npSpeak is currently in beta and requires an invite code to access.
        <br />
        please enter the code you've received below to sign up.
      </p>
      <PromoForm onValidPromoCode={onValidPromoCode} />
    </div>
  );
}
