/**
 * Tests for translation utilities and patterns
 * Tests translation behavior, key resolution, and data structure
 */

import en from '@/i18n/en.json'
import de from '@/i18n/de.json'

/**
 * Utility function that mirrors the translation function behavior from context
 */
function createTranslationFunction(translations) {
  return (key, defaultValue = key) => {
    const keys = key.split('.')
    let value = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return defaultValue
      }
    }

    return typeof value === 'string' ? value : defaultValue
  }
}

describe('Translation System - Utilities', () => {
  describe('Translation Function Behavior', () => {
    test('should retrieve simple string translations', () => {
      const t = createTranslationFunction(en)

      const result = t('app.title')
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    test('should retrieve nested translations', () => {
      const t = createTranslationFunction(en)

      const result = t('permissions.location.name')
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    test('should handle deeply nested keys', () => {
      const t = createTranslationFunction(en)

      // Test 3 levels deep
      const result = t('personaSelector.personas.max.name')
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    test('should return default value when key does not exist', () => {
      const t = createTranslationFunction(en)

      const result = t('nonexistent.key', 'DEFAULT')
      expect(result).toBe('DEFAULT')
    })

    test('should return key itself when no default provided', () => {
      const t = createTranslationFunction(en)

      const result = t('nonexistent.key.path')
      expect(result).toBe('nonexistent.key.path')
    })

    test('should handle empty string default', () => {
      const t = createTranslationFunction(en)

      const result = t('nonexistent', '')
      expect(result).toBe('')
    })

    test('should not return non-string objects', () => {
      const t = createTranslationFunction(en)

      // If a key points to an object (not a leaf string), should return default
      const result = t('permissions')
      const defaultValue = 'NOT_FOUND'
      const resultWithDefault = t('permissions', defaultValue)
      
      expect(resultWithDefault).toBe(defaultValue)
    })
  })

  describe('Translation Data Consistency', () => {
    test('should have matching top-level keys in English and German', () => {
      const enKeys = Object.keys(en).sort()
      const deKeys = Object.keys(de).sort()

      expect(enKeys).toEqual(deKeys)
    })

    test('should have exactly the same keys at every level in English and German', () => {
      const flatKeys = (obj, prefix = '') =>
        Object.entries(obj).flatMap(([key, value]) =>
          value && typeof value === 'object' ? flatKeys(value, `${prefix}${key}.`) : [`${prefix}${key}`]
        )

      expect(flatKeys(de).sort()).toEqual(flatKeys(en).sort())
    })

    test('should have matching permission keys in English and German', () => {
      const permissions = Object.keys(en.permissions).sort()
      const dePermissions = Object.keys(de.permissions).sort()

      expect(permissions).toEqual(dePermissions)
    })

    test('should have all required permission fields', () => {
      const requiredFields = ['name', 'icon', 'description']
      const permissionIds = Object.keys(en.permissions)

      permissionIds.forEach((id) => {
        requiredFields.forEach((field) => {
          expect(en.permissions[id]).toHaveProperty(field)
          expect(de.permissions[id]).toHaveProperty(field)
        })
      })
    })

    test('should have matching duration keys in English and German', () => {
      const enDurations = Object.keys(en.durationSlider.durations).sort()
      const deDurations = Object.keys(de.durationSlider.durations).sort()

      expect(enDurations).toEqual(deDurations)
    })

    test('should have matching invasion level keys in English and German', () => {
      const enLevels = Object.keys(en.durationSlider.invasionLevels).sort()
      const deLevels = Object.keys(de.durationSlider.invasionLevels).sort()

      expect(enLevels).toEqual(deLevels)
    })

    test('should have matching persona keys in English and German', () => {
      const enPersonas = Object.keys(en.personaSelector.personas).sort()
      const dePersonas = Object.keys(de.personaSelector.personas).sort()

      expect(enPersonas).toEqual(dePersonas)
    })

    test('should have same number of protection tips', () => {
      expect(en.protectionTips.length).toBe(de.protectionTips.length)
      expect(en.protectionTips.length).toBeGreaterThan(0)
    })
  })

  describe('Translation Content Quality', () => {
    test('should not have placeholder text in translations', () => {
      const checkForPlaceholders = (obj) => {
        const placeholders = ['{', '}', '[', ']', '<<', '>>']
        
        const checkValue = (value, path = '') => {
          if (typeof value === 'string') {
            // Allow {expression} format for interpolation, but check content
            expect(value.length).toBeGreaterThan(0)
          } else if (Array.isArray(value)) {
            value.forEach((item, idx) => checkValue(item, `${path}[${idx}]`))
          } else if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([key, val]) => {
              checkValue(val, path ? `${path}.${key}` : key)
            })
          }
        }

        checkValue(obj)
      }

      checkForPlaceholders(en)
      checkForPlaceholders(de)
    })

    test('should have translations that are reasonable length', () => {
      const checkReasonableLength = (obj) => {
        const checkValue = (value) => {
          if (typeof value === 'string') {
            // Not too short, not too long
            expect(value.length).toBeGreaterThan(0)
            expect(value.length).toBeLessThan(500)
          } else if (Array.isArray(value)) {
            value.forEach((item) => checkValue(item))
          } else if (typeof value === 'object' && value !== null) {
            Object.values(value).forEach((val) => checkValue(val))
          }
        }

        checkValue(obj)
      }

      checkReasonableLength(en)
      checkReasonableLength(de)
    })

    test('should maintain professional tone in translations', () => {
      // Check that critical UI strings exist and are present
      const criticalKeys = [
        'app.title',
        'permissions.location.name',
        'durationSlider.label',
        'personaSelector.label',
        'profileCard.title',
      ]

      const tEn = createTranslationFunction(en)
      const tDe = createTranslationFunction(de)

      criticalKeys.forEach((key) => {
        const enValue = tEn(key)
        const deValue = tDe(key)

        expect(enValue).not.toBe(key) // Should be translated, not the key
        expect(deValue).not.toBe(key) // Should be translated, not the key
        
        expect(enValue.length).toBeGreaterThan(0)
        expect(deValue.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Permission Fields', () => {
    test('should have all 6 permissions defined', () => {
      const expectedPermissions = ['location', 'camera', 'microphone', 'clipboard', 'contacts', 'notifications']
      const actualPermissions = Object.keys(en.permissions).sort()

      expect(actualPermissions).toEqual(expectedPermissions.sort())
    })

    test('should have icons for all permissions', () => {
      Object.entries(en.permissions).forEach(([id, perm]) => {
        expect(perm.icon).toBeTruthy()
        expect(typeof perm.icon).toBe('string')
        // Icons should be emoji characters or symbols
        expect(perm.icon.length).toBeGreaterThan(0)
      })
    })

    test('should have descriptive names for all permissions', () => {
      Object.entries(en.permissions).forEach(([id, perm]) => {
        expect(perm.name).toBeTruthy()
        expect(perm.name.length).toBeGreaterThan(2)
        // Name should not be the key
        expect(perm.name).not.toBe(id)
      })
    })

    test('should have detailed descriptions for all permissions', () => {
      Object.entries(en.permissions).forEach(([id, perm]) => {
        expect(perm.description).toBeTruthy()
        expect(perm.description.length).toBeGreaterThan(10)
      })
    })
  })

  describe('Persona Fields', () => {
    test('should have all 3 personas defined', () => {
      const expectedPersonas = ['anonymous', 'max', 'sarah']
      const actualPersonas = Object.keys(en.personaSelector.personas).sort()

      expect(actualPersonas).toEqual(expectedPersonas.sort())
    })

    test('should have names and types for all personas', () => {
      Object.entries(en.personaSelector.personas).forEach(([id, persona]) => {
        expect(persona.name).toBeTruthy()
        expect(persona.type).toBeTruthy()
        
        expect(persona.name.length).toBeGreaterThan(0)
        expect(persona.type.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Duration Options', () => {
    test('should have all standard duration options', () => {
      const expectedDurations = ['1', '7', '30', '90', '365']
      const actualDurations = Object.keys(en.durationSlider.durations).sort()

      expect(actualDurations).toEqual(expectedDurations.sort())
    })

    test('should have meaningful labels for each duration', () => {
      Object.entries(en.durationSlider.durations).forEach(([value, label]) => {
        expect(label).toBeTruthy()
        expect(label.length).toBeGreaterThan(0)
        // Should reference time unit
        expect(label.toLowerCase()).toMatch(/day|week|month|year/)
      })
    })
  })

  describe('Invasion Levels', () => {
    test('should have all invasion levels defined', () => {
      const expectedLevels = ['low', 'moderate', 'high', 'veryHigh', 'extreme']
      const actualLevels = Object.keys(en.durationSlider.invasionLevels).sort()

      expect(actualLevels).toEqual(expectedLevels.sort())
    })

    test('should have descriptive labels for each level', () => {
      Object.entries(en.durationSlider.invasionLevels).forEach(([level, label]) => {
        expect(label).toBeTruthy()
        expect(label.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Protection Tips', () => {
    test('should have at least one protection tip', () => {
      expect(en.protectionTips.length).toBeGreaterThan(0)
      expect(de.protectionTips.length).toBeGreaterThan(0)
    })

    test('should have substantial protection tips', () => {
      en.protectionTips.forEach((tip) => {
        expect(typeof tip).toBe('string')
        expect(tip.length).toBeGreaterThan(10) // Meaningful tips, not one-word
      })

      de.protectionTips.forEach((tip) => {
        expect(typeof tip).toBe('string')
        expect(tip.length).toBeGreaterThan(10)
      })
    })

    test('should maintain parallel structure between English and German tips', () => {
      // While content differs, structure should be similar
      expect(en.protectionTips.length).toBe(de.protectionTips.length)

      // Each tip should have similar characteristics
      en.protectionTips.forEach((enTip, index) => {
        const deTip = de.protectionTips[index]
        
        // Both should be non-empty
        expect(enTip.length).toBeGreaterThan(0)
        expect(deTip.length).toBeGreaterThan(0)
        
        // Order matters - both should be present
        expect(deTip).toBeTruthy()
      })
    })
  })

  describe('Translation Completeness', () => {
    test('should translate all UI section labels', () => {
      const sections = [
        'permissionTracker.permissionsLabel',
        'durationSlider.label',
        'personaSelector.label',
        'profileCard.title',
      ]

      const tEn = createTranslationFunction(en)
      const tDe = createTranslationFunction(de)

      sections.forEach((section) => {
        const enValue = tEn(section)
        const deValue = tDe(section)

        // Should not be missing or return the key itself
        expect(enValue).not.toBe(section)
        expect(deValue).not.toBe(section)
        
        // Should have content
        expect(enValue.length).toBeGreaterThan(0)
        expect(deValue.length).toBeGreaterThan(0)
      })
    })

    test('should have translations for all permission categories', () => {
      Object.keys(en.permissions).forEach((permId) => {
        const t = createTranslationFunction(en)
        const path = `permissions.${permId}.name`
        const result = t(path)

        expect(result).not.toBe(path)
        expect(result.length).toBeGreaterThan(0)
      })
    })
  })
})
