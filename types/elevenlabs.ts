export type Labels = {
  accent: string;
  description: string;
  'description '?: string;
  descriptive?: string;
  age: string;
  gender: string;
  use_case: string;
  'use case'?: string | null;
  usecase?: string | null;
  featured?: string | null;
};

export type NormalizedLabel =
  | 'accent'
  | 'description'
  | 'gender'
  | 'age'
  | 'useCase';

export type LabelOptions = Record<NormalizedLabel, string[]>;

type SharingLabels = {
  [key: string]: string;
};
export type SharingInfo = {
  status: string;
  history_item_sample_id: string | null;
  date_unix: number;
  whitelisted_emails: string[];
  public_owner_id: string;
  original_voice_id: string;
  financial_rewards_enabled: boolean;
  free_users_allowed: boolean;
  live_moderation_enabled: boolean;
  rate: number;
  notice_period: number;
  disable_at_unix: number | null;
  voice_mixing_allowed: boolean;
  featured: boolean;
  category: string;
  reader_app_enabled: boolean;
  image_url: string;
  ban_reason: string | null;
  liked_by_count: number;
  cloned_by_count: number;
  name: string;
  description: string; // Detailed summary
  labels: SharingLabels;
  review_status: string;
  review_message: string | null;
  enabled_in_library: boolean;
  instagram_username: string | null;
  twitter_username: string | null;
  youtube_username: string | null;
  tiktok_username: string | null;
};

export type FineTuning = {
  language: string;
  is_allowed_to_fine_tune: boolean;
  finetuning_state: Record<string, any> | null;
  finetuning_progress: Record<string, any> | null;
  message: Record<string, any> | null;
  dataset_duration_seconds: number | null;
  verification_attempts: string[] | null;
  verification_failures: string[];
  verification_attempts_count: number;
  slice_ids: string | null;
  manual_verification: boolean | null;
  manual_verification_requested: boolean;
};

export type ElevenLabsVoice = {
  voice_id: string;
  name: string;
  samples: File[] | null;
  category: string;
  fine_tuning: FineTuning;
  labels: Labels;
  description: string | null; // transformed to 'voice.summary'
  preview_url: string;
  safety_control: string | null;
  voice_verification: {
    requires_verification: boolean;
    is_verified: boolean;
    verification_failures: string[];
    verification_attempts_count: number;
    language: string | null;
    verification_attempts: string[] | null;
  };
  owner_id: string | null;
  permission_on_resource: string | null;
  available_for_tiers: string[] | null;
  settings: Record<string, any> | null;
  sharing: SharingInfo;
  high_quality_base_model_ids: string[];
  is_legacy: boolean;
  is_mixed: boolean;
};

export type VoiceOptionProps = {
  id: string;
  label: string; //model name
  summary?: string | null;
  sampleURL: string; //audio preview

  // voice labels:
  gender: string;
  age: string;
  accent: string;
  description: string;
  useCase: string;
};

export type SharedElevenLabsVoiceQueryProps = {
  page_size?: number; // default: 30, max: 100
  category?: string;
  gender?: string;
  age?: string;
  accent?: string;
  language?: string;
  search?: string;
  use_cases?: string[];
  descriptives?: string[];
  featured?: boolean; // default: false
  reader_app_enabled?: boolean; // default: false
  owner_id?: string;
  sort?: string;
  page?: number; // default: 0
};
