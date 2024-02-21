'use server';
import {db} from '@/database/drizzle';
import {getUserFromSession} from '@/actions/auth';
import {npc_dialogues} from '@/database/drizzle/schema';
import {Tables} from '@/types/supabase';
import {State} from '@/types/drizzle';
import {dialogueSchema} from '@/database/drizzle/validation';
import {ZodError} from 'zod';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';

export const createDialogueAction = async (
	prevState: State,
	formData: FormData
): Promise<State> => {
	const user = await getUserFromSession();
	if (!user) throw new Error('You must be logged in to create dialogues.');

	const user_id = user.id;

	try {
		const {npc_id, dialogue_type_id, text} = dialogueSchema.parse(formData);
		const insertedDialogue: Tables<'npc_dialogues'>[] = await db
			.insert(npc_dialogues)
			.values({
				user_id,
				npc_id,
				dialogue_type_id,
				text,
			})
			.returning();
		revalidatePath('/');

		return {
			status: 'success',
			message: `Dialogue created!`,
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
			message: 'An error occured while creating dialogue.',
		};
	}
};
