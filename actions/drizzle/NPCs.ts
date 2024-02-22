'use server';
import {db} from '@/database/drizzle';
import {getUserInfo} from '../auth';
import {npcs, campaign_npcs} from '@/database/drizzle/schema';
import {eq, and} from 'drizzle-orm';
import {Tables} from '@/types/supabase';
import {State} from '@/types/drizzle';
import {deleteNPCSchema, npcSchema} from '@/database/drizzle/validation';
import {ZodError} from 'zod';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';

export const createNPCAction = async (
	prevState: State,
	formData: FormData
): Promise<State> => {
	const {user} = await getUserInfo();
	if (!user) throw new Error('You must be logged in to create NPCs.');

	const user_id = user.id;

	try {
		const {npc_name, description, campaign_ids} = npcSchema.parse(formData);
		const insertedNPC: Tables<'npcs'>[] = await db
			.insert(npcs)
			.values({
				user_id,
				npc_name,
				description,
			})
			.returning();

		if (campaign_ids && campaign_ids.length > 0) {
			const associations = campaign_ids.map((campaign_id) => ({
				npc_id: insertedNPC[0].id,
				campaign_id: campaign_id as number, //fixes type error
			}));
			await db.insert(campaign_npcs).values(associations);
		}
		return {
			status: 'success',
			message: `${insertedNPC[0].npc_name} is born!`,
		};
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
};

export const deleteNPCAction = async (
	prevState: State,
	formData: FormData
): Promise<State> => {
	const {user} = await getUserInfo();
	if (!user) throw new Error('You must be logged in to delete NPCs.');

	const user_id = user.id;
	const {npc_id} = deleteNPCSchema.parse(formData);
	try {
		const deletedNPC = await db
			.delete(npcs)
			.where(and(eq(npcs.id, npc_id), eq(npcs.user_id, user_id)))
			.returning();

		// return {
		// 	status: 'success',
		// 	message: `${deletedNPC[0].npc_name} is gone!`,
		// };

		revalidatePath('/');
	} catch (error) {
		return {
			status: 'error',
			message: 'An error occured while deleting NPC.',
		};
	}
	redirect('/dashboard');
};
