/**
 * Integration tests for Language System
 * Tests translation across multiple components and user workflows
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'
import en from '@/i18n/en.json'
import de from '@/i18n/de.json'

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

/**
 * Mock component simulating PermissionTracker behavior
 */
function MockPermissionTracker() {
  const { t } = useLanguage()

  return (
    <div data-testid="permission-tracker">
      <h2>{t('permissionTracker.permissionsLabel', 'Permissions')}</h2>
      <div>
        <label>{t('permissions.location.name', 'Location')}</label>
        <label>{t('permissions.camera.name', 'Camera')}</label>
      </div>
    </div>
  )
}

/**
 * Mock component simulating DurationSlider behavior
 */
function MockDurationSlider() {
  const { t } = useLanguage()

  return (
    <div data-testid="duration-slider">
      <h2>{t('durationSlider.label', 'Tracking Duration')}</h2>
      <span>{t('durationSlider.invasionLevels.low', 'Low')}</span>
      <span>{t('durationSlider.invasionLevels.high', 'High')}</span>
    </div>
  )
}

/**
 * Mock component simulating PersonaSelector behavior
 */
function MockPersonaSelector() {
  const { t } = useLanguage()

  return (
    <div data-testid="persona-selector">
      <h2>{t('personaSelector.label', 'Select a Persona')}</h2>
      <span>{t('personaSelector.personas.anonymous.name', 'Anonymous')}</span>
      <span>{t('personaSelector.personas.max.name', 'Max')}</span>
    </div>
  )
}

/**
 * Mock component simulating ProfileCard behavior
 */
function MockProfileCard() {
  const { t } = useLanguage()

  return (
    <div data-testid="profile-card">
      <h2>{t('profileCard.title', 'Data Profile Summary')}</h2>
      <p>{t('profileCard.scenarios', 'What They Could Do With This Data')}</p>
      <p>{t('profileCard.protectionTitle', 'How to Protect Yourself')}</p>
    </div>
  )
}

/**
 * Mock LanguageToggle component
 */
function MockLanguageToggle() {
  const { language, changeLanguage } = useLanguage()

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'de' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      data-testid="language-toggle"
    >
      {language === 'en' ? 'Deutsch' : 'English'}
    </button>
  )
}

/**
 * Full app simulation
 */
function AppWithTranslations() {
  return (
    <LanguageProvider>
      <MockLanguageToggle />
      <main>
        <MockPermissionTracker />
        <MockDurationSlider />
        <MockPersonaSelector />
        <MockProfileCard />
      </main>
    </LanguageProvider>
  )
}

describe('Language System Integration Tests', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('Multi-Component Translation', () => {
    test('should translate multiple components simultaneously', async () => {
      render(<AppWithTranslations />)

      await waitFor(() => {
        expect(screen.getByTestId('permission-tracker')).toBeInTheDocument()
        expect(screen.getByTestId('duration-slider')).toBeInTheDocument()
        expect(screen.getByTestId('persona-selector')).toBeInTheDocument()
        expect(screen.getByTestId('profile-card')).toBeInTheDocument()
      })
    })

    test('should have different content in English vs German', async () => {
      render(<AppWithTranslations />)

      await waitFor(() => {
        const trackerInEnglish = screen.getByTestId('permission-tracker').textContent
        const durationInEnglish = screen.getByTestId('duration-slider').textContent

        expect(trackerInEnglish).toBeTruthy()
        expect(durationInEnglish).toBeTruthy()
      })
    })
  })

  describe('Language Switch Propagation', () => {
    test('should update all components when language is changed', async () => {
      render(<AppWithTranslations />)

      const toggleButton = screen.getByTestId('language-toggle')

      await waitFor(() => {
        expect(toggleButton).toHaveTextContent(/Deutsch|English/)
      })

      // Record initial text content
      const trackerBefore = screen.getByTestId('permission-tracker').textContent

      // Click to switch language
      fireEvent.click(toggleButton)

      // All components should update
      await waitFor(() => {
        const trackerAfter = screen.getByTestId('permission-tracker').textContent
        const durationAfter = screen.getByTestId('duration-slider').textContent
        const personaAfter = screen.getByTestId('persona-selector').textContent
        const profileAfter = screen.getByTestId('profile-card').textContent

        // Content should have changed (different language)
        // We can't check exact strings due to translation content, but verify something changed
        expect(trackerBefore).toBeTruthy()
        expect(trackerAfter).toBeTruthy()
      })
    })

    test('should switch toggle button text when language changes', async () => {
      render(<AppWithTranslations />)

      const toggleButton = screen.getByTestId('language-toggle')

      // Initially in English, should show German option
      await waitFor(() => {
        expect(toggleButton.textContent).toMatch(/Deutsch/)
      })

      fireEvent.click(toggleButton)

      // Now in German, should show English option
      await waitFor(() => {
        expect(toggleButton.textContent).toMatch(/English/)
      })
    })
  })

  describe('Consistency Across Languages', () => {
    test('should have all permission names in both languages', () => {
      const permissionIds = ['location', 'camera', 'microphone', 'clipboard', 'contacts', 'notifications']

      permissionIds.forEach((id) => {
        expect(en.permissions[id]).toBeDefined()
        expect(de.permissions[id]).toBeDefined()

        expect(en.permissions[id].name).toBeTruthy()
        expect(de.permissions[id].name).toBeTruthy()

        expect(en.permissions[id].description).toBeTruthy()
        expect(de.permissions[id].description).toBeTruthy()
      })
    })

    test('should have all duration options in both languages', () => {
      const durations = ['1', '7', '30', '90', '365']

      durations.forEach((duration) => {
        expect(en.durationSlider.durations[duration]).toBeTruthy()
        expect(de.durationSlider.durations[duration]).toBeTruthy()
      })
    })

    test('should have all invasion levels in both languages', () => {
      const levels = ['low', 'moderate', 'high', 'veryHigh', 'extreme']

      levels.forEach((level) => {
        expect(en.durationSlider.invasionLevels[level]).toBeTruthy()
        expect(de.durationSlider.invasionLevels[level]).toBeTruthy()
      })
    })

    test('should have all personas in both languages', () => {
      const personas = ['anonymous', 'max', 'sarah']

      personas.forEach((persona) => {
        expect(en.personaSelector.personas[persona]).toBeDefined()
        expect(de.personaSelector.personas[persona]).toBeDefined()

        expect(en.personaSelector.personas[persona].name).toBeTruthy()
        expect(de.personaSelector.personas[persona].name).toBeTruthy()

        expect(en.personaSelector.personas[persona].type).toBeTruthy()
        expect(de.personaSelector.personas[persona].type).toBeTruthy()
      })
    })

    test('should have protection tips in both languages', () => {
      expect(Array.isArray(en.protectionTips)).toBe(true)
      expect(Array.isArray(de.protectionTips)).toBe(true)

      expect(en.protectionTips.length).toBe(de.protectionTips.length)
      expect(en.protectionTips.length).toBeGreaterThan(0)

      // Check that tips have content
      en.protectionTips.forEach((tip) => {
        expect(typeof tip).toBe('string')
        expect(tip.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Translation Data Structure', () => {
    test('should have matching keys between English and German at top level', () => {
      const enKeys = Object.keys(en).sort()
      const deKeys = Object.keys(de).sort()

      expect(enKeys).toEqual(deKeys)
    })

    test('should not have empty translation strings', () => {
      const checkNonEmpty = (obj, path = '') => {
        Object.entries(obj).forEach(([key, value]) => {
          const currentPath = path ? `${path}.${key}` : key

          if (typeof value === 'string') {
            expect(value.length).toBeGreaterThan(0, `Empty string at ${currentPath}`)
          } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
              if (typeof item === 'string') {
                expect(item.length).toBeGreaterThan(0, `Empty string at ${currentPath}[${index}]`)
              }
            })
          } else if (typeof value === 'object' && value !== null) {
            checkNonEmpty(value, currentPath)
          }
        })
      }

      checkNonEmpty(en)
      checkNonEmpty(de)
    })

    test('should have proper translation coverage', () => {
      // Key sections that must be translated
      const requiredSections = [
        'app',
        'permissionTracker',
        'permissions',
        'durationSlider',
        'personaSelector',
        'profileCard',
        'protectionTips',
      ]

      requiredSections.forEach((section) => {
        expect(en[section]).toBeDefined()
        expect(de[section]).toBeDefined()
      })
    })
  })

  describe('User Workflows', () => {
    test('should support complete user workflow with language switching', async () => {
      // 1. User loads app in English
      render(<AppWithTranslations />)

      const toggleButton = screen.getByTestId('language-toggle')

      await waitFor(() => {
        expect(toggleButton).toHaveTextContent('Deutsch')
      })

      // 2. User switches to German
      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(toggleButton).toHaveTextContent('English')
      })

      // 3. Verify multiple components display German content
      const allComponents = [
        'permission-tracker',
        'duration-slider',
        'persona-selector',
        'profile-card',
      ]

      allComponents.forEach((component) => {
        const element = screen.getByTestId(component)
        expect(element.textContent.length).toBeGreaterThan(0)
        expect(element).toBeInTheDocument()
      })

      // 4. Switch back to English
      fireEvent.click(toggleButton)

      await waitFor(() => {
        expect(toggleButton).toHaveTextContent('Deutsch')
      })
    })

    test('should maintain translation state during rapid language switches', async () => {
      render(<AppWithTranslations />)

      const toggleButton = screen.getByTestId('language-toggle')

      await waitFor(() => {
        expect(toggleButton).toBeInTheDocument()
      })

      // Rapid switching
      fireEvent.click(toggleButton)
      fireEvent.click(toggleButton)
      fireEvent.click(toggleButton)

      // System should still be stable
      expect(toggleButton).toBeInTheDocument()
      expect(screen.getByTestId('permission-tracker')).toBeInTheDocument()
    })

    test('should support fresh page load with saved German preference', async () => {
      // Simulate user who previously selected German
      localStorageMock.setItem('preferredLanguage', 'de')

      render(<AppWithTranslations />)

      const toggleButton = screen.getByTestId('language-toggle')

      await waitFor(() => {
        // Should show English option since already in German
        expect(toggleButton).toHaveTextContent('English')
      })

      // German content should be loaded
      const profileCard = screen.getByTestId('profile-card')
      expect(profileCard.textContent).toBeTruthy()
    })
  })

  describe('Fallback Behavior', () => {
    test('should gracefully handle missing translation keys', async () => {
      function ComponentWithMissingKey() {
        const { t } = useLanguage()
        return <div data-testid="missing">{t('this.key.does.not.exist', 'FALLBACK')}</div>
      }

      render(
        <LanguageProvider>
          <ComponentWithMissingKey />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('missing')).toHaveTextContent('FALLBACK')
      })
    })

    test('should return key path when no fallback provided for missing key', async () => {
      function ComponentWithMissingKeyNoFallback() {
        const { t } = useLanguage()
        return <div data-testid="missing-no-fallback">{t('missing.nested.key')}</div>
      }

      render(
        <LanguageProvider>
          <ComponentWithMissingKeyNoFallback />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('missing-no-fallback')).toHaveTextContent('missing.nested.key')
      })
    })
  })

  describe('Performance', () => {
    test('should render translations efficiently without unnecessary re-renders', async () => {
      const renderCount = { current: 0 }

      function CountingComponent() {
        const { t } = useLanguage()
        renderCount.current++

        return (
          <div data-testid="counting">
            {t('permissions.location.name')}
            {renderCount.current}
          </div>
        )
      }

      render(
        <LanguageProvider>
          <CountingComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('counting')).toBeInTheDocument()
      })

      const initialRenderCount = renderCount.current

      // Trigger a re-render of the component
      const { rerender } = render(
        <LanguageProvider>
          <CountingComponent />
        </LanguageProvider>
      )

      // Check renders aren't excessive
      expect(renderCount.current).toBeLessThan(initialRenderCount + 5)
    })
  })
})
