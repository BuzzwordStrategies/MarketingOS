'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  ArrowLeft,
  CheckCircle,
  Clock,
  Loader2,
  Sparkles,
  Zap,
  AlertCircle,
  ExternalLink,
  Download,
  Eye,
  Mail,
  Globe,
  Target,
  FileText,
  BarChart3,
  Rocket
} from 'lucide-react'
import confetti from 'canvas-confetti'

// Mock workflow data (in real app, this would come from API)
const workflowData = {
  'product-launch': {
    name: 'Product Launch',
    description: 'Complete marketing campaign for new product launches',
    icon: Rocket,
    steps: [
      { id: 1, name: 'Gathering product information', duration: 2000 },
      { id: 2, name: 'Creating landing page', duration: 3000 },
      { id: 3, name: 'Generating email sequences', duration: 2500 },
      { id: 4, name: 'Creating social media content', duration: 3500 },
      { id: 5, name: 'Setting up ad campaigns', duration: 4000 },
      { id: 6, name: 'Preparing PR templates', duration: 2000 },
      { id: 7, name: 'Building content calendar', duration: 1500 },
      { id: 8, name: 'Finalizing campaign assets', duration: 1000 }
    ],
    inputs: [
      { id: 'product_name', label: 'Product Name', type: 'text', placeholder: 'e.g., SuperWidget Pro' },
      { id: 'product_description', label: 'Product Description', type: 'textarea', placeholder: 'Describe your product in 2-3 sentences' },
      { id: 'target_audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Small business owners' },
      { id: 'launch_date', label: 'Launch Date', type: 'date' },
      { id: 'price', label: 'Product Price', type: 'text', placeholder: '$99' }
    ],
    outputs: [
      { type: 'landing_page', name: 'Landing Page', icon: Globe, preview: 'https://superwidget.com/launch' },
      { type: 'email_sequence', name: 'Email Campaign (7 emails)', icon: Mail, count: 7 },
      { type: 'social_posts', name: 'Social Media Posts', icon: Globe, count: 30 },
      { type: 'ad_campaigns', name: 'Ad Campaigns', icon: Target, count: 4 },
      { type: 'pr_templates', name: 'PR Templates', icon: FileText, count: 5 },
      { type: 'analytics', name: 'Analytics Dashboard', icon: BarChart3, preview: 'View Dashboard' }
    ]
  }
}

export default function WorkflowExecutionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const workflow = workflowData[params.id as keyof typeof workflowData] || workflowData['product-launch']
  
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [showInputs, setShowInputs] = useState(true)
  const [progress, setProgress] = useState(0)

  const handleInputChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value })
  }

  const startWorkflow = () => {
    setShowInputs(false)
    setIsRunning(true)
    runWorkflowSteps()
  }

  const runWorkflowSteps = async () => {
    for (let i = 0; i < workflow.steps.length; i++) {
      setCurrentStep(i)
      setProgress((i / workflow.steps.length) * 100)
      await new Promise(resolve => setTimeout(resolve, workflow.steps[i].duration))
    }
    setProgress(100)
    setIsComplete(true)
    setIsRunning(false)
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const downloadAsset = (assetName: string) => {
    // Mock download functionality
    console.log(`Downloading ${assetName}...`)
  }

  if (showInputs) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Workflows
        </Button>

        <Card className="robinhood-card">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-green-500 text-white rounded-lg">
                <workflow.icon className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">{workflow.name}</CardTitle>
                <CardDescription>{workflow.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                What this workflow will create:
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {workflow.outputs.map((output, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                    {output.name} {output.count && `(${output.count} items)`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Tell us about your product</h3>
              {workflow.inputs.map((input) => (
                <div key={input.id} className="space-y-2">
                  <Label htmlFor={input.id}>{input.label}</Label>
                  {input.type === 'textarea' ? (
                    <Textarea
                      id={input.id}
                      placeholder={input.placeholder}
                      value={formData[input.id] || ''}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      value={formData[input.id] || ''}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={startWorkflow}
              className="w-full robinhood-button"
              size="lg"
              disabled={!workflow.inputs.every(input => formData[input.id])}
            >
              <Zap className="mr-2 h-5 w-5" />
              Launch Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-500 text-white rounded-lg">
            <workflow.icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{workflow.name}</h1>
            <p className="text-gray-600">Campaign for: {formData.product_name || 'Your Product'}</p>
          </div>
        </div>
        {!isComplete && (
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            In Progress
          </Badge>
        )}
      </div>

      {/* Progress Section */}
      {!isComplete && (
        <Card className="robinhood-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Creating your campaign...</h3>
                <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              
              {isRunning && currentStep < workflow.steps.length && (
                <div className="flex items-center space-x-3 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-[#00D632]" />
                  <span className="text-gray-600">
                    {workflow.steps[currentStep].name}...
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {workflow.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-2 text-sm ${
                      index < currentStep ? 'text-green-600' :
                      index === currentStep ? 'text-blue-600' :
                      'text-gray-400'
                    }`}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : index === currentStep ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-xs">{step.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Section */}
      {isComplete && (
        <>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Campaign Successfully Launched! 🎉</h2>
            <p className="text-gray-600">
              Your {formData.product_name} marketing campaign is now live and running
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workflow.outputs.map((output, index) => (
              <Card key={index} className="robinhood-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <output.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{output.name}</CardTitle>
                        {output.count && (
                          <CardDescription>{output.count} items created</CardDescription>
                        )}
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Ready</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    {output.preview && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    {output.preview && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="robinhood-card">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>Your AI team recommends these actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Monitor Campaign Performance</p>
                    <p className="text-sm text-gray-600">Check your analytics dashboard daily for the first week</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Target className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Optimize Ad Spend</p>
                    <p className="text-sm text-gray-600">We'll automatically adjust bids based on performance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Sparkles className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Engage with Early Customers</p>
                    <p className="text-sm text-gray-600">Respond quickly to inquiries and feedback</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Button
              onClick={() => router.push('/dashboard')}
              className="flex-1"
              variant="outline"
            >
              Back to Dashboard
            </Button>
            <Button
              onClick={() => router.push('/workflows')}
              className="flex-1 robinhood-button"
            >
              Launch Another Workflow
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
