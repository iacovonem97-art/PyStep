import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { HintModal } from './HintModal'

const hints = [
  'Use <h1> tag',
  'Like this: <h1>Hello</h1>',
  '<h1>Hello World</h1>',
]

describe('HintModal', () => {
  const defaultProps = {
    hints,
    onClose: vi.fn(),
    onNextHint: vi.fn(),
  }

  it('should display "Indice 1" for level 1', () => {
    render(<HintModal {...defaultProps} currentLevel={1} />)
    expect(screen.getByText('Indice 1')).toBeInTheDocument()
  })

  it('should show first hint content at level 1', () => {
    render(<HintModal {...defaultProps} currentLevel={1} />)
    expect(screen.getByText('Use <h1> tag')).toBeInTheDocument()
  })

  it('should display "Indice 2" for level 2', () => {
    render(<HintModal {...defaultProps} currentLevel={2} />)
    expect(screen.getByText('Indice 2')).toBeInTheDocument()
  })

  it('should show "Voir la solution" link at level 2', () => {
    render(<HintModal {...defaultProps} currentLevel={2} />)
    expect(screen.getByText(/voir la solution/i)).toBeInTheDocument()
  })

  it('should show "Encore un indice" at level 1 (when more hints available)', () => {
    render(<HintModal {...defaultProps} currentLevel={1} />)
    expect(screen.getByText(/encore un indice/i)).toBeInTheDocument()
  })

  it('should display "Solution" title at last level', () => {
    render(<HintModal {...defaultProps} currentLevel={3} />)
    expect(screen.getByText('Solution')).toBeInTheDocument()
  })

  it('should show solution content at last level', () => {
    render(<HintModal {...defaultProps} currentLevel={3} />)
    expect(screen.getByText('<h1>Hello World</h1>')).toBeInTheDocument()
  })

  it('should not show "Encore un indice" at last level', () => {
    render(<HintModal {...defaultProps} currentLevel={3} />)
    expect(screen.queryByText(/encore un indice/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/voir la solution/i)).not.toBeInTheDocument()
  })

  it('should call onClose when clicking "Compris !"', () => {
    const onClose = vi.fn()
    render(<HintModal {...defaultProps} onClose={onClose} currentLevel={1} />)
    fireEvent.click(screen.getByText(/compris/i))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('should call onNextHint when clicking next hint button', () => {
    const onNextHint = vi.fn()
    render(<HintModal {...defaultProps} onNextHint={onNextHint} currentLevel={1} />)
    fireEvent.click(screen.getByText(/encore un indice/i))
    expect(onNextHint).toHaveBeenCalledOnce()
  })

  it('should have close button with aria-label', () => {
    render(<HintModal {...defaultProps} currentLevel={1} />)
    const closeBtn = screen.getByRole('button', { name: /fermer/i })
    expect(closeBtn).toBeInTheDocument()
  })

  it('should call onClose when clicking X button', () => {
    const onClose = vi.fn()
    render(<HintModal {...defaultProps} onClose={onClose} currentLevel={1} />)
    fireEvent.click(screen.getByRole('button', { name: /fermer/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
