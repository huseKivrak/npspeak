import { fetchAndTransformVoices } from '@/utils/elevenlabs/server';
import { db } from '@/database/drizzle';
import { voices } from '@/database/drizzle/schema';
import { eq, inArray } from 'drizzle-orm';

/**
 * Syncs database voice records with the latest voices from ElevenLabs.
 *
 * ElevenLabs Voices are configured through the ElevenLabs dashboard and reflect
 * the current state of voices available to the user.
 *
 *
 */
export async function syncVoices(retries = 3) {
  try {
    // Fetch voices from ElevenLabs
    const fetchedVoices = await fetchAndTransformVoices();
    const fetchedVoiceIds = new Set(fetchedVoices.map((voice) => voice.id));

    // Transaction to ensure atomicity
    await db.transaction(async (tx) => {
      const databaseVoices = await tx.select().from(voices);
      const databaseVoiceIds = new Set(databaseVoices.map((voice) => voice.id));

      // Voices to insert: in fetched but not in database
      const voicesToInsert = fetchedVoices.filter(
        (voice) => !databaseVoiceIds.has(voice.id)
      );

      if (voicesToInsert.length > 0) {
        await tx.insert(voices).values(voicesToInsert);
        console.log(`Inserted ${voicesToInsert.length} voices`);
      } else {
        console.log('No voices to insert');
      }

      // Voices to update: in both fetched and database
      const voicesToUpdate = fetchedVoices.filter((voice) =>
        databaseVoiceIds.has(voice.id)
      );

      if (voicesToUpdate.length > 0) {
        for (const voice of voicesToUpdate) {
          await tx.update(voices).set(voice).where(eq(voices.id, voice.id));
        }
        console.log(`Updated ${voicesToUpdate.length} voices`);
      } else {
        console.log('No voices to update');
      }

      // Voices to delete: in database but not in fetched
      const voicesToDeleteIds = databaseVoices
        .filter((voice) => !fetchedVoiceIds.has(voice.id))
        .map((voice) => voice.id);

      if (voicesToDeleteIds.length > 0) {
        const deletedVoices = await tx
          .delete(voices)
          .where(inArray(voices.id, voicesToDeleteIds))
          .returning({ id: voices.id });
        console.log(`Deleted ${deletedVoices.length} voices`);
      } else {
        console.log('No voices to delete');
      }
    });

    return {
      status: 'success',
      message: 'Voices synced successfully',
    };
  } catch (error) {
    console.error(`Error syncing voices: ${error}`);
    if (retries > 0) {
      return syncVoices(retries - 1);
    } else {
      return {
        status: 'error',
        message: `Error syncing voices: ${error}`,
      };
    }
  }
}
