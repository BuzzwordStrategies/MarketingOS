'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Globe,
  Search,
  Target,
  Mail,
  FileText,
  Video,
  Mic,
  MapPin,
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Settings,
  Play
} from 'lucide-react'

const services = [
  {
    id: 'social-media',
    name: 'Social Media Management',
    description: 'AI creates & schedules posts across all platforms',
    icon: Globe,
    color: 'bg-blue-500',
    status: 'active',
    metrics: {
      postsScheduled: 124,
      engagement: '8.5%',
      reach: '125K',
      growth: '+12.3%'
    },
    features: [
      'Content creation & scheduling',
      'Multi-platform management',
      'Engagement automation',
      'Analytics & reporting'
    ],
    quickActions: [
      { name: 'Schedule Posts', icon: Calendar },
      { name: 'View Analytics', icon: BarChart3 },
      { name: 'Generate Content', icon: Sparkles }
    ]
  },
  {
    id: 'seo',
    name: 'SEO & Content',
    description: 'Rank #1 on Google with AI-optimized content',
    icon: Search,
    color: 'bg-green-500',
    status: 'active',
    metrics: {
      keywords: 320,
      ranking: '#1-3',
      traffic: '+45%',
      backlinks: 1250
    },
    features: [
      'Keyword research & tracking',
      'Content optimization',
      'Technical SEO fixes',
      'Backlink building'
    ],
    quickActions: [
      { name: 'Check Rankings', icon: TrendingUp },
      { name: 'Optimize Content', icon: FileText },
      { name: 'Find Keywords', icon: Search }
    ]
  },
  {
    id: 'google-ads',
    name: 'Google Ads Management',
    description: 'AI optimizes your ads for maximum ROI',
    icon: Target,
    color: 'bg-red-500',
    status: 'active',
    metrics: {
      campaigns: 8,
      ctr: '4.2%',
      conversions: 234,
      roi: '3.1x'
    },
    features: [
      'Campaign creation & management',
      'Bid optimization',
      'A/B testing',
      'Conversion tracking'
    ],
    quickActions: [
      { name: 'Create Campaign', icon: Target },
      { name: 'Adjust Bids', icon: Settings },
      { name: 'View Performance', icon: BarChart3 }
    ]
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Automated campaigns that drive sales',
    icon: Mail,
    color: 'bg-purple-500',
    status: 'active',
    metrics: {
      subscribers: '45.2K',
      openRate: '42%',
      clickRate: '8.7%',
      revenue: '$24.5K'
    },
    features: [
      'List management & segmentation',
      'Campaign automation',
      'A/B testing',
      'Revenue tracking'
    ],
    quickActions: [
      { name: 'Create Campaign', icon: Mail },
      { name: 'View Subscribers', icon: Users },
      { name: 'Check Revenue', icon: TrendingUp }
    ]
  }
]

export default function ServicesPage() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState(services[0])

  const handleQuickAction = (serviceId: string, actionName: string) => {
    // In a real app, this would trigger the specific action
    console.log(`Triggering ${actionName} for ${serviceId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Your Marketing Services</h1>
        <p className="text-gray-600 mt-1">AI-powered services working 24/7 to grow your business</p>
      </div>

      {/* Service Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card 
            key={service.id}
            className={`robinhood-card cursor-pointer transition-all ${
              selectedService.id === service.id ? 'ring-2 ring-[#00D632]' : ''
            }`}
            onClick={() => setSelectedService(service)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${service.color} text-white`}>
                  <service.icon className="h-5 w-5" />
                </div>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
              <CardTitle className="text-lg">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(service.metrics).slice(0, 2).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-gray-600 text-xs capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Service Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Details */}
        <Card className="robinhood-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${selectedService.color} text-white`}>
                  <selectedService.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{selectedService.name}</CardTitle>
                  <CardDescription>{selectedService.description}</CardDescription>
                </div>
              </div>
              <Button className="robinhood-button">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedService.metrics).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 capitalize mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-2xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="font-semibold mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Campaign optimized</p>
                          <p className="text-xs text-gray-600">CTR improved by 23%</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">AI generated content</p>
                          <p className="text-xs text-gray-600">15 new posts created</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">5 hours ago</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 mt-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Performance analytics coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6 mt-6">
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Service settings coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="robinhood-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for {selectedService.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedService.quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleQuickAction(selectedService.id, action.name)}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.name}
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium mb-3">Service Health</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">API Status</span>
                    <Badge className="bg-green-100 text-green-700">Operational</Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Usage</span>
                    <span className="text-sm text-gray-600">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button className="w-full robinhood-button">
                <Play className="h-4 w-4 mr-2" />
                Launch {selectedService.name} Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="robinhood-card border-[#00D632]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-[#00D632]" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Opportunities to improve your marketing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">Increase Email Frequency</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Your email open rates are 42% - increase to 3x/week for more revenue
              </p>
              <Button size="sm" className="w-full">Apply</Button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium">Expand Ad Targeting</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                3 new audience segments identified with high conversion potential
              </p>
              <Button size="sm" className="w-full">Apply</Button>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium">Post More on LinkedIn</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                LinkedIn engagement is 3x higher - increase posting frequency
              </p>
              <Button size="sm" className="w-full">Apply</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
