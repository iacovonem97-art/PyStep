import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import LessonPage from './LessonPage'

// Mock AuthContext
const mockUseAuthContext = vi.fn()
vi.mock('../contexts/AuthContext', () => ({
  useAuthContext: () => mockUseAuthContext(),
}))

// Mock useAuth
vi.mock('../features/auth/useAuth', () => ({
  useAuth: () => ({
    signOut: vi.fn().mockResolvedValue({ success: true, error: null }),
    loading: false,
  }),
}))

// Mock Monaco Editor
vi.mock('@monaco-editor/react', () => ({
  default: ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
    <textarea
      data-testid="monaco-editor-mock"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}))

describe('LessonPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuthContext.mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      session: { access_token: 'token' },
      loading: false,
    })
  })

  const renderLesson = (lessonId = '1.1') => {
    return render(
      <MemoryRouter initialEntries={[`/lesson/${lessonId}`]}>
        <Routes>
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/course" element={<div>Course Page</div>} />
        </Routes>
      </MemoryRouter>
    )
  }

  it('should render lesson title in header', () => {
    renderLesson('1.1')
    expect(screen.getByText("Qu'est-ce que le HTML ?")).toBeInTheDocument()
  })

  it('should render lesson id in header', () => {
    renderLesson('1.4')
    expect(screen.getByText(/leçon 1\.4/i)).toBeInTheDocument()
  })

  it('should render theory content', () => {
    renderLesson('1.1')
    const htmlMentions = screen.getAllByText(/hypertext markup language/i)
    expect(htmlMentions.length).toBeGreaterThan(0)
  })

  it('should render exercise section', () => {
    renderLesson('1.1')
    const exerciseHeadings = screen.getAllByText(/exercice/i)
    expect(exerciseHeadings.length).toBeGreaterThan(0)
  })

  it('should render code editor', () => {
    renderLesson('1.1')
    expect(screen.getByTestId('monaco-editor-mock')).toBeInTheDocument()
  })

  it('should render preview panel', () => {
    renderLesson('1.1')
    expect(screen.getByTestId('preview-panel')).toBeInTheDocument()
  })

  it('should redirect to /course for invalid lesson id', () => {
    renderLesson('99.99')
    expect(screen.getByText('Course Page')).toBeInTheDocument()
  })

  it('should show "Réinitialiser" button', () => {
    renderLesson('1.1')
    expect(screen.getByText(/réinitialiser/i)).toBeInTheDocument()
  })

  it('should have back link to course', () => {
    renderLesson('1.1')
    const backLink = screen.getByRole('link', { name: /retour au parcours/i })
    expect(backLink).toHaveAttribute('href', '/course')
  })
})
