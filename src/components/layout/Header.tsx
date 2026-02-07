import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthContext } from '@/contexts/AuthContext'
import { useAuth } from '@/features/auth/useAuth'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user } = useAuthContext()
  const { signOut, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLogout = async () => {
    const result = await signOut()
    if (result.success) {
      navigate('/')
    }
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
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={cn(
                    'text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors',
                    location.pathname === '/dashboard' && 'text-indigo-600 font-semibold'
                  )}
                >
                  Dashboard
                </Link>
                <Link
                  to="/course"
                  className={cn(
                    'text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors',
                    location.pathname === '/course' && 'text-indigo-600 font-semibold'
                  )}
                >
                  Parcours
                </Link>
                <span className="text-gray-600 text-sm">{user.email}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loading}
                  className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors inline-flex items-center gap-2"
                  aria-label="Déconnexion"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Déconnexion
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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
          {user ? (
            <>
              <span className="block text-gray-500 text-sm px-4 py-2">{user.email}</span>
              <Link
                to="/dashboard"
                className={cn(
                  'block text-gray-600 hover:text-gray-900 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors',
                  location.pathname === '/dashboard' && 'text-indigo-600 bg-indigo-50'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/course"
                className={cn(
                  'block text-gray-600 hover:text-gray-900 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors',
                  location.pathname === '/course' && 'text-indigo-600 bg-indigo-50'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Parcours
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLogout()
                }}
                disabled={loading}
                className="block w-full text-left text-gray-600 hover:text-gray-900 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
