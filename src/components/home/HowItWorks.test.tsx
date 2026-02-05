import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HowItWorks from './HowItWorks'

describe('HowItWorks', () => {
  it('should display the section title', () => {
    render(<HowItWorks />)
    expect(screen.getByRole('heading', { name: /Comment ça marche/i })).toBeInTheDocument()
  })

  it('should render exactly 3 steps', () => {
    render(<HowItWorks />)
    const steps = screen.getAllByRole('listitem')
    expect(steps).toHaveLength(3)
  })

  it('should display step 1 content', () => {
    render(<HowItWorks />)
    expect(screen.getByText(/Inscris-toi gratuitement/i)).toBeInTheDocument()
    expect(screen.getByText(/Juste un email et c'est parti/i)).toBeInTheDocument()
  })

  it('should display step 2 content', () => {
    render(<HowItWorks />)
    expect(screen.getByText(/Suis le parcours/i)).toBeInTheDocument()
    expect(screen.getByText(/22 leçons interactives/i)).toBeInTheDocument()
  })

  it('should display step 3 content', () => {
    render(<HowItWorks />)
    expect(screen.getByText(/Crée ton premier site/i)).toBeInTheDocument()
    expect(screen.getByText(/Un portfolio complet/i)).toBeInTheDocument()
  })

  it('should have proper heading hierarchy', () => {
    render(<HowItWorks />)
    const h2 = screen.getByRole('heading', { level: 2, name: /Comment ça marche/i })
    expect(h2).toBeInTheDocument()
  })
})
