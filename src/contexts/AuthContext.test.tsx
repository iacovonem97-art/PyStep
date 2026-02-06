import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, act } from '@testing-library/react'
import { AuthProvider, useAuthContext } from './AuthContext'

// Mock Supabase
let capturedAuthCallback: ((event: string, session: unknown) => void) | null = null
const mockGetSession = vi.fn()

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      onAuthStateChange: (callback: (event: string, session: unknown) => void) => {
        capturedAuthCallback = callback
        return { data: { subscription: { unsubscribe: vi.fn() } } }
      },
    },
  },
}))

function TestConsumer() {
  const { user, loading } = useAuthContext()
  return (
    <div>
      <span data-testid="loading">{loading ? 'loading' : 'ready'}</span>
      <span data-testid="user">{user ? user.email : 'no user'}</span>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    capturedAuthCallback = null
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null })
  })

  it('should provide user state', async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: '123', email: 'test@example.com' } } },
      error: null,
    })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('test@example.com')
    })
  })

  it('should show loading state initially', () => {
    mockGetSession.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: { session: null }, error: null }), 100))
    )

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('loading')
  })

  it('should update user on auth state change', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('ready')
    })

    expect(screen.getByTestId('user')).toHaveTextContent('no user')
    expect(capturedAuthCallback).not.toBeNull()

    // Simulate auth state change: user signs in
    act(() => {
      capturedAuthCallback!('SIGNED_IN', {
        user: { id: '456', email: 'new@example.com' },
      })
    })

    expect(screen.getByTestId('user')).toHaveTextContent('new@example.com')
  })

  it('should handle no session', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('no user')
    })
  })
})
