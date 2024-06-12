import { ElevenLabsVoice } from './elevenlabs';
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      audio_clips: {
        Row: {
          audio_clip_name: string;
          created_at: string;
          duration_seconds: number;
          file_url: string;
          id: number;
          is_default: boolean;
          original_file_name: string;
          user_id: string | null;
        };
        Insert: {
          audio_clip_name: string;
          created_at?: string;
          duration_seconds: number;
          file_url: string;
          id?: never;
          is_default?: boolean;
          original_file_name: string;
          user_id?: string | null;
        };
        Update: {
          audio_clip_name?: string;
          created_at?: string;
          duration_seconds?: number;
          file_url?: string;
          id?: never;
          is_default?: boolean;
          original_file_name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'audio_clips_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      campaign_npcs: {
        Row: {
          campaign_id: number;
          npc_id: number;
        };
        Insert: {
          campaign_id: number;
          npc_id: number;
        };
        Update: {
          campaign_id?: number;
          npc_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'campaign_npcs_campaign_id_fkey';
            columns: ['campaign_id'];
            isOneToOne: false;
            referencedRelation: 'campaigns';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'campaign_npcs_npc_id_fkey';
            columns: ['npc_id'];
            isOneToOne: false;
            referencedRelation: 'npcs';
            referencedColumns: ['id'];
          },
        ];
      };
      campaigns: {
        Row: {
          campaign_name: string;
          created_at: string;
          description: string | null;
          end_date: string | null;
          id: number;
          is_default: boolean;
          start_date: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          campaign_name: string;
          created_at?: never;
          description?: string | null;
          end_date?: string | null;
          id?: never;
          is_default?: boolean;
          start_date?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          campaign_name?: string;
          created_at?: never;
          description?: string | null;
          end_date?: string | null;
          id?: never;
          is_default?: boolean;
          start_date?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'campaigns_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      npc_dialogue_types: {
        Row: {
          id: number;
          is_default: boolean;
          type_name: string;
          user_id: string | null;
        };
        Insert: {
          id?: never;
          is_default?: boolean;
          type_name: string;
          user_id?: string | null;
        };
        Update: {
          id?: never;
          is_default?: boolean;
          type_name?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'npc_dialogue_types_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      npc_dialogues: {
        Row: {
          id: number;
          dialogue_type_id: number | null;
          is_default: boolean;
          npc_id: number | null;
          text: string;
          user_id: string | null;
          tts_audio_id?: number | null;
        };
        Insert: {
          id?: number;
          dialogue_type_id?: number | null;
          is_default?: boolean;
          npc_id?: number | null;
          text: string;
          user_id?: string | null;
          tts_audio_id?: number | null;
        };
        Update: {
          id?: number;
          dialogue_type_id?: number | null;
          is_default?: boolean;
          npc_id?: number | null;
          text?: string;
          user_id?: string | null;
          tts_audio_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'npc_dialogues_dialogue_type_id_fkey';
            columns: ['dialogue_type_id'];
            isOneToOne: false;
            referencedRelation: 'npc_dialogue_types';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'npc_dialogues_npc_id_fkey';
            columns: ['npc_id'];
            isOneToOne: false;
            referencedRelation: 'npcs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'npc_dialogues_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'npc_dialogues_tts_audio_id_fkey';
            columns: ['tts_audio_id'];
            isOneToOne: false;
            referencedRelation: 'tts_audio';
            referencedColumns: ['id'];
          },
        ];
      };
      npcs: {
        Row: {
          created_at: string;
          description: string | null;
          id: number;
          is_default: boolean;
          npc_name: string;
          user_id: string | null;
          voice_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: never;
          is_default?: boolean;
          npc_name: string;
          user_id: string;
          voice_id?: string | null;
        };
        Update: {
          created_at?: never;
          description?: string | null;
          id?: never;
          is_default?: never;
          npc_name?: string;
          user_id?: never;
          voice_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'npcs_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'npcs_voice_id_fkey';
            columns: ['voice_id'];
            isOneToOne: false;
            referencedRelation: 'voice_clones';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username: string;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      tts_audio: {
        Row: {
          created_at: string;
          duration_seconds: number;
          file_url: string;
          id: number;
          is_default: boolean;
          source_text: string;
          user_id: string | null;
          voice_id: string | null;
        };
        Insert: {
          created_at?: string;
          duration_seconds: number;
          file_url: string;
          id?: number;
          is_default?: boolean;
          source_text: string;
          user_id?: string | null;
          voice_id?: string | null;
        };
        Update: {
          created_at?: string;
          duration_seconds?: number;
          file_url?: string;
          id?: number;
          is_default?: boolean;
          source_text?: string;
          user_id?: string | null;
          voice_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tts_audio_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tts_audio_voice_id_fkey';
            columns: ['voice_id'];
            isOneToOne: false;
            referencedRelation: 'voice_clones';
            referencedColumns: ['id'];
          },
        ];
      };
      voice_clone_clips: {
        Row: {
          audio_clip_id: number;
          voice_clone_id: number;
        };
        Insert: {
          audio_clip_id: number;
          voice_clone_id: number;
        };
        Update: {
          audio_clip_id?: number;
          voice_clone_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'voice_clone_clips_audio_clip_id_fkey';
            columns: ['audio_clip_id'];
            isOneToOne: false;
            referencedRelation: 'audio_clips';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'voice_clone_clips_voice_clone_id_fkey';
            columns: ['voice_clone_id'];
            isOneToOne: false;
            referencedRelation: 'voice_clones';
            referencedColumns: ['id'];
          },
        ];
      };
      voice_clones: {
        Row: {
          clone_url: string | null;
          created_at: string;
          elevenlabs_voice_id: string | null;
          id: number;
          is_default: boolean;
          status: string;
          user_id: string | null;
          voice_clone_name: string | null;
        };
        Insert: {
          clone_url?: string | null;
          created_at?: string;
          elevenlabs_voice_id?: string | null;
          id?: number;
          is_default?: boolean;
          status: string;
          user_id?: string | null;
          voice_clone_name?: string | null;
        };
        Update: {
          clone_url?: string | null;
          created_at?: string;
          elevenlabs_voice_id?: string | null;
          id?: number;
          is_default?: boolean;
          status?: string;
          user_id?: string | null;
          voice_clone_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'voice_clones_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export interface BasicUserInfo {
  id: string;
  username: string;
  lastSignIn: string | null;
}

export interface UserAuth {
  user: BasicUserInfo | null;
  error: string | null;
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
