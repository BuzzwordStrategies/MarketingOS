import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase server environment variables')
}

// Create Supabase client with service role for server-side operations
// This bypasses RLS and should only be used in secure server contexts
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Admin functions for user management
export const createUserProfile = async (userId: string, orgId: string, email: string, fullName?: string) => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert({
      id: userId,
      org_id: orgId,
      email,
      full_name: fullName,
      xp: 0,
      level: 1,
      daily_streak: 0,
      last_active: new Date().toISOString(),
      role: 'owner',
      onboarding_completed: false,
      preferences: {}
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const createOrganization = async (name: string, ownerId: string, billingEmail?: string) => {
  const { data, error } = await supabaseAdmin
    .from('organizations')
    .insert({
      name,
      owner_id: ownerId,
      subscription_tier: 'free',
      credits: 100,
      billing_email: billingEmail,
      settings: {
        timezone: 'UTC',
        currency: 'USD',
        notifications: {
          email: true,
          push: true,
          slack: false
        }
      }
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateUserXP = async (userId: string, xpGained: number) => {
  // Get current user data
  const { data: user, error: fetchError } = await supabaseAdmin
    .from('users')
    .select('xp, level')
    .eq('id', userId)
    .single()
  
  if (fetchError) throw fetchError
  
  const newXP = user.xp + xpGained
  const newLevel = Math.floor(newXP / 1000) + 1 // Level up every 1000 XP
  
  const { data, error } = await supabaseAdmin
    .from('users')
    .update({
      xp: newXP,
      level: newLevel,
      last_active: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return { ...data, leveledUp: newLevel > user.level }
}

export const createWorkflow = async (
  orgId: string,
  createdBy: string,
  name: string,
  type: string,
  inputs: any,
  totalTasks: number
) => {
  const { data, error } = await supabaseAdmin
    .from('workflows')
    .insert({
      org_id: orgId,
      created_by: createdBy,
      name,
      type,
      status: 'pending',
      progress: 0,
      total_tasks: totalTasks,
      completed_tasks: 0,
      failed_tasks: 0,
      inputs
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateWorkflowProgress = async (
  workflowId: string,
  completedTasks: number,
  failedTasks: number,
  outputs?: any
) => {
  // Get current workflow data
  const { data: workflow, error: fetchError } = await supabaseAdmin
    .from('workflows')
    .select('total_tasks')
    .eq('id', workflowId)
    .single()
  
  if (fetchError) throw fetchError
  
  const progress = Math.round((completedTasks / workflow.total_tasks) * 100)
  const status = completedTasks === workflow.total_tasks ? 'completed' : 
                failedTasks > 0 ? 'failed' : 'running'
  
  const updateData: any = {
    progress,
    completed_tasks: completedTasks,
    failed_tasks: failedTasks,
    status,
    updated_at: new Date().toISOString()
  }
  
  if (outputs) {
    updateData.outputs = outputs
  }
  
  if (status === 'completed') {
    updateData.actual_completion = new Date().toISOString()
  }
  
  const { data, error } = await supabaseAdmin
    .from('workflows')
    .update(updateData)
    .eq('id', workflowId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const createWorkflowTask = async (
  workflowId: string,
  name: string,
  type: string,
  orderIndex: number,
  inputs: any,
  agentType?: string,
  fulfillmentPartner?: string
) => {
  const { data, error } = await supabaseAdmin
    .from('workflow_tasks')
    .insert({
      workflow_id: workflowId,
      name,
      type,
      order_index: orderIndex,
      inputs,
      status: 'pending',
      retry_count: 0,
      max_retries: 3,
      agent_type: agentType,
      fulfillment_partner: fulfillmentPartner
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateWorkflowTask = async (
  taskId: string,
  status: string,
  outputs?: any,
  errorMessage?: string
) => {
  const updateData: any = {
    status,
    updated_at: new Date().toISOString()
  }
  
  if (status === 'running' && !updateData.started_at) {
    updateData.started_at = new Date().toISOString()
  }
  
  if (status === 'completed' || status === 'failed') {
    updateData.completed_at = new Date().toISOString()
  }
  
  if (outputs) {
    updateData.outputs = outputs
  }
  
  if (errorMessage) {
    updateData.error_message = errorMessage
  }
  
  const { data, error } = await supabaseAdmin
    .from('workflow_tasks')
    .update(updateData)
    .eq('id', taskId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const recordRevenueAttribution = async (
  orgId: string,
  source: string,
  medium: string,
  revenue: number,
  campaignId?: string,
  workflowId?: string,
  utmCampaign?: string,
  utmContent?: string,
  utmTerm?: string,
  transactionId?: string,
  customerId?: string,
  touchPoints?: any
) => {
  const { data, error } = await supabaseAdmin
    .from('revenue_attribution')
    .insert({
      org_id: orgId,
      campaign_id: campaignId,
      workflow_id: workflowId,
      source,
      medium,
      utm_campaign: utmCampaign,
      utm_content: utmContent,
      utm_term: utmTerm,
      revenue,
      transaction_id: transactionId,
      customer_id: customerId,
      attribution_model: 'last_click',
      touch_points: touchPoints || {}
    })
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const updateCompetitorIntelligence = async (
  orgId: string,
  competitorDomain: string,
  competitorName: string,
  dataType: string,
  data: any,
  confidenceScore: number,
  source: string
) => {
  const { data: result, error } = await supabaseAdmin
    .from('competitor_intelligence')
    .upsert({
      org_id: orgId,
      competitor_domain: competitorDomain,
      competitor_name: competitorName,
      data_type: dataType,
      data,
      confidence_score: confidenceScore,
      last_updated: new Date().toISOString(),
      source,
      alerts_enabled: true
    })
    .select()
    .single()
  
  if (error) throw error
  return result
}

// Utility functions for data aggregation
export const getOrganizationMetrics = async (orgId: string, timeframe: string = '30d') => {
  const date = new Date()
  switch (timeframe) {
    case '7d':
      date.setDate(date.getDate() - 7)
      break
    case '30d':
      date.setDate(date.getDate() - 30)
      break
    case '90d':
      date.setDate(date.getDate() - 90)
      break
  }
  
  // Get revenue data
  const { data: revenue, error: revenueError } = await supabaseAdmin
    .from('revenue_attribution')
    .select('revenue, created_at')
    .eq('org_id', orgId)
    .gte('created_at', date.toISOString())
  
  if (revenueError) throw revenueError
  
  // Get campaign data
  const { data: campaigns, error: campaignError } = await supabaseAdmin
    .from('campaigns')
    .select('budget, spent, revenue, status')
    .eq('org_id', orgId)
  
  if (campaignError) throw campaignError
  
  // Get workflow data
  const { data: workflows, error: workflowError } = await supabaseAdmin
    .from('workflows')
    .select('status, created_at')
    .eq('org_id', orgId)
    .gte('created_at', date.toISOString())
  
  if (workflowError) throw workflowError
  
  const totalRevenue = revenue.reduce((sum, r) => sum + r.revenue, 0)
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length
  const completedWorkflows = workflows.filter(w => w.status === 'completed').length
  
  return {
    totalRevenue,
    totalBudget,
    totalSpent,
    roi: totalSpent > 0 ? ((totalRevenue - totalSpent) / totalSpent) * 100 : 0,
    activeCampaigns,
    completedWorkflows,
    revenueGrowth: revenue.length > 0 ? revenue : []
  }
}
