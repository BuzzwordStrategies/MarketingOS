'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Zap, 
  Users, 
  TrendingUp, 
  Mail, 
  Search, 
  Video, 
  Mic, 
  Globe, 
  Target,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  DollarSign,
  AlertCircle,
  Sparkles,
  Rocket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Workflows', href: '/workflows', icon: Zap, badge: 'NEW' },
  { name: 'Competitors', href: '/competitors', icon: Users, alert: true },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
]

const services = [
  { name: 'Social Media', href: '/services/social-media', icon: Globe },
  { name: 'SEO', href: '/services/seo', icon: Search },
  { name: 'Google Ads', href: '/services/google-ads', icon: Target },
  { name: 'Meta Ads', href: '/services/meta-ads', icon: Target },
  { name: 'Email Marketing', href: '/services/email', icon: Mail },
  { name: 'Content Creation', href: '/services/content', icon: FileText },
  { name: 'Video Production', href: '/services/video', icon: Video },
  { name: 'Podcast Production', href: '/services/podcast', icon: Mic },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [revenue, setRevenue] = useState(47892)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Competitor Alert', message: 'Acme Corp increased ad spend 45%', time: '2m ago' },
    { id: 2, title: 'Campaign Success', message: 'Product launch exceeded goals by 23%', time: '1h ago' },
    { id: 3, title: 'New Lead', message: '5 new enterprise leads from LinkedIn', time: '3h ago' },
  ])

  // Simulate revenue updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 100))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-[#E3E5E8] transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-[#E3E5E8]">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-[#00D632]" />
                <span className="font-bold text-xl">MarketingOS</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-colors relative",
                    isActive
                      ? "bg-[#00D632] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                  {!collapsed && (
                    <>
                      <span className="font-medium">{item.name}</span>
                      {item.badge && (
                        <Badge className="ml-auto" variant="secondary">
                          {item.badge}
                        </Badge>
                      )}
                      {item.alert && (
                        <div className="ml-auto w-2 h-2 bg-[#FF5530] rounded-full animate-pulse" />
                      )}
                    </>
                  )}
                </Link>
              )
            })}

            {!collapsed && (
              <>
                <div className="pt-4 pb-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Services
                  </p>
                </div>
                {services.map((service) => {
                  const isActive = pathname === service.href
                  return (
                    <Link
                      key={service.name}
                      href={service.href}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-lg transition-colors",
                        isActive
                          ? "bg-[#00D632] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <service.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{service.name}</span>
                    </Link>
                  )
                })}
              </>
            )}
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-[#E3E5E8]">
            <Link
              href="/settings"
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Settings className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span className="font-medium">Settings</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E3E5E8] px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Revenue Display */}
            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-[#6F7785]">Total Revenue Generated</p>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-[#00D632]" />
                  <span className="text-3xl font-bold">{revenue.toLocaleString()}</span>
                  <Badge className="bg-[#00D632] text-white">
                    ↑ 23%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-[#FF5530] rounded-full" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium">{notification.title}</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <span className="text-sm text-gray-600 mt-1">{notification.message}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Quick Launch */}
              <Button className="bg-[#00D632] hover:bg-[#00C02B] text-white">
                <Rocket className="h-4 w-4 mr-2" />
                Quick Launch
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full h-14 w-14 bg-[#00D632] hover:bg-[#00C02B] text-white shadow-lg"
            >
              <Zap className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Rocket className="h-4 w-4 mr-2" />
              Launch Product Campaign
            </DropdownMenuItem>
            <DropdownMenuItem>
              <AlertCircle className="h-4 w-4 mr-2" />
              Destroy Competitor
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TrendingUp className="h-4 w-4 mr-2" />
              Generate Leads
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
