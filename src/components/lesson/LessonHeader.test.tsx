import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LessonHeader } from './LessonHeader'

describe('LessonHeader', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <LessonHeader
          lessonTitle="Les listes"
          lessonId="1.4"
          totalCompleted={3}
        />
      </BrowserRouter>
    )
  }

  it('should render lesson title', () => {
    renderHeader()
    expect(screen.getByText('Les listes')).toBeInTheDocument()
  })

  it('should render lesson id', () => {
    renderHeader()
    expect(screen.getByText(/leçon 1\.4/i)).toBeInTheDocument()
  })

  it('should have back link to course', () => {
    renderHeader()
    const link = screen.getByRole('link', { name: /retour au parcours/i })
    expect(link).toHaveAttribute('href', '/course')
  })

  it('should show progress bar', () => {
    renderHeader()
    expect(screen.getByTestId('progress-fill')).toBeInTheDocument()
  })
})
