'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth/auth-context'
import { RevenueCounter, PremiumButton, PredictiveLoader } from '@/components/ui/PremiumAnimations'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Users, 
  Zap,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Play,
  Eye,
  AlertTriangle
} from 'lucide-react'

// Mock data for demonstration - will be replaced with real data
const mockRevenueData = {
  totalRevenue: 47832,
  previousRevenue: 42156,
  todayRevenue: 2847,
  projectedWeekly: 15420,
  attributionConfidence: 94
}

const mockServices = [
  {
    id: 'social_media',
    name: 'Social Media',
    icon: Users,
    tier: 'BASE',
    status: 'active',
    performance: {
      revenue: 18420,
      roi: 340,
      posts: 24,
      engagement: 8.7
    },
    recentActivity: 'Posted 3 new campaigns today'
  },
  {
    id: 'seo',
    name: 'SEO Optimization',
    icon: TrendingUp,
    tier: 'STANDARD',
    status: 'active',
    performance: {
      revenue: 12650,
      roi: 280,
      keywords: 156,
      ranking: 12
    },
    recentActivity: '12 keywords moved to page 1'
  },
  {
    id: 'paid_ads',
    name: 'Paid Advertising',
    icon: Target,
    tier: 'PREMIUM',
    status: 'active',
    performance: {
      revenue: 16762,
      roi: 420,
      campaigns: 8,
      ctr: 3.2
    },
    recentActivity: 'New campaign launched 2 hours ago'
  },
  {
    id: 'content',
    name: 'Content Creation',
    icon: BarChart3,
    tier: 'BASE',
    status: 'pending',
    performance: {
      revenue: 0,
      roi: 0,
      articles: 0,
      views: 0
    },
    recentActivity: 'Setup required'
  }
]

const mockCompetitorAlerts = [
  {
    id: 1,
    competitor: 'Competitor A',
    type: 'ad_spend_increase',
    significance: 85,
    description: 'Increased ad spend by 47% this week',
    action: 'Consider increasing budget for competing keywords'
  },
  {
    id: 2,
    competitor: 'Competitor B',
    type: 'new_campaign',
    significance: 72,
    description: 'Launched aggressive campaign targeting your keywords',
    action: 'Review and optimize current ad copy'
  }
]

export default function DashboardPage() {
  const { userProfile, tier } = useAuth()
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)

  const timeframes = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ]

  const handleLaunchWorkflow = () => {
    setIsLoading(true)
    // Simulate workflow launch
    setTimeout(() => setIsLoading(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Revenue Dashboard - Robinhood Style */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Revenue Attribution</h2>
            <p className="text-gray-600">Real-time revenue tracking with attribution confidence</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setSelectedTimeframe(tf.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTimeframe === tf.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Revenue Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <RevenueCounter 
                value={mockRevenueData.totalRevenue}
                previousValue={mockRevenueData.previousRevenue}
                className="mb-2"
              />
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <ArrowUpRight className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">
                    +{((mockRevenueData.totalRevenue - mockRevenueData.previousRevenue) / mockRevenueData.previousRevenue * 100).toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500">vs last period</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">
                    {mockRevenueData.attributionConfidence}% attribution confidence
                  </span>
                </div>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Today's Revenue</p>
                    <p className="text-2xl font-bold text-green-900">
                      ${mockRevenueData.todayRevenue.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Projected (7d)</p>
                    <p className="text-2xl font-bold text-blue-900">
                      ${mockRevenueData.projectedWeekly.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Quick Launch</h3>
              <p className="text-sm text-purple-700 mb-4">
                Launch a complete product marketing campaign in one click
              </p>
              {isLoading ? (
                <PredictiveLoader 
                  taskType="Product Launch Campaign"
                  estimatedDuration={3000}
                />
              ) : (
                <PremiumButton 
                  onClick={handleLaunchWorkflow}
                  className="w-full"
                  variant="primary"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Launch Campaign
                </PremiumButton>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Professional Growth</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Level {userProfile?.professional_level || 1}</span>
                  <span className="text-gray-500">{userProfile?.expertise_score || 0} XP</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    style={{ width: `${(userProfile?.professional_level || 1)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockServices.map((service) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 cursor-pointer group"
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              {/* Service Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <span className="text-xs text-gray-500">{service.tier} Tier</span>
                  </div>
                </div>
                
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'active' ? 'bg-green-400' : 
                  service.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-300'
                }`} />
              </div>

              {/* Performance Metrics */}
              {service.status === 'active' ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue Generated</span>
                    <span className="font-semibold text-green-600">
                      ${service.performance.revenue.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ROI</span>
                    <span className={`font-semibold ${
                      service.performance.roi > 200 ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {service.performance.roi}%
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">{service.recentActivity}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">Setup Required</span>
                  </div>
                  <PremiumButton size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Configure
                  </PremiumButton>
                </div>
              )}

              {/* Hover Actions */}
              <motion.div
                className="mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <Eye className="w-3 h-3 mr-1 inline" />
                    View Details
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors">
                    <Zap className="w-3 h-3 mr-1 inline" />
                    Optimize
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Competitor Intelligence Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Competitor Intelligence</h3>
            <p className="text-sm text-gray-600">Real-time alerts and market insights</p>
          </div>
          <PremiumButton size="sm" variant="secondary">
            View All Competitors
          </PremiumButton>
        </div>

        <div className="space-y-4">
          {mockCompetitorAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-lg border-l-4 ${
                alert.significance > 80 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{alert.competitor}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.significance > 80 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.significance}% significance
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                  <p className="text-xs text-gray-600">
                    <strong>Recommended:</strong> {alert.action}
                  </p>
                </div>
                <button className="ml-4 px-3 py-1 text-xs bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Take Action
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
