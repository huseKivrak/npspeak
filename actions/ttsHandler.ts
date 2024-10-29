'use server';
import { getUserProfile } from './auth';
import { createElevenLabsTTSAction } from './elevenLabs';
import { updateDialogueTTSAudioAction } from './db/dialogue';
import { uploadAudioToS3 } from './s3';
import { ttsHandlerSchema } from '@/database/drizzle/validation';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { npc_dialogues } from '@/database/drizzle/schema';
import { ActionStatus } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

  const { text, voice_id, npc_id, dialogue_id } =
    ttsHandlerSchema.parse(formData);

  //make request to ElevenLabs API
  const ttsResponse = await createElevenLabsTTSAction(prevState, formData);
  console.log('ELEVEN LABS RESPONSE:', ttsResponse);
  if (ttsResponse.status !== 'success') {
    return ttsResponse;
  }

  const buffer = ttsResponse.data.buffer;

  //upload to s3
  const s3Response = await uploadAudioToS3(buffer);
  console.log('S3 RESPONSE:', s3Response);
  if (s3Response.status !== 'success') {
    return s3Response;
  }
  const s3Key = s3Response.data.key;
  const duration = s3Response.data.duration;

  const ttsAudioData = new FormData();
  ttsAudioData.append('source_text', text);
  ttsAudioData.append('voice_id', voice_id);
  ttsAudioData.append('npc_id', npc_id.toString());
  ttsAudioData.append('file_url', s3Key);
  ttsAudioData.append('duration_seconds', duration);

  //insert TTS audio into database
  const audioAction = await updateDialogueTTSAudioAction(
    prevState,
    ttsAudioData
  );
  console.log('AUDIO ACTION:', audioAction);
  if (audioAction.status !== 'success') {
    return audioAction;
  }
  const ttsAudioId = parseInt(audioAction.data);

  //update dialogue with tts_audio_id
  const updateDialogue = await db
    .update(npc_dialogues)
    .set({ tts_audio_id: ttsAudioId })
    .where(eq(npc_dialogues.id, dialogue_id))
    .returning({ updatedId: npc_dialogues.id });
  console.log('UPDATE DIALOGUE:', updateDialogue);

  if (updateDialogue.length === 0) {
    return {
      status: 'error',
      message: 'Failed to update dialogue with TTS audio id',
    };
  }
  revalidatePath('/');
  redirect(`/npcs/${npc_id}`);
}
