import { Link } from 'react-router-dom'
import { CheckCircle2, PlayCircle, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Lesson } from '@/types/lesson'

interface LessonListItemProps {
  lesson: Lesson
  status: 'completed' | 'current' | 'locked'
}

export function LessonListItem({ lesson, status }: LessonListItemProps) {
  const isAccessible = status !== 'locked'

  const Icon = status === 'completed' ? CheckCircle2 : status === 'current' ? PlayCircle : Lock
  const iconColor =
    status === 'completed' ? 'text-emerald-500' : status === 'current' ? 'text-indigo-500' : 'text-gray-300'

  const content = (
    <div
      className={cn(
        'flex items-center justify-between py-3 px-3 rounded-lg',
        isAccessible && 'hover:bg-gray-50 transition-colors',
        !isAccessible && 'opacity-60'
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn('h-5 w-5 flex-shrink-0', iconColor)} aria-hidden="true" />
        <span className={cn('text-sm', !isAccessible && 'text-gray-400')}>
          {lesson.id} — {lesson.title}
        </span>
      </div>
      {status === 'completed' && (
        <span className="text-xs text-gray-400 font-medium">Revoir</span>
      )}
      {status === 'current' && (
        <span className="text-xs text-indigo-600 font-medium">Continuer</span>
      )}
    </div>
  )

  if (isAccessible) {
    return (
      <Link to={`/lesson/${lesson.id}`} className="block">
        {content}
      </Link>
    )
  }

  return <div>{content}</div>
}
