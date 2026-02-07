import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ValidationBar } from './ValidationBar'

describe('ValidationBar', () => {
  const defaultProps = {
    onValidate: vi.fn(),
    onHint: vi.fn(),
    isValidating: false,
    codeChanged: true,
  }

  it('should render "Indice" button', () => {
    render(<ValidationBar {...defaultProps} />)
    expect(screen.getByText(/indice/i)).toBeInTheDocument()
  })

  it('should render "Vérifier mon code" button', () => {
    render(<ValidationBar {...defaultProps} />)
    expect(screen.getByText(/vérifier mon code/i)).toBeInTheDocument()
  })

  it('should disable validate button when code is unchanged', () => {
    render(<ValidationBar {...defaultProps} codeChanged={false} />)
    const btn = screen.getByText(/vérifier mon code/i).closest('button')!
    expect(btn).toBeDisabled()
  })

  it('should enable validate button when code has changed', () => {
    render(<ValidationBar {...defaultProps} codeChanged={true} />)
    const btn = screen.getByText(/vérifier mon code/i).closest('button')!
    expect(btn).not.toBeDisabled()
  })

  it('should disable validate button during validation', () => {
    render(<ValidationBar {...defaultProps} isValidating={true} />)
    const btn = screen.getByText(/vérifier mon code/i).closest('button')!
    expect(btn).toBeDisabled()
  })

  it('should call onValidate when clicking validate button', () => {
    const onValidate = vi.fn()
    render(<ValidationBar {...defaultProps} onValidate={onValidate} />)
    fireEvent.click(screen.getByText(/vérifier mon code/i))
    expect(onValidate).toHaveBeenCalledOnce()
  })

  it('should call onHint when clicking hint button', () => {
    const onHint = vi.fn()
    render(<ValidationBar {...defaultProps} onHint={onHint} />)
    fireEvent.click(screen.getByText(/indice/i))
    expect(onHint).toHaveBeenCalledOnce()
  })

  it('should show loading spinner during validation', () => {
    render(<ValidationBar {...defaultProps} isValidating={true} />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
