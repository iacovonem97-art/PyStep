export interface Lesson {
  id: string
  title: string
  module: number
  order: number
  theory: LessonTheory
  exercise: LessonExercise
}

export interface LessonTheory {
  content: string
  examples: CodeExample[]
}

export interface CodeExample {
  code: string
  description?: string
  result?: string
}

export interface LessonExercise {
  instructions: string
  starterCode: string
  hints: string[]
  tests: ExerciseTest[]
}

export interface ExerciseTest {
  name: string
  query: string
  assert: 'exists' | 'hasText' | 'hasAttribute' | 'count' | 'textContains'
  value?: string | number
}
