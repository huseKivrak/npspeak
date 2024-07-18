import SignUpWithStripeForm from '@/components/forms/SignUpWithStripeForm';
import { getUserProfile } from '@/actions/auth';
import { getProducts } from '@/database/drizzle/stripeQueries';

export default async function SubscribePage() {
  const [{ user }, products] = await Promise.all([
    getUserProfile(),
    getProducts(),
  ]);
  console.log('USER:', user, 'PRODUCTS:', products);
  console.log('TEST PRICE:', products[0].prices);

  return <SignUpWithStripeForm user={user} products={products} />;
}
