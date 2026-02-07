import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DashboardPage from './DashboardPage'

// Mock AuthContext
const mockUseAuthContext = vi.fn()
vi.mock('../contexts/AuthContext', () => ({
  useAuthContext: () => mockUseAuthContext(),
}))

// Mock useAuth
vi.mock('../features/auth/useAuth', () => ({
  useAuth: () => ({
    signOut: vi.fn().mockResolvedValue({ success: true, error: null }),
    loading: false,
  }),
}))

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuthContext.mockReturnValue({
      user: { id: '123', email: 'marie@test.com' },
      session: { access_token: 'token' },
      loading: false,
    })
  })

  const renderDashboard = () => {
    return render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    )
  }

  // T2: DashboardPage renders
  it('should render welcome message with user email', () => {
    renderDashboard()
    expect(screen.getByText(/bienvenue marie@test.com/i)).toBeInTheDocument()
  })

  it('should show "Pret a commencer" for new user with no progress', () => {
    renderDashboard()
    expect(screen.getByText(/prêt à commencer/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /commencer le parcours/i })).toBeInTheDocument()
  })

  it('should render progress bar at 0% for new user', () => {
    renderDashboard()
    expect(screen.getByText(/0 leçons terminées sur 22/i)).toBeInTheDocument()
  })

  it('should render all 5 module cards', () => {
    renderDashboard()
    expect(screen.getByText(/les fondations html/i)).toBeInTheDocument()
    expect(screen.getByText(/html sémantique/i)).toBeInTheDocument()
    expect(screen.getByText(/introduction au css/i)).toBeInTheDocument()
    expect(screen.getByText(/mise en page css/i)).toBeInTheDocument()
    expect(screen.getByText(/projet final/i)).toBeInTheDocument()
  })

  it('should show module 1 as active (unlocked) for new user', () => {
    renderDashboard()
    const continuerLinks = screen.getAllByRole('link', { name: /commencer/i })
    expect(continuerLinks.length).toBeGreaterThan(0)
  })

  it('should show modules 2-5 as locked for new user', () => {
    renderDashboard()
    const lockedMessages = screen.getAllByText(/termine le module/i)
    expect(lockedMessages).toHaveLength(4)
  })
})
