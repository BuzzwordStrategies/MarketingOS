'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Mail,
  Globe,
  MousePointer,
  ShoppingCart,
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Download,
  Filter,
  ArrowUp,
  ArrowDown,
  Zap,
  CheckCircle,
  FileText,
  Video,
  Sparkles
} from 'lucide-react'
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Sankey,
  Rectangle
} from 'recharts'

// Mock data for revenue attribution
const revenueData = [
  { date: 'Jan 1', revenue: 12500, campaigns: 8, conversions: 145 },
  { date: 'Jan 8', revenue: 15200, campaigns: 10, conversions: 178 },
  { date: 'Jan 15', revenue: 18900, campaigns: 12, conversions: 215 },
  { date: 'Jan 22', revenue: 22400, campaigns: 14, conversions: 267 },
  { date: 'Jan 29', revenue: 28700, campaigns: 16, conversions: 324 },
  { date: 'Feb 5', revenue: 31200, campaigns: 18, conversions: 356 },
  { date: 'Feb 12', revenue: 35800, campaigns: 20, conversions: 398 },
]

const channelPerformance = [
  { channel: 'Social Media', revenue: 45280, conversions: 523, roi: 4.2, color: '#00D632' },
  { channel: 'Email Marketing', revenue: 38920, conversions: 412, roi: 8.7, color: '#00A827' },
  { channel: 'Google Ads', revenue: 32150, conversions: 287, roi: 3.1, color: '#008220' },
  { channel: 'SEO', revenue: 28470, conversions: 356, roi: 12.4, color: '#006518' },
  { channel: 'Meta Ads', revenue: 19830, conversions: 198, roi: 2.8, color: '#004810' },
]

const campaignAttribution = [
  {
    campaign: 'Product Launch - Widget Pro',
    channel: 'Multi-channel',
    revenue: 24780,
    conversions: 187,
    status: 'active',
    trend: 'up',
    attribution: [
      { source: 'Email sequence', revenue: 8920, percentage: 36 },
      { source: 'Social posts', revenue: 6450, percentage: 26 },
      { source: 'Google Ads', revenue: 5230, percentage: 21 },
      { source: 'Landing page', revenue: 4180, percentage: 17 },
    ]
  },
  {
    campaign: 'Black Friday Sale',
    channel: 'Email + Ads',
    revenue: 42350,
    conversions: 412,
    status: 'completed',
    trend: 'up',
    attribution: [
      { source: 'Email blasts', revenue: 18640, percentage: 44 },
      { source: 'Retargeting ads', revenue: 12705, percentage: 30 },
      { source: 'Social urgency', revenue: 8470, percentage: 20 },
      { source: 'SMS alerts', revenue: 2535, percentage: 6 },
    ]
  },
  {
    campaign: 'B2B Lead Gen',
    channel: 'LinkedIn + Email',
    revenue: 31200,
    conversions: 78,
    status: 'active',
    trend: 'stable',
    attribution: [
      { source: 'LinkedIn outreach', revenue: 15600, percentage: 50 },
      { source: 'Webinar funnel', revenue: 9360, percentage: 30 },
      { source: 'Case studies', revenue: 4680, percentage: 15 },
      { source: 'Email nurture', revenue: 1560, percentage: 5 },
    ]
  }
]

const topPerformingContent = [
  { title: '10 Ways to Boost Productivity', type: 'Blog', views: 45230, conversions: 234, revenue: 12450 },
  { title: 'Product Demo Video', type: 'Video', views: 28190, conversions: 189, revenue: 9870 },
  { title: 'Free Tool Calculator', type: 'Tool', views: 19450, conversions: 156, revenue: 8230 },
  { title: 'Customer Success Story', type: 'Case Study', views: 12780, conversions: 98, revenue: 6540 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedCampaign, setSelectedCampaign] = useState(campaignAttribution[0])

  const totalRevenue = channelPerformance.reduce((sum, channel) => sum + channel.revenue, 0)
  const totalConversions = channelPerformance.reduce((sum, channel) => sum + channel.conversions, 0)
  const averageROI = channelPerformance.reduce((sum, channel) => sum + channel.roi, 0) / channelPerformance.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revenue Attribution</h1>
          <p className="text-gray-600 mt-1">Track exactly what's driving your revenue</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="robinhood-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">32% from last period</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-[#00D632]" />
            </div>
          </CardContent>
        </Card>

        <Card className="robinhood-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Conversions</p>
                <p className="text-3xl font-bold">{totalConversions.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">28% from last period</span>
                </div>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="robinhood-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average ROI</p>
                <p className="text-3xl font-bold">{averageROI.toFixed(1)}x</p>
                <div className="flex items-center mt-2 text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Above target</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="robinhood-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <p className="text-3xl font-bold">24</p>
                <div className="flex items-center mt-2 text-blue-600">
                  <Zap className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">All performing well</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Over Time */}
      <Card className="robinhood-card">
        <CardHeader>
          <CardTitle>Revenue Growth</CardTitle>
          <CardDescription>Track your revenue growth over time</CardDescription>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card className="robinhood-card">
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
            <CardDescription>Revenue by marketing channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E3E5E8" />
                <XAxis type="number" stroke="#6F7785" />
                <YAxis dataKey="channel" type="category" stroke="#6F7785" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E3E5E8',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="revenue" fill="#00D632" radius={[0, 4, 4, 0]}>
                  {channelPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {channelPerformance.map((channel) => (
                <div key={channel.channel} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                    <span>{channel.channel}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{channel.conversions} conversions</span>
                    <Badge variant="outline" className="text-green-600">
                      {channel.roi}x ROI
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Attribution */}
        <Card className="robinhood-card">
          <CardHeader>
            <CardTitle>Campaign Attribution</CardTitle>
            <CardDescription>Revenue breakdown by campaign source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {campaignAttribution.map((campaign) => (
                <div
                  key={campaign.campaign}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedCampaign.campaign === campaign.campaign 
                      ? 'border-[#00D632] bg-green-50' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCampaign(campaign)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{campaign.campaign}</h4>
                    <Badge 
                      variant={campaign.status === 'active' ? 'default' : 'secondary'}
                      className={campaign.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{campaign.channel}</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">${campaign.revenue.toLocaleString()}</span>
                      {campaign.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3 text-green-600" />
                      ) : campaign.trend === 'down' ? (
                        <ArrowDown className="h-3 w-3 text-red-600" />
                      ) : (
                        <div className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedCampaign && (
              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium text-sm">Attribution Breakdown</h4>
                {selectedCampaign.attribution.map((source) => (
                  <div key={source.source} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{source.source}</span>
                      <span className="font-medium">${source.revenue.toLocaleString()}</span>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-[#00D632] rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{source.percentage}% of campaign revenue</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Content */}
      <Card className="robinhood-card">
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Content pieces driving the most revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Content</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Views</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Conversions</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Revenue</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingContent.map((content, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {content.type === 'Blog' && <FileText className="h-4 w-4 text-blue-600" />}
                        {content.type === 'Video' && <Video className="h-4 w-4 text-purple-600" />}
                        {content.type === 'Tool' && <Zap className="h-4 w-4 text-orange-600" />}
                        {content.type === 'Case Study' && <Users className="h-4 w-4 text-green-600" />}
                        <span className="font-medium">{content.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{content.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">{content.views.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{content.conversions}</td>
                    <td className="py-3 px-4 text-right font-medium">${content.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge className="bg-green-100 text-green-700">
                        {((content.conversions / content.views) * 100).toFixed(1)}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="robinhood-card border-[#00D632]">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-[#00D632]" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Recommendations to increase revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Increase Email Frequency</p>
                <p className="text-sm text-gray-600">Your email campaigns have 8.7x ROI. Increasing from 2 to 3 emails/week could generate an additional $12,450/month.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Optimize Google Ads Bidding</p>
                <p className="text-sm text-gray-600">Your top 5 keywords are underperforming. Adjusting bids could improve ROI from 3.1x to 4.5x.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Launch Referral Program</p>
                <p className="text-sm text-gray-600">Based on your customer LTV, a referral program could add $25,000/month in revenue.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
