import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ModuleCard } from './ModuleCard'

const baseModule = {
  id: 1,
  title: 'Les fondations HTML',
  description: 'Apprends les bases du HTML',
  lessonCount: 6,
}

describe('ModuleCard', () => {
  const renderCard = (props: Partial<Parameters<typeof ModuleCard>[0]> = {}) => {
    return render(
      <BrowserRouter>
        <ModuleCard
          module={baseModule}
          completedCount={0}
          status="locked"
          currentLessonId={null}
          {...props}
        />
      </BrowserRouter>
    )
  }

  // T4: ModuleCard component
  it('should render module name and progress', () => {
    renderCard({ completedCount: 3, status: 'active' })
    expect(screen.getByText('Les fondations HTML')).toBeInTheDocument()
    expect(screen.getByText('3/6')).toBeInTheDocument()
  })

  it('should show locked state with message', () => {
    renderCard({ status: 'locked' })
    expect(screen.getByText(/termine le module/i)).toBeInTheDocument()
  })

  it('should show "Continuer" link when active with progress', () => {
    renderCard({ status: 'active', completedCount: 3, currentLessonId: '1.4' })
    const link = screen.getByRole('link', { name: /continuer/i })
    expect(link).toHaveAttribute('href', '/lesson/1.4')
  })

  it('should show "Commencer" link when active with no progress', () => {
    renderCard({ status: 'active', completedCount: 0, currentLessonId: '1.1' })
    const link = screen.getByRole('link', { name: /commencer/i })
    expect(link).toBeInTheDocument()
  })

  it('should show completed state', () => {
    renderCard({ status: 'complete', completedCount: 6 })
    expect(screen.getByText('6/6')).toBeInTheDocument()
    expect(screen.getByText(/terminé/i)).toBeInTheDocument()
  })

  it('should show module description', () => {
    renderCard()
    expect(screen.getByText('Apprends les bases du HTML')).toBeInTheDocument()
  })
})
