import { Sparkles } from 'lucide-react'

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-[#00D632]" />
          <span className="text-2xl font-bold">MarketingOS</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl">
          {children}
        </div>
      </main>

      {/* Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200">
        <div className="h-full bg-[#00D632] transition-all duration-500" style={{ width: '25%' }} />
      </div>
    </div>
  )
}
