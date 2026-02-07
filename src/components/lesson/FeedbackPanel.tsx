import { Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import type { ValidationResult } from '@/features/lessons/validator'
import { Button } from '../ui/Button'

interface FeedbackPanelProps {
  result: ValidationResult
  nextLessonId: string | null
  onRetry: () => void
  onHint: () => void
}

export function FeedbackPanel({ result, nextLessonId, onRetry, onHint }: FeedbackPanelProps) {
  const isSuccess = result.passed

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="text-center mb-4">
          {isSuccess ? (
            <>
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-xl font-bold text-gray-900">Bravo !</h2>
              <p className="text-gray-600 text-sm mt-1">Tu as réussi cet exercice !</p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2">💪</div>
              <h2 className="text-xl font-bold text-gray-900">Presque !</h2>
              <p className="text-gray-600 text-sm mt-1">Tu y es presque, continue !</p>
            </>
          )}
        </div>

        {/* Test Results */}
        <div className="space-y-2 mb-6">
          {result.results.map((test, i) => (
            <div key={i} className="flex items-start gap-2">
              {test.passed ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <span className="text-sm text-gray-700">{test.name}</span>
                {!test.passed && test.message && (
                  <p className="text-xs text-gray-500 mt-0.5">{test.message}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        {isSuccess ? (
          <div className="space-y-2">
            {nextLessonId ? (
              <Link
                to={`/lesson/${nextLessonId}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Leçon suivante
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                to="/course"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Module terminé !
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <Button
              type="button"
              variant="primary"
              onClick={onRetry}
              className="w-full"
            >
              Réessayer
            </Button>
            <button
              type="button"
              onClick={onHint}
              className="w-full text-sm text-indigo-600 hover:text-indigo-500 font-medium py-2"
            >
              Voir un indice
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
