import { CampaignWithNPCs, DetailedNPC } from '@/types/drizzle';
import { Tables } from '@/types/supabase';
import { AccentEmojiMap } from '@/lib/constants';
import { ElevenLabsVoice } from '@/types/elevenlabs';

export const transformCampaignOptions = (campaigns: CampaignWithNPCs[]) => {
  return campaigns.map((campaign) => ({
    value: campaign.id,
    label: campaign.campaign_name,
  }));
};

export const transformNPCOptions = (npcs: DetailedNPC[]) => {
  return npcs.map((npc) => ({
    value: npc.id,
    label: npc.npc_name,
  }));
};

export const transformDialogueTypeOptions = (
  dialogueTypes: Tables<'npc_dialogue_types'>[]
) => {
  return dialogueTypes.map((option) => ({
    value: option.id,
    label: option.type_name,
  }));
};

export const getAccentEmoji = (accent: string) =>
  AccentEmojiMap[accent] || accent;

export const truncateText = (text: string, length: number) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export type VoiceOptionProps = {
  label: string;
  value: string;
  gender: string;
  age: string;
  accent: string;
  description: string;
  useCase: string;
  sampleURL: string;
};

export const transformVoiceOptions = (
  voiceOptions: ElevenLabsVoice[]
): VoiceOptionProps[] => {
  return voiceOptions
    .map((voice) => ({
      label: voice.name,
      value: voice.voice_id,
      gender: voice.labels.gender,
      age: voice.labels.age,
      accent: voice.labels.accent,
      description: voice.labels.description,
      useCase: voice.labels.use_case,
      sampleURL: voice.preview_url,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};
