import { ChevronDown, Lock, CheckCircle2, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ModuleMeta } from '@/types/module'

interface ModuleAccordionProps {
  module: ModuleMeta
  completedCount: number
  isUnlocked: boolean
  isComplete: boolean
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

export function ModuleAccordion({
  module,
  completedCount,
  isUnlocked,
  isComplete,
  isExpanded,
  onToggle,
  children,
}: ModuleAccordionProps) {
  const StatusIcon = isComplete ? CheckCircle2 : isUnlocked ? BookOpen : Lock

  return (
    <div
      className={cn(
        'border rounded-lg overflow-hidden',
        isComplete && 'border-emerald-200',
        isUnlocked && !isComplete && 'border-indigo-200',
        !isUnlocked && 'border-gray-200 opacity-75'
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between px-5 py-4 text-left transition-colors',
          isComplete && 'bg-emerald-50 hover:bg-emerald-100',
          isUnlocked && !isComplete && 'bg-white hover:bg-gray-50',
          !isUnlocked && 'bg-gray-50'
        )}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <StatusIcon
            className={cn(
              'h-5 w-5 flex-shrink-0',
              isComplete && 'text-emerald-500',
              isUnlocked && !isComplete && 'text-indigo-500',
              !isUnlocked && 'text-gray-400'
            )}
            aria-hidden="true"
          />
          <div>
            <h3
              className={cn(
                'font-semibold',
                !isUnlocked && 'text-gray-500'
              )}
            >
              Module {module.id} : {module.title}
            </h3>
            <p className="text-sm text-gray-500">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={cn(
            'text-sm font-medium',
            isComplete ? 'text-emerald-600' : 'text-gray-500'
          )}>
            {completedCount}/{module.lessonCount}
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 text-gray-400 transition-transform',
              isExpanded && 'rotate-180'
            )}
            aria-hidden="true"
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200 px-5 py-3">
          {isUnlocked ? (
            children
          ) : (
            <p className="text-sm text-gray-400 py-2">
              Termine le Module {module.id - 1} pour débloquer ce module
            </p>
          )}
        </div>
      )}
    </div>
  )
}
