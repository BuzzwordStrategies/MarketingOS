-- MarketingOS Initial Schema
-- Foundation for the revolutionary marketing platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Service Tier Enum
CREATE TYPE service_tier AS ENUM (
  'FREE',
  'STARTER', 
  'BASE',
  'STANDARD',
  'PREMIUM',
  'LEADER'
);

-- Achievement Category Enum
CREATE TYPE achievement_category AS ENUM (
  'campaign_success',
  'roi_achievement', 
  'integration_mastery',
  'innovation'
);

-- Achievement Rarity Enum
CREATE TYPE achievement_rarity AS ENUM (
  'common',
  'rare',
  'legendary'
);

-- Service Status Enum
CREATE TYPE service_status AS ENUM (
  'active',
  'paused',
  'completed',
  'failed',
  'pending'
);

-- Attribution Model Enum
CREATE TYPE attribution_model AS ENUM (
  'first_touch',
  'last_touch',
  'linear',
  'time_decay',
  'position_based',
  'weighted'
);

-- Organizations table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  industry TEXT,
  company_size TEXT,
  marketing_budget_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles table (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  company_name TEXT,
  organization_id UUID REFERENCES organizations(id),
  current_tier service_tier DEFAULT 'FREE',
  
  -- Professional Progression System
  professional_level INTEGER DEFAULT 1 CHECK (professional_level >= 1 AND professional_level <= 100),
  expertise_score INTEGER DEFAULT 0,
  mastery_areas TEXT[] DEFAULT '{}',
  
  -- Engagement Psychology
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  consecutive_days INTEGER DEFAULT 0,
  favorite_features TEXT[] DEFAULT '{}',
  
  -- Business Intelligence
  industry TEXT,
  company_size TEXT,
  marketing_budget_range TEXT,
  primary_goals TEXT[] DEFAULT '{}',
  
  -- Personalization Data
  dashboard_layout JSONB DEFAULT '{}',
  notification_preferences JSONB DEFAULT '{}',
  ui_customizations JSONB DEFAULT '{}',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category achievement_category NOT NULL,
  rarity achievement_rarity NOT NULL,
  earned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metric_value NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Success Metrics table
CREATE TABLE success_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  metric_unit TEXT,
  campaign_id UUID,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL, -- 'SOCIAL_MEDIA', 'SEO', 'CONTENT', etc.
  service_tier service_tier NOT NULL,
  provider TEXT NOT NULL,
  status service_status DEFAULT 'pending',
  configuration JSONB DEFAULT '{}',
  performance_metrics JSONB DEFAULT '{}',
  cost NUMERIC,
  price NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'product_launch', 'brand_awareness', etc.
  status service_status DEFAULT 'pending',
  configuration JSONB NOT NULL,
  services UUID[] DEFAULT '{}', -- Array of service IDs
  total_budget NUMERIC,
  spent_budget NUMERIC DEFAULT 0,
  revenue_generated NUMERIC DEFAULT 0,
  roi_percentage NUMERIC DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content table
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL, -- 'blog_post', 'social_post', 'ad_creative', etc.
  title TEXT,
  content_data JSONB NOT NULL,
  platform TEXT, -- 'facebook', 'instagram', 'linkedin', etc.
  status service_status DEFAULT 'pending',
  performance_metrics JSONB DEFAULT '{}',
  revenue_attributed NUMERIC DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Touchpoints table (for attribution tracking)
CREATE TABLE touchpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL, -- Anonymous visitor tracking
  source TEXT NOT NULL,
  medium TEXT NOT NULL,
  campaign TEXT,
  content_id UUID REFERENCES content(id),
  utm_parameters JSONB DEFAULT '{}',
  page_url TEXT NOT NULL,
  referrer TEXT,
  engagement_score NUMERIC DEFAULT 0,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversions table
CREATE TABLE conversions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  visitor_id TEXT NOT NULL,
  conversion_type TEXT NOT NULL, -- 'purchase', 'signup', 'lead', etc.
  conversion_value NUMERIC NOT NULL,
  attribution_model attribution_model DEFAULT 'weighted',
  attribution_data JSONB NOT NULL,
  time_to_conversion INTEGER, -- in hours
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competitor Intelligence table
CREATE TABLE competitor_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  competitor_name TEXT NOT NULL,
  website_url TEXT,
  industry TEXT,
  tracking_enabled BOOLEAN DEFAULT true,
  intelligence_data JSONB DEFAULT '{}',
  last_analyzed TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Competitor Alerts table
CREATE TABLE competitor_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  competitor_id UUID REFERENCES competitor_profiles(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  significance_score INTEGER CHECK (significance_score >= 1 AND significance_score <= 100),
  description TEXT NOT NULL,
  recommended_actions TEXT[] DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflow Executions table
CREATE TABLE workflow_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  workflow_type TEXT NOT NULL,
  input_data JSONB NOT NULL,
  status service_status DEFAULT 'pending',
  progress_percentage INTEGER DEFAULT 0,
  results JSONB DEFAULT '{}',
  error_log TEXT,
  estimated_completion TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Requests table (for tracking AI usage and costs)
CREATE TABLE ai_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL, -- 'claude', 'openai', 'gemini', etc.
  model TEXT NOT NULL,
  task_type TEXT NOT NULL,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost NUMERIC,
  response_time_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue Attribution table
CREATE TABLE revenue_attribution (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  conversion_id UUID REFERENCES conversions(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content(id),
  campaign_id UUID REFERENCES campaigns(id),
  service_id UUID REFERENCES services(id),
  attributed_value NUMERIC NOT NULL,
  confidence_score NUMERIC CHECK (confidence_score >= 0 AND confidence_score <= 1),
  attribution_model attribution_model NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_tier ON user_profiles(current_tier);
CREATE INDEX idx_user_profiles_last_active ON user_profiles(last_active);
CREATE INDEX idx_achievements_user_id ON achievements(user_id);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_services_user_id ON services(user_id);
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_campaigns_user_id ON campaigns(user_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_content_user_id ON content(user_id);
CREATE INDEX idx_content_campaign_id ON content(campaign_id);
CREATE INDEX idx_content_platform ON content(platform);
CREATE INDEX idx_touchpoints_user_id ON touchpoints(user_id);
CREATE INDEX idx_touchpoints_visitor_id ON touchpoints(visitor_id);
CREATE INDEX idx_touchpoints_timestamp ON touchpoints(timestamp);
CREATE INDEX idx_conversions_user_id ON conversions(user_id);
CREATE INDEX idx_conversions_visitor_id ON conversions(visitor_id);
CREATE INDEX idx_competitor_alerts_user_id ON competitor_alerts(user_id);
CREATE INDEX idx_competitor_alerts_is_read ON competitor_alerts(is_read);
CREATE INDEX idx_workflow_executions_user_id ON workflow_executions(user_id);
CREATE INDEX idx_workflow_executions_status ON workflow_executions(status);
CREATE INDEX idx_ai_requests_user_id ON ai_requests(user_id);
CREATE INDEX idx_ai_requests_created_at ON ai_requests(created_at);
CREATE INDEX idx_revenue_attribution_user_id ON revenue_attribution(user_id);
CREATE INDEX idx_revenue_attribution_conversion_id ON revenue_attribution(conversion_id);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_competitor_profiles_updated_at BEFORE UPDATE ON competitor_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflow_executions_updated_at BEFORE UPDATE ON workflow_executions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE touchpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitor_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_attribution ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own achievements" ON achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own success metrics" ON success_metrics FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own success metrics" ON success_metrics FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own services" ON services FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own campaigns" ON campaigns FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own content" ON content FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own touchpoints" ON touchpoints FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own conversions" ON conversions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own competitor profiles" ON competitor_profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own competitor alerts" ON competitor_alerts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own workflow executions" ON workflow_executions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own ai requests" ON ai_requests FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own revenue attribution" ON revenue_attribution FOR ALL USING (auth.uid() = user_id);

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
