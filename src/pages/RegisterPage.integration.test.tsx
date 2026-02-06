import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './RegisterPage'

// Mock Supabase auth
const mockSignUp = vi.fn()

vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: (...args: unknown[]) => mockSignUp(...args),
      signInWithPassword: vi.fn(),
      signOut: vi.fn(),
    },
  },
}))

function DashboardPage() {
  return <div>Dashboard</div>
}

const renderWithRouter = (initialRoute = '/register') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('RegisterPage Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Full registration flow', () => {
    it('should complete registration and redirect to dashboard', async () => {
      mockSignUp.mockResolvedValue({
        data: { user: { id: '123', email: 'test@example.com' } },
        error: null,
      })

      renderWithRouter()

      // Fill in the form
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'password123' } })

      // Submit and wait for async handleSubmit to complete
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }))
      })

      // Verify redirect
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })
  })

  describe('Validation errors display', () => {
    it('should display email validation error on blur', () => {
      renderWithRouter()

      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.blur(emailInput)

      expect(screen.getByText(/entre une adresse email valide/i)).toBeInTheDocument()
    })

    it('should display password length error', () => {
      renderWithRouter()

      const passwordInput = screen.getByLabelText(/^mot de passe$/i)
      fireEvent.change(passwordInput, { target: { value: 'short' } })
      fireEvent.blur(passwordInput)

      expect(screen.getByText(/encore.*caractères minimum/i)).toBeInTheDocument()
    })

    it('should display password mismatch error', () => {
      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'different' } })
      fireEvent.blur(screen.getByLabelText(/confirme ton mot de passe/i))

      expect(screen.getByText(/les mots de passe ne correspondent pas/i)).toBeInTheDocument()
    })

    it('should not submit form with validation errors', () => {
      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid' } })
      fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }))

      expect(mockSignUp).not.toHaveBeenCalled()
    })
  })

  describe('Error handling', () => {
    it('should display error when email already exists', async () => {
      mockSignUp.mockResolvedValue({
        data: { user: null },
        error: { message: 'User already registered' },
      })

      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'existing@example.com' } })
      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }))
      })

      expect(screen.getByRole('alert')).toHaveTextContent(/cet email a déjà un compte/i)
    })

    it('should display generic error on network failure', async () => {
      mockSignUp.mockRejectedValue(new Error('Network error'))

      renderWithRouter()

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }))
      })

      expect(screen.getByRole('alert')).toHaveTextContent(/une erreur est survenue/i)
    })
  })

  describe('UX requirements', () => {
    it('should have link to login page', () => {
      renderWithRouter()
      expect(screen.getByRole('link', { name: /se connecter/i })).toHaveAttribute('href', '/login')
    })

    it('should display social proof text', () => {
      renderWithRouter()
      expect(screen.getByText(/rejoins.*apprenants/i)).toBeInTheDocument()
    })

    it('should display legal compliance links', () => {
      renderWithRouter()
      expect(screen.getByRole('link', { name: /conditions d'utilisation/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /politique de confidentialité/i })).toBeInTheDocument()
    })
  })
})
