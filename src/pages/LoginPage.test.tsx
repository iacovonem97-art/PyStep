import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('LoginPage', () => {
  it('should render welcome title "Bon retour ! 👋"', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByRole('heading', { name: /bon retour/i })).toBeInTheDocument()
  })

  it('should render subtitle "Reprends là où tu en étais."', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByText(/reprends là où tu en étais/i)).toBeInTheDocument()
  })

  it('should have login form with email and password fields', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
  })

  it('should have "Rester connecté" checkbox', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByLabelText('Rester connecté')).toBeInTheDocument()
  })

  it('should have "Mot de passe oublié ?" link to /forgot-password', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByRole('link', { name: /mot de passe oublié/i })).toHaveAttribute('href', '/forgot-password')
  })

  it('should have link to register page', () => {
    renderWithRouter(<LoginPage />)
    const registerLink = screen.getByRole('link', { name: /s'inscrire gratuitement/i })
    expect(registerLink).toHaveAttribute('href', '/register')
  })

  it('should have alternative path text', () => {
    renderWithRouter(<LoginPage />)
    expect(screen.getByText(/pas encore de compte/i)).toBeInTheDocument()
  })
})
