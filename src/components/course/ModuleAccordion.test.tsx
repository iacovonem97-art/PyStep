import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ModuleAccordion } from './ModuleAccordion'

const mockModule = {
  id: 1,
  title: 'Les fondations HTML',
  description: 'Apprends les bases',
  lessonCount: 6,
}

describe('ModuleAccordion', () => {
  // T4: ModuleAccordion component
  it('should render module title and progress', () => {
    render(
      <ModuleAccordion
        module={mockModule}
        completedCount={3}
        isUnlocked
        isComplete={false}
        isExpanded={false}
        onToggle={vi.fn()}
      >
        <div>lessons</div>
      </ModuleAccordion>
    )
    expect(screen.getByText(/les fondations html/i)).toBeInTheDocument()
    expect(screen.getByText('3/6')).toBeInTheDocument()
  })

  it('should call onToggle when header is clicked', () => {
    const onToggle = vi.fn()
    render(
      <ModuleAccordion
        module={mockModule}
        completedCount={0}
        isUnlocked
        isComplete={false}
        isExpanded={false}
        onToggle={onToggle}
      >
        <div>lessons</div>
      </ModuleAccordion>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalled()
  })

  it('should show children when expanded and unlocked', () => {
    render(
      <ModuleAccordion
        module={mockModule}
        completedCount={0}
        isUnlocked
        isComplete={false}
        isExpanded
        onToggle={vi.fn()}
      >
        <div>lesson content</div>
      </ModuleAccordion>
    )
    expect(screen.getByText('lesson content')).toBeInTheDocument()
  })

  it('should show lock message when expanded but locked', () => {
    render(
      <ModuleAccordion
        module={{ ...mockModule, id: 2 }}
        completedCount={0}
        isUnlocked={false}
        isComplete={false}
        isExpanded
        onToggle={vi.fn()}
      >
        <div>lesson content</div>
      </ModuleAccordion>
    )
    expect(screen.getByText(/termine le module 1/i)).toBeInTheDocument()
    expect(screen.queryByText('lesson content')).not.toBeInTheDocument()
  })

  it('should not show content when collapsed', () => {
    render(
      <ModuleAccordion
        module={mockModule}
        completedCount={0}
        isUnlocked
        isComplete={false}
        isExpanded={false}
        onToggle={vi.fn()}
      >
        <div>lesson content</div>
      </ModuleAccordion>
    )
    expect(screen.queryByText('lesson content')).not.toBeInTheDocument()
  })
})
