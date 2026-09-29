/**
 * Component tests for PersonaSelector.js
 * Tests persona selection buttons
 */

import React from 'react'
import { render, screen, fireEvent } from '../fixtures/renderWithLanguage'
import PersonaSelector from '@/components/PersonaSelector'
import { PERSONAS } from '@/utils/personas'

describe('PersonaSelector Component', () => {
  const defaultProps = {
    selectedPersona: 'anonymous',
    onPersonaChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    test('should render persona selector', () => {
      render(<PersonaSelector {...defaultProps} />)

      expect(screen.getByText('Select a Persona')).toBeInTheDocument()
    })

    test('should render persona buttons for all personas', () => {
      render(<PersonaSelector {...defaultProps} />)

      expect(screen.getByText('Anonymous')).toBeInTheDocument()
      expect(screen.getByText('Max')).toBeInTheDocument()
      expect(screen.getByText('Sarah')).toBeInTheDocument()
    })

    test('should display persona emojis', () => {
      render(<PersonaSelector {...defaultProps} />)

      expect(screen.getByText(PERSONAS.max.emoji)).toBeInTheDocument()
      expect(screen.getByText(PERSONAS.sarah.emoji)).toBeInTheDocument()
    })

    test('should display persona types', () => {
      render(<PersonaSelector {...defaultProps} />)

      expect(screen.getByText('College Student')).toBeInTheDocument()
      expect(screen.getByText('Parent')).toBeInTheDocument()
    })
  })

  describe('persona display', () => {
    test('should show correct emoji for max persona', () => {
      render(<PersonaSelector selectedPersona="max" onPersonaChange={jest.fn()} />)

      expect(screen.getByText(PERSONAS.max.emoji)).toBeInTheDocument()
    })

    test('should show correct emoji for sarah persona', () => {
      render(<PersonaSelector selectedPersona="sarah" onPersonaChange={jest.fn()} />)

      expect(screen.getByText(PERSONAS.sarah.emoji)).toBeInTheDocument()
    })

    test('should show persona names correctly', () => {
      render(<PersonaSelector {...defaultProps} />)

      expect(screen.getByText('Anonymous')).toBeInTheDocument()
      expect(screen.getByText('Max')).toBeInTheDocument()
      expect(screen.getByText('Sarah')).toBeInTheDocument()
    })

    test('should show persona types when available', () => {
      render(<PersonaSelector {...defaultProps} />)

      // Max and Sarah have types, anonymous might not
      const collegeStudent = screen.getByText('College Student')
      const parent = screen.getByText('Parent')

      expect(collegeStudent).toBeInTheDocument()
      expect(parent).toBeInTheDocument()
    })
  })

  describe('selection state', () => {
    test('should highlight selected persona', () => {
      render(<PersonaSelector selectedPersona="max" onPersonaChange={jest.fn()} />)

      const buttons = screen.getAllByRole('button')
      const maxButton = buttons.find((btn) => btn.textContent.includes('Max'))

      expect(maxButton).toHaveClass('btn-active')
    })

    test('should not highlight unselected personas', () => {
      render(<PersonaSelector selectedPersona="max" onPersonaChange={jest.fn()} />)

      const buttons = screen.getAllByRole('button')
      const sarahButton = buttons.find((btn) => btn.textContent.includes('Sarah'))

      expect(sarahButton).toHaveClass('btn-secondary')
    })

    test('should update highlight when selection changes', () => {
      const { rerender } = render(
        <PersonaSelector selectedPersona="max" onPersonaChange={jest.fn()} />
      )

      const buttons = screen.getAllByRole('button')
      const maxButton = buttons.find((btn) => btn.textContent.includes('Max'))

      expect(maxButton).toHaveClass('btn-active')

      rerender(
        <PersonaSelector selectedPersona="sarah" onPersonaChange={jest.fn()} />
      )

      const updatedButtons = screen.getAllByRole('button')
      const updatedMaxButton = updatedButtons.find((btn) => btn.textContent.includes('Max'))
      const updatedSarahButton = updatedButtons.find((btn) => btn.textContent.includes('Sarah'))

      expect(updatedMaxButton).toHaveClass('btn-secondary')
      expect(updatedSarahButton).toHaveClass('btn-active')
    })
  })

  describe('interaction', () => {
    test('should call onPersonaChange when clicking anonymous button', () => {
      const onPersonaChange = jest.fn()

      render(
        <PersonaSelector
          selectedPersona="max"
          onPersonaChange={onPersonaChange}
        />
      )

      const buttons = screen.getAllByRole('button')
      const anonymousButton = buttons.find((btn) =>
        btn.textContent.includes('Anonymous')
      )

      fireEvent.click(anonymousButton)

      expect(onPersonaChange).toHaveBeenCalledWith('anonymous')
    })

    test('should call onPersonaChange when clicking max button', () => {
      const onPersonaChange = jest.fn()

      render(
        <PersonaSelector
          selectedPersona="anonymous"
          onPersonaChange={onPersonaChange}
        />
      )

      const buttons = screen.getAllByRole('button')
      const maxButton = buttons.find((btn) => btn.textContent.includes('Max'))

      fireEvent.click(maxButton)

      expect(onPersonaChange).toHaveBeenCalledWith('max')
    })

    test('should call onPersonaChange when clicking sarah button', () => {
      const onPersonaChange = jest.fn()

      render(
        <PersonaSelector
          selectedPersona="anonymous"
          onPersonaChange={onPersonaChange}
        />
      )

      const buttons = screen.getAllByRole('button')
      const sarahButton = buttons.find((btn) => btn.textContent.includes('Sarah'))

      fireEvent.click(sarahButton)

      expect(onPersonaChange).toHaveBeenCalledWith('sarah')
    })

    test('should allow switching between personas', () => {
      const onPersonaChange = jest.fn()

      render(
        <PersonaSelector
          selectedPersona="max"
          onPersonaChange={onPersonaChange}
        />
      )

      const buttons = screen.getAllByRole('button')
      const sarahButton = buttons.find((btn) => btn.textContent.includes('Sarah'))

      fireEvent.click(sarahButton)

      expect(onPersonaChange).toHaveBeenCalledWith('sarah')
    })

    test('should handle multiple rapid clicks', () => {
      const onPersonaChange = jest.fn()

      render(
        <PersonaSelector
          selectedPersona="anonymous"
          onPersonaChange={onPersonaChange}
        />
      )

      const buttons = screen.getAllByRole('button')
      const maxButton = buttons.find((btn) => btn.textContent.includes('Max'))
      const sarahButton = buttons.find((btn) => btn.textContent.includes('Sarah'))

      fireEvent.click(maxButton)
      fireEvent.click(sarahButton)
      fireEvent.click(maxButton)

      expect(onPersonaChange).toHaveBeenCalledTimes(3)
      expect(onPersonaChange).toHaveBeenNthCalledWith(1, 'max')
      expect(onPersonaChange).toHaveBeenNthCalledWith(2, 'sarah')
      expect(onPersonaChange).toHaveBeenNthCalledWith(3, 'max')
    })
  })

  describe('styling and layout', () => {
    test('should have grid layout for buttons', () => {
      const { container } = render(<PersonaSelector {...defaultProps} />)

      const gridContainer = container.querySelector('.grid')

      expect(gridContainer).toHaveClass('grid-cols-3')
    })

    test('should have proper button spacing', () => {
      const { container } = render(<PersonaSelector {...defaultProps} />)

      const gridContainer = container.querySelector('.grid')

      expect(gridContainer).toHaveClass('gap-2')
    })

    test('should have proper card styling', () => {
      const { container } = render(<PersonaSelector {...defaultProps} />)

      const card = container.querySelector('.card-bg')

      expect(card).toHaveClass('rounded-lg', 'p-6', 'mb-6')
    })

    test('should style buttons with transition effects', () => {
      const { container } = render(<PersonaSelector {...defaultProps} />)

      const buttons = container.querySelectorAll('button')

      buttons.forEach((button) => {
        expect(button).toHaveClass('transition-all')
      })
    })
  })

  describe('accessibility', () => {
    test('all persona buttons should be keyboard accessible', () => {
      render(<PersonaSelector {...defaultProps} />)

      const buttons = screen.getAllByRole('button')

      expect(buttons.length).toBeGreaterThan(0)
      buttons.forEach((button) => {
        expect(button).toBeInTheDocument()
      })
    })

    test('should have proper button text for screen readers', () => {
      render(<PersonaSelector {...defaultProps} />)

      expect(screen.getByText('Anonymous')).toBeInTheDocument()
      expect(screen.getByText('Max')).toBeInTheDocument()
      expect(screen.getByText('Sarah')).toBeInTheDocument()
    })

    test('should have semantic structure', () => {
      const { container } = render(<PersonaSelector {...defaultProps} />)

      const headings = container.querySelectorAll('h2')

      expect(headings.length).toBeGreaterThan(0)
    })
  })

  describe('edge cases', () => {
    test('should handle unknown selected persona', () => {
      render(
        <PersonaSelector
          selectedPersona="unknown"
          onPersonaChange={jest.fn()}
        />
      )

      // Should still render all personas
      expect(screen.getByText('Anonymous')).toBeInTheDocument()
      expect(screen.getByText('Max')).toBeInTheDocument()
      expect(screen.getByText('Sarah')).toBeInTheDocument()
    })

    test('should handle null selected persona', () => {
      render(
        <PersonaSelector
          selectedPersona={null}
          onPersonaChange={jest.fn()}
        />
      )

      expect(screen.getByText('Max')).toBeInTheDocument()
    })

    test('should handle switching to same persona', () => {
      const onPersonaChange = jest.fn()

      render(
        <PersonaSelector
          selectedPersona="max"
          onPersonaChange={onPersonaChange}
        />
      )

      const buttons = screen.getAllByRole('button')
      const maxButton = buttons.find((btn) => btn.textContent.includes('Max'))

      fireEvent.click(maxButton)

      expect(onPersonaChange).toHaveBeenCalledWith('max')
    })

    test('should render with all three personas visible', () => {
      render(<PersonaSelector {...defaultProps} />)

      const personaCount = ['anonymous', 'max', 'sarah'].filter((persona) =>
        screen.queryByText(
          persona === 'anonymous' ? 'Anonymous' : persona.charAt(0).toUpperCase() + persona.slice(1)
        ) !== null
      ).length

      expect(personaCount).toBe(3)
    })
  })

  describe('integration with parent state', () => {
    test('should work in controlled component pattern', () => {
      const { rerender } = render(
        <PersonaSelector
          selectedPersona="anonymous"
          onPersonaChange={jest.fn()}
        />
      )

      const buttons = screen.getAllByRole('button')
      const maxButton = buttons.find((btn) => btn.textContent.includes('Max'))

      expect(maxButton).toHaveClass('btn-secondary')

      rerender(
        <PersonaSelector
          selectedPersona="max"
          onPersonaChange={jest.fn()}
        />
      )

      const updatedButtons = screen.getAllByRole('button')
      const updatedMaxButton = updatedButtons.find((btn) =>
        btn.textContent.includes('Max')
      )

      expect(updatedMaxButton).toHaveClass('btn-active')
    })
  })
})
