import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Alert } from '../ui/Alert'
import { Checkbox } from '../ui/Checkbox'
import { useAuth } from '../../features/auth/useAuth'
import { validateEmail, validatePassword, validatePasswordMatch } from '../../utils/validation'

interface AuthFormProps {
  mode: 'register' | 'login'
}

interface FormErrors {
  email?: string
  password?: string
  passwordConfirm?: string
}

export function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate()
  const { signUp, signIn, loading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const isRegister = mode === 'register'
  const isLogin = mode === 'login'

  const validateField = (field: keyof FormErrors, value: string) => {
    let error: string | null = null

    switch (field) {
      case 'email':
        error = validateEmail(value)
        break
      case 'password':
        error = validatePassword(value)
        break
      case 'passwordConfirm':
        error = validatePasswordMatch(password, value)
        break
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error || undefined,
    }))

    return !error
  }

  const validateForm = (): boolean => {
    const emailValid = validateField('email', email)
    const passwordValid = validateField('password', password)
    const confirmValid = isRegister ? validateField('passwordConfirm', passwordConfirm) : true

    return emailValid && passwordValid && confirmValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setApiError(null)

    if (!validateForm()) {
      return
    }

    const result = isRegister
      ? await signUp(email, password)
      : await signIn(email, password)

    if (result.success) {
      navigate('/dashboard')
    } else if (result.error) {
      setApiError(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {apiError && <Alert type="error" message={apiError} />}

      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => validateField('email', email)}
        error={errors.email}
        autoComplete="email"
      />

      <Input
        label="Mot de passe"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => validateField('password', password)}
        error={errors.password}
        helperText={isRegister && !errors.password ? 'Minimum 8 caractères' : undefined}
        autoComplete={isRegister ? 'new-password' : 'current-password'}
      />

      {isRegister && (
        <Input
          label="Confirme ton mot de passe"
          name="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onBlur={() => validateField('passwordConfirm', passwordConfirm)}
          error={errors.passwordConfirm}
          autoComplete="new-password"
        />
      )}

      {isLogin && (
        <div className="flex items-center justify-between">
          <Checkbox
            label="Rester connecté"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Mot de passe oublié ?
          </Link>
        </div>
      )}

      <Button type="submit" loading={loading} className="w-full">
        {isRegister ? 'Créer mon compte' : 'Se connecter'}
      </Button>
    </form>
  )
}
