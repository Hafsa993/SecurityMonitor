export function generateProfile(enabledPermissions, duration, persona = null) {
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
    const locationItems = [
      'Your exact home address and work location',
      'Daily movement patterns and routines',
      `Frequency of visits to specific places (gyms, cafes, stores)`,
      'Time spent at each location',
      'Commute patterns and travel routes',
      'Places you visit late at night or frequently',
    ];

    // Customize for specific personas
    if (persona?.id === 'max') {
      locationItems.push('Gym visits: Mon/Wed/Fri at 6am');
      locationItems.push('Library study sessions: 10am-4pm daily');
      locationItems.push('Weekend downtown hangouts: Saturday nights');
    } else if (persona?.id === 'sarah') {
      locationItems.push('School drop-off/pickup: 8am and 3pm daily');
      locationItems.push('Office commute: 9am-5pm weekdays');
      locationItems.push('Grocery and shopping routine: Weekly pattern');
    }

    categories.push({
      title: '📍 Location & Movement',
      items: locationItems,
    });

    let locationDescription = 'Ads for services near your detected locations (restaurants near gym, stores near home). This is happening right now with major apps.';
    if (persona?.id === 'max') {
      locationDescription = 'Ads for gaming cafes near campus, protein supplements near gym, coffee shops on your morning route, weekend bars and social spots downtown.';
    } else if (persona?.id === 'sarah') {
      locationDescription = 'Ads for kids clothing stores near school, family restaurants, grocery deals on your shopping route, kids activities venues, suburban stores.';
    }

    scenarios.push({
      icon: '🏠',
      title: 'Targeted Marketing',
      description: locationDescription,
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: `Location tracking is legal and widespread. Most apps disclose it in privacy policies. However, location data is often sold to data brokers and used for purposes you didn't authorize.`,
    });
  }

  // Camera
  if (hasPermission('camera')) {
    const cameraItems = [
      'Your physical appearance and facial features',
      'What you wear and fashion preferences',
      'Your surroundings and living space',
      'Objects you interact with most',
      'Your emotional expressions and reactions',
      'People around you and their appearance',
    ];

    // Customize for specific personas
    if (persona?.id === 'max') {
      cameraItems.push('Athletic build and casual college student style');
      cameraItems.push('Dorm room with gaming setup and fitness equipment');
    } else if (persona?.id === 'sarah') {
      cameraItems.push('Professional work appearance and casual home attire');
      cameraItems.push('Family home with kids present in background');
    }

    categories.push({
      title: '📹 Visual Information',
      items: cameraItems,
    });

    let cameraDescription = 'Technically possible with modern AI, but most mainstream apps don\'t do this yet. Governments and tech companies (Meta, Google) actually do this at scale.';
    if (persona?.id === 'max') {
      cameraDescription = 'They can see you in casual athletic wear at gym, in class at library, gaming at night. Your dorm setup reveals gaming interests and fitness focus.';
    } else if (persona?.id === 'sarah') {
      cameraDescription = 'They can see professional you at work and family you with kids. Your home background reveals family status, kids ages, and lifestyle.';
    }

    scenarios.push({
      icon: '👤',
      title: 'Facial Recognition (Technical Reality)',
      description: cameraDescription,
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: 'Facial recognition use is increasingly regulated. EU bans some uses, US has varying state laws. Apps must disclose if they use facial recognition. Lip-reading is not widely deployed yet, but technically feasible.',
    });
  }

  // Microphone
  if (hasPermission('microphone')) {
    const micItems = [
      'Your voice characteristics and accent',
      'Conversations happening around you',
      'Background noise reveals your environment',
      'Emotional tone and stress levels in voice',
      'Languages you speak',
      'Voice assistant commands you use',
    ];

    // Customize for specific personas
    if (persona?.id === 'max') {
      micItems.push('Conversations about gaming, classes, and friends');
      micItems.push('Hangout noise: cafes, dorms, gym');
    } else if (persona?.id === 'sarah') {
      micItems.push('Conversations about kids, work meetings, family plans');
      micItems.push('Background sounds: school pickup, office, home with kids');
    }

    categories.push({
      title: '🎤 Audio & Conversation',
      items: micItems,
    });

    let micDescription = 'Analyze conversation topics to infer interests, relationship status, health concerns. Several widely used apps have been scrutinized for extensive microphone permissions and surveillance capabilities.';
    if (persona?.id === 'max') {
      micDescription = 'They hear conversations about gaming tournaments, fitness goals, college gossip, weekend plans. Infer social circle, interests, and lifestyle.';
    } else if (persona?.id === 'sarah') {
      micDescription = 'They hear conversations about kids school, family planning, work stress, health concerns. Infer family dynamics, job satisfaction, and health status.';
    }

    scenarios.push({
      icon: '🎯',
      title: 'Behavioral Targeting',
      description: micDescription,
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: 'Recording conversations without consent is illegal in many jurisdictions (two-party consent states in US). Apps must disclose audio recording. This is one of the most controversial permissions.',
    });
  }

  // Clipboard
  if (hasPermission('clipboard')) {
    const clipItems = [
      'Passwords and authentication codes',
      'Private messages and personal communications',
      'Financial account numbers',
      'Health-related information you copy',
      'Search queries and interests',
      'Addresses and contact information',
    ];

    // Customize for specific personas
    if (persona?.id === 'max') {
      clipItems.push('Gaming account passwords and credentials');
      clipItems.push('College email and campus portal logins');
    } else if (persona?.id === 'sarah') {
      clipItems.push('Kids school login information');
      clipItems.push('Family budget notes and account numbers');
    }

    categories.push({
      title: '📋 Sensitive Information',
      items: clipItems,
    });

    let clipDescription = 'This is real. Over 100 popular apps were caught reading clipboard data. Many widely used social media and communication platforms collected everything users copy-paste.';
    if (persona?.id === 'max') {
      clipDescription = 'They capture: gaming account passwords, college email logins, dating app credentials, payment info for in-game purchases.';
    } else if (persona?.id === 'sarah') {
      clipDescription = 'They capture: kids school logins, family calendar info, budget spreadsheets, medical appointment notes, kids app passwords.';
    }

    scenarios.push({
      icon: '🔐',
      title: 'Security Breach (Actually Happened)',
      description: clipDescription,
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality & Changes',
      description: 'iOS 14+ now alerts you when apps access clipboard (you can see the warning). Apps must justify clipboard access. This led to many apps removing clipboard reading. Android is following suit.',
    });
  }

  // Contacts
  if (hasPermission('contacts')) {
    const contactItems = [
      'Everyone in your contact list',
      'Inference of close relationships and family',
      'Professional connections and work network',
      'Relationship status based on contact frequency',
      'Contact with medical professionals, lawyers, etc.',
      'Network analysis to identify influential people in your circles',
    ];

    // Customize for specific personas
    if (persona?.id === 'max') {
      contactItems.push('Close friend group: 5-6 high school friends');
      contactItems.push('Campus contacts: classmates, help desk colleagues');
    } else if (persona?.id === 'sarah') {
      contactItems.push('Family: spouse, kids, extended family');
      contactItems.push('Professional network: work colleagues, manager');
      contactItems.push('Parent network: school contacts, other parents');
    }

    categories.push({
      title: '👥 Social Network & Relationships',
      items: contactItems,
    });

    let contactDescription = 'Popular social media and communication apps use contact uploading to build social graphs. This is standard practice for recommendation algorithms.';
    if (persona?.id === 'max') {
      contactDescription = 'They map your college friend network, identify your closest friends, see your social circle strength and diversity.';
    } else if (persona?.id === 'sarah') {
      contactDescription = 'They identify you as parent, infer family size and ages, map your professional network, and identify parent community connections.';
    }

    scenarios.push({
      icon: '🕸️',
      title: 'Social Graph Analysis (Widely Used)',
      description: contactDescription,
    });

    scenarios.push({
      icon: '⚖️',
      title: 'Legal Reality',
      description: 'Contact uploading is mostly legal if disclosed, but increasingly scrutinized. GDPR requires explicit consent. Some apps upload contacts without clear consent - this has led to lawsuits.',
    });
  }

  // Notifications
  if (hasPermission('notifications')) {
    const notifItems = [
      'When you use your device and how often',
      'Times of day you are most active',
      'When you check specific apps',
      'Your response patterns to alerts',
      'Active hours and sleep schedule',
      'Engagement levels with different content',
    ];

    // Customize for specific personas
    if (persona?.id === 'max') {
      notifItems.push('Late night activity: 10pm-2am gaming sessions');
      notifItems.push('Morning gym session prep: 5-6am activity spike');
      notifItems.push('Weekend social engagement: high notification response Sat/Sun nights');
    } else if (persona?.id === 'sarah') {
      notifItems.push('Morning routine: 7-8am device activity (kids getting ready)');
      notifItems.push('School hours: lower responsiveness (work meetings)');
      notifItems.push('Evening family time: 6-9pm varied engagement');
    }

    categories.push({
      title: '🔔 Activity Tracking',
      items: notifItems,
    });

    let notifDescription = 'All major apps track engagement and optimize push notification timing. This is standard for engagement metrics and A/B testing.';
    if (persona?.id === 'max') {
      notifDescription = 'They know you game at night, work out at dawn, socialize weekends. Target gaming deals at midnight, gym motivation at 5am, party invites on Friday nights.';
    } else if (persona?.id === 'sarah') {
      notifDescription = 'They know your morning rush, work unavailability, evening family time. Target kid activities at school pickup time, work stress relief at 5pm, family deals at dinnertime.';
    }

    scenarios.push({
      icon: '⏰',
      title: 'Behavior Analysis (Standard Practice)',
      description: notifDescription,
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
    if (persona?.id === 'max') {
      comboWarning = '💡 Location + Contacts = They know which friends you hangout with where. Can map your social circle location patterns.';
    } else if (persona?.id === 'sarah') {
      comboWarning = '💡 Location + Contacts = They know you pick up kids at school, work commute with spouse. Tracks entire family movement.';
    } else {
      comboWarning = '💡 Location + Contacts = They know who you\'re with and where. Can infer relationships, social circles, and meetings.';
    }
  } else if (hasPermission('camera') && hasPermission('microphone')) {
    if (persona?.id === 'max') {
      comboWarning = '💡 Camera + Microphone = They see and hear your gaming, study sessions, and social hangouts simultaneously.';
    } else if (persona?.id === 'sarah') {
      comboWarning = '💡 Camera + Microphone = They see and hear family dynamics: how you interact with kids, conversations, reactions.';
    } else {
      comboWarning = '💡 Camera + Microphone = They can see and hear you simultaneously. Enables lip-reading and emotional analysis.';
    }
  } else if (hasPermission('location') && hasPermission('camera') && hasPermission('microphone')) {
    if (persona?.id === 'max') {
      comboWarning = '💡 Location + Camera + Microphone = Complete surveillance of your college life: where you are, who you see, what you say.';
    } else if (persona?.id === 'sarah') {
      comboWarning = '💡 Location + Camera + Microphone = Complete family surveillance: tracking kids locations, seeing family moments, hearing conversations.';
    } else {
      comboWarning = '💡 Location + Camera + Microphone = Complete surveillance. They know where you are, what you look like, who you\'re with, and what you\'re saying.';
    }
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
