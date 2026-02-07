import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TheoryPanel } from './TheoryPanel'
import type { LessonTheory, LessonExercise } from '@/types/lesson'

const mockTheory: LessonTheory = {
  content: 'HTML utilise des balises.\n\nLa balise <h1> crée un titre.',
  examples: [
    {
      code: '<h1>Bonjour</h1>',
      description: 'Un titre en HTML',
    },
  ],
}

const mockExercise: LessonExercise = {
  instructions: 'Crée un titre avec <h1>.',
  starterCode: '',
  hints: ['Utilise <h1>'],
  tests: [
    { name: 'Un titre est présent', query: 'h1', assert: 'exists' },
    { name: 'Le titre a du texte', query: 'h1', assert: 'hasText' },
  ],
}

describe('TheoryPanel', () => {
  it('should render theory content', () => {
    render(<TheoryPanel theory={mockTheory} exercise={mockExercise} />)
    expect(screen.getByText(/html utilise des balises/i)).toBeInTheDocument()
  })

  it('should render code examples', () => {
    render(<TheoryPanel theory={mockTheory} exercise={mockExercise} />)
    expect(screen.getByText('<h1>Bonjour</h1>')).toBeInTheDocument()
    expect(screen.getByText('Un titre en HTML')).toBeInTheDocument()
  })

  it('should render exercise instructions', () => {
    render(<TheoryPanel theory={mockTheory} exercise={mockExercise} />)
    expect(screen.getByText(/exercice/i)).toBeInTheDocument()
    expect(screen.getByText(/crée un titre avec/i)).toBeInTheDocument()
  })

  it('should render exercise test checklist', () => {
    render(<TheoryPanel theory={mockTheory} exercise={mockExercise} />)
    expect(screen.getByText('Un titre est présent')).toBeInTheDocument()
    expect(screen.getByText('Le titre a du texte')).toBeInTheDocument()
  })
})
