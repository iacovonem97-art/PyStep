import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  it('should render message', () => {
    render(<Alert type="error" message="Une erreur est survenue" />)
    expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument()
  })

  it('should render with error styling', () => {
    render(<Alert type="error" message="Erreur" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50')
  })

  it('should render with success styling', () => {
    render(<Alert type="success" message="Succès" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-emerald-50')
  })

  it('should render with warning styling', () => {
    render(<Alert type="warning" message="Attention" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-amber-50')
  })

  it('should render with info styling', () => {
    render(<Alert type="info" message="Information" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50')
  })

  it('should have proper accessibility role', () => {
    render(<Alert type="error" message="Erreur" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
