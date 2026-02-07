import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FeedbackPanel } from './FeedbackPanel'
import type { ValidationResult } from '@/features/lessons/validator'

const successResult: ValidationResult = {
  passed: true,
  results: [
    { name: 'h1 exists', passed: true },
    { name: 'h1 has text', passed: true },
  ],
}

const failureResult: ValidationResult = {
  passed: false,
  results: [
    { name: 'h1 exists', passed: true },
    { name: 'h1 has text', passed: false, message: 'L\'élément "h1" est vide' },
  ],
}

describe('FeedbackPanel', () => {
  const defaultProps = {
    onRetry: vi.fn(),
    onHint: vi.fn(),
    nextLessonId: '1.2' as string | null,
  }

  const renderPanel = (result: ValidationResult, overrides = {}) =>
    render(
      <MemoryRouter>
        <FeedbackPanel result={result} {...defaultProps} {...overrides} />
      </MemoryRouter>
    )

  // Success state
  it('should render "Bravo !" on success', () => {
    renderPanel(successResult)
    expect(screen.getByText('Bravo !')).toBeInTheDocument()
  })

  it('should show all tests as passed on success', () => {
    renderPanel(successResult)
    expect(screen.getByText('h1 exists')).toBeInTheDocument()
    expect(screen.getByText('h1 has text')).toBeInTheDocument()
  })

  it('should show "Leçon suivante" link on success with next lesson', () => {
    renderPanel(successResult)
    const link = screen.getByText(/leçon suivante/i)
    expect(link.closest('a')).toHaveAttribute('href', '/lesson/1.2')
  })

  it('should show "Module terminé !" when no next lesson', () => {
    renderPanel(successResult, { nextLessonId: null })
    const link = screen.getByText(/module terminé/i)
    expect(link.closest('a')).toHaveAttribute('href', '/course')
  })

  // Error state
  it('should render "Presque !" on failure', () => {
    renderPanel(failureResult)
    expect(screen.getByText('Presque !')).toBeInTheDocument()
  })

  it('should show mixed checklist on failure', () => {
    renderPanel(failureResult)
    expect(screen.getByText('h1 exists')).toBeInTheDocument()
    expect(screen.getByText('h1 has text')).toBeInTheDocument()
    expect(screen.getByText(/élément "h1" est vide/i)).toBeInTheDocument()
  })

  it('should render "Réessayer" button on failure', () => {
    renderPanel(failureResult)
    expect(screen.getByText(/réessayer/i)).toBeInTheDocument()
  })

  it('should call onRetry when clicking retry button', () => {
    const onRetry = vi.fn()
    renderPanel(failureResult, { onRetry })
    fireEvent.click(screen.getByText(/réessayer/i))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('should render "Voir un indice" link on failure', () => {
    renderPanel(failureResult)
    expect(screen.getByText(/voir un indice/i)).toBeInTheDocument()
  })

  it('should call onHint when clicking hint link', () => {
    const onHint = vi.fn()
    renderPanel(failureResult, { onHint })
    fireEvent.click(screen.getByText(/voir un indice/i))
    expect(onHint).toHaveBeenCalledOnce()
  })

  it('should not show retry/hint buttons on success', () => {
    renderPanel(successResult)
    expect(screen.queryByText(/réessayer/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/voir un indice/i)).not.toBeInTheDocument()
  })
})
