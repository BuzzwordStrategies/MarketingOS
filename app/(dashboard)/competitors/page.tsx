'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { 
  Search,
  Plus,
  Target,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Eye,
  Globe,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Zap,
  Shield,
  Swords,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  RefreshCw
} from 'lucide-react'

// Mock competitor data
const competitors = [
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
    recentActivity: [
      { type: 'campaign', message: 'Launched new PPC campaign targeting "enterprise software"', time: '2 hours ago', severity: 'high' },
      { type: 'content', message: 'Published 5 new blog posts on AI automation', time: '1 day ago', severity: 'medium' },
      { type: 'social', message: 'Increased LinkedIn posting frequency by 200%', time: '3 days ago', severity: 'low' }
    ],
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
    recentActivity: [
      { type: 'pricing', message: 'Reduced pricing by 20% across all plans', time: '5 hours ago', severity: 'high' },
      { type: 'product', message: 'Announced new AI features coming Q2', time: '2 days ago', severity: 'medium' }
    ],
    weaknesses: [
      'High customer churn rate',
      'Negative reviews increasing',
      'Slow customer support response',
      'Limited integrations'
    ]
  },
  {
    id: 3,
    name: 'DataFlow Systems',
    domain: 'dataflow.io',
    logo: '📊',
    status: 'monitoring',
    threatLevel: 'low',
    metrics: {
      traffic: { value: '650K/mo', change: 3, trend: 'up' },
      adSpend: { value: '$55K/mo', change: 0, trend: 'stable' },
      socialFollowers: { value: '95K', change: 5, trend: 'up' },
      domainAuthority: { value: 68, change: 1, trend: 'up' }
    },
    recentActivity: [
      { type: 'content', message: 'Started new podcast series on data analytics', time: '1 week ago', severity: 'low' }
    ],
    weaknesses: [
      'Outdated website design',
      'Limited content marketing',
      'No video content',
      'Weak brand recognition'
    ]
  }
]

const alertTypes = {
  campaign: { icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100' },
  content: { icon: Globe, color: 'text-blue-600', bg: 'bg-blue-100' },
  social: { icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
  pricing: { icon: DollarSign, color: 'text-red-600', bg: 'bg-red-100' },
  product: { icon: Target, color: 'text-orange-600', bg: 'bg-orange-100' }
}

export default function CompetitorsPage() {
  const [selectedCompetitor, setSelectedCompetitor] = useState(competitors[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 3000)
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Competitor Intelligence</h1>
          <p className="text-gray-600 mt-1">Monitor and respond to competitor activities in real-time</p>
        </div>
        <Button className="robinhood-button">
          <Plus className="h-4 w-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      {/* Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium text-red-900">Urgent: TechCorp increased ad spend by 45%</p>
            <p className="text-sm text-red-700">They're targeting your top keywords. Respond now to protect market share.</p>
          </div>
        </div>
        <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
          <Swords className="h-4 w-4 mr-2" />
          Counter Attack
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search competitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            {competitors.map((competitor) => (
              <Card 
                key={competitor.id}
                className={`robinhood-card cursor-pointer transition-all ${
                  selectedCompetitor.id === competitor.id ? 'ring-2 ring-[#00D632]' : ''
                }`}
                onClick={() => setSelectedCompetitor(competitor)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{competitor.logo}</div>
                      <div>
                        <h3 className="font-semibold">{competitor.name}</h3>
                        <p className="text-sm text-gray-600">{competitor.domain}</p>
                      </div>
                    </div>
                    <Badge className={getThreatLevelColor(competitor.threatLevel)}>
                      {competitor.threatLevel} threat
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Traffic</p>
                      <div className="flex items-center">
                        <span className="font-medium">{competitor.metrics.traffic.value}</span>
                        {competitor.metrics.traffic.trend === 'up' ? (
                          <ArrowUp className="h-3 w-3 ml-1 text-green-600" />
                        ) : competitor.metrics.traffic.trend === 'down' ? (
                          <ArrowDown className="h-3 w-3 ml-1 text-red-600" />
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600">Ad Spend</p>
                      <div className="flex items-center">
                        <span className="font-medium">{competitor.metrics.adSpend.value}</span>
                        {competitor.metrics.adSpend.change > 0 && (
                          <span className="text-xs text-red-600 ml-1">+{competitor.metrics.adSpend.change}%</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {competitor.recentActivity.length > 0 && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-gray-600">Latest activity: {competitor.recentActivity[0].time}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitor Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Competitor Overview */}
          <Card className="robinhood-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedCompetitor.logo}</div>
                  <div>
                    <CardTitle>{selectedCompetitor.name}</CardTitle>
                    <CardDescription>{selectedCompetitor.domain}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Site
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Analyze
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Globe className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">{selectedCompetitor.metrics.traffic.value}</p>
                  <p className="text-sm text-gray-600">Monthly Traffic</p>
                  <div className="flex items-center justify-center mt-1">
                    {selectedCompetitor.metrics.traffic.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm ml-1">{selectedCompetitor.metrics.traffic.change}%</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">{selectedCompetitor.metrics.adSpend.value}</p>
                  <p className="text-sm text-gray-600">Ad Spend</p>
                  <div className="flex items-center justify-center mt-1">
                    <ArrowUp className="h-4 w-4 text-red-600" />
                    <span className="text-sm ml-1">{selectedCompetitor.metrics.adSpend.change}%</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">{selectedCompetitor.metrics.socialFollowers.value}</p>
                  <p className="text-sm text-gray-600">Social Followers</p>
                  <div className="flex items-center justify-center mt-1">
                    {selectedCompetitor.metrics.socialFollowers.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-sm ml-1">{selectedCompetitor.metrics.socialFollowers.change}%</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{selectedCompetitor.metrics.domainAuthority.value}</p>
                  <p className="text-sm text-gray-600">Domain Authority</p>
                  <div className="flex items-center justify-center mt-1">
                    <ArrowUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm ml-1">+{selectedCompetitor.metrics.domainAuthority.change}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="robinhood-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest moves and campaigns detected</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCompetitor.recentActivity.map((activity, index) => {
                  const activityType = alertTypes[activity.type as keyof typeof alertTypes]
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${activityType.bg}`}>
                        <activityType.icon className={`h-4 w-4 ${activityType.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          activity.severity === 'high' ? 'border-red-600 text-red-600' :
                          activity.severity === 'medium' ? 'border-yellow-600 text-yellow-600' :
                          'border-gray-600 text-gray-600'
                        }
                      >
                        {activity.severity}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weaknesses & Opportunities */}
          <Card className="robinhood-card">
            <CardHeader>
              <CardTitle>Identified Weaknesses</CardTitle>
              <CardDescription>Opportunities to gain competitive advantage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedCompetitor.weaknesses.map((weakness, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5 text-green-600" />
                      <span className="text-sm">{weakness}</span>
                    </div>
                    <Button size="sm" className="bg-[#00D632] hover:bg-[#00C02B] text-white">
                      Exploit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="robinhood-card">
            <CardHeader>
              <CardTitle>Quick Response Actions</CardTitle>
              <CardDescription>One-click competitive responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Swords className="h-4 w-4 mr-2" />
                  Launch Counter Campaign
                </Button>
                <Button variant="outline" className="justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Target Their Keywords
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Poach Their Audience
                </Button>
                <Button variant="outline" className="justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Create Comparison Content
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
