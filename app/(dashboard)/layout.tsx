'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth/auth-context'
import { PremiumButton } from '@/components/ui/PremiumAnimations'
import { 
  BarChart3, 
  Target, 
  Users, 
  TrendingUp, 
  Settings, 
  Bell,
  Menu,
  X,
  Zap,
  Crown,
  ChevronRight
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { userProfile, tier, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState(3)

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: BarChart3, current: true },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: Target, current: false },
    { name: 'Revenue Attribution', href: '/dashboard/revenue', icon: TrendingUp, current: false },
    { name: 'Competitor Intelligence', href: '/dashboard/competitors', icon: Users, current: false },
    { name: 'Workflows', href: '/dashboard/workflows', icon: Zap, current: false },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings, current: false },
  ]

  const tierColors = {
    FREE: 'text-gray-500',
    STARTER: 'text-blue-500',
    BASE: 'text-green-500',
    STANDARD: 'text-purple-500',
    PREMIUM: 'text-yellow-500',
    LEADER: 'text-red-500'
  }

  const tierIcons = {
    FREE: null,
    STARTER: null,
    BASE: null,
    STANDARD: null,
    PREMIUM: Crown,
    LEADER: Crown
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Adaptive Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-40 w-64 bg-white shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Logo and Brand */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">MarketingOS</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100 lg:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Profile Section */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {userProfile?.full_name?.charAt(0) || userProfile?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userProfile?.full_name || 'User'}
                    </p>
                    <div className="flex items-center space-x-1">
                      <span className={`text-xs font-medium ${tierColors[tier]}`}>
                        {tier}
                      </span>
                      {tierIcons[tier] && React.createElement(tierIcons[tier], {
                        className: `w-3 h-3 ${tierColors[tier]}`
                      })}
                    </div>
                  </div>
                </div>

                {/* Professional Level Progress */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-600">Professional Level</span>
                    <span className="text-xs text-gray-500">{userProfile?.professional_level || 1}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(userProfile?.professional_level || 1)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Consecutive Days Streak */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-gray-600">Daily Streak</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-medium text-orange-600">
                      {userProfile?.consecutive_days || 0} days
                    </span>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        item.current
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-2 border-blue-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                      {item.current && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </motion.a>
                  )
                })}
              </nav>

              {/* Upgrade CTA for Free Users */}
              {tier === 'FREE' && (
                <div className="p-4 m-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Crown className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Upgrade to Pro</span>
                  </div>
                  <p className="text-xs text-blue-700 mb-3">
                    Unlock unlimited campaigns and advanced features
                  </p>
                  <PremiumButton size="sm" className="w-full">
                    Upgrade Now
                  </PremiumButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {userProfile?.full_name?.split(' ')[0] || 'there'}
                </h1>
                <p className="text-sm text-gray-600">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>

              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {userProfile?.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>

        {/* Real-time Status Bar */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
              <div className="text-sm text-gray-500">
                Last sync: {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Expertise Score: {userProfile?.expertise_score || 0}
              </span>
              <div className="flex items-center space-x-1">
                {userProfile?.mastery_areas?.slice(0, 3).map((area, index) => (
                  <span
                    key={area}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
