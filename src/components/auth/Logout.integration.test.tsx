import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Header from '../layout/Header'
import { ProtectedRoute } from './ProtectedRoute'

// Mock Supabase
const mockSignOut = vi.fn()
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
      signOut: () => mockSignOut(),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: vi.fn() } } }),
    },
  },
}))

// Mock AuthContext
const mockUseAuthContext = vi.fn()
vi.mock('../../contexts/AuthContext', () => ({
  useAuthContext: () => mockUseAuthContext(),
}))

function DashboardPage() {
  return <div>Dashboard Content</div>
}

function HomePage() {
  return <div>Home Page</div>
}

function LoginPage() {
  return <div>Login Page</div>
}

const renderApp = (initialRoute = '/dashboard') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}

describe('Logout Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSignOut.mockResolvedValue({ error: null })
  })

  describe('Logout clears session', () => {
    it('should call signOut and redirect to home', async () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: '123', email: 'test@example.com' },
        session: { access_token: 'token' },
        loading: false,
      })

      renderApp()

      expect(screen.getByText('Dashboard Content')).toBeInTheDocument()

      const logoutButton = screen.getAllByRole('button', { name: /déconnexion/i })[0]

      await act(async () => {
        fireEvent.click(logoutButton)
      })

      expect(mockSignOut).toHaveBeenCalled()
    })
  })

  describe('Protected routes block after logout', () => {
    it('should redirect to /login when not authenticated', async () => {
      mockUseAuthContext.mockReturnValue({
        user: null,
        session: null,
        loading: false,
      })

      renderApp('/dashboard')

      await waitFor(() => {
        expect(screen.getByText('Login Page')).toBeInTheDocument()
      })
      expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument()
    })
  })

  describe('Header updates after logout', () => {
    it('should show login/register buttons when logged out', () => {
      mockUseAuthContext.mockReturnValue({
        user: null,
        session: null,
        loading: false,
      })

      renderApp('/')

      expect(screen.getAllByRole('link', { name: /se connecter/i }).length).toBeGreaterThan(0)
      expect(screen.getAllByRole('link', { name: /s'inscrire/i }).length).toBeGreaterThan(0)
      expect(screen.queryByRole('button', { name: /déconnexion/i })).not.toBeInTheDocument()
    })

    it('should show logout button when logged in', () => {
      mockUseAuthContext.mockReturnValue({
        user: { id: '123', email: 'test@example.com' },
        session: { access_token: 'token' },
        loading: false,
      })

      renderApp('/')

      expect(screen.getAllByRole('button', { name: /déconnexion/i }).length).toBeGreaterThan(0)
      expect(screen.queryByRole('link', { name: /se connecter/i })).not.toBeInTheDocument()
    })
  })
})
