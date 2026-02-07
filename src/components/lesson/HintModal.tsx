import { X } from 'lucide-react'
import { Button } from '../ui/Button'

interface HintModalProps {
  hints: string[]
  currentLevel: number
  onClose: () => void
  onNextHint: () => void
}

export function HintModal({ hints, currentLevel, onClose, onNextHint }: HintModalProps) {
  const hintIndex = currentLevel - 1
  const isLastHint = currentLevel >= hints.length
  const isShowingSolution = currentLevel === hints.length

  const title = isShowingSolution ? 'Solution' : `Indice ${currentLevel}`
  const hint = hints[hintIndex] ?? ''

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          {hint.includes('\n') ? (
            <pre className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
              {hint}
            </pre>
          ) : (
            <p className="text-gray-700">{hint}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="primary" size="sm" onClick={onClose}>
            Compris !
          </Button>
          {!isLastHint && (
            <button
              type="button"
              onClick={onNextHint}
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {currentLevel < hints.length - 1 ? 'Encore un indice' : 'Voir la solution'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
