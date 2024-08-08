'use client';

import { createStripePortal } from '@/utils/stripe/server';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default async function AccountPage() {
  const router = useRouter();
  const handleManageSubscription = async () => {
    const redirectUrl = await createStripePortal('account');
    return router.push(redirectUrl);
  };

  return (
    <div>
      <h1>Account</h1>
      <Button onClick={handleManageSubscription}>Manage Subscription</Button>
    </div>
  );
}
