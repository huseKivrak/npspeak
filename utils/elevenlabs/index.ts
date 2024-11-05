import { ElevenLabsClient } from 'elevenlabs';

const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) {
  throw new Error('ELEVENLABS_API_KEY is not set');
}

const elevenLabs = new ElevenLabsClient({
  apiKey,
});

export default elevenLabs;
