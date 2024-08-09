import {
  DetailedDialogue,
  FormOptions,
  SoundboardDialogue,
} from '@/types/drizzle';
import { Tables } from '@/types/supabase';

export const createTTSFormOptions = (dialogues: Tables<'npc_dialogues'>[]) => {
  return dialogues.reduce<FormOptions>((acc, dialogue) => {
    if (!dialogue.tts_audio_id) {
      acc.push({ label: dialogue.text, value: dialogue.id });
    }
    return acc;
  }, []);
};

export const formatDialoguesForSoundboard = (
  dialogues: DetailedDialogue[]
): SoundboardDialogue[] => {
  const formattedDialogues = dialogues.map((dialogue) => ({
    id: dialogue.id,
    type: dialogue.dialogueType ?? 'other',
    text: dialogue.text,
    audio: dialogue.audioURL ?? '',
    npc_id: dialogue.npc_id!,
  }));

  return formattedDialogues;
};

export const formatTimer = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPrice = (price: Tables<'prices'>) => {
  const formattedPrice = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: price.currency!,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return formattedPrice;
};
