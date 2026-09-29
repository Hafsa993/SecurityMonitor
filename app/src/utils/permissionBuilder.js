import { PERMISSION_CONFIGS } from './permissionConfigs.js';
import { getPersonaData } from './personaConfigs.js';

// Option 3: Component-based approach - utility functions for building permission sections

// Main scenario of a section. When a persona replaces the generic description, the
// generic translation key is dropped so it can't override the persona text
// (ProfileCard translates persona descriptions via getPersonaDescription).
function primaryScenario(config, permissionType, description, sources) {
  const scenario = { ...config.scenarios[0], permissionType, description, sources };
  if (description !== config.scenarios[0].baseDescription) {
    delete scenario.descriptionKey;
  }
  return scenario;
}

export function buildLocationSection(hasPermission, personaId) {
  const config = PERMISSION_CONFIGS.location;
  const items = [...config.baseItems];
  const baseItemsLength = config.baseItems.length;
  let sources = [];
  let description = config.scenarios[0].baseDescription;

  const personaData = getPersonaData(personaId);

  if (personaData?.location) {
    items.push(...personaData.location.extraItems);
    description = personaData.location.description;
    sources = [...personaData.location.baseSources];

    if (hasPermission('microphone')) {
      sources.push(...personaData.location.microphone);
    }
    if (hasPermission('notifications')) {
      sources.push(...personaData.location.notifications);
    }
  } else {
    sources = [
      {
        permissionEmoji: '📍',
        permissionName: 'Location',
        insight: 'Home & work location detected',
        adResult: 'Local business & nearby store ads',
      },
    ];
  }

  return {
    category: { 
      title: config.categoryTitle, 
      titleKey: config.categoryTitleKey,
      permissionType: 'location',
      baseItemsLength,
      items 
    },
    scenarios: [
      primaryScenario(config, 'location', description, sources),
      config.scenarios[1], // Legal Reality
    ],
  };
}

export function buildCameraSection(personaId) {
  const config = PERMISSION_CONFIGS.camera;
  const items = [...config.baseItems];
  const baseItemsLength = config.baseItems.length;
  let description = config.scenarios[0].baseDescription;
  let sources = [];

  const personaData = getPersonaData(personaId);

  if (personaData?.camera) {
    items.push(...personaData.camera.items);
    description = personaData.camera.description;
    sources = personaData.camera.sources;
  } else {
    sources = [
      {
        permissionEmoji: '📹',
        permissionName: 'Camera',
        insight: 'Physical appearance & environment',
        adResult: 'Personalized demographic targeting',
      },
    ];
  }

  return {
    category: { 
      title: config.categoryTitle,
      titleKey: config.categoryTitleKey,
      permissionType: 'camera',
      baseItemsLength,
      items 
    },
    scenarios: [
      primaryScenario(config, 'camera', description, sources),
      config.scenarios[1], // Legal Reality
    ],
  };
}

export function buildClipboardSection(personaId) {
  const config = PERMISSION_CONFIGS.clipboard;
  const items = [...config.baseItems];
  const baseItemsLength = config.baseItems.length;
  let description = config.scenarios[0].baseDescription;
  let sources = [];

  const personaData = getPersonaData(personaId);

  if (personaData?.clipboard) {
    items.push(...personaData.clipboard.items);
    description = personaData.clipboard.description;
    sources = personaData.clipboard.sources;
  } else {
    sources = [
      {
        permissionEmoji: '📋',
        permissionName: 'Clipboard',
        insight: 'Sensitive data copied & pasted',
        adResult: 'Direct credential & financial theft',
      },
    ];
  }

  return {
    category: { 
      title: config.categoryTitle,
      titleKey: config.categoryTitleKey,
      permissionType: 'clipboard',
      baseItemsLength,
      items 
    },
    scenarios: [
      primaryScenario(config, 'clipboard', description, sources),
      config.scenarios[1], // Legal Reality & Changes
    ],
  };
}

export function buildMicrophoneSection(personaId) {
  const config = PERMISSION_CONFIGS.microphone;
  const items = [...config.baseItems];
  const baseItemsLength = config.baseItems.length;
  let description = config.scenarios[0].baseDescription;
  let sources = [];

  const personaData = getPersonaData(personaId);

  if (personaData?.microphone) {
    // this is an array, so treat it as sources directly
    if (Array.isArray(personaData.microphone)) {
      sources = personaData.microphone;
    } else if (personaData.microphone.sources) {
      sources = personaData.microphone.sources;
      description = personaData.microphone.description;
    }
  } else {
    sources = [
      {
        permissionEmoji: '🎤',
        permissionName: 'Microphone',
        insight: 'Conversations detected and analyzed',
        adResult: 'Interest-based app & ad targeting',
      },
    ];
  }

  return {
    category: { 
      title: config.categoryTitle, 
      titleKey: config.categoryTitleKey,
      permissionType: 'microphone',
      baseItemsLength,
      items 
    },
    scenarios: [
      primaryScenario(config, 'microphone', description, sources),
      config.scenarios[1], // Legal Reality
    ],
  };
}

export function buildContactsSection(hasPermission, personaId) {
  const config = PERMISSION_CONFIGS.contacts;
  const items = [...config.baseItems];
  const baseItemsLength = config.baseItems.length;
  let description = config.scenarios[0].baseDescription;
  let sources = [];

  const personaData = getPersonaData(personaId);

  if (personaData?.contacts) {
    items.push(...personaData.contacts.items);
    description = personaData.contacts.description;
    sources = [...personaData.contacts.sources];

    if (hasPermission('location') && personaData.contacts.locationExtra) {
      sources.push(personaData.contacts.locationExtra);
    }
  } else {
    sources = [
      {
        permissionEmoji: '👥',
        permissionName: 'Contacts',
        insight: 'Your entire contact network',
        adResult: 'Social graph mapping & influence targeting',
      },
    ];
  }

  return {
    category: { 
      title: config.categoryTitle,
      titleKey: config.categoryTitleKey,
      permissionType: 'contacts',
      baseItemsLength,
      items 
    },
    scenarios: [
      primaryScenario(config, 'contacts', description, sources),
      config.scenarios[1], // Legal Reality
    ],
  };
}

export function buildNotificationsSection(hasPermission, personaId) {
  const config = PERMISSION_CONFIGS.notifications;
  const items = [...config.baseItems];
  const baseItemsLength = config.baseItems.length;
  let description = config.scenarios[0].baseDescription;
  let sources = [];

  const personaData = getPersonaData(personaId);

  if (personaData?.notifications) {
    items.push(...personaData.notifications.extraItems);
    description = personaData.notifications.description;
    sources = [...personaData.notifications.sources];

    if (hasPermission('location') && personaData.notifications.locationExtra) {
      sources.push(personaData.notifications.locationExtra);
    }
  } else {
    sources = [
      {
        permissionEmoji: '🔔',
        permissionName: 'Activity',
        insight: 'Active hours & usage patterns detected',
        adResult: 'Timing-optimized push notifications & ads',
      },
    ];
  }

  return {
    category: { 
      title: config.categoryTitle,
      titleKey: config.categoryTitleKey,
      permissionType: 'notifications',
      baseItemsLength,
      items 
    },
    scenarios: [
      primaryScenario(config, 'notifications', description, sources),
      config.scenarios[1], // Legal Reality
    ],
  };
}
