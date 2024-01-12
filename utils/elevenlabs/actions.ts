'use server';
import { createClient } from '../supabase/server';
import { cookies } from 'next/headers';
export async function CreateVoiceClone(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //todo: add audio file to db

  console.log('formData: ', formData);
  const BASE_URL = 'https://api.elevenlabs.io/v1';
  const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY ? process.env.ELEVENLABS_API_KEY : '';

  try {
    const response = await fetch(`${BASE_URL}/voices/add`, {
      method: 'POST',
      headers: {
        //? fetch API handles Content-Type (boundary error otherwise)
        'Xi-Api-Key': ELEVENLABS_API_KEY,
      },
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
