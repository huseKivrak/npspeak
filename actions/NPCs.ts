'use server';

import {db} from '@/database/drizzle';
import {getUserFromSession} from '@/server-actions/auth';
import {campaigns, npcs, campaign_npcs} from '@/database/drizzle/schema';
import {insertNPCSchema} from '@/database/drizzle/schema';
import {eq, and} from 'drizzle-orm';
import {Tables} from '@/types/supabase';

import {revalidatePath} from 'next/cache';

export type NPCState =
	| {
			status: 'success';
			message: string;
			value?: Tables<'npcs'>;
	  }
	| {
			status: 'error';
			message: string;
			errors?: string | string[];
	  }
	| null;

export const createNPCAction = async (
	prevState: NPCState,
	formData: {
		npc_name: string;
		description?: string;
	}
): Promise<NPCState> => {
	const user = await getUserFromSession();
	if (!user) throw new Error('You must be logged in to create NPCs.');

	const {npc_name, description} = formData;
	try {
		const insertedCampaign: Tables<'npcs'>[] = await db
			.insert(npcs)
			.values({
				npc_name,
				description,
			})
			.returning();

		revalidatePath(`/${user.user_metadata.username}/npcs`);
		return {
			status: 'success',
			message: `${insertedCampaign[0].npc_name} is born!`,
			value: insertedCampaign[0],
		};
	} catch (error) {
		console.error(error);
		return {
			status: 'error',
			message: 'An error occured while creating NPC.',
			errors: JSON.stringify(error),
		};
	}
};

export const deleteNPCAction = async (npcID: number): Promise<NPCState> => {
	const user = await getUserFromSession();
	if (!user) throw new Error('You must be logged in to delete NPCs.');

	try {
		const deletedNPC = await db
			.delete(npcs)
			.where(and(eq(npcs.id, npcID), eq(npcs.user_id, user.id)))
			.returning();

		return {
			status: 'success',
			message: `${deletedNPC[0].npc_name} is gone!`,
			value: deletedNPC[0],
		};
	} catch (error) {
		return {
			status: 'error',
			message: 'An error occured while deleting NPC.',
			errors: JSON.stringify(error),
		};
	}
};
