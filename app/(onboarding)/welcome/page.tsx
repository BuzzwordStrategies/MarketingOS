'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowRight, DollarSign, Users, Zap, TrendingUp } from 'lucide-react'

const industries = [
  'E-commerce',
  'SaaS',
  'Healthcare',
  'Real Estate',
  'Education',
  'Finance',
  'Retail',
  'Manufacturing',
  'Hospitality',
  'Other'
]

const companySizes = [
  { value: 'solo', label: 'Just me', employees: '1' },
  { value: 'small', label: 'Small team', employees: '2-10' },
  { value: 'medium', label: 'Growing company', employees: '11-50' },
  { value: 'large', label: 'Established business', employees: '50+' }
]

export default function WelcomePage() {
  const router = useRouter()
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [monthlySpend, setMonthlySpend] = useState(5000)

  const calculateSavings = () => {
    const marketingOSCost = 497 // Base price
    const savings = monthlySpend - marketingOSCost
    const savingsPercentage = Math.round((savings / monthlySpend) * 100)
    return { savings, savingsPercentage }
  }

  const { savings, savingsPercentage } = calculateSavings()

  const handleContinue = () => {
    if (industry && companySize) {
      // Store onboarding data
      localStorage.setItem('onboarding', JSON.stringify({ industry, companySize, monthlySpend }))
      router.push('/onboarding/competitor-setup')
    }
  }

  return (
    <Card className="robinhood-card animate-fade-in">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-4xl font-bold mb-4">
          Welcome to MarketingOS
        </CardTitle>
        <CardDescription className="text-lg">
          Replace your entire marketing team with AI that works 24/7
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1">One-Click Campaigns</h3>
            <p className="text-sm text-gray-600">Launch complete marketing campaigns instantly</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-1">AI Team of 10</h3>
            <p className="text-sm text-gray-600">Expert AI agents for every marketing channel</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-1">Revenue Attribution</h3>
            <p className="text-sm text-gray-600">See exactly what drives your revenue</p>
          </div>
        </div>

        {/* Savings Calculator */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
            Calculate Your Savings
          </h3>
          <div className="space-y-4">
            <div>
              <Label>Current monthly marketing spend</Label>
              <div className="flex items-center space-x-4 mt-2">
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="font-bold text-lg w-24 text-right">
                  ${monthlySpend.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Your current spend:</span>
                <span className="font-medium">${monthlySpend.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">MarketingOS cost:</span>
                <span className="font-medium">$497/mo</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-green-200">
                <span className="font-semibold text-green-700">You'll save:</span>
                <div className="text-right">
                  <span className="font-bold text-2xl text-green-700">
                    ${savings.toLocaleString()}/mo
                  </span>
                  <span className="block text-sm text-green-600">
                    {savingsPercentage}% reduction
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Selection */}
        <div className="space-y-2">
          <Label>What industry are you in?</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind.toLowerCase()}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Company Size */}
        <div className="space-y-3">
          <Label>Company size</Label>
          <RadioGroup value={companySize} onValueChange={setCompanySize}>
            {companySizes.map((size) => (
              <div key={size.value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value={size.value} id={size.value} />
                <Label htmlFor={size.value} className="flex-1 cursor-pointer">
                  <span className="font-medium">{size.label}</span>
                  <span className="text-sm text-gray-600 ml-2">({size.employees} employees)</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handleContinue}
          disabled={!industry || !companySize}
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
