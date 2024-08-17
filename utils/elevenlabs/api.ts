//docs - https://elevenlabs.io/docs/api-reference/

import {
  ElevenLabsVoice,
  LabelOptions,
  NormalizedLabel,
  SharedElevenLabsVoiceQueryProps,
} from '@/types/elevenlabs';
import { VoiceOptionProps } from '@/types/elevenlabs';

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
 * Transforms and normalizes the labels for the voice options.
 * @param voice - The voice object to transform and normalize.
 * @returns The transformed and normalized voice object.
 */
export function transformAndNormalizeLabels(
  voice: ElevenLabsVoice
): VoiceOptionProps {
  const labelMap: Record<string, NormalizedLabel> = {
    'use case': 'useCase',
    usecase: 'useCase',
    use_case: 'useCase',
    accent: 'accent',
    description: 'description',
    age: 'age',
    gender: 'gender',
  };

  const normalizedLabels: Partial<Record<NormalizedLabel, string>> = {
    accent: '',
    description: '',
    age: '',
    gender: '',
    useCase: '',
  };

  //Normalize and trim labels/values
  Object.entries(voice.labels).forEach(([label, value]) => {
    const trimmedLabel = label.trim();
    const normalizedLabel = labelMap[trimmedLabel] || trimmedLabel;

    let trimmedValue = value ? value.toLowerCase().trim() : '';
    if (normalizedLabel === 'age' && trimmedValue === 'middle aged') {
      trimmedValue = 'middle-aged';
    }
    normalizedLabels[normalizedLabel] = trimmedValue;
  });

  //Transform voice object into a format more usable in ReactSelect components
  const transformedVoice: VoiceOptionProps = {
    label: voice.name,
    value: voice.voice_id,
    gender: normalizedLabels.gender || '',
    age: normalizedLabels.age || '',
    accent: normalizedLabels.accent || '',
    description: normalizedLabels.description || '',
    useCase: normalizedLabels.useCase || '',
    sampleURL: voice.preview_url,
  };
  return transformedVoice;
}

export const transformAndNormalizeAllVoices = (
  voices: ElevenLabsVoice[]
): VoiceOptionProps[] => {
  return voices
    .map(transformAndNormalizeLabels)
    .sort((a, b) => a.label.localeCompare(b.label));
};

const filterLabels = ['accent', 'description', 'gender', 'age', 'useCase'];
export const getAllVoiceLabelOptions = (
  voices: VoiceOptionProps[]
): LabelOptions => {
  const filterOptions: Record<
    NormalizedLabel,
    Set<string>
  > = filterLabels.reduce(
    (acc, label) => {
      acc[label as NormalizedLabel] = new Set();
      return acc;
    },
    {} as Record<NormalizedLabel, Set<string>>
  );

  // Add all unique option values for each label
  voices.forEach((voice) => {
    filterLabels.forEach((label) => {
      const value = voice[label as NormalizedLabel];
      if (value) filterOptions[label as NormalizedLabel].add(value);
    });
  });

  // Convert the label options to an array
  const allLabelOptions = {} as LabelOptions;
  filterLabels.forEach((label) => {
    allLabelOptions[label as NormalizedLabel] = Array.from(
      filterOptions[label as NormalizedLabel]
    );
  });

  return allLabelOptions;
};

export const filterByLabelValues = (
  voices: VoiceOptionProps[],
  filters: Record<NormalizedLabel, string>
): VoiceOptionProps[] => {
  return voices.filter((voiceOption: VoiceOptionProps) => {
    return Object.entries(filters).every(([label, value]) => {
      return value === '' || voiceOption[label as NormalizedLabel] === value;
    });
  });
};

//(Unused) Utility for finding non-default labels, in case new options are added
// export function getAllVoiceLabels(voices?: ElevenLabsVoice[]): string[] {
//   if (!voices) return ELEVENLABS_PREMADE_LABELS;

//   const uniqueLabels = voices.reduce<Set<string>>((acc, curr) => {
//     Object.keys(curr.labels).forEach((label) => acc.add(label));
//     return acc;
//   }, new Set<string>());

//   return [...uniqueLabels];
// }

export const createSharedVoiceQuery = (
  query: SharedElevenLabsVoiceQueryProps
): string => {
  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  return queryString;
};
