import { Link } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ProgressBar } from '../components/ui/ProgressBar'
import { ModuleCard } from '../components/dashboard/ModuleCard'
import { MODULES_META } from '../data/modules'
import { useProgress } from '../features/progress/useProgress'
import { TOTAL_LESSONS } from '../lib/constants'

export default function DashboardPage() {
  const { user } = useAuthContext()
  const progress = useProgress(user?.id)

  const currentLessonId = progress.getCurrentLessonId()
  const hasProgress = progress.totalCompleted > 0

  const getModuleStatus = (moduleId: number): 'active' | 'locked' | 'complete' => {
    if (progress.isModuleComplete(moduleId)) return 'complete'
    if (progress.isModuleUnlocked(moduleId)) return 'active'
    return 'locked'
  }

  const getModuleCurrentLessonId = (moduleId: number): string | null => {
    if (!progress.isModuleUnlocked(moduleId)) return null
    if (progress.isModuleComplete(moduleId)) return null
    // Find first uncompleted lesson in this module's range
    const modulePrefix = `${moduleId}.`
    if (currentLessonId.startsWith(modulePrefix)) return currentLessonId
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
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

        {/* Progress Bar */}
        <section className="mb-8">
          <ProgressBar
            value={progress.percentComplete}
            label={`${progress.totalCompleted} leçons terminées sur ${TOTAL_LESSONS}`}
            showPercentage
          />
        </section>

        {/* Module Cards */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tes modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODULES_META.map((mod) => (
              <ModuleCard
                key={mod.id}
                module={mod}
                completedCount={progress.getModuleCompletedCount(mod.id)}
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
