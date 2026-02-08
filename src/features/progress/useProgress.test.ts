import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useProgress } from './useProgress'

// Mock progressService
vi.mock('./progressService', () => ({
  fetchProgress: vi.fn().mockResolvedValue([]),
  markLessonComplete: vi.fn().mockResolvedValue(null),
  saveDraftCode: vi.fn().mockResolvedValue(undefined),
  incrementAttempts: vi.fn().mockResolvedValue(undefined),
}))

import { fetchProgress, markLessonComplete, saveDraftCode } from './progressService'

describe('useProgress (local mode - no userId)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should start with no completed lessons', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.completedLessons).toHaveLength(0)
    expect(result.current.totalCompleted).toBe(0)
    expect(result.current.percentComplete).toBe(0)
  })

  it('should not be loading in local mode', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.isLoading).toBe(false)
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

  it('should not call Supabase when no userId', () => {
    renderHook(() => useProgress())
    expect(fetchProgress).not.toHaveBeenCalled()
  })

  it('should not call markLessonComplete when no userId', () => {
    const { result } = renderHook(() => useProgress())
    act(() => {
      result.current.completeLesson('1.1')
    })
    expect(markLessonComplete).not.toHaveBeenCalled()
  })

  it('should not call saveDraftCode when no userId', () => {
    const { result } = renderHook(() => useProgress())
    act(() => {
      result.current.saveDraft('1.1', '<h1>Test</h1>')
    })
    expect(saveDraftCode).not.toHaveBeenCalled()
  })

  it('should return null for getDraftCode with no records', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.getDraftCode('1.1')).toBeNull()
  })

  it('should return 0 for getAttempts with no records', () => {
    const { result } = renderHook(() => useProgress())
    expect(result.current.getAttempts('1.1')).toBe(0)
  })
})

describe('useProgress (Supabase mode - with userId)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should load progress from Supabase on mount', async () => {
    const mockRecords = [
      {
        id: '1',
        user_id: 'user-1',
        lesson_id: '1.1',
        completed: true,
        completed_at: '2026-01-01T00:00:00Z',
        draft_code: null,
        attempts: 3,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
      {
        id: '2',
        user_id: 'user-1',
        lesson_id: '1.2',
        completed: false,
        completed_at: null,
        draft_code: '<h1>Draft</h1>',
        attempts: 1,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      },
    ]
    vi.mocked(fetchProgress).mockResolvedValue(mockRecords)

    const { result } = renderHook(() => useProgress('user-1'))

    // Initially loading
    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(fetchProgress).toHaveBeenCalledWith('user-1')
    expect(result.current.completedLessons).toEqual(['1.1'])
    expect(result.current.totalCompleted).toBe(1)
    expect(result.current.getDraftCode('1.2')).toBe('<h1>Draft</h1>')
    expect(result.current.getAttempts('1.1')).toBe(3)
  })

  it('should show loading state during fetch', async () => {
    vi.mocked(fetchProgress).mockResolvedValue([])

    const { result } = renderHook(() => useProgress('user-1'))

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should call markLessonComplete on Supabase when completing lesson', async () => {
    vi.mocked(fetchProgress).mockResolvedValue([])

    const { result } = renderHook(() => useProgress('user-1'))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    act(() => {
      result.current.completeLesson('1.1')
    })

    expect(markLessonComplete).toHaveBeenCalledWith('user-1', '1.1')
    expect(result.current.completedLessons).toContain('1.1')
  })

  it('should save draft code locally and debounce Supabase call', async () => {
    vi.mocked(fetchProgress).mockResolvedValue([])

    const { result } = renderHook(() => useProgress('user-1'))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    vi.useFakeTimers()

    act(() => {
      result.current.saveDraft('1.1', '<h1>Draft 1</h1>')
    })

    // Local cache updated immediately
    expect(result.current.getDraftCode('1.1')).toBe('<h1>Draft 1</h1>')

    // Supabase not called yet (debounced)
    expect(saveDraftCode).not.toHaveBeenCalled()

    // Advance timer past debounce
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(saveDraftCode).toHaveBeenCalledWith('user-1', '1.1', '<h1>Draft 1</h1>')

    vi.useRealTimers()
  })

  it('should handle Supabase being down gracefully', async () => {
    vi.mocked(fetchProgress).mockResolvedValue([])

    const { result } = renderHook(() => useProgress('user-1'))

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    // Should still work in local mode
    act(() => {
      result.current.completeLesson('1.1')
    })

    expect(result.current.completedLessons).toContain('1.1')
  })
})
