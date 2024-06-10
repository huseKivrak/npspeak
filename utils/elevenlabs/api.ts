//docs - https://elevenlabs.io/docs/api-reference/

import { ElevenLabsVoice, Label } from '@/types/elevenlabs';

export const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';
export const ELEVENLABS_API_HEADERS = {
  'xi-api-key': process.env.ELEVENLABS_API_KEY!,
};

export const audioFormats = {
  mp3_32kbps_22kHz: 'mp3_22050_32',
  mp3_32kbps_44kHz: 'mp3_44100_32',
  mp3_64kbps_44kHz: 'mp3_44100_64',
  mp3_96kbps_44kHz: 'mp3_44100_96',
  mp3_128kbps_44kHz: 'mp3_44100_128', // default
  // mp3_192kbps_44kHz: 'mp3_44100_192', //creator plan
  pcm_16kHz: 'pcm_16000',
  pcm_22kHz: 'pcm_22050',
  pcm_24kHz: 'pcm_24000',
  // pcm_cdQuality_44kHz: 'pcm_44100', //independent plan
  ulaw_telephony_8kHz: 'ulaw_8000',
};

/**
 * Normalizes any 'use case' labels to 'use_case'.
 * ! Modifies the voice object in place.
 */
export function normalizeLabels(voice: ElevenLabsVoice): void {
  if (voice.labels['use case']) {
    voice.labels.use_case = voice.labels['use case'];
    delete voice.labels['use case'];
  } else if (voice.labels['description ']) {
    voice.labels.description = voice.labels['description '];
    delete voice.labels['description '];
  }
}

export const ELEVENLABS_PREMADE_LABELS = [
  'accent',
  'description',
  'gender',
  'age',
  'use_case',
];

//finds non-default labels
export function findLabels(voices?: ElevenLabsVoice[]): string[] {
  if (!Array.isArray(voices)) return ELEVENLABS_PREMADE_LABELS;

  const uniqueLabels = voices.reduce<Set<string>>((acc, curr) => {
    Object.keys(curr.labels).forEach((label) => acc.add(label));
    return acc;
  }, new Set<string>());

  return [...uniqueLabels];
}

export const filterByLabelValue = (
  voices: ElevenLabsVoice[],
  label: Label,
  lableValue: string
): ElevenLabsVoice[] =>
  voices.filter((voice) => voice.labels[label] === lableValue);

export const getLabelOptions = ({
  voices,
  label,
}: {
  voices: ElevenLabsVoice[];
  label: Label;
}) => {
  const labelOptions: Record<string, string[]> = {
    accent: [],
    description: [],
    gender: [],
    age: [],
    use_case: [],
  };

  for (const voice of voices) {
    labelOptions.accent.push(voice.labels.accent);
    labelOptions.description.push(voice.labels.description);
    labelOptions.gender.push(voice.labels.gender);
    labelOptions.age.push(voice.labels.age);

    // @ts-ignore
    const useCase = voice.labels.use_case || voice.labels['use case'];
    if (useCase) labelOptions.use_case.push(useCase);
  }
  return labelOptions;
};
