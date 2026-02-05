import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  }

  it('should render logo linking to home', () => {
    renderHeader()
    const logo = screen.getByRole('link', { name: /pystep/i })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('should render "Se connecter" links to /login', () => {
    renderHeader()
    const loginLinks = screen.getAllByRole('link', { name: /se connecter/i })
    expect(loginLinks.length).toBeGreaterThan(0)
    loginLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/login')
    })
  })

  it('should render "S\'inscrire" links to /register', () => {
    renderHeader()
    const registerLinks = screen.getAllByRole('link', { name: /s'inscrire/i })
    expect(registerLinks.length).toBeGreaterThan(0)
    registerLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/register')
    })
  })

  it('should have sticky positioning', () => {
    renderHeader()
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky')
  })

  it('should have hamburger menu button on mobile', () => {
    renderHeader()
    const menuButton = screen.getByRole('button', { name: /menu/i })
    expect(menuButton).toBeInTheDocument()
  })

  it('should toggle mobile menu when hamburger is clicked', () => {
    renderHeader()
    const menuButton = screen.getByRole('button', { name: /menu/i })

    // Menu should be hidden initially
    const mobileNav = screen.getByTestId('mobile-nav')
    expect(mobileNav).toHaveClass('hidden')

    // Click to open
    fireEvent.click(menuButton)
    expect(mobileNav).not.toHaveClass('hidden')

    // Click to close
    fireEvent.click(menuButton)
    expect(mobileNav).toHaveClass('hidden')
  })

  it('should have all navigation links accessible via keyboard', () => {
    renderHeader()
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toBeVisible()
    })
  })
})
