import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HeroSection from './HeroSection'

describe('HeroSection', () => {
  const renderHeroSection = () => {
    return render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    )
  }

  it('should display the headline', () => {
    renderHeroSection()
    expect(screen.getByText(/Apprends le code web/i)).toBeInTheDocument()
    expect(screen.getByText(/step by step/i)).toBeInTheDocument()
  })

  it('should display the subtitle', () => {
    renderHeroSection()
    expect(screen.getByText(/Du premier/i)).toBeInTheDocument()
    expect(screen.getByText(/Gratuit\. Sans installation\. À ton rythme\./i)).toBeInTheDocument()
  })

  it('should have CTA button linking to /register', () => {
    renderHeroSection()
    const ctaButton = screen.getByRole('link', { name: /Commencer gratuitement/i })
    expect(ctaButton).toHaveAttribute('href', '/register')
  })

  it('should display social proof counter', () => {
    renderHeroSection()
    expect(screen.getByText(/127 apprenants inscrits/i)).toBeInTheDocument()
  })

  it('should display editor preview illustration', () => {
    renderHeroSection()
    const preview = screen.getByTestId('editor-preview')
    expect(preview).toBeInTheDocument()
  })

  it('should have proper heading hierarchy', () => {
    renderHeroSection()
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
  })
})
