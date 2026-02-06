import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'

// Mock Supabase auth
const mockSignInWithPassword = vi.fn()

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: (...args: unknown[]) => mockSignInWithPassword(...args),
      signOut: vi.fn(),
    },
  },
}))

function DashboardPage() {
  return <div>Dashboard</div>
}

function RegisterPage() {
  return <div>Register Page</div>
}

function ForgotPasswordPage() {
  return <div>Forgot Password</div>
}

const renderWithRouter = (initialRoute = '/login') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('LoginPage Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Full login flow', () => {
    it('should complete login and redirect to dashboard', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null,
      })

      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))
      })

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('should call signInWithPassword with correct credentials', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: { id: '123' } },
        error: null,
      })

      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@test.com' } })
      fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'mypassword' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))
      })

      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'mypassword',
      })
    })
  })

  describe('Login with invalid credentials', () => {
    it('should display French error for invalid credentials', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid login credentials' },
      })

      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'wrongpassword' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))
      })

      expect(screen.getByRole('alert')).toHaveTextContent(/email ou mot de passe incorrect/i)
    })
  })

  describe('Error handling', () => {
    it('should display generic error on network failure', async () => {
      mockSignInWithPassword.mockRejectedValue(new Error('Network error'))

      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))
      })

      expect(screen.getByRole('alert')).toHaveTextContent(/une erreur est survenue/i)
    })
  })

  describe('Validation errors', () => {
    it('should not submit form with invalid email', () => {
      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } })
      fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } })
      fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))

      expect(mockSignInWithPassword).not.toHaveBeenCalled()
    })

    it('should display email validation error on blur', () => {
      renderWithRouter()

      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.blur(emailInput)

      expect(screen.getByText(/entre une adresse email valide/i)).toBeInTheDocument()
    })
  })

  describe('Remember me functionality', () => {
    it('should render remember me checkbox', () => {
      renderWithRouter()
      expect(screen.getByLabelText('Rester connecté')).toBeInTheDocument()
    })

    it('should toggle remember me checkbox', () => {
      renderWithRouter()

      const checkbox = screen.getByLabelText('Rester connecté') as HTMLInputElement
      expect(checkbox.checked).toBe(false)

      fireEvent.click(checkbox)
      expect(checkbox.checked).toBe(true)
    })
  })

  describe('Navigation links', () => {
    it('should have link to register page', () => {
      renderWithRouter()
      expect(screen.getByRole('link', { name: /s'inscrire gratuitement/i })).toHaveAttribute('href', '/register')
    })

    it('should have link to forgot password page', () => {
      renderWithRouter()
      expect(screen.getByRole('link', { name: /mot de passe oublié/i })).toHaveAttribute('href', '/forgot-password')
    })
  })
})
