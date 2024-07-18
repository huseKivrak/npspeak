'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { SubscriptionCard } from '../cards/SubscriptionCard';
import { Tables } from '@/types/supabase';

type Price = Tables<'prices'>;
type Product = Tables<'products'>;
type UserProfile = Tables<'profiles'>;

export interface ProductWithPrice extends Product {
  prices: Price[];
}

interface Props {
  user: UserProfile | null | undefined;
  products: ProductWithPrice[];
}

export default function SignupWithStripeForm({ user, products }: Props) {
  const router = useRouter();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(`${currentPath}?message=unknown-error-sessionId`);
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
      <h1>plans</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {products.map((product) => {
          const price = product.prices[0];
          if (!price) return null;

          return (
            <SubscriptionCard
              key={product.id}
              product={product}
              handleCheckout={handleStripeCheckout}
              buttonIsLoading={priceIdLoading === price.id}
            />
          );
        })}
      </div>
    </div>
  );
}
