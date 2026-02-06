const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): string | null {
  if (!email || !EMAIL_REGEX.test(email)) {
    return 'Entre une adresse email valide'
  }
  return null
}

export function validatePassword(password: string): string | null {
  const minLength = 8
  const remaining = minLength - password.length

  if (remaining > 0) {
    return `Encore ${remaining} caractères minimum`
  }
  return null
}

export function validatePasswordMatch(password: string, confirm: string): string | null {
  if (password !== confirm) {
    return 'Les mots de passe ne correspondent pas'
  }
  return null
}
