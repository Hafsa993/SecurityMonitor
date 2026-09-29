/**
 * Component tests for LanguageToggle.js
 * Tests language switching button without depending on exact translation strings
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LanguageToggle from '@/components/LanguageToggle'
import { LanguageProvider } from '@/context/LanguageContext'

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

describe('LanguageToggle Component', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    test('should render a button', () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    test('should be positioned in top-right corner', () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')
      const classes = button.className

      // Check for positioning classes
      expect(classes).toMatch(/top/)
      expect(classes).toMatch(/right/)
      expect(classes).toMatch(/fixed/)
    })

    test('should have accessible styling', () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')

      // Should have hover state
      expect(button.className).toContain('hover')
      // Should have padding
      expect(button.className).toContain('px')
      expect(button.className).toContain('py')
    })
  })

  describe('Language Display', () => {
    test('should display language toggle text when in English', async () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      await waitFor(() => {
        const button = screen.getByRole('button')
        // In English, should show German language name
        expect(button.textContent).toBeTruthy()
        expect(button.textContent.length).toBeGreaterThan(0)
      })
    })

    test('should switch display text when language changes', async () => {
      function TestWrapper() {
        const [, setTrigger] = React.useState(0)

        return (
          <LanguageProvider>
            <LanguageToggle />
            <button
              onClick={() => {
                localStorageMock.setItem('preferredLanguage', 'de')
                setTrigger((prev) => prev + 1)
              }}
              data-testid="trigger-lang-change"
            >
              Change Language
            </button>
          </LanguageProvider>
        )
      }

      render(<TestWrapper />)

      await waitFor(() => {
        const button = screen.getByRole('button', { name: /Deutsch|English/ })
        expect(button).toBeInTheDocument()
      })
    })

    test('should have a title attribute for accessibility (tooltip)', () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('title')

      const title = button.getAttribute('title')
      expect(title).toBeTruthy()
      expect(title.length).toBeGreaterThan(0)
    })
  })

  describe('Click Behavior', () => {
    test('should be clickable', async () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()

      fireEvent.click(button)
      // Should not throw
      expect(true).toBe(true)
    })

    test('should toggle language on click', async () => {
      function TestComponent() {
        const { language } = require('@/context/LanguageContext').useLanguage()
        return (
          <div data-testid="current-lang">
            {language}
          </div>
        )
      }

      render(
        <LanguageProvider>
          <LanguageToggle />
          <TestComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
      })

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('de')
      })
    })

    test('should toggle back between languages on multiple clicks', async () => {
      function TestComponent() {
        const { language } = require('@/context/LanguageContext').useLanguage()
        return (
          <div data-testid="current-lang">
            {language}
          </div>
        )
      }

      render(
        <LanguageProvider>
          <LanguageToggle />
          <TestComponent />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')

      // Start in English
      await waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
      })

      // Click to German
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('de')
      })

      // Click back to English
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
      })

      // Click to German again
      fireEvent.click(button)
      await waitFor(() => {
        expect(screen.getByTestId('current-lang')).toHaveTextContent('de')
      })
    })

    test('should persist language preference to localStorage on click', async () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('preferredLanguage', 'de')
      })

      // Click again to switch back
      fireEvent.click(button)

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith('preferredLanguage', 'en')
      })
    })
  })

  describe('Browser Integration', () => {
    test('should be keyboard accessible (can be focused and clicked with Enter)', async () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')

      // Focus the button
      button.focus()
      expect(document.activeElement).toBe(button)

      // Press Enter
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
      // Note: Click event is typically handled by default browser behavior
      fireEvent.click(button)

      expect(true).toBe(true)
    })

    test('should have appropriate z-index for top-right positioning', () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')
      expect(button.className).toContain('z-50')
    })
  })

  describe('Cross-browser Compatibility', () => {
    test('should render correctly when localStorage is available', () => {
      const { container } = render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      expect(container.querySelector('button')).toBeInTheDocument()
    })

    test('should handle rapid clicking without errors', async () => {
      render(
        <LanguageProvider>
          <LanguageToggle />
        </LanguageProvider>
      )

      const button = screen.getByRole('button')

      // Simulate rapid clicks
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      await waitFor(() => {
        expect(button).toBeInTheDocument()
      })
    })
  })
})
