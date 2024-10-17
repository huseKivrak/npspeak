'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { SubscriptionCard } from '../cards/SubscriptionCard';
import { Tables } from '@/types/supabase';
import { SubscriptionWithPriceAndProduct } from './CustomerPortalForm';

type Price = Tables<'prices'>;
type Product = Tables<'products'>;
type UserProfile = Tables<'profiles'>;

export interface ProductWithPrice extends Product {
  prices: Price[];
}

interface Props {
  user: UserProfile | null | undefined;
  products: ProductWithPrice[];
  subscription?: SubscriptionWithPriceAndProduct;
}

export default function SignupWithStripeForm({
  user,
  products,
  subscription,
}: Props) {
  const router = useRouter();

  const [ priceIdLoading, setPriceIdLoading ] = useState<string>();
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
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-white font-alagard tracking-widest">subscribe</h1>
      <p className="text-2xl">
        Choose the plan that&apos;s right for you to get started.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:gap-8 justify-center py-4">
        {products
          .sort((a, b) => {
            const aPrice: Price | null = a.prices[ 0 ] ?? null;
            const bPrice: Price | null = b.prices[ 0 ] ?? null;
            if (!aPrice?.unit_amount || !bPrice?.unit_amount) return 0;
            return aPrice.unit_amount - bPrice.unit_amount;
          })
          .map((product) => {
            const price = product.prices[ 0 ];
            if (!price) return null;
            return (
              <SubscriptionCard
                key={product.id}
                product={product}
                handleCheckout={handleStripeCheckout}
                buttonIsLoading={priceIdLoading === price.id}
                isCurrentSubscription={
                  subscription?.price?.product.id === product.id
                }
              />
            );
          })}
      </div>
    </div>
  );
}
