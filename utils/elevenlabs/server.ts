'use server';

import { VoiceOptionProps } from '@/types/elevenlabs';
import { ElevenLabsError } from 'elevenlabs';
import elevenLabs from '.';
import { transformAndNormalizeAllVoices } from './api';

/**
 * Fetches voices from ElevenLabs
 * @returns an array of voice options
 */
export async function fetchAndTransformVoices(): Promise<VoiceOptionProps[]> {
  try {
    const { voices } = await elevenLabs.voices.getAll();
    const transformedVoices = transformAndNormalizeAllVoices(voices);
    return transformedVoices;
  } catch (error) {
    if (error === typeof ElevenLabsError) {
      console.error(`fetchVoices Error: ElevenLabs: ${error}`);
      return [];
    } else {
      console.error(`fetchVoices Error: ${error}`);
      return [];
    }
  }
}

/**
 * Creates an audio stream from text using ElevenLabs TTS
 * @param voiceId
 * @param text
 * @returns
 */
export async function createAudioStreamFromText(
  voiceId: string,
  text: string,
  model_id = 'eleven_multilingual_v2'
): Promise<Buffer> {
  try {
    const audioStream = await elevenLabs.generate({
      voice: voiceId,
      text,
      model_id,
    });

    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const content = Buffer.concat(chunks);
    return content;
  } catch (error) {
    console.error(`createTTS Error: ${error}`);
    throw error;
  }
}
