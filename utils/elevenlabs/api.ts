//docs - https://elevenlabs.io/docs/api-reference/

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY ? process.env.ELEVENLABS_API_KEY : '';

export const BASE_URL = 'https://api.elevenlabs.io/v1';

export const ELEVENLABS_API_HEADERS = {
  'xi-api-key': ELEVENLABS_API_KEY,
};

export const audioFormats = {
  lowQuality22kHz: 'mp3_22050_32',
  standardQuality44kHzLowBitrate: 'mp3_44100_32',
  mediumQuality44kHz: 'mp3_44100_64',
  highQuality44kHzMediumBitrate: 'mp3_44100_96',
  veryHighQuality44kHz: 'mp3_44100_128', // Default
  professionalQuality44kHz: 'mp3_44100_192',
  rawAudio16kHz: 'pcm_16000',
  rawAudio22kHz: 'pcm_22050',
  rawAudio24kHz: 'pcm_24000',
  cdQualityRawAudio: 'pcm_44100',
  telephonyQuality: 'ulaw_8000',
};
