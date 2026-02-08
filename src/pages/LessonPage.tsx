import { useState, useEffect, useCallback } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { getLessonById, getNextLessonId } from '../data/modules'
import { useAuthContext } from '../contexts/AuthContext'
import { useProgress } from '../features/progress/useProgress'
import { useExercise } from '../features/lessons/useExercise'
import { LessonHeader } from '../components/lesson/LessonHeader'
import { TheoryPanel } from '../components/lesson/TheoryPanel'
import { CodeEditor } from '../components/lesson/CodeEditor'
import { PreviewPanel } from '../components/lesson/PreviewPanel'
import { ValidationBar } from '../components/lesson/ValidationBar'
import { FeedbackPanel } from '../components/lesson/FeedbackPanel'
import { HintModal } from '../components/lesson/HintModal'
import { cn } from '../lib/utils'

type Tab = 'theory' | 'code'

export default function LessonPage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuthContext()
  const lesson = id ? getLessonById(id) : null
  const progress = useProgress(user?.id)

  // Load draft code if available, otherwise use starterCode
  const draftCode = lesson ? progress.getDraftCode(lesson.id) : null
  const initialCode = draftCode ?? lesson?.exercise.starterCode ?? ''

  const exercise = useExercise(lesson?.exercise ?? {
    instructions: '',
    starterCode: '',
    hints: [],
    tests: [],
  }, initialCode)

  const [activeTab, setActiveTab] = useState<Tab>('theory')
  const [showFeedback, setShowFeedback] = useState(false)
  const [showHint, setShowHint] = useState(false)

  if (!lesson) {
    return <Navigate to="/course" replace />
  }

  const nextLessonId = getNextLessonId(lesson.id)

  // Save draft on code change
  const handleCodeChange = useCallback(
    (newCode: string) => {
      exercise.setCode(newCode)
      if (lesson) {
        progress.saveDraft(lesson.id, newCode)
      }
    },
    [exercise, lesson, progress]
  )

  const handleValidate = () => {
    exercise.validate()
    if (lesson) {
      progress.trackAttempt(lesson.id)
    }
    // Show feedback after validation completes
    setTimeout(() => setShowFeedback(true), 400)
  }

  const handleRetry = () => {
    setShowFeedback(false)
  }

  const handleHintFromFeedback = () => {
    setShowFeedback(false)
    if (exercise.hintLevel === 0) {
      exercise.nextHint()
    }
    setShowHint(true)
  }

  const handleHintFromBar = () => {
    if (exercise.hintLevel === 0) {
      exercise.nextHint()
    }
    setShowHint(true)
  }

  const handleNextHint = () => {
    exercise.nextHint()
  }

  const handleCloseHint = () => {
    setShowHint(false)
  }

  const handleResetCode = () => {
    if (exercise.codeChanged) {
      if (window.confirm('Réinitialiser le code ? Tes modifications seront perdues.')) {
        exercise.resetCode()
      }
    }
  }

  // Mark lesson complete on success
  useEffect(() => {
    if (exercise.isSuccess && lesson) {
      progress.completeLesson(lesson.id)
    }
  }, [exercise.isSuccess, lesson, progress])

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <LessonHeader
        lessonTitle={lesson.title}
        lessonId={lesson.id}
        totalCompleted={progress.totalCompleted}
      />

      {/* Mobile tabs */}
      <div className="md:hidden flex border-b border-gray-200 bg-white">
        <button
          type="button"
          onClick={() => setActiveTab('theory')}
          className={cn(
            'flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors',
            activeTab === 'theory'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          Théorie
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('code')}
          className={cn(
            'flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors',
            activeTab === 'code'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          Code
        </button>
      </div>

      {/* Desktop: split layout / Mobile: tabs */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 h-full">
          <div className="border-r border-gray-200 bg-white overflow-y-auto">
            <TheoryPanel theory={lesson.theory} exercise={lesson.exercise} />
          </div>
          <div className="flex flex-col h-full">
            <div className="flex-1 min-h-0">
              <CodeEditor value={exercise.code} onChange={handleCodeChange} />
            </div>
            <div className="h-[40%] border-t border-gray-200">
              <PreviewPanel code={exercise.code} />
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden h-full">
          {activeTab === 'theory' ? (
            <div className="h-full bg-white overflow-y-auto">
              <TheoryPanel theory={lesson.theory} exercise={lesson.exercise} />
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <CodeEditor value={exercise.code} onChange={handleCodeChange} />
              </div>
              <div className="h-[40%] border-t border-gray-200">
                <PreviewPanel code={exercise.code} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handleResetCode}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Réinitialiser
        </button>
        <ValidationBar
          onValidate={handleValidate}
          onHint={handleHintFromBar}
          isValidating={exercise.isValidating}
          codeChanged={exercise.codeChanged}
        />
      </div>

      {/* Feedback modal */}
      {showFeedback && exercise.validationResult && (
        <FeedbackPanel
          result={exercise.validationResult}
          nextLessonId={nextLessonId}
          onRetry={handleRetry}
          onHint={handleHintFromFeedback}
        />
      )}

      {/* Hint modal */}
      {showHint && exercise.hintLevel > 0 && (
        <HintModal
          hints={lesson.exercise.hints}
          currentLevel={exercise.hintLevel}
          onClose={handleCloseHint}
          onNextHint={handleNextHint}
        />
      )}
    </div>
  )
}
