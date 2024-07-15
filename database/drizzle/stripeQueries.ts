import { eq } from 'drizzle-orm';
import { db } from './index';
import { subscriptions, products, prices } from './schema';

export const getSubscription = async (userId: string) => {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.user_id, userId),
    with: {
      price: true,
    },
  });

  return subscription;
};

export const getProducts = async () => {
  const activeProducts = await db.query.products.findMany({
    where: eq(products.active, true),
    with: {
      prices: {
        where: eq(prices.active, true),
      },
    },
  });

  return activeProducts;
};
