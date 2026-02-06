import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword, validatePasswordMatch } from './validation'

describe('validateEmail', () => {
  it('should return null for valid email', () => {
    expect(validateEmail('test@example.com')).toBeNull()
    expect(validateEmail('user.name@domain.co')).toBeNull()
  })

  it('should return error for invalid email', () => {
    expect(validateEmail('')).toBe('Entre une adresse email valide')
    expect(validateEmail('invalid')).toBe('Entre une adresse email valide')
    expect(validateEmail('test@')).toBe('Entre une adresse email valide')
    expect(validateEmail('@domain.com')).toBe('Entre une adresse email valide')
  })
})

describe('validatePassword', () => {
  it('should return null for valid password (8+ chars)', () => {
    expect(validatePassword('12345678')).toBeNull()
    expect(validatePassword('password123')).toBeNull()
  })

  it('should return error with remaining chars for short password', () => {
    expect(validatePassword('')).toBe('Encore 8 caractères minimum')
    expect(validatePassword('1234567')).toBe('Encore 1 caractères minimum')
    expect(validatePassword('12345')).toBe('Encore 3 caractères minimum')
  })
})

describe('validatePasswordMatch', () => {
  it('should return null when passwords match', () => {
    expect(validatePasswordMatch('password123', 'password123')).toBeNull()
  })

  it('should return error when passwords do not match', () => {
    expect(validatePasswordMatch('password123', 'different')).toBe('Les mots de passe ne correspondent pas')
    expect(validatePasswordMatch('password123', '')).toBe('Les mots de passe ne correspondent pas')
  })
})
