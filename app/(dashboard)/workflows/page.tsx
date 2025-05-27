'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search,
  Zap,
  Target,
  Calendar,
  Users,
  TrendingUp,
  Gift,
  Sparkles,
  Clock,
  DollarSign,
  ArrowRight,
  Filter,
  Star,
  Rocket,
  ShoppingBag,
  Briefcase,
  Heart,
  Sun,
  Snowflake,
  PartyPopper,
  AlertCircle
} from 'lucide-react'

const workflows = [
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Complete marketing campaign for new product launches',
    icon: Rocket,
    color: 'bg-green-500',
    category: 'Launch',
    estimatedTime: '2 min',
    roi: '12x average',
    popular: true,
    tasks: [
      'Landing page creation',
      'Email sequences (pre-launch, launch, follow-up)',
      'Social media campaign (30 posts)',
      'Google & Meta ad campaigns',
      'PR templates & outreach',
      'Influencer outreach',
      'Content calendar'
    ]
  },
  {
    id: 'competitor-destruction',
    name: 'Competitor Destruction',
    description: 'Outrank and outmarket any competitor systematically',
    icon: Target,
    color: 'bg-red-500',
    category: 'Competition',
    estimatedTime: '3 min',
    roi: '8x average',
    popular: true,
    tasks: [
      'Competitor weakness analysis',
      'Counter-positioning content',
      'SEO gap exploitation',
      'Ad campaigns targeting their keywords',
      'Social listening & response',
      'Comparison landing pages',
      'Review generation campaign'
    ]
  },
  {
    id: 'event-marketing',
    name: 'Event Marketing',
    description: 'Fill your event with the perfect attendees',
    icon: Calendar,
    color: 'bg-blue-500',
    category: 'Events',
    estimatedTime: '2 min',
    roi: '15x average',
    tasks: [
      'Event landing page',
      'Registration system',
      'Email sequences (save date, register, reminder)',
      'Social media countdown',
      'Partner outreach templates',
      'Day-of coverage plan',
      'Post-event nurture'
    ]
  },
  {
    id: 'b2b-lead-gen',
    name: 'B2B Lead Generation',
    description: 'Generate qualified enterprise leads on autopilot',
    icon: Briefcase,
    color: 'bg-purple-500',
    category: 'Lead Gen',
    estimatedTime: '3 min',
    roi: '20x average',
    popular: true,
    tasks: [
      'LinkedIn outreach sequences',
      'Executive email templates',
      'Case study creation',
      'Webinar funnel',
      'Lead scoring system',
      'CRM integration',
      'Nurture campaigns'
    ]
  },
  {
    id: 'seasonal-campaign',
    name: 'Seasonal Campaign',
    description: 'Capitalize on holidays and seasonal trends',
    icon: Sun,
    color: 'bg-yellow-500',
    category: 'Seasonal',
    estimatedTime: '2 min',
    roi: '10x average',
    tasks: [
      '6-week campaign timeline',
      'Themed content creation',
      'Email sequences with urgency',
      'Social media calendar',
      'Ad campaigns with countdowns',
      'Landing pages with seasonal design',
      'Inventory alerts'
    ]
  },
  {
    id: 'flash-sale',
    name: 'Flash Sale',
    description: 'Create urgency and drive immediate sales',
    icon: Zap,
    color: 'bg-orange-500',
    category: 'Sales',
    estimatedTime: '1 min',
    roi: '6x average',
    tasks: [
      'Countdown landing pages',
      'Urgency email blasts',
      'Social media announcements',
      'SMS campaigns',
      'Retargeting ads',
      'Abandoned cart recovery',
      'Post-sale upsells'
    ]
  },
  {
    id: 'customer-winback',
    name: 'Customer Win-Back',
    description: 'Re-engage dormant customers with targeted campaigns',
    icon: Heart,
    color: 'bg-pink-500',
    category: 'Retention',
    estimatedTime: '2 min',
    roi: '9x average',
    tasks: [
      'Segmentation of dormant customers',
      'Personalized win-back emails',
      'Special offers & incentives',
      'Survey to understand why they left',
      'Retargeting campaigns',
      'VIP re-engagement program',
      'Success tracking'
    ]
  },
  {
    id: 'referral-program',
    name: 'Referral Program Launch',
    description: 'Turn customers into your sales force',
    icon: Users,
    color: 'bg-indigo-500',
    category: 'Growth',
    estimatedTime: '3 min',
    roi: '25x average',
    tasks: [
      'Referral program design',
      'Landing pages for referrers',
      'Email announcement',
      'Social sharing tools',
      'Tracking system',
      'Reward fulfillment',
      'Leaderboard & gamification'
    ]
  },
  {
    id: 'content-blitz',
    name: 'Content Blitz',
    description: '30 days of content created and scheduled instantly',
    icon: Sparkles,
    color: 'bg-teal-500',
    category: 'Content',
    estimatedTime: '4 min',
    roi: '7x average',
    tasks: [
      '30 blog posts',
      '60 social media posts',
      '10 email newsletters',
      'SEO optimization',
      'Content calendar',
      'Distribution strategy',
      'Performance tracking'
    ]
  },
  {
    id: 'black-friday',
    name: 'Black Friday/Cyber Monday',
    description: 'Maximize revenue during the biggest shopping days',
    icon: ShoppingBag,
    color: 'bg-gray-800',
    category: 'Seasonal',
    estimatedTime: '3 min',
    roi: '30x average',
    special: true,
    tasks: [
      'Early bird campaigns',
      'Countdown sequences',
      'Doorbuster deals',
      'Email blasts every 6 hours',
      'Social media frenzy',
      'Retargeting campaigns',
      'Cart abandonment recovery'
    ]
  }
]

const categories = ['All', 'Launch', 'Competition', 'Events', 'Lead Gen', 'Seasonal', 'Sales', 'Retention', 'Growth', 'Content']

export default function WorkflowsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredWorkflow, setHoveredWorkflow] = useState<string | null>(null)

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || workflow.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLaunchWorkflow = (workflowId: string) => {
    router.push(`/workflows/${workflowId}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">One-Click Workflows</h1>
        <p className="text-gray-600 mt-1">Launch complete marketing campaigns with a single click</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="robinhood-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Workflows</p>
                <p className="text-2xl font-bold">{workflows.length}</p>
              </div>
              <Zap className="h-8 w-8 text-[#00D632]" />
            </div>
          </CardContent>
        </Card>
        <Card className="robinhood-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Time Saved</p>
                <p className="text-2xl font-bold">40 hrs/mo</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="robinhood-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg ROI</p>
                <p className="text-2xl font-bold">12x</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="robinhood-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tasks Automated</p>
                <p className="text-2xl font-bold">847</p>
              </div>
              <Sparkles className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-[#00D632] hover:bg-[#00C02B]' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <Card 
            key={workflow.id} 
            className={`robinhood-card hover:shadow-lg transition-all cursor-pointer ${
              workflow.special ? 'ring-2 ring-[#00D632]' : ''
            }`}
            onMouseEnter={() => setHoveredWorkflow(workflow.id)}
            onMouseLeave={() => setHoveredWorkflow(null)}
            onClick={() => handleLaunchWorkflow(workflow.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className={`p-3 rounded-lg ${workflow.color} text-white`}>
                  <workflow.icon className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-2">
                  {workflow.popular && (
                    <Badge variant="outline" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {workflow.special && (
                    <Badge className="bg-[#00D632] text-white text-xs">
                      Special
                    </Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-xl">{workflow.name}</CardTitle>
              <CardDescription>{workflow.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Quick Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{workflow.estimatedTime}</span>
                  </div>
                  <div className="flex items-center text-green-600 font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{workflow.roi}</span>
                  </div>
                </div>

                {/* Tasks Preview */}
                <div className={`space-y-1 transition-all ${
                  hoveredWorkflow === workflow.id ? 'max-h-40' : 'max-h-0'
                } overflow-hidden`}>
                  <p className="text-xs font-medium text-gray-600 mb-1">This workflow includes:</p>
                  {workflow.tasks.slice(0, 4).map((task, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                      <span>{task}</span>
                    </div>
                  ))}
                  {workflow.tasks.length > 4 && (
                    <p className="text-xs text-gray-500 italic">
                      +{workflow.tasks.length - 4} more tasks
                    </p>
                  )}
                </div>

                {/* Launch Button */}
                <Button 
                  className="w-full bg-[#00D632] hover:bg-[#00C02B] text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleLaunchWorkflow(workflow.id)
                  }}
                >
                  Launch Workflow
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No workflows found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
