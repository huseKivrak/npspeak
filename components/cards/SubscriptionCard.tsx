import { ProductWithPrice } from '../forms/SignUpWithStripeForm';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button, Divider } from '@nextui-org/react';
import { Tables } from '@/types/supabase';

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
    <Card className="max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <p className="text-md">{product.name}</p>
          <p className="text-md">
            <span>{priceString}</span>
            {billingInterval && <span>/{billingInterval}</span>}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{product.description}</p>
      </CardBody>
      <CardFooter>
        <Button
          type="button"
          onClick={() => handleCheckout(price)}
          isLoading={buttonIsLoading}
        >
          subscribe
        </Button>
      </CardFooter>
    </Card>
  );
}
