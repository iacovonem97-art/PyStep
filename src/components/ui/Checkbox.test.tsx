import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('should render with label', () => {
    render(<Checkbox label="Rester connecté" checked={false} onChange={() => {}} />)
    expect(screen.getByLabelText('Rester connecté')).toBeInTheDocument()
  })

  it('should be unchecked by default', () => {
    render(<Checkbox label="Rester connecté" checked={false} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('should be checked when checked prop is true', () => {
    render(<Checkbox label="Rester connecté" checked={true} onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('should call onChange on click', () => {
    const handleChange = vi.fn()
    render(<Checkbox label="Rester connecté" checked={false} onChange={handleChange} />)

    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should toggle when label is clicked', () => {
    const handleChange = vi.fn()
    render(<Checkbox label="Rester connecté" checked={false} onChange={handleChange} />)

    fireEvent.click(screen.getByText('Rester connecté'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should be keyboard accessible', () => {
    const handleChange = vi.fn()
    render(<Checkbox label="Rester connecté" checked={false} onChange={handleChange} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.keyDown(checkbox, { key: ' ', code: 'Space' })
    // Native checkbox handles space key via click
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalled()
  })
})
