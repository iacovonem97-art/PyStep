import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthForm } from './AuthForm'

// Mock useAuth hook
const mockSignUp = vi.fn()
const mockSignIn = vi.fn()

vi.mock('../../features/auth/useAuth', () => ({
  useAuth: () => ({
    signUp: mockSignUp,
    signIn: mockSignIn,
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

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('AuthForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('register mode', () => {
    it('should render email, password, and confirm password fields', () => {
      renderWithRouter(<AuthForm mode="register" />)

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^mot de passe$/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/confirme ton mot de passe/i)).toBeInTheDocument()
    })

    it('should render register button', () => {
      renderWithRouter(<AuthForm mode="register" />)
      expect(screen.getByRole('button', { name: /créer mon compte/i })).toBeInTheDocument()
    })

    it('should show validation error for invalid email', () => {
      renderWithRouter(<AuthForm mode="register" />)

      const emailInput = screen.getByLabelText(/email/i)
      fireEvent.change(emailInput, { target: { value: 'invalid' } })
      fireEvent.blur(emailInput)

      expect(screen.getByText(/entre une adresse email valide/i)).toBeInTheDocument()
    })

    it('should show validation error for short password', () => {
      renderWithRouter(<AuthForm mode="register" />)

      const passwordInput = screen.getByLabelText(/^mot de passe$/i)
      fireEvent.change(passwordInput, { target: { value: '1234567' } })
      fireEvent.blur(passwordInput)

      expect(screen.getByText(/encore.*caractères minimum/i)).toBeInTheDocument()
    })

    it('should show validation error for password mismatch', () => {
      renderWithRouter(<AuthForm mode="register" />)

      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'different' } })
      fireEvent.blur(screen.getByLabelText(/confirme ton mot de passe/i))

      expect(screen.getByText(/les mots de passe ne correspondent pas/i)).toBeInTheDocument()
    })

    it('should call signUp with valid data', async () => {
      mockSignUp.mockResolvedValue({ success: true, error: null })
      renderWithRouter(<AuthForm mode="register" />)

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }))
      })

      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123')
    })

    it('should redirect to dashboard on successful registration', async () => {
      mockSignUp.mockResolvedValue({ success: true, error: null })
      renderWithRouter(<AuthForm mode="register" />)

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }))
      })

      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })

    it('should show error alert on registration failure', async () => {
      mockSignUp.mockResolvedValue({ success: false, error: 'Cet email a déjà un compte.' })
      renderWithRouter(<AuthForm mode="register" />)

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'existing@example.com' } })
      fireEvent.change(screen.getByLabelText(/^mot de passe$/i), { target: { value: 'password123' } })
      fireEvent.change(screen.getByLabelText(/confirme ton mot de passe/i), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /créer mon compte/i }))
      })

      expect(screen.getByRole('alert')).toHaveTextContent(/cet email a déjà un compte/i)
    })
  })

  describe('login mode', () => {
    it('should render email and password fields only', () => {
      renderWithRouter(<AuthForm mode="login" />)

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument()
      expect(screen.queryByLabelText(/confirme/i)).not.toBeInTheDocument()
    })

    it('should render login button', () => {
      renderWithRouter(<AuthForm mode="login" />)
      expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
    })

    it('should call signIn with valid data', async () => {
      mockSignIn.mockResolvedValue({ success: true, error: null })
      renderWithRouter(<AuthForm mode="login" />)

      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
      fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'password123' } })

      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }))
      })

      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123')
    })

    it('should show "Rester connecté" checkbox in login mode', () => {
      renderWithRouter(<AuthForm mode="login" />)
      expect(screen.getByLabelText('Rester connecté')).toBeInTheDocument()
    })

    it('should show "Mot de passe oublié ?" link in login mode', () => {
      renderWithRouter(<AuthForm mode="login" />)
      expect(screen.getByRole('link', { name: /mot de passe oublié/i })).toBeInTheDocument()
    })

    it('should NOT show checkbox in register mode', () => {
      renderWithRouter(<AuthForm mode="register" />)
      expect(screen.queryByLabelText('Rester connecté')).not.toBeInTheDocument()
    })

    it('should NOT show forgot password link in register mode', () => {
      renderWithRouter(<AuthForm mode="register" />)
      expect(screen.queryByRole('link', { name: /mot de passe oublié/i })).not.toBeInTheDocument()
    })

    it('should link forgot password to /forgot-password', () => {
      renderWithRouter(<AuthForm mode="login" />)
      expect(screen.getByRole('link', { name: /mot de passe oublié/i })).toHaveAttribute('href', '/forgot-password')
    })
  })
})
