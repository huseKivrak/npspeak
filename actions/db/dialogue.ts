'use server';

import { db } from '@/database/drizzle';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { eq, and } from 'drizzle-orm';
import { getUserProfile } from '../auth';
import { deleteAudioFromS3 } from '../s3';
import { npc_dialogues, tts_audio } from '@/database/drizzle/schema';
import { Tables } from '@/types/supabase';
import { ActionStatus } from '@/types/types';
import {
  dialogueSchema,
  ttsAudioSchema,
  deleteDialogueSchema,
} from '@/database/drizzle/validation';
import { ZodError } from 'zod';
import { redirectIfDemoUser } from '@/utils/permissions';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers/vercel';
import { truncateText } from '@/utils/helpers/formatHelpers';

export const createDialogueAction = async (
  formData: FormData
): Promise<ActionStatus> => {
  const { user } = await getUserProfile();
  if (!user)
    return {
      status: 'error',
      message: 'You must be logged in to create dialogues.',
    };

  const user_id = user.id;

  try {
    const { npc_id, dialogue_type_id, text } = dialogueSchema.parse(formData);
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
    revalidatePath('/');
    return {
      status: 'success',
      message: 'Dialogue added successfully',
      data: insertedDialogue[0],
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

export const deleteDialogueAction = async (
  prevState: ActionStatus | null,
  formData: FormData
): Promise<ActionStatus> => {
  const { user } = await getUserProfile();
  if (!user)
    return {
      status: 'error',
      message: 'You must be logged in to delete dialogues.',
    };

  redirectIfDemoUser(
    user.id,
    '/dashboard',
    'demo user cannot delete dialogue.'
  );

  let redirectPath: string;

  try {
    const { dialogue_id } = deleteDialogueSchema.parse(formData);
    let deletedDialogue: Tables<'npc_dialogues'> | null = null;

    //Check if dialogue has an audio file
    const dialogueAudioIdRows = await db
      .select({ tts_audio_id: npc_dialogues.tts_audio_id })
      .from(npc_dialogues)
      .where(
        and(
          eq(npc_dialogues.id, dialogue_id),
          eq(npc_dialogues.user_id, user.id)
        )
      );
    const dialogueAudioId = dialogueAudioIdRows[0].tts_audio_id;

    //If it does, get the file name and delete it from S3
    if (dialogueAudioId) {
      const ttsAudioRows = await db
        .select()
        .from(tts_audio)
        .where(eq(tts_audio.id, dialogueAudioId));
      if (ttsAudioRows.length > 0) {
        const fileName = ttsAudioRows[0].file_url;
        const response = await deleteAudioFromS3(fileName);
        if (response.status !== 'success') {
          console.error('Error deleting audio from S3: ', response);
        }
      }
    }

    //Delete the dialogue from the database
    const deletedDialogueRows = await db
      .delete(npc_dialogues)
      .where(
        and(
          eq(npc_dialogues.id, dialogue_id),
          eq(npc_dialogues.user_id, user.id)
        )
      )
      .returning();

    deletedDialogue = deletedDialogueRows[0];
    const fullText = deletedDialogue?.text || '';
    const deletedDialogueTextSnippet = truncateText(fullText, 50);
    const deletedMessage = encodeURIComponent(
      `dialogue "${deletedDialogueTextSnippet}" deleted successfully.`
    );

    redirectPath = getStatusRedirect('/', 'success', deletedMessage);
  } catch (error) {
    console.error('Error deleting dialogue:', error);
    redirectPath = getErrorRedirect(
      '/npcs',
      'oops',
      'an error occured while deleting dialogue.'
    );
  }

  revalidatePath('/');
  redirect(redirectPath);
};

export async function updateDialogueTTSAudioAction(
  prevState: ActionStatus | null,
  formData: FormData
): Promise<ActionStatus> {
  const { user } = await getUserProfile();
  if (!user)
    return {
      status: 'error',
      message: 'You must be logged in to create audio.',
    };

  const user_id = user.id;

  try {
    const { duration_seconds, source_text, voice_id, file_url } =
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
      message: `TTS Audio successfully added`,
      data: `${insertedTTS[0].id}`,
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
