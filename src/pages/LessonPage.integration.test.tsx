import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
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

describe('LessonPage Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    mockUseAuthContext.mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      session: { access_token: 'token' },
      loading: false,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
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

  // Validation flow
  it('should show "Vérifier mon code" button', () => {
    renderLesson('1.1')
    expect(screen.getByText(/vérifier mon code/i)).toBeInTheDocument()
  })

  it('should show "Indice" button', () => {
    renderLesson('1.1')
    expect(screen.getByText(/indice/i)).toBeInTheDocument()
  })

  it('should disable validate button when code has not changed', () => {
    renderLesson('1.1')
    const btn = screen.getByText(/vérifier mon code/i).closest('button')!
    expect(btn).toBeDisabled()
  })

  it('should enable validate button after editing code', () => {
    renderLesson('1.1')
    const editor = screen.getByTestId('monaco-editor-mock')
    fireEvent.change(editor, { target: { value: '<h1>Hello</h1>' } })

    const btn = screen.getByText(/vérifier mon code/i).closest('button')!
    expect(btn).not.toBeDisabled()
  })

  it('should show success feedback after correct validation', () => {
    renderLesson('1.1')
    const editor = screen.getByTestId('monaco-editor-mock')

    // Write correct code (lesson 1.1 needs <h1> with text)
    act(() => {
      fireEvent.change(editor, { target: { value: '<h1>Hello World</h1>' } })
    })

    // Click validate
    act(() => {
      fireEvent.click(screen.getByText(/vérifier mon code/i))
    })

    // Advance timers for validation delay (300ms) + feedback show (400ms)
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText('Bravo !')).toBeInTheDocument()
    expect(screen.getByText(/leçon suivante/i)).toBeInTheDocument()
  })

  it('should show error feedback after incorrect validation', () => {
    renderLesson('1.1')
    const editor = screen.getByTestId('monaco-editor-mock')

    act(() => {
      fireEvent.change(editor, { target: { value: '<p>No heading</p>' } })
    })

    act(() => {
      fireEvent.click(screen.getByText(/vérifier mon code/i))
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText('Presque !')).toBeInTheDocument()
    expect(screen.getByText(/réessayer/i)).toBeInTheDocument()
    expect(screen.getByText(/voir un indice/i)).toBeInTheDocument()
  })

  it('should close feedback and return to editor on retry', () => {
    renderLesson('1.1')
    const editor = screen.getByTestId('monaco-editor-mock')

    act(() => {
      fireEvent.change(editor, { target: { value: '<p>Wrong</p>' } })
    })

    act(() => {
      fireEvent.click(screen.getByText(/vérifier mon code/i))
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Click retry
    act(() => {
      fireEvent.click(screen.getByText(/réessayer/i))
    })

    // Feedback should be closed
    expect(screen.queryByText('Presque !')).not.toBeInTheDocument()
    // Editor still available
    expect(screen.getByTestId('monaco-editor-mock')).toBeInTheDocument()
  })

  // Hint flow
  it('should open hint modal when clicking "Indice"', () => {
    renderLesson('1.1')

    act(() => {
      fireEvent.click(screen.getByText(/indice/i))
    })

    expect(screen.getByText('Indice 1')).toBeInTheDocument()
    expect(screen.getByText(/compris/i)).toBeInTheDocument()
  })

  it('should progress through hint levels', () => {
    renderLesson('1.1')

    // Open hint
    act(() => {
      fireEvent.click(screen.getByText(/indice/i))
    })

    expect(screen.getByText('Indice 1')).toBeInTheDocument()

    // Go to next hint
    act(() => {
      fireEvent.click(screen.getByText(/encore un indice/i))
    })

    expect(screen.getByText('Indice 2')).toBeInTheDocument()
  })

  it('should close hint modal on "Compris !"', () => {
    renderLesson('1.1')

    act(() => {
      fireEvent.click(screen.getByText(/indice/i))
    })

    expect(screen.getByText('Indice 1')).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByText(/compris/i))
    })

    expect(screen.queryByText('Indice 1')).not.toBeInTheDocument()
  })

  // Hint from error feedback
  it('should open hint from error feedback panel', () => {
    renderLesson('1.1')
    const editor = screen.getByTestId('monaco-editor-mock')

    act(() => {
      fireEvent.change(editor, { target: { value: '<p>Wrong</p>' } })
    })

    act(() => {
      fireEvent.click(screen.getByText(/vérifier mon code/i))
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Click "Voir un indice" from feedback
    act(() => {
      fireEvent.click(screen.getByText(/voir un indice/i))
    })

    // Feedback closed, hint opened
    expect(screen.queryByText('Presque !')).not.toBeInTheDocument()
    expect(screen.getByText('Indice 1')).toBeInTheDocument()
  })

  // Cross-module navigation: 1.6 now has a next lesson (2.1)
  it('should show "Leçon suivante" after 1.6 success (Module 2 exists)', () => {
    renderLesson('1.6')
    const editor = screen.getByTestId('monaco-editor-mock')

    // Lesson 1.6 is about images - needs <img> with src and alt
    act(() => {
      fireEvent.change(editor, {
        target: { value: '<img src="photo.jpg" alt="Une photo">' },
      })
    })

    act(() => {
      fireEvent.click(screen.getByText(/vérifier mon code/i))
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText('Bravo !')).toBeInTheDocument()
    expect(screen.getByText(/leçon suivante/i)).toBeInTheDocument()
  })

  // Last lesson of the course (5.2)
  it('should show "Module terminé !" for last lesson with content', () => {
    renderLesson('5.2')
    const editor = screen.getByTestId('monaco-editor-mock')

    // Lesson 5.2 needs header, nav, 3 sections, 2 articles, footer, style, div
    act(() => {
      fireEvent.change(editor, {
        target: {
          value: '<style>header{background:#1e293b;}nav{display:flex;}section{padding:20px;}footer{text-align:center;}</style><header><nav><a href="#">A</a><a href="#">B</a><a href="#">C</a></nav></header><main><section><h1>Portfolio</h1></section><section><div class="projects-grid"><article><h3>P1</h3><p>D</p></article><article><h3>P2</h3><p>D</p></article></div></section><section><form><input type="email"><button>OK</button></form></section></main><footer><p>Copyright</p></footer>',
        },
      })
    })

    act(() => {
      fireEvent.click(screen.getByText(/vérifier mon code/i))
    })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText('Bravo !')).toBeInTheDocument()
    expect(screen.getByText(/module terminé/i)).toBeInTheDocument()
  })
})
