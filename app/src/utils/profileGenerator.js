import {
  buildLocationSection,
  buildCameraSection,
  buildMicrophoneSection,
  buildClipboardSection,
  buildContactsSection,
  buildNotificationsSection,
} from './permissionBuilder.js';

// Utility functions
const getDurationText = (days) => {
  if (days === 1) return '1 day';
  if (days === 7) return '1 week';
  if (days === 30) return '1 month';
  if (days === 90) return '3 months';
  if (days === 365) return '1 year';
  return `${days} days`;
};

const getInvasionLevel = (count, days) => {
  const invasionScore = count * days;
  if (invasionScore <= 7) return 'Low';
  if (invasionScore <= 30) return 'Moderate';
  if (invasionScore <= 90) return 'High';
  if (invasionScore <= 180) return 'Very High';
  return 'Extreme';
};

export function generateProfile(enabledPermissions, duration, persona = null) {
  const categories = [];
  const scenarios = [];

  const hasPermission = (id) => enabledPermissions.some((p) => p?.id === id);
  const personaId = persona?.id || null;

  // Build sections for each enabled permission using component-based approach
  if (hasPermission('location')) {
    const locationSection = buildLocationSection(hasPermission, personaId);
    categories.push(locationSection.category);
    scenarios.push(...locationSection.scenarios);
  }

  if (hasPermission('camera')) {
    const cameraSection = buildCameraSection(personaId);
    categories.push(cameraSection.category);
    scenarios.push(...cameraSection.scenarios);
  }

  if (hasPermission('microphone')) {
    const microphoneSection = buildMicrophoneSection(personaId);
    categories.push(microphoneSection.category);
    scenarios.push(...microphoneSection.scenarios);
  }

  if (hasPermission('clipboard')) {
    const clipboardSection = buildClipboardSection(personaId);
    categories.push(clipboardSection.category);
    scenarios.push(...clipboardSection.scenarios);
  }

  if (hasPermission('contacts')) {
    const contactsSection = buildContactsSection(hasPermission, personaId);
    categories.push(contactsSection.category);
    scenarios.push(...contactsSection.scenarios);
  }

  if (hasPermission('notifications')) {
    const notificationsSection = buildNotificationsSection(hasPermission, personaId);
    categories.push(notificationsSection.category);
    scenarios.push(...notificationsSection.scenarios);
  }

  // Protection Tips
  const protectionTips = [
    'Regularly review app permissions in your phone settings',
    'Only grant permissions when you\'re actually using the feature',
    'Read privacy policies before installing apps',
    'Use privacy-focused alternatives for sensitive apps',
    'Clear app cache and data regularly',
    'Disable location services when not needed',
    'Cover your camera when not in use',
    'Be cautious of websites requesting excessive permissions',
  ];

  if (hasPermission('clipboard')) {
    protectionTips.push('Avoid copying sensitive information like passwords into apps');
  }

  const invasionLevel = getInvasionLevel(enabledPermissions.length, duration);

  // Fallback if no scenarios generated
  if (scenarios.length === 0) {
    scenarios.push({
      icon: '📊',
      title: 'Data Aggregation',
      titleKey: 'profileGenerator.dataAggregation.title',
      description: 'Combine previously known data for a comprehensive profile for monetization',
      descriptionKey: 'profileGenerator.dataAggregation.description',
    });
  }

  return {
    duration: getDurationText(duration),
    durationDays: duration,
    invasionLevel,
    categories,
    scenarios,
    protectionTips: protectionTips,
    personaId, // Add persona ID for translation lookups
  };
}
