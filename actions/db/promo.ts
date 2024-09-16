'use server';

import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { profiles, promo_codes } from '@/database/drizzle/schema';
import { getPromoCodeStatus } from '@/database/drizzle/queries';

export const applyPromoCodeToUser = async (code: string, userId: string) => {
  try {
    const codeStatus = await getPromoCodeStatus(code);

    if (codeStatus.status === 'error') {
      return { error: codeStatus.message };
    } else {
      const validCode = codeStatus.promoCode;

      //update user profile with promo code
      await db
        .update(profiles)
        .set({
          promo_code: code,
        })
        .where(eq(profiles.id, userId));

      //increment promo code usage
      await db
        .update(promo_codes)
        .set({ usage_count: validCode.usage_count + 1 })
        .where(eq(promo_codes.id, validCode.id));
    }
    return { error: null };
  } catch (error) {
    console.error('Error applying promo code to user:', error);
    throw new Error('Error applying promo code to user');
  }
};
