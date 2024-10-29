'use server';

import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { profiles, promo_codes } from '@/database/drizzle/schema';
import { PromoCodeValidation } from '@/types/types';

export const getPromoCodeStatus = async (
  code: string
): Promise<PromoCodeValidation> => {
  try {
    const promoCode = await db.query.promo_codes.findFirst({
      where: eq(promo_codes.code, code),
    });

    if (!promoCode) {
      return {
        status: 'error',
        message: 'invalid code: not found',
      };
    }

    if (!promoCode.is_active) {
      return {
        status: 'error',
        message: 'invalid code: no longer active',
      };
    }

    if (promoCode.usage_count >= promoCode.max_usage) {
      return {
        status: 'error',
        message: 'invalid code: max uses reached',
      };
    }

    return {
      status: 'success',
      message: 'valid promo code.',
      promoCode: promoCode,
    };
  } catch (error) {
    console.error('Error validating promo code:', error);
    return {
      status: 'error',
      message: `Error validating promo code: ${error}`,
    };
  }
};

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
