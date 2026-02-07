import { useState, useCallback } from 'react'
import type { LessonExercise } from '@/types/lesson'
import { validateExercise, type ValidationResult } from './validator'

interface UseExerciseReturn {
  code: string
  setCode: (code: string) => void
  validationResult: ValidationResult | null
  isValidating: boolean
  hintLevel: number
  attempts: number
  isSuccess: boolean
  validate: () => void
  nextHint: () => void
  resetHints: () => void
  resetCode: () => void
  codeChanged: boolean
}

export function useExercise(exercise: LessonExercise): UseExerciseReturn {
  const [code, setCode] = useState(exercise.starterCode)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [hintLevel, setHintLevel] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const codeChanged = code !== exercise.starterCode && code.trim().length > 0

  const isSuccess = validationResult?.passed ?? false

  const validate = useCallback(() => {
    setIsValidating(true)
    // Small delay for UX feel
    setTimeout(() => {
      const result = validateExercise(code, exercise.tests)
      setValidationResult(result)
      setAttempts((prev) => prev + 1)
      setIsValidating(false)
    }, 300)
  }, [code, exercise.tests])

  const nextHint = useCallback(() => {
    setHintLevel((prev) => Math.min(prev + 1, exercise.hints.length))
  }, [exercise.hints.length])

  const resetHints = useCallback(() => {
    setHintLevel(0)
  }, [])

  const resetCode = useCallback(() => {
    setCode(exercise.starterCode)
    setValidationResult(null)
    setHintLevel(0)
  }, [exercise.starterCode])

  return {
    code,
    setCode,
    validationResult,
    isValidating,
    hintLevel,
    attempts,
    isSuccess,
    validate,
    nextHint,
    resetHints,
    resetCode,
    codeChanged,
  }
}
