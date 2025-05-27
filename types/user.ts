import { Database } from './database'

export type ServiceTier = Database['public']['Enums']['service_tier']
export type AchievementCategory = Database['public']['Enums']['achievement_category']
export type AchievementRarity = Database['public']['Enums']['achievement_rarity']

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  company_name: string | null
  organization_id: string | null
  current_tier: ServiceTier
  
  // Professional Progression System (NOT childish XP)
  professional_level: number // 1-100
  expertise_score: number // Calculated from performance
  mastery_areas: string[] // ["social_media", "seo", "paid_ads"]
  
  // Engagement Psychology
  last_active: string
  consecutive_days: number
  favorite_features: string[]
  
  // Business Intelligence
  industry: string | null
  company_size: string | null
  marketing_budget_range: string | null
  primary_goals: string[]
  
  // Personalization Data
  dashboard_layout: any
  notification_preferences: any
  ui_customizations: any
  
  // Metadata
  created_at: string
  updated_at: string
}

export interface Achievement {
  id: string
  user_id: string
  title: string
  description: string
  category: AchievementCategory
  rarity: AchievementRarity
  earned_date: string
  metric_value: number | null // The actual achievement (e.g., "300% ROI")
  created_at: string
}

export interface SuccessMetric {
  id: string
  user_id: string
  metric_type: string
  metric_value: number
  metric_unit: string | null
  campaign_id: string | null
  recorded_at: string
  created_at: string
}

export interface RevenueMetric {
  source: string // "Facebook Post", "Google Ad", "Email Campaign"
  amount: number
  attribution_confidence: number // 0-100%
  time_to_conversion: number // hours/days
  channel: string
  campaign_id: string
  trend: 'up' | 'down' | 'stable'
  projected_7day: number
}

export interface EngagementFeature {
  // Future-Tripping Elements
  projectedRevenue: number
  potentialReach: number
  competitorGapAnalysis: any
  
  // Progress Visualization
  professionalGrowthChart: any
  skillMasteryProgress: any
  successMilestones: any
  
  // Social Proof & Validation
  industryBenchmarks: any
  peerComparisons: any
  expertiseRecognition: any
}

export interface ServiceTierConfig {
  FREE: {
    price: number
    features: string[]
    restrictions: {
      upgradeMarkup: string
      monthlyLimits: string
    }
  }
  STARTER: {
    price: string
    features: string[]
  }
  BASE: {
    price: string
    features: string[]
  }
  STANDARD: {
    price: string
    features: string[]
  }
  PREMIUM: {
    price: string
    features: string[]
  }
  LEADER: {
    price: string
    features: string[]
  }
}

export const SERVICE_TIER_CONFIG: ServiceTierConfig = {
  FREE: {
    price: 0,
    features: [
      "AI-powered basic content creation",
      "1 competitor tracking and analysis", 
      "Daily competitor analytics updates",
      "Basic dashboard with limited metrics",
      "Community support only"
    ],
    restrictions: {
      upgradeMarkup: "30% markup on all higher-tier purchases",
      monthlyLimits: "10 AI generations, 5 social posts, 1 blog post"
    }
  },
  STARTER: {
    price: "$49/month",
    features: [
      "Everything in Free tier",
      "5 competitor tracking",
      "Basic automation workflows", 
      "Email support",
      "Standard integrations"
    ]
  },
  BASE: {
    price: "$299-599/month per service",
    features: [
      "Full service capabilities as per pricing sheet",
      "All Base tier integrations functional",
      "Priority support",
      "Custom reporting"
    ]
  },
  STANDARD: {
    price: "$500-2400/month per service", 
    features: [
      "Multi-platform advanced features",
      "Advanced automation",
      "Dedicated account management",
      "API access"
    ]
  },
  PREMIUM: {
    price: "$1000-8000/month per service",
    features: [
      "White-glove service",
      "Unlimited everything",
      "Custom integrations",
      "Strategic consulting"
    ]
  },
  LEADER: {
    price: "Custom enterprise pricing",
    features: [
      "Complete marketing team replacement",
      "Dedicated infrastructure",
      "Custom AI model training",
      "24/7 dedicated support team"
    ]
  }
}
