import { useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'

interface AuthResult {
  success: boolean
  error: string | null
}

export function useAuth() {
  const [loading, setLoading] = useState(false)

  const signUp = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        // Handle specific error cases
        if (error.message.includes('already registered')) {
          return { success: false, error: 'Cet email a déjà un compte.' }
        }
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch {
      return { success: false, error: 'Une erreur est survenue. Réessaie.' }
    } finally {
      setLoading(false)
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          return { success: false, error: 'Email ou mot de passe incorrect' }
        }
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch {
      return { success: false, error: 'Une erreur est survenue. Réessaie.' }
    } finally {
      setLoading(false)
    }
  }, [])

  const signOut = useCallback(async (): Promise<AuthResult> => {
    setLoading(true)

    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch {
      return { success: false, error: 'Une erreur est survenue. Réessaie.' }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    signUp,
    signIn,
    signOut,
  }
}
