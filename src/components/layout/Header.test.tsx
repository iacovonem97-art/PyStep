import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

// Mock AuthContext
const mockUseAuthContext = vi.fn()
vi.mock('../../contexts/AuthContext', () => ({
  useAuthContext: () => mockUseAuthContext(),
}))

// Mock useAuth
const mockSignOut = vi.fn()
vi.mock('../../features/auth/useAuth', () => ({
  useAuth: () => ({
    signOut: mockSignOut,
    loading: false,
  }),
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Header', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuthContext.mockReturnValue({
      user: null,
      session: null,
      loading: false,
    })
    mockSignOut.mockResolvedValue({ success: true, error: null })
  })

  // === Visitor state (existing tests) ===

  it('should render logo linking to home', () => {
    renderHeader()
    const logo = screen.getByRole('link', { name: /pystep/i })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('should render "Se connecter" links to /login when logged out', () => {
    renderHeader()
    const loginLinks = screen.getAllByRole('link', { name: /se connecter/i })
    expect(loginLinks.length).toBeGreaterThan(0)
    loginLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/login')
    })
  })

  it('should render "S\'inscrire" links to /register when logged out', () => {
    renderHeader()
    const registerLinks = screen.getAllByRole('link', { name: /s'inscrire/i })
    expect(registerLinks.length).toBeGreaterThan(0)
    registerLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/register')
    })
  })

  it('should have sticky positioning', () => {
    renderHeader()
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
  })

  it('should have hamburger menu button on mobile', () => {
    renderHeader()
    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('should toggle mobile menu when hamburger is clicked', () => {
    renderHeader()
    const menuButton = screen.getByRole('button', { name: /menu/i })

    const mobileNav = screen.getByTestId('mobile-nav')
    expect(mobileNav).toHaveClass('hidden')

    fireEvent.click(menuButton)
    expect(mobileNav).not.toHaveClass('hidden')

    fireEvent.click(menuButton)
    expect(mobileNav).toHaveClass('hidden')
  })

  it('should have all navigation links accessible via keyboard', () => {
    renderHeader()
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toBeVisible()
    })
  })

  // === AC-1: Authenticated state — T2 tests ===

  describe('when user is authenticated', () => {
    beforeEach(() => {
      mockUseAuthContext.mockReturnValue({
        user: { id: '123', email: 'test@example.com' },
        session: { access_token: 'token' },
        loading: false,
      })
    })

    it('should show user email when logged in', () => {
      renderHeader()
      const emails = screen.getAllByText('test@example.com')
      expect(emails.length).toBeGreaterThan(0)
    })

    it('should show "Déconnexion" button in desktop nav when logged in', () => {
      renderHeader()
      const logoutButtons = screen.getAllByRole('button', { name: /déconnexion/i })
      expect(logoutButtons.length).toBeGreaterThan(0)
    })

    it('should show "Déconnexion" in mobile menu when logged in', () => {
      renderHeader()
      const menuButton = screen.getByRole('button', { name: /menu/i })
      fireEvent.click(menuButton)

      const mobileNav = screen.getByTestId('mobile-nav')
      const logoutInMobile = mobileNav.querySelector('button')
      expect(logoutInMobile).toHaveTextContent(/déconnexion/i)
    })

    it('should NOT show "Se connecter" or "S\'inscrire" when logged in', () => {
      renderHeader()
      expect(screen.queryByRole('link', { name: /se connecter/i })).not.toBeInTheDocument()
      expect(screen.queryByRole('link', { name: /s'inscrire/i })).not.toBeInTheDocument()
    })

    // === T3: Logout action tests ===

    it('should call signOut when logout button is clicked', async () => {
      renderHeader()
      const logoutButton = screen.getAllByRole('button', { name: /déconnexion/i })[0]
      fireEvent.click(logoutButton)

      await waitFor(() => {
        expect(mockSignOut).toHaveBeenCalled()
      })
    })

    it('should redirect to home after successful logout', async () => {
      renderHeader()
      const logoutButton = screen.getAllByRole('button', { name: /déconnexion/i })[0]
      fireEvent.click(logoutButton)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/')
      })
    })
  })

  // === Visitor: no logout visible ===

  it('should NOT show "Déconnexion" when logged out', () => {
    renderHeader()
    expect(screen.queryByRole('button', { name: /déconnexion/i })).not.toBeInTheDocument()
  })
})
