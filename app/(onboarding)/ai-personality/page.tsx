'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Briefcase, 
  Smile, 
  Zap,
  Users,
  Bot
} from 'lucide-react'

const personalityTraits = [
  {
    id: 'formality',
    name: 'Communication Style',
    description: 'How formal should your AI team communicate?',
    leftLabel: 'Casual & Friendly',
    rightLabel: 'Professional & Formal',
    leftExample: 'Hey! Just launched your new campaign - it\'s looking awesome! 🚀',
    rightExample: 'Your campaign has been successfully deployed. Initial metrics indicate positive engagement.'
  },
  {
    id: 'creativity',
    name: 'Creative Approach',
    description: 'How bold should your marketing be?',
    leftLabel: 'Safe & Conservative',
    rightLabel: 'Bold & Innovative',
    leftExample: 'Professional product showcase with clear benefits',
    rightExample: 'Viral-worthy content that pushes boundaries'
  },
  {
    id: 'proactivity',
    name: 'Proactivity Level',
    description: 'How much should AI suggest and act?',
    leftLabel: 'Wait for Instructions',
    rightLabel: 'Highly Proactive',
    leftExample: 'Ready to help when you need us',
    rightExample: 'Spotted an opportunity! Already drafted 3 campaigns for your approval'
  },
  {
    id: 'detail',
    name: 'Detail Level',
    description: 'How much information should AI provide?',
    leftLabel: 'Just the Essentials',
    rightLabel: 'Full Details',
    leftExample: 'Campaign launched ✓',
    rightExample: 'Campaign launched: 12 ads across 4 platforms, targeting 3 audiences, with A/B tests on headlines...'
  }
]

const aiTeamMembers = [
  { id: 'strategist', role: 'Strategy Director', icon: Briefcase, defaultName: 'Alex' },
  { id: 'social', role: 'Social Media Manager', icon: Users, defaultName: 'Sam' },
  { id: 'content', role: 'Content Creator', icon: MessageSquare, defaultName: 'Casey' },
  { id: 'analyst', role: 'Data Analyst', icon: Zap, defaultName: 'Jordan' },
]

export default function AIPersonalityPage() {
  const router = useRouter()
  const [personalityValues, setPersonalityValues] = useState<Record<string, number>>({
    formality: 50,
    creativity: 50,
    proactivity: 70,
    detail: 50
  })
  const [teamNames, setTeamNames] = useState<Record<string, string>>({
    strategist: 'Alex',
    social: 'Sam',
    content: 'Casey',
    analyst: 'Jordan'
  })
  const [companyVoice, setCompanyVoice] = useState('')

  const handleSliderChange = (trait: string, value: number[]) => {
    setPersonalityValues({ ...personalityValues, [trait]: value[0] })
  }

  const handleNameChange = (memberId: string, name: string) => {
    setTeamNames({ ...teamNames, [memberId]: name })
  }

  const getPersonalityDescription = () => {
    const formality = personalityValues.formality > 50 ? 'professional' : 'friendly'
    const creativity = personalityValues.creativity > 50 ? 'innovative' : 'traditional'
    const proactivity = personalityValues.proactivity > 50 ? 'proactive' : 'responsive'
    const detail = personalityValues.detail > 50 ? 'detailed' : 'concise'
    
    return `Your AI team will be ${formality}, ${creativity}, ${proactivity}, and ${detail} in their approach.`
  }

  const handleComplete = () => {
    // Store AI personality settings
    const onboardingData = JSON.parse(localStorage.getItem('onboarding') || '{}')
    localStorage.setItem('onboarding', JSON.stringify({
      ...onboardingData,
      aiPersonality: personalityValues,
      teamNames,
      companyVoice,
      onboardingComplete: true
    }))
    
    // Redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <Card className="robinhood-card animate-fade-in max-w-3xl mx-auto">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold mb-4">
          Customize Your AI Team
        </CardTitle>
        <CardDescription className="text-lg">
          Set how your AI marketing team should communicate and work
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Personality Sliders */}
        <div className="space-y-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Personality Settings
          </h3>
          {personalityTraits.map((trait) => (
            <div key={trait.id} className="space-y-3">
              <div>
                <Label className="text-base font-medium">{trait.name}</Label>
                <p className="text-sm text-gray-600">{trait.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{trait.leftLabel}</span>
                  <span>{trait.rightLabel}</span>
                </div>
                <Slider
                  value={[personalityValues[trait.id]]}
                  onValueChange={(value) => handleSliderChange(trait.id, value)}
                  max={100}
                  step={10}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className={`p-3 rounded-lg border ${personalityValues[trait.id] <= 50 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <p className="text-gray-600 italic">"{trait.leftExample}"</p>
                </div>
                <div className={`p-3 rounded-lg border ${personalityValues[trait.id] > 50 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                  <p className="text-gray-600 italic">"{trait.rightExample}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Team Names */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Name Your AI Team Members
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Give your AI team members names to make interactions more personal
          </p>
          <div className="grid grid-cols-2 gap-4">
            {aiTeamMembers.map((member) => (
              <div key={member.id} className="space-y-2">
                <Label className="flex items-center space-x-2">
                  <member.icon className="h-4 w-4" />
                  <span>{member.role}</span>
                </Label>
                <Input
                  value={teamNames[member.id]}
                  onChange={(e) => handleNameChange(member.id, e.target.value)}
                  placeholder={member.defaultName}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Company Voice */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Brand Voice Guidelines (Optional)
          </h3>
          <Label>Any specific tone or style preferences?</Label>
          <textarea
            className="w-full mt-2 p-3 border rounded-lg resize-none"
            rows={3}
            placeholder="E.g., 'Always be optimistic and solution-focused' or 'Use humor when appropriate'"
            value={companyVoice}
            onChange={(e) => setCompanyVoice(e.target.value)}
          />
        </div>

        {/* Preview */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold mb-3 flex items-center">
            <Smile className="h-5 w-5 mr-2" />
            Your AI Team Preview
          </h4>
          <p className="text-sm text-gray-600 mb-4">{getPersonalityDescription()}</p>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border">
              <p className="font-medium text-sm mb-1">{teamNames.strategist} (Strategy Director)</p>
              <p className="text-sm text-gray-600">
                {personalityValues.formality > 50 
                  ? `"I've analyzed your market position and identified three strategic opportunities for Q1."`
                  : `"Hey! Found some awesome opportunities we should jump on this quarter! 🎯"`}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <p className="font-medium text-sm mb-1">{teamNames.social} (Social Media Manager)</p>
              <p className="text-sm text-gray-600">
                {personalityValues.creativity > 50 
                  ? `"Just created a viral-worthy campaign concept that'll make your competitors jealous!"`
                  : `"I've prepared this week's social media content following our proven framework."`}
              </p>
            </div>
          </div>
        </div>

        {/* Complete Button */}
        <Button 
          onClick={handleComplete}
          className="w-full robinhood-button"
          size="lg"
        >
          Complete Setup & Launch Dashboard
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  )
}
