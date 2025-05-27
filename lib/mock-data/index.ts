// Comprehensive mock data system for MarketingOS

export const mockUserData = {
  name: 'Josh',
  email: 'josh@marketingos.com',
  company: 'MarketingOS',
  industry: 'SaaS',
  companySize: 'medium',
  onboardingComplete: true,
  subscription: {
    plan: 'Growth Bundle',
    services: ['social-media', 'seo', 'google-ads', 'meta-ads', 'email-marketing'],
    monthlyPrice: 497,
    startDate: '2024-01-15',
    status: 'active'
  },
  aiPersonality: {
    formality: 50,
    creativity: 70,
    proactivity: 80,
    detail: 60
  },
  teamNames: {
    strategist: 'Alex',
    social: 'Sam',
    content: 'Casey',
    analyst: 'Jordan'
  }
}

export const mockCompetitors = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    domain: 'techcorp.io',
    logo: '🏢',
    status: 'active',
    threatLevel: 'high',
    metrics: {
      traffic: { value: '850K/mo', change: 15, trend: 'up' },
      adSpend: { value: '$75K/mo', change: 45, trend: 'up' },
      socialFollowers: { value: '125K', change: 8, trend: 'up' },
      domainAuthority: { value: 72, change: 2, trend: 'up' }
    },
    recentActivity: generateRecentActivity('TechCorp'),
    weaknesses: [
      'Poor mobile experience (PageSpeed: 42)',
      'Limited social media engagement',
      'No email capture on homepage',
      'Weak local SEO presence'
    ]
  },
  {
    id: 2,
    name: 'CloudBase Pro',
    domain: 'cloudbase.com',
    logo: '☁️',
    status: 'active',
    threatLevel: 'medium',
    metrics: {
      traffic: { value: '1.2M/mo', change: -5, trend: 'down' },
      adSpend: { value: '$110K/mo', change: 10, trend: 'up' },
      socialFollowers: { value: '200K', change: -2, trend: 'down' },
      domainAuthority: { value: 78, change: 0, trend: 'stable' }
    },
    recentActivity: generateRecentActivity('CloudBase'),
    weaknesses: [
      'High customer churn rate',
      'Negative reviews increasing',
      'Slow customer support response',
      'Limited integrations'
    ]
  }
]

export const mockCampaigns = [
  {
    id: 1,
    name: 'Q1 Product Launch',
    status: 'active',
    type: 'product-launch',
    startDate: '2024-02-01',
    metrics: {
      revenue: 24780,
      conversions: 187,
      impressions: 450000,
      clicks: 12500,
      ctr: 2.8,
      roi: 4.2
    },
    channels: ['email', 'social', 'google-ads', 'seo'],
    budget: 5900,
    spent: 4200
  },
  {
    id: 2,
    name: 'Valentine\'s Day Sale',
    status: 'completed',
    type: 'seasonal',
    startDate: '2024-02-10',
    endDate: '2024-02-14',
    metrics: {
      revenue: 42350,
      conversions: 412,
      impressions: 680000,
      clicks: 28900,
      ctr: 4.3,
      roi: 7.2
    },
    channels: ['email', 'meta-ads', 'social'],
    budget: 5900,
    spent: 5900
  }
]

export const mockWorkflowExecutions = [
  {
    id: 1,
    workflowType: 'product-launch',
    name: 'Widget Pro Launch',
    startedAt: '2024-02-15T10:00:00Z',
    completedAt: '2024-02-15T10:08:00Z',
    status: 'completed',
    results: {
      landingPage: 'https://widgetpro.com/launch',
      emailsCreated: 7,
      socialPostsCreated: 30,
      adCampaignsCreated: 4,
      estimatedReach: 125000,
      projectedRevenue: 45000
    }
  },
  {
    id: 2,
    workflowType: 'competitor-destruction',
    name: 'Counter TechCorp Campaign',
    startedAt: '2024-02-14T14:30:00Z',
    completedAt: '2024-02-14T14:35:00Z',
    status: 'completed',
    results: {
      competitorWeaknessesIdentified: 8,
      counterCampaignsCreated: 5,
      keywordsTargeted: 45,
      estimatedMarketShareGain: 12
    }
  }
]

export const mockNotifications = [
  {
    id: 1,
    type: 'competitor',
    severity: 'high',
    title: 'Competitor Alert',
    message: 'TechCorp increased ad spend by 45% - targeting your keywords',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    read: false,
    actionRequired: true
  },
  {
    id: 2,
    type: 'success',
    severity: 'medium',
    title: 'Campaign Milestone',
    message: 'Product launch campaign exceeded goals by 23%',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    read: false,
    actionRequired: false
  },
  {
    id: 3,
    type: 'insight',
    severity: 'low',
    title: 'AI Recommendation',
    message: 'Increase email frequency to 3x/week for 40% more revenue',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionRequired: false
  }
]

export const mockRevenueData = generateRevenueData(30)
export const mockActivityFeed = generateActivityFeed(20)

// Helper functions to generate realistic data
function generateRecentActivity(competitorName: string) {
  const activities = [
    { type: 'campaign', message: `Launched new PPC campaign targeting "enterprise software"`, severity: 'high' },
    { type: 'content', message: `Published 5 new blog posts on AI automation`, severity: 'medium' },
    { type: 'social', message: `Increased LinkedIn posting frequency by 200%`, severity: 'low' },
    { type: 'pricing', message: `Reduced pricing by 20% across all plans`, severity: 'high' },
    { type: 'product', message: `Announced new AI features coming Q2`, severity: 'medium' }
  ]
  
  return activities.slice(0, 3).map((activity, index) => ({
    ...activity,
    time: getTimeAgo(index * 24 * 60 * 60 * 1000 + Math.random() * 12 * 60 * 60 * 1000)
  }))
}

function generateRevenueData(days: number) {
  const data = []
  const baseRevenue = 10000
  let cumulativeRevenue = 0
  
  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const dailyRevenue = baseRevenue + Math.random() * 5000 + (days - i) * 200
    cumulativeRevenue += dailyRevenue
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Math.round(dailyRevenue),
      cumulative: Math.round(cumulativeRevenue),
      campaigns: Math.floor(8 + Math.random() * 12),
      conversions: Math.floor(100 + Math.random() * 200)
    })
  }
  
  return data
}

function generateActivityFeed(count: number) {
  const activities = []
  const types = [
    { 
      type: 'campaign_launched', 
      icon: 'Rocket', 
      color: 'green',
      templates: [
        'Product launch campaign for {product} is now live',
        'Seasonal campaign "{campaign}" launched successfully',
        'B2B lead gen campaign started targeting {industry}'
      ]
    },
    {
      type: 'revenue_milestone',
      icon: 'DollarSign',
      color: 'green',
      templates: [
        'Campaign "{campaign}" generated ${amount} in revenue',
        'Daily revenue exceeded ${amount} for the first time',
        'Q1 revenue goal achieved 2 weeks early'
      ]
    },
    {
      type: 'competitor_action',
      icon: 'AlertCircle',
      color: 'red',
      templates: [
        '{competitor} increased ad spend by {percentage}%',
        '{competitor} launched new campaign targeting your keywords',
        '{competitor} published comparison content mentioning your brand'
      ]
    },
    {
      type: 'ai_optimization',
      icon: 'Sparkles',
      color: 'blue',
      templates: [
        'AI optimized {campaign} campaign, improving CTR by {percentage}%',
        'Bid adjustments saved ${amount} while maintaining conversions',
        'AI identified {count} new high-intent keywords'
      ]
    },
    {
      type: 'content_performance',
      icon: 'TrendingUp',
      color: 'purple',
      templates: [
        'Blog post "{title}" reached {views} views',
        'Video "{title}" generated {conversions} conversions',
        'Email campaign achieved {percentage}% open rate'
      ]
    }
  ]
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const template = type.templates[Math.floor(Math.random() * type.templates.length)]
    
    activities.push({
      id: i + 1,
      type: type.type,
      icon: type.icon,
      color: type.color,
      message: fillTemplate(template),
      timestamp: new Date(Date.now() - i * 30 * 60 * 1000 - Math.random() * 30 * 60 * 1000).toISOString(),
      time: getTimeAgo(i * 30 * 60 * 1000 + Math.random() * 30 * 60 * 1000)
    })
  }
  
  return activities
}

function fillTemplate(template: string): string {
  const replacements: Record<string, string | number> = {
    '{product}': ['Widget Pro', 'DataSync Plus', 'CloudManager', 'AutoScale Pro'][Math.floor(Math.random() * 4)],
    '{campaign}': ['Spring Sale', 'Product Launch', 'Black Friday', 'Lead Gen Q1'][Math.floor(Math.random() * 4)],
    '{industry}': ['SaaS', 'E-commerce', 'Healthcare', 'Finance'][Math.floor(Math.random() * 4)],
    '{amount}': (Math.floor(Math.random() * 50) * 100 + 1000).toLocaleString(),
    '{percentage}': Math.floor(Math.random() * 40 + 10),
    '{competitor}': ['TechCorp', 'CloudBase', 'DataFlow'][Math.floor(Math.random() * 3)],
    '{count}': Math.floor(Math.random() * 50 + 10),
    '{title}': ['10 Ways to Boost Productivity', 'Product Demo', 'Customer Success Story'][Math.floor(Math.random() * 3)],
    '{views}': (Math.floor(Math.random() * 100) * 1000 + 10000).toLocaleString(),
    '{conversions}': Math.floor(Math.random() * 200 + 50)
  }
  
  return template.replace(/{[^}]+}/g, match => String(replacements[match] || match))
}

function getTimeAgo(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'Just now'
}

// Service-specific mock data
export const mockSocialMediaData = {
  scheduledPosts: generateScheduledPosts(30),
  analytics: {
    totalReach: 125000,
    engagement: 8.5,
    followers: {
      total: 45230,
      growth: 12.3
    },
    topPosts: generateTopPosts(5)
  },
  platforms: [
    { name: 'LinkedIn', connected: true, followers: 12500, engagement: 12.3 },
    { name: 'Twitter', connected: true, followers: 8900, engagement: 6.8 },
    { name: 'Facebook', connected: true, followers: 15600, engagement: 7.2 },
    { name: 'Instagram', connected: true, followers: 8230, engagement: 9.1 }
  ]
}

export const mockSEOData = {
  rankings: generateKeywordRankings(20),
  technicalScore: 87,
  issues: [
    { type: 'error', count: 2, description: 'Missing meta descriptions' },
    { type: 'warning', count: 8, description: 'Images without alt text' },
    { type: 'info', count: 15, description: 'Opportunities for internal linking' }
  ],
  backlinks: {
    total: 1250,
    doFollow: 890,
    referring: 234,
    newThisMonth: 45
  },
  competitors: [
    { name: 'TechCorp', visibility: 72, keywords: 450 },
    { name: 'CloudBase', visibility: 68, keywords: 380 },
    { name: 'Your Site', visibility: 65, keywords: 320 }
  ]
}

function generateScheduledPosts(count: number) {
  const posts = []
  const platforms = ['LinkedIn', 'Twitter', 'Facebook', 'Instagram']
  const postTypes = ['Educational', 'Promotional', 'Engagement', 'Behind the scenes']
  
  for (let i = 0; i < count; i++) {
    const date = new Date()
    date.setDate(date.getDate() + Math.floor(i / 4))
    date.setHours(9 + (i % 4) * 3)
    
    posts.push({
      id: i + 1,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      type: postTypes[Math.floor(Math.random() * postTypes.length)],
      content: `Scheduled post ${i + 1} content...`,
      scheduledFor: date.toISOString(),
      status: i < 5 ? 'published' : 'scheduled',
      engagement: i < 5 ? {
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 100)
      } : null
    })
  }
  
  return posts
}

function generateTopPosts(count: number) {
  const posts = []
  
  for (let i = 0; i < count; i++) {
    posts.push({
      id: i + 1,
      platform: ['LinkedIn', 'Twitter', 'Facebook'][Math.floor(Math.random() * 3)],
      content: `Top performing post ${i + 1}...`,
      engagement: {
        likes: Math.floor(Math.random() * 1000 + 500),
        comments: Math.floor(Math.random() * 100 + 20),
        shares: Math.floor(Math.random() * 200 + 50),
        reach: Math.floor(Math.random() * 10000 + 5000)
      },
      postedAt: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString()
    })
  }
  
  return posts
}

function generateKeywordRankings(count: number) {
  const keywords = [
    'marketing automation software',
    'ai marketing tools',
    'competitor analysis tool',
    'social media scheduler',
    'email marketing platform',
    'seo optimization software',
    'content marketing tools',
    'marketing analytics platform',
    'lead generation software',
    'marketing workflow automation'
  ]
  
  return keywords.slice(0, count).map((keyword, index) => ({
    keyword,
    position: Math.floor(Math.random() * 20 + 1),
    previousPosition: Math.floor(Math.random() * 25 + 1),
    volume: Math.floor(Math.random() * 5000 + 100),
    difficulty: Math.floor(Math.random() * 100),
    url: `/blog/${keyword.replace(/\s+/g, '-')}`,
    trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
  }))
}

// Export all mock data functions
export const mockData = {
  user: mockUserData,
  competitors: mockCompetitors,
  campaigns: mockCampaigns,
  workflows: mockWorkflowExecutions,
  notifications: mockNotifications,
  revenue: mockRevenueData,
  activity: mockActivityFeed,
  socialMedia: mockSocialMediaData,
  seo: mockSEOData
}
