import { Lightbulb, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '../ui/Button'

interface ValidationBarProps {
  onValidate: () => void
  onHint: () => void
  isValidating: boolean
  codeChanged: boolean
}

export function ValidationBar({ onValidate, onHint, isValidating, codeChanged }: ValidationBarProps) {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-end gap-3">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onHint}
        className="inline-flex items-center gap-1"
      >
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        Indice
      </Button>
      <Button
        type="button"
        variant="primary"
        size="sm"
        onClick={onValidate}
        disabled={!codeChanged || isValidating}
        loading={isValidating}
      >
        <CheckCircle2 className="h-4 w-4 mr-1" aria-hidden="true" />
        Vérifier mon code
      </Button>
    </div>
  )
}
