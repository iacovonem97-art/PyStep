export interface UserProgress {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
  draft_code: string | null
  attempts: number
  created_at: string
  updated_at: string
}

export interface ProgressState {
  completedLessons: string[]
  currentLessonId: string | null
  totalCompleted: number
  totalLessons: number
  percentComplete: number
}
