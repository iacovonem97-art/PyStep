import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ProgressBar } from '../ui/ProgressBar'
import { TOTAL_LESSONS } from '@/lib/constants'

interface LessonHeaderProps {
  lessonTitle: string
  lessonId: string
  totalCompleted: number
}

export function LessonHeader({ lessonTitle, lessonId, totalCompleted }: LessonHeaderProps) {
  const lessonNumber = parseInt(lessonId.replace('.', ''), 10)
  const progressValue = Math.round((totalCompleted / TOTAL_LESSONS) * 100)

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link
            to="/course"
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Retour au parcours"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-xs text-gray-400 font-medium">Leçon {lessonId}</span>
            <h1 className="text-sm font-semibold text-gray-900">{lessonTitle}</h1>
          </div>
        </div>
        <ProgressBar
          value={progressValue}
          showPercentage
          className="w-32"
        />
      </div>
    </div>
  )
}
