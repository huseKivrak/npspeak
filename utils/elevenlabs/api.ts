//docs - https://elevenlabs.io/docs/api-reference/

import { ElevenLabsVoice, Label, LabelOptions } from '@/types/elevenlabs';
import { VoiceOptionProps } from '../helpers/formHelpers';

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
 * Normalizes any 'use case' and 'usecase' labels to 'use_case',
 * and trims 'description ' label found in some voices.
 * ! Modifies the voice object in place; Called after fetching all voices.
 */
export function normalizeLabels(voice: ElevenLabsVoice): void {
  if (voice.labels['use case']) {
    voice.labels.use_case = voice.labels['use case'];
    delete voice.labels['use case'];
  } else if (voice.labels['usecase']) {
    voice.labels.use_case = voice.labels['usecase'];
    delete voice.labels['usecase'];
  }
  if (voice.labels['description ']) {
    voice.labels.description = voice.labels['description '];
    delete voice.labels['description '];
  }
}
export const ELEVENLABS_DEFAULT_VOICE_LABELS = [
  'accent',
  'description',
  'gender',
  'age',
  'useCase',
];

export const getAllVoiceLabelOptions = (
  voices: VoiceOptionProps[]
): LabelOptions => {
  // Initialize the label options
  const uniqueLabelOptions: Record<
    Label,
    Set<string>
  > = ELEVENLABS_DEFAULT_VOICE_LABELS.reduce(
    (acc, label) => {
      acc[label as Label] = new Set();
      return acc;
    },
    {} as Record<Label, Set<string>>
  );

  // Add all unique option values for each label
  voices.forEach((voice) => {
    ELEVENLABS_DEFAULT_VOICE_LABELS.forEach((label) => {
      const value = voice[label as Label];
      if (value) uniqueLabelOptions[label as Label].add(value);
    });
  });

  // Convert the label options to an array
  const allLabelOptions = {} as LabelOptions;
  ELEVENLABS_DEFAULT_VOICE_LABELS.forEach((label) => {
    allLabelOptions[label as Label] = Array.from(
      uniqueLabelOptions[label as Label]
    );
  });

  return allLabelOptions;
};

export const filterByLabelValues = (
  voices: VoiceOptionProps[],
  filters: Record<Label, string>
): VoiceOptionProps[] => {
  return voices.filter((voiceOption: VoiceOptionProps) => {
    return Object.entries(filters).every(([label, value]) => {
      return value === '' || voiceOption[label as Label] === value;
    });
  });
};

export const getSingleLabelValues = (
  voices: VoiceOptionProps[],
  labelName: Label
): string[] => {
  const labelSet = new Set<string>();

  voices.forEach((voice) => {
    const labelValue = voice[labelName];
    labelSet.add(labelValue);
  });
  return Array.from(labelSet);
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
