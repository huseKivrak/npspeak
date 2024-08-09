import SignUpWithStripeForm from '@/components/forms/SignUpWithStripeForm';
import { getUserProfile } from '@/actions/auth';
import { getProducts, getSubscription } from '@/database/drizzle/stripeQueries';

import { redirect } from 'next/navigation';
import { getErrorRedirect } from '@/utils/helpers/vercel';
import { SubscriptionWithPriceAndProduct } from '@/components/CustomerPortalForm';

export default async function SubscribePage() {
  const [{ user }, products] = await Promise.all([
    getUserProfile(),
    getProducts(),
  ]);
  if (!user)
    return redirect(
      getErrorRedirect(
        '/login',
        'unauthorized',
        'please login before subscribing'
      )
    );
  const subscription = await getSubscription(user?.id);

  return (
    <SignUpWithStripeForm
      user={user}
      products={products}
      subscription={subscription as SubscriptionWithPriceAndProduct}
    />
  );
}
