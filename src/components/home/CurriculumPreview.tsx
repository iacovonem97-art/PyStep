import { Code, FileCode, Palette, Layout, Trophy } from 'lucide-react'

const modules = [
  {
    id: 1,
    name: 'HTML Bases',
    description: 'Les fondations du web',
    lessons: 6,
    icon: Code,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'HTML Sémantique',
    description: 'Structure et accessibilité',
    lessons: 4,
    icon: FileCode,
    color: 'bg-indigo-500',
  },
  {
    id: 3,
    name: 'CSS Introduction',
    description: 'Styles et couleurs',
    lessons: 5,
    icon: Palette,
    color: 'bg-purple-500',
  },
  {
    id: 4,
    name: 'CSS Layout',
    description: 'Mise en page moderne',
    lessons: 5,
    icon: Layout,
    color: 'bg-pink-500',
  },
  {
    id: 5,
    name: 'Projet Final',
    description: 'Ton portfolio',
    lessons: 2,
    icon: Trophy,
    color: 'bg-yellow-500',
  },
]

export default function CurriculumPreview() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Le parcours complet
        </h2>

        {/* Desktop: Horizontal flow */}
        <ol className="hidden md:flex justify-center items-start gap-4" role="list">
          {modules.map((module, index) => (
            <li
              key={module.id}
              className="relative flex flex-col items-center"
            >
              {/* Connector line */}
              {index < modules.length - 1 && (
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
              )}
              {/* Module Card */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 w-40 text-center hover:shadow-lg transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${module.color} text-white rounded-xl mb-3`}>
                  <module.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {module.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {module.lessons} leçons
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Mobile: Vertical list */}
        <ol className="md:hidden space-y-4" role="list">
          {modules.map((module) => (
            <li
              key={module.id}
              className="flex items-center gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4"
            >
              <div className={`flex-shrink-0 w-12 h-12 ${module.color} text-white rounded-xl flex items-center justify-center`}>
                <module.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {module.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {module.lessons} leçons
                </p>
              </div>
              <div className="flex-shrink-0 text-gray-400">
                <span className="text-sm">Module {module.id}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
