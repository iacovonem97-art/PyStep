import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

// Mock AuthContext
const mockUseAuthContext = vi.fn()
vi.mock('../../contexts/AuthContext', () => ({
  useAuthContext: () => mockUseAuthContext(),
}))

function DashboardPage() {
  return <div>Dashboard Content</div>
}

function LoginPage() {
  return <div>Login Page</div>
}

const renderWithRouter = (initialRoute = '/dashboard') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should redirect to /login when user is not authenticated', async () => {
    mockUseAuthContext.mockReturnValue({
      user: null,
      session: null,
      loading: false,
    })

    renderWithRouter()

    await waitFor(() => {
      expect(screen.getByText('Login Page')).toBeInTheDocument()
    })
    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument()
  })

  it('should render children when user is authenticated', () => {
    mockUseAuthContext.mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      session: { access_token: 'token' },
      loading: false,
    })

    renderWithRouter()

    expect(screen.getByText('Dashboard Content')).toBeInTheDocument()
  })

  it('should show loading state while checking auth', () => {
    mockUseAuthContext.mockReturnValue({
      user: null,
      session: null,
      loading: true,
    })

    renderWithRouter()

    expect(screen.queryByText('Dashboard Content')).not.toBeInTheDocument()
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument()
  })
})
