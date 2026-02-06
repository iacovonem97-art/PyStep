import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ForgotPasswordPage from './ForgotPasswordPage'

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('ForgotPasswordPage', () => {
  it('should render at /forgot-password', () => {
    renderWithRouter(<ForgotPasswordPage />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('should display email input', () => {
    renderWithRouter(<ForgotPasswordPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('should display "coming soon" message', () => {
    renderWithRouter(<ForgotPasswordPage />)
    expect(screen.getByText(/bientôt disponible/i)).toBeInTheDocument()
  })

  it('should have link back to login', () => {
    renderWithRouter(<ForgotPasswordPage />)
    expect(screen.getByRole('link', { name: /retour/i })).toHaveAttribute('href', '/login')
  })
})
