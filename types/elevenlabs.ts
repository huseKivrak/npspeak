export type ElevenLabsVoice = {
  voice_id: string;
  name: string;
  samples: File[] | null;
  category: string;
  fine_tuning: {
    language: any;
    is_allowed_to_fine_tune: boolean;
    finetuning_state: string;
    finetuning_progress: any | null;
    message: string | null;
    dataset_duration_seconds: number | null;
    verification_attempts: any[] | null;
    verification_failures: any[];
    verification_attempts_count: number;
    slice_ids: any;
    manual_verification: any;
    manual_verification_requested: boolean;
  };
  labels: {
    accent: string;
    description: string;
    'description '?: string;
    age: string;
    gender: string;
    use_case: string;
    'use case'?: string | null;
    usecase?: string | null;
    featured?: string | null;
  };

  description: string | null;
  preview_url: string;
  safety_control: string | null;
  voice_verification: {
    requires_verification: boolean;
    is_verified: boolean;
    verification_failures: [];
    verification_attempts_count: number;
    language: string | null;
    verification_attempts: [] | null;
  };
  owner_id: string | null;
  permission_on_resource: string | null;
  available_for_tiers: any;
  settings: any;
  sharing: any;
  high_quality_base_model_ids: string[];
};

export type NormalizedLabel =
  | 'accent'
  | 'description'
  | 'gender'
  | 'age'
  | 'useCase';

export type LabelOptions = Record<NormalizedLabel, string[]>;

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

export type SharedElevenLabsVoice = {
  public_owner_id: string;
  voice_id: string;
  date_unix: number;
  name: string;
  accent: string;
  gender: string;
  age: string;
  descriptive: string;
  use_case: string;
  category: string;
  language: string;
  description: string;
  preview_url: string;
  usage_character_count_1y: number;
  usage_character_count_7d: number;
  play_api_usage_character_count_1y: number;
  cloned_by_count: number;
  rate: number;
  free_users_allowed: boolean;
  live_moderation_enabled: boolean;
  featured: boolean;
  notice_period: number;
  instagram_username: string;
  twitter_username: string;
  youtube_username: string;
  tiktok_username: string;
  image_url: string;
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
