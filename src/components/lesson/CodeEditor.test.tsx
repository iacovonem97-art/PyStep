import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CodeEditor } from './CodeEditor'

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

describe('CodeEditor', () => {
  it('should render the editor wrapper', () => {
    render(<CodeEditor value="" onChange={vi.fn()} />)
    expect(screen.getByTestId('code-editor-wrapper')).toBeInTheDocument()
  })

  it('should display the initial value', () => {
    render(<CodeEditor value="<h1>Hello</h1>" onChange={vi.fn()} />)
    const textarea = screen.getByTestId('monaco-editor-mock') as HTMLTextAreaElement
    expect(textarea.value).toBe('<h1>Hello</h1>')
  })

  it('should call onChange when code is modified', () => {
    const onChange = vi.fn()
    render(<CodeEditor value="" onChange={onChange} />)
    const textarea = screen.getByTestId('monaco-editor-mock')
    fireEvent.change(textarea, { target: { value: '<p>New code</p>' } })
    expect(onChange).toHaveBeenCalledWith('<p>New code</p>')
  })
})
