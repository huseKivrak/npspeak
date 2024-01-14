'use server';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';

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
  const voice_id = formData.get('voice_id');

  const userText = formData.get('text');
  console.log('voice_id: ', voice_id);
  console.log('text: ', userText);

  const requestBody = JSON.stringify({
    model_id: 'eleven_multilingual_v2',
    text: userText,
  });

  try {
    const response = await fetch(`${BASE_URL}/text-to-speech/${voice_id}`, {
      method: 'POST',
      headers: {
        ...ELEVENLABS_API_HEADERS,
        'Content-Type': 'application/json',
      },
      body: requestBody,
    });
    console.log('response: ', response);
    if (response.ok) {
      const blob = await response.blob();
      console.log('blob: ', blob);
      const buffer = await blob.arrayBuffer();
      console.log('buffer: ', buffer);
      const fileName = `${uuidv4()}.mp3`;
      const filePath = `public/${fileName}`;
      console.log('filePath: ', filePath);
      fs.writeFileSync(filePath, Buffer.from(buffer));
      console.log('File written successfully');
      return { message: 'Audio clip created successfully', audioUrl: `${fileName}` };
    }
  } catch (error) {
    console.error(error);
    return { message: `Error: ${error}` };
  }
}
