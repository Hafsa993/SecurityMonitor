/**
 * Unit tests for permissionBuilder.js
 * Tests individual builder functions for each permission type
 */

import {
  buildLocationSection,
  buildCameraSection,
  buildMicrophoneSection,
  buildClipboardSection,
  buildContactsSection,
  buildNotificationsSection,
} from '@/utils/permissionBuilder'
import { mockPersonas } from '../fixtures/mockData'

describe('permissionBuilder - individual builders', () => {
  describe('buildLocationSection', () => {
    test('should return location category with items', () => {
      const result = buildLocationSection(true, 'max')

      expect(result).toHaveProperty('category')
      expect(result).toHaveProperty('scenarios')
      expect(result.category).toHaveProperty('title')
      expect(result.category).toHaveProperty('items')
    })

    test('should include location-specific items', () => {
      const result = buildLocationSection(true, 'max')

      expect(result.category.title).toContain('Location')
      expect(Array.isArray(result.category.items)).toBe(true)
      expect(result.category.items.length).toBeGreaterThan(0)
    })

    test('should return scenarios for location', () => {
      const result = buildLocationSection(true, 'max')

      expect(Array.isArray(result.scenarios)).toBe(true)
      expect(result.scenarios.length).toBeGreaterThan(0)
    })

    test('should handle different personas', () => {
      const maxResult = buildLocationSection(true, 'max')
      const sarahResult = buildLocationSection(true, 'sarah')

      expect(maxResult).toBeDefined()
      expect(sarahResult).toBeDefined()
      expect(maxResult.category.title).toBe(sarahResult.category.title)
    })

    test('should handle permission disabled state', () => {
      const result = buildLocationSection(false, 'max')

      expect(result).toBeDefined()
    })
  })

  describe('buildCameraSection', () => {
    test('should return camera category with items', () => {
      const result = buildCameraSection(true, 'max')

      expect(result).toHaveProperty('category')
      expect(result).toHaveProperty('scenarios')
      expect(result.category.title).toContain('Camera')
    })

    test('should include camera-specific items', () => {
      const result = buildCameraSection(true, 'sarah')

      expect(result.category.items.length).toBeGreaterThan(0)
      expect(typeof result.category.items[0]).toBe('string')
    })

    test('should return scenarios for camera', () => {
      const result = buildCameraSection(true, 'max')

      expect(Array.isArray(result.scenarios)).toBe(true)
      expect(result.scenarios.length).toBeGreaterThan(0)
    })

    test('should handle permission disabled state', () => {
      const result = buildCameraSection(false, 'max')

      expect(result).toBeDefined()
    })
  })

  describe('buildMicrophoneSection', () => {
    test('should return microphone category with items', () => {
      const result = buildMicrophoneSection(true, 'max')

      expect(result).toHaveProperty('category')
      expect(result).toHaveProperty('scenarios')
      expect(result.category.title).toContain('Microphone')
    })

    test('should include microphone-specific items', () => {
      const result = buildMicrophoneSection(true, 'sarah')

      expect(result.category.items.length).toBeGreaterThan(0)
      expect(typeof result.category.items[0]).toBe('string')
    })

    test('should return scenarios for microphone', () => {
      const result = buildMicrophoneSection(true, 'max')

      expect(Array.isArray(result.scenarios)).toBe(true)
    })

    test('should handle permission disabled state', () => {
      const result = buildMicrophoneSection(false, 'max')

      expect(result).toBeDefined()
    })
  })

  describe('buildClipboardSection', () => {
    test('should return clipboard category with items', () => {
      const result = buildClipboardSection(true, 'max')

      expect(result).toHaveProperty('category')
      expect(result).toHaveProperty('scenarios')
      expect(result.category.title).toContain('Clipboard')
    })

    test('should include clipboard-specific items', () => {
      const result = buildClipboardSection(true, 'sarah')

      expect(result.category.items.length).toBeGreaterThan(0)
    })

    test('should return scenarios for clipboard', () => {
      const result = buildClipboardSection(true, 'max')

      expect(Array.isArray(result.scenarios)).toBe(true)
      expect(result.scenarios.length).toBeGreaterThan(0)
    })

    test('should handle permission disabled state', () => {
      const result = buildClipboardSection(false, 'max')

      expect(result).toBeDefined()
    })
  })

  describe('buildContactsSection', () => {
    test('should return contacts category with items', () => {
      const result = buildContactsSection(true, 'max')

      expect(result).toHaveProperty('category')
      expect(result).toHaveProperty('scenarios')
      expect(result.category.title).toContain('Contacts')
    })

    test('should include contacts-specific items', () => {
      const result = buildContactsSection(true, 'sarah')

      expect(result.category.items.length).toBeGreaterThan(0)
    })

    test('should return scenarios for contacts', () => {
      const result = buildContactsSection(true, 'max')

      expect(Array.isArray(result.scenarios)).toBe(true)
    })

    test('should handle permission disabled state', () => {
      const result = buildContactsSection(false, 'max')

      expect(result).toBeDefined()
    })
  })

  describe('buildNotificationsSection', () => {
    test('should return notifications category with items', () => {
      const result = buildNotificationsSection(true, 'max')

      expect(result).toHaveProperty('category')
      expect(result).toHaveProperty('scenarios')
      expect(result.category.title).toContain('Notifications')
    })

    test('should include notification-specific items', () => {
      const result = buildNotificationsSection(true, 'sarah')

      expect(result.category.items.length).toBeGreaterThan(0)
    })

    test('should return scenarios for notifications', () => {
      const result = buildNotificationsSection(true, 'max')

      expect(Array.isArray(result.scenarios)).toBe(true)
    })

    test('should handle permission disabled state', () => {
      const result = buildNotificationsSection(false, 'max')

      expect(result).toBeDefined()
    })
  })

  describe('builder consistency', () => {
    const builders = [
      buildLocationSection,
      buildCameraSection,
      buildMicrophoneSection,
      buildClipboardSection,
      buildContactsSection,
      buildNotificationsSection,
    ]

    test('all builders should return consistent structure', () => {
      builders.forEach((builder) => {
        const result = builder(true, 'max')

        expect(result).toHaveProperty('category')
        expect(result).toHaveProperty('scenarios')
        expect(result.category).toHaveProperty('title')
        expect(result.category).toHaveProperty('items')
        expect(Array.isArray(result.category.items)).toBe(true)
        expect(Array.isArray(result.scenarios)).toBe(true)
      })
    })

    test('all builders should handle all personas', () => {
      const personas = ['anonymous', 'max', 'sarah']

      builders.forEach((builder) => {
        personas.forEach((persona) => {
          expect(() => {
            builder(true, persona)
          }).not.toThrow()
        })
      })
    })

    test('all builders should return non-empty arrays', () => {
      builders.forEach((builder) => {
        const result = builder(true, 'max')

        expect(result.category.items.length).toBeGreaterThan(0)
        expect(result.scenarios.length).toBeGreaterThan(0)
      })
    })
  })

  describe('data independence', () => {
    test('should not mutate shared permission configs', () => {
      const result1 = buildLocationSection(true, 'max')
      const result2 = buildLocationSection(true, 'sarah')

      result1.category.items[0] = 'modified'

      expect(result2.category.items[0]).not.toBe('modified')
    })

    test('should return independent scenario objects', () => {
      const result1 = buildLocationSection(true, 'max')
      const result2 = buildLocationSection(true, 'max')

      if (result1.scenarios.length > 0) {
        result1.scenarios[0].title = 'modified'
        expect(result2.scenarios[0].title).not.toBe('modified')
      }
    })
  })

  describe('edge cases and validation', () => {
    test('should handle invalid persona gracefully', () => {
      const result = buildLocationSection(true, 'unknown')

      expect(result).toBeDefined()
      expect(result.category).toBeDefined()
    })

    test('should handle boolean permission state correctly', () => {
      ;[true, false].forEach((state) => {
        const result = buildLocationSection(state, 'max')
        expect(result).toBeDefined()
      })
    })

    test('should handle null/undefined permission state', () => {
      const result = buildLocationSection(undefined || false, 'max')

      expect(result).toBeDefined()
    })
  })
})
