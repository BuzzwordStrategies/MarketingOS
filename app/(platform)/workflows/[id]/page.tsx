'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase, subscribeToWorkflows } from '@/lib/supabase/client'
import { formatCurrency, getTimeAgo } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  XCircle,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Zap,
  TrendingUp,
  Users,
  Target
} from 'lucide-react'

interface WorkflowTask {
  id: string
  name: string
  type: string
  status: string
  order_index: number
  started_at: string | null
  completed_at: string | null
  outputs: any
  error_message: string | null
  agent_type: string | null
  fulfillment_partner: string | null
}

interface WorkflowData {
  id: string
  name: string
  type: string
  status: string
  progress: number
  total_tasks: number
  completed_tasks: number
  failed_tasks: number
  inputs: any
  outputs: any
  created_at: string
  updated_at: string
  estimated_completion: string | null
  actual_completion: string | null
}

export default function WorkflowMonitorPage() {
  const params = useParams()
  const router = useRouter()
  const workflowId = params.id as string

  const [workflow, setWorkflow] = useState<WorkflowData | null>(null)
  const [tasks, setTasks] = useState<WorkflowTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkflowData = async () => {
      try {
        // Load workflow data
        const { data: workflowData, error: workflowError } = await supabase
          .from('workflows')
          .select('*')
          .eq('id', workflowId)
          .single()

        if (workflowError) throw workflowError
        setWorkflow(workflowData)

        // Load tasks
        const { data: tasksData, error: tasksError } = await supabase
          .from('workflow_tasks')
          .select('*')
          .eq('workflow_id', workflowId)
          .order('order_index')

        if (tasksError) throw tasksError
        setTasks(tasksData || [])

      } catch (err: any) {
        setError(err.message || 'Failed to load workflow')
      } finally {
        setIsLoading(false)
      }
    }

    if (workflowId) {
      loadWorkflowData()

      // Subscribe to real-time updates
      const subscription = subscribeToWorkflows('*', (payload) => {
        if (payload.new?.id === workflowId) {
          setWorkflow(payload.new)
        }
      })

      // Subscribe to task updates
      const taskSubscription = supabase
        .channel('workflow_tasks')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'workflow_tasks',
            filter: `workflow_id=eq.${workflowId}`
          },
          (payload) => {
            if (payload.eventType === 'UPDATE') {
              setTasks(prev => prev.map(task => 
                task.id === payload.new.id ? payload.new as WorkflowTask : task
              ))
            }
          }
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
        taskSubscription.unsubscribe()
      }
    }
  }, [workflowId])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'running':
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'running':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'pending':
        return 'text-gray-600 bg-gray-50 border-gray-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const handleCancelWorkflow = async () => {
    try {
      const response = await fetch(`/api/workflows/${workflowId}/cancel`, {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Failed to cancel workflow')
      
      // Refresh data
      window.location.reload()
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading workflow details...</p>
        </div>
      </div>
    )
  }

  if (error || !workflow) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Error</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{error || 'Workflow not found'}</p>
            <Button onClick={() => router.push('/dashboard')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => router.push('/dashboard')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{workflow.name}</h1>
                  <p className="text-gray-600">
                    Started {getTimeAgo(workflow.created_at)} • {workflow.completed_tasks} of {workflow.total_tasks} tasks completed
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(workflow.status)}`}>
                  {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                </div>
                {workflow.status === 'running' && (
                  <Button variant="outline" onClick={handleCancelWorkflow}>
                    <Pause className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{workflow.progress}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${workflow.progress}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{workflow.completed_tasks}</div>
              <p className="text-xs text-gray-600">of {workflow.total_tasks} total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Tasks</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{workflow.failed_tasks}</div>
              <p className="text-xs text-gray-600">errors encountered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {workflow.estimated_completion ? 
                  getTimeAgo(workflow.estimated_completion) : 
                  '45 min'
                }
              </div>
              <p className="text-xs text-gray-600">remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <Card>
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
            <CardDescription>
              Real-time status of all workflow tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={task.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    {getStatusIcon(task.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{task.name}</h3>
                      <div className="flex items-center space-x-2">
                        {task.agent_type && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {task.agent_type}
                          </span>
                        )}
                        {task.fulfillment_partner && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {task.fulfillment_partner}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600">
                        {task.status === 'completed' && task.completed_at && 
                          `Completed ${getTimeAgo(task.completed_at)}`
                        }
                        {task.status === 'running' && task.started_at && 
                          `Started ${getTimeAgo(task.started_at)}`
                        }
                        {task.status === 'pending' && 'Waiting to start'}
                        {task.status === 'failed' && 'Failed'}
                      </p>
                      
                      {task.outputs && Object.keys(task.outputs).length > 0 && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Output
                        </Button>
                      )}
                    </div>
                    
                    {task.error_message && (
                      <Alert className="mt-2 border-red-200 bg-red-50">
                        <AlertTriangle className="w-4 h-4" />
                        <AlertDescription className="text-red-700">
                          {task.error_message}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workflow Outputs */}
        {workflow.outputs && Object.keys(workflow.outputs).length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Campaign Results</CardTitle>
              <CardDescription>
                Generated assets and campaign details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(workflow.outputs).map(([key, value]: [string, any]) => (
                  <div key={key} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{key}</h4>
                    {typeof value === 'object' ? (
                      <pre className="text-xs text-gray-600 bg-gray-50 p-2 rounded overflow-auto">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-sm text-gray-600">{String(value)}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Input Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Campaign Configuration</CardTitle>
            <CardDescription>
              The inputs used to generate this campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Product Name</label>
                  <p className="text-gray-900">{workflow.inputs.productName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Industry</label>
                  <p className="text-gray-900">{workflow.inputs.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Target Audience</label>
                  <p className="text-gray-900">{workflow.inputs.targetAudience}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Budget</label>
                  <p className="text-gray-900">{formatCurrency(workflow.inputs.budget)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Ad Budget</label>
                  <p className="text-gray-900">{formatCurrency(workflow.inputs.adBudget)}</p>
                </div>
                {workflow.inputs.launchDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">Launch Date</label>
                    <p className="text-gray-900">{new Date(workflow.inputs.launchDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
