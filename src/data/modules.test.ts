import { describe, it, expect } from 'vitest'
import { MODULES, MODULES_META, getLessonById, getNextLessonId, getFirstLessonId } from './modules'
import { module1Lessons } from './lessons/module-1'

describe('Modules Data', () => {
  // T1: Module data is valid
  it('should have 5 modules defined', () => {
    expect(MODULES_META).toHaveLength(5)
    expect(MODULES).toHaveLength(5)
  })

  it('should have correct module ids 1-5', () => {
    MODULES_META.forEach((m, i) => {
      expect(m.id).toBe(i + 1)
    })
  })

  it('should have title, description and lessonCount for all modules', () => {
    MODULES_META.forEach((m) => {
      expect(m.title.length).toBeGreaterThan(0)
      expect(m.description.length).toBeGreaterThan(0)
      expect(m.lessonCount).toBeGreaterThan(0)
    })
  })

  it('should total 22 lessons across all modules', () => {
    const total = MODULES_META.reduce((sum, m) => sum + m.lessonCount, 0)
    expect(total).toBe(22)
  })
})

describe('Module 1 Lessons', () => {
  // T2: Lesson content validation
  it('should have 6 lessons', () => {
    expect(module1Lessons).toHaveLength(6)
  })

  it('should have correct ids 1.1 to 1.6', () => {
    module1Lessons.forEach((l, i) => {
      expect(l.id).toBe(`1.${i + 1}`)
    })
  })

  it('should have theory content and at least one example for each lesson', () => {
    module1Lessons.forEach((l) => {
      expect(l.theory.content.length).toBeGreaterThan(0)
      expect(l.theory.examples.length).toBeGreaterThan(0)
    })
  })

  it('should have exercise with instructions, starterCode, hints, and tests', () => {
    module1Lessons.forEach((l) => {
      expect(l.exercise.instructions.length).toBeGreaterThan(0)
      expect(l.exercise.hints.length).toBeGreaterThanOrEqual(2)
      expect(l.exercise.tests.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('should have valid test assertions', () => {
    const validAsserts = ['exists', 'hasText', 'hasAttribute', 'count', 'textContains']
    module1Lessons.forEach((l) => {
      l.exercise.tests.forEach((t) => {
        expect(validAsserts).toContain(t.assert)
        expect(t.name.length).toBeGreaterThan(0)
        expect(t.query.length).toBeGreaterThan(0)
      })
    })
  })
})

describe('getLessonById', () => {
  it('should return lesson 1.1', () => {
    const lesson = getLessonById('1.1')
    expect(lesson).not.toBeNull()
    expect(lesson?.title).toContain('HTML')
  })

  it('should return null for unknown id', () => {
    expect(getLessonById('99.99')).toBeNull()
  })
})

describe('getNextLessonId', () => {
  it('should return 1.2 after 1.1', () => {
    expect(getNextLessonId('1.1')).toBe('1.2')
  })

  it('should return null for last lesson', () => {
    expect(getNextLessonId('1.6')).toBeNull()
  })

  it('should return null for unknown lesson', () => {
    expect(getNextLessonId('99.99')).toBeNull()
  })
})

describe('getFirstLessonId', () => {
  it('should return 1.1 for module 1', () => {
    expect(getFirstLessonId(1)).toBe('1.1')
  })

  it('should return null for module with no lessons', () => {
    expect(getFirstLessonId(2)).toBeNull()
  })
})
