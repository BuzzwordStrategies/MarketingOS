// MarketingOS Service Tier Definitions
export const TIERS = {
  FREE: {
    name: 'Free',
    price: 0,
    description: 'Get started with MarketingOS',
    limits: {
      competitors_tracked: 1,
      analytics_days: 7,
      social_posts: 2,
      platforms: 1,
      ai_requests: 10,
      users: 1
    },
    features: {
      competitor_tracker: true,
      basic_analytics: true,
      ai_content: true,
      social_scheduling: true,
      // Everything else shows as locked
      advanced_analytics: false,
      team_collaboration: false,
      api_access: false,
      white_label: false
    }
  },
  BASE: {
    name: 'Base',
    price_range: { min: 300, max: 600 },
    description: 'Perfect for small businesses',
    limits: {
      competitors_tracked: 3,
      analytics_days: 30,
      social_posts: 30,
      platforms: 3,
      ai_requests: 500,
      users: 3
    }
  },
  STANDARD: {
    name: 'Standard',
    price_range: { min: 500, max: 2400 },
    description: 'Growing businesses and agencies',
    limits: {
      competitors_tracked: 10,
      analytics_days: 90,
      social_posts: 100,
      platforms: 5,
      ai_requests: 2000,
      users: 10
    }
  },
  PREMIUM: {
    name: 'Premium',
    price_range: { min: 1000, max: 8000 },
    description: 'Enterprise-grade marketing',
    limits: {
      competitors_tracked: 'unlimited',
      analytics_days: 365,
      social_posts: 'unlimited',
      platforms: 'all',
      ai_requests: 'unlimited',
      users: 'unlimited'
    }
  }
};

// Service-specific pricing
export const SERVICE_PRICING = {
  social_media: { base: 300, standard: 500, premium: 1000 },
  seo: { base: 500, standard: 1400, premium: 5000 },
  gbp_ranking: { base: 300, standard: 700, premium: 2000 },
  blog_posts: { base: 400, standard: 1200, premium: 3600 },
  meta_ads: { base: 600, standard: 2400, premium: 6000 },
  google_ads: { base: 500, standard: 1600, premium: 6000 },
  funnel_production: { base: 600, standard: 4000, premium: 8000 },
  website_design: { base: 300, standard: 2000, premium: 7000 },
  video_production: { base: 300, standard: 600, premium: 2400 },
  podcast_production: { base: 200, standard: 600, premium: 1800 }
};

// Upgrade triggers for smart nudges
export const UPGRADE_TRIGGERS = {
  free_to_base: [
    'User hit 80%% of limits',
    'Competitor outperforming by 2x',
    'Requested locked feature 3 times',
    'Been active for 7 days'
  ],
  base_to_standard: [
    'Managing 2+ services',
    'Team size grown',
    'Need more platforms',
    'Analytics requests increased'
  ]
};
