import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage'

describe('HomePage', () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
  }

  it('should render without error', () => {
    renderHomePage()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('should display the hero headline', () => {
    renderHomePage()
    expect(screen.getByText(/Apprends le code web/i)).toBeInTheDocument()
  })

  it('should have a CTA button linking to register', () => {
    renderHomePage()
    const ctaButton = screen.getByRole('link', { name: /Commencer gratuitement/i })
    expect(ctaButton).toHaveAttribute('href', '/register')
  })
})
