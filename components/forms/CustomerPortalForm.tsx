'use client';

import { Tables } from '@/types/supabase';
import { formatPrice } from '@/utils/helpers/formatHelpers';
import { createStripePortal } from '@/utils/stripe/server';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from '@nextui-org/react';
import { Link as NextUILink } from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

export interface SubscriptionWithPriceAndProduct extends Subscription {
  price:
    | (Price & {
        product: Product;
      })
    | null;
}

export default async function AccountPage({
  subscription,
}: {
  subscription?: SubscriptionWithPriceAndProduct;
}) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleManageSubscription = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <div className="flex flex-col  gap-4">
      {subscription ? (
        <Card className="max-w-[350px] px-1 font-mono">
          <CardHeader className="justify-between text-large pb-0">
            <span className="text-secondary font-bold ">
              {`${subscription.price?.product.name} plan`}
            </span>

            <Chip
              color={subscription.status === 'active' ? 'success' : 'danger'}
              size="sm"
              radius="lg"
            >
              {subscription.status}
            </Chip>
          </CardHeader>
          <CardBody className="text-small">
            {subscription.canceled_at ? (
              <div>
                <p className="danger">
                  `canceled on$
                  {new Date(subscription.canceled_at).toLocaleDateString()}`
                </p>
                <p>{`ends on ${subscription.current_period_end}`}</p>
              </div>
            ) : (
              <div>
                <p className="underline underline-offset-2">billing</p>
                <p>
                  last:{' '}
                  {new Date(
                    subscription.current_period_start
                  ).toLocaleDateString()}
                </p>
                <p>
                  {`next: ${new Date(subscription.current_period_end).toLocaleDateString()}`}

                  <span className="text-success">
                    {' '}
                    ({formatPrice(subscription.price!)})
                  </span>
                </p>
              </div>
            )}
          </CardBody>
          <CardFooter>
            <Button
              color="secondary"
              onPress={handleManageSubscription}
              isLoading={isSubmitting}
              endContent={<FaExternalLinkAlt />}
            >
              manage
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <span>
          <NextUILink href="/subscribe">subscribe</NextUILink>
        </span>
      )}
    </div>
  );
}
