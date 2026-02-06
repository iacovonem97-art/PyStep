import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useAuth } from './useAuth'

// Mock Supabase
const mockSignUp = vi.fn()
const mockSignInWithPassword = vi.fn()
const mockSignOut = vi.fn()

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: (...args: unknown[]) => mockSignUp(...args),
      signInWithPassword: (...args: unknown[]) => mockSignInWithPassword(...args),
      signOut: () => mockSignOut(),
    },
  },
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signUp', () => {
    it('should call supabase.auth.signUp with email and password', async () => {
      mockSignUp.mockResolvedValue({ data: { user: { id: '123' } }, error: null })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signUp('test@example.com', 'password123')
      })

      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    it('should set loading state during signUp', async () => {
      mockSignUp.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: {}, error: null }), 100))
      )

      const { result } = renderHook(() => useAuth())

      expect(result.current.loading).toBe(false)

      act(() => {
        result.current.signUp('test@example.com', 'password123')
      })

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })

    it('should return success on successful signUp', async () => {
      mockSignUp.mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null,
      })

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signUp('test@example.com', 'password123')
      })

      expect(response).toEqual({
        success: true,
        error: null,
      })
    })

    it('should return error when email already exists', async () => {
      mockSignUp.mockResolvedValue({
        data: { user: null },
        error: { message: 'User already registered' },
      })

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signUp('existing@example.com', 'password123')
      })

      expect(response).toEqual({
        success: false,
        error: 'Cet email a déjà un compte.',
      })
    })

    it('should return error on network failure', async () => {
      mockSignUp.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signUp('test@example.com', 'password123')
      })

      expect(response).toEqual({
        success: false,
        error: 'Une erreur est survenue. Réessaie.',
      })
    })
  })

  describe('signIn', () => {
    it('should call supabase.auth.signInWithPassword', async () => {
      mockSignInWithPassword.mockResolvedValue({ data: { user: { id: '123' } }, error: null })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signIn('test@example.com', 'password123')
      })

      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })

    it('should return success on valid credentials', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: { id: '123' } },
        error: null,
      })

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signIn('test@example.com', 'password123')
      })

      expect(response).toEqual({ success: true, error: null })
    })

    it('should return French error for invalid credentials', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid login credentials' },
      })

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signIn('test@example.com', 'wrong')
      })

      expect(response).toEqual({
        success: false,
        error: 'Email ou mot de passe incorrect',
      })
    })

    it('should return generic French error on network failure', async () => {
      mockSignInWithPassword.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signIn('test@example.com', 'password123')
      })

      expect(response).toEqual({
        success: false,
        error: 'Une erreur est survenue. Réessaie.',
      })
    })

    it('should set loading state during signIn', async () => {
      mockSignInWithPassword.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ data: {}, error: null }), 100))
      )

      const { result } = renderHook(() => useAuth())

      expect(result.current.loading).toBe(false)

      act(() => {
        result.current.signIn('test@example.com', 'password123')
      })

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })
  })

  describe('signOut', () => {
    it('should call supabase.auth.signOut', async () => {
      mockSignOut.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.signOut()
      })

      expect(mockSignOut).toHaveBeenCalled()
    })

    it('should return success on successful signOut', async () => {
      mockSignOut.mockResolvedValue({ error: null })

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signOut()
      })

      expect(response).toEqual({ success: true, error: null })
    })

    it('should return error on signOut failure', async () => {
      mockSignOut.mockResolvedValue({ error: { message: 'Sign out failed' } })

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signOut()
      })

      expect(response).toEqual({ success: false, error: 'Sign out failed' })
    })

    it('should return generic error on network failure during signOut', async () => {
      mockSignOut.mockRejectedValue(new Error('Network error'))

      const { result } = renderHook(() => useAuth())

      let response
      await act(async () => {
        response = await result.current.signOut()
      })

      expect(response).toEqual({
        success: false,
        error: 'Une erreur est survenue. Réessaie.',
      })
    })

    it('should set loading state during signOut', async () => {
      mockSignOut.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ error: null }), 100))
      )

      const { result } = renderHook(() => useAuth())

      expect(result.current.loading).toBe(false)

      act(() => {
        result.current.signOut()
      })

      expect(result.current.loading).toBe(true)

      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
    })
  })
})
