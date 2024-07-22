'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { SubscriptionCard } from '../cards/SubscriptionCard';
import { Tables } from '@/types/supabase';
import { Button, Tooltip } from '@nextui-org/react';
import { FaQuestionCircle } from 'react-icons/fa';

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
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-white font-alagard tracking-widest">subscribe</h1>
      <p className="text-2xl">
        Choose the plan that&apos;s right for you to get started.
      </p>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:gap-8 justify-center py-4">
        {products
          .sort((a, b) => {
            const aPrice: Price | null = a.prices[0] ?? null;
            const bPrice: Price | null = b.prices[0] ?? null;
            if (!aPrice?.unit_amount || !bPrice?.unit_amount) return 0;
            return aPrice.unit_amount - bPrice.unit_amount;
          })
          .map((product) => {
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
      <div className="flex items-center gap-2">
        <span className="text-large font-semibold">I have a promo code</span>
        <Tooltip
          placement="right"
          color="warning"
          content={
            <div className="px-1 py-2">
              <div className="text-small font-semibold">
                Thanks for checking out the site!
              </div>
              <div className="text-small">
                You can enter your code at checkout
              </div>
            </div>
          }
          delay={0}
          closeDelay={0}
          motionProps={{
            variants: {
              exit: {
                opacity: 0,
                transition: {
                  duration: 0.1,
                  ease: 'easeIn',
                },
              },
              enter: {
                opacity: 1,
                transition: {
                  duration: 0.15,
                  ease: 'easeOut',
                },
              },
            },
          }}
        >
          <Button
            isIconOnly
            variant="light"
            color="warning"
            aria-label="I have a promo code"
          >
            <FaQuestionCircle />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
