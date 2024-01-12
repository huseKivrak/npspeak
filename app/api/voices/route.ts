import { NextRequest } from 'next/server';

const BASE_URL = 'https://api.elevenlabs.io/v1';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY ? process.env.ELEVENLABS_API_KEY : '';

const options: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    'Xi-Api-Key': ELEVENLABS_API_KEY,
  },
};

export const GET = async (request: NextRequest) => {
  const res = await fetch(`${BASE_URL}/voices`, options);
  return res.json();
};


