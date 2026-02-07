import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useExercise } from './useExercise'
import type { LessonExercise } from '@/types/lesson'

const mockExercise: LessonExercise = {
  instructions: 'Create a heading',
  starterCode: '<!-- code here -->',
  hints: ['Use <h1>', 'Like this: <h1>Hello</h1>', '<h1>Hello World</h1>'],
  tests: [
    { name: 'h1 exists', query: 'h1', assert: 'exists' },
    { name: 'h1 has text', query: 'h1', assert: 'hasText' },
  ],
}

describe('useExercise', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should start with starter code', () => {
    const { result } = renderHook(() => useExercise(mockExercise))
    expect(result.current.code).toBe('<!-- code here -->')
    expect(result.current.codeChanged).toBe(false)
  })

  it('should track code changes', () => {
    const { result } = renderHook(() => useExercise(mockExercise))
    act(() => {
      result.current.setCode('<h1>Hello</h1>')
    })
    expect(result.current.codeChanged).toBe(true)
  })

  it('should validate code and return result', () => {
    const { result } = renderHook(() => useExercise(mockExercise))

    act(() => {
      result.current.setCode('<h1>Hello World</h1>')
    })

    act(() => {
      result.current.validate()
    })

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(result.current.validationResult).not.toBeNull()
    expect(result.current.validationResult?.passed).toBe(true)
    expect(result.current.attempts).toBe(1)
    expect(result.current.isSuccess).toBe(true)
  })

  it('should return failure for incorrect code', () => {
    const { result } = renderHook(() => useExercise(mockExercise))

    act(() => {
      result.current.setCode('<p>Not a heading</p>')
    })

    act(() => {
      result.current.validate()
    })

    act(() => {
      vi.advanceTimersByTime(400)
    })

    expect(result.current.validationResult?.passed).toBe(false)
    expect(result.current.isSuccess).toBe(false)
  })

  it('should increment hint level', () => {
    const { result } = renderHook(() => useExercise(mockExercise))
    expect(result.current.hintLevel).toBe(0)

    act(() => {
      result.current.nextHint()
    })
    expect(result.current.hintLevel).toBe(1)

    act(() => {
      result.current.nextHint()
    })
    expect(result.current.hintLevel).toBe(2)

    act(() => {
      result.current.nextHint()
    })
    expect(result.current.hintLevel).toBe(3) // capped at hints.length
  })

  it('should not exceed max hints', () => {
    const { result } = renderHook(() => useExercise(mockExercise))
    act(() => {
      result.current.nextHint()
      result.current.nextHint()
      result.current.nextHint()
      result.current.nextHint() // extra
    })
    expect(result.current.hintLevel).toBe(3)
  })

  it('should reset code to starter', () => {
    const { result } = renderHook(() => useExercise(mockExercise))

    act(() => {
      result.current.setCode('<h1>Changed</h1>')
      result.current.nextHint()
    })

    act(() => {
      result.current.resetCode()
    })

    expect(result.current.code).toBe('<!-- code here -->')
    expect(result.current.hintLevel).toBe(0)
    expect(result.current.validationResult).toBeNull()
  })
})
