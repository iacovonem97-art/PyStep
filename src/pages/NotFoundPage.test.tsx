import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

// Mock AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuthContext: () => ({
    user: null,
    session: null,
    loading: false,
  }),
}))

// Mock useAuth
vi.mock('../features/auth/useAuth', () => ({
  useAuth: () => ({
    signOut: vi.fn().mockResolvedValue({ success: true, error: null }),
    loading: false,
  }),
}))

describe('NotFoundPage', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

  it('should render the 404 heading', () => {
    renderPage()
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('should display "Page non trouvée" message', () => {
    renderPage()
    expect(screen.getByText('Page non trouvée')).toBeInTheDocument()
  })

  it('should have a link back to home', () => {
    renderPage()
    const link = screen.getByText("Retour à l'accueil")
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/')
  })

  it('should display a friendly error message', () => {
    renderPage()
    expect(screen.getByText(/cette page n'existe pas/i)).toBeInTheDocument()
  })
})
