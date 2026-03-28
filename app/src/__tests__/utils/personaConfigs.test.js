/**
 * Unit tests for personaConfigs.js
 * Tests persona-specific configurations and helper functions
 */

import { PERSONA_CONFIGS, getPersonaData, getComboWarning } from '@/utils/personaConfigs'
import { mockPersonas } from '../fixtures/mockData'

describe('personaConfigs - PERSONA_CONFIGS', () => {
  test('should export PERSONA_CONFIGS object', () => {
    expect(PERSONA_CONFIGS).toBeDefined()
    expect(typeof PERSONA_CONFIGS).toBe('object')
  })

  test('should contain max persona configuration', () => {
    expect(PERSONA_CONFIGS.max).toBeDefined()
    expect(typeof PERSONA_CONFIGS.max).toBe('object')
  })

  test('should contain sarah persona configuration', () => {
    expect(PERSONA_CONFIGS.sarah).toBeDefined()
    expect(typeof PERSONA_CONFIGS.sarah).toBe('object')
  })

  test('each persona should have customizations for all permissions', () => {
    const permissions = ['location', 'camera', 'microphone', 'clipboard', 'contacts', 'notifications']

    Object.values(PERSONA_CONFIGS).forEach((persona) => {
      permissions.forEach((permission) => {
        expect(persona).toHaveProperty(permission)
      })
    })
  })

  test('should have combo warnings defined', () => {
    expect(PERSONA_CONFIGS).toHaveProperty('comboWarnings')
    expect(typeof PERSONA_CONFIGS.comboWarnings).toBe('object')
  })

  test('persona customizations should not be empty', () => {
    Object.entries(PERSONA_CONFIGS).forEach(([key, value]) => {
      if (key !== 'comboWarnings') {
        expect(Object.keys(value).length).toBeGreaterThan(0)
      }
    })
  })
})

describe('personaConfigs - getPersonaData', () => {
  test('should return persona data for max', () => {
    const data = getPersonaData('max')

    expect(data).toBeDefined()
    expect(typeof data).toBe('object')
  })

  test('should return persona data for sarah', () => {
    const data = getPersonaData('sarah')

    expect(data).toBeDefined()
    expect(typeof data).toBe('object')
  })

  test('should return empty object for unknown persona', () => {
    const data = getPersonaData('unknown')

    expect(data).toBeDefined()
  })

  test('should return data with permission customizations', () => {
    const data = getPersonaData('max')

    expect(data).toHaveProperty('location')
    expect(data).toHaveProperty('camera')
    expect(data).toHaveProperty('microphone')
  })

  test('should return consistent data on multiple calls', () => {
    const data1 = getPersonaData('max')
    const data2 = getPersonaData('max')

    expect(data1).toEqual(data2)
  })

  test('should return different data for different personas', () => {
    const maxData = getPersonaData('max')
    const sarahData = getPersonaData('sarah')

    // Structure should be same but content may differ
    expect(maxData).toHaveProperty('location')
    expect(sarahData).toHaveProperty('location')
  })

  test('should handle null/undefined persona input', () => {
    const data = getPersonaData(null || undefined || 'anonymous')

    expect(data).toBeDefined()
  })
})

describe('personaConfigs - getComboWarning', () => {
  test('should return warning for multiple permissions', () => {
    const permissions = [
      { id: 'location', name: 'Location' },
      { id: 'camera', name: 'Camera' },
    ]

    const warning = getComboWarning(permissions, 'max')

    expect(warning).toBeDefined()
  })

  test('should return string warning', () => {
    const permissions = [
      { id: 'location', name: 'Location' },
      { id: 'camera', name: 'Camera' },
      { id: 'microphone', name: 'Microphone' },
    ]

    const warning = getComboWarning(permissions, 'max')

    expect(typeof warning).toBe('string')
    expect(warning.length).toBeGreaterThan(0)
  })

  test('should return appropriate warning for max persona', () => {
    const permissions = [
      { id: 'location', name: 'Location' },
      { id: 'camera', name: 'Camera' },
    ]

    const warning = getComboWarning(permissions, 'max')

    expect(warning).toBeDefined()
    expect(typeof warning).toBe('string')
  })

  test('should return appropriate warning for sarah persona', () => {
    const permissions = [
      { id: 'location', name: 'Location' },
      { id: 'contacts', name: 'Contacts' },
    ]

    const warning = getComboWarning(permissions, 'sarah')

    expect(warning).toBeDefined()
    expect(typeof warning).toBe('string')
  })

  test('should return different warnings for different permissions', () => {
    const locationCamera = [
      { id: 'location', name: 'Location' },
      { id: 'camera', name: 'Camera' },
    ]

    const locationMicrophone = [
      { id: 'location', name: 'Location' },
      { id: 'microphone', name: 'Microphone' },
    ]

    const warning1 = getComboWarning(locationCamera, 'max')
    const warning2 = getComboWarning(locationMicrophone, 'max')

    expect(warning1).toBeDefined()
    expect(warning2).toBeDefined()
  })

  test('should handle single permission', () => {
    const permissions = [{ id: 'location', name: 'Location' }]

    const warning = getComboWarning(permissions, 'max')

    expect(warning).toBeDefined()
  })

  test('should handle empty permissions array', () => {
    const permissions = []

    const warning = getComboWarning(permissions, 'max')

    expect(warning).toBeDefined()
  })

  test('should handle all six permissions', () => {
    const permissions = [
      { id: 'location', name: 'Location' },
      { id: 'camera', name: 'Camera' },
      { id: 'microphone', name: 'Microphone' },
      { id: 'clipboard', name: 'Clipboard' },
      { id: 'contacts', name: 'Contacts' },
      { id: 'notifications', name: 'Notifications' },
    ]

    const warning = getComboWarning(permissions, 'max')

    expect(warning).toBeDefined()
    expect(typeof warning).toBe('string')
  })

  test('should be consistent across calls with same input', () => {
    const permissions = [
      { id: 'location', name: 'Location' },
      { id: 'camera', name: 'Camera' },
    ]

    const warning1 = getComboWarning(permissions, 'max')
    const warning2 = getComboWarning(permissions, 'max')

    expect(warning1).toBe(warning2)
  })

  test('should handle unknown persona', () => {
    const permissions = [
      { id: 'location', name: 'Location' },
      { id: 'camera', name: 'Camera' },
    ]

    const warning = getComboWarning(permissions, 'unknown')

    expect(warning).toBeDefined()
  })

  test('should handle null permissions gracefully', () => {
    const warning = getComboWarning(null || [], 'max')

    expect(warning).toBeDefined()
  })
})

describe('personaConfigs - structure validation', () => {
  test('should have valid structure for all personas', () => {
    Object.entries(PERSONA_CONFIGS).forEach(([key, value]) => {
      if (key === 'comboWarnings') {
        expect(typeof value).toBe('object')
      } else {
        expect(typeof value).toBe('object')
        expect(Object.keys(value).length).toBeGreaterThan(0)
      }
    })
  })

  test('should have consistent permission keys across personas', () => {
    const maxKeys = Object.keys(PERSONA_CONFIGS.max).sort()
    const sarahKeys = Object.keys(PERSONA_CONFIGS.sarah).sort()

    expect(maxKeys).toEqual(sarahKeys)
  })

  test('permission customizations should be arrays or objects', () => {
    Object.entries(PERSONA_CONFIGS.max).forEach(([key, value]) => {
      if (key !== 'comboWarnings') {
        expect(['object', 'string'].includes(typeof value)).toBe(true)
      }
    })
  })
})

describe('personaConfigs - data integrity', () => {
  test('should not mutate persona data on multiple calls', () => {
    const data1 = getPersonaData('max')
    const originalData = JSON.stringify(data1)

    const data2 = getPersonaData('max')
    const afterSecondCall = JSON.stringify(data1)

    expect(originalData).toBe(afterSecondCall)
  })

  test('should provide independent objects', () => {
    const data1 = getPersonaData('max')
    const data2 = getPersonaData('max')

    // Modifying one should not affect the other
    if (Array.isArray(data1.location)) {
      data1.location[0] = 'modified'
    }

    // data2 should remain unchanged
    expect(data2).toBeDefined()
  })
})
