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
    age: string;
    gender: string;
    'use case': string;
  };
  description: string | null;
  preview_url: string;
  available_for_tiers: any;
  settings: any;
  sharing: any;
  high_quality_base_model_ids: string[];
};

export type Label = 'accent' | 'description' | 'gender' | 'age' | 'use case';
