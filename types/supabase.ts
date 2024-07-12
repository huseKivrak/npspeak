export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
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
          user_id: string;
        };
        Insert: {
          audio_clip_name: string;
          created_at?: string;
          duration_seconds: number;
          file_url: string;
          id?: number;
          is_default?: boolean;
          original_file_name: string;
          user_id?: string;
        };
        Update: {
          audio_clip_name?: string;
          created_at?: string;
          duration_seconds?: number;
          file_url?: string;
          id?: number;
          is_default?: boolean;
          original_file_name?: string;
          user_id?: string;
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
            foreignKeyName: 'public_campaign_npcs_campaign_id_fkey';
            columns: ['campaign_id'];
            isOneToOne: false;
            referencedRelation: 'campaigns';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_campaign_npcs_npc_id_fkey';
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
          user_id: string;
        };
        Insert: {
          campaign_name: string;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          id?: number;
          is_default?: boolean;
          start_date?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          campaign_name?: string;
          created_at?: string;
          description?: string | null;
          end_date?: string | null;
          id?: number;
          is_default?: boolean;
          start_date?: string | null;
          updated_at?: string | null;
          user_id?: string;
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
      customers: {
        Row: {
          id: string;
          stripe_customer_id: string | null;
        };
        Insert: {
          id: string;
          stripe_customer_id?: string | null;
        };
        Update: {
          id?: string;
          stripe_customer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'customers_id_fkey';
            columns: ['id'];
            isOneToOne: true;
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
          id?: number;
          is_default?: boolean;
          type_name: string;
          user_id?: string | null;
        };
        Update: {
          id?: number;
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
          dialogue_type_id: number | null;
          id: number;
          is_default: boolean;
          npc_id: number | null;
          text: string;
          tts_audio_id: number | null;
          user_id: string | null;
        };
        Insert: {
          dialogue_type_id?: number | null;
          id?: number;
          is_default?: boolean;
          npc_id?: number | null;
          text: string;
          tts_audio_id?: number | null;
          user_id?: string | null;
        };
        Update: {
          dialogue_type_id?: number | null;
          id?: number;
          is_default?: boolean;
          npc_id?: number | null;
          text?: string;
          tts_audio_id?: number | null;
          user_id?: string | null;
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
            foreignKeyName: 'npc_dialogues_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_npc_dialogues_npc_id_fkey';
            columns: ['npc_id'];
            isOneToOne: false;
            referencedRelation: 'npcs';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_npc_dialogues_tts_audio_id_fkey';
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
          user_id: string;
          voice_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_default?: boolean;
          npc_name: string;
          user_id?: string;
          voice_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: number;
          is_default?: boolean;
          npc_name?: string;
          user_id?: string;
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
        ];
      };
      prices: {
        Row: {
          active: boolean | null;
          currency: string | null;
          description?: string | null;
          id: string;
          interval: Database['public']['Enums']['pricing_plan_interval'] | null;
          interval_count: number | null;
          metadata?: Json | null;
          product_id: string | null;
          trial_period_days: number | null;
          type: Database['public']['Enums']['pricing_type'] | null;
          unit_amount: number | null;
        };
        Insert: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Update: {
          active?: boolean | null;
          currency?: string | null;
          description?: string | null;
          id?: string;
          interval?:
            | Database['public']['Enums']['pricing_plan_interval']
            | null;
          interval_count?: number | null;
          metadata?: Json | null;
          product_id?: string | null;
          trial_period_days?: number | null;
          type?: Database['public']['Enums']['pricing_type'] | null;
          unit_amount?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'prices_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      products: {
        Row: {
          active: boolean | null;
          description: string | null;
          id: string;
          image: string | null;
          metadata: Json | null;
          name: string | null;
        };
        Insert: {
          active?: boolean | null;
          description?: string | null;
          id: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Update: {
          active?: boolean | null;
          description?: string | null;
          id?: string;
          image?: string | null;
          metadata?: Json | null;
          name?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          billing_address: Json | null;
          full_name: string | null;
          id: string;
          payment_method: Json | null;
          username: string;
        };
        Insert: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id: string;
          payment_method?: Json | null;
          username: string;
        };
        Update: {
          avatar_url?: string | null;
          billing_address?: Json | null;
          full_name?: string | null;
          id?: string;
          payment_method?: Json | null;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          cancel_at_period_end: boolean | null;
          canceled_at: string | null;
          created: string;
          current_period_end: string;
          current_period_start: string;
          ended_at: string | null;
          id: string;
          metadata: Json | null;
          price_id: string | null;
          quantity: number | null;
          status: Database['public']['Enums']['subscription_status'] | null;
          trial_end: string | null;
          trial_start: string | null;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          cancel_at_period_end?: boolean | null;
          canceled_at?: string | null;
          created?: string;
          current_period_end?: string;
          current_period_start?: string;
          ended_at?: string | null;
          id?: string;
          metadata?: Json | null;
          price_id?: string | null;
          quantity?: number | null;
          status?: Database['public']['Enums']['subscription_status'] | null;
          trial_end?: string | null;
          trial_start?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_price_id_fkey';
            columns: ['price_id'];
            isOneToOne: false;
            referencedRelation: 'prices';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
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
          user_id: string;
          voice_id: string | null;
        };
        Insert: {
          created_at?: string;
          duration_seconds: number;
          file_url: string;
          id?: number;
          is_default?: boolean;
          source_text: string;
          user_id?: string;
          voice_id?: string | null;
        };
        Update: {
          created_at?: string;
          duration_seconds?: number;
          file_url?: string;
          id?: number;
          is_default?: boolean;
          source_text?: string;
          user_id?: string;
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
      pricing_plan_interval: 'day' | 'week' | 'month' | 'year';
      pricing_type: 'one_time' | 'recurring';
      subscription_status:
        | 'trialing'
        | 'active'
        | 'canceled'
        | 'incomplete'
        | 'incomplete_expired'
        | 'past_due'
        | 'unpaid'
        | 'paused';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
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
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export interface BasicUserInfo {
  id: string;
  username: string;
  lastSignIn: string | null;
}

export interface UserAuth {
  user: BasicUserInfo | null;
  error: string | null;
}
