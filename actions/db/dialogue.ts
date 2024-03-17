'use server';
import {db} from '@/database/drizzle';
import {getUserInfo} from '../auth';
import {npc_dialogues, tts_audio} from '@/database/drizzle/schema';
import {Tables} from '@/types/supabase';
import {ActionStatus} from '@/types/drizzle';
import {dialogueSchema, ttsAudioSchema} from '@/database/drizzle/validation';
import {ZodError} from 'zod';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

export const createDialogueAction = async (
	prevState: ActionStatus,
	formData: FormData
): Promise<ActionStatus> => {
	const {user} = await getUserInfo();
	if (!user)
		return {
			status: 'error',
			message: 'You must be logged in to create dialogues.',
		};

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
		console.log('insertedDialogue', insertedDialogue[0]);
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
	revalidatePath('/');
	// redirect(`/${user.username}/npcs/${formData.get('npc_id')}`);
	return {
		status: 'success',
		message: '',
	};
};

export async function createTTSAudioAction(
	prevState: ActionStatus,
	formData: FormData
): Promise<ActionStatus> {
	const {user} = await getUserInfo();
	if (!user)
		return {
			status: 'error',
			message: 'You must be logged in to create audio.',
		};

	const user_id = user.id;

	try {
		const {duration_seconds, source_text, voice_id, file_url} =
			ttsAudioSchema.parse(formData);

		const insertedTTS: Tables<'tts_audio'>[] = await db
			.insert(tts_audio)
			.values({
				user_id,
				voice_id,
				source_text,
				file_url,
				duration_seconds,
			})
			.returning();
		revalidatePath('/');
		return {
			status: 'success',
			message: `${insertedTTS[0].id}`,
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
			message: 'An error occured while creating TTS Audio.',
		};
	}
}
