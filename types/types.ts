import { VoiceOptionProps } from './elevenlabs';
import { Tables } from './supabase';
import { SVGProps } from 'react';

export type DetailedNPC = Tables<'npcs'> & {
  campaigns: Tables<'campaigns'>[];
  dialogues: Tables<'npc_dialogues'>[];
  voice: VoiceOptionProps;
};

export type CampaignWithDetailedNPCs = Tables<'campaigns'> & {
  npcs?: Array<DetailedNPC>;
};

export type UpdateNPC = {
  npc_id: number;
  npc_name: string;
  description: string | undefined; //todo: ts fix
  campaign_ids: number[];
  voice_id: string;
};

//todo: fix for better typing, non-zod error handling, etc.
export type ActionStatus<T = any> =
  | {
      status: 'success';
      message?: string;
      data: T;
    }
  | {
      status: 'error';
      message: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
    }
  | {
      status: 'idle';
      message: '';
    };

export type FormOptions = {
  value: number;
  label: string;
}[];

//todo
export type DetailedDialogue = {
  id: number;
  npc_id: number | null;
  user_id: string | null;
  text: string;
  dialogueType: string | null;
  audioFileKey?: string | null;
  audioURL?: string | null;
  audioDuration?: number | null;
};

export type ServerAction = (
  prevState: ActionStatus | null,
  formData: FormData
) => Promise<ActionStatus>;

export type SoundboardDialogue = {
  id: number;
  type: string;
  text: string;
  audio: string;
  npc_id: number;
};

export type PromoCodeValidation =
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'success';
      message: string;
      promoCode: Tables<'promo_codes'>;
    };

export type DialogueRow = {
  id: number;
  type: string;
  text: string;
  audio: string | null | undefined;
  npc_id: number | null;
  voice_id: string;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
