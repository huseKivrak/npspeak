import { ProductWithPrice } from '../forms/SignUpWithStripeForm';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button, Divider } from '@nextui-org/react';
import { Tables } from '@/types/supabase';
import { cn } from '@/utils/helpers/clsxMerge';

type Price = Tables<'prices'>;
interface Props {
  product: ProductWithPrice;
  handleCheckout: (price: Price) => void;
  buttonIsLoading: boolean;
}

export function SubscriptionCard({
  product,
  handleCheckout,
  buttonIsLoading,
}: Props) {
  const price = product.prices[0];

  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency!,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  const billingInterval = price.interval ? price.interval : '';
  return (
    <Card
      isPressable
      onPress={() => handleCheckout(price)}
      classNames={{
        base: `w-full max-w-[350px] flex flex-col items-center justify-evenly py-2 px-8 bg-success hover:bg-opacity-30 hover:scale-105 transition-all duration-300`,
        header: 'justify-between text-4xl font-alagard tracking-wider pb-0',
        body: 'text-center justify-center text-3xl pt-0 ',
        footer:
          'flex items-center justify-center pt-0 font-alagard text-4xl tracking-widest font-bold',
      }}
    >
      <CardHeader
        className={cn('', {
          'text-warning': !billingInterval,
        })}
      >
        <p>{product.name}</p>
        <span className="text-3xl font-mono font-bold">{priceString}</span>
      </CardHeader>
      <Divider className="my-2" />
      <CardBody
        className={cn({
          'text-warning': !billingInterval,
        })}
      >
        <p className="text-balance">{product.description}</p>
      </CardBody>
      <CardFooter>
        <Button
          type="button"
          color="success"
          size="lg"
          fullWidth
          variant="flat"
          onClick={() => handleCheckout(price)}
          isLoading={buttonIsLoading}
        >
          <span
            className={cn('text-foreground', {
              'text-warning': !billingInterval,
            })}
          >
            subscribe
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
