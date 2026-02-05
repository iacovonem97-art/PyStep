import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Prêt à coder ?
          </h2>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors shadow-md hover:shadow-lg"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Pystep</h3>
              <p className="text-gray-400">
                Apprends le code step by step.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-white mb-4">Liens</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/parcours"
                    className="hover:text-white transition-colors"
                  >
                    Parcours
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mentions-legales"
                    className="hover:text-white transition-colors"
                  >
                    Mentions légales
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <a
                href="mailto:hello@pystep.fr"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                hello@pystep.fr
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Pystep</p>
          </div>
        </div>
      </footer>
    </>
  )
}
