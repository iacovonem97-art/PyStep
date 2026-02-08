import { useState, useCallback, useEffect, useRef } from 'react'
import { MODULES } from '@/data/modules'
import { TOTAL_LESSONS } from '@/lib/constants'
import { fetchProgress, markLessonComplete, saveDraftCode, incrementAttempts } from './progressService'
import type { UserProgress } from '@/types/progress'

const DRAFT_DEBOUNCE_MS = 3000

export function useProgress(userId?: string | null) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [progressRecords, setProgressRecords] = useState<UserProgress[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Debounce timer ref for draft saves
  const draftTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load progress from Supabase on mount (if userId provided)
  useEffect(() => {
    if (!userId) return

    setIsLoading(true)
    fetchProgress(userId).then((records) => {
      setProgressRecords(records)
      const completed = records.filter((r) => r.completed).map((r) => r.lesson_id)
      setCompletedLessons(completed)
      setIsLoading(false)
    })
  }, [userId])

  const totalCompleted = completedLessons.length
  const percentComplete = Math.round((totalCompleted / TOTAL_LESSONS) * 100)

  const getCurrentLessonId = useCallback((): string => {
    const allLessons = MODULES.flatMap((m) => m.lessons)
    const firstUncompleted = allLessons.find((l) => !completedLessons.includes(l.id))
    return firstUncompleted?.id ?? allLessons[allLessons.length - 1]?.id ?? '1.1'
  }, [completedLessons])

  const getModuleCompletedCount = useCallback(
    (moduleId: number): number => {
      const mod = MODULES.find((m) => m.id === moduleId)
      if (!mod) return 0
      return mod.lessons.filter((l) => completedLessons.includes(l.id)).length
    },
    [completedLessons]
  )

  const isModuleUnlocked = useCallback(
    (moduleId: number): boolean => {
      if (moduleId === 1) return true
      const prevModule = MODULES.find((m) => m.id === moduleId - 1)
      if (!prevModule) return false
      if (prevModule.lessons.length === 0) return false
      return prevModule.lessons.every((l) => completedLessons.includes(l.id))
    },
    [completedLessons]
  )

  const isModuleComplete = useCallback(
    (moduleId: number): boolean => {
      const mod = MODULES.find((m) => m.id === moduleId)
      if (!mod || mod.lessons.length === 0) return false
      return mod.lessons.every((l) => completedLessons.includes(l.id))
    },
    [completedLessons]
  )

  const completeLesson = useCallback(
    (lessonId: string) => {
      setCompletedLessons((prev) => {
        if (prev.includes(lessonId)) return prev
        return [...prev, lessonId]
      })

      // Persist to Supabase if authenticated
      if (userId) {
        markLessonComplete(userId, lessonId)
      }
    },
    [userId]
  )

  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => completedLessons.includes(lessonId),
    [completedLessons]
  )

  const saveDraft = useCallback(
    (lessonId: string, code: string) => {
      if (!userId) return

      // Update local cache immediately
      setProgressRecords((prev) => {
        const existing = prev.find((r) => r.lesson_id === lessonId)
        if (existing) {
          return prev.map((r) =>
            r.lesson_id === lessonId ? { ...r, draft_code: code } : r
          )
        }
        return [
          ...prev,
          {
            id: '',
            user_id: userId,
            lesson_id: lessonId,
            completed: false,
            completed_at: null,
            draft_code: code,
            attempts: 0,
            created_at: '',
            updated_at: '',
          },
        ]
      })

      // Debounced Supabase save
      if (draftTimerRef.current) {
        clearTimeout(draftTimerRef.current)
      }
      draftTimerRef.current = setTimeout(() => {
        saveDraftCode(userId, lessonId, code)
      }, DRAFT_DEBOUNCE_MS)
    },
    [userId]
  )

  const getDraftCode = useCallback(
    (lessonId: string): string | null => {
      const record = progressRecords.find((r) => r.lesson_id === lessonId)
      return record?.draft_code ?? null
    },
    [progressRecords]
  )

  const getAttempts = useCallback(
    (lessonId: string): number => {
      const record = progressRecords.find((r) => r.lesson_id === lessonId)
      return record?.attempts ?? 0
    },
    [progressRecords]
  )

  const trackAttempt = useCallback(
    (lessonId: string) => {
      if (!userId) return

      const currentAttempts = progressRecords.find((r) => r.lesson_id === lessonId)?.attempts ?? 0
      incrementAttempts(userId, lessonId, currentAttempts)

      // Update local cache
      setProgressRecords((prev) => {
        const existing = prev.find((r) => r.lesson_id === lessonId)
        if (existing) {
          return prev.map((r) =>
            r.lesson_id === lessonId ? { ...r, attempts: r.attempts + 1 } : r
          )
        }
        return [
          ...prev,
          {
            id: '',
            user_id: userId,
            lesson_id: lessonId,
            completed: false,
            completed_at: null,
            draft_code: null,
            attempts: 1,
            created_at: '',
            updated_at: '',
          },
        ]
      })
    },
    [userId, progressRecords]
  )

  return {
    completedLessons,
    totalCompleted,
    percentComplete,
    isLoading,
    getCurrentLessonId,
    getModuleCompletedCount,
    isModuleUnlocked,
    isModuleComplete,
    completeLesson,
    isLessonCompleted,
    saveDraft,
    getDraftCode,
    getAttempts,
    trackAttempt,
  }
}
