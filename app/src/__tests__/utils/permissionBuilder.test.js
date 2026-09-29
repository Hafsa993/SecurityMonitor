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
import { PERMISSION_CONFIGS } from '@/utils/permissionConfigs'
import { PERSONA_CONFIGS } from '@/utils/personaConfigs'

const hasNone = () => false
const hasOnly = (...ids) => (id) => ids.includes(id)

// Uniform call signature: location, contacts and notifications also take hasPermission
const builders = {
  location: (personaId, has = hasNone) => buildLocationSection(has, personaId),
  camera: (personaId) => buildCameraSection(personaId),
  microphone: (personaId) => buildMicrophoneSection(personaId),
  clipboard: (personaId) => buildClipboardSection(personaId),
  contacts: (personaId, has = hasNone) => buildContactsSection(has, personaId),
  notifications: (personaId, has = hasNone) => buildNotificationsSection(has, personaId),
}

describe('permissionBuilder', () => {
  describe.each(Object.keys(builders))('%s section', (type) => {
    const build = builders[type]
    const config = PERMISSION_CONFIGS[type]

    test('returns a category built from the shared config', () => {
      const { category } = build(null)

      expect(category.title).toBe(config.categoryTitle)
      expect(category.titleKey).toBe(config.categoryTitleKey)
      expect(category.permissionType).toBe(type)
      expect(category.baseItemsLength).toBe(config.baseItems.length)
      expect(category.items).toEqual(config.baseItems)
    })

    test('returns the main scenario followed by the legal reality scenario', () => {
      const { scenarios } = build(null)

      expect(scenarios).toHaveLength(2)
      expect(scenarios[0].permissionType).toBe(type)
      expect(scenarios[0].title).toBe(config.scenarios[0].title)
      expect(scenarios[1]).toBe(config.scenarios[1])
    })

    test('without a persona, uses the generic description and keeps its translation key', () => {
      const [main] = build(null).scenarios

      expect(main.description).toBe(config.scenarios[0].baseDescription)
      expect(main.descriptionKey).toBe(config.scenarios[0].descriptionKey)
      expect(main.sources).toHaveLength(1)
    })

    test('treats an unknown persona like no persona', () => {
      expect(build('unknown')).toEqual(build(null))
    })

    test('does not mutate the shared config', () => {
      const before = JSON.stringify(config)
      build('max').category.items.push('extra')
      build('sarah')

      expect(JSON.stringify(config)).toBe(before)
    })
  })

  describe.each(['max', 'sarah'])('persona %s', (personaId) => {
    const persona = PERSONA_CONFIGS[personaId]

    test.each(['location', 'camera', 'clipboard', 'contacts', 'notifications'])(
      '%s uses the persona description instead of the generic translation',
      (type) => {
        const [main] = builders[type](personaId).scenarios

        expect(main.description).toBe(persona[type].description)
        expect(main).not.toHaveProperty('descriptionKey')
        expect(main.permissionType).toBe(type)
      }
    )

    test('location appends persona items after the base items', () => {
      const { category } = builders.location(personaId)

      expect(category.items).toEqual([
        ...PERMISSION_CONFIGS.location.baseItems,
        ...persona.location.extraItems,
      ])
    })

    test('location adds microphone and notification sources only when those are enabled', () => {
      const base = builders.location(personaId).scenarios[0].sources
      const combined = builders.location(personaId, hasOnly('microphone', 'notifications')).scenarios[0].sources

      expect(base).toEqual(persona.location.baseSources)
      expect(combined).toEqual([
        ...persona.location.baseSources,
        ...persona.location.microphone,
        ...persona.location.notifications,
      ])
    })

    test('contacts adds the location source only when location is enabled', () => {
      const without = builders.contacts(personaId).scenarios[0].sources
      const withLocation = builders.contacts(personaId, hasOnly('location')).scenarios[0].sources

      expect(without).toEqual(persona.contacts.sources)
      expect(withLocation).toEqual([...persona.contacts.sources, persona.contacts.locationExtra])
    })

    test('notifications adds the location source only when location is enabled', () => {
      const without = builders.notifications(personaId).scenarios[0].sources
      const withLocation = builders.notifications(personaId, hasOnly('location')).scenarios[0].sources

      expect(without).toEqual(persona.notifications.sources)
      expect(withLocation).toEqual([...persona.notifications.sources, persona.notifications.locationExtra])
    })

    test('microphone has no persona-specific text and falls back to the generic scenario', () => {
      const [main] = builders.microphone(personaId).scenarios

      expect(main.description).toBe(PERMISSION_CONFIGS.microphone.scenarios[0].baseDescription)
      expect(main.descriptionKey).toBe(PERMISSION_CONFIGS.microphone.scenarios[0].descriptionKey)
    })
  })
})
