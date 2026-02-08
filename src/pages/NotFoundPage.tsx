import { Link } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 flex items-center justify-center min-h-[60vh]">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page non trouvée</h2>
          <p className="text-gray-500 mb-6">
            Oups, cette page n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
