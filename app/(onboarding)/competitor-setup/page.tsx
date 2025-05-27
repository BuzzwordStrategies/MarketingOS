'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Plus, 
  X, 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Users, 
  Globe,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

// Mock competitor data based on industry
const competitorSuggestions: Record<string, Array<{
  name: string
  domain: string
  description: string
  metrics: {
    traffic: string
    adSpend: string
    socialFollowers: string
  }
}>> = {
  'e-commerce': [
    {
      name: 'ShopifyPlus Store',
      domain: 'shopifyplus.com',
      description: 'Leading e-commerce platform',
      metrics: { traffic: '2.5M/mo', adSpend: '$125K/mo', socialFollowers: '450K' }
    },
    {
      name: 'BigCommerce Pro',
      domain: 'bigcommerce.com',
      description: 'Enterprise e-commerce solution',
      metrics: { traffic: '1.8M/mo', adSpend: '$95K/mo', socialFollowers: '320K' }
    },
    {
      name: 'WooExpress',
      domain: 'wooexpress.com',
      description: 'WordPress commerce leader',
      metrics: { traffic: '3.2M/mo', adSpend: '$180K/mo', socialFollowers: '580K' }
    }
  ],
  'saas': [
    {
      name: 'TechCorp Solutions',
      domain: 'techcorp.io',
      description: 'B2B SaaS platform',
      metrics: { traffic: '850K/mo', adSpend: '$75K/mo', socialFollowers: '125K' }
    },
    {
      name: 'CloudBase Pro',
      domain: 'cloudbase.com',
      description: 'Cloud infrastructure SaaS',
      metrics: { traffic: '1.2M/mo', adSpend: '$110K/mo', socialFollowers: '200K' }
    },
    {
      name: 'DataFlow Systems',
      domain: 'dataflow.io',
      description: 'Data analytics platform',
      metrics: { traffic: '650K/mo', adSpend: '$55K/mo', socialFollowers: '95K' }
    }
  ]
}

export default function CompetitorSetupPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCompetitors, setSelectedCompetitors] = useState<typeof competitorSuggestions['e-commerce']>([])
  const [suggestions, setSuggestions] = useState<typeof competitorSuggestions['e-commerce']>([])
  const [customCompetitor, setCustomCompetitor] = useState('')

  useEffect(() => {
    // Get industry from previous step
    const onboardingData = localStorage.getItem('onboarding')
    if (onboardingData) {
      const { industry } = JSON.parse(onboardingData)
      const industrySuggestions = competitorSuggestions[industry] || competitorSuggestions['saas']
      setSuggestions(industrySuggestions)
    }
  }, [])

  const handleAddCompetitor = (competitor: typeof suggestions[0]) => {
    if (selectedCompetitors.length < 5 && !selectedCompetitors.find(c => c.name === competitor.name)) {
      setSelectedCompetitors([...selectedCompetitors, competitor])
    }
  }

  const handleRemoveCompetitor = (name: string) => {
    setSelectedCompetitors(selectedCompetitors.filter(c => c.name !== name))
  }

  const handleAddCustom = () => {
    if (customCompetitor && selectedCompetitors.length < 5) {
      const newCompetitor = {
        name: customCompetitor,
        domain: customCompetitor.toLowerCase().replace(/\s+/g, '') + '.com',
        description: 'Custom competitor',
        metrics: { traffic: 'Analyzing...', adSpend: 'Analyzing...', socialFollowers: 'Analyzing...' }
      }
      setSelectedCompetitors([...selectedCompetitors, newCompetitor])
      setCustomCompetitor('')
    }
  }

  const handleContinue = () => {
    if (selectedCompetitors.length > 0) {
      // Store competitor data
      const onboardingData = JSON.parse(localStorage.getItem('onboarding') || '{}')
      localStorage.setItem('onboarding', JSON.stringify({
        ...onboardingData,
        competitors: selectedCompetitors
      }))
      router.push('/onboarding/service-selection')
    }
  }

  return (
    <Card className="robinhood-card animate-fade-in">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold mb-4">
          Who's Your Competition?
        </CardTitle>
        <CardDescription className="text-lg">
          We'll monitor their every move and help you stay ahead
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* What We'll Track */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
            What We'll Track For You
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              <span>Ad spend changes</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              <span>New campaigns</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              <span>Content strategies</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              <span>SEO movements</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              <span>Social media activity</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              <span>Pricing changes</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="space-y-2">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for competitors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div>
          <h3 className="font-medium mb-3">Suggested competitors in your industry</h3>
          <div className="space-y-3">
            {suggestions.map((competitor) => (
              <div
                key={competitor.name}
                className="border rounded-lg p-4 hover:border-[#00D632] transition-colors cursor-pointer"
                onClick={() => handleAddCompetitor(competitor)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{competitor.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {competitor.domain}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{competitor.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Globe className="h-3 w-3 mr-1" />
                        {competitor.metrics.traffic}
                      </span>
                      <span className="flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        {competitor.metrics.adSpend}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {competitor.metrics.socialFollowers}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddCompetitor(competitor)
                    }}
                    disabled={selectedCompetitors.find(c => c.name === competitor.name) !== undefined}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Custom */}
        <div>
          <h3 className="font-medium mb-3">Add custom competitor</h3>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter competitor name or website"
              value={customCompetitor}
              onChange={(e) => setCustomCompetitor(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustom()}
            />
            <Button onClick={handleAddCustom} disabled={!customCompetitor || selectedCompetitors.length >= 5}>
              Add
            </Button>
          </div>
        </div>

        {/* Selected Competitors */}
        {selectedCompetitors.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">
              Selected competitors ({selectedCompetitors.length}/5)
            </h3>
            <div className="space-y-2">
              {selectedCompetitors.map((competitor) => (
                <div
                  key={competitor.name}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-green-600" />
                    <div>
                      <span className="font-medium">{competitor.name}</span>
                      <span className="text-sm text-gray-600 ml-2">{competitor.domain}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveCompetitor(competitor.name)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={selectedCompetitors.length === 0}
          className="w-full robinhood-button"
          size="lg"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )
}
