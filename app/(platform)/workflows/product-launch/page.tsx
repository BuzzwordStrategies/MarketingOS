'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Rocket, 
  Target, 
  DollarSign, 
  Users, 
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react'

interface ProductLaunchInputs {
  productName: string
  industry: string
  targetAudience: string
  launchDate: string
  budget: number
  adBudget: number
  description: string
  uniqueSellingPoint: string
  competitorUrls: string[]
  goals: string[]
}

export default function ProductLaunchPage() {
  const [inputs, setInputs] = useState<ProductLaunchInputs>({
    productName: '',
    industry: '',
    targetAudience: '',
    launchDate: '',
    budget: 5000,
    adBudget: 1000,
    description: '',
    uniqueSellingPoint: '',
    competitorUrls: [''],
    goals: ['']
  })
  const [isLaunching, setIsLaunching] = useState(false)
  const [workflowId, setWorkflowId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (field: keyof ProductLaunchInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const addCompetitorUrl = () => {
    setInputs(prev => ({
      ...prev,
      competitorUrls: [...prev.competitorUrls, '']
    }))
  }

  const updateCompetitorUrl = (index: number, value: string) => {
    setInputs(prev => ({
      ...prev,
      competitorUrls: prev.competitorUrls.map((url, i) => i === index ? value : url)
    }))
  }

  const addGoal = () => {
    setInputs(prev => ({
      ...prev,
      goals: [...prev.goals, '']
    }))
  }

  const updateGoal = (index: number, value: string) => {
    setInputs(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => i === index ? value : goal)
    }))
  }

  const handleLaunch = async () => {
    setIsLaunching(true)
    setError('')

    try {
      // Validate required fields
      if (!inputs.productName || !inputs.industry || !inputs.targetAudience) {
        throw new Error('Please fill in all required fields')
      }

      // Call workflow API
      const response = await fetch('/api/workflows/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workflowType: 'product-launch',
          inputs: {
            ...inputs,
            competitorUrls: inputs.competitorUrls.filter(url => url.trim()),
            goals: inputs.goals.filter(goal => goal.trim())
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to launch workflow')
      }

      const result = await response.json()
      setWorkflowId(result.id)

      // Redirect to workflow monitoring page
      setTimeout(() => {
        router.push(`/workflows/${result.id}`)
      }, 3000)

    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setIsLaunching(false)
    }
  }

  if (workflowId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Product Launch Initiated!</CardTitle>
            <CardDescription>
              Your marketing campaign is now being created by our AI agents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Workflow created successfully</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span>AI agents are analyzing your market...</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Creating landing pages and content...</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Setting up email sequences...</span>
              </div>
            </div>

            <Alert>
              <Sparkles className="w-4 h-4" />
              <AlertDescription>
                You'll be redirected to the monitoring dashboard in a few seconds. 
                You can also bookmark this workflow: <strong>{workflowId}</strong>
              </AlertDescription>
            </Alert>

            <div className="text-center">
              <Button onClick={() => router.push(`/workflows/${workflowId}`)}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Monitor Progress
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Launch Campaign</h1>
                <p className="text-gray-600">Launch your product with a complete marketing campaign in one click</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* What Will Happen */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>What happens when you click "Launch"</span>
            </CardTitle>
            <CardDescription>
              Our AI agents will execute 8 tasks automatically to create your complete marketing campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Market Research</p>
                    <p className="text-sm text-gray-600">Analyze competitors and market opportunities</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Content Generation</p>
                    <p className="text-sm text-gray-600">AI creates headlines, copy, and marketing materials</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Landing Page</p>
                    <p className="text-sm text-gray-600">Professional landing page with conversion optimization</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium">Email Sequences</p>
                    <p className="text-sm text-gray-600">Automated email campaigns and nurture sequences</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium">Social Media</p>
                    <p className="text-sm text-gray-600">Posts and campaigns across all major platforms</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Ad Campaigns</p>
                    <p className="text-sm text-gray-600">Google and Facebook ads with targeting</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">SEO Optimization</p>
                    <p className="text-sm text-gray-600">Search engine optimization and keyword targeting</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Analytics Setup</p>
                    <p className="text-sm text-gray-600">Revenue tracking and performance monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Product Launch Details</CardTitle>
            <CardDescription>
              Tell us about your product and we'll create a complete marketing campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Product Name *</label>
                <Input
                  placeholder="e.g., MarketingOS Pro"
                  value={inputs.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Industry *</label>
                <Input
                  placeholder="e.g., SaaS, E-commerce, Consulting"
                  value={inputs.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Target Audience *</label>
              <Input
                placeholder="e.g., Small business owners, Marketing managers, Entrepreneurs"
                value={inputs.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Product Description</label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your product, its features, and benefits..."
                value={inputs.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Unique Selling Point</label>
              <Input
                placeholder="What makes your product different from competitors?"
                value={inputs.uniqueSellingPoint}
                onChange={(e) => handleInputChange('uniqueSellingPoint', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Launch Date</label>
                <Input
                  type="date"
                  value={inputs.launchDate}
                  onChange={(e) => handleInputChange('launchDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Total Budget</label>
                <Input
                  type="number"
                  placeholder="5000"
                  value={inputs.budget}
                  onChange={(e) => handleInputChange('budget', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ad Budget</label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={inputs.adBudget}
                  onChange={(e) => handleInputChange('adBudget', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">Competitor URLs (optional)</label>
              {inputs.competitorUrls.map((url, index) => (
                <Input
                  key={index}
                  placeholder="https://competitor.com"
                  value={url}
                  onChange={(e) => updateCompetitorUrl(index, e.target.value)}
                />
              ))}
              <Button variant="outline" onClick={addCompetitorUrl} className="w-full">
                Add Another Competitor
              </Button>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">Campaign Goals (optional)</label>
              {inputs.goals.map((goal, index) => (
                <Input
                  key={index}
                  placeholder="e.g., Generate 1000 leads, Achieve $50k revenue"
                  value={goal}
                  onChange={(e) => updateGoal(index, e.target.value)}
                />
              ))}
              <Button variant="outline" onClick={addGoal} className="w-full">
                Add Another Goal
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button
                onClick={handleLaunch}
                disabled={isLaunching || !inputs.productName || !inputs.industry || !inputs.targetAudience}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 text-lg"
              >
                {isLaunching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Launching Campaign...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    Launch Product Campaign
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-gray-600 mt-2">
                This will create 8 automated tasks and take approximately 45 minutes to complete
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
