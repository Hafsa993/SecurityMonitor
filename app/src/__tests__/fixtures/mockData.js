/**
 * Mock data for profile generator tests
 * Contains realistic test scenarios and fixtures
 */

export const mockPermissions = {
  location: {
    id: 'location',
    name: 'Location',
    icon: '📍',
    description: 'Access to your current location and movement patterns',
  },
  camera: {
    id: 'camera',
    name: 'Camera',
    icon: '📹',
    description: 'Access to your device camera and visual feed',
  },
  microphone: {
    id: 'microphone',
    name: 'Microphone',
    icon: '🎤',
    description: 'Access to your device microphone and audio',
  },
  clipboard: {
    id: 'clipboard',
    name: 'Clipboard',
    icon: '📋',
    description: 'Access to everything you copy or paste',
  },
  contacts: {
    id: 'contacts',
    name: 'Contacts',
    icon: '👥',
    description: 'Access to your contacts and social connections',
  },
  notifications: {
    id: 'notifications',
    name: 'Notifications',
    icon: '🔔',
    description: 'Permission to send you notifications',
  },
}

export const mockPersonas = {
  anonymous: {
    id: 'anonymous',
    name: 'Anonymous',
    type: 'generic',
    description: 'Generic profile without specific habits',
  },
  max: {
    id: 'max',
    name: 'Max',
    age: 22,
    type: 'College Student',
    emoji: '🎓',
    description: 'See what a website knows about a college student',
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah',
    age: 35,
    type: 'Parent',
    emoji: '👩‍👧',
    description: 'See what a website knows about a parent',
  },
}

export const mockEnabledPermissions = [
  mockPermissions.location,
  mockPermissions.camera,
]

export const mockAllPermissionsEnabled = [
  mockPermissions.location,
  mockPermissions.camera,
  mockPermissions.microphone,
  mockPermissions.clipboard,
  mockPermissions.contacts,
  mockPermissions.notifications,
]

export const mockProfile = {
  duration: 7,
  invasionLevel: 'High',
  categories: [
    {
      title: 'Location Data',
      items: [
        'Your current location with precision up to a few meters',
        'Your movement patterns and frequent locations',
      ],
    },
    {
      title: 'Camera Access',
      items: [
        'Live camera feed from your device',
        'Visual information about your physical environment',
      ],
    },
  ],
  scenarios: [
    {
      icon: '🎯',
      title: 'Targeted Advertising',
      description: 'Websites can identify exactly who you are and target you with ads',
      sources: [
        {
          permissionEmoji: '📍',
          permissionName: 'Location',
          insight: 'Your home, work, and favorite places are revealed',
          adResult: 'Ads for gyms near you, restaurants in your frequent areas',
        },
      ],
    },
  ],
  protectionTips: [
    'Deny location access unless absolutely necessary',
    'Only grant camera access to trusted applications',
  ],
}

export const mockEmptyEnabledPermissions = []

export const testCases = {
  singlePermission: {
    enabledPermissions: [mockPermissions.location],
    duration: 7,
    persona: mockPersonas.max,
  },
  multiplePermissions: {
    enabledPermissions: mockEnabledPermissions,
    duration: 30,
    persona: mockPersonas.sarah,
  },
  allPermissions: {
    enabledPermissions: mockAllPermissionsEnabled,
    duration: 365,
    persona: mockPersonas.max,
  },
  noPermissions: {
    enabledPermissions: mockEmptyEnabledPermissions,
    duration: 1,
    persona: mockPersonas.anonymous,
  },
  edgeCases: {
    maxDuration: {
      enabledPermissions: [mockPermissions.location],
      duration: 365,
      persona: mockPersonas.max,
    },
    minDuration: {
      enabledPermissions: [mockPermissions.location],
      duration: 1,
      persona: mockPersonas.sarah,
    },
    riskyCombination: {
      enabledPermissions: [mockPermissions.location, mockPermissions.camera, mockPermissions.microphone],
      duration: 7,
      persona: mockPersonas.max,
    },
  },
}
