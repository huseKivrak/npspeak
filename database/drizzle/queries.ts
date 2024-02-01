'use server';
import { redirect } from 'next/navigation';
import { db } from '.';
import { getUserFromSession } from '@/utils/supabase/helpers';
import { campaigns } from './schema';
import { insertCampaignSchema } from './schema';
import { ZodError } from 'zod';
import { revalidatePath } from 'next/cache';

export const createCampaignAction = async (prevState: any, formData: FormData) => {
  const user = await getUserFromSession();
  if (!user) {
    return redirect('/');
  }

  let newCampaignId;

  try {
    const campaign_name = formData.get('campaign_name') as string;
    const description = formData.get('description') as string;
    const start_date = formData.get('start_date');
    const end_date = formData.get('end_date');

    const validatedData = insertCampaignSchema.parse({
      user_id: user.id,
      is_default: false,
      campaign_name: campaign_name,
      description: description,
      start_date: start_date === '' ? null : start_date, //*
      end_date: end_date === '' ? null : end_date, //*
    });

    const data = await db.insert(campaigns).values(validatedData).returning();
    newCampaignId = data[0].id;

  } catch (error: any) {
    if (error instanceof ZodError) {
      return { zodError: error.errors };
    } else {
      return { message: [error.message] };
    }
  }

  revalidatePath(`/${user.user_metadata.username}/campaigns`);
  redirect(`/${user.user_metadata.username}/campaigns/${newCampaignId}`);
};
