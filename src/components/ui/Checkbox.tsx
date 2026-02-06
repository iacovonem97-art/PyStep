import { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Checkbox({ label, checked, onChange, className, id, ...props }: CheckboxProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('flex items-center', className)}>
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        {...props}
      />
      <label
        htmlFor={inputId}
        className="ml-2 block text-sm text-gray-700 cursor-pointer select-none"
      >
        {label}
      </label>
    </div>
  )
}
