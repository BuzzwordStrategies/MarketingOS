'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Zap,
  Calendar,
  Target,
  Award,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Rocket,
  ShoppingBag,
  Briefcase,
  Heart
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { mockData } from '@/lib/mock-data'

// Get mock data
const revenueData = mockData.revenue.slice(-7).map(item => ({
  date: item.date,
  revenue: item.revenue,
  campaigns: item.campaigns
}))

const sourceData = [
  { name: 'Social Media', value: 35, color: '#00D632' },
  { name: 'SEO', value: 25, color: '#00A827' },
  { name: 'Email', value: 20, color: '#008220' },
  { name: 'Paid Ads', value: 15, color: '#006518' },
  { name: 'Other', value: 5, color: '#004810' },
]

const workflows = [
  { id: 'product-launch', name: 'Product Launch', icon: Rocket, description: 'Complete marketing campaign in one click', color: 'bg-green-500' },
  { id: 'competitor-destruction', name: 'Competitor Destruction', icon: Target, description: 'Outrank and outmarket any competitor', color: 'bg-red-500' },
  { id: 'event-marketing', name: 'Event Marketing', icon: Calendar, description: 'Fill your event with perfect attendees', color: 'bg-blue-500' },
  { id: 'b2b-lead-gen', name: 'Lead Generation', icon: Briefcase, description: 'Generate qualified B2B leads on autopilot', color: 'bg-purple-500' },
]

// Dynamic icon mapping for activities
const iconMap: Record<string, any> = {
  Rocket,
  DollarSign,
  AlertCircle,
  Sparkles,
  TrendingUp,
  CheckCircle
}

export default function DashboardPage() {
  const router = useRouter()
  const [metrics, setMetrics] = useState({
    revenue: 47892,
    campaigns: 12,
    roi: 347,
    leads: 1284
  })

  // Get activities from mock data
  const activities = mockData.activity.slice(0, 5).map(activity => {
    const Icon = iconMap[activity.icon] || CheckCircle
    return {
      ...activity,
      icon: Icon,
      type: activity.color === 'red' ? 'alert' : activity.color === 'green' ? 'success' : 'info'
    }
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        campaigns: prev.campaigns,
        roi: prev.roi + Math.floor(Math.random() * 5),
        leads: prev.leads + Math.floor(Math.random() * 10)
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleWorkflowClick = (workflowId: string) => {
    router.push(`/workflows/${workflowId}`)
  }

  const handleCompetitorAlert = () => {
    router.push('/competitors')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Josh</h1>
        <p className="text-gray-600 mt-1">Your AI marketing team has been busy while you were away</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="robinhood-card">
          <CardHeader className="pb-2">
            <CardDescription className="robinhood-label">Total Revenue Generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="robinhood-metric">${metrics.revenue.toLocaleString()}</p>
                <div className="flex items-center mt-1 text-[#00D632]">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">23% from last week</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-[#00D632]" />
            </div>
          </CardContent>
        </Card>

        <Card className="robinhood-card">
          <CardHeader className="pb-2">
            <CardDescription className="robinhood-label">Active Campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="robinhood-metric">{metrics.campaigns}</p>
                <div className="flex items-center mt-1 text-gray-600">
                  <Activity className="h-4 w-4 mr-1" />
                  <span className="text-sm">All performing well</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="robinhood-card">
          <CardHeader className="pb-2">
            <CardDescription className="robinhood-label">Average ROI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="robinhood-metric">{metrics.roi}%</p>
                <div className="flex items-center mt-1 text-[#00D632]">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Above industry avg</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="robinhood-card">
          <CardHeader className="pb-2">
            <CardDescription className="robinhood-label">Leads Generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="robinhood-metric">{metrics.leads.toLocaleString()}</p>
                <div className="flex items-center mt-1 text-[#00D632]">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">84% qualified</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Launch Workflows */}
      <Card className="robinhood-card">
        <CardHeader>
          <CardTitle>Quick Launch Workflows</CardTitle>
          <CardDescription>Launch complete marketing campaigns with one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflows.map((workflow) => (
              <Button
                key={workflow.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:border-[#00D632] transition-all group"
                onClick={() => handleWorkflowClick(workflow.id)}
              >
                <div className={`p-3 rounded-lg ${workflow.color} text-white group-hover:scale-110 transition-transform`}>
                  <workflow.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <p className="font-medium">{workflow.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{workflow.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="robinhood-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Attribution</CardTitle>
            <CardDescription>See exactly what's driving your revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E3E5E8" />
                <XAxis dataKey="date" stroke="#6F7785" />
                <YAxis stroke="#6F7785" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E3E5E8',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#00D632" 
                  fill="#00D632" 
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Sources */}
        <Card className="robinhood-card">
          <CardHeader>
            <CardTitle>Revenue by Source</CardTitle>
            <CardDescription>Channel performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {sourceData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm">{source.name}</span>
                  </div>
                  <span className="text-sm font-medium">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="robinhood-card">
        <CardHeader>
          <CardTitle>Live Activity Feed</CardTitle>
          <CardDescription>Real-time updates from your AI marketing team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 animate-slide-in">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'success' ? 'bg-green-100 text-green-600' :
                  activity.type === 'alert' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitor Alert */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="font-medium text-red-900">Competitor Alert</p>
            <p className="text-sm text-red-700">Acme Corp just launched a new campaign targeting your keywords</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="border-red-600 text-red-600 hover:bg-red-50"
          onClick={handleCompetitorAlert}
        >
          Respond Now
        </Button>
      </div>
    </div>
  )
}
