import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import RegisterPage from './RegisterPage'

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('RegisterPage', () => {
  it('should render at /register route', () => {
    renderWithRouter(<RegisterPage />)
    expect(screen.getByRole('heading', { name: /crée ton compte/i })).toBeInTheDocument()
  })

  it('should display social proof subtitle', () => {
    renderWithRouter(<RegisterPage />)
    expect(screen.getByText(/rejoins.*apprenants/i)).toBeInTheDocument()
  })

  it('should have registration form', () => {
    renderWithRouter(<RegisterPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^mot de passe$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirme ton mot de passe/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /créer mon compte/i })).toBeInTheDocument()
  })

  it('should have link to login page', () => {
    renderWithRouter(<RegisterPage />)
    expect(screen.getByRole('link', { name: /se connecter/i })).toHaveAttribute('href', '/login')
  })

  it('should display legal compliance text', () => {
    renderWithRouter(<RegisterPage />)
    expect(screen.getByText(/conditions d'utilisation/i)).toBeInTheDocument()
    expect(screen.getByText(/politique de confidentialité/i)).toBeInTheDocument()
  })
})
