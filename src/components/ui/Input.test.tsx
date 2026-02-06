import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('should render with label', () => {
    render(<Input label="Email" name="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('should display error state', () => {
    render(<Input label="Email" name="email" error="Email invalide" />)
    expect(screen.getByText('Email invalide')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
  })

  it('should display helper text', () => {
    render(<Input label="Password" name="password" helperText="Minimum 8 caractères" />)
    expect(screen.getByText('Minimum 8 caractères')).toBeInTheDocument()
  })

  it('should toggle password visibility', () => {
    render(<Input label="Password" name="password" type="password" />)

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')

    const toggleButton = screen.getByRole('button', { name: /afficher|masquer/i })
    fireEvent.click(toggleButton)

    expect(input).toHaveAttribute('type', 'text')
  })

  it('should call onChange when typing', () => {
    const handleChange = vi.fn()
    render(<Input label="Email" name="email" onChange={handleChange} />)

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('should have proper accessibility attributes', () => {
    render(
      <Input
        label="Email"
        name="email"
        error="Email invalide"
        id="email-input"
      />
    )

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-describedby')
  })
})
