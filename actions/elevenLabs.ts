'use server';

import {
  ELEVENLABS_BASE_URL,
  ELEVENLABS_API_HEADERS,
  transformAndNormalizeAllVoices,
  createSharedVoiceQuery,
} from '../utils/elevenlabs/api';

import {
  ElevenLabsVoice,
  SharedElevenLabsVoice,
  SharedElevenLabsVoiceQueryProps,
  VoiceOptionProps,
} from '@/types/elevenlabs';
import { ActionStatus } from '@/types/drizzle';

//todo: save as json, revalidating periodically?
export async function getAllElevenLabsVoices(): Promise<ActionStatus> {
  try {
    const response = await fetch(
      `${ELEVENLABS_BASE_URL}/voices?show_legacy=true`,
      {
        method: 'GET',
        headers: ELEVENLABS_API_HEADERS,
      }
    );
    const data = await response.json();
    const allVoices: ElevenLabsVoice[] = data.voices;
    const normalizedVoices = transformAndNormalizeAllVoices(allVoices);

    return {
      status: 'success',
      message: 'Retrieved all voices',
      data: normalizedVoices,
    };
  } catch (error) {
    console.error(error);
    return { status: 'error', message: `Error: ${error}` };
  }
}

//todo: format to align with premades
export async function getAllSharedElevenLabsVoices(
  queryProps: SharedElevenLabsVoiceQueryProps = {
    page_size: 100,
  }
): Promise<ActionStatus> {
  try {
    const response = await fetch(
      `${ELEVENLABS_BASE_URL}/shared-voices?${createSharedVoiceQuery(queryProps)}`,
      {
        method: 'GET',
        headers: ELEVENLABS_API_HEADERS,
      }
    );
    const data = await response.json();
    const allVoices: SharedElevenLabsVoice[] = data.voices;
    const normalizedVoices: VoiceOptionProps[] = allVoices.map((voice) => {
      return {
        label: voice.name,
        value: voice.voice_id,
        gender: voice.gender,
        age: voice.age,
        accent: voice.accent,
        description: voice.descriptive,
        use_case: voice.use_case,
        sampleURL: voice.preview_url,
        useCase: voice.use_case,
      };
    });
    return {
      status: 'success',
      message: 'Retrieved all shared voices',
      data: normalizedVoices,
    };
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
