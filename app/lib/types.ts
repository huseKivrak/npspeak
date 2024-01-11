export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      audio_clips: {
        Row: {
          created_at: string;
          duration_seconds: number;
          file_url: string;
          id: number;
          original_file_name: string;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          duration_seconds: number;
          file_url: string;
          id?: number;
          original_file_name: string;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          duration_seconds?: number;
          file_url?: string;
          id?: number;
          original_file_name?: string;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'audio_clips_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
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
          }
        ];
      };
      voice_clones: {
        Row: {
          clone_url: string | null;
          created_at: string;
          elevenlelevenlabs_voice_id: string | null;
          id: number;
          status: string;
          user_id: string | null;
        };
        Insert: {
          clone_url?: string | null;
          created_at?: string;
          elevenlelevenlabs_voice_id?: string | null;
          id?: number;
          status: string;
          user_id?: string | null;
        };
        Update: {
          clone_url?: string | null;
          created_at?: string;
          elevenlelevenlabs_voice_id?: string | null;
          id?: number;
          status?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'voice_clones_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
      Database['public']['Views'])
  ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
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
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
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
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
  ? Database['public']['Enums'][PublicEnumNameOrOptions]
  : never;
