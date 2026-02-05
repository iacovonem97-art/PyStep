import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CurriculumPreview from './CurriculumPreview'

describe('CurriculumPreview', () => {
  it('should display the section title', () => {
    render(<CurriculumPreview />)
    expect(screen.getByRole('heading', { name: /Le parcours complet/i })).toBeInTheDocument()
  })

  it('should render all 5 modules (desktop + mobile = 10 list items)', () => {
    render(<CurriculumPreview />)
    const modules = screen.getAllByRole('listitem')
    // 5 modules x 2 (desktop + mobile layouts) = 10
    expect(modules).toHaveLength(10)
  })

  it('should display module names', () => {
    render(<CurriculumPreview />)
    // Each module name appears twice (desktop + mobile)
    expect(screen.getAllByText(/HTML Bases/i)).toHaveLength(2)
    expect(screen.getAllByText(/HTML Sémantique/i)).toHaveLength(2)
    expect(screen.getAllByText(/CSS Introduction/i)).toHaveLength(2)
    expect(screen.getAllByText(/CSS Layout/i)).toHaveLength(2)
    expect(screen.getAllByText(/Projet Final/i)).toHaveLength(2)
  })

  it('should display lesson counts', () => {
    render(<CurriculumPreview />)
    // Each lesson count appears twice (desktop + mobile)
    expect(screen.getAllByText(/6 leçons/i)).toHaveLength(2)
    expect(screen.getAllByText(/4 leçons/i)).toHaveLength(2)
    expect(screen.getAllByText(/5 leçons/i)).toHaveLength(4) // 2 modules x 2 layouts
    expect(screen.getAllByText(/2 leçons/i)).toHaveLength(2)
  })

  it('should have proper heading hierarchy', () => {
    render(<CurriculumPreview />)
    const h2 = screen.getByRole('heading', { level: 2, name: /Le parcours complet/i })
    expect(h2).toBeInTheDocument()
  })
})
