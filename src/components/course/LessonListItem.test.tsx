import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LessonListItem } from './LessonListItem'
import type { Lesson } from '@/types/lesson'

const mockLesson: Lesson = {
  id: '1.3',
  title: 'Les titres et paragraphes',
  module: 1,
  order: 3,
  theory: { content: '', examples: [] },
  exercise: { instructions: '', starterCode: '', hints: [], tests: [] },
}

describe('LessonListItem', () => {
  const renderItem = (status: 'completed' | 'current' | 'locked') => {
    return render(
      <BrowserRouter>
        <LessonListItem lesson={mockLesson} status={status} />
      </BrowserRouter>
    )
  }

  // T5: LessonListItem component
  it('should render lesson title', () => {
    renderItem('current')
    expect(screen.getByText(/1\.3 — les titres et paragraphes/i)).toBeInTheDocument()
  })

  it('should show "Revoir" for completed lessons', () => {
    renderItem('completed')
    expect(screen.getByText(/revoir/i)).toBeInTheDocument()
  })

  it('should show "Continuer" for current lesson', () => {
    renderItem('current')
    expect(screen.getByText(/continuer/i)).toBeInTheDocument()
  })

  it('should link to lesson page for completed lessons', () => {
    renderItem('completed')
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/lesson/1.3')
  })

  it('should link to lesson page for current lesson', () => {
    renderItem('current')
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/lesson/1.3')
  })

  it('should not have a link for locked lessons', () => {
    renderItem('locked')
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
