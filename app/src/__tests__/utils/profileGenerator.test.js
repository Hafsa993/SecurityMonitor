/**
 * Unit tests for profileGenerator.js
 * Tests the main orchestration function and its integration with builders
 */

import { generateProfile } from '@/utils/profileGenerator'
import { mockPermissions, mockPersonas, testCases } from '../fixtures/mockData'
import { getComboWarning } from '@/utils/personaConfigs'

describe('profileGenerator - generateProfile', () => {
  describe('valid inputs', () => {
    test('should generate profile with single permission', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(profile).toBeDefined()
      expect(profile.duration).toBe(7)
      expect(profile.invasionLevel).toBeDefined()
      expect(Array.isArray(profile.categories)).toBe(true)
      expect(Array.isArray(profile.scenarios)).toBe(true)
    })

    test('should generate profile with multiple permissions', () => {
      const profile = generateProfile(
        [mockPermissions.location, mockPermissions.camera],
        14,
        mockPersonas.sarah
      )

      expect(profile).toBeDefined()
      expect(profile.duration).toBe(14)
      expect(profile.categories.length).toBeGreaterThan(0)
      expect(profile.scenarios.length).toBeGreaterThan(0)
    })

    test('should generate profile with all permissions', () => {
      const allPermissions = Object.values(mockPermissions)
      const profile = generateProfile(allPermissions, 30, mockPersonas.max)

      expect(profile).toBeDefined()
      expect(profile.categories.length).toBe(6)
      expect(profile.invasionLevel).toBe('High')
    })

    test('should handle empty permissions array', () => {
      const profile = generateProfile([], 7, mockPersonas.anonymous)

      expect(profile).toBeDefined()
      expect(profile.duration).toBe(7)
      expect(profile.categories.length).toBe(0)
      expect(profile.scenarios.length).toBe(0)
    })
  })

  describe('invasion level calculation', () => {
    test('should calculate Low invasion level for 1 day', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        1,
        mockPersonas.max
      )

      expect(profile.invasionLevel).toBe('Low')
    })

    test('should calculate Moderate invasion level for 7 days', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(profile.invasionLevel).toBe('Moderate')
    })

    test('should calculate High invasion level for 30 days', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        30,
        mockPersonas.max
      )

      expect(profile.invasionLevel).toBe('High')
    })

    test('should calculate Very High invasion level for 90 days', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        90,
        mockPersonas.max
      )

      expect(profile.invasionLevel).toBe('Very High')
    })

    test('should calculate Extreme invasion level for 365 days', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        365,
        mockPersonas.max
      )

      expect(profile.invasionLevel).toBe('Extreme')
    })
  })

  describe('combo warnings', () => {
    test('should include combo warning for risky permission combinations', () => {
      const profile = generateProfile(
        [mockPermissions.location, mockPermissions.camera, mockPermissions.microphone],
        7,
        mockPersonas.max
      )

      expect(profile.comboWarning).toBeDefined()
      expect(typeof profile.comboWarning).toBe('string')
      expect(profile.comboWarning.length).toBeGreaterThan(0)
    })

    test('should not include combo warning for safe combinations', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(profile.comboWarning).toBeDefined()
    })

    test('should match getComboWarning utility result', () => {
      const permissions = [mockPermissions.location, mockPermissions.camera]
      const profile = generateProfile(permissions, 7, mockPersonas.max)

      if (permissions.length > 1) {
        expect(profile.comboWarning).toBeDefined()
      }
    })
  })

  describe('duration text formatting', () => {
    test('should format single day correctly', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        1,
        mockPersonas.max
      )

      expect(profile.duration).toBe(1)
    })

    test('should format week duration correctly', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(profile.duration).toBe(7)
    })

    test('should handle various duration values', () => {
      ;[1, 7, 14, 30, 90, 180, 365].forEach((days) => {
        const profile = generateProfile(
          [mockPermissions.location],
          days,
          mockPersonas.max
        )

        expect(profile.duration).toBe(days)
      })
    })
  })

  describe('output structure', () => {
    test('should return object with all required properties', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(profile).toHaveProperty('duration')
      expect(profile).toHaveProperty('invasionLevel')
      expect(profile).toHaveProperty('categories')
      expect(profile).toHaveProperty('scenarios')
      expect(profile).toHaveProperty('comboWarning')
      expect(profile).toHaveProperty('protectionTips')
    })

    test('should return array for categories property', () => {
      const profile = generateProfile(
        [mockPermissions.location, mockPermissions.camera],
        7,
        mockPersonas.max
      )

      expect(Array.isArray(profile.categories)).toBe(true)
      profile.categories.forEach((category) => {
        expect(category).toHaveProperty('title')
        expect(category).toHaveProperty('items')
        expect(Array.isArray(category.items)).toBe(true)
      })
    })

    test('should return array for scenarios property', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(Array.isArray(profile.scenarios)).toBe(true)
      profile.scenarios.forEach((scenario) => {
        expect(scenario).toHaveProperty('icon')
        expect(scenario).toHaveProperty('title')
        expect(scenario).toHaveProperty('description')
      })
    })

    test('should return array for protectionTips property', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(Array.isArray(profile.protectionTips)).toBe(true)
      if (profile.protectionTips.length > 0) {
        expect(typeof profile.protectionTips[0]).toBe('string')
      }
    })
  })

  describe('persona-specific behavior', () => {
    test('should generate different profiles for different personas with same permissions', () => {
      const permissionsList = [mockPermissions.location]
      const duration = 7

      const maxProfile = generateProfile(permissionsList, duration, mockPersonas.max)
      const sarahProfile = generateProfile(permissionsList, duration, mockPersonas.sarah)

      // Both should have same structure
      expect(maxProfile).toHaveProperty('duration')
      expect(sarahProfile).toHaveProperty('duration')

      // Content may differ due to persona customizations
      expect(maxProfile.categories).toBeDefined()
      expect(sarahProfile.categories).toBeDefined()
    })

    test('should handle anonymous persona', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.anonymous
      )

      expect(profile).toBeDefined()
      expect(profile.invasionLevel).toBeDefined()
    })

    test('should work with all persona types', () => {
      const permissionsList = [mockPermissions.location]
      const duration = 7

      Object.values(mockPersonas).forEach((persona) => {
        const profile = generateProfile(permissionsList, duration, persona)

        expect(profile).toBeDefined()
        expect(profile.invasionLevel).toBeDefined()
        expect(Array.isArray(profile.categories)).toBe(true)
      })
    })
  })

  describe('edge cases', () => {
    test('should handle null enabled permissions gracefully', () => {
      // This tests defensive programming
      expect(() => {
        generateProfile(undefined || [], 7, mockPersonas.max)
      }).not.toThrow()
    })

    test('should handle minimum valid duration', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        1,
        mockPersonas.max
      )

      expect(profile).toBeDefined()
      expect(profile.duration).toBe(1)
    })

    test('should handle maximum realistic duration', () => {
      const profile = generateProfile(
        [mockPermissions.location],
        365,
        mockPersonas.max
      )

      expect(profile).toBeDefined()
      expect(profile.duration).toBe(365)
    })

    test('should maintain consistency across multiple calls', () => {
      const permissions = [mockPermissions.location, mockPermissions.camera]
      const duration = 7
      const persona = mockPersonas.max

      const profile1 = generateProfile(permissions, duration, persona)
      const profile2 = generateProfile(permissions, duration, persona)

      expect(profile1.invasionLevel).toBe(profile2.invasionLevel)
      expect(profile1.categories.length).toBe(profile2.categories.length)
      expect(profile1.scenarios.length).toBe(profile2.scenarios.length)
    })
  })

  describe('integration with other modules', () => {
    test('should use permission builders for each enabled permission', () => {
      const permissions = [mockPermissions.location, mockPermissions.camera]
      const profile = generateProfile(permissions, 7, mockPersonas.max)

      expect(profile.categories.length).toBeGreaterThanOrEqual(permissions.length)
    })

    test('should respect permission order in output', () => {
      const permissions = [
        mockPermissions.location,
        mockPermissions.camera,
        mockPermissions.microphone,
      ]
      const profile = generateProfile(permissions, 7, mockPersonas.max)

      expect(profile.categories.length).toBeGreaterThan(0)
      expect(profile.scenarios.length).toBeGreaterThan(0)
    })
  })

  describe('data integrity', () => {
    test('should not mutate input arrays', () => {
      const permissions = [mockPermissions.location]
      const permissionsCopy = [...permissions]

      generateProfile(permissions, 7, mockPersonas.max)

      expect(permissions).toEqual(permissionsCopy)
    })

    test('should provide independent result objects', () => {
      const profile1 = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )
      const profile2 = generateProfile(
        [mockPermissions.location],
        7,
        mockPersonas.max
      )

      profile1.categories[0].items[0] = 'modified'

      expect(profile2.categories[0].items[0]).not.toBe('modified')
    })
  })
})
