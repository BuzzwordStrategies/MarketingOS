import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, getUserProfile } from '@/lib/supabase/client'
import { workflowEngine } from '@/lib/workflows/engine'
import { updateUserXP } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile to get org_id
    const userProfile = await getUserProfile(user.id)
    if (!userProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 })
    }

    // Parse request body
    const { workflowType, inputs } = await request.json()

    if (!workflowType || !inputs) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate workflow type
    const definition = workflowEngine.getWorkflowDefinition(workflowType)
    if (!definition) {
      return NextResponse.json({ error: 'Invalid workflow type' }, { status: 400 })
    }

    // Execute workflow
    const execution = await workflowEngine.executeWorkflow(
      userProfile.org_id,
      user.id,
      workflowType,
      inputs
    )

    // Award XP for starting a workflow
    await updateUserXP(user.id, 50)

    return NextResponse.json({
      id: execution.id,
      status: execution.status,
      progress: execution.progress,
      workflowType,
      estimatedDuration: definition.estimatedDuration
    })

  } catch (error: any) {
    console.error('Workflow execution error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get running workflows
    const runningWorkflows = workflowEngine.getRunningWorkflows()

    return NextResponse.json({
      runningWorkflows,
      count: runningWorkflows.length
    })

  } catch (error: any) {
    console.error('Error fetching workflows:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
