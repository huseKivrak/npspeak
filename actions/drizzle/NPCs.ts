import {db} from '@/database/drizzle';
import {getUserFromSession} from '@/actions/auth';
import {npcs} from '@/database/drizzle/schema';
import {eq, and} from 'drizzle-orm';
import {Tables} from '@/types/supabase';
import {State} from '@/types/drizzle';
import {deleteNPCSchema, npcSchema} from '@/database/drizzle/validation';
import {ZodError} from 'zod';

export const createNPCAction = async (
	prevState: State,
	formData: FormData
): Promise<State> => {
	const user = await getUserFromSession();
	if (!user) throw new Error('You must be logged in to create NPCs.');

	const {npc_name, description} = npcSchema.parse(formData);
	const user_id = user.id;

	try {
		const insertedNPC: Tables<'npcs'>[] = await db
			.insert(npcs)
			.values({
				user_id,
				npc_name,
				description,
			})
			.returning();
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
	const user = await getUserFromSession();
	if (!user) throw new Error('You must be logged in to delete NPCs.');

	const user_id = user.id;
	const {npc_id} = deleteNPCSchema.parse(formData);
	try {
		const deletedNPC = await db
			.delete(npcs)
			.where(and(eq(npcs.id, npc_id), eq(npcs.user_id, user_id)))
			.returning();

		return {
			status: 'success',
			message: `${deletedNPC[0].npc_name} is gone!`,
		};
	} catch (error) {
		return {
			status: 'error',
			message: 'An error occured while deleting NPC.',
		};
	}
};