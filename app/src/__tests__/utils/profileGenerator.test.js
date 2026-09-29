/**
 * Unit tests for profileGenerator.js
 * Tests the main orchestration function and its integration with builders
 */

import { generateProfile } from '@/utils/profileGenerator'
import { PERMISSION_CONFIGS } from '@/utils/permissionConfigs'
import { mockPermissions, mockPersonas } from '../fixtures/mockData'

const ALL_PERMISSIONS = Object.values(mockPermissions)

describe('profileGenerator - generateProfile', () => {
  describe('output structure', () => {
    test('returns all profile fields', () => {
      const profile = generateProfile([mockPermissions.location], 7, mockPersonas.max)

      expect(profile).toEqual({
        duration: '1 week',
        durationDays: 7,
        invasionLevel: expect.any(String),
        categories: expect.any(Array),
        scenarios: expect.any(Array),
        protectionTips: expect.any(Array),
        personaId: 'max',
      })
    })

    test('builds one category and two scenarios per enabled permission', () => {
      const profile = generateProfile(ALL_PERMISSIONS, 7, mockPersonas.max)

      expect(profile.categories.map((c) => c.permissionType)).toEqual([
        'location',
        'camera',
        'microphone',
        'clipboard',
        'contacts',
        'notifications',
      ])
      expect(profile.scenarios).toHaveLength(12)
    })

    test('uses a fixed category order regardless of input order', () => {
      const profile = generateProfile(
        [mockPermissions.notifications, mockPermissions.location],
        7,
        mockPersonas.max
      )

      expect(profile.categories.map((c) => c.permissionType)).toEqual(['location', 'notifications'])
    })

    test('every scenario has an icon, a title and a description', () => {
      const profile = generateProfile(ALL_PERMISSIONS, 7, mockPersonas.sarah)

      profile.scenarios.forEach((scenario) => {
        expect(scenario.icon).toEqual(expect.any(String))
        expect(scenario.title).toEqual(expect.any(String))
        expect(scenario.description).toEqual(expect.any(String))
      })
    })
  })

  describe('empty selection', () => {
    test('returns no categories and a single data aggregation scenario', () => {
      const profile = generateProfile([], 7, mockPersonas.max)

      expect(profile.categories).toEqual([])
      expect(profile.scenarios).toEqual([
        expect.objectContaining({ title: 'Data Aggregation' }),
      ])
    })
  })

  describe('invasion level', () => {
    // Score = number of enabled permissions × days
    test.each([
      [1, 1, 'Low'],
      [1, 7, 'Low'],
      [1, 8, 'Moderate'],
      [1, 30, 'Moderate'],
      [1, 90, 'High'],
      [2, 90, 'Very High'],
      [1, 365, 'Extreme'],
      [6, 30, 'Very High'],
      [6, 31, 'Extreme'],
    ])('%i permission(s) for %i day(s) is %s', (count, days, expected) => {
      const profile = generateProfile(ALL_PERMISSIONS.slice(0, count), days, mockPersonas.max)

      expect(profile.invasionLevel).toBe(expected)
    })
  })

  describe('duration', () => {
    test.each([
      [1, '1 day'],
      [7, '1 week'],
      [30, '1 month'],
      [90, '3 months'],
      [365, '1 year'],
      [14, '14 days'],
    ])('%i days is shown as "%s"', (days, text) => {
      const profile = generateProfile([mockPermissions.location], days, mockPersonas.max)

      expect(profile.duration).toBe(text)
      expect(profile.durationDays).toBe(days)
    })
  })

  describe('personas', () => {
    test('uses persona-specific content when a known persona is selected', () => {
      const generic = generateProfile([mockPermissions.location], 7, null)
      const max = generateProfile([mockPermissions.location], 7, mockPersonas.max)
      const sarah = generateProfile([mockPermissions.location], 7, mockPersonas.sarah)

      expect(max.scenarios[0].description).not.toBe(generic.scenarios[0].description)
      expect(sarah.scenarios[0].description).not.toBe(max.scenarios[0].description)
    })

    test('falls back to generic content for a persona without config', () => {
      const profile = generateProfile([mockPermissions.location], 7, mockPersonas.anonymous)

      expect(profile.personaId).toBe('anonymous')
      expect(profile.categories[0].items).toEqual(PERMISSION_CONFIGS.location.baseItems)
    })

    test('reports a null personaId when no persona is selected', () => {
      expect(generateProfile([mockPermissions.camera], 7).personaId).toBeNull()
    })
  })

  describe('protection tips', () => {
    test('adds the clipboard tip only when clipboard is enabled', () => {
      const tip = 'Avoid copying sensitive information like passwords into apps'

      expect(generateProfile([mockPermissions.location], 7).protectionTips).not.toContain(tip)
      expect(generateProfile([mockPermissions.clipboard], 7).protectionTips).toContain(tip)
    })
  })

  describe('data integrity', () => {
    test('does not mutate the input array', () => {
      const permissions = [mockPermissions.location]
      const copy = [...permissions]

      generateProfile(permissions, 7, mockPersonas.max)

      expect(permissions).toEqual(copy)
    })

    test('returns independent results', () => {
      const first = generateProfile([mockPermissions.location], 7, mockPersonas.max)
      const second = generateProfile([mockPermissions.location], 7, mockPersonas.max)

      first.categories[0].items[0] = 'modified'

      expect(second.categories[0].items[0]).not.toBe('modified')
    })
  })
})
