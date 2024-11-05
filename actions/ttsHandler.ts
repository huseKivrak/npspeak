'use server';
import { getUserProfile } from './auth';
import { updateDialogueTTSAudioAction } from './db/dialogue';
import { uploadAudioToS3 } from './s3';
import { ttsHandlerSchema } from '@/database/drizzle/validation';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { npc_dialogues } from '@/database/drizzle/schema';
import { ActionStatus } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAudioStreamFromText } from '@/utils/elevenlabs/server';
import { ZodError } from 'zod';

export default async function ttsHandler(
  prevState: any,
  formData: FormData
): Promise<ActionStatus> {
  const { user } = await getUserProfile();
  if (!user) {
    return {
      status: 'error',
      message: 'You must be logged in to create TTS audio.',
    };
  }

  try {
    const { text, voice_id, npc_id, dialogue_id } =
      ttsHandlerSchema.parse(formData);

    //create audio stream from text
    const buffer = await createAudioStreamFromText(voice_id, text);

    //upload to s3
    const s3Response = await uploadAudioToS3(buffer);
    if (s3Response.status !== 'success') {
      return s3Response;
    }
    const { fileName, duration } = s3Response.data;

    const ttsAudioData = new FormData();
    ttsAudioData.append('source_text', text);
    ttsAudioData.append('voice_id', voice_id);
    ttsAudioData.append('npc_id', npc_id.toString());
    ttsAudioData.append('file_url', fileName);
    ttsAudioData.append('duration_seconds', duration);
    ttsAudioData.append('dialogue_id', dialogue_id.toString());

    //insert TTS audio into database
    const audioAction = await updateDialogueTTSAudioAction(
      prevState,
      ttsAudioData
    );
    if (audioAction.status !== 'success') {
      return audioAction;
    }

    revalidatePath('/');
    redirect(`/npcs/${npc_id}`);
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
    console.error('TTS HANDLER ERROR:', error);
    return {
      status: 'error',
      message: 'An error occurred while processing TTS audio.',
    };
  }
}
