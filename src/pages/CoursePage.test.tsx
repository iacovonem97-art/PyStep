import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CoursePage from './CoursePage'

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

describe('CoursePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseAuthContext.mockReturnValue({
      user: { id: '123', email: 'test@example.com' },
      session: { access_token: 'token' },
      loading: false,
    })
  })

  const renderCourse = () => {
    return render(
      <MemoryRouter initialEntries={['/course']}>
        <Routes>
          <Route path="/course" element={<CoursePage />} />
        </Routes>
      </MemoryRouter>
    )
  }

  // T3: CoursePage renders
  it('should render page title', () => {
    renderCourse()
    expect(screen.getByText(/le parcours complet/i)).toBeInTheDocument()
  })

  it('should render progress bar at 0%', () => {
    renderCourse()
    expect(screen.getByText(/0 leçons terminées sur 22/i)).toBeInTheDocument()
    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('should render all 5 modules', () => {
    renderCourse()
    expect(screen.getByText(/les fondations html/i)).toBeInTheDocument()
    expect(screen.getByText(/html sémantique/i)).toBeInTheDocument()
    expect(screen.getByText(/introduction au css/i)).toBeInTheDocument()
    expect(screen.getByText(/mise en page css/i)).toBeInTheDocument()
    expect(screen.getByText(/projet final/i)).toBeInTheDocument()
  })

  // T7: Integration - module 1 expanded by default
  it('should expand module 1 by default showing lessons', () => {
    renderCourse()
    expect(screen.getByText(/1\.1 —/)).toBeInTheDocument()
    expect(screen.getByText(/1\.6 —/)).toBeInTheDocument()
  })

  it('should toggle module accordion on click', () => {
    renderCourse()
    // Module 1 expanded, click to collapse
    const buttons = screen.getAllByRole('button', { name: /module/i })
    fireEvent.click(buttons[0])
    // Lesson 1.1 should be hidden
    expect(screen.queryByText(/1\.1 —/)).not.toBeInTheDocument()
  })

  it('should show locked message for modules 2-5', () => {
    renderCourse()
    // Expand module 2 to see locked message
    const buttons = screen.getAllByRole('button', { name: /module/i })
    fireEvent.click(buttons[1]) // Module 2
    expect(screen.getByText(/termine le module 1/i)).toBeInTheDocument()
  })

  it('should show lesson 1.1 as current', () => {
    renderCourse()
    const continuer = screen.getByText(/continuer/i)
    expect(continuer).toBeInTheDocument()
  })

  it('should have lesson links for module 1 lessons', () => {
    renderCourse()
    const lessonLink = screen.getByRole('link', { name: /1\.1 —/ })
    expect(lessonLink).toHaveAttribute('href', '/lesson/1.1')
  })
})
