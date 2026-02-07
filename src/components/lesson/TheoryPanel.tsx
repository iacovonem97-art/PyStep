import type { LessonTheory, LessonExercise } from '@/types/lesson'

interface TheoryPanelProps {
  theory: LessonTheory
  exercise: LessonExercise
}

export function TheoryPanel({ theory, exercise }: TheoryPanelProps) {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Theory Content */}
      <div className="prose prose-sm max-w-none">
        {theory.content.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-gray-700 leading-relaxed whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Code Examples */}
      {theory.examples.length > 0 && (
        <div className="space-y-3">
          {theory.examples.map((example, i) => (
            <div key={i}>
              {example.description && (
                <p className="text-sm text-gray-500 mb-1">{example.description}</p>
              )}
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* Exercise Instructions */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Exercice</h3>
        <p className="text-sm text-gray-700 mb-3">{exercise.instructions}</p>
        <ul className="space-y-1">
          {exercise.tests.map((test, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-gray-400">&#10003;</span>
              {test.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
