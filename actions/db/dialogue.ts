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

  let redirectPath: string;

  try {
    const { dialogue_id } = deleteDialogueSchema.parse(formData);
    let deletedDialogue: Tables<'npc_dialogues'> | null = null;

    //Get the dialogue and its associated audio
    const dialogueWithAssociatedAudio = await db.query.npc_dialogues.findFirst({
      where: and(
        eq(npc_dialogues.id, dialogue_id),
        eq(npc_dialogues.user_id, user.id)
      ),
      columns: {
        id: true,
        is_default: true,
      },
      with: {
        tts_audio: {
          columns: {
            file_url: true,
          },
        },
      },
    });

    if (!dialogueWithAssociatedAudio) {
      return {
        status: 'error',
        message: 'Dialogue not found',
      };
    }

    const { id: dialogueId, tts_audio } = dialogueWithAssociatedAudio;

    //If an audio file exists, delete it from s3
    if (tts_audio?.file_url) {
      const response = await deleteAudioFromS3(tts_audio.file_url);
      if (response.status !== 'success') {
        console.error('Error deleting audio from S3: ', response);
      }
    }

    //Delete the dialogue from the database
    const deletedDialogueRows = await db
      .delete(npc_dialogues)
      .where(and(eq(npc_dialogues.id, dialogueId)))
      .returning();

    deletedDialogue = deletedDialogueRows[0];
    const fullText = deletedDialogue?.text || '';
    const dialogueSnippet = truncateText(fullText, 10);
    redirectPath = getStatusRedirect(
      '/',
      'success',
      `dialogue "${dialogueSnippet}" deleted.`
    );
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

  try {
    const { duration_seconds, source_text, voice_id, file_url, dialogue_id } =
      ttsAudioSchema.parse(formData);

    const insertedTTS: Tables<'tts_audio'>[] = await db
      .insert(tts_audio)
      .values({
        user_id: user.id,
        voice_id,
        source_text,
        file_url,
        duration_seconds,
      })
      .returning();

    if (insertedTTS.length === 0) {
      return {
        status: 'error',
        message: 'Failed to insert TTS audio',
      };
    }

    const updatedDialogue = await db
      .update(npc_dialogues)
      .set({ tts_audio_id: insertedTTS[0].id })
      .where(eq(npc_dialogues.id, dialogue_id))
      .returning();

    if (updatedDialogue.length === 0) {
      return {
        status: 'error',
        message: 'Failed to update dialogue with TTS audio id',
      };
    }
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
