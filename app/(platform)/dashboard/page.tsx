'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getCurrentUser, getRevenueAttribution, getCampaigns, getCompetitorIntelligence } from '@/lib/supabase/client'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Target, 
  AlertTriangle, 
  Rocket,
  BarChart3,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus
} from 'lucide-react'

interface DashboardMetrics {
  totalRevenue: number
  revenueGrowth: number
  activeCampaigns: number
  roi: number
  conversionRate: number
  competitorAlerts: number
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalRevenue: 0,
    revenueGrowth: 0,
    activeCampaigns: 0,
    roi: 0,
    conversionRate: 0,
    competitorAlerts: 0
  })
  const [revenueData, setRevenueData] = useState<any[]>([])
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [competitorAlerts, setCompetitorAlerts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          router.push('/login')
          return
        }

        setUser(currentUser)

        // Get user profile to get org_id
        const { data: userProfile } = await supabase
          .from('users')
          .select('org_id, xp, level')
          .eq('id', currentUser.id)
          .single()

        if (!userProfile) {
          router.push('/onboarding')
          return
        }

        const orgId = userProfile.org_id

        // Load all dashboard data
        const [revenueResult, campaignsResult, competitorResult] = await Promise.all([
          getRevenueAttribution(orgId, '30d'),
          getCampaigns(orgId),
          getCompetitorIntelligence(orgId)
        ])

        setRevenueData(revenueResult || [])
        setCampaigns(campaignsResult || [])
        setCompetitorAlerts(competitorResult || [])

        // Calculate metrics
        const totalRevenue = revenueResult?.reduce((sum, r) => sum + r.revenue, 0) || 0
        const activeCampaigns = campaignsResult?.filter(c => c.status === 'active').length || 0
        const totalSpent = campaignsResult?.reduce((sum, c) => sum + c.spent, 0) || 0
        const roi = totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0
        const competitorAlertsCount = competitorResult?.filter(c => c.alerts_enabled).length || 0

        setMetrics({
          totalRevenue,
          revenueGrowth: 23.5, // Mock data for now
          activeCampaigns,
          roi,
          conversionRate: 3.2, // Mock data for now
          competitorAlerts: competitorAlertsCount
        })

      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [router])

  const handleLaunchProduct = () => {
    router.push('/workflows/product-launch')
  }

  const handleDestroyCompetitor = () => {
    router.push('/workflows/competitor-analysis')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your marketing command center...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketing Command Center</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your marketing.</p>
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleLaunchProduct} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <Rocket className="w-4 h-4 mr-2" />
                Launch Product
              </Button>
              <Button onClick={handleDestroyCompetitor} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                <Target className="w-4 h-4 mr-2" />
                Destroy Competitor
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(metrics.totalRevenue)}</div>
              <p className="text-xs text-gray-600 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                +{formatPercentage(metrics.revenueGrowth)} from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatPercentage(metrics.roi)}</div>
              <p className="text-xs text-gray-600">Return on investment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Zap className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{metrics.activeCampaigns}</div>
              <p className="text-xs text-gray-600">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Competitor Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{metrics.competitorAlerts}</div>
              <p className="text-xs text-gray-600">Monitoring {formatNumber(metrics.competitorAlerts)} competitors</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Performance</CardTitle>
                <CardDescription>Your revenue growth over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-center space-y-2">
                    <BarChart3 className="w-12 h-12 text-blue-600 mx-auto" />
                    <p className="text-gray-600">Revenue chart will be implemented with Chart.js</p>
                    <p className="text-sm text-gray-500">Showing {revenueData.length} revenue events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Launch workflows with one click</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleLaunchProduct} className="w-full justify-start" variant="outline">
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch New Product
                </Button>
                <Button onClick={() => router.push('/workflows/event-marketing')} className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Event Marketing
                </Button>
                <Button onClick={() => router.push('/workflows/content-creation')} className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Content Creation
                </Button>
                <Button onClick={handleDestroyCompetitor} className="w-full justify-start" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Competitor Analysis
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Competitor Activity</CardTitle>
                <CardDescription>Stay ahead of the competition</CardDescription>
              </CardHeader>
              <CardContent>
                {competitorAlerts.length > 0 ? (
                  <div className="space-y-3">
                    {competitorAlerts.slice(0, 3).map((alert, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                        <Eye className="w-4 h-4 text-orange-600" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.competitor_name}</p>
                          <p className="text-xs text-gray-600">{alert.data_type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">No competitor activity detected</p>
                    <Button onClick={() => router.push('/intelligence')} variant="link" className="text-xs">
                      Set up monitoring
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>Monitor your running marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              {campaigns.length > 0 ? (
                <div className="space-y-4">
                  {campaigns.filter(c => c.status === 'active').map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">{campaign.type}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium">{formatCurrency(campaign.revenue)}</p>
                        <p className="text-xs text-gray-600">
                          ROI: {campaign.spent > 0 ? formatPercentage(((campaign.revenue - campaign.spent) / campaign.spent) * 100) : 'N/A'}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Rocket className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active campaigns</h3>
                  <p className="text-gray-600 mb-4">Launch your first marketing campaign to get started</p>
                  <Button onClick={handleLaunchProduct}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
