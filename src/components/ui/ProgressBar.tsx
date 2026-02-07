import { cn } from '../../lib/utils'

interface ProgressBarProps {
  value: number
  label?: string
  showPercentage?: boolean
  className?: string
}

export function ProgressBar({ value, label, showPercentage, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-1">
        {label && <span className="text-sm text-gray-600">{label}</span>}
        {showPercentage && <span className="text-sm font-medium text-gray-700">{clamped}%</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          data-testid="progress-fill"
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
