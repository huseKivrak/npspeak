import {db} from '@/database/drizzle';
import {getUserFromSession} from '@/server-actions/auth';
import {campaigns, npcs, campaign_npcs} from '@/database/drizzle/schema';
import {insertNPCSchema} from '@/database/drizzle/schema';
import {z, ZodError, ZodFormattedError, ZodIssue} from 'zod';
import {eq, and} from 'drizzle-orm';
import {NPCsWithCampaigns} from '@/types/drizzle';
import {Tables} from '@/types/supabase';
import {NPCZodErrors} from '@/components/forms/rhf-forms/NPCForm';

export type NPCState =
	| {
			status: 'success';
			message: string;
			value?: Tables<'npcs'>;
	  }
	| {
			status: 'error';
			message: string;
			errors?: NPCZodErrors;
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
			errors: {
				formErrors: [JSON.stringify(error)],
			},
		};
	}
};
