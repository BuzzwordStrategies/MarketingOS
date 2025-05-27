export type Database = {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          industry: string | null
          company_size: string | null
          marketing_budget_range: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          industry?: string | null
          company_size?: string | null
          marketing_budget_range?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string | null
          company_size?: string | null
          marketing_budget_range?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          company_name: string | null
          organization_id: string | null
          current_tier: Database['public']['Enums']['service_tier']
          professional_level: number
          expertise_score: number
          mastery_areas: string[]
          last_active: string
          consecutive_days: number
          favorite_features: string[]
          industry: string | null
          company_size: string | null
          marketing_budget_range: string | null
          primary_goals: string[]
          dashboard_layout: Json
          notification_preferences: Json
          ui_customizations: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          company_name?: string | null
          organization_id?: string | null
          current_tier?: Database['public']['Enums']['service_tier']
          professional_level?: number
          expertise_score?: number
          mastery_areas?: string[]
          last_active?: string
          consecutive_days?: number
          favorite_features?: string[]
          industry?: string | null
          company_size?: string | null
          marketing_budget_range?: string | null
          primary_goals?: string[]
          dashboard_layout?: Json
          notification_preferences?: Json
          ui_customizations?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          company_name?: string | null
          organization_id?: string | null
          current_tier?: Database['public']['Enums']['service_tier']
          professional_level?: number
          expertise_score?: number
          mastery_areas?: string[]
          last_active?: string
          consecutive_days?: number
          favorite_features?: string[]
          industry?: string | null
          company_size?: string | null
          marketing_budget_range?: string | null
          primary_goals?: string[]
          dashboard_layout?: Json
          notification_preferences?: Json
          ui_customizations?: Json
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          category: Database['public']['Enums']['achievement_category']
          rarity: Database['public']['Enums']['achievement_rarity']
          earned_date: string
          metric_value: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          category: Database['public']['Enums']['achievement_category']
          rarity: Database['public']['Enums']['achievement_rarity']
          earned_date?: string
          metric_value?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          category?: Database['public']['Enums']['achievement_category']
          rarity?: Database['public']['Enums']['achievement_rarity']
          earned_date?: string
          metric_value?: number | null
          created_at?: string
        }
      }
      success_metrics: {
        Row: {
          id: string
          user_id: string
          metric_type: string
          metric_value: number
          metric_unit: string | null
          campaign_id: string | null
          recorded_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          metric_type: string
          metric_value: number
          metric_unit?: string | null
          campaign_id?: string | null
          recorded_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          metric_type?: string
          metric_value?: number
          metric_unit?: string | null
          campaign_id?: string | null
          recorded_at?: string
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          user_id: string
          service_type: string
          service_tier: Database['public']['Enums']['service_tier']
          provider: string
          status: Database['public']['Enums']['service_status']
          configuration: Json
          performance_metrics: Json
          cost: number | null
          price: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_type: string
          service_tier: Database['public']['Enums']['service_tier']
          provider: string
          status?: Database['public']['Enums']['service_status']
          configuration?: Json
          performance_metrics?: Json
          cost?: number | null
          price?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service_type?: string
          service_tier?: Database['public']['Enums']['service_tier']
          provider?: string
          status?: Database['public']['Enums']['service_status']
          configuration?: Json
          performance_metrics?: Json
          cost?: number | null
          price?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          status: Database['public']['Enums']['service_status']
          configuration: Json
          services: string[]
          total_budget: number | null
          spent_budget: number
          revenue_generated: number
          roi_percentage: number
          start_date: string | null
          end_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          status?: Database['public']['Enums']['service_status']
          configuration: Json
          services?: string[]
          total_budget?: number | null
          spent_budget?: number
          revenue_generated?: number
          roi_percentage?: number
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string
          status?: Database['public']['Enums']['service_status']
          configuration?: Json
          services?: string[]
          total_budget?: number | null
          spent_budget?: number
          revenue_generated?: number
          roi_percentage?: number
          start_date?: string | null
          end_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      content: {
        Row: {
          id: string
          user_id: string
          campaign_id: string
          service_id: string
          content_type: string
          title: string | null
          content_data: Json
          platform: string | null
          status: Database['public']['Enums']['service_status']
          performance_metrics: Json
          revenue_attributed: number
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          campaign_id: string
          service_id: string
          content_type: string
          title?: string | null
          content_data: Json
          platform?: string | null
          status?: Database['public']['Enums']['service_status']
          performance_metrics?: Json
          revenue_attributed?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          campaign_id?: string
          service_id?: string
          content_type?: string
          title?: string | null
          content_data?: Json
          platform?: string | null
          status?: Database['public']['Enums']['service_status']
          performance_metrics?: Json
          revenue_attributed?: number
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      touchpoints: {
        Row: {
          id: string
          user_id: string
          visitor_id: string
          source: string
          medium: string
          campaign: string | null
          content_id: string | null
          utm_parameters: Json
          page_url: string
          referrer: string | null
          engagement_score: number
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          visitor_id: string
          source: string
          medium: string
          campaign?: string | null
          content_id?: string | null
          utm_parameters?: Json
          page_url: string
          referrer?: string | null
          engagement_score?: number
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          visitor_id?: string
          source?: string
          medium?: string
          campaign?: string | null
          content_id?: string | null
          utm_parameters?: Json
          page_url?: string
          referrer?: string | null
          engagement_score?: number
          timestamp?: string
          created_at?: string
        }
      }
      conversions: {
        Row: {
          id: string
          user_id: string
          visitor_id: string
          conversion_type: string
          conversion_value: number
          attribution_model: Database['public']['Enums']['attribution_model']
          attribution_data: Json
          time_to_conversion: number | null
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          visitor_id: string
          conversion_type: string
          conversion_value: number
          attribution_model?: Database['public']['Enums']['attribution_model']
          attribution_data: Json
          time_to_conversion?: number | null
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          visitor_id?: string
          conversion_type?: string
          conversion_value?: number
          attribution_model?: Database['public']['Enums']['attribution_model']
          attribution_data?: Json
          time_to_conversion?: number | null
          timestamp?: string
          created_at?: string
        }
      }
      competitor_profiles: {
        Row: {
          id: string
          user_id: string
          competitor_name: string
          website_url: string | null
          industry: string | null
          tracking_enabled: boolean
          intelligence_data: Json
          last_analyzed: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competitor_name: string
          website_url?: string | null
          industry?: string | null
          tracking_enabled?: boolean
          intelligence_data?: Json
          last_analyzed?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competitor_name?: string
          website_url?: string | null
          industry?: string | null
          tracking_enabled?: boolean
          intelligence_data?: Json
          last_analyzed?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      competitor_alerts: {
        Row: {
          id: string
          user_id: string
          competitor_id: string
          alert_type: string
          significance_score: number
          description: string
          recommended_actions: string[]
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          competitor_id: string
          alert_type: string
          significance_score: number
          description: string
          recommended_actions?: string[]
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          competitor_id?: string
          alert_type?: string
          significance_score?: number
          description?: string
          recommended_actions?: string[]
          is_read?: boolean
          created_at?: string
        }
      }
      workflow_executions: {
        Row: {
          id: string
          user_id: string
          workflow_type: string
          input_data: Json
          status: Database['public']['Enums']['service_status']
          progress_percentage: number
          results: Json
          error_log: string | null
          estimated_completion: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workflow_type: string
          input_data: Json
          status?: Database['public']['Enums']['service_status']
          progress_percentage?: number
          results?: Json
          error_log?: string | null
          estimated_completion?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workflow_type?: string
          input_data?: Json
          status?: Database['public']['Enums']['service_status']
          progress_percentage?: number
          results?: Json
          error_log?: string | null
          estimated_completion?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_requests: {
        Row: {
          id: string
          user_id: string
          provider: string
          model: string
          task_type: string
          input_tokens: number | null
          output_tokens: number | null
          cost: number | null
          response_time_ms: number | null
          success: boolean
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider: string
          model: string
          task_type: string
          input_tokens?: number | null
          output_tokens?: number | null
          cost?: number | null
          response_time_ms?: number | null
          success?: boolean
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider?: string
          model?: string
          task_type?: string
          input_tokens?: number | null
          output_tokens?: number | null
          cost?: number | null
          response_time_ms?: number | null
          success?: boolean
          error_message?: string | null
          created_at?: string
        }
      }
      revenue_attribution: {
        Row: {
          id: string
          user_id: string
          conversion_id: string
          content_id: string | null
          campaign_id: string | null
          service_id: string | null
          attributed_value: number
          confidence_score: number | null
          attribution_model: Database['public']['Enums']['attribution_model']
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          conversion_id: string
          content_id?: string | null
          campaign_id?: string | null
          service_id?: string | null
          attributed_value: number
          confidence_score?: number | null
          attribution_model: Database['public']['Enums']['attribution_model']
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          conversion_id?: string
          content_id?: string | null
          campaign_id?: string | null
          service_id?: string | null
          attributed_value?: number
          confidence_score?: number | null
          attribution_model?: Database['public']['Enums']['attribution_model']
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      service_tier: 'FREE' | 'STARTER' | 'BASE' | 'STANDARD' | 'PREMIUM' | 'LEADER'
      achievement_category: 'campaign_success' | 'roi_achievement' | 'integration_mastery' | 'innovation'
      achievement_rarity: 'common' | 'rare' | 'legendary'
      service_status: 'active' | 'paused' | 'completed' | 'failed' | 'pending'
      attribution_model: 'first_touch' | 'last_touch' | 'linear' | 'time_decay' | 'position_based' | 'weighted'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
