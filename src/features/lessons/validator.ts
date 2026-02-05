import type { ExerciseTest } from '@/types/lesson'

export interface ValidationResult {
  passed: boolean
  results: TestResult[]
}

export interface TestResult {
  name: string
  passed: boolean
  message?: string
}

/**
 * Parse HTML string into a Document for testing
 * Uses DOMParser for unit tests, iframe for browser context
 */
export function parseHTML(code: string): Document {
  const parser = new DOMParser()
  return parser.parseFromString(code, 'text/html')
}

/**
 * Run a single test against a document
 */
export function runTest(
  doc: Document,
  test: ExerciseTest
): { passed: boolean; message?: string } {
  const elements = doc.querySelectorAll(test.query)

  switch (test.assert) {
    case 'exists':
      return {
        passed: elements.length > 0,
        message:
          elements.length > 0
            ? undefined
            : `Élément "${test.query}" non trouvé`,
      }

    case 'hasText': {
      const hasText = Array.from(elements).some(
        (el) => (el.textContent?.trim().length ?? 0) > 0
      )
      return {
        passed: hasText,
        message: hasText ? undefined : `L'élément "${test.query}" est vide`,
      }
    }

    case 'count': {
      const count = elements.length
      const expected = test.value as number
      return {
        passed: count === expected,
        message:
          count === expected
            ? undefined
            : `Attendu: ${expected} élément(s), trouvé: ${count}`,
      }
    }

    case 'textContains': {
      const searchText = test.value as string
      const contains = Array.from(elements).some((el) =>
        el.textContent?.includes(searchText)
      )
      return {
        passed: contains,
        message: contains
          ? undefined
          : `Le texte "${searchText}" n'a pas été trouvé`,
      }
    }

    case 'hasAttribute': {
      const attrValue = test.value as string
      const [attr, value] = attrValue.includes('=')
        ? attrValue.split('=')
        : [attrValue, undefined]

      const hasAttr = Array.from(elements).some((el) => {
        if (value !== undefined) {
          return el.getAttribute(attr) === value
        }
        return el.hasAttribute(attr)
      })
      return {
        passed: hasAttr,
        message: hasAttr
          ? undefined
          : value
            ? `Attribut "${attr}=${value}" non trouvé`
            : `Attribut "${attr}" non trouvé`,
      }
    }

    default:
      return { passed: false, message: `Type d'assertion inconnu: ${test.assert}` }
  }
}

/**
 * Validate exercise code against a list of tests
 */
export function validateExercise(
  code: string,
  tests: ExerciseTest[]
): ValidationResult {
  const doc = parseHTML(code)

  const results: TestResult[] = tests.map((test) => {
    const result = runTest(doc, test)
    return {
      name: test.name,
      passed: result.passed,
      message: result.message,
    }
  })

  return {
    passed: results.every((r) => r.passed),
    results,
  }
}

/**
 * Validate exercise in browser context using iframe (for actual app usage)
 * Provides sandboxed execution environment
 */
export function validateExerciseInBrowser(
  code: string,
  tests: ExerciseTest[]
): ValidationResult {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.sandbox.add('allow-same-origin')
  document.body.appendChild(iframe)

  try {
    const doc = iframe.contentDocument
    if (!doc) {
      throw new Error('Cannot access iframe document')
    }

    doc.open()
    doc.write(code)
    doc.close()

    const results: TestResult[] = tests.map((test) => {
      const result = runTest(doc, test)
      return {
        name: test.name,
        passed: result.passed,
        message: result.message,
      }
    })

    return {
      passed: results.every((r) => r.passed),
      results,
    }
  } finally {
    document.body.removeChild(iframe)
  }
}
