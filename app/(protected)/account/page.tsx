import { getUserProfile } from '@/actions/auth';
import CustomerPortalForm, {
  SubscriptionWithPriceAndProduct,
} from '@/components/forms/CustomerPortalForm';
import { getSubscription } from '@/database/drizzle/stripeQueries';
import { getErrorRedirect } from '@/utils/helpers/vercel';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  const { user } = await getUserProfile();

  if (!user) {
    const errorRedirect = getErrorRedirect(
      '/login',
      'unauthorized',
      'please login before subscribing'
    );
    return redirect(errorRedirect);
  }
  const subscription = await getSubscription(user?.id);

  return (
    <div className="flex flex-col gap-4">
      <h1>{`${user.username}`}</h1>

      <CustomerPortalForm
        subscription={subscription as SubscriptionWithPriceAndProduct}
      />
    </div>
  );
}
