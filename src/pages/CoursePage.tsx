import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { ProgressBar } from '../components/ui/ProgressBar'
import { ModuleAccordion } from '../components/course/ModuleAccordion'
import { LessonListItem } from '../components/course/LessonListItem'
import { MODULES } from '../data/modules'
import { useProgress } from '../features/progress/useProgress'
import { TOTAL_LESSONS } from '../lib/constants'

export default function CoursePage() {
  const progress = useProgress()
  const currentLessonId = progress.getCurrentLessonId()

  // Expand module containing current lesson by default
  const currentModuleId = MODULES.find((m) =>
    m.lessons.some((l) => l.id === currentLessonId)
  )?.id ?? 1

  const [expandedModules, setExpandedModules] = useState<Set<number>>(
    new Set([currentModuleId])
  )

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev)
      if (next.has(moduleId)) {
        next.delete(moduleId)
      } else {
        next.add(moduleId)
      }
      return next
    })
  }

  const getLessonStatus = (lessonId: string): 'completed' | 'current' | 'locked' => {
    if (progress.isLessonCompleted(lessonId)) return 'completed'
    if (lessonId === currentLessonId) return 'current'

    // Check if the lesson's module is unlocked and it's reachable
    const lessonModule = MODULES.find((m) => m.lessons.some((l) => l.id === lessonId))
    if (!lessonModule || !progress.isModuleUnlocked(lessonModule.id)) return 'locked'

    // Within an unlocked module, lessons after current are locked
    const lessonInModule = lessonModule.lessons.find((l) => l.id === lessonId)
    const currentInModule = lessonModule.lessons.find((l) => l.id === currentLessonId)
    if (lessonInModule && currentInModule && lessonInModule.order > currentInModule.order) {
      return 'locked'
    }

    return 'locked'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Le parcours complet</h1>
          <Link
            to="/dashboard"
            className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Dashboard
          </Link>
        </div>

        <ProgressBar
          value={progress.percentComplete}
          label={`${progress.totalCompleted} leçons terminées sur ${TOTAL_LESSONS}`}
          showPercentage
          className="mb-8"
        />

        <div className="space-y-4">
          {MODULES.map((mod) => (
            <ModuleAccordion
              key={mod.id}
              module={mod}
              completedCount={progress.getModuleCompletedCount(mod.id)}
              isUnlocked={progress.isModuleUnlocked(mod.id)}
              isComplete={progress.isModuleComplete(mod.id)}
              isExpanded={expandedModules.has(mod.id)}
              onToggle={() => toggleModule(mod.id)}
            >
              <div className="space-y-1">
                {mod.lessons.map((lesson) => (
                  <LessonListItem
                    key={lesson.id}
                    lesson={lesson}
                    status={getLessonStatus(lesson.id)}
                  />
                ))}
              </div>
            </ModuleAccordion>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
