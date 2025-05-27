'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  ArrowRight, 
  DollarSign, 
  Globe, 
  Search, 
  Target, 
  Mail, 
  FileText, 
  Video, 
  Mic, 
  MapPin,
  Sparkles,
  Package,
  CheckCircle,
  Zap
} from 'lucide-react'

const services = [
  {
    id: 'social-media',
    name: 'Social Media Management',
    description: 'AI creates & schedules posts across all platforms',
    price: 97,
    icon: Globe,
    features: ['30 posts/month', 'All platforms', 'Engagement automation', 'Analytics'],
    popular: true
  },
  {
    id: 'seo',
    name: 'SEO & Content',
    description: 'Rank #1 on Google with AI-optimized content',
    price: 147,
    icon: Search,
    features: ['Keyword research', 'Content creation', 'Technical SEO', 'Backlink building'],
    popular: true
  },
  {
    id: 'google-ads',
    name: 'Google Ads Management',
    description: 'AI optimizes your ads for maximum ROI',
    price: 197,
    icon: Target,
    features: ['Campaign creation', 'Bid optimization', 'A/B testing', 'Conversion tracking']
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Management',
    description: 'Facebook & Instagram ads that convert',
    price: 197,
    icon: Target,
    features: ['Audience targeting', 'Creative generation', 'Budget optimization', 'Retargeting']
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing',
    description: 'Automated campaigns that drive sales',
    price: 97,
    icon: Mail,
    features: ['List management', 'Campaign automation', 'Segmentation', 'A/B testing']
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    description: 'Blog posts, articles, and web copy',
    price: 127,
    icon: FileText,
    features: ['4 blog posts/month', 'SEO optimization', 'Brand voice', 'Distribution']
  },
  {
    id: 'video-production',
    name: 'Video Production',
    description: 'AI-generated videos for all platforms',
    price: 247,
    icon: Video,
    features: ['2 videos/month', 'Script writing', 'Editing', 'Platform optimization']
  },
  {
    id: 'podcast-production',
    name: 'Podcast Production',
    description: 'Complete podcast management',
    price: 197,
    icon: Mic,
    features: ['Episode editing', 'Show notes', 'Distribution', 'Promotion']
  },
  {
    id: 'local-seo',
    name: 'Local SEO & GBP',
    description: 'Dominate local search results',
    price: 97,
    icon: MapPin,
    features: ['Google Business Profile', 'Local citations', 'Review management', 'Local content']
  }
]

const bundles = [
  {
    name: 'Starter Bundle',
    description: 'Perfect for small businesses',
    services: ['social-media', 'seo', 'email-marketing'],
    originalPrice: 341,
    bundlePrice: 247,
    savings: 94
  },
  {
    name: 'Growth Bundle',
    description: 'Scale your business fast',
    services: ['social-media', 'seo', 'google-ads', 'meta-ads', 'email-marketing'],
    originalPrice: 735,
    bundlePrice: 497,
    savings: 238,
    recommended: true
  },
  {
    name: 'Enterprise Bundle',
    description: 'Everything you need to dominate',
    services: ['social-media', 'seo', 'google-ads', 'meta-ads', 'email-marketing', 'content-creation', 'video-production'],
    originalPrice: 1109,
    bundlePrice: 797,
    savings: 312
  }
]

export default function ServiceSelectionPage() {
  const router = useRouter()
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null)
  const [agencyCost, setAgencyCost] = useState(0)

  useEffect(() => {
    // Get company size from previous step to estimate agency cost
    const onboardingData = localStorage.getItem('onboarding')
    if (onboardingData) {
      const { companySize } = JSON.parse(onboardingData)
      const costs = {
        solo: 3000,
        small: 5000,
        medium: 10000,
        large: 25000
      }
      setAgencyCost(costs[companySize as keyof typeof costs] || 5000)
    }
  }, [])

  const toggleService = (serviceId: string) => {
    setSelectedBundle(null)
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId))
    } else {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  const selectBundle = (bundleName: string, serviceIds: string[]) => {
    setSelectedBundle(bundleName)
    setSelectedServices(serviceIds)
  }

  const calculateTotal = () => {
    if (selectedBundle) {
      const bundle = bundles.find(b => b.name === selectedBundle)
      return bundle?.bundlePrice || 0
    }
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

  const total = calculateTotal()
  const savings = agencyCost - total

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      // Store service selection
      const onboardingData = JSON.parse(localStorage.getItem('onboarding') || '{}')
      localStorage.setItem('onboarding', JSON.stringify({
        ...onboardingData,
        services: selectedServices,
        bundle: selectedBundle,
        monthlyPrice: total
      }))
      router.push('/onboarding/ai-personality')
    }
  }

  return (
    <Card className="robinhood-card animate-fade-in max-w-4xl mx-auto">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold mb-4">
          Choose Your AI Marketing Team
        </CardTitle>
        <CardDescription className="text-lg">
          Select individual services or save with a bundle
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Savings Calculator */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Your Savings Calculator
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Compared to traditional agency costs
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Agency cost:</p>
              <p className="text-xl font-bold text-gray-900">${agencyCost.toLocaleString()}/mo</p>
            </div>
          </div>
          <div className="border-t border-green-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">MarketingOS cost:</span>
              <span className="text-2xl font-bold text-green-700">${total}/mo</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-medium">You save:</span>
              <span className="text-xl font-bold text-green-600">
                ${savings.toLocaleString()}/mo ({Math.round((savings / agencyCost) * 100)}%)
              </span>
            </div>
          </div>
        </div>

        {/* Bundle Recommendations */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Recommended Bundles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bundles.map((bundle) => (
              <div
                key={bundle.name}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedBundle === bundle.name 
                    ? 'border-[#00D632] bg-green-50' 
                    : 'hover:border-gray-300'
                } ${bundle.recommended ? 'ring-2 ring-[#00D632]' : ''}`}
                onClick={() => selectBundle(bundle.name, bundle.services)}
              >
                {bundle.recommended && (
                  <Badge className="mb-2 bg-[#00D632] text-white">Most Popular</Badge>
                )}
                <h4 className="font-semibold">{bundle.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{bundle.description}</p>
                <div className="space-y-1 mb-3">
                  {bundle.services.map(serviceId => {
                    const service = services.find(s => s.id === serviceId)
                    return service ? (
                      <div key={serviceId} className="flex items-center text-xs">
                        <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                        <span>{service.name}</span>
                      </div>
                    ) : null
                  })}
                </div>
                <div className="border-t pt-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-sm text-gray-500 line-through">
                        ${bundle.originalPrice}
                      </span>
                      <span className="text-2xl font-bold ml-2">
                        ${bundle.bundlePrice}
                      </span>
                      <span className="text-sm text-gray-600">/mo</span>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      Save ${bundle.savings}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Individual Services */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Or Build Your Own Package
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`border rounded-lg p-4 transition-all ${
                  selectedServices.includes(service.id) 
                    ? 'border-[#00D632] bg-green-50' 
                    : 'hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <service.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold flex items-center">
                        {service.name}
                        {service.popular && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Popular
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => toggleService(service.id)}
                  />
                </div>
                <div className="space-y-1 mb-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600">
                      <CheckCircle className="h-3 w-3 mr-1 text-gray-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <span className="text-xl font-bold">${service.price}</span>
                  <span className="text-sm text-gray-600">/mo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Services Summary */}
        {selectedServices.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Selected Services ({selectedServices.length})</h4>
            <div className="space-y-1">
              {selectedServices.map(serviceId => {
                const service = services.find(s => s.id === serviceId)
                return service ? (
                  <div key={serviceId} className="flex justify-between text-sm">
                    <span>{service.name}</span>
                    <span>${service.price}/mo</span>
                  </div>
                ) : null
              })}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-lg">${total}/mo</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={selectedServices.length === 0}
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
