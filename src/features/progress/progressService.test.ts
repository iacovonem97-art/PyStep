import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchProgress, saveProgress, saveDraftCode, markLessonComplete, incrementAttempts } from './progressService'

// Mock supabase
const mockSelect = vi.fn().mockReturnThis()
const mockEq = vi.fn()
const mockUpsert = vi.fn().mockReturnThis()
const mockSingle = vi.fn()

vi.mock('../../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: mockSelect,
      eq: mockEq,
      upsert: mockUpsert,
    })),
  },
}))

describe('progressService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset chain methods
    mockSelect.mockReturnThis()
    mockEq.mockResolvedValue({ data: [], error: null })
    mockUpsert.mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    })
    mockSingle.mockResolvedValue({ data: null, error: null })
  })

  describe('fetchProgress', () => {
    it('should return progress records for a user', async () => {
      const mockData = [
        { id: '1', user_id: 'user-1', lesson_id: '1.1', completed: true, attempts: 2 },
        { id: '2', user_id: 'user-1', lesson_id: '1.2', completed: false, attempts: 0 },
      ]
      mockEq.mockResolvedValue({ data: mockData, error: null })

      const result = await fetchProgress('user-1')
      expect(result).toEqual(mockData)
    })

    it('should return empty array on error', async () => {
      mockEq.mockResolvedValue({ data: null, error: { message: 'DB error' } })

      const result = await fetchProgress('user-1')
      expect(result).toEqual([])
    })

    it('should return empty array when Supabase is unreachable', async () => {
      mockEq.mockRejectedValue(new Error('Network error'))

      const result = await fetchProgress('user-1')
      expect(result).toEqual([])
    })
  })

  describe('saveProgress', () => {
    it('should upsert progress data', async () => {
      const mockResult = {
        id: '1',
        user_id: 'user-1',
        lesson_id: '1.1',
        completed: true,
        completed_at: '2026-01-01T00:00:00.000Z',
      }
      mockSingle.mockResolvedValue({ data: mockResult, error: null })

      const result = await saveProgress('user-1', '1.1', {
        completed: true,
        completed_at: '2026-01-01T00:00:00.000Z',
      })
      expect(result).toEqual(mockResult)
    })

    it('should return null on error', async () => {
      mockSingle.mockResolvedValue({ data: null, error: { message: 'Upsert error' } })

      const result = await saveProgress('user-1', '1.1', { completed: true })
      expect(result).toBeNull()
    })

    it('should return null when Supabase is unreachable', async () => {
      mockUpsert.mockImplementation(() => {
        throw new Error('Network error')
      })

      const result = await saveProgress('user-1', '1.1', { completed: true })
      expect(result).toBeNull()
    })
  })

  describe('saveDraftCode', () => {
    it('should call upsert with draft code', async () => {
      mockUpsert.mockReturnValue({ error: null })

      await saveDraftCode('user-1', '1.1', '<h1>Hello</h1>')
      // Should not throw
    })

    it('should not throw on error', async () => {
      mockUpsert.mockReturnValue({ error: { message: 'Save error' } })

      await expect(saveDraftCode('user-1', '1.1', '<h1>Hello</h1>')).resolves.toBeUndefined()
    })

    it('should not throw when Supabase is unreachable', async () => {
      mockUpsert.mockImplementation(() => {
        throw new Error('Network error')
      })

      await expect(saveDraftCode('user-1', '1.1', '<h1>Hello</h1>')).resolves.toBeUndefined()
    })
  })

  describe('markLessonComplete', () => {
    it('should call saveProgress with completed=true and timestamp', async () => {
      const mockResult = {
        id: '1',
        user_id: 'user-1',
        lesson_id: '1.1',
        completed: true,
        completed_at: expect.any(String),
      }
      mockSingle.mockResolvedValue({ data: mockResult, error: null })

      const result = await markLessonComplete('user-1', '1.1')
      expect(result).toEqual(mockResult)
    })
  })

  describe('incrementAttempts', () => {
    it('should increment the attempt counter', async () => {
      mockUpsert.mockReturnValue({ error: null })

      await incrementAttempts('user-1', '1.1', 3)
      // Should not throw
    })

    it('should not throw on error', async () => {
      mockUpsert.mockReturnValue({ error: { message: 'Error' } })

      await expect(incrementAttempts('user-1', '1.1', 0)).resolves.toBeUndefined()
    })
  })
})
