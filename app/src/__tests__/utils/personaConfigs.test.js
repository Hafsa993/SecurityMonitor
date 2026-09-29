/**
 * Unit tests for personaConfigs.js
 * Tests persona-specific data and the lookup helpers
 */

import { PERSONA_CONFIGS, getPersonaData, getPersonaDescription } from '@/utils/personaConfigs'

const PERSONA_IDS = ['max', 'sarah']
const SCENARIO_PERMISSIONS = ['location', 'camera', 'clipboard', 'contacts', 'notifications']

describe('personaConfigs - PERSONA_CONFIGS', () => {
  test('defines max and sarah', () => {
    expect(Object.keys(PERSONA_CONFIGS).sort()).toEqual(PERSONA_IDS)
  })

  test.each(PERSONA_IDS)('%s has the same permission keys as the other persona', (id) => {
    expect(Object.keys(PERSONA_CONFIGS[id]).sort()).toEqual(Object.keys(PERSONA_CONFIGS.max).sort())
  })

  describe.each(PERSONA_IDS)('%s', (id) => {
    const persona = PERSONA_CONFIGS[id]

    test.each(SCENARIO_PERMISSIONS)('%s has English and German descriptions', (type) => {
      expect(persona[type].description).toEqual(expect.any(String))
      expect(persona[type].descriptionDe).toEqual(expect.any(String))
      expect(persona[type].descriptionDe).not.toBe(persona[type].description)
    })

    test('location sources for combined permissions are arrays', () => {
      expect(Array.isArray(persona.location.baseSources)).toBe(true)
      expect(Array.isArray(persona.location.microphone)).toBe(true)
      expect(Array.isArray(persona.location.notifications)).toBe(true)
    })

    test('every source has display text and translation keys', () => {
      const sources = [
        ...persona.location.baseSources,
        ...persona.location.microphone,
        ...persona.location.notifications,
        ...persona.camera.sources,
        ...persona.clipboard.sources,
        ...persona.contacts.sources,
        ...persona.notifications.sources,
      ]

      sources.forEach((source) => {
        expect(source).toEqual(
          expect.objectContaining({
            permissionEmoji: expect.any(String),
            permissionName: expect.any(String),
            insight: expect.any(String),
            adResult: expect.any(String),
          })
        )
      })
    })
  })
})

describe('personaConfigs - getPersonaData', () => {
  test.each(PERSONA_IDS)('returns the config for %s', (id) => {
    expect(getPersonaData(id)).toBe(PERSONA_CONFIGS[id])
  })

  test.each([undefined, null, 'unknown'])('returns null for %p', (id) => {
    expect(getPersonaData(id)).toBeNull()
  })
})

describe('personaConfigs - getPersonaDescription', () => {
  test('returns the English description by default', () => {
    expect(getPersonaDescription('max', 'location')).toBe(PERSONA_CONFIGS.max.location.description)
  })

  test('returns the German description for de', () => {
    expect(getPersonaDescription('sarah', 'camera', 'de')).toBe(PERSONA_CONFIGS.sarah.camera.descriptionDe)
  })

  test('falls back to English for other languages', () => {
    expect(getPersonaDescription('sarah', 'camera', 'fr')).toBe(PERSONA_CONFIGS.sarah.camera.description)
  })

  test('returns null when the persona has no data for the permission', () => {
    expect(getPersonaDescription('max', 'microphone', 'de')).toBeNull()
  })

  test('returns null for an unknown persona', () => {
    expect(getPersonaDescription('unknown', 'location')).toBeNull()
  })
})
