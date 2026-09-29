/**
 * Component tests for DurationSlider.js
 * Tests range slider for duration selection
 */

import React from 'react'
import { render, screen, fireEvent } from '../fixtures/renderWithLanguage'
import DurationSlider from '@/components/DurationSlider'

describe('DurationSlider Component', () => {
  const defaultProps = {
    value: 7,
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    test('should render duration slider', () => {
      render(<DurationSlider {...defaultProps} />)

      expect(screen.getByRole('slider')).toBeInTheDocument()
    })

    test('should display heading', () => {
      render(<DurationSlider {...defaultProps} />)

      expect(screen.getByText('Tracking Duration')).toBeInTheDocument()
    })

    test('should display current duration label', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 week')
    })

    test('should display risk level indicator', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      expect(screen.getByText('Moderate Risk')).toBeInTheDocument()
    })

    test('should render quick select buttons', () => {
      render(<DurationSlider {...defaultProps} />)

      expect(screen.getByRole('button', { name: '1 day' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '1 week' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '1 month' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '3 months' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '1 year' })).toBeInTheDocument()
    })
  })

  describe('duration labels', () => {
    test('should show correct label for 1 day', () => {
      render(<DurationSlider value={1} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 day')
    })

    test('should show correct label for 7 days', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 week')
    })

    test('should show correct label for 30 days', () => {
      render(<DurationSlider value={30} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 month')
    })

    test('should show correct label for 90 days', () => {
      render(<DurationSlider value={90} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '3 months')
    })

    test('should show correct label for 365 days', () => {
      render(<DurationSlider value={365} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 year')
    })

    test('should show numeric label for in-between values', () => {
      render(<DurationSlider value={15} onChange={jest.fn()} />)

      expect(screen.getByText('15 days')).toBeInTheDocument()
    })
  })

  describe('risk level indicators', () => {
    test('should show Low risk for 1 day', () => {
      render(<DurationSlider value={1} onChange={jest.fn()} />)

      expect(screen.getByText('Low Risk')).toBeInTheDocument()
    })

    test('should show Moderate risk for 7 days', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      expect(screen.getByText('Moderate Risk')).toBeInTheDocument()
    })

    test('should show High risk for 30 days', () => {
      render(<DurationSlider value={30} onChange={jest.fn()} />)

      expect(screen.getByText('High Risk')).toBeInTheDocument()
    })

    test('should show Very High risk for 90 days', () => {
      render(<DurationSlider value={90} onChange={jest.fn()} />)

      expect(screen.getByText('Very High Risk')).toBeInTheDocument()
    })

    test('should show Extreme risk for 365 days', () => {
      render(<DurationSlider value={365} onChange={jest.fn()} />)

      expect(screen.getByText('Extreme Risk')).toBeInTheDocument()
    })
  })

  describe('slider interaction', () => {
    test('should call onChange when slider value changes', () => {
      const onChange = jest.fn()

      render(<DurationSlider value={7} onChange={onChange} />)

      const slider = screen.getByRole('slider')
      fireEvent.change(slider, { target: { value: '30' } })

      expect(onChange).toHaveBeenCalledWith(30)
    })

    test('should handle minimum value', () => {
      const onChange = jest.fn()

      render(<DurationSlider value={7} onChange={onChange} />)

      const slider = screen.getByRole('slider')
      fireEvent.change(slider, { target: { value: '1' } })

      expect(onChange).toHaveBeenCalledWith(1)
    })

    test('should handle maximum value', () => {
      const onChange = jest.fn()

      render(<DurationSlider value={7} onChange={onChange} />)

      const slider = screen.getByRole('slider')
      fireEvent.change(slider, { target: { value: '365' } })

      expect(onChange).toHaveBeenCalledWith(365)
    })

    test('should handle mid-range values', () => {
      const onChange = jest.fn()

      render(<DurationSlider value={7} onChange={onChange} />)

      const slider = screen.getByRole('slider')
      fireEvent.change(slider, { target: { value: '45' } })

      expect(onChange).toHaveBeenCalledWith(45)
    })
  })

  describe('quick select buttons', () => {
    test('should call onChange when clicking 1 day button', () => {
      const onChange = jest.fn()

      render(<DurationSlider value={7} onChange={onChange} />)

      const buttons = screen.getAllByRole('button')
      const oneDayButton = buttons.find((btn) => btn.textContent === '1 day')

      fireEvent.click(oneDayButton)

      expect(onChange).toHaveBeenCalledWith(1)
    })

    test('should call onChange when clicking 1 week button', () => {
      const onChange = jest.fn()

      render(<DurationSlider value={30} onChange={onChange} />)

      const buttons = screen.getAllByRole('button')
      const oneWeekButton = buttons.find((btn) => btn.textContent === '1 week')

      fireEvent.click(oneWeekButton)

      expect(onChange).toHaveBeenCalledWith(7)
    })

    test('should call onChange for all preset buttons', () => {
      const onChange = jest.fn()

      const { rerender } = render(
        <DurationSlider value={7} onChange={onChange} />
      )

      const testValues = [
        { text: '1 day', value: 1 },
        { text: '1 week', value: 7 },
        { text: '1 month', value: 30 },
        { text: '3 months', value: 90 },
        { text: '1 year', value: 365 },
      ]

      testValues.forEach(({ text, value }) => {
        jest.clearAllMocks()

        rerender(<DurationSlider value={7} onChange={onChange} />)

        const buttons = screen.getAllByRole('button')
        const button = buttons.find((btn) => btn.textContent === text)

        fireEvent.click(button)

        expect(onChange).toHaveBeenCalledWith(value)
      })
    })

    test('should highlight active button', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      const buttons = screen.getAllByRole('button')
      const oneWeekButton = buttons.find((btn) => btn.textContent === '1 week')

      expect(oneWeekButton).toHaveClass('btn-primary')
    })

    test('should not highlight inactive buttons', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      const buttons = screen.getAllByRole('button')
      const oneDayButton = buttons.find((btn) => btn.textContent === '1 day')

      expect(oneDayButton).toHaveClass('btn-secondary')
    })
  })

  describe('value updates', () => {
    test('should update display when value prop changes', () => {
      const { rerender } = render(
        <DurationSlider value={7} onChange={jest.fn()} />
      )

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 week')

      rerender(<DurationSlider value={30} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 month')
    })

    test('should update risk level when value changes', () => {
      const { rerender } = render(
        <DurationSlider value={7} onChange={jest.fn()} />
      )

      expect(screen.getByText('Moderate Risk')).toBeInTheDocument()

      rerender(<DurationSlider value={365} onChange={jest.fn()} />)

      expect(screen.getByText('Extreme Risk')).toBeInTheDocument()
    })

    test('should sync slider and button states', () => {
      const onChange = jest.fn()

      const { rerender } = render(
        <DurationSlider value={7} onChange={onChange} />
      )

      expect(screen.getByRole('slider')).toHaveValue('7')

      const buttons = screen.getAllByRole('button')
      const oneDayButton = buttons.find((btn) => btn.textContent === '1 day')

      fireEvent.click(oneDayButton)

      rerender(<DurationSlider value={1} onChange={onChange} />)

      expect(screen.getByRole('slider')).toHaveValue('1')
    })
  })

  describe('accessibility', () => {
    test('should have proper slider attributes', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      const slider = screen.getByRole('slider')

      expect(slider).toHaveAttribute('type', 'range')
      expect(slider).toHaveAttribute('min', '1')
      expect(slider).toHaveAttribute('max', '365')
    })

    test('should have keyboard accessible buttons', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button).toHaveClass('transition-colors')
      })
    })

    test('should display range bounds', () => {
      render(<DurationSlider value={7} onChange={jest.fn()} />)

      const bounds = screen.getByRole('slider').parentElement.lastElementChild

      expect(bounds).toHaveTextContent('1 day')
      expect(bounds).toHaveTextContent('1 year')
    })
  })

  describe('edge cases', () => {
    test('should handle very small values', () => {
      render(<DurationSlider value={1} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 day')
    })

    test('should handle very large values', () => {
      render(<DurationSlider value={365} onChange={jest.fn()} />)

      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '1 year')
    })

    test('should handle rapid value changes', () => {
      const onChange = jest.fn()

      render(<DurationSlider value={7} onChange={onChange} />)

      const slider = screen.getByRole('slider')

      fireEvent.change(slider, { target: { value: '30' } })
      fireEvent.change(slider, { target: { value: '90' } })
      fireEvent.change(slider, { target: { value: '15' } })

      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(15)
    })
  })
})
