'use server';
import { db } from '@/database/drizzle';
import { getUserProfile } from '../auth';
import { npcs, campaign_npcs } from '@/database/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { Tables } from '@/types/supabase';
import { ActionStatus } from '@/types/types';
import { npcSchema, deleteNPCSchema } from '@/database/drizzle/validation';
import { ZodError } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers/vercel';
import { redirectIfDemoUserDeleting } from '@/utils/permissions';

export const createNPCAction = async (
  formData: FormData
): Promise<ActionStatus> => {
  const { user } = await getUserProfile();
  if (!user) throw new Error('You must be logged in to create NPCs.');

  const user_id = user.id;
  let newNPCId: number | null = null;

  console.log('FORM DATA:', formData);
  try {
    const { npc_name, description, campaign_ids, voice_id } =
      npcSchema.parse(formData);

    const insertedNPC: Tables<'npcs'>[] = await db
      .insert(npcs)
      .values({
        user_id,
        npc_name,
        description,
        voice_id,
      })
      .returning();

    if (campaign_ids && campaign_ids.length > 0) {
      const campaign_associations = campaign_ids.map((campaign_id) => ({
        npc_id: insertedNPC[0].id,
        campaign_id: Number(campaign_id),
      }));

      await db.insert(campaign_npcs).values(campaign_associations);
    }

    newNPCId = insertedNPC[0].id;
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: 'error',
        message: 'Invalid form data',
        errors: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: `${issue.message}`,
        })),
      };
    }
    console.error(error);
    return {
      status: 'error',
      message: 'An error occured while creating NPC.',
    };
  }
  revalidatePath('/');
  redirect(`/npcs/${newNPCId}`);
};

export const updateNPCAction = async (
  formData: FormData,
  npcId: number
): Promise<ActionStatus> => {
  const { user } = await getUserProfile();
  if (!user) throw new Error('You must be logged in to update NPCs.');

  try {
    const { npc_name, description, voice_id, campaign_ids } =
      npcSchema.parse(formData);

    const updatedNPC = await db
      .update(npcs)
      .set({
        npc_name,
        description,
        voice_id,
      })
      .where(and(eq(npcs.id, npcId), eq(npcs.user_id, user.id)))
      .returning();

    if (campaign_ids && campaign_ids.length > 0) {
      const campaign_associations = campaign_ids.map((campaign_id) => ({
        npc_id: npcId,
        campaign_id: campaign_id as number,
      }));

      for (const association of campaign_associations) {
        await db
          .update(campaign_npcs)
          .set({
            campaign_id: association.campaign_id,
            npc_id: association.npc_id,
          })
          .where(and(eq(npcs.id, npcId), eq(npcs.user_id, user.id)));
      }
    }

    console.log('NPC Updated:', updatedNPC);
  } catch (error) {
    console.error('Error updating NPC:', error);
    if (error instanceof ZodError) {
      return {
        status: 'error',
        message: 'Invalid form data',
        errors: error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: `${issue.message}`,
        })),
      };
    }
    return {
      status: 'error',
      message: 'An error occured while updating NPC.',
    };
  }
  revalidatePath('/');
  redirect(`/npcs/${npcId}`);
};

export const deleteNPCAction = async (
  prevState: ActionStatus | null,
  formData: FormData
): Promise<ActionStatus> => {
  const { user } = await getUserProfile();
  if (!user) throw new Error('You must be logged in to delete NPCs.');

  redirectIfDemoUserDeleting(
    user.id,
    '/dashboard',
    'demo user cannot delete NPCs.'
  );

  let redirectPath: string;

  try {
    const { npc_id } = deleteNPCSchema.parse(formData);
    const deletedNPC = await db
      .delete(npcs)
      .where(and(eq(npcs.id, npc_id), eq(npcs.user_id, user.id)))
      .returning();

    redirectPath = getStatusRedirect(
      '/dashboard',
      'success',
      `so long, ${deletedNPC[0].npc_name}!`
    );
  } catch (error) {
    console.error('Error deleting NPC:', error);
    redirectPath = getErrorRedirect(
      '/npcs',
      'oops',
      'an error occured while deleting NPC.'
    );
    return {
      status: 'error',
      message: 'An error occured while deleting NPC.',
    };
  }

  revalidatePath('/');
  redirect(redirectPath);
};
