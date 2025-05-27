import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create typed Supabase client for client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper functions for common operations
export const auth = supabase.auth

export const getCurrentUser = async () => {
  const { data: { user }, error } = await auth.getUser()
  if (error) throw error
  return user
}

export const getCurrentSession = async () => {
  const { data: { session }, error } = await auth.getSession()
  if (error) throw error
  return session
}

export const signOut = async () => {
  const { error } = await auth.signOut()
  if (error) throw error
}

export const signInWithEmail = async (email: string) => {
  const { data, error } = await auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })
  if (error) throw error
  return data
}

// Database helpers with organization filtering
export const getOrganizationData = async (orgId: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', orgId)
    .single()
  
  if (error) throw error
  return data
}

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export const getCampaigns = async (orgId: string) => {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getWorkflows = async (orgId: string) => {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const getRevenueAttribution = async (orgId: string, timeframe?: string) => {
  let query = supabase
    .from('revenue_attribution')
    .select('*')
    .eq('org_id', orgId)
    .order('created_at', { ascending: false })
  
  if (timeframe) {
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
    query = query.gte('created_at', date.toISOString())
  }
  
  const { data, error } = await query
  if (error) throw error
  return data
}

export const getCompetitorIntelligence = async (orgId: string) => {
  const { data, error } = await supabase
    .from('competitor_intelligence')
    .select('*')
    .eq('org_id', orgId)
    .order('last_updated', { ascending: false })
  
  if (error) throw error
  return data
}

// Real-time subscriptions
export const subscribeToWorkflows = (orgId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('workflows')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'workflows',
        filter: `org_id=eq.${orgId}`
      },
      callback
    )
    .subscribe()
}

export const subscribeToRevenue = (orgId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('revenue')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'revenue_attribution',
        filter: `org_id=eq.${orgId}`
      },
      callback
    )
    .subscribe()
}

export const subscribeToCompetitorAlerts = (orgId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('competitor_alerts')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'competitor_intelligence',
        filter: `org_id=eq.${orgId}`
      },
      callback
    )
    .subscribe()
}
