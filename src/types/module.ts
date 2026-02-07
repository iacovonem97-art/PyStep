import type { Lesson } from './lesson'

export interface Module {
  id: number
  title: string
  description: string
  lessonCount: number
  lessons: Lesson[]
}

export interface ModuleMeta {
  id: number
  title: string
  description: string
  lessonCount: number
}
