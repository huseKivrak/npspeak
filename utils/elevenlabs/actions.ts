'use server';
export async function CreateVoiceClone(formData: FormData) {
  try {
    const BASE_URL = 'https://api.elevenlabs.io/v1';
    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY ? process.env.ELEVENLABS_API_KEY : '';

    const response = await fetch(`${BASE_URL}/voices/add`, {
      method: 'POST',
      headers: {
        'Xi-Api-Key': ELEVENLABS_API_KEY,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
