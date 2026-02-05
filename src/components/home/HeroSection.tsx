import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Apprends le code web,
              <br />
              <span className="text-primary-500">step by step.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Du premier &lt;h1&gt; à ton premier site web. Gratuit. Sans installation. À ton rythme.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-md hover:shadow-lg"
              >
                Commencer gratuitement
              </Link>
            </div>
            {/* Social Proof */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
              <Users className="h-5 w-5" aria-hidden="true" />
              <span>127 apprenants inscrits</span>
            </div>
          </div>

          {/* Editor Preview */}
          <div
            data-testid="editor-preview"
            className="hidden lg:block"
          >
            <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              {/* Editor Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm ml-2">index.html</span>
              </div>
              {/* Editor Content */}
              <div className="p-4 font-mono text-sm">
                <pre className="text-gray-300">
                  <code>
                    <span className="text-gray-500">1</span>  <span className="text-purple-400">&lt;!DOCTYPE html&gt;</span>{'\n'}
                    <span className="text-gray-500">2</span>  <span className="text-blue-400">&lt;html&gt;</span>{'\n'}
                    <span className="text-gray-500">3</span>    <span className="text-blue-400">&lt;body&gt;</span>{'\n'}
                    <span className="text-gray-500">4</span>      <span className="text-blue-400">&lt;h1&gt;</span><span className="text-green-400">Mon Premier Site</span><span className="text-blue-400">&lt;/h1&gt;</span>{'\n'}
                    <span className="text-gray-500">5</span>      <span className="text-blue-400">&lt;p&gt;</span><span className="text-green-400">Bienvenue !</span><span className="text-blue-400">&lt;/p&gt;</span>{'\n'}
                    <span className="text-gray-500">6</span>    <span className="text-blue-400">&lt;/body&gt;</span>{'\n'}
                    <span className="text-gray-500">7</span>  <span className="text-blue-400">&lt;/html&gt;</span>
                  </code>
                </pre>
              </div>
              {/* Preview */}
              <div className="border-t border-gray-700 bg-white p-4">
                <div className="text-gray-900">
                  <h2 className="text-xl font-bold mb-2">Mon Premier Site</h2>
                  <p>Bienvenue !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
