import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://api.elevenlabs.io/v1';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY ? process.env.ELEVENLABS_API_KEY : '';

export const GET = async (request: NextRequest) => {
  const res = await fetch(`${BASE_URL}/voices`, {
    headers: {
      'Xi-Api-Key': ELEVENLABS_API_KEY,
    },
  });
  const voices = await res.json();
  console.log('voices from API route:', voices);
  return NextResponse.json(voices);
};
