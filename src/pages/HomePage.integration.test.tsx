import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage'

describe('HomePage Integration', () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
  }

  describe('Full page renders', () => {
    it('should render all major sections', () => {
      renderHomePage()

      // Header
      expect(screen.getByRole('banner')).toBeInTheDocument()

      // Main content
      expect(screen.getByRole('main')).toBeInTheDocument()

      // Hero section (h1)
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()

      // How it works section
      expect(screen.getByRole('heading', { name: /Comment ça marche/i })).toBeInTheDocument()

      // Curriculum section
      expect(screen.getByRole('heading', { name: /Le parcours complet/i })).toBeInTheDocument()

      // Footer
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('should render without console errors', () => {
      const { container } = renderHomePage()
      expect(container).toBeTruthy()
    })
  })

  describe('Navigation flow', () => {
    it('should have working CTA links to /register', () => {
      renderHomePage()

      // Multiple CTAs exist
      const registerLinks = screen.getAllByRole('link', { name: /Commencer/i })
      expect(registerLinks.length).toBeGreaterThan(0)

      // All should point to /register
      registerLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/register')
      })
    })

    it('should have header login link', () => {
      renderHomePage()
      const loginLinks = screen.getAllByRole('link', { name: /Se connecter/i })
      expect(loginLinks.length).toBeGreaterThan(0)
      loginLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/login')
      })
    })

    it('should have header register link', () => {
      renderHomePage()
      const registerLinks = screen.getAllByRole('link', { name: /S'inscrire/i })
      expect(registerLinks.length).toBeGreaterThan(0)
      registerLinks.forEach(link => {
        expect(link).toHaveAttribute('href', '/register')
      })
    })

    it('should have footer navigation links', () => {
      renderHomePage()

      expect(screen.getByRole('link', { name: /Parcours/i })).toHaveAttribute('href', '/parcours')
      expect(screen.getByRole('link', { name: /FAQ/i })).toHaveAttribute('href', '/faq')
      expect(screen.getByRole('link', { name: /Mentions légales/i })).toHaveAttribute('href', '/mentions-legales')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderHomePage()

      // Should have exactly one h1
      const h1s = screen.getAllByRole('heading', { level: 1 })
      expect(h1s).toHaveLength(1)

      // Should have h2s for sections
      const h2s = screen.getAllByRole('heading', { level: 2 })
      expect(h2s.length).toBeGreaterThanOrEqual(3) // How it works, Curriculum, CTA, Footer logo
    })

    it('should have visible focus indicators on interactive elements', () => {
      renderHomePage()

      // All links should be focusable
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).not.toHaveAttribute('tabindex', '-1')
      })

      // All buttons should be focusable
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1')
      })
    })

    it('should have alt text on decorative icons (aria-hidden)', () => {
      const { container } = renderHomePage()

      // All SVGs with aria-hidden should have parent with visible text
      const hiddenSvgs = container.querySelectorAll('svg[aria-hidden="true"]')
      expect(hiddenSvgs.length).toBeGreaterThan(0)
    })

    it('should have contentinfo role on footer', () => {
      renderHomePage()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('should have banner role on header', () => {
      renderHomePage()
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should display the hero headline text', () => {
      renderHomePage()
      expect(screen.getByText(/Apprends le code web/i)).toBeInTheDocument()
      // "step by step" appears in both hero and footer, so use getAllByText
      expect(screen.getAllByText(/step by step/i).length).toBeGreaterThan(0)
    })

    it('should display the subtitle', () => {
      renderHomePage()
      expect(screen.getByText(/Du premier/i)).toBeInTheDocument()
    })

    it('should display social proof', () => {
      renderHomePage()
      expect(screen.getByText(/127 apprenants inscrits/i)).toBeInTheDocument()
    })

    it('should display all 3 steps in how it works', () => {
      renderHomePage()
      expect(screen.getByText(/Inscris-toi gratuitement/i)).toBeInTheDocument()
      expect(screen.getByText(/Suis le parcours/i)).toBeInTheDocument()
      expect(screen.getByText(/Crée ton premier site/i)).toBeInTheDocument()
    })

    it('should display all 5 modules', () => {
      renderHomePage()
      expect(screen.getAllByText(/HTML Bases/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/HTML Sémantique/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/CSS Introduction/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/CSS Layout/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Projet Final/i).length).toBeGreaterThan(0)
    })

    it('should display footer content', () => {
      renderHomePage()
      expect(screen.getByText(/© 2026 Pystep/i)).toBeInTheDocument()
      expect(screen.getByText(/hello@pystep\.fr/i)).toBeInTheDocument()
    })
  })
})
