/**
 * Integration tests for PermissionTracker.js
 * Tests the main application component and full user workflows
 */

import React from 'react'
import { render, screen, fireEvent } from '../fixtures/renderWithLanguage'
import PermissionTracker from '@/components/PermissionTracker'
import { PERSONAS } from '@/utils/personas'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}

  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn((key) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock child components to isolate PermissionTracker logic
jest.mock('@/components/PermissionToggle', () => {
  return function MockPermissionToggle({ permission, enabled, onChange }) {
    return (
      <div>
        <input
          type="checkbox"
          checked={enabled}
          onChange={onChange}
          data-testid={`permission-${permission.id}`}
        />
        <span>{permission.name}</span>
      </div>
    )
  }
})

jest.mock('@/components/DurationSlider', () => {
  return function MockDurationSlider({ value, onChange }) {
    return (
      <div>
        <input
          type="range"
          min="1"
          max="365"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          data-testid="duration-slider"
        />
        <span>{value} days</span>
      </div>
    )
  }
})

jest.mock('@/components/PersonaSelector', () => {
  return function MockPersonaSelector({ selectedPersona, onPersonaChange }) {
    return (
      <div>
        <button onClick={() => onPersonaChange('anonymous')} data-testid="persona-anonymous">
          Anonymous
        </button>
        <button onClick={() => onPersonaChange('max')} data-testid="persona-max">
          Max
        </button>
        <button onClick={() => onPersonaChange('sarah')} data-testid="persona-sarah">
          Sarah
        </button>
        <span data-testid="selected-persona">{selectedPersona}</span>
      </div>
    )
  }
})

jest.mock('@/components/ProfileCard', () => {
  return function MockProfileCard({ profile }) {
    return (
      <div data-testid="profile-card">
        <span>{profile?.invasionLevel}</span>
      </div>
    )
  }
})

describe('PermissionTracker - Integration Tests', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('component mounting', () => {
    test('should render permission tracker', () => {
      render(<PermissionTracker />)

      expect(screen.getByText(/^Permissions \(\d\/6\)$/)).toBeInTheDocument()
    })

    test('should display all permission toggles', () => {
      render(<PermissionTracker />)

      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('Camera')).toBeInTheDocument()
      expect(screen.getByText('Microphone')).toBeInTheDocument()
      expect(screen.getByText('Clipboard')).toBeInTheDocument()
      expect(screen.getByText('Contacts')).toBeInTheDocument()
      expect(screen.getByText('Notifications')).toBeInTheDocument()
    })

    test('should display persona selector', () => {
      render(<PermissionTracker />)

      expect(screen.getByTestId('persona-anonymous')).toBeInTheDocument()
      expect(screen.getByTestId('persona-max')).toBeInTheDocument()
      expect(screen.getByTestId('persona-sarah')).toBeInTheDocument()
    })

    test('should display duration slider', () => {
      render(<PermissionTracker />)

      expect(screen.getByTestId('duration-slider')).toBeInTheDocument()
    })
  })

  describe('permission management', () => {
    test('should toggle permission when checkbox is clicked', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      expect(locationCheckbox.checked).toBe(false)

      fireEvent.click(locationCheckbox)

      expect(locationCheckbox.checked).toBe(true)
    })

    test('should track multiple permissions', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')
      const cameraCheckbox = screen.getByTestId('permission-camera')

      fireEvent.click(locationCheckbox)
      fireEvent.click(cameraCheckbox)

      expect(locationCheckbox.checked).toBe(true)
      expect(cameraCheckbox.checked).toBe(true)
    })

    test('should display count of enabled permissions', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')
      const cameraCheckbox = screen.getByTestId('permission-camera')

      fireEvent.click(locationCheckbox)
      fireEvent.click(cameraCheckbox)

      expect(screen.getByText(/Permissions \(2\/6\)/)).toBeInTheDocument()
    })

    test('should initialize all permissions as disabled', () => {
      render(<PermissionTracker />)

      const checkboxes = [
        'location',
        'camera',
        'microphone',
        'clipboard',
        'contacts',
        'notifications',
      ]

      checkboxes.forEach((id) => {
        const checkbox = screen.getByTestId(`permission-${id}`)
        expect(checkbox.checked).toBe(false)
      })
    })

    test('should allow toggling permissions on and off', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)
      expect(locationCheckbox.checked).toBe(true)

      fireEvent.click(locationCheckbox)
      expect(locationCheckbox.checked).toBe(false)
    })
  })

  describe('persona selection', () => {
    test('should set default persona to anonymous', () => {
      render(<PermissionTracker />)

      expect(screen.getByTestId('selected-persona')).toHaveTextContent('anonymous')
    })

    test('should change persona when button is clicked', () => {
      render(<PermissionTracker />)

      const maxButton = screen.getByTestId('persona-max')

      fireEvent.click(maxButton)

      expect(screen.getByTestId('selected-persona')).toHaveTextContent('max')
    })

    test('should allow switching between personas', () => {
      render(<PermissionTracker />)

      fireEvent.click(screen.getByTestId('persona-max'))
      expect(screen.getByTestId('selected-persona')).toHaveTextContent('max')

      fireEvent.click(screen.getByTestId('persona-sarah'))
      expect(screen.getByTestId('selected-persona')).toHaveTextContent('sarah')

      fireEvent.click(screen.getByTestId('persona-anonymous'))
      expect(screen.getByTestId('selected-persona')).toHaveTextContent('anonymous')
    })
  })

  describe('duration management', () => {
    test('should set default duration to 7 days', () => {
      render(<PermissionTracker />)

      expect(screen.getByTestId('duration-slider')).toHaveValue('7')
    })

    test('should update duration when slider changes', () => {
      render(<PermissionTracker />)

      const slider = screen.getByTestId('duration-slider')

      fireEvent.change(slider, { target: { value: '30' } })

      expect(slider).toHaveValue('30')
      expect(screen.getByText('30 days')).toBeInTheDocument()
    })

    test('should handle minimum duration', () => {
      render(<PermissionTracker />)

      const slider = screen.getByTestId('duration-slider')

      fireEvent.change(slider, { target: { value: '1' } })

      expect(slider).toHaveValue('1')
    })

    test('should handle maximum duration', () => {
      render(<PermissionTracker />)

      const slider = screen.getByTestId('duration-slider')

      fireEvent.change(slider, { target: { value: '365' } })

      expect(slider).toHaveValue('365')
    })
  })

  describe('profile generation', () => {
    test('should show empty state when no permissions are enabled', () => {
      render(<PermissionTracker />)

      expect(screen.getByText(/No Permissions Enabled/)).toBeInTheDocument()
    })

    test('should show profile when permissions are enabled', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)

      expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    })

    test('should update profile when permissions change', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)

      expect(screen.getByTestId('profile-card')).toBeInTheDocument()

      fireEvent.click(locationCheckbox)

      expect(screen.getByText('No Permissions Enabled')).toBeInTheDocument()
    })

    test('should update profile when duration changes', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)

      const profileBefore = screen.getByTestId('profile-card')
      expect(profileBefore).toBeInTheDocument()

      const slider = screen.getByTestId('duration-slider')

      fireEvent.change(slider, { target: { value: '365' } })

      expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    })

    test('should update profile when persona changes', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)

      const maxButton = screen.getByTestId('persona-max')

      fireEvent.click(maxButton)

      expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    })
  })

  describe('localStorage persistence', () => {
    test('should save state to localStorage', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)

      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    test('should restore state from localStorage on mount', () => {
      const savedState = {
        permissions: { location: true, camera: false },
        duration: 30,
        selectedPersona: 'max',
      }

      localStorageMock.setItem('permissionTrackerState', JSON.stringify(savedState))

      render(<PermissionTracker />)

      // Note: After first render, state should be restored
      expect(localStorageMock.getItem).toHaveBeenCalledWith('permissionTrackerState')
    })

    test('should persist permission changes', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)

      expect(localStorageMock.setItem).toHaveBeenCalled()

      const lastCall = localStorageMock.setItem.mock.calls[
        localStorageMock.setItem.mock.calls.length - 1
      ]

      expect(lastCall[0]).toBe('permissionTrackerState')
    })

    test('should persist duration changes', () => {
      render(<PermissionTracker />)

      const slider = screen.getByTestId('duration-slider')

      fireEvent.change(slider, { target: { value: '90' } })

      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    test('should persist persona changes', () => {
      render(<PermissionTracker />)

      const maxButton = screen.getByTestId('persona-max')

      fireEvent.click(maxButton)

      expect(localStorageMock.setItem).toHaveBeenCalled()
    })
  })

  describe('complex workflows', () => {
    test('should handle enabling multiple permissions and changing persona', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')
      const cameraCheckbox = screen.getByTestId('permission-camera')
      const maxButton = screen.getByTestId('persona-max')

      fireEvent.click(locationCheckbox)
      fireEvent.click(cameraCheckbox)
      fireEvent.click(maxButton)

      expect(locationCheckbox.checked).toBe(true)
      expect(cameraCheckbox.checked).toBe(true)
      expect(screen.getByTestId('selected-persona')).toHaveTextContent('max')
      expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    })

    test('should handle changing duration and permissions together', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')
      const slider = screen.getByTestId('duration-slider')

      fireEvent.click(locationCheckbox)
      fireEvent.change(slider, { target: { value: '365' } })

      expect(locationCheckbox.checked).toBe(true)
      expect(slider).toHaveValue('365')
      expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    })

    test('should handle rapid permission toggles', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')

      fireEvent.click(locationCheckbox)
      fireEvent.click(locationCheckbox)
      fireEvent.click(locationCheckbox)

      expect(locationCheckbox.checked).toBe(true)
    })

    test('should handle enabling all permissions', () => {
      render(<PermissionTracker />)

      const checkboxes = [
        'location',
        'camera',
        'microphone',
        'clipboard',
        'contacts',
        'notifications',
      ]

      checkboxes.forEach((id) => {
        const checkbox = screen.getByTestId(`permission-${id}`)
        fireEvent.click(checkbox)
      })

      expect(screen.getByText(/Permissions \(6\/6\)/)).toBeInTheDocument()
      expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    })

    test('should handle clearing all permissions', () => {
      render(<PermissionTracker />)

      const checkboxes = [
        'location',
        'camera',
        'microphone',
        'clipboard',
        'contacts',
        'notifications',
      ]

      // Enable all
      checkboxes.forEach((id) => {
        const checkbox = screen.getByTestId(`permission-${id}`)
        fireEvent.click(checkbox)
      })

      // Disable all
      checkboxes.forEach((id) => {
        const checkbox = screen.getByTestId(`permission-${id}`)
        fireEvent.click(checkbox)
      })

      expect(screen.getByText(/Permissions \(0\/6\)/)).toBeInTheDocument()
      expect(screen.getByText(/No Permissions Enabled/)).toBeInTheDocument()
    })
  })

  describe('edge cases and error handling', () => {
    test('should handle missing localStorage gracefully', () => {
      const originalGetItem = localStorageMock.getItem
      localStorageMock.getItem.mockReturnValueOnce(null)

      render(<PermissionTracker />)

      // Should still render with default state
      expect(screen.getByText(/^Permissions \(\d\/6\)$/)).toBeInTheDocument()

      localStorageMock.getItem = originalGetItem
    })

    test('should handle rapid state changes', () => {
      render(<PermissionTracker />)

      const locationCheckbox = screen.getByTestId('permission-location')
      const slider = screen.getByTestId('duration-slider')

      for (let i = 0; i < 10; i++) {
        fireEvent.click(locationCheckbox)
        fireEvent.change(slider, { target: { value: String(Math.random() * 365) } })
      }

      expect(screen.getByText(/^Permissions \(\d\/6\)$/)).toBeInTheDocument()
    })
  })

  describe('user experience flows', () => {
    test('complete workflow: select permissions -> change persona -> adjust duration', () => {
      render(<PermissionTracker />)

      // 1. Enable location
      const locationCheckbox = screen.getByTestId('permission-location')
      fireEvent.click(locationCheckbox)

      // 2. Should show profile
      expect(screen.getByTestId('profile-card')).toBeInTheDocument()

      // 3. Enable camera
      const cameraCheckbox = screen.getByTestId('permission-camera')
      fireEvent.click(cameraCheckbox)

      // 4. Change to max persona
      const maxButton = screen.getByTestId('persona-max')
      fireEvent.click(maxButton)

      // 5. Adjust duration
      const slider = screen.getByTestId('duration-slider')
      fireEvent.change(slider, { target: { value: '90' } })

      // 6. Verify state
      expect(locationCheckbox.checked).toBe(true)
      expect(cameraCheckbox.checked).toBe(true)
      expect(screen.getByTestId('selected-persona')).toHaveTextContent('max')
      expect(slider).toHaveValue('90')
      expect(screen.getByTestId('profile-card')).toBeInTheDocument()
    })
  })
})
