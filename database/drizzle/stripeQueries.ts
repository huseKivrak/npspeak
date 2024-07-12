import { eq } from 'drizzle-orm';
import { db } from './index';
import { subscriptions } from './schema';

export const getSubscription = async (userId: string) => {
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.user_id, userId),
  });

  return subscription;
};
