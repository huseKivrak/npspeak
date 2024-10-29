import fs from 'fs/promises';
import { VoiceOptionProps } from '@/types/elevenlabs';

/**
 * Loads the voice model data stored in a JSON file.
 *
 * The voice data is relatively static and only updated manually (e.g., updating voice model names, tags, etc.).
 * This approach avoids unnecessary database lookups or the need for additional webhooks to track changes,
 * but should be replaced with a more dynamic solution.
 *
 * @returns The voice data as an array of VoiceOptionProps
 */
async function loadVoiceData(): Promise<VoiceOptionProps[]> {
  const file = await fs.readFile(
    process.cwd() + '/config/server/voiceData.json',
    'utf-8'
  );
  return JSON.parse(file) as VoiceOptionProps[];
}

/**
 * Finds a voice by its ID from the voice data file.
 *
 * @param voiceId - The ID of the voice to find
 * @returns The matching voice as VoiceOptionProps
 */
export async function findVoicesByIds(
  voiceIds: string[]
): Promise<Record<string, VoiceOptionProps>> {
  const voiceData = await loadVoiceData();
  const voiceMap: Record<string, VoiceOptionProps> = {};
  voiceIds.forEach((id) => {
    const voice = voiceData.find((voice) => voice.value === id);
    if (voice) {
      voiceMap[id] = voice;
    }
  });
  return voiceMap;
}
