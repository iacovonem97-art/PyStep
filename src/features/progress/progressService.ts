import { supabase } from '@/lib/supabase'
import type { UserProgress } from '@/types/progress'

/**
 * Fetch all progress records for a user
 */
export async function fetchProgress(userId: string): Promise<UserProgress[]> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      console.warn('fetchProgress error:', error.message)
      return []
    }

    return data as UserProgress[]
  } catch {
    console.warn('fetchProgress: Supabase unreachable')
    return []
  }
}

/**
 * Upsert a progress record (insert or update)
 */
export async function saveProgress(
  userId: string,
  lessonId: string,
  data: Partial<Pick<UserProgress, 'completed' | 'completed_at' | 'draft_code' | 'attempts'>>
): Promise<UserProgress | null> {
  try {
    const { data: result, error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          ...data,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      )
      .select()
      .single()

    if (error) {
      console.warn('saveProgress error:', error.message)
      return null
    }

    return result as UserProgress
  } catch {
    console.warn('saveProgress: Supabase unreachable')
    return null
  }
}

/**
 * Save draft code for a lesson (debounced at caller level)
 */
export async function saveDraftCode(
  userId: string,
  lessonId: string,
  code: string
): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          draft_code: code,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      )

    if (error) {
      console.warn('saveDraftCode error:', error.message)
    }
  } catch {
    console.warn('saveDraftCode: Supabase unreachable')
  }
}

/**
 * Mark a lesson as completed with timestamp
 */
export async function markLessonComplete(
  userId: string,
  lessonId: string
): Promise<UserProgress | null> {
  return saveProgress(userId, lessonId, {
    completed: true,
    completed_at: new Date().toISOString(),
  })
}

/**
 * Increment attempts counter for a lesson
 */
export async function incrementAttempts(
  userId: string,
  lessonId: string,
  currentAttempts: number
): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          attempts: currentAttempts + 1,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      )

    if (error) {
      console.warn('incrementAttempts error:', error.message)
    }
  } catch {
    console.warn('incrementAttempts: Supabase unreachable')
  }
}
