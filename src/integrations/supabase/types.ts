export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      campaign_balances: {
        Row: {
          campaign_id: string
          completed_missions: number
          score: number
          user_id: string
        }
        Insert: {
          campaign_id: string
          completed_missions?: number
          score?: number
          user_id: string
        }
        Update: {
          campaign_id?: string
          completed_missions?: number
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_balances_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_balances_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          artist: string
          id: string
          status: string
          title: string
        }
        Insert: {
          artist: string
          id: string
          status?: string
          title: string
        }
        Update: {
          artist?: string
          id?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      drop_saves: {
        Row: {
          campaign_id: string
          created_at: string
          user_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          user_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drop_saves_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "drop_saves_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      fan_follows: {
        Row: {
          followed_id: string
          user_id: string
        }
        Insert: {
          followed_id: string
          user_id: string
        }
        Update: {
          followed_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fan_follows_followed_id_fkey"
            columns: ["followed_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fan_follows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_attempts: {
        Row: {
          answers: Json
          campaign_award: number
          checks: number
          created_at: string
          deadline: string
          general_award: number
          id: string
          mission_id: string
          period_key: string
          status: string
          user_id: string
        }
        Insert: {
          answers?: Json
          campaign_award?: number
          checks?: number
          created_at?: string
          deadline: string
          general_award?: number
          id?: string
          mission_id: string
          period_key: string
          status?: string
          user_id: string
        }
        Update: {
          answers?: Json
          campaign_award?: number
          checks?: number
          created_at?: string
          deadline?: string
          general_award?: number
          id?: string
          mission_id?: string
          period_key?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_attempts_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_attempts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_clue_discoveries: {
        Row: {
          attempt_id: string
          clue_key: string
        }
        Insert: {
          attempt_id: string
          clue_key: string
        }
        Update: {
          attempt_id?: string
          clue_key?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_clue_discoveries_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "mission_attempts"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_completions: {
        Row: {
          attempt_id: string
          campaign_award: number
          created_at: string
          general_award: number
          id: string
          mission_id: string
          period_key: string
          user_id: string
        }
        Insert: {
          attempt_id: string
          campaign_award: number
          created_at?: string
          general_award: number
          id?: string
          mission_id: string
          period_key: string
          user_id: string
        }
        Update: {
          attempt_id?: string
          campaign_award?: number
          created_at?: string
          general_award?: number
          id?: string
          mission_id?: string
          period_key?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_completions_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: true
            referencedRelation: "mission_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_completions_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_validation_rules: {
        Row: {
          mission_id: string
          rules: Json
        }
        Insert: {
          mission_id: string
          rules: Json
        }
        Update: {
          mission_id?: string
          rules?: Json
        }
        Relationships: [
          {
            foreignKeyName: "mission_validation_rules_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: true
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          campaign_id: string
          campaign_reward: number
          closes_at: string | null
          general_reward: number
          id: string
          kind: string
          max_checks: number
          opens_at: string | null
          question_seconds: number
          repeat_period: string
          status: string
          title: string
        }
        Insert: {
          campaign_id: string
          campaign_reward?: number
          closes_at?: string | null
          general_reward?: number
          id: string
          kind: string
          max_checks?: number
          opens_at?: string | null
          question_seconds?: number
          repeat_period?: string
          status?: string
          title: string
        }
        Update: {
          campaign_id?: string
          campaign_reward?: number
          closes_at?: string | null
          general_reward?: number
          id?: string
          kind?: string
          max_checks?: number
          opens_at?: string | null
          question_seconds?: number
          repeat_period?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "missions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      point_movements: {
        Row: {
          amount: number
          artist: string | null
          campaign_delta: number
          campaign_id: string | null
          completion_id: string | null
          created_at: string
          evidence_type: string
          id: string
          idempotency_key: string | null
          reason: string
          redemption_id: string | null
          reference: string | null
          user_id: string
        }
        Insert: {
          amount: number
          artist?: string | null
          campaign_delta?: number
          campaign_id?: string | null
          completion_id?: string | null
          created_at?: string
          evidence_type?: string
          id?: string
          idempotency_key?: string | null
          reason: string
          redemption_id?: string | null
          reference?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          artist?: string | null
          campaign_delta?: number
          campaign_id?: string | null
          completion_id?: string | null
          created_at?: string
          evidence_type?: string
          id?: string
          idempotency_key?: string | null
          reason?: string
          redemption_id?: string | null
          reference?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "point_movements_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_movements_completion_id_fkey"
            columns: ["completion_id"]
            isOneToOne: true
            referencedRelation: "mission_completions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "point_movements_redemption_id_fkey"
            columns: ["redemption_id"]
            isOneToOne: true
            referencedRelation: "reward_redemptions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_drop: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string
          favorite_artists: string[]
          general_points: number
          id: string
          listened_albums: string[]
          ranking_points: Json
          username: string | null
        }
        Insert: {
          active_drop?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          favorite_artists?: string[]
          general_points?: number
          id: string
          listened_albums?: string[]
          ranking_points?: Json
          username?: string | null
        }
        Update: {
          active_drop?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          favorite_artists?: string[]
          general_points?: number
          id?: string
          listened_albums?: string[]
          ranking_points?: Json
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          author_name: string
          created_at: string
          id: string
          rating: number
          subject_artist: string
          subject_id: string
          subject_image: string | null
          subject_title: string
          subject_type: string
          text: string
          user_id: string
        }
        Insert: {
          author_name?: string
          created_at?: string
          id?: string
          rating: number
          subject_artist?: string
          subject_id: string
          subject_image?: string | null
          subject_title: string
          subject_type: string
          text?: string
          user_id: string
        }
        Update: {
          author_name?: string
          created_at?: string
          id?: string
          rating?: number
          subject_artist?: string
          subject_id?: string
          subject_image?: string | null
          subject_title?: string
          subject_type?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_catalog: {
        Row: {
          active: boolean
          available: number | null
          cost: number
          id: string
          title: string
        }
        Insert: {
          active?: boolean
          available?: number | null
          cost: number
          id: string
          title: string
        }
        Update: {
          active?: boolean
          available?: number | null
          cost?: number
          id?: string
          title?: string
        }
        Relationships: []
      }
      reward_redemptions: {
        Row: {
          cost: number
          created_at: string
          id: string
          reward_id: string
          title: string
          user_id: string
        }
        Insert: {
          cost: number
          created_at?: string
          id?: string
          reward_id: string
          title: string
          user_id: string
        }
        Update: {
          cost?: number
          created_at?: string
          id?: string
          reward_id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "reward_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reward_redemptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shows: {
        Row: {
          artist: string
          city: string
          created_at: string
          event_date: string | null
          id: string
          image_url: string | null
          title: string
          venue: string
        }
        Insert: {
          artist: string
          city?: string
          created_at?: string
          event_date?: string | null
          id: string
          image_url?: string | null
          title: string
          venue?: string
        }
        Update: {
          artist?: string
          city?: string
          created_at?: string
          event_date?: string | null
          id?: string
          image_url?: string | null
          title?: string
          venue?: string
        }
        Relationships: []
      }
      user_shows: {
        Row: {
          created_at: string
          show_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          show_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          show_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_shows_show_id_fkey"
            columns: ["show_id"]
            isOneToOne: false
            referencedRelation: "shows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_shows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      drop_account_state: { Args: never; Returns: Json }
      drop_complete_attempt: {
        Args: { p_campaign: number; p_general: number; p_id: string }
        Returns: undefined
      }
      drop_follow: {
        Args: { p_follow: boolean; p_followed: string }
        Returns: boolean
      }
      drop_mission_action: {
        Args: { p_action: string; p_payload?: Json }
        Returns: Json
      }
      drop_points_action: {
        Args: { p_action: string; p_payload?: Json }
        Returns: Json
      }
      drop_ranking: {
        Args: { p_campaign: string; p_scope?: string }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
