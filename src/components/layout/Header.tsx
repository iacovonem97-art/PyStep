import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-primary-500 hover:text-primary-600 transition-colors"
          >
            Pystep
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              S'inscrire
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg"
            onClick={toggleMobileMenu}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav
        data-testid="mobile-nav"
        className={cn(
          'md:hidden border-t border-gray-200 bg-white',
          isMobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="px-4 py-4 space-y-2">
          <Link
            to="/login"
            className="block text-gray-600 hover:text-gray-900 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="block bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-3 rounded-lg text-center transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            S'inscrire
          </Link>
        </div>
      </nav>
    </header>
  )
}
