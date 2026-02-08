import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { useProgress } from './useProgress'

// Mock progressService
const mockFetchProgress = vi.fn()
const mockMarkLessonComplete = vi.fn()
const mockSaveDraftCode = vi.fn()
const mockIncrementAttempts = vi.fn()

vi.mock('./progressService', () => ({
  fetchProgress: (...args: unknown[]) => mockFetchProgress(...args),
  markLessonComplete: (...args: unknown[]) => mockMarkLessonComplete(...args),
  saveDraftCode: (...args: unknown[]) => mockSaveDraftCode(...args),
  incrementAttempts: (...args: unknown[]) => mockIncrementAttempts(...args),
}))

describe('Progress Integration (STORY-009)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchProgress.mockResolvedValue([])
    mockMarkLessonComplete.mockResolvedValue(null)
    mockSaveDraftCode.mockResolvedValue(undefined)
    mockIncrementAttempts.mockResolvedValue(undefined)
  })

  describe('AC-3: Complete lesson → persist → progression reflects', () => {
    it('should complete a lesson and sync with Supabase', async () => {
      const { result } = renderHook(() => useProgress('user-1'))

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        result.current.completeLesson('1.1')
      })

      expect(result.current.completedLessons).toContain('1.1')
      expect(result.current.totalCompleted).toBe(1)
      expect(mockMarkLessonComplete).toHaveBeenCalledWith('user-1', '1.1')
    })

    it('should load persisted progress on mount', async () => {
      mockFetchProgress.mockResolvedValue([
        {
          id: '1', user_id: 'user-1', lesson_id: '1.1',
          completed: true, completed_at: '2026-01-01T00:00:00Z',
          draft_code: null, attempts: 2, created_at: '', updated_at: '',
        },
        {
          id: '2', user_id: 'user-1', lesson_id: '1.2',
          completed: true, completed_at: '2026-01-01T00:00:00Z',
          draft_code: null, attempts: 1, created_at: '', updated_at: '',
        },
      ])

      const { result } = renderHook(() => useProgress('user-1'))

      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.completedLessons).toEqual(['1.1', '1.2'])
      expect(result.current.totalCompleted).toBe(2)
      expect(result.current.getCurrentLessonId()).toBe('1.3')
    })
  })

  describe('AC-5: Draft code save and restore', () => {
    it('should save draft code and restore it on reload', async () => {
      // First session: type code
      mockFetchProgress.mockResolvedValue([])

      const { result } = renderHook(() => useProgress('user-1'))
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      vi.useFakeTimers()
      act(() => {
        result.current.saveDraft('1.1', '<h1>My Draft</h1>')
      })

      // Local cache updated immediately
      expect(result.current.getDraftCode('1.1')).toBe('<h1>My Draft</h1>')

      act(() => { vi.advanceTimersByTime(3000) })
      expect(mockSaveDraftCode).toHaveBeenCalledWith('user-1', '1.1', '<h1>My Draft</h1>')
      vi.useRealTimers()
    })

    it('should load draft from Supabase on mount', async () => {
      mockFetchProgress.mockResolvedValue([
        {
          id: '1', user_id: 'user-1', lesson_id: '1.1',
          completed: false, completed_at: null,
          draft_code: '<h1>Saved Draft</h1>',
          attempts: 0, created_at: '', updated_at: '',
        },
      ])

      const { result } = renderHook(() => useProgress('user-1'))
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.getDraftCode('1.1')).toBe('<h1>Saved Draft</h1>')
    })
  })

  describe('AC-6: Auto-resume to last uncompleted lesson', () => {
    it('should point to first uncompleted lesson', async () => {
      mockFetchProgress.mockResolvedValue([
        { id: '1', user_id: 'user-1', lesson_id: '1.1', completed: true, completed_at: '2026-01-01', draft_code: null, attempts: 1, created_at: '', updated_at: '' },
        { id: '2', user_id: 'user-1', lesson_id: '1.2', completed: true, completed_at: '2026-01-01', draft_code: null, attempts: 1, created_at: '', updated_at: '' },
        { id: '3', user_id: 'user-1', lesson_id: '1.3', completed: true, completed_at: '2026-01-01', draft_code: null, attempts: 1, created_at: '', updated_at: '' },
      ])

      const { result } = renderHook(() => useProgress('user-1'))
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      expect(result.current.getCurrentLessonId()).toBe('1.4')
    })
  })

  describe('AC-7: Non-connected user → local mode only', () => {
    it('should not call any Supabase functions without userId', () => {
      const { result } = renderHook(() => useProgress())

      act(() => {
        result.current.completeLesson('1.1')
      })

      expect(mockFetchProgress).not.toHaveBeenCalled()
      expect(mockMarkLessonComplete).not.toHaveBeenCalled()
      expect(result.current.completedLessons).toContain('1.1')
    })

    it('should not save draft without userId', () => {
      const { result } = renderHook(() => useProgress())

      act(() => {
        result.current.saveDraft('1.1', '<h1>Test</h1>')
      })

      expect(mockSaveDraftCode).not.toHaveBeenCalled()
    })
  })

  describe('AC-8: Attempt tracking', () => {
    it('should track attempts and persist', async () => {
      mockFetchProgress.mockResolvedValue([])

      const { result } = renderHook(() => useProgress('user-1'))
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      act(() => {
        result.current.trackAttempt('1.1')
      })

      expect(mockIncrementAttempts).toHaveBeenCalledWith('user-1', '1.1', 0)
      expect(result.current.getAttempts('1.1')).toBe(1)
    })
  })

  describe('Supabase down → graceful fallback', () => {
    it('should work in local mode when fetch fails', async () => {
      mockFetchProgress.mockResolvedValue([])

      const { result } = renderHook(() => useProgress('user-1'))
      await waitFor(() => expect(result.current.isLoading).toBe(false))

      // App works normally even without Supabase data
      act(() => {
        result.current.completeLesson('1.1')
      })

      expect(result.current.completedLessons).toContain('1.1')
      expect(result.current.getCurrentLessonId()).toBe('1.2')
    })
  })
})
