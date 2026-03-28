/**
 * Component tests for PermissionToggle.js
 * Tests checkbox input for permission selection
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PermissionToggle from '@/components/PermissionToggle'
import { mockPermissions } from '../fixtures/mockData'

describe('PermissionToggle Component', () => {
  const defaultProps = {
    permission: mockPermissions.location,
    enabled: false,
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    test('should render permission toggle', () => {
      render(<PermissionToggle {...defaultProps} />)

      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    test('should display permission icon', () => {
      render(<PermissionToggle {...defaultProps} />)

      expect(screen.getByText(mockPermissions.location.icon)).toBeInTheDocument()
    })

    test('should display permission name', () => {
      render(<PermissionToggle {...defaultProps} />)

      expect(screen.getByText(mockPermissions.location.name)).toBeInTheDocument()
    })

    test('should display permission description', () => {
      render(<PermissionToggle {...defaultProps} />)

      expect(screen.getByText(mockPermissions.location.description)).toBeInTheDocument()
    })

    test('should render with different permissions', () => {
      Object.values(mockPermissions).forEach((permission) => {
        const { unmount } = render(
          <PermissionToggle
            {...defaultProps}
            permission={permission}
          />
        )

        expect(screen.getByText(permission.name)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('checkbox state', () => {
    test('checkbox should be unchecked when enabled is false', () => {
      render(<PermissionToggle {...defaultProps} enabled={false} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox.checked).toBe(false)
    })

    test('checkbox should be checked when enabled is true', () => {
      render(<PermissionToggle {...defaultProps} enabled={true} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox.checked).toBe(true)
    })

    test('should reflect enabled prop changes', () => {
      const { rerender } = render(
        <PermissionToggle {...defaultProps} enabled={false} />
      )

      expect(screen.getByRole('checkbox').checked).toBe(false)

      rerender(<PermissionToggle {...defaultProps} enabled={true} />)

      expect(screen.getByRole('checkbox').checked).toBe(true)
    })
  })

  describe('interaction', () => {
    test('should call onChange when checkbox is clicked', () => {
      const onChange = jest.fn()

      render(
        <PermissionToggle
          {...defaultProps}
          onChange={onChange}
        />
      )

      const checkbox = screen.getByRole('checkbox')
      fireEvent.change(checkbox)

      expect(onChange).toHaveBeenCalledTimes(1)
    })

    test('should handle toggle from off to on', () => {
      const onChange = jest.fn()

      render(
        <PermissionToggle
          {...defaultProps}
          enabled={false}
          onChange={onChange}
        />
      )

      const checkbox = screen.getByRole('checkbox')
      fireEvent.change(checkbox, { target: { checked: true } })

      expect(onChange).toHaveBeenCalled()
    })

    test('should handle toggle from on to off', () => {
      const onChange = jest.fn()

      render(
        <PermissionToggle
          {...defaultProps}
          enabled={true}
          onChange={onChange}
        />
      )

      const checkbox = screen.getByRole('checkbox')
      fireEvent.change(checkbox, { target: { checked: false } })

      expect(onChange).toHaveBeenCalled()
    })

    test('should be keyboard accessible', () => {
      render(<PermissionToggle {...defaultProps} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('type', 'checkbox')
    })
  })

  describe('styling and accessibility', () => {
    test('should have label wrapping for accessibility', () => {
      const { container } = render(<PermissionToggle {...defaultProps} />)

      const label = container.querySelector('label')
      expect(label).toBeInTheDocument()
    })

    test('should have proper semantic structure', () => {
      const { container } = render(<PermissionToggle {...defaultProps} />)

      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveClass('w-6', 'h-6', 'rounded', 'cursor-pointer')
    })

    test('should render text elements with proper classes', () => {
      const { container } = render(<PermissionToggle {...defaultProps} />)

      const nameElement = screen.getByText(mockPermissions.location.name)
      const descElement = screen.getByText(mockPermissions.location.description)

      expect(nameElement).toHaveClass('font-medium')
      expect(descElement).toHaveClass('text-xs')
    })
  })

  describe('edge cases', () => {
    test('should handle multiple toggles without interference', () => {
      const onChange1 = jest.fn()
      const onChange2 = jest.fn()

      const { rerender } = render(
        <>
          <PermissionToggle
            permission={mockPermissions.location}
            enabled={false}
            onChange={onChange1}
          />
          <PermissionToggle
            permission={mockPermissions.camera}
            enabled={false}
            onChange={onChange2}
          />
        </>
      )

      const checkboxes = screen.getAllByRole('checkbox')
      fireEvent.change(checkboxes[0])

      expect(onChange1).toHaveBeenCalled()
      expect(onChange2).not.toHaveBeenCalled()
    })

    test('should handle long permission descriptions', () => {
      const longDescPermission = {
        ...mockPermissions.location,
        description: 'A'.repeat(200),
      }

      render(
        <PermissionToggle
          {...defaultProps}
          permission={longDescPermission}
        />
      )

      expect(screen.getByText('A'.repeat(200))).toBeInTheDocument()
    })

    test('should handle special characters in permission name', () => {
      const specialPermission = {
        ...mockPermissions.location,
        name: 'Location & Tracking',
      }

      render(
        <PermissionToggle
          {...defaultProps}
          permission={specialPermission}
        />
      )

      expect(screen.getByText('Location & Tracking')).toBeInTheDocument()
    })
  })

  describe('integration with parent state', () => {
    test('should work in a controlled component pattern', () => {
      const { rerender } = render(
        <PermissionToggle
          {...defaultProps}
          enabled={false}
        />
      )

      expect(screen.getByRole('checkbox').checked).toBe(false)

      rerender(
        <PermissionToggle
          {...defaultProps}
          enabled={true}
        />
      )

      expect(screen.getByRole('checkbox').checked).toBe(true)
    })
  })
})
