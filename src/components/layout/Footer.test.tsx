import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Footer from './Footer'

describe('Footer', () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    )
  }

  it('should display logo', () => {
    renderFooter()
    const logo = screen.getByRole('heading', { level: 3, name: /Pystep/i })
    expect(logo).toBeInTheDocument()
  })

  it('should display tagline', () => {
    renderFooter()
    expect(screen.getByText(/Apprends le code step by step/i)).toBeInTheDocument()
  })

  it('should have link to Parcours', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: /Parcours/i })
    expect(link).toHaveAttribute('href', '/parcours')
  })

  it('should have link to FAQ', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: /FAQ/i })
    expect(link).toHaveAttribute('href', '/faq')
  })

  it('should have link to Mentions légales', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: /Mentions légales/i })
    expect(link).toHaveAttribute('href', '/mentions-legales')
  })

  it('should display contact email', () => {
    renderFooter()
    expect(screen.getByText(/hello@pystep\.fr/i)).toBeInTheDocument()
  })

  it('should display copyright', () => {
    renderFooter()
    expect(screen.getByText(/© 2026 Pystep/i)).toBeInTheDocument()
  })

  it('should have CTA button linking to register', () => {
    renderFooter()
    const ctaButton = screen.getByRole('link', { name: /Commencer maintenant/i })
    expect(ctaButton).toHaveAttribute('href', '/register')
  })
})
