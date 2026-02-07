import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { PreviewPanel } from './PreviewPanel'

describe('PreviewPanel', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should show empty message when code is empty', () => {
    render(<PreviewPanel code="" />)
    expect(screen.getByText(/écris du code pour voir le résultat/i)).toBeInTheDocument()
  })

  it('should render iframe after debounce when code is provided', () => {
    render(<PreviewPanel code="<h1>Hello</h1>" />)

    // Before debounce, should show empty state (initial debouncedCode is the passed code)
    // Actually the initial state is set to the code prop, so iframe should show
    act(() => {
      vi.advanceTimersByTime(2100)
    })

    const iframe = screen.getByTestId('preview-iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('srcdoc', '<h1>Hello</h1>')
  })

  it('should have sandbox attribute on iframe', () => {
    render(<PreviewPanel code="<p>test</p>" />)
    act(() => {
      vi.advanceTimersByTime(2100)
    })
    const iframe = screen.getByTestId('preview-iframe')
    expect(iframe).toHaveAttribute('sandbox', 'allow-same-origin')
  })

  it('should show preview panel container', () => {
    render(<PreviewPanel code="" />)
    expect(screen.getByTestId('preview-panel')).toBeInTheDocument()
    expect(screen.getByText(/prévisualisation/i)).toBeInTheDocument()
  })
})
