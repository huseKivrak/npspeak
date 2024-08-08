import SignUpWithStripeForm from '@/components/forms/SignUpWithStripeForm';
import { getUserProfile } from '@/actions/auth';
import { getProducts } from '@/database/drizzle/stripeQueries';

export default async function SubscribePage() {
  const [{ user }, products] = await Promise.all([
    getUserProfile(),
    getProducts(),
  ]);

  return <SignUpWithStripeForm user={user} products={products} />;
}
