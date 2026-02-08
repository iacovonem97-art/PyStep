import { describe, it, expect } from 'vitest'
import { MODULES, MODULES_META, getLessonById, getNextLessonId, getFirstLessonId } from './modules'
import { module1Lessons } from './lessons/module-1'
import { module2Lessons } from './lessons/module-2'
import { module3Lessons } from './lessons/module-3'
import { module4Lessons } from './lessons/module-4'

describe('Modules Data', () => {
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

describe('Module 2 Lessons', () => {
  it('should have 4 lessons', () => {
    expect(module2Lessons).toHaveLength(4)
  })

  it('should have correct ids 2.1 to 2.4', () => {
    module2Lessons.forEach((l, i) => {
      expect(l.id).toBe(`2.${i + 1}`)
    })
  })

  it('should have module=2 and sequential order', () => {
    module2Lessons.forEach((l, i) => {
      expect(l.module).toBe(2)
      expect(l.order).toBe(i + 1)
    })
  })

  it('should have theory content and at least one example for each lesson', () => {
    module2Lessons.forEach((l) => {
      expect(l.theory.content.length).toBeGreaterThan(0)
      expect(l.theory.examples.length).toBeGreaterThan(0)
    })
  })

  it('should have exercise with instructions and starterCode', () => {
    module2Lessons.forEach((l) => {
      expect(l.exercise.instructions.length).toBeGreaterThan(0)
      expect(l.exercise.starterCode).toBeDefined()
    })
  })

  it('should have exactly 3 hints per lesson', () => {
    module2Lessons.forEach((l) => {
      expect(l.exercise.hints).toHaveLength(3)
    })
  })

  it('should have at least 2 tests per lesson', () => {
    module2Lessons.forEach((l) => {
      expect(l.exercise.tests.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('should have valid test assertions', () => {
    const validAsserts = ['exists', 'hasText', 'hasAttribute', 'count', 'textContains']
    module2Lessons.forEach((l) => {
      l.exercise.tests.forEach((t) => {
        expect(validAsserts).toContain(t.assert)
        expect(t.name.length).toBeGreaterThan(0)
        expect(t.query.length).toBeGreaterThan(0)
      })
    })
  })

  it('should have titles in French', () => {
    module2Lessons.forEach((l) => {
      expect(l.title.length).toBeGreaterThan(0)
    })
  })
})

describe('Module 3 Lessons', () => {
  it('should have 5 lessons', () => {
    expect(module3Lessons).toHaveLength(5)
  })

  it('should have correct ids 3.1 to 3.5', () => {
    module3Lessons.forEach((l, i) => {
      expect(l.id).toBe(`3.${i + 1}`)
    })
  })

  it('should have module=3 and sequential order', () => {
    module3Lessons.forEach((l, i) => {
      expect(l.module).toBe(3)
      expect(l.order).toBe(i + 1)
    })
  })

  it('should have theory content and at least one example for each lesson', () => {
    module3Lessons.forEach((l) => {
      expect(l.theory.content.length).toBeGreaterThan(0)
      expect(l.theory.examples.length).toBeGreaterThan(0)
    })
  })

  it('should have exercise with instructions and starterCode containing <style>', () => {
    module3Lessons.forEach((l) => {
      expect(l.exercise.instructions.length).toBeGreaterThan(0)
      expect(l.exercise.starterCode).toContain('<style>')
    })
  })

  it('should have exactly 3 hints per lesson', () => {
    module3Lessons.forEach((l) => {
      expect(l.exercise.hints).toHaveLength(3)
    })
  })

  it('should have at least 2 tests per lesson', () => {
    module3Lessons.forEach((l) => {
      expect(l.exercise.tests.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('should have valid test assertions', () => {
    const validAsserts = ['exists', 'hasText', 'hasAttribute', 'count', 'textContains']
    module3Lessons.forEach((l) => {
      l.exercise.tests.forEach((t) => {
        expect(validAsserts).toContain(t.assert)
        expect(t.name.length).toBeGreaterThan(0)
        expect(t.query.length).toBeGreaterThan(0)
      })
    })
  })

  it('should verify style tag presence in tests', () => {
    module3Lessons.forEach((l) => {
      const hasStyleTest = l.exercise.tests.some((t) => t.query === 'style')
      expect(hasStyleTest).toBe(true)
    })
  })

  it('should have titles in French', () => {
    module3Lessons.forEach((l) => {
      expect(l.title.length).toBeGreaterThan(0)
    })
  })
})

describe('Module 4 Lessons', () => {
  it('should have 5 lessons', () => {
    expect(module4Lessons).toHaveLength(5)
  })

  it('should have correct ids 4.1 to 4.5', () => {
    module4Lessons.forEach((l, i) => {
      expect(l.id).toBe(`4.${i + 1}`)
    })
  })

  it('should have module=4 and sequential order', () => {
    module4Lessons.forEach((l, i) => {
      expect(l.module).toBe(4)
      expect(l.order).toBe(i + 1)
    })
  })

  it('should have theory content and at least one example for each lesson', () => {
    module4Lessons.forEach((l) => {
      expect(l.theory.content.length).toBeGreaterThan(0)
      expect(l.theory.examples.length).toBeGreaterThan(0)
    })
  })

  it('should have exercise with instructions and starterCode containing <style>', () => {
    module4Lessons.forEach((l) => {
      expect(l.exercise.instructions.length).toBeGreaterThan(0)
      expect(l.exercise.starterCode).toContain('<style>')
    })
  })

  it('should have exactly 3 hints per lesson', () => {
    module4Lessons.forEach((l) => {
      expect(l.exercise.hints).toHaveLength(3)
    })
  })

  it('should have at least 3 tests per lesson', () => {
    module4Lessons.forEach((l) => {
      expect(l.exercise.tests.length).toBeGreaterThanOrEqual(3)
    })
  })

  it('should have valid test assertions', () => {
    const validAsserts = ['exists', 'hasText', 'hasAttribute', 'count', 'textContains']
    module4Lessons.forEach((l) => {
      l.exercise.tests.forEach((t) => {
        expect(validAsserts).toContain(t.assert)
        expect(t.name.length).toBeGreaterThan(0)
        expect(t.query.length).toBeGreaterThan(0)
      })
    })
  })

  it('should verify style tag presence in tests', () => {
    module4Lessons.forEach((l) => {
      const hasStyleTest = l.exercise.tests.some((t) => t.query === 'style')
      expect(hasStyleTest).toBe(true)
    })
  })

  it('should have titles in French', () => {
    module4Lessons.forEach((l) => {
      expect(l.title.length).toBeGreaterThan(0)
    })
  })
})

describe('getLessonById', () => {
  it('should return lesson 1.1', () => {
    const lesson = getLessonById('1.1')
    expect(lesson).not.toBeNull()
    expect(lesson?.title).toContain('HTML')
  })

  it('should return lesson 2.1', () => {
    const lesson = getLessonById('2.1')
    expect(lesson).not.toBeNull()
    expect(lesson?.title).toContain('sémantiques')
  })

  it('should return lesson 3.1', () => {
    const lesson = getLessonById('3.1')
    expect(lesson).not.toBeNull()
    expect(lesson?.title).toContain('CSS')
  })

  it('should return lesson 4.1', () => {
    const lesson = getLessonById('4.1')
    expect(lesson).not.toBeNull()
    expect(lesson?.title).toContain('Display')
  })

  it('should return null for unknown id', () => {
    expect(getLessonById('99.99')).toBeNull()
  })
})

describe('getNextLessonId', () => {
  it('should return 1.2 after 1.1', () => {
    expect(getNextLessonId('1.1')).toBe('1.2')
  })

  it('should return 2.1 after 1.6 (cross-module 1→2)', () => {
    expect(getNextLessonId('1.6')).toBe('2.1')
  })

  it('should return 2.2 after 2.1', () => {
    expect(getNextLessonId('2.1')).toBe('2.2')
  })

  it('should return 2.3 after 2.2', () => {
    expect(getNextLessonId('2.2')).toBe('2.3')
  })

  it('should return 2.4 after 2.3', () => {
    expect(getNextLessonId('2.3')).toBe('2.4')
  })

  it('should return 3.1 after 2.4 (cross-module 2→3)', () => {
    expect(getNextLessonId('2.4')).toBe('3.1')
  })

  it('should return 3.2 after 3.1', () => {
    expect(getNextLessonId('3.1')).toBe('3.2')
  })

  it('should return 3.5 after 3.4', () => {
    expect(getNextLessonId('3.4')).toBe('3.5')
  })

  it('should return 4.1 after 3.5 (cross-module 3→4)', () => {
    expect(getNextLessonId('3.5')).toBe('4.1')
  })

  it('should return 4.2 after 4.1', () => {
    expect(getNextLessonId('4.1')).toBe('4.2')
  })

  it('should return 4.5 after 4.4', () => {
    expect(getNextLessonId('4.4')).toBe('4.5')
  })

  it('should return null after 4.5 (last lesson with content)', () => {
    expect(getNextLessonId('4.5')).toBeNull()
  })

  it('should return null for unknown lesson', () => {
    expect(getNextLessonId('99.99')).toBeNull()
  })
})

describe('getFirstLessonId', () => {
  it('should return 1.1 for module 1', () => {
    expect(getFirstLessonId(1)).toBe('1.1')
  })

  it('should return 2.1 for module 2', () => {
    expect(getFirstLessonId(2)).toBe('2.1')
  })

  it('should return 3.1 for module 3', () => {
    expect(getFirstLessonId(3)).toBe('3.1')
  })

  it('should return 4.1 for module 4', () => {
    expect(getFirstLessonId(4)).toBe('4.1')
  })

  it('should return null for module with no lessons', () => {
    expect(getFirstLessonId(5)).toBeNull()
  })
})

describe('Cross-module navigation (full flow)', () => {
  it('should navigate continuously from 1.1 to 4.5', () => {
    const expectedSequence = [
      '1.1', '1.2', '1.3', '1.4', '1.5', '1.6',
      '2.1', '2.2', '2.3', '2.4',
      '3.1', '3.2', '3.3', '3.4', '3.5',
      '4.1', '4.2', '4.3', '4.4', '4.5',
    ]

    let current = '1.1'
    const visited: string[] = [current]

    let next = getNextLessonId(current)
    while (next) {
      visited.push(next)
      current = next
      next = getNextLessonId(current)
    }

    expect(visited).toEqual(expectedSequence)
    expect(visited).toHaveLength(20) // 6 + 4 + 5 + 5 = 20 lessons
  })
})
