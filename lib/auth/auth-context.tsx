'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'
import { UserProfile, ServiceTier } from '@/types/user'

export interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  tier: ServiceTier
  loading: boolean
  signIn: (email: string, password?: string) => Promise<void>
  signUp: (email: string, password: string, metadata?: any) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  signInWithProvider: (provider: 'google' | 'linkedin') => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        } else {
          setUserProfile(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        // If user profile doesn't exist, create a basic one
        if (error.code === 'PGRST116') {
          console.log('User profile not found, this is expected if database tables are not set up yet')
        }
        return
      }

      setUserProfile(data)
      
      // Update last_active timestamp
      await supabase
        .from('user_profiles')
        .update({ 
          last_active: new Date().toISOString(),
          consecutive_days: calculateConsecutiveDays(data.last_active)
        })
        .eq('id', userId)
        
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    }
  }

  const calculateConsecutiveDays = (lastActive: string): number => {
    const lastActiveDate = new Date(lastActive)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastActiveDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // If last active was yesterday, increment consecutive days
    // If last active was today, keep current count
    // If more than 1 day ago, reset to 1
    if (diffDays === 1) {
      return (userProfile?.consecutive_days || 0) + 1
    } else if (diffDays === 0) {
      return userProfile?.consecutive_days || 1
    } else {
      return 1
    }
  }

  const signIn = async (email: string, password?: string) => {
    setLoading(true)
    try {
      if (password) {
        // Email/password sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        // Magic link sign in
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
      }
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithProvider = async (provider: 'google' | 'linkedin') => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in')
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      // Refresh user profile
      await fetchUserProfile(user.id)
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    userProfile,
    tier: userProfile?.current_tier || 'FREE',
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    signInWithProvider,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
