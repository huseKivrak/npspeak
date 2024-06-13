'use server';

import {
  ELEVENLABS_BASE_URL,
  ELEVENLABS_API_HEADERS,
} from '../utils/elevenlabs/api';
import { normalizeLabels } from '../utils/elevenlabs/api';
import { ElevenLabsVoice } from '@/types/elevenlabs';
import { ActionStatus } from '@/types/drizzle';

//todo: save as json, revalidating periodically?
export async function getAllElevenLabsVoices(): Promise<ActionStatus> {
  try {
    const response = await fetch(`${ELEVENLABS_BASE_URL}/voices`, {
      method: 'GET',
      headers: ELEVENLABS_API_HEADERS,
    });
    const data = await response.json();
    const allVoices: ElevenLabsVoice[] = data.voices;
    allVoices.forEach((voice) => normalizeLabels(voice));

    return {
      status: 'success',
      message: 'Retrieved all voices',
      data: allVoices,
    };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: `Error: ${error}` };
  }
}

export async function getElevenLabsVoiceInfo(
  voice_id: string
): Promise<ActionStatus> {
  try {
    const response = await fetch(
      `${ELEVENLABS_BASE_URL}/voices/${voice_id}?with_settings=true`,
      {
        method: 'GET',
        headers: ELEVENLABS_API_HEADERS,
      }
    );
    const data = await response.json();
    normalizeLabels(data);
    return { status: 'success', message: 'Retrieved voice info', data };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: `Error: ${error}` };
  }
}

export async function createElevenLabsTTSAction(
  prevState: any,
  formData: FormData
): Promise<ActionStatus> {
  const voice_id = formData.get('voice_id');

  const userText = formData.get('text');
  console.log('voice_id: ', voice_id);
  console.log('text: ', userText);
  //todo: add zod validation

  const requestBody = JSON.stringify({
    model_id: 'eleven_multilingual_v2',
    text: userText,
  });

  try {
    const response = await fetch(
      `${ELEVENLABS_BASE_URL}/text-to-speech/${voice_id}`,
      {
        method: 'POST',
        headers: {
          ...ELEVENLABS_API_HEADERS,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      }
    );
    console.log('response: ', response);
    if (response.ok) {
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();

      return {
        status: 'success',
        message: 'TTS Audio created',
        data: { buffer },
      };
    }
    const message =
      response.status === 400 ? 'Error: Bad request' : 'Error: Unknown error';
    return { status: 'error', message: message };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: `Error: ${error}` };
  }
}

//Currently unused
export async function createElevenLabsVoiceAction(
  prevState: any,
  formData: FormData
): Promise<ActionStatus> {
  console.log('formData: ', formData);

  try {
    const response = await fetch(`${ELEVENLABS_BASE_URL}/voices/add`, {
      method: 'POST',
      headers: ELEVENLABS_API_HEADERS,
      body: formData,
    });

    const data = await response.json();
    console.log('voice:', data.voice_id);
    return {
      status: 'success',
      message: `Voice created`,
      data: { voice_id: data.voice_id },
    };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: `Error: ${error}` };
  }
}
