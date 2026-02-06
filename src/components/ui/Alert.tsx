import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  className?: string
}

const alertStyles = {
  success: {
    container: 'bg-emerald-50 border-l-4 border-emerald-500',
    text: 'text-emerald-800',
    icon: CheckCircle,
  },
  error: {
    container: 'bg-red-50 border-l-4 border-red-500',
    text: 'text-red-800',
    icon: XCircle,
  },
  warning: {
    container: 'bg-amber-50 border-l-4 border-amber-500',
    text: 'text-amber-800',
    icon: AlertTriangle,
  },
  info: {
    container: 'bg-blue-50 border-l-4 border-blue-500',
    text: 'text-blue-800',
    icon: Info,
  },
}

export function Alert({ type, message, className }: AlertProps) {
  const styles = alertStyles[type]
  const Icon = styles.icon

  return (
    <div
      role="alert"
      className={cn(
        'p-4 rounded-lg flex items-start gap-3',
        styles.container,
        className
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', styles.text)} />
      <p className={cn('text-sm', styles.text)}>{message}</p>
    </div>
  )
}
