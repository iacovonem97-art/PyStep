import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading

    const variantStyles = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
      secondary: 'bg-white text-indigo-600 border-indigo-500 border hover:bg-indigo-50 focus:ring-indigo-500',
      ghost: 'bg-transparent text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500',
      success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500',
    }

    const sizeStyles = {
      sm: 'py-2 px-4 text-sm h-9',
      md: 'py-3 px-6 text-base h-11',
      lg: 'py-4 px-8 text-lg h-13',
    }

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg',
          'transition-all duration-150 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <Loader2
            data-testid="loading-spinner"
            className="mr-2 h-4 w-4 animate-spin"
          />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
