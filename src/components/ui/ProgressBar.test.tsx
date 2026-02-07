import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

describe('ProgressBar', () => {
  // T3: ProgressBar component
  it('should render with correct width percentage', () => {
    render(<ProgressBar value={42} />)
    const fill = screen.getByTestId('progress-fill')
    expect(fill).toHaveStyle({ width: '42%' })
  })

  it('should display percentage text when showPercentage is true', () => {
    render(<ProgressBar value={42} showPercentage />)
    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('should not display percentage text when showPercentage is false', () => {
    render(<ProgressBar value={42} />)
    expect(screen.queryByText('42%')).not.toBeInTheDocument()
  })

  it('should render label when provided', () => {
    render(<ProgressBar value={14} label="3 leçons terminées sur 22" />)
    expect(screen.getByText('3 leçons terminées sur 22')).toBeInTheDocument()
  })

  it('should clamp value between 0 and 100', () => {
    render(<ProgressBar value={150} />)
    const fill = screen.getByTestId('progress-fill')
    expect(fill).toHaveStyle({ width: '100%' })
  })

  it('should handle 0% correctly', () => {
    render(<ProgressBar value={0} showPercentage />)
    const fill = screen.getByTestId('progress-fill')
    expect(fill).toHaveStyle({ width: '0%' })
    expect(screen.getByText('0%')).toBeInTheDocument()
  })
})
