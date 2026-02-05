import { UserPlus, BookOpen, Trophy } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Inscris-toi gratuitement',
    description: "Juste un email et c'est parti",
    icon: UserPlus,
  },
  {
    id: 2,
    title: 'Suis le parcours',
    description: '22 leçons interactives',
    icon: BookOpen,
  },
  {
    id: 3,
    title: 'Crée ton premier site',
    description: 'Un portfolio complet',
    icon: Trophy,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Comment ça marche ?
        </h2>
        <ol className="grid md:grid-cols-3 gap-8" role="list">
          {steps.map((step) => (
            <li
              key={step.id}
              className="relative flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl"
            >
              {/* Step Number */}
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4 font-bold text-xl">
                {step.id}
              </div>
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-2xl mb-4">
                <step.icon className="h-8 w-8" aria-hidden="true" />
              </div>
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
