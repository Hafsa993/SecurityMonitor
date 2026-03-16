export function generateProfile(enabledPermissions, duration) {
  const categories = [];
  const scenarios = [];
  let comboWarning = null;

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

  const hasPermission = (id) => enabledPermissions.some((p) => p?.id === id);

  // Location
  if (hasPermission('location')) {
    categories.push({
      title: '📍 Location & Movement',
      items: [
        'Your exact home address and work location',
        'Daily movement patterns and routines',
        `Frequency of visits to specific places (gyms, cafes, stores)`,
        'Time spent at each location',
        'Commute patterns and travel routes',
        'Places you visit late at night or frequently',
      ],
    });

    scenarios.push({
      icon: '🏠',
      title: 'Targeted Marketing',
      description: 'Ads for services near your detected locations (restaurants near gym, stores near home). This is happening right now with major apps.',
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: `Location tracking is legal and widespread. Most apps disclose it in privacy policies. However, location data is often sold to data brokers and used for purposes you didn't authorize.`,
    });
  }

  // Camera
  if (hasPermission('camera')) {
    categories.push({
      title: '📹 Visual Information',
      items: [
        'Your physical appearance and facial features',
        'What you wear and fashion preferences',
        'Your surroundings and living space',
        'Objects you interact with most',
        'Your emotional expressions and reactions',
        'People around you and their appearance',
      ],
    });

    scenarios.push({
      icon: '👤',
      title: 'Facial Recognition (Technical Reality)',
      description: 'Technically possible with modern AI, but most mainstream apps don\'t do this yet. Governments and tech companies (Meta, Google) actually do this at scale.',
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: 'Facial recognition use is increasingly regulated. EU bans some uses, US has varying state laws. Apps must disclose if they use facial recognition. Lip-reading is not widely deployed yet, but technically feasible.',
    });
  }

  // Microphone
  if (hasPermission('microphone')) {
    categories.push({
      title: '🎤 Audio & Conversation',
      items: [
        'Your voice characteristics and accent',
        'Conversations happening around you',
        'Background noise reveals your environment',
        'Emotional tone and stress levels in voice',
        'Languages you speak',
        'Voice assistant commands you use',
      ],
    });

    scenarios.push({
      icon: '🎯',
      title: 'Behavioral Targeting',
      description: 'Analyze conversation topics to infer interests, relationship status, health concerns. Several widely used apps have been scrutinized for extensive microphone permissions and surveillance capabilities.',
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: 'Recording conversations without consent is illegal in many jurisdictions (two-party consent states in US). Apps must disclose audio recording. This is one of the most controversial permissions.',
    });
  }

  // Clipboard
  if (hasPermission('clipboard')) {
    categories.push({
      title: '📋 Sensitive Information',
      items: [
        'Passwords and authentication codes',
        'Private messages and personal communications',
        'Financial account numbers',
        'Health-related information you copy',
        'Search queries and interests',
        'Addresses and contact information',
      ],
    });

    scenarios.push({
      icon: '🔐',
      title: 'Security Breach (Actually Happened)',
      description: 'This is real. Over 100 popular apps were caught reading clipboard data. Many widely used social media and communication platforms collected everything users copy-paste.',
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality & Changes',
      description: 'iOS 14+ now alerts you when apps access clipboard (you can see the warning). Apps must justify clipboard access. This led to many apps removing clipboard reading. Android is following suit.',
    });
  }

  // Contacts
  if (hasPermission('contacts')) {
    categories.push({
      title: '👥 Social Network & Relationships',
      items: [
        'Everyone in your contact list',
        'Inference of close relationships and family',
        'Professional connections and work network',
        'Relationship status based on contact frequency',
        'Contact with medical professionals, lawyers, etc.',
        'Network analysis to identify influential people in your circles',
      ],
    });

    scenarios.push({
      icon: '🕸️',
      title: 'Social Graph Analysis (Widely Used)',
      description: 'Popular social media and communication apps use contact uploading to build social graphs. This is standard practice for recommendation algorithms.',
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: 'Contact uploading is mostly legal if disclosed, but increasingly scrutinized. GDPR requires explicit consent. Some apps upload contacts without clear consent - this has led to lawsuits.',
    });
  }

  // Notifications
  if (hasPermission('notifications')) {
    categories.push({
      title: '🔔 Activity Tracking',
      items: [
        'When you use your device and how often',
        'Times of day you are most active',
        'When you check specific apps',
        'Your response patterns to alerts',
        'Active hours and sleep schedule',
        'Engagement levels with different content',
      ],
    });

    scenarios.push({
      icon: '⏰',
      title: 'Behavior Analysis (Standard Practice)',
      description: 'All major apps track engagement and optimize push notification timing. This is standard for engagement metrics and A/B testing.',
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: 'Notification permission is mostly benign legally, but enables behavior manipulation. GDPR and recent laws restrict how aggressively apps can use notifications to influence behavior.',
    });
  }

  // Combo Warnings
  const permCount = enabledPermissions.length;
  if (hasPermission('location') && hasPermission('contacts')) {
    comboWarning = '💡 Location + Contacts = They know who you\'re with and where. Can infer relationships, social circles, and meetings.';
  } else if (hasPermission('camera') && hasPermission('microphone')) {
    comboWarning = '💡 Camera + Microphone = They can see and hear you simultaneously. Enables lip-reading and emotional analysis.';
  } else if (hasPermission('location') && hasPermission('camera') && hasPermission('microphone')) {
    comboWarning = '💡 Location + Camera + Microphone = Complete surveillance. They know where you are, what you look like, who you\'re with, and what you\'re saying.';
  } else if (permCount >= 5) {
    comboWarning = `💡 ${permCount} permissions enabled = Comprehensive data collection across multiple dimensions of your life.`;
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

  // Always include scenarios with enabled permissions
  if (scenarios.length === 0) {
    scenarios.push({
      icon: '📊',
      title: 'Data Aggregation',
      description: 'Combine your enabled permissions to build a comprehensive profile for monetization',
    });
  }

  return {
    duration: getDurationText(duration),
    invasionLevel,
    categories,
    scenarios: scenarios.slice(0, 4),
    comboWarning,
    protectionTips: protectionTips.slice(0, 6),
  };
}
