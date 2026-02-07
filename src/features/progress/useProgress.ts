import { useState, useCallback } from 'react'
import { MODULES } from '@/data/modules'
import { TOTAL_LESSONS } from '@/lib/constants'

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  const totalCompleted = completedLessons.length
  const percentComplete = Math.round((totalCompleted / TOTAL_LESSONS) * 100)

  const getCurrentLessonId = useCallback((): string => {
    // Find first uncompleted lesson across all modules with content
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

  const completeLesson = useCallback((lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) return prev
      return [...prev, lessonId]
    })
  }, [])

  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => completedLessons.includes(lessonId),
    [completedLessons]
  )

  return {
    completedLessons,
    totalCompleted,
    percentComplete,
    getCurrentLessonId,
    getModuleCompletedCount,
    isModuleUnlocked,
    isModuleComplete,
    completeLesson,
    isLessonCompleted,
  }
}
