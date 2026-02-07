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

describe('DashboardPage Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderDashboard = (user = { id: '123', email: 'marie@test.com' }) => {
    mockUseAuthContext.mockReturnValue({
      user,
      session: { access_token: 'token' },
      loading: false,
    })
    return render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    )
  }

  // T6: Integration tests
  it('should render full page for new user with no progress', () => {
    renderDashboard()

    // Welcome section
    expect(screen.getByText(/bienvenue marie@test.com/i)).toBeInTheDocument()
    expect(screen.getByText(/prêt à commencer/i)).toBeInTheDocument()

    // Progress bar
    expect(screen.getByText(/0 leçons terminées sur 22/i)).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()

    // Module cards
    expect(screen.getByText(/les fondations html/i)).toBeInTheDocument()
    expect(screen.getByText(/html sémantique/i)).toBeInTheDocument()
    expect(screen.getByText(/introduction au css/i)).toBeInTheDocument()
    expect(screen.getByText(/mise en page css/i)).toBeInTheDocument()
    expect(screen.getByText(/projet final/i)).toBeInTheDocument()
  })

  it('should show "Commencer le parcours" CTA linking to first lesson', () => {
    renderDashboard()
    const cta = screen.getByRole('link', { name: /commencer le parcours/i })
    expect(cta).toHaveAttribute('href', '/lesson/1.1')
  })

  it('should show module 1 as active and modules 2-5 as locked', () => {
    renderDashboard()

    // Module 1 has a "Commencer" link
    const startLinks = screen.getAllByRole('link', { name: /commencer/i })
    expect(startLinks.length).toBeGreaterThan(0)

    // Modules 2-5 locked
    const lockedMessages = screen.getAllByText(/termine le module/i)
    expect(lockedMessages).toHaveLength(4)
  })

  it('should render header with navigation links', () => {
    renderDashboard()
    expect(screen.getAllByRole('link', { name: /dashboard/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /parcours/i }).length).toBeGreaterThan(0)
  })

  it('should render footer', () => {
    renderDashboard()
    expect(screen.getByText(/© 2026 pystep/i)).toBeInTheDocument()
  })

  it('should show all 5 modules with progress counts', () => {
    renderDashboard()
    const progressLabels = screen.getAllByText(/\d\/\d/)
    expect(progressLabels).toHaveLength(5)
  })
})
