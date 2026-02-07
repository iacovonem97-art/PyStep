import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProgress } from './useProgress'

describe('useProgress', () => {
  // T6: useProgress hook
  it('should start with no completed lessons', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.completedLessons).toHaveLength(0)
    expect(result.current.totalCompleted).toBe(0)
    expect(result.current.percentComplete).toBe(0)
  })

  it('should return first lesson as current when no progress', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.getCurrentLessonId()).toBe('1.1')
  })

  it('should calculate progress after completing a lesson', () => {
    const { result } = renderHook(() => useProgress())

    act(() => {
      result.current.completeLesson('1.1')
    })

    expect(result.current.totalCompleted).toBe(1)
    expect(result.current.percentComplete).toBe(5) // 1/22 ≈ 5%
    expect(result.current.isLessonCompleted('1.1')).toBe(true)
    expect(result.current.getCurrentLessonId()).toBe('1.2')
  })

  it('should not duplicate completed lessons', () => {
    const { result } = renderHook(() => useProgress())

    act(() => {
      result.current.completeLesson('1.1')
      result.current.completeLesson('1.1')
    })

    expect(result.current.totalCompleted).toBe(1)
  })

  it('should unlock module 1 by default', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.isModuleUnlocked(1)).toBe(true)
  })

  it('should not unlock module 2 without completing module 1', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.isModuleUnlocked(2)).toBe(false)
  })

  it('should unlock module 2 after completing all module 1 lessons', () => {
    const { result } = renderHook(() => useProgress())

    act(() => {
      result.current.completeLesson('1.1')
      result.current.completeLesson('1.2')
      result.current.completeLesson('1.3')
      result.current.completeLesson('1.4')
      result.current.completeLesson('1.5')
      result.current.completeLesson('1.6')
    })

    expect(result.current.isModuleUnlocked(2)).toBe(true)
    expect(result.current.isModuleComplete(1)).toBe(true)
  })

  it('should count completed lessons per module', () => {
    const { result } = renderHook(() => useProgress())

    act(() => {
      result.current.completeLesson('1.1')
      result.current.completeLesson('1.2')
    })

    expect(result.current.getModuleCompletedCount(1)).toBe(2)
    expect(result.current.getModuleCompletedCount(2)).toBe(0)
  })
})
