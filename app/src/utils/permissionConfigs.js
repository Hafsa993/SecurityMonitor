// Base permission configurations - shared across all personas
export const PERMISSION_CONFIGS = {
  location: {
    categoryTitle: '📍 Location & Movement',
    categoryTitleKey: 'permissionConfigs.location.categoryTitle',
    baseItems: [
      'Your exact home address and work location',
      'Daily movement patterns and routines',
      'Frequency of visits to specific places (gyms, cafes, stores)',
      'Time spent at each location',
      'Commute patterns and travel routes',
      'Places you visit late at night or frequently',
    ],
    scenarios: [
      {
        icon: '🏠',
        title: 'Targeted Marketing',
        titleKey: 'permissionConfigs.location.targetedMarketing.title',
        baseDescription: 'Ads for services near your detected locations (restaurants near gym, stores near home). This is happening right now with major apps.',
        descriptionKey: 'permissionConfigs.location.targetedMarketing.description',
      },
      {
        icon: '⚖️',
        title: 'Legal Reality',
        titleKey: 'permissionConfigs.location.legalReality.title',
        description:
          'Location tracking is legal and widespread. Most apps disclose it in privacy policies. However, location data is often sold to data brokers and used for purposes you didn\'t authorize.',
        descriptionKey: 'permissionConfigs.location.legalReality.description',
      },
    ],
  },
  camera: {
    categoryTitle: '📹 Visual Information',
    categoryTitleKey: 'permissionConfigs.camera.categoryTitle',
    baseItems: [
      'Your physical appearance and facial features',
      'What you wear and fashion preferences',
      'Your surroundings and living space',
      'Objects you interact with most',
      'Your emotional expressions and reactions',
      'People around you and their appearance',
    ],
    scenarios: [
      {
        icon: '👤',
        title: 'Facial Recognition (Technical Reality)',
        titleKey: 'permissionConfigs.camera.facialRecognition.title',
        baseDescription:
          'Technically possible with modern AI, but most mainstream apps don\'t do this yet. Governments and tech companies actually do this at scale.',
        descriptionKey: 'permissionConfigs.camera.facialRecognition.description',
      },
      {
        icon: '⚖️',
        title: 'Legal Reality',
        titleKey: 'permissionConfigs.camera.legalReality.title',
        description:
          'Facial recognition use is increasingly regulated. EU bans some uses, US has varying state laws. Apps must disclose if they use facial recognition. Lip-reading is not widely deployed yet, but technically feasible.',
        descriptionKey: 'permissionConfigs.camera.legalReality.description',
      },
    ],
  },
  microphone: {
    categoryTitle: '🎤 Audio & Conversation',
    categoryTitleKey: 'permissionConfigs.microphone.categoryTitle',
    baseItems: [
      'Your voice characteristics and accent',
      'Conversations happening around you',
      'Background noise reveals your environment',
      'Emotional tone and stress levels in voice',
      'Languages you speak',
      'Voice assistant commands you use',
    ],
    scenarios: [
      {
        icon: '🎙️',
        title: 'Conversation Monitoring (Technically Possible)',
        titleKey: 'permissionConfigs.microphone.conversationMonitoring.title',
        baseDescription:
            'With microphone access, apps can listen to nearby conversations and understand what you\'re talking about. This could be used to profile your interests, infer your mood and stress levels, or target you with relevant apps and ads based on conversation topics. Technically possible but varies by app intent and capability.',
        descriptionKey: 'permissionConfigs.microphone.conversationMonitoring.description',
      },
      {
        icon: '⚖️',
        title: 'Legal Reality',
        titleKey: 'permissionConfigs.microphone.legalReality.title',
        description:
          'Recording conversations without consent is illegal in many jurisdictions (two-party consent states in US). Apps must disclose audio recording. This is one of the most controversial permissions.',
        descriptionKey: 'permissionConfigs.microphone.legalReality.description',
      },
    ],
  },
  clipboard: {
    categoryTitle: '📋 Sensitive Information',
    categoryTitleKey: 'permissionConfigs.clipboard.categoryTitle',
    baseItems: [
      'Passwords and authentication codes',
      'Private messages and personal communications',
      'Financial account numbers',
      'Health-related information you copy',
      'Search queries and interests',
      'Addresses and contact information',
    ],
    scenarios: [
      {
        icon: '🔐',
        title: 'Security Breach (Actually Happened)',
        titleKey: 'permissionConfigs.clipboard.securityBreach.title',
        baseDescription:
          'This is real. Over 100 popular apps were caught reading clipboard data. Many widely used social media and communication platforms collected everything users copy-paste.',
        descriptionKey: 'permissionConfigs.clipboard.securityBreach.description',
      },
      {
        icon: '⚖️',
        title: 'Legal Reality & Changes',
        titleKey: 'permissionConfigs.clipboard.legalReality.title',
        description:
          'Many devices now alert you when apps access clipboard (you can see the warning). Apps must justify clipboard access. This led to many apps removing clipboard reading. Android is following suit.',
        descriptionKey: 'permissionConfigs.clipboard.legalReality.description',
      },
    ],
  },
  contacts: {
    categoryTitle: '👥 Social Network & Relationships',
    categoryTitleKey: 'permissionConfigs.contacts.categoryTitle',
    baseItems: [
      'Everyone in your contact list',
      'Inference of close relationships and family',
      'Professional connections and work network',
      'Relationship status based on contact frequency',
      'Contact with medical professionals, lawyers, etc.',
      'Network analysis to identify influential people in your circles',
    ],
    scenarios: [
      {
        icon: '🕸️',
        title: 'Social Graph Analysis (Widely Used)',
        titleKey: 'permissionConfigs.contacts.socialGraphAnalysis.title',
        baseDescription:
          'Popular social media and communication apps use contact uploading to build social graphs. This is standard practice for recommendation algorithms.',
        descriptionKey: 'permissionConfigs.contacts.socialGraphAnalysis.description',
      },
      {
        icon: '⚖️',
        title: 'Legal Reality',
        titleKey: 'permissionConfigs.contacts.legalReality.title',
        description:
          'Contact uploading is mostly legal if disclosed, but increasingly scrutinized. GDPR requires explicit consent. Some apps upload contacts without clear consent - this has led to lawsuits.',
        descriptionKey: 'permissionConfigs.contacts.legalReality.description',
      },
    ],
  },
  notifications: {
    categoryTitle: '🔔 Activity Tracking',
    categoryTitleKey: 'permissionConfigs.notifications.categoryTitle',
    baseItems: [
      'When you use your device and how often',
      'Times of day you are most active',
      'When you check specific apps',
      'Your response patterns to alerts',
      'Active hours and sleep schedule',
      'Engagement levels with different content',
    ],
    scenarios: [
      {
        icon: '⏰',
        title: 'Behavior Analysis (Standard Practice)',
        titleKey: 'permissionConfigs.notifications.behaviorAnalysis.title',
        baseDescription:
          'All major apps track engagement and optimize push notification timing. This is standard for engagement metrics and A/B testing.',
        descriptionKey: 'permissionConfigs.notifications.behaviorAnalysis.description',
      },
      {
        icon: '⚖️',
        title: 'Legal Reality',
        titleKey: 'permissionConfigs.notifications.legalReality.title',
        description:
          'Notification permission is mostly benign legally, but enables behavior manipulation. GDPR and recent laws restrict how aggressively apps can use notifications to influence behavior.',
        descriptionKey: 'permissionConfigs.notifications.legalReality.description',
      },
    ],
  },
};
