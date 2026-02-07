import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ProgressBar } from '../components/ui/ProgressBar'
import { ModuleCard } from '../components/dashboard/ModuleCard'
import { TOTAL_LESSONS } from '../lib/constants'

const MODULES = [
  { id: 1, title: 'Les fondations HTML', description: 'Découvre les bases du HTML et crée ta première page web', lessonCount: 6 },
  { id: 2, title: 'HTML sémantique', description: 'Structure tes pages avec les balises sémantiques', lessonCount: 4 },
  { id: 3, title: 'Introduction au CSS', description: 'Ajoute du style à tes pages avec les bases du CSS', lessonCount: 5 },
  { id: 4, title: 'Mise en page CSS', description: 'Maîtrise Flexbox, Grid et le responsive design', lessonCount: 5 },
  { id: 5, title: 'Projet Final', description: 'Crée un portfolio complet en HTML et CSS', lessonCount: 2 },
]

export default function DashboardPage() {
  const { user } = useAuthContext()

  // Static progress for Sprint 2 (no Supabase persistence yet)
  const completedLessons: string[] = []
  const totalCompleted = completedLessons.length
  const percentComplete = Math.round((totalCompleted / TOTAL_LESSONS) * 100)
  const currentLessonId = '1.1'
  const hasProgress = totalCompleted > 0

  const getModuleStatus = (moduleId: number): 'active' | 'locked' | 'complete' => {
    // Module 1 always unlocked
    if (moduleId === 1) return 'active'
    return 'locked'
  }

  const getModuleCompletedCount = (_moduleId: number): number => {
    return 0
  }

  const getModuleCurrentLessonId = (moduleId: number): string | null => {
    if (moduleId === 1) return currentLessonId
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - AC-2 */}
        <section className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenue {user?.email} !
          </h1>

          {hasProgress ? (
            <p className="text-gray-600 mb-4">
              Tu en es à la leçon {currentLessonId}
            </p>
          ) : (
            <p className="text-gray-600 mb-4">Prêt à commencer ?</p>
          )}

          <Link
            to={`/lesson/${currentLessonId}`}
            className="inline-flex items-center bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {hasProgress ? 'Continuer' : 'Commencer le parcours'}
          </Link>
        </section>

        {/* Progress Bar - AC-3 */}
        <section className="mb-8">
          <ProgressBar
            value={percentComplete}
            label={`${totalCompleted} leçons terminées sur ${TOTAL_LESSONS}`}
            showPercentage
          />
        </section>

        {/* Module Cards - AC-4 */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tes modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODULES.map((mod) => (
              <ModuleCard
                key={mod.id}
                module={mod}
                completedCount={getModuleCompletedCount(mod.id)}
                status={getModuleStatus(mod.id)}
                currentLessonId={getModuleCurrentLessonId(mod.id)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
