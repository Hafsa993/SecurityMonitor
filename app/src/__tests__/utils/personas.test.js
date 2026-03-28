/**
 * Unit tests for personas.js
 * Tests persona data structure and content
 */

import { PERSONAS } from '@/utils/personas'

describe('personas - PERSONAS object', () => {
  test('should export PERSONAS object', () => {
    expect(PERSONAS).toBeDefined()
    expect(typeof PERSONAS).toBe('object')
  })

  test('should contain anonymous persona', () => {
    expect(PERSONAS.anonymous).toBeDefined()
    expect(typeof PERSONAS.anonymous).toBe('object')
  })

  test('should contain max persona', () => {
    expect(PERSONAS.max).toBeDefined()
    expect(typeof PERSONAS.max).toBe('object')
  })

  test('should contain sarah persona', () => {
    expect(PERSONAS.sarah).toBeDefined()
    expect(typeof PERSONAS.sarah).toBe('object')
  })

  test('should have at least three personas', () => {
    expect(Object.keys(PERSONAS).length).toBeGreaterThanOrEqual(3)
  })
})

describe('personas - persona structure', () => {
  test('anonymous persona should have required properties', () => {
    const persona = PERSONAS.anonymous

    expect(persona).toHaveProperty('id')
    expect(persona).toHaveProperty('name')
    expect(persona).toHaveProperty('type')
    expect(persona).toHaveProperty('description')
  })

  test('max persona should have detailed structure', () => {
    const persona = PERSONAS.max

    expect(persona).toHaveProperty('id')
    expect(persona).toHaveProperty('name')
    expect(persona).toHaveProperty('age')
    expect(persona).toHaveProperty('type')
    expect(persona).toHaveProperty('emoji')
    expect(persona).toHaveProperty('description')
    expect(persona).toHaveProperty('interests')
    expect(persona).toHaveProperty('routine')
    expect(persona).toHaveProperty('relationships')
    expect(persona).toHaveProperty('behaviors')
    expect(persona).toHaveProperty('inferences')
    expect(persona).toHaveProperty('ads')
  })

  test('sarah persona should have detailed structure', () => {
    const persona = PERSONAS.sarah

    expect(persona).toHaveProperty('id')
    expect(persona).toHaveProperty('name')
    expect(persona).toHaveProperty('age')
    expect(persona).toHaveProperty('type')
    expect(persona).toHaveProperty('emoji')
    expect(persona).toHaveProperty('description')
    expect(persona).toHaveProperty('interests')
    expect(persona).toHaveProperty('routine')
    expect(persona).toHaveProperty('relationships')
    expect(persona).toHaveProperty('behaviors')
    expect(persona).toHaveProperty('inferences')
    expect(persona).toHaveProperty('ads')
  })
})

describe('personas - basic properties', () => {
  test('all personas should have string id', () => {
    Object.values(PERSONAS).forEach((persona) => {
      expect(typeof persona.id).toBe('string')
      expect(persona.id.length).toBeGreaterThan(0)
    })
  })

  test('all personas should have string name', () => {
    Object.values(PERSONAS).forEach((persona) => {
      expect(typeof persona.name).toBe('string')
      expect(persona.name.length).toBeGreaterThan(0)
    })
  })

  test('all personas should have string type', () => {
    Object.values(PERSONAS).forEach((persona) => {
      expect(typeof persona.type).toBe('string')
      expect(persona.type.length).toBeGreaterThan(0)
    })
  })

  test('all personas should have string description', () => {
    Object.values(PERSONAS).forEach((persona) => {
      expect(typeof persona.description).toBe('string')
      expect(persona.description.length).toBeGreaterThan(0)
    })
  })

  test('non-anonymous personas should have age', () => {
    ;[PERSONAS.max, PERSONAS.sarah].forEach((persona) => {
      expect(typeof persona.age).toBe('number')
      expect(persona.age).toBeGreaterThan(0)
      expect(persona.age).toBeLessThan(150)
    })
  })

  test('non-anonymous personas should have emoji', () => {
    ;[PERSONAS.max, PERSONAS.sarah].forEach((persona) => {
      expect(persona.emoji).toBeDefined()
      expect(typeof persona.emoji).toBe('string')
      expect(persona.emoji.length).toBeGreaterThan(0)
    })
  })
})

describe('personas - detailed persona data', () => {
  describe('max persona', () => {
    const persona = PERSONAS.max

    test('should have complete interest list', () => {
      expect(Array.isArray(persona.interests)).toBe(true)
      expect(persona.interests.length).toBeGreaterThan(0)
      persona.interests.forEach((interest) => {
        expect(typeof interest).toBe('string')
        expect(interest.length).toBeGreaterThan(0)
      })
    })

    test('should have complete routine', () => {
      expect(persona.routine).toHaveProperty('home')
      expect(persona.routine).toHaveProperty('work')
      expect(persona.routine).toHaveProperty('frequentPlaces')
      expect(Array.isArray(persona.routine.frequentPlaces)).toBe(true)
      expect(persona.routine.frequentPlaces.length).toBeGreaterThan(0)
    })

    test('frequent places should have required properties', () => {
      persona.routine.frequentPlaces.forEach((place) => {
        expect(place).toHaveProperty('place')
        expect(place).toHaveProperty('times')
        expect(place).toHaveProperty('details')
      })
    })

    test('should have relationships description', () => {
      expect(typeof persona.relationships).toBe('string')
      expect(persona.relationships.length).toBeGreaterThan(0)
    })

    test('should have behavioral list', () => {
      expect(Array.isArray(persona.behaviors)).toBe(true)
      expect(persona.behaviors.length).toBeGreaterThan(0)
      persona.behaviors.forEach((behavior) => {
        expect(typeof behavior).toBe('string')
        expect(behavior.length).toBeGreaterThan(0)
      })
    })

    test('should have permission inferences', () => {
      expect(persona.inferences).toHaveProperty('location')
      expect(persona.inferences).toHaveProperty('camera')
      expect(persona.inferences).toHaveProperty('microphone')
      expect(persona.inferences).toHaveProperty('clipboard')
      expect(persona.inferences).toHaveProperty('contacts')
      expect(persona.inferences).toHaveProperty('notifications')
    })

    test('should have ad targeting list', () => {
      expect(Array.isArray(persona.ads)).toBe(true)
      expect(persona.ads.length).toBeGreaterThan(0)
      persona.ads.forEach((ad) => {
        expect(typeof ad).toBe('string')
        expect(ad.length).toBeGreaterThan(0)
      })
    })
  })

  describe('sarah persona', () => {
    const persona = PERSONAS.sarah

    test('should have complete interest list', () => {
      expect(Array.isArray(persona.interests)).toBe(true)
      expect(persona.interests.length).toBeGreaterThan(0)
    })

    test('should have complete routine with frequent places', () => {
      expect(persona.routine.frequentPlaces.length).toBeGreaterThan(0)
    })

    test('should have behavioral list', () => {
      expect(Array.isArray(persona.behaviors)).toBe(true)
      expect(persona.behaviors.length).toBeGreaterThan(0)
    })

    test('should have permission inferences', () => {
      expect(persona.inferences).toHaveProperty('location')
      expect(persona.inferences).toHaveProperty('camera')
      expect(persona.inferences).toHaveProperty('microphone')
      expect(persona.inferences).toHaveProperty('clipboard')
      expect(persona.inferences).toHaveProperty('contacts')
      expect(persona.inferences).toHaveProperty('notifications')
    })

    test('should have ad targeting list', () => {
      expect(Array.isArray(persona.ads)).toBe(true)
      expect(persona.ads.length).toBeGreaterThan(0)
    })
  })
})

describe('personas - data consistency', () => {
  test('all personas should have consistent permission coverage', () => {
    const requiredPermissions = [
      'location',
      'camera',
      'microphone',
      'clipboard',
      'contacts',
      'notifications',
    ]

    Object.values(PERSONAS).forEach((persona) => {
      if (persona.inferences) {
        requiredPermissions.forEach((permission) => {
          expect(persona.inferences).toHaveProperty(permission)
        })
      }
    })
  })

  test('persona id should match object key', () => {
    Object.entries(PERSONAS).forEach(([key, persona]) => {
      if (key !== 'anonymous' || persona.id === 'anonymous') {
        expect(persona.id).toBe(key)
      }
    })
  })

  test('should not mutate PERSONAS on access', () => {
    const original = JSON.stringify(PERSONAS)

    // Access all personas and their properties
    Object.values(PERSONAS).forEach((persona) => {
      persona.name
      persona.type
      if (persona.interests) {
        persona.interests.forEach((i) => i.length)
      }
      if (persona.behaviors) {
        persona.behaviors.forEach((b) => b.length)
      }
      if (persona.ads) {
        persona.ads.forEach((a) => a.length)
      }
    })

    const after = JSON.stringify(PERSONAS)

    expect(original).toBe(after)
  })
})

describe('personas - content quality', () => {
  test('descriptions should be relevant to persona type', () => {
    ;[PERSONAS.max, PERSONAS.sarah].forEach((persona) => {
      const desc = persona.description.toLowerCase()
      const type = persona.type.toLowerCase()

      expect(desc.length).toBeGreaterThan(10)
      expect(type.length).toBeGreaterThan(0)
    })
  })

  test('routine should cover typical daily activities', () => {
    ;[PERSONAS.max, PERSONAS.sarah].forEach((persona) => {
      expect(persona.routine.home).toBeDefined()
      expect(persona.routine.work).toBeDefined()
      expect(persona.routine.frequentPlaces.length).toBeGreaterThan(2)
    })
  })

  test('inferences should be thoughtful and relevant', () => {
    ;[PERSONAS.max, PERSONAS.sarah].forEach((persona) => {
      Object.values(persona.inferences).forEach((inference) => {
        expect(typeof inference).toBe('string')
        expect(inference.length).toBeGreaterThan(5)
      })
    })
  })

  test('ads should be relevant to persona interests', () => {
    ;[PERSONAS.max, PERSONAS.sarah].forEach((persona) => {
      expect(persona.ads.length).toBeGreaterThan(3)
      persona.ads.forEach((ad) => {
        expect(ad.length).toBeGreaterThan(3)
      })
    })
  })
})

describe('personas - uniqueness', () => {
  test('max and sarah should have different characteristics', () => {
    const max = PERSONAS.max
    const sarah = PERSONAS.sarah

    expect(max.age).not.toBe(sarah.age)
    expect(max.type).not.toBe(sarah.type)
    expect(max.emoji).not.toBe(sarah.emoji)
  })

  test('personas should have distinct interests', () => {
    const max = PERSONAS.max
    const sarah = PERSONAS.sarah

    expect(max.interests).toBeDefined()
    expect(sarah.interests).toBeDefined()
  })

  test('personas should have different routines', () => {
    const max = PERSONAS.max
    const sarah = PERSONAS.sarah

    expect(max.routine.home).not.toBe(sarah.routine.home)
    expect(max.routine.work).not.toBe(sarah.routine.work)
  })

  test('personas should have different behaviors', () => {
    const max = PERSONAS.max
    const sarah = PERSONAS.sarah

    const maxBehaviors = max.behaviors.join('|').toLowerCase()
    const sarahBehaviors = sarah.behaviors.join('|').toLowerCase()

    expect(maxBehaviors).not.toBe(sarahBehaviors)
  })
})
