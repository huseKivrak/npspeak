'use server';
import { createClient } from '../supabase/server';
import { cookies } from 'next/headers';

import { BASE_URL, ELEVENLABS_API_HEADERS } from './api';
export async function CreateVoiceClone(prevState: any, formData: FormData) {
  //todo: add audio file to db
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log('formData: ', formData);

  try {
    const response = await fetch(`${BASE_URL}/voices/add`, {
      method: 'POST',
      headers: ELEVENLABS_API_HEADERS,
      body: formData,
    });

    const data = await response.json();
    console.log('voice:', data.voice_id);

    //todo: add voiceId to db

    return { message: 'Voice clone created successfully' };
  } catch (error) {
    return { message: `Error: ${error}` };
  }
}

export async function CreateAudioClip(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const voice_id = formData.get('voice_id');
  formData.set('model_id', 'eleven_multilingual_v2');

  try {
    const response = await fetch(`${BASE_URL}/text-to-speech/${voice_id}`, {
      method: 'POST',
      headers: ELEVENLABS_API_HEADERS,
      body: formData,
    });

    const data = await response.json();
    console.log('clip:', data.clip_id);
  } catch (error) {
    return { message: `Error: ${error}` };
  }
}
