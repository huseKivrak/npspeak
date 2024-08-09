import { ProductWithPrice } from '../forms/SignUpWithStripeForm';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button, Divider, Link as NextUILink } from '@nextui-org/react';
import { Tables } from '@/types/supabase';
import { cn } from '@/utils/helpers/clsxMerge';
import { formatPrice } from '@/utils/helpers/formatHelpers';
import { MdManageAccounts } from 'react-icons/md';

type Price = Tables<'prices'>;
interface Props {
  product: ProductWithPrice;
  handleCheckout: (price: Price) => void;
  buttonIsLoading: boolean;
  isCurrentSubscription: boolean;
}

export function SubscriptionCard({
  product,
  handleCheckout,
  buttonIsLoading,
  isCurrentSubscription,
}: Props) {
  const price = product.prices[0];

  const priceString = formatPrice(price);

  const billingInterval = price.interval ? price.interval : '';
  return (
    <Card
      isPressable
      onPress={() => handleCheckout(price)}
      classNames={{
        base: cn(
          `w-full max-w-[350px] flex flex-col items-center py-2 px-4 bg-success hover:bg-opacity-30 hover:scale-105 transition-all duration-300`,
          {
            'border-4 border-secondary': isCurrentSubscription,
          }
        ),
        header: 'justify-center text-4xl font-alagard tracking-wider pb-0',
        body: 'text-center justify-center text-2xl pt-0 ',
        footer:
          'flex items-center justify-center pt-0 text-4xl tracking-widest font-bold',
      }}
    >
      <CardHeader
        className={cn('font-bold', {
          'text-warning': !billingInterval,
          'text-secondary': isCurrentSubscription,
        })}
      >
        <p className="flex-grow text-center">{product.name}</p>

        <span className="text-2xl font-mono">{priceString}</span>
      </CardHeader>
      <Divider className="my-2" />
      <CardBody
        className={cn({
          'text-warning': !billingInterval,
        })}
      >
        <p className="text-balance ">{product.description}</p>
      </CardBody>
      <CardFooter>
        {isCurrentSubscription ? (
          <Button
            as={NextUILink}
            href="/account"
            underline="hover"
            fullWidth
            className="font-bold"
            color="secondary"
            endContent={<MdManageAccounts size={24} />}
          >
            review
          </Button>
        ) : (
          <Button
            fullWidth
            onPress={() => handleCheckout(price)}
            isLoading={buttonIsLoading}
            color="primary"
          >
            <span
              className={cn('font-bold font-mono', {
                'text-warning': !billingInterval,
              })}
            >
              subscribe
            </span>
          </Button>
        )}{' '}
      </CardFooter>
    </Card>
  );
}
