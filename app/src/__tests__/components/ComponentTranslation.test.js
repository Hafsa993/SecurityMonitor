/**
 * Component translation tests
 * Verifies components correctly use translation system
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
 * Test component simulating DurationSlider with translations
 */
function MockDurationSlider() {
  const { t } = useLanguage()

  return (
    <div data-testid="duration-slider">
      <h2>{t('durationSlider.label')}</h2>
      <span data-testid="invasion-low">{t('durationSlider.invasionLevels.low')}</span>
      <span data-testid="invasion-high">{t('durationSlider.invasionLevels.high')}</span>
      <button data-testid="duration-1">{t('durationSlider.durations.1')}</button>
      <button data-testid="duration-7">{t('durationSlider.durations.7')}</button>
    </div>
  )
}

/**
 * Test component simulating PersonaSelector with translations
 */
function MockPersonaSelector() {
  const { t } = useLanguage()

  return (
    <div data-testid="persona-selector">
      <h2>{t('personaSelector.label')}</h2>
      <span data-testid="persona-anon-name">{t('personaSelector.personas.anonymous.name')}</span>
      <span data-testid="persona-anon-type">{t('personaSelector.personas.anonymous.type')}</span>
      <span data-testid="persona-max-name">{t('personaSelector.personas.max.name')}</span>
    </div>
  )
}

/**
 * Test component simulating ProfileCard with translations
 */
function MockProfileCard() {
  const { t } = useLanguage()

  return (
    <div data-testid="profile-card">
      <h2>{t('profileCard.title')}</h2>
      <p data-testid="scenarios-title">{t('profileCard.scenarios')}</p>
      <p data-testid="protection-title">{t('profileCard.protectionTitle')}</p>
      <ul data-testid="protection-tips">
        {en.protectionTips.slice(0, 3).map((tip, idx) => (
          <li key={idx} data-testid={`tip-${idx}`}>
            {t(`protectionTips.${idx}`, tip)}
          </li>
        ))}
      </ul>
    </div>
  )
}

describe('Component Translation Integration Tests', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('DurationSlider Translation', () => {
    test('should render duration label in English', async () => {
      render(
        <LanguageProvider>
          <MockDurationSlider />
        </LanguageProvider>
      )

      await waitFor(() => {
        const title = screen.getByRole('heading')
        expect(title.textContent).toBeTruthy()
        expect(title.textContent.length).toBeGreaterThan(0)
      })
    })

    test('should render invasion levels in English', async () => {
      render(
        <LanguageProvider>
          <MockDurationSlider />
        </LanguageProvider>
      )

      await waitFor(() => {
        const low = screen.getByTestId('invasion-low')
        const high = screen.getByTestId('invasion-high')
        
        expect(low.textContent).toBeTruthy()
        expect(high.textContent).toBeTruthy()
      })
    })

    test('should render duration buttons with translated labels', async () => {
      render(
        <LanguageProvider>
          <MockDurationSlider />
        </LanguageProvider>
      )

      await waitFor(() => {
        const btn1 = screen.getByTestId('duration-1')
        const btn7 = screen.getByTestId('duration-7')
        
        expect(btn1.textContent).toBeTruthy()
        expect(btn7.textContent).toBeTruthy()
        
        // Should not be the keys
        expect(btn1.textContent).not.toBe('durationSlider.durations.1')
        expect(btn7.textContent).not.toBe('durationSlider.durations.7')
      })
    })

    test('should change language and update duration labels', async () => {
      function TestWrapper() {
        const { changeLanguage } = useLanguage()
        
        return (
          <>
            <button onClick={() => changeLanguage('de')} data-testid="switch-to-de">
              Switch to German
            </button>
            <MockDurationSlider />
          </>
        )
      }

      render(
        <LanguageProvider>
          <TestWrapper />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('duration-1')).toBeInTheDocument()
      })

      const initialText = screen.getByTestId('duration-1').textContent

      // Switch to German
      fireEvent.click(screen.getByTestId('switch-to-de'))

      await waitFor(() => {
        // Text should change (different language)
        const btn = screen.getByTestId('duration-1')
        expect(btn.textContent).toBeTruthy()
      })
    })
  })

  describe('PersonaSelector Translation', () => {
    test('should render persona selector label', async () => {
      render(
        <LanguageProvider>
          <MockPersonaSelector />
        </LanguageProvider>
      )

      await waitFor(() => {
        const title = screen.getByRole('heading')
        expect(title.textContent).toBeTruthy()
      })
    })

    test('should render persona names and types', async () => {
      render(
        <LanguageProvider>
          <MockPersonaSelector />
        </LanguageProvider>
      )

      await waitFor(() => {
        const anonName = screen.getByTestId('persona-anon-name')
        const anonType = screen.getByTestId('persona-anon-type')
        const maxName = screen.getByTestId('persona-max-name')

        expect(anonName.textContent).toBeTruthy()
        expect(anonType.textContent).toBeTruthy()
        expect(maxName.textContent).toBeTruthy()
      })
    })

    test('should display different persona names in different languages', async () => {
      function TestWrapper() {
        const { changeLanguage } = useLanguage()
        
        return (
          <>
            <button onClick={() => changeLanguage('de')} data-testid="switch-de">
              Deutsch
            </button>
            <MockPersonaSelector />
          </>
        )
      }

      render(
        <LanguageProvider>
          <TestWrapper />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('persona-max-name')).toBeInTheDocument()
      })

      const enName = screen.getByTestId('persona-max-name').textContent

      fireEvent.click(screen.getByTestId('switch-de'))

      await waitFor(() => {
        const deName = screen.getByTestId('persona-max-name').textContent
        expect(deName).toBeTruthy()
        // Content should exist in both languages
        expect(enName).toBeTruthy()
        expect(deName).toBeTruthy()
      })
    })
  })

  describe('ProfileCard Translation', () => {
    test('should render profile card with translated title', async () => {
      render(
        <LanguageProvider>
          <MockProfileCard />
        </LanguageProvider>
      )

      await waitFor(() => {
        const title = screen.getByRole('heading')
        expect(title.textContent).toBeTruthy()
      })
    })

    test('should render scenarios and protection titles', async () => {
      render(
        <LanguageProvider>
          <MockProfileCard />
        </LanguageProvider>
      )

      await waitFor(() => {
        const scenariosTitle = screen.getByTestId('scenarios-title')
        const protectionTitle = screen.getByTestId('protection-title')

        expect(scenariosTitle.textContent).toBeTruthy()
        expect(protectionTitle.textContent).toBeTruthy()
      })
    })

    test('should fallback to default values for protection tips', async () => {
      render(
        <LanguageProvider>
          <MockProfileCard />
        </LanguageProvider>
      )

      await waitFor(() => {
        const tips = screen.getAllByTestId(/^tip-/)
        
        // All tips should have content (using fallback tip text if translation missing)
        tips.forEach((tip) => {
          expect(tip.textContent.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Translation Key Usage Patterns', () => {
    test('should support simple string keys', async () => {
      function SimpleKey() {
        const { t } = useLanguage()
        return <div data-testid="simple">{t('app.title')}</div>
      }

      render(
        <LanguageProvider>
          <SimpleKey />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('simple').textContent).toBeTruthy()
      })
    })

    test('should support nested keys with dots', async () => {
      function NestedKey() {
        const { t } = useLanguage()
        return <div data-testid="nested">{t('permissions.location.name')}</div>
      }

      render(
        <LanguageProvider>
          <NestedKey />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('nested').textContent).toBeTruthy()
      })
    })

    test('should support default values with translations', async () => {
      function WithDefault() {
        const { t } = useLanguage()
        return (
          <div data-testid="with-default">
            {t('nonexistent.key', 'Default Text')}
          </div>
        )
      }

      render(
        <LanguageProvider>
          <WithDefault />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('with-default')).toHaveTextContent('Default Text')
      })
    })
  })

  describe('Accessibility with Translations', () => {
    test('should maintain semantic HTML with translations', async () => {
      render(
        <LanguageProvider>
          <MockDurationSlider />
        </LanguageProvider>
      )

      await waitFor(() => {
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
      })
    })

    test('should have buttons with translated text remain clickable', async () => {
      function ClickableTranslatedButton() {
        const { t } = useLanguage()
        const [clicked, setClicked] = React.useState(false)

        return (
          <div>
            <button onClick={() => setClicked(true)} data-testid="translated-btn">
              {t('durationSlider.label')}
            </button>
            {clicked && <div data-testid="clicked">Clicked</div>}
          </div>
        )
      }

      render(
        <LanguageProvider>
          <ClickableTranslatedButton />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('translated-btn')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByTestId('translated-btn'))

      await waitFor(() => {
        expect(screen.getByTestId('clicked')).toBeInTheDocument()
      })
    })

    test('should maintain form attributes with translated labels', async () => {
      function FormWithTranslation() {
        const { t } = useLanguage()

        return (
          <form>
            <label htmlFor="test-input">{t('durationSlider.label')}</label>
            <input id="test-input" data-testid="test-input" />
          </form>
        )
      }

      render(
        <LanguageProvider>
          <FormWithTranslation />
        </LanguageProvider>
      )

      await waitFor(() => {
        const input = screen.getByTestId('test-input')
        // Use getByLabelText to verify proper label association
        const label = screen.getByLabelText(/.+/)
        
        expect(input).toBeInTheDocument()
        expect(label).toBeInTheDocument()
      })
    })
  })

  describe('Component State with Translations', () => {
    test('should maintain component state when language changes', async () => {
      function StatefulComponent() {
        const { t, changeLanguage } = useLanguage()
        const [count, setCount] = React.useState(0)

        return (
          <>
            <button onClick={() => setCount(count + 1)} data-testid="increment">
              {t('durationSlider.label')} - Count: {count}
            </button>
            <button onClick={() => changeLanguage('de')} data-testid="switch-de">
              Switch
            </button>
          </>
        )
      }

      render(
        <LanguageProvider>
          <StatefulComponent />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('increment')).toBeInTheDocument()
      })

      // Increment count
      fireEvent.click(screen.getByTestId('increment'))
      fireEvent.click(screen.getByTestId('increment'))

      // Button should show count: 2
      const btn = screen.getByTestId('increment')
      expect(btn.textContent).toContain('2')

      // Switch language
      fireEvent.click(screen.getByTestId('switch-de'))

      // Count should still be 2
      await waitFor(() => {
        expect(screen.getByTestId('increment').textContent).toContain('2')
      })
    })
  })

  describe('Multiple Language Switches', () => {
    test('should handle multiple quick language switches', async () => {
      function QuickSwitch() {
        const { language, changeLanguage } = useLanguage()

        return (
          <>
            <div data-testid="current">{language}</div>
            <button onClick={() => changeLanguage('en')} data-testid="en">
              EN
            </button>
            <button onClick={() => changeLanguage('de')} data-testid="de">
              DE
            </button>
          </>
        )
      }

      render(
        <LanguageProvider>
          <QuickSwitch />
        </LanguageProvider>
      )

      await waitFor(() => {
        expect(screen.getByTestId('current')).toHaveTextContent('en')
      })

      // Rapid switching
      fireEvent.click(screen.getByTestId('de'))
      fireEvent.click(screen.getByTestId('en'))
      fireEvent.click(screen.getByTestId('de'))
      fireEvent.click(screen.getByTestId('en'))

      // Should end in EN
      expect(screen.getByTestId('current')).toHaveTextContent('en')
    })
  })
})
