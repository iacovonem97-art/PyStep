import { Link } from 'react-router-dom'
import { Lock, CheckCircle2, BookOpen } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ModuleInfo {
  id: number
  title: string
  description: string
  lessonCount: number
}

interface ModuleCardProps {
  module: ModuleInfo
  completedCount: number
  status: 'active' | 'locked' | 'complete'
  currentLessonId: string | null
}

export function ModuleCard({ module, completedCount, status, currentLessonId }: ModuleCardProps) {
  const isLocked = status === 'locked'
  const isComplete = status === 'complete'
  const isActive = status === 'active'
  const hasProgress = completedCount > 0

  return (
    <div
      className={cn(
        'rounded-lg border p-5 transition-colors',
        isLocked && 'bg-gray-50 border-gray-200 opacity-75',
        isActive && 'bg-white border-indigo-200 shadow-sm',
        isComplete && 'bg-emerald-50 border-emerald-200'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {isLocked && <Lock className="h-4 w-4 text-gray-400" aria-hidden="true" />}
          {isActive && <BookOpen className="h-4 w-4 text-indigo-500" aria-hidden="true" />}
          {isComplete && <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" />}
          <span className="text-xs font-medium text-gray-400 uppercase">Module {module.id}</span>
        </div>
        <span className={cn(
          'text-sm font-medium',
          isComplete ? 'text-emerald-600' : 'text-gray-500'
        )}>
          {completedCount}/{module.lessonCount}
        </span>
      </div>

      <h3 className={cn(
        'font-semibold mb-1',
        isLocked ? 'text-gray-500' : 'text-gray-900'
      )}>
        {module.title}
      </h3>

      <p className="text-sm text-gray-500 mb-3">{module.description}</p>

      {isLocked && (
        <p className="text-xs text-gray-400">
          Termine le Module {module.id - 1} pour débloquer
        </p>
      )}

      {isComplete && (
        <p className="text-sm font-medium text-emerald-600">Terminé</p>
      )}

      {isActive && currentLessonId && (
        <Link
          to={`/lesson/${currentLessonId}`}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {hasProgress ? 'Continuer' : 'Commencer'} &rarr;
        </Link>
      )}
    </div>
  )
}
